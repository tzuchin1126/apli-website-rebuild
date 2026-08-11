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
      document.querySelector(".home-philosophy"),
      ...document.querySelectorAll(".home-image-cta")
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

  const createArrow = () => {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />';
    return icon;
  };

  const createShareIcon = () => {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("class", "home-text-link__icon");
    icon.setAttribute("viewBox", "0 0 256 256");
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("focusable", "false");
    icon.setAttribute("fill", "currentColor");
    icon.innerHTML = '<path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V216a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16Z"></path>';
    return icon;
  };

  const setupPhilosophyIcons = () => {
    const icons = [
      '<path d="M12 20.5s-7-3.8-7-9.5a3.8 3.8 0 0 1 7-2.2A3.8 3.8 0 0 1 19 11c0 5.7-7 9.5-7 9.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.55"/>',
      '<path d="M12 20.5c4.4-2.9 6.8-6.2 6.8-10A4.2 4.2 0 0 0 12 7.2a4.2 4.2 0 0 0-6.8 3.3c0 3.8 2.4 7.1 6.8 10ZM8.6 12.2h6.8M12 8.8v6.8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.55"/>',
      '<path d="M7.2 18.4 12 4l4.8 14.4M8.8 13.8h6.4M10 18.4h4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.55"/>'
    ];
    document.querySelectorAll(".home-philosophy__list li > span").forEach((element, index) => {
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("focusable", "false");
      icon.innerHTML = icons[index] ?? icons[0];
      element.replaceChildren(icon);
    });
  };

  const setupLatestNews = () => {
    const list = document.querySelector("[data-home-latest-list]");
    if (!list) return;
    const viewport = list.closest(".home-latest__viewport");
    const pager = list.closest(".home-latest")?.querySelector(".home-latest__pager");
    if (!viewport || !pager) return;

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
      previous.append(createArrow());
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
      next.append(createArrow());
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
        published: item.published ?? item.Published
      })).filter((item) => item.published !== false).slice(0, 6))
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
          const more = document.createElement("span");
          more.className = "home-latest__more button--text-arrow";
          more.append("MORE", createShareIcon());
          body.append(meta, title, summary, more);
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
  setupPhilosophyIcons();
  setupLatestNews();
})();
