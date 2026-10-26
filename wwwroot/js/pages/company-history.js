// ---------------------------------------------------------------------------
// 公司沿革頁面
// 1. 進頁面時回到最上方（網址有 # 時除外）
// 2. 讀取 HTML 裡的沿革資料，改建成「左側年份選單 + 右側內容」
// ---------------------------------------------------------------------------

// 1. 進頁面時回到最上方
function resetEntryPosition() {
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
resetEntryPosition();
window.addEventListener("pageshow", resetEntryPosition);

// 2. 從 HTML 讀出每一年的事件（HTML 的順序就是顯示順序，請維持由新到舊）
function readMilestoneData(content) {
  const years = [];
  const groups = content.querySelectorAll(".milestone-year-group");

  for (let i = 0; i < groups.length; i++) {
    const yearElement = groups[i].querySelector(".milestone-year-label time");
    if (!yearElement) continue;

    const events = [];
    const eventElements = groups[i].querySelectorAll(".milestone-event");

    for (let j = 0; j < eventElements.length; j++) {
      const titleElement = eventElements[j].querySelector("h2");
      if (!titleElement) continue;

      const descriptionElement = eventElements[j].querySelector("p");
      let description = "";
      if (descriptionElement) {
        description = descriptionElement.textContent.trim();
      }

      events.push({
        title: titleElement.textContent.trim(),
        description: description
      });
    }

    years.push({
      year: yearElement.textContent.trim(),
      events: events
    });
  }

  return years;
}

// 建立右側某一年的內容區塊
function createYearPanel(yearData) {
  const panel = document.createElement("section");
  panel.className = "milestone-vertical__panel";
  panel.id = "milestone-panel-" + yearData.year;
  panel.dataset.year = yearData.year;

  const heading = document.createElement("h2");
  heading.className = "milestone-vertical__heading";
  heading.textContent = yearData.year;
  panel.appendChild(heading);

  const eventsBox = document.createElement("div");

  for (let i = 0; i < yearData.events.length; i++) {
    const eventData = yearData.events[i];

    const article = document.createElement("article");
    article.className = "milestone-vertical__event";

    const title = document.createElement("h3");
    title.textContent = eventData.title;
    article.appendChild(title);

    if (eventData.description) {
      const text = document.createElement("p");
      text.textContent = eventData.description;
      article.appendChild(text);
    }

    eventsBox.appendChild(article);
  }

  panel.appendChild(eventsBox);
  return panel;
}

function initMilestoneTimeline() {
  const content = document.querySelector("[data-milestone-content]");
  if (!content) return;

  const years = readMilestoneData(content);
  if (years.length === 0) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const yearButtons = [];
  const panels = [];

  // 版面外框：左邊年份選單、右邊內容
  const timeline = document.createElement("div");
  timeline.className = "milestone-vertical";

  const navigation = document.createElement("nav");
  navigation.className = "milestone-vertical__navigation";
  navigation.setAttribute("aria-label", "公司沿革年份");

  const yearList = document.createElement("div");
  yearList.className = "milestone-vertical__year-list";

  const panelsBox = document.createElement("div");

  // 讓指定年份的按鈕變成「目前所在」
  function setActiveYear(year) {
    for (let i = 0; i < yearButtons.length; i++) {
      const isActive = yearButtons[i].dataset.year === year;
      yearButtons[i].classList.toggle("is-active", isActive);
      if (isActive) {
        yearButtons[i].setAttribute("aria-current", "true");
      } else {
        yearButtons[i].removeAttribute("aria-current");
      }
    }
  }

  // 每一年建立一個內容區塊和一個年份按鈕
  for (let i = 0; i < years.length; i++) {
    const yearData = years[i];
    const panel = createYearPanel(yearData);

    const button = document.createElement("button");
    button.className = "milestone-vertical__year";
    button.type = "button";
    button.dataset.year = yearData.year;
    button.textContent = yearData.year;
    button.setAttribute("aria-label", "前往 " + yearData.year + " 年沿革");

    // 點年份：標示該年份，並捲動到對應內容
    button.addEventListener("click", function () {
      let behavior = "smooth";
      if (reducedMotion.matches) {
        behavior = "auto";
      }
      setActiveYear(yearData.year);
      panel.scrollIntoView({ behavior: behavior, block: "start" });
    });

    yearList.appendChild(button);
    panelsBox.appendChild(panel);
    yearButtons.push(button);
    panels.push(panel);
  }

  // 用新版面取代原本的 HTML 內容
  navigation.appendChild(yearList);
  timeline.appendChild(navigation);
  timeline.appendChild(panelsBox);
  content.replaceChildren(timeline);

  document.body.classList.add("milestones-js-ready");

  // 預設第一個年份為目前所在
  setActiveYear(years[0].year);

  // 往下捲動時，跟著更新左側選單的目前年份
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          setActiveYear(entries[i].target.dataset.year);
        }
      }
    }, { rootMargin: "-18% 0px -65%", threshold: 0 });

    for (let i = 0; i < panels.length; i++) {
      observer.observe(panels[i]);
    }
  }
}

document.addEventListener("DOMContentLoaded", initMilestoneTimeline);
