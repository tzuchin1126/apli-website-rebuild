(() => {
  const gallery = document.querySelector("[data-philosophy-gallery]");
  if (!gallery) return;

  const panels = [...gallery.querySelectorAll("[data-philosophy-panel]")];
  const images = [...gallery.querySelectorAll("[data-philosophy-image]")];
  const defaultPanel = gallery.dataset.defaultPanel || "";

  const setState = (panel, expanded) => {
    images.forEach((image) => {
      image.dataset.active = String(image.dataset.philosophyImage === panel);
    });
    panels.forEach((item) => {
      const active = expanded && item.dataset.philosophyPanel === panel;
      item.dataset.active = String(active);
      item.setAttribute("aria-expanded", String(active));
    });
  };

  const activate = (panel) => setState(panel.dataset.philosophyPanel, true);
  const reset = () => setState(defaultPanel, false);

  panels.forEach((panel) => {
    panel.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "touch") activate(panel);
    });
    panel.addEventListener("focus", () => activate(panel));
    panel.addEventListener("click", () => activate(panel));
  });

  gallery.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "touch" && !gallery.contains(document.activeElement)) reset();
  });
  gallery.addEventListener("focusout", () => {
    requestAnimationFrame(() => {
      if (!gallery.contains(document.activeElement)) reset();
    });
  });

  reset();
})();

(() => {
  const timelines = [...document.querySelectorAll("[data-milestone-timeline]")];
  if (!timelines.length) return;

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  timelines.forEach((timeline) => {
    const eventsContainer = timeline.querySelector("[data-collapsible-events]");
    const label = timeline.querySelector(".milestone-era-label h3");
    const toggle = timeline.querySelector("[data-collapsible-events-toggle]");
    const events = eventsContainer ? [...eventsContainer.children] : [];

    if (!eventsContainer || !label || !events.length) return;

    const initialVisibleCount = Number.parseInt(eventsContainer.dataset.initialVisibleCount || "8", 10);
    const recentEvents = events.slice(0, Number.isFinite(initialVisibleCount) ? initialVisibleCount : 8);
    const olderEvents = events.slice(recentEvents.length);
    let expanded = false;
    let collapseTimers = [];

    const setCurrentYear = (event) => {
      const year = event?.querySelector(".milestone-event-year")?.textContent.trim();
      if (year) label.textContent = year;
    };

    const updateActiveYear = () => {
      const visibleEvents = events.filter((event) => !event.hidden && !event.classList.contains("is-collapsed"));
      if (!visibleEvents.length) return;

      const viewportAnchor = window.innerHeight * 0.45;
      let activeEvent = visibleEvents[0];
      visibleEvents.forEach((event) => {
        if (event.getBoundingClientRect().top <= viewportAnchor) activeEvent = event;
      });
      setCurrentYear(activeEvent);
    };

    const setToggleLabel = () => {
      if (!toggle) return;
      const labelElement = toggle.querySelector("span");
      const iconElement = toggle.querySelector("i");
      if (labelElement) labelElement.textContent = expanded ? "收合至近期獎項" : "查看完整認證與獎項";
      if (iconElement) {
        iconElement.classList.toggle("ph-caret-line-down", !expanded);
        iconElement.classList.toggle("ph-caret-line-up", expanded);
      }
      toggle.setAttribute("aria-expanded", String(expanded));
      toggle.classList.toggle("is-expanded", expanded);
    };

    const clearCollapseTimers = () => {
      collapseTimers.forEach((timer) => window.clearTimeout(timer));
      collapseTimers = [];
    };

    const setExpanded = (nextExpanded, { scrollToggleIntoView = false } = {}) => {
      const wasExpanded = expanded;
      expanded = nextExpanded;
      clearCollapseTimers();
      setToggleLabel();

      recentEvents.forEach((event) => {
        event.hidden = false;
        event.classList.remove("is-collapsed");
        event.classList.add("is-visible");
      });

      if (expanded) {
        olderEvents.forEach((event) => {
          event.hidden = false;
          event.classList.remove("is-collapsed");
        });
        void eventsContainer.offsetHeight;
        olderEvents.forEach((event) => event.classList.add("is-visible"));
      } else {
        if (wasExpanded) setCurrentYear(recentEvents[recentEvents.length - 1]);

        olderEvents.forEach((event) => {
          event.classList.remove("is-visible");
          event.classList.add("is-collapsed");

          const hideAfterTransition = (transitionEvent) => {
            if (transitionEvent.propertyName === "max-height" && event.classList.contains("is-collapsed")) event.hidden = true;
          };

          event.addEventListener("transitionend", hideAfterTransition, { once: true });
          collapseTimers.push(window.setTimeout(() => {
            if (event.classList.contains("is-collapsed")) event.hidden = true;
          }, prefersReducedMotion ? 0 : 450));
        });

        if (scrollToggleIntoView && wasExpanded && toggle) {
          const toggleRect = toggle.getBoundingClientRect();
          const isVisible = toggleRect.top >= 0 && toggleRect.bottom <= window.innerHeight;
          if (!isVisible) toggle.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
        }
      }

      window.requestAnimationFrame(() => {
        updateActiveYear();
        updateProgress();
      });
    };

    setCurrentYear(recentEvents[0]);
    setExpanded(false);
    if (toggle && olderEvents.length) {
      toggle.hidden = false;
      toggle.addEventListener("click", () => setExpanded(!expanded, { scrollToggleIntoView: true }));
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrentYear(entry.target);
        });
      }, { rootMargin: "-40% 0px -55% 0px" });

      events.forEach((event) => observer.observe(event));
    }

    let ticking = false;
    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.45;
      const progress = Math.min(Math.max(viewportAnchor - rect.top, 0), rect.height);
      timeline.style.setProperty("--certification-progress", `${progress}px`);
      updateActiveYear();
      ticking = false;
    };
    const requestProgressUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    requestProgressUpdate();
  });
})();
