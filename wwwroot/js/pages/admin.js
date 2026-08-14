(() => {
  const loginForm = document.querySelector("#loginForm");
  const loginPanel = document.querySelector("#loginPanel");
  const workspace = document.querySelector("#workspace");
  const newsForm = document.querySelector("#newsForm");
  const newsRows = document.querySelector("#newsRows");
  const categoryForm = document.querySelector("#categoryForm");
  const categoryRows = document.querySelector("#categoryRows");
  const tagSelect = document.querySelector("#newsTag");
  const captchaImage = document.querySelector("#captchaImage");
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || "";
  let news = [];
  let categories = [];

  if (!loginForm || !loginPanel || !workspace || !newsForm || !newsRows || !categoryForm || !categoryRows || !tagSelect) return;

  loginForm.addEventListener("submit", login);
  newsForm.addEventListener("submit", saveNews);
  categoryForm.addEventListener("submit", saveCategory);
  newsRows.addEventListener("click", onNewsRowsClick);
  categoryRows.addEventListener("click", onCategoryRowsClick);
  document.querySelector("#logoutButton")?.addEventListener("click", logout);
  document.querySelector("#resetButton")?.addEventListener("click", resetForm);
  document.querySelector("#refreshCaptcha")?.addEventListener("click", loadCaptcha);
  setDefaultDate();
  loadCaptcha();
  restoreSession();

  function csrfHeaders(headers = {}) {
    return { ...headers, "X-CSRF-TOKEN": csrfToken };
  }

  function loadCaptcha() {
    if (captchaImage) captchaImage.src = `/api/admin/captcha?ts=${Date.now()}`;
  }

  async function login(event) {
    event.preventDefault();
    const message = document.querySelector("#loginMessage");
    message.textContent = "登入中…";

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
        location.reload();
        return;
      }

      message.textContent = response.status === 429
          ? "登入嘗試過於頻繁，請稍後再試。"
          : "帳號、密碼或驗證碼錯誤。";
      document.querySelector("#loginCaptcha").value = "";
      loadCaptcha();
    } catch {
      message.textContent = "目前無法連線，請稍後再試。";
    }
  }

  async function restoreSession() {
    try {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      if (response.ok) await showWorkspace();
    } catch {
      // The login form remains available when the session check cannot connect.
    }
  }

  async function showWorkspace() {
    loginPanel.hidden = true;
    workspace.hidden = false;
    await Promise.all([loadCategories(), loadNews()]);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", headers: csrfHeaders() });
    location.reload();
  }

  async function loadNews() {
    const response = await fetch(`/api/news?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    news = (await response.json()).map(normalizeNews);
    renderRows();
  }

  async function loadCategories() {
    const response = await fetch(`/api/news/categories?ts=${Date.now()}`, { cache: "no-store" });
    categories = response.ok ? await response.json() : [];
    renderCategories();
    renderCategoryOptions(document.querySelector("#newsTag").value);
  }

  function normalizeNews(item) {
    return {
      id: item.id ?? item.Id ?? "",
      date: item.date ?? item.Date ?? "",
      tag: item.tag ?? item.Tag ?? "",
      title: item.title ?? item.Title ?? "",
      content: item.content ?? item.Content ?? "",
      url: item.url ?? item.Url ?? "",
      imageUrl: item.imageUrl ?? item.ImageUrl ?? "",
      imageName: item.imageName ?? item.ImageName ?? "",
      attachmentName: item.attachmentName ?? item.AttachmentName ?? "",
      published: item.published ?? item.Published,
      createdAt: item.createdAt ?? item.CreatedAt ?? "",
      updatedAt: item.updatedAt ?? item.UpdatedAt ?? "",
    };
  }

  function renderRows() {
    newsRows.innerHTML = news.length
      ? news.map((item) => {
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

  function renderCategories() {
    categoryRows.innerHTML = categories.length
      ? categories.map((category) => `<div class="admin-category-item">
          <span>${escapeHtml(category)}</span>
          <button type="button" data-action="delete" data-name="${escapeAttribute(category)}">刪除</button>
        </div>`).join("")
      : '<p class="admin-help">尚無分類。</p>';
  }

  function renderCategoryOptions(selectedValue = "") {
    const merged = [...new Set(categories.concat(news.map((item) => item.tag).filter(Boolean)))];
    tagSelect.innerHTML = merged.map((category) => `<option value="${escapeAttribute(category)}">${escapeHtml(category)}</option>`).join("");
    tagSelect.value = merged.includes(selectedValue) ? selectedValue : merged[0] || "";
  }

  function onNewsRowsClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = news.find((entry) => entry.id === button.dataset.id);
    if (!item) return;
    if (button.dataset.action === "edit") editNews(item);
    if (button.dataset.action === "delete") deleteNews(item.id);
  }

  function onCategoryRowsClick(event) {
    const button = event.target.closest("button[data-action='delete']");
    if (button) deleteCategory(button.dataset.name);
  }

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
    const message = document.querySelector("#formMessage");
    message.textContent = "";
    message.removeAttribute("data-state");
    document.querySelector("#editor-title").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function saveNews(event) {
    event.preventDefault();
    const message = document.querySelector("#formMessage");
    const item = {
      id: document.querySelector("#newsId").value,
      date: document.querySelector("#newsDate").value,
      tag: tagSelect.value,
      title: document.querySelector("#newsTitle").value,
      content: document.querySelector("#newsContent").value,
      url: document.querySelector("#newsUrl").value,
      published: document.querySelector("#newsPublished").value === "true",
    };
    const formData = new FormData();
    Object.entries(item).forEach(([key, value]) => formData.append(key, String(value)));
    formData.append("imageName", document.querySelector("#currentImageName").textContent === "未上傳" ? "" : document.querySelector("#currentImageName").textContent);
    formData.append("attachmentName", document.querySelector("#currentAttachmentName").textContent === "未上傳" ? "" : document.querySelector("#currentAttachmentName").textContent);
    formData.append("removeImage", String(document.querySelector("#removeNewsImage").checked));
    formData.append("removeAttachment", String(document.querySelector("#removeNewsAttachment").checked));
    const imageFile = document.querySelector("#newsImageFile").files[0];
    const attachmentFile = document.querySelector("#newsAttachmentFile").files[0];
    if (imageFile) formData.append("image", imageFile);
    if (attachmentFile) formData.append("attachment", attachmentFile);

    document.querySelector("#formMessage").removeAttribute("data-state");
    message.textContent = "儲存中…";
    try {
      const response = await fetch("/api/news/save", {
        method: "POST",
        headers: csrfHeaders(),
        body: formData,
      });
      if (!ensureAuthorized(response)) return;
      const errorText = response.ok ? "" : await response.text();
      message.dataset.state = response.ok ? "success" : "error";
      message.textContent = response.ok ? "已儲存。" : errorText || "儲存失敗，請檢查欄位內容。";
      if (response.ok) {
        resetForm();
        await loadNews();
        message.dataset.state = "success";
        message.textContent = "消息已成功儲存。";
      }
    } catch {
      message.textContent = "目前無法連線，請稍後再試。";
    }
  }

  async function saveCategory(event) {
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
    renderCategories();
    renderCategoryOptions(tagSelect.value);
  }

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
    renderCategories();
    renderCategoryOptions(tagSelect.value);
  }

  async function deleteNews(id) {
    if (!window.confirm("確定刪除這則消息？")) return;
    const response = await fetch(`/api/news/delete/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: csrfHeaders(),
    });
    if (!ensureAuthorized(response)) return;
    if (response.ok) await loadNews();
  }

  function ensureAuthorized(response) {
    if (response.status !== 401) return true;
    workspace.hidden = true;
    loginPanel.hidden = false;
    document.querySelector("#loginMessage").textContent = "登入已逾時，請重新登入。";
    return false;
  }

  function resetForm() {
    newsForm.reset();
    document.querySelector("#newsId").value = "";
    document.querySelector("#newsUrl").value = "";
    document.querySelector("#newsImageUrl").value = "";
    document.querySelector("#currentImageName").textContent = "未上傳";
    document.querySelector("#currentAttachmentName").textContent = "未上傳";
    document.querySelector("#removeNewsImage").checked = false;
    document.querySelector("#removeNewsAttachment").checked = false;
    document.querySelector("#createdAtInfo").textContent = "儲存後自動紀錄";
    document.querySelector("#updatedAtInfo").textContent = "儲存後自動紀錄";
    renderCategoryOptions();
    setDefaultDate();
    document.querySelector("#formMessage").removeAttribute("data-state");
    document.querySelector("#formMessage").textContent = "";
  }

  function setDefaultDate() {
    document.querySelector("#newsDate").value = formatLocalDate(new Date());
  }

  function formatLocalDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function renderTimestamp(value) {
    if (!value) return "-";
    const parts = String(value).trim().split(/\s+/);
    return `<span class="admin-table__timestamp"><span>${escapeHtml(parts[0])}</span><span>${escapeHtml(parts.slice(1).join(" "))}</span></span>`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replaceAll("`", "&#96;");
  }
})();
