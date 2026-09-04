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
// - 三個服務分類標籤切換對應面板
// - 支援 URL hash 深層連結
// - 支援鍵盤方向鍵左右切換
// ---------------------------------------------------------------------------

function setupServiceTabs() {
  const tabs = toArray(document.querySelectorAll("[role='tab']"));
  const panels = toArray(document.querySelectorAll("[data-service-panel]"));

  const panelIds = [];
  for (let i = 0; i < panels.length; i++) {
    panelIds.push(panels[i].id);
  }

  if (tabs.length === 0 || panels.length === 0) return;

  function selectPanel(id, updateHash) {
    let selectedId = id;
    if (panelIds.indexOf(id) === -1) {
      selectedId = panels[0] ? panels[0].id : null;
    }
    if (!selectedId) return;

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      const isSelected = tab.getAttribute("aria-controls") === selectedId;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    }

    // 顯示/隱藏對應面板：同步 hidden、is-active 與 aria-hidden，
    // 確保未選取面板不可聚焦、不被螢幕閱讀器朗讀
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const isActive = panel.id === selectedId;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
      panel.hidden = !isActive;
    }

    if (updateHash !== false) history.replaceState(null, "", "#" + selectedId);
  }

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

  const initialHash = window.location.hash.slice(1);
  selectPanel(initialHash || tabs[0].getAttribute("aria-controls"), false);

  window.addEventListener("hashchange", function () {
    selectPanel(window.location.hash.slice(1), false);
  });
}

// ---------------------------------------------------------------------------
// 2. 服務輪播（每個服務區塊各有一個）
// - 自動播放（5 秒），滑鼠/焦點/可見性暫停
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

  if (!track || slides.length < 2) return;

  // 為每個 slide 設定 aria-label
  for (let i = 0; i < slides.length; i++) {
    slides[i].setAttribute("aria-label", "第 " + (i + 1) + " 張，共 " + slides.length + " 張");
  }

  // 建立圓點按鈕
  const dots = [];
  for (let index = 0; index < slides.length; index++) {
    const dot = document.createElement("button");
    dot.className = "service-carousel__dot";
    dot.type = "button";
    dot.dataset.carouselDot = String(index);
    dot.setAttribute("aria-label", "顯示第 " + (index + 1) + " 張圖片");
    dot.setAttribute("aria-current", "false");
    if (dotsContainer) dotsContainer.append(dot);
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
      const dot = dots[i];
      const active = i === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", String(active));
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

  // 圓點點擊
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    dot.addEventListener("click", function () {
      show(Number(dot.dataset.carouselDot));
      start();
    });
  }

  // ---------------------------------------------------------------------------
  // 觸控/滑鼠拖曳
  // ---------------------------------------------------------------------------

  // 完成拖曳，決定是否切換 slide；commit 為 false 時代表要取消拖曳、直接回彈
  function finishPointer(event, commit) {
    if (!pointerActive) return;
    pointerActive = false;
    if (viewport) viewport.classList.remove("is-dragging");

    if (viewport && viewport.hasPointerCapture(event.pointerId)) {
      try {
        viewport.releasePointerCapture(event.pointerId);
      } catch (error) {
        // 有些瀏覽器在指標已經放開時呼叫會丟出錯誤，這裡忽略即可
      }
    }
    track.style.removeProperty("transition");

    // 拖曳距離超過閾值 → 切換
    const threshold = Math.max(40, viewport.clientWidth * 0.15);
    if (commit !== false && pointerMoved && Math.abs(pointerDeltaX) >= threshold) {
      show(current + (pointerDeltaX < 0 ? 1 : -1));
    } else {
      show(current); // 回彈
    }
    start();
  }

  if (viewport) {
    viewport.addEventListener("pointerdown", function (event) {
      if (!event.isPrimary || event.button !== 0) return;
      pointerActive = true;
      pointerMoved = false;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerDeltaX = 0;
      stop();

      try {
        viewport.setPointerCapture(event.pointerId);
      } catch (error) {
        // 部分瀏覽器不支援時忽略即可
      }
      viewport.classList.add("is-dragging");
    });

    viewport.addEventListener("pointermove", function (event) {
      if (!pointerActive || !event.isPrimary) return;
      pointerDeltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;

      // 垂直滑動為主 → 取消拖曳
      if (!pointerMoved && Math.abs(deltaY) > Math.abs(pointerDeltaX) && Math.abs(deltaY) > 8) {
        finishPointer(event, false);
        return;
      }
      if (Math.abs(pointerDeltaX) > 6) pointerMoved = true;
      if (!pointerMoved) return;

      // 即時跟隨拖曳（無 transition）
      track.style.transition = "none";
      track.style.transform = "translateX(calc(-" + (current * 100) + "% + " + pointerDeltaX + "px))";
    });

    viewport.addEventListener("pointerup", function (event) {
      finishPointer(event, true);
    });
    viewport.addEventListener("pointercancel", function (event) {
      finishPointer(event, false);
    });
  }

  // 滑鼠/焦點/可見性控制自動播放
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", function (event) {
    if (!carousel.contains(event.relatedTarget)) start();
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