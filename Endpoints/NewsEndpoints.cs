using System.Globalization;
using System.IO.Compression;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Features;
using apli_website_rebuild.Models;
using apli_website_rebuild.Services;

namespace apli_website_rebuild.Endpoints;

public class NewsEndpointOptions
{
    public NewsEndpointOptions(
        string adminUsername,
        string adminPassword,
        string newsFile,
        string categoriesFile,
        string uploadsRoot,
        string imageUploadsRoot,
        IReadOnlyList<string> defaultCategories,
        UploadScanner uploadScanner)
    {
        AdminUsername = adminUsername;
        AdminPassword = adminPassword;
        NewsFile = newsFile;
        CategoriesFile = categoriesFile;
        UploadsRoot = uploadsRoot;
        ImageUploadsRoot = imageUploadsRoot;
        DefaultCategories = defaultCategories;
        UploadScanner = uploadScanner;
    }

    public string AdminUsername { get; }
    public string AdminPassword { get; }
    public string NewsFile { get; }
    public string CategoriesFile { get; }
    public string UploadsRoot { get; }
    public string ImageUploadsRoot { get; }
    public IReadOnlyList<string> DefaultCategories { get; }
    public UploadScanner UploadScanner { get; }

    // 存檔的時候上鎖,避免兩個請求同時寫檔案把資料寫壞
    public SemaphoreSlim NewsWriteLock { get; } = new SemaphoreSlim(1, 1);
    public SemaphoreSlim CategoriesWriteLock { get; } = new SemaphoreSlim(1, 1);
}

public static class NewsEndpoints
{
    public static void Map(WebApplication app, NewsEndpointOptions options)
    {
        string adminUsername = options.AdminUsername;
        string adminPassword = options.AdminPassword;
        string newsFile = options.NewsFile;
        string categoriesFile = options.CategoriesFile;
        string uploadsRoot = options.UploadsRoot;
        string imageUploadsRoot = options.ImageUploadsRoot;
        var defaultCategories = options.DefaultCategories;
        var uploadScanner = options.UploadScanner;
        var newsWriteLock = options.NewsWriteLock;
        var categoriesWriteLock = options.CategoriesWriteLock;

        const string captchaSessionKey = "admin-login-captcha";
        const long maxUploadRequestBytes = 16 * 1024 * 1024;
        const string newsUploadsUrlPrefix = "/api/uploads/news";
        const string newsImagesUrlPrefix = "/api/uploads/news/images";
        const string publicNewsApiCacheControl = "public, max-age=60, s-maxage=60, stale-while-revalidate=30";
        const string publicNewsListApiCacheControl = "no-store";
        const string publicNewsImageCacheControl = "public, max-age=604800, immutable";

        var jsonReadOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var jsonWriteOptions = new JsonSerializerOptions { WriteIndented = true };

        // ============================================================
        // 後台登入相關:驗證碼、登入、登出、查詢是否已登入
        // ============================================================

        app.MapGet("/api/admin/captcha", (HttpContext context) =>
        {
            string code = CreateCaptchaCode();
            context.Session.SetString(captchaSessionKey, code);
            context.Response.Headers.CacheControl = "no-store, no-cache";
            context.Response.Headers.Pragma = "no-cache";
            return Results.Content(CreateCaptchaSvg(code), "image/svg+xml", Encoding.UTF8);
        }).RequireRateLimiting("admin-captcha");

        app.MapPost("/api/admin/login", async (HttpContext context, LoginRequest request, IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);

            string? expectedCaptcha = context.Session.GetString(captchaSessionKey);
            context.Session.Remove(captchaSessionKey);

            // 帳號密碼跟驗證碼都要用「固定時間比對」,防止有人靠回應時間差去猜密碼
            bool usernameMatches = FixedTimeEquals(request.Username, adminUsername);
            bool passwordMatches = FixedTimeEquals(request.Password, adminPassword);
            bool captchaMatches = FixedTimeTextEquals(expectedCaptcha, request.Captcha);

            if (!usernameMatches || !passwordMatches || !captchaMatches)
            {
                return Results.Unauthorized();
            }

            var claims = new Claim[] { new Claim(ClaimTypes.Name, adminUsername) };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

            return Results.Ok();
        }).RequireRateLimiting("admin-login");

