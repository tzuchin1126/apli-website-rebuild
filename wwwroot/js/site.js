(function () {
  const loader = document.querySelector("[data-page-loader]");
  if (!loader) return;

  /**
   * 等待單張圖片完成載入，並在瀏覽器支援時完成圖片解碼。
   *
   * 頁面載入畫面會等這個 Promise 結束，避免載入畫面消失時，
   * 圖片仍停留在尚未繪製完成的狀態。圖片載入失敗或瀏覽器不支援
   * decode() 時仍會放行，避免單張圖片讓整個頁面一直卡在載入畫面。
   *
   * @param {HTMLImageElement} image - 要等待的圖片元素
   * @returns {Promise<void>} 圖片載入、解碼完成或發生載入錯誤後完成
   */
  function waitForImageDecode(image) {
    return new Promise(function (resolve) {
      async function finish() {
        image.removeEventListener("load", finish);
        image.removeEventListener("error", finish);

        if (!image.naturalWidth || typeof image.decode !== "function") {
          resolve();
          return;
        }

        try {
          await image.decode();
        } catch (error) {
          // 解碼失敗就直接放行，圖片仍然可以顯示
        }

        resolve();
      }

      if (image.complete) {
        finish();
        return;
      }

      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
    });
  }

  /**
   * 等待首屏圖片、Hero 輪播圖片與網頁字型準備完成後顯示頁面。
   *
   * 只有目前可見的圖片，以及 Hero 輪播中的圖片會加入等待清單；
   * 最長等待 8 秒，避免資源異常時頁面永遠停留在載入畫面。
   */
  async function revealPage() {
    await new Promise(function (resolve) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(resolve);
      });
    });

    const allImages = document.images;
    const readyImages = [];

    for (let i = 0; i < allImages.length; i++) {
      const image = allImages[i];

      if (image.closest("[data-hero-carousel]")) {
        readyImages.push(image);
        continue;
      }

      if (image.closest("[aria-hidden='true']")) {
        continue;
      }

      const bounds = image.getBoundingClientRect();
      const isVisible = bounds.bottom > 0
        && bounds.right > 0
        && bounds.top < window.innerHeight
        && bounds.left < window.innerWidth;

      if (isVisible) {
        readyImages.push(image);
      }
    }

    const readinessTasks = [];
    for (let j = 0; j < readyImages.length; j++) {
      readinessTasks.push(waitForImageDecode(readyImages[j]));
    }

    if (document.fonts && document.fonts.ready) {
      readinessTasks.push(
        document.fonts.ready.catch(function () {})
      );
    }

    await Promise.race([
      Promise.allSettled(readinessTasks),
      new Promise(function (resolve) {
        window.setTimeout(resolve, 8000);
      })
    ]);

    document.documentElement.classList.add("page-ready");
    window.setTimeout(function () {
      loader.remove();
      document.documentElement.classList.remove("page-loading");
    }, 240);
  }

  revealPage();
})();

/** 圖片載入完成後，讓內頁 Hero 圖片由放大狀態縮回正常比例。 */
(function () {
  const images = document.querySelectorAll(".page-hero .page-hero__image");
  if (!images.length) return;

  function startZoomOut(image) {
    window.requestAnimationFrame(function () {
      image.classList.add("is-loaded");
    });
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    if (image.complete) {
      startZoomOut(image);
      continue;
    }

    image.addEventListener("load", function () {
      startZoomOut(image);
    }, { once: true });
  }
})();

(function () {
  const footerColumns = document.querySelectorAll(
    ".site-footer .footer-column"
  );

  if (!footerColumns.length) return;

  // 840px 以下視為手機 / 平板版
  const mobileScreen = window.matchMedia("(max-width: 840px)");

  function setColumnState(column, isOpen) {
    const toggle = column.querySelector(".footer-column__toggle");
    const links = column.querySelector(".footer-column__links");

    column.dataset.footerOpen = String(isOpen);

    if (toggle) {
      toggle.setAttribute("aria-expanded", String(isOpen));
    }

    if (links) {
      links.inert = !isOpen;
    }
  }

  // 根據螢幕大小決定 Footer 是否展開
  /** 依目前視窗寬度展開或收合 Footer 欄位。 */
  function updateFooter() {
    for (let i = 0; i < footerColumns.length; i++) {
      setColumnState(footerColumns[i], !mobileScreen.matches);
    }
  }

  for (let i = 0; i < footerColumns.length; i++) {
    const column = footerColumns[i];
    const toggle = column.querySelector(".footer-column__toggle");

    if (toggle) {
      toggle.addEventListener("click", function () {
        if (!mobileScreen.matches) return;

        setColumnState(column, column.dataset.footerOpen !== "true");
      });
    }
  }

  updateFooter();
  mobileScreen.addEventListener("change", updateFooter); // 當螢幕寬度跨過 840px 時重新判斷
})();


