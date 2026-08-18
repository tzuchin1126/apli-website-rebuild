// ==========================================
// About 頁面互動：經營理念 + 認證時間軸
// ==========================================

/**
 * 經營理念：滑鼠移入/點擊切換對應圖片
 * 觸控裝置只回應點擊，不回應 hover
 */
function initPhilosophyGallery() {
  const gallery = document.querySelector("[data-philosophy-gallery]");
  if (!gallery) return;

  const panels = [...gallery.querySelectorAll("[data-philosophy-panel]")];
  const images = [...gallery.querySelectorAll("[data-philosophy-image]")];
  const defaultPanel = gallery.dataset.defaultPanel || "";

  // 切換到指定面板
  function showPanel(panelName, isExpanded) {
    images.forEach((img) => {
      img.dataset.active = img.dataset.philosophyImage === panelName ? "true" : "false";
    });
    panels.forEach((panel) => {
      const isActive = isExpanded && panel.dataset.philosophyPanel === panelName;
      panel.dataset.active = isActive ? "true" : "false";
      panel.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  }

  // 綁定每個面板的互動
  panels.forEach((panel) => {
    const panelName = panel.dataset.philosophyPanel;

    // 滑鼠移入（非觸控裝置）
    panel.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "touch") showPanel(panelName, true);
    });
    // 鍵盤聚焦
    panel.addEventListener("focus", () => showPanel(panelName, true));
    // 點擊
    panel.addEventListener("click", () => showPanel(panelName, true));
  });

  // 離開畫廊區域 → 恢復預設
  gallery.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "touch" && !gallery.contains(document.activeElement)) {
      showPanel(defaultPanel, false);
    }
  });
  // 焦點移出畫廊 → 恢復預設
  gallery.addEventListener("focusout", () => {
    setTimeout(() => {
      if (!gallery.contains(document.activeElement)) {
        showPanel(defaultPanel, false);
      }
    }, 0);
  });

  // 初始化：顯示預設面板
  showPanel(defaultPanel, false);
}

/**
 * 認證與獎項時間軸：展開/收合 + 捲動偵測年份
 */
