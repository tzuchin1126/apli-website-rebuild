(() => {
  const tabs = [...document.querySelectorAll("[data-era]")];
  const panels = [...document.querySelectorAll(".milestone-panel")];
  if (!tabs.length || !panels.length) return;

  const selectTab = (tab) => {
    const id = tab.getAttribute("aria-controls");
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== id; });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const nextTab = tabs[(index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      selectTab(nextTab);
      nextTab.focus();
    });
  });

  selectTab(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0]);
})();
