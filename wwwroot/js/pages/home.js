(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setupHeroCarousel = () => {
    const hero = document.querySelector("[data-hero-carousel]");
    if (!hero) return;

    const slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
    const dotsContainer = hero.querySelector("[data-hero-dots]");
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    let autoplayId = null;
    let isHovered = false;
    let hasFocus = false;
    let swipePointerId = null;
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeActive = false;

    const stopAutoplay = () => {
      if (autoplayId !== null) window.clearInterval(autoplayId);
      autoplayId = null;
    };

    const render = () => {
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
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (slides.length < 2 || reducedMotion.matches || document.visibilityState === "hidden" || isHovered || hasFocus) return;
      autoplayId = window.setInterval(() => {
        activeIndex = (activeIndex + 1) % slides.length;
        render();
      }, 8000);
    };

    const goTo = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      render();
      startAutoplay();
    };

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

    const finishSwipe = (event) => {
      if (event.pointerId !== swipePointerId) return;
      const distanceX = event.clientX - swipeStartX;
      if (swipeActive && Math.abs(distanceX) >= 48) goTo(activeIndex + (distanceX < 0 ? 1 : -1));
      if (hero.hasPointerCapture(event.pointerId)) hero.releasePointerCapture(event.pointerId);
      swipePointerId = null;
      swipeActive = false;
    };

    hero.addEventListener("pointerdown", (event) => {
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
      if (!swipeActive && Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > 8) {
        swipePointerId = null;
        return;
      }
      if (Math.abs(distanceX) < 8) return;
      swipeActive = true;
      hero.setPointerCapture(event.pointerId);
      event.preventDefault();
    }, { passive: false });
    hero.addEventListener("pointerup", finishSwipe);
    hero.addEventListener("pointercancel", finishSwipe);

    hero.addEventListener("mouseenter", () => { isHovered = true; stopAutoplay(); });
    hero.addEventListener("mouseleave", () => { isHovered = false; startAutoplay(); });
    hero.addEventListener("focusin", () => { hasFocus = true; stopAutoplay(); });
    hero.addEventListener("focusout", (event) => {
      if (!hero.contains(event.relatedTarget)) {
        hasFocus = false;
        startAutoplay();
      }
    });
    document.addEventListener("visibilitychange", () => document.hidden ? stopAutoplay() : startAutoplay());
    reducedMotion.addEventListener("change", startAutoplay);
    render();
    startAutoplay();
  };

  const setupReveal = () => {
    const sections = [
      document.querySelector(".home-intro"),
      document.querySelector(".home-services"),
      document.querySelector(".home-latest"),
      document.querySelector(".home-contact-cta")
    ].filter(Boolean);

    sections.forEach((section) => section.classList.add("home-reveal"));
    if (!sections.length || reducedMotion.matches || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
  };

  const setupContactCta = () => {
    const cta = document.querySelector(".home-contact-cta");
    if (!cta) return;

    const setHoverState = (state) => {
      cta.classList.toggle("hover-left", state === "left");
      cta.classList.toggle("hover-right", state === "right");
    };

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
  };

  const createArrow = (direction) => {
    const icon = document.createElement("i");
    icon.className = `ph ph-caret-${direction}`;
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = direction === "left" ? "\uE138" : "\uE13A";
    return icon;
  };

  const setupLatestNews = () => {
    const list = document.querySelector("[data-home-latest-list]");
    if (!list) return;
    const viewport = list.closest(".home-latest__viewport");
    const pager = list.closest(".home-latest")?.querySelector(".home-latest__pager");
    if (!viewport || !pager) return;

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

    const renderControls = (items) => {
      const cardsPerPage = () => {
        if (window.matchMedia("(max-width: 760px)").matches) return 1;
        if (window.matchMedia("(max-width: 980px)").matches) return 2;
        return 4;
      };
      const pageSize = cardsPerPage();
      const pages = Math.max(1, Math.ceil(items.length / pageSize));
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

      const getPage = () => {
        const first = list.querySelector(".home-latest__item");
        if (!first) return 0;
        const cardWidth = first.getBoundingClientRect().width;
        const gap = Number.parseFloat(getComputedStyle(list).gap) || 0;
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
        const first = list.querySelector(".home-latest__item");
        if (!first) return;
        const gap = Number.parseFloat(getComputedStyle(list).gap) || 0;
        viewport.scrollTo({ left: page * (first.getBoundingClientRect().width + gap) * pageSize, behavior: reducedMotion.matches ? "auto" : "smooth" });
      };

      previous.addEventListener("click", () => goTo(Math.max(0, getPage() - 1)));
      next.addEventListener("click", () => goTo(Math.min(pages - 1, getPage() + 1)));
      pageButtons.forEach((button, index) => button.addEventListener("click", () => goTo(index)));
      viewport.addEventListener("scroll", update, { passive: true });
      const onResize = () => {
        if (cardsPerPage() !== pageSize) {
          window.removeEventListener("resize", onResize);
          renderControls(items);
          return;
        }
        update();
      };
      window.addEventListener("resize", onResize, { passive: true });
      update();
    };

    const parseCreatedAt = (value) => {
      const timestamp = Date.parse(value || "");
      return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
    };

    const compareLatestNews = (left, right) => {
      const createdAtDifference = parseCreatedAt(right.createdAt) - parseCreatedAt(left.createdAt);
      if (createdAtDifference !== 0) return createdAtDifference;

      const dateDifference = String(right.date || "").localeCompare(String(left.date || ""));
      return dateDifference || String(right.id || "").localeCompare(String(left.id || ""));
    };

    fetch("data/news.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load news");
        return response.json();
      })
      .then((source) => source.map((item) => ({
        id: item.id ?? item.Id,
        date: item.date ?? item.Date,
        tag: item.tag ?? item.Tag,
        title: item.title ?? item.Title,
        content: item.content ?? item.Content ?? "",
        imageUrl: item.imageUrl ?? item.ImageUrl ?? "",
        createdAt: item.createdAt ?? item.CreatedAt ?? "",
        published: item.published ?? item.Published
      })).filter((item) => item.published !== false).sort(compareLatestNews))
      .then((items) => {
        list.replaceChildren();
        if (!items.length) throw new Error("No news");
        items.forEach((item) => {
          const link = document.createElement("a");
          link.className = "home-latest__item";
          link.href = `news-detail.html?id=${encodeURIComponent(item.id)}`;
          const media = document.createElement("span");
          media.className = "home-latest__media";
          if (item.imageUrl) {
            const image = document.createElement("img");
            image.src = item.imageUrl;
            image.alt = "";
            image.loading = "lazy";
            image.addEventListener("error", () => image.remove(), { once: true });
            media.append(image);
          }
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
        renderControls(items);
      })
      .catch(() => {
        list.replaceChildren();
        const message = document.createElement("p");
        message.className = "home-latest__empty";
        message.textContent = "目前沒有可顯示的最新消息。";
        list.append(message);
        pager.replaceChildren();
      });
  };

  setupHeroCarousel();
  setupReveal();
  setupContactCta();
  setupLatestNews();
})();
