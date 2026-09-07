(() => {
  const carousel = document.querySelector("[data-benefits-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-benefits-track]");
  const cards = Array.from(track.children);
  const previous = document.querySelector("[data-benefits-prev]");
  const next = document.querySelector("[data-benefits-next]");
  const status = document.querySelector("[data-benefits-status]");
  let page = 0;
  let currentPerPage = 0;

  function cardsPerPage() {
    return window.matchMedia("(max-width: 760px)").matches ? 1 : 4;
  }

  function render() {
    const perPage = cardsPerPage();
    if (perPage !== currentPerPage) {
      track.replaceChildren();
      for (let index = 0; index < cards.length; index += perPage) {
        const pageElement = document.createElement("div");
        pageElement.className = "benefits-page";
        cards.slice(index, index + perPage).forEach((card) => pageElement.appendChild(card));
        track.appendChild(pageElement);
      }
      currentPerPage = perPage;
    }
    const totalPages = Math.ceil(cards.length / perPage);
    page = Math.min(page, totalPages - 1);
    track.style.transform = `translateX(-${page * 100}%)`;
    status.textContent = `${page + 1} / ${totalPages}`;
    previous.disabled = page === 0;
    next.disabled = page === totalPages - 1;
  }

  previous.addEventListener("click", () => { page -= 1; render(); });
  next.addEventListener("click", () => { page += 1; render(); });
  window.addEventListener("resize", render, { passive: true });
  render();
})();
