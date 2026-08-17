using System.Globalization;
using System.IO.Compression;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http.Features;
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
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.Name = "ap-admin-captcha";
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.Strict;
    // 暫時支援 IIS HTTP:8080 測試；正式環境改回 Always 並使用 HTTPS。
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
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
        // 暫時支援 IIS HTTP:8080 測試；正式環境改回 Always 並使用 HTTPS。
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
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
    // 暫時支援 IIS HTTP:8080 測試；正式環境改回 Always 並使用 HTTPS。
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
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
var uploadsRoot = Path.Combine(root, "App_Data", "news");
var defaultCategories = new[] { "營運公告", "費率公告", "職缺公告" };
const string captchaSessionKey = "admin-login-captcha";
const long maxUploadRequestBytes = 16 * 1024 * 1024;
var newsWriteLock = new SemaphoreSlim(1, 1);
var categoriesWriteLock = new SemaphoreSlim(1, 1);

Directory.CreateDirectory(Path.GetDirectoryName(newsFile)!);
Directory.CreateDirectory(uploadsRoot);
if (!File.Exists(categoriesFile))
    await WriteCategories(defaultCategories);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseWhen(
        context => !context.Request.Path.StartsWithSegments("/api"),
        publicPages => publicPages.UseExceptionHandler("/500.html"));
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

if (!app.Environment.IsDevelopment())
    app.UseHttpsRedirection();

var sharedFooterPages = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
{
    "/404.html",
    "/500.html",
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
var staticFileContentTypes = new FileExtensionContentTypeProvider();
staticFileContentTypes.Mappings[".avif"] = "image/avif";
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = staticFileContentTypes
});

app.UseSession();
app.UseRouting();

app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();

var staticPageRedirects = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
{
    ["/index"] = "/index.html",
    ["/about"] = "/about.html",
    ["/milestones"] = "/milestones.html",
    ["/operational-resources"] = "/operational-resources.html",
    ["/occupational-safety"] = "/occupational-safety.html",
    ["/services"] = "/services.html",
    ["/news"] = "/news.html",
    ["/join"] = "/join.html",
    ["/affiliates"] = "/affiliates.html",
    ["/contact"] = "/contact.html",
    ["/privacy"] = "/privacy.html"
};

foreach (var redirect in staticPageRedirects)
    app.MapGet(redirect.Key, () => Results.Redirect(redirect.Value, permanent: true));

app.MapGet("/news/{id}", (string id) =>
    Results.Redirect($"/news-detail.html?id={Uri.EscapeDataString(id)}", permanent: true));

app.MapRazorPages();

app.MapGet("/api/admin/captcha", (HttpContext context) =>
{
    var code = CreateCaptchaCode();
    context.Session.SetString(captchaSessionKey, code);
    context.Response.Headers.CacheControl = "no-store, no-cache";
    context.Response.Headers.Pragma = "no-cache";
    return Results.Content(CreateCaptchaSvg(code), "image/svg+xml", Encoding.UTF8);
});

