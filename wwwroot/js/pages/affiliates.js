function initAffiliates() {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll(".affiliate-panel")];

  if (tabs.length && panels.length) {
    function selectTab(tab) {
      const panelId = tab.getAttribute("aria-controls");

      // 更新所有分頁按鈕狀態
      tabs.forEach((item) => {
        const isSelected = item === tab;
        item.setAttribute("aria-selected", String(isSelected));
        item.tabIndex = isSelected ? 0 : -1; // 只有啟用的分頁可被 Tab 聚焦
      });

       panels.forEach((panel) => {
         const isActive = panel.id === panelId;
         panel.classList.toggle("is-active", isActive);
         panel.setAttribute("aria-hidden", String(!isActive));
       });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectTab(tab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();

        // 計算下一個分頁索引（循環）
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + direction + tabs.length) % tabs.length;
        const nextTab = tabs[nextIndex];

        selectTab(nextTab);
        nextTab.focus(); // 移動焦點到新分頁
      });
    });

    const initialTab = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
    selectTab(initialTab);
  }

  const regionFilters = [...document.querySelectorAll("[data-region-filter]")];
  const locationCards = [...document.querySelectorAll(".affiliate-location-card[data-region]")];

  if (!regionFilters.length || !locationCards.length) return;

  let selectedRegion = null; // 目前選中的區域，null = 全部顯示

  function filterLocations() {
    locationCards.forEach((card) => {
      card.hidden = selectedRegion !== null && card.dataset.region !== selectedRegion;
    });

    regionFilters.forEach((button) => {
      const isPressed = button.dataset.regionFilter === selectedRegion;
      button.setAttribute("aria-pressed", String(isPressed));
    });
  }

  regionFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const region = button.dataset.regionFilter;
      selectedRegion = selectedRegion === region ? null : region;
      filterLocations();
    });
  });

  filterLocations();
}

document.addEventListener("DOMContentLoaded", initAffiliates);