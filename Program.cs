using System.Globalization;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.StaticFiles;
using apli_website_rebuild.Services;

var builder = WebApplication.CreateBuilder(args);

var adminUsername = builder.Configuration["Admin:Username"];
var adminPassword = builder.Configuration["Admin:Password"];
if (string.IsNullOrWhiteSpace(adminUsername) || string.IsNullOrWhiteSpace(adminPassword))
{
    throw new InvalidOperationException(
        "Admin credentials are not configured. Set Admin__Username and Admin__Password.");
}

builder.Services.AddRazorPages();
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Admin";
        options.Cookie.Name = "ap-admin";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
            ? CookieSecurePolicy.SameAsRequest
            : CookieSecurePolicy.Always;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
        options.SlidingExpiration = true;
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
    options.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
        ? CookieSecurePolicy.SameAsRequest
        : CookieSecurePolicy.Always;
});
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
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
});

var app = builder.Build();
var root = app.Environment.ContentRootPath;
var newsFile = Path.Combine(root, "wwwroot", "data", "news.json");
var categoriesFile = Path.Combine(root, "wwwroot", "data", "news-categories.json");
var defaultCategories = new[] { "營運公告", "費率公告", "職缺公告" };
var newsWriteLock = new SemaphoreSlim(1, 1);
var categoriesWriteLock = new SemaphoreSlim(1, 1);

Directory.CreateDirectory(Path.GetDirectoryName(newsFile)!);
if (!File.Exists(categoriesFile))
    await WriteCategories(defaultCategories);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

if (!app.Environment.IsDevelopment())
    app.UseHttpsRedirection();

var sharedFooterPages = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
{
    "/index.html",
    "/about.html",
    "/affiliates.html",
    "/contact.html",
    "/join.html",
    "/milestones.html",
    "/news-detail.html",
    "/news.html",
    "/occupational-safety.html",
    "/operational-resources.html",
    "/privacy.html",
    "/services.html"
};

const string sharedFooterMarker = "<!-- shared-site-footer -->";

app.Use(async (context, next) =>
{
    var requestPath = context.Request.Path.Value ?? string.Empty;
    var pagePath = requestPath == "/" ? "/index.html" : requestPath;

    if (!HttpMethods.IsGet(context.Request.Method) || !sharedFooterPages.Contains(pagePath))
    {
        await next();
        return;
    }

    var staticPage = app.Environment.WebRootFileProvider.GetFileInfo(pagePath.TrimStart('/'));

    if (!staticPage.Exists)
    {
        await next();
        return;
    }

    var footerPath = Path.Combine(app.Environment.ContentRootPath, "Pages", "Shared", "_Footer.cshtml");
    var footerMarkup = await File.ReadAllTextAsync(footerPath, context.RequestAborted);
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
var staticFileContentTypes = new FileExtensionContentTypeProvider();
staticFileContentTypes.Mappings[".avif"] = "image/avif";
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = staticFileContentTypes
});

app.UseRouting();

app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();

app.MapRazorPages();

app.MapPost("/api/admin/login", async (HttpContext context, LoginRequest request, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);

    var usernameBytes = Encoding.UTF8.GetBytes(request.Username ?? "");
    var expectedUsernameBytes = Encoding.UTF8.GetBytes(adminUsername);
    var passwordBytes = Encoding.UTF8.GetBytes(request.Password ?? "");
    var expectedPasswordBytes = Encoding.UTF8.GetBytes(adminPassword);
    var usernameMatches = CryptographicOperations.FixedTimeEquals(usernameBytes, expectedUsernameBytes);
    var passwordMatches = CryptographicOperations.FixedTimeEquals(passwordBytes, expectedPasswordBytes);

    if (!usernameMatches || !passwordMatches)
        return Results.Unauthorized();

    var claims = new[] { new Claim(ClaimTypes.Name, adminUsername) };
    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
    await context.SignInAsync(
        CookieAuthenticationDefaults.AuthenticationScheme,
        new ClaimsPrincipal(identity));

    return Results.Ok();
}).RequireRateLimiting("admin-login");

app.MapPost("/api/admin/logout", async (HttpContext context, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);
    await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/api/admin/session", (HttpContext context) =>
    context.User.Identity?.IsAuthenticated == true
        ? Results.Ok()
        : Results.Unauthorized());

