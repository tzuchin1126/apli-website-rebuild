// ==========================================
// 最新消息列表頁：分類篩選、分頁載入
// ==========================================

/**
 * 初始化最新消息列表頁
 * - 從公開 API 載入已發布消息與分類
 * - 渲染分類篩選按鈕
 * - 渲染消息列表（預設顯示 8 筆，支援「載入更多」）
 * - 分類篩選切換、空狀態處理
 */
function initNewsList() {
  const root = document.querySelector("[data-news-filter]");
  const list = document.querySelector("[data-news-list]");
  const empty = document.querySelector("[data-news-empty]");
  const emptyMessage = empty?.querySelector(".news-empty__message");

  if (!root || !list) return;

  const categoriesContainer = root.querySelector("[data-news-categories]");
  const pageSize = 8; // 每次載入筆數
  const defaultNewsImage = "/public/images/index/news.png?v=20260821-default-v2";
  let visibleCount = pageSize; // 目前顯示筆數
  let items = []; // 所有消息 DOM 元素

  // "載入更多" 按鈕
  const loadMore = document.createElement("button");
  loadMore.type = "button";
  loadMore.className = "news-load-more button--primary";
  loadMore.textContent = "載入更多";
  loadMore.hidden = true;
  list.after(loadMore);

  // 列表項 icon SVG（共用）
  const rowIconMarkup = `
    <span class="news-row__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  `;

  // ==========================================
  // 1. 載入資料並初始化
  // ==========================================
  Promise.all([
    fetch("/api/public/news").then((r) => {
      if (!r.ok) throw new Error("Unable to load news");
      return r.json();
    }),
    fetch("/api/public/news/categories").then((r) => {
      if (!r.ok) throw new Error("Unable to load categories");
      return r.json();
    }).catch(() => [])
  ])
    .then(([news, categoryData]) => {
      // 正規化消息資料（相容 camelCase/PascalCase）
      const normalizedNews = news.map(normalizeNewsItem);

      // 取得分類標籤：優先用 categories.json，否則從消息資料推導
      const labels = Array.isArray(categoryData) && categoryData.length
        ? categoryData
        : [...new Set(normalizedNews.map((item) => item.tag).filter(Boolean))];

      // 建立分類按鈕
      labels.forEach((category) => addCategoryButton(category, category));

      // 渲染消息列表
      renderItems(normalizedNews);
    })
    .catch(() => {
      // 載入失敗：顯示空狀態錯誤訊息
      if (empty) {
        empty.hidden = false;
        if (emptyMessage) emptyMessage.textContent = "目前無法載入最新消息。";
      }
    });

  // ==========================================
  // 2. 正規化消息物件
  // ==========================================
  function normalizeNewsItem(item) {
    return {
      id: item.id ?? item.Id,
      date: item.date ?? item.Date,
      tag: item.tag ?? item.Tag,
      title: item.title ?? item.Title,
      content: item.content ?? item.Content ?? "",
      imageUrl: item.imageUrl ?? item.ImageUrl ?? "",
      hasAttachment: item.hasAttachment ?? item.HasAttachment ?? false,
      published: item.published ?? item.Published,
    };
  }

  // ==========================================
  // 3. 建立分類按鈕
  // ==========================================
  function addCategoryButton(label, value, selected = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.category = value;
    button.setAttribute("aria-pressed", String(selected));
    button.textContent = label;
    categoriesContainer?.append(button);
  }

  // ==========================================
  // 4. 渲染消息列表
  // ==========================================
  function renderItems(source) {
    const news = source;

    // 移除現有項目（保留 empty 元素）
    list.querySelectorAll("[data-news-item]").forEach((el) => el.remove());

    // 建立每則消息的 DOM
    news.forEach((item) => {
      const article = document.createElement("article");
      article.className = "news-item";
      article.dataset.newsItem = "";
      article.dataset.category = item.tag || "";

      article.innerHTML = `
        <a class="news-row" href="/news/${encodeURIComponent(item.id)}">
          <span class="news-row__media">
            <img class="news-row__image" alt="" loading="lazy" decoding="async">
          </span>
          <span class="news-row__body">
            <span class="news-row__meta">
              <time class="news-row__date"></time>
              <span class="news-row__tag"></span>
            </span>
            <span class="news-row__title"></span>
            <span class="news-row__summary">
              <span class="news-row__attachment" hidden>
                <i class="ph ph-paperclip" aria-hidden="true"></i>
                <span class="sr-only">含附件：</span>
              </span>
              <span class="news-row__summary-text"></span>
            </span>
          </span>
          ${rowIconMarkup}
        </a>
      `;

      const row = article.querySelector(".news-row");
      const image = row.querySelector(".news-row__image");
      const date = row.querySelector(".news-row__date");
      const summary = row.querySelector(".news-row__summary");
      const summaryText = row.querySelector(".news-row__summary-text");
      const attachment = row.querySelector(".news-row__attachment");

      image.src = item.imageUrl || defaultNewsImage;
      image.addEventListener("error", () => {
        if (!image.src.endsWith(defaultNewsImage)) image.src = defaultNewsImage;
      });
      date.dateTime = item.date || "";
      date.textContent = item.date || "";
      row.querySelector(".news-row__tag").textContent = item.tag || "";
      row.querySelector(".news-row__title").textContent = item.title || "";
      summaryText.textContent = item.content.replace(/\s+/g, " ").trim();
      attachment.hidden = !item.hasAttachment;
      summary.hidden = !summaryText.textContent && !item.hasAttachment;

      list.insertBefore(article, empty);
    });

    // 更新 items 參照
    items = [...list.querySelectorAll("[data-news-item]")];

    // 重置顯示筆數並渲染
    visibleCount = pageSize;
    render();
  }

  // ==========================================
  // 5. 渲染/篩選顯示邏輯
  // ==========================================
  /**
   * 根據目前選中的分類與 visibleCount 顯示/隱藏項目
   * @param {boolean} animate - 是否觸發篩選動畫
   */
  function render(animate = false) {
    // 取得目前選中的分類（aria-pressed="true"）
    const selectedCategory = root.querySelector("[aria-pressed='true']")?.dataset.category || "";
    let matchingCount = 0;

    items.forEach((item) => {
      const matches = !selectedCategory || item.dataset.category === selectedCategory;
      // 符合分類且在顯示筆數內才顯示
      item.hidden = !matches || matchingCount >= visibleCount;
      if (matches) matchingCount += 1;
    });

    // "載入更多" 按鈕：還有更多項目才顯示
    loadMore.hidden = matchingCount <= visibleCount;

    // 空狀態：無符合項目才顯示
    if (empty) empty.hidden = matchingCount !== 0;

    // 觸發篩選動畫（CSS 控制）
    if (animate) {
      list.classList.remove("news-list--filtering");
      void list.offsetWidth; // 強制重繪
      list.classList.add("news-list--filtering");
    }
  }

  // ==========================================
  // 6. 事件綁定
  // ==========================================

  // 分類按鈕點擊
  categoriesContainer?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    // 更新 aria-pressed
    categoriesContainer.querySelectorAll("[data-category]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    // 重置顯示筆數並重新渲染（帶動畫）
    visibleCount = pageSize;
    render(true);
  });

  // "載入更多" 按鈕
  loadMore.addEventListener("click", () => {
    visibleCount += pageSize;
    render();
  });
}

// ==========================================
// 啟動
// ==========================================
document.addEventListener("DOMContentLoaded", initNewsList);
