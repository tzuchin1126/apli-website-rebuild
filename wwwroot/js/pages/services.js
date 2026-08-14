(() => {
  const tabs = [...document.querySelectorAll("[role='tab']")];
  const panels = [...document.querySelectorAll("[data-service-panel]")];
  const panelIds = new Set(panels.map((panel) => panel.id));

  const select = (id, updateHash = true) => {
    const selectedId = panelIds.has(id) ? id : panels[0]?.id;
    if (!selectedId) return;
    tabs.forEach((tab) => {
      const selected = tab.getAttribute("aria-controls") === selectedId;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== selectedId; });
    if (updateHash) history.replaceState(null, "", `#${selectedId}`);
  };

  if (tabs.length && panels.length) {
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(tab.getAttribute("aria-controls")));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        tabs[(index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length].focus();
      });
    });

    select(window.location.hash.slice(1) || tabs[0].getAttribute("aria-controls"), false);
    window.addEventListener("hashchange", () => select(window.location.hash.slice(1), false));
  }
})();

(() => {
  const carousels = [...document.querySelectorAll("[data-service-carousel]")];

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".service-carousel__track");
    const viewport = carousel.querySelector(".service-carousel__viewport");
    const slides = [...carousel.querySelectorAll(".service-carousel__slide")];
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let timer;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerDeltaX = 0;
    let pointerActive = false;
    let pointerMoved = false;

    if (!track || slides.length < 2) return;

    slides.forEach((slide, index) => {
      slide.setAttribute("aria-label", `第 ${index + 1} 張，共 ${slides.length} 張`);
    });

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.className = "service-carousel__dot";
      dot.type = "button";
      dot.dataset.carouselDot = String(index);
      dot.setAttribute("aria-label", `顯示第 ${index + 1} 張圖片`);
      dot.setAttribute("aria-current", "false");
      dotsContainer?.append(dot);
      return dot;
    });

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      slides.forEach((slide, slideIndex) => {
        slide.setAttribute("aria-hidden", String(slideIndex !== current));
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", String(active));
      });
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };

    const start = () => {
      stop();
      if (prefersReducedMotion.matches) return;
      timer = window.setInterval(() => show(current + 1), 5000);
    };

    previous?.addEventListener("click", () => {
      show(current - 1);
      start();
    });
    next?.addEventListener("click", () => {
      show(current + 1);
      start();
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        show(Number(dot.dataset.carouselDot));
        start();
      });
    });

    const finishPointer = (event, commit = true) => {
      if (!pointerActive) return;
      pointerActive = false;
      viewport?.classList.remove("is-dragging");
      if (viewport?.hasPointerCapture(event.pointerId)) {
        try { viewport.releasePointerCapture(event.pointerId); } catch {}
      }
      track.style.removeProperty("transition");
      if (commit && pointerMoved && Math.abs(pointerDeltaX) >= Math.max(40, viewport.clientWidth * 0.15)) {
        show(current + (pointerDeltaX < 0 ? 1 : -1));
      } else {
        show(current);
      }
      start();
    };

    viewport?.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointerActive = true;
      pointerMoved = false;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerDeltaX = 0;
      stop();
      try { viewport.setPointerCapture(event.pointerId); } catch {}
      viewport.classList.add("is-dragging");
    });

    viewport?.addEventListener("pointermove", (event) => {
      if (!pointerActive || !event.isPrimary) return;
      pointerDeltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;
      if (!pointerMoved && Math.abs(deltaY) > Math.abs(pointerDeltaX) && Math.abs(deltaY) > 8) {
        finishPointer(event, false);
        return;
      }
      if (Math.abs(pointerDeltaX) > 6) pointerMoved = true;
      if (!pointerMoved) return;
      track.style.transition = "none";
      track.style.transform = `translateX(calc(-${current * 100}% + ${pointerDeltaX}px))`;
    });

    viewport?.addEventListener("pointerup", (event) => finishPointer(event));
    viewport?.addEventListener("pointercancel", (event) => finishPointer(event, false));

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) start();
    });
    prefersReducedMotion.addEventListener?.("change", start);

    show(0);
    start();
  });
})();
