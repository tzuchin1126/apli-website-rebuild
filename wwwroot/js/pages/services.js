(() => {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll("[data-service-panel]")];

  const select = (id, updateHash = true) => {
    tabs.forEach((tab) => {
      const selected = tab.getAttribute("aria-controls") === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== id; });
    if (updateHash) history.replaceState(null, "", `#${id}`);
  };

  if (tabs.length && panels.length) {
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(tab.getAttribute("aria-controls")));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        tabs[(index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length].focus();
      });
    });

    select(window.location.hash.slice(1) || tabs[0].getAttribute("aria-controls"), false);
  }
})();

(() => {
  document.querySelectorAll("[data-image-collage]").forEach((collage) => {
    const grid = collage.querySelector(".service-collage__grid");
    const images = grid ? [...grid.querySelectorAll("img")] : [];
    const pages = [...collage.querySelectorAll("[data-collage-page]")];
    const previous = collage.querySelector("[data-collage-previous]");
    const next = collage.querySelector("[data-collage-next]");
    if (!grid || images.length < 2 || pages.length !== images.length || !previous || !next) return;

    let activeIndex = 0;

    const render = (index) => {
      activeIndex = Math.max(0, Math.min(images.length - 1, index));
      [images[activeIndex], ...images.filter((_, imageIndex) => imageIndex !== activeIndex)]
        .forEach((image) => grid.append(image));
      pages.forEach((page, pageIndex) => {
        const active = pageIndex === activeIndex;
        page.classList.toggle("is-active", active);
        if (active) page.setAttribute("aria-current", "page");
        else page.removeAttribute("aria-current");
      });
      previous.disabled = activeIndex === 0;
      next.disabled = activeIndex === images.length - 1;
    };

    previous.addEventListener("click", () => render(activeIndex - 1));
    next.addEventListener("click", () => render(activeIndex + 1));
    pages.forEach((page, pageIndex) => page.addEventListener("click", () => render(pageIndex)));
    render(0);
  });
})();
