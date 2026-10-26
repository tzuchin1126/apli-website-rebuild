# TODO

- 已完成：依 company-history 最終整理版再簡化 JavaScript，改用直接 content 查找、`readMilestoneData`、`createYearPanel`、`yearButtons` 與 `appendChild`，移除 preview 變數、重複查找、三元運算與事件命名混淆。
- 已完成：確認 CSS 無 `milestones-motion-ready`／`is-vertical-timeline` 殘留，保留 1973 最後面板 `min-height: 60vh`，並移除 HTML 的 `data-milestones-preview`。
- 實際驗證：已更新 company-history JavaScript cache key。
- 未驗證：瀏覽器實際桌機／手機版面、1973 IntersectionObserver active 狀態、網址 hash 導頁、停用 JavaScript fallback、reduced-motion、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：補上 company-history 最後一個年份面板 `min-height: 60vh`，讓 1973 在頁面底部仍能進入 IntersectionObserver 偵測區。
- 已完成：移除 company-history 剩餘無效 wrapper／旗標與多餘 CSS，改用 `milestones-js-ready`，保留無 JavaScript fallback；移除不必要 overflow、寬度、min-width、grid display 與手機首項額外留白。
- 已完成：合併三個 fallback milestone panel 為單一 timeline，移除舊 panel id、preview content id 與過時結構；JS 移除 IIFE、年份格式檢查、viewport 變數與不必要的 panel DOM 查找。
- 實際驗證：已更新 company-history CSS／JS cache key。
- 未驗證：瀏覽器實際確認移除 `overflow-x: clip` 後的手機橫向溢出、1973 active 偵測、桌機／手機版面、停用 JavaScript fallback、reduced-motion、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：整理 company-history 頁面 CSS，保留無 JavaScript 直立 fallback 與目前左側年份導覽／右側內容版型，移除水平卡片、Sticky、中軸交錯與多輪歷史覆寫規則，並統一頁面內重複色彩為既有 token。
- 已完成：清理 company-history HTML，移除失效的 tabpanel／aria-live／多餘 role、隱藏 controls、過時註解與未使用頁面專屬 Hero class；服務子選單補上 Services hash 深層連結。
- 已完成：將 company-history 年份控制改為頁內導覽語意，以 `aria-current` 標示目前年份；移除不必要的 `toArray`、分組排序與重複 panelEntries，並共用 reduced-motion media query。
- 實際驗證：已搜尋 company-history HTML／JS／CSS 與共用 CSS 引用邊界，更新 CSS／JS cache key。
- 未驗證：瀏覽器實際桌機／手機版面、年份導覽捲動、停用 JavaScript fallback、reduced-motion、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：清理營運資源頁面已確認無作用、重複或被覆蓋的 CSS，合併頁面內的 760px 響應式規則，移除無引用 HTML class／單一圖片 picture 包裝／重複註解，保留既有版面、表格、位置網絡與動態效果。
- 已完成：將營運資源頁服務子選單連結補上 `/services#inland-yard`、`#warehousing`、`#terminal-handling`、`#maintenance` 深層連結。
- 已完成：將地理優勢進場動畫限制在 `prefers-reduced-motion: no-preference`，避免 reduced-motion 下因 selector 權重不足仍播放動畫；保留 tab、面板與按鈕圖示的 reduced-motion transition 關閉。
- 已完成：整理營運資源頁 JavaScript，改用明確迴圈建立 tabs／panels，移除不必要的集合轉換與 passive resize listener；分頁切換時重新計算面板高度，並保留 resize／手機 breakpoint 變化重算。
- 實際驗證：已搜尋 `site.css` 與其他頁面確認候選 selector 無外部引用；已更新 operational-resources CSS／JS cache key。
- 未驗證：瀏覽器實際桌機／手機版面、三個分頁切換高度、服務子選單 hash 導頁、reduced-motion 實際動畫狀態、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：移除 Services 業務諮詢區塊電話連結的瀏覽器預設下底線；原因是電話文字位於 `<a>` 內，底線由祖先連結產生，已針對該連結設定 `text-decoration: none`，不影響其他連結。
- 實際驗證：`git diff --check`、確認 Services CSS cache key 已更新。
- 未驗證：瀏覽器實際桌機／手機畫面、電話連結互動、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：調整 Services 頁面首次載入遮罩，加入 APLI logo 與等待指示器，保留現有頁面載入等待、10 秒保險解除、ARIA 狀態與 `prefers-reduced-motion` 支援；僅套用於 Services 頁面，未改變圖片載入策略。
- 已完成：將相同的 logo 與等待指示器套用至其他公開頁面的共用載入遮罩，並修正 About 頁面 preload 指向實際 Hero 圖片，避免預載未使用的 `company-facility.jpg`。
- 已完成：調整共用 page loader，不再等待可見圖片載入／解碼才顯示整頁；改由 Hero 自身背景色先承接，圖片完成後保留原有進場動畫，字型最多阻塞 1 秒。
- 已完成：為共用載入遮罩加入 logo 與等待指示器的退場過渡，載入完成時以 `200ms` 淡出並輕微縮小，並在 `prefers-reduced-motion` 下停用過渡。
- 已完成：清理 Services 頁面已確認無作用或重複的 CSS、HTML 與 JavaScript：移除未使用 modifier／wrapper／圖片 SVG 項目符號、合併重複底線樣式與單欄優勢區塊、修正輪播 ARIA 標籤與單圖維修區控制項，保留分頁、輪播拖曳、自動播放、鍵盤與 inert 行為。
- 已完成：補上 Services 分頁面板的 `resize` 高度重算，視窗縮放或手機轉向後會依目前 active panel 的 `scrollHeight` 更新 viewport 高度。
- 實際驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check`；確認 `site.css`／全專案搜尋沒有 Services 專用移除 selector 的其他引用，並更新 Services CSS／JS cache key。
- 未驗證：Services 桌機／手機實際畫面、分頁與輪播瀏覽器互動、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。
- 實際驗證：`git diff --check`、確認 logo 資源存在與 HTML／CSS 變更範圍。
- 未驗證：本機瀏覽器實際白屏時間、桌機／手機畫面、Hero 圖片冷載入、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

## 2026-10-26

- 已完成：調整最新消息詳細頁，移除 Hero 圖片與 Hero 標題，保留頁面頂端麵包屑；文章改為淺灰背景上的中央白色圓角卡片，桌機限制文章欄寬、圖片置中，手機改為滿寬內距並保留附件與返回列表互動。
- 已完成：將詳細頁麵包屑改為 Header 下方的置中橫列，並讓「返回最新消息」按鈕與下方文章標題共用相同內容欄寬及左緣。
- 已完成：將麵包屑改為與 `news-detail__meta` 共用相同的 `720px` 內容欄寬並左對齊，返回按鈕維持同一內容基準線。
- 已完成：修正詳細頁返回按鈕沿用 `.button--primary` 的置中排列問題，改為在共用內容欄寬內左對齊，與麵包屑及 `news-detail__meta` 對齊。
- 已完成：將返回按鈕由 inline flex 改為 block-level flex，讓水平 auto margin 生效，按鈕文字與下方文章標題的左緣一致。
- 已完成：縮短詳細頁麵包屑容器的最小高度，桌機調整為 `48–64px`、手機調整為 `48px`，減少 Header 下方多餘留白。
- 已完成：再次縮短詳細頁麵包屑容器高度，桌機調整為 `32–48px`、手機調整為 `40px`。
- 已完成：將最新消息詳細頁標題 `.news-detail h1` 調整為 `37px`、字重 `500`。
- 已完成：移除詳細頁分類 meta 的背景色，並將日期與分類的 `gap` 調整為 `3px`。
- 已完成：將 `.news-detail__header` 的 `padding-bottom` 收窄為 `20px`，讓標題更靠近下方分隔線。
- 已完成：將 `.news-detail__meta` 的 `margin-bottom` 調整為 `8px`，縮短日期／分類與標題的距離。
- 已完成：在最新消息詳細頁標題下方加入參考圖樣式的 Facebook、LinkedIn、Twitter 與分享節點四個圖示；分享節點依瀏覽器能力執行原生分享或複製連結，保留鍵盤操作與 ARIA 標籤。
- 已完成：縮小詳細頁分享列圖示比例。
- 已完成：依第二張參考圖再縮小分享 icon 與彼此間距，新增全域 `--color-text-subtle: #999999` 淺灰 token，分享列改用該 token。
- 已完成：補上新聞詳細頁 SSR 的 `og:url`；只有使用者上傳自訂圖片時才輸出 `og:image`、`og:image:alt` 與 `twitter:image`，沒有圖片時不產生預設截圖，並依圖片狀態切換 Twitter card 類型。
- 已完成：在最新消息詳細頁文章內容與附件下方補上「返回最新消息」按鈕，沿用文章內容欄寬與返回按鈕樣式，改善讀完文章後的回列表操作。
- 已完成：將文章底部返回按鈕改為水平置中、內容寬度，並沿用全域按鈕的品牌色與白色文字。
- 已完成：將文章底部返回按鈕改為遵循全域 `.button--primary` 的半透明橘底、品牌橘 hover／focus、白字與 focus outline，保留底部置中布局。
- 已完成：行動裝置的詳細頁標題 `.news-detail h1` 調整為 `26px`，並更新詳細頁 CSS 快取版本。
- 已完成：將文章底部返回按鈕與內容的 `margin-top` 調整為 `150px`，並更新詳細頁 CSS 快取版本，確保新間距實際載入。
- 實際驗證：`dotnet build -c Release`（0 warnings、0 errors）、`git diff --check`；待部署公開網址後以 Facebook Sharing Debugger 確認預覽快取。
- 未驗證：正式網域爬蟲可達性、Facebook／LinkedIn／Twitter 實際預覽、跨瀏覽器與社群平台快取更新。
- 實際驗證：`node --check wwwroot/js/pages/news-detail.js`、`git diff --check`；待瀏覽器確認各分享連結、複製連結與原生分享互動。
- 未驗證：跨瀏覽器、實體裝置與無障礙人工驗收。
- 實際驗證：`dotnet build -c Release`（0 warnings、0 errors）、`git diff --check`；嘗試以 Playwright 檢查詳細頁桌機／手機幾何，但目前環境沒有 `playwright` 模組而未能執行。
- 未驗證：詳細頁含／不含圖片與附件的實際桌機／手機畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：修正後台新增／修改最新消息時的超大 multipart 請求處理；附件前端限制為 10 MB，表單介面補上限制提示，後端在讀取表單前檢查 16 MiB 請求上限並將 Kestrel 的 413 轉為可讀錯誤訊息，避免未處理例外。
- 已完成：統一後台最新消息表單的儲存中、成功與錯誤訊息，集中在同一個提示區塊顯示，避免錯誤文字分散且補上連線失敗的錯誤狀態。
- 已完成：補上檔案安全掃描服務不可用時的具體錯誤訊息，並讓前端依 413、503 與其他空回應顯示明確原因，不再顯示「請檢查欄位內容」。
- 已完成：將檔案安全掃描失敗訊息改為使用者可理解的說法，明確指出不是欄位填寫錯誤，並依情況提示聯絡系統管理員或稍後再試。
- 已完成：為本機 `Development` 環境加入明確的檔案掃描略過流程，讓 macOS 測試可上傳圖片；正式環境找不到掃描工具仍會阻擋檔案，並保留警告紀錄。
- 實際驗證：`node --check wwwroot/js/pages/admin.js`、`dotnet build -c Release`（0 warnings、0 errors）、`git diff --check`。
- 未驗證：後台瀏覽器實際選取超過 10 MB 附件、新增／修改含附件流程、桌機／手機、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