function initMilestoneTimelines() {
  const timelines = [...document.querySelectorAll("[data-milestone-timeline]")];
  if (!timelines.length) return;

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  timelines.forEach((timeline) => {
    const container = timeline.querySelector("[data-collapsible-events]");
    const yearLabel = timeline.querySelector(".milestone-era-label h3");
    const toggleBtn = timeline.querySelector("[data-collapsible-events-toggle]");
    const allEvents = container ? [...container.children] : [];

    if (!container || !yearLabel || !allEvents.length) return;

    // 認證與獎項內容進入視窗時由右側滑入；無障礙減少動畫時保持靜態顯示。
    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      container.classList.add("about-certification-events-motion");
      const revealObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          container.classList.add("is-entered");
          revealObserver.unobserve(container);
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );
      revealObserver.observe(container);
    }

    // 區分：預設顯示的近期事件、預設隱藏的較早事件
    const showCount = parseInt(container.dataset.initialVisibleCount || "6", 10);
    const recentEvents = allEvents.slice(0, showCount);
    const olderEvents = allEvents.slice(showCount);
    let isExpanded = false;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      recentEvents.forEach((event, index) => {
        event.classList.add("about-certification-event-motion");
        event.style.setProperty("--about-certification-event-delay", `${index * 100}ms`);
      });
    }

    // 更新年份標題
    function updateYearLabel(eventEl) {
      const yearEl = eventEl?.querySelector(".milestone-event-year");
      if (yearEl) yearLabel.textContent = yearEl.textContent.trim();
    }

    // 根據捲動位置判斷目前看哪個事件 → 更新年份
    function updateYearByScroll() {
      const visibleEvents = allEvents.filter((e) => !e.hidden && !e.classList.contains("is-collapsed"));
      if (!visibleEvents.length) return;

      const viewportMiddle = window.innerHeight * 0.45;
      let currentEvent = visibleEvents[0];
      visibleEvents.forEach((e) => {
        if (e.getBoundingClientRect().top <= viewportMiddle) currentEvent = e;
      });
      updateYearLabel(currentEvent);
    }

    // 更新展開按鈕狀態
    function updateToggleButton() {
      if (!toggleBtn) return;
      const label = toggleBtn.querySelector("span");
      const icon = toggleBtn.querySelector("i");
      if (label) label.textContent = isExpanded ? "收合至近期獎項" : "查看完整認證與獎項";
      if (icon) {
        icon.classList.toggle("ph-caret-line-down", !isExpanded);
        icon.classList.toggle("ph-caret-line-up", isExpanded);
      }
      toggleBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
      toggleBtn.classList.toggle("is-expanded", isExpanded);
    }

    // 展開或收合
    function setExpanded(expanded, scrollIntoView = false) {
      const wasExpanded = isExpanded;
      isExpanded = expanded;
      updateToggleButton();

      // 近期事件永遠顯示
      recentEvents.forEach((e) => {
        e.hidden = false;
        e.classList.remove("is-collapsed");
        e.classList.add("is-visible");
      });

      if (expanded) {
        // 展開：顯示較早事件（用 CSS 動畫 max-height）
        olderEvents.forEach((e) => {
          e.hidden = false;
          e.classList.remove("is-collapsed");
        });
        // 強制重繪觸發動畫
        container.offsetHeight;
        olderEvents.forEach((e) => e.classList.add("is-visible"));
      } else {
        // 收合：隱藏較早事件
        if (wasExpanded) updateYearLabel(recentEvents[recentEvents.length - 1]);

        olderEvents.forEach((e) => {
          e.classList.remove("is-visible");
          e.classList.add("is-collapsed");

          // 動畫結束後真正隱藏
          const onTransitionEnd = (evt) => {
            if (evt.propertyName === "max-height" && e.classList.contains("is-collapsed")) {
              e.hidden = true;
            }
          };
          e.addEventListener("transitionend", onTransitionEnd, { once: true });

          // 保險：若動畫沒跑完也強制隱藏
          setTimeout(() => {
            if (e.classList.contains("is-collapsed")) e.hidden = true;
          }, prefersReducedMotion ? 0 : 450);
        });

        // 收合後將按鈕滾動進視野
        if (scrollIntoView && wasExpanded && toggleBtn) {
          const rect = toggleBtn.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
          if (!isVisible) {
            toggleBtn.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
          }
        }
      }

      // 更新進度條與年份
      requestAnimationFrame(() => {
        updateYearByScroll();
        updateProgressBar();
      });
    }

    // 進度條：CSS 變數 --certification-progress
    function updateProgressBar() {
      const rect = timeline.getBoundingClientRect();
      const viewportMiddle = window.innerHeight * 0.45;
      const progress = Math.min(Math.max(viewportMiddle - rect.top, 0), rect.height);
      timeline.style.setProperty("--certification-progress", `${progress}px`);
    }

    // 節流：捲動/縮放時更新進度條
    let tickPending = false;
    function requestUpdate() {
      if (tickPending) return;
      tickPending = true;
      requestAnimationFrame(() => {
        updateProgressBar();
        updateYearByScroll();
        tickPending = false;
      });
    }

    // 初始化
    updateYearLabel(recentEvents[0]);
    setExpanded(false);

    // 展開按鈕點擊
    if (toggleBtn && olderEvents.length) {
      toggleBtn.hidden = false;
      toggleBtn.addEventListener("click", () => setExpanded(!isExpanded, true));
    }

    // IntersectionObserver：事件進入視窗更新年份（備援）
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && updateYearLabel(entry.target)),
        { rootMargin: "-40% 0px -55% 0px" }
      );
      allEvents.forEach((e) => observer.observe(e));
    }

    // 捲動與視窗變更監聽
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();
  });
}

// 啟動
document.addEventListener("DOMContentLoaded", () => {
  initPhilosophyGallery();
  initMilestoneTimelines();
});
