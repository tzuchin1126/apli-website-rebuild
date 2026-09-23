// 頁面載入：等待圖片與字型載入完成後，再顯示頁面。
(function () {
  // 取得頁面 Loading 元素；若目前頁面沒有 Loader，就不執行後續邏輯
  const loader = document.querySelector("[data-page-loader]");
  if (!loader) return;

  /** 圖片載入並解碼完成後繼續執行；圖片載入失敗或瀏覽器不支援 decode() 時也不會阻塞頁面。 */
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

  /** 等待目前畫面中可見的圖片與字型載入完成；如果資源載入卡住，超過指定時間就直接繼續顯示頁面。 */
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

      if (image.closest("[aria-hidden='true']")) {
        continue;
      }

      const bounds = image.getBoundingClientRect();
      const isVisible = bounds.bottom > 0 && bounds.right > 0 && bounds.top < window.innerHeight && bounds.left < window.innerWidth;
      if (isVisible) readyImages.push(image);
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
        window.setTimeout(resolve, 5000);
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

// 內頁 Hero 圖片進場動畫。
(function () {
  const images = document.querySelectorAll(".page-hero .page-hero__image");
  if (!images.length) return;

  // 等下一個畫面更新週期再加入 class，讓 CSS 動畫可以正常從初始狀態開始。
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

    // 圖片尚未完成時，等待 load 事件後再啟動動畫
    image.addEventListener("load", function () { startZoomOut(image); }, { once: true });
  }
})();

(function () {
  const footerColumns = document.querySelectorAll(".site-footer .footer-column");
  if (!footerColumns.length) return;

  const mobileScreen = window.matchMedia("(max-width: 840px)");

  function setColumnState(column, isOpen) {
    const toggle = column.querySelector(".footer-column__toggle");
    const links = column.querySelector(".footer-column__links");

    column.dataset.footerOpen = String(isOpen);
    if (toggle) toggle.setAttribute("aria-expanded", String(isOpen));
    if (links) links.inert = !isOpen;
  }

  function updateFooter() {
    for (let i = 0; i < footerColumns.length; i++) {
      setColumnState(footerColumns[i], !mobileScreen.matches);
    }
  }

  for (let i = 0; i < footerColumns.length; i++) {
    const column = footerColumns[i];
    const toggle = column.querySelector(".footer-column__toggle");
    if (!toggle) continue;

    toggle.addEventListener("click", function () {
      if (!mobileScreen.matches) return;
      setColumnState(column, column.dataset.footerOpen !== "true");
    });
  }

  updateFooter();
  mobileScreen.addEventListener("change", updateFooter);
})();

(function () {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");
  if (!menuButton || !navigation) return;

  const isHomePage = document.body.classList.contains("home-page");

  function cleanPath(path) {
    return path.replace(/\/+$/, "") || "/";
  }

  const currentPath = cleanPath(new URL(window.location.href).pathname);
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

  function updateHeaderOnScroll() {
    if (isHomePage && header) {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
  }

  if (isHomePage) {
    window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
    updateHeaderOnScroll();
  }

  const dropdowns = navigation.querySelectorAll(".nav-dropdown");

  function setDropdownState(dropdown, isOpen) {
    const button = dropdown.querySelector(":scope > .nav-link");
    const menu = dropdown.querySelector(":scope > .nav-menu");
    dropdown.classList.toggle("is-open", isOpen);
    if (button) button.setAttribute("aria-expanded", String(isOpen));
    if (menu) menu.setAttribute("aria-hidden", String(!isOpen));
  }

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
    const newState = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(newState));
    menuButton.classList.toggle("is-open", newState);
    navigation.classList.toggle("is-open", newState);
    if (header) {
      header.classList.toggle("is-menu-open", newState);
      if (isHomePage) header.classList.add("is-menu-interacted");
    }
    if (!newState) closeDropdowns();
  });

  if (isHomePage && header) {
    header.addEventListener("mouseleave", function () {
      if (window.innerWidth > 760 || menuButton.classList.contains("is-open")) return;
      header.classList.remove("is-menu-interacted");
      menuButton.blur();
    });
  }

  const dropdownButtons = navigation.querySelectorAll(".nav-dropdown > .nav-link");
  for (let i = 0; i < dropdownButtons.length; i++) {
    const dropdownButton = dropdownButtons[i];
    dropdownButton.addEventListener("click", function () {
      if (window.innerWidth >= 841) return;
      const dropdown = dropdownButton.closest(".nav-dropdown");
      if (!dropdown) return;
      setDropdownState(dropdown, !dropdown.classList.contains("is-open"));
    });
  }

  navigation.addEventListener("click", function (event) {
    if (!event.target.closest("a")) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.classList.remove("is-open");
    navigation.classList.remove("is-open");
    if (header) header.classList.remove("is-menu-open");
    closeDropdowns();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closeDropdowns();
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.classList.remove("is-open");
    navigation.classList.remove("is-open");
    if (header) header.classList.remove("is-menu-open");
  });
})();

(function () {
  const button = document.createElement("button");
  button.className = "back-to-top";
  button.type = "button";
  button.setAttribute("aria-label", "回到頁面頂端");
  button.innerHTML = "<i class=\"ph ph-caret-up\" aria-hidden=\"true\"></i>";
  document.body.append(button);

  function updateBackToTop() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const isVisible = scrollableHeight >= 320 && window.scrollY > 300;
    button.classList.toggle("is-visible", isVisible);
  }

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  window.addEventListener("resize", updateBackToTop);
  updateBackToTop();
})();
