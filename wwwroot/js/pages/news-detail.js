(() => {
  const detail = document.querySelector("[data-news-detail]");
  if (!detail) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const title = detail.querySelector("[data-news-title]");
  const date = detail.querySelector("[data-news-date]");
  const tag = detail.querySelector("[data-news-tag]");
  const content = detail.querySelector("[data-news-content]");
  const image = detail.querySelector("[data-news-image]");
  const attachment = detail.querySelector("[data-news-attachment]");
  const attachmentName = detail.querySelector("[data-news-attachment-name]");
  const attachmentWrap = detail.querySelector("[data-news-attachment-wrap]");
  const error = document.querySelector("[data-news-error]");

  fetch("data/news.json", { cache: "no-store" })
    .then((response) => response.json())
    .then((news) => news.map((item) => ({
      id: item.id ?? item.Id,
      date: item.date ?? item.Date,
      tag: item.tag ?? item.Tag,
      title: item.title ?? item.Title,
       content: item.content ?? item.Content,
       url: item.url ?? item.Url,
       attachmentName: item.attachmentName ?? item.AttachmentName,
       imageUrl: item.imageUrl ?? item.ImageUrl
    })).find((item) => item.id === id))
    .then((item) => {
      if (!item) throw new Error("News item not found");
      document.title = `${item.title} - 亞太國際物流`;
      title.textContent = item.title;
      date.textContent = item.date;
      date.dateTime = item.date;
      tag.textContent = item.tag;
      item.content.split("\n").map((paragraph) => paragraph.trim()).filter(Boolean).forEach((paragraph) => {
        const element = document.createElement("p");
        element.textContent = paragraph;
        content.append(element);
      });
      if (item.imageUrl) {
        image.src = item.imageUrl;
        image.hidden = false;
      }
      if (item.url) {
        attachment.href = item.url;
        attachmentName.textContent = item.attachmentName || decodeURIComponent(item.url.split("/").pop().split("?")[0]);
        attachmentWrap.hidden = false;
      }
      detail.hidden = false;
    })
    .catch(() => {
      detail.hidden = true;
      if (error) error.hidden = false;
    });
})();
