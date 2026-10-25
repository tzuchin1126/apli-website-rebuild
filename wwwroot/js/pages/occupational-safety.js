function setupSafetyCredentialsCarousel() {
  const viewport = document.querySelector(".safety-credentials__viewport");
  const list = document.querySelector("[data-safety-credentials-list]");
  const previous = document.querySelector("[data-safety-credentials-prev]");
  const next = document.querySelector("[data-safety-credentials-next]");

  // 找不到任何一個元素就不執行
  if (!viewport || !list || !previous || !next) return;

  // 捲到最左邊時停用「上一張」，捲到最右邊時停用「下一張」
  function updateControls() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    previous.disabled = viewport.scrollLeft <= 1;
    next.disabled = viewport.scrollLeft >= maxScroll - 1;
  }

  // 每次捲動一張卡片的距離（卡片寬度 + 卡片間距）
  // direction：-1 往左、1 往右
  function move(direction) {
    const card = list.querySelector(".safety-credential-card");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;

    viewport.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  }

  previous.addEventListener("click", function () {
    move(-1);
  });

  next.addEventListener("click", function () {
    move(1);
  });

  // 使用者手動滑動或視窗縮放時，也要更新按鈕狀態
  viewport.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);

  updateControls();
}

document.addEventListener("DOMContentLoaded", setupSafetyCredentialsCarousel);