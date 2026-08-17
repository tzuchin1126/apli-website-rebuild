// (() => {
//   const timelines = [...document.querySelectorAll("[data-milestone-timeline]")];
//   if (!timelines.length) return;

//   const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

//   timelines.forEach((timeline) => {
//     const eventsContainer = timeline.querySelector("[data-collapsible-events]");
//     const label = timeline.querySelector(".milestone-era-label h3");
//     const toggle = timeline.querySelector("[data-collapsible-events-toggle]");
//     const events = eventsContainer ? [...eventsContainer.children] : [];

//     if (!eventsContainer || !label || !events.length) return;

//     const initialVisibleCount = Number.parseInt(eventsContainer.dataset.initialVisibleCount || "8", 10);
//     const recentEvents = events.slice(0, Number.isFinite(initialVisibleCount) ? initialVisibleCount : 8);
//     const olderEvents = events.slice(recentEvents.length);
//     let expanded = false;
//     let collapseTimers = [];

//     const setCurrentYear = (event) => {
//       const year = event?.querySelector(".milestone-event-year")?.textContent.trim();
//       if (year) label.textContent = year;
//     };

//     const updateActiveYear = () => {
//       const visibleEvents = events.filter((event) => !event.hidden && !event.classList.contains("is-collapsed"));
//       if (!visibleEvents.length) return;

//       const viewportAnchor = window.innerHeight * 0.45;
//       let activeEvent = visibleEvents[0];
//       visibleEvents.forEach((event) => {
//         if (event.getBoundingClientRect().top <= viewportAnchor) activeEvent = event;
//       });
//       setCurrentYear(activeEvent);
//     };

//     const setToggleLabel = () => {
//       if (!toggle) return;
//       const labelElement = toggle.querySelector("span");
//       const iconElement = toggle.querySelector("i");
//       if (labelElement) labelElement.textContent = expanded ? "收合至近期獎項" : "查看完整認證與獎項";
//       if (iconElement) {
//         iconElement.classList.toggle("ph-caret-line-down", !expanded);
//         iconElement.classList.toggle("ph-caret-line-up", expanded);
//       }
//       toggle.setAttribute("aria-expanded", String(expanded));
//       toggle.classList.toggle("is-expanded", expanded);
//     };

//     const clearCollapseTimers = () => {
//       collapseTimers.forEach((timer) => window.clearTimeout(timer));
//       collapseTimers = [];
//     };

//     const setExpanded = (nextExpanded, { scrollToggleIntoView = false } = {}) => {
//       const wasExpanded = expanded;
//       expanded = nextExpanded;
//       clearCollapseTimers();
//       setToggleLabel();

//       recentEvents.forEach((event) => {
//         event.hidden = false;
//         event.classList.remove("is-collapsed");
//         event.classList.add("is-visible");
//       });

//       if (expanded) {
//         olderEvents.forEach((event) => {
//           event.hidden = false;
//           event.classList.remove("is-collapsed");
//         });
//         void eventsContainer.offsetHeight;
//         olderEvents.forEach((event) => event.classList.add("is-visible"));
//       } else {
//         if (wasExpanded) setCurrentYear(recentEvents[recentEvents.length - 1]);

//         olderEvents.forEach((event) => {
//           event.classList.remove("is-visible");
//           event.classList.add("is-collapsed");

//           const hideAfterTransition = (transitionEvent) => {
//             if (transitionEvent.propertyName === "max-height" && event.classList.contains("is-collapsed")) event.hidden = true;
//           };

//           event.addEventListener("transitionend", hideAfterTransition, { once: true });
//           collapseTimers.push(window.setTimeout(() => {
//             if (event.classList.contains("is-collapsed")) event.hidden = true;
//           }, prefersReducedMotion ? 0 : 450));
//         });

//         if (scrollToggleIntoView && wasExpanded && toggle) {
//           const toggleRect = toggle.getBoundingClientRect();
//           const isVisible = toggleRect.top >= 0 && toggleRect.bottom <= window.innerHeight;
//           if (!isVisible) toggle.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
//         }
//       }

//       window.requestAnimationFrame(() => {
//         updateActiveYear();
//         updateProgress();
//       });
//     };

//     setCurrentYear(recentEvents[0]);
//     setExpanded(false);
//     if (toggle && olderEvents.length) {
//       toggle.hidden = false;
//       toggle.addEventListener("click", () => setExpanded(!expanded, { scrollToggleIntoView: true }));
//     }

//     if ("IntersectionObserver" in window) {
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) setCurrentYear(entry.target);
//         });
//       }, { rootMargin: "-40% 0px -55% 0px" });

//       events.forEach((event) => observer.observe(event));
//     }

