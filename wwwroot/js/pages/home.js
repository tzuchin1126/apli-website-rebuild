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

  const latestSection = list.closest(".home-latest");
  const pager = latestSection ? latestSection.querySelector(".home-latest__pager") : null;
  if (!viewport || !pager) return;

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

  // 用一則消息資料建立一張卡片（一個 <a> 連結）
  function buildNewsCard(item) {
    const link = document.createElement("a");
    link.className = "home-latest__item";
    link.href = "/news/" + encodeURIComponent(item.id);

    const media = document.createElement("span");
    media.className = "home-latest__media";
    if (item.imageUrl) {
      const image = document.createElement("img");
      image.src = item.imageUrl;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("error", function () {
        image.remove();
      }, { once: true });
      media.append(image);
    }

    const action = document.createElement("span");
    action.className = "button--text-arrow home-latest__action";
    action.setAttribute("aria-hidden", "true");
    const actionIcon = document.createElement("i");
    actionIcon.className = "ph ph-arrow-bend-up-right";
    action.append(actionIcon);
    media.append(action);

    const meta = document.createElement("span");
    meta.className = "home-latest__meta";
    const time = document.createElement("time");
    time.textContent = item.date;
    const tag = document.createElement("span");
    tag.textContent = item.tag;
    meta.append(time, tag);

    const title = document.createElement("strong");
    title.textContent = item.title;

    const summary = document.createElement("span");
    summary.className = "home-latest__summary";
    summary.textContent = (item.content || "").replace(/\s+/g, " ").trim();

    const body = document.createElement("span");
    body.className = "home-latest__body";
    body.append(meta, title, summary);

    link.append(media, body);
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
    pager.replaceChildren();
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

      viewport.scrollLeft = 0;
      renderControls(items);
    } catch (error) {
      showEmptyMessage();
    }
  }

  loadNews();

  // 建立最新消息輪播的分頁與左右箭頭控制
  function renderControls(items) {
    function cardsPerPage() {
      if (window.matchMedia("(max-width: 760px)").matches) return 1;
      if (window.matchMedia("(max-width: 980px)").matches) return 2;
      return 4;
    }

    const pageSize = cardsPerPage();
    const isMobile = pageSize === 1;

    // 檢查某個位置是不是已經在 positions 陣列裡了（誤差在 1px 內都算重複）
    function containsPosition(positions, position) {
      for (let i = 0; i < positions.length; i++) {
        if (Math.abs(positions[i] - position) <= 1) return true;
      }
      return false;
    }

    function getPagePositions() {
      const cards = toArray(list.querySelectorAll(".home-latest__item"));
      if (cards.length === 0) return [];

      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const scrollLeft = Math.min(maxScroll, Math.max(0, viewport.scrollLeft));
      const viewportLeft = viewport.getBoundingClientRect().left;
      const scrollPaddingStart = parseFloat(getComputedStyle(viewport).scrollPaddingInlineStart) || 0;
      const positions = [];

      for (let index = 0; index < cards.length; index += pageSize) {
        const card = cards[index];
        const rawPosition = card.getBoundingClientRect().left - viewportLeft + scrollLeft - scrollPaddingStart;
        const position = Math.min(maxScroll, Math.max(0, rawPosition));
        if (!containsPosition(positions, position)) {
          positions.push(position);
        }
      }

      if (positions.length > 0) {
        const lastPosition = positions[positions.length - 1];
        if (maxScroll - lastPosition > 1) {
          positions.push(maxScroll);
        }
      }

      return positions;
    }

    const pages = Math.max(1, getPagePositions().length);

    const controls = document.createElement("div");
    controls.className = "home-latest__controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "最新消息輪播控制");

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "home-latest__arrow home-latest__arrow--previous";
    previous.setAttribute("aria-label", "上一則最新消息");
    previous.append(createArrow("left"));

    // 桌面用一排小圓點分頁按鈕；手機改用「01 / 04」這種文字計數器
    const pageButtons = [];
    if (!isMobile) {
      for (let index = 0; index < pages; index++) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "home-latest__page";
        button.setAttribute("aria-label", "顯示第 " + (index + 1) + " 組最新消息");
        pageButtons.push(button);
      }
    }

    const counter = isMobile ? document.createElement("span") : null;
    if (counter) {
      counter.className = "home-latest__counter";
      counter.setAttribute("aria-live", "polite");
      counter.setAttribute("aria-atomic", "true");
    }

    const next = document.createElement("button");
    next.type = "button";
    next.className = "home-latest__arrow home-latest__arrow--next";
    next.setAttribute("aria-label", "下一則最新消息");
    next.append(createArrow("right"));

    controls.append(previous);
    if (counter) {
      controls.append(counter);
    } else {
      for (let i = 0; i < pageButtons.length; i++) {
        controls.append(pageButtons[i]);
      }
    }
    controls.append(next);
    pager.replaceChildren(controls);
    pager.removeAttribute("aria-hidden");

    function padNumber(value) {
      return String(value).padStart(2, "0");
    }

    function update() {
      const page = getPage();

      for (let i = 0; i < pageButtons.length; i++) {
        const button = pageButtons[i];
        const isActive = i === page;
        button.classList.toggle("is-active", isActive);
        if (isActive) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      }

      if (counter) {
        counter.textContent = padNumber(page + 1) + " / " + padNumber(pages);
        counter.setAttribute("aria-label", "第 " + (page + 1) + " 組，共 " + pages + " 組最新消息");
      }

      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const scrollLeft = Math.min(maxScroll, Math.max(0, viewport.scrollLeft));
      const isAtStart = scrollLeft <= 1;
      const isAtEnd = maxScroll <= 1 || maxScroll - scrollLeft <= 1;

      previous.disabled = isAtStart;
      previous.setAttribute("aria-disabled", String(isAtStart));
      next.disabled = isAtEnd;
      next.setAttribute("aria-disabled", String(isAtEnd));
    }

    function getPage() {
      const pagePositions = getPagePositions();
      if (pagePositions.length === 0 || pages === 1) return 0;

      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      if (maxScroll <= 1) return 0;

      const scrollLeft = Math.min(maxScroll, Math.max(0, viewport.scrollLeft));

      // 找出離目前捲動位置最近的那一頁
      let nearestPage = 0;
      let nearestDistance = Math.abs(pagePositions[0] - scrollLeft);
      for (let page = 1; page < pagePositions.length; page++) {
        const distance = Math.abs(pagePositions[page] - scrollLeft);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestPage = page;
        }
      }
      return nearestPage;
    }

    // 捲動到指定的最新消息分頁
    function goTo(page) {
      const pagePositions = getPagePositions();
      const targetPage = Math.min(pagePositions.length - 1, Math.max(0, page));
      if (targetPage < 0) return;

      viewport.scrollTo({
        left: pagePositions[targetPage],
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }

    previous.addEventListener("click", function () {
      goTo(Math.max(0, getPage() - 1));
    });
    next.addEventListener("click", function () {
      goTo(Math.min(pages - 1, getPage() + 1));
    });
    for (let i = 0; i < pageButtons.length; i++) {
      const pageIndex = i; // 記住當下的 i，避免點擊時用到錯誤的值
      pageButtons[i].addEventListener("click", function () {
        goTo(pageIndex);
      });
    }

    let updateFrame = 0;
    function scheduleUpdate() {
      if (updateFrame) return;
      updateFrame = window.requestAnimationFrame(function () {
        updateFrame = 0;
        update();
      });
    }

    viewport.addEventListener("scroll", scheduleUpdate, { passive: true });

    function onResize() {
      if (cardsPerPage() !== pageSize) {
        cleanup();
        renderControls(items);
        return;
      }
      scheduleUpdate();
    }
    window.addEventListener("resize", onResize, { passive: true });

    update();

    function cleanup() {
      viewport.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", onResize);
      if (updateFrame) {
        window.cancelAnimationFrame(updateFrame);
        updateFrame = 0;
      }
    }
  }
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

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  setupHeroCarousel();
  setupContactCta();
  setupLatestNews();
  setupSectionMotion();
});
