/**
 * 經營理念面板：滑鼠移入或點擊切換內容
 * 觸控裝置不吃 hover，所以只綁點擊
 */
function initPhilosophyGallery() {
  const gallery = document.querySelector("[data-philosophy-gallery]");
  if (!gallery) return;

  const panels = [...gallery.querySelectorAll("[data-philosophy-panel]")];
  const defaultPanel = gallery.dataset.defaultPanel || "";

  function showPanel(name, expanded) {
    panels.forEach((panel) => {
      const active = expanded && panel.dataset.philosophyPanel === name;
      panel.dataset.active = active;
      panel.setAttribute("aria-expanded", active);
    });
  }

  panels.forEach((panel) => {
    const name = panel.dataset.philosophyPanel;

    panel.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "touch") showPanel(name, true);
    });
    panel.addEventListener("focus", () => showPanel(name, true));
    panel.addEventListener("click", () => showPanel(name, true));
  });

  // 滑鼠或焦點離開整個畫廊，才收回預設面板
  gallery.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "touch" && !gallery.contains(document.activeElement)) {
      showPanel(defaultPanel, false);
    }
  });
  gallery.addEventListener("focusout", () => {
    // focusout 觸發時新焦點還沒定位好，延一個 tick 再判斷
    setTimeout(() => {
      if (!gallery.contains(document.activeElement)) showPanel(defaultPanel, false);
    }, 0);
  });

  showPanel(defaultPanel, false);
}

/**
 * 認證與獎項時間軸
 * - 預設只顯示最近幾筆，其餘要點「查看較早獎項」才展開
 * - 捲動時偵測目前看到哪一年，更新左側年份標籤與進度條
 */
