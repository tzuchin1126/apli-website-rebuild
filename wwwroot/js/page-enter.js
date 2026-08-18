// ==========================================
// 頁面進場動畫：IntersectionObserver 觸發區塊顯示
// ==========================================
// 注意：此模組目前未被任何頁面載入（HTML 無引用此檔案），
// 保留供未來啟用。若要使用，請在頁面引入此腳本並確保 CSS 有對應規則。

/**
 * 套用頁面進場動畫
 * - 針對 main#main-content 直屬子元素（排除 hero、breadcrumb）
 * - 加上 .page-reveal 類別，滾動進視窗時加上 .is-page-revealed 觸發 CSS 動畫
 * - 支援 prefers-reduced-motion、桌機/行動裝置判斷
 */
function applyPageReveal() {
  const main = document.querySelector("main#main-content");
  if (!(main instanceof HTMLElement) || main.dataset.pageRevealInitialized === "true") return;

  main.dataset.pageRevealInitialized = "true";
  main.classList.add("page-reveal-container");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopViewport = window.matchMedia("(min-width: 841px)").matches;
  const isHomePage = document.body.classList.contains("home-page");

  // 取得需動畫的目標：直屬子元素，排除 hero、breadcrumb
  const targets = Array.from(main.children).filter((element) => {
    if (!(element instanceof HTMLElement)) return false;
    return !element.matches(".page-hero, .home-hero, .page-breadcrumb, [class*='breadcrumb']");
  });

  if (!targets.length || isHomePage) return;

  // 標記需動畫
  targets.forEach((target) => target.classList.add("page-reveal"));

  /** 直接全部顯示（無動畫） */
  const revealAll = () => targets.forEach((target) => target.classList.add("is-page-revealed"));

  // 減少動畫、行動裝置、不支援 IntersectionObserver → 直接顯示
  if (reducedMotion || !desktopViewport || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  // IntersectionObserver：進入視窗觸發動畫
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-page-revealed");
      observer.unobserve(entry.target); // 只觸發一次
    });
  }, {
    rootMargin: "0px 0px -12% 0px", // 視窗底部往上 12% 觸發
    threshold: 0.12
  });

  targets.forEach((target) => observer.observe(target));
}

// ==========================================
// 啟動：支援 DOMContentLoaded 或已載入完成
// ==========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyPageReveal, { once: true });
} else {
  applyPageReveal();
}