# APLI 企業官網 TODO

## 待處理事項

- [x] 無障礙與漸進增強稽核：4 項高優先問題修正（2026-08-22，覆核完成，待提交）。
  - company-history 面板隱藏：`wwwroot/css/pages/company-history.css` 移除第 86–93 行字面 `@@`，還原 `.milestone-panel[hidden]`／`:not(.is-active)[aria-hidden="true"]` 的 `display: none` 與 `.is-active` 進場動畫；`wwwroot/js/pages/company-history.js` 修正 `selectTab` 內重複巢狀 forEach，並同步切換 `hidden`、`is-active`、`aria-hidden`。無 JS 時 HTML 三個面板皆可讀（HTML 無寫死 `hidden`）。
  - services 面板隱藏：`wwwroot/css/pages/services.css` 第 42–47 行巢狀與重複 animation 規則重寫為 `[data-service-panel][hidden]`／`:not(.is-active)[aria-hidden="true"] { display: none; }`；`wwwroot/js/pages/services.js` `selectPanel` 同步設定 `panel.hidden`，維修輪播按鈕位於 `aria-hidden="true"`＋`display:none` 面板內時不可聚焦。
  - About 認證／獎項無 JS 降級：新增 `wwwroot/js/js-ready.js`（同步外部腳本於 `<head>` 樣式表前載入，CSP `script-src 'self'` 不允許 inline）；`wwwroot/css/pages/about.css` 折疊預設隱藏規則改以 `html.js` 限定，停用 JS 時全部認證／獎項內容直接可讀；啟用 JS 後「查看較早獎項／收合」互動與 `aria-expanded` 行為不變（`about.js` 未變更邏輯）。
  - 首頁最新消息與新聞列表伺服器端內容：`Services/NewsService.cs` 新增公開 `SortByLatest()`（CreatedAt→Date→Id 降冪），`Endpoints/NewsEndpoints.cs` 改用同一排序；`Services/NewsSeoService.cs` 新增 `RenderHomeLatest()`（首頁前 8 筆連結卡片）與 `RenderNewsList()`（完整列表 article/news-row），全部欄位經 `WebUtility.HtmlEncode`、id 經 `Uri.EscapeDataString`；`Program.cs` 公開頁 middleware 以 `<!-- home-latest-items -->`／`<!-- news-list-items -->` marker 注入，只渲染 `IsPublicNewsItem` 通過的資料；`index.html`／`news.html` 改放 marker，JS 成功後照舊 replaceChildren 重繪（不重複）；`home.js` API 失敗時若已有 SSR 卡片會保留原內容。
  - 版本參數更新：company-history.css/js、services.css/js、about.css/js、home.js、news.js 的 `?v=` 快取版本。
  - 已驗證：`dotnet build -c Release`（0 warnings、0 errors）；`node --check` company-history.js、services.js、home.js、js-ready.js、news.js 全數通過；`git diff --check`；Release 本機 HTTP 檢查——首頁、`/news`、有效 `/news/{id}` 回 200，不存在新聞 ID 與 `/news-detail` 回 404；首頁與新聞列表原始 HTTP 回應均含伺服器端新聞連結且 marker 已移除；桌機及 390px 瀏覽器 DOM 確認 company-history／services 初始與點擊切換時 `hidden`、`aria-hidden`、`display`、`aria-selected` 同步；About 啟用 JS 後顯示近期事件並正確隱藏較早事件；`/about` 於樣式表前載入 js-ready.js。
  - 未驗證：實際停用 JavaScript 的瀏覽器畫面（目前以原始 HTTP＋CSS 規則確認）、API 失敗情境的實際瀏覽器畫面、完整 Tab 焦點巡覽、螢幕閱讀器、跨瀏覽器、實體裝置與人工無障礙驗收。

