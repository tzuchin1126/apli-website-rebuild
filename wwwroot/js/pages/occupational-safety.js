(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const createArrow = (direction) => {
    const icon = document.createElement("i");
    icon.className = "ph ph-caret-" + direction;
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = direction === "left" ? "\uE138" : "\uE13A";
    return icon;
  };

  const setupCredentialsCarousel = () => {
    const list = document.querySelector("[data-safety-credentials-list]");
    if (!list) return;

    const viewport = list.closest(".safety-credentials__viewport");
    const pager = list.closest(".safety-credentials")?.querySelector(".safety-credentials__pager");
    if (!viewport || !pager) return;

    const cards = Array.from(list.querySelectorAll(".safety-credential-card"));
    let activePointerId = null;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;
    let hasDragged = false;
    let suppressClick = false;

    const finishPointerDrag = (event) => {
      if (event.pointerId !== activePointerId) return;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      if (hasDragged) suppressClick = true;
      activePointerId = null;
    };

    viewport.addEventListener("pointerdown", (event) => {
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
    viewport.addEventListener("click", (event) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    }, true);
    viewport.addEventListener("dragstart", (event) => event.preventDefault());

    const cardsPerPage = () => {
      if (window.matchMedia("(max-width: 760px)").matches) return 1;
      if (window.matchMedia("(max-width: 1099px)").matches) return 2;
      return 3;
    };

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
      button.setAttribute("aria-label", "顯示第 " + (index + 1) + " 組專業證照");
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

    const getPage = () => {
      const first = cards[0];
      if (!first) return 0;
      const cardWidth = first.getBoundingClientRect().width;
      const gap = Number.parseFloat(getComputedStyle(list).gap) || 0;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      if (maxScroll > 0 && viewport.scrollLeft >= maxScroll - 1) return pages - 1;
      return Math.min(pages - 1, Math.round(viewport.scrollLeft / ((cardWidth + gap) * pageSize)));
    };

    const update = () => {
      const page = getPage();
      pageButtons.forEach((button, index) => {
        const isActive = index === page;
        button.classList.toggle("is-active", isActive);
        if (isActive) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
      previous.disabled = page === 0;
      next.disabled = page === pages - 1;
    };

    const goTo = (page) => {
      const first = cards[0];
      if (!first) return;
      const gap = Number.parseFloat(getComputedStyle(list).gap) || 0;
      viewport.scrollTo({
        left: page * (first.getBoundingClientRect().width + gap) * pageSize,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
    };

    previous.addEventListener("click", () => goTo(Math.max(0, getPage() - 1)));
    next.addEventListener("click", () => goTo(Math.min(pages - 1, getPage() + 1)));
    pageButtons.forEach((button, index) => button.addEventListener("click", () => goTo(index)));
    viewport.addEventListener("scroll", update, { passive: true });

    const onResize = () => {
      if (cardsPerPage() !== pageSize) {
        window.removeEventListener("resize", onResize);
        viewport.scrollTo({ left: 0, behavior: "auto" });
        setupCredentialsCarousel();
        return;
      }
      update();
    };

    window.addEventListener("resize", onResize, { passive: true });
    update();
  };

  setupCredentialsCarousel();
})();