//     let ticking = false;
//     const updateProgress = () => {
//       const rect = timeline.getBoundingClientRect();
//       const viewportAnchor = window.innerHeight * 0.45;
//       const progress = Math.min(Math.max(viewportAnchor - rect.top, 0), rect.height);
//       timeline.style.setProperty("--certification-progress", `${progress}px`);
//       updateActiveYear();
//       ticking = false;
//     };
//     const requestProgressUpdate = () => {
//       if (ticking) return;
//       ticking = true;
//       window.requestAnimationFrame(updateProgress);
//     };

//     window.addEventListener("scroll", requestProgressUpdate, { passive: true });
//     window.addEventListener("resize", requestProgressUpdate);
//     requestProgressUpdate();
//   });
// })();


(() => {
  // 頁面上可能有多個時間軸區塊,每個都要各自初始化
  const allTimelines = document.querySelectorAll("[data-milestone-timeline]");
  if (allTimelines.length === 0) return;

  // 使用者是否設定「減少動畫」,若是,展開/收合就不做過場動畫
  const userPrefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  // 對每一個時間軸區塊分別執行初始化
  allTimelines.forEach((timeline) => {
    setupTimeline(timeline);
  });

  // ============================================================
  // 主要初始化函式:設定單一時間軸的所有互動行為
  // ============================================================
  function setupTimeline(timeline) {
    const eventsContainer = timeline.querySelector("[data-collapsible-events]");
    const yearLabel = timeline.querySelector(".milestone-era-label h3");
    const toggleButton = timeline.querySelector("[data-collapsible-events-toggle]");

    // 如果找不到必要元素,就不繼續執行,避免報錯
    if (!eventsContainer || !yearLabel) return;

    const allEvents = [...eventsContainer.children];
    if (allEvents.length === 0) return;

    // 一開始就顯示的事件數量,預設 8 筆,其餘的會被收合起來
    const initialVisibleCount =
      Number.parseInt(eventsContainer.dataset.initialVisibleCount || "8", 10) || 8;

    const recentEvents = allEvents.slice(0, initialVisibleCount);   // 一開始就看得到的
    const olderEvents = allEvents.slice(initialVisibleCount);        // 需要展開才看得到的

    // 目前是否為「展開」狀態
    let isExpanded = false;

    // 收合動畫用的計時器,展開/收合時可能會重複觸發,所以要記錄下來以便取消
    let pendingCollapseTimers = [];

    // ----------------------------------------------------------
    // 顯示目前對應的年份文字
    // ----------------------------------------------------------
    function showYearFor(event) {
      if (!event) return;
      const yearText = event.querySelector(".milestone-event-year")?.textContent.trim();
      if (yearText) {
        yearLabel.textContent = yearText;
      }
    }

    // ----------------------------------------------------------
    // 根據滾動位置,找出「目前應該顯示哪個年份」
    // 做法:找出所有目前有顯示的事件,誰的位置最接近或超過
    // 螢幕高度 45% 的那條假想線,就用誰的年份
    // ----------------------------------------------------------
    function updateActiveYearBasedOnScroll() {
      const currentlyVisibleEvents = allEvents.filter(
        (event) => !event.hidden && !event.classList.contains("is-collapsed")
      );
      if (currentlyVisibleEvents.length === 0) return;

      const anchorLine = window.innerHeight * 0.45;

      let activeEvent = currentlyVisibleEvents[0];
      currentlyVisibleEvents.forEach((event) => {
        const top = event.getBoundingClientRect().top;
        if (top <= anchorLine) {
          activeEvent = event;
        }
      });

      showYearFor(activeEvent);
    }

    // ----------------------------------------------------------
    // 更新「展開/收合」按鈕上的文字與圖示
    // ----------------------------------------------------------
    function updateToggleButtonLabel() {
      if (!toggleButton) return;

      const textSpan = toggleButton.querySelector("span");
      const icon = toggleButton.querySelector("i");

      if (textSpan) {
        textSpan.textContent = isExpanded ? "收合至近期獎項" : "查看完整認證與獎項";
      }
      if (icon) {
        icon.classList.toggle("ph-caret-line-down", !isExpanded);
        icon.classList.toggle("ph-caret-line-up", isExpanded);
      }

      toggleButton.setAttribute("aria-expanded", String(isExpanded));
      toggleButton.classList.toggle("is-expanded", isExpanded);
    }

    // ----------------------------------------------------------
    // 取消所有還在等待中的「收合完成後隱藏元素」計時器
    // ----------------------------------------------------------
    function cancelPendingCollapseTimers() {
      pendingCollapseTimers.forEach((timerId) => window.clearTimeout(timerId));
      pendingCollapseTimers = [];
    }

    // ----------------------------------------------------------
    // 展開或收合「較舊的事件」清單
    // options.scrollToggleIntoView: 收合完成後,若按鈕已滾出畫面外,
    // 就自動滾動讓按鈕回到可視範圍內
    // ----------------------------------------------------------
    function setExpanded(shouldExpand, options = {}) {
      const wasExpandedBefore = isExpanded;
      isExpanded = shouldExpand;

      cancelPendingCollapseTimers();
      updateToggleButtonLabel();

      // 近期事件永遠顯示,這裡確保它們一定是可見狀態
      recentEvents.forEach((event) => {
        event.hidden = false;
        event.classList.remove("is-collapsed");
        event.classList.add("is-visible");
      });

      if (isExpanded) {
        // ---- 展開較舊的事件 ----
        olderEvents.forEach((event) => {
          event.hidden = false;
          event.classList.remove("is-collapsed");
        });

        // 強制瀏覽器重新計算版面(reflow),
        // 這樣接下來加上 is-visible 才會真的觸發 CSS transition
        void eventsContainer.offsetHeight;

        olderEvents.forEach((event) => {
          event.classList.add("is-visible");
        });
      } else {
        // ---- 收合較舊的事件 ----

        // 如果原本是展開狀態、現在要收合,年份顯示要退回到「近期事件」的最後一筆
        if (wasExpandedBefore) {
          showYearFor(recentEvents[recentEvents.length - 1]);
        }

        olderEvents.forEach((event) => {
          event.classList.remove("is-visible");
          event.classList.add("is-collapsed");

          // 動畫(max-height 縮小)結束後,把元素徹底隱藏(hidden = true)
          // 這樣它才不會佔用版面空間、也不會被螢幕閱讀器讀到
          const hideAfterAnimationEnds = (transitionEvent) => {
            if (
              transitionEvent.propertyName === "max-height" &&
              event.classList.contains("is-collapsed")
            ) {
              event.hidden = true;
            }
          };
          event.addEventListener("transitionend", hideAfterAnimationEnds, { once: true });

          // 保險機制:萬一 transitionend 沒有正常觸發(例如 CSS 設定有誤),
          // 也要在動畫時間後強制隱藏,避免元素卡住一直顯示
          const fallbackDelay = userPrefersReducedMotion ? 0 : 450;
          const timerId = window.setTimeout(() => {
            if (event.classList.contains("is-collapsed")) {
              event.hidden = true;
            }
          }, fallbackDelay);
          pendingCollapseTimers.push(timerId);
        });

        // 收合後,如果按鈕不在可視範圍內,自動滾動讓使用者看得到它
        if (options.scrollToggleIntoView && wasExpandedBefore && toggleButton) {
          const buttonRect = toggleButton.getBoundingClientRect();
          const buttonIsVisible =
            buttonRect.top >= 0 && buttonRect.bottom <= window.innerHeight;

          if (!buttonIsVisible) {
            toggleButton.scrollIntoView({
              behavior: userPrefersReducedMotion ? "auto" : "smooth",
              block: "nearest",
            });
          }
        }
      }

      // 等這一輪畫面更新完成後,重新計算年份跟進度條
      window.requestAnimationFrame(() => {
        updateActiveYearBasedOnScroll();
        updateScrollProgress();
      });
    }

    // ----------------------------------------------------------
    // 初始狀態設定
    // ----------------------------------------------------------
    showYearFor(recentEvents[0]);
    setExpanded(false); // 一開始預設是收合狀態

    if (toggleButton && olderEvents.length > 0) {
      toggleButton.hidden = false;
      toggleButton.addEventListener("click", () => {
        setExpanded(!isExpanded, { scrollToggleIntoView: true });
      });
    }

    // ----------------------------------------------------------
    // 用 IntersectionObserver 輔助偵測「哪個事件進入畫面中央區域」
    // 這是跟上面 updateActiveYearBasedOnScroll 並行的第二套判斷機制,
    // 用來讓年份切換更即時、更準確
    // ----------------------------------------------------------
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              showYearFor(entry.target);
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px" } // 只關注畫面中間偏上的一小段區域
      );

      allEvents.forEach((event) => observer.observe(event));
    }

    // ----------------------------------------------------------
    // 滾動進度條:計算目前滾動位置,更新 CSS 變數 --certification-progress
    // ----------------------------------------------------------
    let isUpdateScheduled = false;

    function updateScrollProgress() {
      const timelineRect = timeline.getBoundingClientRect();
      const anchorLine = window.innerHeight * 0.45;

      // 進度值限制在 0 到時間軸總高度之間
      const progress = Math.min(
        Math.max(anchorLine - timelineRect.top, 0),
        timelineRect.height
      );

      timeline.style.setProperty("--certification-progress", `${progress}px`);

      updateActiveYearBasedOnScroll();
      isUpdateScheduled = false;
    }

    // 用 requestAnimationFrame 節流,避免 scroll 事件觸發太頻繁造成效能問題
    function requestScrollProgressUpdate() {
      if (isUpdateScheduled) return;
      isUpdateScheduled = true;
      window.requestAnimationFrame(updateScrollProgress);
    }

    window.addEventListener("scroll", requestScrollProgressUpdate, { passive: true });
    window.addEventListener("resize", requestScrollProgressUpdate);

    // 頁面載入時先執行一次,確保初始狀態正確
    requestScrollProgressUpdate();
  }
})();