## 2026-10-26

- 已完成：整理 News 詳細頁為 SSR 單一渲染流程，移除未使用的 related-news HTML／CSS、`news-detail.js` 與 `news.css` 載入；將附件檔案資訊、附件連結與重複標題段落判斷移至 `NewsSeoService`，保留圖片狀態的伺服器替換標記與附件安全檔名解碼 fallback；Hero 標題改為非 `h1`，文章標題保留唯一 `h1`。
- 實際驗證：確認 `PublicPageRenderer` 會對 `/news/{id}` 套用 `NewsSeoService.RenderDetailPage`；`dotnet build -c Release`、`node --check wwwroot/js/pages/news.js`、`git diff --check`。
- 未驗證：News 詳細頁 SSR 實際輸出、含／不含圖片與附件的桌機／手機畫面、錯誤路由、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：整理 News 列表實際生效的 CSS／SSR／JS 結構，移除被列表版面覆蓋的 Grid／手機重複規則、無作用篩選狀態規則與未使用的 `toArray`、附件／read-more 產生流程；保留 news-detail 相關卡片仍使用的共用 media／附件樣式與資料契約，並同步更新列表 cache key。
- 實際驗證：全專案搜尋確認 News 列表清理未刪除 news-detail 與 Admin／API 仍使用的圖片、附件與欄位；`node --check wwwroot/js/pages/news.js`、`git diff --check`、`dotnet build -c Release`。
- 未驗證：News／news-detail 桌機與手機實際畫面、SSR／API 瀏覽器互動、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：調整 News 列表資訊層級，將桌機日期與類別的間距收窄並保留標題與 meta 群組的適度間距；手機同步讓日期與類別更接近、標題稍微與群組分開。更新 `news.css` cache key。
- 實際驗證：`git diff --check`、`node --check wwwroot/js/pages/news.js`。
- 未驗證：News 頁面桌機／手機實際畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：依使用者提供的人力網公司資訊，重新潤飾 careers 頁面「加入亞太」兩段文案，改以公司整體物流背景、流程優化、人才培育與多元職涯方向為主，不針對單一工作崗位；另參考首頁服務區塊行動版的 `56px / 72px` 上下節奏，調整公司福利區塊間距並統一標題下方間距 token；同步清理福利分頁 JS 與無作用 CSS 宣告，改於 load／字型載入完成後重新測量目前面板高度，並在分頁切換時同步更新高度，並移除 careers recruitment 區塊的重複定位與選擇器宣告；福利圖示改用實際尺寸，並補強 tab 鍵盤 focus 外框。
- 實際驗證：`git diff --check`、`node --check wwwroot/js/pages/careers.js`、`dotnet build -c Release`；建置 0 warnings、0 errors。
- 未驗證：桌機／手機實際畫面、Hero 圖片裁切與按鈕位置、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：清理 careers HTML：福利表格裝飾圖示保留空白 `alt` 並移除重複 `aria-hidden`、招募背景圖改為 lazy loading、移除全專案無引用的 `join-career`／`join-benefits` id，以及移除福利 tab 靜態 `tabindex="-1"`，保留 JavaScript 啟動後的 roving tabindex 行為。
- 未修改：`role="status"` 已隱含 polite live region；`join-intro` 外框仍是 Scroll down 絕對定位的參考容器；Hero 仍是首屏圖片，保留 preload／高優先載入，尚未另行產製 2000px WebP 資產。
- 實際驗證：全專案搜尋確認兩個 id 無引用；`git diff --check`、`node --check wwwroot/js/pages/careers.js`、`dotnet build -c Release`。
- 未驗證：桌機／手機實際畫面、圖片最佳化後的裁切與載入表現、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

## 2026-10-25

- 已完成：清理聯絡我們頁面 HTML 冗餘：移除 `<main>` 多餘 `role`、單一圖片的 `picture`、hero 圖片預設 `loading="eager"`、未使用的 `contact-hero__overlay`／`contact-breadcrumb` class，並移除一層只包 iframe 的 map wrapper；同步調整 map CSS selector，保留桌機等高與手機比例規則。
- 實際驗證：`git diff --check`、`node --check wwwroot/js/site.js`、`dotnet build -c Release`；全專案搜尋確認未使用 class／wrapper 無殘留；本機瀏覽器確認 hero 圖片載入、iframe `loading="lazy"` 與 map section 僅保留直接 iframe 子項。
- 未驗證：聯絡頁桌機／手機實際畫面與地圖等高、hero 載入動畫、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：改善聯絡我們頁面的電話與信箱連結互動回饋，hover／鍵盤 focus 顯示主色與底線；確認 `reset.css` 未移除全域 focus 外框。統一聯絡頁 `site.js` cache key、將 Google Maps iframe 改為 lazy 載入，並新增 2000px hero JPEG 與 `srcset`／`imagesrcset` 響應式來源。
- 實際驗證：`git diff --check`、`node --check wwwroot/js/site.js`、`dotnet build -c Release`；本機瀏覽器確認 hero `srcset`／preload、`site.js` cache key 與 iframe `loading="lazy"`。
- 未驗證：瀏覽器 hover／focus 實際畫面、手機與實體裝置載入選圖、Google Maps 延遲載入、跨瀏覽器與無障礙人工驗收。
- 備註：目前 `contact.html` 的 hero preload 已位於 CSS stylesheet 前方，因此未重排該段。
- Commit：無，尚未提交。

