using System.Text;
using Microsoft.Extensions.FileProviders;
using apli_website_rebuild.Configuration;

namespace apli_website_rebuild.Services;

public class PublicPageRenderer
{
    private readonly IWebHostEnvironment _env;
    private readonly PublicPageOptions _options;
    private readonly string _newsFile;

    public PublicPageRenderer(IWebHostEnvironment env, PublicPageOptions options, string newsFile)
    {
        _env = env;
        _options = options;
        _newsFile = newsFile;
    }

    // 回傳 null   = 這個請求不歸我處理，交給下一個 middleware
    // 回傳空字串 = 我已經處理完了（轉址或 404），不用再輸出內容
    // 回傳 HTML  = 要輸出的頁面
    public async Task<string?> TryRenderAsync(HttpContext context, string requestPath, CancellationToken cancellationToken)
    {
        if (!HttpMethods.IsGet(context.Request.Method))
        {
            return null;
        }

        // 1. 舊的 .html 網址，永久轉址到新網址
        if (_options.LegacyPageRedirects.TryGetValue(requestPath, out string? canonicalPath))
        {
            context.Response.Redirect(canonicalPath + context.Request.QueryString, true);
            return string.Empty;
        }

        // 2. /news-detail 本身不是有效頁面
        if (requestPath.Equals("/news-detail", StringComparison.OrdinalIgnoreCase) ||
            requestPath.Equals("/news-detail.html", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = 404;
            return string.Empty;
        }

        // 3. /news/{id}：新聞詳細頁
        NewsItem? newsItem = null;
        string[] parts = requestPath.Split('/', StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length == 2 && parts[0].Equals("news", StringComparison.OrdinalIgnoreCase))
        {
            string newsId = Uri.UnescapeDataString(parts[1]);
            newsItem = await FindPublicNewsAsync(newsId);

            if (newsItem == null)
            {
                context.Response.StatusCode = 404;
                return string.Empty;
            }
        }

        // 4. 決定要讀哪個 html 檔
        string? pageFile = null;
        if (newsItem != null)
        {
            pageFile = "news-detail.html";
        }
        else
        {
            _options.PublicPagePaths.TryGetValue(requestPath, out pageFile);
        }

        if (pageFile == null)
        {
            return null;
        }

        IFileInfo staticPage = _env.WebRootFileProvider.GetFileInfo(pageFile);
        if (!staticPage.Exists)
        {
            return null;
        }

        string html = await ReadFileAsync(staticPage, cancellationToken);

        // 頁面沒有 footer 標記就不處理，維持原本行為
        if (!html.Contains(_options.SharedFooterMarker))
        {
            return null;
        }

        // 5. 把共用 footer 塞進去
        string footerPath = Path.Combine(_env.ContentRootPath, _options.SharedFooterPath);
        string footerHtml = await File.ReadAllTextAsync(footerPath, cancellationToken);
        html = html.Replace(_options.SharedFooterMarker, footerHtml);

        // 6. SEO：把新聞內容直接寫進 HTML
        if (newsItem != null)
        {
            html = NewsSeoService.RenderDetailPage(html, newsItem);
        }
        else if (pageFile == "index.html")
        {
            var publicNews = await ReadPublicNewsAsync();
            html = NewsSeoService.RenderHomeLatest(html, NewsService.SortByLatest(publicNews));
        }
        else if (pageFile == "news.html")
        {
            var publicNews = await ReadPublicNewsAsync();
            html = NewsSeoService.RenderNewsList(html, NewsService.SortByLatest(publicNews));
        }

        return html;
    }

    public async Task WriteHtmlResponseAsync(HttpContext context, string html, CancellationToken cancellationToken)
    {
        byte[] bytes = Encoding.UTF8.GetBytes(html);
        context.Response.ContentType = "text/html; charset=utf-8";
        context.Response.ContentLength = bytes.Length;
        await context.Response.Body.WriteAsync(bytes, cancellationToken);
    }

    // 讀出所有「公開」的新聞
    private async Task<List<NewsItem>> ReadPublicNewsAsync()
    {
        var allNews = await NewsService.ReadAsync(_newsFile);
        var result = new List<NewsItem>();

        foreach (NewsItem item in allNews)
        {
            if (NewsService.IsPublicNewsItem(item))
            {
                result.Add(item);
            }
        }

        return result;
    }

    // 用 id 找一則公開的新聞，找不到回傳 null
    private async Task<NewsItem?> FindPublicNewsAsync(string newsId)
    {
        var publicNews = await ReadPublicNewsAsync();

        foreach (NewsItem item in publicNews)
        {
            if (item.Id == newsId)
            {
                return item;
            }
        }

        return null;
    }

    private static async Task<string> ReadFileAsync(IFileInfo file, CancellationToken cancellationToken)
    {
        using var stream = file.CreateReadStream();
        using var reader = new StreamReader(stream, Encoding.UTF8);
        return await reader.ReadToEndAsync(cancellationToken);
    }
}