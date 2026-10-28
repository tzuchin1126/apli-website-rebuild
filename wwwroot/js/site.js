// =====================================================================
// 1. 頁面載入：等圖片與字型載入完成後，再顯示頁面

const loader = document.querySelector("[data-page-loader]");
const imageReadyPromises = new WeakMap();

function wait(ms) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, ms);
  });
}

function waitForNextFrame() {
  return new Promise(function (resolve) {
    window.requestAnimationFrame(resolve);
  });
}

function waitForImageReady(image) {
  if (imageReadyPromises.has(image)) {
    return imageReadyPromises.get(image);
  }

  const readyPromise = new Promise(function (resolve) {
    function resolveAfterDecode() {
      if (typeof image.decode !== "function") {
        resolve();
        return;
      }

      image.decode().then(resolve).catch(resolve);
    }

    if (image.complete) {
      resolveAfterDecode();
      return;
    }

    image.addEventListener("load", resolveAfterDecode, { once: true });
    image.addEventListener("error", resolve, { once: true });
  });

  imageReadyPromises.set(image, readyPromise);
  return readyPromise;
}

function waitForHeroImages() {
  const heroImages = document.querySelectorAll(".page-hero .page-hero__image");
  return Promise.all(Array.prototype.map.call(heroImages, waitForImageReady));
}

// Hero 圖片與字型準備好後，才顯示頁面內容並移除 Loader。
async function revealPage() {
  // 等兩個畫面更新週期，確保版面已經排好
  await waitForNextFrame();
  await waitForNextFrame();

  const fontReady = document.fonts
    ? Promise.race([document.fonts.ready, wait(1000)])
    : Promise.resolve();
  await Promise.all([waitForHeroImages(), fontReady]);

  document.documentElement.classList.add("page-ready");

  // 留一點時間給淡出動畫，再把 Loader 移掉
  await wait(240);
  loader.remove();
  document.documentElement.classList.remove("page-loading");
  startReadyHeroImages();
}

function setupPageLoader() {
  if (!loader) {
    setupHeroImages();
    return;
  }
  revealPage();
}

// =====================================================================
// 2. 內頁 Hero 圖片進場動畫
// =====================================================================

// 等下一個畫面更新週期再加入 class，讓 CSS 動畫可以正常從初始狀態開始
function startZoomOut(image) {
  window.requestAnimationFrame(function () {
    image.classList.add("is-loaded");
  });
}

// event.currentTarget 就是載入完成的那張圖片
function onHeroImageLoad(event) {
  waitForImageReady(event.currentTarget).then(function () {
    startZoomOut(event.currentTarget);
  });
}

function startReadyHeroImages() {
  const heroImages = document.querySelectorAll(".page-hero .page-hero__image");

  for (let i = 0; i < heroImages.length; i++) {
    startZoomOut(heroImages[i]);
  }
}

function setupHeroImages() {
  const heroImages = document.querySelectorAll(".page-hero .page-hero__image")

  for (let i = 0; i < heroImages.length; i++) {
    const image = heroImages[i]

    if (image.complete) {
      startZoomOut(image)
    } else { // 圖片尚未完成時，等待 load 事件後再啟動動畫
      image.addEventListener("load", onHeroImageLoad, { once: true })
    }
  }
}

// =====================================================================
// 3. 頁尾：手機版每一欄可以展開/收合，桌機版全部展開
// =====================================================================

const footerColumns = document.querySelectorAll(".site-footer .footer-column");
const mobileScreen = window.matchMedia("(max-width: 840px)");

function setColumnState(column, isOpen) {
  const toggle = column.querySelector(".footer-column__toggle");
  const links = column.querySelector(".footer-column__links");

  column.dataset.footerOpen = String(isOpen);
  if (toggle) toggle.setAttribute("aria-expanded", String(isOpen));
  if (links) links.inert = !isOpen;
}

// 桌機版全部展開，手機版全部收起
function updateFooter() {
  for (let i = 0; i < footerColumns.length; i++) {
    setColumnState(footerColumns[i], !mobileScreen.matches);
  }
}

// event.currentTarget 就是被點的那個標題按鈕
function onFooterToggleClick(event) {
  if (!mobileScreen.matches) return;

  const column = event.currentTarget.closest(".footer-column");
  setColumnState(column, column.dataset.footerOpen !== "true");
}

function setupFooter() {
  if (!footerColumns.length) return;

  for (let i = 0; i < footerColumns.length; i++) {
    const toggle = footerColumns[i].querySelector(".footer-column__toggle");
    if (toggle) toggle.addEventListener("click", onFooterToggleClick);
  }

  updateFooter();
  mobileScreen.addEventListener("change", updateFooter);
}

// =====================================================================
// 4. 頁首：目前頁面標示、下拉選單、手機版選單、首頁捲動效果
// =====================================================================

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");
const isHomePage = document.body.classList.contains("home-page");

// 視窗寬度 841px 以上算桌機版
function isDesktop() {
  return window.innerWidth >= 841;
}

function cleanPath(path) {
  return path.replace(/\/+$/, "") || "/";
}

// ----- 目前頁面標示 -----

function markCurrentPage() {
  const currentPath = cleanPath(window.location.pathname);
  const navLinks = navigation.querySelectorAll("a");

  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i];
    const linkPath = cleanPath(new URL(link.href, document.baseURI).pathname);
    const isCurrentPage = linkPath === currentPath ||
      (linkPath !== "/" && currentPath.indexOf(linkPath + "/") === 0);
    if (!isCurrentPage) continue;

    link.setAttribute("aria-current", "page");
    const dropdown = link.closest(".nav-dropdown");
    if (dropdown) {
      dropdown.classList.add("is-active");
      const parentLink = dropdown.querySelector(":scope > .nav-link");
      if (parentLink) parentLink.classList.add("is-active");
    }
  }
}

