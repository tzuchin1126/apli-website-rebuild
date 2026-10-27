//進入頁面or重整頁面時，從最上方開始看，不會停在上次捲動的位置
function resetEntryPosition() {
  if (window.location.hash) {
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

window.history.scrollRestoration = "manual";
window.addEventListener("pageshow", resetEntryPosition);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------
// 認證與獎項資料
// 注意：資料必須維持「由新到舊」排列，下面的分組函式才會正確
// ---------------------------------------------------------------
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

// ---------------------------------------------------------------
// 關於我們頁：區塊捲動到畫面時淡入
// ---------------------------------------------------------------
function setupAboutScrollMotion() {
  const page = document.querySelector(".about-page");
  if (!page) {
    return;
  }
  if (reduceMotion) {
    return;
  }

  const profile = page.querySelector(".about-profile");
  const sections = page.querySelectorAll(".about-certifications-preview");
  const enterpriseCards = page.querySelectorAll(".about-enterprise-values__card");

  // 把所有要淡入的元素放進同一個陣列
  const revealTargets = [];
  if (profile) {
    profile.classList.add("about-profile-reveal");
    revealTargets.push(profile);
  }
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.add("about-scroll-reveal");
    revealTargets.push(sections[i]);
  }
  for (let i = 0; i < enterpriseCards.length; i++) {
    enterpriseCards[i].classList.add("about-scroll-reveal");
    revealTargets.push(enterpriseCards[i]);
  }

  if (revealTargets.length === 0) {
    return;
  }

  page.classList.add("about-motion-ready");

  // 有圖片的區塊，等圖片載入完再淡入，避免畫面跳動
  function revealSection(section) {
    function reveal() {
      section.classList.add("is-visible");
    }

    const image = section.querySelector(".about-enterprise-values__media img");
    if (!image || image.complete) {
      reveal();
      return;
    }

    image.addEventListener("load", reveal, { once: true });
    image.addEventListener("error", reveal, { once: true });
  }

  const observer = new IntersectionObserver(function (entries, currentObserver) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (!entry.isIntersecting) {
        continue;
      }
      revealSection(entry.target);
      currentObserver.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

  for (let i = 0; i < revealTargets.length; i++) {
    observer.observe(revealTargets[i]);
  }
}

// ---------------------------------------------------------------
// 把資料分成「年代 → 年份 → 獎項」三層
// 結果長這樣：
// [ { start: 2020, label: "2020s", years: [ { year: "2025", events: ["...", "..."] } ] } ]
// ---------------------------------------------------------------
function groupEvents(events) {
  const result = [];
  let currentDecade = null;
  let currentYear = null;

  for (let i = 0; i < events.length; i++) {
    const item = events[i];
    const start = Math.floor(Number(item.year) / 10) * 10;

    // 換到新的年代，就開一個新的年代物件
    if (currentDecade === null || currentDecade.start !== start) {
      currentDecade = { start: start, label: start + "s", years: [] };
      result.push(currentDecade);
      currentYear = null;
    }

    // 換到新的年份，就開一個新的年份物件
    if (currentYear === null || currentYear.year !== item.year) {
      currentYear = { year: item.year, events: [] };
      currentDecade.years.push(currentYear);
    }

    currentYear.events.push(item.title);
  }

  return result;
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
  if (!controls || !decadeNavigation || !viewport || !content) {
    return;
  }

  const decades = groupEvents(certificationPreviewEvents);
  if (decades.length === 0) {
    return;
  }

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
      viewport.scrollTo({ left: left, behavior: "smooth" });
    } else {
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

    const sharedTimelineTrack = document.createElement("div");
    sharedTimelineTrack.className = "about-certifications-preview__shared-track";
    sharedTimelineTrack.setAttribute("aria-hidden", "true");

    const track = document.createElement("div");
    track.className = "about-certifications-preview__track";
    track.setAttribute("data-certification-preview-track", "");
    for (let i = 0; i < allPages.length; i++) {
      track.append(createPage(allPages[i]));
    }

    content.replaceChildren(sharedTimelineTrack, track);
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
  setupAboutScrollMotion();
  initCertificationPreview();
});