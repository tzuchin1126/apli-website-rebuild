using System.Text;
using System.Text.Json;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Http.Timeouts;
using Serilog;
using Serilog.Events;
using apli_website_rebuild.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// 檔案 Log 只收 Warning 以上，每日或達 10 MB 時換檔，最多保留 14 天／14 個檔案。
builder.Host.UseSerilog((context, services, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File(
        Path.Combine(context.HostingEnvironment.ContentRootPath, "App_Data", "logs", "apli-.log"),
        restrictedToMinimumLevel: LogEventLevel.Warning,
        rollingInterval: RollingInterval.Day,
        fileSizeLimitBytes: 10 * 1024 * 1024,
        rollOnFileSizeLimit: true,
        retainedFileCountLimit: 14,
        retainedFileTimeLimit: TimeSpan.FromDays(14),
        shared: true));

var adminUsername = builder.Configuration["Admin:Username"];
var adminPassword = builder.Configuration["Admin:Password"];
if (string.IsNullOrWhiteSpace(adminUsername) || string.IsNullOrWhiteSpace(adminPassword))
{
    throw new InvalidOperationException(
        "Admin credentials are not configured. Set Admin__Username and Admin__Password.");
}

if (!builder.Environment.IsDevelopment())
{
    var allowedHosts = builder.Configuration["AllowedHosts"];
    if (string.IsNullOrWhiteSpace(allowedHosts) || allowedHosts == "*")
    {
        throw new InvalidOperationException(
            "Production AllowedHosts is not configured. Set it to the real website host names.");
    }
}

var cookieSecurePolicy = builder.Environment.IsDevelopment()
    ? CookieSecurePolicy.SameAsRequest
    : CookieSecurePolicy.Always;

builder.Services.AddRazorPages();
builder.Services.AddDistributedMemoryCache();
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
        options.Events.OnRedirectToLogin = context =>
        {
            if (context.Request.Path.StartsWithSegments("/api"))
            {
                // API 未授權時記錄來源，不把使用者導向 HTML 登入頁。
                var logger = context.HttpContext.RequestServices
                    .GetRequiredService<ILoggerFactory>()
                    .CreateLogger("ApliWebsite.Authorization");
                logger.LogWarning(
                    "未授權存取 API。來源 IP：{SourceIp}，請求路徑：{RequestPath}",
                    context.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                    context.Request.Path.ToString());
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
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = (context, _) =>
    {
        // Rate Limiter 拒絕請求時，記錄來源 IP 與路徑以利追查。
        var logger = context.HttpContext.RequestServices
            .GetRequiredService<ILoggerFactory>()
            .CreateLogger("ApliWebsite.RateLimiter");
        logger.LogWarning(
            "Rate Limiter 已拒絕請求。來源 IP：{SourceIp}，請求路徑：{RequestPath}",
            context.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            context.HttpContext.Request.Path.ToString());
        return ValueTask.CompletedTask;
    };
    options.AddPolicy("admin-login", context =>
    {
        var address = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(
            address,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
                AutoReplenishment = true
            });
    });
    options.AddPolicy("public-api", context =>
    {
        var address = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(
            address,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 60,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
                AutoReplenishment = true
            });
    });
    options.AddPolicy("admin-api", context =>
    {
        var address = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(
            address,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 60,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
                AutoReplenishment = true
            });
    });
});

var app = builder.Build();
var root = app.Environment.ContentRootPath;
var configuredDataRoot = builder.Configuration["Apli:DataRoot"];
string dataRoot;
if (string.IsNullOrWhiteSpace(configuredDataRoot))
{
    if (!app.Environment.IsDevelopment())
    {
        throw new InvalidOperationException(
            "Production Apli:DataRoot is not configured. Set it to a directory outside the published website.");
    }

    dataRoot = root;
}
else
{
    dataRoot = Path.GetFullPath(configuredDataRoot, root);
}

var webRoot = Path.GetFullPath(Path.Combine(root, "wwwroot"));
if (!app.Environment.IsDevelopment() &&
    (string.Equals(dataRoot, webRoot, StringComparison.OrdinalIgnoreCase) ||
     dataRoot.StartsWith($"{webRoot}{Path.DirectorySeparatorChar}", StringComparison.OrdinalIgnoreCase)))
{
    throw new InvalidOperationException(
        "Production Apli:DataRoot must be outside the published wwwroot directory.");
}

var newsFile = string.IsNullOrWhiteSpace(configuredDataRoot)
    ? Path.Combine(root, "wwwroot", "data", "news.json")
    : Path.Combine(dataRoot, "news.json");
var categoriesFile = string.IsNullOrWhiteSpace(configuredDataRoot)
    ? Path.Combine(root, "wwwroot", "data", "news-categories.json")
    : Path.Combine(dataRoot, "news-categories.json");
var uploadsRoot = string.IsNullOrWhiteSpace(configuredDataRoot)
    ? Path.Combine(root, "App_Data", "news")
    : Path.Combine(dataRoot, "news");
var imageUploadsRoot = Path.Combine(uploadsRoot, "images");
var defaultCategories = new[] { "營運公告", "費率公告", "職缺公告" };
// blob: 僅開放給後台在本機解碼待壓縮圖片；其他 CSP 資源類型維持原限制。
const string contentSecurityPolicy = "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-src https://www.google.com;";