// ----- 下拉選單 -----

function setDropdownState(dropdown, isOpen) {
  const button = dropdown.querySelector(":scope > .nav-link");
  const menu = dropdown.querySelector(":scope > .nav-menu");
  dropdown.classList.toggle("is-open", isOpen);
  if (button) button.setAttribute("aria-expanded", String(isOpen));
  if (menu) menu.setAttribute("aria-hidden", String(!isOpen));
}

function closeDropdowns() {
  const dropdowns = navigation.querySelectorAll(".nav-dropdown");
  for (let i = 0; i < dropdowns.length; i++) {
    setDropdownState(dropdowns[i], false);
  }
}

// 以下幾個是下拉選單的事件處理，event.currentTarget 就是 .nav-dropdown 本身

function onDropdownMouseEnter(event) {
  if (isDesktop()) setDropdownState(event.currentTarget, true);
}

function onDropdownMouseLeave(event) {
  const dropdown = event.currentTarget;
  if (isDesktop() && !dropdown.contains(document.activeElement)) {
    setDropdownState(dropdown, false);
  }
}

function onDropdownFocusIn(event) {
  if (isDesktop()) setDropdownState(event.currentTarget, true);
}

function onDropdownFocusOut(event) {
  const dropdown = event.currentTarget;
  if (dropdown.contains(event.relatedTarget)) return;
  if (!isDesktop() || !dropdown.matches(":hover")) {
    setDropdownState(dropdown, false);
  }
}

// 手機版：點下拉選單的標題來展開或收起
function onDropdownButtonClick(event) {
  if (isDesktop()) return;

  const dropdown = event.currentTarget.closest(".nav-dropdown");
  setDropdownState(dropdown, !dropdown.classList.contains("is-open"));
}

function setupDropdowns() {
  const dropdowns = navigation.querySelectorAll(".nav-dropdown");

  for (let i = 0; i < dropdowns.length; i++) {
    const dropdown = dropdowns[i];
    const button = dropdown.querySelector(":scope > .nav-link");
    const menu = dropdown.querySelector(":scope > .nav-menu");
    if (!button || !menu) continue;

    setDropdownState(dropdown, false);
    dropdown.addEventListener("mouseenter", onDropdownMouseEnter);
    dropdown.addEventListener("mouseleave", onDropdownMouseLeave);
    dropdown.addEventListener("focusin", onDropdownFocusIn);
    dropdown.addEventListener("focusout", onDropdownFocusOut);
    button.addEventListener("click", onDropdownButtonClick);
  }
}

// ----- 手機版選單 -----

function openMenu() {
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.classList.add("is-open");
  navigation.classList.add("is-open");
  if (header) header.classList.add("is-menu-open");
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.classList.remove("is-open");
  navigation.classList.remove("is-open");
  if (header) header.classList.remove("is-menu-open");
  closeDropdowns();
}

function onMenuButtonClick() {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";

  if (willOpen) {
    openMenu();
  } else {
    closeMenu();
  }

  if (isHomePage && header) header.classList.add("is-menu-interacted");
}

// 點了選單裡的連結就收起選單
function onNavigationClick(event) {
  if (event.target.closest("a")) closeMenu()
}

function onEscapeKey(event) {
  if (event.key === "Escape") closeMenu()
}

function setupMenu() {
  menuButton.addEventListener("click", onMenuButtonClick)
  navigation.addEventListener("click", onNavigationClick)
  document.addEventListener("keydown", onEscapeKey)
}

// ----- 首頁專用效果 -----

// 捲動超過一點點，頁首就換成有背景的樣式
function updateHeaderOnScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 8)
}

function onHeaderMouseLeave() {
  if (window.innerWidth > 760 || menuButton.classList.contains("is-open")) 
    return

  header.classList.remove("is-menu-interacted")
  menuButton.blur()
}

function setupHomePageEffects() {
  if (!isHomePage || !header) return
  window.addEventListener("scroll",updateHeaderOnScroll,{passive:true})
  updateHeaderOnScroll()
  header.addEventListener("mouseleave", onHeaderMouseLeave)
}

function setupHeader() {
  // 這頁沒有選單就不用做任何事
  if (!menuButton || !navigation) return

  markCurrentPage()
  setupDropdowns()
  setupMenu()
  setupHomePageEffects()
}

// =====================================================================
// 5. 回到頁面頂端按鈕

let backToTopButton = null

// 頁面夠長、而且已經捲下來一段距離才顯示
function updateBackToTop() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const isVisible = scrollableHeight >= 320 && window.scrollY > 300
  backToTopButton.classList.toggle("is-visible", isVisible)
}

function onBackToTopClick() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function setupBackToTop() {
  backToTopButton = document.createElement("button")
  backToTopButton.className = "back-to-top"
  backToTopButton.type = "button"
  backToTopButton.setAttribute("aria-label", "回到頁面頂端")
  backToTopButton.innerHTML = "<i class='ph ph-caret-up' aria-hidden='true'></i>"
  document.body.appendChild(backToTopButton)

  backToTopButton.addEventListener("click", onBackToTopClick)
  window.addEventListener("scroll", updateBackToTop, { passive: true })
  window.addEventListener("resize", updateBackToTop)
  updateBackToTop()
}

// =====================================================================
// 啟動

function init() {
  setupPageLoader();
  setupFooter();
  setupHeader();
  setupBackToTop();
}

init();
