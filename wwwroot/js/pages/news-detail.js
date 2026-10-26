const share = document.querySelector("[data-news-share]");

if (share) {
  const status = share.querySelector("[data-share-status]");
  const shareButton = share.querySelector("[data-share-action]");
  const pageUrl = getPageUrl();
  const pageTitle = getPageTitle();
  let statusTimer = 0;

  setupNetworkLinks();
  share.dataset.shareReady = "true";

  if (shareButton) {
    shareButton.addEventListener("click", handleShareClick);
  }

  // 優先使用 canonical，沒有的話用目前網址（去掉 ? 和 # 的部分）
  function getPageUrl() {
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink && canonicalLink.href) {
      return canonicalLink.href;
    }

    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.href;
  }

  function getPageTitle() {
    const heading = document.querySelector(".news-detail h1");
    if (heading) {
      return heading.textContent.trim();
    }
    return document.title;
  }

  // 把各社群平台的分享網址填進連結
  function setupNetworkLinks() {
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(pageTitle);

    const networkUrls = {
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl,
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodedUrl,
      x: "https://x.com/intent/post?url=" + encodedUrl + "&text=" + encodedTitle
    };

    const links = share.querySelectorAll("[data-share-network]");
    for (let i = 0; i < links.length; i++) {
      const network = links[i].dataset.shareNetwork;
      if (networkUrls[network]) {
        links[i].href = networkUrls[network];
      }
    }
  }

  function showStatus(message) {
    if (!status) return;

    window.clearTimeout(statusTimer);
    status.textContent = message;
    statusTimer = window.setTimeout(function () {
      status.textContent = "";
    }, 2400);
  }

  // 舊瀏覽器的複製方式，成功回傳 true，失敗回傳 false
  function fallbackCopy() {
    const input = document.createElement("textarea");
    input.value = pageUrl;
    input.setAttribute("readonly", "");
    input.className = "news-detail__share-copy-input";
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);

    const copied = document.execCommand("copy");
    document.body.removeChild(input);
    return copied;
  }

  async function copyPageUrl() {
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(pageUrl);
        copied = true;
      } else {
        copied = fallbackCopy();
      }
    } catch (error) {
      copied = false;
    }

    if (copied) {
      showStatus("連結已複製");
    } else {
      showStatus("無法複製連結，請手動複製網址");
    }
  }

  async function handleShareClick() {
    // 不支援系統分享選單（多半是桌機），直接複製連結
    if (!navigator.share) {
      await copyPageUrl();
      return;
    }

    try {
      await navigator.share({ title: pageTitle, url: pageUrl });
    } catch (error) {
      // 使用者按取消不用處理，其他錯誤才退回複製連結
      if (error.name !== "AbortError") {
        await copyPageUrl();
      }
    }
  }
}