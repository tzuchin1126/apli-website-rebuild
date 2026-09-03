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

function setupAboutScrollMotion() {
  const page = document.querySelector(".about-page");
  if (!page) {
    return;
  }

  const lead = page.querySelector(".about-profile__lead");
  const facts = page.querySelector(".about-profile__facts");
  const certifications = page.querySelector(".about-certifications-preview");

  const targets = [];
  if (lead) targets.push(lead);
  if (facts) targets.push(facts);
  if (certifications) targets.push(certifications);
  if (targets.length === 0) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const counters = [];
  if (facts) {
    const factValues = facts.querySelectorAll(".about-profile__fact-value");
    for (let i = 0; i < factValues.length; i++) {
      const el = factValues[i];
      const originalText = el.textContent.trim();
      const target = Number(originalText.replace(/[^\d.-]/g, ""));
      const suffix = originalText.indexOf("+") !== -1 ? "+" : "";
      if (Number.isFinite(target)) {
        counters.push({ el: el, target: target, suffix: suffix });
      }
    }
  }

  page.classList.add("about-motion-ready");

  function setFinalCounterValues() {
    counters.forEach(function (counter) {
      counter.el.textContent = counter.target.toLocaleString("en-US") + counter.suffix;
    });
  }

  function animateCounters() {
    if (reducedMotion.matches) {
      setFinalCounterValues();
      return;
    }

    counters.forEach(function (counter, index) {
      const duration = 1100;
      const delay = index * 80;
      const startTime = performance.now() + delay;

      function update(timestamp) {
        if (timestamp < startTime) {
          window.requestAnimationFrame(update);
          return;
        }
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.el.textContent = Math.round(counter.target * eased).toLocaleString("en-US") + counter.suffix;
        if (progress < 1) {
          window.requestAnimationFrame(update);
        }
      }

      counter.el.textContent = "0" + counter.suffix;
      window.requestAnimationFrame(update);
    });
  }

  function reveal(target) {
    target.classList.add("is-visible");
    if (target === facts) {
      animateCounters();
    }
  }

  if (reducedMotion.matches) {
    targets.forEach(reveal);
    setFinalCounterValues();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    // 舊瀏覽器沒有 IntersectionObserver，改用 scroll/resize 自己算元素是否進入畫面
    function revealVisibleTargets() {
      targets.forEach(function (target) {
        if (target.classList.contains("is-visible")) return;
        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.12) {
          reveal(target);
        }
      });
      const allVisible = targets.every(function (target) {
        return target.classList.contains("is-visible");
      });
      if (allVisible) {
        window.removeEventListener("scroll", revealVisibleTargets);
        window.removeEventListener("resize", revealVisibleTargets);
      }
    }

    window.addEventListener("scroll", revealVisibleTargets, { passive: true });
    window.addEventListener("resize", revealVisibleTargets);
    revealVisibleTargets();
    return;
  }

  const observer = new IntersectionObserver(function (entries, currentObserver) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

  targets.forEach(function (target) {
    observer.observe(target);
  });

  reducedMotion.addEventListener("change", function () {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    targets.forEach(reveal);
    setFinalCounterValues();
  }, { once: true });
}

