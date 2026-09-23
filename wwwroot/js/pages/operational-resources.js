// ---------------------------------------------------------------------------
// 地理優勢區塊進場動畫：進入視窗附近時才播放一次
// ---------------------------------------------------------------------------

function setupResourcesLocationMotion() {
  const network = document.querySelector(".resources-location__network");
  if (!network) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("resources-location-motion-ready");

  function reveal() {
    network.classList.add("is-visible");
  }

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    reveal();
    observer.disconnect();
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

  observer.observe(network);

  reducedMotion.addEventListener("change", function () {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    reveal();
  }, { once: true });
}

function setupResourcesQuickNav() {
  const quickNav = document.querySelector(".resources-quick-nav");
  if (!quickNav) return;

  const links = Array.from(quickNav.querySelectorAll(".resources-quick-nav__link"));
  const sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);
  if (links.length === 0 || sections.length === 0) return;

  let activeIndex = 0;
  let lockedIndex = -1;
  let lockUntil = 0;

  function setActiveIndex(nextIndex) {
    activeIndex = nextIndex;
    links.forEach(function (link, index) {
      if (index === activeIndex) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveLink() {
    const navBottom = quickNav.getBoundingClientRect().bottom;
    const now = window.performance.now();

    if (lockedIndex >= 0 && now < lockUntil) {
      setActiveIndex(lockedIndex);
      return;
    }
    lockedIndex = -1;

    let nextIndex = activeIndex;
    const forwardThreshold = navBottom + 12;
    const backwardThreshold = navBottom + 44;

    for (let index = activeIndex + 1; index < sections.length; index += 1) {
      if (sections[index].getBoundingClientRect().top <= forwardThreshold) {
        nextIndex = index;
      }
    }

    if (nextIndex === activeIndex && activeIndex > 0) {
      if (sections[activeIndex].getBoundingClientRect().top > backwardThreshold) {
        nextIndex = activeIndex - 1;
      }
    }

    setActiveIndex(nextIndex);
  }

  links.forEach(function (link, index) {
    link.addEventListener("click", function () {
      lockedIndex = index;
      lockUntil = window.performance.now() + 700;
      setActiveIndex(index);
    });
  });

  let frameId = 0;
  window.addEventListener("scroll", function () {
    if (frameId) return;
    frameId = window.requestAnimationFrame(function () {
      frameId = 0;
      updateActiveLink();
    });
  }, { passive: true });

  updateActiveLink();
}

document.addEventListener("DOMContentLoaded", function () {
  setupResourcesLocationMotion();
  setupResourcesQuickNav();
});