function initMilestoneTimelines() {
  const timelines = [...document.querySelectorAll("[data-milestone-timeline]")];
  if (!timelines.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.matchMedia("(max-width: 840px)").matches;

  timelines.forEach((timeline) => setupTimeline(timeline));

  function setupTimeline(timeline) {
    const container = timeline.querySelector("[data-collapsible-events]");
    const yearLabel = timeline.querySelector(".milestone-era-label h3");
    const yearDot = timeline.querySelector(".milestone-era-dot");
    const toggleBtn = timeline.querySelector("[data-collapsible-events-toggle]");
    if (!container || !yearLabel) return;

    const allEvents = [...container.children];
    if (!allEvents.length) return;

    const showCount = parseInt(container.dataset.initialVisibleCount || "6", 10);
    const recentEvents = allEvents.slice(0, showCount);
    const olderEvents = allEvents.slice(showCount);
    let visibleCount = showCount;

    // 進場動畫：滑入視窗時才播放，減少動畫模式下就直接靜態顯示
    if (!reduceMotion) {
      container.classList.add("about-certification-events-motion");
      const revealObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        container.classList.add("is-entered");
        revealObserver.unobserve(container);
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
      revealObserver.observe(container);

      recentEvents.forEach((event, i) => {
        event.classList.add("about-certification-event-motion");
        event.style.setProperty("--about-certification-event-delay", `${i * 100}ms`);
      });
    }

    function updateYearLabel(eventEl) {
      const year = eventEl?.querySelector(".milestone-event-year");
      if (year) yearLabel.textContent = year.textContent.trim();
    }

    // 抓「錨點」高度：手機用畫面固定比例，桌機對齊時間軸上的圓點
    function getAnchorY() {
      if (isMobile()) return window.innerHeight * 0.45;
      const dotRect = yearDot?.getBoundingClientRect();
      return dotRect ? dotRect.top + dotRect.height / 2 : window.innerHeight * 0.45;
    }

    // 找出離錨點最近的可見事件，更新年份
    function updateYearByScroll() {
      const visibleEvents = allEvents.filter((e) => !e.hidden && !e.classList.contains("is-collapsed"));
      if (!visibleEvents.length) return;

      const anchorY = getAnchorY();
      let closest = visibleEvents[0];
      let minDistance = Infinity;

      for (const e of visibleEvents) {
        const rect = e.getBoundingClientRect();
        if (rect.top <= anchorY && rect.bottom >= anchorY) {
          closest = e;
          break; 
        }
        const distance = Math.abs(rect.top + rect.height / 2 - anchorY);
        if (distance < minDistance) {
          minDistance = distance;
          closest = e;
        }
      }
      updateYearLabel(closest);
    }

    function updateProgressBar() {
      const rect = timeline.getBoundingClientRect();
      const progress = Math.min(Math.max(getAnchorY() - rect.top, 0), rect.height);
      timeline.style.setProperty("--certification-progress", `${progress}px`);
    }

    function updateToggleButton() {
      if (!toggleBtn) return;
      const label = toggleBtn.querySelector("span");
      const icon = toggleBtn.querySelector("i");
      const hasExpanded = visibleCount > showCount;
      const isFullyExpanded = visibleCount >= allEvents.length;

      if (label) {
        label.textContent = isFullyExpanded
          ? "收合至近期獎項"
          : hasExpanded
            ? "繼續查看較早獎項"
            : "查看較早獎項";
      }
      icon?.classList.toggle("ph-caret-line-down", !isFullyExpanded);
      icon?.classList.toggle("ph-caret-line-up", isFullyExpanded);
      toggleBtn.setAttribute("aria-expanded", hasExpanded);
    }

    // 展開/收合到指定數量，較早事件用 CSS max-height 做過場動畫
    function setVisibleCount(nextCount, scrollToButton = false) {
      const wasFullyExpanded = visibleCount >= allEvents.length;
      visibleCount = Math.max(showCount, Math.min(nextCount, allEvents.length));
      updateToggleButton();

      recentEvents.forEach((e) => {
        e.hidden = false;
        e.classList.remove("is-collapsed");
        e.classList.add("is-visible");
      });

      const toShow = olderEvents.slice(0, visibleCount - showCount);
      const toHide = olderEvents.slice(visibleCount - showCount);

      toShow.forEach((e) => {
        if (!e.hidden && e.classList.contains("is-visible")) return; // 已經是展開狀態，不重跑動畫
        e.hidden = false;
        e.classList.remove("is-collapsed");
      });
      container.offsetHeight; // 強制 reflow，確保上面的 class 變更先套用再加 is-visible 觸發動畫
      toShow.forEach((e) => e.classList.add("is-visible"));

      toHide.forEach((e) => {
        if (e.hidden && !e.classList.contains("is-visible")) return; // 本來就沒展開過
        e.classList.remove("is-visible");
        e.classList.add("is-collapsed");
        e.addEventListener("transitionend", () => { e.hidden = true; }, { once: true });
        setTimeout(() => { e.hidden = true; }, reduceMotion ? 0 : 450); // 動畫沒觸發時的保險
      });

      // 全部收合回近期事件時，年份標籤要跟著跳回最後一筆近期事件
      if (visibleCount === showCount && wasFullyExpanded === false && toHide.length) {
        updateYearLabel(recentEvents[recentEvents.length - 1]);
      }

      // 收合後把按鈕捲回視野內
      if (scrollToButton && wasFullyExpanded && visibleCount === showCount && toggleBtn) {
        const rect = toggleBtn.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (!inView) toggleBtn.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
      }

      requestAnimationFrame(() => {
        updateYearByScroll();
        updateProgressBar();
      });
    }

    let scrollTickPending = false;
    function onScrollOrResize() {
      if (scrollTickPending) return;
      scrollTickPending = true;
      requestAnimationFrame(() => {
        updateProgressBar();
        updateYearByScroll();
        scrollTickPending = false;
      });
    }

    // 備援：用 IntersectionObserver 抓進入視窗中段的事件來更新年份
    const yearObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && updateYearLabel(entry.target)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    allEvents.forEach((e) => yearObserver.observe(e));

    if (toggleBtn && olderEvents.length) {
      toggleBtn.hidden = false;
      toggleBtn.addEventListener("click", () => {
        const isFullyExpanded = visibleCount >= allEvents.length;
        setVisibleCount(isFullyExpanded ? showCount : visibleCount + showCount, isFullyExpanded);
      });
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // 初始化
    updateYearLabel(recentEvents[0]);
    setVisibleCount(showCount);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initPhilosophyGallery();
  initMilestoneTimelines();
});