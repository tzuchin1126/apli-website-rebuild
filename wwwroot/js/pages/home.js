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
// 最新消息:載入資料、渲染卡片、分頁控制、滑鼠拖曳捲動
// ---------------------------------------------------------------------------

// 建立最新消息輪播使用的方向箭頭 SVG（direction 為 "left" 或 "right"）
function createArrow(direction) {
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const icon = document.createElementNS(SVG_NAMESPACE, "svg");
  icon.classList.add("home-latest__arrow-icon");
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
  const pathData = direction === "left" ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7";
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
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const homeNewsLimit = 8;
  const viewport = list.closest(".home-latest__viewport");

  if (!viewport) return;

  // 每張卡片直接管理滑鼠進出狀態，讓右下箭頭在各瀏覽器穩定顯示。
  function setupCardHoverStates() {
    const cards = toArray(list.querySelectorAll(".home-latest__item"));

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      card.addEventListener("mouseenter", function () {
        card.classList.add("is-pointer-hovered");
      });
      card.addEventListener("mouseleave", function () {
        card.classList.remove("is-pointer-hovered");
      });
    }
  }

  setupCardHoverStates();

  const loadingMessage = list.querySelector(".home-latest__empty");
  if (loadingMessage) loadingMessage.textContent = "最新消息載入中。";

  // 滑鼠拖曳捲動
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let hasDragged = false;
  let suppressClick = false;

  // 結束首頁最新消息的滑鼠拖曳狀態
  function finishPointerDrag(event) {
    if (event.pointerId !== activePointerId) return;
    viewport.classList.remove("is-dragging");
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (hasDragged) suppressClick = true;
    activePointerId = null;

    const cards = toArray(list.querySelectorAll(".home-latest__item"));
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove("is-pointer-hovered");
    }
  }

  viewport.addEventListener("pointerdown", function (event) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    activePointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartScrollLeft = viewport.scrollLeft;
    hasDragged = false;
    suppressClick = false;
  });

  viewport.addEventListener("pointermove", function (event) {
    if (event.pointerId !== activePointerId) return;

    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) < 4) return;

    hasDragged = true;
    viewport.classList.add("is-dragging");
    if (!viewport.hasPointerCapture(event.pointerId)) viewport.setPointerCapture(event.pointerId);
    event.preventDefault();
    viewport.scrollLeft = dragStartScrollLeft - distance;
  }, { passive: false });

  viewport.addEventListener("pointerup", finishPointerDrag);
  viewport.addEventListener("pointercancel", finishPointerDrag);

  viewport.addEventListener("click", function (event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  viewport.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });

  function formatNewsCardDate(value) {
    return value || "";
  }

  function summarizeNewsCardContent(value) {
    const content = (value || "").replace(/\s+/g, " ").trim();
    const maximumLength = 68;

    if (content.length <= maximumLength) return content;

    return content.slice(0, maximumLength).trimEnd() + "…";
  }

  // 用一則消息資料建立一張卡片（一個 <a> 連結）
  function buildNewsCard(item) {
    const link = document.createElement("a");
    link.className = "home-latest__item";
    link.href = "/news/" + encodeURIComponent(item.id);

    const meta = document.createElement("span");
    meta.className = "home-latest__meta";
    const tag = document.createElement("span");
    tag.textContent = item.tag || "最新消息";

    const time = document.createElement("time");
    time.className = "home-latest__date";
    time.dateTime = item.date || "";
    time.textContent = formatNewsCardDate(item.date);
    meta.append(tag, time);

    const title = document.createElement("strong");
    title.textContent = item.title || "最新消息";

    const summary = document.createElement("span");
    summary.className = "home-latest__summary";
    summary.textContent = summarizeNewsCardContent(item.content);

    const more = document.createElement("span");
    more.className = "home-latest__more";
    more.append(createArrow("right"));

    const body = document.createElement("span");
    body.className = "home-latest__body";
    body.append(meta, title, summary, more);

    link.append(body);
    return link;
  }

  function showEmptyMessage() {
    // 伺服器端已渲染最新消息時保留原內容,不顯示錯誤訊息
    if (list.querySelector(".home-latest__item")) return;

    list.replaceChildren();
    const message = document.createElement("p");
    message.className = "home-latest__empty";
    message.textContent = "目前沒有可顯示的最新消息。";
    list.append(message);
  }

  // 假設 API 回傳為 camelCase JSON(ASP.NET Core System.Text.Json 預設)。
  // 若後端實際回傳 PascalCase,請直接調整這裡的欄位對應,而不是兩種都猜。
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

      setupCardHoverStates();
      viewport.scrollLeft = 0;
    } catch (error) {
      showEmptyMessage();
    }
  }

  loadNews();

  // 建立最新消息輪播的分頁與左右箭頭控制

}