        app.MapPost("/api/admin/logout", async (HttpContext context, IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);
            await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Results.Ok();
        }).RequireAuthorization().RequireRateLimiting("admin-api");

        app.MapGet("/api/admin/session", (HttpContext context) =>
        {
            if (IsLoggedIn(context))
            {
                return Results.Ok();
            }

            return Results.Unauthorized();
        }).RequireRateLimiting("admin-api");

        // ============================================================
        // 新聞查詢:後台看全部、前台只看已發布的
        // ============================================================

        app.MapGet("/api/news", async () =>
        {
            List<NewsItem> news = await NewsService.ReadAsync(newsFile);
            return Results.Ok(NewsService.SortByLatest(news));
        }).RequireAuthorization().RequireRateLimiting("admin-api");

        app.MapGet("/api/public/news", async (HttpContext context, int? limit) =>
        {
            List<NewsItem> news = await NewsService.ReadAsync(newsFile);
            List<NewsItem> publicNews = GetPublicNews(news);

            // 有給 limit 就只取前面幾則
            int count = publicNews.Count;
            if (limit != null && limit > 0 && limit < count)
            {
                count = limit.Value;
            }

            var result = new List<PublicNewsListItem>();
            for (int i = 0; i < count; i++)
            {
                result.Add(ToPublicNewsListItem(publicNews[i]));
            }

            context.Response.Headers.CacheControl = publicNewsListApiCacheControl;
            return Results.Ok(result);
        }).RequireRateLimiting("public-api");

        app.MapGet("/api/public/news/{id}", async (HttpContext context, string id) =>
        {
            List<NewsItem> news = await NewsService.ReadAsync(newsFile);

            foreach (NewsItem item in news)
            {
                if (item.Id == id && NewsService.IsPublicNewsItem(item))
                {
                    context.Response.Headers.CacheControl = publicNewsApiCacheControl;
                    return Results.Ok(ToPublicNewsDetailItem(item));
                }
            }

            return Results.NotFound();
        }).RequireRateLimiting("public-api");

        app.MapGet("/api/public/news/categories", async (HttpContext context) =>
        {
            List<NewsItem> news = await NewsService.ReadAsync(newsFile);
            var categories = new List<string>();

            // 依新聞由新到舊的順序,收集不重複的分類
            foreach (NewsItem item in GetPublicNews(news))
            {
                string tag = item.Tag.Trim();
                if (tag != "" && !categories.Contains(tag))
                {
                    categories.Add(tag);
                }
            }

            context.Response.Headers.CacheControl = publicNewsApiCacheControl;
            return Results.Ok(categories);
        }).RequireRateLimiting("public-api");

        // ============================================================
        // 新增/編輯新聞
        // ============================================================

        app.MapPost("/api/news/save", async (HttpContext context, IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);

            var sizeLimit = context.Features.Get<IHttpMaxRequestBodySizeFeature>();
            if (sizeLimit != null && !sizeLimit.IsReadOnly)
            {
                sizeLimit.MaxRequestBodySize = maxUploadRequestBytes;
            }

            NewsSaveRequest? requestData = await ReadNewsSaveRequestAsync(context);
            if (requestData == null)
            {
                return Results.BadRequest("無法讀取消息資料。");
            }

            NewsItem item = requestData.Item;
            string? validationError = ValidateNewsItem(item);
            if (validationError != null)
            {
                return Results.BadRequest(validationError);
            }

            // 存檔要上鎖,不然兩個人同時儲存可能會互相蓋掉對方的資料
            await newsWriteLock.WaitAsync();

            // 如果中途失敗,已經存到硬碟的新檔案要記得刪掉,不要留垃圾檔案
            var newUploadUrls = new List<string>();
            bool saveCompleted = false;

            try
            {
                List<NewsItem> news = await NewsService.ReadAsync(newsFile);

                if (string.IsNullOrWhiteSpace(item.Id))
                {
                    item.Id = NewsService.CreateUniqueId();
                }

                // 找看看是編輯舊新聞還是新增
                int existingIndex = FindNewsIndex(news, item.Id);
                NewsItem? existingItem = null;
                string previousImageUrl = "";
                string previousAttachmentUrl = "";

                if (existingIndex >= 0)
                {
                    existingItem = news[existingIndex];
                    previousImageUrl = existingItem.ImageUrl;
                    previousAttachmentUrl = existingItem.Url;
                }

                try
                {
                    await ApplyImageAsync(item, existingItem, requestData, newUploadUrls, context.RequestAborted);
                    await ApplyAttachmentAsync(item, existingItem, requestData, newUploadUrls, context.RequestAborted);
                }
                catch (UploadValidationException exception)
                {
                    return Results.BadRequest(exception.Message);
                }
                catch (UploadScanException exception)
                {
                    if (exception.ServiceUnavailable)
                    {
                        return Results.StatusCode(503);
                    }

                    return Results.BadRequest(exception.Message);
                }

                ApplyTimestamps(item, existingItem);

                if (existingIndex >= 0)
                {
                    news[existingIndex] = item;
                }
                else
                {
                    news.Add(item);
                }

                news = NewsService.SortByLatest(news);
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
                    foreach (string uploadUrl in newUploadUrls)
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
                List<NewsItem> news = await NewsService.ReadAsync(newsFile);

                // 從後面往前找,一邊找一邊刪,索引才不會亂掉
                var removedItems = new List<NewsItem>();
                for (int i = news.Count - 1; i >= 0; i--)
                {
                    if (news[i].Id == id)
                    {
                        removedItems.Add(news[i]);
                        news.RemoveAt(i);
                    }
                }

                if (removedItems.Count == 0)
                {
                    return Results.NotFound();
                }

                await NewsService.WriteAsync(newsFile, news);

                // 刪除新聞的同時,把沒有被其他新聞共用的圖片跟附件也一起刪掉
                foreach (NewsItem removedItem in removedItems)
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

        app.MapGet("/api/news/categories", async () =>
        {
            List<string> categories = await ReadCategories();
            return Results.Ok(categories);
        }).RequireAuthorization().RequireRateLimiting("admin-api");

        app.MapPost("/api/news/categories", async (CategoryRequest request, HttpContext context, IAntiforgery antiforgery) =>
        {
            await antiforgery.ValidateRequestAsync(context);

            string name = "";
            if (request.Name != null)
            {
                name = request.Name.Trim();
            }

            if (name == "" || name.Length > 50)
            {
                return Results.BadRequest("分類必填且不可超過 50 字。");
            }

            await categoriesWriteLock.WaitAsync();
            try
            {
                List<string> categories = await ReadCategories();
                if (!categories.Contains(name))
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
                List<string> categories = await ReadCategories();
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

            string filePath = Path.Combine(directory, fileName);
            if (!File.Exists(filePath))
            {
                return Results.NotFound();
            }

            string publicPath = urlPrefix + "/" + fileName;
            bool loggedIn = IsLoggedIn(context);
            List<NewsItem> news = await NewsService.ReadAsync(newsFile);

            // 沒登入的人只能看「已發布新聞正在用的圖片/附件」,其他一律當作不存在
            if (!loggedIn)
            {
                bool isPublishedReference = false;

                foreach (NewsItem item in news)
                {
                    if (NewsService.IsPublicNewsItem(item) && (item.ImageUrl == publicPath || item.Url == publicPath))
                    {
                        isPublishedReference = true;
                        break;
                    }
                }

                if (!isPublishedReference)
                {
                    return Results.NotFound();
                }
            }

            // 只有「沒登入的人看公開圖片」可以被瀏覽器快取,其他都不快取
            string cacheControl = "private, no-store";
            if (!loggedIn && urlPrefix == newsImagesUrlPrefix)
            {
                cacheControl = publicNewsImageCacheControl;
            }

            context.Response.Headers.CacheControl = cacheControl;
            context.Response.Headers["X-Content-Type-Options"] = "nosniff";

            // 附件下載時,用使用者上傳時的原始檔名
            if (urlPrefix == newsUploadsUrlPrefix)
            {
                string attachmentName = "";

                foreach (NewsItem item in news)
                {
                    if (item.Url == publicPath && !string.IsNullOrWhiteSpace(item.AttachmentName))
                    {
                        attachmentName = item.AttachmentName;
                        break;
                    }
                }

                if (attachmentName != "")
                {
                    string safeName = Path.GetFileName(attachmentName);
                    context.Response.Headers.ContentDisposition =
                        "attachment; filename*=UTF-8''" + Uri.EscapeDataString(safeName);
                }
            }

            return Results.File(filePath, GetUploadContentType(fileName), enableRangeProcessing: true);
        }

        async Task<List<string>> ReadCategories()
        {
            if (!File.Exists(categoriesFile))
            {
                return new List<string>(defaultCategories);
            }

            using var stream = File.OpenRead(categoriesFile);
            List<string>? categories = await JsonSerializer.DeserializeAsync<List<string>>(stream);

            if (categories == null)
            {
                return new List<string>(defaultCategories);
            }

            return categories;
        }

        async Task WriteCategories(List<string> categories)
        {
            using var stream = File.Create(categoriesFile);
            await JsonSerializer.SerializeAsync(stream, categories, jsonWriteOptions);
        }

        // 存新聞的表單有兩種可能:一般 JSON,或是有夾檔案的 multipart form
        async Task<NewsSaveRequest?> ReadNewsSaveRequestAsync(HttpContext context)
        {
            if (context.Request.HasFormContentType)
            {
                IFormCollection form = await context.Request.ReadFormAsync(context.RequestAborted);

                var formItem = new NewsItem();
                formItem.Id = form["id"].ToString();
                formItem.Date = form["date"].ToString();
                formItem.Tag = form["tag"].ToString();
                formItem.Title = form["title"].ToString();
                formItem.Content = form["content"].ToString();
                formItem.Url = form["url"].ToString();
                formItem.ImageUrl = form["imageUrl"].ToString();
                formItem.ImageName = form["imageName"].ToString();
                formItem.AttachmentName = form["attachmentName"].ToString();
                formItem.Published = ReadBool(form, "published", true);

                return new NewsSaveRequest(
                    formItem,
                    form.Files.GetFile("image"),
                    form.Files.GetFile("attachment"),
                    ReadBool(form, "removeImage", false),
                    ReadBool(form, "removeAttachment", false));
            }

            try
            {
                NewsItem? jsonItem = await JsonSerializer.DeserializeAsync<NewsItem>(
                    context.Request.Body, jsonReadOptions, context.RequestAborted);

                if (jsonItem == null)
                {
                    return null;
                }

                return new NewsSaveRequest(jsonItem, null, null, false, false);
            }
            catch (JsonException)
            {
                return null;
            }
        }

        // 表單欄位轉成 true/false,沒填或格式不對就用預設值
        bool ReadBool(IFormCollection form, string key, bool defaultValue)
        {
            bool value;
            if (bool.TryParse(form[key].ToString(), out value))
            {
                return value;
            }

            return defaultValue;
        }

        // 新聞內容的欄位檢查,通過回傳 null,不通過回傳錯誤訊息
        string? ValidateNewsItem(NewsItem item)
        {
            DateOnly date;
            if (!DateOnly.TryParseExact(item.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out date))
            {
                return "日期格式必須是 yyyy-MM-dd。";
            }

            if (string.IsNullOrWhiteSpace(item.Title) || item.Title.Length > 200)
            {
                return "標題必填且不可超過 200 字。";
            }

            if (item.Content != null && item.Content.Length > 50000)
            {
                return "內文不可超過 50,000 字。";
            }

            if (item.Tag != null && item.Tag.Length > 50)
            {
                return "分類不可超過 50 字。";
            }

            return null;
        }

        // 圖片欄位有三種情況:上傳新圖片、按了移除、或什麼都沒動(維持原本的圖片)
        async Task ApplyImageAsync(
            NewsItem item,
            NewsItem? existingItem,
            NewsSaveRequest requestData,
            List<string> newUploadUrls,
            CancellationToken cancellationToken)
        {
            if (requestData.ImageFile != null)
            {
                // 圖片存成實體檔案,不要存成 Base64 塞進 news.json,不然檔案會越長越大
                SavedUpload upload = await SaveUploadAsync(
                    requestData.ImageFile, imageUploadsRoot, UploadKind.Image, newsImagesUrlPrefix, cancellationToken);

                newUploadUrls.Add(upload.Url);
                item.ImageUrl = upload.Url;
                item.ImageName = upload.OriginalName;
            }
            else if (requestData.RemoveImage)
            {
                item.ImageUrl = "";
                item.ImageName = "";
            }
            else if (existingItem != null)
            {
                item.ImageUrl = existingItem.ImageUrl;
                item.ImageName = existingItem.ImageName;
            }
            else
            {
                // 新增新聞時不接受前端偽造的圖片路徑,只能用這次上傳產生的網址
                item.ImageUrl = "";
                item.ImageName = "";
            }
        }

        async Task ApplyAttachmentAsync(
            NewsItem item,
            NewsItem? existingItem,
            NewsSaveRequest requestData,
            List<string> newUploadUrls,
            CancellationToken cancellationToken)
        {
            if (requestData.AttachmentFile != null)
            {
                SavedUpload upload = await SaveUploadAsync(
                    requestData.AttachmentFile, uploadsRoot, UploadKind.Attachment, newsUploadsUrlPrefix, cancellationToken);

                newUploadUrls.Add(upload.Url);
                item.Url = upload.Url;
                item.AttachmentName = upload.OriginalName;
            }
            else if (requestData.RemoveAttachment)
            {
                item.Url = "";
                item.AttachmentName = "";
            }
            else if (existingItem != null)
            {
                item.Url = existingItem.Url;
                item.AttachmentName = existingItem.AttachmentName;
            }
            else
            {
                // 新增新聞時不接受前端偽造的附件路徑,只能用這次上傳產生的網址
                item.Url = "";
                item.AttachmentName = "";
            }
        }

        // 新增就記錄建立時間,編輯就只更新「最後修改時間」,建立時間維持原本的
        void ApplyTimestamps(NewsItem item, NewsItem? existingItem)
        {
            // 台灣時間(UTC+8)
            string now = DateTime.UtcNow.AddHours(8).ToString("yyyy-MM-dd HH:mm:ss") + " +08:00";

            if (existingItem == null)
            {
                if (string.IsNullOrWhiteSpace(item.CreatedAt))
                {
                    item.CreatedAt = now;
                }
            }
            else
            {
                item.CreatedAt = existingItem.CreatedAt;
                if (string.IsNullOrWhiteSpace(item.CreatedAt))
                {
                    item.CreatedAt = now;
                }
            }

            item.UpdatedAt = now;
        }

        string CreateCaptchaCode()
        {
            // 拿掉容易看錯的字元(0 O 1 I)
            const string characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            var builder = new StringBuilder();

            for (int i = 0; i < 5; i++)
            {
                builder.Append(characters[RandomNumberGenerator.GetInt32(characters.Length)]);
            }

            return builder.ToString();
        }

        // 畫一張帶干擾線的驗證碼圖片,純粹是防機器人用的,沒有特別複雜的邏輯
        string CreateCaptchaSvg(string code)
        {
            var svg = new StringBuilder();
            svg.Append("<svg xmlns='http://www.w3.org/2000/svg' width='260' height='82' viewBox='0 0 260 82' role='img' aria-label='圖形驗證碼'>");
            svg.Append("<rect width='260' height='82' rx='8' fill='#f1f4f6'/>");

            // 畫幾條干擾線,增加機器人辨識的難度
            for (int i = 0; i < 9; i++)
            {
                int x1 = RandomNumberGenerator.GetInt32(0, 260);
                int y1 = RandomNumberGenerator.GetInt32(8, 74);
                int x2 = RandomNumberGenerator.GetInt32(0, 260);
                int y2 = RandomNumberGenerator.GetInt32(8, 74);
                int curveY = RandomNumberGenerator.GetInt32(0, 82);
                int lineWidth = RandomNumberGenerator.GetInt32(1, 3);

                string color = "#d2a36a";
                if (i % 2 == 0)
                {
                    color = "#9eb2bc";
                }

                svg.Append("<path d='M" + x1 + " " + y1 + " Q130 " + curveY + " " + x2 + " " + y2 + "'" +
                           " fill='none' stroke='" + color + "' stroke-width='" + lineWidth + "' opacity='.7'/>");
            }

            // 每個字元用隨機角度旋轉一下,不要排得整整齊齊
            for (int i = 0; i < code.Length; i++)
            {
                int x = 28 + i * 48;
                int y = RandomNumberGenerator.GetInt32(49, 62);
                int rotation = RandomNumberGenerator.GetInt32(-12, 13);

                svg.Append("<text x='" + x + "' y='" + y + "' transform='rotate(" + rotation + " " + x + " " + y + ")'" +
                           " fill='#34495e' font-family='Arial, sans-serif' font-size='31' font-weight='700'>" +
                           code[i] + "</text>");
            }

            svg.Append("</svg>");
            return svg.ToString();
        }

        // 一般字串比對(==)如果比對到不一樣的字元就會提早結束,
        // 有心人可以量測回應時間差,一個字一個字猜出正確答案。
        // FixedTimeEquals 不管對不對都花一樣的時間比對完,防止這種攻擊。
        bool FixedTimeEquals(string? actual, string expected)
        {
            if (actual == null)
            {
                actual = "";
            }

            byte[] actualBytes = Encoding.UTF8.GetBytes(actual);
            byte[] expectedBytes = Encoding.UTF8.GetBytes(expected);
            return CryptographicOperations.FixedTimeEquals(actualBytes, expectedBytes);
        }

        // 驗證碼:不分大小寫、忽略頭尾空白
        bool FixedTimeTextEquals(string? expected, string? actual)
        {
            if (string.IsNullOrWhiteSpace(expected) || string.IsNullOrWhiteSpace(actual))
            {
                return false;
            }

            byte[] expectedBytes = Encoding.UTF8.GetBytes(expected.Trim().ToUpperInvariant());
            byte[] actualBytes = Encoding.UTF8.GetBytes(actual.Trim().ToUpperInvariant());

            // FixedTimeEquals 長度不同時本來就會回 false,這裡先比長度只是讓意思更清楚
            if (expectedBytes.Length != actualBytes.Length)
            {
                return false;
            }

            return CryptographicOperations.FixedTimeEquals(expectedBytes, actualBytes);
        }

        // 把上傳的檔案存到硬碟。流程:檢查大小跟副檔名 → 先存成 .tmp → 檢查檔案內容是不是真的那個格式 → 病毒掃描 → 改名成正式檔案
        async Task<SavedUpload> SaveUploadAsync(
            IFormFile file,
            string directory,
            UploadKind kind,
            string publicUrlPrefix,
            CancellationToken cancellationToken)
        {
            string originalName = Path.GetFileName(file.FileName).Trim();
            string extension = Path.GetExtension(originalName).ToLowerInvariant();

            List<string> allowedExtensions;
            long maxSize;

            if (kind == UploadKind.Image)
            {
                allowedExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".webp" };
                maxSize = 1 * 1024 * 1024;
            }
            else
            {
                allowedExtensions = new List<string> { ".pdf", ".doc", ".docx", ".xls", ".xlsx" };
                maxSize = 10 * 1024 * 1024;
            }

            if (file.Length <= 0 || file.Length > maxSize)
            {
                if (kind == UploadKind.Image)
                {
                    throw new UploadValidationException("公告圖片壓縮後必須小於 1 MB。");
                }

                throw new UploadValidationException("附件必須小於 10 MB。");
            }

            if (originalName == "" || originalName.Length > 180 || !allowedExtensions.Contains(extension))
            {
                if (kind == UploadKind.Image)
                {
                    throw new UploadValidationException("公告圖片僅支援 JPG、PNG 或 WebP。");
                }

                throw new UploadValidationException("附件僅支援 PDF、Word 或 Excel 檔案。");
            }

            // 存到硬碟的檔名用隨機的 GUID,不用使用者給的檔名
            string storedName = Guid.NewGuid().ToString("N") + extension;
            string finalPath = Path.Combine(directory, storedName);
            string temporaryPath = finalPath + ".tmp";

            try
            {
                using (var stream = File.Create(temporaryPath))
                {
                    await file.CopyToAsync(stream, cancellationToken);
                }

                // 副檔名可以亂改,所以還要打開檔案看內容開頭是不是真的那個格式
                await ValidateUploadSignatureAsync(temporaryPath, extension, kind);
                await uploadScanner.ScanAsync(temporaryPath, cancellationToken);

                File.Move(temporaryPath, finalPath);
                return new SavedUpload(publicUrlPrefix + "/" + storedName, originalName);
            }
            catch
            {
                // 任何一步失敗,都把暫存檔刪掉再把錯誤往外丟
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
            byte[] header = new byte[12];
            using (var stream = File.OpenRead(path))
            {
                await stream.ReadAsync(header, 0, header.Length);
            }

            if (kind == UploadKind.Image)
            {
                bool isJpeg = (extension == ".jpg" || extension == ".jpeg")
                    && HasBytes(header, 0, new byte[] { 0xff, 0xd8, 0xff });

                bool isPng = extension == ".png"
                    && HasBytes(header, 0, new byte[] { 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a });

                // WebP 開頭是 "RIFF",第 8 到 11 個位元組是 "WEBP"
                bool isWebp = extension == ".webp"
                    && HasBytes(header, 0, new byte[] { 0x52, 0x49, 0x46, 0x46 })
                    && HasBytes(header, 8, new byte[] { 0x57, 0x45, 0x42, 0x50 });

                if (!isJpeg && !isPng && !isWebp)
                {
                    throw new UploadValidationException("公告圖片內容格式不正確。");
                }

                return;
            }

            // PDF 開頭是 "%PDF-"
            bool isPdf = extension == ".pdf"
                && HasBytes(header, 0, new byte[] { 0x25, 0x50, 0x44, 0x46, 0x2d });

            // 舊版 doc / xls 是 OLE 格式
            bool isOle = (extension == ".doc" || extension == ".xls")
                && HasBytes(header, 0, new byte[] { 0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1 });

            if (isPdf || isOle)
            {
                return;
            }

            // docx/xlsx 其實是一個壓縮檔(zip),所以改用解壓縮的方式檢查裡面有沒有該有的內容
            if (extension == ".docx" || extension == ".xlsx")
            {
                string folder = "word/";
                if (extension == ".xlsx")
                {
                    folder = "xl/";
                }

                try
                {
                    using (ZipArchive archive = ZipFile.OpenRead(path))
                    {
                        bool hasContentTypes = archive.GetEntry("[Content_Types].xml") != null;
                        bool hasDocument = false;

                        foreach (ZipArchiveEntry entry in archive.Entries)
                        {
                            if (entry.FullName.StartsWith(folder, StringComparison.OrdinalIgnoreCase))
                            {
                                hasDocument = true;
                                break;
                            }
                        }

                        if (hasContentTypes && hasDocument)
                        {
                            return;
                        }
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
        void DeleteUnusedUpload(string? previousUrl, string? currentUrl, List<NewsItem> news)
        {
            if (string.IsNullOrWhiteSpace(previousUrl) || previousUrl == currentUrl)
            {
                return;
            }

            foreach (NewsItem item in news)
            {
                if (item.ImageUrl == previousUrl || item.Url == previousUrl)
                {
                    return;
                }
            }

            DeleteStoredUpload(previousUrl);
        }

        void DeleteStoredUpload(string? uploadUrl)
        {
            if (string.IsNullOrWhiteSpace(uploadUrl))
            {
                return;
            }

            string directory;
            string fileName;
            string imagesStart = newsImagesUrlPrefix + "/";
            string filesStart = newsUploadsUrlPrefix + "/";

            // 圖片網址也是以 filesStart 開頭,所以一定要先判斷圖片
            if (uploadUrl.StartsWith(imagesStart))
            {
                directory = imageUploadsRoot;
                fileName = uploadUrl.Substring(imagesStart.Length);
            }
            else if (uploadUrl.StartsWith(filesStart))
            {
                directory = uploadsRoot;
                fileName = uploadUrl.Substring(filesStart.Length);
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

        PublicNewsListItem ToPublicNewsListItem(NewsItem item)
        {
            bool hasAttachment = !string.IsNullOrWhiteSpace(item.Url);

            return new PublicNewsListItem(
                item.Id,
                item.Date,
                item.Tag,
                item.Title,
                item.Content,
                item.ImageUrl,
                hasAttachment,
                item.CreatedAt);
        }

        PublicNewsDetailItem ToPublicNewsDetailItem(NewsItem item)
        {
            return new PublicNewsDetailItem(
                item.Id,
                item.Date,
                item.Tag,
                item.Title,
                item.Content,
                item.Url,
                item.AttachmentName,
                item.ImageUrl);
        }

        string GetUploadContentType(string fileName)
        {
            string extension = Path.GetExtension(fileName).ToLowerInvariant();

            switch (extension)
            {
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                case ".webp":
                    return "image/webp";
                case ".pdf":
                    return "application/pdf";
                case ".doc":
                    return "application/msword";
                case ".docx":
                    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                case ".xls":
                    return "application/vnd.ms-excel";
                case ".xlsx":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                default:
                    return "application/octet-stream";
            }
        }
    }

    // 前台看得到的新聞(已發布、日期不是未來),由新到舊排好
    private static List<NewsItem> GetPublicNews(List<NewsItem> news)
    {
        var result = new List<NewsItem>();

        foreach (NewsItem item in news)
        {
            if (NewsService.IsPublicNewsItem(item))
            {
                result.Add(item);
            }
        }

        return NewsService.SortByLatest(result);
    }

    // 用 id 找新聞在清單的第幾個,找不到回傳 -1
    private static int FindNewsIndex(List<NewsItem> news, string id)
    {
        for (int i = 0; i < news.Count; i++)
        {
            if (news[i].Id == id)
            {
                return i;
            }
        }

        return -1;
    }

    private static bool IsLoggedIn(HttpContext context)
    {
        return context.User.Identity != null && context.User.Identity.IsAuthenticated;
    }

    // 檢查 data 從 offset 開始,是不是剛好等於 expected 這串位元組
    private static bool HasBytes(byte[] data, int offset, byte[] expected)
    {
        if (data.Length < offset + expected.Length)
        {
            return false;
        }

        for (int i = 0; i < expected.Length; i++)
        {
            if (data[offset + i] != expected[i])
            {
                return false;
            }
        }

        return true;
    }

    private class SavedUpload
    {
        public string Url { get; }
        public string OriginalName { get; }

        public SavedUpload(string url, string originalName)
        {
            Url = url;
            OriginalName = originalName;
        }
    }

    private enum UploadKind
    {
        Image,
        Attachment
    }

    private class UploadValidationException : Exception
    {
        public UploadValidationException(string message) : base(message)
        {
        }
    }
}