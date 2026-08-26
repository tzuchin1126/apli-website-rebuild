using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Hosting;
using apli_website_rebuild.Configuration;

namespace apli_website_rebuild.Services;

public sealed class PublicPageRenderer
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

    public async Task<string?> TryRenderAsync(HttpContext context, string requestPath, CancellationToken cancellationToken)
    {
        if (!HttpMethods.IsGet(context.Request.Method))
        {
            return null;
        }

        // 1. Legacy .html redirects
        if (_options.LegacyPageRedirects.TryGetValue(requestPath, out var canonicalPath))
        {
            context.Response.Redirect($"{canonicalPath}{context.Request.QueryString}", permanent: true);
            return string.Empty;
        }

        // 2. /news-detail is not a valid page
        if (string.Equals(requestPath, "/news-detail", StringComparison.OrdinalIgnoreCase) ||
            string.Equals(requestPath, "/news-detail.html", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            return string.Empty;
        }

        // 3. /news/{id} news detail page
        var pathSegments = requestPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        var isNewsDetailPath = pathSegments.Length == 2 &&
            string.Equals(pathSegments[0], "news", StringComparison.OrdinalIgnoreCase) &&
            !string.IsNullOrWhiteSpace(pathSegments[1]);

        NewsItem? newsItem = null;

        if (isNewsDetailPath)
        {
            var newsId = Uri.UnescapeDataString(pathSegments[1]);
            var allNews = await NewsService.ReadAsync(_newsFile);
            newsItem = allNews.FirstOrDefault(item =>
                string.Equals(item.Id, newsId, StringComparison.Ordinal) &&
                NewsService.IsPublicNewsItem(item));

            if (newsItem is null)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                return string.Empty;
            }
        }

        // 4. Public pages from dictionary
        var hasPublicPage = _options.PublicPagePaths.TryGetValue(requestPath, out var pageFile);
        if (!hasPublicPage && !isNewsDetailPath)
        {
            return null;
        }

        pageFile = isNewsDetailPath ? "news-detail.html" : pageFile!;
        var staticPage = _env.WebRootFileProvider.GetFileInfo(pageFile);

        if (!staticPage.Exists)
        {
            return null;
        }

        var pageMarkup = await ReadFileAsync(staticPage, cancellationToken);

        if (!pageMarkup.Contains(_options.SharedFooterMarker, StringComparison.Ordinal))
        {
            return null;
        }

        var footerPath = Path.Combine(_env.ContentRootPath, _options.SharedFooterPath);
        var footerMarkup = await File.ReadAllTextAsync(footerPath, cancellationToken);
        var responseMarkup = pageMarkup.Replace(_options.SharedFooterMarker, footerMarkup, StringComparison.Ordinal);

        // SEO SSR for news detail, home, and news list
        if (isNewsDetailPath && newsItem is not null)
        {
            responseMarkup = NewsSeoService.RenderDetailPage(responseMarkup, newsItem);
        }
        else if (string.Equals(pageFile, "index.html", StringComparison.OrdinalIgnoreCase) ||
                 string.Equals(pageFile, "news.html", StringComparison.OrdinalIgnoreCase))
        {
            var publicNews = NewsService.SortByLatest(
                (await NewsService.ReadAsync(_newsFile)).Where(NewsService.IsPublicNewsItem));

            responseMarkup = string.Equals(pageFile, "index.html", StringComparison.OrdinalIgnoreCase)
                ? NewsSeoService.RenderHomeLatest(responseMarkup, publicNews)
                : NewsSeoService.RenderNewsList(responseMarkup, publicNews);
        }

        return responseMarkup;
    }

    public async Task WriteHtmlResponseAsync(HttpContext context, string html, CancellationToken cancellationToken)
    {
        var bytes = Encoding.UTF8.GetBytes(html);
        context.Response.ContentType = "text/html; charset=utf-8";
        context.Response.ContentLength = bytes.Length;
        await context.Response.Body.WriteAsync(bytes, cancellationToken);
    }

    private static async Task<string> ReadFileAsync(IFileInfo file, CancellationToken cancellationToken)
    {
        using var stream = file.CreateReadStream();
        using var reader = new StreamReader(stream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true);
        return await reader.ReadToEndAsync(cancellationToken);
    }
}