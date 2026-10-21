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
// 最新消息:載入資料並支援卡片列拖曳
// ---------------------------------------------------------------------------

// 建立輪播方向 SVG 圖示；了解更多按鈕使用同款 16px 箭頭，其餘控制項使用 chevron。
function createArrow(direction, iconClass, shape) {
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const isTextArrow = shape === "text";
  const icon = document.createElementNS(SVG_NAMESPACE, "svg");
  icon.classList.add(iconClass || "home-latest__arrow-icon");
  icon.setAttribute("viewBox", isTextArrow ? "0 0 16 16" : "0 0 24 24");
  icon.setAttribute("width", isTextArrow ? "16" : "18");
  icon.setAttribute("height", isTextArrow ? "16" : "18");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", isTextArrow ? "1.4" : "1.8");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.setAttribute("aria-hidden", "true");

  const path = document.createElementNS(SVG_NAMESPACE, "path");
  let pathData;
  if (isTextArrow) {
    pathData = direction === "left"
      ? "M13.5 8H3.25M7.75 3.25 3 8l4.75 4.75"
      : "M2.5 8h10.25M8.25 3.25 13 8l-4.75 4.75";
  } else if (shape === "chevron") {
    pathData = direction === "left" ? "M16 4 8 12l8 8" : "M8 4l8 8-8 8";
  } else {
    pathData = direction === "left" ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7";
  }
  path.setAttribute("d", pathData);
  icon.append(path);
  return icon;
}

