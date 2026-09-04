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
  const dateEl = detail.querySelector("[data-news-date]");
  const tagEl = detail.querySelector("[data-news-tag]");
  const contentEl = detail.querySelector("[data-news-content]");
  const imageEl = detail.querySelector("[data-news-image]");
  const attachmentEl = detail.querySelector("[data-news-attachment]");
  const attachmentNameEl = detail.querySelector("[data-news-attachment-name]");
  const attachmentWrapEl = detail.querySelector("[data-news-attachment-wrap]");
  const errorEl = document.querySelector("[data-news-error]");
  const descriptionEl = document.querySelector('meta[name="description"]');
  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  const ogDescriptionEl = document.querySelector('meta[property="og:description"]');
  const defaultNewsImagePaths = [
    "/public/images/index/news.png",
    "public/images/index/news.png",
  ];

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
    };
  }

  function isDefaultNewsImage(value) {
    const imageUrl = String(value || "").trim();
    if (!imageUrl) return true;

    const imagePath = imageUrl.split(/[?#]/, 1)[0];
    return defaultNewsImagePaths.indexOf(imagePath) >= 0;
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
    dateEl.textContent = item.date;
    dateEl.dateTime = item.date;
    tagEl.textContent = item.tag;

    // 內容：以換行分段
    contentEl.replaceChildren();
    const paragraphs = item.content.split("\n");
    for (let i = 0; i < paragraphs.length; i++) {
      const trimmed = paragraphs[i].trim();
      if (!trimmed) continue;
      const p = document.createElement("p");
      p.textContent = trimmed;
      contentEl.append(p);
    }

    // 只有自訂圖片才使用 Editorial 雙欄；空值與系統預設圖都改為單欄。
    const hasCustomImage = !isDefaultNewsImage(item.imageUrl);
    detail.classList.toggle("news-detail--with-image", hasCustomImage);
    detail.classList.toggle("news-detail--without-image", !hasCustomImage);

    if (imageEl) {
      if (hasCustomImage) {
        imageEl.src = item.imageUrl;
        imageEl.alt = item.title;
        imageEl.hidden = false;
      } else {
        imageEl.removeAttribute("src");
        imageEl.alt = "";
        imageEl.hidden = true;
      }
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

  // 顯示錯誤狀態
  function showError() {
    detail.hidden = true;
    if (errorEl) errorEl.hidden = false;
  }

  // 載入並渲染
  async function loadNewsDetail() {
    try {
      const response = await fetch("/api/public/news/" + encodeURIComponent(id));
      if (!response.ok) throw new Error("News item not found");

      const rawItem = await response.json();
      renderNewsDetail(normalizeNewsItem(rawItem));
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
