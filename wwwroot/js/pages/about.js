(() => {
  const gallery = document.querySelector("[data-philosophy-gallery]");
  if (!gallery) return;

  const panels = [...gallery.querySelectorAll("[data-philosophy-panel]")];
  const images = [...gallery.querySelectorAll("[data-philosophy-image]")];
  const defaultPanel = gallery.dataset.defaultPanel || "";

  const setState = (panel, expanded) => {
    images.forEach((image) => {
      image.dataset.active = String(image.dataset.philosophyImage === panel);
    });
    panels.forEach((item) => {
      const active = expanded && item.dataset.philosophyPanel === panel;
      item.dataset.active = String(active);
      item.setAttribute("aria-expanded", String(active));
    });
  };

  const activate = (panel) => setState(panel.dataset.philosophyPanel, true);
  const reset = () => setState(defaultPanel, false);

  panels.forEach((panel) => {
    panel.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "touch") activate(panel);
    });
    panel.addEventListener("focus", () => activate(panel));
    panel.addEventListener("click", () => activate(panel));
  });

  gallery.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "touch" && !gallery.contains(document.activeElement)) reset();
  });
  gallery.addEventListener("focusout", () => {
    requestAnimationFrame(() => {
      if (!gallery.contains(document.activeElement)) reset();
    });
  });

  reset();
})();
