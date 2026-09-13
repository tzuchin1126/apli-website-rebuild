(function () {
  if (window.location.hash) {
    return;
  }

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

// 公司沿革沿用 About 認證與獎項的水平資訊瀏覽方式，資料仍以 HTML 為來源，
// 因此停用 JavaScript 時仍可讀取原本的完整沿革內容。
function toArray(nodeList) {
  const result = [];
  for (let i = 0; i < nodeList.length; i++) {
    result.push(nodeList[i]);
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

    if (!eventsByYear[year]) {
      eventsByYear[year] = [];
    }

    const events = toArray(group.querySelectorAll(".milestone-event"));
    events.forEach(function (eventElement) {
      const titleElement = eventElement.querySelector("h2");
      if (!titleElement) return;

      const descriptionElement = eventElement.querySelector("p");
      eventsByYear[year].push({
        title: titleElement.textContent.trim(),
        description: descriptionElement ? descriptionElement.textContent.trim() : "",
      });
    });
  });

  const yearsByDecade = {};
  Object.keys(eventsByYear).forEach(function (year) {
    const yearNumber = Number(year);
    const decadeStart = Math.floor(yearNumber / 10) * 10;
    if (!yearsByDecade[decadeStart]) {
      yearsByDecade[decadeStart] = [];
    }
    yearsByDecade[decadeStart].push({ year: year, events: eventsByYear[year] });
  });

  return Object.keys(yearsByDecade)
    .map(Number)
    .sort(function (a, b) { return b - a; })
    .map(function (start) {
      return {
        start: start,
        label: start + "s",
        years: yearsByDecade[start].sort(function (a, b) {
          return Number(b.year) - Number(a.year);
        }),
      };
    });
}

function initMilestonePreview() {
  const preview = document.querySelector("[data-milestones-preview]");
  if (!preview) return;

  const controls = preview.querySelector("[data-milestone-controls]");
  const viewport = preview.querySelector(".milestone-content-shell");
  const content = preview.querySelector("[data-milestone-content]");
  if (!controls || !viewport || !content) return;

  const decades = readMilestoneEvents(content);
  if (decades.length === 0) return;

  const years = [];
  decades.forEach(function (decade) {
    decade.years.forEach(function (yearEntry) {
      years.push(yearEntry);
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activePageIndex = 0;
  let pageSize = getPageSize();
  let pages = [];

  function getPageSize() {
    if (window.matchMedia("(min-width: 1440px)").matches) return 4;
    if (window.matchMedia("(min-width: 1200px)").matches) return 3;
    if (window.matchMedia("(min-width: 768px)").matches) return 2;
    return 1;
  }

  function rebuildPages() {
    pages = [];
    for (let index = 0; index < years.length; index += pageSize) {
      pages.push(years.slice(index, index + pageSize));
    }
  }

  const track = document.createElement("div");
  track.className = "milestone-preview__track";
  track.setAttribute("data-milestone-track", "");

  const sharedTimelineTrack = document.createElement("div");
  sharedTimelineTrack.className = "milestone-preview__shared-track";
  sharedTimelineTrack.setAttribute("aria-hidden", "true");

  function createPage(pageYears, pageIndex) {
    const page = document.createElement("section");
    page.className = "milestone-preview__page";
    page.dataset.yearCount = String(pageYears.length);
    page.setAttribute("aria-label", "公司沿革");

    const pageHeadingId = "milestone-preview-page-" + pageIndex;
    page.setAttribute("aria-labelledby", pageHeadingId);

    const timeline = document.createElement("div");
    timeline.className = "milestone-preview__timeline";
    timeline.style.setProperty("--milestone-year-count", String(pageYears.length));
    pageYears.forEach(function (yearEntry, yearIndex) {
      const node = document.createElement("span");
      node.className = "milestone-preview__timeline-node";
      node.dataset.active = yearIndex === 0 ? "true" : "false";
      node.setAttribute("aria-hidden", "true");
      timeline.append(node);
    });
    page.append(timeline);

    const yearsElement = document.createElement("div");
    yearsElement.className = "milestone-preview__years";
    yearsElement.style.setProperty("--milestone-year-count", String(pageYears.length));

    pageYears.forEach(function (yearEntry, yearIndex) {
      const yearColumn = document.createElement("article");
      yearColumn.className = "milestone-preview__year-column";

      const yearHeading = document.createElement("h3");
      yearHeading.className = "milestone-preview__year";
      yearHeading.id = yearIndex === 0
        ? pageHeadingId
        : "milestone-preview-year-" + pageIndex + "-" + yearEntry.year;
      yearHeading.textContent = yearEntry.year;

      const events = document.createElement("div");
      events.className = "milestone-preview__events";
      yearEntry.events.forEach(function (eventEntry) {
        const event = document.createElement("article");
        event.className = "milestone-preview__event";

        const title = document.createElement("h4");
        title.textContent = eventEntry.title;
        event.append(title);

        if (eventEntry.description) {
          const description = document.createElement("p");
          description.textContent = eventEntry.description;
          event.append(description);
        }
        events.append(event);
      });

      yearColumn.append(yearHeading, events);
      yearsElement.append(yearColumn);
    });

    page.append(yearsElement);
    return page;
  }

  function syncEventHeights() {
    content.style.removeProperty("--milestone-events-height");
    const eventGroups = content.querySelectorAll(".milestone-preview__events");
    let maxHeight = 0;
    for (let index = 0; index < eventGroups.length; index++) {
      maxHeight = Math.max(maxHeight, eventGroups[index].getBoundingClientRect().height);
    }
    if (maxHeight > 0) {
      content.style.setProperty("--milestone-events-height", Math.ceil(maxHeight) + "px");
    }
  }

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "milestones-preview__control";
  previousButton.setAttribute("aria-label", "較新的年份");
  previousButton.textContent = "←";

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "milestones-preview__control";
  nextButton.setAttribute("aria-label", "較舊的年份");
  nextButton.textContent = "→";

  function updateControls() {
    previousButton.disabled = activePageIndex === 0;
    nextButton.disabled = activePageIndex === pages.length - 1;
  }

  function setTrackPosition(animate) {
    const renderedPages = track.children;
    const firstPage = track.firstElementChild;
    if (!firstPage) return;

    const targetPage = renderedPages[activePageIndex];
    const pageStep = targetPage
      ? targetPage.offsetLeft - firstPage.offsetLeft
      : firstPage.offsetWidth + 16;

    viewport.scrollTo({
      left: pageStep,
      behavior: animate && !reduceMotion ? "smooth" : "auto",
    });

    viewport.classList.toggle("is-track-advanced", activePageIndex > 0);
  }

  function renderTrack() {
    track.replaceChildren();
    pages.forEach(function (pageYears, pageIndex) {
      track.append(createPage(pageYears, pageIndex));
    });
    content.replaceChildren(sharedTimelineTrack, track);
    syncEventHeights();
    setTrackPosition(false);
    updateControls();
  }

  function syncStateFromScroll() {
    const firstPage = track.firstElementChild;
    if (!firstPage || pages.length === 0) return;

    const currentOffset = viewport.scrollLeft;
    let nearestPageIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let index = 0; index < track.children.length; index++) {
      const pageOffset = track.children[index].offsetLeft - firstPage.offsetLeft;
      const distance = Math.abs(pageOffset - currentOffset);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPageIndex = index;
      }
    }

    if (nearestPageIndex === activePageIndex) return;
    activePageIndex = nearestPageIndex;
    updateControls();
  }

  function movePage(offset) {
    activePageIndex = Math.max(0, Math.min(activePageIndex + offset, pages.length - 1));
    setTrackPosition(true);
    updateControls();
  }

  controls.replaceChildren(previousButton, nextButton);
  previousButton.addEventListener("click", function () { movePage(-1); });
  nextButton.addEventListener("click", function () { movePage(1); });

  let isDragging = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;

  viewport.addEventListener("mousedown", function (event) {
    if (event.button !== 0 || event.target.closest("button")) return;
    isDragging = true;
    dragStartX = event.clientX;
    dragStartScrollLeft = viewport.scrollLeft;
    event.preventDefault();
  });

  document.addEventListener("mousemove", function (event) {
    if (!isDragging) return;
    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) > 4) {
      viewport.classList.add("is-dragging");
      viewport.scrollLeft = dragStartScrollLeft - distance;
    }
  });

  document.addEventListener("mouseup", function () {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove("is-dragging");
    syncStateFromScroll();
    setTrackPosition(true);
  });

  viewport.addEventListener("scroll", syncStateFromScroll, { passive: true });
  viewport.addEventListener("wheel", function (event) {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 16) return;
    event.preventDefault();
    movePage(event.deltaX > 0 ? 1 : -1);
  }, { passive: false });

  window.addEventListener("resize", function () {
    const nextPageSize = getPageSize();
    if (nextPageSize === pageSize) {
      syncEventHeights();
      setTrackPosition(false);
      return;
    }
    pageSize = nextPageSize;
    activePageIndex = 0;
    rebuildPages();
    renderTrack();
  });

  document.body.classList.add("milestones-motion-ready");
  rebuildPages();
  renderTrack();
}

document.addEventListener("DOMContentLoaded", initMilestonePreview);
