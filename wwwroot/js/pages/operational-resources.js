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

setupResourcesLocationMotion();
