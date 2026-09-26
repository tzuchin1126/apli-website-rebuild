(function () {
  if (window.location.hash) return;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  function resetEntryPosition() {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }

  resetEntryPosition();
  window.addEventListener("pageshow", resetEntryPosition);
})();

function toArray(nodeList) {
  const result = [];
  for (let index = 0; index < nodeList.length; index++) {
    result.push(nodeList[index]);
  }
  return result;
}

function readMilestoneEvents(content) {
  const eventsByYear = {};
  const groups = toArray(content.querySelectorAll(".milestone-year-group"));

  groups.forEach(function (group) {
    const yearElement = group.querySelector(".milestone-year-label time");
    if (!yearElement) return;

    const year = yearElement.textContent.trim();
    if (!/^\d{4}$/.test(year)) return;
    if (!eventsByYear[year]) eventsByYear[year] = [];

    toArray(group.querySelectorAll(".milestone-event")).forEach(function (eventElement) {
      const titleElement = eventElement.querySelector("h2");
      if (!titleElement) return;

      const descriptionElement = eventElement.querySelector("p");
      eventsByYear[year].push({
        title: titleElement.textContent.trim(),
        description: descriptionElement ? descriptionElement.textContent.trim() : "",
      });
    });
  });

  return Object.keys(eventsByYear)
    .map(function (year) {
      return { year: year, events: eventsByYear[year] };
    })
    .sort(function (first, second) {
      return Number(second.year) - Number(first.year);
    });
}

function initMilestonePreview() {
  const preview = document.querySelector("[data-milestones-preview]");
  if (!preview) return;

  const viewport = preview.querySelector(".milestone-content-shell");
  const content = preview.querySelector("[data-milestone-content]");
  if (!viewport || !content) return;

  const years = readMilestoneEvents(content);
  if (years.length === 0) return;

  const timeline = document.createElement("div");
  timeline.className = "milestone-vertical";

  const navigation = document.createElement("nav");
  navigation.className = "milestone-vertical__navigation";
  navigation.setAttribute("aria-label", "公司沿革年份");

  const yearList = document.createElement("div");
  yearList.className = "milestone-vertical__year-list";
  yearList.setAttribute("role", "tablist");

  const panels = document.createElement("div");
  panels.className = "milestone-vertical__panels";

  const panelEntries = [];

  function setActiveYear(year) {
    yearList.querySelectorAll(".milestone-vertical__year").forEach(function (button) {
      const isActive = button.dataset.year === year;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  }

  years.forEach(function (yearEntry, yearIndex) {
    const panelId = "milestone-panel-" + yearEntry.year;
    const tabId = "milestone-tab-" + yearEntry.year;

    const yearButton = document.createElement("button");
    yearButton.className = "milestone-vertical__year";
    yearButton.type = "button";
    yearButton.id = tabId;
    yearButton.dataset.year = yearEntry.year;
    yearButton.setAttribute("role", "tab");
    yearButton.setAttribute("aria-controls", panelId);
    yearButton.setAttribute("aria-selected", String(yearIndex === 0));
    yearButton.textContent = yearEntry.year;
    yearButton.addEventListener("click", function () {
      const panel = document.getElementById(panelId);
      if (!panel) return;

      setActiveYear(yearEntry.year);
      panel.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
    yearList.append(yearButton);

    const panel = document.createElement("section");
    panel.className = "milestone-vertical__panel";
    panel.id = panelId;
    panel.dataset.year = yearEntry.year;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabId);

    const heading = document.createElement("h2");
    heading.className = "milestone-vertical__heading";
    heading.textContent = yearEntry.year;
    panel.append(heading);

    const events = document.createElement("div");
    events.className = "milestone-vertical__events";
    yearEntry.events.forEach(function (eventEntry) {
      const event = document.createElement("article");
      event.className = "milestone-vertical__event";

      const title = document.createElement("h3");
      title.textContent = eventEntry.title;
      event.append(title);

      if (eventEntry.description) {
        const description = document.createElement("p");
        description.textContent = eventEntry.description;
        event.append(description);
      }
      events.append(event);
    });
    panel.append(events);
    panels.append(panel);
    panelEntries.push({ panel: panel, year: yearEntry.year });
  });

  navigation.append(yearList);
  timeline.append(navigation, panels);
  content.replaceChildren(timeline);

  preview.querySelectorAll("[data-milestone-controls]").forEach(function (controls) {
    controls.hidden = true;
  });
  viewport.classList.add("is-vertical-timeline");
  document.body.classList.add("milestones-motion-ready");

  setActiveYear(years[0].year);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveYear(entry.target.dataset.year);
      });
    }, { rootMargin: "-18% 0px -65%", threshold: 0 });
    panelEntries.forEach(function (entry) { observer.observe(entry.panel); });
  }
}

document.addEventListener("DOMContentLoaded", initMilestonePreview);