app.MapPost("/api/admin/login", async (HttpContext context, LoginRequest request, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);

    var expectedCaptcha = context.Session.GetString(captchaSessionKey);
    context.Session.Remove(captchaSessionKey);
    var usernameBytes = Encoding.UTF8.GetBytes(request.Username ?? "");
    var expectedUsernameBytes = Encoding.UTF8.GetBytes(adminUsername);
    var passwordBytes = Encoding.UTF8.GetBytes(request.Password ?? "");
    var expectedPasswordBytes = Encoding.UTF8.GetBytes(adminPassword);
    var usernameMatches = CryptographicOperations.FixedTimeEquals(usernameBytes, expectedUsernameBytes);
    var passwordMatches = CryptographicOperations.FixedTimeEquals(passwordBytes, expectedPasswordBytes);
    var captchaMatches = FixedTimeTextEquals(expectedCaptcha, request.Captcha);

    if (!usernameMatches || !passwordMatches || !captchaMatches)
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

app.MapGet("/api/news", async () => Results.Ok(SortNewsByLatest(await NewsService.ReadAsync(newsFile))))
    .RequireAuthorization();

app.MapPost("/api/news/save", async (HttpContext context, IAntiforgery antiforgery) =>
{
    await antiforgery.ValidateRequestAsync(context);
    if (context.Features.Get<IHttpMaxRequestBodySizeFeature>() is { IsReadOnly: false } requestLimit)
        requestLimit.MaxRequestBodySize = maxUploadRequestBytes;

    var requestData = await ReadNewsSaveRequestAsync(context);
    if (requestData is null)
        return Results.BadRequest("無法讀取消息資料。");

    var item = requestData.Item;

    if (!DateOnly.TryParseExact(item.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
        return Results.BadRequest("日期格式必須是 yyyy-MM-dd。");
    if (string.IsNullOrWhiteSpace(item.Title) || item.Title.Length > 200)
        return Results.BadRequest("標題必填且不可超過 200 字。");
    if ((item.Content ?? "").Length > 50000)
        return Results.BadRequest("內文不可超過 50,000 字。");
    if ((item.Tag ?? "").Length > 50)
        return Results.BadRequest("分類不可超過 50 字。");

    await newsWriteLock.WaitAsync();
    try
    {
        var news = await NewsService.ReadAsync(newsFile);
        var existingIndex = news.FindIndex(entry => entry.Id == item.Id);
        var existingItem = existingIndex >= 0 ? news[existingIndex] : null;
        var previousImageUrl = existingItem?.ImageUrl ?? item.ImageUrl;
        var previousAttachmentUrl = existingItem?.Url ?? item.Url;

        try
        {
            if (requestData.ImageFile is not null)
            {
                var upload = await SaveImageDataUrlAsync(requestData.ImageFile);
                item.ImageUrl = upload.Url;
                item.ImageName = upload.OriginalName;
            }
            else if (requestData.RemoveImage)
            {
                item.ImageUrl = "";
                item.ImageName = "";
            }
            else if (existingItem is not null)
            {
                item.ImageUrl = existingItem.ImageUrl;
                item.ImageName = existingItem.ImageName;
            }

            if (requestData.AttachmentFile is not null)
            {
                var upload = await SaveUploadAsync(requestData.AttachmentFile, uploadsRoot, UploadKind.Attachment);
                item.Url = upload.Url;
                item.AttachmentName = upload.OriginalName;
            }
            else if (requestData.RemoveAttachment)
            {
                item.Url = "";
                item.AttachmentName = "";
            }
            else if (existingItem is not null)
            {
                item.Url = existingItem.Url;
                item.AttachmentName = existingItem.AttachmentName;
            }
        }
        catch (UploadValidationException exception)
        {
            return Results.BadRequest(exception.Message);
        }

        var now = DateTimeOffset.UtcNow.ToOffset(TimeSpan.FromHours(8)).ToString("yyyy-MM-dd HH:mm:ss zzz");
        if (string.IsNullOrWhiteSpace(item.Id))
        {
            item.Id = Guid.NewGuid().ToString("N");
            item.CreatedAt = now;
        }

        item.UpdatedAt = now;
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

        news = SortNewsByLatest(news);
        await NewsService.WriteAsync(newsFile, news);
        DeleteUnusedUpload(previousImageUrl, item.ImageUrl, news, uploadsRoot);
        DeleteUnusedUpload(previousAttachmentUrl, item.Url, news, uploadsRoot);
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

app.MapGet("/api/uploads/news/{fileName}", async (HttpContext context, string fileName) =>
{
    if (Path.GetFileName(fileName) != fileName)
        return Results.BadRequest("檔案名稱無效。");

    var filePath = Path.Combine(uploadsRoot, fileName);
    if (!File.Exists(filePath))
        return Results.NotFound();

    var publicPath = $"/api/uploads/news/{fileName}";
    var isAuthenticated = context.User.Identity?.IsAuthenticated == true;
    if (!isAuthenticated)
    {
        var news = await NewsService.ReadAsync(newsFile);
        var isPublishedReference = news.Any(item => item.Published &&
            (string.Equals(item.ImageUrl, publicPath, StringComparison.Ordinal) ||
             string.Equals(item.Url, publicPath, StringComparison.Ordinal)));
        if (!isPublishedReference)
            return Results.NotFound();
    }

    context.Response.Headers.CacheControl = "private, no-store";
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    return Results.File(filePath, GetUploadContentType(fileName), enableRangeProcessing: true);
});

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

async Task<NewsSaveRequest?> ReadNewsSaveRequestAsync(HttpContext context)
{
    if (context.Request.HasFormContentType)
    {
        var form = await context.Request.ReadFormAsync(context.RequestAborted);
        var published = !bool.TryParse(form["published"].ToString(), out var parsedPublished) || parsedPublished;
        var item = new NewsItem
        {
            Id = form["id"].ToString(),
            Date = form["date"].ToString(),
            Tag = form["tag"].ToString(),
            Title = form["title"].ToString(),
            Content = form["content"].ToString(),
            Url = form["url"].ToString(),
            ImageUrl = form["imageUrl"].ToString(),
            ImageName = form["imageName"].ToString(),
            AttachmentName = form["attachmentName"].ToString(),
            Published = published
        };

        return new NewsSaveRequest(
            item,
            form.Files.GetFile("image"),
            form.Files.GetFile("attachment"),
            bool.TryParse(form["removeImage"].ToString(), out var removeImage) && removeImage,
            bool.TryParse(form["removeAttachment"].ToString(), out var removeAttachment) && removeAttachment);
    }

    try
    {
        var item = await JsonSerializer.DeserializeAsync<NewsItem>(
            context.Request.Body,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true },
            context.RequestAborted);
        return item is null ? null : new NewsSaveRequest(item, null, null, false, false);
    }
    catch (JsonException)
    {
        return null;
    }
}

string CreateCaptchaCode()
{
    const string characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var builder = new StringBuilder(5);
    for (var index = 0; index < 5; index++)
        builder.Append(characters[RandomNumberGenerator.GetInt32(characters.Length)]);
    return builder.ToString();
}

string CreateCaptchaSvg(string code)
{
    var svg = new StringBuilder("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"260\" height=\"82\" viewBox=\"0 0 260 82\" role=\"img\" aria-label=\"圖形驗證碼\">");
    svg.Append("<rect width=\"260\" height=\"82\" rx=\"8\" fill=\"#f1f4f6\"/>");
    for (var index = 0; index < 9; index++)
    {
        var x1 = RandomNumberGenerator.GetInt32(0, 260);
        var y1 = RandomNumberGenerator.GetInt32(8, 74);
        var x2 = RandomNumberGenerator.GetInt32(0, 260);
        var y2 = RandomNumberGenerator.GetInt32(8, 74);
        var color = index % 2 == 0 ? "#9eb2bc" : "#d2a36a";
        svg.Append($"<path d=\"M{x1} {y1} Q130 {RandomNumberGenerator.GetInt32(0, 82)} {x2} {y2}\" fill=\"none\" stroke=\"{color}\" stroke-width=\"{RandomNumberGenerator.GetInt32(1, 3)}\" opacity=\".7\"/>");
    }

    for (var index = 0; index < code.Length; index++)
    {
        var x = 28 + index * 48;
        var y = RandomNumberGenerator.GetInt32(49, 62);
        var rotation = RandomNumberGenerator.GetInt32(-12, 13);
        svg.Append($"<text x=\"{x}\" y=\"{y}\" transform=\"rotate({rotation} {x} {y})\" fill=\"#34495e\" font-family=\"Arial, sans-serif\" font-size=\"31\" font-weight=\"700\">{code[index]}</text>");
    }

    svg.Append("</svg>");
    return svg.ToString();
}

bool FixedTimeTextEquals(string? expected, string? actual)
{
    if (string.IsNullOrWhiteSpace(expected) || string.IsNullOrWhiteSpace(actual))
        return false;

    var expectedBytes = Encoding.UTF8.GetBytes(expected.Trim().ToUpperInvariant());
    var actualBytes = Encoding.UTF8.GetBytes(actual.Trim().ToUpperInvariant());
    return expectedBytes.Length == actualBytes.Length &&
           CryptographicOperations.FixedTimeEquals(expectedBytes, actualBytes);
}

async Task<SavedUpload> SaveImageDataUrlAsync(IFormFile file)
{
    var originalName = Path.GetFileName(file.FileName).Trim();
    var extension = Path.GetExtension(originalName).ToLowerInvariant();
    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
    const long maxImageSize = 5 * 1024 * 1024;

    if (file.Length <= 0 || file.Length > maxImageSize)
        throw new UploadValidationException("公告圖片必須小於 5 MB。");
    if (string.IsNullOrWhiteSpace(originalName) || originalName.Length > 180 || !allowedExtensions.Contains(extension))
        throw new UploadValidationException("公告圖片僅支援 JPG、PNG 或 WebP。");

    await using var input = file.OpenReadStream();
    using var memory = new MemoryStream((int)file.Length);
    await input.CopyToAsync(memory);
    var bytes = memory.ToArray();
    ValidateImageSignature(bytes, extension);

    var mimeType = GetUploadContentType($"image{extension}");
    var dataUrl = $"data:{mimeType};base64,{Convert.ToBase64String(bytes)}";
    return new SavedUpload(dataUrl, originalName);
}

void ValidateImageSignature(byte[] bytes, string extension)
{
    static bool StartsWith(byte[] source, params byte[] prefix) =>
        source.Length >= prefix.Length && source.AsSpan(0, prefix.Length).SequenceEqual(prefix);

    var isJpeg = (extension is ".jpg" or ".jpeg") && StartsWith(bytes, 0xff, 0xd8, 0xff);
    var isPng = extension == ".png" && StartsWith(bytes, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
    var isWebp = extension == ".webp" && bytes.Length >= 12 &&
        StartsWith(bytes, 0x52, 0x49, 0x46, 0x46) && bytes.AsSpan(8, 4).SequenceEqual("WEBP"u8);

    if (!isJpeg && !isPng && !isWebp)
        throw new UploadValidationException("公告圖片內容格式不正確。");
}

async Task<SavedUpload> SaveUploadAsync(IFormFile file, string directory, UploadKind kind)
{
    var originalName = Path.GetFileName(file.FileName).Trim();
    var extension = Path.GetExtension(originalName).ToLowerInvariant();
    var allowedExtensions = kind == UploadKind.Image
        ? new[] { ".jpg", ".jpeg", ".png", ".webp" }
        : new[] { ".pdf", ".doc", ".docx", ".xls", ".xlsx" };
    var maxSize = kind == UploadKind.Image ? 5 * 1024 * 1024 : 10 * 1024 * 1024;

    if (file.Length <= 0 || file.Length > maxSize)
        throw new UploadValidationException(kind == UploadKind.Image ? "公告圖片必須小於 5 MB。" : "附件必須小於 10 MB。");
    if (string.IsNullOrWhiteSpace(originalName) || originalName.Length > 180 || !allowedExtensions.Contains(extension))
        throw new UploadValidationException(kind == UploadKind.Image
            ? "公告圖片僅支援 JPG、PNG 或 WebP。"
            : "附件僅支援 PDF、Word 或 Excel 檔案。");

    var storedName = $"{Guid.NewGuid():N}{extension}";
    var finalPath = Path.Combine(directory, storedName);
    var temporaryPath = finalPath + ".tmp";
    try
    {
        await using (var stream = File.Create(temporaryPath))
            await file.CopyToAsync(stream);

        await ValidateUploadSignatureAsync(temporaryPath, extension, kind);
        File.Move(temporaryPath, finalPath);
        return new SavedUpload($"/api/uploads/news/{storedName}", originalName);
    }
    catch
    {
        if (File.Exists(temporaryPath))
            File.Delete(temporaryPath);
        throw;
    }
}

async Task ValidateUploadSignatureAsync(string path, string extension, UploadKind kind)
{
    await using var stream = File.OpenRead(path);
    var header = new byte[12];
    var bytesRead = await stream.ReadAsync(header);

    static bool StartsWith(byte[] source, params byte[] prefix) =>
        source.Length >= prefix.Length && source.AsSpan(0, prefix.Length).SequenceEqual(prefix);

    if (kind == UploadKind.Image)
    {
        var isJpeg = (extension is ".jpg" or ".jpeg") && StartsWith(header, 0xff, 0xd8, 0xff);
        var isPng = extension == ".png" && StartsWith(header, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
        var isWebp = extension == ".webp" && StartsWith(header, 0x52, 0x49, 0x46, 0x46) && header.AsSpan(8, 4).SequenceEqual("WEBP"u8);
        if (!isJpeg && !isPng && !isWebp)
            throw new UploadValidationException("公告圖片內容格式不正確。");
        return;
    }

    var isPdf = extension == ".pdf" && StartsWith(header, 0x25, 0x50, 0x44, 0x46, 0x2d);
    var isOle = (extension is ".doc" or ".xls") && StartsWith(header, 0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1);
    if (isPdf || isOle)
        return;

    if (extension is ".docx" or ".xlsx")
    {
        try
        {
            using var archive = ZipFile.OpenRead(path);
            var hasContentTypes = archive.GetEntry("[Content_Types].xml") is not null;
            var hasExpectedDocument = extension == ".docx"
                ? archive.Entries.Any(entry => entry.FullName.StartsWith("word/", StringComparison.OrdinalIgnoreCase))
                : archive.Entries.Any(entry => entry.FullName.StartsWith("xl/", StringComparison.OrdinalIgnoreCase));
            if (hasContentTypes && hasExpectedDocument)
                return;
        }
        catch (InvalidDataException)
        {
        }
    }

    _ = bytesRead;
    throw new UploadValidationException("附件內容格式不正確。");
}

void DeleteUnusedUpload(string? previousUrl, string? currentUrl, IReadOnlyCollection<NewsItem> news, string directory)
{
    if (string.IsNullOrWhiteSpace(previousUrl) || string.Equals(previousUrl, currentUrl, StringComparison.Ordinal))
        return;
    if (!previousUrl.StartsWith("/api/uploads/news/", StringComparison.Ordinal))
        return;
    if (news.Any(item => string.Equals(item.ImageUrl, previousUrl, StringComparison.Ordinal) || string.Equals(item.Url, previousUrl, StringComparison.Ordinal)))
        return;

    var fileName = previousUrl["/api/uploads/news/".Length..];
    if (Path.GetFileName(fileName) == fileName)
        File.Delete(Path.Combine(directory, fileName));
}

List<NewsItem> SortNewsByLatest(IEnumerable<NewsItem> items) => items
    .OrderByDescending(item => ParseNewsCreatedAt(item.CreatedAt))
    .ThenByDescending(item => item.Date)
    .ThenByDescending(item => item.Id)
    .ToList();

DateTimeOffset ParseNewsCreatedAt(string value) =>
    DateTimeOffset.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.None, out var createdAt)
        ? createdAt
        : DateTimeOffset.MinValue;

string GetUploadContentType(string fileName) => Path.GetExtension(fileName).ToLowerInvariant() switch
{
    ".jpg" or ".jpeg" => "image/jpeg",
    ".png" => "image/png",
    ".webp" => "image/webp",
    ".pdf" => "application/pdf",
    ".doc" => "application/msword",
    ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xls" => "application/vnd.ms-excel",
    ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    _ => "application/octet-stream"
};

record LoginRequest(string? Username, string? Password, string? Captcha);
record CategoryRequest(string? Name);
record NewsSaveRequest(NewsItem Item, IFormFile? ImageFile, IFormFile? AttachmentFile, bool RemoveImage, bool RemoveAttachment);
record SavedUpload(string Url, string OriginalName);
enum UploadKind { Image, Attachment }
sealed class UploadValidationException(string message) : Exception(message);
