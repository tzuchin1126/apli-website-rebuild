// ---------------------------------------------------------------------------
// 共用小工具
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
// Hero 輪播:6 秒自動播放、點擊圓點、手機滑動、鍵盤焦點/分頁切換時暫停
// ---------------------------------------------------------------------------

function setupHeroCarousel() {
  const hero = document.querySelector("[data-hero-carousel]");
  if (!hero) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const slides = toArray(hero.querySelectorAll("[data-hero-slide]"));
  const dotsContainer = hero.querySelector("[data-hero-dots]");

  let activeIndex = 0;
  let autoplayId = null;
  let hasFocus = false;

  let startX = 0;
  let startY = 0;
  let pointerId = null;

  // 找出一開始就有 is-active 的投影片，記住它的索引
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("is-active")) activeIndex = i;
  }

  function render() {
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const isActive = i === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    }

    if (!dotsContainer) return;

    const dots = toArray(dotsContainer.querySelectorAll(".home-hero__dot"));
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const isActive = i === activeIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    }
  }

  function goTo(index) {
    activeIndex = (index + slides.length) % slides.length;
    render();
    startAutoplay();
  }

  function stopAutoplay() {
    if (autoplayId === null) return;
    clearInterval(autoplayId);
    autoplayId = null;
  }

  function startAutoplay() {
    stopAutoplay();
    if (slides.length < 2 || reducedMotion.matches || document.hidden || hasFocus) return;
    autoplayId = setInterval(function () {
      goTo(activeIndex + 1);
    }, 6000);
  }

  if (dotsContainer) {
    for (let index = 0; index < slides.length; index++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "home-hero__dot";
      dot.setAttribute("aria-label", "顯示第 " + (index + 1) + " 張主視覺");
      dot.addEventListener("click", function () {
        goTo(index);
      });
      dotsContainer.appendChild(dot);
    }
  }

  // 手機滑動切換(僅處理 touch/pen,滑鼠不觸發)
  hero.addEventListener("pointerdown", function (event) {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    if (event.target.closest("a, button")) return;

    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
  });

  hero.addEventListener("pointerup", function (event) {
    if (event.pointerId !== pointerId) return;

    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) >= 48;

    if (isHorizontalSwipe) goTo(distanceX < 0 ? activeIndex + 1 : activeIndex - 1);

    pointerId = null;
  });

  hero.addEventListener("focusin", function () {
    hasFocus = true;
    stopAutoplay();
  });

  hero.addEventListener("focusout", function (event) {
    if (hero.contains(event.relatedTarget)) return;
    hasFocus = false;
    startAutoplay();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  reducedMotion.addEventListener("change", startAutoplay);

  render();
  startAutoplay();
}

// ---------------------------------------------------------------------------
// 聯絡/招募 CTA:滑鼠或鍵盤焦點進入左右面板時放大對應側
// ---------------------------------------------------------------------------

function setupContactCta() {
  const cta = document.querySelector(".home-contact-cta");
  if (!cta) return;

  // 設定聯絡／招募 CTA 目前的 hover 或 focus 面板（state 為 "left"、"right" 或 null）
  function setHoverState(state) {
    cta.classList.toggle("hover-left", state === "left");
    cta.classList.toggle("hover-right", state === "right");
  }

  const panels = toArray(cta.querySelectorAll(".home-contact-cta__panel"));
  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    const state = panel.classList.contains("home-contact-cta__panel--join") ? "right" : "left";

    panel.addEventListener("mouseenter", function () {
      setHoverState(state);
    });
    panel.addEventListener("mouseleave", function () {
      if (!panel.contains(document.activeElement)) setHoverState(null);
    });
    panel.addEventListener("focusin", function () {
      setHoverState(state);
    });
    panel.addEventListener("focusout", function (event) {
      if (!panel.contains(event.relatedTarget)) setHoverState(null);
    });
  }
}
// ---------------------------------------------------------------------------
// 最新消息:載入資料並支援卡片列拖曳
// ---------------------------------------------------------------------------

// 建立輪播方向 SVG 圖示；關係企業使用 chevron，最新消息使用帶箭身的箭頭。
function createArrow(direction, iconClass, shape) {
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const icon = document.createElementNS(SVG_NAMESPACE, "svg");
  icon.classList.add(iconClass || "home-latest__arrow-icon");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("width", "18");
  icon.setAttribute("height", "18");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "1.8");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.setAttribute("aria-hidden", "true");

  const path = document.createElementNS(SVG_NAMESPACE, "path");
  let pathData;
  if (shape === "chevron") {
    pathData = direction === "left" ? "M15 18 9 12l6-6" : "m9 18 6-6-6-6";
  } else {
    pathData = direction === "left" ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7";
  }
  path.setAttribute("d", pathData);
  icon.append(path);
  return icon;
}

