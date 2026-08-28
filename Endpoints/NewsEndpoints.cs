using System.Globalization;
using System.IO.Compression;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http.Features;
using apli_website_rebuild.Models;
using apli_website_rebuild.Services;

namespace apli_website_rebuild.Endpoints;

public sealed class NewsEndpointOptions
{
    public NewsEndpointOptions(
        string adminUsername,
        string adminPassword,
        string newsFile,
        string categoriesFile,
        string uploadsRoot,
        string imageUploadsRoot,
        IReadOnlyList<string> defaultCategories)
    {
        AdminUsername = adminUsername;
        AdminPassword = adminPassword;
        NewsFile = newsFile;
        CategoriesFile = categoriesFile;
        UploadsRoot = uploadsRoot;
        ImageUploadsRoot = imageUploadsRoot;
        DefaultCategories = defaultCategories;
    }

    public string AdminUsername { get; }
    public string AdminPassword { get; }
    public string NewsFile { get; }
    public string CategoriesFile { get; }
    public string UploadsRoot { get; }
    public string ImageUploadsRoot { get; }
    public IReadOnlyList<string> DefaultCategories { get; }

    // 存檔的時候上鎖,避免兩個請求同時寫檔案把資料寫壞
    public SemaphoreSlim NewsWriteLock { get; } = new(1, 1);
    public SemaphoreSlim CategoriesWriteLock { get; } = new(1, 1);
}

public static class NewsEndpoints
{
    public static void Map(WebApplication app, NewsEndpointOptions options)
    {
        var adminUsername = options.AdminUsername;
        var adminPassword = options.AdminPassword;
        var newsFile = options.NewsFile;
        var categoriesFile = options.CategoriesFile;
        var uploadsRoot = options.UploadsRoot;
        var imageUploadsRoot = options.ImageUploadsRoot;
        var defaultCategories = options.DefaultCategories;
        var newsWriteLock = options.NewsWriteLock;
        var categoriesWriteLock = options.CategoriesWriteLock;

        const string captchaSessionKey = "admin-login-captcha";
        const long maxUploadRequestBytes = 16 * 1024 * 1024;
        const string newsUploadsUrlPrefix = "/api/uploads/news";
        const string newsImagesUrlPrefix = "/api/uploads/news/images";
        const string publicNewsApiCacheControl = "public, max-age=60, s-maxage=60, stale-while-revalidate=30";
        const string publicNewsListApiCacheControl = "no-store";
        const string publicNewsImageCacheControl = "public, max-age=604800, immutable";

        // ============================================================
        // 後台登入相關:驗證碼、登入、登出、查詢是否已登入
        // ============================================================

        app.MapGet("/api/admin/captcha", (HttpContext context) =>
        {
            var code = CreateCaptchaCode();
            context.Session.SetString(captchaSessionKey, code);
            context.Response.Headers.CacheControl = "no-store, no-cache";
            context.Response.Headers.Pragma = "no-cache";
            return Results.Content(CreateCaptchaSvg(code), "image/svg+xml", Encoding.UTF8);
        }).RequireRateLimiting("admin-login");

        app.MapPost("/api/admin/login", async (
            HttpContext context,
            LoginRequest request,
            IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);

            var expectedCaptcha = context.Session.GetString(captchaSessionKey);
            context.Session.Remove(captchaSessionKey);

            // 帳號密碼跟驗證碼都要用「固定時間比對」,防止有人靠回應時間差去猜密碼
            var usernameMatches = FixedTimeEquals(request.Username, adminUsername);
            var passwordMatches = FixedTimeEquals(request.Password, adminPassword);
            var captchaMatches = FixedTimeTextEquals(expectedCaptcha, request.Captcha);

            if (!usernameMatches || !passwordMatches || !captchaMatches)
            {
                return Results.Unauthorized();
            }

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
        }).RequireAuthorization().RequireRateLimiting("admin-api");

