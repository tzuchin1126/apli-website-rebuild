// ---------------------------------------------------------------------------
// 最新消息列表頁：分類篩選、分頁載入
// ---------------------------------------------------------------------------

/**
 * 初始化最新消息列表頁
 * - 從公開 API 載入已發布消息與分類
 * - 渲染分類篩選按鈕
 * - 渲染消息列表（每頁 9 筆，支援數字分頁）
 * - 分類篩選切換、空狀態處理
 */
function initNewsList() {
  const root = document.querySelector("[data-news-filter]");
  const list = document.querySelector("[data-news-list]");
  const newsContent = document.querySelector(".news-content");
  const pagination = document.querySelector("[data-news-pagination]");
  const empty = document.querySelector("[data-news-empty]");
  const emptyMessage = empty?.querySelector(".news-empty__message");

  if (!root || !list) return;

  const categoriesContainer = root.querySelector("[data-news-categories]");
  const pageSize = 9;
  const defaultNewsImage = "/public/images/index/news.png?v=20260821-default-v2";
  let currentPage = 1;
  let items = []; // 所有消息 DOM 元素

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

  function addCategoryButton(label, value, selected = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.category = value;
    button.setAttribute("aria-pressed", String(selected));
    button.textContent = label;
    categoriesContainer?.append(button);
  }

  // ---------------------------------------------------------------------------
  // 4. 渲染消息列表
  // ---------------------------------------------------------------------------
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
        <a class="news-card" href="/news/${encodeURIComponent(item.id)}">
          <span class="news-card__media">
            <img class="news-card__image" alt="" loading="lazy" decoding="async">
          </span>
          <span class="news-card__body">
            <span class="news-card__meta">
              <time class="news-card__date"></time>
              <span class="news-card__tag"></span>
            </span>
            <span class="news-card__title"></span>
            <span class="news-card__summary">
              <span class="news-card__attachment" hidden>
                <i class="ph ph-paperclip" aria-hidden="true"></i>
                <span class="sr-only">含附件：</span>
              </span>
              <span class="news-card__summary-text"></span>
            </span>
            <span class="news-card__read-more">閱讀更多 <span aria-hidden="true">→</span></span>
          </span>
          <span class="news-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </a>
      `;

      const row = article.querySelector(".news-card");
      const image = row.querySelector(".news-card__image");
      const date = row.querySelector(".news-card__date");
      const summary = row.querySelector(".news-card__summary");
      const summaryText = row.querySelector(".news-card__summary-text");
      const attachment = row.querySelector(".news-card__attachment");

      image.src = item.imageUrl || defaultNewsImage;
      image.addEventListener("error", () => {
        if (!image.src.endsWith(defaultNewsImage)) image.src = defaultNewsImage;
      });
      date.dateTime = item.date || "";
      date.textContent = formatNewsDate(item.date);
      row.querySelector(".news-card__tag").textContent = item.tag || "";
      row.querySelector(".news-card__title").textContent = item.title || "";
      summaryText.textContent = item.content.replace(/\s+/g, " ").trim();
      attachment.hidden = !item.hasAttachment;
      summary.hidden = !summaryText.textContent && !item.hasAttachment;

      list.insertBefore(article, empty);
    });

    // 更新 items 參照
    items = [...list.querySelectorAll("[data-news-item]")];

    // 重置頁碼並渲染
    currentPage = 1;
    render();
  }

  function formatNewsDate(value) {
    const match = String(value || "").match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (!match) return value || "";
    return `${match[1]}.${match[2].padStart(2, "0")}.${match[3].padStart(2, "0")}`;
  }

  // ---------------------------------------------------------------------------
  // 5. 渲染/篩選顯示邏輯
  // ---------------------------------------------------------------------------
  /**
   * 根據目前選中的分類與頁碼顯示/隱藏項目
   * @param {boolean} animate - 是否觸發篩選動畫
   */
  function render(animate = false) {
    const selectedCategory = root.querySelector("[aria-pressed='true']")?.dataset.category || "";
    const matchingItems = items.filter((item) => !selectedCategory || item.dataset.category === selectedCategory);
    const pageCount = Math.max(1, Math.ceil(matchingItems.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const pageStart = (currentPage - 1) * pageSize;
    const pageEnd = pageStart + pageSize;
    if (empty) empty.hidden = matchingItems.length !== 0;
    applyPageVisibility(matchingItems, pageStart, pageEnd);
    renderPagination(pageCount);

    // 觸發篩選動畫（CSS 控制）
    if (animate) {
      list.classList.remove("news-list--filtering");
      void list.offsetWidth; // 強制重繪
      list.classList.add("news-list--filtering");
    }
  }

  function applyPageVisibility(matchingItems, pageStart, pageEnd) {
    const mobileLatestItem = matchingItems[pageStart];

    items.forEach((item) => {
      const matchingIndex = matchingItems.indexOf(item);
      item.hidden = matchingIndex < pageStart || matchingIndex >= pageEnd;
      item.classList.toggle("news-item--mobile-latest", item === mobileLatestItem);
    });
  }

  function scrollToNewsContent() {
    if (!newsContent) return;
    const top = Math.max(0, window.scrollY + newsContent.getBoundingClientRect().top - 16);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top, behavior });
  }

  function renderPagination(pageCount) {
    if (!pagination) return;
    pagination.innerHTML = "";
    const fragment = document.createDocumentFragment();

    const appendControl = (label, page, className, disabled = false) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `news-pagination__control${className ? ` ${className}` : ""}`;
      button.dataset.page = String(page);
      button.disabled = disabled;
      button.setAttribute("aria-label", label);
      const direction = page < currentPage ? "left" : "right";
      const icon = document.createElement("i");
      icon.className = "ph ph-caret-" + direction;
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = direction === "left" ? "\uE138" : "\uE13A";
      button.append(icon);
      fragment.append(button);
    };

    appendControl("上一頁", currentPage - 1, "news-pagination__arrow", currentPage === 1);

    const pages = getPaginationPages(pageCount);
    pages.forEach((page) => {
      if (page === "ellipsis") {
        const ellipsis = document.createElement("span");
        ellipsis.className = "news-pagination__ellipsis";
        ellipsis.setAttribute("aria-hidden", "true");
        ellipsis.textContent = "…";
        fragment.append(ellipsis);
        return;
      }
      const button = document.createElement("button");
      button.type = "button";
      button.className = "news-pagination__page";
      button.dataset.page = String(page);
      button.textContent = String(page).padStart(2, "0");
      button.setAttribute("aria-label", `第 ${page} 頁`);
      button.setAttribute("aria-current", page === currentPage ? "page" : "false");
      if (page === currentPage) button.classList.add("is-current");
      fragment.append(button);
    });

    appendControl("下一頁", currentPage + 1, "news-pagination__arrow", currentPage === pageCount);
    pagination.append(fragment);
  }

  function getPaginationPages(pageCount) {
    if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "ellipsis", pageCount];
    if (currentPage >= pageCount - 3) return [1, "ellipsis", pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", pageCount];
  }

  // ---------------------------------------------------------------------------
  // 6. 事件綁定
  // ---------------------------------------------------------------------------

  // 分類按鈕點擊
  categoriesContainer?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    categoriesContainer.querySelectorAll("[data-category]").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    render(true);
  });

  // 數字分頁
  pagination?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;
    currentPage = Number(button.dataset.page);
    render(true);
    window.requestAnimationFrame(scrollToNewsContent);
  });

}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initNewsList);
