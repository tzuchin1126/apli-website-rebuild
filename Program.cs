using System.Text;
using System.Text.Json;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Http.Timeouts;
using apli_website_rebuild.Endpoints;
using apli_website_rebuild.Services;

var builder = WebApplication.CreateBuilder(args);

// var adminUsername = "apliadmin123";
// var adminPassword = "apliadmin456";
var adminUsername = builder.Configuration["Admin:Username"];
var adminPassword = builder.Configuration["Admin:Password"];

if (string.IsNullOrWhiteSpace(adminUsername) || string.IsNullOrWhiteSpace(adminPassword))
    throw new InvalidOperationException("管理員帳號或密碼尚未設定。");

bool isProduction = !builder.Environment.IsDevelopment();

if (isProduction)

{
    var allowedHosts = builder.Configuration["AllowedHosts"];
    if (string.IsNullOrWhiteSpace(allowedHosts) || allowedHosts == "*")
        throw new InvalidOperationException("正式環境的 AllowedHosts 尚未設定,請設定為實際的網站主機名稱(例如 example.com)。");
}

// 開發環境不強制 HTTPS,正式環境一定要 HTTPS 才能傳送 Cookie
var cookieSecurePolicy = builder.Environment.IsDevelopment() ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always;

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

// ============================================================
// 限流:同一個 IP 在時間內打太多次就擋掉
// ============================================================
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // 管理員登入畫面:1 分鐘最多 5 次,防止有人猜密碼
    options.AddPolicy("admin-login", context => IpLimiter(context, permitLimit: 5));

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
    await next();
});

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// ============================================================
// 網址對應表:無副檔名路由(/about)、舊網址 301 轉址(/about.html -> /about)
// ============================================================
var publicPagePaths = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
{
    ["/"] = "index.html",
    ["/about"] = "about.html",
    ["/affiliates"] = "affiliates.html",
    ["/contact"] = "contact.html",
    ["/careers"] = "careers.html",
    ["/company-history"] = "company-history.html",
    ["/news"] = "news.html",
    ["/occupational-safety"] = "occupational-safety.html",
    ["/operational-resources"] = "operational-resources.html",
    ["/privacy"] = "privacy.html",
    ["/services"] = "services.html",
    ["/404.html"] = "404.html",
    ["/500.html"] = "500.html"
};

var legacyPageRedirects = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
{
    ["/index.html"] = "/",
    ["/about.html"] = "/about",
    ["/affiliates.html"] = "/affiliates",
    ["/contact.html"] = "/contact",
    ["/careers.html"] = "/careers",
    ["/company-history.html"] = "/company-history",
    ["/news.html"] = "/news",
    ["/occupational-safety.html"] = "/occupational-safety",
    ["/operational-resources.html"] = "/operational-resources",
    ["/privacy.html"] = "/privacy",
    ["/services.html"] = "/services"
};

// 每個靜態頁面裡都有一段 <!-- shared-site-footer --> 標記,
// 我們在這裡讀取共用的 _Footer.cshtml 內容,把標記換掉。
const string sharedFooterMarker = "<!-- shared-site-footer -->";
var sharedFooterPath = Path.Combine(app.Environment.ContentRootPath, "Pages", "Shared", "_Footer.cshtml");

// 404、500 這種狀態碼頁面,也要套用共用 footer
app.UseStatusCodePages(async statusCodeContext =>
{
    var httpContext = statusCodeContext.HttpContext;
    var statusCode = httpContext.Response.StatusCode;
    var isApiRequest = httpContext.Request.Path.StartsWithSegments("/api");

    if (isApiRequest || statusCode is not (StatusCodes.Status404NotFound or StatusCodes.Status500InternalServerError))
    {
        return;
    }

    var pagePath = $"{statusCode}.html";
    var staticPage = app.Environment.WebRootFileProvider.GetFileInfo(pagePath);
    if (!staticPage.Exists)
    {
        return;
    }

    var pageMarkup = await ReadFileAsync(staticPage, httpContext.RequestAborted);
    var footerMarkup = await File.ReadAllTextAsync(sharedFooterPath, httpContext.RequestAborted);
    var responseMarkup = pageMarkup.Replace(sharedFooterMarker, footerMarkup, StringComparison.Ordinal);

    await WriteHtmlResponseAsync(httpContext, responseMarkup);
});