        app.MapGet("/api/admin/session", (HttpContext context) =>
            context.User.Identity?.IsAuthenticated == true
                ? Results.Ok()
                : Results.Unauthorized())
            .RequireRateLimiting("admin-api");

        // ============================================================
        // 新聞查詢:後台看全部、前台只看已發布的
        // ============================================================

        app.MapGet("/api/news", async () =>
            Results.Ok(SortNewsByLatest(await NewsService.ReadAsync(newsFile))))
            .RequireAuthorization()
            .RequireRateLimiting("admin-api");

        app.MapGet("/api/public/news", async (HttpContext context, int? limit) =>
        {
            var news = await NewsService.ReadAsync(newsFile);
            var orderedPublicNews = SortNewsByLatest(news.Where(NewsService.IsPublicNewsItem));
            var publicNews = limit is > 0
                ? orderedPublicNews.Take(limit.Value)
                : orderedPublicNews;
            context.Response.Headers.CacheControl = publicNewsListApiCacheControl;
            return Results.Ok(publicNews.Select(ToPublicNewsListItem));
        }).RequireRateLimiting("public-api");

        app.MapGet("/api/public/news/{id}", async (HttpContext context, string id) =>
        {
            var news = await NewsService.ReadAsync(newsFile);
            var item = news.FirstOrDefault(entry => entry.Id == id && NewsService.IsPublicNewsItem(entry));
            if (item is null)
            {
                return Results.NotFound();
            }

            context.Response.Headers.CacheControl = publicNewsApiCacheControl;
            return Results.Ok(ToPublicNewsDetailItem(item));
        }).RequireRateLimiting("public-api");

        app.MapGet("/api/public/news/categories", async (HttpContext context) =>
        {
            var news = await NewsService.ReadAsync(newsFile);
            var categories = SortNewsByLatest(news.Where(NewsService.IsPublicNewsItem))
                .Select(item => item.Tag.Trim())
                .Where(tag => !string.IsNullOrWhiteSpace(tag))
                .Distinct(StringComparer.Ordinal)
                .ToList();
            context.Response.Headers.CacheControl = publicNewsApiCacheControl;
            return Results.Ok(categories);
        }).RequireRateLimiting("public-api");

