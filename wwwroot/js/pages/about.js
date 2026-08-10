(() => {
  const gallery = document.querySelector("[data-philosophy-gallery]");
  if (!gallery) return;

  const panels = [...gallery.querySelectorAll("[data-philosophy-panel]")];
  const valuesImage = gallery.querySelector("[data-philosophy-image='values']");
  panels.forEach((panel) => {
    panel.addEventListener("click", () => {
      panels.forEach((item) => item.setAttribute("aria-expanded", String(item === panel)));
      if (valuesImage) valuesImage.style.opacity = panel.dataset.philosophyPanel === "values" ? "1" : "0";
    });
  });
})();
