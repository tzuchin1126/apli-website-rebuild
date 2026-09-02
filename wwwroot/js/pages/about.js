(() => {
  if (window.location.hash) return;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const resetEntryPosition = () => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  };

  resetEntryPosition();
  window.addEventListener("pageshow", resetEntryPosition);
})();

const certificationPreviewEvents = [
  { year: "2025", title: "取得職業安全衛生管理系統通過 ISO 45001:2018 驗證" },
  { year: "2025", title: "獲國立體育大學頒發「113年度捐助興學紀念－嘉惠國體」" },
  { year: "2025", title: "獲高雄市旗津區旗津國民小學頒發感謝狀（贊助114學年度推廣品格教育「師恩在心、四維同行」禮義廉恥揭牌典禮）" },
  { year: "2024", title: "榮獲臺灣港務股份有限公司「113年度裝卸承攬業金舫獎」" },
  { year: "2024", title: "榮獲教育部體育署「運動好人才・企業動起來」表率群倫獎（推動企業聘用運動指導員）" },
  { year: "2023", title: "榮獲 1111 人力銀行「幸福企業」銀獎" },
  { year: "2023", title: "榮獲臺灣港務股份有限公司「112年度裝卸承攬業金舫獎」" },
  { year: "2021", title: "榮獲臺灣港務股份有限公司「110年度裝卸承攬業金舫獎」" },
  { year: "2019", title: "榮獲臺灣港務股份有限公司「108年度裝卸承攬業金舫獎」" },
  { year: "2017", title: "獲屏東市華山社區發展協會頒發「第2屆華山論健‧愛心健走」感謝狀（鼎力協助舉辦活動）" },
  { year: "2017", title: "獲頒第63屆航海節高雄區慶祝大會籌備會「105年度高雄港貨櫃裝卸作業量績效斐然」獎座" },
  { year: "2016", title: "榮獲臺灣港務股份有限公司「105年度裝卸承攬業貨櫃類金舫獎」" },
  { year: "2016", title: "榮獲鴻明船舶貨物裝卸承攬股份有限公司「105年度高雄地區安全衛生優良協力廠商」" },
  { year: "2016", title: "獲頒第62屆航海節高雄區慶祝大會籌備會「104年度高雄港裝卸貨櫃作業量績效卓越」獎座" },
  { year: "2015", title: "獲頒第61屆航海節高雄區慶祝大會籌備會「103年度高雄港裝卸貨櫃作業量績效卓越」獎座" },
  { year: "2015", title: "榮獲陽明海運股份有限公司「104年度高雄地區優良協力廠商」" },
  { year: "2014", title: "榮獲臺灣港務股份有限公司「103年度貨櫃裝卸承攬業金舫獎」" },
  { year: "2014", title: "獲頒第61屆航海節高雄區慶祝大會籌備會「102年度高雄港裝卸貨櫃作業量績效斐然」獎座" },
  { year: "2014", title: "榮獲高雄市後備指揮部辦理年度國防工業緩召業務評比績優單位" },
  { year: "2014", title: "榮獲第60屆航海節高雄區羽球聯誼賽冠軍" },
  { year: "2013", title: "榮獲臺灣港務股份有限公司「客戶貢獻獎」(獎證字第1020301026號)" },
  { year: "2013", title: "獲頒第59屆航海節高雄區慶祝大會籌備會「101年度高雄港裝卸貨櫃作業量績效卓越」獎座" },
  { year: "2013", title: "榮獲陽明海運股份有限公司「102年度高雄地區優良協力廠商」" },
  { year: "2013", title: "榮獲臺灣港務股份有限公司「最佳貢獻獎」" },
  { year: "2012", title: "受頒發第58屆航海節高雄區羽球聯誼賽提供亞柏舘使本活動順利圓滿" },
  { year: "2011", title: "榮獲交通部高雄港務局「100年度本港裝卸貨櫃作業量績效卓越」獎" },
  { year: "2010", title: "榮獲交通部高雄港務局「99年度本港裝卸貨櫃作業量業績斐然」獎" },
  { year: "2009", title: "世新貨櫃獲頒萬海航運股份有限公司「共創年作業量達100萬TEU」紀念獎座" },
  { year: "2009", title: "獲頒萬海航運股份有限公司「共創年作業量達100萬TEU」紀念獎座" },
  { year: "2009", title: "榮獲交通部高雄港務局「98年度本港裝卸貨櫃作業量績效卓越」獎" },
  { year: "2008", title: "世新貨櫃榮獲Textainer Equipment Management「2008年度最佳貨櫃場獎」(Depot of the Year)" },
  { year: "2008", title: "榮獲交通部高雄港務局「97年度推行勞工安全衛生工安優良」獎" },
  { year: "2007", title: "榮登「TOP5000經營績效傑出企業」認證" },
  { year: "2006", title: "世新貨櫃榮獲Textainer Equipment Management「2006年度最佳貨櫃場獎」(Depot of the Year)" },
  { year: "2006", title: "公司前身亞太儲運股份有限公司榮獲交通部高雄港務局「95年度本港貨櫃裝卸作業量名列前茅」獎" },
  { year: "2005", title: "世新貨櫃榮獲Florens Container Services「2005年度全球卓越貨櫃場獎」(Worldwide Recognition For Depot Excellence)" },
  { year: "2005", title: "公司前身亞太儲運股份有限公司榮獲交通部高雄港務局「94年度本港貨櫃裝卸量名列前茅、績效卓著」感謝獎" },
];