Directory.CreateDirectory(Path.GetDirectoryName(newsFile)!);
Directory.CreateDirectory(uploadsRoot);
Directory.CreateDirectory(imageUploadsRoot);
if (!File.Exists(categoriesFile))
{
    await using var stream = File.Create(categoriesFile);
    await JsonSerializer.SerializeAsync(
        stream,
        defaultCategories,
        new JsonSerializerOptions { WriteIndented = true });
}
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseWhen(
        context => !context.Request.Path.StartsWithSegments("/api"),
        publicPages => publicPages.UseExceptionHandler("/500.html"));
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.Use(async (context, next) =>
{
    context.Response.Headers["Content-Security-Policy"] = contentSecurityPolicy;
    context.Response.Headers["X-Frame-Options"] = "DENY";
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";
    await next();
});

if (!app.Environment.IsDevelopment())
    app.UseHttpsRedirection();

var publicPagePaths = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
{
    ["/"] = "index.html",
    ["/about"] = "about.html",
    ["/affiliates"] = "affiliates.html",
    ["/contact"] = "contact.html",
    ["/join"] = "join.html",
    ["/milestones"] = "milestones.html",
    ["/news"] = "news.html",
    ["/news-detail"] = "news-detail.html",
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
    ["/join.html"] = "/join",
    ["/milestones.html"] = "/milestones",
    ["/news.html"] = "/news",
    ["/news-detail.html"] = "/news-detail",
    ["/occupational-safety.html"] = "/occupational-safety",
    ["/operational-resources.html"] = "/operational-resources",
    ["/privacy.html"] = "/privacy",
    ["/services.html"] = "/services"
};

const string sharedFooterMarker = "<!-- shared-site-footer -->";
var sharedFooterPath = Path.Combine(app.Environment.ContentRootPath, "Pages", "Shared", "_Footer.cshtml");

app.UseStatusCodePages(async statusCodeContext =>
{
    var httpContext = statusCodeContext.HttpContext;
    var statusCode = httpContext.Response.StatusCode;
    var isApiRequest = httpContext.Request.Path.StartsWithSegments("/api");
    if (isApiRequest || statusCode is not (StatusCodes.Status404NotFound or StatusCodes.Status500InternalServerError))
        return;

    var pagePath = $"{statusCode}.html";
    var staticPage = app.Environment.WebRootFileProvider.GetFileInfo(pagePath);
    if (!staticPage.Exists)
        return;

    var footerMarkup = await File.ReadAllTextAsync(sharedFooterPath, httpContext.RequestAborted);
    using var staticPageStream = staticPage.CreateReadStream();
    using var reader = new StreamReader(staticPageStream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true);
    var pageMarkup = await reader.ReadToEndAsync(httpContext.RequestAborted);
    var responseMarkup = pageMarkup.Replace(sharedFooterMarker, footerMarkup, StringComparison.Ordinal);
    var responseBytes = Encoding.UTF8.GetBytes(responseMarkup);
    httpContext.Response.ContentType = "text/html; charset=utf-8";
    httpContext.Response.ContentLength = responseBytes.Length;
    await httpContext.Response.Body.WriteAsync(responseBytes, httpContext.RequestAborted);
});

app.Use(async (context, next) =>
{
    var requestPath = context.Request.Path.Value ?? string.Empty;

    if (HttpMethods.IsGet(context.Request.Method) && legacyPageRedirects.TryGetValue(requestPath, out var canonicalPath))
    {
        context.Response.Redirect($"{canonicalPath}{context.Request.QueryString}", permanent: true);
        return;
    }

    if (!HttpMethods.IsGet(context.Request.Method) || !publicPagePaths.TryGetValue(requestPath, out var pageFile))
    {
        await next();
        return;
    }

    var staticPage = app.Environment.WebRootFileProvider.GetFileInfo(pageFile);

    if (!staticPage.Exists)
    {
        await next();
        return;
    }

    var footerMarkup = await File.ReadAllTextAsync(sharedFooterPath, context.RequestAborted);
    using var staticPageStream = staticPage.CreateReadStream();
    using var reader = new StreamReader(staticPageStream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true);
    var pageMarkup = await reader.ReadToEndAsync(context.RequestAborted);

    if (!pageMarkup.Contains(sharedFooterMarker, StringComparison.Ordinal))
    {
        await next();
        return;
    }

    var responseMarkup = pageMarkup.Replace(sharedFooterMarker, footerMarkup, StringComparison.Ordinal);
    var responseBytes = Encoding.UTF8.GetBytes(responseMarkup);
    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.ContentLength = responseBytes.Length;
    await context.Response.Body.WriteAsync(responseBytes, context.RequestAborted);
});

app.UseDefaultFiles();
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

var staticFileContentTypes = new FileExtensionContentTypeProvider();
staticFileContentTypes.Mappings[".avif"] = "image/avif";
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = staticFileContentTypes
});

app.UseSession();
app.UseRouting();
app.UseRequestTimeouts();

app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();

app.MapGet("/news/{id}", (string id) =>
    Results.Redirect($"/news-detail?id={Uri.EscapeDataString(id)}", permanent: true));

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
