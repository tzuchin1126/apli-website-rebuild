(() => {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll("[data-service-panel]")];
  if (!tabs.length || !panels.length) return;

  const select = (id, updateHash = true) => {
    tabs.forEach((tab) => {
      const selected = tab.getAttribute("aria-controls") === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== id; });
    if (updateHash) history.replaceState(null, "", `#${id}`);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab.getAttribute("aria-controls")));
    tab.addEventListener("keydown", (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length].focus();
    });
  });

  select(window.location.hash.slice(1) || tabs[0].getAttribute("aria-controls"), false);
})();
