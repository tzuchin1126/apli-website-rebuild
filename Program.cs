using System.Text;
using System.Text.Json;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.Extensions.Options;
using apli_website_rebuild.Configuration;
using apli_website_rebuild.Endpoints;
using apli_website_rebuild.Middleware;
using apli_website_rebuild.Services;

var builder = WebApplication.CreateBuilder(args);

// ===== 取得後台管理員帳號密碼 =====
var adminUsername = builder.Configuration["Admin:Username"];
var adminPassword = builder.Configuration["Admin:Password"];

if (string.IsNullOrWhiteSpace(adminUsername))
    throw new InvalidOperationException("管理員帳號尚未設定。");

if (string.IsNullOrWhiteSpace(adminPassword))
    throw new InvalidOperationException("管理員密碼尚未設定。");

// ===== 判斷是否為正式環境 =====
bool isProduction = !builder.Environment.IsDevelopment();

if (isProduction)
{
    var allowedHosts = builder.Configuration["AllowedHosts"];

    // 完全沒有設定
    if (string.IsNullOrWhiteSpace(allowedHosts))
        throw new InvalidOperationException("正式環境的 AllowedHosts 尚未設定,請設定為實際的網站主機名稱。");

    // 設定成萬用字元，等於沒做限制
    if (allowedHosts == "*")
        throw new InvalidOperationException("正式環境的 AllowedHosts 不可以設定為 \"*\",請設定為實際的網站主機名稱。");
}


// ===== 設定 Cookie 安全性原則 =====
CookieSecurePolicy cookieSecurePolicy;

if (builder.Environment.IsDevelopment())
{
    // 開發環境：本機測試常常沒有 HTTPS，所以跟著請求本身的協定走
    cookieSecurePolicy = CookieSecurePolicy.SameAsRequest;
}
else
{
    // 正式環境：一律要求 HTTPS 才能傳送 Cookie，避免帳密外洩
    cookieSecurePolicy = CookieSecurePolicy.Always;
}

// ============================================================
// 服務註冊:Razor Pages、Session、登入驗證
// ============================================================
builder.Services.AddRazorPages();
builder.Services.AddDistributedMemoryCache();

// Session 目前只拿來暫存後台登入的驗證碼
builder.Services.AddSession(options =>
{
    options.Cookie.Name = "ap-admin-captcha";
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.SecurePolicy = cookieSecurePolicy;
    options.IdleTimeout = TimeSpan.FromMinutes(10);
});

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Admin";
        options.Cookie.Name = "ap-admin";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Cookie.SecurePolicy = cookieSecurePolicy;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
        options.SlidingExpiration = true;

        // 沒登入去打 API 的話,回 401 就好,不要導到登入頁面(因為對方不是瀏覽器)
        options.Events.OnRedirectToLogin = context =>
        {
            if (context.Request.Path.StartsWithSegments("/api"))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            }

            context.Response.Redirect(context.RedirectUri);
            return Task.CompletedTask;
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-CSRF-TOKEN";
    options.Cookie.Name = "ap-csrf";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.Cookie.SecurePolicy = cookieSecurePolicy;
});

builder.Services.AddRequestTimeouts(options =>
{
    options.DefaultPolicy = new RequestTimeoutPolicy
    {
        Timeout = TimeSpan.FromSeconds(30),
        TimeoutStatusCode = StatusCodes.Status504GatewayTimeout
    };
});

builder.Services.Configure<PublicPageOptions>(builder.Configuration.GetSection("PublicPages"));
builder.Services.AddSingleton(sp => sp.GetRequiredService<IOptions<PublicPageOptions>>().Value);

// newsFile path for PublicPageRenderer (computed same way as below, using builder)
builder.Services.AddSingleton<string>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var env = sp.GetRequiredService<IWebHostEnvironment>();
    var configuredDataRoot = config["Apli:DataRoot"];
    var hasCustomDataRoot = !string.IsNullOrWhiteSpace(configuredDataRoot);
    var root = env.ContentRootPath;
    var dataRoot = hasCustomDataRoot
        ? Path.GetFullPath(configuredDataRoot!, root)
        : root;
    return hasCustomDataRoot
        ? Path.Combine(dataRoot, "news.json")
        : Path.Combine(root, "wwwroot", "data", "news.json");
});

builder.Services.AddSingleton<PublicPageRenderer>();

// ============================================================
// 限流:同一個 IP 在時間內打太多次就擋掉
// ============================================================
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // 管理員登入:同一個 IP 每分鐘最多 5 次,防止有人猜密碼
    options.AddPolicy("admin-login", context => IpLimiter(context, permitLimit: 5));

    // 驗證碼重新整理與登入分開限流,避免登入失敗後換碼被登入限流擋住
    options.AddPolicy("admin-captcha", context => IpLimiter(context, permitLimit: 30));

    // 公開 API 跟後台 API:1 分鐘最多 60 次
    options.AddPolicy("public-api", context => IpLimiter(context, permitLimit: 60));
    options.AddPolicy("admin-api", context => IpLimiter(context, permitLimit: 60));

    static RateLimitPartition<string> IpLimiter(HttpContext context, int permitLimit)
    {
        var address = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(address, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = permitLimit,
            Window = TimeSpan.FromMinutes(1),
            QueueLimit = 0,
            AutoReplenishment = true
        });
    }
});

var app = builder.Build();

