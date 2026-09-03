function initAffiliates() {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll(".affiliate-panel")];

  if (tabs.length && panels.length) {
    function selectTab(tab) {
      const panelId = tab.getAttribute("aria-controls");

      // 更新所有分頁按鈕狀態
      tabs.forEach((item) => {
        const isSelected = item === tab;
        item.setAttribute("aria-selected", String(isSelected));
        item.tabIndex = isSelected ? 0 : -1; // 只有啟用的分頁可被 Tab 聚焦
      });

      panels.forEach((panel) => {
        const isActive = panel.id === panelId;
        panel.classList.toggle("is-active", isActive);
        panel.setAttribute("aria-hidden", String(!isActive));
        panel.hidden = !isActive;
      });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectTab(tab));
      tab.addEventListener("keydown", (event) => {
        const isVertical = window.matchMedia("(min-width: 1024px)").matches;
        const navigationKeys = isVertical ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
        if (!navigationKeys.includes(event.key)) return;
        event.preventDefault();

        // 計算下一個分頁索引（循環）
        const direction = event.key === (isVertical ? "ArrowDown" : "ArrowRight") ? 1 : -1;
        const nextIndex = (index + direction + tabs.length) % tabs.length;
        const nextTab = tabs[nextIndex];

        selectTab(nextTab);
        nextTab.focus(); // 移動焦點到新分頁
      });
    });

    const initialTab = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
    selectTab(initialTab);
  }

  document.querySelectorAll("[data-affiliate-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
    const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];

    if (slides.length < 2) return;

    let activeIndex = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const leaveCleanupTimers = new WeakMap();

    function clearLeavingSlide(slide) {
      const cleanupTimer = leaveCleanupTimers.get(slide);
      if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);
      leaveCleanupTimers.delete(slide);
      slide.classList.remove("is-leaving");
    }

    function showSlide(nextIndex) {
      const previousIndex = activeIndex;
      activeIndex = (nextIndex + slides.length) % slides.length;
      const isChangingSlide = previousIndex !== activeIndex;

      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        const isLeaving = isChangingSlide && index === previousIndex;
        if (!isLeaving) clearLeavingSlide(slide);
        slide.classList.toggle("is-active", isActive);
        slide.classList.toggle("is-leaving", isLeaving);
        slide.setAttribute("aria-hidden", String(!isActive));

        if (isLeaving) {
          const cleanupTimer = window.setTimeout(() => clearLeavingSlide(slide), 700);
          leaveCleanupTimers.set(slide, cleanupTimer);
        }
      });

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", String(isActive));
      });
    }

    slides.forEach((slide) => {
      slide.addEventListener("transitionend", (event) => {
        if (event.propertyName === "transform") clearLeavingSlide(slide);
      });
    });

    carousel.addEventListener("animationend", (event) => {
      if (event.animationName !== "affiliate-sexin-carousel-progress" || prefersReducedMotion.matches) return;
      if (!event.target.closest(".is-active")) return;
      showSlide(activeIndex + 1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => showSlide(index));
    });

    showSlide(0);
  });

  const locationCards = [...document.querySelectorAll(".affiliate-location-card[data-region]")];
  const locationMarkers = [...document.querySelectorAll(".affiliate-location-marker[data-location-id]")];

  if (!locationCards.length) return;

  let selectedLocationId = locationCards[0]?.dataset.locationId || null;

  function selectLocation(locationId) {
    const selectedCard = locationCards.find((card) => card.dataset.locationId === locationId);
    if (!selectedCard) return;

    selectedLocationId = locationId;
    locationCards.forEach((card) => {
      const isSelected = card === selectedCard;
      card.hidden = !isSelected;
    });

    locationMarkers.forEach((marker) => {
      const isSelected = marker.dataset.locationId === selectedLocationId;
      marker.classList.toggle("is-active", isSelected);
      marker.setAttribute("aria-pressed", String(isSelected));
    });

  }

  locationMarkers.forEach((marker) => {
    marker.addEventListener("click", () => {
      selectLocation(marker.dataset.locationId);
    });
  });

  if (selectedLocationId) selectLocation(selectedLocationId);
}

document.addEventListener("DOMContentLoaded", initAffiliates);
