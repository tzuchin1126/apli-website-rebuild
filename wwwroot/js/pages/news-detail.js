// ---------------------------------------------------------------------------
// 消息詳細頁
// - 從 URL 取得 id 參數
// - 從公開 API 載入指定的已發布消息
// - 渲染標題、日期、分類、內容、圖片、附件
// - 找不到時顯示錯誤訊息
// ---------------------------------------------------------------------------

function initNewsDetail() {
  const detail = document.querySelector("[data-news-detail]");
  if (!detail) return;

  // ---------------------------------------------------------------------------
  // 取得 id 與各個 DOM 元素
  // ---------------------------------------------------------------------------
  const routeMatch = window.location.pathname.match(/^\/news\/([^/]+)\/?$/i);
  let id = null;
  if (routeMatch) {
    id = decodeURIComponent(routeMatch[1]);
  } else {
    id = new URLSearchParams(window.location.search).get("id");
  }

  const titleEl = detail.querySelector("[data-news-title]");
  const heroTitleEl = document.querySelector("[data-news-hero-title]");
  const dateEl = detail.querySelector("[data-news-date]");
  const tagEl = detail.querySelector("[data-news-tag]");
  const contentEl = detail.querySelector("[data-news-content]");
  const imageEl = detail.querySelector("[data-news-image]");
  const attachmentEl = detail.querySelector("[data-news-attachment]");
  const attachmentNameEl = detail.querySelector("[data-news-attachment-name]");
  const attachmentWrapEl = detail.querySelector("[data-news-attachment-wrap]");
  const errorEl = document.querySelector("[data-news-error]");
  const relatedSection = document.querySelector("[data-news-related]");
  const relatedList = document.querySelector("[data-news-related-list]");
  const relatedViewport = document.querySelector("[data-news-related-viewport]");
  const relatedPrevious = document.querySelector("[data-news-related-previous]");
  const relatedNext = document.querySelector("[data-news-related-next]");
  const descriptionEl = document.querySelector('meta[name="description"]');
  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  const ogDescriptionEl = document.querySelector('meta[property="og:description"]');

  if (!id) {
    showError();
    return;
  }

  // 正規化消息物件：相容 camelCase 與 PascalCase
  function normalizeNewsItem(item) {
    return {
      id: item.id != null ? item.id : item.Id,
      date: item.date != null ? item.date : item.Date,
      tag: item.tag != null ? item.tag : item.Tag,
      title: item.title != null ? item.title : item.Title,
      content: item.content || item.Content || "",
      url: item.url || item.Url || "",
      attachmentName: item.attachmentName || item.AttachmentName || "",
      imageUrl: item.imageUrl || item.ImageUrl || "",
      hasAttachment: item.hasAttachment != null ? item.hasAttachment : (item.HasAttachment || false),
    };
  }

  function formatNewsDate(value) {
    const match = String(value || "").match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (!match) return value || "";
    return match[1] + "." + match[2].padStart(2, "0") + "." + match[3].padStart(2, "0");
  }

  function createRelatedCard(item) {
    const article = document.createElement("article");
    article.className = "news-item";
    article.innerHTML =
      '<a class="news-card" href="/news/' + encodeURIComponent(item.id) + '">' +
      '<span class="news-card__media"></span>' +
      '<span class="news-card__body">' +
      '<span class="news-card__meta">' +
      '<span class="news-card__tag"></span>' +
      '<time class="news-card__date"></time>' +
      '<span class="news-card__attachment" aria-label="含附件" hidden>' +
      '<i class="ph ph-paperclip" aria-hidden="true"></i>' +
      '<span class="sr-only">含附件</span>' +
      "</span>" +
      "</span>" +
      '<strong class="news-card__title"></strong>' +
      '<span class="news-card__read-more">查看更多 <span aria-hidden="true">↗</span></span>' +
      "</span>" +
      "</a>";

    const card = article.querySelector(".news-card");
    const media = card.querySelector(".news-card__media");
    const date = card.querySelector(".news-card__date");
    const attachment = card.querySelector(".news-card__attachment");

    media.classList.add(item.imageUrl ? "has-image" : "is-default");
    if (item.imageUrl) {
      const image = document.createElement("img");
      image.className = "news-card__image";
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      image.src = item.imageUrl;
      image.addEventListener("error", function () {
        image.remove();
        media.classList.remove("has-image");
        media.classList.add("is-default");
      }, { once: true });
      media.append(image);
    }

    date.dateTime = item.date || "";
    date.textContent = formatNewsDate(item.date);
    card.querySelector(".news-card__tag").textContent = item.tag || "最新消息";
    card.querySelector(".news-card__title").textContent = item.title || "最新消息";
    attachment.hidden = !item.hasAttachment;
    return article;
  }

  // 渲染消息詳細內容
  function renderNewsDetail(item) {
    // 更新頁面標題
    document.title = item.title + " - 亞太國際物流";
    const description = item.content.trim().replace(/\s+/g, " ").slice(0, 160);
    const fallbackDescription = item.title + " - 亞太國際物流";

    if (descriptionEl) descriptionEl.content = description || fallbackDescription;
    if (ogTitleEl) ogTitleEl.content = document.title;
    if (ogDescriptionEl) ogDescriptionEl.content = description || fallbackDescription;

    // 基本資料
    titleEl.textContent = item.title;
    if (heroTitleEl) heroTitleEl.textContent = item.title;
    dateEl.textContent = item.date;
    dateEl.dateTime = item.date;
    tagEl.textContent = item.tag;

    // 內容：以換行分段
    contentEl.replaceChildren();
    const paragraphs = item.content.split("\n");
    const titleText = String(item.title || "").trim();
    const contentLines = paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean);
    const hasAdditionalContent = contentLines.some((line) => line !== titleText);
    let isFirstContentLine = true;
    for (let i = 0; i < paragraphs.length; i++) {
      const trimmed = paragraphs[i].trim();
      if (!trimmed) continue;
      if (isFirstContentLine && hasAdditionalContent && trimmed === titleText) {
        isFirstContentLine = false;
        continue;
      }
      isFirstContentLine = false;
      const p = document.createElement("p");
      p.textContent = trimmed;
      contentEl.append(p);
    }

    // 圖片：列表頁的系統預設圖不視為新聞自訂圖片。
    const hasCustomImage = !isDefaultNewsImage(item.imageUrl);
    detail.classList.toggle("news-detail--with-image", hasCustomImage);
    detail.classList.toggle("news-detail--without-image", !hasCustomImage);

    if (imageEl && hasCustomImage) {
      imageEl.src = item.imageUrl;
      imageEl.alt = item.title;
      imageEl.hidden = false;
    } else if (imageEl) {
      imageEl.removeAttribute("src");
      imageEl.alt = "";
      imageEl.hidden = true;
    }

    // 附件連結
    if (item.url) {
      attachmentEl.href = item.url;

      // 優先用 attachmentName，否則從 URL 取檔名
      let fileName = item.attachmentName;
      if (!fileName) {
        const urlParts = item.url.split("/");
        const lastPart = urlParts[urlParts.length - 1].split("?")[0];
        fileName = decodeURIComponent(lastPart);
      }
      attachmentNameEl.textContent = fileName;
      attachmentWrapEl.hidden = false;
    }

    // 顯示詳細區塊
    detail.hidden = false;
  }

  function isDefaultNewsImage(value) {
    const imageUrl = String(value || "").trim();
    if (!imageUrl) return true;

    const imagePath = imageUrl.split(/[?#]/, 1)[0];
    return imagePath === "/public/images/index/news.png"
      || imagePath === "public/images/index/news.png";
  }

  // 顯示錯誤狀態
  function showError() {
    detail.hidden = true;
    if (errorEl) errorEl.hidden = false;
  }

  let relatedItems = [];
  let relatedPage = 0;

  function isRelatedMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function getRelatedPageSize() {
    return isRelatedMobile() ? 0 : 3;
  }

  function renderRelatedPage(direction) {
    if (!relatedList) return;

    if (isRelatedMobile()) {
      relatedList.classList.remove("is-entering-next", "is-entering-previous");
      relatedList.replaceChildren();
      for (let i = 0; i < relatedItems.length; i++) {
        relatedList.append(createRelatedCard(relatedItems[i]));
      }
      if (relatedViewport) relatedViewport.scrollLeft = 0;
      if (relatedPrevious) relatedPrevious.disabled = true;
      if (relatedNext) relatedNext.disabled = true;
      return;
    }

    const pageSize = getRelatedPageSize();
    const pageCount = Math.max(1, Math.ceil(relatedItems.length / pageSize));
    relatedPage = Math.min(relatedPage, pageCount - 1);
    const start = relatedPage * pageSize;
    const end = Math.min(start + pageSize, relatedItems.length);

    relatedList.classList.remove("is-entering-next", "is-entering-previous");
    void relatedList.offsetWidth;
    relatedList.replaceChildren();
    for (let i = start; i < end; i++) {
      relatedList.append(createRelatedCard(relatedItems[i]));
    }
    if (direction === "next" || direction === "previous") {
      relatedList.classList.add("is-entering-" + direction);
    }

    if (relatedPrevious) relatedPrevious.disabled = relatedPage === 0;
    if (relatedNext) relatedNext.disabled = relatedPage >= pageCount - 1;
  }

  async function loadRelatedNews() {
    if (!relatedSection || !relatedList) return;

    try {
      const response = await fetch("/api/public/news");
      if (!response.ok) throw new Error("Unable to load related news");

      const rawItems = await response.json();
      relatedItems = rawItems
        .map(normalizeNewsItem)
        .filter(function (item) { return String(item.id) !== String(id); });

      if (!relatedItems.length) return;
      relatedPage = 0;
      renderRelatedPage();
      relatedSection.hidden = false;
    } catch (error) {
      relatedSection.hidden = true;
    }
  }

  if (relatedPrevious) {
    relatedPrevious.addEventListener("click", function () {
      relatedPage = Math.max(0, relatedPage - 1);
      renderRelatedPage("previous");
    });
  }

  if (relatedNext) {
    relatedNext.addEventListener("click", function () {
      relatedPage += 1;
      renderRelatedPage("next");
    });
  }

  window.addEventListener("resize", function () {
    if (!relatedItems.length) return;
    renderRelatedPage();
  });

  // 載入並渲染
  async function loadNewsDetail() {
    try {
      const response = await fetch("/api/public/news/" + encodeURIComponent(id));
      if (!response.ok) throw new Error("News item not found");

      const rawItem = await response.json();
      renderNewsDetail(normalizeNewsItem(rawItem));
      loadRelatedNews();
    } catch (error) {
      showError();
    }
  }

  loadNewsDetail();
}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initNewsDetail);
