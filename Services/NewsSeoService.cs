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
    public const string ImageMarker = "<!-- news-detail-image -->";
    public const string ContentMarker = "<!-- news-detail-content -->";
    public const string HomeLatestMarker = "<!-- home-latest-items -->";
    public const string NewsListMarker = "<!-- news-list-items -->";

    private const int HomeLatestItemCount = 8;
    private const string DefaultNewsImageUrl = "/public/images/index/news.png?v=20260821-default-v2";

    // ============================================================
    // 新聞詳細頁:把 HTML 裡的各個標記(marker)換成實際的新聞內容
    // ============================================================
    public static string RenderDetailPage(string pageMarkup, NewsItem item)
    {
        var title = BuildPageTitle(item);
        var description = BuildDescription(item);
        var encodedTitle = Encode(item.Title);

        return pageMarkup
            .Replace(MetadataMarker, BuildMetadata(title, description, item), StringComparison.Ordinal)
            .Replace(BreadcrumbMarker, encodedTitle, StringComparison.Ordinal)
            .Replace(DateMarker, Encode(item.Date), StringComparison.Ordinal)
            .Replace(TagMarker, Encode(item.Tag), StringComparison.Ordinal)
            .Replace(TitleMarker, encodedTitle, StringComparison.Ordinal)
            .Replace(ImageMarker, BuildImageMarkup(item), StringComparison.Ordinal)
            .Replace(ContentMarker, BuildContentMarkup(item.Content), StringComparison.Ordinal);
    }

    public static string BuildPageTitle(NewsItem item)
    {
        var title = item.Title.Trim();
        return string.IsNullOrWhiteSpace(title)
            ? "最新消息 - 亞太國際物流"
            : $"{title} - 亞太國際物流";
    }

    // meta description 要短一點,超過 160 字就裁掉,搜尋引擎顯示不下那麼多字
    public static string BuildDescription(NewsItem item)
    {
        var plainContent = Regex.Replace(item.Content ?? string.Empty, @"\s+", " ").Trim();
        var source = string.IsNullOrWhiteSpace(plainContent) ? item.Title.Trim() : plainContent;

        if (source.Length > 160)
        {
            source = source[..160].TrimEnd();
        }

        return string.IsNullOrWhiteSpace(source)
            ? "亞太國際物流最新消息與官方公告"
            : source;
    }

    /// <summary>
    /// 首頁最新消息:把公開新聞資料直接渲染成 HTML,這樣就算瀏覽器沒有執行 JavaScript,
    /// 首頁還是能顯示最新消息(對 SEO 跟一些舊瀏覽器比較友善)。
    /// </summary>
    public static string RenderHomeLatest(string pageMarkup, IReadOnlyList<NewsItem> items)
    {
        if (!pageMarkup.Contains(HomeLatestMarker, StringComparison.Ordinal))
        {
            return pageMarkup;
        }

        string itemsMarkup;
        if (items.Count == 0)
        {
            itemsMarkup = "<p class=\"home-latest__empty\">目前沒有可顯示的最新消息。</p>";
        }
        else
        {
            var markup = new StringBuilder();
            foreach (var item in items.Take(HomeLatestItemCount))
            {
                markup.Append(BuildHomeLatestItem(item));
            }

            itemsMarkup = markup.ToString();
        }

        return pageMarkup.Replace(HomeLatestMarker, itemsMarkup, StringComparison.Ordinal);
    }

    /// <summary>
    /// 最新消息列表頁:渲染完整的新聞列表,理由跟 RenderHomeLatest 一樣。
    /// </summary>
    public static string RenderNewsList(string pageMarkup, IReadOnlyList<NewsItem> items)
    {
        if (!pageMarkup.Contains(NewsListMarker, StringComparison.Ordinal))
        {
            return pageMarkup;
        }

        var markup = new StringBuilder();
        foreach (var item in items)
        {
            markup.Append(BuildNewsListItem(item));
        }

        return pageMarkup.Replace(NewsListMarker, markup.ToString(), StringComparison.Ordinal);
    }

    // 首頁「最新消息」區塊,一則新聞長這樣:一張小圖 + 日期分類 + 標題 + 摘要
    private static string BuildHomeLatestItem(NewsItem item)
    {
        var link = $"/news/{Uri.EscapeDataString(item.Id ?? string.Empty)}";
        var summary = Summarize(item.Content);

        var imageHtml = string.IsNullOrWhiteSpace(item.ImageUrl)
            ? ""
            : $"<img src=\"{Encode(item.ImageUrl)}\" alt=\"\" loading=\"lazy\" decoding=\"async\">";

        var summaryHtml = string.IsNullOrEmpty(summary)
            ? ""
            : $"<span class=\"home-latest__summary\">{Encode(summary)}</span>";

        return $"""
            <a class="home-latest__item" href="{link}">
              <span class="home-latest__media">{imageHtml}</span>
              <span class="home-latest__body">
                <span class="home-latest__meta">
                  <time datetime="{Encode(item.Date)}">{Encode(item.Date)}</time>
                  <span>{Encode(item.Tag)}</span>
                </span>
                <strong>{Encode(item.Title)}</strong>
                {summaryHtml}
              </span>
            </a>
            """;
    }

    // 「最新消息」列表頁,一則新聞長這樣:圖片 + 日期分類 + 標題 + 摘要(可能含附件圖示) + 右邊箭頭
    private static string BuildNewsListItem(NewsItem item)
    {
        var link = $"/news/{Uri.EscapeDataString(item.Id ?? string.Empty)}";
        var tag = Encode(item.Tag);
        var summary = Summarize(item.Content);
        var hasAttachment = !string.IsNullOrWhiteSpace(item.Url);

        // 沒有摘要文字、又沒有附件的話,整個摘要區塊就不需要顯示
        var hideSummary = string.IsNullOrEmpty(summary) && !hasAttachment;
        var summaryHiddenAttribute = hideSummary ? " hidden" : "";
        var attachmentHiddenAttribute = hasAttachment ? "" : " hidden";

        var imageUrl = string.IsNullOrWhiteSpace(item.ImageUrl) ? DefaultNewsImageUrl : item.ImageUrl;

        return $"""
            <article class="news-item" data-news-item data-category="{tag}">
              <a class="news-row" href="{link}">
                <span class="news-row__media">
                  <img class="news-row__image" src="{Encode(imageUrl)}" alt="" loading="lazy" decoding="async">
                </span>
                <span class="news-row__body">
                  <span class="news-row__meta">
                    <time class="news-row__date" datetime="{Encode(item.Date)}">{Encode(item.Date)}</time>
                    <span class="news-row__tag">{tag}</span>
                  </span>
                  <span class="news-row__title">{Encode(item.Title)}</span>
                  <span class="news-row__summary"{summaryHiddenAttribute}>
                    <span class="news-row__attachment"{attachmentHiddenAttribute}>
                      <i class="ph ph-paperclip" aria-hidden="true"></i>
                      <span class="sr-only">含附件：</span>
                    </span>
                    <span class="news-row__summary-text">{Encode(summary)}</span>
                  </span>
                </span>
                <span class="news-row__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
            </article>
            """;
    }

    // 把內文裡多餘的空白(換行、連續空格)壓成一個空格,拿來當摘要用
    private static string Summarize(string content) =>
        Regex.Replace(content ?? string.Empty, @"\s+", " ").Trim();

    // 新聞詳細頁 <head> 裡要用到的 SEO 標籤(meta description、Open Graph 等)
    private static string BuildMetadata(string title, string description, NewsItem item)
    {
        var encodedTitle = Encode(title);
        var encodedDescription = Encode(description);
        var encodedDate = Encode(item.Date);
        var encodedTag = Encode(item.Tag);

        return $"""
            <meta name="description" content="{encodedDescription}">
            <title>{encodedTitle}</title>
            <meta property="og:type" content="article">
            <meta property="og:site_name" content="亞太國際物流">
            <meta property="og:title" content="{encodedTitle}">
            <meta property="og:description" content="{encodedDescription}">
            <meta property="og:locale" content="zh_TW">
            <meta property="article:published_time" content="{encodedDate}">
            <meta property="article:section" content="{encodedTag}">
            <meta name="twitter:card" content="summary">
            """;
    }

    // 新聞沒有圖片的話,就先放一個隱藏的 <img>,前端 JS 之後可能會用到這個 tag
    private static string BuildImageMarkup(NewsItem item)
    {
        if (string.IsNullOrWhiteSpace(item.ImageUrl))
        {
            return "<img class=\"news-detail__image\" data-news-image alt=\"\" hidden loading=\"eager\" decoding=\"sync\">";
        }

        return $"<img class=\"news-detail__image\" data-news-image src=\"{Encode(item.ImageUrl)}\" alt=\"{Encode(item.Title)}\" loading=\"eager\" decoding=\"sync\">";
    }

    // 內文用換行字元切成一段一段,每段包成一個 <p>,空白行直接跳過
    private static string BuildContentMarkup(string content)
    {
        var markup = new StringBuilder();

        foreach (var paragraph in (content ?? string.Empty).Split('\n'))
        {
            var trimmed = paragraph.Trim();
            if (!string.IsNullOrWhiteSpace(trimmed))
            {
                markup.Append("<p>").Append(Encode(trimmed)).Append("</p>");
            }
        }

        return markup.ToString();
    }

    // 把使用者輸入的文字做 HTML escape,防止內容裡的 <script> 之類的東西被當成真的標籤執行(XSS)
    private static string Encode(string value) => WebUtility.HtmlEncode(value ?? string.Empty);
}