// ==========================================
// 首頁互動：Hero 輪播、聯絡 CTA、最新消息、區塊進場動畫
// ==========================================

/** 偏好減少動畫媒體查詢 */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/**
 * 建立方向箭頭 icon
 * @param {"left"|"right"} direction
 * @returns {HTMLElement}
 */
function createArrow(direction) {
  const icon = document.createElement("i");
  icon.className = `ph ph-caret-${direction}`;
  icon.setAttribute("aria-hidden", "true");
  // Phosphor caret icons: left=E138, right=E13A
  icon.textContent = direction === "left" ? "\uE138" : "\uE13A";
  return icon;
}

/**
 * 1. Hero 輪播
 * - 自動播放（8 秒），滑鼠/焦點/可見性暫停
 * - 點擊圓點切換、觸控滑動切換
 * - 無障礙：aria-hidden、aria-current、鍵盤可操作
 */
function setupHeroCarousel() {
  const hero = document.querySelector("[data-hero-carousel]");
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
  const dotsContainer = hero.querySelector("[data-hero-dots]");

  let activeIndex = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  let autoplayId = null;
  let hasFocus = false;

  // 觸控滑動變數
  let swipePointerId = null;
  let swipeStartX = 0;
  let swipeStartY = 0;
  let swipeActive = false;

  /** 停止自動播放 */
  function stopAutoplay() {
    if (autoplayId !== null) window.clearInterval(autoplayId);
    autoplayId = null;
  }

  /** 渲染目前狀態：slide 與 dot 的 active 樣式 */
  function render() {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    Array.from(dotsContainer?.children || []).forEach((dot, index) => {
      if (!dot.classList.contains("home-hero__dot")) return;
      const isActive = index === activeIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  /** 啟動自動播放（條件不符時不啟動） */
  function startAutoplay() {
    stopAutoplay();
    if (slides.length < 2) return;
    if (reducedMotion.matches) return;
    if (document.visibilityState === "hidden") return;
    if (hasFocus) return;

    autoplayId = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      render();
    }, 6000);
  }

  /** 切換到指定索引 */
  function goTo(index) {
    activeIndex = (index + slides.length) % slides.length;
    render();
    startAutoplay(); // 重置計時器
  }

  // 建立圓點按鈕
  if (dotsContainer) {
    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "home-hero__dot";
      dot.setAttribute("aria-label", `顯示第 ${index + 1} 張主視覺`);
      dot.addEventListener("click", () => goTo(index));
      return dot;
    });
    dotsContainer.replaceChildren(...dots);
  }

  // ===== 觸控/滑鼠滑動切換 =====
  function finishSwipe(event) {
    if (event.pointerId !== swipePointerId) return;
    const distanceX = event.clientX - swipeStartX;
    if (swipeActive && Math.abs(distanceX) >= 48) {
      goTo(activeIndex + (distanceX < 0 ? 1 : -1));
    }
    if (hero.hasPointerCapture(event.pointerId)) hero.releasePointerCapture(event.pointerId);
    swipePointerId = null;
    swipeActive = false;
  }

  hero.addEventListener("pointerdown", (event) => {
    // 僅觸控/筆、且非點擊連結/按鈕
    if ((event.pointerType !== "touch" && event.pointerType !== "pen") || event.target.closest("a, button")) return;
    swipePointerId = event.pointerId;
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
    swipeActive = false;
  });

  hero.addEventListener("pointermove", (event) => {
    if (event.pointerId !== swipePointerId) return;
    const distanceX = event.clientX - swipeStartX;
    const distanceY = event.clientY - swipeStartY;

    // 垂直滑動為主 → 取消滑動判定
    if (!swipeActive && Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > 8) {
      swipePointerId = null;
      return;
    }
    // 微小移動忽略
    if (Math.abs(distanceX) < 8) return;

    swipeActive = true;
    hero.setPointerCapture(event.pointerId);
    event.preventDefault();
  }, { passive: false });

  hero.addEventListener("pointerup", finishSwipe);
  hero.addEventListener("pointercancel", finishSwipe);

  // ===== 焦點/可見性控制自動播放 =====
  hero.addEventListener("focusin", () => { hasFocus = true; stopAutoplay(); });
  hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) {
      hasFocus = false;
      startAutoplay();
    }
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stopAutoplay() : startAutoplay());
  reducedMotion.addEventListener("change", startAutoplay);

  // 初始化
  render();
  startAutoplay();
}

