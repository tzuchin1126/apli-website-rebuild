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

function setupResourcesDataTabs() {
  const tablist = document.querySelector(".resource-data-switcher__tabs");
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs
    .map(function (tab) {
      return document.getElementById(tab.getAttribute("aria-controls"));
    })
    .filter(Boolean);
  if (tabs.length === 0 || panels.length !== tabs.length) return;

  const description = document.querySelector("#resource-data-description");
  const panelViewport = document.createElement("div");
  const panelTrack = document.createElement("div");
  const mobileViewport = window.matchMedia("(max-width: 760px)");
  let activeIndex = 0;
  panelViewport.className = "resource-data-switcher__panel-viewport";
  panelTrack.className = "resource-data-switcher__panel-track";
  panelViewport.appendChild(panelTrack);
  panels[0].parentNode.insertBefore(panelViewport, panels[0]);

  panels.forEach(function (panel, index) {
    panel.hidden = false;
    panel.setAttribute("aria-hidden", String(index !== 0));
    panel.tabIndex = index === 0 ? 0 : -1;
    panelTrack.appendChild(panel);
  });

  function setPanelViewportHeight() {
    const height = mobileViewport.matches
      ? panels[activeIndex].scrollHeight
      : Math.max(...panels.map(function (panel) {
        return panel.scrollHeight;
      }));
    panelViewport.style.height = `${height}px`;
  }

  setPanelViewportHeight();
  window.addEventListener("resize", setPanelViewportHeight, { passive: true });
  mobileViewport.addEventListener("change", setPanelViewportHeight);

  function activateTab(nextIndex, moveFocus) {
    activeIndex = nextIndex;
    tabs.forEach(function (tab, index) {
      const selected = index === nextIndex;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[index].setAttribute("aria-hidden", String(!selected));
      panels[index].tabIndex = selected ? 0 : -1;
    });

    if (description) description.textContent = tabs[nextIndex].dataset.description || "";
    panelTrack.style.transform = `translateX(-${nextIndex * 100}%)`;

    if (moveFocus) tabs[nextIndex].focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(index, false);
    });

    tab.addEventListener("keydown", function (event) {
      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(nextIndex, true);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupResourcesLocationMotion();
  setupResourcesDataTabs();
});
