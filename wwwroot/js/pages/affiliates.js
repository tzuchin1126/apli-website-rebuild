// ==========================================
// 關係企業頁面：分頁切換 + 區域篩選
// ==========================================

/**
 * 初始化關係企業頁面互動
 * - 分頁切換（支援鍵盤方向鍵）
 * - 區域篩選按鈕（切換顯示/隱藏地點卡片）
 */
function initAffiliates() {
  // ==========================================
  // 1. 分頁切換
  // ==========================================
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll(".affiliate-panel")];

  if (tabs.length && panels.length) {
    /**
     * 切換到指定分頁
     * @param {HTMLElement} tab - 要啟用的分頁按鈕
     */
    function selectTab(tab) {
      const panelId = tab.getAttribute("aria-controls");

      // 更新所有分頁按鈕狀態
      tabs.forEach((item) => {
        const isSelected = item === tab;
        item.setAttribute("aria-selected", String(isSelected));
        item.tabIndex = isSelected ? 0 : -1; // 只有啟用的分頁可被 Tab 聚焦
      });

      // 顯示/隱藏對應面板
      panels.forEach((panel) => {
        panel.hidden = panel.id !== panelId;
      });
    }

    // 綁定每個分頁的點擊與鍵盤事件
    tabs.forEach((tab, index) => {
      // 滑鼠點擊
      tab.addEventListener("click", () => selectTab(tab));

      // 鍵盤方向鍵切換
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

    // 初始化：啟用預設分頁（已有 aria-selected="true" 的，或第一個）
    const initialTab = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
    selectTab(initialTab);
  }

  // ==========================================
  // 2. 區域篩選
  // ==========================================
  const regionFilters = [...document.querySelectorAll("[data-region-filter]")];
  const locationCards = [...document.querySelectorAll(".affiliate-location-card[data-region]")];

  if (!regionFilters.length || !locationCards.length) return;

  let selectedRegion = null; // 目前選中的區域，null = 全部顯示

  /**
   * 根據選中的區域篩選地點卡片
   */
  function filterLocations() {
    locationCards.forEach((card) => {
      // 若未選區域、或卡片區域符合選中區域 → 顯示
      card.hidden = selectedRegion !== null && card.dataset.region !== selectedRegion;
    });

    // 更新篩選按鈕的 aria-pressed 狀態
    regionFilters.forEach((button) => {
      const isPressed = button.dataset.regionFilter === selectedRegion;
      button.setAttribute("aria-pressed", String(isPressed));
    });
  }

  // 綁定篩選按鈕點擊：再次點擊同一個 = 取消篩選（全部顯示）
  regionFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const region = button.dataset.regionFilter;
      selectedRegion = selectedRegion === region ? null : region;
      filterLocations();
    });
  });

  // 初始化：全部顯示
  filterLocations();
}

// ==========================================
// 啟動
// ==========================================
document.addEventListener("DOMContentLoaded", initAffiliates);