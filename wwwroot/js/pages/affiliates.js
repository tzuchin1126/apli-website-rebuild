// ---------------------------------------------------------------------------
// 聯盟頁面：分頁切換、輪播、地點選擇
// ---------------------------------------------------------------------------

// 把 NodeList（querySelectorAll 抓到的結果）轉成一般陣列，方便用 forEach、find 等方法
function toArray(nodeList) {
  const result = [];
  for (let i = 0; i < nodeList.length; i++) {
    result.push(nodeList[i]);
  }
  return result;
}

function initAffiliates() {
  initTabs();
  initCarousels();
  initLocationPicker();
}

// ---------------------------------------------------------------------------
// 分頁（Tabs）
// ---------------------------------------------------------------------------

function initTabs() {
  const tabs = toArray(document.querySelectorAll("[role='tab']"));
  const panels = toArray(document.querySelectorAll(".affiliate-panel"));

  if (tabs.length === 0 || panels.length === 0) return;

  function selectTab(tab) {
    const panelId = tab.getAttribute("aria-controls");

    // 更新所有分頁按鈕狀態
    for (let i = 0; i < tabs.length; i++) {
      const item = tabs[i];
      const isSelected = item === tab;
      item.setAttribute("aria-selected", String(isSelected));
      item.tabIndex = isSelected ? 0 : -1; // 只有啟用的分頁可被 Tab 聚焦
    }

    // 只顯示對應的面板
    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const isActive = panel.id === panelId;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
      panel.hidden = !isActive;
    }
  }

  for (let index = 0; index < tabs.length; index++) {
    const tab = tabs[index];

    tab.addEventListener("click", function () {
      selectTab(tab);
    });

    tab.addEventListener("keydown", function (event) {
      const isVertical = window.matchMedia("(min-width: 1024px)").matches;
      const navigationKeys = isVertical ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
      if (navigationKeys.indexOf(event.key) === -1) return;
      event.preventDefault();

      // 計算下一個分頁索引（超過最後一個會回到第一個，反之亦然）
      const nextDirectionKey = isVertical ? "ArrowDown" : "ArrowRight";
      const direction = event.key === nextDirectionKey ? 1 : -1;
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
  selectTab(initialTab);
}

// ---------------------------------------------------------------------------
// 輪播（Carousel）
// ---------------------------------------------------------------------------

function initCarousels() {
  const carousels = document.querySelectorAll("[data-affiliate-carousel]");

  for (let c = 0; c < carousels.length; c++) {
    initOneCarousel(carousels[c]);
  }
}

function initOneCarousel(carousel) {
  const slides = toArray(carousel.querySelectorAll("[data-carousel-slide]"));
  const dots = toArray(carousel.querySelectorAll("[data-carousel-dot]"));

  if (slides.length < 2) return;

  let activeIndex = 0;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // 每張投影片離場動畫結束後要清除的計時器，直接存在該元素上（一個自訂屬性），
  // 不用 WeakMap 也可以做到一樣的效果，比較好懂。
  function clearLeavingSlide(slide) {
    if (slide.leaveCleanupTimer !== undefined) {
      window.clearTimeout(slide.leaveCleanupTimer);
      slide.leaveCleanupTimer = undefined;
    }
    slide.classList.remove("is-leaving");
  }

  function showSlide(nextIndex) {
    const previousIndex = activeIndex;
    activeIndex = (nextIndex + slides.length) % slides.length;
    const isChangingSlide = previousIndex !== activeIndex;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const isActive = i === activeIndex;
      const isLeaving = isChangingSlide && i === previousIndex;

      if (!isLeaving) clearLeavingSlide(slide);
      slide.classList.toggle("is-active", isActive);
      slide.classList.toggle("is-leaving", isLeaving);
      slide.setAttribute("aria-hidden", String(!isActive));

      if (isLeaving) {
        slide.leaveCleanupTimer = window.setTimeout(function () {
          clearLeavingSlide(slide);
        }, 700);
      }
    }

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const isActive = i === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    }
  }

  let pointerId = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let hasHorizontalIntent = false;

  function resetPointerGesture(event) {
    if (event && pointerId !== null && carousel.hasPointerCapture(pointerId)) {
      carousel.releasePointerCapture(pointerId);
    }
    pointerId = null;
    hasHorizontalIntent = false;
  }

  function onPointerDown(event) {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    if (event.target instanceof Element && event.target.closest("button")) return;

    pointerId = event.pointerId;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    hasHorizontalIntent = false;
    carousel.setPointerCapture(pointerId);
  }

  function onPointerMove(event) {
    if (event.pointerId !== pointerId) return;

    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    if (!hasHorizontalIntent && Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;

    if (!hasHorizontalIntent && Math.abs(deltaY) > Math.abs(deltaX)) {
      resetPointerGesture(event);
      return;
    }

    hasHorizontalIntent = true;
    event.preventDefault();
  }

  function onPointerUp(event) {
    if (event.pointerId !== pointerId) return;

    const deltaX = event.clientX - pointerStartX;
    const shouldChangeSlide = hasHorizontalIntent && Math.abs(deltaX) >= 48;
    resetPointerGesture(event);

    if (shouldChangeSlide) {
      showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
    }
  }

  carousel.addEventListener("pointerdown", onPointerDown);
  carousel.addEventListener("pointermove", onPointerMove);
  carousel.addEventListener("pointerup", onPointerUp);
  carousel.addEventListener("pointercancel", resetPointerGesture);

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.addEventListener("transitionend", function (event) {
      if (event.propertyName === "transform") clearLeavingSlide(slide);
    });
  }

  carousel.addEventListener("animationend", function (event) {
    if (event.animationName !== "affiliate-sexin-carousel-progress" || prefersReducedMotion.matches) return;
    if (!event.target.closest(".is-active")) return;
    showSlide(activeIndex + 1);
  });

  for (let i = 0; i < dots.length; i++) {
    const dotIndex = i; // 用一個新變數把當下的 i 記住，避免點擊時用到錯誤的值
    dots[i].addEventListener("click", function () {
      showSlide(dotIndex);
    });
  }

  showSlide(0);
}

// ---------------------------------------------------------------------------
// 地點選擇器
// ---------------------------------------------------------------------------

function initLocationPicker() {
  const locationCards = toArray(document.querySelectorAll(".affiliate-location-card[data-region]"));
  const locationMarkers = toArray(document.querySelectorAll(".affiliate-location-marker[data-location-id]"));

  if (locationCards.length === 0) return;

  let selectedLocationId = locationCards[0].dataset.locationId || null;

  function selectLocation(locationId) {
    let selectedCard = null;
    for (let i = 0; i < locationCards.length; i++) {
      if (locationCards[i].dataset.locationId === locationId) {
        selectedCard = locationCards[i];
        break;
      }
    }
    if (!selectedCard) return;

    selectedLocationId = locationId;

    for (let i = 0; i < locationCards.length; i++) {
      const card = locationCards[i];
      card.hidden = card !== selectedCard;
    }

    for (let i = 0; i < locationMarkers.length; i++) {
      const marker = locationMarkers[i];
      const isSelected = marker.dataset.locationId === selectedLocationId;
      marker.classList.toggle("is-active", isSelected);
      marker.setAttribute("aria-pressed", String(isSelected));
    }
  }

  for (let i = 0; i < locationMarkers.length; i++) {
    const marker = locationMarkers[i];
    marker.addEventListener("click", function () {
      selectLocation(marker.dataset.locationId);
    });
  }

  if (selectedLocationId) selectLocation(selectedLocationId);
}

document.addEventListener("DOMContentLoaded", initAffiliates);
