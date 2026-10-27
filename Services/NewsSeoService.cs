using System.Net;
using System.Text;
using System.Text.RegularExpressions;

namespace apli_website_rebuild.Services;

public static class NewsSeoService
{
    public const string MetadataMarker = "<!-- news-detail-seo -->";
    public const string BreadcrumbMarker = "<!-- news-detail-breadcrumb -->";
    public const string DateMarker = "<!-- news-detail-date -->";
    public const string TagMarker = "<!-- news-detail-tag -->";
    public const string TitleMarker = "<!-- news-detail-title -->";
    public const string MediaMarker = "<!-- news-detail-media -->";
    public const string ImageStateMarker = "news-detail-image-state";
    public const string ContentMarker = "<!-- news-detail-content -->";
    public const string AttachmentMarker = "<!-- news-detail-attachment -->";
    public const string HomeLatestMarker = "<!-- home-latest-items -->";
    public const string NewsListMarker = "<!-- news-list-items -->";

    // 首頁「最新消息」區塊最多顯示幾則新聞
    private const int HomeLatestItemCount = 4;

    // 舊資料若使用預設新聞圖,詳細頁用此路徑辨識
    private const string DefaultNewsImagePath = "/public/images/index/news.png";

    // ===== 新聞詳細頁 =====

    public static string RenderDetailPage(string pageMarkup, NewsItem item, HttpRequest request)
    {
        string pageTitle = BuildPageTitle(item);
        string description = BuildDescription(item);
        string title = Encode(item.Title);
        string pageUrl = BuildAbsoluteUrl(request, request.Path.ToString());
        string? imageUrl = HasCustomNewsImage(item) ? BuildAbsoluteUrl(request, item.ImageUrl) : null;

        string imageState = " news-detail--without-image";
        if (HasCustomNewsImage(item))
        {
            imageState = " news-detail--with-image";
        }

        string result = pageMarkup;
        result = result.Replace(MetadataMarker, BuildMetadata(pageTitle, description, item, pageUrl, imageUrl));
        result = result.Replace(BreadcrumbMarker, title);
        result = result.Replace(DateMarker, Encode(item.Date));
        result = result.Replace(TagMarker, Encode(item.Tag));
        result = result.Replace(TitleMarker, title);
        result = result.Replace(ImageStateMarker, imageState);
        result = result.Replace(MediaMarker, BuildMediaMarkup(item));
        result = result.Replace(ContentMarker, BuildContentMarkup(item.Content, item.Title));
        result = result.Replace(AttachmentMarker, BuildAttachmentMarkup(item));

        return result;
    }

    // 瀏覽器分頁標題 / <title> 標籤的內容
    public static string BuildPageTitle(NewsItem item)
    {
        string title = item.Title.Trim();

        if (title == "")
        {
            return "最新消息 - 亞太國際物流";
        }

        return title + " - 亞太國際物流";
    }

    // 搜尋引擎顯示搜尋結果時用的 meta description。
    // Google 大概只會顯示前面 150~160 字左右,寫更長也沒意義,
    // 所以這裡直接裁到 160 字以內。
    public static string BuildDescription(NewsItem item)
    {
        string source = RemoveExtraWhitespace(item.Content);

        // 沒有內文就改用標題
        if (source == "")
        {
            source = item.Title.Trim();
        }

        if (source.Length > 160)
        {
            source = source.Substring(0, 160).TrimEnd();
        }

        // 標題也是空的,就用預設說明
        if (source == "")
        {
            return "亞太國際物流最新消息與官方公告";
        }

        return source;
    }

    private static string BuildMetadata(
        string title,
        string description,
        NewsItem item,
        string pageUrl,
        string? imageUrl)
    {
        string encodedTitle = Encode(title);
        string encodedDescription = Encode(description);
        string encodedPageUrl = Encode(pageUrl);
        string imageMetadata = "";
        string twitterCard = "summary";

        if (!string.IsNullOrWhiteSpace(imageUrl))
        {
            string encodedImageUrl = Encode(imageUrl);
            imageMetadata = "<meta property='og:image' content='" + encodedImageUrl + "'>\n" +
                            "<meta property='og:image:alt' content='" + encodedTitle + "'>\n" +
                            "<meta name='twitter:image' content='" + encodedImageUrl + "'>\n";
            twitterCard = "summary_large_image";
        }

        return "<meta name='description' content='" + encodedDescription + "'>\n" +
               "<title>" + encodedTitle + "</title>\n" +
               "<link rel='canonical' href='" + encodedPageUrl + "'>\n" +
               "<meta property='og:type' content='article'>\n" +
               "<meta property='og:site_name' content='亞太國際物流'>\n" +
               "<meta property='og:url' content='" + encodedPageUrl + "'>\n" +
               "<meta property='og:title' content='" + encodedTitle + "'>\n" +
               "<meta property='og:description' content='" + encodedDescription + "'>\n" +
               imageMetadata +
               "<meta property='og:locale' content='zh_TW'>\n" +
               "<meta property='article:published_time' content='" + Encode(item.Date) + "'>\n" +
               "<meta property='article:section' content='" + Encode(item.Tag) + "'>\n" +
               "<meta name='twitter:card' content='" + twitterCard + "'>";
    }