- 已完成：清理聯絡我們頁面 CSS 冗餘宣告：移除共用 Hero 已提供的 mobile `center`、重複 padding、Grid 預設 stretch／單欄設定、非必要 height、dd font-style、link display／重複狀態色、map wrapper overflow／min-width 與 iframe 預設圓角；保留 iframe `border: 0`、`min-height: 0` 及地圖等高鏈所需的 wrapper／iframe `height: 100%`。
- 實際驗證：`git diff --check`；搜尋確認共用 Hero 的 `center` fallback 與現行等高規則。
- 未驗證：聯絡頁面桌機／手機實際畫面與地圖等高、Google Maps 載入、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：聯絡我們頁面採用 B 方案，移除地圖 `clamp(460px, 38vw, 540px)`，保留桌機 `height: 100%`，讓 Google Maps iframe 與左側聯絡資訊欄等高；保留 `min-height: 0` 避免舊的全域最小高度干擾。
- 實際驗證：`git diff --check`。
- 未驗證：聯絡頁面桌機／手機實際地圖高度、Google Maps 載入、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：清理 occupational-safety HTML：移除沒有 `<source>` 的 `picture` wrapper、未被全專案使用的 `safety-hero*`／`safety-breadcrumb` class、單一 `h2` wrapper 與 logo 的預設 eager 載入；專業證照清單勾勾改由 `li::before` 使用 Phosphor 實體碼呈現，移除重複的 icon HTML 與 `ph-*` class。
- 實際驗證：`git diff --check`；全專案搜尋確認移除的 class 與 list icon 沒有殘留引用。
- 未驗證：職業安全衛生頁面桌機／手機實際畫面、清單勾勾字形與對齊、圖片載入、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：整理 occupational-safety 專業證照卡片樣式，移除未被變體覆寫的 accent 局部變數並直接使用全域 surface token；新增 `--safety-credentials-gap` 統一 carousel gap 與卡片寬度計算；將 intro 標題固定字重改用既有 `var(--font-weight-medium)`，保留其與專業證照標題的刻意層級差異。
- 實際驗證：`git diff --check`。
- 未驗證：職業安全衛生頁面桌機／手機實際畫面、不同 gap 下卡片寬度、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：清理 occupational-safety 專業證照 carousel 的無作用 `margin-left`、`scroll-padding-inline-start`、卡片 `border`、多餘 `align-self`、清單 `min-height` 與重複底色宣告；確認 `reset.css` 未全域歸零標題 margin／padding，因此保留 `h3` 的局部歸零。
- 實際驗證：`git diff --check`。
- 未驗證：職業安全衛生頁面桌機／手機實際畫面、carousel 版面與滑動、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：清理 occupational-safety 頁面 JavaScript 中誤置入的營運資源函式與初始化呼叫，將 `Number.parseFloat` 簡化為 `parseFloat`；移除專業證照舊版圓點分頁 CSS、空 pager 與相關 HTML，保留現行上一張／下一張 carousel 控制。
- 實際驗證：`node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check`。
- 未驗證：職業安全衛生頁面桌機／手機實際畫面、carousel 點擊與滑動、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將行動裝置左右切換按鈕改為卡片區底部中央左右並排，並增加 carousel 底部空間，避免按鈕遮住卡片內容。
- 實際驗證：`git diff --check`。
- 未驗證：實際行動裝置按鈕位置、點擊滑動、陰影與 Footer 距離、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：恢復行動裝置專業證照左右切換按鈕，並將按鈕定位在卡片區左右內側，避免超出螢幕；觸控水平滑動仍保留。
- 實際驗證：`git diff --check`。
- 未驗證：實際行動裝置按鈕位置、點擊滑動、陰影與 Footer 距離、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：補回行動裝置卡片滑動 viewport 的上下 padding，避免 `overflow-x: auto` 將專業證照卡片的上下陰影裁切；維持水平滑動與卡片尺寸不變。
- 實際驗證：`git diff --check`。
- 未驗證：實際行動裝置陰影、滑動與 Footer 距離、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：增加行動裝置專業證照區塊的下方留白，使用全域 `var(--section-space-lg)`，拉開卡片與 Footer 的距離；上方與桌機間距維持不變。
- 實際驗證：`git diff --check`。
- 未驗證：實際行動裝置畫面、Footer 距離、卡片滑動與其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將行動裝置專業證照卡片標題 `.safety-credential-card__title h3` 改用全域 `var(--font-size-body-lg)`，約 18px；桌機維持原字級。
- 實際驗證：`git diff --check`。
- 未驗證：實際行動裝置畫面、卡片滑動與其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：在專業證照卡片區左右加入上一張／下一張 SVG icon 按鈕，接入水平滑動控制、disabled 狀態、鍵盤 focus 與 ARIA 標籤；手機隱藏按鈕並保留觸控滑動。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器按鈕位置、滑動動畫與分頁互動、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將專業證照卡片桌機可視比例調整為約 2.5 張，讓卡片內容更寬鬆並保留水平滑動查看後續卡片的提示；手機版維持原設定。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器卡片可視數量、滑動與分頁互動、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將專業證照卡片可視比例由約 3.5 張調整為約 3.25 張，讓卡片稍微放寬並保留第四張卡片露出提示，降低畫面擁擠感。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器卡片可視數量、滑動與分頁互動、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：調整專業證照卡片桌機寬度為約 3.5 張可視比例，讓第四張卡片露出部分以提示可水平滑動；同步更新 `1099px` 以下與 `1100px` 以上斷點，手機卡片比例維持原設定。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器卡片可視數量、滑動與分頁互動、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將專業證照 `header` 的標題與描述由置中恢復為左側對齊，保留 `header` 直接包含 `h2` 與 `p` 的語意結構。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、卡片滑動與其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：移除專業證照 `header` 內多餘的 `.safety-credentials__heading-copy` div，改為 `header` 直接包含 `h2` 與 `p`，並以 Grid 讓標題與說明完整置中，避免 flex 子區塊只佔半寬。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、卡片滑動與其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將 occupational-safety「專業證照」標題與說明文字置中，並讓說明文字的最大寬度區塊以自動左右 margin 居中。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、卡片滑動與其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將 occupational-safety 專業證照區塊外層、標題與卡片滑動內容統一為 `1056px` 最大寬度及桌機 `32px` 內距，手機使用 `24px` 內距，讓區塊左緣與上方首段敘述一致。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、卡片滑動與其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將 occupational-safety `.safety-credential-card li` 清單文字由標題色改為敘述文字色 `var(--color-text-body)`，並更新頁面 CSS cache key。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將 occupational-safety 首段敘述中的 `ISO 45001` 使用專用 class 標示，改用全域主色 `var(--color-primary)` 提高辨識度。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：在 occupational-safety 首段第一段敘述於「面對貨櫃場」前加入換行，分開呈現人員福祉與作業情境說明。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：以首頁「關於亞太」為準，統一 occupational-safety 首段敘述的行高為 `var(--line-height-body)`、文字對齊為左右對齊、段落 margin 為 `0`，並更新頁面 CSS cache key。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將 occupational-safety 首段敘述文字大小改回專案既有全域 `--font-size-body`（`1rem / 16px`），移除專用的 `--font-size-content` token，避免重複定義一般內文尺寸。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：恢復 occupational-safety 首段標題「安全，是每一項作業的前提」原本的特殊字體，使用全域 `--font-special`。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將 occupational-safety 首段文字大小、字重、顏色、段落間距、行高與字距改用全域 token；於 `base/tokens.css` 新增語意化的標題內容間距與段落間距 token，並更新頁面 CSS cache key。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：調整 occupational-safety 首段內部間距，標題與第一段敘述增加 `20px` 間距，兩段敘述間距縮為 `8px`，最後一段移除多餘底部 margin。
- 實際驗證：`git diff --check`。
- 未驗證：實際瀏覽器畫面、其他桌機／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。