// ============================================================
// 資料放哪裡:預設放在 wwwroot/App_Data,也可以用 Apli:DataRoot 設定自訂路徑。
// 正式環境一定要設定,而且不能放在 wwwroot 裡面(不然檔案會直接被下載到)。
// ============================================================
var root = app.Environment.ContentRootPath;
var configuredDataRoot = builder.Configuration["Apli:DataRoot"];
string dataRoot;

if (string.IsNullOrWhiteSpace(configuredDataRoot))
{
    if (!app.Environment.IsDevelopment())
    {
        throw new InvalidOperationException(
            "正式環境的 Apli:DataRoot 尚未設定,請指定一個位於發佈網站目錄之外的資料夾路徑。");
    }

    dataRoot = root;
}
else
{
    dataRoot = Path.GetFullPath(configuredDataRoot, root);
}

if (!app.Environment.IsDevelopment())
{
    var webRoot = Path.GetFullPath(Path.Combine(root, "wwwroot"));
    var dataRootInsideWebRoot =
        string.Equals(dataRoot, webRoot, StringComparison.OrdinalIgnoreCase) ||
        dataRoot.StartsWith($"{webRoot}{Path.DirectorySeparatorChar}", StringComparison.OrdinalIgnoreCase);

    if (dataRootInsideWebRoot)
    {
        throw new InvalidOperationException(
            "正式環境的 Apli:DataRoot 不可以位於已發佈的 wwwroot 目錄之內。");
    }
}

// 新聞資料、上傳的圖片要放的檔案路徑
var hasCustomDataRoot = !string.IsNullOrWhiteSpace(configuredDataRoot);
var newsFile = hasCustomDataRoot
    ? Path.Combine(dataRoot, "news.json")
    : Path.Combine(root, "wwwroot", "data", "news.json");
var categoriesFile = hasCustomDataRoot
    ? Path.Combine(dataRoot, "news-categories.json")
    : Path.Combine(root, "wwwroot", "data", "news-categories.json");
var uploadsRoot = hasCustomDataRoot
    ? Path.Combine(dataRoot, "news")
    : Path.Combine(root, "App_Data", "news");
var imageUploadsRoot = Path.Combine(uploadsRoot, "images");
var defaultCategories = new[] { "營運公告", "費率公告", "職缺公告" };

Directory.CreateDirectory(Path.GetDirectoryName(newsFile)!);
Directory.CreateDirectory(uploadsRoot);
Directory.CreateDirectory(imageUploadsRoot);

if (!File.Exists(categoriesFile))
{
    await using var stream = File.Create(categoriesFile);
    await JsonSerializer.SerializeAsync(
        stream, defaultCategories, new JsonSerializerOptions { WriteIndented = true });
}

await NewsService.RepairMissingOrDuplicateIdsAsync(newsFile);

// CSP:限制網頁能載入哪些資源,防止 XSS。
// img-src 多開 blob: 是因為後台要在瀏覽器端先解碼圖片再上傳。
const string contentSecurityPolicy =
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; " +
    "form-action 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; " +
    "connect-src 'self'; frame-src https://www.google.com;";

// ============================================================
// HTTP pipeline:錯誤處理、安全標頭
// ============================================================
if (!app.Environment.IsDevelopment())
{
    // API 不套用這個,讓 API 繼續回傳 JSON 格式的錯誤
    app.UseWhen(
        context => !context.Request.Path.StartsWithSegments("/api"),
        publicPages => publicPages.UseExceptionHandler("/500.html"));

    app.UseHsts();
}

app.Use(async (context, next) =>
{
    var headers = context.Response.Headers;
    headers["Content-Security-Policy"] = contentSecurityPolicy;
    headers["X-Frame-Options"] = "DENY";
    headers["X-Content-Type-Options"] = "nosniff";
    headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";

    // 後台頁面與管理 API 可能包含草稿、附件資訊或登入狀態，禁止瀏覽器與共用 Proxy 快取。
    var path = context.Request.Path;
    if (path.StartsWithSegments("/Admin") ||
        path.StartsWithSegments("/api/admin") ||
        path.StartsWithSegments("/api/news"))
    {
        headers.CacheControl = "private, no-store";
    }

    await next();
});

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// ============================================================
// 公開頁面路由與渲染
// ============================================================
app.UsePublicPages();

app.UseDefaultFiles();

// 原始的新聞 JSON 檔案不給人直接下載
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value;
    if (string.Equals(path, "/data/news.json", StringComparison.OrdinalIgnoreCase) ||
        string.Equals(path, "/data/news-categories.json", StringComparison.OrdinalIgnoreCase))
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        return;
    }

    await next();
});

// 補上 .avif 圖片的 MIME type,不然瀏覽器可能不認得
var staticFileContentTypes = new FileExtensionContentTypeProvider();
staticFileContentTypes.Mappings[".avif"] = "image/avif";
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = staticFileContentTypes,
    OnPrepareResponse = context =>
    {
        var path = context.Context.Request.Path;

        if (path.StartsWithSegments("/public/images") ||
            path.StartsWithSegments("/public/fonts"))
        {
            context.Context.Response.Headers.CacheControl = "public, max-age=604800";
        }
        else if (path.StartsWithSegments("/css") ||
                 path.StartsWithSegments("/js"))
        {
            context.Context.Response.Headers.CacheControl = "public, max-age=86400";
        }
    }
});

app.UseSession();
app.UseRouting();
app.UseRequestTimeouts();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();

app.MapRazorPages();

NewsEndpoints.Map(app, new NewsEndpointOptions(
    adminUsername,
    adminPassword,
    newsFile,
    categoriesFile,
    uploadsRoot,
    imageUploadsRoot,
    defaultCategories));

app.Run();
