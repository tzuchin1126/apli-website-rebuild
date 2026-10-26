function setupBenefitsTabs() {
  const tablist = document.querySelector(".benefits-tabs__list");
  const panelViewport = document.querySelector(".benefits-panels");

  // 找不到必要的元素就不執行
  if (!tablist || !panelViewport) {
    return;
  }

  const tabs = tablist.querySelectorAll('[role="tab"]');
  const panels = [];

  // 依照每個 tab 的 aria-controls 找出對應的面板
  for (let i = 0; i < tabs.length; i++) {
    const panel = document.getElementById(tabs[i].getAttribute("aria-controls"));
    if (panel) {
      panels.push(panel);
    }
  }

  // tab 和面板數量要一致，否則不執行
  if (tabs.length === 0 || tabs.length !== panels.length) {
    return;
  }

  // 建立橫向排列的軌道，把所有面板放進去
  const panelTrack = document.createElement("div");
  panelTrack.className = "benefits-panels__track";
  panelViewport.appendChild(panelTrack);

  for (let i = 0; i < panels.length; i++) {
    panels[i].hidden = false;
    panelTrack.appendChild(panels[i]);
  }

  let activeIndex = 0;

  // 外框高度 = 目前顯示的面板高度
  function updatePanelHeight() {
    const height = panels[activeIndex].scrollHeight;
    panelViewport.style.height = height + "px";
  }

  // 切換到指定的 tab
  function activateTab(index, moveFocus) {
    for (let i = 0; i < tabs.length; i++) {
      const isSelected = i === index;

      tabs[i].setAttribute("aria-selected", String(isSelected));
      tabs[i].tabIndex = isSelected ? 0 : -1;
      panels[i].setAttribute("aria-hidden", String(!isSelected));
      panels[i].tabIndex = isSelected ? 0 : -1;
    }

    activeIndex = index;
    updatePanelHeight();
    panelTrack.style.transform = "translateX(-" + index * 100 + "%)";

    if (moveFocus) {
      tabs[index].focus();
    }
  }

  // 鍵盤操作：左右鍵切換，Home / End 跳到頭尾
  function handleKeydown(event, index) {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(nextIndex, true);
  }

  // 幫每個 tab 綁定事件
  function bindTab(tab, index) {
    tab.addEventListener("click", function () {
      activateTab(index, false);
    });

    tab.addEventListener("keydown", function (event) {
      handleKeydown(event, index);
    });
  }

  for (let i = 0; i < tabs.length; i++) {
    bindTab(tabs[i], i);
  }

  // 字型載入完成後，文字高度可能改變，要重新計算
  async function updateHeightAfterFonts() {
    await document.fonts.ready;
    updatePanelHeight();
  }

  window.addEventListener("resize", updatePanelHeight);
  window.addEventListener("load", updatePanelHeight);

  if (document.fonts && document.fonts.ready) {
    updateHeightAfterFonts();
  }

  activateTab(0, false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupBenefitsTabs);
} else {
  setupBenefitsTabs();
}