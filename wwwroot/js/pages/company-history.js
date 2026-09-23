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

  const stickyTimeline = document.createElement("div");
  stickyTimeline.className = "milestone-sticky";

  const scrollViewport = document.createElement("div");
  scrollViewport.className = "milestone-sticky__scroll-viewport";
  scrollViewport.setAttribute("tabindex", "0");
  scrollViewport.setAttribute("aria-label", "Company history timeline");

  const items = document.createElement("div");
  items.className = "milestone-sticky__items";

  const scrollHint = document.createElement("div");
  scrollHint.className = "milestone-sticky__scroll-hint";
  scrollHint.setAttribute("aria-hidden", "true");
  scrollHint.innerHTML = '<span class="milestone-sticky__scroll-hint-icon"></span><span>SCROLL</span>';

  years.forEach(function (yearEntry, yearIndex) {
    const item = document.createElement("article");
    item.className = "milestone-sticky__item";
    item.classList.add(yearIndex % 2 === 0 ? "is-left" : "is-right");

    const side = document.createElement("div");
    side.className = "milestone-sticky__side";

    const heading = document.createElement("h2");
    heading.className = "milestone-sticky__heading";
    heading.textContent = yearEntry.year;
    side.append(heading);

    const events = document.createElement("div");
    events.className = "milestone-sticky__events";
    yearEntry.events.forEach(function (eventEntry) {
      const event = document.createElement("article");
      event.className = "milestone-sticky__event";

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
    side.append(events);

    const marker = document.createElement("span");
    marker.className = "milestone-sticky__marker";
    marker.setAttribute("aria-hidden", "true");

    const emptySide = document.createElement("span");
    emptySide.className = "milestone-sticky__empty-side";
    emptySide.setAttribute("aria-hidden", "true");

    if (yearIndex % 2 === 0) {
      item.append(side, marker, emptySide);
    } else {
      item.append(emptySide, marker, side);
    }
    items.append(item);
  });

  const axis = document.createElement("span");
  axis.className = "milestone-sticky__axis";
  axis.setAttribute("aria-hidden", "true");
  scrollViewport.append(items);
  stickyTimeline.append(axis, scrollViewport, scrollHint);
  content.replaceChildren(stickyTimeline);

  preview.querySelectorAll("[data-milestone-controls]").forEach(function (controls) {
    controls.hidden = true;
  });
  viewport.classList.add("is-vertical-timeline");
  document.body.classList.add("milestones-motion-ready");
  scrollViewport.scrollTop = 0;

  function updateScrollHint() {
    scrollHint.classList.toggle("is-hidden", scrollViewport.scrollTop > 12);
  }

  scrollViewport.addEventListener("scroll", updateScrollHint, { passive: true });
  updateScrollHint();
}

document.addEventListener("DOMContentLoaded", initMilestonePreview);