- 已完成：修正 occupational-safety 首段造成隱含欄位的 Grid 設定：將首段介紹標題收回 `.safety-intro__lead` 單欄內容，移除獨立 `grid-area: heading` 與手機舊定位，將 `grid-template-areas` 改為單欄一致的 `"lead" / "health"`；桌機 `.safety-intro__layout` 的 `row-gap` 為 `72px`，手機為 `40px`。
- 實際驗證：`git diff --check`。
- 未驗證：1046px 實際瀏覽器欄寬、其他桌機／筆電／手機斷點、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：依參考網站結構重整 occupational-safety 首段：第一區改為整欄兩段文字；第二區改為左欄「健康守護」、右欄健康支持條列的 `1fr / 2fr` Grid；桌機採 `1056px` 容器、`32px` 內距與 `72px` 區塊留白，手機改為單欄。
- 實際驗證：`git diff --check`；更新 occupational-safety CSS cache key 至 `20261025-intro-reference-layout-v2`。
- 未驗證：桌機／筆電／手機實際文字寬度、段落換行、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：清理 occupational-safety 首段移除圖片後殘留的 `safety-intro__media` 響應式規則與 `media` grid area，桌機／手機首段均維持標題、兩段文字與健康支持條列的純文字結構。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際文字寬度與段落間距、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：移除 occupational-safety 頁面首段說明區的 `safety-intro__media` 圖片，保留標題、兩段說明與健康支持條列，並將首段改為單欄純文字敘述版型，貼近參考圖呈現。
- 實際驗證：`git diff --check`；更新 occupational-safety CSS cache key 至 `20261025-intro-text-only-v1`。
- 未驗證：桌機／筆電／手機實際文字寬度與段落間距、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將 `resource-data-switcher__panel-viewport` 從置中改為左側對齊，讓表格左緣與上方說明文字開頭一致；桌機仍維持最大 `1200px`，手機維持滿寬。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際對齊、表格寬度、切換動畫、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將 `resource-data-switcher__panel-viewport` 桌機呈現收窄並置中，最大寬度調整為 `1200px`；手機版維持 `100%` 滿寬，保留資料切換與表格內容。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際表格寬度、切換動畫、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：恢復「安心職場」背景圖片裁切位置為 `object-fit: cover` 搭配 `object-position: center 45%`，並更新 CSS cache key 至 `20261025-safety-overlay-v8`。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器實際圖片裁切、桌機／筆電／手機畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將「安心職場」背景圖片裁切位置由 `center 45%` 改為較明顯的 `center 30%`，並更新 CSS cache key 至 `20261025-safety-overlay-v7`。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器實際圖片裁切、桌機／筆電／手機畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將「安心職場」背景圖片裁切位置調整為 `object-fit: cover` 搭配 `object-position: center 45%`，並更新 CSS cache key 至 `20261025-safety-overlay-v6`。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器實際圖片裁切、桌機／筆電／手機畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：修正敘述段落仍保留瀏覽器預設 margin 導致標題間距看似未變的問題，為安全區塊敘述加入 `margin: 0`，並將 cache key 更新為 `20261025-safety-overlay-v5`。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器實際快取更新、桌機／筆電／手機畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：更新 operational-resources CSS cache key 至 `20261025-safety-overlay-v4`，確保標題與敘述 `4px` 間距及近期安全區塊樣式調整會重新載入。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器實際快取更新、桌機／筆電／手機畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：再縮小「安心職場」標題與敘述的上下間距，由 `8px` 調整為 `4px`。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：微幅收窄「安心職場」`.resource-overlay` 內容層，調整為 `min(64%, 720px)`，保留較長敘述行寬並避免內容層過度延伸。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、長文換行、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：加寬「安心職場」`.resource-overlay` 內容層，寬度由 `min(58%, 620px)` 調整為 `min(68%, 760px)`，讓敘述區塊可顯示較長行文並減少換行。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、長文換行、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：修正「安心職場」標題與敘述間距未實際縮小的原因，清除安全區塊 `h2` 預設 margin，改由 `.resource-body { margin-top: 8px; }` 明確控制標題與敘述距離。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：縮小「安心職場」標題與敘述之間的距離，將內容層上方間距由區塊級 `var(--section-content-gap)` 調整為 `8px`，保留圖片滿版、左對齊與按鈕間距。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：清理營運資源頁本次安全區塊調整留下的覆寫式 CSS，移除舊通用 `.resource-feature`／安全區塊末端補丁與重複響應式規則，改由 `.resource-feature--data` 與 `.resource-feature--safety` 各自負責版型。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、圖片裁切焦點、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：將「安心職場」區塊移出 `site-container` 的左右內容寬度限制，改由安全區塊本身使用 `width: 100%`，讓圖片延伸到頁面左右兩側、不再露出白色背景；同時將安全樣式整理至正式責任區，不再使用檔案末端覆寫式補丁。
- 實際驗證：`git diff --check`；CSS cache key 更新為 `20261025-safety-overlay-v3`。
- 未驗證：桌機／筆電／手機實際畫面、圖片裁切焦點、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：明確將「安心職場」外層卡片設為 `padding: 0`，圖片層覆蓋整個卡片範圍；文字間距只保留在內容覆蓋層，確保內容 padding 區域也有背景圖片。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、圖片裁切焦點、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：修正「安心職場」標題在覆蓋層中受既有 `align-self: end` 影響而未與敘述左側對齊的問題，改為與敘述共用左起點；同步更新 operational-resources CSS cache key 至 `20261025-safety-overlay-v2`，確保圖片滿版與對齊修正載入。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、圖片裁切焦點、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：依參考圖再調整營運資源頁「安心職場」區塊，明確讓圖片層貼齊整個卡片四側、不受內容 padding 影響；標題與內文固定左對齊；桌機與手機區塊高度下修，避免圖片過高。
- 實際驗證：`git diff --check`。
- 未驗證：桌機／筆電／手機實際畫面、圖片裁切焦點、跨瀏覽器、實體裝置與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：調整營運資源頁「職業安全衛生」區塊，改為圖片填滿整個區塊並以內容覆蓋層呈現；標題改用中標題 token 並改為較概念性的「安心職場」，保留說明文字、連結、圖片替代文字與桌機／手機 RWD 結構。
- 實際驗證：`dotnet build -c Release --no-restore`、`git diff --check`；確認頁面 CSS cache key 已更新為 `20261025-safety-overlay-v1`。
- 未驗證：桌機／筆電／手機實際畫面、圖片裁切焦點、跨瀏覽器、實體裝置與無障礙人工驗收；本次本機伺服器未成功啟動，Node 環境也缺少 `playwright` 模組。
- Commit：無，尚未提交。

