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

- [x] 建立員工專區 `/Admin` 登入與最新消息管理頁。
  - 範圍：`Pages/Admin/Index.cshtml`、`Services/NewsService.cs`、`Program.cs`、`wwwroot/css/pages/admin.css`、`wwwroot/js/pages/admin.js`。
  - 狀態：已完成原生 CSS/JavaScript 頁面、Cookie 登入、登入限流、CSRF 與消息／分類 CRUD；補上與舊專案一致的啟動前帳密必要檢查；檔案上傳不在本次範圍。Commit：`0754ebe`。
  - 已驗證：`dotnet build -c Release`（0 warnings、0 errors）、`node --check wwwroot/js/pages/admin.js`、本次修改檔案的 `git diff --check`、未設定完整帳密時應用程式啟動失敗、`/Admin` 路由 200、1366px 登入畫面、390px 登入／工作區、錯誤帳密維持登入頁、正確測試帳密登入後載入 6 筆消息與 3 個分類、編輯／清空互動、頁面無水平溢位、瀏覽器 console 無 error/warning。
  - 未驗證：實際消息儲存／刪除、分類新增／刪除寫入操作；整體工作樹 `git diff --check` 仍有既有 `wwwroot/news.html:89` trailing whitespace；正式環境 HTTPS、實體裝置、跨瀏覽器、人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`0754ebe`。

- [ ] 最後階段：統一正式企業網站頁面命名，並建立可支援中英文的路由與內容策略。
  - 範圍：確認正式 canonical URL、檔名與無副檔名路由；評估 `join`→`careers`、`milestones`→`company-history`、`operational-resources`→`operations`／`facilities`、`news-detail`→`news/{id}`；保留舊 `.html` 路徑並規劃 301／308 轉址。
  - 多語言方向：以 `/zh-tw/...` 與 `/en/...` 語言前綴區分版本；保留穩定的頁面 slug、新聞 ID、class／id／data-* 識別名稱；加入語言切換、`lang`、canonical、`hreflang` 與各語言 metadata。
  - 執行時機：主要頁面內容、路由與功能完成後最後處理；在此項完成前不進行大規模檔名或 URL 重構。
  - 驗證：各語言頁面連結、舊網址轉址、SEO metadata、語言切換、RWD、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

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
- [ ] 確認正式環境 HTTPS 憑證與部署設定；Development 已維持 HTTP 啟動，不再因找不到 HTTPS 連接埠觸發受限 Windows 帳號的 EventLog 錯誤。
- [ ] 完成主要頁面後安排跨瀏覽器、實體裝置與人工無障礙驗收。

## 已完成紀錄

- [x] 整理健康安全、營運資源、隱私權與服務項目靜態頁標記。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/operational-resources.html`、`wwwroot/privacy.html`、`wwwroot/services.html`。
  - 內容：將既有壓縮 HTML 展開以利維護；保留單一 `<!-- shared-site-footer -->` 注入標記；服務頁補齊分頁籤 roving tabindex 與導覽箭頭，tabpanel 不新增額外 tab stop。
  - 已驗證：共用 Footer 標記來源檢查、素材路徑檢查、`node --check wwwroot/js/site.js`、`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。Commit：`b7fd2b2`。
- [x] 補充新視窗與任務交接規則，讓後續工作可從專案文件與 Git 接續，不必攜帶完整舊對話。
  - 範圍：`AGENTS.md`、`TODO.md`。
  - 內容：固定啟動檢查、單一頁面／區塊範圍、舊版唯讀參考、Git 權限界線，以及開始實作前強制詢問「主代理＋子代理模式」或「一般模式」；前者由主代理負責子代理分工與最終品質。
  - 已驗證：文件內容檢查、`git diff --check`。
  - 未驗證：不涉及程式或瀏覽器畫面。
  - 更新：2026-08-11。Commit：`b7fd2b2`。
