(() => {
  const list = document.querySelector("[data-home-latest-list]");
  if (!list) return;

  fetch("data/news.json", { cache: "no-store" })
    .then((response) => response.json())
    .then((source) => source.map((item) => ({
      id: item.id ?? item.Id,
      date: item.date ?? item.Date,
      tag: item.tag ?? item.Tag,
      title: item.title ?? item.Title,
      published: item.published ?? item.Published
    })).filter((item) => item.published !== false).slice(0, 3))
    .then((items) => {
      list.replaceChildren();
      items.forEach((item) => {
        const link = document.createElement("a");
        link.className = "home-latest__item";
        link.href = `news-detail.html?id=${encodeURIComponent(item.id)}`;
        link.innerHTML = `<time></time><span></span><strong></strong><i aria-hidden="true">›</i>`;
        link.querySelector("time").textContent = item.date;
        link.querySelector("span").textContent = item.tag;
        link.querySelector("strong").textContent = item.title;
        list.append(link);
      });
    })
    .catch(() => {
      list.innerHTML = "<p class=\"home-latest__empty\">目前無法載入最新消息。</p>";
    });
})();
