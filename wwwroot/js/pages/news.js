// ---------------------------------------------------------------------------
// 最新消息列表頁：分類篩選、分頁載入
// - 從公開 API 載入已發布消息與分類
// - 渲染分類篩選按鈕
// - 渲染消息列表（每頁 9 筆，支援數字分頁）
// - 分類篩選切換、空狀態處理
// ---------------------------------------------------------------------------

// 把 NodeList 轉成一般陣列，方便用 for 迴圈處理
function toArray(nodeList) {
  const result = [];
  for (let i = 0; i < nodeList.length; i++) {
    result.push(nodeList[i]);
  }
  return result;
}

function initNewsList() {
  const root = document.querySelector("[data-news-filter]");
  const list = document.querySelector("[data-news-list]");
  const newsContent = document.querySelector(".news-content");
  const pagination = document.querySelector("[data-news-pagination]");
  const empty = document.querySelector("[data-news-empty]");
  const emptyMessage = empty ? empty.querySelector(".news-empty__message") : null;

  if (!root || !list) return;

  const categoriesContainer = root.querySelector("[data-news-categories]");
  const pageSize = 9;
  const defaultNewsImage = "/public/images/index/news.png?v=20260821-default-v2";
  let currentPage = 1;
  let items = []; // 目前列表裡所有消息的 DOM 元素

  // 正規化消息物件：相容 camelCase 與 PascalCase
  function normalizeNewsItem(item) {
    return {
      id: item.id != null ? item.id : item.Id,
      date: item.date != null ? item.date : item.Date,
      tag: item.tag != null ? item.tag : item.Tag,
      title: item.title != null ? item.title : item.Title,
      content: item.content || item.Content || "",
      imageUrl: item.imageUrl || item.ImageUrl || "",
      hasAttachment: item.hasAttachment != null ? item.hasAttachment : (item.HasAttachment || false),
      published: item.published != null ? item.published : item.Published,
    };
  }

  function addCategoryButton(label, value) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.category = value;
    button.setAttribute("aria-pressed", "false");
    button.textContent = label;
    if (categoriesContainer) categoriesContainer.append(button);
  }

  // 把日期字串轉成「2026.01.05」這種格式
  function formatNewsDate(value) {
    const match = String(value || "").match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (!match) return value || "";
    const year = match[1];
    const month = match[2].padStart(2, "0");
    const day = match[3].padStart(2, "0");
    return year + "." + month + "." + day;
  }

  // ---------------------------------------------------------------------------
  // 渲染消息列表
  // ---------------------------------------------------------------------------
  function renderItems(newsList) {
    // 移除現有項目（保留 empty 元素）
    const oldItems = toArray(list.querySelectorAll("[data-news-item]"));
    for (let i = 0; i < oldItems.length; i++) {
      oldItems[i].remove();
    }

    // 建立每則消息的 DOM
    for (let i = 0; i < newsList.length; i++) {
      const item = newsList[i];

      const article = document.createElement("article");
      article.className = "news-item";
      article.dataset.newsItem = "";
      article.dataset.category = item.tag || "";

      article.innerHTML =
        '<a class="news-card" href="/news/' + encodeURIComponent(item.id) + '">' +
        '<span class="news-card__media">' +
        '<img class="news-card__image" alt="" loading="lazy" decoding="async">' +
        "</span>" +
        '<span class="news-card__body">' +
        '<span class="news-card__meta">' +
        '<time class="news-card__date"></time>' +
        '<span class="news-card__tag"></span>' +
        "</span>" +
        '<span class="news-card__title"></span>' +
        '<span class="news-card__summary">' +
        '<span class="news-card__attachment" hidden>' +
        '<i class="ph ph-paperclip" aria-hidden="true"></i>' +
        '<span class="sr-only">含附件：</span>' +
        "</span>" +
        '<span class="news-card__summary-text"></span>' +
        "</span>" +
        '<span class="news-card__read-more">閱讀更多 <span aria-hidden="true">→</span></span>' +
        "</span>" +
        '<span class="news-card__icon" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24">' +
        '<path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        "</svg>" +
        "</span>" +
        "</a>";

      const row = article.querySelector(".news-card");
      const image = row.querySelector(".news-card__image");
      const date = row.querySelector(".news-card__date");
      const summary = row.querySelector(".news-card__summary");
      const summaryText = row.querySelector(".news-card__summary-text");
      const attachment = row.querySelector(".news-card__attachment");

      image.src = item.imageUrl || defaultNewsImage;
      image.addEventListener("error", function () {
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
    }

    // 更新 items 參照
    items = toArray(list.querySelectorAll("[data-news-item]"));

    // 重置頁碼並渲染
    currentPage = 1;
    render(false);
  }

  // ---------------------------------------------------------------------------
  // 渲染/篩選顯示邏輯
  // ---------------------------------------------------------------------------

  // 根據目前選中的分類與頁碼顯示/隱藏項目；animate 表示是否要觸發篩選動畫
  function render(animate) {
    const selectedButton = root.querySelector("[aria-pressed='true']");
    const selectedCategory = selectedButton ? selectedButton.dataset.category : "";

    const matchingItems = [];
    for (let i = 0; i < items.length; i++) {
      if (!selectedCategory || items[i].dataset.category === selectedCategory) {
        matchingItems.push(items[i]);
      }
    }

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

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const matchingIndex = matchingItems.indexOf(item);
      item.hidden = matchingIndex < pageStart || matchingIndex >= pageEnd;
      item.classList.toggle("news-item--mobile-latest", item === mobileLatestItem);
    }
  }

  function scrollToNewsContent() {
    if (!newsContent) return;
    const top = Math.max(0, window.scrollY + newsContent.getBoundingClientRect().top - 16);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: top, behavior: behavior });
  }

  function renderPagination(pageCount) {
    if (!pagination) return;
    pagination.innerHTML = "";
    const fragment = document.createDocumentFragment();

    // 建立「上一頁」「下一頁」箭頭按鈕
    function appendArrowControl(label, page, disabled) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "news-pagination__control news-pagination__arrow";
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
    }

    appendArrowControl("上一頁", currentPage - 1, currentPage === 1);

    const pages = getPaginationPages(pageCount);
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      if (page === "ellipsis") {
        const ellipsis = document.createElement("span");
        ellipsis.className = "news-pagination__ellipsis";
        ellipsis.setAttribute("aria-hidden", "true");
        ellipsis.textContent = "…";
        fragment.append(ellipsis);
        continue;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "news-pagination__page";
      button.dataset.page = String(page);
      button.textContent = String(page).padStart(2, "0");
      button.setAttribute("aria-label", "第 " + page + " 頁");
      button.setAttribute("aria-current", page === currentPage ? "page" : "false");
      if (page === currentPage) button.classList.add("is-current");
      fragment.append(button);
    }

    appendArrowControl("下一頁", currentPage + 1, currentPage === pageCount);
    pagination.append(fragment);
  }

  // 決定分頁按鈕要顯示哪些頁碼（超過 7 頁時用省略號縮短）
  function getPaginationPages(pageCount) {
    if (pageCount <= 7) {
      const allPages = [];
      for (let page = 1; page <= pageCount; page++) {
        allPages.push(page);
      }
      return allPages;
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", pageCount];
    }

    if (currentPage >= pageCount - 3) {
      return [1, "ellipsis", pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    }

    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", pageCount];
  }

  // ---------------------------------------------------------------------------
  // 事件綁定
  // ---------------------------------------------------------------------------

  // 分類按鈕點擊
  if (categoriesContainer) {
    categoriesContainer.addEventListener("click", function (event) {
      const button = event.target.closest("[data-category]");
      if (!button) return;

      const categoryButtons = toArray(categoriesContainer.querySelectorAll("[data-category]"));
      for (let i = 0; i < categoryButtons.length; i++) {
        const item = categoryButtons[i];
        item.setAttribute("aria-pressed", String(item === button));
      }
      render(true);
    });
  }

  // 數字分頁
  if (pagination) {
    pagination.addEventListener("click", function (event) {
      const button = event.target.closest("[data-page]");
      if (!button || button.disabled) return;
      currentPage = Number(button.dataset.page);
      render(true);
      window.requestAnimationFrame(scrollToNewsContent);
    });
  }

  // ---------------------------------------------------------------------------
  // 載入資料
  // ---------------------------------------------------------------------------

  async function fetchNews() {
    const response = await fetch("/api/public/news");
    if (!response.ok) throw new Error("Unable to load news");
    return response.json();
  }

  async function fetchCategories() {
    try {
      const response = await fetch("/api/public/news/categories");
      if (!response.ok) throw new Error("Unable to load categories");
      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async function loadNewsList() {
    try {
      const news = await fetchNews();
      const categoryData = await fetchCategories();

      // 正規化消息資料（相容 camelCase/PascalCase）
      const normalizedNews = [];
      for (let i = 0; i < news.length; i++) {
        normalizedNews.push(normalizeNewsItem(news[i]));
      }

      // 取得分類標籤：優先用 categories.json，否則從消息資料推導（不重複）
      let labels = [];
      if (Array.isArray(categoryData) && categoryData.length > 0) {
        labels = categoryData;
      } else {
        for (let i = 0; i < normalizedNews.length; i++) {
          const tag = normalizedNews[i].tag;
          if (tag && labels.indexOf(tag) === -1) {
            labels.push(tag);
          }
        }
      }

      // 建立分類按鈕
      for (let i = 0; i < labels.length; i++) {
        addCategoryButton(labels[i], labels[i]);
      }

      // 渲染消息列表
      renderItems(normalizedNews);
    } catch (error) {
      // 載入失敗：顯示空狀態錯誤訊息
      if (empty) {
        empty.hidden = false;
        if (emptyMessage) emptyMessage.textContent = "目前無法載入最新消息。";
      }
    }
  }

  loadNewsList();
}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initNewsList);
