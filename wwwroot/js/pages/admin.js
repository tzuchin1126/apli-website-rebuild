// ==========================================
// 管理後台：登入、消息管理、分類管理
// ==========================================

/**
 * 初始化管理後台
 * - 綁定表單提交、按鈕點擊事件
 * - 檢查現有 Session 自動登入
 * - 載入驗證碼、設定預設日期
 */
function initAdmin() {
  // ---- 取得主要 DOM 元素 ----
  const loginForm = document.querySelector("#loginForm");
  const loginPanel = document.querySelector("#loginPanel");
  const workspace = document.querySelector("#workspace");
  const newsForm = document.querySelector("#newsForm");
  const newsRows = document.querySelector("#newsRows");
  const categoryForm = document.querySelector("#categoryForm");
  const categoryRows = document.querySelector("#categoryRows");
  const tagSelect = document.querySelector("#newsTag");
  const captchaImage = document.querySelector("#captchaImage");
  const logoutButton = document.querySelector("#logoutButton");
  const resetButton = document.querySelector("#resetButton");
  const refreshCaptchaButton = document.querySelector("#refreshCaptcha");
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || "";

  // 必要元素檢查：缺少任一則不啟動
  if (!loginForm || !loginPanel || !workspace || !newsForm || !newsRows || !categoryForm || !categoryRows || !tagSelect) {
    return;
  }

  // ---- 狀態變數 ----
  let news = [];        // 消息列表資料
  let categories = [];  // 分類列表資料
  const maxSourceImageBytes = 5 * 1024 * 1024;
  const maxStoredImageBytes = 1 * 1024 * 1024;
  const maxImageEdge = 1920;

  // ---- 綁定事件 ----
  loginForm.addEventListener("submit", onLoginSubmit);
  newsForm.addEventListener("submit", onNewsSave);
  categoryForm.addEventListener("submit", onCategorySave);
  newsRows.addEventListener("click", onNewsRowClick);
  categoryRows.addEventListener("click", onCategoryRowClick);
  // These controls are optional so the initializer remains safe if a reduced
  // Admin markup variant omits a secondary action or the captcha image.
  logoutButton?.addEventListener("click", onLogout);
  resetButton?.addEventListener("click", onResetForm);
  refreshCaptchaButton?.addEventListener("click", loadCaptcha);

  // ---- 啟動流程 ----
  setDefaultDate();
  loadCaptcha();
  restoreSession();

  // ==========================================
  // 共用工具函式
  // ==========================================

  /** 產生帶 CSRF Token 的 Header */
  function csrfHeaders(extra = {}) {
    return { ...extra, "X-CSRF-TOKEN": csrfToken };
  }

  /** 載入/重新整理驗證碼圖片 */
  function loadCaptcha() {
    if (captchaImage) {
      captchaImage.src = `/api/admin/captcha?ts=${Date.now()}`;
    }
  }

  /** 格式化本地日期為 YYYY-MM-DD */
  function formatLocalDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  /** 讀取本機圖片，供 Canvas 縮圖與轉檔使用 */
  function loadLocalImage(file) {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("無法讀取圖片，請確認檔案內容是否正確。"));
      };
      image.src = objectUrl;
    });
  }

  /** 將 Canvas 內容輸出成 WebP Blob */
  function canvasToWebp(canvas, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob || blob.type !== "image/webp") {
          reject(new Error("目前瀏覽器無法將圖片轉成 WebP，請改用最新版瀏覽器。"));
          return;
        }
        resolve(blob);
      }, "image/webp", quality);
    });
  }

  /** 圖片最長邊縮至 1920px，轉成 WebP 並控制在 1 MB 內 */
  async function optimizeNewsImage(file) {
    if (file.size <= 0 || file.size > maxSourceImageBytes) {
      throw new Error("原始圖片必須小於 5 MB。");
    }

    const image = await loadLocalImage(file);
    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;
    if (!sourceWidth || !sourceHeight) {
      throw new Error("無法取得圖片尺寸，請改用其他圖片。");
    }

    const initialScale = Math.min(1, maxImageEdge / Math.max(sourceWidth, sourceHeight));
    let width = Math.max(1, Math.round(sourceWidth * initialScale));
    let height = Math.max(1, Math.round(sourceHeight * initialScale));
    let lastBlob = null;

    // 若第一次仍超過 1 MB，逐次降低品質與尺寸，避免大圖占滿主機空間。
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("瀏覽器無法處理圖片，請改用其他圖片。");

      context.drawImage(image, 0, 0, width, height);
      const quality = Math.max(0.57, 0.82 - attempt * 0.05);
      lastBlob = await canvasToWebp(canvas, quality);
      if (lastBlob.size <= maxStoredImageBytes) break;

      width = Math.max(1, Math.round(width * 0.85));
      height = Math.max(1, Math.round(height * 0.85));
    }

    if (!lastBlob || lastBlob.size > maxStoredImageBytes) {
      throw new Error("圖片壓縮後仍超過 1 MB，請先縮小圖片再上傳。");
    }

    const baseName = file.name.replace(/\.[^.]+$/, "") || "news-image";
    return new File([lastBlob], `${baseName}.webp`, {
      type: "image/webp",
      lastModified: file.lastModified,
    });
  }

  /** 將時間戳字串轉為「日期 時間」雙行 HTML */
  function renderTimestamp(value) {
    if (!value) return "-";
    const parts = String(value).trim().split(/\s+/);
    return `<span class="admin-table__timestamp"><span>${escapeHtml(parts[0])}</span><span>${escapeHtml(parts.slice(1).join(" "))}</span></span>`;
  }

    /** HTML 轉義：防止 XSS */
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  /** 屬性值轉義：比 escapeHtml 多處理 backtick */
  function escapeAttribute(value) {
    return escapeHtml(value).replaceAll("`", "&#96;");
  }

  // ==========================================
  // 登入 / Session
  // ==========================================

  /** 登入表單送出 */
  async function onLoginSubmit(event) {
    event.preventDefault();
    const messageEl = document.querySelector("#loginMessage");
    messageEl.textContent = "登入中...";

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: csrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          username: document.querySelector("#loginUsername").value,
          password: document.querySelector("#loginPassword").value,
          captcha: document.querySelector("#loginCaptcha").value,
        }),
      });

      if (response.ok) {
        location.reload(); // 登入成功重新整理頁面
        return;
      }

      // 登入失敗：顯示錯誤、清空驗證碼、重新載入圖片
      messageEl.textContent = response.status === 429
        ? "登入嘗試過於頻繁，請稍後再試。"
        : "帳號、密碼或驗證碼錯誤。";
      document.querySelector("#loginCaptcha").value = "";
      loadCaptcha();
    } catch {
      messageEl.textContent = "目前無法連線，請稍後再試。";
    }
  }

  /** 檢查現有 Session 是否有效 */
  async function restoreSession() {
    try {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      if (response.ok) await showWorkspace();
    } catch {
      // Session 檢查失敗時保留登入表單，不做處理
    }
  }

  /** 顯示工作區（隱藏登入、載入資料） */
  async function showWorkspace() {
    loginPanel.hidden = true;
    workspace.hidden = false;
    await Promise.all([loadCategories(), loadNews()]);
  }

  /** 登出 */
  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST", headers: csrfHeaders() });
    location.reload();
  }

  // ==========================================
  // 資料載入與渲染
  // ==========================================

  /** 載入消息列表 */
  async function loadNews() {
    const response = await fetch(`/api/news?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const raw = await response.json();
    news = raw.map(normalizeNewsItem);
    renderNewsRows();
  }

  /** 載入分類列表 */
  async function loadCategories() {
    const response = await fetch(`/api/news/categories?ts=${Date.now()}`, { cache: "no-store" });
    categories = response.ok ? await response.json() : [];
    renderCategoryRows();
    renderCategoryOptions(tagSelect.value);
  }

  /** 正規化消息物件：相容 camelCase 與 PascalCase */
  function normalizeNewsItem(item) {
    const source = item ?? {};
    return {
      id: source.id ?? source.Id ?? "",
      date: source.date ?? source.Date ?? "",
      tag: source.tag ?? source.Tag ?? "",
      title: source.title ?? source.Title ?? "",
      content: source.content ?? source.Content ?? "",
      url: source.url ?? source.Url ?? "",
      imageUrl: source.imageUrl ?? source.ImageUrl ?? "",
      imageName: source.imageName ?? source.ImageName ?? "",
      attachmentName: source.attachmentName ?? source.AttachmentName ?? "",
      published: source.published ?? source.Published,
      createdAt: source.createdAt ?? source.CreatedAt ?? "",
      updatedAt: source.updatedAt ?? source.UpdatedAt ?? "",
    };
  }

  /** 渲染消息表格列 */
  function renderNewsRows() {
    newsRows.innerHTML = news.length
      ? news.map(item => {
        const isPublished = item.published !== false;
        const statusClass = isPublished ? "" : " admin-table__status--hidden";
        const statusText = isPublished ? "發布" : "隱藏";
        return `<tr>
          <td data-label="日期">${escapeHtml(item.date)}</td>
          <td data-label="分類">${escapeHtml(item.tag)}</td>
          <td data-label="標題">${escapeHtml(item.title)}</td>
          <td data-label="狀態"><span class="admin-table__status${statusClass}">${statusText}</span></td>
          <td data-label="建立">${renderTimestamp(item.createdAt)}</td>
          <td data-label="修改">${renderTimestamp(item.updatedAt)}</td>
          <td data-label="操作"><div class="admin-table__actions">
            <button class="admin-table__action" type="button" data-action="edit" data-id="${escapeAttribute(item.id)}">編輯</button>
            <button class="admin-table__action admin-table__action--danger" type="button" data-action="delete" data-id="${escapeAttribute(item.id)}">刪除</button>
          </div></td>
        </tr>`;
      }).join("")
      : '<tr><td class="admin-table__empty" colspan="7">目前尚無消息。</td></tr>';
  }

  /** 渲染分類列表 */
  function renderCategoryRows() {
    categoryRows.innerHTML = categories.length
      ? categories.map(cat => `<div class="admin-category-item">
          <span>${escapeHtml(cat)}</span>
          <button type="button" data-action="delete" data-name="${escapeAttribute(cat)}">刪除</button>
        </div>`).join("")
      : '<p class="admin-help">尚無分類。</p>';
  }

  /** 渲染分類下拉選單（合併既有分類 + 消息使用的標籤） */
  function renderCategoryOptions(selectedValue = "") {
    const merged = [...new Set(categories.concat(news.map(item => item.tag).filter(Boolean)))];
    tagSelect.innerHTML = merged.map(cat => `<option value="${escapeAttribute(cat)}">${escapeHtml(cat)}</option>`).join("");
    tagSelect.value = merged.includes(selectedValue) ? selectedValue : merged[0] || "";
  }

  // ==========================================
  // 列表點擊處理
  // ==========================================

  /** 消息列表點擊：編輯 / 刪除 */
  function onNewsRowClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = news.find(entry => entry.id === button.dataset.id);
    if (!item) return;
    if (button.dataset.action === "edit") editNews(item);
    if (button.dataset.action === "delete") deleteNews(item.id);
  }

  /** 分類列表點擊：刪除 */
  function onCategoryRowClick(event) {
    const button = event.target.closest("button[data-action='delete']");
    if (button) deleteCategory(button.dataset.name);
  }

  // ==========================================
  // 編輯 / 新增 消息
  // ==========================================

  /** 填入表單進行編輯 */
  function editNews(item) {
    document.querySelector("#newsId").value = item.id;
    document.querySelector("#newsDate").value = item.date || formatLocalDate(new Date());
    renderCategoryOptions(item.tag);
    document.querySelector("#newsTitle").value = item.title;
    document.querySelector("#newsContent").value = item.content || "";
    document.querySelector("#newsUrl").value = item.url || "";
    document.querySelector("#newsImageUrl").value = item.imageUrl || "";
    document.querySelector("#currentImageName").textContent = item.imageName || "未上傳";
    document.querySelector("#currentAttachmentName").textContent = item.attachmentName || (item.url ? item.url.split("/").pop() : "未上傳");
    document.querySelector("#removeNewsImage").checked = false;
    document.querySelector("#removeNewsAttachment").checked = false;
    document.querySelector("#newsPublished").value = String(item.published !== false);
    document.querySelector("#createdAtInfo").textContent = item.createdAt || "尚未紀錄";
    document.querySelector("#updatedAtInfo").textContent = item.updatedAt || "尚未紀錄";

    const messageEl = document.querySelector("#formMessage");
    messageEl.textContent = "";
    messageEl.removeAttribute("data-state");

    document.querySelector("#editor-title").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /** 儲存消息（新增或更新） */
  async function onNewsSave(event) {
    event.preventDefault();
    const messageEl = document.querySelector("#formMessage");
    messageEl.removeAttribute("data-state");
    messageEl.textContent = "儲存中...";

    // 收集表單資料
    const formData = new FormData();
    const fields = {
      id: document.querySelector("#newsId").value,
      date: document.querySelector("#newsDate").value,
      tag: tagSelect.value,
      title: document.querySelector("#newsTitle").value,
      content: document.querySelector("#newsContent").value,
      url: document.querySelector("#newsUrl").value,
      published: document.querySelector("#newsPublished").value === "true",
    };
    Object.entries(fields).forEach(([key, value]) => formData.append(key, String(value)));

    // 圖片/附件相關
    const currentImageName = document.querySelector("#currentImageName").textContent;
    const currentAttachmentName = document.querySelector("#currentAttachmentName").textContent;
    formData.append("imageName", currentImageName === "未上傳" ? "" : currentImageName);
    formData.append("attachmentName", currentAttachmentName === "未上傳" ? "" : currentAttachmentName);
    formData.append("removeImage", String(document.querySelector("#removeNewsImage").checked));
    formData.append("removeAttachment", String(document.querySelector("#removeNewsAttachment").checked));

    const imageFile = document.querySelector("#newsImageFile").files[0];
    const attachmentFile = document.querySelector("#newsAttachmentFile").files[0];
    if (imageFile) {
      try {
        messageEl.textContent = "圖片最佳化中...";
        const optimizedImage = await optimizeNewsImage(imageFile);
        formData.append("image", optimizedImage);
      } catch (error) {
        messageEl.dataset.state = "error";
        messageEl.textContent = error instanceof Error ? error.message : "圖片處理失敗。";
        return;
      }
    }
    if (attachmentFile) formData.append("attachment", attachmentFile);

    try {
      messageEl.textContent = "儲存中...";
      const response = await fetch("/api/news/save", {
        method: "POST",
        headers: csrfHeaders(),
        body: formData,
      });

      if (!ensureAuthorized(response)) return;

      const errorText = response.ok ? "" : await response.text();
      if (response.ok) {
        onResetForm();
        await loadNews();
        messageEl.dataset.state = "success";
        messageEl.textContent = "消息已成功儲存。";
      } else {
        messageEl.dataset.state = "error";
        messageEl.textContent = errorText || "儲存失敗，請檢查欄位內容。";
      }
    } catch {
      messageEl.textContent = "目前無法連線，請稍後再試。";
    }
  }

  // ==========================================
  // 分類管理
  // ==========================================

  /** 儲存分類 */
  async function onCategorySave(event) {
    event.preventDefault();
    const input = document.querySelector("#categoryName");
    const response = await fetch("/api/news/categories", {
      method: "POST",
      headers: csrfHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ name: input.value }),
    });
    if (!ensureAuthorized(response)) return;

    document.querySelector("#categoryMessage").textContent = response.ok ? "分類已更新。" : "分類儲存失敗。";
    if (!response.ok) return;

    input.value = "";
    categories = await response.json();
    renderCategoryRows();
    renderCategoryOptions(tagSelect.value);
  }

  /** 刪除分類 */
  async function deleteCategory(name) {
    if (!window.confirm("確定刪除這個分類？既有消息不會被刪除。")) return;
    const response = await fetch(`/api/news/categories/${encodeURIComponent(name)}`, {
      method: "DELETE",
      headers: csrfHeaders(),
    });
    if (!ensureAuthorized(response)) return;
    document.querySelector("#categoryMessage").textContent = response.ok ? "分類已刪除。" : "分類刪除失敗。";
    if (!response.ok) return;
    categories = await response.json();
    renderCategoryRows();
    renderCategoryOptions(tagSelect.value);
  }

  // ==========================================
  // 刪除消息
  // ==========================================

  /** 刪除消息 */
  async function deleteNews(id) {
    if (!window.confirm("確定刪除這則消息？")) return;
    const response = await fetch(`/api/news/delete/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: csrfHeaders(),
    });
    if (!ensureAuthorized(response)) return;
    if (response.ok) await loadNews();
  }

  // ==========================================
  // 共用輔助
  // ==========================================

  /** 檢查回應是否為 401 未授權，是則導回登入 */
  function ensureAuthorized(response) {
    if (response.status !== 401) return true;
    workspace.hidden = true;
    loginPanel.hidden = false;
    document.querySelector("#loginMessage").textContent = "登入已逾時，請重新登入。";
    return false;
  }

  /** 重設消息表單 */
  function onResetForm() {
    // 原生 reset 會清空 newsId、newsUrl、newsImageUrl、檔案欄位、
    // removeImage、removeAttachment 與其他 input/textarea/select。
    newsForm.reset();

    // 這些狀態文字不是表單控制項，必須另外重設。
    document.querySelector("#currentImageName").textContent = "未上傳";
    document.querySelector("#currentAttachmentName").textContent = "未上傳";
    document.querySelector("#createdAtInfo").textContent = "儲存後自動紀錄";
    document.querySelector("#updatedAtInfo").textContent = "儲存後自動紀錄";

    renderCategoryOptions();
    setDefaultDate();

    const messageEl = document.querySelector("#formMessage");
    messageEl.removeAttribute("data-state");
    messageEl.textContent = "";
  }

  /** 設定預設日期為今天 */
  function setDefaultDate() {
    document.querySelector("#newsDate").value = formatLocalDate(new Date());
  }
}

// ==========================================
// 啟動
// ==========================================
document.addEventListener("DOMContentLoaded", initAdmin);
