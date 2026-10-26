// ---------------------------------------------------------------------------
// 服務項目頁面：服務切換標籤 + 各服務輪播
// ---------------------------------------------------------------------------

// 把 NodeList 轉成一般陣列，方便用 for 迴圈處理
function toArray(nodeList) {
  const result = [];
  for (let i = 0; i < nodeList.length; i++) {
    result.push(nodeList[i]);
  }
  return result;
}

// ---------------------------------------------------------------------------
// 1. 服務切換標籤
// - 四個服務分類標籤切換對應面板
// - 支援 URL hash 深層連結
// - 支援鍵盤方向鍵左右切換
// ---------------------------------------------------------------------------

function setupServiceTabs() {
  const tabs = toArray(document.querySelectorAll("[role='tab']"));
  const panels = toArray(document.querySelectorAll("[data-service-panel]"));

  if (tabs.length === 0 || panels.length === 0) return;

  // 記錄每個面板的 id，之後用來檢查 hash 是否有效
  const panelIds = [];
  for (let i = 0; i < panels.length; i++) {
    panelIds.push(panels[i].id);
  }

  // 目前顯示的是第幾個面板
  let currentIndex = 0;

  // 建立外層容器，讓面板可以左右滑動切換
  const panelViewport = document.createElement("div");
  const panelTrack = document.createElement("div");
  panelViewport.className = "service-panels-viewport";
  panelTrack.className = "service-panels-track";
  panelViewport.appendChild(panelTrack);
  panels[0].parentNode.insertBefore(panelViewport, panels[0]);
  for (let i = 0; i < panels.length; i++) {
    panelTrack.appendChild(panels[i]);
  }

  // 讓外層高度等於目前面板的高度
  function updatePanelHeight() {
    panelViewport.style.height = panels[currentIndex].scrollHeight + "px";
  }

  // 切換到指定 id 的面板；updateHash 為 false 時不改網址
  function selectPanel(id, updateHash) {
    // 找出 id 對應第幾個面板，找不到就用第一個
    let selectedIndex = panelIds.indexOf(id);
    if (selectedIndex === -1) {
      selectedIndex = 0;
    }
    currentIndex = selectedIndex;
    const selectedId = panelIds[selectedIndex];

    // 更新標籤狀態
    for (let i = 0; i < tabs.length; i++) {
      const isSelected = tabs[i].getAttribute("aria-controls") === selectedId;
      tabs[i].setAttribute("aria-selected", String(isSelected));
      tabs[i].tabIndex = isSelected ? 0 : -1;
    }

    // 未選取的面板設成 inert，避免內容被聚焦或被螢幕閱讀器讀到
    for (let i = 0; i < panels.length; i++) {
      panels[i].inert = (i !== selectedIndex);
    }

    // 滑到對應面板，並調整高度
    panelTrack.style.transform = "translateX(-" + (selectedIndex * 100) + "%)";
    updatePanelHeight();

    if (updateHash !== false) {
      history.replaceState(null, "", "#" + selectedId);
    }
  }

  // 綁定每個標籤的點擊與鍵盤事件
  for (let index = 0; index < tabs.length; index++) {
    const tab = tabs[index];

    tab.addEventListener("click", function () {
      selectPanel(tab.getAttribute("aria-controls"), true);
    });

    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      nextTab.focus();
      selectPanel(nextTab.getAttribute("aria-controls"), true);
    });
  }

  // 初始化：有 hash 就用 hash，沒有就顯示第一個
  const initialHash = window.location.hash.slice(1);
  selectPanel(initialHash || tabs[0].getAttribute("aria-controls"), false);

  window.addEventListener("hashchange", function () {
    selectPanel(window.location.hash.slice(1), false);
  });

  // 視窗大小改變時，重新計算高度
  window.addEventListener("resize", updatePanelHeight);
}

// ---------------------------------------------------------------------------
// 2. 服務輪播（每個服務區塊各有一個）
// - 自動播放（5 秒），滑鼠移入/焦點進入時暫停
// - 上一張/下一張按鈕、圓點指示器
// - 觸控/滑鼠拖曳切換
// - 無障礙：aria-hidden、aria-current、aria-label
// ---------------------------------------------------------------------------

function setupServiceCarousels() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const carousels = toArray(document.querySelectorAll("[data-service-carousel]"));

  for (let c = 0; c < carousels.length; c++) {
    initOneServiceCarousel(carousels[c], reducedMotion);
  }
}