- 已完成：恢復首頁「我們的服務」卡片 Hover 的前一版設定，移除本次固定圖片尺寸、絕對定位說明文字、獨立遮罩與分階段文字動畫實驗；保留原本卡片尺寸、圖片、遮罩與展開互動。
- 實際驗證：`git diff --check`、確認實驗專用 CSS 規則已移除。
- 未驗證：桌機／筆電／手機實際 Hover 畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：Hero 圖片縮小動畫限定於首次進入頁面的初始圖片；手動切換、自動輪播與循環回到第一張時不再重複縮放。
- 實際驗證：`node --check wwwroot/js/pages/home.js`、`git diff --check`。
- 未驗證：桌機／筆電／手機實際首次載入與輪播畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁 Hero 改為整幅水平滑動輪播，切換時圖片、文案與按鈕同步由左側滑出／右側滑入，使用 `ease` 緩動；保留原本自動播放、圓點、手機滑動與其他進場動畫。
- 實際驗證：`node --check wwwroot/js/pages/home.js`、`git diff --check`。
- 未驗證：桌機／筆電／手機實際切換畫面、快速連續切換、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：行動版最新消息統一日期與分類為 `14px`、標題為 `16px`，並讓置頂消息分類沿用列表分類的主題色。
- 實際驗證：`git diff --check`。
- 未驗證：行動裝置實際畫面、桌機版不受影響、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：行動版首頁最新消息統一置頂消息與列表消息的日期、分類、標題呈現樣式；保留置頂圖片與 icon 作為辨識，不再放大置頂標題。
- 實際驗證：`git diff --check`。
- 未驗證：行動裝置實際畫面、桌機版不受影響、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁最新消息列表補上消息分類，並讓日期與分類之間使用與置頂消息相同的 `12px` 間距；桌機與手機列表同步套用。
- 實際驗證：`node --check wwwroot/js/pages/home.js`、`git diff --check`。
- 未驗證：首頁桌機／筆電／手機列表文字排列、長分類名稱、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁聯絡我們區塊保留原本 `background-attachment: fixed` 的視窗背景效果，桌機／筆電將背景垂直取景由 `50%` 調整為 `60%`，讓頁面底部更聚焦手部握手區域。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電不同視窗高度與頁面底部的握手位置、手機版背景、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：行動版服務卡片底部四個頁碼指示改為固定長度、固定間距與固定粗細，僅以目前卡片對應線條的橘色填滿狀態區分，非目前項目維持灰色。
- 實際驗證：尚待執行。
- 未驗證：手機／平板指示線實際間距、滑動同步、鍵盤操作、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：行動版服務卡片因標題與敘述已直接顯示，隱藏右下角圖片展開 icon，避免與底部拖曳頁碼指示重複；桌機版保留展開 icon。
- 實際驗證：尚待執行。
- 未驗證：手機／平板服務卡片文字與拖曳指示的視覺平衡、桌機 icon 保留、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁行動版「我們的服務」保留原生左右拖曳與 scroll-snap，新增依四張卡片顯示的底部頁碼指示點；拖曳時會同步目前卡片，點擊指示點可滑動至對應卡片，桌機版不顯示。
- 實際驗證：尚待執行。
- 未驗證：手機／平板觸控拖曳、指示點同步與鍵盤操作、桌機不顯示、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：全站 `.nav-menu__title` 統一提高為 `600` 字重，並將分類標題文案與 header 主選單統一為「關於我們」與「服務項目」；首頁與其他頁面維持一致。
- 實際驗證：尚待執行。
- 未驗證：首頁／內頁桌機與手機下拉選單文字、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：header 子選單方框移除實體邊線，改用白色背景、`10px` 圓角與 `0 0 8px 0 rgb(2 2 2 / 15%)` 四周均勻柔和陰影；手機版維持無陰影的全螢幕選單。
- 實際驗證：尚待執行。
- 未驗證：首頁／內頁桌機下拉方框、手機展開選單、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁 header 下拉子選單同步與 header 底部重疊約 14px，並將首頁下拉分類標題字重由 `500` 提高至 `600`；一般內頁維持原本設定。
- 實際驗證：尚待執行。
- 未驗證：首頁桌機／筆電下拉定位與分類標題字重、手機點擊展開、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：header 桌機下拉子選單顯示既有 `.nav-menu__title` 分類標題，再列出子選單項目；桌機面板上移至 header 底部內約 14px，形成參考畫面的重疊效果；手機版維持全螢幕選單結構並同步顯示標題。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電下拉定位與 hover／focus 狀態、手機點擊展開、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁行動版開啟選單的主導覽標題字重由 `600` 調整為全站標題級距 `500`，降低文字厚重感，保留原字級、間距與選單互動。
- 實際驗證：尚待執行。
- 未驗證：手機／平板實際選單畫面、展開與收合狀態、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務卡片右下角導向圖示由單一 chevron 改為對角雙向外展箭頭，並在 hover／鍵盤 focus 時微幅放大，明確提示圖片可展開查看；保留卡片連結與既有互動。
- 實際驗證：`git diff --check`；瀏覽器畫面驗證尚待執行。
- 未驗證：桌機／筆電／手機圖示位置與辨識度、展開動畫、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務卡片右下角圖示改為對角雙向外展箭頭，對應「arrows-out-simple」的展開意象；保留 hover／鍵盤 focus 微幅放大效果。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機圖示實際外觀與辨識度、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務卡片展開圖示改用較細的 Light 版本，縮小至 17px、降低不透明度與陰影，避免圖示比標題與圖片主體更突出。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機圖示線條粗細、辨識度與 hover／focus 狀態、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務卡片展開圖示調整為 Regular 版本、18px 與 90% 不透明度，在維持低調的同時恢復足夠辨識度。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機圖示線條粗細、辨識度與 hover／focus 狀態、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務卡片遮罩改由底部 `.home-services-compare__content` 承擔，漸層高度會隨標題與展開後的描述內容一起增加，避免描述出現時將標題推到遮罩外。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機展開狀態的遮罩包覆、文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務項目四張圖片重新統一套用中性黑色漸層遮罩，從 `32%` 開始加深，底部不透明度為 `60%`，以提升底部文字對比；未恢復文字陰影或 hover 額外遮罩變化。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機實際遮罩深淺與文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁「我們的服務」第三張「碼頭裝卸」卡片比照第二張卡片，預設狀態使用水平圖片偏移，hover／鍵盤 focus 展開時恢復水平置中，保留目前圖片上下裁切位置；同步讓桌機圖片位移與卡片收合同步過渡，避免離開 hover 時短暫露出空白；同步更新首頁 CSS cache key。
- 實際驗證：尚待執行。
- 未驗證：桌機／平板預設與 hover／focus 圖片構圖、手機版、實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁「我們的服務」第四張「機具銷售與維修」卡片預設向右偏移圖片，讓收合狀態顯示更多左側黃色車體；hover／鍵盤 focus 展開時恢復水平置中。
- 實際驗證：尚待執行。
- 未驗證：桌機／平板預設與 hover／focus 圖片構圖、手機版、實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁「我們的服務」四張圖片套用藍色由透明至 60% 的垂直漸層遮罩，並維持遮罩覆蓋圖片、文字位於上層；hover／focus 時遮罩維持完整不透明度。
- 實際驗證：尚待執行。
- 未驗證：桌機／平板／手機實際遮罩與文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：窄桌機／筆電（768–1200px）服務卡片改為每張圖片依自身卡片寬度填滿，避免 JavaScript 展開圖片框造成錯誤裁切與空白；保留四卡片排列與 hover／focus 展開，第四張在此範圍改以 `30% 92%` 顯示較多黃色車體。
- 實際驗證：瀏覽器 1189px 有效寬度確認四張卡片約 263px 時，圖片框同步為各卡片寬度、圖片無水平溢出；hover 第三張時卡片約 715px、其他卡片收合至 112px，圖片框同步變化且無空白溢出。
- 未驗證：離開 hover 的完整動畫畫面、1440px 桌機、手機、實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁「最新消息」標題在窄視窗移除獨立放大的 `clamp` 規則，改與「我們的服務」及「集團事業群」共用 `--font-size-section-heading`，統一各區塊標題字級。
- 實際驗證：瀏覽器窄視窗確認「我們的服務」、「最新消息」、「集團事業群」三個首頁區塊標題均為 `30px`、字重 `600`、行高 `36px`。
- 未驗證：實際側邊欄寬度下的畫面截圖、一般桌機、手機、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁聯絡我們區塊 `.home-page .home-contact__intro > p` 移除手機版固定 `16px` 覆寫，改在平板／行動版跟隨全域 `--font-size-body` token。
- 實際驗證：瀏覽器 390px 與 820px 確認 `.home-page .home-contact__intro > p` 均使用全域 `--font-size-body` 的 `15px`，行高為 `25.5px`。
- 未驗證：平板／手機完整畫面、一般桌機、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：全站一般正文的 `--letter-spacing-body` 在平板／行動版維持 `0.02em`，移除 Contact 標籤與 News 日期的局部 `normal` 覆寫，並同步更新所有公開頁面的 token cache key。
- 實際驗證：瀏覽器 390px 確認首頁聯絡文案使用 `--letter-spacing-body: 0.02em`，實際字距為 `0.3px`；已確認公開頁面 token cache key 全部更新。
- 未驗證：全站各頁平板／手機完整畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務項目四張圖片的垂直漸層遮罩改為中性黑色，保留原本透明度與漸層位置，不再帶有藍色色相。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機實際遮罩顏色與文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務項目第二張「倉儲物流」遮罩延後變深並將底部黑色不透明度降至 50%；第一張「內陸貨櫃集散站」保留原遮罩，僅為文字增加輕微陰影以提升複雜背景上的辨識度。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機實際灰階與文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務項目四張圖片的黑色漸層遮罩統一從 `32%` 開始變深，保留第二張較淡的 50% 底部不透明度與第一張文字陰影。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機實際遮罩過渡與文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務項目四張圖片的黑色漸層遮罩底部不透明度統一降為 `50%`，讓第一、三、四張不再比第二張更深；第一張文字陰影保留。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機實際遮罩深淺與文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務項目四張圖片移除漸層遮罩與 hover／focus 遮罩控制，保留第一張文字陰影與既有文字內容層級。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機實際圖片與文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：移除首頁服務項目第一張卡片標題與說明文字的 `text-shadow`，四張卡片不再有額外文字陰影。
- 實際驗證：尚待執行。
- 未驗證：桌機／筆電／手機實際文字對比、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

## 2026-10-24

