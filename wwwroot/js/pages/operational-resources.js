// ---------------------------------------------------------------------------
// 地理優勢區塊進場動畫：進入視窗附近時才播放一次
// ---------------------------------------------------------------------------

function setupResourcesLocationMotion() {
  const network = document.querySelector(".resources-location__network");
  if (!network) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("resources-location-motion-ready");

  function reveal() {
    network.classList.add("is-visible");
  }

  // 使用者要求減少動態，或瀏覽器不支援 IntersectionObserver：直接顯示
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    reveal();
    return;
  }

  // 區塊進入視窗後才顯示，只播放一次
  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      reveal();
      observer.disconnect();
    }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

  observer.observe(network);
}

// ---------------------------------------------------------------------------
// 營運資料分頁：廠區資訊 / 機具配置 / 作業量能
// ---------------------------------------------------------------------------

// 根據按下的按鍵，算出下一個標籤的位置；不是方向鍵就回傳 -1
function getNextIndex(key, index, total) {
  if (key === "ArrowRight" || key === "ArrowDown") {
    return (index + 1) % total;
  }
  if (key === "ArrowLeft" || key === "ArrowUp") {
    return (index - 1 + total) % total;
  }
  if (key === "Home") {
    return 0;
  }
  if (key === "End") {
    return total - 1;
  }
  return -1;
}

function setupResourcesDataTabs() {
  const tablist = document.querySelector(".resource-data-switcher__tabs");
  if (!tablist) return;

  const tabs = tablist.querySelectorAll('[role="tab"]');
  if (tabs.length === 0) return;

  // 依照每個標籤的 aria-controls 找出對應面板
  const panels = [];
  for (let i = 0; i < tabs.length; i++) {
    const panel = document.getElementById(tabs[i].getAttribute("aria-controls"));
    if (!panel) return;
    panels.push(panel);
  }

  const description = document.querySelector("#resource-data-description");
  const mobileViewport = window.matchMedia("(max-width: 760px)");
  let activeIndex = 0;

  // 建立外層容器，讓面板可以左右滑動切換
  const panelViewport = document.createElement("div");
  const panelTrack = document.createElement("div");
  panelViewport.className = "resource-data-switcher__panel-viewport";
  panelTrack.className = "resource-data-switcher__panel-track";
  panelViewport.appendChild(panelTrack);
  panels[0].parentNode.insertBefore(panelViewport, panels[0]);

  for (let i = 0; i < panels.length; i++) {
    panels[i].hidden = false;
    panels[i].inert = (i !== 0);
    panelTrack.appendChild(panels[i]);
  }

  // 設定外層高度：手機只看目前面板，桌機取最高的面板（切換時高度不跳動）
  function setPanelViewportHeight() {
    let height = 0;
    if (mobileViewport.matches) {
      height = panels[activeIndex].scrollHeight;
    } else {
      for (let i = 0; i < panels.length; i++) {
        if (panels[i].scrollHeight > height) {
          height = panels[i].scrollHeight;
        }
      }
    }
    panelViewport.style.height = height + "px";
  }

  // 切換到指定的分頁；moveFocus 為 true 時把焦點移到該標籤
  function activateTab(nextIndex, moveFocus) {
    activeIndex = nextIndex;

    for (let i = 0; i < tabs.length; i++) {
      const selected = (i === nextIndex);
      tabs[i].setAttribute("aria-selected", String(selected));
      tabs[i].tabIndex = selected ? 0 : -1;
      panels[i].inert = !selected;
    }

    if (description) {
      description.textContent = tabs[nextIndex].dataset.description || "";
    }

    panelTrack.style.transform = "translateX(-" + (nextIndex * 100) + "%)";
    setPanelViewportHeight();

    if (moveFocus) {
      tabs[nextIndex].focus();
    }
  }

  // 綁定每個標籤的點擊與鍵盤事件
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      activateTab(i, false);
    });

    tabs[i].addEventListener("keydown", function (event) {
      const nextIndex = getNextIndex(event.key, i, tabs.length);
      if (nextIndex === -1) return;

      event.preventDefault();
      activateTab(nextIndex, true);
    });
  }

  // 初始化高度，視窗大小改變時重新計算
  setPanelViewportHeight();
  window.addEventListener("resize", setPanelViewportHeight);
}

document.addEventListener("DOMContentLoaded", function () {
  setupResourcesLocationMotion();
  setupResourcesDataTabs();
});