    private static string BuildAbsoluteUrl(HttpRequest request, string pathOrUrl)
    {
        if (Uri.TryCreate(pathOrUrl, UriKind.Absolute, out Uri? absoluteUrl))
        {
            return absoluteUrl.AbsoluteUri;
        }

        string origin = request.Scheme + "://" + request.Host.Value + request.PathBase;
        return origin + "/" + pathOrUrl.TrimStart('/');
    }

    // 新聞詳細頁的媒體欄位。
    // 沒有自訂圖片時直接不輸出,避免留下空欄位或 placeholder。
    private static string BuildMediaMarkup(NewsItem item)
    {
        if (!HasCustomNewsImage(item))
        {
            return "";
        }

        string img = "<img class='news-detail__image'" +
                     " src='" + Encode(item.ImageUrl) + "'" +
                     " alt='" + Encode(item.Title) + "'" +
                     " loading='eager' decoding='sync'>";

        return "<div class='news-detail__media'>" + img + "</div>";
    }

    private static string BuildAttachmentMarkup(NewsItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Url))
        {
            return "";
        }

        string fileName = item.AttachmentName;
        if (string.IsNullOrWhiteSpace(fileName))
        {
            string urlPath = item.Url.Split('?', '#')[0].TrimEnd('/');
            int slashIndex = urlPath.LastIndexOf('/');
            string encodedName = slashIndex >= 0 ? urlPath[(slashIndex + 1)..] : urlPath;

            try
            {
                fileName = Uri.UnescapeDataString(encodedName);
            }
            catch (UriFormatException)
            {
                fileName = encodedName;
            }
        }

        return "<div class='news-detail__attachment'>" +
               "<p class='news-detail__attachment-heading'>附件：</p>" +
               "<a class='news-detail__attachment-link' href='" + Encode(item.Url) + "' target='_blank' rel='noopener'>" +
               "<i class='ph ph-paperclip' aria-hidden='true'></i>" +
               "<span>" + Encode(fileName) + "</span>" +
               "</a>" +
               "</div>";
    }

    // 有圖片,而且不是預設圖,才算「自訂圖片」
    private static bool HasCustomNewsImage(NewsItem item)
    {
        if (string.IsNullOrWhiteSpace(item.ImageUrl))
        {
            return false;
        }

        string imagePath = item.ImageUrl.Trim();

        // 去掉網址後面的 ?xxx 或 #xxx
        int queryIndex = imagePath.IndexOfAny(new char[] { '?', '#' });
        if (queryIndex >= 0)
        {
            imagePath = imagePath.Substring(0, queryIndex);
        }

        // 有沒有開頭的 / 都算同一個路徑
        if (!imagePath.StartsWith("/"))
        {
            imagePath = "/" + imagePath;
        }

        return !imagePath.Equals(DefaultNewsImagePath, StringComparison.OrdinalIgnoreCase);
    }

    // 把新聞內文依照換行字元切成一段一段,每一段包成一個 <p> 標籤,
    // 空白行直接跳過,不要產生空的 <p></p>。
    private static string BuildContentMarkup(string content, string title)
    {
        var builder = new StringBuilder();

        if (content == null)
        {
            return "";
        }

        string titleText = (title ?? "").Trim();
        string[] lines = content.Split('\n');
        bool hasAdditionalContent = false;

        foreach (string line in lines)
        {
            string paragraph = line.Trim();
            if (paragraph != "" && paragraph != titleText)
            {
                hasAdditionalContent = true;
                break;
            }
        }

        bool isFirstContentLine = true;
        foreach (string line in lines)
        {
            string paragraph = line.Trim();

            if (paragraph == "")
            {
                continue;
            }

            if (isFirstContentLine && hasAdditionalContent && paragraph == titleText)
            {
                isFirstContentLine = false;
                continue;
            }

            isFirstContentLine = false;

            builder.Append("<p>" + Encode(paragraph) + "</p>");
        }

        return builder.ToString();
    }

    // ===== 首頁與列表頁 =====

    public static string RenderHomeLatest(string pageMarkup, IReadOnlyList<NewsItem> items)
    {
        if (!pageMarkup.Contains(HomeLatestMarker))
        {
            return pageMarkup;
        }

        if (items.Count == 0)
        {
            string emptyHtml = "<p class='home-latest__empty'>目前沒有可顯示的最新消息。</p>";
            return pageMarkup
                .Replace(HomeLatestMarker, emptyHtml)
                .Replace("<section class=\"home-latest\"", "<section class=\"home-latest is-empty\"");
        }

        NewsItem featuredItem = items[0];
        string featureLink = "/news/" + Uri.EscapeDataString(featuredItem.Id);
        string featureImage = string.IsNullOrWhiteSpace(featuredItem.ImageUrl)
            ? "public/images/index/news-feature.png"
            : featuredItem.ImageUrl;
        string result = pageMarkup
            .Replace("data-home-latest-feature href=\"/news\"", "data-home-latest-feature href=\"" + Encode(featureLink) + "\"")
            .Replace("aria-label=\"查看最新消息\"", "aria-label=\"" + Encode(featuredItem.Title) + "\"")
            .Replace("src=\"public/images/index/news-feature.png\"", "src=\"" + Encode(featureImage) + "\"")
            .Replace("alt=\"最新消息主視覺\"", "alt=\"" + Encode(featuredItem.Title) + "\"")
            .Replace("data-home-latest-feature-date></span>", "data-home-latest-feature-date>" + Encode(featuredItem.Date) + "</span>")
            .Replace("<span class=\"home-latest__feature-label\">最新公告</span>", "<span class=\"home-latest__feature-label\">" + Encode(GetTag(featuredItem)) + "</span>")
            .Replace("data-home-latest-feature-title>查看最新公告</span>", "data-home-latest-feature-title>" + Encode(featuredItem.Title) + "</span>");

        var builder = new StringBuilder();

        // 只顯示最前面幾則(首頁不會顯示全部)
        int count = Math.Min(items.Count, HomeLatestItemCount);
        for (int i = 1; i < count; i++)
        {
            builder.Append(BuildHomeLatestItemHtml(items[i]));
        }

        result = result.Replace(HomeLatestMarker, builder.ToString());
        return result.Replace("<a class=\"button--primary home-latest__more-link\" href=\"/news\" hidden>",
            "<a class=\"button--primary home-latest__more-link\" href=\"/news\">");
    }

    // 最新消息列表頁:渲染完整的新聞列表,理由跟 RenderHomeLatest 一樣。
    public static string RenderNewsList(string pageMarkup, IReadOnlyList<NewsItem> items)
    {
        if (!pageMarkup.Contains(NewsListMarker))
        {
            return pageMarkup;
        }

        var builder = new StringBuilder();

        foreach (NewsItem item in items)
        {
            builder.Append(BuildNewsListItemHtml(item));
        }

        return pageMarkup.Replace(NewsListMarker, builder.ToString());
    }

    private static string BuildHomeLatestItemHtml(NewsItem item)
    {
        string link = "/news/" + Uri.EscapeDataString(item.Id);
        string tag = Encode(GetTag(item));
        string date = Encode(item.Date);

        return "<a class='home-latest__item' href='" + link + "'>\n" +
               "  <span class='home-latest__meta'>" +
                        "<time class='home-latest__date' datetime='" + date + "'>" + date + "</time>" +
                        "<span class='home-latest__label'>" + tag + "</span></span>\n" +
               "  <h3>" + Encode(item.Title) + "</h3>\n" +
               "</a>\n";
    }

    // 「最新消息」列表頁,一則新聞長這樣:
    //   日期 + 分類 + 標題 + 導向箭頭
    private static string BuildNewsListItemHtml(NewsItem item)
    {
        string link = "/news/" + Uri.EscapeDataString(item.Id);
        string tag = Encode(GetTag(item));
        string date = Encode(item.Date);

        string title = "最新消息";
        if (!string.IsNullOrWhiteSpace(item.Title))
        {
            title = item.Title;
        }

        return "<article class='news-item' data-news-item data-category='" + tag + "'>\n" +
               "  <a class='news-card' href='" + link + "'>\n" +
               "    <span class='news-card__body'>\n" +
               "      <span class='news-card__meta'>\n" +
               "        <time class='news-card__date' datetime='" + date + "'>" + date + "</time>\n" +
               "        <span class='news-card__tag'>" + tag + "</span>\n" +
               "      </span>\n" +
               "      <strong class='news-card__title'>" + Encode(title) + "</strong>\n" +
               "    </span>\n" +
               "    <span class='news-card__arrow-window' aria-hidden='true'>" +
               "      <svg class='news-card__link-icon' viewBox='0 0 16 16' focusable='false'><path d='M2.5 8h10.25M8.25 3.25 13 8l-4.75 4.75'></path></svg>" +
               "      <svg class='news-card__link-icon' viewBox='0 0 16 16' focusable='false'><path d='M2.5 8h10.25M8.25 3.25 13 8l-4.75 4.75'></path></svg>" +
               "    </span>\n" +
               "  </a>\n" +
               "</article>\n";
    }

    // ===== 小工具 =====

    // 沒填分類就顯示「最新消息」
    private static string GetTag(NewsItem item)
    {
        if (string.IsNullOrWhiteSpace(item.Tag))
        {
            return "最新消息";
        }

        return item.Tag;
    }

    // 連續的空白、換行合成一個空格,並去掉頭尾空白
    private static string RemoveExtraWhitespace(string text)
    {
        if (text == null)
        {
            return "";
        }

        return Regex.Replace(text, @"\s+", " ").Trim();
    }

    // JSON 裡的欄位可能是 null,所以這裡保留 null 的處理
    private static string Encode(string value)
    {
        if (value == null)
        {
            return "";
        }

        return WebUtility.HtmlEncode(value);
    }
}