function initCertificationPreview() {
  const preview = document.querySelector("[data-certification-preview]");
  if (!preview) {
    return;
  }
  const nav = preview.querySelector("[data-certification-preview-nav]");
  const controls = preview.querySelector("[data-certification-preview-controls]");
  const viewport = preview.querySelector(".about-certifications-preview__content-shell");
  const content = preview.querySelector("[data-certification-preview-content]");
  if (!nav || !controls || !viewport || !content) {
    return;
  }

  // 第一步：把獎項依年份分組
  const eventsByYear = {};
  certificationPreviewEvents.forEach(function (item) {
    if (!eventsByYear[item.year]) {
      eventsByYear[item.year] = [];
    }
    eventsByYear[item.year].push(item.title);
  });

  // 第二步：把年份依「年代」分組，例如 2021、2023、2024 都屬於 2020s
  const yearsByDecade = {};
  Object.keys(eventsByYear).forEach(function (year) {
    const yearNumber = Number(year);
    if (!Number.isInteger(yearNumber)) return;
    const decadeStart = Math.floor(yearNumber / 10) * 10;
    if (!yearsByDecade[decadeStart]) {
      yearsByDecade[decadeStart] = [];
    }
    yearsByDecade[decadeStart].push({ year: year, events: eventsByYear[year] });
  });

  const decadeStarts = Object.keys(yearsByDecade).map(Number);
  decadeStarts.sort(function (a, b) {
    return b - a;
  });

  const decades = decadeStarts.map(function (start) {
    const years = yearsByDecade[start].slice();
    years.sort(function (a, b) {
      return Number(b.year) - Number(a.year);
    });
    return { start: start, label: start + "s", years: years };
  });

  if (decades.length === 0) {
    return;
  }

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
    const entries = decade.years.slice();
    const pages = [];
    for (let index = 0; index < entries.length; index += pageSize) {
      pages.push(entries.slice(index, index + pageSize));
    }
    return pages;
  }

  // pageOffsets[i] 記錄第 i 個年代的第一頁，攤平到整條 track 之後排在第幾頁，
  // 用來把「第幾個年代、第幾頁」換算成 track 裡的單一頁碼
  function rebuildPageSets() {
    pageSets = decades.map(getPages);
    pageOffsets = [];
    let offset = 0;
    pageSets.forEach(function (pages) {
      pageOffsets.push(offset);
      offset += pages.length;
    });
  }

  function markActiveDecadeButton(index) {
    decadeButtons.forEach(function (button, buttonIndex) {
      const active = buttonIndex === index;
      button.dataset.active = active ? "true" : "false";
      button.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  decades.forEach(function (decade) {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.id = "certification-preview-decade-" + decade.start;
    tab.setAttribute("aria-controls", "certification-preview-content");
    tab.textContent = decade.label;
    nav.append(tab);
    decadeButtons.push(tab);
  });
  markActiveDecadeButton(0);

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

  function setTrackPosition(animate) {
    if (animate === undefined) animate = true;
    const track = content.querySelector("[data-certification-preview-track]");
    if (!track) return;
    const firstPage = track.firstElementChild;
    if (!firstPage) return;

    const globalPageIndex = pageOffsets[activeDecadeIndex] + activePageIndex;
    const targetPage = track.children[globalPageIndex];
    let pageStep;
    if (targetPage) {
      pageStep = targetPage.offsetLeft - firstPage.offsetLeft;
    } else {
      pageStep = firstPage.offsetWidth + 16;
    }

    viewport.classList.toggle("is-track-advanced", globalPageIndex > 0);
    viewport.scrollTo({
      left: pageStep,
      behavior: animate && !reduceMotion ? "smooth" : "auto",
    });

    for (let i = 0; i < track.children.length; i++) {
      track.children[i].setAttribute("aria-hidden", i === globalPageIndex ? "false" : "true");
    }
  }

  function syncStateFromScroll() {
    const track = content.querySelector("[data-certification-preview-track]");
    if (!track) return;
    const firstPage = track.firstElementChild;
    if (!firstPage || pageSets.length === 0) return;

    const currentOffset = viewport.scrollLeft;
    let nearestPageIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < track.children.length; i++) {
      const page = track.children[i];
      const pageOffset = page.offsetLeft - firstPage.offsetLeft;
      const distance = Math.abs(pageOffset - currentOffset);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPageIndex = i;
      }
    }

    let nextDecadeIndex = pageOffsets.length - 1;
    for (let i = 0; i < pageOffsets.length; i++) {
      if (nearestPageIndex < pageOffsets[i] + pageSets[i].length) {
        nextDecadeIndex = i;
        break;
      }
    }
    const nextPageIndex = nearestPageIndex - pageOffsets[nextDecadeIndex];
    if (nextDecadeIndex === activeDecadeIndex && nextPageIndex === activePageIndex) return;

    activeDecadeIndex = nextDecadeIndex;
    activePageIndex = nextPageIndex;
    markActiveDecadeButton(activeDecadeIndex);
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
    const pageHeadingId = "certification-preview-" + decade.start + "-" + pageIndex;
    page.setAttribute("aria-labelledby", pageHeadingId);

    const timeline = document.createElement("div");
    timeline.className = "about-certifications-preview__timeline";
    timeline.style.setProperty("--preview-year-count", String(years.length));
    years.forEach(function (yearEntry, yearIndex) {
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
    years.forEach(function (yearEntry) {
      const year = yearEntry.year;
      const yearEvents = yearEntry.events;

      const yearColumn = document.createElement("article");
      yearColumn.className = "about-certifications-preview__year-column";

      const yearHeading = document.createElement("h3");
      yearHeading.className = "about-certifications-preview__year";
      yearHeading.id = year === years[0].year
        ? pageHeadingId
        : "certification-preview-year-" + decadeIndex + "-" + pageIndex + "-" + year;
      yearHeading.textContent = year;

      const events = document.createElement("div");
      events.className = "about-certifications-preview__events";
      yearEvents.forEach(function (title) {
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
    const eventGroups = content.querySelectorAll(".about-certifications-preview__events");
    if (eventGroups.length === 0) return;
    let maxHeight = 0;
    for (let i = 0; i < eventGroups.length; i++) {
      const height = eventGroups[i].getBoundingClientRect().height;
      if (height > maxHeight) maxHeight = height;
    }
    content.style.setProperty("--preview-events-height", Math.ceil(maxHeight) + "px");
  }

  function renderTrack() {
    if (pageSets.length === 0) return;
    const sharedTimelineTrack = document.createElement("div");
    sharedTimelineTrack.className = "about-certifications-preview__shared-track";
    sharedTimelineTrack.setAttribute("aria-hidden", "true");

    const track = document.createElement("div");
    track.className = "about-certifications-preview__track";
    track.setAttribute("data-certification-preview-track", "");
    pageSets.forEach(function (pages, decadeIndex) {
      const decade = decades[decadeIndex];
      pages.forEach(function (years, pageIndex) {
        track.append(createPage(years, decade, decadeIndex, pageIndex));
      });
    });
    content.replaceChildren(sharedTimelineTrack, track);
    syncEventHeights();
    setTrackPosition(false);
    updateControls();
  }

  function activateDecade(index, moveFocus) {
    if (index < 0 || index >= decadeButtons.length) return;
    activeDecadeIndex = index;
    activePageIndex = 0;
    markActiveDecadeButton(index);
    setTrackPosition(true);
    updateControls();
    if (moveFocus) {
      decadeButtons[index].focus();
      if (decadeButtons[index].scrollIntoView) {
        decadeButtons[index].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "nearest" });
      }
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
      markActiveDecadeButton(activeDecadeIndex);
      decadeButtons[activeDecadeIndex].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "nearest" });
    }
    setTrackPosition(true);
    updateControls();
  }

  decadeButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      activateDecade(index);
    });
    button.addEventListener("keydown", function (event) {
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

  previousButton.addEventListener("click", function () {
    movePage(-1);
  });
  nextButton.addEventListener("click", function () {
    movePage(1);
  });

  // 滑鼠拖曳 viewport 也能翻頁；觸控裝置本來就有原生 scroll，不用另外處理
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;

  viewport.addEventListener("mousedown", function (event) {
    if (event.button !== 0) return;
    if (event.target.closest("button")) return;
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
    rebuildPageSets();
    renderTrack();
  });

  activeDecadeIndex = 0;
  rebuildPageSets();
  renderTrack();
  activateDecade(0);
}

document.addEventListener("DOMContentLoaded", function () {
  setupAboutScrollMotion();
  initCertificationPreview();
});