/**
 * 地理優勢區塊進場動畫：進入視窗附近時才播放一次。
 */
function setupResourcesLocationMotion() {
  const network = document.querySelector(".resources-location__network");
  if (!network) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("resources-location-motion-ready");

  const reveal = () => network.classList.add("is-visible");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      reveal();
      observer.disconnect();
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  observer.observe(network);

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    reveal();
  }, { once: true });
}

/**
 * 四個營運資源區塊進場動畫：進入視窗附近時才依區塊播放一次。
 */
function setupResourcesSectionMotion() {
  const sections = [...document.querySelectorAll(
    ".resource-section--slide-left, .resource-section--slide-right"
  )];
  if (!sections.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("resources-sections-motion-ready");

  const reveal = (section) => section.classList.add("is-visible");
  const revealAll = () => sections.forEach(reveal);

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  sections.forEach((section) => observer.observe(section));

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    revealAll();
  }, { once: true });
}

setupResourcesLocationMotion();
setupResourcesSectionMotion();
