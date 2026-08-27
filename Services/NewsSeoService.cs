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

  // 首頁「最新消息」區塊最多顯示幾則新聞
  private const int HomeLatestItemCount = 8;

  // 新聞沒有自己的圖片時,列表頁要用哪張圖片頂替
  private const string DefaultNewsImageUrl = "/public/images/index/news.png?v=20260821-default-v2";


  public static string RenderDetailPage(string pageMarkup, NewsItem item)
  {
    var pageTitle = BuildPageTitle(item);
    var pageDescription = BuildDescription(item);
    var encodedTitle = Encode(item.Title);

    var result = pageMarkup;
    result = result.Replace(MetadataMarker, BuildMetadata(pageTitle, pageDescription, item), StringComparison.Ordinal);
    result = result.Replace(BreadcrumbMarker, encodedTitle, StringComparison.Ordinal);
    result = result.Replace(DateMarker, Encode(item.Date), StringComparison.Ordinal);
    result = result.Replace(TagMarker, Encode(item.Tag), StringComparison.Ordinal);
    result = result.Replace(TitleMarker, encodedTitle, StringComparison.Ordinal);
    result = result.Replace(ImageMarker, BuildImageMarkup(item), StringComparison.Ordinal);
    result = result.Replace(ContentMarker, BuildContentMarkup(item.Content), StringComparison.Ordinal);

    return result;
  }

  // 瀏覽器分頁標題 / <title> 標籤的內容
  public static string BuildPageTitle(NewsItem item)
  {
    var title = item.Title.Trim();

    if (string.IsNullOrWhiteSpace(title))
    {
      return "最新消息 - 亞太國際物流";
    }

    return $"{title} - 亞太國際物流";
  }

  // 搜尋引擎顯示搜尋結果時用的 meta description。
  // Google 大概只會顯示前面 150~160 字左右,寫更長也沒意義,
  // 所以這裡直接裁到 160 字以內。
  public static string BuildDescription(NewsItem item)
  {
    var plainContent = RemoveExtraWhitespace(item.Content);

    var source = string.IsNullOrWhiteSpace(plainContent) ? item.Title.Trim() : plainContent;

    if (source.Length > 160)
    {
      source = source.Substring(0, 160).TrimEnd();
    }

    if (string.IsNullOrWhiteSpace(source))
    {
      return "亞太國際物流最新消息與官方公告";
    }

    return source;
  }


  public static string RenderHomeLatest(string pageMarkup, IReadOnlyList<NewsItem> items)
  {
    if (!pageMarkup.Contains(HomeLatestMarker, StringComparison.Ordinal))
      return pageMarkup;

    string itemsHtml;

    if (items.Count == 0)
      itemsHtml = "<p class=\"home-latest__empty\">目前沒有可顯示的最新消息。</p>";
    else
    {
      var builder = new StringBuilder();

      // 只取最前面 HomeLatestItemCount 則新聞(首頁不會顯示全部)
      var itemsToShow = items.Take(HomeLatestItemCount);

      foreach (var item in itemsToShow)
      {
        builder.Append(BuildHomeLatestItemHtml(item));
      }

      itemsHtml = builder.ToString();
    }

    return pageMarkup.Replace(HomeLatestMarker, itemsHtml, StringComparison.Ordinal);
  }

  // 最新消息列表頁:渲染完整的新聞列表,理由跟 RenderHomeLatest 一樣。
  public static string RenderNewsList(string pageMarkup, IReadOnlyList<NewsItem> items)
  {
    if (!pageMarkup.Contains(NewsListMarker, StringComparison.Ordinal))
      return pageMarkup;

    var builder = new StringBuilder();

    foreach (var item in items)
    {
      builder.Append(BuildNewsListItemHtml(item));
    }

    return pageMarkup.Replace(NewsListMarker, builder.ToString(), StringComparison.Ordinal);
  }


  private static string BuildHomeLatestItemHtml(NewsItem item)
  {
    var newsId = item.Id ?? string.Empty;
    var link = $"/news/{Uri.EscapeDataString(newsId)}";
    var summary = Summarize(item.Content);

    var imageHtml = "";
    if (!string.IsNullOrWhiteSpace(item.ImageUrl))
      imageHtml = $"<img src=\"{Encode(item.ImageUrl)}\" alt=\"\" loading=\"lazy\" decoding=\"async\">";

    var summaryHtml = "";
    if (!string.IsNullOrEmpty(summary))
      summaryHtml = $"<span class=\"home-latest__summary\">{Encode(summary)}</span>";

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

  // 「最新消息」列表頁,一則新聞長這樣:
  //   圖片 + 日期分類 + 標題 + 摘要(可能含附件圖示) + 右邊箭頭
  private static string BuildNewsListItemHtml(NewsItem item)
  {
    var newsId = item.Id ?? string.Empty;
    var link = $"/news/{Uri.EscapeDataString(newsId)}";
    var encodedTag = Encode(item.Tag);
    var summary = Summarize(item.Content);
    var hasAttachment = !string.IsNullOrWhiteSpace(item.Url);

    // 如果既沒有摘要文字、也沒有附件,那整段摘要區塊就不需要顯示,
    // 用 HTML 的 hidden 屬性把它藏起來。
    var hasSummaryText = !string.IsNullOrEmpty(summary);
    var shouldShowSummaryBlock = hasSummaryText || hasAttachment;
    var summaryHiddenAttribute = shouldShowSummaryBlock ? "" : " hidden";

    // 附件小圖示:有附件才顯示，沒有就用 hidden 屬性藏起來
    var attachmentHiddenAttribute = hasAttachment ? "" : " hidden";

    // 新聞自己沒有圖片時,用預設圖片頂替,列表頁的版面才不會空一塊
    var imageUrl = string.IsNullOrWhiteSpace(item.ImageUrl) ? DefaultNewsImageUrl : item.ImageUrl;

    return $"""
            <article class="news-item" data-news-item data-category="{encodedTag}">
              <a class="news-row" href="{link}">
                <span class="news-row__media">
                  <img class="news-row__image" src="{Encode(imageUrl)}" alt="" loading="lazy" decoding="async">
                </span>
                <span class="news-row__body">
                  <span class="news-row__meta">
                    <time class="news-row__date" datetime="{Encode(item.Date)}">{Encode(item.Date)}</time>
                    <span class="news-row__tag">{encodedTag}</span>
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

  private static string Summarize(string content)
  {
    return RemoveExtraWhitespace(content);
  }

  private static string RemoveExtraWhitespace(string? text)
  {
    var value = text ?? string.Empty;
    var singleSpaced = Regex.Replace(value, @"\s+", " ");
    return singleSpaced.Trim();
  }

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

  // 新聞詳細頁的主圖 <img> 標籤。
  // 沒有圖片時,先放一個「隱藏起來」的 <img>,保留這個標籤的位置,
  // 讓前端 JavaScript 之後如果需要,還是找得到這個元素。
  private static string BuildImageMarkup(NewsItem item)
  {
    if (string.IsNullOrWhiteSpace(item.ImageUrl))
    {
      return "<img class=\"news-detail__image\" data-news-image alt=\"\" hidden loading=\"eager\" decoding=\"sync\">";
    }

    var encodedImageUrl = Encode(item.ImageUrl);
    var encodedTitle = Encode(item.Title);

    return $"<img class=\"news-detail__image\" data-news-image src=\"{encodedImageUrl}\" alt=\"{encodedTitle}\" loading=\"eager\" decoding=\"sync\">";
  }

  // 把新聞內文依照換行字元切成一段一段,每一段包成一個 <p> 標籤,
  // 空白行直接跳過,不要產生空的 <p></p>。
  private static string BuildContentMarkup(string content)
  {
    var builder = new StringBuilder();
    var value = content ?? string.Empty;
    var paragraphs = value.Split('\n');

    foreach (var paragraph in paragraphs)
    {
      var trimmedParagraph = paragraph.Trim();

      if (string.IsNullOrWhiteSpace(trimmedParagraph))
      {
        continue;
      }

      builder.Append("<p>");
      builder.Append(Encode(trimmedParagraph));
      builder.Append("</p>");
    }

    return builder.ToString();
  }

  private static string Encode(string? value)
  {
    return WebUtility.HtmlEncode(value ?? string.Empty);
  }
}