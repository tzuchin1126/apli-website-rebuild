(() => {
  const hero = document.querySelector("[data-hero-carousel]");
  if (hero) {
    const slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
    const dotsContainer = hero.querySelector("[data-hero-dots]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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
        const active = index === activeIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      Array.from(dotsContainer?.children || []).forEach((dot, index) => {
        if (!dot.classList.contains("home-hero__dot")) return;
        const active = index === activeIndex;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
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
        dot.setAttribute("aria-label", `顯示第 ${index + 1} 張圖片`);
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
  }

  const list = document.querySelector("[data-home-latest-list]");
  if (!list) return;

  fetch("data/news.json", { cache: "no-store" })
    .then((response) => response.json())
    .then((source) => source.map((item) => ({
      id: item.id ?? item.Id,
      date: item.date ?? item.Date,
      tag: item.tag ?? item.Tag,
      title: item.title ?? item.Title,
      published: item.published ?? item.Published
    })).filter((item) => item.published !== false).slice(0, 4))
    .then((items) => {
      list.replaceChildren();
      items.forEach((item) => {
        const link = document.createElement("a");
        link.className = "home-latest__item";
        link.href = `news-detail.html?id=${encodeURIComponent(item.id)}`;
        link.innerHTML = `<time></time><span></span><strong></strong><i aria-hidden="true">›</i>`;
        link.querySelector("time").textContent = item.date;
        link.querySelector("span").textContent = item.tag;
        link.querySelector("strong").textContent = item.title;
        list.append(link);
      });
    })
    .catch(() => {
      list.innerHTML = "<p class=\"home-latest__empty\">目前無法載入最新消息。</p>";
    });
})();
