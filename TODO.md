# APLI Website Rebuild TODO

本檔案是專案唯一的待辦與進度紀錄。每次功能、介面、內容、資料、路由或驗證狀態有調整時，必須同步更新本檔案。

## 紀錄規則

- 待處理使用 `- [ ]`，完成使用 `- [x]`。
- 每個項目記錄範圍、日期與驗證狀態。
- 尚未實際驗證的內容必須標示「未驗證」。
- 已完成但尚未 commit 的內容必須標示「待提交」。
- 建立 commit 後補上 commit hash。
- 不把桌機瀏覽器檢查當成手機、跨瀏覽器、實體裝置或人工無障礙驗收。
- 新發現的問題與頁面差異必須加入本檔案，不只記錄在聊天或 commit 訊息。

## 進行中

- [ ] 首頁 Hero 下方區塊對齊舊版 — 關於亞太、服務項目、最新消息、經營理念、聯絡 CTA、人才招募 CTA。
  - 範圍：`wwwroot/index.html`、`wwwroot/css/pages/home.css`、`wwwroot/js/pages/home.js`
  - 狀態：程式與桌機畫面調整完成。Commit：`6070bc9`。
  - 已驗證：`node --check wwwroot/js/pages/home.js`、`git diff --check`、`dotnet build -c Release`（0 warnings、0 errors）、1280px 桌機瀏覽器畫面與互動。
  - 未驗證：實際手機寬度渲染、實體裝置、跨瀏覽器、人工無障礙驗收。
  - 更新：2026-08-11

## 下一步

- [ ] 以舊版專案逐頁比對剩餘頁面內容區，確認文字大小、粗細、間距、按鈕、動畫、圖片位置與 RWD。
  - 建議順序：`about.html`、`milestones.html`、`operational-resources.html`、`services.html`、`occupational-safety.html`、`news.html`、`news-detail.html`、`join.html`、`affiliates.html`、`contact.html`、`privacy.html`。
  - 驗證：尚未進行本輪逐頁驗收。
- [ ] 補齊 `privacy.html` 的正式隱私權政策內容；目前仍有 placeholder，需取得核定文案。
- [ ] 確認公開頁面是否維持 `wwwroot/*.html`，或逐步移轉為 Razor Pages；未確認前不進行大規模路由重構。
- [ ] 為首頁補做 390px 與 320px 實際渲染檢查，確認輪播、水平溢位、CTA 裁切與文字換行。
- [ ] 完成主要頁面後安排跨瀏覽器、實體裝置與人工無障礙驗收。

## 已完成紀錄

- [x] 建立單一來源共用 Footer，並依舊版規格完成桌機四欄與手機 accordion。
  - 單一來源：`Pages/Shared/_Footer.cshtml`；Razor Layout 直接引用，12 個靜態頁面由 `Program.cs` 伺服器端注入。
  - 行動版：隱私權政策與員工專區只保留在快速連結中，底欄只顯示水平置中的 copyright。
  - 已驗證：12 個靜態頁、網站根網址、`/News`、`/Privacy` 均輸出一份 Footer、隱私權政策與員工專區各一份；桌機 1280px 實際瀏覽器檢查；`node --check wwwroot/js/site.js`；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`。
  - 未驗證：手機實際渲染、實體裝置、跨瀏覽器、人工無障礙驗收。
  - 更新：2026-08-11。Commit：`6070bc9`。
- [x] 建立專案開發規範 `AGENTS.md`。
- [x] 建立 `README.md` 與 `TODO.md`，並制定每次調整同步更新紀錄的規則。更新：2026-08-11。Commit：`508f754`。
- [x] 完成首頁 Hero 輪播介面。Commit：`a64e4b2`。
- [x] 調整共用 Header 與下拉選單。Commit：`f0a9f6e`。
- [x] 校正首頁定案素材與 Logo。Commit：`b56a706`。
- [x] 依定案畫面建立首頁基礎版型。Commit：`ff7550a`。
- [x] 同步舊專案圖片素材。Commit：`71be0c8`。

## 更新紀錄

| 日期 | 範圍 | 紀錄 |
| --- | --- | --- |
| 2026-08-11 | 專案文件 | 新增 README、TODO，並將強制同步更新規則寫入 AGENTS.md。Commit：`508f754`。 |
| 2026-08-11 | 首頁下方區塊 | 完成視覺、輪播與驗證狀態記錄。Commit：`6070bc9`。 |
| 2026-08-11 | 共用 Footer | 建立單一 Partial、靜態頁伺服器端注入、桌機四欄與手機 accordion。Commit：`6070bc9`。 |
| 2026-08-11 | 首頁關於亞太按鈕 | 將文字與 share icon 間距調整為 12px、icon 縮至 16px；已做來源檢查、`git diff --check`、`node --check wwwroot/js/pages/home.js`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收。Commit：`6070bc9`。 |
| 2026-08-11 | 主要按鈕規範 | 將首頁「關於亞太」的「了解更多」按鈕記錄為本專案主要按鈕的視覺基準，規範同步寫入 README；本次為文件決策，未新增程式驗證。Commit：`508f754`。 |
| 2026-08-11 | 主要按鈕元件 | 新增 `.button--primary` 與主要按鈕 tokens，暫時註解原橘色 `.button` 樣式，首頁兩個 CTA 改用主要按鈕 class；已執行來源檢查、`git diff --check`、`node --check wwwroot/js/pages/home.js`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收。Commit：`508f754`。 |
| 2026-08-11 | 首頁關於亞太圖片與標題分隔線 | 桌機左圖縮為左欄寬度的 88% 並靠右對齊，使圖片高度貼近右側文字區塊；補回標題下方橘線，980px 以下恢復圖片滿寬；已執行 `dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；修改後瀏覽器重新載入受到本機 URL 安全政策阻擋，未驗證修改後桌機／手機瀏覽器渲染、跨瀏覽器、實體裝置與人工無障礙驗收。Commit：`6070bc9`。 |
| 2026-08-11 | 首頁服務項目卡片 | 依舊版調整卡片 6px 圓角、hover 上移與陰影、標題字體／大小／粗細／間距；`MORE` 改用 `.button--text-arrow` 共用樣式、`--color-primary-dark` 與 `.home-text-link__icon` inline SVG，並將相關尺寸與位移整理為 tokens；已驗證 1280px 桌機與 390px 手機瀏覽器計算樣式、`dotnet build -c Release`（0 警告、0 錯誤）、`git diff --check`；未驗證實體裝置、跨瀏覽器與人工無障礙驗收；Commit：`1e8c68a`。 |
| 2026-08-11 | 首頁服務項目 More icon | 依需求將三個 `MORE` 的 icon path 改為與「關於亞太／了解更多」相同的 Phosphor `share` 圖示造型；保留共用 `.button--text-arrow`、顏色、尺寸與 hover 位移；已完成來源替換與建置／差異檢查；實際視覺驗證由使用者確認；Commit：`1e8c68a`。 |
| 2026-08-11 | 首頁服務項目 More hover | 將 `.button--text-arrow` icon hover 位移調整為只向右 `2px`，與首頁「關於亞太／了解更多」的 `translateX(2px)` 一致；已執行 `dotnet build -c Release`（0 警告、0 錯誤）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`；實際視覺驗證由使用者確認；Commit：`1e8c68a`。 |
| 2026-08-11 | 首頁按鈕 icon 動畫 token | 新增 `--button-icon-transition`，讓「關於亞太／了解更多」與服務卡片 `MORE` 共用 `transform 180ms ease` 動畫設定；Commit：`1e8c68a`。 |
