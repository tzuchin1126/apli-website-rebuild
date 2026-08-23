
// ======================================================
// 1. Footer：手機版收合、電腦版展開
// ======================================================
(() => {
  // 找到 Footer 裡所有可收合的區塊
  const footerColumns = document.querySelectorAll(
    ".site-footer .footer-column"
  );

  // 如果頁面沒有 Footer 區塊，就不用繼續執行
  if (!footerColumns.length) return;

  // 840px 以下視為手機 / 平板版
  const mobileScreen = window.matchMedia("(max-width: 840px)");

  // 根據螢幕大小決定 Footer 是否展開
  function updateFooter() {
    footerColumns.forEach((column) => {
      // 手機版：關閉
      // 電腦版：展開
      column.open = !mobileScreen.matches;
    });
  }

  // 頁面第一次載入時執行
  updateFooter();

  // 當螢幕寬度跨過 840px 時重新判斷
  mobileScreen.addEventListener("change", updateFooter);
})();


// ======================================================
// 2. Header / Navigation：選單、下拉選單、目前頁面狀態
// ======================================================
(() => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");

  // 如果找不到選單按鈕或導覽列，就停止執行
  if (!menuButton || !navigation) return;

  // 判斷現在是不是首頁
  const isHomePage = document.body.classList.contains("home-page");


  // ------------------------------------------------------
  // 判斷目前所在頁面，幫對應的導覽連結加上 active 狀態
  // ------------------------------------------------------

  // 移除網址最後多餘的 /
  function cleanPath(path) {
    const newPath = path.replace(/\/+$/, "");
    return newPath || "/";
  }

  const currentUrl = new URL(window.location.href);
  const currentPath = cleanPath(currentUrl.pathname);

  // 檢查導覽列裡的所有連結
  navigation.querySelectorAll("a").forEach((link) => {
    const linkUrl = new URL(link.href, document.baseURI);
    const linkPath = cleanPath(linkUrl.pathname);

    // 判斷是不是目前頁面
    const isCurrentPage =
      linkPath === currentPath ||
      (linkPath !== "/" && currentPath.startsWith(linkPath + "/"));

    if (!isCurrentPage) return;

    // 告訴瀏覽器 / 輔助工具：這是目前所在頁面
    link.setAttribute("aria-current", "page");

    // 如果連結位於下拉選單裡，也讓父層選單顯示 active
    const dropdown = link.closest(".nav-dropdown");

    if (dropdown) {
      dropdown.classList.add("is-active");

      const parentLink = dropdown.querySelector(":scope > .nav-link");

      if (parentLink) {
        parentLink.classList.add("is-active");
      }
    }
  });


  // ------------------------------------------------------
  // 首頁 Header 滾動效果
  // ------------------------------------------------------

  function updateHeaderOnScroll() {
    // 只有首頁需要這個效果
    if (!isHomePage || !header) return;

    // 往下捲超過 8px，就加上 is-scrolled
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  if (isHomePage) {
    window.addEventListener("scroll", updateHeaderOnScroll, {
      passive: true
    });

    // 頁面載入時先判斷一次
    updateHeaderOnScroll();
  }


  // ------------------------------------------------------
  // 下拉選單狀態
  // ------------------------------------------------------

  const dropdowns = [...navigation.querySelectorAll(".nav-dropdown")];

  function setDropdownState(dropdown, isOpen) {
    const button = dropdown.querySelector(":scope > .nav-link");
    const menu = dropdown.querySelector(":scope > .nav-menu");

    dropdown.classList.toggle("is-open", isOpen);
    button?.setAttribute("aria-expanded", String(isOpen));
    menu?.setAttribute("aria-hidden", String(!isOpen));
  }

  function closeDropdowns() {
    dropdowns.forEach((dropdown) => setDropdownState(dropdown, false));
  }

  // 桌機保留滑入開啟，鍵盤焦點進入時也同步更新 ARIA 狀態。
  // visibility 由 CSS 同步控制，避免不可見的子選單連結進入 Tab 順序。
  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(":scope > .nav-link");
    const menu = dropdown.querySelector(":scope > .nav-menu");

    if (!button || !menu) return;

    setDropdownState(dropdown, false);

    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 841) setDropdownState(dropdown, true);
    });

    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth >= 841 && !dropdown.contains(document.activeElement)) {
        setDropdownState(dropdown, false);
      }
    });

    dropdown.addEventListener("focusin", () => {
      if (window.innerWidth >= 841) setDropdownState(dropdown, true);
    });
    dropdown.addEventListener("focusout", (event) => {
      if (dropdown.contains(event.relatedTarget)) return;
      if (window.innerWidth < 841 || !dropdown.matches(":hover")) {
        setDropdownState(dropdown, false);
      }
    });
  });


  // ------------------------------------------------------
  // 手機版主選單開啟 / 關閉
  // ------------------------------------------------------

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    const newState = !isOpen;

    menuButton.setAttribute(
      "aria-expanded",
      String(newState)
    );

    menuButton.classList.toggle("is-open", newState);
    navigation.classList.toggle("is-open", newState);

    if (header) {
      header.classList.toggle("is-menu-open", newState);
    }

    // 主選單關閉時，也把下拉選單一起關閉
    if (!newState) {
      closeDropdowns();
    }
  });


  // ------------------------------------------------------
  // 手機版下拉選單
  // ------------------------------------------------------

  const dropdownButtons =
    navigation.querySelectorAll(".nav-dropdown > .nav-link");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {

      // 電腦版不使用點擊開關下拉選單
      if (window.innerWidth >= 841) return;

      const dropdown = button.closest(".nav-dropdown");

      if (!dropdown) return;

      // 切換開啟 / 關閉
      const isOpen = !dropdown.classList.contains("is-open");
      setDropdownState(dropdown, isOpen);
    });
  });


  // ------------------------------------------------------
  // 點擊導覽連結後，自動關閉手機版選單
  // ------------------------------------------------------

  navigation.addEventListener("click", (event) => {

    // 如果點到的不是連結，不處理
    if (!event.target.closest("a")) return;

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.classList.remove("is-open");
    navigation.classList.remove("is-open");

    if (header) {
      header.classList.remove("is-menu-open");
    }

    closeDropdowns();
  });


  // ------------------------------------------------------
  // 按 ESC 關閉所有選單
  // ------------------------------------------------------

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closeDropdowns();

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.classList.remove("is-open");
    navigation.classList.remove("is-open");

    if (header) {
      header.classList.remove("is-menu-open");
    }
  });
})();


// ======================================================
// 3. Back To Top：回到頁面頂端按鈕
// ======================================================
(() => {

  // 建立按鈕
  const button = document.createElement("button");

  button.className = "back-to-top";
  button.type = "button";

  // 無障礙文字
  button.setAttribute("aria-label", "回到頁面頂端");

  // 按鈕圖示
  button.innerHTML = `
    <i class="ph ph-caret-up" aria-hidden="true"></i>
  `;

  // 加入頁面
  document.body.append(button);


  // ------------------------------------------------------
  // 判斷按鈕要不要顯示
  // ------------------------------------------------------

  function updateBackToTop() {

    // 頁面可以滾動的高度
    const scrollableHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    // 頁面太短就完全不需要回頂端按鈕
    if (scrollableHeight < 320) {
      button.classList.remove("is-visible");
      return;
    }

    // 往下捲超過 300px 才顯示
    if (window.scrollY > 300) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  }


  // ------------------------------------------------------
  // 點擊後回到頁面最上方
  // ------------------------------------------------------

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  // 滾動頁面時更新按鈕狀態
  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  // 視窗大小改變時也重新判斷
  window.addEventListener("resize", updateBackToTop);

  // 頁面第一次載入時執行
  updateBackToTop();
})();
