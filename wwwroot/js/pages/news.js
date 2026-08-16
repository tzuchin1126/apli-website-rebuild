(() => {
  const root = document.querySelector("[data-news-filter]");
  const list = document.querySelector("[data-news-list]");
  const empty = document.querySelector("[data-news-empty]");
  const emptyMessage = empty?.querySelector(".news-empty__message");
  if (!root || !list) return;

  const categories = root.querySelector("[data-news-categories]");
  const pageSize = 8;
  const loadMore = document.createElement("button");
  let items = [];
  let visibleCount = pageSize;
  const rowIconMarkup = '<span class="news-row__icon" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

  loadMore.type = "button";
  loadMore.className = "news-load-more button--primary";
  loadMore.textContent = "載入更多";
  loadMore.hidden = true;
  list.after(loadMore);

  const render = (animate = false) => {
    const category = root.querySelector("[aria-pressed='true']")?.dataset.category || "";
    let matchingCount = 0;

    items.forEach((item) => {
      const matches = !category || item.dataset.category === category;
      item.hidden = !matches || matchingCount >= visibleCount;
      if (matches) matchingCount += 1;
    });

    loadMore.hidden = matchingCount <= visibleCount;
    if (empty) empty.hidden = matchingCount !== 0;
    if (animate) {
      list.classList.remove("news-list--filtering");
      void list.offsetWidth;
      list.classList.add("news-list--filtering");
    }
  };

  const addCategory = (label, value, selected = false) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.category = value;
    button.setAttribute("aria-pressed", String(selected));
    button.textContent = label;
    categories?.append(button);
  };

  const renderItems = (source) => {
    const news = source.map((item) => ({
      id: item.id ?? item.Id,
      date: item.date ?? item.Date,
      tag: item.tag ?? item.Tag,
      title: item.title ?? item.Title,
      published: item.published ?? item.Published
    }));
    list.querySelectorAll("[data-news-item]").forEach((item) => item.remove());
    news.filter((item) => item.published !== false).forEach((item) => {
      const article = document.createElement("article");
      article.className = "news-item";
      article.dataset.newsItem = "";
      article.dataset.category = item.tag || "";
      article.innerHTML = `<a class="news-row" href="news-detail.html?id=${encodeURIComponent(item.id)}"><span class="news-row__date"></span><span class="news-row__tag"></span><span class="news-row__title"></span>${rowIconMarkup}</a>`;
      const row = article.querySelector(".news-row");
      row.querySelector(".news-row__date").textContent = item.date || "";
      row.querySelector(".news-row__tag").textContent = item.tag || "";
      row.querySelector(".news-row__title").textContent = item.title || "";
      list.insertBefore(article, empty);
    });
    items = [...list.querySelectorAll("[data-news-item]")];
    render();
  };

  Promise.all([
    fetch("data/news.json", { cache: "no-store" }).then((response) => response.json()),
    fetch("data/news-categories.json", { cache: "no-store" }).then((response) => response.json()).catch(() => [])
  ]).then(([news, categoryData]) => {
    const normalizedNews = news.map((item) => ({
      id: item.id ?? item.Id,
      date: item.date ?? item.Date,
      tag: item.tag ?? item.Tag,
      title: item.title ?? item.Title,
      published: item.published ?? item.Published
    }));
    const labels = Array.isArray(categoryData) && categoryData.length ? categoryData : [...new Set(normalizedNews.map((item) => item.tag).filter(Boolean))];
    labels.forEach((category) => addCategory(category, category));
    renderItems(normalizedNews);
  }).catch(() => {
    if (empty) {
      empty.hidden = false;
      if (emptyMessage) emptyMessage.textContent = "目前無法載入最新消息。";
    }
  });

  categories?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    categories.querySelectorAll("[data-category]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    visibleCount = pageSize;
    render(true);
  });
  loadMore.addEventListener("click", () => {
    visibleCount += pageSize;
    render();
  });
})();
