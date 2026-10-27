function setActiveState(element, isActive) {
  element.classList.toggle("is-active", isActive);
  if (isActive) {
    element.setAttribute("aria-current", "true");
  } else {
    element.removeAttribute("aria-current");
  }
}


function createFirstSlideClone(firstSlide) {
  const clone = firstSlide.cloneNode(true);
  clone.classList.add("home-hero__slide--clone");
  clone.classList.remove("is-active");
  clone.classList.remove("is-initial");
  clone.removeAttribute("data-hero-slide");
  clone.setAttribute("aria-hidden", "true");
  clone.inert = true;

  const heading = clone.querySelector("h1");
  if (heading) {
    const fakeTitle = document.createElement("p");
    fakeTitle.className = "home-hero__title";
    fakeTitle.textContent = heading.textContent;
    heading.parentNode.replaceChild(fakeTitle, heading);
  }

  const content = clone.querySelector(".home-hero__content");
  if (content) content.setAttribute("aria-hidden", "true");

  return clone;
}



function setupHeroCarousel() {
  const hero = document.querySelector("[data-hero-carousel]");
  if (!hero) return;

  const slidesTrack = hero.querySelector(".home-hero__slides");
  const dotsContainer = hero.querySelector("[data-hero-dots]");
  const slides = hero.querySelectorAll("[data-hero-slide]"); // 只有原本的投影片,不含複製的
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ----- 狀態 -----
  let activeIndex = 0;
  let autoplayId = null;
  let isForwardLoop = false;      // 正在從最後一張滑回第一張
  let hasKeyboardFocus = false;   // 鍵盤焦點在輪播裡
  let isMouseOver = false;        // 滑鼠在輪播上

  // 滑動用的資料
  let startX = 0;
  let startY = 0;
  let pointerId = null;

  // ----- 一開始的設定 -----

  // 頁面載入完成後,才讓第二張圖開始載入
  window.addEventListener("load", function () {
    if (slides.length < 2) return;
    const nextImage = slides[1].querySelector("img");
    if (nextImage) nextImage.loading = "eager";
  }, { once: true });

  if (slidesTrack && slides.length > 1) {
    slidesTrack.appendChild(createFirstSlideClone(slides[0]));
  }

  // 找出一開始就是 is-active 的那張
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("is-active")) activeIndex = i;
  }

  // ----- 畫面更新 -----

  function render() {
    // 更新每張投影片
    for (let i = 0; i < slides.length; i++) {
      const isActive = i === activeIndex;
      slides[i].classList.toggle("is-active", isActive);
      slides[i].setAttribute("aria-hidden", String(!isActive));
      slides[i].inert = !isActive;

      const content = slides[i].querySelector(".home-hero__content");
      if (content) content.setAttribute("aria-hidden", String(!isActive));
    }

    // 控制 CSS 位移用的 class
    hero.classList.toggle("is-forward-loop", isForwardLoop);
    hero.classList.toggle("is-slide-1", !isForwardLoop && activeIndex === 1);

    // 更新圓點
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll(".home-hero__dot");
    for (let i = 0; i < dots.length; i++) {
      setActiveState(dots[i], i === activeIndex);
    }
  }

  function goTo(index) {
    const nextIndex = (index + slides.length) % slides.length;
    const isLastToFirst = activeIndex === slides.length - 1 && nextIndex === 0;

    isForwardLoop = isLastToFirst && !reducedMotion.matches;
    activeIndex = nextIndex;
    render();
    startAutoplay();
  }

  // 滑到複製的那張後,瞬間跳回真正的第一張(沒有動畫,使用者看不出來)
  // 這個監聽只需要綁一次
  if (slidesTrack) {
    slidesTrack.addEventListener("transitionend", function (event) {
      if (!isForwardLoop) return;
      if (event.target !== slidesTrack) return;
      if (event.propertyName !== "transform") return;

      slidesTrack.classList.add("is-no-transition");
      isForwardLoop = false;
      render();
      requestAnimationFrame(function () {
        slidesTrack.classList.remove("is-no-transition");
      });
    });
  }

  // ----- 自動播放 -----

  function canAutoplay() {
    if (slides.length < 2) return false;
    if (reducedMotion.matches) return false;
    if (document.hidden) return false;
    if (hasKeyboardFocus) return false;
    if (isMouseOver) return false;
    return true;
  }

  function stopAutoplay() {
    if (autoplayId === null) return;
    clearInterval(autoplayId);
    autoplayId = null;
  }

  function startAutoplay() {
    stopAutoplay();
    if (!canAutoplay()) return;

    autoplayId = setInterval(function () {
      goTo(activeIndex + 1);
    }, 6000);
  }

  // ----- 圓點 -----

  function createDot(index) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "home-hero__dot";
    dot.setAttribute("aria-label", "顯示第 " + (index + 1) + " 張主視覺");
    dot.addEventListener("click", function () {
      goTo(index);
    });
    return dot;
  }

  if (dotsContainer) {
    for (let i = 0; i < slides.length; i++) {
      dotsContainer.appendChild(createDot(i));
    }
  }

  // ----- 手機滑動(只處理觸控與手寫筆,滑鼠不觸發)-----

  hero.addEventListener("pointerdown", function (event) {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    if (event.target.closest("a, button")) return;

    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
  });

  hero.addEventListener("pointerup", function (event) {
    if (event.pointerId !== pointerId) return;

    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;
    const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY);
    const isLongEnough = Math.abs(distanceX) >= 48;

    if (isHorizontal && isLongEnough) {
      if (distanceX < 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }

    pointerId = null;
  });

  hero.addEventListener("pointercancel", function () {
    pointerId = null;
  });

  // ----- 暫停:鍵盤焦點 -----
  // 只有「鍵盤」造成的焦點才暫停,滑鼠點圓點不會讓輪播停住

  hero.addEventListener("focusin", function (event) {
    if (!event.target.matches(":focus-visible")) return;
    hasKeyboardFocus = true;
    stopAutoplay();
  });

  hero.addEventListener("focusout", function (event) {
    if (hero.contains(event.relatedTarget)) return;
    hasKeyboardFocus = false;
    startAutoplay();
  });

  // ----- 暫停:滑鼠移入(只處理滑鼠,觸控不算)-----

  hero.addEventListener("pointerenter", function (event) {
    if (event.pointerType !== "mouse") return;
    isMouseOver = true;
    stopAutoplay();
  });

  hero.addEventListener("pointerleave", function (event) {
    if (event.pointerType !== "mouse") return;
    isMouseOver = false;
    startAutoplay();
  });

  // ----- 暫停:切到別的分頁 / 使用者改成減少動態 -----

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  reducedMotion.addEventListener("change", startAutoplay);

  render();
  startAutoplay();
}


