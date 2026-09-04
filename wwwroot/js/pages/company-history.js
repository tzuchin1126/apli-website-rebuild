// ---------------------------------------------------------------------------
// 公司沿革頁面：分頁互動
// - 年代標籤切換對應面板
// - 支援鍵盤方向鍵左右切換
// - 更新 aria-selected、tabIndex、面板 CSS class 與 aria-hidden 狀態
// - 無 JS 時：所有面板預設顯示（漸進增強）
// ---------------------------------------------------------------------------

// 把 NodeList 轉成一般陣列，方便用 for 迴圈處理
function toArray(nodeList) {
  const result = [];
  for (let i = 0; i < nodeList.length; i++) {
    result.push(nodeList[i]);
  }
  return result;
}

function initMilestones() {
  const tabs = toArray(document.querySelectorAll("[data-era]"));
  const panels = toArray(document.querySelectorAll(".milestone-panel"));

  if (tabs.length === 0 || panels.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const milestonesContent = document.querySelector(".milestones-content");

  // 內容還沒滾入視窗之前，不要重播動畫
  let hasEnteredViewport = false;

  // 設定目前面板內各年份與事件的依序進場時間
  // - 年份從左側滑入
  // - 事件標記與右側內容從右側依序滑入
  function preparePanelReveal(panel) {
    const yearGroups = toArray(panel.querySelectorAll(".milestone-year-group"));

    for (let groupIndex = 0; groupIndex < yearGroups.length; groupIndex++) {
      const group = yearGroups[groupIndex];
      const yearLabel = group.querySelector(".milestone-year-label");
      const events = toArray(group.querySelectorAll(".milestone-event"));
      const groupStart = groupIndex * 360;

      yearLabel.style.setProperty("--milestone-year-delay", groupStart + "ms");

      for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
        const event = events[eventIndex];
        const delay = groupStart + 120 + eventIndex * 70;
        event.querySelector(".milestone-event__marker").style.setProperty("--milestone-info-delay", delay + "ms");
        event.querySelector(".milestone-event__content").style.setProperty("--milestone-info-delay", delay + "ms");
      }
    }
  }

  function replayPanelReveal(panel) {
    if (reduceMotion) return;

    preparePanelReveal(panel);
    panel.classList.remove("is-revealing");
    void panel.offsetWidth; // 強制 reflow，讓移除/加回 class 能重新觸發 CSS 動畫
    panel.classList.add("is-revealing");
  }

  // 找出目前啟用的面板並重播進場動畫，供初始化與 observer callback 共用
  function replayActivePanel() {
    let activePanel = null;
    for (let i = 0; i < panels.length; i++) {
      if (panels[i].classList.contains("is-active")) {
        activePanel = panels[i];
        break;
      }
    }
    if (activePanel) replayPanelReveal(activePanel);
  }

  // 切換到指定分頁
  function selectTab(tab) {
    const panelId = tab.getAttribute("aria-controls");

    for (let i = 0; i < tabs.length; i++) {
      const item = tabs[i];
      const isSelected = item === tab;
      item.setAttribute("aria-selected", String(isSelected));
      item.tabIndex = isSelected ? 0 : -1; // 只有啟用的分頁可被 Tab 聚焦
    }

    // 顯示/隱藏對應面板：同步 hidden、is-active 與 aria-hidden，保持輔助工具狀態一致
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const isActive = panel.id === panelId;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
      panel.hidden = !isActive;
    }

    if (hasEnteredViewport) replayActivePanel();
  }

  // 綁定每個分頁的點擊與鍵盤事件
  for (let index = 0; index < tabs.length; index++) {
    const tab = tabs[index];

    tab.addEventListener("click", function () {
      selectTab(tab);
    });

    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];

      selectTab(nextTab);
      nextTab.focus(); // 移動焦點到新分頁
    });
  }

  // 找出一開始就是選中狀態的分頁，找不到就用第一個
  let initialTab = tabs[0];
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].getAttribute("aria-selected") === "true") {
      initialTab = tabs[i];
      break;
    }
  }

  document.body.classList.add("milestones-motion-ready");
  selectTab(initialTab);

  if (reduceMotion || !milestonesContent) return;

  // 內容滾入視窗後才播放一次進場動畫，之後切分頁的重播交給 selectTab
  const contentObserver = new IntersectionObserver(function (entries, observer) {
    let isVisible = false;
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        isVisible = true;
        break;
      }
    }
    if (!isVisible) return;

    hasEnteredViewport = true;
    replayActivePanel();
    observer.disconnect();
  }, { threshold: 0.18 });

  contentObserver.observe(milestonesContent);
}

document.addEventListener("DOMContentLoaded", initMilestones);