- 已完成：調整首頁「碼頭裝卸」卡片的預設圖片焦點，由 `52% 46%` 改為 `24% 66%`，讓窄直幅預設狀態能看見左下方貨櫃，同時保留展開狀態的天車主體。
- 實際驗證：`git diff --check`；瀏覽器桌面確認預設四張卡片同寬時「碼頭裝卸」使用 `object-position: 24% 66%`，可看見下方貨櫃與作業區；hover 展開其他卡片時仍保留貨櫃構圖與天車主體，無水平溢出。
- 未驗證：手機實際畫面、實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務卡片移除圖片低飽和／冷色 filter 與圖片層色調遮罩，保留底部文字漸層；機具銷售與維修恢復 `port-equipment-maintenance.jpg`；右下角箭頭上移至與標題視覺對齊的位置。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/home.js`、`git diff --check`；瀏覽器桌面確認圖片 `filter: none`、圖片層遮罩為 `display: none`、機具恢復 `port-equipment-maintenance.jpg`，箭頭中心與標題中心約對齊且無水平溢出；390px 手機確認四張原圖、箭頭、說明文字與橫向滑動正常。
- 未驗證：實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：替換首頁機具服務卡片為 `equipment-maintenance.png` 維修作業照片；倉儲卡片桌機收合時增加水平裁切位移以保留走道消失點；底部文字漸層略為加深；每張卡片右下角固定顯示小箭頭作為可查看提示。
- 實際驗證：`git diff --check`、`node --check wwwroot/js/pages/home.js`；瀏覽器 1440px 桌面確認四張卡片 318×432px、機具維修照片與固定右下角箭頭載入、無水平溢出；桌面 hover 確認倉儲收合位移與展開時位移歸零；390px 手機確認機具新照片、箭頭、說明文字與橫向滑動正常，無頁面水平溢出。
- 未驗證：實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：調整首頁「我們的服務」卡片，桌機／平板收合高度降低、展開時其他卡片保留較寬圖片與標題空間；四張服務圖片分別設定裁切焦點，並以一致的中性略冷、低飽和處理與集中於文字區的深色漸層統一視覺。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/home.js`、`git diff --check`；瀏覽器 1440px 桌面確認卡片高度 432px、四張卡片各 318px、無水平溢出；預設桌面視窗確認天車 hover 展開約 715px、其他卡片收合 112px，鍵盤 focus 可顯示對應說明；390px 手機確認卡片 320×421px、內容可讀、服務列表維持橫向滑動且頁面無水平溢出。
- 未驗證：實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：移除 About 子公司簡介卡片外框的邊線顏色，改為無外框呈現；保留圓角、背景、內部 hover 分隔線與互動效果。
- 實際驗證：已完成 `git diff --check`。
- 未驗證：About 頁桌機／手機實際畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：About 頁將可對應的硬編碼樣式改用共用 token，包括認證區文字與背景、企業價值觀卡片字級與背景、子公司卡片文字與背景；並將未定義的 `--color-line` 改為既有邊框 token。
- 實際驗證：已完成 `git diff --check`。
- 未驗證：About 頁桌機／手機實際畫面、樣式替換後的視覺差異、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：`.about-page .about-profile__body` 加入共用 `var(--font-size-body)`，讓 About 公司簡介內容容器使用全站文字大小 token。
- 實際驗證：已完成 `git diff --check`。
- 未驗證：About 頁桌機／手機實際畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁 CSS cache key 更新為 `v20261024-latest-news-list-v5`，確保行動版新聞標題 `15px` 規則重新載入；置頂卡片標題 `.home-latest__feature-title` 仍維持原本的 `18px`。
- 實際驗證：已完成 `git diff --check`。
- 未驗證：瀏覽器重新整理後的快取更新與 390px 實際畫面。
- Commit：無，尚未提交。

- 已完成：首頁最新消息行動版 `.home-page .home-latest__item h3` 字級調整為固定 `15px`，桌機版配置維持不變。
- 實際驗證：已完成 `git diff --check`。
- 未驗證：390px 瀏覽器實際畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁最新消息手機版調整為左側置頂 1 筆加一般新聞 3 筆，隱藏第 4 筆以後的列表項目並保留「更多資訊」按鈕；手機內容左右內距改為 20～24px，置頂圖片一律顯示（實際新聞圖片或通用預設圖皆保留）並採 16:9，標題統一深灰色並保留橘色圖釘辨識。
- 已完成：手機版新聞日期調整為 14px、標題調整為 16～18px，列表縮減上下間距並保留自然換行，不使用固定高度裁切。
- 實際驗證：已完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`。
- 未驗證：390px 瀏覽器實際畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁服務比較區塊 `.home-services-compare__body p` 加入 `text-align: justify`，使服務說明文字與「關於亞太」段落採用一致的左右對齊效果。
- 實際驗證：已完成 `git diff --check`。
- 未驗證：瀏覽器桌機／手機文字呈現、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：配合首頁最新消息總共 6 筆（左側 1 筆、右側 5 筆），補上右側第五筆新聞的 700ms 進場延遲，並將「更多資訊」按鈕延後至 820ms，維持逐列進場順序。
- 實際驗證：待執行。
- 未驗證：瀏覽器進場動畫、桌機／手機 RWD、減少動態效果偏好、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：移除首頁最新消息右側列表標題 hover／focus 的底線 pseudo-element 與相關 transform 規則；左側置頂新聞 hover／focus 時，標題改為品牌橘、圖片放大並加上 28% 深色遮罩。
- 實際驗證：待執行。
- 未驗證：瀏覽器 hover／focus 畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：移除首頁最新消息右側新聞列的右箭頭 icon 生成與全部對應 CSS（固定箭頭欄、hover 位移與手機版規則），保留日期、標題與分隔線。
- 實際驗證：待執行。
- 未驗證：瀏覽器桌機／手機畫面、列表長標題換行、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：首頁最新消息預設顯示上限由 5 筆調整為 6 筆（含左側置頂新聞），右側列表最多顯示 5 筆；公開最新消息完整列表與後台資料不變。
- 已完成：首頁最新消息成功載入時固定保留「更多資訊」按鈕，即使目前顯示筆數未超過 6 筆；無資料或載入失敗時仍隱藏。
- 實際驗證：待執行。
- 未驗證：首頁瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：縮小首頁「最新消息」左側置頂迴紋針徽章至 34px 圓底，改為白色 72% 半透明背景，icon 縮至 18px；保留 `aria-label="置頂消息"` 與原定位。
- 實際驗證：待執行。
- 未驗證：瀏覽器桌機／手機畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：移除首頁「最新消息」右側列表的類別文字與欄位，改為日期／新聞標題／右箭頭單排配置；日期與標題間距 28px，標題可在剩餘欄位自然換行，箭頭維持品牌橘色靠右。
- 已完成：左側置頂卡片的圖片下方日期／類別／標題與圖片上的置頂 icon 均保留；右側列表維持緊湊列高與細分隔線，手機版仍為日期第一排、標題第二排。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/home.js`、`git diff --check`；cache-busted ASP.NET Development 實際頁面量測：有效瀏覽器內容寬 1189px 時，右側每列只含日期／標題／箭頭，日期到標題 28px、標題到箭頭 28px，三列各 60px；左側日期／類別與置頂 icon 保留，無水平溢出。
- 未驗證：瀏覽器擴充視窗未接受手機尺寸覆寫，因此未完成手機實際畫面與長標題第二行的瀏覽器驗收；指定 1366px／1440px、跨瀏覽器與無障礙人工驗收亦未完成。
- Commit：無，尚未提交。

