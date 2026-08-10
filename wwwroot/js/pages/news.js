(() => {
  const root = document.querySelector("[data-news-filter]");
  const list = document.querySelector("[data-news-list]");
  const empty = document.querySelector("[data-news-empty]");
  if (!root || !list) return;

  const categories = root.querySelector("[data-news-categories]");
  const yearSelect = root.querySelector("[data-year]");
  let items = [];

  const render = () => {
    const category = root.querySelector("[aria-pressed='true']")?.dataset.category || "";
    const year = yearSelect?.value || "";
    let visible = 0;

    items.forEach((item) => {
      const matches = (!category || item.dataset.category === category) && (!year || item.dataset.year === year);
      item.hidden = !matches;
      if (matches) visible += 1;
    });

    if (empty) empty.hidden = visible !== 0;
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
      article.dataset.year = (item.date || "").slice(0, 4);
      article.innerHTML = `<a class="news-row" href="news-detail.html?id=${encodeURIComponent(item.id)}"><span class="news-row__date"></span><span class="news-row__tag"></span><span class="news-row__title"></span><span class="news-row__icon" aria-hidden="true">›</span></a>`;
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
    [...new Set(normalizedNews.filter((item) => item.published !== false).map((item) => (item.date || "").slice(0, 4)).filter(Boolean))].sort().reverse().forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect?.append(option);
    });
    renderItems(normalizedNews);
  }).catch(() => {
    if (empty) {
      empty.hidden = false;
      empty.textContent = "目前無法載入最新消息。";
    }
  });

  categories?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    categories.querySelectorAll("[data-category]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    render();
  });
  yearSelect?.addEventListener("change", render);
})();
