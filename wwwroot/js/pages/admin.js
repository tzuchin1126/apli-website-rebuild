// ---------------------------------------------------------------------------
// 管理後台：登入、消息管理、分類管理
// ---------------------------------------------------------------------------

// 頁面載入完成後才開始執行
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginPanel = document.getElementById("loginPanel");
  const workspace = document.getElementById("workspace");
  const newsForm = document.getElementById("newsForm");
  const newsRows = document.getElementById("newsRows");
  const categoryForm = document.getElementById("categoryForm");
  const categoryRows = document.getElementById("categoryRows");
  const tagSelect = document.getElementById("newsTag");
  const captchaImage = document.getElementById("captchaImage");
  const logoutButton = document.getElementById("logoutButton");
  const resetButton = document.getElementById("resetButton");
  const refreshCaptchaButton = document.getElementById("refreshCaptcha");

  if (!loginForm || !loginPanel || !workspace || !newsForm || !newsRows || !categoryForm || !categoryRows || !tagSelect) {
    return;
  }

  // 取得 CSRF Token（防止跨站請求偽造）
  const csrfTokenTag = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfTokenTag ? csrfTokenTag.content : "";

  // 目前的消息、分類資料，先放空陣列，等登入後會重新指派
  let news = [];
  let categories = [];

  // 圖片上傳的限制
  const MAX_SOURCE_IMAGE_BYTES = 5 * 1024 * 1024; // 原始圖片最大 5MB
  const MAX_STORED_IMAGE_BYTES = 1 * 1024 * 1024; // 壓縮後最大 1MB
  const MAX_IMAGE_EDGE = 1920; // 圖片最長邊不超過 1920px

  // ---------------------------------------------------------------------------
  // 綁定事件
  // ---------------------------------------------------------------------------
  loginForm.addEventListener("submit", onLoginSubmit);
  newsForm.addEventListener("submit", onNewsSave);
  categoryForm.addEventListener("submit", onCategorySave);
  newsRows.addEventListener("click", onNewsRowClick);
  categoryRows.addEventListener("click", onCategoryRowClick);

  if (logoutButton) logoutButton.addEventListener("click", onLogout);
  if (resetButton) resetButton.addEventListener("click", onResetForm);
  if (refreshCaptchaButton) refreshCaptchaButton.addEventListener("click", loadCaptcha);

  // ---------------------------------------------------------------------------
  // 一開始要做的事
  // ---------------------------------------------------------------------------
  setDefaultDate();
  loadCaptcha();
  restoreSession();

  // ---------------------------------------------------------------------------
  // 共用小工具
  // ---------------------------------------------------------------------------

  // 幫 fetch 加上 CSRF Header
  function csrfHeaders(extraHeaders) {
    const headers = extraHeaders || {};
    headers["X-CSRF-TOKEN"] = csrfToken;
    return headers;
  }

  // 重新載入驗證碼圖片
  function loadCaptcha() {
    if (captchaImage) {
      captchaImage.src = "/api/admin/captcha?ts=" + Date.now();
    }
  }

  // 把日期轉成 YYYY-MM-DD 格式
  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  // 避免使用者輸入的文字被當成 HTML 執行（防止 XSS）
  function escapeHtml(value) {
    let text = String(value);
    text = text.replaceAll("&", "&amp;");
    text = text.replaceAll("<", "&lt;");
    text = text.replaceAll(">", "&gt;");
    text = text.replaceAll('"', "&quot;");
    text = text.replaceAll("'", "&#39;");
    return text;
  }

  // 放進 HTML 屬性裡的文字，除了上面之外還要多轉義反引號
  function escapeAttribute(value) {
    return escapeHtml(value).replaceAll("`", "&#96;");
  }

  // 把「日期 時間」字串拆成兩行顯示
  function renderTimestamp(value) {
    if (!value) return "-";
    const parts = String(value).trim().split(/\s+/);
    const datePart = parts[0] || "";
    const timePart = parts.slice(1).join(" ");
    return "<span class=\"admin-table__timestamp\"><span>" + escapeHtml(datePart) +
      "</span><span>" + escapeHtml(timePart) + "</span></span>";
  }

  // ---------------------------------------------------------------------------
  // 圖片壓縮：把上傳的圖片縮小、轉成 WebP，控制檔案大小
  // ---------------------------------------------------------------------------

  // 讀取使用者選的圖片檔案，回傳一個 <img> 物件方便畫到 canvas 上
  function loadLocalImage(file) {
    return new Promise(function (resolve, reject) {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = function () {
        URL.revokeObjectURL(objectUrl);
        resolve(image);
      };
      image.onerror = function () {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("無法讀取圖片，請確認檔案內容是否正確。"));
      };
      image.src = objectUrl;
    });
  }

  // 把 canvas 畫面輸出成 WebP 檔案
  function canvasToWebp(canvas, quality) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (!blob || blob.type !== "image/webp") {
          reject(new Error("目前瀏覽器無法將圖片轉成 WebP，請改用最新版瀏覽器。"));
          return;
        }
        resolve(blob);
      }, "image/webp", quality);
    });
  }

  // 主要流程：檢查檔案大小 -> 讀取圖片 -> 縮圖 -> 轉 WebP -> 檢查是否小於 1MB
  async function optimizeNewsImage(file) {
    if (file.size <= 0 || file.size > MAX_SOURCE_IMAGE_BYTES) {
      throw new Error("原始圖片必須小於 5 MB。");
    }

    const image = await loadLocalImage(file);
    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;
    if (!sourceWidth || !sourceHeight) {
      throw new Error("無法取得圖片尺寸，請改用其他圖片。");
    }

    // 算出縮圖後的寬高，長邊不超過 MAX_IMAGE_EDGE
    let scale = 1;
    if (Math.max(sourceWidth, sourceHeight) > MAX_IMAGE_EDGE) {
      scale = MAX_IMAGE_EDGE / Math.max(sourceWidth, sourceHeight);
    }
    let width = Math.max(1, Math.round(sourceWidth * scale));
    let height = Math.max(1, Math.round(sourceHeight * scale));

    // 如果壓縮後還是太大，就降低畫質、縮小尺寸，最多試 6 次
    let resultBlob = null;
    for (let attempt = 0; attempt < 6; attempt++) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("瀏覽器無法處理圖片，請改用其他圖片。");
      }
      context.drawImage(image, 0, 0, width, height);

      let quality = 0.82 - attempt * 0.05;
      if (quality < 0.57)
        quality = 0.57;

      resultBlob = await canvasToWebp(canvas, quality);
      if (resultBlob.size <= MAX_STORED_IMAGE_BYTES) {
        break;
      }

      width = Math.max(1, Math.round(width * 0.85));
      height = Math.max(1, Math.round(height * 0.85));
    }

    if (!resultBlob || resultBlob.size > MAX_STORED_IMAGE_BYTES) {
      throw new Error("圖片壓縮後仍超過 1 MB，請先縮小圖片再上傳。");
    }

    let baseName = file.name.replace(/\.[^.]+$/, "");
    if (!baseName) baseName = "news-image";

    return new File([resultBlob], baseName + ".webp", {
      type: "image/webp",
      lastModified: file.lastModified,
    });
  }

  // ---------------------------------------------------------------------------
  // 登入 / Session
  // ---------------------------------------------------------------------------

  async function onLoginSubmit(event) {
    event.preventDefault();
    const messageEl = document.getElementById("loginMessage");
    messageEl.textContent = "登入中...";

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: csrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          username: document.getElementById("loginUsername").value,
          password: document.getElementById("loginPassword").value,
          captcha: document.getElementById("loginCaptcha").value,
        }),
      });

      if (response.ok) {
        location.reload(); // 登入成功就重新整理頁面
        return;
      }

      if (response.status === 429) {
        messageEl.textContent = "登入嘗試過於頻繁，請稍後再試。";
      } else {
        messageEl.textContent = "帳號、密碼或驗證碼錯誤。";
      }
      document.getElementById("loginCaptcha").value = "";
      loadCaptcha();
    } catch (error) {
      messageEl.textContent = "目前無法連線，請稍後再試。";
    }
  }

  // 檢查目前有沒有已登入的 session，有的話直接顯示工作區
  async function restoreSession() {
    try {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      if (response.ok) {
        await showWorkspace();
      }
    } catch (error) {
      // 檢查失敗就當作沒有登入，維持在登入畫面
    }
  }

  async function showWorkspace() {
    loginPanel.hidden = true;
    workspace.hidden = false;
    await loadCategories();
    await loadNews();
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST", headers: csrfHeaders() });
    location.reload();
  }

  // ---------------------------------------------------------------------------
  // 資料載入與渲染
  // ---------------------------------------------------------------------------

  async function loadNews() {
    const response = await fetch("/api/news?ts=" + Date.now(), { cache: "no-store" });
    if (!response.ok) return;
    const rawList = await response.json();

    news = [];
    for (let i = 0; i < rawList.length; i++) {
      news.push(normalizeNewsItem(rawList[i]));
    }
    renderNewsRows();
  }

  async function loadCategories() {
    const response = await fetch("/api/news/categories?ts=" + Date.now(), { cache: "no-store" });
    categories = response.ok ? await response.json() : [];
    renderCategoryRows();
    renderCategoryOptions(tagSelect.value);
  }

  // 後端有時候回傳 camelCase，有時候是 PascalCase，這裡統一轉成小寫開頭
  function normalizeNewsItem(item) {
    const source = item || {};
    return {
      id: source.id != null ? source.id : source.Id || "",
      date: source.date != null ? source.date : source.Date || "",
      tag: source.tag != null ? source.tag : source.Tag || "",
      title: source.title != null ? source.title : source.Title || "",
      content: source.content != null ? source.content : source.Content || "",
      url: source.url != null ? source.url : source.Url || "",
      imageUrl: source.imageUrl != null ? source.imageUrl : source.ImageUrl || "",
      imageName: source.imageName != null ? source.imageName : source.ImageName || "",
      attachmentName: source.attachmentName != null ? source.attachmentName : source.AttachmentName || "",
      published: source.published != null ? source.published : source.Published,
      createdAt: source.createdAt != null ? source.createdAt : source.CreatedAt || "",
      updatedAt: source.updatedAt != null ? source.updatedAt : source.UpdatedAt || "",
    };
  }

  // 畫出消息列表的每一列
  function renderNewsRows() {
    if (news.length === 0) {
      newsRows.innerHTML = '<tr><td class="admin-table__empty" colspan="7">目前尚無消息。</td></tr>';
      return;
    }

    let html = "";
    for (let i = 0; i < news.length; i++) {
      const item = news[i];
      const isPublished = item.published !== false;
      const statusClass = isPublished ? "" : " admin-table__status--hidden";
      const statusText = isPublished ? "發布" : "隱藏";

      html += "<tr>";
      html += '<td data-label="日期">' + escapeHtml(item.date) + "</td>";
      html += '<td data-label="分類">' + escapeHtml(item.tag) + "</td>";
      html += '<td data-label="標題">' + escapeHtml(item.title) + "</td>";
      html += '<td data-label="狀態"><span class="admin-table__status' + statusClass + '">' + statusText + "</span></td>";
      html += '<td data-label="建立">' + renderTimestamp(item.createdAt) + "</td>";
      html += '<td data-label="修改">' + renderTimestamp(item.updatedAt) + "</td>";
      html += '<td data-label="操作"><div class="admin-table__actions">';
      html += '<button class="admin-table__action" type="button" data-action="edit" data-id="' + escapeAttribute(item.id) + '">編輯</button>';
      html += '<button class="admin-table__action admin-table__action--danger" type="button" data-action="delete" data-id="' + escapeAttribute(item.id) + '">刪除</button>';
      html += "</div></td>";
      html += "</tr>";
    }
    newsRows.innerHTML = html;
  }

  // 畫出分類列表
  function renderCategoryRows() {
    if (categories.length === 0) {
      categoryRows.innerHTML = '<p class="admin-help">尚無分類。</p>';
      return;
    }

    let html = "";
    for (let i = 0; i < categories.length; i++) {
      const name = categories[i];
      html += '<div class="admin-category-item">';
      html += "<span>" + escapeHtml(name) + "</span>";
      html += '<button type="button" data-action="delete" data-name="' + escapeAttribute(name) + '">刪除</button>';
      html += "</div>";
    }
    categoryRows.innerHTML = html;
  }

  // 畫出新增/編輯表單裡的分類下拉選單
  // 選單內容 = 既有分類 + 消息目前有在用、但還沒被列為分類的標籤
  function renderCategoryOptions(selectedValue) {
    const merged = categories.slice(); // 複製一份，避免動到原本的陣列

    for (let i = 0; i < news.length; i++) {
      const tag = news[i].tag;
      if (tag && merged.indexOf(tag) === -1) {
        merged.push(tag);
      }
    }

    let html = "";
    for (let j = 0; j < merged.length; j++) {
      html += '<option value="' + escapeAttribute(merged[j]) + '">' + escapeHtml(merged[j]) + "</option>";
    }
    tagSelect.innerHTML = html;

    if (selectedValue && merged.indexOf(selectedValue) !== -1) {
      tagSelect.value = selectedValue;
    } else if (merged.length > 0) {
      tagSelect.value = merged[0];
    }
  }

  // ---------------------------------------------------------------------------
  // 列表點擊處理
  // ---------------------------------------------------------------------------

  function onNewsRowClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const id = button.dataset.id;
    let item = null;
    for (let i = 0; i < news.length; i++) {
      if (news[i].id === id) {
        item = news[i];
        break;
      }
    }
    if (!item) return;

    if (button.dataset.action === "edit") editNews(item);
    if (button.dataset.action === "delete") deleteNews(item.id);
  }

  function onCategoryRowClick(event) {
    const button = event.target.closest("button[data-action='delete']");
    if (button) deleteCategory(button.dataset.name);
  }

  // ---------------------------------------------------------------------------
  // 編輯 / 新增 消息
  // ---------------------------------------------------------------------------

  function editNews(item) {
    document.getElementById("newsId").value = item.id;
    document.getElementById("newsDate").value = item.date || formatLocalDate(new Date());
    renderCategoryOptions(item.tag);
    document.getElementById("newsTitle").value = item.title;
    document.getElementById("newsContent").value = item.content || "";
    document.getElementById("newsUrl").value = item.url || "";
    document.getElementById("newsImageUrl").value = item.imageUrl || "";
    document.getElementById("currentImageName").textContent = item.imageName || "未上傳";
    document.getElementById("currentAttachmentName").textContent =
      item.attachmentName || (item.url ? item.url.split("/").pop() : "未上傳");
    document.getElementById("removeNewsImage").checked = false;
    document.getElementById("removeNewsAttachment").checked = false;
    document.getElementById("newsPublished").value = String(item.published !== false);
    document.getElementById("createdAtInfo").textContent = item.createdAt || "尚未紀錄";
    document.getElementById("updatedAtInfo").textContent = item.updatedAt || "尚未紀錄";

    const messageEl = document.getElementById("formMessage");
    messageEl.textContent = "";
    messageEl.removeAttribute("data-state");

    document.getElementById("editor-title").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onNewsSave(event) {
    event.preventDefault();
    const messageEl = document.getElementById("formMessage");
    messageEl.removeAttribute("data-state");
    messageEl.textContent = "儲存中...";

    // 把表單欄位收集起來
    const formData = new FormData();
    formData.append("id", document.getElementById("newsId").value);
    formData.append("date", document.getElementById("newsDate").value);
    formData.append("tag", tagSelect.value);
    formData.append("title", document.getElementById("newsTitle").value);
    formData.append("content", document.getElementById("newsContent").value);
    formData.append("url", document.getElementById("newsUrl").value);
    formData.append("published", document.getElementById("newsPublished").value === "true");

    const currentImageName = document.getElementById("currentImageName").textContent;
    const currentAttachmentName = document.getElementById("currentAttachmentName").textContent;
    formData.append("imageName", currentImageName === "未上傳" ? "" : currentImageName);
    formData.append("attachmentName", currentAttachmentName === "未上傳" ? "" : currentAttachmentName);
    formData.append("removeImage", document.getElementById("removeNewsImage").checked);
    formData.append("removeAttachment", document.getElementById("removeNewsAttachment").checked);

    const imageFile = document.getElementById("newsImageFile").files[0];
    const attachmentFile = document.getElementById("newsAttachmentFile").files[0];

    if (imageFile) {
      try {
        messageEl.textContent = "圖片最佳化中...";
        const optimizedImage = await optimizeNewsImage(imageFile);
        formData.append("image", optimizedImage);
      } catch (error) {
        messageEl.dataset.state = "error";
        messageEl.textContent = error.message || "圖片處理失敗。";
        return;
      }
    }
    if (attachmentFile) {
      formData.append("attachment", attachmentFile);
    }

    try {
      messageEl.textContent = "儲存中...";
      const response = await fetch("/api/news/save", {
        method: "POST",
        headers: csrfHeaders(),
        body: formData,
      });

      if (!ensureAuthorized(response)) return;

      if (response.ok) {
        onResetForm();
        await loadNews();
        messageEl.dataset.state = "success";
        messageEl.textContent = "消息已成功儲存。";
      } else {
        const errorText = await response.text();
        messageEl.dataset.state = "error";
        messageEl.textContent = errorText || "儲存失敗，請檢查欄位內容。";
      }
    } catch (error) {
      messageEl.textContent = "目前無法連線，請稍後再試。";
    }
  }

  // ---------------------------------------------------------------------------
  // 分類管理
  // ---------------------------------------------------------------------------

  async function onCategorySave(event) {
    event.preventDefault();
    const input = document.getElementById("categoryName");

    const response = await fetch("/api/news/categories", {
      method: "POST",
      headers: csrfHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ name: input.value }),
    });
    if (!ensureAuthorized(response)) return;

    document.getElementById("categoryMessage").textContent = response.ok ? "分類已更新。" : "分類儲存失敗。";
    if (!response.ok) return;

    input.value = "";
    categories = await response.json();
    renderCategoryRows();
    renderCategoryOptions(tagSelect.value);
  }

  async function deleteCategory(name) {
    if (!window.confirm("確定刪除這個分類？既有消息不會被刪除。")) return;

    const response = await fetch("/api/news/categories/" + encodeURIComponent(name), {
      method: "DELETE",
      headers: csrfHeaders(),
    });
    if (!ensureAuthorized(response)) return;

    document.getElementById("categoryMessage").textContent = response.ok ? "分類已刪除。" : "分類刪除失敗。";
    if (!response.ok) return;

    categories = await response.json();
    renderCategoryRows();
    renderCategoryOptions(tagSelect.value);
  }

  // ---------------------------------------------------------------------------
  // 刪除消息
  // ---------------------------------------------------------------------------

  async function deleteNews(id) {
    if (!window.confirm("確定刪除這則消息？"))
      return;

    const response = await fetch("/api/news/delete/" + encodeURIComponent(id), {
      method: "DELETE",
      headers: csrfHeaders(),
    });
    if (!ensureAuthorized(response))
      return;

    if (response.ok) {
      await loadNews();
    }
  }

  // ---------------------------------------------------------------------------
  // 共用輔助
  // ---------------------------------------------------------------------------

  // 檢查回應是不是「401 未授權」，如果是，就導回登入畫面
  function ensureAuthorized(response) {
    if (response.status !== 401)
      return true;

    workspace.hidden = true;
    loginPanel.hidden = false;
    document.getElementById("loginMessage").textContent = "登入已逾時，請重新登入。";
    return false;
  }

  // 重設消息表單
  function onResetForm() {
    // newsForm.reset() 會自動清空大部分欄位（文字框、下拉選單、檔案欄位等）
    newsForm.reset();

    // 但這幾個是純顯示用的文字，不是表單控制項，要自己手動重設
    document.getElementById("currentImageName").textContent = "未上傳";
    document.getElementById("currentAttachmentName").textContent = "未上傳";
    document.getElementById("createdAtInfo").textContent = "儲存後自動紀錄";
    document.getElementById("updatedAtInfo").textContent = "儲存後自動紀錄";

    renderCategoryOptions();
    setDefaultDate();

    const messageEl = document.getElementById("formMessage");
    messageEl.removeAttribute("data-state");
    messageEl.textContent = "";
  }

  // 把日期欄位設成今天
  function setDefaultDate() {
    document.getElementById("newsDate").value = formatLocalDate(new Date());
  }

});