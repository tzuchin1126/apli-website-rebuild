# APLI 企業官網 TODO

## 待處理事項

- [ ] 統一頁籤元件在停用 JavaScript 時的內容可讀性策略。
  - 檢查結果（2026-08-22）：四頁使用 `role="tab"` 元件，狀況不一致。
    - `services.html`（3 頁籤／3 面板）：HTML 未預設 `hidden`，由 `services.js` 初始化時才套用 → 停用 JS 時三個服務區塊全部可讀 ✓（建議作為全站標準模式）
    - `milestones.html`（3／3）：後 2 個年代面板在 HTML 寫死 `hidden` → 停用 JS 時僅能看見「2013 - 至今」✗
    - `affiliates.html`（6／6）：後 5 個關係企業面板寫死 `hidden` → 停用 JS 時僅能看見「世新貨櫃」✗
    - `join.html`：非頁籤元件，單一區塊誤用 `role="tabpanel"` 且無對應 tablist／tab（附帶發現的 ARIA 語意問題）。
  - 技術背景：各頁 CSS 皆以 `[hidden]` attribute 控制顯示；`milestones.js`／`affiliates.js`／`services.js` 初始化時均會重套 `hidden`，因此移除 HTML 寫死的 `hidden` 不影響有 JS 的行為。所有頁籤皆為 `<button type="button">`，停用 JS 時可聚焦但點擊無效。
  - 建議做法：比照 Services 模式——HTML 移除寫死的 `hidden`，交由各頁 JS 初始化套用；順便修正 `join.html` 的 ARIA 角色；驗證桌機／手機實際渲染與停用 JS 時的內容可讀性。


- [ ] 最後階段：統一正式企業網站頁面命名，並建立可支援中英文的路由與內容策略。
  - 範圍：確認正式 canonical URL、檔名與無副檔名路由；評估 `join`→`careers`、`milestones`→`company-history`、`operational-resources`→`operations`／`facilities`、`news-detail`→`news/{id}`；保留舊 `.html` 路徑並規劃 301／308 轉址。
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
  - 建議順序：`about.html`、`milestones.html`、`operational-resources.html`、`services.html`、`occupational-safety.html`、`news.html`、`news-detail.html`、`join.html`、`affiliates.html`、`contact.html`、`privacy.html`。
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
