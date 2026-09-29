// 營運資源頁：地理優勢區塊進場動畫、快速導覽列

// 地理優勢區塊進場動畫
function setupResourcesLocationMotion() {
  const locationNetwork = document.querySelector(".resources-location__network");
  if (!locationNetwork) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("resources-location-motion-ready");

  const reveal = () => locationNetwork.classList.add("is-visible");

  // 若使用者偏好減少動畫，或瀏覽器不支援 IntersectionObserver，就直接顯示
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    reveal();
    return;
  }

  // 進入視窗就播放動畫，播完即停止觀察
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      reveal();
      observer.disconnect();
    }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

  observer.observe(locationNetwork);

  // 監聽系統設定切換
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      observer.disconnect();
      reveal();
    }
  }, { once: true });
}


// 2. 快速導覽列 (Scrollspy)
function setupResourcesQuickNav() {
  const quickNav = document.querySelector(".resources-quick-nav");
  if (!quickNav) return;

  const quickNavLinks = Array.from(quickNav.querySelectorAll(".resources-quick-nav__link"));
  const quickNavSections = quickNavLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean); // 確保對應的區塊存在

  if (!quickNavLinks.length || !quickNavSections.length) return;

  let activeIndex = 0;
  let lockedIndex = -1;
  let lockUntil = 0;
  let scrollFrameId = 0;

  // 更新導覽列高亮狀態
  const setActiveIndex = (nextIndex) => {
    activeIndex = nextIndex;
    quickNavLinks.forEach((link, i) => {
      if (i === activeIndex) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  // 捲動時計算當前位置
  const updateActiveLink = () => {
    const navBottom = quickNav.getBoundingClientRect().bottom;
    const now = window.performance.now();

    // 點擊後的 0.7 秒內維持鎖定
    if (lockedIndex >= 0 && now < lockUntil) {
      setActiveIndex(lockedIndex);
      return;
    }
    lockedIndex = -1;

    let nextIndex = activeIndex;

    // 向下捲動判斷
    const forwardThreshold = navBottom + 12;
    for (let i = activeIndex + 1; i < quickNavSections.length; i++) {
      if (quickNavSections[i].getBoundingClientRect().top <= forwardThreshold) {
        nextIndex = i;
      }
    }

    // 向上捲動判斷
    const backwardThreshold = navBottom + 44;
    if (nextIndex === activeIndex && activeIndex > 0) {
      if (quickNavSections[activeIndex].getBoundingClientRect().top > backwardThreshold) {
        nextIndex = activeIndex - 1;
      }
    }

    setActiveIndex(nextIndex);
  };

  // 綁定點擊事件 (記錄鎖定時間)
  quickNavLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
      lockedIndex = index;
      lockUntil = window.performance.now() + 700;
      setActiveIndex(index);
    });
  });

  // 綁定捲動事件 (用 rAF 節流)
  window.addEventListener("scroll", () => {
    if (scrollFrameId) return;
    scrollFrameId = window.requestAnimationFrame(() => {
      scrollFrameId = 0;
      updateActiveLink();
    });
  }, { passive: true });

  updateActiveLink();
}


document.addEventListener("DOMContentLoaded", () => {
  setupResourcesLocationMotion();
  setupResourcesQuickNav();
});