// ---------------------------------------------------------------------------
// 區塊進場動畫:進入視窗時加上 .is-visible,reduced-motion 則直接全部顯示
// ---------------------------------------------------------------------------

function setupAffiliatesCarousel() {
  const section = document.querySelector(".home-affiliates");
  if (!section) return;

  const viewport = section.querySelector(".home-affiliates__viewport");
  const track = section.querySelector("[data-affiliates-track]");
  const cards = toArray(section.querySelectorAll(".home-affiliates__card"));
  const previous = section.querySelector("[data-affiliates-previous]");
  const next = section.querySelector("[data-affiliates-next]");
  if (!viewport || !track || cards.length === 0 || !previous || !next) return;

  previous.replaceChildren(createArrow("left"));
  next.replaceChildren(createArrow("right"));

  let activeStart = 0;
  let carouselTimer = null;
  let isPaused = false;
  const originalCount = cards.length;

  for (let index = 0; index < getVisibleCount(); index++) {
    const clone = cards[index].cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("tabindex", "-1");
    track.appendChild(clone);
  }
  section.classList.add("is-carousel-ready");

  function getVisibleCount() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 980) return 2;
    return 4;
  }

  function getMaxStart() {
    return originalCount;
  }

  function render() {
    const firstCard = cards[0];
    const cardStyle = window.getComputedStyle(track);
    const gap = parseFloat(cardStyle.columnGap || cardStyle.gap) || 0;
    const cardStep = firstCard.getBoundingClientRect().width + gap;
    const maxStart = getMaxStart();

    activeStart = Math.min(activeStart, maxStart);
    track.style.transform = "translate3d(" + (-activeStart * cardStep) + "px, 0, 0)";
    previous.disabled = activeStart === 0;
    next.disabled = false;
    previous.setAttribute("aria-disabled", String(previous.disabled));
    next.setAttribute("aria-disabled", String(next.disabled));
  }

  previous.addEventListener("click", function () {
    activeStart = Math.max(0, activeStart - getVisibleCount());
    render();
  });

  next.addEventListener("click", function () {
    const maxStart = getMaxStart();
    if (activeStart >= maxStart) {
      track.style.transition = "none";
      activeStart = 0;
      render();
      window.requestAnimationFrame(function () { track.style.removeProperty("transition"); });
      return;
    }
    activeStart += 1;
    render();
  });

  function moveToNextGroup() {
    if (isPaused) return;
    const maxStart = getMaxStart();
    if (activeStart >= maxStart) {
      track.style.transition = "none";
      activeStart = 0;
      render();
      window.requestAnimationFrame(function () { track.style.removeProperty("transition"); });
      return;
    }
    activeStart += 1;
    render();
  }

  function startAutoPlay() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(carouselTimer);
    carouselTimer = window.setInterval(moveToNextGroup, 5000);
  }

  section.addEventListener("mouseenter", function () { isPaused = true; });
  section.addEventListener("mouseleave", function () { isPaused = false; });
  section.addEventListener("focusin", function () { isPaused = true; });
  section.addEventListener("focusout", function (event) {
    if (!section.contains(event.relatedTarget)) isPaused = false;
  });

  window.addEventListener("resize", render, { passive: true });
  track.addEventListener("focusin", function (event) {
    const focusedCard = event.target.closest(".home-affiliates__card");
    const index = cards.indexOf(focusedCard);
    if (index < 0) return;
    if (index < activeStart || index >= activeStart + getVisibleCount()) {
      activeStart = Math.min(index, getMaxStart());
    }
    viewport.scrollLeft = 0;
    render();
  });
  render();
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