function initAboutHeroMotion() {
  const image = document.querySelector(".about-page .about-hero .page-hero__image");
  if (!image) return;

  const startZoomOut = () => {
    window.requestAnimationFrame(() => image.classList.add("is-loaded"));
  };

  if (image.complete) {
    startZoomOut();
    return;
  }

  image.addEventListener("load", startZoomOut, { once: true });
}

/**
 * 認證與獎項新版區塊：依年代與年份組瀏覽既有獎項資料。
 */
function initCertificationPreview() {
  const preview = document.querySelector("[data-certification-preview]");
  const nav = preview?.querySelector("[data-certification-preview-nav]");
  const controls = preview?.querySelector("[data-certification-preview-controls]");
  const viewport = preview?.querySelector(".about-certifications-preview__content-shell");
  const content = preview?.querySelector("[data-certification-preview-content]");
  if (!preview || !nav || !controls || !viewport || !content) return;

  const groupedEvents = new Map();
  certificationPreviewEvents.forEach(({ year, title }) => {
    if (!groupedEvents.has(year)) groupedEvents.set(year, []);
    groupedEvents.get(year).push(title);
  });

  const decadesByStart = new Map();
  groupedEvents.forEach((events, year) => {
    const yearNumber = Number(year);
    if (!Number.isInteger(yearNumber)) return;
    const decadeStart = Math.floor(yearNumber / 10) * 10;
    if (!decadesByStart.has(decadeStart)) decadesByStart.set(decadeStart, []);
    decadesByStart.get(decadeStart).push({ year, events });
  });
  const decades = [...decadesByStart.entries()]
    .sort(([first], [second]) => second - first)
    .map(([start, years]) => ({
      start,
      label: `${start}s`,
      years: years.sort((first, second) => Number(second.year) - Number(first.year)),
    }));
  if (!decades.length) return;

  const decadeButtons = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeDecadeIndex = -1;
  let activePageIndex = 0;
  let pageSize = getPageSize();
  let pageSets = [];
  let pageOffsets = [];

  function getPageSize() {
    if (window.matchMedia("(min-width: 1440px)").matches) return 4;
    if (window.matchMedia("(min-width: 1200px)").matches) return 3;
    if (window.matchMedia("(min-width: 768px)").matches) return 2;
    return 1;
  }

  function getPages(decade) {
    const entries = [...decade.years];
    const pages = [];
    for (let index = 0; index < entries.length; index += pageSize) {
      pages.push(entries.slice(index, index + pageSize));
    }
    return pages;
  }

  function rebuildPageSets() {
    pageSets = decades.map((decade) => getPages(decade));
    pageOffsets = [];
    let offset = 0;
    pageSets.forEach((pages) => {
      pageOffsets.push(offset);
      offset += pages.length;
    });
  }

  decades.forEach((decade, decadeIndex) => {
    const buttonId = `certification-preview-decade-${decade.start}`;
    const tab = document.createElement("button");
    tab.type = "button";
    tab.id = buttonId;
    tab.setAttribute("aria-controls", "certification-preview-content");
    tab.setAttribute("aria-current", decadeIndex === 0 ? "true" : "false");
    tab.dataset.active = decadeIndex === 0 ? "true" : "false";
    tab.textContent = decade.label;
    nav.append(tab);
    decadeButtons.push(tab);
  });

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "about-certifications-preview__control";
  previousButton.setAttribute("aria-label", "較新的年份");
  previousButton.textContent = "←";
  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "about-certifications-preview__control";
  nextButton.setAttribute("aria-label", "較舊的年份");
  nextButton.textContent = "→";
  controls.replaceChildren(previousButton, nextButton);

  function setTrackPosition(animate = true) {
    const track = content.querySelector("[data-certification-preview-track]");
    const firstPage = track?.firstElementChild;
    if (!track || !firstPage) return;
    const globalPageIndex = pageOffsets[activeDecadeIndex] + activePageIndex;
    const targetPage = track.children[globalPageIndex];
    const pageStep = targetPage
      ? targetPage.offsetLeft - firstPage.offsetLeft
      : firstPage.offsetWidth + 16;
    viewport.classList.toggle("is-track-advanced", globalPageIndex > 0);
    viewport.scrollTo({
      left: pageStep,
      behavior: animate && !reduceMotion ? "smooth" : "auto",
    });
    [...track.children].forEach((page, pageIndex) => {
      page.setAttribute("aria-hidden", pageIndex === globalPageIndex ? "false" : "true");
    });
  }

  function syncStateFromScroll() {
    const track = content.querySelector("[data-certification-preview-track]");
    const firstPage = track?.firstElementChild;
    if (!track || !firstPage || !pageSets.length) return;

    const currentOffset = viewport.scrollLeft;
    let nearestPageIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    [...track.children].forEach((page, pageIndex) => {
      const pageOffset = page.offsetLeft - firstPage.offsetLeft;
      const distance = Math.abs(pageOffset - currentOffset);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPageIndex = pageIndex;
      }
    });

    let nextDecadeIndex = pageOffsets.length - 1;
    for (let index = 0; index < pageOffsets.length; index += 1) {
      if (nearestPageIndex < pageOffsets[index] + pageSets[index].length) {
        nextDecadeIndex = index;
        break;
      }
    }
    const nextPageIndex = nearestPageIndex - pageOffsets[nextDecadeIndex];
    if (nextDecadeIndex === activeDecadeIndex && nextPageIndex === activePageIndex) return;

    activeDecadeIndex = nextDecadeIndex;
    activePageIndex = nextPageIndex;
    decadeButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === activeDecadeIndex;
      button.dataset.active = active ? "true" : "false";
      button.setAttribute("aria-current", active ? "true" : "false");
    });
    updateControls();
  }

  function updateControls() {
    const decade = decades[activeDecadeIndex];
    const pages = getPages(decade);
    const isFirstPage = activeDecadeIndex === 0 && activePageIndex === 0;
    const isLastPage = activeDecadeIndex === decades.length - 1 && activePageIndex === pages.length - 1;
    previousButton.disabled = isFirstPage;
    nextButton.disabled = isLastPage;
  }

  function createPage(years, decade, decadeIndex, pageIndex) {
    const page = document.createElement("section");
    page.className = "about-certifications-preview__page";
    page.dataset.previewYearCount = String(years.length);
    const pageHeadingId = `certification-preview-${decade.start}-${pageIndex}`;
    page.setAttribute("aria-labelledby", pageHeadingId);

    const timeline = document.createElement("div");
    timeline.className = "about-certifications-preview__timeline";
    timeline.style.setProperty("--preview-year-count", String(years.length));
    years.forEach((yearEntry, yearIndex) => {
      const node = document.createElement("span");
      node.className = "about-certifications-preview__timeline-node";
      node.dataset.active = yearIndex === 0 ? "true" : "false";
      node.setAttribute("aria-hidden", "true");
      timeline.append(node);
    });
    page.append(timeline);

    const yearsElement = document.createElement("div");
    yearsElement.className = "about-certifications-preview__years";
    yearsElement.dataset.yearCount = String(years.length);
    yearsElement.style.setProperty("--preview-year-count", String(years.length));
    years.forEach(({ year, events: yearEvents }) => {
      const yearColumn = document.createElement("article");
      yearColumn.className = "about-certifications-preview__year-column";

      const yearHeading = document.createElement("h3");
      yearHeading.className = "about-certifications-preview__year";
      yearHeading.id = year === years[0].year
        ? pageHeadingId
        : `certification-preview-year-${decadeIndex}-${pageIndex}-${year}`;
      yearHeading.textContent = year;

      const events = document.createElement("div");
      events.className = "about-certifications-preview__events";
      yearEvents.forEach((title, eventIndex) => {
        const event = document.createElement("article");
        event.className = "about-certifications-preview__event";

        const heading = document.createElement("h4");
        heading.textContent = title;
        event.append(heading);
        events.append(event);
      });
      yearColumn.append(yearHeading, events);
      yearsElement.append(yearColumn);
    });
    page.append(yearsElement);
    return page;
  }

  function syncEventHeights() {
    content.style.removeProperty("--preview-events-height");
    const eventGroups = [...content.querySelectorAll(".about-certifications-preview__events")];
    if (!eventGroups.length) return;
    const maxHeight = Math.max(...eventGroups.map((events) => events.getBoundingClientRect().height));
    content.style.setProperty("--preview-events-height", `${Math.ceil(maxHeight)}px`);
  }

  function renderTrack() {
    if (!pageSets.length) return;
    const sharedTimelineTrack = document.createElement("div");
    sharedTimelineTrack.className = "about-certifications-preview__shared-track";
    sharedTimelineTrack.setAttribute("aria-hidden", "true");

    const track = document.createElement("div");
    track.className = "about-certifications-preview__track";
    track.setAttribute("data-certification-preview-track", "");
    pageSets.forEach((pages, decadeIndex) => {
      const decade = decades[decadeIndex];
      pages.forEach((years, pageIndex) => track.append(createPage(years, decade, decadeIndex, pageIndex)));
    });
    content.replaceChildren(sharedTimelineTrack, track);
    syncEventHeights();
    setTrackPosition(false);
    updateControls();
  }

  function activateDecade(index, moveFocus = false) {
    if (index < 0 || index >= decadeButtons.length) return;
    activeDecadeIndex = index;
    activePageIndex = 0;
    decadeButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.dataset.active = active ? "true" : "false";
      button.setAttribute("aria-current", active ? "true" : "false");
    });
    setTrackPosition(true);
    updateControls();
    if (moveFocus) decadeButtons[index].focus();
    if (moveFocus && decadeButtons[index].scrollIntoView) {
      decadeButtons[index].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "nearest" });
    }
  }

  function movePage(offset) {
    const pages = getPages(decades[activeDecadeIndex]);
    let nextDecadeIndex = activeDecadeIndex;
    let nextPageIndex = activePageIndex + offset;
    if (nextPageIndex < 0 && activeDecadeIndex > 0) {
      nextDecadeIndex -= 1;
      nextPageIndex = getPages(decades[nextDecadeIndex]).length - 1;
    } else if (nextPageIndex >= pages.length && activeDecadeIndex < decades.length - 1) {
      nextDecadeIndex += 1;
      nextPageIndex = 0;
    }
    if (nextDecadeIndex === activeDecadeIndex) {
      const boundedPageIndex = Math.max(0, Math.min(nextPageIndex, pages.length - 1));
      if (boundedPageIndex === activePageIndex) return;
      activePageIndex = boundedPageIndex;
    } else {
      activeDecadeIndex = nextDecadeIndex;
      activePageIndex = nextPageIndex;
      decadeButtons.forEach((button, buttonIndex) => {
        const active = buttonIndex === activeDecadeIndex;
        button.dataset.active = active ? "true" : "false";
        button.setAttribute("aria-current", active ? "true" : "false");
      });
      decadeButtons[activeDecadeIndex].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "nearest" });
    }
    setTrackPosition(true);
    updateControls();
  }

  decadeButtons.forEach((button, index) => {
    button.addEventListener("click", () => activateDecade(index));
    button.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = Math.min(index + 1, decadeButtons.length - 1);
      if (event.key === "ArrowLeft") nextIndex = Math.max(index - 1, 0);
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = decadeButtons.length - 1;
      if (nextIndex === index) return;
      event.preventDefault();
      activateDecade(nextIndex, true);
    });
  });

  previousButton.addEventListener("click", () => movePage(-1));
  nextButton.addEventListener("click", () => movePage(1));
  let dragState = null;
  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (event.target.closest("button")) return;
    dragState = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: viewport.scrollLeft, distance: 0, moved: false };
    viewport.setPointerCapture?.(event.pointerId);
  });
  viewport.addEventListener("pointermove", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    dragState.distance = event.clientX - dragState.startX;
    if (Math.abs(dragState.distance) <= 4) return;
    dragState.moved = true;
    viewport.classList.add("is-dragging");
    viewport.scrollLeft = dragState.startScrollLeft - dragState.distance;
    event.preventDefault();
  });
  function stopDragging(event) {
    if (!dragState || (event && event.pointerId !== dragState.pointerId)) return;
    const { pointerId } = dragState;
    dragState = null;
    viewport.classList.remove("is-dragging");
    if (event && viewport.hasPointerCapture?.(pointerId)) viewport.releasePointerCapture(pointerId);
    syncStateFromScroll();
    setTrackPosition(true);
  }
  viewport.addEventListener("pointerup", stopDragging);
  viewport.addEventListener("pointercancel", stopDragging);
  viewport.addEventListener("lostpointercapture", stopDragging);
  viewport.addEventListener("scroll", syncStateFromScroll, { passive: true });
  viewport.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 16) return;
    event.preventDefault();
    movePage(event.deltaX > 0 ? 1 : -1);
  }, { passive: false });
  window.addEventListener("resize", () => {
    const nextPageSize = getPageSize();
    if (nextPageSize === pageSize) {
      syncEventHeights();
      setTrackPosition(false);
      return;
    }
    pageSize = nextPageSize;
    activePageIndex = 0;
    rebuildPageSets();
    renderTrack();
  });

  activeDecadeIndex = 0;
  rebuildPageSets();
  renderTrack();
  activateDecade(0);
}

document.addEventListener("DOMContentLoaded", () => {
  initAboutHeroMotion();
  initCertificationPreview();
});
