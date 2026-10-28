
//讀取使用者的系統「減少動態效果」設定
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


function groupEvents(events) {
  const result = [];
  for (let i = 0; i < events.length; i++) {
    const item = events[i];
    // 第一層：找年代，沒有就新增
    let decade = null;
    for (let j = 0; j < result.length; j++) {
      if (result[j].label === item.decade) {
        decade = result[j];
        break;
      }
    }
    if (decade === null) {
      decade = {
        start: item.decade,
        label: item.decade,
        years: []
      };
      result.push(decade);
    }

    // 第二層：找年份，沒有就新增
    let yearGroup = null;
    for (let k = 0; k < decade.years.length; k++) {
      if (decade.years[k].year === item.year) {
        yearGroup = decade.years[k];
        break;
      }
    }
    if (yearGroup == null) {
      yearGroup = { year: item.year, events: [] };
      decade.years.push(yearGroup);
    }

    // 第三層：把標題放進去
    yearGroup.events.push(item.title);
  }
  return result;
}


function readCertificationEvents(source) {
  const items = source.querySelectorAll("[data-decade][data-year]");
  const events = [];

  for (let i = 0; i < items.length; i++) {
    const year = items[i].dataset.year;
    const decade = items[i].dataset.decade;
    const title = items[i].textContent.trim();
    if (year && decade && title) {
      events.push({ decade: decade, year: year, title: title });
    }
  }

  return events;
}

