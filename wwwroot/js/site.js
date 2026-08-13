(() => {
  const footerColumns = document.querySelectorAll(".site-footer .footer-column");
  if (!footerColumns.length) return;

  const compactViewport = window.matchMedia("(max-width: 840px)");
  const updateFooterDisclosureState = () => {
    footerColumns.forEach((column) => {
      column.open = !compactViewport.matches;
    });
  };

  updateFooterDisclosureState();
  compactViewport.addEventListener("change", updateFooterDisclosureState);
})();

(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");
  if (!toggle || !navigation) return;

  const isHomePage = document.body.classList.contains("home-page");

  const normalizePath = (path) => {
    const normalized = path.replace(/\/+$/, "");
    return normalized || "/";
  };

  const currentUrl = new URL(window.location.href);
  const currentPath = normalizePath(currentUrl.pathname);
  navigation.querySelectorAll("a").forEach((link) => {
    const targetUrl = new URL(link.href, document.baseURI);
    const targetPath = normalizePath(targetUrl.pathname);
    const matchesPath = targetPath === currentPath
      || (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`));
    const matchesTarget = matchesPath && (!targetUrl.hash || targetUrl.hash === currentUrl.hash);

    if (matchesTarget && !link.hasAttribute("aria-current")) {
      link.setAttribute("aria-current", "page");
    }

    if (!matchesPath) return;
    const dropdown = link.closest(".nav-dropdown");
    const parentLink = dropdown?.querySelector(":scope > .nav-link");
    dropdown?.classList.add("is-active");
    parentLink?.classList.add("is-active");
  });

  const updateHomeHeaderState = () => {
    if (!isHomePage || !header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  if (isHomePage) {
    window.addEventListener("scroll", updateHomeHeaderState, { passive: true });
    updateHomeHeaderState();
  }

  const closeDropdowns = () => {
    navigation.querySelectorAll(".nav-dropdown.is-open").forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      dropdown.querySelector(".nav-link")?.setAttribute("aria-expanded", "false");
    });
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.classList.toggle("is-open", !isOpen);
    navigation.classList.toggle("is-open", !isOpen);
    header?.classList.toggle("is-menu-open", !isOpen);
    if (isOpen) closeDropdowns();
  });

  navigation.querySelectorAll(".nav-dropdown > .nav-link").forEach((button) => {
    button.addEventListener("click", () => {
      if (window.matchMedia("(min-width: 841px)").matches) return;
      const dropdown = button.closest(".nav-dropdown");
      if (!dropdown) return;
      const isOpen = dropdown.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  navigation.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("is-open");
    navigation.classList.remove("is-open");
    header?.classList.remove("is-menu-open");
    closeDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeDropdowns();
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("is-open");
    navigation.classList.remove("is-open");
    header?.classList.remove("is-menu-open");
  });
})();

(() => {
  const button = document.createElement("button");
  button.className = "back-to-top";
  button.type = "button";
  button.hidden = true;
  button.tabIndex = -1;
  button.setAttribute("aria-label", "回到頁面頂端");
  button.setAttribute("aria-hidden", "true");
  button.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 11 6-6 6 6"></path>
      <path d="m6 19 6-6 6 6"></path>
    </svg>`;
  document.body.append(button);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const main = document.querySelector("#main-content");
  let updateFrame = 0;

  const updateButtonState = () => {
    updateFrame = 0;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = document.documentElement.scrollHeight - viewportHeight;
    const isNeeded = scrollableDistance > 320;
    const showAfter = Math.min(400, Math.max(240, viewportHeight * 0.45));
    const isVisible = isNeeded && window.scrollY > showAfter;

    button.hidden = !isNeeded;
    button.classList.toggle("is-visible", isVisible);
    button.tabIndex = isVisible ? 0 : -1;
    button.setAttribute("aria-hidden", String(!isVisible));

    if (!isVisible && document.activeElement === button && main instanceof HTMLElement) {
      main.focus({ preventScroll: true });
    }
  };

  const requestButtonUpdate = () => {
    if (updateFrame) return;
    updateFrame = window.requestAnimationFrame(updateButtonState);
  };

  button.addEventListener("click", () => {
    if (main instanceof HTMLElement) {
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }

    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  });

  window.addEventListener("scroll", requestButtonUpdate, { passive: true });
  window.addEventListener("resize", requestButtonUpdate);
  window.addEventListener("load", requestButtonUpdate, { once: true });

  if ("ResizeObserver" in window) {
    const pageResizeObserver = new ResizeObserver(requestButtonUpdate);
    pageResizeObserver.observe(document.body);
  }

  updateButtonState();
})();