        // ============================================================
        // 新增/編輯新聞
        // ============================================================
        app.MapPost("/api/news/save", async (
            HttpContext context,
            IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);

            if (context.Features.Get<IHttpMaxRequestBodySizeFeature>() is { IsReadOnly: false } requestLimit)
            {
                requestLimit.MaxRequestBodySize = maxUploadRequestBytes;
            }

            var requestData = await ReadNewsSaveRequestAsync(context);
            if (requestData is null)
            {
                return Results.BadRequest("無法讀取消息資料。");
            }

            var item = requestData.Item;
            var validationError = ValidateNewsItem(item);
            if (validationError is not null)
            {
                return Results.BadRequest(validationError);
            }

            // 存檔要上鎖,不然兩個人同時儲存可能會互相蓋掉對方的資料
            await newsWriteLock.WaitAsync();

            // 如果中途失敗,已經存到硬碟的新檔案要記得刪掉,不要留垃圾檔案
            var newlyStoredUploadUrls = new List<string>();
            var saveCompleted = false;

            try
            {
                var news = await NewsService.ReadAsync(newsFile);

                if (string.IsNullOrWhiteSpace(item.Id))
                {
                    item.Id = NewsService.CreateUniqueId(news);
                }

                var existingIndex = news.FindIndex(entry => entry.Id == item.Id);
                var existingItem = existingIndex >= 0 ? news[existingIndex] : null;
                var previousImageUrl = existingItem?.ImageUrl ?? item.ImageUrl;
                var previousAttachmentUrl = existingItem?.Url ?? item.Url;

                try
                {
                    await ApplyImageAsync(item, existingItem, requestData, newlyStoredUploadUrls);
                    await ApplyAttachmentAsync(item, existingItem, requestData, newlyStoredUploadUrls);
                }
                catch (UploadValidationException exception)
                {
                    return Results.BadRequest(exception.Message);
                }

                ApplyTimestamps(item, existingIndex >= 0 ? news[existingIndex] : null);

                if (existingIndex >= 0)
                {
                    news[existingIndex] = item;
                }
                else
                {
                    news.Add(item);
                }

                news = SortNewsByLatest(news);
                await NewsService.WriteAsync(newsFile, news);
                saveCompleted = true;

                // 存檔成功後,把換掉的舊圖片/舊附件清掉(如果沒有其他新聞還在用它)
                DeleteUnusedUpload(previousImageUrl, item.ImageUrl, news);
                DeleteUnusedUpload(previousAttachmentUrl, item.Url, news);

                return Results.Ok(item);
            }
            finally
            {
                if (!saveCompleted)
                {
                    foreach (var uploadUrl in newlyStoredUploadUrls)
                    {
                        DeleteStoredUpload(uploadUrl);
                    }
                }

                newsWriteLock.Release();
            }
        }).RequireAuthorization().RequireRateLimiting("admin-api");

        app.MapDelete("/api/news/delete/{id}", async (HttpContext context, string id, IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);
            await newsWriteLock.WaitAsync();
            try
            {
                var news = await NewsService.ReadAsync(newsFile);
                var removedItems = news.Where(item => item.Id == id).ToList();
                if (removedItems.Count == 0)
                {
                    return Results.NotFound();
                }

                news.RemoveAll(item => item.Id == id);
                await NewsService.WriteAsync(newsFile, news);

                // 刪除新聞的同時,把沒有被其他新聞共用的圖片跟附件也一起刪掉
                foreach (var removedItem in removedItems)
                {
                    DeleteUnusedUpload(removedItem.ImageUrl, null, news);
                    DeleteUnusedUpload(removedItem.Url, null, news);
                }

                return Results.Ok();
            }
            finally
            {
                newsWriteLock.Release();
            }
        }).RequireAuthorization().RequireRateLimiting("admin-api");

        // 圖片跟附件分開存放兩個資料夾,方便之後單獨管理容量
        app.MapGet("/api/uploads/news/images/{fileName}", (HttpContext context, string fileName) =>
            ServeNewsUploadAsync(context, fileName, imageUploadsRoot, newsImagesUrlPrefix));

        app.MapGet("/api/uploads/news/{fileName}", (HttpContext context, string fileName) =>
            ServeNewsUploadAsync(context, fileName, uploadsRoot, newsUploadsUrlPrefix));

        // ============================================================
        // 新聞分類管理
        // ============================================================

        app.MapGet("/api/news/categories", async () => Results.Ok(await ReadCategories()))
            .RequireAuthorization()
            .RequireRateLimiting("admin-api");

        app.MapPost("/api/news/categories", async (CategoryRequest request, HttpContext context, IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);
            var name = request.Name?.Trim() ?? "";
            if (string.IsNullOrWhiteSpace(name) || name.Length > 50)
            {
                return Results.BadRequest("分類必填且不可超過 50 字。");
            }

            await categoriesWriteLock.WaitAsync();
            try
            {
                var categories = await ReadCategories();
                if (!categories.Contains(name, StringComparer.Ordinal))
                {
                    categories.Add(name);
                }

                await WriteCategories(categories);
                return Results.Ok(categories);
            }
            finally
            {
                categoriesWriteLock.Release();
            }
        }).RequireAuthorization().RequireRateLimiting("admin-api");

        app.MapDelete("/api/news/categories/{name}", async (string name, HttpContext context, IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);
            await categoriesWriteLock.WaitAsync();
            try
            {
                var categories = await ReadCategories();
                if (!categories.Remove(name))
                {
                    return Results.NotFound();
                }

                await WriteCategories(categories);
                return Results.Ok(categories);
            }
            finally
            {
                categoriesWriteLock.Release();
            }
        }).RequireAuthorization().RequireRateLimiting("admin-api");


        // ============================================================
        // 以下都是給上面 endpoint 用的小工具方法
        // ============================================================

        async Task<IResult> ServeNewsUploadAsync(HttpContext context, string fileName, string directory, string urlPrefix)
        {
            // 檔名不能包含路徑符號(例如 ../../secret.txt),防止跳出資料夾去讀別的檔案
            if (Path.GetFileName(fileName) != fileName)
            {
                return Results.BadRequest("檔案名稱無效。");
            }

            var filePath = Path.Combine(directory, fileName);
            if (!File.Exists(filePath))
            {
                return Results.NotFound();
            }

            // 沒登入的人只能看「已發布新聞正在用的圖片/附件」,其他一律當作不存在
            var publicPath = $"{urlPrefix}/{fileName}";
            var isAuthenticated = context.User.Identity?.IsAuthenticated == true;
            if (!isAuthenticated)
            {
                var news = await NewsService.ReadAsync(newsFile);
                var isPublishedReference = news.Any(item =>
                    NewsService.IsPublicNewsItem(item) &&
                    (string.Equals(item.ImageUrl, publicPath, StringComparison.Ordinal) ||
                     string.Equals(item.Url, publicPath, StringComparison.Ordinal)));

                if (!isPublishedReference)
                {
                    return Results.NotFound();
                }
            }

            context.Response.Headers.CacheControl = isAuthenticated
                ? "private, no-store"
                : urlPrefix == newsImagesUrlPrefix
                    ? publicNewsImageCacheControl
                    : "private, no-store";
            context.Response.Headers["X-Content-Type-Options"] = "nosniff";
            return Results.File(filePath, GetUploadContentType(fileName), enableRangeProcessing: true);
        }

        async Task<List<string>> ReadCategories()
        {
            if (!File.Exists(categoriesFile))
            {
                return defaultCategories.ToList();
            }

            await using var stream = File.OpenRead(categoriesFile);
            var categories = await JsonSerializer.DeserializeAsync<List<string>>(stream);
            return categories ?? defaultCategories.ToList();
        }

        async Task WriteCategories(IEnumerable<string> categories)
        {
            await using var stream = File.Create(categoriesFile);
            await JsonSerializer.SerializeAsync(stream, categories.ToList(), new JsonSerializerOptions { WriteIndented = true });
        }

        // 存新聞的表單有兩種可能:一般 JSON,或是有夾檔案的 multipart form
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

                var removeImage = bool.TryParse(form["removeImage"].ToString(), out var parsedRemoveImage) && parsedRemoveImage;
                var removeAttachment = bool.TryParse(form["removeAttachment"].ToString(), out var parsedRemoveAttachment) && parsedRemoveAttachment;

                return new NewsSaveRequest(
                    item,
                    form.Files.GetFile("image"),
                    form.Files.GetFile("attachment"),
                    removeImage,
                    removeAttachment);
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

        // 新聞內容的欄位檢查,通過回傳 null,不通過回傳錯誤訊息
        string? ValidateNewsItem(NewsItem item)
        {
            if (!DateOnly.TryParseExact(item.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
            {
                return "日期格式必須是 yyyy-MM-dd。";
            }

            if (string.IsNullOrWhiteSpace(item.Title) || item.Title.Length > 200)
            {
                return "標題必填且不可超過 200 字。";
            }

            if ((item.Content ?? "").Length > 50000)
            {
                return "內文不可超過 50,000 字。";
            }

            if ((item.Tag ?? "").Length > 50)
            {
                return "分類不可超過 50 字。";
            }

            return null;
        }

        // 圖片欄位有三種情況:上傳新圖片、按了移除、或什麼都沒動(維持原本的圖片)
        async Task ApplyImageAsync(
            NewsItem item, NewsItem? existingItem, NewsSaveRequest requestData, List<string> newlyStoredUploadUrls)
        {
            if (requestData.ImageFile is not null)
            {
                // 圖片存成實體檔案,不要存成 Base64 塞進 news.json,不然檔案會越長越大
                var upload = await SaveUploadAsync(requestData.ImageFile, imageUploadsRoot, UploadKind.Image, newsImagesUrlPrefix);
                newlyStoredUploadUrls.Add(upload.Url);
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
        }

        async Task ApplyAttachmentAsync(
            NewsItem item, NewsItem? existingItem, NewsSaveRequest requestData, List<string> newlyStoredUploadUrls)
        {
            if (requestData.AttachmentFile is not null)
            {
                var upload = await SaveUploadAsync(requestData.AttachmentFile, uploadsRoot, UploadKind.Attachment, newsUploadsUrlPrefix);
                newlyStoredUploadUrls.Add(upload.Url);
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

        // 新增就記錄建立時間,編輯就只更新「最後修改時間」,建立時間維持原本的
        void ApplyTimestamps(NewsItem item, NewsItem? existingItem)
        {
            var now = DateTimeOffset.UtcNow.ToOffset(TimeSpan.FromHours(8)).ToString("yyyy-MM-dd HH:mm:ss zzz");

            if (existingItem is null)
            {
                item.CreatedAt = string.IsNullOrWhiteSpace(item.CreatedAt) ? now : item.CreatedAt;
            }
            else
            {
                item.CreatedAt = string.IsNullOrWhiteSpace(existingItem.CreatedAt) ? now : existingItem.CreatedAt;
            }

            item.UpdatedAt = now;
        }

        string CreateCaptchaCode()
        {
            const string characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            var builder = new StringBuilder(5);
            for (var index = 0; index < 5; index++)
            {
                builder.Append(characters[RandomNumberGenerator.GetInt32(characters.Length)]);
            }

            return builder.ToString();
        }

        // 畫一張帶干擾線的驗證碼圖片,純粹是防機器人用的,沒有特別複雜的邏輯
        string CreateCaptchaSvg(string code)
        {
            var svg = new StringBuilder(
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"260\" height=\"82\" viewBox=\"0 0 260 82\" role=\"img\" aria-label=\"圖形驗證碼\">");
            svg.Append("<rect width=\"260\" height=\"82\" rx=\"8\" fill=\"#f1f4f6\"/>");

            // 畫幾條干擾線,增加機器人辨識的難度
            for (var index = 0; index < 9; index++)
            {
                var x1 = RandomNumberGenerator.GetInt32(0, 260);
                var y1 = RandomNumberGenerator.GetInt32(8, 74);
                var x2 = RandomNumberGenerator.GetInt32(0, 260);
                var y2 = RandomNumberGenerator.GetInt32(8, 74);
                var color = index % 2 == 0 ? "#9eb2bc" : "#d2a36a";
                svg.Append(
                    $"<path d=\"M{x1} {y1} Q130 {RandomNumberGenerator.GetInt32(0, 82)} {x2} {y2}\" fill=\"none\" stroke=\"{color}\" stroke-width=\"{RandomNumberGenerator.GetInt32(1, 3)}\" opacity=\".7\"/>");
            }

            // 每個字元用隨機角度旋轉一下,不要排得整整齊齊
            for (var index = 0; index < code.Length; index++)
            {
                var x = 28 + index * 48;
                var y = RandomNumberGenerator.GetInt32(49, 62);
                var rotation = RandomNumberGenerator.GetInt32(-12, 13);
                svg.Append(
                    $"<text x=\"{x}\" y=\"{y}\" transform=\"rotate({rotation} {x} {y})\" fill=\"#34495e\" font-family=\"Arial, sans-serif\" font-size=\"31\" font-weight=\"700\">{code[index]}</text>");
            }

            svg.Append("</svg>");
            return svg.ToString();
        }

        // 一般字串比對(==)如果比對到不一樣的字元就會提早結束,
        // 有心人可以量測回應時間差,一個字一個字猜出正確答案。
        // FixedTimeEquals 不管對不對都花一樣的時間比對完,防止這種攻擊。
        bool FixedTimeEquals(string? actual, string expected)
        {
            var actualBytes = Encoding.UTF8.GetBytes(actual ?? "");
            var expectedBytes = Encoding.UTF8.GetBytes(expected);
            return CryptographicOperations.FixedTimeEquals(actualBytes, expectedBytes);
        }

        bool FixedTimeTextEquals(string? expected, string? actual)
        {
            if (string.IsNullOrWhiteSpace(expected) || string.IsNullOrWhiteSpace(actual))
            {
                return false;
            }

            var expectedBytes = Encoding.UTF8.GetBytes(expected.Trim().ToUpperInvariant());
            var actualBytes = Encoding.UTF8.GetBytes(actual.Trim().ToUpperInvariant());
            return expectedBytes.Length == actualBytes.Length &&
                   CryptographicOperations.FixedTimeEquals(expectedBytes, actualBytes);
        }

        // 把上傳的檔案存到硬碟。流程:檢查大小跟副檔名 → 先存成 .tmp → 檢查檔案內容是不是真的那個格式 → 改名成正式檔案
        async Task<SavedUpload> SaveUploadAsync(IFormFile file, string directory, UploadKind kind, string publicUrlPrefix)
        {
            var originalName = Path.GetFileName(file.FileName).Trim();
            var extension = Path.GetExtension(originalName).ToLowerInvariant();
            var allowedExtensions = kind == UploadKind.Image
                ? new[] { ".jpg", ".jpeg", ".png", ".webp" }
                : new[] { ".pdf", ".doc", ".docx", ".xls", ".xlsx" };
            var maxSize = kind == UploadKind.Image ? 1 * 1024 * 1024 : 10 * 1024 * 1024;

            if (file.Length <= 0 || file.Length > maxSize)
            {
                throw new UploadValidationException(
                    kind == UploadKind.Image ? "公告圖片壓縮後必須小於 1 MB。" : "附件必須小於 10 MB。");
            }

            if (string.IsNullOrWhiteSpace(originalName) || originalName.Length > 180 || !allowedExtensions.Contains(extension))
            {
                throw new UploadValidationException(
                    kind == UploadKind.Image ? "公告圖片僅支援 JPG、PNG 或 WebP。" : "附件僅支援 PDF、Word 或 Excel 檔案。");
            }

            var storedName = $"{Guid.NewGuid():N}{extension}";
            var finalPath = Path.Combine(directory, storedName);
            var temporaryPath = finalPath + ".tmp";

            try
            {
                await using (var stream = File.Create(temporaryPath))
                {
                    await file.CopyToAsync(stream);
                }

                // 副檔名可以亂改,所以還要打開檔案看內容開頭是不是真的那個格式
                await ValidateUploadSignatureAsync(temporaryPath, extension, kind);

                File.Move(temporaryPath, finalPath);
                return new SavedUpload($"{publicUrlPrefix}/{storedName}", originalName);
            }
            catch
            {
                if (File.Exists(temporaryPath))
                {
                    File.Delete(temporaryPath);
                }

                throw;
            }
        }

        // 檢查檔案開頭的「魔數」是不是符合宣稱的格式,例如 JPG 檔案開頭一定是 FF D8 FF
        async Task ValidateUploadSignatureAsync(string path, string extension, UploadKind kind)
        {
            await using var stream = File.OpenRead(path);
            var header = new byte[12];
            await stream.ReadAsync(header);

            static bool StartsWith(byte[] source, params byte[] prefix) =>
                source.Length >= prefix.Length && source.AsSpan(0, prefix.Length).SequenceEqual(prefix);

            if (kind == UploadKind.Image)
            {
                var isJpeg = extension is ".jpg" or ".jpeg" && StartsWith(header, 0xff, 0xd8, 0xff);
                var isPng = extension == ".png" && StartsWith(header, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
                var isWebp = extension == ".webp" && StartsWith(header, 0x52, 0x49, 0x46, 0x46) && header.AsSpan(8, 4).SequenceEqual("WEBP"u8);

                if (!isJpeg && !isPng && !isWebp)
                {
                    throw new UploadValidationException("公告圖片內容格式不正確。");
                }

                return;
            }

            var isPdf = extension == ".pdf" && StartsWith(header, 0x25, 0x50, 0x44, 0x46, 0x2d);
            var isOle = extension is ".doc" or ".xls" && StartsWith(header, 0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1);

            if (isPdf || isOle)
            {
                return;
            }

            // docx/xlsx 其實是一個壓縮檔(zip),所以改用解壓縮的方式檢查裡面有沒有該有的內容
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
                    {
                        return;
                    }
                }
                catch (InvalidDataException)
                {
                    // 不是合法的 zip 檔案,往下走到最後統一丟出驗證失敗
                }
            }

            throw new UploadValidationException("附件內容格式不正確。");
        }

        // 如果圖片/附件被換掉了,而且沒有其他新聞還在引用舊的那個檔案,就把它從硬碟刪掉
        void DeleteUnusedUpload(string? previousUrl, string? currentUrl, IReadOnlyCollection<NewsItem> news)
        {
            if (string.IsNullOrWhiteSpace(previousUrl) || string.Equals(previousUrl, currentUrl, StringComparison.Ordinal))
            {
                return;
            }

            var isStillUsed = news.Any(item =>
                string.Equals(item.ImageUrl, previousUrl, StringComparison.Ordinal) ||
                string.Equals(item.Url, previousUrl, StringComparison.Ordinal));

            if (!isStillUsed)
            {
                DeleteStoredUpload(previousUrl);
            }
        }

        void DeleteStoredUpload(string? uploadUrl)
        {
            if (string.IsNullOrWhiteSpace(uploadUrl))
            {
                return;
            }

            string directory;
            string fileName;

            if (uploadUrl.StartsWith($"{newsImagesUrlPrefix}/", StringComparison.Ordinal))
            {
                directory = imageUploadsRoot;
                fileName = uploadUrl[$"{newsImagesUrlPrefix}/".Length..];
            }
            else if (uploadUrl.StartsWith($"{newsUploadsUrlPrefix}/", StringComparison.Ordinal))
            {
                directory = uploadsRoot;
                fileName = uploadUrl[$"{newsUploadsUrlPrefix}/".Length..];
            }
            else
            {
                return;
            }

            if (Path.GetFileName(fileName) == fileName)
            {
                File.Delete(Path.Combine(directory, fileName));
            }
        }

        List<NewsItem> SortNewsByLatest(IEnumerable<NewsItem> items) => NewsService.SortByLatest(items);

        PublicNewsListItem ToPublicNewsListItem(NewsItem item) => new(
            item.Id,
            item.Date,
            item.Tag,
            item.Title,
            item.Content,
            item.ImageUrl,
            !string.IsNullOrWhiteSpace(item.Url),
            item.CreatedAt);

        PublicNewsDetailItem ToPublicNewsDetailItem(NewsItem item) => new(
            item.Id,
            item.Date,
            item.Tag,
            item.Title,
            item.Content,
            item.Url,
            item.AttachmentName,
            item.ImageUrl);

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
    }

    private sealed record SavedUpload(string Url, string OriginalName);

    private enum UploadKind
    {
        Image,
        Attachment
    }

    private sealed class UploadValidationException(string message) : Exception(message);
}