(function () {
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

  const navLinks = navigation.querySelectorAll("a");

  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i];
    const linkUrl = new URL(link.href, document.baseURI);
    const linkPath = cleanPath(linkUrl.pathname);

    const isCurrentPage =
      linkPath === currentPath ||
      (linkPath !== "/" && currentPath.indexOf(linkPath + "/") === 0);

    if (!isCurrentPage) continue;

    link.setAttribute("aria-current", "page");

    const dropdown = link.closest(".nav-dropdown");

    if (dropdown) {
      dropdown.classList.add("is-active");

      const parentLink = dropdown.querySelector(":scope > .nav-link");

      if (parentLink) {
        parentLink.classList.add("is-active");
      }
    }
  }

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

  const dropdownElements = navigation.querySelectorAll(".nav-dropdown");
  const dropdowns = [];

  for (let i = 0; i < dropdownElements.length; i++) {
    dropdowns.push(dropdownElements[i]);
  }

  /**
   * 設定導覽下拉選單的 CSS 與 ARIA 狀態。
   * @param {HTMLElement} dropdown - 下拉選單容器
   * @param {boolean} isOpen - 是否展開
   */
  function setDropdownState(dropdown, isOpen) {
    const button = dropdown.querySelector(":scope > .nav-link");
    const menu = dropdown.querySelector(":scope > .nav-menu");

    dropdown.classList.toggle("is-open", isOpen);

    if (button) {
      button.setAttribute("aria-expanded", String(isOpen));
    }

    if (menu) {
      menu.setAttribute("aria-hidden", String(!isOpen));
    }
  }

  /** 關閉所有導覽下拉選單。 */
  function closeDropdowns() {
    for (let i = 0; i < dropdowns.length; i++) {
      setDropdownState(dropdowns[i], false);
    }
  }

  for (let i = 0; i < dropdowns.length; i++) {
    const dropdown = dropdowns[i];
    const button = dropdown.querySelector(":scope > .nav-link");
    const menu = dropdown.querySelector(":scope > .nav-menu");

    if (!button || !menu) continue;

    setDropdownState(dropdown, false);

    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 841) setDropdownState(dropdown, true);
    });

    dropdown.addEventListener("mouseleave", function () {
      if (window.innerWidth >= 841 && !dropdown.contains(document.activeElement)) {
        setDropdownState(dropdown, false);
      }
    });

    dropdown.addEventListener("focusin", function () {
      if (window.innerWidth >= 841) setDropdownState(dropdown, true);
    });

    dropdown.addEventListener("focusout", function (event) {
      if (dropdown.contains(event.relatedTarget)) return;
      if (window.innerWidth < 841 || !dropdown.matches(":hover")) {
        setDropdownState(dropdown, false);
      }
    });
  }

  menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    const newState = !isOpen;

    menuButton.setAttribute("aria-expanded", String(newState));

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

  for (let i = 0; i < dropdownButtons.length; i++) {
    const dropdownButton = dropdownButtons[i];

    dropdownButton.addEventListener("click", function () {
      if (window.innerWidth >= 841) return;

      const parentDropdown = dropdownButton.closest(".nav-dropdown");

      if (!parentDropdown) return;

      const isOpen = !parentDropdown.classList.contains("is-open");
      setDropdownState(parentDropdown, isOpen);
    });
  }

  navigation.addEventListener("click", function (event) {
    if (!event.target.closest("a")) return;

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.classList.remove("is-open");
    navigation.classList.remove("is-open");

    if (header) {
      header.classList.remove("is-menu-open");
    }

    closeDropdowns();
  });

  document.addEventListener("keydown", function (event) {
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


(function () {
  const button = document.createElement("button"); // 建立按鈕
  button.className = "back-to-top";
  button.type = "button";
  button.setAttribute("aria-label", "回到頁面頂端"); // 無障礙文字
  button.innerHTML = "<i class=\"ph ph-caret-up\" aria-hidden=\"true\"></i>";
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

  button.addEventListener("click", function () {
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