// ---------------------------------------------------------------
// 認證與獎項時間軸
// ---------------------------------------------------------------
function initCertificationPreview() {
  const preview = document.querySelector("[data-certification-preview]");
  if (!preview) {
    return;
  }
  const controls = preview.querySelector("[data-certification-preview-controls]");
  const decadeNavigation = preview.querySelector("[data-certification-preview-decades]");
  const viewport = preview.querySelector(".about-certifications-preview__content-shell");
  const content = preview.querySelector("[data-certification-preview-content]");
  const source = preview.querySelector("[data-certification-preview-source]");
  if (!controls || !decadeNavigation || !viewport || !content || !source) {
    return;
  }

  const decades = groupEvents(readCertificationEvents(source));
  if (decades.length === 0) {
    return;
  }
  source.hidden = true;

  const decadeButtons = [];
  let paginationButtons = [];
  let allPages = [];        // 所有頁面：{ decadeIndex, pageInDecade, years }
  let decadeFirstPage = []; // 每個年代的第一頁，是 allPages 的第幾個
  let activePage = 0;       // 目前顯示第幾頁
  let activeDecade = -1;    // 目前是第幾個年代
  let pageSize = getPageSize();
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let isProgrammaticScroll = false;
  let programmaticScrollTarget = 0;
  let programmaticScrollTimer = 0;

  // 依螢幕寬度決定一頁放幾個年份
  function getPageSize() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
      return 4;
    }
    if (window.matchMedia("(min-width: 1200px)").matches) {
      return 3;
    }
    if (window.matchMedia("(min-width: 768px)").matches) {
      return 2;
    }
    return 1;
  }

  // 把每個年代的年份，依 pageSize 切成一頁一頁
  function buildPages() {
    allPages = [];
    decadeFirstPage = [];

    for (let d = 0; d < decades.length; d++) {
      decadeFirstPage.push(allPages.length);
      const years = decades[d].years;
      let pageInDecade = 0;

      for (let i = 0; i < years.length; i += pageSize) {
        allPages.push({
          decadeIndex: d,
          pageInDecade: pageInDecade,
          years: years.slice(i, i + pageSize)
        });
        pageInDecade += 1;
      }
    }
  }

  // 更新年代按鈕與分頁圓點的狀態
  function updateControls() {
    const currentDecade = allPages[activePage].decadeIndex;

    for (let i = 0; i < decadeButtons.length; i++) {
      const active = i === currentDecade;
      decadeButtons[i].dataset.active = String(active);
      decadeButtons[i].setAttribute("aria-current", String(active));
      decadeButtons[i].setAttribute("aria-selected", String(active));
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    for (let i = 0; i < paginationButtons.length; i++) {
      const active = i === activePage;
      paginationButtons[i].dataset.active = String(active);
      paginationButtons[i].setAttribute("aria-current", String(active));
      // 手機版只顯示目前頁附近的圓點
      paginationButtons[i].hidden = isMobile && Math.abs(i - activePage) > 2;
    }
  }

  // 跳到指定頁（點年代、點圓點、滾輪、鍵盤都走這裡）
  function goToPage(index, animate) {
    if (index < 0 || index >= allPages.length) {
      return;
    }

    const track = content.querySelector("[data-certification-preview-track]");
    if (!track || track.children.length === 0) {
      return;
    }

    const pages = track.children;
    const left = pages[index].offsetLeft - pages[0].offsetLeft;

    activePage = index;
    viewport.classList.toggle("is-track-advanced", index > 0);

    if (animate && !reduceMotion) {
      isProgrammaticScroll = true;
      programmaticScrollTarget = left;
      window.clearTimeout(programmaticScrollTimer);
      const settleProgrammaticScroll = function () {
        if (Math.abs(viewport.scrollLeft - programmaticScrollTarget) > 1) {
          programmaticScrollTimer = window.setTimeout(settleProgrammaticScroll, 100);
          return;
        }
        isProgrammaticScroll = false;
        syncStateFromScroll();
      };
      programmaticScrollTimer = window.setTimeout(settleProgrammaticScroll, 700);
      viewport.scrollTo({ left: left, behavior: "smooth" });
    } else {
      isProgrammaticScroll = false;
      programmaticScrollTarget = left;
      window.clearTimeout(programmaticScrollTimer);
      viewport.scrollLeft = left;
    }

    for (let i = 0; i < pages.length; i++) {
      pages[i].setAttribute("aria-hidden", i === index ? "false" : "true");
    }

    updateControls();

    // 換了年代的話，讓對應的年代按鈕滑進可視範圍
    const newDecade = allPages[index].decadeIndex;
    if (newDecade !== activeDecade) {
      activeDecade = newDecade;
      if (animate) {
        decadeButtons[newDecade].scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "nearest",
          inline: "nearest"
        });
      }
    }
  }

  function movePage(offset) {
    goToPage(activePage + offset, true);
  }

  // 使用者自己捲動（觸控滑動、拖曳）時，找出最靠近的頁面並同步狀態
  function syncStateFromScroll() {
    if (isDragging) {
      return;
    }

    if (isProgrammaticScroll) {
      if (Math.abs(viewport.scrollLeft - programmaticScrollTarget) > 1) {
        return;
      }
      isProgrammaticScroll = false;
      window.clearTimeout(programmaticScrollTimer);
    }

    const track = content.querySelector("[data-certification-preview-track]");
    if (!track || track.children.length === 0) {
      return;
    }

    const pages = track.children;
    let nearest = 0;
    let nearestDistance = Infinity;

    for (let i = 0; i < pages.length; i++) {
      const pageLeft = pages[i].offsetLeft - pages[0].offsetLeft;
      const distance = Math.abs(pageLeft - viewport.scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = i;
      }
    }

    if (nearest !== activePage) {
      activePage = nearest;
      activeDecade = allPages[nearest].decadeIndex;
      updateControls();
    }
  }

  // ---------- 建立年代按鈕 ----------
  function bindDecadeButton(button, index) {
    button.addEventListener("click", function () {
      goToPage(decadeFirstPage[index], true);
    });

    button.addEventListener("keydown", function (event) {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = Math.min(index + 1, decadeButtons.length - 1);
      }
      if (event.key === "ArrowLeft") {
        nextIndex = Math.max(index - 1, 0);
      }
      if (event.key === "Home") {
        nextIndex = 0;
      }
      if (event.key === "End") {
        nextIndex = decadeButtons.length - 1;
      }

      if (nextIndex === index) {
        return;
      }

      event.preventDefault();
      goToPage(decadeFirstPage[nextIndex], true);
      decadeButtons[nextIndex].focus();
    });
  }

  for (let i = 0; i < decades.length; i++) {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "about-certifications-preview__decade";
    tab.setAttribute("role", "tab");
    tab.id = "certification-preview-decade-" + decades[i].start;
    tab.setAttribute("aria-controls", "certification-preview-content");
    tab.textContent = decades[i].label;
    decadeButtons.push(tab);
    decadeNavigation.append(tab);
    bindDecadeButton(tab, i);
  }
  decadeNavigation.style.setProperty("--decade-count", String(decades.length));

  // ---------- 建立分頁圓點 ----------
  const pagination = document.createElement("div");
  pagination.className = "about-certifications-preview__pagination";
  pagination.setAttribute("role", "group");
  pagination.setAttribute("aria-label", "認證與獎項內容頁次");
  controls.replaceChildren(pagination);

  function createDot(pageIndex) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "about-certifications-preview__dot";
    button.setAttribute("aria-label", "顯示第 " + (pageIndex + 1) + " 組認證與獎項");
    button.setAttribute("aria-current", "false");
    button.dataset.active = "false";
    button.addEventListener("click", function () {
      goToPage(pageIndex, true);
    });
    return button;
  }

  function renderPagination() {
    paginationButtons = [];
    pagination.replaceChildren();
    for (let i = 0; i < allPages.length; i++) {
      const dot = createDot(i);
      pagination.append(dot);
      paginationButtons.push(dot);
    }
  }

  // ---------- 建立每一頁的內容 ----------
  function createPage(pageData) {
    const years = pageData.years;
    const decade = decades[pageData.decadeIndex];

    const page = document.createElement("section");
    page.className = "about-certifications-preview__page";
    page.dataset.previewYearCount = String(years.length);
    const pageHeadingId = "certification-preview-" + decade.start + "-" + pageData.pageInDecade;
    page.setAttribute("aria-labelledby", pageHeadingId);

    // 年份標題列
    const yearsHeader = document.createElement("div");
    yearsHeader.className = "about-certifications-preview__years-header";
    yearsHeader.dataset.yearCount = String(years.length);
    yearsHeader.style.setProperty("--preview-year-count", String(years.length));

    // 時間軸圓點
    const timeline = document.createElement("div");
    timeline.className = "about-certifications-preview__timeline";
    timeline.style.setProperty("--preview-year-count", String(years.length));
    for (let i = 0; i < years.length; i++) {
      const node = document.createElement("span");
      node.className = "about-certifications-preview__timeline-node";
      node.dataset.active = i === 0 ? "true" : "false";
      node.setAttribute("aria-hidden", "true");
      timeline.append(node);
    }
    page.append(yearsHeader, timeline);

    // 每個年份一欄
    const yearsElement = document.createElement("div");
    yearsElement.className = "about-certifications-preview__years";
    yearsElement.dataset.yearCount = String(years.length);
    yearsElement.style.setProperty("--preview-year-count", String(years.length));

    for (let i = 0; i < years.length; i++) {
      const year = years[i].year;
      const yearEvents = years[i].events;

      const yearColumn = document.createElement("article");
      yearColumn.className = "about-certifications-preview__year-column";

      const yearHeading = document.createElement("h3");
      yearHeading.className = "about-certifications-preview__year";
      if (i === 0) {
        yearHeading.id = pageHeadingId;
      } else {
        yearHeading.id = "certification-preview-year-" + pageData.decadeIndex + "-" + pageData.pageInDecade + "-" + year;
      }
      yearHeading.textContent = year;
      yearsHeader.append(yearHeading);

      yearColumn.setAttribute("aria-labelledby", yearHeading.id);

      const events = document.createElement("div");
      events.className = "about-certifications-preview__events";
      for (let j = 0; j < yearEvents.length; j++) {
        const event = document.createElement("article");
        event.className = "about-certifications-preview__event";
        const heading = document.createElement("h4");
        heading.textContent = yearEvents[j];
        event.append(heading);
        events.append(event);
      }

      yearColumn.append(events);
      yearsElement.append(yearColumn);
    }

    page.append(yearsElement);
    return page;
  }

  // 讓每一欄的獎項區塊高度一致
  function syncEventHeights() {
    content.style.removeProperty("--preview-events-height");
    const eventGroups = content.querySelectorAll(".about-certifications-preview__events");
    if (eventGroups.length === 0) {
      return;
    }

    let maxHeight = 0;
    for (let i = 0; i < eventGroups.length; i++) {
      const height = eventGroups[i].getBoundingClientRect().height;
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
    content.style.setProperty("--preview-events-height", Math.ceil(maxHeight) + "px");
  }

  // 依 viewport 寬度設定每一頁的寬度
  function syncPageWidths() {
    const pageWidth = viewport.clientWidth;
    const pages = content.querySelectorAll(".about-certifications-preview__page");
    if (pages.length === 0 || pageWidth <= 0) {
      return;
    }

    // 手機版：一頁就是一個 viewport 寬
    if (!window.matchMedia("(min-width: 768px)").matches) {
      for (let i = 0; i < pages.length; i++) {
        pages[i].style.removeProperty("--preview-column-width");
        pages[i].style.width = pageWidth + "px";
        pages[i].style.flexBasis = pageWidth + "px";
      }
      return;
    }

    // 桌機版：每欄寬度固定，最後一頁年份較少就比較窄
    const pageStyles = window.getComputedStyle(pages[0]);
    const columnGap = parseFloat(pageStyles.columnGap) || 0;
    const columnWidth = (pageWidth - ((pageSize - 1) * columnGap)) / pageSize;

    for (let i = 0; i < pages.length; i++) {
      const yearCount = Number(pages[i].dataset.previewYearCount) || 1;
      const pageContentWidth = (yearCount * columnWidth) + ((yearCount - 1) * columnGap);
      pages[i].style.setProperty("--preview-column-width", columnWidth + "px");
      pages[i].style.width = pageContentWidth + "px";
      pages[i].style.flexBasis = pageContentWidth + "px";
    }
  }

  function renderTrack() {
    if (allPages.length === 0) {
      return;
    }

    const track = document.createElement("div");
    track.className = "about-certifications-preview__track";
    track.setAttribute("data-certification-preview-track", "");
    for (let i = 0; i < allPages.length; i++) {
      track.append(createPage(allPages[i]));
    }

    content.replaceChildren(track);
    syncPageWidths();
    renderPagination();
    syncEventHeights();
    goToPage(activePage, false);
  }

  // ---------- 滑鼠拖曳翻頁（觸控裝置保留原生橫向捲動） ----------
  function finishMouseDrag(event) {
    if (!isDragging) {
      return;
    }
    isDragging = false;
    viewport.classList.remove("is-dragging");
    if (event && viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    syncStateFromScroll();
  }

  viewport.addEventListener("pointerdown", function (event) {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      viewport.classList.remove("is-mouse-dragged");
      return;
    }

    if (event.target.closest("button")) {
      return;
    }

    isDragging = true;
    dragStartX = event.clientX;
    dragStartScrollLeft = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  viewport.addEventListener("pointermove", function (event) {
    if (!isDragging) {
      return;
    }
    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) > 4) {
      viewport.classList.add("is-dragging");
      viewport.classList.add("is-mouse-dragged");
      viewport.scrollLeft = dragStartScrollLeft - distance;
    }
  });

  viewport.addEventListener("pointerup", finishMouseDrag);
  viewport.addEventListener("pointercancel", finishMouseDrag);
  viewport.addEventListener("scroll", syncStateFromScroll, { passive: true });
  viewport.addEventListener("scrollend", function () {
    if (!isProgrammaticScroll) {
      return;
    }
    syncStateFromScroll();
  });

  // 觸控板橫向滑動時，一次翻一頁
  viewport.addEventListener("wheel", function (event) {
    const isMostlyVertical = Math.abs(event.deltaX) <= Math.abs(event.deltaY);
    const horizontalMovementIsSmall = Math.abs(event.deltaX) < 16;

    if (isMostlyVertical || horizontalMovementIsSmall) {
      return;
    }

    event.preventDefault();
    movePage(event.deltaX > 0 ? 1 : -1);
  }, { passive: false });

  // 視窗大小改變
  window.addEventListener("resize", function () {
    const nextPageSize = getPageSize();

    // 每頁數量沒變，只需要重新量寬度
    if (nextPageSize === pageSize) {
      syncPageWidths();
      syncEventHeights();
      goToPage(activePage, false);
      return;
    }

    // 每頁數量變了，要重新分頁並回到第一頁
    pageSize = nextPageSize;
    activePage = 0;
    activeDecade = -1;
    buildPages();
    renderTrack();
  });

  // ---------- 開始 ----------
  buildPages();
  renderTrack();
}

document.addEventListener("DOMContentLoaded", function () {
  initCertificationPreview();
});
