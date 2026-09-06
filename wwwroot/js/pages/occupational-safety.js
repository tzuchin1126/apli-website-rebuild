// ---------------------------------------------------------------------------
// 職業安全衛生頁面：專業證照輪播
// - 滑鼠拖曳捲動
// - 分頁控制器（上一頁/下一頁/頁碼按鈕）
// - 響應式每頁顯示數量（手機1、平板2、桌機3）
// - 視窗縮放時重新計算
// ---------------------------------------------------------------------------

// 建立專業證照輪播使用的方向箭頭（direction 為 "left" 或 "right"）
function createArrow(direction) {
  const icon = document.createElement("i");
  icon.className = "ph ph-caret-" + direction;
  icon.setAttribute("aria-hidden", "true");
  // Phosphor caret icons: left=E138, right=E13A
  icon.textContent = direction === "left" ? "\uE138" : "\uE13A";
  return icon;
}

function setupCredentialsCarousel() {
  const list = document.querySelector("[data-safety-credentials-list]");
  if (!list) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const viewport = list.closest(".safety-credentials__viewport");
  const safetySection = list.closest(".safety-credentials");
  const pager = safetySection ? safetySection.querySelector(".safety-credentials__pager") : null;
  if (!viewport || !pager) return;

  const cards = [];
  const cardNodes = list.querySelectorAll(".safety-credential-card");
  for (let i = 0; i < cardNodes.length; i++) {
    cards.push(cardNodes[i]);
  }

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

  viewport.addEventListener("pointerdown", function (event) {
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

  viewport.addEventListener("pointermove", function (event) {
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
  viewport.addEventListener("click", function (event) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  viewport.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });

  // ---------------------------------------------------------------------------
  // 每次切換推進一張卡片，讓前一張卡片自然被推出左側
  // ---------------------------------------------------------------------------
  function cardsPerPage() {
    return 1;
  }

  // ---------------------------------------------------------------------------
  // 建立分頁控制器
  // ---------------------------------------------------------------------------
  const pageSize = cardsPerPage();
  function containsPosition(positions, position) {
    for (let i = 0; i < positions.length; i++) {
      if (Math.abs(positions[i] - position) <= 1) return true;
    }
    return false;
  }

  function getPagePositions() {
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const scrollLeft = Math.min(maxScroll, Math.max(0, viewport.scrollLeft));
    const viewportLeft = viewport.getBoundingClientRect().left;
    const scrollPaddingStart = parseFloat(getComputedStyle(viewport).scrollPaddingInlineStart) || 0;
    const positions = [];

    for (let index = 0; index < cards.length; index += pageSize) {
      const card = cards[index];
      const rawPosition = card.getBoundingClientRect().left - viewportLeft + scrollLeft - scrollPaddingStart;
      const position = Math.min(maxScroll, Math.max(0, rawPosition));
      if (!containsPosition(positions, position)) positions.push(position);
    }

    if (positions.length > 0) {
      const lastPosition = positions[positions.length - 1];
      if (maxScroll - lastPosition > 1) positions.push(maxScroll);
    }

    return positions;
  }

  const pages = Math.max(1, getPagePositions().length);

  const controls = document.createElement("div");
  controls.className = "safety-credentials__controls";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", "專業證照卡片輪播控制");

  const previous = document.createElement("button");
  previous.type = "button";
  previous.className = "safety-credentials__arrow safety-credentials__arrow--previous";
  previous.setAttribute("aria-label", "上一組專業證照");
  previous.append(createArrow("left"));

  const pageButtons = [];
  for (let index = 0; index < pages; index++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "safety-credentials__page";
    button.setAttribute("aria-label", "顯示第 " + (index + 1) + " 組專業證照");
    pageButtons.push(button);
  }

  const next = document.createElement("button");
  next.type = "button";
  next.className = "safety-credentials__arrow safety-credentials__arrow--next";
  next.setAttribute("aria-label", "下一組專業證照");
  next.append(createArrow("right"));

  controls.append(previous);
  for (let i = 0; i < pageButtons.length; i++) {
    controls.append(pageButtons[i]);
  }
  controls.append(next);

  pager.replaceChildren(controls);
  pager.removeAttribute("aria-hidden");

  // ---------------------------------------------------------------------------
  // 頁碼計算與同步
  // ---------------------------------------------------------------------------
  function getPage() {
    const positions = getPagePositions();
    if (positions.length <= 1) return 0;

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const scrollLeft = Math.min(maxScroll, Math.max(0, viewport.scrollLeft));
    let nearestPage = 0;
    let nearestDistance = Math.abs(positions[0] - scrollLeft);
    for (let page = 1; page < positions.length; page++) {
      const distance = Math.abs(positions[page] - scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPage = page;
      }
    }
    return Math.min(pages - 1, nearestPage);
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

    previous.disabled = page === 0;
    next.disabled = page === pages - 1;
  }

  function goTo(page) {
    const positions = getPagePositions();
    const targetPage = Math.min(positions.length - 1, Math.max(0, page));
    if (targetPage < 0) return;
    viewport.scrollTo({
      left: positions[targetPage],
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  }

  // 綁定控制器事件
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

function initOccupationalSafety() {
  setupCredentialsCarousel();
}

// ---------------------------------------------------------------------------
// 啟動
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initOccupationalSafety);
