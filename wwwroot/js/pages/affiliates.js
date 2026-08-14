(() => {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll(".affiliate-panel")];
  if (tabs.length && panels.length) {
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      const id = tab.getAttribute("aria-controls");
      tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      panels.forEach((panel) => { panel.hidden = panel.id !== id; });
    }));
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