function createEmptyNewsIcon() {
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const icon = document.createElementNS(SVG_NAMESPACE, "svg");
  icon.classList.add("home-latest__empty-icon");
  icon.setAttribute("viewBox", "0 0 32 32");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "1.6");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.innerHTML = "<path d=\"M7 5.5h16a2 2 0 0 1 2 2v17H9a2 2 0 0 1-2-2v-17Z\"/><path d=\"M7 8.5h14M11 13h10M11 17h8M11 21h6\"/><path d=\"M25 24.5H9\"/>";
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
  const latestSection = list.closest(".home-latest");
  const feature = document.querySelector("[data-home-latest-feature]");
  const featureImage = document.querySelector("[data-home-latest-feature-image]");
  const featureDate = document.querySelector("[data-home-latest-feature-date]");
  const featureTitle = document.querySelector("[data-home-latest-feature-title]");
  const defaultFeatureImage = "public/images/index/news1.png";
  const homeNewsLimit = 4;
  const homeNewsProbeLimit = homeNewsLimit + 1;
  const moreLink = document.createElement("a");
  moreLink.className = "button--primary home-latest__more-link";
  moreLink.href = "/news";
  moreLink.hidden = true;
  const moreLinkArrow = document.createElement("span");
  moreLinkArrow.className = "button__arrow-window";
  moreLinkArrow.setAttribute("aria-hidden", "true");
  moreLinkArrow.append(
    createArrow("right", "button__icon", "text"),
    createArrow("right", "button__icon", "text"),
  );
  moreLink.append(document.createTextNode("更多資訊"), moreLinkArrow);
  const latestInner = list.closest(".home-latest__inner");
  const latestHeading = latestInner ? latestInner.querySelector(".home-latest__heading") : null;
  if (latestHeading) latestHeading.append(moreLink);

  function setupLatestCarousel() {
    const carousel = document.querySelector("[data-home-latest-carousel]");
    const viewport = carousel ? carousel.querySelector(".home-latest__viewport") : null;
    const previousButton = carousel ? carousel.querySelector("[data-home-latest-previous]") : null;
    const nextButton = carousel ? carousel.querySelector("[data-home-latest-next]") : null;
    if (!carousel || !viewport || !previousButton || !nextButton) return;

    const cards = toArray(list.querySelectorAll(".home-latest__item"));
    if (cards.length === 0) return;
    let activeStart = 0;

    previousButton.append(createArrow("left", "home-latest__arrow-icon", "chevron"));
    nextButton.append(createArrow("right", "home-latest__arrow-icon", "chevron"));
    carousel.classList.add("is-carousel-ready");

    function getVisibleCount() {
      if (window.innerWidth <= 520) return 1;
      if (window.innerWidth <= 1100) return 2;
      return 4;
    }

    function getMaxStart() {
      return Math.max(0, cards.length - getVisibleCount());
    }

    function getCardStep() {
      const listStyle = window.getComputedStyle(list);
      const gap = parseFloat(listStyle.columnGap || listStyle.gap) || 0;
      return cards[0].getBoundingClientRect().width + gap;
    }

    function render() {
      activeStart = Math.max(0, Math.min(getMaxStart(), activeStart));
      list.style.transform = "translate3d(" + (-activeStart * getCardStep()) + "px, 0, 0)";
      previousButton.disabled = activeStart === 0;
      nextButton.disabled = activeStart === getMaxStart();
    }

    function moveBy(direction) {
      activeStart += direction;
      render();
    }

    previousButton.addEventListener("click", function () { moveBy(-1); });
    nextButton.addEventListener("click", function () { moveBy(1); });

    let activePointerId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragDistance = 0;
    let hasDragged = false;
    let suppressClick = false;

    function finishLatestDrag(event) {
      if (event.pointerId !== activePointerId) return;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);

      if (hasDragged && event.type === "pointerup") {
        const step = getCardStep();
        const threshold = Math.max(32, step * .16);
        if (Math.abs(dragDistance) >= threshold) {
          const steps = Math.max(1, Math.round(Math.abs(dragDistance) / step));
          const nextStart = dragDistance < 0 ? activeStart + steps : activeStart - steps;
          activeStart = Math.max(0, Math.min(getMaxStart(), nextStart));
        }
        render();
        suppressClick = true;
      } else if (hasDragged) {
        render();
      }

      activePointerId = null;
      hasDragged = false;
    }

    viewport.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (!event.isPrimary) return;
      activePointerId = event.pointerId;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
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
      dragDistance = distanceX;
      viewport.classList.add("is-dragging");
      if (!viewport.hasPointerCapture(event.pointerId)) viewport.setPointerCapture(event.pointerId);
      event.preventDefault();
      const startOffset = -activeStart * getCardStep();
      list.style.transform = "translate3d(" + (startOffset + distanceX) + "px, 0, 0)";
    }, { passive: false });

    viewport.addEventListener("pointerup", finishLatestDrag);
    viewport.addEventListener("pointercancel", finishLatestDrag);
    viewport.addEventListener("click", function (event) {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    }, true);
    viewport.addEventListener("dragstart", function (event) { event.preventDefault(); });

    window.addEventListener("resize", render, { passive: true });
    render();
  }

  function buildNewsCard(item) {
    const link = document.createElement("a");
    link.className = "home-latest__item";
    link.href = "/news/" + encodeURIComponent(item.id);

    const date = document.createElement("time");
    date.className = "home-latest__date";
    date.dateTime = item.date || "";
    date.textContent = item.date || "";

    const category = document.createElement("span");
    category.className = "home-latest__category";
    category.textContent = item.tag || "最新消息";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const more = document.createElement("span");
    more.className = "home-latest__more";
    more.setAttribute("aria-hidden", "true");
    more.append(createArrow("right", "home-latest__arrow-icon", "chevron"));

    const meta = document.createElement("span");
    meta.className = "home-latest__meta";
    meta.append(date, category);

    const titleRow = document.createElement("span");
    titleRow.className = "home-latest__title-row";
    titleRow.append(title, more);

    const body = document.createElement("span");
    body.className = "home-latest__body";
    body.append(meta, titleRow);

    link.append(body);
    return link;
  }

  function updateFeaturedNews(item) {
    if (!feature || !featureImage || !featureDate || !featureTitle || !item) return;
    const imageUrl = item.imageUrl || item.ImageUrl || defaultFeatureImage;
    feature.href = "/news/" + encodeURIComponent(item.id);
    feature.setAttribute("aria-label", item.title || "查看最新消息");
    featureImage.src = imageUrl;
    featureImage.alt = item.title || "最新消息主視覺";
    featureDate.textContent = item.date || "";
    featureTitle.textContent = item.title || "查看最新公告";
    featureImage.onerror = function () {
      if (featureImage.src.endsWith(defaultFeatureImage)) return;
      featureImage.src = defaultFeatureImage;
    };
  }

  async function loadNews() {
    try {
      const response = await fetch("/api/public/news?limit=" + homeNewsProbeLimit, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load news");

      const rawItems = await response.json();
      const sortedItems = rawItems.slice().sort(compareLatestNews);
      const items = sortedItems.slice(0, homeNewsLimit);
      const listItems = items.slice(1);
      moreLink.hidden = sortedItems.length <= homeNewsLimit;
      latestSection?.classList.remove("is-empty");

      list.replaceChildren();
      if (items.length === 0) throw new Error("No news");

      updateFeaturedNews(items[0]);
      for (let i = 0; i < listItems.length; i++) {
        list.append(buildNewsCard(listItems[i]));
      }
      setupLatestCarousel();
    } catch (error) {
      moreLink.hidden = true;
      latestSection?.classList.add("is-empty");
      list.replaceChildren();
      const empty = document.createElement("p");
      empty.className = "home-latest__empty";
      const emptyText = document.createElement("span");
      emptyText.textContent = "目前沒有可顯示的最新消息。";
      empty.append(createEmptyNewsIcon(), emptyText);
      list.append(empty);
    }
  }

  loadNews();
}

