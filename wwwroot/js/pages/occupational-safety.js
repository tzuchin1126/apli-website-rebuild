// ---------------------------------------------------------------------------
// 職業安全衛生頁面：專業證照輪播
// ---------------------------------------------------------------------------

/**
 * 初始化專業證照輪播
 * - 滑鼠拖曳捲動
 * - 分頁控制器（上一頁/下一頁/頁碼按鈕）
 * - 響應式每頁顯示數量（手機1、平板2、桌機3）
 * - 視窗縮放時重新計算
 */
function setupCredentialsCarousel() {
  const list = document.querySelector("[data-safety-credentials-list]");
  if (!list) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  /**
   * 建立專業證照輪播使用的方向箭頭。
   * @param {"left"|"right"} direction - 箭頭方向
   * @returns {HTMLElement} 箭頭 icon 元素
   */
  const createArrow = (direction) => {
    const icon = document.createElement("i");
    icon.className = `ph ph-caret-${direction}`;
    icon.setAttribute("aria-hidden", "true");
    // Phosphor caret icons: left=E138, right=E13A
    icon.textContent = direction === "left" ? "\uE138" : "\uE13A";
    return icon;
  };

  const viewport = list.closest(".safety-credentials__viewport");
  const pager = list.closest(".safety-credentials")?.querySelector(".safety-credentials__pager");
  if (!viewport || !pager) return;

  const cards = Array.from(list.querySelectorAll(".safety-credential-card"));

  // ---------------------------------------------------------------------------
  // 滑鼠拖曳捲動
  // ---------------------------------------------------------------------------
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
    // 僅左鍵滑鼠
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    activePointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartScrollLeft = viewport.scrollLeft;
    hasDragged = false;
    suppressClick = false;
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointerId) return;
    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) < 4) return;
    hasDragged = true;
    event.preventDefault();
    viewport.scrollLeft = dragStartScrollLeft - distance;
  }, { passive: false });

  viewport.addEventListener("pointerup", finishPointerDrag);
  viewport.addEventListener("pointercancel", finishPointerDrag);

  // 拖曳後抑制 click（防止點擊卡片內連結誤觸發）
  viewport.addEventListener("click", (event) => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  viewport.addEventListener("dragstart", (event) => event.preventDefault());

  // ---------------------------------------------------------------------------
  // 響應式每頁卡片數
  // ---------------------------------------------------------------------------
  function cardsPerPage() {
    if (window.matchMedia("(max-width: 760px)").matches) return 1;
    if (window.matchMedia("(max-width: 1099px)").matches) return 2;
    return 3;
  }

  // ---------------------------------------------------------------------------
  // 建立分頁控制器
  // ---------------------------------------------------------------------------
  const pageSize = cardsPerPage();
  const pages = Math.max(1, Math.ceil(cards.length / pageSize));

  const controls = document.createElement("div");
  controls.className = "safety-credentials__controls";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", "專業證照卡片輪播控制");

  const previous = document.createElement("button");
  previous.type = "button";
  previous.className = "safety-credentials__arrow safety-credentials__arrow--previous";
  previous.setAttribute("aria-label", "上一組專業證照");
  previous.append(createArrow("left"));

  const pageButtons = Array.from({ length: pages }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "safety-credentials__page";
    button.setAttribute("aria-label", `顯示第 ${index + 1} 組專業證照`);
    return button;
  });

  const next = document.createElement("button");
  next.type = "button";
  next.className = "safety-credentials__arrow safety-credentials__arrow--next";
  next.setAttribute("aria-label", "下一組專業證照");
  next.append(createArrow("right"));

  controls.append(previous, ...pageButtons, next);
  pager.replaceChildren(controls);
  pager.removeAttribute("aria-hidden");

  // ---------------------------------------------------------------------------
  // 頁碼計算與同步
  // ---------------------------------------------------------------------------
  function getPage() {
    const first = cards[0];
    if (!first) return 0;
    const cardWidth = first.getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(list).gap) || 0;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;

    // 已捲動到底 → 最後一頁
    if (maxScroll > 0 && viewport.scrollLeft >= maxScroll - 1) return pages - 1;

    return Math.min(pages - 1, Math.round(viewport.scrollLeft / ((cardWidth + gap) * pageSize)));
  }

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

  function goTo(page) {
    const first = cards[0];
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

  // ---------------------------------------------------------------------------
  // 視窗縮放：每頁數量改變時重建控制器
  // ---------------------------------------------------------------------------
  function onResize() {
    if (cardsPerPage() !== pageSize) {
      window.removeEventListener("resize", onResize);
      viewport.scrollTo({ left: 0, behavior: "auto" });
      setupCredentialsCarousel(); // 遞迴重建
      return;
    }
    update();
  }
  window.addEventListener("resize", onResize, { passive: true });

  // 初始化
  update();
}

/**
 * 初始化職業安全衛生頁面
 */
function initOccupationalSafety() {
  setupCredentialsCarousel();
}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initOccupationalSafety);
