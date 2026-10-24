function setupBenefitsTabs() {
  const tablist = document.querySelector(".benefits-tabs__list");

  if (!tablist) {
    return;
  }

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs
    .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
    .filter(Boolean);

  if (!tabs.length || tabs.length !== panels.length) {
    return;
  }

  const panelViewport = document.querySelector(".benefits-panels");
  const panelTrack = document.createElement("div");

  if (!panelViewport) {
    return;
  }

  panelTrack.className = "benefits-panels__track";
  panelViewport.appendChild(panelTrack);

  panels.forEach((panel, index) => {
    panel.hidden = false;
    panel.setAttribute("aria-hidden", String(index !== 0));
    panel.tabIndex = index === 0 ? 0 : -1;
    panelTrack.appendChild(panel);
  });

  function setPanelViewportHeight() {
    const height = Math.max(...panels.map((panel) => panel.scrollHeight));

    panelViewport.style.height = `${height}px`;
  }

  setPanelViewportHeight();
  window.addEventListener("resize", setPanelViewportHeight, { passive: true });

  function activateTab(index, moveFocus = false) {
    tabs.forEach((tab, tabIndex) => {
      const isSelected = tabIndex === index;

      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      panels[tabIndex].setAttribute("aria-hidden", String(!isSelected));
      panels[tabIndex].tabIndex = isSelected ? 0 : -1;
    });

    panelTrack.style.transform = `translateX(-${index * 100}%)`;

    if (moveFocus) {
      tabs[index].focus();
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(index));

    tab.addEventListener("keydown", (event) => {
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

  const selectedIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
  );

  activateTab(selectedIndex);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupBenefitsTabs);
} else {
  setupBenefitsTabs();
}
