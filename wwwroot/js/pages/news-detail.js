// ==========================================
// 最新消息詳細頁：載入並渲染單則消息
// ==========================================

/**
 * 初始化消息詳細頁
 * - 從 URL 取得 id 參數
 * - 載入 news.json 尋找對應消息
 * - 渲染標題、日期、分類、內容、圖片、附件
 * - 找不到時顯示錯誤訊息
 */
function initNewsDetail() {
  const detail = document.querySelector("[data-news-detail]");
  if (!detail) return;

  // ---- 取得 DOM 元素 ----
  const id = new URLSearchParams(window.location.search).get("id");
  const titleEl = detail.querySelector("[data-news-title]");
  const dateEl = detail.querySelector("[data-news-date]");
  const tagEl = detail.querySelector("[data-news-tag]");
  const contentEl = detail.querySelector("[data-news-content]");
  const imageEl = detail.querySelector("[data-news-image]");
  const attachmentEl = detail.querySelector("[data-news-attachment]");
  const attachmentNameEl = detail.querySelector("[data-news-attachment-name]");
  const attachmentWrapEl = detail.querySelector("[data-news-attachment-wrap]");
  const errorEl = document.querySelector("[data-news-error]");

  if (!id) {
    showError();
    return;
  }

  // ---- 載入並渲染 ----
  fetch("data/news.json", { cache: "no-store" })
    .then((response) => response.json())
    .then((news) => news
      .map(normalizeNewsItem)
      .find((item) => item.id === id)
    )
    .then((item) => {
      if (!item) throw new Error("News item not found");
      renderNewsDetail(item);
    })
    .catch(() => {
      showError();
    });

  /** 正規化消息物件：相容 camelCase 與 PascalCase */
  function normalizeNewsItem(item) {
    return {
      id: item.id ?? item.Id,
      date: item.date ?? item.Date,
      tag: item.tag ?? item.Tag,
      title: item.title ?? item.Title,
      content: item.content ?? item.Content ?? "",
      url: item.url ?? item.Url ?? "",
      attachmentName: item.attachmentName ?? item.AttachmentName ?? "",
      imageUrl: item.imageUrl ?? item.ImageUrl ?? "",
    };
  }

  /** 渲染消息詳細內容 */
  function renderNewsDetail(item) {
    // 更新頁面標題
    document.title = `${item.title} - 亞太國際物流`;

    // 基本資料
    titleEl.textContent = item.title;
    dateEl.textContent = item.date;
    dateEl.dateTime = item.date;
    tagEl.textContent = item.tag;

    // 內容：以換行分段
    item.content.split("\n").forEach((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return;
      const p = document.createElement("p");
      p.textContent = trimmed;
      contentEl.append(p);
    });

    // 圖片
    if (item.imageUrl) {
      imageEl.src = item.imageUrl;
      imageEl.hidden = false;
    }

    // 附件連結
    if (item.url) {
      attachmentEl.href = item.url;
      // 優先用 attachmentName，否則從 URL 取檔名
      const fileName = item.attachmentName || decodeURIComponent(item.url.split("/").pop().split("?")[0]);
      attachmentNameEl.textContent = fileName;
      attachmentWrapEl.hidden = false;
    }

    // 顯示詳細區塊
    detail.hidden = false;
  }

  /** 顯示錯誤狀態 */
  function showError() {
    detail.hidden = true;
    if (errorEl) errorEl.hidden = false;
  }
}

// ==========================================
// 啟動
// ==========================================
document.addEventListener("DOMContentLoaded", initNewsDetail);