function setupBenefitsTabs() {
  const tablist = document.querySelector(".benefits-tabs__list");
  if (!tablist) return;

  const tabs = tablist.querySelectorAll('[role="tab"]');
  if (tabs.length === 0) return;

  const panels = [];
  for (let i = 0; i < tabs.length; i++) {
    const panel = document.getElementById(tabs[i].getAttribute("aria-controls"));
    if (!panel) return;
    panels.push(panel);
  }

  const panelViewport = document.createElement("div");
  const panelTrack = document.createElement("div");
  panelViewport.className = "benefits-panels-viewport";
  panelTrack.className = "benefits-panels-track";
  panelViewport.appendChild(panelTrack);
  panels[0].parentNode.insertBefore(panelViewport, panels[0]);
  for (let i = 0; i < panels.length; i++) {
    panelTrack.appendChild(panels[i]);
  }

  function setPanelViewportHeight() {
    let maxHeight = 0;
    for (let i = 0; i < panels.length; i++) {
      if (panels[i].scrollHeight > maxHeight) {
        maxHeight = panels[i].scrollHeight;
      }
    }
    panelViewport.style.height = maxHeight + "px";
  }

  function activateTab(nextIndex, moveFocus) {
    for (let i = 0; i < tabs.length; i++) {
      const selected = i === nextIndex;
      tabs[i].setAttribute("aria-selected", String(selected));
      tabs[i].tabIndex = selected ? 0 : -1;
      panels[i].inert = !selected;
    }

    panelTrack.style.transform = "translateX(-" + nextIndex * 100 + "%)";

    if (moveFocus) tabs[nextIndex].focus();
  }

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      activateTab(i, false);
    });

    tabs[i].addEventListener("keydown", function (event) {
      let nextIndex = i;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (i + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (i - 1 + tabs.length) % tabs.length;
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
  }

  setPanelViewportHeight();
  window.addEventListener("resize", setPanelViewportHeight);
  activateTab(0, false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupBenefitsTabs);
} else {
  setupBenefitsTabs();
}