- 已完成：首頁「最新消息」左側置頂卡片移除可見的「置頂消息」文字，只保留迴紋針 icon，並以 `aria-label` 保留輔助閱讀器辨識。
- 已完成：右側新聞列表桌機版改為日期／類別／標題／右箭頭單排配置，日期與類別固定欄寬且不換行，標題使用剩餘欄位自然換行；手機版恢復日期／類別第一排、標題第二排。
- 已完成：縮短右側新聞列上下留白，保留品牌橘色、分隔線、字體與既有 hover／focus 樣式。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/home.js`、`git diff --check`；ASP.NET Development 實際頁面量測：有效瀏覽器內容寬 1189px 時，每列 60px 單排，日期欄 92px、類別欄 88px、標題欄 546.9px、箭頭欄 20px，置頂 icon 無可見文字但保留 `aria-label="置頂消息"`，無水平溢出。
- 未驗證：瀏覽器擴充視窗未接受手機尺寸覆寫，因此未完成手機實際畫面與長標題第二行的瀏覽器驗收；指定 1366px／1440px、跨瀏覽器與無障礙人工驗收亦未完成。
- Commit：無，尚未提交。

- 已完成：首頁「最新消息」左側精選項目改為完整新聞卡片，圖片維持上方 3:2 比例，日期／分類／標題移至白底區域；加入「置頂消息」標籤，保留整張卡片連結、hover 與鍵盤 focus。
- 已完成：最新消息內容最大寬度收斂至 1200px，保留約 32%／3%／65% 欄位配置；右側新聞列上下留白縮短至 16px，維持自然高度與頂端對齊。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/home.js`、`git diff --check`；ASP.NET Development 實際頁面量測：有效瀏覽器內容寬 1189px 時，圖片下方白底資訊區、置頂消息標籤、左卡片連結、32% 左欄、3% 間距、右側三列各約 89.6px、兩欄頂端差 0px、無水平溢出。
- 未驗證：指定 1366px／1440px 與手機／平板尺寸的最終瀏覽器畫面、跨瀏覽器與無障礙人工驗收；瀏覽器擴充視窗未接受尺寸覆寫。
- Commit：無，尚未提交。

- 已完成：首頁「最新消息」桌機版改為約 32% 精選卡片／3% 欄間距／65% 新聞列表，精選圖片改為 3:2 比例並縮小徽章、內距與標題字級；761–1100px 使用獨立平板欄位比例，手機維持單欄。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/home.js`、`git diff --check`；ASP.NET Development 實際頁面量測：有效瀏覽器內容寬 1189px 時，精選卡片 32%、欄間距 3%、新聞列表 65%、圖片比例 1.5、兩欄頂端差 0px、無水平溢出。
- 未驗證：瀏覽器擴充視窗未接受 1366px／1440px 與手機尺寸覆寫，因此未完成指定尺寸的實際瀏覽器畫面；跨瀏覽器與無障礙人工驗收亦未完成。
- Commit：無，尚未提交。

- 已完成：關係企業「亞柏油品」`.affiliate-oil-quote > span` 使用 `var(--color-text-body)`。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- Commit：無，尚未提交。
- 已完成：首頁服務四張狹長卡片維持原比例、排列與 hover 橫向展開，分別設定圖片 `object-position`，改善預設與展開狀態的服務主體構圖。
- 實際驗證：1440px 確認預設狀態四張卡片的逐張構圖與 hover 展開裁切；390px 確認逐張 `object-position` 與無水平溢出。
- 未驗證：跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：首頁「關於亞太」行動版改為英文標籤／中文標題、圖片、完整敘述、了解更多按鈕的順序，並調整為左緣對齊與 44px 上下留白。
- 實際驗證：390px 行動版確認順序、28px／28px／24px 間距、44px 上方留白、左緣對齊與無水平溢出；1440px 桌機確認雙欄、40px 欄距與原配置未受影響。
- 未驗證：跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：首頁「關於亞太」容器改為最大 1440px 置中，雙欄調整為 `0.9fr / 1.1fr`，欄距 40px。
- 已完成：移除左側內文的 max-width 與水平 margin 限制，標題、內文、按鈕左緣對齊；標題／內文間距 28px、內文／按鈕間距 32px。
- 已完成：圖片維持原比例與原資產，移除額外向右延伸，區塊上下 padding 調整為 60px，並保留地圖背景。
- 實際驗證：`git diff --check`；瀏覽器 1440px／1920px 實際量測欄距皆為 40px，1920px 容器寬度為 1440px；手機版確認文字、按鈕、照片順序與無水平溢出。
- 未驗證：跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：桌機關於區塊上下 padding 微調為 52px，使左側內容頂端距主視覺底部約 62px；手機維持 64px。
- 實際驗證：`git diff --check`；瀏覽器桌機實測上方距離與兩欄實際間距。
- 未驗證：瀏覽器手機最終畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：移除首頁關於區塊舊版圖片 `aspect-ratio: 1.45` 固定比例，恢復原照片比例，避免右圖被撐高並將左側內容垂直推低。
- 實際驗證：`git diff --check`；瀏覽器桌機實測原圖比例與欄間距。
- 未驗證：瀏覽器手機最終畫面、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：壓縮首頁「關於亞太」區塊上下 padding 至 64px，移除舊的額外 padding 規則，維持內容自然撐高。
- 已完成：桌機雙欄調整為約 45／55、欄距 48px，左側標題、內文與按鈕維持同一左緣，移除內文水平置中造成的縮排。
- 已確認：關於區塊沒有固定 `height`／`min-height`；前一區主視覺仍保留既有 `min-height`，未將其高度規則套用至關於區塊。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、主視覺與關於區塊銜接高度、文字換行與照片位置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：重新整理首頁「關於亞太」區塊，桌機採約 42／58 雙欄與約 64px 間距，左側內容群組垂直置中，按鈕緊接介紹文字。
- 已完成：保留 ABOUT APLI、中文標題、原照片與按鈕樣式；圖片改為原比例顯示並可向右延伸，世界地圖縮小淡化至左下背景。
- 已完成：手機版改為文字、按鈕在上，照片在下；區塊上下留白改為自然內容高度，不使用固定高度。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、照片裁切與品牌文字完整性、世界地圖背景實際位置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：首頁各區塊標題統一移除標題下方裝飾線，保留最新消息卡片標題的互動底線效果。
- 實際驗證：`git diff --check`。
- 未驗證：首頁瀏覽器畫面、桌機／手機 RWD、標題間距與版面實際呈現、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：首頁 `.home-page .home-intro__description p` 新增 `text-align: justify`，讓引言段落左右對齊。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機文字換行與對齊、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：全域一般敘述文字桌機字級由 17px 調整為 16px，行動版維持 15px。
- 實際驗證：`git diff --check`。
- 未驗證：全站瀏覽器畫面、桌機／手機 RWD、跨頁文字換行影響、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：行動版加入亞太區塊增加底部留白，並將淺灰 V 型背景延伸至區塊底部，完整包住標題、敘述與查看職缺按鈕。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、手機實際 RWD 與背景包覆範圍、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：縮小公司福利標題與切換選單的間距至 20px，僅調整福利區塊，不影響全域標題間距。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、標題與分頁實際間距、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：公司福利標題改為左側對齊，使用頁面專屬 heading modifier，不影響加入亞太標題。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、標題與表格對齊實際呈現、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：福利表格中只有一項內容的分類，統一補上項目符號，與多項內容的呈現方式一致。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、列表符號實際位置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：移除加入亞太標題後方的英文 watermark，恢復為單純中文標題並清除對應 CSS。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：加入亞太區塊英文標籤改為參考經營理念卡片的低透明度 watermark 形式，使用 `JOIN US` 置於中文標題後方。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、標題與 watermark 實際疊合效果、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：加入亞太區塊標題新增英文標籤 `JOIN APLI`，使用主題橘與字距強化區塊識別，中文標題仍維持主要 heading。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：加入亞太區塊的「查看職缺」按鈕改用向下箭頭，並在 hover／focus 時輕微下移，表達下滑至職缺區塊的操作意圖；外部招募按鈕維持原 icon。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、按鈕錨點滾動與 hover／focus、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：加入亞太背景改為滿版淺灰色區塊，底部以中央向下的 V 型斜切呈現，對齊參考圖的背景造型。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、斜切背景與內容層級實際呈現、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：加入亞太區塊新增淺灰斜切造型背景，採獨立 pseudo-element 放置於內容後方，並調整手機版斜切範圍。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：公司福利分頁改用 viewport／track 滑動動畫，參考營運資源頁面的切換模式。
- 已完成：福利內容容器以所有表格中的最高高度固定，切換分頁時不再因內容量不同而跳動，並支援減少動態效果偏好。
- 實際驗證：`node --check wwwroot/js/pages/careers.js`、`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、切換動畫實際操作、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：福利表格 icon 使用固定欄位搭配縮放，降低實心 SVG 的視覺粗重感，同時維持分類文字對齊。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：恢復福利表格各分類標題前的對應 icon，並以 inline-flex 統一 icon 與文字對齊，手機版同步縮小 icon。
- 實際驗證：`git diff --check`、確認 10 個福利 icon 資產均存在。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：縮小 `.benefits-tabs__list` 分頁文字，改用內文字級 token，保留分頁版面與互動行為。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。