// ---------------------------------------------------------------------------
// 區塊進場動畫:進入視窗時加上 .is-visible,reduced-motion 則直接全部顯示
// ---------------------------------------------------------------------------

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

function setupServicesCards() {
  const cards = toArray(document.querySelectorAll(".home-services-compare__card"));
  for (let i = 0; i < cards.length; i++) {
    const content = cards[i].querySelector(".home-services-compare__content");
    const heading = content ? content.querySelector("h3") : null;
    if (!heading || heading.querySelector(".home-services-compare__arrow-icon")) continue;

    heading.append(createArrow("right", "home-services-compare__arrow-icon", "chevron"));
  }
}

function setupServicesCardImageFrame() {
  const grid = document.querySelector(".home-services-compare__grid");
  const cards = toArray(document.querySelectorAll(".home-services-compare__card"));
  if (!grid || cards.length === 0 || !("ResizeObserver" in window)) return;

  const updateImageFrame = function () {
    if (window.matchMedia("(max-width: 767px)").matches) {
      grid.style.removeProperty("--home-services-image-frame-width");
      grid.style.removeProperty("--home-services-image-frame-height");
      return;
    }

    const gridWidth = grid.getBoundingClientRect().width;
    const gridStyle = getComputedStyle(grid);
    const gap = parseFloat(gridStyle.columnGap || gridStyle.gap) || 0;
    const collapsedCardWidth = 100;
    const expandedCardWidth = gridWidth - (gap * (cards.length - 1)) - (collapsedCardWidth * (cards.length - 1));
    const media = cards[0].querySelector(".home-services-compare__media");
    if (!media || expandedCardWidth <= 0) return;

    grid.style.setProperty("--home-services-image-frame-width", `${expandedCardWidth}px`);
    grid.style.setProperty("--home-services-image-frame-height", `${media.getBoundingClientRect().height}px`);
  };

  updateImageFrame();
  const observer = new ResizeObserver(updateImageFrame);
  observer.observe(grid);
  window.addEventListener("resize", updateImageFrame, { passive: true });
}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  setupHeroCarousel();
  setupLatestNews();
  setupServicesCards();
  setupServicesCardImageFrame();
  setupSectionMotion();
});