function initOneServiceCarousel(carousel, reducedMotion) {
  const track = carousel.querySelector(".service-carousel__track");
  const viewport = carousel.querySelector(".service-carousel__viewport");
  const slides = toArray(carousel.querySelectorAll(".service-carousel__slide"));
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");

  // 少於 2 張圖不需要輪播
  if (!track || !viewport || slides.length < 2) return;

  // 為每個 slide 設定 aria-label
  for (let i = 0; i < slides.length; i++) {
    slides[i].setAttribute("aria-label", "第 " + (i + 1) + " 張，共 " + slides.length + " 張");
  }

  // 建立圓點按鈕
  const dots = [];
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("button");
    dot.className = "service-carousel__dot";
    dot.type = "button";
    dot.setAttribute("aria-label", "顯示第 " + (i + 1) + " 張圖片");
    dot.setAttribute("aria-current", "false");
    if (dotsContainer) {
      dotsContainer.appendChild(dot);
    }
    dots.push(dot);
  }

  let current = 0;
  let timer;

  // 拖曳相關狀態
  let pointerStartX = 0;
  let pointerStartY = 0;
  let pointerDeltaX = 0;
  let pointerActive = false;
  let pointerMoved = false;

  // 顯示指定索引的 slide
  function show(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = "translateX(-" + (current * 100) + "%)";

    for (let i = 0; i < slides.length; i++) {
      slides[i].setAttribute("aria-hidden", String(i !== current));
    }
    for (let i = 0; i < dots.length; i++) {
      const active = (i === current);
      dots[i].classList.toggle("is-active", active);
      dots[i].setAttribute("aria-current", String(active));
    }
  }

  // 停止自動播放
  function stop() {
    window.clearInterval(timer);
    timer = undefined;
  }

  // 啟動自動播放
  function start() {
    stop();
    if (reducedMotion.matches) return;
    timer = window.setInterval(function () {
      show(current + 1);
    }, 5000);
  }

  // 上一張/下一張按鈕
  if (previous) {
    previous.addEventListener("click", function () {
      show(current - 1);
      start();
    });
  }
  if (next) {
    next.addEventListener("click", function () {
      show(current + 1);
      start();
    });
  }

  // 圓點點擊：第幾個圓點就顯示第幾張
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
      show(i);
      start();
    });
  }

  // ---------------------------------------------------------------------------
  // 觸控/滑鼠拖曳
  // ---------------------------------------------------------------------------

  // 結束拖曳。shouldCommit 為 false 代表取消，直接回彈
  function finishPointer(event, shouldCommit) {
    if (!pointerActive) return;
    pointerActive = false;
    viewport.classList.remove("is-dragging");

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    track.style.removeProperty("transition");

    // 拖曳距離超過門檻就切換，否則回彈
    const threshold = Math.max(40, viewport.clientWidth * 0.15);
    if (shouldCommit && pointerMoved && Math.abs(pointerDeltaX) >= threshold) {
      if (pointerDeltaX < 0) {
        show(current + 1);
      } else {
        show(current - 1);
      }
    } else {
      show(current);
    }
    start();
  }

  viewport.addEventListener("pointerdown", function (event) {
    if (!event.isPrimary || event.button !== 0) return;
    pointerActive = true;
    pointerMoved = false;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    pointerDeltaX = 0;
    stop();

    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-dragging");
  });

  viewport.addEventListener("pointermove", function (event) {
    if (!pointerActive || !event.isPrimary) return;
    pointerDeltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;

    // 垂直滑動為主，代表使用者想捲動頁面，取消拖曳
    if (!pointerMoved && Math.abs(deltaY) > Math.abs(pointerDeltaX) && Math.abs(deltaY) > 8) {
      finishPointer(event, false);
      return;
    }

    if (Math.abs(pointerDeltaX) > 6) {
      pointerMoved = true;
    }
    if (!pointerMoved) return;

    // 圖片即時跟著手指移動（暫時關掉動畫）
    track.style.transition = "none";
    track.style.transform = "translateX(calc(-" + (current * 100) + "% + " + pointerDeltaX + "px))";
  });

  viewport.addEventListener("pointerup", function (event) {
    finishPointer(event, true);
  });
  viewport.addEventListener("pointercancel", function (event) {
    finishPointer(event, false);
  });

  // 滑鼠移入/焦點進入時暫停，離開後繼續
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", function (event) {
    if (!carousel.contains(event.relatedTarget)) {
      start();
    }
  });
  reducedMotion.addEventListener("change", start);

  // 初始化
  show(0);
  start();
}

function initServices() {
  setupServiceTabs();
  setupServiceCarousels();
}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initServices);