function setupSectionMotion() {
  const targets = document.querySelectorAll("[data-home-reveal]");
  if (targets.length === 0) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.body.classList.add("home-motion-ready");

  function showAll() {
    for (let i = 0; i < targets.length; i++) {
      targets[i].classList.add("is-visible");
    }
  }

  // 不需要動畫,或瀏覽器不支援 IntersectionObserver
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    for (let i = 0; i < entries.length; i++) {
      if (!entries[i].isIntersecting) continue;
      entries[i].target.classList.add("is-visible");
      observer.unobserve(entries[i].target); // 只播放一次
    }
  }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

  for (let i = 0; i < targets.length; i++) {
    observer.observe(targets[i]);
  }

  // 使用者中途改成「減少動態」:停止觀察並直接顯示
  reducedMotion.addEventListener("change", function () {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    showAll();
  });
}


// 3. 服務卡片分頁圓點(只有手機版是橫向滑動)
function setupServicesCardPagination() {
  const grid = document.querySelector(".home-services-compare__grid");
  const pagination = document.querySelector("[data-services-pagination]");
  if (!grid || !pagination) return;

  const cards = grid.querySelectorAll(".home-services-compare__card");
  const buttons = pagination.querySelectorAll("[data-service-slide]");
  if (cards.length === 0 || buttons.length !== cards.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let isWaitingFrame = false;

  // 找出目前最靠近左邊的那張卡片
  function findActiveIndex() {
    const maxScroll = grid.scrollWidth - grid.clientWidth;

    // 已經滑到最右邊,一定是最後一張
    if (maxScroll > 0 && grid.scrollLeft >= maxScroll - 2) {
      return cards.length - 1;
    }

    let activeIndex = 0;
    let closestDistance = Infinity;
    for (let i = 0; i < cards.length; i++) {
      const distance = Math.abs(cards[i].offsetLeft - grid.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        activeIndex = i;
      }
    }
    return activeIndex;
  }

  function updateButtons() {
    const activeIndex = findActiveIndex();
    for (let i = 0; i < buttons.length; i++) {
      setActiveState(buttons[i], i === activeIndex);
    }
  }

  // 捲動時每一個畫面幀最多更新一次,避免太頻繁
  grid.addEventListener("scroll", function () {
    if (isWaitingFrame) return;
    isWaitingFrame = true;
    requestAnimationFrame(function () {
      isWaitingFrame = false;
      updateButtons();
    });
  }, { passive: true });

  // 點圓點:捲到對應的卡片
  function bindButton(index) {
    buttons[index].addEventListener("click", function () {
      grid.scrollTo({
        left: cards[index].offsetLeft,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
    });
  }

  for (let i = 0; i < buttons.length; i++) {
    bindButton(i);
  }

  updateButtons();
}


document.addEventListener("DOMContentLoaded", function () {
  setupHeroCarousel();
  setupServicesCardPagination();
  setupSectionMotion();
});