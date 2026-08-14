(() => {
  const applyPageReveal = () => {
    const main = document.querySelector("main#main-content");
    if (!(main instanceof HTMLElement) || main.dataset.pageRevealInitialized === "true") return;

    main.dataset.pageRevealInitialized = "true";
    main.classList.add("page-reveal-container");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopViewport = window.matchMedia("(min-width: 841px)").matches;
    const isHomePage = document.body.classList.contains("home-page");
    const targets = Array.from(main.children).filter((element) => {
      if (!(element instanceof HTMLElement)) return false;
      return !element.matches(".page-hero, .home-hero, .page-breadcrumb, [class*='breadcrumb']");
    });

    if (!targets.length || isHomePage) {
      return;
    }

    targets.forEach((target) => target.classList.add("page-reveal"));

    const revealAll = () => targets.forEach((target) => target.classList.add("is-page-revealed"));
    if (reducedMotion || !desktopViewport || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-page-revealed");
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12
    });

    targets.forEach((target) => observer.observe(target));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyPageReveal, { once: true });
  } else {
    applyPageReveal();
  }
})();
