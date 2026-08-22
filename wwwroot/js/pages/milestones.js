// ==========================================
// 公司沿革頁面：年代分頁切換
// ==========================================

/**
 * 初始化公司沿革頁面分頁互動
 * - 年代標籤切換對應面板
 * - 支援鍵盤方向鍵左右切換
 * - 更新 aria-selected、tabIndex、面板 hidden 狀態
 */
function initMilestones() {
  const tabs = [...document.querySelectorAll("[data-era]")];
  const panels = [...document.querySelectorAll(".milestone-panel")];

  if (!tabs.length || !panels.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const milestonesContent = document.querySelector(".milestones-content");
  let hasEnteredViewport = false;

  /**
   * 設定目前面板內各年份與事件的依序進場時間
   * - 年份從左側滑入
   * - 事件標記與右側內容從右側依序滑入
   */
  function preparePanelReveal(panel) {
    const yearGroups = [...panel.querySelectorAll(".milestone-year-group")];

    yearGroups.forEach((group, groupIndex) => {
      const yearLabel = group.querySelector(".milestone-year-label");
      const events = [...group.querySelectorAll(".milestone-event")];
      const groupStart = groupIndex * 360;

      yearLabel?.style.setProperty("--milestone-year-delay", `${groupStart}ms`);

      events.forEach((event, eventIndex) => {
        const delay = groupStart + 120 + eventIndex * 70;
        event.querySelector(".milestone-event__marker")?.style.setProperty("--milestone-info-delay", `${delay}ms`);
        event.querySelector(".milestone-event__content")?.style.setProperty("--milestone-info-delay", `${delay}ms`);
      });
    });
  }

  function replayPanelReveal(panel) {
    if (reduceMotion) return;

    preparePanelReveal(panel);
    panel.classList.remove("is-revealing");
    void panel.offsetWidth;
    panel.classList.add("is-revealing");
  }

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

    const activePanel = panels.find((panel) => panel.id === panelId);
    if (activePanel && hasEnteredViewport) replayPanelReveal(activePanel);
  }

  // 綁定每個分頁的點擊與鍵盤事件
  tabs.forEach((tab, index) => {
    // 滑鼠點擊
    tab.addEventListener("click", () => selectTab(tab));

    // 鍵盤方向鍵切換（循環）
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];

      selectTab(nextTab);
      nextTab.focus(); // 移動焦點到新分頁
    });
  });

  // 初始化：啟用預設分頁（已有 aria-selected="true" 的，或第一個）
  const initialTab = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
  document.body.classList.add("milestones-motion-ready");
  selectTab(initialTab);

  if (reduceMotion || !milestonesContent) return;

  if (!("IntersectionObserver" in window)) {
    hasEnteredViewport = true;
    const activePanel = panels.find((panel) => !panel.hidden);
    if (activePanel) replayPanelReveal(activePanel);
    return;
  }

  const contentObserver = new IntersectionObserver((entries, observer) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;

    hasEnteredViewport = true;
    const activePanel = panels.find((panel) => !panel.hidden);
    if (activePanel) replayPanelReveal(activePanel);
    observer.disconnect();
  }, { threshold: 0.18 });

  contentObserver.observe(milestonesContent);
}

// ==========================================
// 啟動
// ==========================================
document.addEventListener("DOMContentLoaded", initMilestones);
