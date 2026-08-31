// ---------------------------------------------------------------------------
// Hero 輪播:6 秒自動播放、點擊圓點、手機滑動、鍵盤焦點/分頁切換時暫停
// ---------------------------------------------------------------------------
/** 初始化首頁 Hero 輪播與觸控／鍵盤互動。 */
function setupHeroCarousel() {
  const hero = document.querySelector("[data-hero-carousel]");
  if (!hero) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const slides = hero.querySelectorAll("[data-hero-slide]");
  const dotsContainer = hero.querySelector("[data-hero-dots]");

  let activeIndex = 0;
  let autoplayId = null;
  let hasFocus = false;

  let startX = 0;
  let startY = 0;
  let pointerId = null;

  slides.forEach((slide, index) => {
    if (slide.classList.contains("is-active")) activeIndex = index;
  });

  function render() {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    if (!dotsContainer) return;

    dotsContainer.querySelectorAll(".home-hero__dot").forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
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
    autoplayId = setInterval(() => goTo(activeIndex + 1), 6000);
  }

  if (dotsContainer) {
    slides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "home-hero__dot";
      dot.setAttribute("aria-label", `顯示第 ${index + 1} 張主視覺`);
      dot.addEventListener("click", () => goTo(index));
      dotsContainer.appendChild(dot);
    });
  }

  // 手機滑動切換(僅處理 touch/pen,滑鼠不觸發)
  hero.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    if (event.target.closest("a, button")) return;

    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
  });

  hero.addEventListener("pointerup", (event) => {
    if (event.pointerId !== pointerId) return;

    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) >= 48;

    if (isHorizontalSwipe) goTo(distanceX < 0 ? activeIndex + 1 : activeIndex - 1);

    pointerId = null;
  });

  hero.addEventListener("focusin", () => {
    hasFocus = true;
    stopAutoplay();
  });

  hero.addEventListener("focusout", (event) => {
    if (hero.contains(event.relatedTarget)) return;
    hasFocus = false;
    startAutoplay();
  });

  document.addEventListener("visibilitychange", () => {
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
/** 初始化聯絡／招募 CTA 的面板 hover 與 focus 狀態。 */
function setupContactCta() {
  const cta = document.querySelector(".home-contact-cta");
  if (!cta) return;

  /**
   * 設定聯絡／招募 CTA 目前的 hover 或 focus 面板。
   * @param {"left"|"right"|null} state - 要啟用的面板
   */
  function setHoverState(state) {
    cta.classList.toggle("hover-left", state === "left");
    cta.classList.toggle("hover-right", state === "right");
  }

  cta.querySelectorAll(".home-contact-cta__panel").forEach((panel) => {
    const state = panel.classList.contains("home-contact-cta__panel--join") ? "right" : "left";

    panel.addEventListener("mouseenter", () => setHoverState(state));
    panel.addEventListener("mouseleave", () => {
      if (!panel.contains(document.activeElement)) setHoverState(null);
    });
    panel.addEventListener("focusin", () => setHoverState(state));
    panel.addEventListener("focusout", (event) => {
      if (!panel.contains(event.relatedTarget)) setHoverState(null);
    });
  });
}

// ---------------------------------------------------------------------------
// 服務卡片:手機點擊展開單一卡片；桌面維持整張卡片導頁
// ---------------------------------------------------------------------------
/** 初始化首頁服務卡片的手機 tap-to-reveal 互動。 */
function setupServiceCards() {
  const grid = document.querySelector(".home-service-grid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".home-service-grid__card"));
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  function isMobile() {
    return mobileQuery.matches;
  }

  function collapseAll() {
    cards.forEach((card) => {
      card.classList.remove("is-expanded");
      card.setAttribute("aria-expanded", "false");
    });
  }

  function setMode() {
    const mobile = isMobile();
    grid.classList.toggle("is-tap-mode", mobile);

    if (!mobile) collapseAll();

    cards.forEach((card) => {
      card.tabIndex = 0;
      card.setAttribute("role", mobile ? "button" : "link");
      if (mobile) card.setAttribute("aria-expanded", String(card.classList.contains("is-expanded")));
      else card.removeAttribute("aria-expanded");
    });

  }

  function toggleCard(card) {
    const shouldExpand = !card.classList.contains("is-expanded");
    cards.forEach((item) => {
      const isExpanded = item === card && shouldExpand;
      item.classList.toggle("is-expanded", isExpanded);
      item.setAttribute("aria-expanded", String(isExpanded));
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;

      if (isMobile()) {
        event.preventDefault();
        toggleCard(card);
        return;
      }

      const href = card.dataset.serviceHref;
      if (href) window.location.assign(href);
    });

    card.addEventListener("keydown", (event) => {
      if (event.target.closest("a")) return;
      if (isMobile()) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleCard(card);
        return;
      }

      if (event.key !== "Enter") return;
      event.preventDefault();
      if (card.dataset.serviceHref) window.location.assign(card.dataset.serviceHref);
    });
  });

  setMode();
  mobileQuery.addEventListener("change", setMode);
}

// ---------------------------------------------------------------------------
// 最新消息:載入資料、渲染卡片、分頁控制、滑鼠拖曳捲動
// ---------------------------------------------------------------------------
/** 載入首頁最新消息並初始化卡片輪播控制。 */
function setupLatestNews() {
  const list = document.querySelector("[data-home-latest-list]");
  if (!list) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  /**
   * 建立最新消息輪播使用的方向箭頭。
   * @param {"left"|"right"} direction - 箭頭方向
   * @returns {SVGSVGElement} 箭頭 SVG 元素
   */
  const createArrow = (direction) => {
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
    path.setAttribute(
      "d",
      direction === "left" ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7",
    );
    icon.append(path);
    return icon;
  };

  const homeNewsLimit = 8;
  const viewport = list.closest(".home-latest__viewport");
  const pager = list.closest(".home-latest")?.querySelector(".home-latest__pager");
  if (!viewport || !pager) return;

  const loadingMessage = list.querySelector(".home-latest__empty");
  if (loadingMessage) loadingMessage.textContent = "最新消息載入中。";

  // 滑鼠拖曳捲動
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let hasDragged = false;
  let suppressClick = false;

  /**
   * 結束首頁最新消息的滑鼠拖曳狀態。
   * @param {PointerEvent} event - 指標事件
   */
  function finishPointerDrag(event) {
    if (event.pointerId !== activePointerId) return;
    viewport.classList.remove("is-dragging");
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (hasDragged) suppressClick = true;
    activePointerId = null;
  }

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    activePointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartScrollLeft = viewport.scrollLeft;
    hasDragged = false;
    suppressClick = false;
  });

  viewport.addEventListener("pointermove", (event) => {
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

  viewport.addEventListener("click", (event) => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  viewport.addEventListener("dragstart", (event) => event.preventDefault());

  /**
   * 將消息建立時間轉為可排序的時間戳。
   * @param {string|undefined} value - API 回傳的建立時間
   * @returns {number} 時間戳；無效值回傳負無限大
   */
  function parseCreatedAt(value) {
    const timestamp = Date.parse(value || "");
    return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
  }

  /**
   * 由新到舊比較兩筆最新消息。
   * @param {Object} left - 第一筆消息
   * @param {Object} right - 第二筆消息
   * @returns {number} 排序比較結果
   */
  function compareLatestNews(left, right) {
    const createdAtDiff = parseCreatedAt(right.createdAt) - parseCreatedAt(left.createdAt);
    if (createdAtDiff !== 0) return createdAtDiff;

    const dateDiff = String(right.date || "").localeCompare(String(left.date || ""));
    return dateDiff || String(right.id || "").localeCompare(String(left.id || ""));
  }

  // 假設 API 回傳為 camelCase JSON(ASP.NET Core System.Text.Json 預設)。
  // 若後端實際回傳 PascalCase,請直接調整這裡的欄位對應,而不是兩種都猜。
  fetch(`/api/public/news?limit=${homeNewsLimit}`, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Unable to load news");
      return response.json();
    })
    .then((items) => items.slice().sort(compareLatestNews).slice(0, homeNewsLimit))
    .then((items) => {
      list.replaceChildren();
      if (!items.length) throw new Error("No news");

      items.forEach((item) => {
        const link = document.createElement("a");
        link.className = "home-latest__item";
        link.href = `/news/${encodeURIComponent(item.id)}`;

        const media = document.createElement("span");
        media.className = "home-latest__media";
        if (item.imageUrl) {
          const image = document.createElement("img");
          image.src = item.imageUrl;
          image.alt = "";
          image.loading = "lazy";
          image.decoding = "async";
          image.addEventListener("error", () => image.remove(), { once: true });
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
        list.append(link);
      });

      viewport.scrollLeft = 0;
      renderControls(items);
    })
    .catch(() => {
      // 伺服器端已渲染最新消息時保留原內容,不顯示錯誤訊息
      if (list.querySelector(".home-latest__item")) return;

      list.replaceChildren();
      const message = document.createElement("p");
      message.className = "home-latest__empty";
      message.textContent = "目前沒有可顯示的最新消息。";
      list.append(message);
      pager.replaceChildren();
    });

  /**
   * 建立最新消息輪播的分頁與左右箭頭控制。
   * @param {Object[]} items - 目前顯示的消息
   */
  function renderControls(items) {
    function cardsPerPage() {
      if (window.matchMedia("(max-width: 760px)").matches) return 1;
      if (window.matchMedia("(max-width: 980px)").matches) return 2;
      return 4;
    }

    const pageSize = cardsPerPage();
    const isMobile = pageSize === 1;

    function getPagePositions() {
      const cards = Array.from(list.querySelectorAll(".home-latest__item"));
      if (!cards.length) return [];

      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const scrollLeft = Math.min(maxScroll, Math.max(0, viewport.scrollLeft));
      const viewportLeft = viewport.getBoundingClientRect().left;
      const scrollPaddingStart = parseFloat(getComputedStyle(viewport).scrollPaddingInlineStart) || 0;
      const positions = [];

      for (let index = 0; index < cards.length; index += pageSize) {
        const card = cards[index];
        const position = Math.min(
          maxScroll,
          Math.max(0, card.getBoundingClientRect().left - viewportLeft + scrollLeft - scrollPaddingStart),
        );
        if (positions.every((existing) => Math.abs(existing - position) > 1)) {
          positions.push(position);
        }
      }

      const lastPosition = positions[positions.length - 1];
      if (positions.length && maxScroll - lastPosition > 1) {
        positions.push(maxScroll);
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

    const pageButtons = Array.from({ length: pages }, (_, index) => {
      if (isMobile) return null;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "home-latest__page";
      button.setAttribute("aria-label", `顯示第 ${index + 1} 組最新消息`);
      return button;
    }).filter(Boolean);

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
    if (counter) controls.append(counter);
    else controls.append(...pageButtons);
    controls.append(next);
    pager.replaceChildren(controls);
    pager.removeAttribute("aria-hidden");

    function update() {
      const page = getPage();
      pageButtons.forEach((button, index) => {
        const isActive = index === page;
        button.classList.toggle("is-active", isActive);
        if (isActive) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
      if (counter) {
        counter.textContent = `${String(page + 1).padStart(2, "0")} / ${String(pages).padStart(2, "0")}`;
        counter.setAttribute("aria-label", `第 ${page + 1} 組，共 ${pages} 組最新消息`);
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
      if (!pagePositions.length || pages === 1) return 0;

      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      if (maxScroll <= 1) return 0;

      const scrollLeft = Math.min(maxScroll, Math.max(0, viewport.scrollLeft));

      return pagePositions.reduce((nearestPage, position, page) => {
        const nearestDistance = Math.abs(pagePositions[nearestPage] - scrollLeft);
        const distance = Math.abs(position - scrollLeft);
        return distance < nearestDistance ? page : nearestPage;
      }, 0);
    }

    /**
     * 捲動到指定的最新消息分頁。
     * @param {number} page - 目標分頁索引
     */
    function goTo(page) {
      const pagePositions = getPagePositions();
      const targetPage = Math.min(pagePositions.length - 1, Math.max(0, page));
      if (targetPage < 0) return;

      viewport.scrollTo({
        left: pagePositions[targetPage],
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }

    previous.addEventListener("click", () => goTo(Math.max(0, getPage() - 1)));
    next.addEventListener("click", () => goTo(Math.min(pages - 1, getPage() + 1)));
    pageButtons.forEach((button, index) => button.addEventListener("click", () => goTo(index)));

    let updateFrame = 0;
    function scheduleUpdate() {
      if (updateFrame) return;
      updateFrame = window.requestAnimationFrame(() => {
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
/** 初始化首頁各區塊的 IntersectionObserver 進場動畫。 */
function setupSectionMotion() {
  const revealTargets = Array.from(document.querySelectorAll("[data-home-reveal]"));
  if (!revealTargets.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("home-motion-ready");

  function revealAll() {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

  revealTargets.forEach((target) => observer.observe(target));

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    revealAll();
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeroCarousel();
  setupContactCta();
  setupServiceCards();
  setupLatestNews();
  setupSectionMotion();
});
