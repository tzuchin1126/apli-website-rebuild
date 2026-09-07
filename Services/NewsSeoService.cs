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
  public const string HomeLatestMarker = "<!-- home-latest-items -->";
  public const string NewsListMarker = "<!-- news-list-items -->";

  // 首頁「最新消息」區塊最多顯示幾則新聞
  private const int HomeLatestItemCount = 8;

  // 舊資料若使用預設新聞圖,詳細頁用此路徑辨識
  private const string DefaultNewsImagePath = "/public/images/index/news.png";


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
    result = result.Replace(
      ImageStateMarker,
      HasCustomNewsImage(item) ? " news-detail--with-image" : " news-detail--without-image",
      StringComparison.Ordinal);
    result = result.Replace(MediaMarker, BuildMediaMarkup(item), StringComparison.Ordinal);
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
    var mediaClass = string.IsNullOrWhiteSpace(item.ImageUrl) ? "is-default" : "has-image";

    var summaryHtml = "";
    if (!string.IsNullOrEmpty(summary))
      summaryHtml = $"<span class=\"home-latest__summary\">{Encode(summary)}</span>";

    return $"""
            <a class="home-latest__item" href="{link}">
              <span class="home-latest__media {mediaClass}">{imageHtml}</span>
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
  //   背景圖片 + 分類日期 + 標題 + 附件提示 + 閱讀更多
  private static string BuildNewsListItemHtml(NewsItem item)
  {
    var newsId = item.Id ?? string.Empty;
    var link = $"/news/{Uri.EscapeDataString(newsId)}";
    var encodedTag = Encode(string.IsNullOrWhiteSpace(item.Tag) ? "最新消息" : item.Tag);
    var hasAttachment = !string.IsNullOrWhiteSpace(item.Url);
    var imageHtml = "";
    var mediaClass = string.IsNullOrWhiteSpace(item.ImageUrl) ? "is-default" : "has-image";
    if (!string.IsNullOrWhiteSpace(item.ImageUrl))
      imageHtml = $"<img class=\"news-card__image\" src=\"{Encode(item.ImageUrl)}\" alt=\"\" loading=\"lazy\" decoding=\"async\">";
    var attachmentHtml = hasAttachment
      ? "<span class=\"news-card__attachment\" aria-label=\"含附件\"><i class=\"ph ph-paperclip\" aria-hidden=\"true\"></i><span class=\"sr-only\">含附件</span></span>"
      : "";

    return $"""
            <article class="news-item" data-news-item data-category="{encodedTag}">
              <a class="news-card" href="{link}">
                <span class="news-card__media {mediaClass}">{imageHtml}</span>
                <span class="news-card__body">
                  <span class="news-card__meta">
                    <span class="news-card__tag">{encodedTag}</span>
                    <time class="news-card__date" datetime="{Encode(item.Date)}">{Encode(item.Date)}</time>
                    {attachmentHtml}
                  </span>
                  <strong class="news-card__title">{Encode(string.IsNullOrWhiteSpace(item.Title) ? "最新消息" : item.Title)}</strong>
                  <span class="news-card__read-more">查看更多 <span aria-hidden="true">↗</span></span>
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

  // 新聞詳細頁的媒體欄位。
  // 沒有自訂圖片時直接不輸出 media wrapper,避免留下空欄位或 placeholder。
  private static string BuildMediaMarkup(NewsItem item)
  {
    if (!HasCustomNewsImage(item))
    {
      return string.Empty;
    }

    return $"<div class=\"news-detail__media\" data-news-media>{BuildImageMarkup(item)}</div>";
  }

  // 新聞詳細頁的主圖 <img> 標籤。
  private static string BuildImageMarkup(NewsItem item)
  {
    var encodedImageUrl = Encode(item.ImageUrl);
    var encodedTitle = Encode(item.Title);

    return $"<img class=\"news-detail__image\" data-news-image src=\"{encodedImageUrl}\" alt=\"{encodedTitle}\" loading=\"eager\" decoding=\"sync\">";
  }

  private static bool HasCustomNewsImage(NewsItem item)
  {
    if (string.IsNullOrWhiteSpace(item.ImageUrl))
      return false;

    var imagePath = item.ImageUrl.Trim();
    var queryIndex = imagePath.IndexOfAny(['?', '#']);
    if (queryIndex >= 0)
      imagePath = imagePath[..queryIndex];

    return !string.Equals(imagePath, DefaultNewsImagePath, StringComparison.OrdinalIgnoreCase)
      && !string.Equals(imagePath, DefaultNewsImagePath.TrimStart('/'), StringComparison.OrdinalIgnoreCase);
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
