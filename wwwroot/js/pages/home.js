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
  const slidesTrack = hero.querySelector(".home-hero__slides");
  const dotsContainer = hero.querySelector("[data-hero-dots]");

  if (slidesTrack && slides.length > 1) {
    const firstSlideClone = slides[0].cloneNode(true);
    firstSlideClone.classList.add("home-hero__slide--clone");
    firstSlideClone.classList.remove("is-active");
    firstSlideClone.classList.remove("is-initial");
    firstSlideClone.removeAttribute("data-hero-slide");
    firstSlideClone.removeAttribute("id");
    firstSlideClone.setAttribute("aria-hidden", "true");
    firstSlideClone.inert = true;
    const clonedHeading = firstSlideClone.querySelector("#home-hero-title");
    if (clonedHeading) clonedHeading.removeAttribute("id");
    const clonedContent = firstSlideClone.querySelector(".home-hero__content");
    if (clonedContent) clonedContent.setAttribute("aria-hidden", "true");
    slidesTrack.appendChild(firstSlideClone);
  }

  let activeIndex = 0;
  let autoplayId = null;
  let hasFocus = false;
  let isForwardLoop = false;

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
      slide.inert = !isActive;
      const slideContent = slide.querySelector(".home-hero__content");
      if (slideContent) slideContent.setAttribute("aria-hidden", String(!isActive));
    }

    hero.classList.toggle("is-forward-loop", isForwardLoop);
    for (let i = 0; i < slides.length; i++) {
      hero.classList.toggle("is-slide-" + i, !isForwardLoop && i === activeIndex);
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
    const nextIndex = (index + slides.length) % slides.length;
    isForwardLoop = !reducedMotion.matches && activeIndex === slides.length - 1 && nextIndex === 0;
    activeIndex = nextIndex;
    render();
    if (isForwardLoop && slidesTrack) {
      slidesTrack.addEventListener("transitionend", function resetLoop(event) {
        if (event.target !== slidesTrack || event.propertyName !== "transform") return;
        slidesTrack.classList.add("is-no-transition");
        isForwardLoop = false;
        render();
        requestAnimationFrame(function () {
          slidesTrack.classList.remove("is-no-transition");
        });
      }, { once: true });
    }
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
function createArrow(iconClass, shape) {
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const isTextArrow = shape === "text";
  const icon = document.createElementNS(SVG_NAMESPACE, "svg");
  icon.classList.add(iconClass);
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
    pathData = "M2.5 8h10.25M8.25 3.25 13 8l-4.75 4.75";
  } else if (shape === "chevron") {
    pathData = "M8 4l8 8-8 8";
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
  const featureLabel = document.querySelector(".home-latest__feature-label");
  const featureTitle = document.querySelector("[data-home-latest-feature-title]");
  const defaultFeatureImage = "public/images/index/news-feature.png";
  const homeNewsLimit = 6;
  const homeNewsProbeLimit = homeNewsLimit + 1;
  const moreLink = document.createElement("a");
  moreLink.className = "button--primary home-latest__more-link";
  moreLink.href = "/news";
  moreLink.hidden = true;
  const moreLinkArrow = document.createElement("span");
  moreLinkArrow.className = "button__arrow-window";
  moreLinkArrow.setAttribute("aria-hidden", "true");
  moreLinkArrow.append(
    createArrow("button__icon", "text"),
    createArrow("button__icon", "text")
  );
  moreLink.append(document.createTextNode("更多資訊"), moreLinkArrow);
  const latestInner = list.closest(".home-latest__inner");
  const latestHeading = latestInner ? latestInner.querySelector(".home-latest__heading") : null;
  if (latestHeading) latestHeading.append(moreLink);

  function buildNewsCard(item) {
    const link = document.createElement("a");
    link.className = "home-latest__item";
    link.href = "/news/" + encodeURIComponent(item.id);

    const date = document.createElement("time");
    date.className = "home-latest__date";
    date.dateTime = item.date || "";
    date.textContent = item.date || "";

    const label = document.createElement("span");
    label.className = "home-latest__label";
    label.textContent = item.tag || item.Tag || "最新消息";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const meta = document.createElement("span");
    meta.className = "home-latest__meta";
    meta.append(date, label);

    const titleRow = document.createElement("span");
    titleRow.className = "home-latest__title-row";
    titleRow.append(title);

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
    if (featureLabel) featureLabel.textContent = item.tag || item.Tag || "最新消息";
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
      moreLink.hidden = false;
      if (latestSection) latestSection.classList.remove("is-empty");

      list.replaceChildren();
      if (items.length === 0) throw new Error("No news");

      updateFeaturedNews(items[0]);
      for (let i = 0; i < listItems.length; i++) {
        list.append(buildNewsCard(listItems[i]));
      }
    } catch (error) {
      moreLink.hidden = true;
      if (latestSection) latestSection.classList.add("is-empty");
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

    heading.append(createArrow("home-services-compare__arrow-icon", "chevron"));
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
    const collapsedCardWidth = parseFloat(
      getComputedStyle(grid).getPropertyValue("--home-services-collapsed-width")
    ) || 112;
    const expandedCardWidth = gridWidth - (gap * (cards.length - 1)) - (collapsedCardWidth * (cards.length - 1));
    const media = cards[0].querySelector(".home-services-compare__media");
    if (!media || expandedCardWidth <= 0) return;

    grid.style.setProperty("--home-services-image-frame-width", expandedCardWidth + "px");
    grid.style.setProperty("--home-services-image-frame-height", media.getBoundingClientRect().height + "px");
  };

  updateImageFrame();
  const observer = new ResizeObserver(updateImageFrame);
  observer.observe(grid);
  window.addEventListener("resize", updateImageFrame, { passive: true });
}

function setupServicesCardPagination() {
  const grid = document.querySelector(".home-services-compare__grid");
  const pagination = document.querySelector("[data-services-pagination]");
  const cards = grid ? toArray(grid.querySelectorAll(".home-services-compare__card")) : [];
  const buttons = pagination ? toArray(pagination.querySelectorAll("[data-service-slide]")) : [];
  if (!grid || !pagination || cards.length === 0 || buttons.length !== cards.length) return;

  let scrollFrame = 0;
  const updateActiveSlide = function () {
    let activeIndex = 0;
    let closestDistance = Infinity;
    for (let i = 0; i < cards.length; i++) {
      const distance = Math.abs(cards[i].offsetLeft - grid.scrollLeft);
      if (distance >= closestDistance) continue;
      closestDistance = distance;
      activeIndex = i;
    }

    for (let i = 0; i < buttons.length; i++) {
      const isActive = i === activeIndex;
      buttons[i].classList.toggle("is-active", isActive);
      if (isActive) buttons[i].setAttribute("aria-current", "true");
      else buttons[i].removeAttribute("aria-current");
    }
  };
  const scheduleActiveSlideUpdate = function () {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(function () {
      scrollFrame = 0;
      updateActiveSlide();
    });
  };

  grid.addEventListener("scroll", scheduleActiveSlideUpdate, { passive: true });
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      const target = cards[i];
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      grid.scrollTo({ left: target.offsetLeft, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }
  updateActiveSlide();
}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  setupHeroCarousel();
  setupLatestNews();
  setupServicesCards();
  setupServicesCardImageFrame();
  setupServicesCardPagination();
  setupSectionMotion();
});