- 已完成：公司福利改為四個可切換的福利區塊，每個區塊以語意表格呈現，保留項目分類與內容資料。
- 已完成：補上福利分頁的選取狀態、鍵盤方向鍵／Home／End 操作，以及手機版水平可滾動的分頁列。
- 實際驗證：`node --check wwwroot/js/pages/careers.js`、`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、分頁互動實際操作、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將公司福利改為 10 個獨立福利卡片直接排列的網格，取消原本依 tab 群組分欄造成的高度不均；icon、標題與清單改為固定欄位對齊。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：重整公司福利卡片的 icon／標題／清單對齊，改用固定 icon 欄與內容欄；分隔線改由 grid gap 與外層背景產生，移除依賴 `nth-child` 的補線規則。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：整理公司福利網格的外框與欄間分隔線，改由外層完整框線搭配欄位內部分隔線，並處理平板／手機換欄時的邊線連續性。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將 careers「公司福利」由分頁切換改為一次呈現的福利網格，移除 tab 與滑動 panel，桌機四欄、平板兩欄、手機一欄。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器、互動移除後的無障礙人工驗收。
- Commit：無，尚未提交。
- 已恢復：將 careers「加入亞太」敘述合併回單一段落，移除分段間距，保留置中版面。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：依參考圖將 careers「加入亞太」改為置中版面，標題、三段說明與 CTA 皆置中排列。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將 careers「加入亞太」文案拆成三段，第三段為「如果你具備責任感」的招募邀請句。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將 careers「加入亞太」文案拆成兩段，第二段從「我們重視每一位夥伴的投入」開始，並加入局部段落間距。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：移除 careers `.join-intro::before` 綠色裝飾及其手機版定位規則。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已恢復：取消 careers「加入亞太」文案分段與段落間距，恢復為單一段落；保留本次工作前的版面調整。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將 careers「加入亞太」說明拆成公司介紹與招募邀請兩段，並加入段落間距。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：局部縮短 careers「加入亞太」與「公司福利」的距離，調低 `.join-intro` 最小高度並將 `.join-benefits` 間距改為頁面專屬值，不再沿用全域區段間距。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將 careers `join-benefits` 內容版心收窄至最大 `1080px`，不影響其他 `join-panel`。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將 careers「加入亞太」內容容器改為滿寬版心配置，以左右 padding 控制對齊，並放寬內文閱讀寬度，避免固定寬度造成右側大片空白。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：移除 careers `.join-intro` 與其手機版 media query 的 `padding-block`。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將 careers「加入亞太」改為單一左側內容欄，標題、敘述與 CTA 同屬 `.join-intro__content`，移除左右雙欄版型。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：縮短 careers「加入亞太」標題與右側內文的垂直距離，將內容由底部對齊改為上方定位；手機版取消額外偏移。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：將 careers「加入亞太」由制式左圖右文改為非對稱 editorial 版面，標題獨立置左上、內文與 CTA 置右，並以 CSS 綠色裝飾形狀建立左下視覺重心；手機版改為單欄堆疊。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器、無障礙人工驗收與實際視覺比對。
- Commit：無，尚未提交。
- 已完成：將部署風險較高的中文圖片檔名改為英文小寫連字號：`solar-panel-gas-station.png`、`table-tennis.jpg`，並更新關係企業頁面引用。
- 實際驗證：待執行。
- 未驗證：部署後 IIS 實際取檔、瀏覽器圖片載入、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：整理關係企業頁面 JS：初始分頁改為「有效 hash → aria-selected → 第一個」、使用者切換分頁更新 URL hash，移除輪播 `pointermove` 中無效的`preventDefault()`。
- 已完成：移除未被互動邏輯使用的地點`data-region`與`data-business-hours`，保留`data-location-id`作為地圖標記與資訊卡的關聯，座標與標籤定位維持在標記自身的`data-*`。
- 實際驗證：待執行。
- 未驗證：瀏覽器分頁 hash 分享、輪播觸控、地圖互動、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：合併關係企業頁面 1024～1439px 的字重規則，改用`var(--font-weight-card-heading)`；將`--redesign`類別改為描述性命名。
- 實際驗證：`git diff --check`、確認相關 HTML／CSS 不再殘留`redesign`與重複的`font-weight: 500`規則。
- 備註：`.affiliate-oil-content > .affiliate-editorial-section:first-of-type`仍有對應目前 HTML 的第一個`section`，因此保留並只更新父層 class。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：亞柏油品企業理念引言中的「綠能永續」改用全域`var(--color-accent-green)`強調色。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：放寬亞柏油品企業理念引言的文字間距至`0.08em`，強化引言辨識度。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：`.affiliate-tabs__track::before`改用全域`var(--color-border-light)`，取代寫死的`#e5e5e5`。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：關係企業頁面的`.affiliate-location-label`背景改用`var(--color-surface-subtle)`，移除原本寫死的`#f2f2f2`。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：關係企業頁面的`.affiliate-panel h2`改用`var(--font-size-h2)`，並移除殘留的`font-weight`註解。
- 實際驗證：待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：亞柏會舘 CTA 恢復原本的 `button--primary` 樣式與聯絡資訊欄位置，移除本輪藥丸與底部置中試作。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、按鈕互動、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：亞柏會舘 CTA 移至 `affiliate-club-facilities-contact` 內容區底部並跨欄水平置中，手機版同步維持置中。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、按鈕互動、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：亞柏會舘 CTA 改為參考圖的白底深色外框藥丸樣式，保留外部連結 icon，hover 時文字與 icon 使用主題橘。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、hover／focus、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：亞柏會舘外部連結 CTA 移除 `button--primary`，改用區分責任的 `.affiliate-link-pill` 藥丸樣式。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、hover／focus、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：輪播 slide 的 `aria-label` 與進度按鈕改由 JavaScript 依實際圖片數量初始化產生，移除 HTML 手寫重複內容。
- 實際驗證：`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`。
- 未驗證：瀏覽器輪播互動、動態 ARIA 狀態、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：輪播進度條改用 `grid-auto-flow: column` 與 `grid-auto-columns`，移除依輪播張數寫死的欄數規則。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器輪播互動、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：移除關係企業地圖在各斷點使用的負 margin／`translateY` 硬位移，恢復以正方形 `aspect-ratio` 與 SVG `object-fit: contain` 排版。
- 實際驗證：`git diff --check`、`node --check wwwroot/js/pages/affiliates.js`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、地圖標記與標籤實際位置、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：重構關係企業地圖標記定位與標籤方向，將站點差異移至 marker HTML 的 `data-*` 與 CSS 變數，統一桌機／手機 CSS 規則。
- 實際驗證：尚待執行。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、互動、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：`.affiliate-location-label`改用`var(--color-text-body)`，並移除 3 個已無引用的`--affiliate-location-label-color`宣告。
- 實際驗證：`git diff --check`、確認全專案無該變數引用。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：刪除已無引用的`--affiliate-location-value-color`局部變數宣告。
- 實際驗證：`git diff --check`、確認全專案無該變數引用。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：關係企業服務據點的`.affiliate-location-value`使用`var(--color-text-body)`。
- 實際驗證：`git diff --check`。
- 未驗證：瀏覽器畫面、桌機／手機 RWD、跨瀏覽器與無障礙人工驗收。
- Commit：無，尚未提交。
- 已完成：修正詳細頁分享功能的 URL 清理、canonical 優先、X 分享網址、複製失敗判斷、iOS 選取 fallback 與狀態計時器疊加問題；分享區在 JS 初始化前保持不可操作。
- 已完成：系統分享 API 開啟失敗時改以複製詳細頁連結作為 fallback，不再只顯示「無法開啟分享功能」；並更新分享 JS 快取版本。
- 已完成：將詳細頁分享工具的 Twitter 小鳥圖示替換為 X logo，並同步更新分享資料鍵值、ARIA 標籤與快取版本。
- 已完成：將詳細頁分享工具的 LinkedIn「in」改為 LINE 字樣圖示，並同步改用 LINE 分享網址、ARIA 標籤與快取版本。
- 已完成：因沒有合適的 LINE 圖示，恢復詳細頁原本的 LinkedIn「in」圖示與分享功能。
- 已完成：行動裝置隱藏最新消息詳細頁麵包屑，避免長標題造成上方導覽區換行與版面跑掉；桌機維持顯示。
- 已完成：行動裝置的最新消息詳細頁卡片與 Header 間增加 `24px` 上方間距，避免卡片貼住 Header。
