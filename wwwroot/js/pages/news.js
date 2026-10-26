// ---------------------------------------------------------------------------
// 最新消息列表頁：分類篩選、數字分頁
// ---------------------------------------------------------------------------

function initNewsList() {
  const root = document.querySelector("[data-news-filter]");
  const list = document.querySelector("[data-news-list]");
  const categoriesContainer = document.querySelector("[data-news-categories]");
  const pagination = document.querySelector("[data-news-pagination]");
  const empty = document.querySelector("[data-news-empty]");
  const newsContent = document.querySelector(".news-content");

  // 缺少必要元素就不執行
  if (!root || !list || !categoriesContainer || !pagination || !empty) return;

  const pageSize = 9;
  let currentPage = 1;
  let items = []; // 列表裡所有消息的 DOM 元素

  // ---------------------------------------------------------------------------
  // 小工具
  // ---------------------------------------------------------------------------

  // 日期轉成「2026.01.05」格式，格式不符就原樣顯示
  function formatNewsDate(value) {
    const match = String(value || "").match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (!match) return value || "";

    const year = match[1];
    const month = match[2].padStart(2, "0");
    const day = match[3].padStart(2, "0");
    return year + "." + month + "." + day;
  }

  // 目前選中的分類，空字串代表「全部」
  function getSelectedCategory() {
    const selectedButton = root.querySelector("[aria-pressed='true']");
    if (!selectedButton) return "";
    return selectedButton.dataset.category;
  }

  // ---------------------------------------------------------------------------
  // 建立畫面
  // ---------------------------------------------------------------------------

  function addCategoryButton(label) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.category = label;
    button.setAttribute("aria-pressed", "false");
    button.textContent = label;
    categoriesContainer.append(button);
  }

  // 建立一則消息
  function createNewsItem(news) {
    const article = document.createElement("article");
    article.className = "news-item";
    article.dataset.newsItem = "";
    article.dataset.category = news.tag || "";

    const arrowSvg = '<svg class="news-card__link-icon" viewBox="0 0 16 16" focusable="false"><path d="M2.5 8h10.25M8.25 3.25 13 8l-4.75 4.75"></path></svg>';

    article.innerHTML =
      '<a class="news-card" href="/news/' + encodeURIComponent(news.id) + '">' +
      '<span class="news-card__body">' +
      '<span class="news-card__meta">' +
      '<time class="news-card__date"></time>' +
      '<span class="news-card__tag"></span>' +
      "</span>" +
      '<strong class="news-card__title"></strong>' +
      "</span>" +
      '<span class="news-card__arrow-window" aria-hidden="true">' + arrowSvg + arrowSvg + "</span>" +
      "</a>";

    // 文字用 textContent 填入，避免資料裡的特殊字元被當成 HTML
    const date = article.querySelector(".news-card__date");
    date.dateTime = news.date || "";
    date.textContent = formatNewsDate(news.date);
    article.querySelector(".news-card__tag").textContent = news.tag || "最新消息";
    article.querySelector(".news-card__title").textContent = news.title || "最新消息";

    return article;
  }

  // 清掉舊的消息，重新建立整個列表
  function renderItems(newsList) {
    const oldItems = list.querySelectorAll("[data-news-item]");
    for (let i = 0; i < oldItems.length; i++) {
      oldItems[i].remove();
    }

    for (let i = 0; i < newsList.length; i++) {
      list.insertBefore(createNewsItem(newsList[i]), empty);
    }

    items = list.querySelectorAll("[data-news-item]");
    render(false);
  }

  // ---------------------------------------------------------------------------
  // 篩選與分頁
  // ---------------------------------------------------------------------------

  // 挑出符合目前分類的消息
  function getMatchingItems() {
    const selectedCategory = getSelectedCategory();
    const result = [];

    for (let i = 0; i < items.length; i++) {
      if (!selectedCategory || items[i].dataset.category === selectedCategory) {
        result.push(items[i]);
      }
    }
    return result;
  }

  // 先全部隱藏，再只顯示目前這一頁
  function showCurrentPage(matchingItems) {
    for (let i = 0; i < items.length; i++) {
      items[i].hidden = true;
    }

    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, matchingItems.length);

    for (let i = start; i < end; i++) {
      matchingItems[i].hidden = false;
    }
  }

  // 重播篩選動畫（CSS 的 .news-list--filtering 負責動畫）
  function playFilterAnimation() {
    list.classList.remove("news-list--filtering");
    void list.offsetWidth; // 讀取一次寬度，強迫瀏覽器重算，動畫才會重播
    list.classList.add("news-list--filtering");
  }

  // 依目前的分類與頁碼更新畫面；animate 為 true 時播放動畫
  function render(animate) {
    const matchingItems = getMatchingItems();
    const pageCount = Math.max(1, Math.ceil(matchingItems.length / pageSize));

    // 切換分類後頁碼可能超過總頁數，要拉回來
    if (currentPage > pageCount) {
      currentPage = pageCount;
    }

    empty.hidden = matchingItems.length !== 0;
    showCurrentPage(matchingItems);
    renderPagination(pageCount);

    if (animate) {
      playFilterAnimation();
    }
  }

  function scrollToNewsContent() {
    if (!newsContent) return;

    const top = Math.max(0, window.scrollY + newsContent.getBoundingClientRect().top - 16);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: top,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }

  // ---------------------------------------------------------------------------
  // 分頁按鈕
  // ---------------------------------------------------------------------------

  // 決定要顯示哪些頁碼（超過 7 頁時用 "ellipsis" 代表省略號）
  function getPaginationPages(pageCount) {
    const pages = [];

    if (pageCount <= 7) {
      for (let page = 1; page <= pageCount; page++) {
        pages.push(page);
      }
      return pages;
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", pageCount];
    }

    if (currentPage >= pageCount - 3) {
      return [1, "ellipsis", pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    }

    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", pageCount];
  }

  // 「上一頁」「下一頁」按鈕
  function createArrowButton(label, targetPage, disabled, direction) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "news-pagination__control news-pagination__arrow";
    button.dataset.page = String(targetPage);
    button.disabled = disabled;
    button.setAttribute("aria-label", label);

    const icon = document.createElement("i");
    icon.className = "ph ph-caret-" + direction;
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = direction === "left" ? "\uE138" : "\uE13A";
    button.append(icon);

    return button;
  }

  // 數字按鈕
  function createPageButton(page) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "news-pagination__page";
    button.dataset.page = String(page);
    button.textContent = String(page);
    button.setAttribute("aria-label", "第 " + page + " 頁");

    if (page === currentPage) {
      button.classList.add("is-current");
      button.setAttribute("aria-current", "page");
    }
    return button;
  }

  // 省略號
  function createEllipsis() {
    const ellipsis = document.createElement("span");
    ellipsis.className = "news-pagination__ellipsis";
    ellipsis.setAttribute("aria-hidden", "true");
    ellipsis.textContent = "…";
    return ellipsis;
  }

  function renderPagination(pageCount) {
    pagination.innerHTML = "";

    pagination.append(createArrowButton("上一頁", currentPage - 1, currentPage === 1, "left"));

    const pages = getPaginationPages(pageCount);
    for (let i = 0; i < pages.length; i++) {
      if (pages[i] === "ellipsis") {
        pagination.append(createEllipsis());
      } else {
        pagination.append(createPageButton(pages[i]));
      }
    }

    pagination.append(createArrowButton("下一頁", currentPage + 1, currentPage === pageCount, "right"));
  }

  // ---------------------------------------------------------------------------
  // 事件
  // ---------------------------------------------------------------------------

  // 點分類按鈕：只讓被點的那顆 aria-pressed 為 true，並回到第 1 頁
  categoriesContainer.addEventListener("click", function (event) {
    const clickedButton = event.target.closest("[data-category]");
    if (!clickedButton) return;

    const buttons = categoriesContainer.querySelectorAll("[data-category]");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", String(buttons[i] === clickedButton));
    }

    currentPage = 1;
    render(true);
  });

  // 點分頁按鈕
  pagination.addEventListener("click", function (event) {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;

    currentPage = Number(button.dataset.page);
    render(true);
    window.requestAnimationFrame(scrollToNewsContent);
  });

  // ---------------------------------------------------------------------------
  // 載入資料
  // ---------------------------------------------------------------------------

  async function fetchNews() {
    const response = await fetch("/api/public/news");
    if (!response.ok) throw new Error("Unable to load news");
    return response.json();
  }

  // 分類載入失敗不影響主流程，回傳空陣列即可
  async function fetchCategories() {
    try {
      const response = await fetch("/api/public/news/categories");
      if (!response.ok) throw new Error("Unable to load categories");
      return await response.json();
    } catch (error) {
      return [];
    }
  }

  // 分類 API 沒資料時，改從消息本身的 tag 整理出不重複的分類
  function getCategoryLabels(categoryData, newsList) {
    if (Array.isArray(categoryData) && categoryData.length > 0) {
      return categoryData;
    }

    const labels = [];
    for (let i = 0; i < newsList.length; i++) {
      const tag = newsList[i].tag;
      if (tag && labels.indexOf(tag) === -1) {
        labels.push(tag);
      }
    }
    return labels;
  }

  function showLoadError() {
    empty.hidden = false;
    const message = empty.querySelector(".news-empty__message");
    if (message) {
      message.textContent = "目前無法載入最新消息。";
    }
  }

  async function loadNewsList() {
    try {
      // 兩個請求先同時送出，再依序等結果
      const newsRequest = fetchNews();
      const categoriesRequest = fetchCategories();
      const newsList = await newsRequest;
      const categoryData = await categoriesRequest;

      const labels = getCategoryLabels(categoryData, newsList);
      for (let i = 0; i < labels.length; i++) {
        addCategoryButton(labels[i]);
      }

      renderItems(newsList);
    } catch (error) {
      showLoadError();
    }
  }

  loadNewsList();
}

document.addEventListener("DOMContentLoaded", initNewsList);