app.MapGet("/api/news", async () => Results.Ok(await NewsService.ReadAsync(newsFile)))
    .RequireAuthorization();

app.MapPost("/api/news/save", async (HttpContext context, NewsItem item, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);

    if (!DateOnly.TryParseExact(item.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
        return Results.BadRequest("日期格式必須是 yyyy-MM-dd。");
    if (string.IsNullOrWhiteSpace(item.Title) || item.Title.Length > 200)
        return Results.BadRequest("標題必填且不可超過 200 字。");
    if (item.Content.Length > 50000)
        return Results.BadRequest("內文不可超過 50,000 字。");
    if (item.Tag.Length > 50)
        return Results.BadRequest("分類不可超過 50 字。");

    await newsWriteLock.WaitAsync();
    try
    {
        var news = await NewsService.ReadAsync(newsFile);
        var now = DateTimeOffset.UtcNow.ToOffset(TimeSpan.FromHours(8)).ToString("yyyy-MM-dd HH:mm:ss zzz");
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = Guid.NewGuid().ToString("N");
            item.CreatedAt = now;
        }

        item.UpdatedAt = now;
        var existingIndex = news.FindIndex(entry => entry.Id == item.Id);
        if (existingIndex >= 0)
        {
            item.CreatedAt = string.IsNullOrWhiteSpace(news[existingIndex].CreatedAt)
                ? item.CreatedAt
                : news[existingIndex].CreatedAt;
            news[existingIndex] = item;
        }
        else
        {
            item.CreatedAt = string.IsNullOrWhiteSpace(item.CreatedAt) ? now : item.CreatedAt;
            news.Add(item);
        }

        news = news.OrderByDescending(entry => entry.Date).ThenByDescending(entry => entry.Id).ToList();
        await NewsService.WriteAsync(newsFile, news);
        return Results.Ok(item);
    }
    finally
    {
        newsWriteLock.Release();
    }
}).RequireAuthorization();

app.MapDelete("/api/news/delete/{id}", async (HttpContext context, string id, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);
    await newsWriteLock.WaitAsync();
    try
    {
        var news = await NewsService.ReadAsync(newsFile);
        if (news.RemoveAll(item => item.Id == id) == 0)
            return Results.NotFound();

        await NewsService.WriteAsync(newsFile, news);
        return Results.Ok();
    }
    finally
    {
        newsWriteLock.Release();
    }
}).RequireAuthorization();

app.MapGet("/api/news/categories", async () => Results.Ok(await ReadCategories()));

app.MapPost("/api/news/categories", async (CategoryRequest request, HttpContext context, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);
    var name = request.Name?.Trim() ?? "";
    if (string.IsNullOrWhiteSpace(name) || name.Length > 50)
        return Results.BadRequest("分類必填且不可超過 50 字。");

    await categoriesWriteLock.WaitAsync();
    try
    {
        var categories = await ReadCategories();
        if (!categories.Contains(name, StringComparer.Ordinal))
            categories.Add(name);
        await WriteCategories(categories);
        return Results.Ok(categories);
    }
    finally
    {
        categoriesWriteLock.Release();
    }
}).RequireAuthorization();

app.MapDelete("/api/news/categories/{name}", async (string name, HttpContext context, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);
    await categoriesWriteLock.WaitAsync();
    try
    {
        var categories = await ReadCategories();
        if (categories.Remove(name) is false)
            return Results.NotFound();
        await WriteCategories(categories);
        return Results.Ok(categories);
    }
    finally
    {
        categoriesWriteLock.Release();
    }
}).RequireAuthorization();

app.Run();

async Task<List<string>> ReadCategories()
{
    if (!File.Exists(categoriesFile))
        return defaultCategories.ToList();

    await using var stream = File.OpenRead(categoriesFile);
    return await System.Text.Json.JsonSerializer.DeserializeAsync<List<string>>(stream) ?? defaultCategories.ToList();
}

async Task WriteCategories(IEnumerable<string> categories)
{
    await using var stream = File.Create(categoriesFile);
    await System.Text.Json.JsonSerializer.SerializeAsync(stream, categories.ToList(), new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
}

record LoginRequest(string? Username, string? Password);
record CategoryRequest(string? Name);