- [x] 統一非首頁頁面的 Hero 圖片、遮罩、文字與進場動畫。
  - 共用元件：`wwwroot/css/components/page-hero.css`；遮罩、高度、標題與動畫參數集中於 `wwwroot/css/base/tokens.css`。
  - 頁面差異：一般頁面使用 25%→40% 淺遮罩，About 引文使用 52%→66% 深遮罩；9 個靜態頁及 About／News Razor 路由改用各頁專屬圖片與裁切變數。
  - 圖片與動畫：補上 6 秒 Hero 圖片縮放、文字進場與 `prefers-reduced-motion` 停用規則；`Program.cs` 新增 AVIF MIME 對應，避免瀏覽器選用 AVIF 後收到 404。
  - 已驗證：About 901px 桌機瀏覽器的共用結構、深遮罩、圖片裁切、動畫名稱與內容未溢出；服務頁共用結構；全部 Hero class／素材路徑來源檢查；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`。
  - 未驗證：AVIF MIME 修正後的完整逐頁瀏覽器重載、390px／320px 手機渲染、實體裝置、跨瀏覽器與人工無障礙驗收；本機新測試程序受既有 HTTPS 重新導向警告與 Windows EventLog 權限錯誤中斷。
  - 更新：2026-08-11。Commit：`aa1cab7`。
- [x] 統一 Breadcrumb 樣式，補齊 About 階層與子選單 Header active 狀態。
  - 範圍：`wwwroot/css/components/breadcrumb.css`、`wwwroot/css/site.css`、`wwwroot/css/layout/site-header.css`、`wwwroot/js/site.js`、About／News Razor Breadcrumb，以及各靜態頁既有 Breadcrumb class。
  - 內容：About 靜態頁與 `/about` 改為「首頁 › 關於我們 › 公司簡介」；各頁共用 `.page-breadcrumb` 基礎樣式；`site.js` 依目前 URL 標記子選單項目 `aria-current` 與父層 `.nav-link.is-active`，服務頁 hash 子項目保留同一父層 active 邏輯。
  - 已驗證：`node --check wwwroot/js/site.js`、`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`（0 warnings、0 errors）；來源結構與 selector 檢查。
  - 未驗證：桌機／手機瀏覽器渲染、子選單實際互動、實體裝置、跨瀏覽器與人工無障礙驗收；完整 `git diff --check` 仍受既有 `contact.html`、`join.html`、`milestones.html`、`news.html` trailing whitespace 影響。
  - 更新：2026-08-11。狀態：待提交。
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
| 2026-08-11 | 頁面命名與多語言規劃 | 記錄為最後階段處理：先完成主要頁面內容、路由與功能，再統一正式 canonical URL、舊 `.html` 轉址、`/zh-tw`／`/en` 語言前綴、翻譯內容策略與 `hreflang`／SEO metadata。狀態：待提交。 |
| 2026-08-11 | 靜態頁 HTML 整理 | 展開健康安全、營運資源、隱私權與服務項目 HTML，保留單一 Footer 注入標記並補齊服務頁籤鍵盤狀態；程式檢查通過，畫面驗證待進行。Commit：`b7fd2b2`。 |
| 2026-08-11 | 員工專區 `/Admin` | 新增獨立 Razor 登入／最新消息管理頁，使用原生 CSS/JavaScript；Program 補上 Cookie 認證、CSRF、登入限流、與舊專案一致的啟動前帳密必要檢查與消息／分類 API，帳號密碼由 `Admin__Username`／`Admin__Password` 環境變數提供；檔案上傳未納入。完成 1366px／390px 實際渲染、登入與資料載入、編輯／清空互動；消息／分類寫入操作、未設定帳密的啟動失敗、正式 HTTPS、實體裝置、跨瀏覽器與人工無障礙尚未驗證。`dotnet build -c Release`、`node --check wwwroot/js/pages/admin.js`、本次修改檔案 `git diff --check` 通過。Commit：`0754ebe`。 |
| 2026-08-11 | 新視窗交接流程 | 在 `AGENTS.md` 補充以文件與 Git 接續上下文、縮小單次範圍，並強制於實作前詢問「主代理＋子代理模式」或「一般模式」；已完成文件及差異檢查。Commit：`b7fd2b2`。 |
| 2026-08-11 | 非首頁共用 Hero | 建立共用 Hero 元件與深淺遮罩 tokens，換回 9 頁專屬圖片／裁切，補上圖片與文字動畫、reduced-motion 及 AVIF MIME；建置與差異檢查通過，逐頁手機與 MIME 修正後瀏覽器重載待驗證。Commit：`aa1cab7`。 |
| 2026-08-11 | 共用 Breadcrumb 與 Header active | 建立 `.page-breadcrumb` 共用樣式；About 與 `/about` 補齊「首頁 › 關於我們 › 公司簡介」；`site.js` 依 URL 標記子選單父層 `.nav-link.is-active` 與 `aria-current`。JS 語法與 Release 建置通過；瀏覽器渲染、互動、跨瀏覽器、實體裝置與人工無障礙待驗證；完整 `git diff --check` 受既有 4 個靜態頁 trailing whitespace 影響。狀態：待提交。 |
| 2026-08-11 | 專案文件 | 新增 README、TODO，並將強制同步更新規則寫入 AGENTS.md。Commit：`508f754`。 |
| 2026-08-11 | 首頁下方區塊 | 完成視覺、輪播與驗證狀態記錄。Commit：`6070bc9`。 |
| 2026-08-11 | 共用 Footer | 建立單一 Partial、靜態頁伺服器端注入、桌機四欄與手機 accordion。Commit：`6070bc9`。 |
| 2026-08-11 | 首頁關於亞太按鈕 | 將文字與 share icon 間距調整為 12px、icon 縮至 16px；已做來源檢查、`git diff --check`、`node --check wwwroot/js/pages/home.js`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收。Commit：`6070bc9`。 |
| 2026-08-11 | 主要按鈕規範 | 將首頁「關於亞太」的「了解更多」按鈕記錄為本專案主要按鈕的視覺基準，規範同步寫入 README；本次為文件決策，未新增程式驗證。Commit：`508f754`。 |
| 2026-08-11 | 主要按鈕元件 | 新增 `.button--primary` 與主要按鈕 tokens，暫時註解原橘色 `.button` 樣式，首頁兩個 CTA 改用主要按鈕 class；已執行來源檢查、`git diff --check`、`node --check wwwroot/js/pages/home.js`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收。Commit：`508f754`。 |
| 2026-08-11 | 首頁關於亞太圖片與標題分隔線 | 桌機左圖縮為左欄寬度的 88% 並靠右對齊，使圖片高度貼近右側文字區塊；補回標題下方橘線，980px 以下恢復圖片滿寬；已執行 `dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；修改後瀏覽器重新載入受到本機 URL 安全政策阻擋，未驗證修改後桌機／手機瀏覽器渲染、跨瀏覽器、實體裝置與人工無障礙驗收。Commit：`6070bc9`。 |
| 2026-08-11 | 首頁服務項目卡片 | 依舊版調整卡片 6px 圓角、hover 上移與陰影、標題字體／大小／粗細／間距；`MORE` 改用 `.button--text-arrow` 共用樣式、`--color-primary-dark` 與 `.home-text-link__icon` inline SVG，並將相關尺寸與位移整理為 tokens；已驗證 1280px 桌機與 390px 手機瀏覽器計算樣式、`dotnet build -c Release`（0 警告、0 錯誤）、`git diff --check`；未驗證實體裝置、跨瀏覽器與人工無障礙驗收；Commit：`bb547fb`。 |
| 2026-08-11 | 首頁服務項目 More icon | 依需求將三個 `MORE` 的 icon path 改為與「關於亞太／了解更多」相同的 Phosphor `share` 圖示造型；保留共用 `.button--text-arrow`、顏色、尺寸與 hover 位移；已完成來源替換與建置／差異檢查；實際視覺驗證由使用者確認；Commit：`bb547fb`。 |
| 2026-08-11 | 首頁服務項目 More hover | 將 `.button--text-arrow` icon hover 位移調整為只向右 `2px`，與首頁「關於亞太／了解更多」的 `translateX(2px)` 一致；已執行 `dotnet build -c Release`（0 警告、0 錯誤）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`；實際視覺驗證由使用者確認；Commit：`bb547fb`。 |
| 2026-08-11 | 首頁按鈕 icon 動畫 token | 新增 `--button-icon-transition`，讓「關於亞太／了解更多」與服務卡片 `MORE` 共用 `transform 180ms ease` 動畫設定；Commit：`bb547fb`。 |
| 2026-08-11 | 首頁服務卡片圓角 token | 新增 `--card-radius` 與 `--card-image-radius`，分別控制卡片與圖片圓角；已執行 `dotnet build -c Release`（0 警告、0 錯誤）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`；Commit：`94a022a`。 |
| 2026-08-11 | 首頁最新消息區塊 | 補回標題下方橘線；卡片與圖片改用圓角與共用 hover 陰影 token；修正 meta、標題、摘要對齊；`MORE` 改用 `.button--text-arrow`、`.home-text-link__icon` 與既有動畫 token；查看全部使用 `.button--primary`；輪播 viewport 沿用舊版右側延伸與手機 RWD；已執行 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收，實際視覺驗證由使用者確認；Commit：`24fd5cf`。 |
| 2026-08-11 | 首頁最新消息按鈕與 hover 陰影 | 補回「查看全部」的 Phosphor `share` inline SVG，沿用 `.button--primary`、`.home-text-link__icon` 與既有位移動畫；增加最新消息 viewport 底部空間，避免共用卡片 hover 陰影被輪播容器裁切而形成直線；已執行 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收，實際視覺驗證由使用者確認；Commit：`2defda0`。 |
| 2026-08-11 | 首頁經營理念區塊 | 最新消息與經營理念的 `strong` 標題恢復使用內文體；經營理念 icon 改為箭靶、團隊與燈塔；「了解經營理念」改為 `.button--primary`，文字更新為「了解更多」並沿用共用 share icon 與 hover 位移；已執行 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收，實際視覺驗證由使用者確認。Commit：`c0558d0`。 |
| 2026-08-11 | 首頁經營理念 icon 圖檔 | 移除經營理念區塊自行產生的 SVG，改直接引用 `wwwroot/public/images/icon` 內的 target、team 與 increase PNG；已執行 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收，第三項改用 `icons8-increase-100.png`。Commit：`5a3545d`。 |
| 2026-08-11 | 首頁聯絡與招募 CTA | 將聯絡我們與人才招募由兩個全滿版區塊合併為單一左右 CTA；預設顯示標題與內容，桌機 hover／鍵盤 focus 時展開分區並顯示按鈕，手機版堆疊並直接顯示按鈕；同步保留圖片縮放、鍵盤 focus 與 reduced-motion 支援。已執行 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收。Commit：`d6e963b`。 |
| 2026-08-11 | 首頁聯絡與招募 CTA 互動優化 | 參考 Split Landing Page 的 75%／25% hover 展開邏輯；縮小 CTA 高度與文字，明確設定左圖左文、右圖右文；按鈕保留白色邊線與白色文字，改用主要按鈕尺寸及 Phosphor share icon，連結分別導向 `contact.html` 與 `join.html`。已執行 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收。Commit：`2bb9ef8`。 |
| 2026-08-11 | 首頁聯絡與招募 CTA 按鈕與收縮狀態調整 | CTA 按鈕改為預設顯示並啟用 `contact.html`／`join.html` 連結；保留按鈕 hover icon 位移動畫，收縮側改為淡出內容，避免文字被擠壓搶走視覺焦點。已執行 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release` 與 `git diff --check`；未驗證瀏覽器畫面、跨瀏覽器、實體裝置與人工無障礙驗收。狀態：待提交。 |
