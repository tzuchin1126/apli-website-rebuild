(() => {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll(".affiliate-panel")];
  if (tabs.length && panels.length) {
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
  }

  const regionFilters = [...document.querySelectorAll("[data-region-filter]")];
  const locationCards = [...document.querySelectorAll(".affiliate-location-card[data-region]")];
  if (!regionFilters.length || !locationCards.length) return;

  let selectedRegion = null;

  const filterLocations = () => {
    locationCards.forEach((card) => {
      card.hidden = selectedRegion !== null && card.dataset.region !== selectedRegion;
    });
    regionFilters.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.regionFilter === selectedRegion));
    });
  };

  regionFilters.forEach((button) => button.addEventListener("click", () => {
    selectedRegion = selectedRegion === button.dataset.regionFilter ? null : button.dataset.regionFilter;
    filterLocations();
  }));
  filterLocations();
})();
