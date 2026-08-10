(() => {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll(".affiliate-panel")];
  if (!tabs.length || !panels.length) return;
  tabs.forEach((tab) => tab.addEventListener("click", () => {
    const id = tab.getAttribute("aria-controls");
    tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    panels.forEach((panel) => { panel.hidden = panel.id !== id; });
  }));
})();