// 把消息建立時間轉為可排序的時間戳；沒有值或格式不對就當作最舊的
function parseCreatedAt(value) {
  const timestamp = Date.parse(value || "");
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
}

// 由新到舊比較兩筆最新消息
function compareLatestNews(left, right) {
  const createdAtDiff = parseCreatedAt(right.createdAt) - parseCreatedAt(left.createdAt);
  if (createdAtDiff !== 0) return createdAtDiff;

  const dateDiff = String(right.date || "").localeCompare(String(left.date || ""));
  if (dateDiff !== 0) return dateDiff;

  return String(right.id || "").localeCompare(String(left.id || ""));
}

function setupLatestNews() {
  const list = document.querySelector("[data-home-latest-list]");
  if (!list) return;
  const homeNewsLimit = 8;

  function buildNewsCard(item) {
    const link = document.createElement("a");
    link.className = "home-latest__item";
    link.href = "/news/" + encodeURIComponent(item.id);

    const meta = document.createElement("span");
    meta.className = "home-latest__meta";
    const category = document.createElement("span");
    category.className = "home-latest__category";
    category.textContent = item.tag || "最新消息";
    const time = document.createElement("time");
    time.className = "home-latest__date";
    time.dateTime = item.date || "";
    time.textContent = item.date;
    meta.append(time, category);

    const title = document.createElement("strong");
    title.textContent = item.title;

    const more = document.createElement("span");
    more.className = "home-latest__more";
    more.setAttribute("aria-hidden", "true");
    more.append(createArrow("right"));

    const body = document.createElement("span");
    body.className = "home-latest__body";
    body.append(meta, title, more);
    link.append(body);
    return link;
  }

  async function loadNews() {
    try {
      const response = await fetch("/api/public/news?limit=" + homeNewsLimit, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load news");

      const rawItems = await response.json();
      const items = rawItems.slice().sort(compareLatestNews).slice(0, homeNewsLimit);

      list.replaceChildren();
      if (items.length === 0) throw new Error("No news");

      for (let i = 0; i < items.length; i++) {
        list.append(buildNewsCard(items[i]));
      }
    } catch (error) {
      showEmptyMessage();
    }
  }

  loadNews();
}

// ---------------------------------------------------------------------------
// 區塊進場動畫:進入視窗時加上 .is-visible,reduced-motion 則直接全部顯示
// ---------------------------------------------------------------------------

function setupAffiliatesCarousel() {
  const section = document.querySelector(".home-affiliates");
  if (!section) return;

  const viewport = section.querySelector(".home-affiliates__viewport");
  const track = section.querySelector("[data-affiliates-track]");
  const previousButton = section.querySelector("[data-affiliates-previous]");
  const nextButton = section.querySelector("[data-affiliates-next]");
  const cards = toArray(section.querySelectorAll(".home-affiliates__card"));
  if (!viewport || !track || cards.length === 0) return;

  let activeStart = 0;
  let carouselTimer = null;
  let isPaused = false;
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartOffset = 0;
  let dragDistance = 0;
  let hasDragged = false;
  let suppressClick = false;
  const originalCount = cards.length;
  const cloneCount = originalCount;

  for (let index = originalCount - 1; index >= originalCount - cloneCount; index--) {
    const clone = cards[index].cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("tabindex", "-1");
    track.insertBefore(clone, track.firstChild);
  }

  for (let index = 0; index < cloneCount; index++) {
    const clone = cards[index].cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("tabindex", "-1");
    track.appendChild(clone);
  }

  if (previousButton) previousButton.append(createArrow("left", "home-affiliates__arrow-icon", "chevron"));
  if (nextButton) nextButton.append(createArrow("right", "home-affiliates__arrow-icon", "chevron"));
  section.classList.add("is-carousel-ready");

  function getVisibleCount() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 4;
  }

  function getCardStep() {
    const cardStyle = window.getComputedStyle(track);
    const gap = parseFloat(cardStyle.columnGap || cardStyle.gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  }

  function render() {
    const trackOffset = cloneCount + activeStart;
    track.style.transform = "translate3d(" + (-trackOffset * getCardStep()) + "px, 0, 0)";
  }

  track.addEventListener("transitionend", function (event) {
    if (event.target !== track || event.propertyName !== "transform") return;
    if (activeStart < 0 || activeStart >= originalCount) {
      activeStart = (activeStart + originalCount) % originalCount;
    } else {
      return;
    }

    track.style.transition = "none";
    render();
    window.requestAnimationFrame(function () { track.style.removeProperty("transition"); });
  });

  function finishDrag(event) {
    if (event.pointerId !== activePointerId) return;
    viewport.classList.remove("is-dragging");
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);

    if (hasDragged && event.type === "pointerup") {
      const step = getCardStep();
      const threshold = Math.max(32, step * 0.16);
      if (Math.abs(dragDistance) >= threshold) {
        const steps = Math.max(1, Math.round(Math.abs(dragDistance) / step));
        const nextStart = dragDistance < 0 ? activeStart + steps : activeStart - steps;
        activeStart = Math.max(-originalCount, Math.min(originalCount, nextStart));
        render();
      } else {
        render();
      }
      suppressClick = true;
    } else if (hasDragged) {
      render();
    }

    activePointerId = null;
    hasDragged = false;
    isPaused = false;
  }

  viewport.addEventListener("pointerdown", function (event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (!event.isPrimary) return;
    activePointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragStartOffset = -(cloneCount + activeStart) * getCardStep();
    dragDistance = 0;
    hasDragged = false;
    suppressClick = false;
  });

  viewport.addEventListener("pointermove", function (event) {
    if (event.pointerId !== activePointerId) return;
    const distanceX = event.clientX - dragStartX;
    const distanceY = event.clientY - dragStartY;
    if (!hasDragged && Math.max(Math.abs(distanceX), Math.abs(distanceY)) < 5) return;
    if (!hasDragged && Math.abs(distanceY) > Math.abs(distanceX)) {
      activePointerId = null;
      return;
    }

    hasDragged = true;
    isPaused = true;
    dragDistance = distanceX;
    viewport.classList.add("is-dragging");
    if (!viewport.hasPointerCapture(event.pointerId)) viewport.setPointerCapture(event.pointerId);
    event.preventDefault();
    track.style.transform = "translate3d(" + (dragStartOffset + distanceX) + "px, 0, 0)";
  }, { passive: false });

  viewport.addEventListener("pointerup", finishDrag);
  viewport.addEventListener("pointercancel", finishDrag);
  viewport.addEventListener("click", function (event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  viewport.addEventListener("dragstart", function (event) { event.preventDefault(); });

  function moveByCard(direction) {
    activeStart = Math.max(-1, Math.min(originalCount, activeStart + direction));
    render();
  }

  function moveToNextGroup() {
    if (isPaused) return;
    moveByCard(1);
  }

  function startAutoPlay() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(carouselTimer);
    carouselTimer = window.setInterval(moveToNextGroup, 4000);
  }

  section.addEventListener("focusin", function () { isPaused = true; });
  section.addEventListener("focusout", function (event) {
    if (!section.contains(event.relatedTarget)) isPaused = false;
  });

  if (previousButton) {
    previousButton.addEventListener("click", function () {
      moveByCard(-1);
      startAutoPlay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      moveByCard(1);
      startAutoPlay();
    });
  }

  window.addEventListener("resize", render, { passive: true });
  track.addEventListener("focusin", function (event) {
    const focusedCard = event.target.closest(".home-affiliates__card");
    const index = cards.indexOf(focusedCard);
    if (index < 0) return;
    if (index < activeStart || index >= activeStart + getVisibleCount()) {
    activeStart = Math.min(index, originalCount);
    }
    viewport.scrollLeft = 0;
    render();
  });
  function restoreCarouselTransition() {
    track.style.removeProperty("transition");
  }

  // Place the carousel at its initial card position without animating from the clone track.
  track.style.transition = "none";
  render();
  track.getBoundingClientRect();
  window.requestAnimationFrame(restoreCarouselTransition);
  startAutoPlay();
}

function setupSectionMotion() {
  const revealTargets = toArray(document.querySelectorAll("[data-home-reveal]"));
  if (revealTargets.length === 0) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("home-motion-ready");

  function revealAll() {
    for (let i = 0; i < revealTargets.length; i++) {
      revealTargets[i].classList.add("is-visible");
    }
  }

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  const observer = new IntersectionObserver(function (entries, currentObserver) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

  for (let i = 0; i < revealTargets.length; i++) {
    observer.observe(revealTargets[i]);
  }

  reducedMotion.addEventListener("change", function () {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    revealAll();
  }, { once: true });
}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  setupHeroCarousel();
  setupContactCta();
  setupLatestNews();
  setupAffiliatesCarousel();
  setupSectionMotion();
});