- [ ] 無障礙與漸進增強稽核（2026-08-22，盤點完成）——其餘待處理項目：
  - ~~高優先：`wwwroot/css/pages/company-history.css:86-93` 含有字面 `@@`~~ → 已修正，見上方記錄。
  - ~~高優先：`wwwroot/css/pages/services.css:42-47` 分頁面板規則結構損壞~~ → 已修正，見上方記錄。
  - ~~高優先：About 認證事件依賴 JavaScript 加上 `.is-visible` 才顯示~~ → 已修正，見上方記錄。
  - ~~高優先：`news.html` 與首頁最新消息只由 JavaScript 呼叫公開 API 後建立列表~~ → 已修正，見上方記錄。
  - 中優先：桌機 Header 下拉選單只用透明度與 `pointer-events` 隱藏，未使用 `hidden`／`visibility`／`inert`；實際 Tab 順序在父選單 `aria-expanded="false"` 時仍會走到不可見的子選單連結。
  - 中優先：Services 輪播 HTML 初始 `aria-label` 的張數與順序錯誤（`wwwroot/services.html:123-136`、`:255-259`），必須等 JavaScript 執行後才會被改正。
  - 中優先：About 經營理念按鈕有 `aria-expanded` 但沒有 `aria-controls` 對應內容；按鈕內含 `<p>`，不符合 button 只含 phrasing content 的語意結構（`wwwroot/about.html:162-187`）。
  - 已確認的基礎項目：12 個公開頁面各有 1 個 `h1`；`aria-labelledby`／`aria-describedby`／`aria-controls` 目前未發現缺少目標；聯絡頁 iframe 有 title，營運資源／福利表格有欄／列 scope；skip link 與主要圖片替代文字大致存在。
  - 驗證方式：Release 本機瀏覽器 DOM、桌機 Tab 焦點順序、CSS 計算後面板狀態、原始 HTML／CSS／JavaScript 靜態盤點；未進行實體螢幕閱讀器、實際停用 JavaScript 的瀏覽器輔助工具、手機／跨瀏覽器與人工 WCAG 驗收。

- [x] 完成全站基本 SEO metadata（2026-08-22）。
  - 已完成：12 個公開頁面補齊唯一的 `<title>`、`meta description`、`og:type`、`og:site_name`、`og:title`、`og:description`、`og:locale` 與 `twitter:card`；首頁與 About 描述同步補強。
  - 內容與結構補強：About 首圖補上替代文字；新聞詳細頁保留文章標題為唯一 `h1`，並在載入文章後同步更新頁面標題、description、OG 標題／摘要與文章圖片替代文字。
  - 新聞內頁 SEO 架構已完成（2026-08-22）：`/news/{id}` 由伺服器依公開新聞資料輸出文章標題、日期、分類、段落與動態 metadata；未發布、日期尚未到或不存在的 ID 回傳 404，避免 soft 404。前端載入 API 後會清除伺服器段落再重新渲染，避免重複內容。
  - 尚未加入：canonical、`og:url`、`og:image`、Sitemap、JSON-LD；這些需要正式 Domain、網址策略與可公開存取的分享圖片後才能正確設定。
  - 已驗證：公開新聞與不存在 ID 的 Release HTTP 測試；`dotnet build -c Release`（0 warnings、0 errors）；`node --check wwwroot/js/pages/news-detail.js`；`git diff --check`。
  - 未驗證：正式搜尋引擎收錄、社群平台實際抓取預覽、正式環境 HTTP headers、桌機／手機瀏覽器、跨瀏覽器、實體裝置與人工無障礙驗收。

- [ ] 統一頁籤元件在停用 JavaScript 時的內容可讀性策略。
  - 檢查結果（2026-08-22）：四頁使用 `role="tab"` 元件，狀況不一致。
    - `services.html`（3 頁籤／3 面板）：HTML 未預設 `hidden`，由 `services.js` 初始化時才套用 → 停用 JS 時三個服務區塊全部可讀 ✓（建議作為全站標準模式）
    - `company-history.html`（3／3）：後 2 個年代面板在 HTML 寫死 `hidden` → 停用 JS 時僅能看見「2013 - 至今」✗
    - `affiliates.html`（6／6）：後 5 個關係企業面板寫死 `hidden` → 停用 JS 時僅能看見「世新貨櫃」✗
    - `careers.html`：非頁籤元件，單一區塊誤用 `role="tabpanel"` 且無對應 tablist／tab（附帶發現的 ARIA 語意問題）。
  - 技術背景：各頁 CSS 皆以 `[hidden]` attribute 控制顯示；`company-history.js`／`affiliates.js`／`services.js` 初始化時均會重套 `hidden`，因此移除 HTML 寫死的 `hidden` 不影響有 JS 的行為。所有頁籤皆為 `<button type="button">`，停用 JS 時可聚焦但點擊無效。
  - 建議做法：比照 Services 模式——HTML 移除寫死的 `hidden`，交由各頁 JS 初始化套用；順便修正 `careers.html` 的 ARIA 角色；驗證桌機／手機實際渲染與停用 JS 時的內容可讀性。


