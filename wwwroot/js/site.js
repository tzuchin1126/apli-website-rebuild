/** 等待頁面初始可見圖片與字型就緒後移除載入狀態。 */
(() => {
  const loader = document.querySelector("[data-page-loader]");
  if (!loader) return;

  /**
   * 等待單張圖片載入並完成解碼。
   * @param {HTMLImageElement} image - 要等待的圖片元素
   * @returns {Promise<void>} 圖片載入或解碼完成
   */
  function waitForImageDecode(image) {
    return new Promise((resolve) => {
      function finish() {
        image.removeEventListener("load", finish);
        image.removeEventListener("error", finish);

        if (!image.naturalWidth || typeof image.decode !== "function") {
          resolve();
          return;
        }

        image.decode().catch(() => {}).then(resolve);
      }

      if (image.complete) {
        finish();
        return;
      }

      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
    });
  }

  /** 等待頁面資源就緒並切換至可見狀態。 */
  async function revealPage() {
    await new Promise((resolve) => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
    });

    const readyImages = Array.from(document.images).filter((image) => {
      if (image.closest("[data-hero-carousel]")) return true;
      if (image.closest("[aria-hidden='true']")) return false;

      const bounds = image.getBoundingClientRect();
      return bounds.bottom > 0
        && bounds.right > 0
        && bounds.top < window.innerHeight
        && bounds.left < window.innerWidth;
    });

    const readinessTasks = readyImages.map(waitForImageDecode);
    if (document.fonts?.ready) readinessTasks.push(document.fonts.ready.catch(() => {}));

    await Promise.race([
      Promise.allSettled(readinessTasks),
      new Promise((resolve) => window.setTimeout(resolve, 8000))
    ]);

    document.documentElement.classList.add("page-ready");
    window.setTimeout(() => {
      loader.remove();
      document.documentElement.classList.remove("page-loading");
    }, 240);
  }

  revealPage();
})();

(() => {
  const footerColumns = document.querySelectorAll(
    ".site-footer .footer-column"
  );

  
  if (!footerColumns.length) return;

  // 840px 以下視為手機 / 平板版
  const mobileScreen = window.matchMedia("(max-width: 840px)");

  // 根據螢幕大小決定 Footer 是否展開
  /** 依目前視窗寬度展開或收合 Footer 欄位。 */
  function updateFooter() {
    footerColumns.forEach((column) => {
      // 手機版：關閉
      // 電腦版：展開
      column.open = !mobileScreen.matches;
    });
  }

  updateFooter();
  mobileScreen.addEventListener("change", updateFooter); // 當螢幕寬度跨過 840px 時重新判斷
})();


(() => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");

  if (!menuButton || !navigation) return;

  const isHomePage = document.body.classList.contains("home-page");


  /**
   * 移除路徑尾端斜線，統一目前頁面與導覽連結比較格式。
   * @param {string} path - 原始路徑
   * @returns {string} 正規化後的路徑
   */
  function cleanPath(path) {
    const newPath = path.replace(/\/+$/, "");
    return newPath || "/";
  }

  const currentUrl = new URL(window.location.href);
  const currentPath = cleanPath(currentUrl.pathname);

  navigation.querySelectorAll("a").forEach((link) => {
    const linkUrl = new URL(link.href, document.baseURI);
    const linkPath = cleanPath(linkUrl.pathname);

    const isCurrentPage =
      linkPath === currentPath ||
      (linkPath !== "/" && currentPath.startsWith(linkPath + "/"));

    if (!isCurrentPage) return;

    link.setAttribute("aria-current", "page");

    const dropdown = link.closest(".nav-dropdown");

    if (dropdown) {
      dropdown.classList.add("is-active");

      const parentLink = dropdown.querySelector(":scope > .nav-link");

      if (parentLink) {
        parentLink.classList.add("is-active");
      }
    }
  });


  /** 更新首頁 Header 的捲動狀態。 */
  function updateHeaderOnScroll() {
    if (!isHomePage || !header) return;

    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  if (isHomePage) {
    window.addEventListener("scroll", updateHeaderOnScroll, {
      passive: true
    });

    updateHeaderOnScroll();
  }


  const dropdowns = [...navigation.querySelectorAll(".nav-dropdown")];

  /**
   * 設定導覽下拉選單的 CSS 與 ARIA 狀態。
   * @param {HTMLElement} dropdown - 下拉選單容器
   * @param {boolean} isOpen - 是否展開
   */
  function setDropdownState(dropdown, isOpen) {
    const button = dropdown.querySelector(":scope > .nav-link");
    const menu = dropdown.querySelector(":scope > .nav-menu");

    dropdown.classList.toggle("is-open", isOpen);
    button?.setAttribute("aria-expanded", String(isOpen));
    menu?.setAttribute("aria-hidden", String(!isOpen));
  }

  /** 關閉所有導覽下拉選單。 */
  function closeDropdowns() {
    dropdowns.forEach((dropdown) => setDropdownState(dropdown, false));
  }

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

    if (!newState) {
      closeDropdowns();
    }
  });


  const dropdownButtons =
    navigation.querySelectorAll(".nav-dropdown > .nav-link");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {

      if (window.innerWidth >= 841) return;

      const dropdown = button.closest(".nav-dropdown");

      if (!dropdown) return;

      const isOpen = !dropdown.classList.contains("is-open");
      setDropdownState(dropdown, isOpen);
    });
  });



  navigation.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.classList.remove("is-open");
    navigation.classList.remove("is-open");

    if (header) {
      header.classList.remove("is-menu-open");
    }

    closeDropdowns();
  });


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


(() => {
  const button = document.createElement("button"); // 建立按鈕
  button.className = "back-to-top";
  button.type = "button";
  button.setAttribute("aria-label", "回到頁面頂端"); // 無障礙文字
  button.innerHTML = `<i class="ph ph-caret-up" aria-hidden="true"></i>`;
  document.body.append(button);


  /** 依捲動位置顯示或隱藏回到頂端按鈕。 */
  function updateBackToTop() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight; // 頁面可以滾動的高度
    if (scrollableHeight < 320) {
      button.classList.remove("is-visible");
      return;
    }

    if (window.scrollY > 300) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  }

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  window.addEventListener("resize", updateBackToTop);

  updateBackToTop();
})();
