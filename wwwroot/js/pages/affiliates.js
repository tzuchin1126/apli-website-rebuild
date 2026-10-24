// ---------------------------------------------------------------------------
// 關係企業頁面：分頁切換、輪播、地點選擇
// ---------------------------------------------------------------------------

// 把 NodeList（querySelectorAll 抓到的結果）轉成一般陣列，方便之後用 for 迴圈處理
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

// 決定一進頁面要顯示哪個分頁，順序：
// 1. 網址 hash 指定的分頁  2. HTML 裡 aria-selected="true" 的分頁  3. 第一個分頁
function getInitialTab(tabs) {
  const hashId = window.location.hash.slice(1);

  if (hashId) {
    const hashElement = document.getElementById(hashId);
    if (hashElement && hashElement.getAttribute("role") === "tab") {
      return hashElement;
    }
  }

  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].getAttribute("aria-selected") === "true") {
      return tabs[i];
    }
  }

  return tabs[0];
}

function initTabs() {
  const tabs = toArray(document.querySelectorAll("[role='tab']"));
  const panels = toArray(document.querySelectorAll(".affiliate-panel"));

  if (tabs.length === 0 || panels.length === 0) return;

  // shouldUpdateHash：使用者操作時為 true（讓網址可分享），頁面初始化時為 false
  function selectTab(tab, shouldUpdateHash) {
    const panelId = tab.getAttribute("aria-controls");

    // 更新所有分頁按鈕狀態
    for (let i = 0; i < tabs.length; i++) {
      const isSelected = tabs[i] === tab;
      tabs[i].setAttribute("aria-selected", String(isSelected));
      tabs[i].tabIndex = isSelected ? 0 : -1; // 只有目前的分頁可被 Tab 鍵聚焦
    }

    // 只顯示對應的面板
    for (let i = 0; i < panels.length; i++) {
      const isActive = panels[i].id === panelId;
      panels[i].classList.toggle("is-active", isActive);
      panels[i].setAttribute("aria-hidden", String(!isActive));
      panels[i].hidden = !isActive;
    }

    if (shouldUpdateHash && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + tab.id);
    }
  }

  // 鍵盤方向鍵：回傳要切換到的分頁，不是方向鍵就回傳 null
  function getNextTabByKey(event, currentIndex) {
    const isVertical = window.matchMedia("(min-width: 1024px)").matches;
    let previousKey = "ArrowLeft";
    let nextKey = "ArrowRight";

    // 桌機版分頁是直的，用上下鍵；手機版是橫的，用左右鍵
    if (isVertical) {
      previousKey = "ArrowUp";
      nextKey = "ArrowDown";
    }

    let direction = 0;
    if (event.key === nextKey) direction = 1;
    if (event.key === previousKey) direction = -1;
    if (direction === 0) return null;

    // 超過最後一個會回到第一個，反之亦然
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    return tabs[nextIndex];
  }

  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];
    const tabIndex = i; // 另存一份，避免事件觸發時用到迴圈結束後的 i

    tab.addEventListener("click", function () {
      selectTab(tab, true);
    });

    tab.addEventListener("keydown", function (event) {
      const nextTab = getNextTabByKey(event, tabIndex);
      if (!nextTab) return;

      event.preventDefault();
      selectTab(nextTab, true);
      nextTab.focus(); // 把焦點移到新分頁
    });
  }

  selectTab(getInitialTab(tabs), false);
}

// ---------------------------------------------------------------------------
// 輪播（Carousel）
// ---------------------------------------------------------------------------

function initCarousels() {
  const carousels = document.querySelectorAll("[data-affiliate-carousel]");

  for (let i = 0; i < carousels.length; i++) {
    initOneCarousel(carousels[i]);
  }
}

// 依照圖片張數，自動產生底下的進度按鈕，HTML 不用再手寫
function createCarouselDots(carousel, slideCount) {
  const progress = carousel.querySelector(".affiliate-profile-carousel-progress");
  const dots = [];

  if (!progress) return dots;

  progress.innerHTML = ""; // 清掉 HTML 裡原本手寫的按鈕

  for (let i = 0; i < slideCount; i++) {
    const number = i + 1;

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "affiliate-profile-carousel-progress-bar";
    dot.setAttribute("data-carousel-dot", String(i));
    dot.setAttribute("aria-label", "查看第 " + number + " 張圖片");
    dot.setAttribute("aria-current", "false");

    // 進度條的填色
    const fill = document.createElement("span");
    fill.className = "affiliate-profile-carousel-progress-fill";
    fill.setAttribute("aria-hidden", "true");

    // 給螢幕閱讀器的文字
    const srText = document.createElement("span");
    srText.className = "sr-only";
    srText.textContent = "第 " + number + " 張圖片";

    dot.appendChild(fill);
    dot.appendChild(srText);
    progress.appendChild(dot);
    dots.push(dot);
  }

  return dots;
}

