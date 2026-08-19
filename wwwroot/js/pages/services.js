// ==========================================
// 服務項目頁面：服務切換標籤 + 各服務輪播
// ==========================================

/** 偏好減少動畫媒體查詢 */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/**
 * 建立方向箭頭 icon（供輪播使用）
 * @param {"left"|"right"} direction
 * @returns {HTMLElement}
 */
function createArrow(direction) {
  const icon = document.createElement("i");
  icon.className = `ph ph-caret-${direction}`;
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = direction === "left" ? "\uE138" : "\uE13A";
  return icon;
}

/**
 * 1. 服務切換標籤
 * - 三個服務分類標籤切換對應面板
 * - 支援 URL hash 深層連結
 * - 支援鍵盤方向鍵左右切換
 */
function setupServiceTabs() {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll("[data-service-panel]")];
  const panelIds = new Set(panels.map((panel) => panel.id));

  if (!tabs.length || !panels.length) return;

  function selectPanel(id, updateHash = true) {
    const selectedId = panelIds.has(id) ? id : panels[0]?.id;
    if (!selectedId) return;

    tabs.forEach((tab) => {
      const isSelected = tab.getAttribute("aria-controls") === selectedId;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== selectedId;
    });

    if (updateHash) history.replaceState(null, "", `#${selectedId}`);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectPanel(tab.getAttribute("aria-controls")));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
      nextTab.focus();
      selectPanel(nextTab.getAttribute("aria-controls"));
    });
  });

  const initialHash = window.location.hash.slice(1);
  selectPanel(initialHash || tabs[0].getAttribute("aria-controls"), false);
  window.addEventListener("hashchange", () => selectPanel(window.location.hash.slice(1), false));
}

/**
 * 2. 服務輪播（每個服務區塊各有一個）
 * - 自動播放（5 秒），滑鼠/焦點/可見性暫停
 * - 上一張/下一張按鈕、圓點指示器
 * - 觸控/滑鼠拖曳切換
 * - 無障礙：aria-hidden、aria-current、aria-label
 */
function setupServiceCarousels() {
  const carousels = [...document.querySelectorAll("[data-service-carousel]")];

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".service-carousel__track");
    const viewport = carousel.querySelector(".service-carousel__viewport");
    const slides = [...carousel.querySelectorAll(".service-carousel__slide")];
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");

    if (!track || slides.length < 2) return;

    // 為每個 slide 設定 aria-label
    slides.forEach((slide, index) => {
      slide.setAttribute("aria-label", `第 ${index + 1} 張，共 ${slides.length} 張`);
    });

    // 建立圓點按鈕
    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.className = "service-carousel__dot";
      dot.type = "button";
      dot.dataset.carouselDot = String(index);
      dot.setAttribute("aria-label", `顯示第 ${index + 1} 張圖片`);
      dot.setAttribute("aria-current", "false");
      dotsContainer?.append(dot);
      return dot;
    });

    let current = 0;
    let timer;

    // 拖曳相關狀態
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerDeltaX = 0;
    let pointerActive = false;
    let pointerMoved = false;

    /**
     * 顯示指定索引的 slide
     * @param {number} index
     */
    function show(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        slide.setAttribute("aria-hidden", String(slideIndex !== current));
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", String(active));
      });
    }

    /** 停止自動播放 */
    function stop() {
      window.clearInterval(timer);
      timer = undefined;
    }

    /** 啟動自動播放 */
    function start() {
      stop();
      if (reducedMotion.matches) return;
      timer = window.setInterval(() => show(current + 1), 5000);
    }

    // 上一張/下一張按鈕
    previous?.addEventListener("click", () => {
      show(current - 1);
      start();
    });
    next?.addEventListener("click", () => {
      show(current + 1);
      start();
    });

    // 圓點點擊
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        show(Number(dot.dataset.carouselDot));
        start();
      });
    });

    // ===== 觸控/滑鼠拖曳 =====
    /**
     * 完成拖曳，決定是否切換 slide
     * @param {PointerEvent} event
     * @param {boolean} commit - true=可能切換，false=取消拖曳直接回彈
     */
    function finishPointer(event, commit = true) {
      if (!pointerActive) return;
      pointerActive = false;
      viewport?.classList.remove("is-dragging");

      if (viewport?.hasPointerCapture(event.pointerId)) {
        try { viewport.releasePointerCapture(event.pointerId); } catch {}
      }
      track.style.removeProperty("transition");

      // 拖曳距離超過閾值 → 切換
      const threshold = Math.max(40, viewport.clientWidth * 0.15);
      if (commit && pointerMoved && Math.abs(pointerDeltaX) >= threshold) {
        show(current + (pointerDeltaX < 0 ? 1 : -1));
      } else {
        show(current); // 回彈
      }
      start();
    }

    viewport?.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointerActive = true;
      pointerMoved = false;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerDeltaX = 0;
      stop();

      try { viewport.setPointerCapture(event.pointerId); } catch {}
      viewport.classList.add("is-dragging");
    });

    viewport?.addEventListener("pointermove", (event) => {
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
      track.style.transform = `translateX(calc(-${current * 100}% + ${pointerDeltaX}px))`;
    });

    viewport?.addEventListener("pointerup", (event) => finishPointer(event));
    viewport?.addEventListener("pointercancel", (event) => finishPointer(event, false));

    // 滑鼠/焦點/可見性控制自動播放
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) start();
    });
    reducedMotion.addEventListener?.("change", start);

    // 初始化
    show(0);
    start();
  });
}

/**
 * 初始化服務項目頁面
 */
function initServices() {
  setupServiceTabs();
  setupServiceCarousels();
}

// ==========================================
// 啟動
// ==========================================
document.addEventListener("DOMContentLoaded", initServices);
