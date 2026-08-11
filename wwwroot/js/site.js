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