function initOneCarousel(carousel) {
  const slides = toArray(carousel.querySelectorAll("[data-carousel-slide]"));
  const dots = createCarouselDots(carousel, slides.length);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // 每張圖片的「第 X 張，共 Y 張」由 JS 產生
  for (let i = 0; i < slides.length; i++) {
    slides[i].setAttribute("aria-label", "第 " + (i + 1) + " 張，共 " + slides.length + " 張");
  }

  // 只有一張圖就不需要輪播
  if (slides.length < 2) return;

  let activeIndex = 0;

  // 清除離場動畫的計時器與樣式（計時器直接存在 slide 元素上）
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

      // 離場動畫約 600ms，700ms 後保險清除
      if (isLeaving) {
        slide.leaveCleanupTimer = window.setTimeout(function () {
          clearLeavingSlide(slide);
        }, 700);
      }
    }

    for (let i = 0; i < dots.length; i++) {
      const isActive = i === activeIndex;
      dots[i].classList.toggle("is-active", isActive);
      dots[i].setAttribute("aria-current", String(isActive));
    }
  }

  // ---- 滑動手勢（手機左右滑） ----
  let pointerId = null;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let hasHorizontalIntent = false; // 使用者是不是在「橫向」滑

  function resetPointerGesture(event) {
    if (event && pointerId !== null && carousel.hasPointerCapture(pointerId)) {
      carousel.releasePointerCapture(pointerId);
    }
    pointerId = null;
    hasHorizontalIntent = false;
  }

  function onPointerDown(event) {
    if (!event.isPrimary) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target.closest("button")) return; // 點到進度按鈕不算滑動

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
    const movedX = Math.abs(deltaX);
    const movedY = Math.abs(deltaY);

    // 移動太少，先不判斷
    if (!hasHorizontalIntent && movedX < 8 && movedY < 8) return;

    // 如果是上下滑，就放棄這次手勢，讓頁面正常捲動
    if (!hasHorizontalIntent && movedY > movedX) {
      resetPointerGesture(event);
      return;
    }

    hasHorizontalIntent = true;
  }

  function onPointerUp(event) {
    if (event.pointerId !== pointerId) return;

    const deltaX = event.clientX - pointerStartX;
    const shouldChangeSlide = hasHorizontalIntent && Math.abs(deltaX) >= 48;
    resetPointerGesture(event);

    if (shouldChangeSlide) {
      // 往左滑 → 下一張，往右滑 → 上一張
      if (deltaX < 0) {
        showSlide(activeIndex + 1);
      } else {
        showSlide(activeIndex - 1);
      }
    }
  }

  carousel.addEventListener("pointerdown", onPointerDown);
  carousel.addEventListener("pointermove", onPointerMove);
  carousel.addEventListener("pointerup", onPointerUp);
  carousel.addEventListener("pointercancel", resetPointerGesture);

  // 圖片滑動動畫結束後，清掉離場狀態
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.addEventListener("transitionend", function (event) {
      if (event.propertyName === "transform") clearLeavingSlide(slide);
    });
  }

  // CSS 的進度條動畫跑完（5 秒）就自動換下一張
  carousel.addEventListener("animationend", function (event) {
    if (event.animationName !== "affiliate-carousel-progress") return;
    if (prefersReducedMotion.matches) return;
    if (!event.target.closest(".is-active")) return;
    showSlide(activeIndex + 1);
  });

  // 點進度按鈕直接跳到該張
  for (let i = 0; i < dots.length; i++) {
    const dotIndex = i; // 另存一份，避免點擊時用到錯誤的值
    dots[i].addEventListener("click", function () {
      showSlide(dotIndex);
    });
  }

  showSlide(0);
}

// ---------------------------------------------------------------------------
// 地點選擇器
// ---------------------------------------------------------------------------

// HTML 的 data-* 屬性名稱 ↔ CSS 變數名稱 對照表
const MARKER_SETTINGS = [
  { dataName: "markerTop", cssName: "--marker-top" },
  { dataName: "markerLeft", cssName: "--marker-left" },
  { dataName: "labelGap", cssName: "--label-gap" },
  { dataName: "labelLineWidth", cssName: "--label-line-width" },
  { dataName: "labelTop", cssName: "--label-top" },
  { dataName: "mobileLabelTop", cssName: "--mobile-label-top" }
];

// 把按鈕上的 data-* 設定轉成 CSS 變數，位置就不用在 CSS 裡一站一站寫
function applyMarkerPositions(markers) {
  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];

    for (let j = 0; j < MARKER_SETTINGS.length; j++) {
      const setting = MARKER_SETTINGS[j];
      const value = marker.dataset[setting.dataName];

      if (value) {
        marker.style.setProperty(setting.cssName, value);
      }
    }
  }
}

function initLocationPicker() {
  const cards = toArray(document.querySelectorAll(".affiliate-location-card[data-location-id]"));
  const markers = toArray(document.querySelectorAll(".affiliate-location-marker[data-location-id]"));

  if (cards.length === 0) return;

  applyMarkerPositions(markers);

  function selectLocation(locationId) {
    // 先確認有這個站點的卡片
    let hasCard = false;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].dataset.locationId === locationId) {
        hasCard = true;
        break;
      }
    }
    if (!hasCard) return;

    // 只顯示被選到的卡片
    for (let i = 0; i < cards.length; i++) {
      cards[i].hidden = cards[i].dataset.locationId !== locationId;
    }

    // 更新地圖上標記的選取狀態
    for (let i = 0; i < markers.length; i++) {
      const isSelected = markers[i].dataset.locationId === locationId;
      markers[i].classList.toggle("is-active", isSelected);
      markers[i].setAttribute("aria-pressed", String(isSelected));
    }
  }

  for (let i = 0; i < markers.length; i++) {
    const marker = markers[i];
    marker.addEventListener("click", function () {
      selectLocation(marker.dataset.locationId);
    });
  }

  // 預設顯示第一個站點
  selectLocation(cards[0].dataset.locationId);
}

document.addEventListener("DOMContentLoaded", initAffiliates);