/**
 * 2. 聯絡/招募 CTA 懸浮狀態
 * - 滑鼠進入左/右面板 → 對應側面板放大
 * - 焦點同步、離開恢復
 */
function setupContactCta() {
  const cta = document.querySelector(".home-contact-cta");
  if (!cta) return;

  function setHoverState(state) {
    cta.classList.toggle("hover-left", state === "left");
    cta.classList.toggle("hover-right", state === "right");
  }

  cta.querySelectorAll(".home-contact-cta__panel").forEach((panel) => {
    // 判斷面板屬左側或右側
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

/**
 * 3. 最新消息：資料載入、渲染、輪播控制、滑鼠拖曳捲動
 */
function setupLatestNews() {
  const list = document.querySelector("[data-home-latest-list]");
  if (!list) return;

  const viewport = list.closest(".home-latest__viewport");
  const pager = list.closest(".home-latest")?.querySelector(".home-latest__pager");
  if (!viewport || !pager) return;

  const loadingMessage = list.querySelector(".home-latest__empty");
  if (loadingMessage) loadingMessage.textContent = "最新消息載入中。";

  // ---- 滑鼠拖曳捲動 ----
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let hasDragged = false;
  let suppressClick = false;

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

  // 拖曳後抑制 click
  viewport.addEventListener("click", (event) => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  viewport.addEventListener("dragstart", (event) => event.preventDefault());

  // ---- 解析時間 ----
  function parseCreatedAt(value) {
    const timestamp = Date.parse(value || "");
    return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
  }

  // ---- 排序：createdAt 降冪 → date → id ----
  function compareLatestNews(left, right) {
    const createdAtDiff = parseCreatedAt(right.createdAt) - parseCreatedAt(left.createdAt);
    if (createdAtDiff !== 0) return createdAtDiff;
    const dateDiff = String(right.date || "").localeCompare(String(left.date || ""));
    return dateDiff || String(right.id || "").localeCompare(String(left.id || ""));
  }

  // ---- 載入並渲染 ----
  fetch("/api/public/news")
    .then((response) => {
      if (!response.ok) throw new Error("Unable to load news");
      return response.json();
    })
    .then((source) => source
      .map((item) => ({
        id: item.id ?? item.Id,
        date: item.date ?? item.Date,
        tag: item.tag ?? item.Tag,
        title: item.title ?? item.Title,
        content: item.content ?? item.Content ?? "",
        imageUrl: item.imageUrl ?? item.ImageUrl ?? "",
        createdAt: item.createdAt ?? item.CreatedAt ?? "",
        published: item.published ?? item.Published,
      }))
      .sort(compareLatestNews)
    )
    .then((items) => {
      list.replaceChildren();
      if (!items.length) throw new Error("No news");

      // 渲染每則消息卡片
      items.forEach((item) => {
        const link = document.createElement("a");
        link.className = "home-latest__item";
        link.href = `/news/${encodeURIComponent(item.id)}`;

        // 圖片區
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

        // 內容區
        const body = document.createElement("span");
        body.className = "home-latest__body";
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
        summary.textContent = item.content.replace(/\s+/g, " ").trim();

        body.append(meta, title, summary);
        link.append(media, body);
        list.append(link);
      });

      // 渲染輪播控制器
      renderControls(items);
    })
    .catch(() => {
      // 伺服器端已渲染最新消息時保留原內容，不顯示錯誤訊息。
      if (list.querySelector(".home-latest__item")) return;

      list.replaceChildren();
      const message = document.createElement("p");
      message.className = "home-latest__empty";
      message.textContent = "目前沒有可顯示的最新消息。";
      list.append(message);
      pager.replaceChildren();
    });

  // ---- 輪播控制器 ----
  function renderControls(items) {
    // 根據視窗寬度決定每頁顯示幾張卡片
    function cardsPerPage() {
      if (window.matchMedia("(max-width: 760px)").matches) return 1;
      if (window.matchMedia("(max-width: 980px)").matches) return 2;
      return 4;
    }

    const pageSize = cardsPerPage();
    const pages = Math.max(1, Math.ceil(items.length / pageSize));

    // 建立控制器 DOM
    const controls = document.createElement("div");
    controls.className = "home-latest__controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "最新消息輪播控制");

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "home-latest__arrow home-latest__arrow--previous";
    previous.setAttribute("aria-label", "上一組最新消息");
    previous.append(createArrow("left"));

    const pageButtons = Array.from({ length: pages }, (_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "home-latest__page";
      button.setAttribute("aria-label", `顯示第 ${index + 1} 組最新消息`);
      return button;
    });

    const next = document.createElement("button");
    next.type = "button";
    next.className = "home-latest__arrow home-latest__arrow--next";
    next.setAttribute("aria-label", "下一組最新消息");
    next.append(createArrow("right"));

    controls.append(previous, ...pageButtons, next);
    pager.replaceChildren(controls);
    pager.removeAttribute("aria-hidden");

    // 取得目前頁碼
    function getPage() {
      const first = list.querySelector(".home-latest__item");
      if (!first) return 0;
      const cardWidth = first.getBoundingClientRect().width;
      const gap = Number.parseFloat(getComputedStyle(list).gap) || 0;
      return Math.min(pages - 1, Math.round(viewport.scrollLeft / ((cardWidth + gap) * pageSize)));
    }

    // 更新按鈕狀態
    function update() {
      const page = getPage();
      pageButtons.forEach((button, index) => {
        const isActive = index === page;
        button.classList.toggle("is-active", isActive);
        if (isActive) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
      previous.disabled = page === 0;
      next.disabled = page === pages - 1;
    }

    // 滾動到指定頁
    function goTo(page) {
      const first = list.querySelector(".home-latest__item");
      if (!first) return;
      const gap = Number.parseFloat(getComputedStyle(list).gap) || 0;
      viewport.scrollTo({
        left: page * (first.getBoundingClientRect().width + gap) * pageSize,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }

    // 綁定控制器事件
    previous.addEventListener("click", () => goTo(Math.max(0, getPage() - 1)));
    next.addEventListener("click", () => goTo(Math.min(pages - 1, getPage() + 1)));
    pageButtons.forEach((button, index) => button.addEventListener("click", () => goTo(index)));

    // 捲動同步更新
    viewport.addEventListener("scroll", update, { passive: true });

    // 視窗大小改變 → 重新計算每頁數量
    function onResize() {
      if (cardsPerPage() !== pageSize) {
        window.removeEventListener("resize", onResize);
        renderControls(items); // 重新建立控制器
        return;
      }
      update();
    }
    window.addEventListener("resize", onResize, { passive: true });

    update();
  }
}

/**
 * 4. 區塊進場動畫
 * - IntersectionObserver 監測進入視窗 → 加上 .is-visible 觸發 CSS 動畫
 * - prefers-reduced-motion 時直接全部顯示
 */
function setupSectionMotion() {
  const revealTargets = Array.from(document.querySelectorAll("[data-home-reveal]"));
  if (!revealTargets.length) return;

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
      currentObserver.unobserve(entry.target); // 只觸發一次
    });
  }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

  revealTargets.forEach((target) => observer.observe(target));

  // 偏好變更時重新評估
  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    revealAll();
  }, { once: true });
}

// ==========================================
// 啟動所有功能
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupHeroCarousel();
  setupContactCta();
  setupLatestNews();
  setupSectionMotion();
});