// ============================================================
// 公開頁面路由
// 這段 middleware 依序做幾件事:
//   1. 舊網址(.html)轉址到新網址
//   2. /news-detail 這個網址本身要擋掉(它不是真的新聞頁)
//   3. /news/{id} 這種網址,找出對應的新聞,渲染成新聞詳細頁
//   4. 其他在 publicPagePaths 裡的網址,直接讀對應的 html 檔案,套用共用 footer
// ============================================================
app.Use(async (context, next) =>
{
    var requestPath = context.Request.Path.Value ?? string.Empty;
    var isGet = HttpMethods.IsGet(context.Request.Method);

    if (!isGet)
    {
        await next();
        return;
    }

    // 1. 舊網址轉址
    if (legacyPageRedirects.TryGetValue(requestPath, out var canonicalPath))
    {
        context.Response.Redirect($"{canonicalPath}{context.Request.QueryString}", permanent: true);
        return;
    }

    // 2. /news-detail 本身不是合法網址,直接回 404
    if (string.Equals(requestPath, "/news-detail", StringComparison.OrdinalIgnoreCase) ||
        string.Equals(requestPath, "/news-detail.html", StringComparison.OrdinalIgnoreCase))
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        return;
    }

    // 3. /news/{id} 新聞詳細頁
    var pathSegments = requestPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
    var isNewsDetailPath = pathSegments.Length == 2 &&
        string.Equals(pathSegments[0], "news", StringComparison.OrdinalIgnoreCase) &&
        !string.IsNullOrWhiteSpace(pathSegments[1]);

    NewsItem? newsItem = null;

    if (isNewsDetailPath)
    {
        var newsId = Uri.UnescapeDataString(pathSegments[1]);
        var allNews = await NewsService.ReadAsync(newsFile);
        newsItem = allNews.FirstOrDefault(item =>
            string.Equals(item.Id, newsId, StringComparison.Ordinal) &&
            NewsService.IsPublicNewsItem(item));

        if (newsItem is null)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return;
        }
    }

    // 4. 一般公開頁面(不是上面兩種,就交給下一個 middleware,例如靜態檔案)
    var hasPublicPage = publicPagePaths.TryGetValue(requestPath, out var pageFile);
    if (!hasPublicPage && !isNewsDetailPath)
    {
        await next();
        return;
    }

    pageFile = isNewsDetailPath ? "news-detail.html" : pageFile!;
    var staticPage = app.Environment.WebRootFileProvider.GetFileInfo(pageFile);

    if (!staticPage.Exists)
    {
        await next();
        return;
    }

    var pageMarkup = await ReadFileAsync(staticPage, context.RequestAborted);

    if (!pageMarkup.Contains(sharedFooterMarker, StringComparison.Ordinal))
    {
        await next();
        return;
    }

    var footerMarkup = await File.ReadAllTextAsync(sharedFooterPath, context.RequestAborted);
    var responseMarkup = pageMarkup.Replace(sharedFooterMarker, footerMarkup, StringComparison.Ordinal);

    // 新聞詳細頁跟首頁/新聞列表頁,還要多做 SEO 用的 SSR 渲染
    if (isNewsDetailPath && newsItem is not null)
    {
        responseMarkup = NewsSeoService.RenderDetailPage(responseMarkup, newsItem);
    }
    else if (string.Equals(pageFile, "index.html", StringComparison.OrdinalIgnoreCase) ||
             string.Equals(pageFile, "news.html", StringComparison.OrdinalIgnoreCase))
    {
        var publicNews = NewsService.SortByLatest(
            (await NewsService.ReadAsync(newsFile)).Where(NewsService.IsPublicNewsItem));

        responseMarkup = string.Equals(pageFile, "index.html", StringComparison.OrdinalIgnoreCase)
            ? NewsSeoService.RenderHomeLatest(responseMarkup, publicNews)
            : NewsSeoService.RenderNewsList(responseMarkup, publicNews);
    }

    await WriteHtmlResponseAsync(context, responseMarkup);
});

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
app.UseStaticFiles(new StaticFileOptions { ContentTypeProvider = staticFileContentTypes });

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

// ============================================================
// 小工具方法:讀取靜態檔案內容、把 HTML 字串寫回 response
// ============================================================
static async Task<string> ReadFileAsync(Microsoft.Extensions.FileProviders.IFileInfo file, CancellationToken cancellationToken)
{
    using var stream = file.CreateReadStream();
    using var reader = new StreamReader(stream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true);
    return await reader.ReadToEndAsync(cancellationToken);
}

static async Task WriteHtmlResponseAsync(HttpContext context, string html)
{
    var bytes = Encoding.UTF8.GetBytes(html);
    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.ContentLength = bytes.Length;
    await context.Response.Body.WriteAsync(bytes, context.RequestAborted);
}