- [ ] 最後階段：完成正式企業網站 URL 與多語言內容策略。
  - 已完成（2026-08-22）：本專案直接採用 `/careers`、`/company-history` 與 `/news/{id}`；檔案同步改為 `careers.html`、`company-history.html`，`Program.cs` 已更新正式路由與目前 `.html` 路徑處理。未保留尚未上線專案的 `/join`、`/milestones` 與 `/news-detail` 正式路由；首頁、最新消息與新聞詳細頁已更新 JavaScript cache key，避免瀏覽器繼續使用舊新聞連結。
  - 尚未完成：確認正式 Domain、canonical URL、`operational-resources`→`operations`／`facilities`、中英文路由與內容策略；在策略定案前不加入絕對網址 SEO metadata。
  - 多語言方向：以 `/zh-tw/...` 與 `/en/...` 語言前綴區分版本；保留穩定的頁面 slug、新聞 ID、class／id／data-* 識別名稱；加入語言切換、`lang`、canonical、`hreflang` 與各語言 metadata。
  - 執行時機：主要頁面內容、路由與功能完成後最後處理；在此項完成前不進行大規模檔名或 URL 重構。
  - 驗證：各語言頁面連結、舊網址轉址、SEO metadata、語言切換、RWD、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`2f68685`。


- [ ] 首頁 Hero 下方區塊對齊舊版 — 關於亞太、服務項目、最新消息、經營理念、聯絡 CTA、人才招募 CTA。
  - 範圍：`wwwroot/index.html`、`wwwroot/css/pages/home.css`、`wwwroot/js/pages/home.js`
  - 狀態：程式與桌機畫面調整完成。Commit：`6070bc9`。
  - 已驗證：`node --check wwwroot/js/pages/home.js`、`git diff --check`、`dotnet build -c Release`（0 warnings、0 errors）、1280px 桌機瀏覽器畫面與互動。
  - 未驗證：實際手機寬度渲染、實體裝置、跨瀏覽器、人工無障礙驗收。


- [ ] 以舊版專案逐頁比對剩餘頁面內容區，確認文字大小、粗細、間距、按鈕、動畫、圖片位置與 RWD。
  - 建議順序：`about.html`、`company-history.html`、`operational-resources.html`、`services.html`、`occupational-safety.html`、`news.html`、`news-detail.html`、`careers.html`、`affiliates.html`、`contact.html`、`privacy.html`。
  - 驗證：尚未進行本輪逐頁驗收。

- [ ] 確認公開頁面是否維持 `wwwroot/*.html`，或逐步移轉為 Razor Pages；未確認前不進行大規模路由重構。

- [ ] 為首頁補做 390px 與 320px 實際渲染檢查，確認輪播、水平溢位、CTA 裁切與文字換行。

- [ ] 確認正式環境 HTTPS 憑證與部署設定；Development 已維持 HTTP 啟動，不再因找不到 HTTPS 連接埠觸發受限 Windows 帳號的 EventLog 錯誤。

- [ ] 完成主要頁面後安排跨瀏覽器、實體裝置與人工無障礙驗收。


- [ ] 再調淡 About 經營理念圖片遮罩。
  - 範圍：`wwwroot/css/pages/about.css`。
  - 內容：將 `philosophy-gallery__overlay` 漸層由 48%／4% 調整為 32%／0%，讓背景圖片更清楚。
  - 已驗證：`node --check wwwroot/js/pages/about.js`；暫存差異 `git diff --cached --check`；`git status --short`。
  - 未驗證：`dotnet build -c Release` 因既有 `.NET Host (PID 21820)` 鎖定 `bin\Release\net8.0\apli-website-rebuild.dll` 而失敗；桌機／手機瀏覽器渲染、圖片清晰度、hover／focus 實際互動、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受保留中的 `about.html` 與 `affiliates.html` 既有 trailing whitespace 影響。
  - 更新：2026-08-11。狀態：已提交，Commit：`87b2ba3`。

- [ ] 潛在問題：無 JS 時經營理念與時間軸內容可能全隱藏
  - 範圍：wwwroot/css/pages/about.css、 wwwroot/about.html。
  - 說明：經營理念說明文字依賴 [aria-expanded="true"] 顯示（CSS l.78），時間軸事件依賴 .is-visible 顯示（CSS l.120），兩者皆需 JS 加上。無 JS 環境下內容可能不可見，違反漸進增強原則。
  - 待驗證：停用 JS 重新載入頁面檢查內容可讀性、考慮在 CSS 加入預設顯示規則（如 :not([data-js-enabled]) 或預設 .is-visible）。

## 紀錄規則

- 待處理使用 `- [ ]`，完成使用 `- [x]`。
- 每個項目記錄範圍、日期與驗證狀態。
- 尚未實際驗證的內容必須標示「未驗證」。
- 已完成但尚未 commit 的內容必須標示「待提交」。
- 建立 commit 後補上 commit hash。
- 不把桌機瀏覽器檢查當成手機、跨瀏覽器、實體裝置或人工無障礙驗收。
- 新發現的問題與頁面差異必須加入本檔案，不只記錄在聊天或 commit 訊息。
