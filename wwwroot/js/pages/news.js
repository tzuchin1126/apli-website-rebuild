(() => {
  const root = document.querySelector("[data-news-filter]");
  const items = [...document.querySelectorAll("[data-news-item]")];
  const empty = document.querySelector("[data-news-empty]");
  if (!root || !items.length) return;

  const render = () => {
    const category = root.querySelector("[aria-pressed='true']")?.dataset.category || "";
    const year = root.querySelector("[data-year]")?.value || "";
    let visible = 0;

    items.forEach((item) => {
      const matches = (!category || item.dataset.category === category) && (!year || item.dataset.year === year);
      item.hidden = !matches;
      if (matches) visible += 1;
    });

    if (empty) empty.hidden = visible !== 0;
  };

  root.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      root.querySelectorAll("[data-category]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      render();
    });
  });

  root.querySelector("[data-year]")?.addEventListener("change", render);
})();
