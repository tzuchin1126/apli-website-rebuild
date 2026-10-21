# APLI 專案進度

## 2026-10-20

- [x] 調整職業安全頁 `.safety-page .safety-credential-card__title h3` 的筆電字重：在 `1024–1439px` 加粗一階至 `500`，桌機與手機維持原規則；更新 Occupational Safety CSS cache key，完成 `git diff --check` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 About 頁 `.about-page .about-enterprise-values__card h3` 的筆電字重：在 `1024–1439px` 加粗一階至 `500`，桌機與手機維持原規則；更新 About CSS cache key，完成 `git diff --check` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整人才招募頁 `.benefits-list__row h3` 的筆電字重：在 `1024–1439px` 加粗一階至 `500`，桌機與手機維持原規則；更新 Careers CSS cache key，完成 `git diff --check` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 修正 affiliates 左側選單滑動固定：將桌面 `.affiliate-tabs` 的 sticky 位置移至固定 Header 下方 `102px`，補上 `z-index: 20` 與背景避免選單文字被 Header 或內容遮住；手機與平板維持原本橫向選單版型，更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 將 affiliates 油品理念引用文字 `.affiliate-oil-quote > span` 的字距與行高納入全域內文規則，使用 `var(--letter-spacing-body)` 與 `var(--line-height-body)`；保留全裝置特殊字體，更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 將 affiliates 油品理念引用文字 `.affiliate-oil-quote > span` 的特殊字體改為全裝置共用規則，桌機、筆電與手機皆使用 `var(--font-special)`；保留引號符號樣式並更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 恢復 affiliates 油品理念引用文字的筆電特殊字體：在 `1024–1439px` 將 `.affiliate-oil-quote > span` 改回 `var(--font-special)`，並在 affiliates HTML 載入 `Noto Serif TC`；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 太報標語顏色：為 `.affiliate-taronews-copy .affiliate-tagline` 加入 `color: #497d89`，保留原有字級與排版；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 一般面板與 ALPHA 區塊筆電標題字重：在 `1024–1439px` 將 `.affiliate-panel h2` 與 `.affiliate-alpha-details .affiliate-section-heading h3` 加粗一階至 `500`，桌機與手機維持原規則；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 羽球區塊筆電標題字重：在 `1024–1439px` 將 `.affiliate-badminton-redesign .affiliate-panel-details .affiliate-section-heading h3` 加粗一階至 `500`，桌機與手機維持原規則；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 亞柏會舘 CTA 標題筆電字重：在 `1024–1439px` 將 `.affiliate-club-cta .affiliate-section-heading h3` 加粗一階至 `500`，桌機與手機維持原規則；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 油品據點卡片筆電標題字重：在 `1024–1439px` 將 `.affiliate-oil-location-detail .affiliate-location-card h4` 加粗一階至 `500`，桌機與手機維持原規則；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 油品區塊筆電標題字重：在 `1024–1439px` 將 `.affiliate-oil-redesign .affiliate-section-heading h3` 加粗一階至 `500`，桌機與手機維持原規則；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 統一 affiliates 頁面主要一般內文規則：將 `.affiliate-panel p` 與 `.affiliate-panel li` 統一為 `16px / 400 / var(--line-height-body) / var(--letter-spacing-body)`，涵蓋公司介紹、服務清單與得獎清單；保留 tagline、年份與地點提示等特殊輔助文字角色。更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 明確套用 affiliates `.affiliate-panel p` 的全域行高：加入 `line-height: var(--line-height-body)`，桌面使用 `1.6`，筆電／手機依全域規則使用 `1.7`；與字距設定一併更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 明確套用 affiliates `.affiliate-panel p` 的全域字距：加入 `letter-spacing: var(--letter-spacing-body)`，桌面使用 `0.02em`，筆電／手機依全域規則使用 `normal`；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 頁面 `.affiliate-sexin-services-list li` 文字大小為 `16px`，保留清單排版、字重與行高；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 頁面 `.affiliate-panel p` 文字大小為 `16px`，保留 `.affiliate-panel li` 與既有行高設定；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 頁面油品公司介紹內文：將 `.affiliate-oil-company-profile .affiliate-sexin-profile-copy p` 統一為 `16px`，保留原行高 `1.9`；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 頁面 `.affiliate-sexin-section-heading h3` 的筆電字重：在 `1024–1439px` 加粗一階至 `500`，桌機與手機維持原規則；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整 affiliates 頁面筆電寬度標題字重：在 `1024–1439px` 將 `.affiliate-sexin-profile-copy h2` 與 `h3` 加粗一階至 `500`，桌機與手機維持原規則；更新 affiliates CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 調整服務頁筆電寬度標題字重：在 `1024–1439px` 僅將 `.services-page .service-section__details h3` 與 `.services-page .services-advantages__grid h3` 加粗一階至 `500`，桌機與手機維持原規則；更新 services CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 建立全站筆電寬度標題字重規則：在既有 `1024–1439px` 範圍將一般標題 `500→400`、區塊／大標題 `700→600`，同步讓 display title 降至 `600`；`1440px` 以上維持目前字重，內文、按鈕與特殊 Hero `400` 不變。服務頁直接使用 bold 的區塊標題改接共用 token，並更新全站 tokens cache key 至 `20261020-global-typography-v13`；完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，桌機／筆電／手機瀏覽器畫面驗證尚未完成。

- [x] 統一首頁「關於亞太」區塊標題粗度：將 `.home-intro h2` 與 `.home-intro__heading h2` 從 `--font-weight-heading`（500）改為與「我們的服務／最新消息」一致的 `--font-weight-section-heading`（700）；更新 Home CSS cache key，完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 修正首頁「我們的服務」展開卡片兩側露出背景：確認 `home.js` 仍以 `expandedCardWidth * 0.96` 計算固定圖片寬度，與已改為 `100%` 的媒體框不一致；改為固定圖片寬度直接使用最大展開卡片寬度，保留圖片不隨 hover 縮放。已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 移除首頁「我們的服務」卡片展開時的白色邊：確認白邊來自圖片媒體框與內容遮罩層各自保留 `2%` inset，改為桌面與手機皆完整貼齊卡片 `inset: 0`、`100%` 寬高；保留固定圖片框、裁切與 hover 展開行為。已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，瀏覽器畫面驗證尚未完成。

- [x] 恢復首頁「集團事業群」原本視覺：確認重構後 `.home-affiliates__body` 錯套用較早的底部標題樣式，改回原本最後生效的隱藏文字層，保留 Logo 卡片與 HTML 文字內容；已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與 `dotnet build -c Release`，本次桌面／手機瀏覽器畫面驗證尚未完成。
- [x] 修復首頁「集團事業群」重構退化：以重構前 Git 版本後段實際生效的 Logo 卡片版為準，恢復 1080px 內容寬度、桌面／平板 3 欄、手機 2 欄、`2.35 / 1` 與 `1.65 / 1` 卡片比例、Logo `object-fit: contain`、第二張 Logo 的 `50% 15%` 裁切位置與既有 hover；將 `.home-affiliates` 底部 padding 恢復為 `clamp(80px, 9vw, 128px)`，修復與「聯絡我們」CTA 的留白。已以同一瀏覽器分頁比對 Git 參考與修復版桌面 `1440px`、平板 `1024px`、手機 `390px`，卡片尺寸／排列／圖片裁切一致；另逐一 hover 六張卡片並確認圖片 transition、文字與 Alpha 卡片互動未受影響；未 commit、未 push。
- [x] 修正首頁「我們的服務」收合卡片直排標題置中：將 `::after` 的定位、尺寸、直排與淡入淡出 transition 整合至服務卡片共用規則，收合狀態只切換 opacity，移除 `inset: 0`／`translateY(50%)` 衝突；更新 Home CSS cache key 至 `20261020-services-motion-merge-v2`。已逐一 hover 四張卡片確認不同字數標題水平／垂直置中，未在檔案末尾追加補丁；未 commit、未 push。
- [x] 修正首頁「我們的服務」進場動畫與 hover 展開的 transition 衝突：在服務卡片上完整合併 `flex 400ms` 與 opacity／transform／visibility 進場 transition，保留重構後的 Flex 展開、收合與固定圖片框，不加入圖片放大；更新 Home CSS cache key 至 `20261020-services-motion-merge-v1`。已以本機 Edge 桌面 `1440px` 實測四張卡片逐一移入、移出與切換：移入中寬度會經過中間值後由約 `300px` 平滑展開至 `900px`，其他卡片收合至 `100px`，移出後平滑回到約 `300px`；圖片 transform 維持 scale `1`，未出現圖片放大。另以手機 `390px` 確認服務卡片維持單欄、4 張卡片完整呈現且無水平溢位；未 commit、未 push。
- [x] 依最新需求，首頁「我們的服務」先恢復重構後的程式碼：移除額外的舊 hover 覆寫，回到固定圖片框、Flex 橫向展開與重構後的內容互動；Home CSS cache key 恢復為 `20261020-home-css-refactor-v3`，未 commit、未 push。
- [x] 恢復首頁最新消息卡片連結原有的 `text-decoration: none`，移除新聞標題因瀏覽器預設樣式產生的底線；保留日期、類別與項目分隔線，未 commit、未 push。
- [x] 恢復首頁最新消息卡片的日期與類別顯示：修正 `.home-latest__meta` 被誤設為 `display: none` 的樣式，保留目前底部唯一「更多資訊」按鈕與既有新聞版型，未 commit、未 push。
- [x] 依最新調整需求，移除首頁最新消息標題列上方的 `home-latest__actions`／「更多資訊」按鈕，只保留下方新聞列表的 `home-latest__more-link`；更新 Home JavaScript cache key 至 `20261020-latest-actions-bottom-only-v1`，未 commit、未 push。
- [x] 重構 About 頁 CSS／HTML／相關 JavaScript 責任：合併 Profile 重複 selector，移除目前 HTML 未使用的 `.about-affiliates-cta*` 與未掛載年代導覽 nav CSS，清理失效 heading border／padding、重複 timeline／event 宣告與分散 breakpoint；CSS 由 684 行降至 469 行，`!important` 維持 0 次，保留認證 pagination／水平拖曳、手機選單、CTA 雙箭頭 hover/focus、ARIA、動畫與字型系統。更新 About CSS／JS cache key 至 `20261020-about-css-refactor-v1`／`20261020-about-refactor-v1`。已實測 ASP.NET `/about` 桌面 `1432px`、窄桌面 `1024px`／`900px`、平板 `768px`／`640px`、手機 `390px`：圖片 natural size 正常、document 無水平溢位；認證第 2 個 pagination dot 可切換並更新 `aria-hidden`／scroll position，手機選單可開關，桌面 CTA hover 雙箭頭切換正常，瀏覽器 console 無錯誤；完成 `node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`、`git diff --check`。實體裝置、跨瀏覽器與完整人工無障礙驗收尚未完成，未 commit、未 push。

## 2026-10-20
- [x] 依最新恢復需求，恢復首頁最新消息標題列的 `home-latest__actions`／「更多資訊」連結，以及超過 4 筆新聞時由 `home.js` 顯示的 `home-latest__more-link`；更新 Home JavaScript cache key 至 `20261020-latest-actions-restore-v1`，保留左右輪播控制，未 commit、未 push。
- [x] 移除首頁最新消息重構後誤出現的 `home-latest__actions`、靜態「更多資訊」連結與 `home-latest__more-link` 動態按鈕，保留最新消息標題、新聞卡片及左右輪播控制；更新 Home JavaScript cache key 至 `20261020-latest-actions-cleanup-v1`，已完成 `dotnet build -c Release`、首頁 JavaScript `node --check`、`git diff --check`，並確認桌機／手機 DOM 不再包含上述操作按鈕且無水平溢位，未 commit、未 push。
- [x] 重構首頁 CSS／HTML：將首頁 CSS 由 `3545` 行整理為 `1627` 行，移除歷史覆寫與重複新聞／版型規則，`!important` 由 `398` 次降為 `0`；服務卡片、最新消息、集團事業群改為單一元件樣式來源，保留固定圖片框、橫向展開、輪播與手機選單行為；整理首頁最新消息與集團事業群 HTML 縮排。已實測 `1432px`、`1024px`、`900px`、`390px` 無水平溢位，輪播圓點、服務卡片 hover 展開比例與手機選單均可操作；完成 `dotnet build -c Release`、`node --check wwwroot/js/pages/home.js`、`git diff --check`，實體裝置、跨瀏覽器與完整人工無障礙驗收尚未完成，未 commit、未 push。
- [x] 恢復首頁 Hero 主標題「優質服務 唯客思維」原本的特殊字體字重 `400`，同步修正桌面與手機覆寫，更新 Home CSS cache key 至 `20261020-global-text-system-v5`；完成 `dotnet build -c Release` 與 `git diff --check`，未 commit、未 push。
- [x] 恢復首頁 Hero 主標題「優質服務 唯客思維」原本的特殊字體，明確使用 `--font-special`，保留桌面／手機既有字級、字重與動畫；更新 Home CSS cache key 至 `20261020-global-text-system-v4`，完成 `dotnet build -c Release` 與 `git diff --check`，未 commit、未 push。
- [x] 建立全站文字系統：共用 token 統一 Roboto／Noto Sans TC／Microsoft JhengHei 字型堆疊，整理大標題、區塊標題、卡片、內文、輔助文字、導覽與按鈕的字級／字重／行高／字距角色；一般內文維持桌面 `16px / 400 / 1.6 / 0.02em`、小於 `1024px` 為 `15px / 400 / 1.7 / normal`。清理主要元件與頁面中的舊襯線／負字距覆寫，保留 Phosphor 圖示字型；恢復原本明確指定特殊字體的首頁 Hero 文案、`.recruitment-copy` 與職安導言標題，使用獨立 `--font-special`。已完成 `dotnet build -c Release`、`git diff --check`；桌面／手機瀏覽器檢查進行中，實體裝置、跨瀏覽器與完整人工無障礙驗收尚未完成，未 commit、未 push。
- [x] 修正首頁「最新消息」區塊標題粗度不一致：確認較高優先權的 `.home-page#main-content .home-latest h2` 原本使用 `--font-weight-heading`（500），改為與首頁其他區塊標題一致的 `--font-weight-section-heading`（700）；同步更新 Home CSS cache key 至 `20261020-services-image-frame-v5`。已實際驗證桌面 `1432px` 與手機 `390px`：最新消息區塊標題與服務區塊標題皆為 `700`、公告列表標題維持 `400`、無水平溢位；完成 `git diff --check`，未 commit、未 push。
- [x] 統一網站一般內文全域排版：`--font-body` 改為 Roboto、Noto Sans TC、Microsoft JhengHei／微軟正黑體備援；桌面 token 為 `16px / 1.6 / 0.02em`，未滿 `1024px` 改為 `15px / 1.7 / normal`，body 明確使用 `400`；`--font-size-body-copy` 收斂至一般內文 token，並修正首頁介紹、服務頁段落／優勢說明與新聞文章內容的局部覆寫。更新全站 tokens cache key 至 `20261020-global-typography-v11`；完成 `dotnet build -c Release`、`git diff --check`，並以本機 ASP.NET 實際驗證桌面 `1046px` 與手機 `390px` 的首頁、服務、About 文字計算樣式及水平溢位；新聞文章路徑遭瀏覽器 URL 過濾器攔截，新聞文章瀏覽器畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未完成，未 commit、未 push。
- [x] 整理首頁「我們的服務」圖片相關 CSS：移除已被固定圖片框覆蓋的早期 `object-position`、hover `scale` 與重複 media border-radius 規則，保留目前桌面固定圖片框、水平 offset token、藍色遮罩及手機版行為；更新 Home CSS cache key 至 `20261020-services-image-frame-v3`，已完成 Release build、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`，尚未重新進行瀏覽器畫面驗收。
- [x] 為首頁「我們的服務」桌面固定圖片框加入每張卡片獨立的 `--home-services-image-offset-x` 水平位移 token，圖片框仍固定置中、尺寸不隨 hover 改變；目前四張先維持 `0px`，後續可直接調整 offset，不再依賴無法作用於固定外框裁切的 `object-position`；更新 Home CSS cache key 至 `20261020-services-image-frame-v2`，已完成 Release build、`node --check wwwroot/js/pages/home.js`、`git diff --check` 與 CSS／HTML 靜態檢查，尚未進行新的瀏覽器畫面驗收。
- [x] 重構首頁「我們的服務」桌面卡片圖片框：保留 flex 橫向展開與文字效果，圖片改用初始化／服務區塊尺寸變更時才計算的固定圖片寬高，圖片框置中並以 `overflow: hidden` 裁切；移除圖片 hover／展開時的尺寸與 transform 動畫，手機維持原版型；更新 Home CSS／JS cache key 至 `20261020-services-image-frame-v1`，已完成 Release build、`node --check wwwroot/js/pages/home.js`、`git diff --check` 與 CSS／HTML 靜態檢查；已實際逐張 hover 驗證四張卡片，固定圖片框約 `599.7px × 345.6px`、hover 後圖片 transform 維持 `matrix(1, 0, 0, 1, -299.832, -172.797)`；手機、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行。
- [x] 依確認保留首頁「我們的服務」卡片的 `flex` 完全展開效果，移除圖片 hover／focus 的額外 `scale` 放大，避免卡片展開時產生第二次圖片放大；刪除共用圖片放大覆寫規則，更新 Home CSS cache key 至 `20261020-services-typography-v134`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 實際逐張連線驗證首頁服務卡片 hover：第 2～4 張在 Home CSS `v133` 下均確認卡片寬度 `900px`、圖片寬度 `950.4px`、圖片 `transform: matrix(1.1, 0, 0, 1.1, 0, 0)`，與第一張已驗證結果一致；未追加重複 CSS，未 commit、未 push。
- [x] 實際連線至本機 Development 頁面驗證首頁服務卡片 hover：載入 Home CSS `v133` 後，第一張「內陸貨櫃集散站」滑入時確認 `hover: true`、卡片寬度 `900px`、圖片寬度 `950.4px`、圖片 `transform: matrix(1.1, 0, 0, 1.1, 0, 0)`；目前乾淨瀏覽器頁面未重現第一張不放大的問題，因此未追加猜測性 CSS；使用者實際畫面差異仍待以同一瀏覽器狀態比對，未 commit、未 push。
- [x] 將首頁「我們的服務」四張卡片 hover／focus 圖片放大幅度統一提高為 `scale(1.1)`，讓第一張「內陸貨櫃集散站」也能清楚呈現放大效果；更新 Home CSS cache key 至 `20261020-services-typography-v133`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 修正首頁「我們的服務」四張卡片 hover／focus 的圖片放大效果，移除後段 `transform: none !important` 覆蓋造成的無放大狀態，統一使用 `scale(1.06)`；更新 Home CSS cache key 至 `20261020-services-typography-v132`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 恢復首頁「我們的服務」四張卡片圖片上一個垂直上移實驗，保留各卡片水平位置、淡藍色遮罩與既有互動，垂直裁切恢復為 `center`；更新 Home CSS cache key 至 `20261020-services-typography-v131`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 將首頁「我們的服務」四張卡片圖片的垂直裁切位置統一上移至 `35%`，保留各卡片原有水平構圖與藍色遮罩；更新 Home CSS cache key 至 `20261020-services-typography-v130`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 為首頁「我們的服務」卡片圖片預設狀態加入一致的淡藍色遮罩 `rgb(23 86 145 / 12%)`，保留原有文字遮罩與 hover／focus 互動；更新 Home CSS cache key 至 `20261020-services-typography-v129`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 調整首頁「我們的服務」預設第一張「內陸貨櫃集散站」圖片裁切位置，`object-position` 由 `45% center` 左移至 `35% center`，讓車頭更容易顯示；更新 Home CSS cache key 至 `20261020-services-typography-v128`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 調整首頁「我們的服務」卡片版型：desktop grid 最大寬度維持 `1248px`、卡片間距再收斂至最高 `16px`，手機間距調整為 `12px`，保留 hover／focus 展開互動與卡片高度；更新 Home CSS cache key 至 `20261020-services-typography-v127`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 將本次頁面 typography 調整收斂為全域 token：`--font-size-body` 固定為 `16px`，`--font-weight-section-heading` 固定為 `700`；About、Careers、Home、Operational Resources、Occupational Safety 與全站 HTML 同步引用新 token／cache key `20261020-global-typography-v9`，保留卡片標題與特殊文字層級；已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查，尚未進行桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收，未 commit、未 push。
- [x] 依共用文字層級調整首頁 `index`：主要區塊標題改用 body 字型與粗度 `700`，介紹、服務、聯絡與最新消息文字統一為 `16px`，最新消息列表公告標題使用全域 `--font-size-news-title`（`18px`），服務／關係企業卡片小標使用共用卡片標題層級；保留 Hero 與英文 eyebrow 的特殊文字層級，更新 Home CSS cache key 至 `20261020-services-typography-v125` 與全站 tokens cache key 至 `20261020-global-typography-v10`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依 `services`／`careers`／`operational-resources`／`about` 文字層級調整 `occupational-safety`：主標題與證照區標題改用粗度 `700`，介紹、健康說明、證照說明與清單統一為 `16px`，保留安全導言特殊標題字體與卡片標題層級；更新 Occupational Safety CSS cache key 至 `20261020-services-typography-v1`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依 `services`／`careers`／`operational-resources` 文字層級調整 `about`：區塊標題改用粗度 `700`，一般段落與卡片內容統一為 `16px`，子公司小標改用共用標題粗度 `500`，保留認證年份、導覽 tab、按鈕與 fallback 的專用層級；更新 About CSS cache key 至 `20261020-services-typography-v165`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依 `services`／`careers` 文字層級調整 `operational-resources`：區塊標題改用粗度 `700`，一般說明文字、安全／資源內容與地理節點文字統一為 `16px`，保留分頁 tab 與數據節點的專用文字層級；更新 Operational Resources CSS cache key 至 `20261020-services-typography-v2`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依 `services` 頁面文字層級調整 `careers`：同步區塊標題、福利項目、內文、福利清單與招募文案的字型、字級、字重與行高；`join-intro p`、`.benefits-list__row p` 與福利清單 `li` 比照服務說明改為 `16px`，`.recruitment-copy` 使用特殊標題字體且不額外設定 `font-weight`，更新 Careers CSS cache key 至 `20261020-services-typography-v8`，已完成 Release build、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機瀏覽器畫面、實體裝置、跨瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 將 `services.html` 內陸貨櫃集散地原文依既有句號拆分為兩段，未修改任何敘述文字，未 commit、未 push。
- [x] 將 `services.html` 的 `service-switcher` 調整為四個選單：「內陸貨櫃集散站、倉儲物流、碼頭裝卸、機具銷售與維修」；目前新增選單先對應既有倉儲內容 panel，並修正共用 panel 時 tab 選取狀態只能有一個，更新 JS cache key 至 `v12`，未 commit、未 push。
- [x] 更新所有靜態頁面共用 header 的服務項目選單為「內陸貨櫃集散站、倉儲物流、碼頭裝卸、機具銷售與維修」，保留原服務連結；`services.html` 新增項目對應現有 `#warehousing` 定位，未 commit、未 push。
- [x] 修正首頁最新消息公告 hover／focus 時標題維持白色文字；原規則含 `#main-content`、權重較高，已補上同等權重 selector 並更新 CSS cache key 至 `v121`，未 commit、未 push。
- [x] 首頁「我們的服務」新增第 4 張暫定服務卡片，先使用既有 `01.png`、暫定標題「倉儲管理」與暫定敘述；首頁服務卡片 JS 會自動套用箭頭與互動，未 commit、未 push。
- [x] 縮短 `.home-page#main-content .home-latest__heading` 與新聞內容的間距：桌機 `margin-bottom` 調整為 `32px`、手機為 `24px`；更新 CSS cache key 至 `v119`，未 commit、未 push。
- [x] 縮小首頁最新消息區塊上下留白：桌機調整為 `60px / 64px`、手機調整為 `48px / 52px`；更新 CSS cache key 至 `v118`，未 commit、未 push。
- [x] 將首頁最新消息區塊英文小標題改為白色文字，更新 CSS cache key 至 `v117`，未 commit、未 push。
- [x] 恢復首頁最新消息區塊原有深色背景 `#2b3039`，同步恢復深色背景所需的白色標題、新聞文字與淡色分隔線；修正 CSS 規則順序後更新 cache key 至 `v116`，未 commit、未 push。
- [x] 修正首頁 header 消失問題：幾何背景層原本使用未限定 `main` 的 `.home-page > :not(...)`，誤將 body 直屬 header 的 `z-index` 覆蓋為 `1`；已限定為 `main.home-page > :not(...)`，並更新 CSS cache key 至 `v114`，未 commit、未 push。
- [x] 恢復首頁英文小標題 `.home-page .home-section-eyebrow` 原本字級：桌機回到 `var(--font-size-label)`、手機回到 `.75rem`；更新 CSS cache key 至 `v113`，未 commit、未 push。
- [x] 將首頁 `.home-page .home-section-eyebrow` 字級調整為 `24px`，桌機與手機規則一致；修正誤套用到其他 `.eyebrow` 規則的問題，並更新 CSS cache key 至 `v111`，未 commit、未 push。
- [ ] 首頁灰色幾何背景改為依照國泰頁面的 `background-holder` 與兩個大型漸層矩形實作，使用 `rotate(-45deg)`／`rotate(45deg)` 與對應 `transform-origin`；目前已完成結構與桌機初步對照，但手機與最終視覺位置仍待確認，不標示完成，未 commit、未 push。
- [x] 修正首頁「我們的服務」區塊以不透明背景覆蓋幾何背景的問題，將服務區塊與其 `::after` 背景改為透明，讓國泰式幾何層可透出；已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際確認桌機與 390px 手機服務區塊可看見斜角背景，未 commit、未 push。
- [ ] 調整首頁集團事業群幾何背景：以白色區塊隔離全頁幾何層，停用會與其交疊的全頁底部矩形，改在集團事業群區塊內以同規格旋轉漸層矩形補完整斜線；已更新 CSS cache key，尚待瀏覽器重新確認桌機與手機，未 commit、未 push。

## 2026-10-19
- [x] 移除首頁最新消息區塊背景顏色與透明地球裝飾圖片，改為透明背景並停用 `::before` 圖層；保留新聞列表與內容排版，更新 Home CSS cache key 至 `v107`，已完成 `git diff --check` 與 `node --check wwwroot/js/pages/home.js`，未 commit、未 push。
- [x] 將首頁最新消息區塊背景改為全域淺灰 token `var(--color-surface-section)`（`#f6f6f6`），保留透明地球左下裝飾與既有內容；更新 Home CSS cache key 至 `v106`，已完成 `git diff --check`，未 commit、未 push。
- [x] 將首頁最新消息透明地球改為以區塊為定位基準的左下獨立裝飾層：`::before` 使用 `left: 0`、`bottom: 0`、桌面最大寬度 `560px` 與 `contain`，平板／手機縮小並維持內容在上層；更新 Home CSS cache key 至 `v105`。已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際驗證 1440px／1920px／2560px 桌面與 390px 手機：定位固定、透明素材載入、四筆列表、內容層級正確且無水平溢位；實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 將首頁最新消息 `::before` 背景圖替換為透明地球素材 `newshero-globe-transparent.png`，保留左下定位、固定尺寸與響應式設定；更新 Home CSS cache key 至 `v104`，已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際確認桌機／390px 手機載入新圖片、四筆列表與無水平溢位；未 commit、未 push。
- [x] 從 `newshero.png` 抽出白色／淡白半透明地球科技圖案，移除原背景與右側留白，輸出透明 RGBA PNG `newshero-globe-transparent.png`；原圖保留未覆寫，已確認 `hasAlpha: yes`，未替換現有網站背景引用。
- [x] 依參考圖方向縮小首頁最新消息左下地球裝飾：桌面固定 `1400px` 原圖寬度並以 `-90px bottom` 定位，平板 `1000px`、手機 `520px` 並降低手機透明度；保留 `::before` 背景層、淺灰藍延伸底色與內容可讀性，更新 Home CSS cache key 至 `v103`，已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際驗證 1440px／1920px／2560px 桌面與 390px 手機：地球尺寸／位置固定、四筆列表、背景滿版與無水平溢位；未 commit、未 push。
- [x] 將首頁最新消息背景圖層由垂直置中改為左下對齊，桌面固定原圖尺寸，手機維持固定縮小尺寸並以左側偏移貼近左下角；更新 Home CSS cache key 至 `v102`，已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際驗證 1440px／1920px／2560px 桌面與 390px 手機背景均為左下定位、圖片尺寸固定且無水平溢位；未 commit、未 push。
- [x] 將首頁最新消息背景改為獨立 `::before` 圖層：桌面固定 `2048px` 原圖尺寸並左側定位，平板／手機使用較小固定尺寸與位置，區塊以相近底色延伸超寬畫面；移除 `background-size: cover`，更新 Home CSS cache key 至 `v101`，已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際驗證 1440px／1920px／2560px 桌面與 390px 手機：背景圖尺寸／位置固定、區塊滿版、四筆列表與無水平溢位；未 commit、未 push。
- [x] 將首頁最新消息區塊背景改用 `wwwroot/public/images/index/newshero.png`，設定為置中、`cover` 且不重複；更新 Home CSS cache key 至 `v100`，已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際確認桌機／390px 手機背景圖片載入與手機無水平溢位；未 commit、未 push。
- [x] 將首頁最新消息日期／分類文字再縮小為全域 `--font-size-body-sm`，標題維持 `--font-size-body-lg` 以凸顯標題；更新 Home CSS cache key 至 `v98`，已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際確認桌機／390px 手機字級與手機無水平溢位；未 commit、未 push。
- [x] 縮短首頁最新消息列表日期／分類與標題的間距，以及標題到水平分隔線的留白；桌機項目內距調為 `20px`、手機 `16px`、標題上間距 `8px`，更新 Home CSS cache key 至 `v97`；已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並以 ASP.NET 實際驗證桌機／390px 手機間距與手機無水平溢位；未 commit、未 push。
- [x] 依回饋再次縮小首頁最新消息列表文字：日期／分類改用全域 `--font-size-body`，標題改用 `--font-size-body-lg`，桌機與手機一致；更新 Home CSS cache key 至 `v96`，已完成 `git diff --check` 並重新驗證桌機／手機實際字級；未 commit、未 push。
- [x] 將首頁最新消息列表日期／分類與標題字級改用全域 `--font-size-body-lg`、`--font-size-card-title` 與手機 `--font-size-card-title-compact`，移除頁面專用 `clamp()` 字級；更新 Home CSS cache key 至 `v95`，已完成 `git diff --check` 並重新驗證桌機／手機實際字級；未 commit、未 push。
- [x] 將首頁最新消息改為參考圖的日期／分類同列、標題下一行與水平分隔線列表，首頁前台與 ASP.NET 首次渲染同步只顯示前四筆；隱藏圖片與箭頭並保留新聞連結。更新 Home CSS／JS cache key 至 `v94`／`v3`；已完成 `dotnet build -c Release`、`node --check wwwroot/js/pages/home.js`、`git diff --check`，並以 ASP.NET 實際首頁驗證桌機 1432px／手機 390px：四筆列表、SSR／API 結構一致、手機無水平溢位；實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 移除首頁最新消息區塊的深色背景與白色文字覆寫，改為透明背景及全域深色文字／分隔線；更新 Home CSS cache key 至 `v93`。已執行 `git diff --check`、`node --check wwwroot/js/pages/home.js`，桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行；未 commit、未 push。
- [x] 將首頁最新消息區塊英文小標題由 `LATEST NEWS` 改為 `NEWS`。更新 Home CSS cache key 至 `v92`；已執行 `git diff --check`、`node --check wwwroot/js/pages/home.js`，未 commit、未 push。
- [x] 依需求移除首頁斜切色塊與圖片斜切效果，恢復原本的首頁背景與圖片樣式；英文小標題及其他既有首頁調整保留。更新 Home CSS cache key 至 `v91`；已執行 `git diff --check`、`node --check wwwroot/js/pages/home.js`，未 commit、未 push。
- [x] 將首頁斜切設計由斜向線條改為大面積純色斜切背景：About 與 Services 使用 `clip-path` 色塊，保留 About 圖片斜切；手機版維持圖片不裁切。更新 Home CSS cache key 至 `v90`；已執行 `git diff --check`、`node --check wwwroot/js/pages/home.js`，未 commit、未 push。
- [x] 首頁加入斜切面設計：About 背景增加斜向幾何線條與右側圖片左下斜切，Services 增加斜向背景裝飾；手機版取消圖片裁切以維持內容可讀性。更新 Home CSS cache key 至 `v89`；已執行 `git diff --check`、`node --check wwwroot/js/pages/home.js`，未執行實體裝置、跨瀏覽器及無障礙人工驗收；未 commit、未 push。
- [x] 修正首頁 About 區塊樣式責任：將原本套用所有 `.home-intro p` 的介紹段落規則限縮為 `.home-intro__description p`，避免覆蓋 `ABOUT APLI` 英文小標題；讓四個英文小標題真正共用同一組字體、大小、字重與一般文字顏色，`LATEST NEWS` 仍保留白色。更新 Home CSS cache key 至 `v88`；已執行 `git diff --check`、`node --check wwwroot/js/pages/home.js`，未 commit、未 push。
- [x] 修正 `ABOUT APLI` 被既有 `.home-page .home-intro p` 白色規則覆蓋的選擇器優先權問題；以與其他一般英文小標題相同的 `var(--color-muted)` 顯示，並保留 `LATEST NEWS` 白色需求。更新 Home CSS cache key 至 `v87`；已重新載入 `http://localhost:5127/` 確認文字可見，並執行 `git diff --check`、`node --check wwwroot/js/pages/home.js`；未執行實體裝置、跨瀏覽器及無障礙人工驗收；未 commit、未 push。
- [x] 統一首頁英文小標題外觀：移除 `ABOUT APLI` 的專屬深灰色規則，改與 `OUR SERVICES`、`GROUP BUSINESS` 共用相同顏色與字體樣式；`LATEST NEWS` 依既有需求保留白色。更新 Home CSS cache key 至 `v86`；已執行 `git diff --check`、`node --check wwwroot/js/pages/home.js`，未執行桌機／手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收；未 commit、未 push。
- [x] 移除未指定的首頁 Hero 英文小標題 `APLI LOGISTICS` 與 `.home-page .home-hero__copy .home-hero__eyebrow` CSS；保留的 `ABOUT APLI`、`OUR SERVICES`、`LATEST NEWS`、`GROUP BUSINESS` 統一使用全域字體、大小與字重，並保留既有顏色差異。更新 Home CSS cache key 至 `v85`；已執行 `git diff --check`、`node --check wwwroot/js/pages/home.js` 與關鍵字檢查，未執行桌機／手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收；未 commit、未 push。
- [x] 修正首頁 `ABOUT APLI` 被既有 `.home-intro p` 白色文字規則覆蓋而無法看見的問題，改用 About 標題區塊專屬文字顏色；更新 Home CSS cache key 至 `v84`，已完成 `git diff --check`、`node --check wwwroot/js/pages/home.js`，並在 `http://localhost:5127/` 實際頁面確認 `ABOUT APLI` 與 `OUR SERVICES` 可見；實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依需求將首頁「最新消息」區塊 `LATEST NEWS` 英文小標題改為白色文字；更新 Home CSS cache key 至 `v83`，已完成 `git diff --check` 與 `node --check wwwroot/js/pages/home.js`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依需求移除首頁「聯絡我們」CTA 區塊英文小標題，保留「關於亞太」區塊的 `ABOUT APLI` 英文小標題；更新 Home CSS cache key 至 `v82`，已完成 `git diff --check` 與 `node --check wwwroot/js/pages/home.js`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依參考圖在首頁 Hero 與主要區塊標題加入英文小標題，採英文小標在上、中文主標在下的層級；更新 Home CSS cache key 至 `v81`，已完成 `git diff --check` 與 `node --check wwwroot/js/pages/home.js`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依需求將字體改為全域套用指定的 Roboto、Noto Sans TC、微軟正黑體等字體堆疊；同步更新所有公開 HTML 的全域 tokens cache key 至 `v8`，移除首頁「我們的服務」局部字體覆寫，已完成 `git diff --check` 與 `node --check wwwroot/js/pages/home.js`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依需求將首頁「我們的服務」區塊及其標題／卡片文字套用指定的 Roboto、Noto Sans TC、微軟正黑體等字體堆疊；更新 Home CSS cache key 至 `v80`，已完成 `git diff --check` 與 `node --check wwwroot/js/pages/home.js`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依需求恢復 About「認證與獎項」年份文字原本的 `var(--color-primary)` 顏色，其他區塊文字顏色維持不變；更新 About CSS cache key 至 `v163`，已完成 `git diff --check` 與 `node --check wwwroot/js/pages/about.js`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 調整 About「認證與獎項」區塊文字為 `#333333`，並將「經營理念」區塊標題／敘述分別改為 `#333333`／`#555555`；更新 About CSS cache key 至 `v162`，已完成 `git diff --check` 與 `node --check wwwroot/js/pages/about.js`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 移除 About「子公司簡介」卡片邊線，保留 `rgb(255 208 138)` 背景與深色文字；更新 About CSS cache key 至 `v161`，已完成 `git diff --check`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 將 About「子公司簡介」卡片背景改為 `rgb(255 208 138)`，標題與敘述改用全域深色文字，並同步調整卡片框線為深色低透明度；更新 About CSS cache key 至 `v160`，已完成 `git diff --check`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 為 About「經營理念-1」區塊加入既有全域淺灰背景 `var(--color-surface-section)`；更新 About CSS cache key 至 `v159`，已完成 `git diff --check`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 將 About「經營理念-1」標題與下方敘述的間距調整為比照「關於亞太」區塊的 `24px`；更新 About CSS cache key 至 `v158`，已完成 `git diff --check`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 移除「經營理念-1」標題群組的頁面專屬下方間距覆寫，改為直接使用全域 `--section-heading-content-gap: 40px` 與全域標題群組間距；更新 About CSS cache key 至 `v157`，已完成 `git diff --check`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 為 About「經營理念-1」標題下方加入指定企業理念敘述，並讓標題群組與卡片內容間距比照全域規則；更新 About CSS cache key 至 `v156`，已完成 `git diff --check`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 將 About「經營理念-1／企業價值觀」區塊上下間距調整為與「關於亞太」一致，統一使用 `var(--section-space-sm)`，並移除手機版額外覆寫；更新 About CSS cache key 至 `v155`，已完成 `git diff --check`，瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 依需求刪除 About「經營理念」區塊，保留「經營理念-1／企業價值觀」三張圖片卡片與裝飾線；同步移除舊理念區塊專用 CSS／JavaScript，更新 About CSS cache key 至 `v154`，已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 為 About「經營理念-1／企業價值觀」標題加入與全域一致的橘色漸層裝飾線，桌機 3px、手機 2px，並移除原本標題底線衝突；更新 About CSS cache key 至 `v153`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將 About `.about-enterprise-values__grid` 卡片略微放大：網格最大寬度由 960px 調整為 1080px，卡片最小高度與文字內距同步增加；更新 About CSS cache key 至 `v152`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將 About「經營理念-1／企業價值觀」三張卡片調整為明亮配色：明亮暖橘、淺青藍與淺橄欖綠，維持 APLI 主題並避免完全複製參考圖；更新 About CSS cache key 至 `v151`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將 About「經營理念-1／企業價值觀」三張卡片改用 APLI 自有低彩度品牌色系：暖橘、藍灰與米灰，避免直接沿用參考圖的高彩度黃／藍／綠；更新 About CSS cache key 至 `v150`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 清理 About `.about-enterprise-values` 區塊，移除區塊本身不需要的背景圖片、背景色與背景定位／尺寸設定，保留圖片卡片與版面必要樣式；更新 About CSS cache key 至 `v149`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 為 About「經營理念-1／企業價值觀」三張卡片加入上方圖片、下方文字的上下版型，使用既有 About 圖片資產，原有「經營理念」區塊維持不變；更新 About CSS cache key 至 `v148`，已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將 About「經營理念-1／企業價值觀」卡片調整為三張，移除「永續發展」，桌機改為三欄排列、手機維持單欄；原有「經營理念」區塊維持不變，更新 About CSS cache key 至 `v147`，已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 在 About「關於亞太」與原有「經營理念」區塊之間新增參考圖風格的「企業價值觀」區塊：使用企業現場背景圖、置中標題與三張彩色價值卡，桌機三欄排列、手機單欄排列；恢復並保留原有經營理念 UI／UX，更新 About CSS cache key 至 `v146`，已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 依「恢復」要求，將首頁「聯絡我們」區塊標題與說明文字恢復為全域深色文字 `--color-text-primary`／`--color-text-body`；按鈕橘色、CTA 高度與 hover／focus 狀態維持不變，更新 Home CSS cache key 至 `v79`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將首頁「聯絡我們」區塊標題與說明文字恢復為白色，按鈕維持主題橘預設與既有 hover／focus 狀態；更新 Home CSS cache key 至 `v78`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將首頁「聯絡我們」CTA 區塊上下留白縮小：桌機改為 `clamp(48px, 6vw, 80px)`、手機改為 `48px`，降低區塊高度與視覺權重；更新 Home CSS cache key 至 `v77`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將首頁「聯絡我們」按鈕預設背景改為全域主題橘 `--color-primary`、文字改為淺色，hover／focus 改為白底深色文字以保留狀態差異；更新 Home CSS cache key 至 `v76`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將首頁「聯絡我們」區塊標題與說明文字改用全域深色文字色 `--color-text-primary`／`--color-text-body`，按鈕樣式維持不變；更新 Home CSS cache key 至 `v75`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 移除首頁 `.home-page .home-contact` 背景圖片上的深色遮罩，保留背景位置 `center top` 與其他內容樣式；更新 Home CSS cache key 至 `v74`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將首頁 `.home-page .home-contact` 背景圖片改為 `center top`，桌機與手機皆讓圖片內容往下呈現；更新 Home CSS cache key 至 `v73`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將 operational-resources 桌機版三個原本限制為 960px 的內容區塊（營運資源標題、資料區塊與職安圖文區塊）改為使用與 About 外層一致的 `--content-width`／`--content-max-width`（桌機最大 1324px），手機版維持既有響應式行為；更新 CSS cache key 至 `v3`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將 company-history 頁面垂直時間軸的整體內容區塊最大寬度收窄至 1120px，讓左右留白增加並維持小螢幕既有 `--content-width` 響應式行為；整理實際生效的 APLI 版型規則並更新 CSS cache key 至 `v4`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將 company-history 頁面 `.milestones-page .milestone-content-shell.is-vertical-timeline .milestone-vertical__event h3` 字重由一般調整為中等，僅影響垂直時間軸事件標題；更新 CSS cache key 至 `v2`，已完成 `git diff --check`，未執行瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收，未 commit、未 push。
- [x] 將 About「子公司簡介」改為參考圖內容型卡片：移除 Logo 與圖示，六張卡片僅保留公司名稱與敘述，卡片背景改為 `rgb(0 0 0 / 50%)` 並調整文字對比，使用細框、圓角與 3×2 網格；恢復標題下方與其他 About 區塊一致的細身橘色裝飾線，子公司名稱恢復頁面原本的中等字重，了解更多按鈕維持卡片下方並將按鈕與卡片間距縮短至 16px，保留首頁 hover 動畫，並更新 About CSS cache key 至 v144。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；瀏覽器桌機／手機畫面、實體裝置、跨瀏覽器與完整人工無障礙驗收尚未執行，未 commit、未 push。

## 2026-10-18
- [x] 2026-10-18 依需求為 occupational-safety 頁「專業證照」標題加入與其他頁面一致的 APLI 橘色漸層裝飾線；標題內容寬度、線高 3px、上間距 12px，已更新 CSS cache key 至 v2，完成 `node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check`，並以 ASP.NET 實際 occupational-safety 桌機 viewport 驗證標題寬度約 129px、裝飾線高度 3px、上間距 12px；手機畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依回饋將 Careers「公司福利」標題改為置中呈現；已更新 Careers CSS cache key 至 v4，完成 `node --check wwwroot/js/site.js`、`git diff --check`，並以 ASP.NET 實際 Careers 桌機 viewport 驗證標題容器與標題中心對齊；手機畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依回饋縮短 Careers「公司福利」表格寬度至最多 960px，並將 `.benefits-list__row h3` 字重調整為一般字重；已更新 Careers CSS cache key 至 v3，完成 `node --check wwwroot/js/site.js`、`git diff --check`，並以 ASP.NET 實際 Careers 桌機 viewport 驗證表格最大寬度 960px、標題字重 400；手機畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依需求為 Careers 頁「加入亞太」與「公司福利」標題加入與其他頁面一致的 APLI 橘色漸層裝飾線；標題內容寬度、線高 3px、上間距 12px，已更新 Careers CSS cache key 至 v2，完成 `node --check wwwroot/js/site.js`、`git diff --check`，並以 ASP.NET 實際 Careers 桌機 viewport 驗證兩個標題裝飾線均跟隨約 112px 標題寬度；手機畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依需求為 Services 頁三個服務區塊標題加入與首頁／About 一致的 APLI 橘色漸層裝飾線；標題內容寬度、線高 3px、上間距 12px，已更新 Services CSS cache key 至 v2，完成 `node --check wwwroot/js/pages/services.js`、`git diff --check`，並以 ASP.NET 實際 Services 桌機 viewport 驗證目前顯示的「倉儲物流」標題裝飾線；手機畫面、其他服務分頁、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依需求為首頁「最新消息」與「集團事業群」標題加入與其他首頁標題一致的 APLI 橘色漸層裝飾線；已更新首頁 CSS cache key 至 v72，完成 `node --check wwwroot/js/site.js`、`git diff --check`，並以 ASP.NET 實際首頁桌機 viewport 驗證兩條裝飾線均為 3px 高、12px 上間距，且分別跟隨約 129px／161px 標題寬度；手機畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依需求為首頁「我們的服務」標題加入與 About／「關於亞太」一致的 APLI 橘色漸層裝飾線；已更新首頁 CSS cache key 至 v70，完成 `node --check wwwroot/js/site.js`、`git diff --check`，並以 ASP.NET 實際首頁桌機 viewport 驗證裝飾線為 3px 高、12px 上間距且跟隨標題寬度；手機畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依回饋將首頁「關於亞太」裝飾線長度與標題間距比照 About：標題改為內容寬度，裝飾線跟隨標題寬度，沿用相同 `--section-heading-accent-gap`；已更新首頁 CSS cache key 至 v69，完成 `node --check wwwroot/js/site.js`、`git diff --check`，並以 ASP.NET 實際首頁桌機 viewport 對照 About 驗證標題寬度與裝飾線均為約 129px、上間距 12px；手機畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依需求為首頁「關於亞太」標題加入 APLI 橘色漸層裝飾線，沿用既有標題裝飾線 token 與頁面限定 CSS；已更新首頁 CSS cache key 至 v68，完成 `node --check wwwroot/js/site.js`、`git diff --check`，並以 ASP.NET 實際首頁桌機 viewport 驗證裝飾線為 3px 高、12px 上間距；手機畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依需求移除 About「未來展望」整個區塊及其未使用的頁面專屬 CSS，更新 About CSS cache key 至 v118；已完成 `git diff --check`，ASP.NET 桌機／手機畫面驗證待完成，未 commit、未 push。
- [ ] 2026-10-18 依回饋調整行動裝置 About「經營理念」說明：`__details` 改為左對齊，標題採中等字重、正文維持一般字重以比照參考版面；已更新 About CSS cache key 至 v117，手機畫面驗證待完成，未 commit、未 push。
- [x] 2026-10-18 依回饋調整行動裝置 About「經營理念」：拉開 `about-philosophy-editorial__intro` 與 `__arc-stack` 的距離，並讓三個 `__detail` 直接同時顯示，不再依點擊切換說明；已更新 About CSS／JavaScript cache key 至 v116／v16，完成 `node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證手機 330px／484px：間距約 48–53px、理念區無水平溢位、三個說明均顯示且點擊後不切換；桌機瀏覽器畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit、未 push。
- [x] 2026-10-18 依回饋停用行動裝置的 About「關於亞太」與「經營理念」背景圖片，避免 `02.png`／`04.png` 圖案因窄版比例變形；桌機維持原背景，已更新 About CSS cache key 至 v115，完成 `git diff --check`、`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release --no-restore`，並以 ASP.NET 實際 `/about` 路由驗證桌機 1440×900／手機 390×844：桌機保留兩張背景、手機兩區背景均為 `none`，弧形置中、理念切換正常且無水平溢位；未 commit、未 push。
- [x] 2026-10-18 依回饋將 About「經營理念」背景改用 `public/images/about/04.png`，沿用區塊滿版背景比例，保留圖片原有左下幾何構圖與弧形／說明互動；已更新 About CSS cache key 至 v114，完成 `git diff --check`、`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證桌機 1440×900／手機 390×844：背景顯示於左下、弧形位置與說明不受影響、理念切換正常且無水平溢位；未 commit、未 push。
- [x] 2026-10-18 依回饋移除 About「經營理念」左下背景圖嘗試，恢復原本純色背景；保留弧形堆疊、桌機右側說明、手機排列與理念切換互動。已完成 `git diff --check`、`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證桌機 1440×900／手機 390×844：背景為 `none`、弧形位置與切換正常且無水平溢位；未 commit、未 push。
- [x] 2026-10-18 依回饋縮小 About「經營理念」桌機弧形堆疊底部空間：將 `__arc-stack` `min-height` 由 448px 調整為實際三層堆疊高度 336px，保留 section 全域底部 spacing、連接線與說明文字對齊；已更新 About CSS cache key 至 v113，完成 `git diff --check`、`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證桌機 1440×900／手機 390×844：桌機最後弧形至下一區塊約 64px、切換後連接線與右側標題中心對齊，手機說明維持下方且無水平溢位；未 commit、未 push。
- [x] 2026-10-18 依回饋移除 About「經營理念」`__arc-stack` 自身上下 padding，保留弧形堆疊置中、桌機右側說明與連接線／文字對齊；已更新 About CSS cache key 至 v112，完成 `git diff --check`、`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證桌機 1440×900／手機 390×844：桌機切換後弧形標題中心、右側 `h3` 與連接線中心仍對齊，手機說明維持下方、連接線隱藏且無水平溢位；未 commit、未 push。
- [x] 2026-10-18 重構 About「經營理念」HTML／CSS：合併僅用於定位的 `__cards` 與 `__arc-stack` 包裹層，保留置中的弧形堆疊、右側說明、點擊連接線與進場動畫；標題改用 `header`、說明改用 `aside`，移除舊版三欄卡片／icon 樣式，區塊上下間距改用全域 `--section-space-sm`／`--section-space`。已更新 About CSS cache key 至 v111；完成 `git diff --check`、`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證桌機 1440×900／手機 390×844：弧形堆疊位置維持置中、桌機說明維持右側、手機說明位於下方、切換動畫與無水平溢位正常；未 commit、未 push。
- [x] 2026-10-18 依回饋調整 About「經營理念」連接線動畫方向：固定左端，由 0 寬度短線向右繪製至完整長度；右側說明文字維持由右向左滑入，移除左端位移 transition 並更新 About CSS cache key 至 v110。已以 Development ASP.NET 實際 `/about` 點擊確認連接線左端固定、寬度 0→完整值、文字滑入且 JavaScript 無錯誤；手機連接線隱藏且無水平溢位；未 commit、未 push。
- [ ] 依最新要求將 About「經營理念」說明區改回圓弧堆疊右側，並以水平橘色連接線對應目前選取的理念；桌機恢復左右排列，手機維持圓弧上方、說明下方且隱藏水平線；更新 About CSS／JavaScript cache key 至 v97／v7。已完成 `git diff --check`，ASP.NET 實際 `/about` 桌機／手機畫面驗證待本次修改後完成，未 commit。
- [ ] 依回饋在置中的 About「經營理念」圓弧堆疊與下方說明區塊之間加入選取連接線：桌機垂直線長 48px、手機長 36px，保留點擊切換與下方說明排列；更新 About CSS cache key 至 v96。已完成 `git diff --check`，ASP.NET 實際 `/about` 桌機／手機畫面驗證待本次修改後完成，未 commit。
- [x] 依回饋將 About「經營理念」圓弧堆疊改為區塊置中，選取後的理念標題與敘述移至圓弧堆疊下方顯示；桌機與手機統一採上下排列，保留點擊切換與既有橘色視覺；更新 About CSS cache key 至 v95。已完成 `git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：圓弧置中、說明位於圓弧下方且無水平溢位，未 commit。
- [x] 依回饋將 About「經營理念」弧形堆疊整體再縮小：桌機寬度調整為 380px、高度 128px，手機寬度調整為 300px、高度 100px，並同步微調重疊距離；更新 About CSS cache key 至 v94。已完成 `git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：弧形堆疊縮小、維持置中且無水平溢位，未 commit。
- [x] 依回饋讓 About「經營理念」三個預設橢圓都具有淡橘背景與橘色文字，選取項目使用較明顯的橘色背景層級；更新 About CSS cache key 至 v93。已完成 `git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：三個橢圓皆有背景色與橘色文字，選取狀態層級正常且無水平溢位，未 commit。
- [x] 依回饋將 About「經營理念」橢圓線框壓扁：桌機高度調整為 140px、手機調整為 112px，並同步微調上下重疊距離以保留標題可讀性；更新 About CSS cache key 至 v92。已完成 `git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：三個線框更扁、標題仍位於各自區塊內且無水平溢位，未 commit。
- [x] 依回饋拉開 About「經營理念」三個橢圓的上下距離，降低線條交疊程度，避免理念標題被上下弧線遮擋；桌機重疊距離調整為 42px、手機調整為 24px，更新 About CSS cache key 至 v91。已完成 `git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機／手機標題與相鄰弧線間距拉開、橢圓位置置中且無水平溢位，未 commit。
- [x] 依回饋將 About「經營理念」的 `about-philosophy-editorial__arc-stack` 置中並整體縮小：桌機弧形堆疊寬度收至 420px、手機收至 330px，三個橢圓維持同寬縮放；更新 About CSS cache key 至 v90。已完成 `git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機／手機均置中、尺寸縮小且無水平溢位，未 commit。
- [x] 依回饋移除 About「經營理念」三個橢圓線條下方的＋／− icon 與右側短連接線；保留整個理念橢圓／標題可點擊，僅切換目前選取狀態與右側對應敘述，更新 About CSS／JavaScript cache key 至 v89／v6。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：icon 數量為 0、連接線不存在、點擊切換正常且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依最新參考圖修正 About「經營理念」：移除橘色弧形色塊，改為三個垂直交疊的橢圓線條；每個理念保留對應的圓形＋／− 控制點，點擊後以連接線對應右側敘述，手機維持線條堆疊與下方說明；更新 About CSS／JavaScript cache key 至 v88／v5。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：三層橢圓線框、＋／− 控制點、點擊切換、桌機連接線與手機響應式排列均正常且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將 About「經營理念」由圓形 icon 卡片改為三層圓弧線條堆疊的理念選擇器：三個理念標題改為可點擊／鍵盤操作的按鈕，桌機右側顯示對應敘述，手機改為弧形按鈕上方、說明面板下方；保留 focus、reduced-motion 與無 JavaScript 時的基本標題可讀性，更新 About CSS／JavaScript cache key 至 v87／v4。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`、`dotnet build -c Release`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：三層弧形按鈕、點擊／Enter 切換對應敘述、手機響應式排列與無水平溢位均正常；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋恢復 About Hero 為先前的 `about-hero-container-yard.jpg` 貨櫃場圖片，並還原其尺寸與替代文字；更新 About CSS cache key 至 v85。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：圖片載入尺寸為 4000×2655、替代文字正確且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋移除 About「未來展望」的 `about-outlook__lead` 小引言，標題與正文距離改用既有全域 `--section-heading-body-gap` token；更新 About CSS cache key 至 v84。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：小引言不存在，桌機／手機標題至正文間距皆為 40px，無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋調整 About「未來展望」桌機欄位為左側圖片、右側文字，保留圖片 4／文字 6 的比例與手機圖片在上、文字在下順序；更新 About CSS cache key 至 v83。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機圖片／文字欄寬為 504px／756px，手機圖片在上、文字在下，無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將 About「未來展望」正文兩段改為參考「關於亞太」的緊湊段距，統一使用既有全域 `--section-content-gap`（20px）；更新 About CSS cache key 至 v82。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：兩區正文皆為兩段、段距均為 20px，無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋恢復 About「關於亞太」的兩段語意：第二段由「以客為尊」開始，段距改用既有全域 `--section-content-gap`（20px）以維持緊湊閱讀節奏；更新 About CSS cache key 至 v81。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：兩段均載入、第二段正確由「以客為尊」開始，桌機／手機段距均為 20px 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依使用者要求恢復 About「關於亞太」原本緊湊的單段敘述，移除本輪分段與段落留白；更新 About CSS cache key 至 v80。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機／手機皆為單段敘述且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋縮小 About「關於亞太」兩段敘述的留白，改用既有全域 `--content-paragraph-gap` 段距 token（20–28px），保留閱讀呼吸感但避免區塊級大空洞；更新 About CSS cache key 至 v79。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：兩段均載入，桌機／手機段距為 28px／20px，無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將 About「關於亞太」敘述拆為兩段，沿用既有全域 `--section-space` 作為段距，建立與「未來展望」一致的閱讀呼吸感；更新 About CSS cache key 至 v78。已完成 HTML／CSS 靜態檢查與 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：兩個段落均載入，桌機／手機段距分別為 40px／24px，無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將「未來展望」完全套用「關於亞太」的版面規則：桌機左側標題／引言／正文、右側 16:10 圓弧圖片，6:4 欄位比例與同一欄距；980px 以下圖片在上、文字在下並使用 16:9，更新 About CSS cache key 至 v77。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機兩區文字／圖片欄寬均為 756px／504px，手機兩區圖片寬均為 350px、圖片高度均為 196.875px，無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋縮短「未來展望」標題至下方內容的距離，將 `--section-heading-body-gap` 改為直接引用既有全域 `--section-heading-content-gap`（40px），使區塊節奏與全站一致；更新 tokens／About CSS cache key 至 v7／v76。已以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機／手機間距皆為 40px，新版 tokens／CSS 已載入且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依國泰參考圖收窄「未來展望」內容本體至 1040px，固定左圖 380px、加大圖文欄距至響應式 72–112px，並將右側正文拆為兩段、以新增全域 `--content-paragraph-gap` token（20–28px）拉開文字段距；更新 tokens／About CSS cache key 至 v6／v75。已以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機內容寬 1040px、圖片 380px、文字 548px、欄距 112px、段距 28px，手機段距 20px，標題置中且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正「未來展望」的參考圖判讀：以國泰「企業形象」範例為準，標題與裝飾線恢復置中，下方保留收窄的左圖右文布局；更新 About CSS cache key 至 v74。已以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機標題中心 719.996px 對齊內容中心 720px，手機標題中心 194.996px 對齊內容中心 195px，且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依最新國泰參考圖調整「未來展望」：標題與裝飾線改為左對齊，保留收窄內容寬度、較大的標題至內容間距，以及下方左圖右文布局；更新 About CSS cache key 至 v73，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋收窄「未來展望」整體內容寬度至 1180px，標題維持置中，並新增全域 `--section-heading-body-gap` token（響應式 56–96px）拉開標題與下方圖片／文字內容的距離；更新 tokens／About CSS cache key 至 v5／v72。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機內容寬 1180px、標題中心與視窗中心一致、間距 96px，手機間距 40px 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋重整「未來展望」為參考國泰的版型：標題獨立置中，內容區左側圖片、右側小引言與完整敘述，拉開引言與正文間距，手機維持單欄；更新 About CSS cache key 至 v71。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機標題置中、圖片在左、文字在右，手機圖片在上、文字在下且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將「未來展望」圖片／敘述欄位比例調整為參考「關於亞太」的 4:6 圖片／文字配置，保留圖片左側、文字右側與相同間距系統；更新 About CSS cache key 至 v70，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋讓「未來展望」圖片與「關於亞太」採相同圖片比例與圓弧設計，移除斜角裁切；保留圖片左側／文字右側位置，更新 About CSS cache key 至 v69，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋將「未來展望」桌機版圖片與敘述對調：圖片移至左側、標題／敘述移至右側；手機維持圖片先、文字後的單欄閱讀順序，更新 About CSS cache key 至 v68，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋將「未來展望」圖片尺寸比例改為與「關於亞太」一致：桌機 16:10、手機 16:9，保留目前斜角裁切與左文右圖版型；更新 About CSS cache key 至 v67，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依使用者要求恢復「未來展望」右上三角形圖片實驗前的斜角圖片樣式：桌機恢復 18% 左上切角、手機恢復 10% 左上切角，保留左文右圖配置，更新 About CSS cache key 至 v66，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋將 About「未來展望」右側圖片改為右上三角形構圖：桌機使用三點裁切形成三角圖片，手機採窄幅三角裁切，保留左側標題／敘述；更新 About CSS cache key 至 v67，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依使用者要求恢復「關於亞太」圖片原始外觀：恢復圓弧、移除斜角裁切；保留原本左右版面與未來展望圖片設定，更新 About CSS cache key 至 v66，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋移除「關於亞太」圖片的圓弧，外層與圖片本身均改為直角，保留左側斜角裁切；更新 About CSS cache key 至 v65，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋讓 About「關於亞太」右側圖片加入與「未來展望」一致的左側斜角：桌機 18%、手機 10%，保留原本左右版面與響應式尺寸；更新 About CSS cache key 至 v64，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依使用者要求恢復「未來展望」圖片斜角加大實驗前的切角比例：桌機恢復 18%、手機恢復 10%；保留左文右圖版型與 `123456-1.jpg`，更新 About CSS cache key 至 v63，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋加大 About「未來展望」右側裝飾圖片的斜角：桌機左上切角由 18% 調整為 32%，手機由 10% 調整為 22%；更新 About CSS cache key 至 v64，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋調整 About「子公司簡介」：標題加入全域細身橘色裝飾線，六家子公司列移除 Logo 圖片並改以文字公司名稱呈現，保留口風琴互動與按鈕可及名稱；更新 About CSS cache key 至 v61。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：六個公司名稱為純文字、圖片數量為 0，標題線與文字寬度一致、桌機 3px／手機 2px 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依使用者要求恢復「經營理念」區塊至三角金字塔互動實驗前的原本三欄卡片版型；撤回本輪卡片點擊、焦點切換、手機單欄與相關 CSS／JavaScript cache key 變更，保留先前認證區塊與全域文字樣式；已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，未 commit。
- [x] 依回饋將 About「經營理念」改為可點擊的三角金字塔式卡片版型：上方使命、下方核心價值觀／共同願景，點擊或鍵盤 Enter／Space 可切換焦點與說明內容，保留 reduced-motion、focus 狀態與手機版單欄；更新 About CSS／JavaScript cache key 至 v60／v3。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機三欄金字塔排列、手機單欄、點擊可切換 active 卡片且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋移除 About「認證與獎項」事件卡片陰影，保留 `#f7f7f7` 背景與既有版型；更新 About CSS cache key 至 v58，已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋將 About「認證與獎項」事件卡片背景改為 `#f7f7f7`，更新 About CSS cache key 至 v57；已完成 CSS／HTML 靜態檢查與 `git diff --check`，未 commit。
- [x] 依回饋將 About 標題裝飾線收斂為細身速度線：桌機高度由 12px 降至 6px、手機由 10px 降至 5px，保留斜角端點與 APLI 橘色快速淡出漸層，避免厚重色帶感；更新 About CSS cache key 至 v51。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：新版 CSS 已載入，桌機速度線為 300×6px、手機為 220×5px，斜角與淡出漸層正確且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 參考國泰標題下方的斜角短裝飾線版型，為 About「關於亞太」與「經營理念」標題加入 APLI 品牌橘至透明的淡化漸層裝飾線；不採用參考圖綠色，認證與獎項既有標題裝飾維持不變。桌機／手機共用響應式尺寸，更新 About CSS cache key 至 v50。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：兩個標題的裝飾線均已載入、桌機為 300×12px、手機為 220×10px、使用 APLI 橘色漸層且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 恢復 About「關於亞太」原本的一左一右版面：桌機左側為文字、右側為 `public/images/about/hero.png` 圖片，761–980px 以下改為圖片在上、文字在下的單欄響應式排列；補回左右進場動畫與 reduced-motion 媒體規則，並更新 About CSS cache key 至 v49。已完成 `git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：桌機兩欄位置正確、手機單欄順序正確且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依最新回饋恢復原本全站字體：正文維持 Noto Sans TC，標題恢復 Noto Serif TC／Songti TC fallback；移除首頁 Hero 的暫時字體覆寫，改回原始全域 token 繼承，保留本次已確認的 `#333333` 標題與 `#555555` 正文色彩。同步更新 14 個公開頁面 tokens 與首頁 CSS cache key。已完成 CSS／HTML 靜態檢查，並以 ASP.NET 實際首頁路由驗證 Edge 1440×900／390×844：tokens 與首頁 CSS 均載入新版、正文為 Noto Sans TC、Hero 兩段文字與全域標題 token 均為 Noto Serif TC，色彩維持 `#333333`／`#555555` 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋保留首頁 Hero 的既有襯線識別：僅將「優質服務 唯客思維」與「您的貨物，由亞太守護」恢復為 `Noto Serif TC`／`Songti TC` fallback，不影響其餘頁面標題採用的全域 Noto Sans TC；同步更新首頁 CSS cache key。已完成 CSS／HTML 靜態檢查，並以 ASP.NET 實際首頁路由驗證 Edge 1440×900／390×844：新版首頁 CSS 已載入、兩段 Hero 文字皆為 Noto Serif TC，且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 全站文字系統參考國泰金控「金控簡介」頁的乾淨無襯線與中性深灰層級：將全域標題字體由襯線改為既有已載入的 `Noto Sans TC`，並依實際色碼將主／正文／輔助文字 token 調整為 `#333333`／`#555555`／`#737373`；保留 APLI 品牌橘與深底反白規則。同步更新 14 個公開頁面的 `tokens.css` cache key，確保新版 token 實際載入。已完成 `dotnet build -c Release`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：v2 token 已載入、標題與正文計算字體皆為 Noto Sans TC、計算色彩分別為 `rgb(51, 51, 51)` 與 `rgb(85, 85, 85)` 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。

## 2026-10-17
- [x] 將 About 關係企業 CTA 改為「子公司簡介」口風琴：移除導流 CTA、移除所有 `about-subsidiary__icon`，每列僅顯示既有六家企業 Logo、不顯示視覺公司名稱，並以按鈕 `aria-label` 保留可及名稱；Logo 放大至桌機 160×56px、手機 128×46px，以清楚呈現 Logo 文字；移除區塊與第一列上頂線，整體上下間距改用全域 `--section-space-sm`，標題至口風琴清單的間距改用全域 `--section-heading-content-gap`；收窄左右內距，縮短展開後標題與敘述間距；展開時關閉外層列底線，內容面板僅保留標題與敘述間的上方分隔線，移除敘述下方底線，敘述使用全域 `--content-padding` 內縮以建立標題層級，展開／收合保留高度與透明度過渡，預設全部收合，並改回先前 About 關係企業區塊的六段公司短敘述。已完成 `git diff --check`、`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release`；先前已以 ASP.NET 實際 `/about` 路由驗證六個 Logo 載入與桌機／手機無水平溢位；本次間距調整已完成靜態驗證，實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 在 About「認證與獎項」下方新增關係企業 CTA：以置中標題、品牌裝飾線、簡短說明與主按鈕導向 `/affiliates`，沿用全域字級、色彩、按鈕與 reduced-motion 規則；同步更新 About CSS cache key。已完成 `dotnet build -c Release`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：CTA 內容與連結正確、載入新版 CSS、直接銜接 Footer且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 移除 About 頁底部「關係企業」輪播區塊，並清除 About 頁不再需要的首頁 CSS／JavaScript 引用；保留全站主選單與獨立關係企業頁入口。已完成 `dotnet build -c Release`、`git diff --check`，並以 ASP.NET 實際 `/about` 路由驗證 Edge 1440×900／390×844：主內容由「認證與獎項」直接銜接 Footer、無殘留關係企業元件或首頁資源引用，且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 將 `about.html` Hero 圖片改用 `public/images/about/hero.png`，同步更新圖片尺寸、替代文字與頁面 CSS cache key；已完成圖片路徑檢查、`dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 調整 About 頁「關於亞太」區塊：移除內容圖片，改為單欄置中的文字版面，並清除不再使用的圖片欄位與動畫規則；更新 About CSS cache key 至 v3。已完成 HTML／CSS 靜態檢查、`dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依參考圖調整 About「關於亞太」區塊為企業介紹式置中版型：增加上下留白、標題下方品牌裝飾線、限制內文寬度並置中排版；保留既有文案並更新 About CSS cache key 至 v4。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 縮小 About「關於亞太」標題與內文間距：標題下方間距調整為 18px，裝飾線與文字間距調整為 12px；更新 About CSS cache key 至 v5。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 將 About「關於亞太」標題下方裝飾線改為透明邊緣的流線型品牌漸層，加入柔和陰影以提升層次；更新 About CSS cache key 至 v6。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依回饋重新收斂 About 裝飾線：改為較細長的流線膠囊形、柔和漸層與微幅傾斜，避免呈現粗重色帶；更新 About CSS cache key 至 v7。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依最新回饋移除 About「關於亞太」標題下方裝飾線，保留純文字置中版型；更新 About CSS cache key 至 v8。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 將 About「經營理念」區塊標題與說明文字改為置中呈現，並同步套用手機版；更新 About CSS cache key 至 v9。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依參考圖收斂 About「經營理念」視覺：標題改為較醒目的乾淨置中樣式，移除原本標題底線並保留說明文字與理念卡片層次；更新 About CSS cache key 至 v10。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 恢復 About「經營理念」標題原本的全域字級，保留置中對齊與無底線樣式；更新 About CSS cache key 至 v11。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依參考圖縮短 About「經營理念」說明文字，改為「以客為尊，持續創新。」的精簡主標語；已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依使用者要求恢復 About「經營理念」原完整說明文字；已完成 `git diff --check`，其他版面樣式未變，未 commit。
- [x] 依參考圖重做 About「經營理念」卡片：改為開放式三欄圖示圓形、置中文字、淡色背景與環形線條，不再使用厚重矩形卡片；手機版改為單欄排列；更新 About CSS cache key 至 v12。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 修正 About「經營理念」圖示被舊 filter 連同背景一起套色而消失的問題：移除 filter，改用品牌橘圓底並顯示原始圖示；更新 About CSS cache key 至 v13。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 調整 About「經營理念」卡片：提高 icon 堆疊層級避免被環線遮住，並將英文副標移到中文標題上方；更新 About CSS cache key 至 v14。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依參考圖調整 About「經營理念」卡片位置：中間卡片上移、左右卡片下移至環線轉折處，並縮短 icon 與標題間距；手機版恢復單欄正常排列，更新 About CSS cache key 至 v15。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 修正 About「經營理念」中間 icon 可能被版型壓縮或裁切：固定 icon flex 尺寸與最大寬度，允許可見溢出並更新 About CSS cache key 至 v16。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 移除 About「經營理念」卡片英文副標，並將左右圓形下移至環線兩側轉折位置；中間卡片維持上方位置，更新 About CSS cache key 至 v17。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 將 About「經營理念」中間圓形再上移，使圓心對準橢圓線中央最高點；左右圓形位置維持在線條兩側轉折處，更新 About CSS cache key 至 v18。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依「恢復」要求撤回上一個中間圓形對齊調整，恢復中間卡片原本上移 `24px` 的位置；保留英文移除與左右卡片轉折定位，更新 About CSS cache key 至 v19。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 將 About「經營理念」三張卡片的圓形統一為同一水平列，移除中間與左右卡片的垂直錯位；更新 About CSS cache key 至 v20。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 在 About「認證與獎項」上方新增「肯定與榮耀」區塊，加入金舫獎、1111 幸福企業、運動好人才與高雄港務局四組獎項 Logo／品牌識別卡片；更新 About CSS cache key 至 v21。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依最新要求移除 About「肯定與榮耀」區塊及其專用 CSS，恢復「認證與獎項」直接接續於經營理念之後；更新 About CSS cache key 至 v22。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 將 About「認證與獎項」區塊背景改為透明，並將獎項資料卡片由白色改為淺色表面底搭配邊框；更新 About CSS cache key 至 v23。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 依最新要求移除 About「認證與獎項」獎項資料卡片細邊框，保留淺色表面與陰影；更新 About CSS cache key 至 v24。已完成 `dotnet build -c Release`、`git diff --check`，瀏覽器與實體裝置畫面尚未驗證，未 commit。
- [x] 將首頁「我們的服務」卡片標題 `.home-services-compare__body h3` 由 24px 調整為既有的 20px compact token，桌機與手機同步套用；同步更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check`，並以本機 Edge 確認 1432px／390px 三個標題計算值皆為 20px、載入新版 CSS 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正開啟右側 DevTools 後首頁服務卡片縮成近似正方形的問題：桌機卡片改為固定 415px 高度，768–1100px 使用 360px，避免 `29vw` 隨停靠 DevTools 壓縮而改變卡片比例；手機規則維持不變，並更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check`，並以本機 Edge 驗證 1432px 桌機與 1180px DevTools 壓縮寬度皆為 415px 高、390px 手機維持 350×427px 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 將首頁最新消息區塊背景改為 `#2b3039`，並同步調整標題、日期、分隔線與 hover 背景的對比層級；更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check`，並以本機 Edge 驗證 1432px／390px 背景為 `rgb(43, 48, 57)`、標題與新聞文字為白色、日期為半透明白色且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正深色最新消息區塊的資料列 hover／focus 標題被舊規則覆蓋成黑色的問題，強制維持白色文字並更新首頁 CSS cache key；已完成 `dotnet build -c Release`、`git diff --check` 與 CSS cascade 檢查，實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 將首頁最新消息「更多資訊」按鈕高度由 40px 提高至 48px，桌機與手機同步套用並更新首頁 CSS cache key；已完成 `dotnet build -c Release`、`git diff --check`，並以本機 Edge 驗證 1432px／390px 實際高度皆為 48px 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 將首頁「關於亞太」區塊的「了解更多」按鈕同步調整為 48px 高度，對齊最新消息「更多資訊」按鈕；更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check`，並以本機 Edge 驗證 1432px／390px 兩個按鈕實際高度皆為 48px 且無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 將首頁「集團事業群」六張卡片的主視覺由照片改為對應企業 Logo，保留企業名稱、連結與響應式卡片版型；新增置中 Logo 顯示規則並將卡片漸層收斂至底部文字區，更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check`，並以本機 Edge 驗證桌機／手機六張 Logo 引用、CSS v19、卡片結構與無水平溢位；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 移除首頁「集團事業群」卡片的視覺遮罩與左下角公司名稱，保留隱藏語意文字供輔助技術使用，並縮小區塊左右留白；修正羽球隊 Logo 引用並更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查；本次本機 Edge 驗證因測試伺服器未能在 5080 埠保持監聽而未完成，實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依參考圖為首頁「集團事業群」Logo 卡片加入淡灰漸層、柔和高光與陰影，避免 Logo 直接落在單調純色背景；更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋縮小首頁「集團事業群」卡片：改為置中的緊湊三欄等比例卡片，移除原照片拼貼式跨列高度，並同步縮小 Logo 與內容寬度；手機維持單欄比例，更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正首頁右下角 ALPHA TOTAL SOLUTION Logo 未完整顯示：同步校正圖片原始尺寸屬性，並對第六張卡片明確限制 Logo 寬度、高度與 `object-fit: contain`；更新首頁 CSS cache key。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查；桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 進一步修正 Alpha Logo 仍受舊滿版圖片規則影響的問題：加入專用 class 並強制取消絕對定位、滿版高度與裁切，改為依原比例完整置中顯示；更新首頁 CSS cache key 至 v24。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查；瀏覽器畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 撤回無法在目前頁面載入的 SVG 包裝方案，改回原始 Alpha JPG，並以專用 class 與最高優先權規則固定 180px 寬、自然高度及 `object-fit: contain`，更新首頁 CSS cache key 至 v26；已完成 `dotnet build -c Release`、`git diff --check`、Edge 實際計算樣式與 Logo 完整顯示檢查，實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 針對 Alpha Logo 持續被圖片元素裁切的問題，改由卡片背景以 `background-size: contain` 完整呈現 JPG，並隱藏原本可能受舊規則影響的 `<img>`；更新首頁 CSS cache key 至 v27。已完成 `dotnet build -c Release`、`git diff --check` 與 HTML／CSS 靜態檢查，瀏覽器畫面待重新整理確認，未 commit。
- [x] 確認並修正 Alpha Logo 重複顯示：移除第六張卡片原本的 `<img>`，改由單一具 `role="img"` 與 `aria-label` 的背景 Logo 呈現，避免背景與圖片重疊裁切；更新首頁 CSS cache key 至 v28。已完成 `dotnet build -c Release`、`git diff --check` 與 HTML／CSS 靜態檢查，瀏覽器畫面待重新整理確認，未 commit。
- [x] 將首頁「集團事業群」六張卡片統一加入 20px 圓角，並將卡片與 Logo 背景改為 `#2b3039` 深色漸層；Alpha JPG 使用 `darken` 混合以去除白底方框，更新首頁 CSS cache key 至 v29。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依最新回饋將首頁「集團事業群」卡片背景恢復為淺色漸層，保留 20px 圓角；Alpha Logo 同步移除深色混合效果，更新首頁 CSS cache key 至 v30。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將首頁「集團事業群」卡片圓角由 20px 微調為較自然的 14px，更新首頁 CSS cache key 至 v31；已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將首頁「集團事業群」桌機內容最大寬度由 1180px 縮至 1080px，使三欄卡片整體變窄；手機維持單欄寬度，更新首頁 CSS cache key 至 v32。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 為首頁「集團事業群」卡片加入 hover／鍵盤 focus Logo 放大效果：一般 Logo 放大 1.08 倍、Alpha Logo 背景同步放大，加入 320ms 緩動與 reduced-motion 規則，更新首頁 CSS cache key 至 v33。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際互動畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依視覺比例調整首頁第二張亞柏羽球隊 Logo：因原始素材內部留白較多，將顯示寬度補償為 250px，使實際標誌視覺尺寸與其他卡片一致；更新首頁 CSS cache key 至 v34。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 在首頁「集團事業群」下方新增「聯絡我們」區塊：參考提供的聯繫版型，加入標題、說明、聯絡頁 CTA、電話與 Email 可操作連結，並完成手機單欄響應式規則；更新首頁 CSS cache key 至 v35。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正聯繫區塊未顯示問題：移除其對首頁 IntersectionObserver reveal 狀態的依賴，讓標題、說明、CTA 與聯絡資訊直接呈現；更新首頁 CSS cache key 至 v36。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正首頁 flex section order 導致聯繫區塊被排到「關於亞太」之前的問題，將 `.home-contact` 指定為 `order: 6`，確保它位於「集團事業群」之後；更新首頁 CSS cache key 至 v37。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 將首頁聯繫區塊文字改用全域 tokens：統一套用全域 section heading、body copy、label、字重、行高與字距，移除區塊內自訂文字尺寸；更新首頁 CSS cache key 至 v38。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋移除聯繫區塊右側電話／Email 明細，只保留左側聯繫內容與 CTA；聯絡標題改為與「集團事業群」相同的全域字級、字型、字重、字距與行高，更新首頁 CSS cache key 至 v39。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正聯絡標題實際仍繼承 Noto Serif 的問題，明確指定 `font-family: var(--font-body)`，使其與「集團事業群」標題同為 Noto Sans TC；更新首頁 CSS cache key 至 v40。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，瀏覽器實際樣式比對完成，桌機／手機完整畫面、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 為首頁聯繫區塊加入 `public/images/contact/hero.jpg` 背景圖與 62% 深色遮罩，並將標題與說明調整為深色背景上的高對比文字；更新首頁 CSS cache key 至 v41。已完成 `dotnet build -c Release`、`git diff --check` 與圖片／CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將首頁聯繫區塊背景改為專案內實際存在的 `public/images/services/privacy-policy.jpg`，保留既有深色遮罩與高對比文字；更新首頁 CSS cache key 至 v43。已完成圖片路徑檢查、`dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，桌機／手機實際畫面、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 參考英業達首頁實際「聯絡我們」區塊調整版型：改為全寬背景圖／遮罩、左側標題與短句、右側白色膠囊 CTA，手機改為單欄；保留 `privacy-policy.jpg` 與全域標題字型，更新首頁 CSS cache key 至 v44。已完成瀏覽器參考頁觀察、`dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，本機頁面桌機／手機實際畫面、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 為首頁聯絡區塊加入桌機版 parallax 視差：背景圖使用 `background-attachment: fixed` 與固定視窗定位，手機版改回一般 scroll 以維持相容性；更新首頁 CSS cache key 至 v45。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，實際滾動體感、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 將聯絡區塊參考文案「讓我們攜手共創未來」改為原創亞太物流文案「與亞太攜手，打造更穩定的物流方案」，避免直接照抄參考網站文字；更新首頁 CSS cache key 至 v46。已完成 `dotnet build -c Release`、`git diff --check` 與 HTML 靜態檢查，瀏覽器、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 將 `.home-contact__button` 文字改為全域一般字重，hover／focus 時改為白色文字並切換品牌橘背景；更新首頁 CSS cache key 至 v47。已完成 `dotnet build -c Release`、`git diff --check` 與 CSS 靜態檢查，瀏覽器、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將聯絡區塊背景改為 `public/images/services/warehousing-yard.png`，保留視差、遮罩與 CTA 版型；更新首頁 CSS cache key 至 v48。已完成圖片路徑檢查、`dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，瀏覽器、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將聯絡區塊背景改為 `public/images/services/1.png`，保留視差、遮罩與 CTA 版型；更新首頁 CSS cache key 至 v49。已完成圖片路徑檢查、`dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，瀏覽器、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋將聯絡區塊背景改為 `public/images/services/container-yard-overview-1.png`，保留視差、遮罩與 CTA 版型；更新首頁 CSS cache key 至 v50。已完成圖片路徑檢查、`dotnet build -c Release`、`git diff --check` 與 CSS／HTML 靜態檢查，瀏覽器、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 重新整理首頁 `index.html` 閱讀順序，將聯絡區塊從「關於亞太」之前移至所有主要內容之後，避免原始程式碼順序與閱讀理解混亂；更新首頁 CSS cache key 至 v51。已完成 `dotnet build -c Release`、`git diff --check` 與 HTML 靜態檢查，桌機／手機、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 進一步將首頁 `index.html` 的區塊順序整理為英雄主視覺 → 最新消息 → 關於亞太 → 我們的服務 → 集團事業群 → 聯絡我們，並以最後 CSS 規則取消既有 flex `order` 覆寫，讓 DOM 閱讀順序與畫面順序一致；更新首頁 CSS cache key 至 v52。已完成 `dotnet build -c Release`、`git diff --check` 與區塊順序靜態檢查；桌機／手機、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 依實際畫面排序再調整首頁 `index.html`，將「最新消息」移至「關於亞太」與「我們的服務」之後、集團事業群之前，使完整閱讀順序為英雄主視覺 → 關於亞太 → 我們的服務 → 最新消息 → 集團事業群 → 聯絡我們；更新首頁 CSS cache key 至 v53。已完成 `git diff --check` 與區塊順序靜態檢查，建置結果待本次修改後重新執行；桌機／手機、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 將首頁「聯絡我們」區塊背景改為 `public/images/news/news-hero-port-transport.png`，保留既有視差、遮罩與 CTA 版型；更新首頁 CSS cache key 至 v54。已完成圖片路徑檢查、`dotnet build -c Release`、`git diff --check`；桌機／手機、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。
- [x] 調整首頁手機版版型：縮短「關於亞太」標題與敘述間距、將服務卡片容器置中並維持適當寬度、集團事業群改為兩欄排列、聯絡我們內容與按鈕置中；更新首頁 CSS cache key 至 v55。已完成 `dotnet build -c Release`、`git diff --check`；實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正手機版「關於亞太」標題與敘述仍過遠的實際來源：將標題容器的 `margin-bottom` 從全域 40px 覆寫為 12px，並更新首頁 CSS cache key 至 v56；已完成 `dotnet build -c Release`、`git diff --check`，實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 調整首頁手機版服務卡片，讓標題與敘述直接顯示，不再依賴 hover／focus 展開；保留桌機版互動效果並更新首頁 CSS cache key 至 v57。已完成 `dotnet build -c Release`、`git diff --check`；實體手機、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 強化首頁「最新消息」區塊進場效果：為整個最新消息內容容器加入向上 reveal 與 100ms 延遲，讓標題、資料列與操作按鈕同步進場；保留既有標題與列表動畫並更新首頁 CSS cache key 至 v58。已完成 `dotnet build -c Release`、`git diff --check`；桌機／手機實際動態體感、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 將最新消息區塊的進場方向統一為由左側進場：整個內容容器使用 `data-home-reveal="left"`，移除標題與列表各自不同方向的 reveal；更新首頁 CSS cache key 至 v59。已完成 `dotnet build -c Release`、`git diff --check`；桌機／手機實際動態體感、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 將最新消息資料列改為依序從左側進場：新增 5 列 stagger 動畫與 120ms 間隔，保留 reduced-motion 時的靜態顯示；更新首頁 CSS cache key 至 v60。已完成 `dotnet build -c Release`、`git diff --check`；桌機／手機實際動態體感、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正首頁「關於亞太」尚未進入視窗前先顯示左右隱藏狀態的問題：改為未進場前維持可見，僅在 IntersectionObserver 判定進入視窗後播放一次左右進場動畫；更新首頁 CSS cache key 至 v61。已完成 `dotnet build -c Release`、`git diff --check`；桌機／手機實際動態體感、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 移除「關於亞太」內文與圖片的 reveal 觸發，避免內容已可見後再次套用動畫造成區塊跳動；保留區塊靜態穩定呈現並更新首頁 CSS cache key 至 v62。已完成 `dotnet build -c Release`、`git diff --check`；桌機／手機、實體裝置、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 放大首頁行動裝置「我們的服務」卡片：內容容器左右留白縮小至 8px、卡片最大寬度提高至 380px，並將比例調整為更高的 `.76`；更新首頁 CSS cache key 至 v63。已完成 `dotnet build -c Release`、`git diff --check`；實體手機、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 修正服務卡片寬度未生效的 cascade 問題：補上手機版 grid `max-width: 380px !important`，避免後方既有 `360px` 規則覆蓋；更新首頁 CSS cache key 至 v64。已完成 `dotnet build -c Release`、`git diff --check`；實體手機、其他瀏覽器及完整人工無障礙驗收尚未執行，未 commit。
- [x] 首頁前端程式碼盤點與清理：移除已不再使用的首頁 flex `order` 重排、舊 `left-right` 最新消息 reveal 規則，並將集團事業群卡片 HTML 改為可讀的多行結構；保留仍被首頁使用的樣式與互動，更新 CSS cache key 至 v65。已完成 `dotnet build -c Release`、`git diff --check` 與首頁 selector／資產靜態檢查；完整瀏覽器 RWD、實體裝置、其他瀏覽器及人工無障礙驗收尚未執行，未 commit。

## 2026-10-16
- [x] 依台泥 OUR CORE VALUES 實際 hover 行為重做首頁服務卡片過渡：桌機由原本無法插值、會瞬間跳寬的 CSS Grid 欄寬切換，改為台泥同型的 Flex 收合；使用 400ms `cubic-bezier(.45, 0, .55, 1)`，非作用卡收至 100px，展開內容延遲 400ms 再以 400ms 淡入。1432px 瀏覽器逐幀量測為 80ms 約 352／322／322px、200ms 約 544／226／226px、400ms 完成 796／100／100px；鍵盤焦點優先、無水平溢位。手機 390px 維持 350px 單欄卡片並無水平溢位。已完成參考頁與本站實際畫面驗證、`dotnet build -c Release` 與 `git diff --check`；實體裝置、其他瀏覽器與完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋重新平衡首頁服務卡片 hover 節奏：卡片橫向展開放慢至 820ms；展開說明改為延遲 240ms、以 360ms 淡入，讓卡片慢慢撐開但敘述較早出現；同步更新首頁 CSS cache key。已完成 `dotnet build -c Release` 與 `git diff --check`；瀏覽器重新載入畫面尚待使用者確認，實體裝置、其他瀏覽器與完整人工無障礙驗收尚未執行，未 commit。
- [x] 依回饋強化首頁服務卡片 hover 過渡可見度：桌機卡片展開／收合改為 560ms 緩動，側邊直排標題與展開說明同步延後淡入，避免與原本 400ms 效果視覺上無差異；更新首頁 CSS cache key。已完成桌機／手機本機瀏覽器確認、`dotnet build -c Release` 與 `git diff --check`；實體裝置、其他瀏覽器與完整人工無障礙驗收尚未執行，未 commit。
- [x] 首頁「我們的服務」桌機卡片 hover／鍵盤 focus 改為仿台泥 OUR CORE VALUES 的橫向展開：1432px 視窗下三卡原為各約 332px，展開時為約 816／90／90px；過渡改為 400ms 對稱緩動，收合卡標題淡入、展開說明延後顯示，並保留鍵盤焦點優先與減少動態偏好。已以本機瀏覽器確認桌機展開畫面、CSS 載入與無水平溢位；手機 390px 維持 350px 單欄卡片並確認畫面、無水平溢位。已完成 `dotnet build -c Release` 與 `git diff --check`；實體裝置、其他瀏覽器與完整人工無障礙驗收尚未執行，未 commit。
- [x] 依使用者回饋將首頁「我們的服務」桌機卡片略放大：1432px 視窗下可見圖片由約 300×374px 增至 319×398px，圖片間距約 61px；手機 390px 維持 350px 單欄卡片、24px 列距。已以本機瀏覽器重新確認桌機／手機畫面、三張圖片載入及無水平溢位，並完成 `dotnet build -c Release`、`git diff --check`；實體裝置、跨瀏覽器與人工無障礙尚未驗證，未 commit。
- [x] 依 Inventec「Inspiring Solutions of Tomorrow」實際桌機截圖量測，調整首頁「我們的服務」卡片尺寸與間距。在同為 1432px 視窗下，修改前 AP 卡片外框約 397×509px、間距 29px；修改後可見圖片約 300×374px、間距 60px，接近參考圖約 300×377px、間距 58px。手機 390px 為單欄、350px 卡片外框、24px 列距；原有圖片、文字、連結與 hover／focus 互動未改。已完成參考頁及 AP 修改前後桌機截圖、修改後桌機與手機畫面、三張圖片載入及無水平溢位驗證、`dotnet build -c Release` 與 `git diff --check`；實體裝置、跨瀏覽器與人工無障礙尚未驗證，未 commit。
- [x] 修正首頁 `home.js` 動態新聞建卡流程遺漏日期的問題：每筆 API 新聞現在以 `<time class="home-latest__date">` 輸出日期，並更新 JavaScript cache key；保留窄版日期／標題清單樣式。已完成 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`、`git diff --check`，並以重啟後的 Edge 桌機 1432px／手機 390px 實際確認日期文字顯示與無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證，未 commit。
- [x] 參考 Qisda 首頁最新消息的中央內容軌道，將首頁清單最大寬度調整為 1420px、手機維持 16px 內縮；清單保留日期／標題／右側箭頭三欄與水平分隔線，縮小日期與標題欄距，隱藏分類，標題置中並移除第一列上方線條，保留底部「更多資訊」。同步更新首頁 CSS cache key。已完成 `dotnet build -c Release` 與 `git diff --check`；瀏覽器畫面、實體裝置、跨瀏覽器與人工無障礙尚未驗證，未 commit。
- [x] 修正首頁集團事業群圖片在內容阻擋器環境出現 `ERR_BLOCKED_BY_CLIENT`：確認共同的 `public/images/affiliates/` 路徑遭 Edge 客戶端過濾後，將整組關係企業素材改至 `public/images/group-businesses/`，並同步更新首頁、About 與關係企業頁的所有引用。已完成 `dotnet build -c Release --no-restore`、`git diff --check`、Edge 首頁 1440×900／390×844 實際載入驗證，原失敗的 5 張圖片皆取得正確原始尺寸且頁面無水平溢位；關係企業完整頁、實體裝置、其他瀏覽器與人工無障礙驗收尚未執行，未 commit。
- [x] 將首頁最新消息區塊移至「關於亞太」上方，改為滿版淺灰背景、左側標題、右側新聞卡片與右上圓形輪播控制；保留既有新聞 API、輪播互動與手機單卡排列。已完成 `dotnet build -c Release`、全頁 JavaScript 語法檢查與 `git diff --check`；尚未進行桌機／手機瀏覽器畫面驗證、實體裝置、跨瀏覽器與人工無障礙驗收，未 commit。
- [x] 依 APLI 現有 UI／UX 風格修正首頁最新消息視覺：移除參考圖的藍色頂條與幾何裝飾，恢復品牌橘、淺灰背景、既有圖片卡片、圓角與陰影；同步修正首頁 section order，確保最新消息實際位於關於亞太上方。已完成 `git diff --check`；尚未重新進行瀏覽器畫面驗證、實體裝置、跨瀏覽器與人工無障礙驗收，未 commit。
- [x] 依使用者要求恢復首頁最新消息的參考圖版型：保留最新消息位於關於亞太上方，恢復淺灰背景、藍色頂部裝飾、白色卡片內容與右上圓形輪播控制；已完成 `git diff --check`，尚未重新進行瀏覽器畫面驗證、實體裝置、跨瀏覽器與人工無障礙驗收，未 commit。
- [x] 依最新參考圖校正首頁最新消息幾何：加入深藍頂線、上方留白、標題／卡片垂直配置與向右延伸的新聞輪播軌道，並保留手機單欄；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證、實體裝置、跨瀏覽器與人工無障礙驗收，未 commit。
- [x] 依最新提供畫面修正首頁最新消息版型：標題移至卡片上方的共用內容軌道，恢復公告主視覺圖片、三欄大型卡片、橘色分類資訊與上方右側輪播控制；移除左欄標題與藍色頂條效果，保留手機單欄。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證、實體裝置、跨瀏覽器與人工無障礙驗收，未 commit。
- [x] 依最新指定畫面恢復首頁最新消息的左標題／右側藍色頂部新聞卡片版型；保留最新消息位於關於亞太上方與手機單欄。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證、實體裝置、跨瀏覽器與人工無障礙驗收，未 commit。

## 2026-09-29
- [x] 盤點 HTML、CSS、JavaScript 與 C# 的引用關係，移除已確認無 HTML／JS／C# 消費者的舊 CSS：首頁服務箭頭／舊介紹容器、Footer 標題連結、關係企業三組舊 selector；保留 Company History 仍可能支援目前動態時間軸的共用規則。已完成 Release build、全頁 JavaScript 語法檢查與引用盤點，未 commit。
- [x] 移除首頁「最新消息」背景色與左右延伸背景，改由「我們的服務」區塊使用淺灰 `--color-surface-section` 背景；已更新 CSS cache，完成 Release build 與本機 Edge 桌機計算樣式確認，手機沿用相同 CSS 規則，未 commit。
- [x] 依需求將首頁區塊順序恢復為「關於亞太 → 我們的服務 → 最新消息 → 關係企業」，保留 Hero 與最新消息左右延伸背景設定；已完成 HTML 結構調整，未 commit。
- [x] 將首頁「最新消息」淺灰背景延伸至整個視窗寬度，補足左右兩側背景色；內容容器與卡片位置維持不變，已更新 CSS cache，完成 Release build 與本機 Edge 桌機計算樣式確認，手機沿用相同 CSS 規則，未 commit。
- [x] 移除首頁「我們的服務」區塊背景色，改由「最新消息」區塊使用淺灰 `--color-surface-section` 背景；已更新 CSS cache，完成 Release build 與本機 Edge 桌機計算樣式確認，手機沿用相同 CSS 規則，未 commit。
- [x] 首頁主要區塊順序調整為「我們的服務 → 最新消息 → 關於亞太」，Hero 與關係企業維持原位置；已完成 HTML 結構調整、Release build 與本機 Edge 桌機 DOM 順序確認，手機沿用相同 HTML 順序，未 commit。
- [x] 首頁「我們的服務」區塊加入淺灰背景，使用共用 `--color-surface-section` token；已更新 CSS cache，完成 Release build、桌機瀏覽器計算樣式與手機媒體規則確認，未 commit。
- [x] 首頁最新消息桌機版左右切換按鈕移至標題列右上方、與標題對齊並內縮至主要內容右邊界，手機維持卡片兩側控制。已通過 Release build，並以本機 Edge 確認桌機按鈕位置與標題頂部對齊；手機版 CSS 規則已靜態確認，尚未完成手機瀏覽器實際畫面驗證。`git diff --check` 仍有既有的 `wwwroot/js/site.js` trailing whitespace，非本次修改造成。未 commit。
- [x] 首頁最新消息輪播比照 About 認證與獎項區塊，桌機卡片輪播向右延伸至視窗邊線並預設顯示 4 筆，標題與更多資訊維持原內容軌道，平板 2 筆、手機 1 筆。已通過 Release build、home.js 語法檢查與 git diff --check，並以本機 Edge 確認桌機輪播右側延伸、4 張卡片可視、原起點、標題／更多資訊位置與無整頁水平捲軸；手機版 CSS 單卡規則已靜態確認，尚未完成手機瀏覽器實際畫面驗證。未 commit。
- [x] 首頁服務項目保留長榮風格卡片：圖片置頂、白色資訊區、細邊框與圓角，移除 Discover now；服務標題恢復首頁原本的置中、無底線樣式，並移除服務項目與最新消息之間的分隔線。已通過 Release build、home.js 語法檢查與 git diff --check，並以本機 Edge 確認桌機標題、卡片結構、圖片／內容比例、三個連結、無 CTA 與連續區塊表面；手機版 CSS 單欄規則已靜態確認，尚未完成手機瀏覽器實際畫面驗證。未 commit。
- [x] 首頁服務項目依參考圖改為上方圖片、下方白色內容面板、標題／描述／分隔線與 Discover now 箭頭；保留原本三個服務連結與鍵盤 focus。已通過 Release build、home.js 語法檢查與 git diff --check，並以本機 Edge 確認桌機卡片結構、圖片比例、白色內容面板、CTA 與原有服務連結；手機版 CSS 單欄規則已靜態確認，尚未完成手機瀏覽器實際畫面驗證。未 commit。
- [x] 首頁最新消息區塊依參考圖調整為左對齊標題、圖片改為較低的 4:3 比例並強化圖片下方標題與日期的視覺重點；保留既有輪播切換按鈕，並將更多資訊按鈕恢復至輪播下方置中位置。已通過 Release build、git diff --check，並以本機 Edge 確認桌機畫面與 DOM 版面；手機版 CSS 響應式規則已靜態確認，尚未完成手機瀏覽器實際畫面驗證。未 commit。
- [x] About「相關資訊」標題改為「探索更多」，三張導覽卡片改為左側標題、右側圖片在上與文字在下的參考版型，移除圖片遮罩與箭頭覆蓋，保留既有連結、圖片資產與手機單欄排列；hover 強化為卡片上移、圖片以獨立偽元素放大與標題品牌橘色，避免 `background-size` 造成圖片接縫，並保留鍵盤 focus 與減少動態偏好；已以本機 Edge 確認桌機畫面，手機版完成響應式 CSS 靜態確認。未 commit。
- [x] About「認證與獎項」每個年份的 `.about-certifications-preview__events` 整個資訊區塊改為白色背景、18px 圓角與柔和陰影，事件文字維持區塊內排列，保留原本時間軸、年份與手機橫向瀏覽結構；已完成靜態檢查，瀏覽器畫面尚待確認。未 commit。
- [x] About「經營理念」區塊改為淺灰背景，三張理念卡片改為白底、無邊線、18px 圓角與柔和陰影，內容置中並保留 `about-philosophy-editorial__card--vision` 結構；同步更新 About CSS cache key。已以本機 Edge 實際確認桌機畫面；手機 CSS 單欄規則已靜態確認，手機瀏覽器畫面尚未完成驗證。未 commit。
- [x] 強化新聞安全輸入與附件上傳：新增新聞時伺服器忽略前端偽造的 `Url`／`ImageUrl`，編輯時只沿用伺服器既有的內部上傳路徑；上傳檔案先寫入暫存檔、完成格式簽章檢查後交由 Windows Defender `MpCmdRun.exe` 掃描，掃描發現威脅或掃描服務不可用時不公開檔案。已完成 `dotnet build -c Release`、JavaScript 語法、`git diff --check`、實際 Defender 乾淨檔案掃描、正常上傳端對端驗證、掃描器逾時回傳 503、未寫入資料與暫存檔清理驗證，以及 `dotnet run` 啟動、公開 API、未登入拒絕與無 Id 新增新聞產生唯一 Id 驗證；尚未完成惡意樣本、IIS、實體裝置與瀏覽器原生檔案選擇器驗證。測試留下未發布的安全測試新聞與圖片記錄（依需求不還原）；保留既有未提交的首頁圖片變更，未 commit。

## 2026-09-28
- [x] 參考 BenQ Materials ESG 經營理念頁，將 About「經營理念」由三張背景圖 hover 卡片改為桌機單列三欄資訊版型：每欄依序呈現線性圖示、中文標題、精簡英文標題與常態可讀說明，欄間以細直線區隔；重新收斂字級、字重、字距與行高，840px 以下改為單欄分隔排列。保留 APLI 原文案、品牌橘、既有進場動畫與語意結構。已以 ASP.NET 實際路由驗證 Edge 1440px 為同列三欄、390px 為單欄分隔排列，內容完整可讀且未見水平溢位；實體裝置、其他瀏覽器與完整人工無障礙驗收尚未執行。
- [x] 將 About「認證與獎項」整個 `.about-certifications-preview` 區塊背景改為 `#f6f6f6`，移除原區塊背景圖，內層 `.about-certifications-preview__events` 維持透明；事件文字與圓點使用深色以維持對比，並更新 About CSS cache key。完成 Release build、JavaScript 語法與 `git diff --check`；以 ASP.NET 實際路由驗證 Edge 1440px／390px，動態 class 為 `about-certifications-preview about-scroll-reveal is-visible`，整段淺灰背景、文字與時間軸均正常；實體裝置、其他瀏覽器與完整人工無障礙驗收尚未執行。
- [x] 將共用 Footer 背景改為 `#3b3b3b`，標題、公司資訊、導覽連結、隱私權與版權文字改為淺色；保留橘色 Logo，並使用較亮的 Footer 互動橘與 2px focus 外框維持深色背景上的辨識度。色彩限定在 `.site-footer`，未影響其他引用 Footer token 的頁面區塊；同步更新 14 個公開頁面的 Footer CSS cache key。完成 `dotnet build -c Release`、`git diff --check`，並以 ASP.NET 實際路由驗證 Edge 1440px 首頁／About 與 390px About：背景、文字、分隔線、cache key、手機 accordion／ARIA、鍵盤 focus 及 Footer 無水平溢位皆正常；實體裝置、其他瀏覽器與完整人工無障礙驗收尚未執行。

## 2026-09-26
- [x] 將 company-history 年份與資訊之間的中性灰分隔線恢復為原本 1px 粗細；年份文字與事件分隔線維持不變。完成 `git diff --check`。
- [x] 恢復 company-history 年份標題與資訊之間的分隔線，改用 2px 中性灰線；年份文字維持品牌橘，事件之間仍使用較淡的 1px 灰線。完成 `git diff --check`，並以靜態服務確認線條顏色、層級與無水平溢位。
- [x] 移除 company-history 年份標題與資訊之間的淡橘分隔線，將 `milestone-vertical__heading` 年份文字改為品牌橘色；事件之間的淺灰分隔線維持不變。完成 `git diff --check`，並以靜態服務確認桌機／手機標題顏色、分隔線與無水平溢位。
- [x] 區分 company-history 年份與資訊、資訊與資訊的分隔線層級：年份標題下方改為 2px 淡橘實線，事件之間維持 1px 淺灰實線。完成 `git diff --check`，並以靜態服務確認桌機／手機線條層級與無水平溢位。
- [x] 再將 company-history 桌機年份導覽向右移，桌機內縮提高至響應式 56–80px；右側資訊欄與手機版維持不變。完成 `git diff --check`，並以靜態服務確認 1440px 年份位置、390px 手機原位及無水平溢位。
- [x] 將 company-history 桌機左側年份導覽向內移，僅增加年份欄自身左側內縮，右側資訊欄與手機版位置維持不變；完成 `git diff --check`，並以靜態服務確認桌機年份位置、手機維持原位及無水平溢位。
- [x] 依參考畫面重新校正 company-history 主要間距：恢復沿革內容區最大寬度與中央留白，並將左側年份欄與右側資訊欄調整為中等欄距；事件背景維持透明。完成 `git diff --check`，並以靜態服務確認桌機／手機邊界與無水平溢位。
- [x] 收窄 company-history 整個沿革內容區塊的桌機左右 padding，讓年份欄與資訊欄整體靠近視窗兩側；手機維持原本內容 gutter。完成 `git diff --check`，並以靜態服務確認桌機／手機左右邊界與無水平溢位。
- [x] 再次收窄 company-history 桌機年份欄與資訊欄距離至較緊湊的欄寬／欄距，移除 `milestone-vertical__event` 背景色與左右內縮；完成 `git diff --check`，並以靜態服務確認桌機／手機無水平溢位與事件背景已移除。
- [x] 收窄 company-history 桌機左側年份欄與右側資訊欄的總間距，並為每筆 `milestone-vertical__event` 加入低對比淺色背景與內縮，維持輕量而非卡片式的視覺；完成 `git diff --check`，並以靜態服務確認桌機／手機無水平溢位與事件背景。
- [x] 重新調整 company-history 桌機與手機間距：增加內容區上下呼吸距離、左右欄距、年份導覽行距、年份標題與第一筆事件的間距，並保留手機獨立的緊湊值；完成 `git diff --check`，並以靜態服務確認桌機／手機無水平溢位與最終間距值。
- [x] 將 company-history 年份 active 圓點移至年份文字前方，並重新設計右側年份標題為 APLI 自有的橘色短線＋底部分隔線樣式，移除參考網站式整條標題底色；完成 `git diff --check`，並以靜態服務重新確認 1440px／390px 桌機與手機瀏覽器、年份圓點位置與無水平溢位。
- [x] 移除 company-history 沿革區塊的背景圖片，改為純色背景並收斂年份標題與事件文字層級，降低背景噪音與過重字重；完成 `git diff --check`，桌機／手機瀏覽器畫面已以靜態服務確認，ASP.NET 乾淨路由／Footer SSR、實體裝置、跨瀏覽器及無障礙人工驗收尚待完成。
- [x] 將 company-history 沿革內容改為參考遠東新世紀的大事記左右搭配模式：桌機使用左側年份導覽與右側分年度內容，手機改為可橫向瀏覽的年份導覽並維持單欄內容；保留原有沿革資料、鍵盤操作、無 JavaScript fallback 與減少動態偏好。完成 Release build、`node --check wwwroot/js/pages/company-history.js`、`git diff --check`，並以靜態服務完成 1440px／390px 瀏覽器畫面、無水平溢位與 2000 年導覽互動確認；ASP.NET 乾淨路由／Footer SSR、實體裝置、跨瀏覽器及無障礙人工驗收尚待完成。

## 2026-09-25
- [x] 恢復 index 最新消息區塊至 BenQ 參考版調整前的版本：保留原 3 張桌機卡片、日期／類別／標題排列、控制鈕與「更多資訊」文案；同步確認 SSR、首頁 CSS／JS 未保留本次參考版變更。完成 `dotnet build -c Release`、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`；桌機／手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收尚未驗證。

## 2026-09-24
- [x] 將所有含 Hero 的非首頁頁面麵包屑移入 Hero，置於頁面標題上方；隱私權政策因無 Hero 維持原本 breadcrumb 位置。已更新共用 Hero CSS 與 cache key，完成 `git diff --check`；桌機／手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收尚未驗證。
- [x] 修正 Hero 內麵包屑被舊共用規則覆蓋的問題：恢復白色文字、移除底線，並強制與 Hero 標題共用左側對齊；已同步更新所有頁面的共用 CSS cache key，完成桌機／手機 DOM 幾何確認，實體裝置、跨瀏覽器及無障礙人工驗收尚未驗證。
- [x] 調整 news 消息列表整體比例：內容最大寬度放寬至 1120px、日期／類別／標題欄位重新收斂，metadata 字級提高、標題改為較輕字重，列高與內距重新平衡；Hero 與手機列表結構維持不變，已更新 news CSS cache key，並完成 desktop 1432px／mobile 390px live page 驗證；實體裝置、跨瀏覽器及無障礙人工驗收尚未驗證。
- [x] 移除新聞詳細頁 Hero 標題下方重複的動態消息標題，保留 Hero 的「最新消息」與內容區正式文章標題；同步清理 JS／CSS 與更新 cache key，並完成 live page 動態資料確認；實體裝置、跨瀏覽器及無障礙人工驗收尚未驗證。
- [x] 將 index「我們的服務」hover 效果收斂為僅圖片放大，鎖定文字、卡片、箭頭與文字區塊不位移、不變色、不變背景；已更新 CSS cache，完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 移除 index「我們的服務」卡片在 hover／focus 時的箭頭 icon 顯示，保留圖片微放大效果；已更新 CSS cache，完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 為 index「我們的服務」圖片加入輕微全域 `--radius-sm` 圓角，文字區維持透明直角，保留編輯型列表而不回到卡片式設計；已更新 CSS cache，完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 修正 index 服務列表 hover：移除舊規則殘留的卡片陰影與 `translateY` 位移，hover／focus 時卡片與文字區維持透明且不影響下方區塊位置；已更新 CSS cache，完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 微調 index 服務列表：文字區塊維持透明背景，箭頭預設隱藏、hover／focus 才顯示；`home-services-compare__details` 改用全域 `--font-size-card-description` 與 `--line-height-card-description`，提升閱讀性；已更新 CSS cache，完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 重新設計 index「我們的服務」區塊，移除與最新消息相似的卡片感、圓角陰影與圓形箭頭，改為圖片加文字的編輯型服務列表；已更新 CSS cache，完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 重整 index「我們的服務」卡片視覺：改為上方圖片、下方白底資訊的乾淨版型，服務描述預設顯示，取消整面圖片遮罩，箭頭改為主題橘圓形導引；已更新 CSS cache，完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 調整 index「我們的服務」卡片遮罩：移除整面深色 `::after` 覆蓋，改為只在圖片下方保留柔和漸層，降低畫面髒感並維持文字辨識度；已完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 清理 index 舊的首頁 spacing alias：移除 `--home-section-space`、`--home-section-space-sm`、`--home-section-padding` 與 `--home-heading-content-gap`，所有區塊間距直接使用全域 spacing token；已完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 統一 index 首頁主要區塊的全域間距與部分元件 token：關於亞太、服務、最新消息、關係企業改引用全域 section spacing，Hero CTA 與 Footer 顏色改引用共用 token；已完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 重整 news 手機版列表結構，每筆新聞以同一個內容容器呈現，上方為日期與公告類別，下方為標題；已更新 HTML/CSS/JS cache，尚未進行瀏覽器畫面驗證。
- [x] 調整 news 手機版日期、公告類別與標題為約 18px，並將新聞列分隔線加粗至 2px；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 停用 news 手機觸控裝置的 hover 標題變色與箭頭效果，避免點擊後 hover 狀態殘留；桌機 hover 保留，已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [ ] Unified careers page typography, page and section spacing, colors, and benefits list sizing with global design tokens; removed unused legacy benefits-table styles. Static verification pending; desktop/mobile browser verification not run.
- [x] 將人才招募頁 `join-intro` 改為上方置中小標題、下方置中敘述的上下堆疊版型，參考 BenQ Materials 人才頁的比例；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 依參考頁 DevTools 比例收斂人才招募 `join-intro` 至約 750px 內容寬度與 60px 上下內距，並縮小介紹標題；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 將人才招募頁 `join-content` 上方距離改用全域 `--section-space`，縮短 Hero 與 `join-intro` 的空白；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 合併人才招募 `join-intro-copy` 的兩段 `<p>` 為單一內容段落，避免不必要的段落切分與間距；尚未進行瀏覽器畫面驗證。
- [x] 將公司福利標題縮小至與 `join-intro` 一致的介紹標題尺寸，並將福利圖示改為主題橘；福利列表保留較寬資料版面，避免內容過度換行；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 修正公司福利標題被通用 `.join-section-heading h2` 覆蓋的 selector 優先權，確保約 30px 標題尺寸實際生效；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 將 `join-recruitment` 按鈕尺寸、間距、圓角與 hover 配色行為改用全域按鈕 token，保留招募區塊的白色按鈕基礎配色；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 將 careers 各區塊剩餘的固定間距改用全域 spacing／button token，包含 `join-intro`、福利列、福利列表手機內距與招募按鈕群組；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 將 affiliates 的 `affiliate-club-cta-link` 與 `affiliate-taronews-cta` 改為使用全域 `.button--text-arrow` 樣式，移除頁面專用的文字、底線、padding 與 hover 覆蓋；保留外部連結 icon 線條與位移效果，已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 將 affiliates 兩個外部 CTA 改為全域 `.button--primary`，並重用 index 關於亞太 CTA 的雙箭頭滑入 hover 動畫；外部連結保留 `target="_blank"`、`rel="noopener noreferrer"` 與開啟新分頁提示，已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 將 affiliates 兩個外部 CTA 的箭頭改為明確外部連結／開新分頁 icon，保留 hover 動畫與安全屬性；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 統一 contact 頁面的欄位間距、響應式區塊間距、聯絡資訊列表間距、標籤字級與顏色至全域 token，並移除多餘 Breadcrumb 字級覆寫；已更新 CSS cache，尚未進行瀏覽器畫面驗證。
- [x] 恢復新聞詳細頁原本的 Hero 圖片 `public/images/new/news-detail-hero.jpg`。
- [x] 將新聞詳細頁 Hero 圖片改為 `public/images/about/hero1.png`，列表頁 Hero 不變。
- [x] 移除 news 頁面重複的 `news-room-heading site-container` 標題區塊及專用 CSS，保留 Hero 的「最新消息」標題、分類 Tab 與列表。
- [x] 將 news 列表頁區塊標題由「新聞室」改為「最新消息」。
- [x] 將共用 Footer 的「營運資源」連結移至「關於亞太」選單底下，快速連結保留人才招募、員工專區與聯絡我們。
- [x] 在共用 Footer 的快速連結選單加入 `/Admin` 員工專區連結；待瀏覽器確認桌機與手機 Footer 展開狀態。
- [x] 移除 news-detail 的其他消息區塊與相關載入流程，避免詳情頁再次顯示相關新聞；已更新 JS cache。
- [x] 移除 news-detail 相關消息區塊多餘的 `news-page` class，避免套用新聞列表頁專屬樣式。
- [x] 更新 news JavaScript cache，確保新聞列 hover 箭頭 DOM 與 About 同款滑入動畫載入最新版本。
- [x] news 分類 Tab 維持原文字色並以橘色底線表示選取；新聞列 hover 移除灰底、標題改橘色並加入參考 About 的箭頭滑入動畫。
- [x] 將 news-card__title 桌機與手機文字大小統一為 1.15rem，並更新 CSS cache。
- [x] 移除 news-filter__year 年份篩選的 HTML、CSS 與 JavaScript，新聞列表改為只使用分類篩選；已更新 CSS cache，待瀏覽器確認。
- [x] 修正 news 列表因附件標記被 Grid 排入額外項目而造成的列高差異，統一每列上下間距；已更新 CSS cache，待瀏覽器確認。
- [x] 將 news 列表拆成「日期／類別／標題」三欄，手機版改為日期與類別同列、標題下一列；已更新 CSS cache，待瀏覽器確認。
- [x] 縮小 news 列表每筆資料的上下留白與手機版日期／標題間距，降低列表過寬的視覺感；已更新 CSS cache，待瀏覽器重新確認桌機與手機畫面。
- [x] 將職業安全衛生專業證照卡片的桌機寬度收斂至最多 380px，保留平板雙欄與手機滑動卡片設定，降低卡片空白並集中閱讀焦點。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 修正職業安全衛生「專業證照」說明文字 selector，改為命中 `.safety-credentials__heading-copy` 內的段落，使全域文字顏色、字級、粗細與行高實際生效；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 依全域一致性檢查調整 `occupational-safety`：移除未使用頁面 token，標題／內文改用全域字級與行高，標題內容與主要區塊間距改用全域間距 token；保留卡片與輪播專用布局。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將職業安全衛生頁 `safety-intro-title` 的標題字體改為首頁 Hero 使用的全域特殊標題字體 `var(--font-heading)`；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將 `.operational-resources-page .resource-link` 前後段文字顏色統一為全域 `var(--color-text-primary)`（`#151515`），並完成標題／內文間距、區塊間距與表格尺寸 token 化；已完成 `git diff --check`，尚未進行全站瀏覽器畫面驗證，尚未 commit。
- [x] 以營運資源頁面的色彩層級建立全域 token：標題、內文、輔助文字、柔和背景、深色表面與邊框；同步將營運資源頁固定色值改為共用 token，其他使用共用 token 的頁面會跟進。已完成 `git diff --check`，尚未進行全站瀏覽器畫面驗證，尚未 commit。
- [x] 將 `resources-quick-nav` 文字大小改為與 `resource-intro resource-animate` 一致的全域 `--font-size-body-lg`，桌機與手機同步；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 調整 quick nav 定位狀態：`aria-current="location"` 文字維持內文色，只顯示橘色底線；滑入與鍵盤 focus 變色效果保留。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 調整 `resources-quick-nav`：文字改用下方內容區塊的內文色、全域內文字級與行高，桌機高度由 72px 縮為 56px、手機由 56px 縮為 48px，並同步更新 anchor offset；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 依需求恢復職業安全衛生區塊原本的 reverse 排列，圖片回左、文字回右；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將職業安全衛生區塊改為文字在左、圖片在右的標準版型，移除該區塊的 reverse 排列；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將職業安全衛生「了解更多」按鈕改為與首頁「關於亞太」CTA 相同的尺寸、邊框、顏色、focus 狀態與滑入箭頭切換效果；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將 `.resources-location__node strong` 距離數字改為全域主題橘 `var(--color-primary)`；其餘節點文字與版面維持不變。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將地理優勢網絡節點內的距離數字與說明文字顏色，分別統一為上方區塊的標題色與內文色；Logo、背景與連線維持不變。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將地理優勢區塊的標題與說明文字調整為參考上方資料區塊的全域字級、粗細、顏色與 20px 標題內容間距；保留距離節點的資訊層級。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將機具配置與職業安全衛生區塊的背景調整為比原本 `--color-surface-soft` 更淺的頁面專屬混合色，維持全域色彩 token 基礎；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將職業安全衛生區塊的標題與敘述調整為與上方資料區塊一致的全域字級、粗細、行高與文字顏色；地理優勢未修改。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 檢查並統一職業安全衛生與地理優勢區塊的上下間距，桌機與手機皆改用全域 `--section-space-sm`，與前三個資料區塊一致；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 統一 `operational-resources` 前三個資料區塊的上下間距，改用全域 `--section-space-sm`，使廠區資訊、機具配置與作業量能保持一致；職業安全衛生與地理優勢維持不變。已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將 `operational-resources` 前三個資料區塊的標題、敘述與表格文字尺寸改為使用全域 typography token，移除固定 `px` 字級與行高；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 依畫面回饋縮小 `operational-resources` 前三個資料區塊的標題與敘述視覺間距，由 40px 調整為約 20px；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] 將 `operational-resources` 前三個資料區塊的標題與 `resource-intro` 間距改為沿用全域 `--section-heading-content-gap`（桌機實際 40px），手機維持響應式緊湊間距；已完成 `git diff --check`，尚未進行瀏覽器畫面驗證，尚未 commit。
- [x] Adjusted the first three operational-resources data sections so resource-note stays immediately below the table and the right-side image aligns to the table row height; git diff --check passed, browser visual verification and commit remain pending.
- [x] 將三個資料區塊拆為「標題、說明、表格／圖片並排」結構，使圖片與表格共用資料列並保持高度對齊；平板與手機維持單欄順序；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 將廠區資訊、機具配置與作業量能改為桌機標題滿版、左側敘述與表格、右側圖片的雙欄版面；平板與手機回到單欄，避免表格過窄；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 將廠區資訊、機具配置與作業量能圖片縮小至最多 560px，改用全域 `var(--card-radius)` 圓角並靠左對齊；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 將廠區資訊、機具配置與作業量能三個資料區塊的圖片移至標題下方、敘述與表格上方；職業安全衛生與地理優勢維持不變；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 依 BenQ Materials「永續推動目標」頁面的實際 computed style，將廠區資訊、機具配置與作業量能的標題、正文、表頭、表格列、欄線、備註與間距調整為相同規則；職業安全衛生與地理優勢維持不變；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 參考 BenQ Materials 健康管理頁面的資料閱讀順序，強化三個營運資源資料區塊的全寬表格：加入欄線、交錯列背景、深色表頭與更清楚的內容間距；職業安全衛生與地理優勢維持不變；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 重新整理 `operational-resources` 的廠區資訊、機具配置與作業量能：改為標題、說明、完整寬度表格與次要圖片的資料優先版面；新增表頭、表格改為左對齊，職業安全衛生與地理優勢維持不變；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 將 `operational-resources` 的「機具配置」、「作業量能」與「職業安全衛生」桌機版圖片與文字欄位調整為 5:5；「廠區資訊」維持 5:5，手機單欄排列不變；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 將 `operational-resources` 的「廠區資訊」桌機版圖片與文字欄位由 6:4 調整為 5:5，並讓「作業量能」維持原本 6:4；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 依需求回復 About「經營理念」最初的圖片卡片造型、icon、遮罩與 hover/focus 敘述呈現；保留上方「關於亞太」及其他頁面修改，已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 將 About「經營理念」改為不使用圖片的純 CSS 穿插造型，移除三個裝飾性圖片 icon，改用不同圓弧、色面與線條呈現三張理念卡片；已完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 將 About「經營理念」三張卡片調整為等比例圓形，並將敘述改為圓形內直接置中顯示；已更新 CSS cache version 並完成 `git diff --check`，桌機與手機瀏覽器尚未驗證，未 commit。
- [x] 調整 About「經營理念」卡片，讓敘述預設直接顯示，不再等待 hover 或 focus；保留原有卡片遮罩與互動樣式，已完成 `git diff --check`，瀏覽器桌機與手機驗證尚未執行，未 commit。
- [x] 移除 About 頁面 `.about-affiliates` 區塊的背景色，保留原有間距、卡片與內容；已完成 `git diff --check`，瀏覽器桌機與手機驗證尚未執行，未 commit。
- [x] 恢復 `company-history` 頁面的完整 Hero 區塊：補回 Hero 圖片 preload、共用 `.page-hero` markup、公司沿革頁圖片焦點位置與 CSS cache version；已完成 `git diff --check`、`node --check wwwroot/js/pages/company-history.js`、`dotnet build -c Release`；桌機與手機瀏覽器尚未驗證，未 commit。

## 2026-09-22
- [x] 依視覺檢視移除最新消息區塊的幾何線條與節點背景，保留 `#efefef` 純色背景與新聞卡片層次。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 為首頁最新消息區塊加入低對比幾何線條與節點背景，使用 CSS 原生繪製並置於內容底層，保留卡片與文字可讀性。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 依視覺確認將首頁最新消息區塊背景由 `#e8eaed` 調整為 `#efefef`。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將首頁最新消息區塊背景由淡白灰調整為 `#e8eaed` 冷灰色，拉開與預設新聞圖片的明度差並保留白色卡片層次。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將首頁最新消息圖片容器比例調整為 16:9，搭配 `object-fit: contain` 完整顯示圖片並移除上下白色留白。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 為首頁最新消息區塊加入既有 `--color-surface-subtle` 淡色背景，保留白色新聞卡片與內容層次。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 依視覺檢視恢復首頁最新消息日期為原本單行格式，移除過度強調的大日期資訊塊；保留圖片卡片、橘色分類、左右切換與既有版型。已完成 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`、`git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將首頁最新消息日期改為大日數搭配月份／年份的資訊塊，日數使用主題橘色並以分隔線建立日期層級；同步更新前端 API 與 SSR 日期結構。已完成 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`、`git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將最新消息「更多資訊」移回卡片下方中央，恢復原本按鈕樣式；縮小圖片與文字內容的上方間距，並將分類文字改為主題橘色。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將最新消息標題恢復置中，並將右側「更多資訊」按鈕恢復為原本的白底細框樣式；按鈕仍固定於標題右側並保留箭頭 hover 動畫。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將最新消息左右切換按鈕改為與關係企業一致的方形；「更多資訊」移至標題右側並補上深色背景，保留原本按鈕箭頭 hover 滑動效果。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將首頁最新消息 hover 箭頭與卡片標題放入同一列，讓箭頭依標題高度對齊，並同步 SSR 與前端 API 產生的卡片結構。已完成 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`、`git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將首頁最新消息桌機顯示數量由四筆調整為三筆，放大卡片圖片與文字閱讀尺寸；窄桌機顯示兩筆、手機顯示一筆，左右切換功能維持不變。已完成 `node --check wwwroot/js/pages/home.js`、`git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將首頁最新消息桌機版改為每次顯示四筆並加入左右切換按鈕，按鈕位置與樣式對齊關係企業 carousel；新聞圖片改用 `object-fit: contain`，完整保留圖片內容，並同步支援窄桌機、平板與手機欄數。已完成 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`、`git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將首頁「最新消息」改為圖片搭配文字的新聞卡片：桌機四欄、窄桌機三欄、平板兩欄、手機單欄；補上圖片、日期、分類、標題與 hover 圖片微放大，並同步前端 API 卡片與 SSR fallback 圖片結構。已完成 `node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`、`git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 再降低首頁服務卡片預設遮罩：桌機預設改為較淡的漸層、hover／focus 再淡出至更清楚的圖片；手機維持完整深藍遮罩以確保文字可讀性。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 調整首頁服務卡片 hover 遮罩方向：hover／focus 時淡出實心深藍層，讓圖片比平常狀態更清楚；保留底部漸層以維持文字對比，觸控裝置維持完整遮罩。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 修正首頁服務卡片 hover 遮罩閃爍：將漸層底層與實心深藍遮罩拆成獨立 pseudo-element，改以 opacity 淡入實心層；保留桌機 hover／focus 與觸控裝置遮罩行為。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將首頁「我們的服務」卡片遮罩調整為與 About「經營理念」一致的深藍漸層與 hover／focus 實心遮罩，手機版直接使用完整遮罩；保留服務卡片原有的圖片放大、說明展開與箭頭互動。已完成 `git diff --check`；桌機與手機瀏覽器尚未重新驗證，未 commit。
- [x] 將手機版「相關資訊」CTA 卡片比例由 1.6 調整為 2.2，降低卡片高度與垂直佔用，保留圖片、標題與箭頭導流呈現。已完成 `git diff --check`；手機瀏覽器尚未重新驗證，未 commit。
- [x] 修正手機 timeline page 之間的斷線：每個 page 的線段向右延伸跨過 16px page gap，讓相鄰年份的線連續顯示；卡片間距維持不變。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；Edge 手機模擬頁待重新確認，未 commit。
- [x] 修正認證與獎項手機版時間軸線消失：手機改由每個年份 page 的 timeline 個別繪製線段，避免共用線只覆蓋第一頁；同時保留 viewport-based page 寬度以避免 `max-content` 百分比重算造成超寬卡片。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；Edge 手機模擬頁確認 page 寬度與事件文字換行，手機各 page 線段待重新確認，未 commit。
- [x] 修正認證與獎項手機版：pagination 改為只顯示目前頁前後的鄰近點，避免一次顯示過多；手機內容列固定為 viewport 寬度，事件卡片補上盒模型、最小寬度與長字串斷行規則，避免文字撐寬卡片。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；手機瀏覽器尚未重新驗證，未 commit。
- [x] 參考 Maersk 最新資訊輪播的進場提示，將認證與獎項內容列改為 1 秒 ease、向左 50px 後回位的單次 hint 動畫，移除原本較強的左右彈性動畫；保留區塊觸發、年份資料與切換行為。已完成 `git diff --check`；Edge 桌機確認 cache key、動畫中段位移、回位與無水平溢出，手機未重新驗證，未 commit。
- [x] 依拖曳實際行為移除鼠標放開後的自動 smooth snap；鼠標拖到的位置會停留在原處，只同步 active 控制點，控制點點擊與行動裝置滑動行為維持原本效果。桌機鼠標拖曳後停留狀態由程式流程確認，手機未驗證，未 commit。
- [x] 修正認證與獎項鼠標拖曳在放開後跳到錯誤年份的問題：拖曳期間暫停 scroll 狀態同步，放開後只依最後位置執行一次 smooth snap，避免拖曳途中經過的頁次覆蓋最終位置。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；瀏覽器完整鼠標拖曳仍未可靠驗證，未 commit。
- [x] 放慢關於亞太左右滑入並增加位移距離；將經營理念改為區塊淡入後三卡平滑依序滑入；認證鼠標拖曳結束後改在下一幀以與控制點相同的 smooth scroll 對齊，拖曳中暫停 scroll-snap 避免卡頓。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；Edge 桌機動畫狀態確認，鼠標拖曳實際切頁仍未由控制介面可靠驗證，手機未驗證，未 commit。
- [x] 調整 About 進場動畫：關於亞太文字由左至右、圖片由右至左滑入；經營理念三張卡片依序滑入；認證與獎項維持原動畫並將桌機拖曳改為鼠標 Pointer Events，保留行動裝置原生手指滑動。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；Edge 桌機確認方向動畫、卡片依序延遲、認證輪播 7 組內容與無水平溢出，但控制介面未能可靠完成鼠標拖曳切頁，手機未驗證，未 commit。
- [x] About 頁面的公司簡介、經營理念、認證與獎項、相關資訊區塊加入進入視窗時才執行的滑入效果；保留認證內容既有的水平滑入，並支援減少動態偏好與無 IntersectionObserver fallback。已完成 `node --check wwwroot/js/pages/about.js`、`git diff --check`；Edge 桌機確認初始與捲動觸發狀態及無水平溢出，手機 viewport 覆寫未生效而未驗證，未 commit。

## 2026-09-22
- [x] Placed each affiliate card's forward icon inline beside its centered title and removed the icon button border/background, while retaining keyboard focus visibility and hover motion.
- [x] 2026-09-22 驗證：桌機瀏覽器確認標題與箭頭同列且箭頭無外框；`node --check wwwroot/js/pages/about.js`、`git diff --check` 通過；手機版未驗證，因目前瀏覽器控制介面無法調整 viewport。
- [x] 讓關於亞太三張卡片的整個卡片區域成為可點擊連結，並以卡片 hover 與 focus 狀態提示可導向下一頁。
- [x] 修正整張卡片連結改造後箭頭繼承頁面文字色的問題，讓標題與箭頭維持一致的白色。
- [x] 讓認證與獎項區塊使用滿版柔和背景，保留右側切換控制欄，並以白底內容卡片建立內容與控制的層次。
- [x] 將桌機認證與獎項卡片改為固定寬度的橫向延伸展示，讓卡片可延伸至右側邊界，並將右側切換按鈕浮於邊界上方。
- [x] 移除桌機認證 carousel 的右側內容容器限制，讓卡片列從內容左側一路延伸至 viewport 右邊界。
- [x] 修正延伸 carousel 使用 `100vw` 造成的整頁水平捲軸，改以實際區塊寬度計算右側延伸範圍。
- [x] 將認證第一張卡片對齊上方經營理念第一張卡片，改以浮動左側控制按鈕避免控制欄推動內容向右偏移。
- [x] 將認證與獎項左右切換按鈕改為卡片底部的可操作分頁點，避免右側延伸卡片遮蔽切換提示。
- [x] 更新 About 頁面 JavaScript cache query，確保瀏覽器載入新的認證分頁點互動邏輯。
- [x] 將認證分頁點對齊主要內容容器，並補上 5 張卡片的固定欄位規則，修正最後卡片間距不一致。
- [x] 將桌機 carousel page 之間的間距改為沿用卡片欄位間距，修正跨 page 卡片靠近的視覺問題。
- [x] 讓桌機 carousel 各 page 的 flex 寬度包含完整欄位與欄距，避免跨 page 卡片重疊造成最後間距縮小。
- [x] 為桌機 carousel track 補上實際響應式欄距，修正 page 間距變成 `normal` 的問題。
- [x] 將認證與獎項區塊改用 `about/01.jpg` 滿版背景與深色遮罩，並調整標題、年代導覽、時間線與分頁點的對比色，獎項卡片維持白底。
- [x] 依視覺檢視移除認證與獎項區塊的圖片背景，恢復柔和色背景；保留卡片延伸、分頁點與跨 page 間距調整。
- [x] 將認證區塊的水平溢出限制在內部 carousel，避免卡片延伸造成整個頁面出現水平捲軸。
- [x] 將認證與獎項區塊改用 `future-outlook/hero.png` 作為極淡背景，保留高透明度淺色遮罩以維持內容可讀性。
- [x] 精修認證背景遮罩，改為左淡右稍深的漸層，讓右側貨輪意象更自然地透出並維持文字對比。
- [x] 將 About 關係企業導流區標題改為置中的「相關資訊」，移除說明文字，並使用與 Footer 有明顯區隔的淺藍灰背景。
- [x] 將 About「相關資訊」區塊背景色調整為 `#e5e5e5`。
- [x] 縮小「相關資訊」CTA 區塊的上下留白與標題至卡片間距，讓導流區更精簡。
- [x] 將「相關資訊」CTA 標題字重調整為一般字重，避免視覺過重。
- [x] 將「相關資訊」CTA 標題尺寸調整為 `--font-size-h3`，與導流區定位一致。
- [x] Converted the About quick-link cards to image-overlay navigation: a shared dark image mask now supports centered titles and icon-only forward CTAs, while the CTA labels remain available to assistive technology.
- [x] Tightened the same-row title/CTA area in the About quick-link cards from 96px to 80px desktop height, with a 72px mobile fallback, to reduce the visual separation between each image and its card content.
- [x] Reflowed the About quick-link card copy rows so each title and 「了解更多」 CTA sit on the same horizontal line, with reduced responsive padding and a consistent minimum row height.
- [x] Removed the three About quick-link card descriptions and their related CSS; each card now presents only its image, title, and 「了解更多」 CTA with a shorter copy area.
- [x] Added the global `--font-weight-bold: 700` token and applied it to `.about-page .about-certifications-preview__year` for the heaviest year-number emphasis.
- [x] Added a light surface behind the philosophy card copy, changed the philosophy section back to a white background, standardized card/image radius tokens, and aligned copy padding/minimum height so each image-and-text card reads as one unit.
- [x] Applied the global `--card-radius` token to `.about-page .about-profile__media` and its `img`, including overflow clipping on the media wrapper, so the About profile image visibly follows the shared card radius.
- [x] Applied the global `--card-radius` token to the About affiliate cards and their image tops, replacing the local pixel radius so the card media follows the site-wide radius system.
- [x] Corrected the company-history card image from a transparent anniversary logo to the available history photo asset after desktop visual verification showed an empty-looking card image.
- [x] Renamed the About quick-link section heading from 「探索亞太」 to 「關於亞太」 and reduced its card CTA buttons to the homepage About CTA sizing: 40px height, 18px horizontal padding, regular text weight, and light border.
- [x] Updated the About stylesheet cache key after converting the exploration section from tabs to cards, so browsers load the new three-card presentation instead of the previous promo-panel rules.
- [x] Replaced the About quick-link tab switcher with three responsive cards for company history, operational resources, and affiliates. Each card now combines a distinct image, short description, and link; removed the obsolete affiliate-switcher JavaScript.
- [x] Matched philosophy card descriptions to the homepage services-card copy style: `font-size-card-description`, regular weight, body tracking, and 1.6 line height; applied the same description token on mobile.
- [x] Matched philosophy card headings to the homepage services-card heading token set (`font-size-card-title`, regular weight, normal tracking, card-title line height) and added a shared 14% deep-blue image overlay for more consistent image treatment.
- [x] Replaced the philosophy tab switcher with a straightforward three-card row: each card now presents its own image, title, and description, with two-column tablet and single-column mobile fallbacks. Removed the no-longer-needed philosophy tab JavaScript.
- [x] Tightened the desktop philosophy switcher to a 1080px content group with a fixed navigation column, shorter internal spacing, and a smaller media width so the tabs, copy, and image read as one composition instead of three widely separated columns.
- [x] Tightened the philosophy tab composition after visual review: aligned navigation and panel content to the same top edge, reduced the perceived empty space, and preserved the smaller media/text balance. Browser-reviewed the desktop About section; mobile remains unverified.
- [x] Replaced the About philosophy editorial rows with an accessible tab switcher inspired by the referenced tab-change interaction: vertical desktop navigation, one focused image-and-copy panel, horizontal mobile tabs, keyboard support, and responsive CSS. Updated `about.html`, `about.css`, and `about.js`; static checks pending.
- [x] 微調經營理念 editorial 版型：圖片欄縮至約 40%、文字欄擴大，圖片限制最大寬度與比例，降低段落間距以改善圖片過大及短文案留白問題；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將 About 經營理念由三張等大圖片卡改為三段交錯 editorial 版型：桌機左右交錯、手機依標題／圖片／內容排列，保留使命、核心價值觀與共同願景原文；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將探索亞太導流內容標題縮小為 `clamp(1.5rem, 2vw, 2rem)`，與 About 頁面主要標題拉開級距；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將探索亞太「了解更多」按鈕改為比照首頁最新消息「更多資訊」的白底細框與雙箭頭滑入 hover／focus 效果，尺寸比照首頁關於亞太按鈕（48px 高、左右 24px 內距）；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將 About 快速導流右側 `.about-affiliates__promo-copy` 背景改為 `#333333`，並調整文字與按鈕對比色確保可讀性；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 依視覺節奏將「探索亞太」標題至 tab 導覽間距調整為 24px；此處 tab 屬導覽列，與認證導覽的 24px 間距一致，不套用一般 heading-to-content 的 40px token。已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將「探索亞太」標題至快速導流 tab 的間距改用全域 `--section-heading-content-gap`，移除手機覆寫值，確保各尺寸遵循 40px 全域規則；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將 `about-affiliates__tabs` 視覺統一為 `about-certifications-preview__nav`：底部基準線、48px tab 高度、active 橘色底線、橫向溢位與 focus 樣式一致；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 在 About 快速導流 tab 上方加入「探索亞太」區塊標題，並將 section `aria-labelledby` 指向該標題；更新 About CSS cache key。已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將 About 快速導流 CTA 改為可切換的三個 tab：公司沿革、營運資源、關係企業；各 tab 更新對應圖片、說明與連結，支援鍵盤方向鍵／Home／End，無 JavaScript 時保留第一個面板內容；更新 About JavaScript cache key。已執行 `node --check wwwroot/js/pages/about.js` 與 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將 About 關係企業由重複企業卡片改為單一快速導流 CTA：左側代表性圖片、右側關係企業說明與「了解更多」按鈕，連至 `/affiliates`；桌機左右配置、手機上下堆疊；更新 About CSS cache key。已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將 About 關係企業由單列 6 張卡片改為桌機 3 欄 2 列、平板 2 欄、手機 1 欄，增加卡片尺寸與區塊層次；更新 About CSS cache key。已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 依首頁企業資料將 About 關係企業整理為 6 張卡片：縮短為企業名稱、桌機同列呈現、各自使用不同背景圖片，手機保留橫向瀏覽；更新 About CSS cache key。已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 修正關係企業背景圖 selector：原本卡片位於各自 `li` 內，直接使用卡片 `:nth-child()` 會全部命中第一張；改為依 `li:nth-child()` 正確套用 7 張不同背景圖。已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] About 關係企業卡片背景改為對照首頁關係企業的各自照片：世新貨櫃、亞柏油品、亞柏會舘、亞柏羽球隊、太報與 ALPHA 均使用不同圖片；第 7 張企業卡保留獨立背景；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] About 關係企業區塊移除 eyebrow 與標題底線裝飾，將 7 張服務卡改為桌機同列呈現並以既有照片作背景襯托；手機保留橫向瀏覽；更新 About CSS cache key。已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 將 About 關係企業區塊恢復為標題「關係企業」的舊版 Logo／服務卡片呈現；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 依需求恢復認證與獎項區塊下方的原本關係企業快速連結區塊及其專用 CSS；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。
- [x] 移除 About 頁面的「了解更多」快速連結區塊及其專用 CSS；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證，未 commit。

## 2026-09-21
- [x] 加強首頁「關於亞太」按鈕 hover 底線辨識度：改為 2px 橘線，預設隱藏、hover／focus 展開；更新首頁 CSS cache key。Edge 確認桌機 hover 時 2px 橘線完整顯示，390px 手機無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 快速連結 CTA 區標題改為「了解更多」，關係企業卡片改用公司建築物照片；「了解更多」hover 下線與雙箭頭滑入效果比照首頁「關於亞太」按鈕，三卡箭頭統一為同一 SVG path；更新 About CSS cache key。Edge 預覽確認載入 v8 CSS、hover 下線展開及箭頭滑入，圖示尺寸維持 16×16；`git diff --check` 通過；未 commit。
- [x] About CTA 移除上框線與敘述，標題左對齊並改為「關於亞太」，卡片標題字重設為 400；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機與 390px 手機確認標題對齊、卡片排列及無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 快速連結桌機改為三張圖片卡片同列，調整比例與間距；手機維持單欄；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機確認三卡同列、390px 手機確認單欄與無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 快速連結依參考改為寬幅圖片 CTA 卡片：桌機雙欄、第三張置中，手機單欄；各卡呈現標題、「了解更多」及雙箭頭動畫，使用公司沿革、營運資源、碼頭吊車照片；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機與 390px 手機確認卡片位置、圖片與無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 快速連結 CTA 標題改為「繼續探索亞太」，按鈕縮小至 56px 高／16px 字級並保留 hover 邊線原色，箭頭恢復雙箭頭滑入動畫及減少動態偏好；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機與 390px 手機確認排列及無水平溢出；`git diff --check` 通過；未 commit。
- [x] About「亞太多元事業版圖」改為快速連結 CTA，提供公司沿革、營運資源及關係企業三個頁面入口；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機及 390px 手機確認排列與無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 經營理念於 840px 以下改為置中、最大寬度 560px 的 16:10 卡片，降低窄螢幕單欄卡片高度；更新 About CSS cache key；`git diff --check` 通過；未做桌機／手機瀏覽器畫面確認；未 commit。
- [x] 首頁最新消息最多顯示筆數由 8 筆調為 5 筆，更新首頁 JS cache key；`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁最新消息列表標題字級由 22px 調為桌機 20px、手機 18px，更新首頁 CSS cache key；`git diff --check` 通過；未做瀏覽器桌機／手機畫面確認；未 commit。
- [x] 依需求移除 About Hero 下方快速導覽及其專屬樣式與 anchor scroll margin，保留各內容區塊 ID；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 快速導覽連結字重限定為 400，導覽項目 gap 統一為 30px，手機維持相同間距並可橫向滑動；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About Hero 下方新增四項區塊錨點導覽（關於亞太、經營理念、認證與獎項、關係企業），桌機深色橫列、手機橫向滑動；設定固定 Header／導覽列高度對應的 anchor scroll margin。更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 認證與獎項區塊上下 padding 改為比照經營理念區塊：上方 `clamp(48px, 4vw, 64px)`、下方 `clamp(56px, 6vw, 88px)`；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 依更正將 About 認證與獎項區塊上下 padding 改用一般全域 `--section-space`（24–40px）；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證與獎項區塊上下 padding 改用全域 `--section-space-sm`（48–64px）；更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證與獎項資訊區背景改用專案中性淺灰 token `--color-surface-soft`，取代偏藍的色值；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證與獎項資訊區恢復水藍背景 `#edf0f5`；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 經營理念卡片遮罩與底色統一改用專案深藍 `#172538`，維持白色文字及背景圖片；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 關係企業 CTA 按鈕改為比照首頁最新消息「更多資訊」的白底細框樣式與雙箭頭滑入 hover／focus 動畫。更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 關係企業 CTA 標題縮小至 24–32px，並與右欄說明文字頂端對齊；按鈕 hover／focus 套用首頁關於亞太文字連結的橘色底線展開及箭頭位移效果。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證獎項 events 移除背景色，圓點改跟隨文字顏色；關係企業 CTA 加回滿版貨櫃場背景與深色遮罩，改用白字確保對比。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證獎項資訊卡背景恢復原水藍色 `#edf0f5`，文字配合改回深色；保留使用者指定的白色項目圓點。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 關係企業 CTA 依參考改為淺灰底雙欄版型，左側標題、右側說明與深藍按鈕，移除背景照片；手機改單欄排列。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 重整 About 關係企業 CTA 為桌機左右配置：左側 APLI GROUP 標記與短標題，右側套用全站橘色主按鈕；小螢幕改直向排列。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 關係企業 CTA 標題改為「探索亞太多元事業版圖」，連結按鈕改為「認識關係企業」；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 將 About 關係企業滿版圖片 CTA 移除 320–480px 最小高度，桌機上下 padding 縮為 36–56px、手機 32px；更新 About CSS cache key。`git diff --check` 通過；尚未做瀏覽器畫面確認；未 commit。
- [x] About「關係企業」區塊改為滿版貨櫃場背景圖、置中標題及連至 `/affiliates` 的按鈕；移除原企業 Logo 卡片 markup 與對應 CSS，新增桌機及手機區塊樣式並更新 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 頁面企業列表區塊標題及清單無障礙名稱由「多角化經營」改為「關係企業」；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] About 認證獎項項目前方圓點改為白色；更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] About 認證獎項資訊移除項目間分隔線，改在各筆文字前顯示圓點；更新 About CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 將 About 認證獎項卡片標題限定設為 `font-weight: 400`，更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 縮小認證與獎項年份導覽項目間距；將 events 卡片背景改為 `#333333`，文字改白並提高分隔線對比；更新 About CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 修正認證獎項導覽橘色作用線被水平捲動容器裁切的定位，恢復完整可見的 2px 粗度；更新 About CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 再加寬 About 認證獎項桌機輪播容器，最大寬度由內容軌道額外 96px 調為 192px；維持 viewport gutter 限制及手機原寬。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 將認證獎項年份導覽底線連成一條，寬度限於年份導覽列，保留作用中 2px 橘色底線；更新 About CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 認證與獎項年份導覽底線改為各按鈕各自顯示，不延伸整列；作用中橘色線維持原本 2px 粗度。更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] About「認證與獎項」標題至年份導覽間距比照 About 內文標題間距設為 24px；年份導覽加整條淺色底線與選取項目綠色底線；擴寬桌機內容輪播區，並將切換按鈕改為首頁關係企業相同的 chevron SVG 與 hover 邊框效果。更新 CSS／JS cache key；`node --check wwwroot/js/pages/about.js`、`git diff --check` 通過；尚未進行瀏覽器／手機畫面驗證；未 commit。
- [x] About「經營理念」標題與引言的間距比照「關於亞太」標題下方設定為 24px，移除標題多餘的 16px 底部 padding，並更新 About CSS cache key。瀏覽器幾何量測未完成（本機頁面自動化逾時）；手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] About「認證與獎項」標題置中，年份導覽置於標題下方置中，前後切換鈕移至內容兩側。Edge 桌機已確認標題、年份導覽置中及切換鈕位於內容左右；手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] About「關於亞太」移除區塊底色；「經營理念」改用全域淺色背景，理念卡片加入原對應的港口、團隊及貨櫃作業背景圖，保留正方形並將標題與內容置中；更新 About CSS cache key。Edge 桌機 1892×900 已確認版面；手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] About「經營理念」移除三張圖與圖示，保留「使命／核心價值觀／共同願景」為文字卡片，並於標題下增加理念引言；依既有卡片底色 `#edf0f5` 呈現正方形卡片，更新 About CSS cache key。Edge 桌機 1892×900 已確認正方形與原底色；手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] About「關於亞太」改回左側公司大樓圖片、右側標題與敘述，平板／手機改為圖片在上、文字在下；標題下方間距依首頁「關於亞太」設為 24px，移除區塊 `margin-top`；保留一般內文字體、全域字級／字重 token 與全寬淺灰底色。Edge 桌機已確認左圖右文與全寬底色；本次間距及上緣調整未重新量測瀏覽器畫面；手機畫面、實體裝置、跨瀏覽器與無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] 依需求將非首頁 10 個 Hero 頁面的標題字級縮小約 10%：共用 Hero 改用 `clamp(1.8rem, 3.15vw, 2.7rem)`，News Detail 動態標題同步縮小；首頁與無 Hero 頁面維持原樣。Edge 計算樣式確認 About 桌機 1366×900 為 43.03px、手機 390×844 為 28.8px，News Detail 桌機標題為 43.03px／21.6px；`git diff --check` 通過。News Detail 手機未驗證；實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] About Hero 圖片與 preload 改用 `public/images/about/company-facility.jpg`，並將尺寸屬性同步為 1638x1335；已確認圖片檔存在並完成 `git diff --check`，未進行瀏覽器畫面驗證；未 commit。
- [x] 全部 11 個 Hero 頁面的標題改為靠左，並比麵包屑多內縮 16–28px；涵蓋共用內頁 Hero、首頁與 News Detail，更新相關 CSS cache key。`git diff --check` 通過；Edge 確認 About 桌機 1912×914／手機 390×844，首頁與 News Detail 桌機 1366×900／手機 390×844 均靠左並保留內縮；其他內頁未逐頁檢查，未做實體裝置／跨瀏覽器驗證；未 commit。
- [x] 麵包屑加入文字層級：可點連結使用 `--color-text-body`，當前頁使用 `--color-text-primary` 與 `--font-weight-medium`；hover／focus 維持 `--color-primary`。更新共用 CSS cache key 與 11 個頁面引用。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 全站麵包屑文字色統一改用 `--color-text-body`，移除聯絡頁重複的色彩覆寫；hover／focus 維持 `--color-primary`。更新 11 個麵包屑頁面的 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 全站麵包屑桌機左緣改與 Header Logo 對齊，分隔符統一為 `/`；連結 hover/focus 延用主題橘色。更新共用 CSS cache key。`git diff --check` 通過；未做桌機/手機瀏覽器畫面確認；未 commit。
- [x] 精簡 `site.js` 的逐行註解與冗長區段說明，合併過度拆行的 selector、事件處理與 Footer Accordion 程式；保留載入失敗、路徑比對、下拉選單與捲動門檻等必要行為說明。`node --check wwwroot/js/site.js`、`git diff --check` 通過；未做瀏覽器互動驗證；未 commit。
- [x] 將首頁 Hero 文案底部板狀漸層改為低對比柔焦暈染，保留文字可讀性並減少遮罩存在感；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 為首頁 Hero 文案後方加入局部淡黑漸層，僅加深文字周圍；手機版將暗部置於置中文字後方，不改動整張 Hero 遮罩。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁桌機 Hero 內容容器改為沿用共用 Header 的左右內距，使 Hero 文案左緣與 Logo 對齊；手機版版位不變。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 修正共用 Header 981px 以上的舊 media query 覆蓋，所有桌機頁面現在與首頁採用相同的左右間距；沿用已更新的共用 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 移除首頁 Header 預設暗色遮罩；桌機加寬邊界移至共用 Header 樣式，所有頁面採用一致間距，手機版間距維持原值。同步更新共用 Header 快取版本。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁桌機 Header 左右邊界加寬，Logo 與導覽列向視窗兩側延伸；頂端預設加淡黑半透明底，捲動／hover 時切回白底。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 Hero CTA 恢復原始外觀：透明底、白色外框與文字、原本的圖示及 hover 白底樣式；保留 Hero 遮罩已移除的設定。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 Hero CTA 預設背景恢復白色、文字使用深色；保留品牌橘 hover 與箭頭滑入效果。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 Hero CTA 改為預設顯示共用按鈕底色，圖示替換成 16px 細線右箭頭，hover／focus 沿用「關於亞太」了解更多按鈕的雙箭滑入效果；支援減少動態偏好。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 移除首頁 Hero 全尺寸遮罩，包含手機版覆寫，保留圖片與文字版面。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 依參考圖加深首頁 Hero 左側遮罩，讓暗區覆蓋標題區並延伸至畫面中段，再淡出至透明；右側主體保留亮度。手機版置中標題遮罩維持原樣。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 Hero 桌機遮罩改為左側較深、向右漸淡至透明，凸顯左側標題並保留右側圖片亮度；手機版置中標題的原遮罩維持不變。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁聯絡／招募 CTA 標題恢復使用全站標題字體，內文維持一般字體，讓標題層級與首頁其他區塊一致。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 移除首頁聯絡／招募 CTA 標題與內文的文字陰影，保留圖片遮罩；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 聯絡／招募 CTA 標題改用一般內文字體；按鈕預設顯示，箭頭使用與「更多資訊」一致的 16px 雙箭滑入動畫。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 關係企業區塊桌機上方留白增加、下方留白略減，讓標題與卡片組視覺下移並平衡卡片下方空間；手機留白維持原值。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 `home-contact-cta` 還原為原有全寬聯絡／招募雙面板，恢復原文案、圖片裁切、hover 展開與按鈕互動；其他首頁區塊變更保留。更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 為首頁「關於亞太」描述段落指定可讀的內文字色 `--color-text-body`，避免受外層文字色繼承影響；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 CTA 恢復聯絡資訊與職缺資訊兩張圖片卡片，桌機並排、手機直向排列；沿用聯絡與招募各自的原背景圖，不加區塊底色或地圖背景。更新首頁 CSS cache key。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 首頁單一卡片改為聯絡資訊，使用原聯絡卡背景圖 `news-hero.png`，列出已在聯絡頁使用的電話、電子郵件與地址，並連至聯絡頁。更新首頁 CSS cache key。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 恢復首頁職缺資訊原有的 `core-values.jpg` 背景圖片，使用深色遮罩維持文字對比，保留透明區塊底色與單一職缺內容。更新首頁 CSS cache key。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 首頁 CTA 簡化為單一人才招募資訊，移除聯絡卡、世界地圖與裝飾點、圖片及面板底色；保留職缺頁連結並移除不再需要的左右面板互動。更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 首頁聯絡／招募 CTA 改為置中的雙欄圖片卡片，加入點陣世界地圖與品牌色標記；標題及按鈕置中，手機改為直向排列，保留原圖片與連結。更新首頁 CSS cache key。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 首頁區塊順序試調為主視覺 → 我們的服務 → 最新消息 → 關於亞太 → 關係企業，後依需求恢復原順序主視覺 → 關於亞太 → 我們的服務 → 最新消息 → 關係企業；內容與樣式保留。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。

- [x] 關係企業輪播初次載入時直接定位第一組卡片，避免初始 transform 套用切換動畫而暫時偏移；後續切換動畫保留。更新首頁 JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 關係企業區塊上下內距改為一致：桌機共用 `clamp(40px, 4vw, 60px)`，手機上下均為 40px；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 首頁「最新消息」區塊改用全寬 `#333333` 深色背景，標題、日期、類別、分隔線與前往圖示調整為淺色，保留白底「更多資訊」按鈕。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息列表寬度收窄並置中；「更多資訊」按鈕桌機高度／字級增大，手機版同步加高加字。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息標題調整為區塊置中，列表與下方「更多資訊」按鈕位置維持不變；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息列表恢復與標題左緣對齊；「更多資訊」按鈕移至列表下方置中。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 移除最新消息標題下方分隔線；桌機列表起點改與標題文字右緣對齊，手機維持完整可讀寬度。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息列表可見時左右內縮；每則恢復公告類別，hover／鍵盤 focus 顯示前往箭頭。更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 首頁最新消息改為垂直條列，逐則顯示日期與標題並以細線分隔；移除卡片摘要及水平輪播互動，保留全寬淺灰底與標題分隔線。更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 首頁最新消息卡片移除圖片 markup、圖片載入程式與預設圖片 CSS，保留日期、標題、摘要及連結；更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息圖片區恢復原 2:1 比例，減少縮小卡片時 `object-fit: cover` 導致的裁切；保留卡片尺寸與標題間距調整，更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「最新消息」卡片寬度縮至最多 360px、圖片比例縮短，卡片內距與標題上方間距增加；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 恢復首頁「最新消息」標題下方原有的分隔線；保留全寬淺灰背景與上下留白，更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「最新消息」淺灰背景延伸至全視窗寬度，區塊保留上下留白並移除標題下方分隔線；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「最新消息」區塊加上淺灰背景（`--color-surface-soft`），更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 移除首頁「我們的服務」區塊上下邊線，維持無背景色；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 移除首頁「我們的服務」區塊背景色，標題恢復深色、上下邊線恢復淡色；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「我們的服務」背景改為 `#2a3139`，標題與區塊上下邊線調整為深底可讀的淺色；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「我們的服務」改用淺灰背景並加入上下細邊線；移除「關係企業」區塊的背景色與上下邊線，保留版型。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁關係企業輪播調整為桌機一次顯示 4 張，卡片置中並保留間距，左右切換鈕改用 SVG chevron icon；平板顯示 2 張、手機顯示 1 張，hover／focus 敘述樣式保留。Edge 桌機約 1920px 畫面確認置中四張卡片與切換按鈕，並確認點擊下一張可移動；`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。手機瀏覽器畫面、實體裝置、跨瀏覽器與完整人工無障礙尚未驗證；未 commit。

- [x] 將首頁關係企業輪播改為置中的固定最大寬版型，桌機同時顯示 4 張卡片，左右新增可鍵盤操作的切換按鈕；保留窄螢幕卡片列、拖曳與自動輪播。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；Edge 桌機畫面已確認，手機瀏覽器畫面、實體觸控、跨瀏覽器與完整人工無障礙尚未驗證；未 commit。

- [x] 關係企業輪播切換按鈕 hover 時改為黑色邊線，SVG icon 保持原色；完成 `git diff --check`，未 commit。

- [x] 整理首頁區塊整體節奏：服務、關於、最新消息與關係企業統一使用置中的內容寬度；服務卡列對齊內容容器，關係企業改為與關於區塊一致的淺底色區段，卡片列與切換按鈕仍維持置中。Edge 桌機畫面確認內容欄位對齊與企業區塊淺底色；手機斷點僅檢視 CSS，未實際確認手機瀏覽器畫面。`git diff --check` 通過；未 commit。

- [x] 試作聯發科風格的 APLI 橘色／深藍大面積區段，依使用者回饋色彩過強，已完整撤回配色試作；恢復各區段既有白色／淺灰底色，同時保留首頁內容寬度對齊。Edge 桌機已確認恢復淺色版面，手機畫面未驗證；`git diff --check` 通過；未 commit。

- [x] 將首頁「關於亞太」移至主視覺後、服務區塊前，先介紹公司再呈現服務內容；其他區塊順序與樣式不變。Edge 桌機畫面確認 About 後接續服務區；`git diff --check` 通過；手機畫面未驗證；未 commit。

- [x] 移除關於亞太區塊的底色、保留點陣地圖；我們的服務區塊改用淡橘品牌色背景（`--color-primary-soft`）。Edge 桌機確認關於區塊透明且點陣圖仍顯示、服務區塊為淡橘色；手機畫面未驗證；未 commit。

## 2026-09-20

- [x] 關係企業輪播切換間隔由 5 秒改為 4 秒；hover 時保持輪播，循序滑入第一張的複製卡後於 transitionend 無動畫歸位，消除循環停頓與跳位。Edge 確認桌機 hover 時輪播持續推進，桌機與 390px 手機尺寸都能從最後一張接回第一張。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；實體觸控、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 關係企業卡片預設顯示企業名稱；固定桌機高度 280px，hover／focus 僅淡入簡介、不改變卡片或下方區塊位置；手機維持 320px 與完整資訊常駐。Edge 實測桌機 hover 前後卡片高度與下方區塊位置不變，390×844 手機顯示名稱及簡介；`git diff --check` 通過。實體觸控、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 將首頁世新貨櫃 Logo 襯底照片改為 `public/images/affiliates/01.png`；確認圖片檔存在並檢視素材。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 移除關係企業輪播左右按鈕，改為拖曳卡片列並依卡片吸附切換；保留無 JavaScript 時的原生水平滑動。Edge 檢查桌機與 390×844 響應式畫面，確認按鈕移除且拖曳會推進一張卡片；`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。實體觸控、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 移除 `home-affiliates__showcase` 容器；將輪播箭頭定位改由關係企業區塊承接並保留原有桌機／手機間距。hover／focus 不再縮小 Logo。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 關係企業標題下方間距改用全域 `--section-heading-content-gap`（40px），比照服務區塊標題與卡片的間距；移除卡片列頂部 4px 內距以保持實際視覺間距一致。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 微幅加深關係企業照片遮罩，深色漸層由 18%–28% 調為 24%–34%。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 移除關係企業 Logo 陰影與卡片 `::before` 底色，將桌機照片區提高至 152px、手機提高至 160px，並同步調整 hover 資訊起點。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 關係企業 Logo 統一顯示白色；透明 PNG 套用白色濾鏡，ALPHA JPG 以灰階高對比搭配 screen 混色呈現白色圖樣。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 為關係企業 Logo 襯底照片加上深色漸層遮罩（18% 至 28%），讓 Logo 更清晰並保留照片可見度。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 將關係企業 Logo 襯底做成獨立照片 `<img>`，實際顯示於 Logo 區塊後方；Logo 圖使用透明底，襯底僅加 10% 淺色層，維持照片清晰。更新 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 移除關係企業 Logo 區塊的純色底，保留各企業背景照片直接襯托 Logo；更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 依要求撤回整張卡片鋪照片與 Logo 白底襯板，恢復照片只作為 Logo 區塊襯底；保留預設／hover 內容狀態與卡片高度。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 加強關係企業卡片襯底照片可見度：六張企業照片改為覆蓋整張卡片，預設白色覆層降至 24%，Logo 保留半透明白底襯板；hover 時照片壓暗以顯示白色文字。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 依參考圖修正關係企業卡片預設／hover 狀態：預設只顯示 Logo 與對應背景照片；hover／鍵盤 focus 顯示公司名稱與說明。觸控裝置維持資訊可讀；更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 調整關係企業卡片：高度由 330px 降至桌機 280px／手機 320px，預設顯示 Logo 與公司名稱；Logo 區加入各企業對應背景照片及淺色覆層，hover／focus 再顯示說明。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 收緊首頁關係企業標題與卡片資訊間距，將標題下方局部留白由 24px 調為 12px；Logo 與卡片 hover 位置維持不變，更新 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 首頁最新消息與關係企業區塊改用各自明確的局部上下間距，參考 `home-services-compare`：桌機上方 `clamp(40px, 4vw, 60px)`、下方 `clamp(56px, 5.5vw, 80px)`；手機 `40px / 48px`。最新消息不再沿用原 72–112px 範圍；更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 修正上一輪誤套通用左滑入的最新消息動畫；依 Git 歷史恢復原本 1200ms 左移後回彈至定位的 `home-latest-left-right` 入場效果，並保留減少動態偏好支援。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 恢復首頁最新消息卡片列進入視窗時的水平滑入動畫，改用首頁既有左側 reveal 動效，延遲 120ms；`git diff --check` 通過，未另做瀏覽器檢查；未 commit。

- [x] 首頁關係企業區塊背景改用 `--color-surface-soft` 淺灰色，更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 首頁最新消息卡片圖片改為靠下對齊裁切，讓圖片底部 Logo 完整露出；更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 「關於亞太／了解更多」按鈕尺寸對齊最新消息「更多」：桌機字級 1rem、高度 40px、左右內距 18px；手機字級 14px、高度 40px、左右內距 14px。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 保持最新消息「更多」按鈕尺寸與間距不變，箭頭改為與「關於亞太／了解更多」相同的雙箭頭滑入圖示與 hover／focus 動效；`git diff --check` 通過，未另做瀏覽器／RWD 檢查；未 commit。

- [x] 依回饋恢復最新消息「更多」按鈕原有外觀、chevron 圖示與 3px hover 位移；保留卡片 hover 陰影修改。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 最新消息卡片 hover 改為柔和陰影、取消卡片上移，避免圖片區出現突兀遮罩感；「更多」箭頭改用首頁 `home-text-link` 同款箭頭及 hover 位移／底色效果，更新 CSS cache key。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 首頁最新消息摘要字級調整為 `.9375rem`（標準 16px 根字級下約 15px），其餘樣式不變；`git diff --check` 通過。未另做瀏覽器／RWD 視覺檢查；未 commit。

- [x] 首頁 Hero 標題恢復為「優質服務 唯客思維」，移除聯絡 CTA 並還原單一服務 CTA；最新消息日期／類別對調文字顏色，卡片 hover 游標恢復為抓取手勢。輪播指示點改按目前視窗可完整顯示的卡片數分組；桌機 1440px 每次由第 1 則移至第 4 則（可見第 4 至約第 6.5 則），手機每頁移動 1 則，點選及手動拖曳均同步 active 狀態；更新首頁 CSS／JS cache key。Edge 靜態預覽以 8 則樣本於 `1440x900` 確認每頁移動 3 則、第 4 則起始位置與第 3 頁可達；`390x844` 確認 8 點、初始位置及單則切換，文件寬度 390px。`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。正式新聞 API、實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 統一最新消息卡片日期與類別文字為 14px／400；圖片比例調為 2:1、文字區最小高度 210px 並收緊內距，以縮短卡片；卡片 hover 游標改為水平雙向 `ew-resize`。新增參照 Hero dots 視覺的卡片列指示點，依捲動進度更新、可點選跳轉，只有可橫向捲動且至少兩筆消息時顯示；更新首頁 CSS／JS cache key。Edge 靜態預覽於 `1440x900` 確認卡片約 `415px` 高、圖片 `205px`、內容 `210px`，meta 字級／字重一致且游標為 `ew-resize`；點選第 5 點後 active 為第 5 點。`390x844` 確認文件寬度仍為 `390px`、卡片約 `401px` 高、圖片 `153px`、內容 `216px`，點選第 5 點後 active 正確。`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。正式 API、實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 參考 NVIDIA 台灣首頁「關於 NVIDIA」卡片調整最新消息：圖片改為 16:9 原色呈現，白底文字區增加留白，日期／類別置於標題與摘要之前；字級層級改為 15px 分類、20px 標題、16px 摘要，取消 hover 箭頭，改以輕微上移與陰影回饋，保留 6px 圓角及無圖預設圖。更新首頁 CSS cache key。Edge 本機預覽於 `1440x900`、`390x844` 確認圖片裁切、文字層級、卡片高度和手機無水平溢位；桌機 hover 計算為上移 2px／陰影加深，圖片本身不縮放或加暗遮罩；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 最新消息卡片桌機與手機圓角改為共用 `--card-radius`，與我們的服務卡片相同；更新首頁 CSS cache key。Edge 本機預覽於 `1440x900` 與 `390x844` 確認兩種卡片計算圓角均為 `6px`；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 加深首頁服務卡片下半部遮罩以襯托服務標題：線性漸層黑色濃度調為 60%／24%、80%／58%、100%／90%，保留 43% 前圖片無遮罩；更新首頁 CSS cache key。Edge 本機靜態頁面確認 `1440x900` 與 `390x844` 標題可讀、圖片上方仍清楚且文件無水平溢位；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 首頁最新消息卡片改為上方圖片、下方文字，資訊順序調為日期／公告類別、標題、摘要；同步更新伺服器端與前端卡片輸出，移除最新消息標題裝飾線。服務卡摘要改為平滑展開／收合並支援鍵盤 focus；更新首頁 CSS cache key。`dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。Edge 本機靜態預覽確認桌機 `1440x900` 與手機 `390x844` 圖文方向、資訊順序、標題裝飾線已移除及無水平溢位；服務卡摘要 hover 動畫在約 80ms 時透明度約 0.83，約 380ms 完成顯示。ASP.NET 路由／新聞 API、實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 首頁服務卡片 H3 字重設為 400，說明文字預設隱藏並於 hover／鍵盤 focus 顯示；關於亞太區塊改用 `--color-surface-soft` 淺灰底色。更新首頁 CSS cache key。Edge 透過本機靜態伺服器確認桌機 `1440x900` 預設隱藏／hover 顯示、手機 `390x844` 字重與背景色正確且文件無水平溢位；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依首頁企業客戶服務導流目標調整資訊順序：Hero 後先呈現服務，再呈現公司介紹；Hero 標題改為「高雄港區物流服務」並加入「聯絡我們」入口；公司介紹改用成立日期與現有服務事實，移除已過時的「屆滿五十年」說法。更新首頁 CSS cache key。Edge 透過本機靜態伺服器確認 `1440x900`、`390x844`、`320x740` 三種尺寸的 Hero 內容與雙 CTA 顯示，文件寬度均無水平溢位；section 順序與連結靜態確認，`git diff --check` 通過。ASP.NET 路由／新聞 API、實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 微調首頁「關於亞太／了解更多」箭頭：改為深色 1.4px 線條，雙箭頭滑換調為 520ms 柔和緩入緩出，保留 hover／focus 與減少動態偏好支援；更新 CSS cache key。已比對 Polestar Careers 動態，Edge 確認桌機滑換及手機 `390x844` 顯示無溢位，`git diff --check` 通過；減少動態偏好僅檢查 CSS 規則，實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 移除首頁「關於亞太」區塊底色，保留點陣地圖背景圖片與其他版面；更新首頁 CSS cache key。Edge 本機頁面確認桌機與 `390x844` 手機的區塊背景皆透明、點陣背景圖仍載入，手機文件寬度為 390px；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 將首頁「關於亞太」區塊移至 Hero 下方、「我們的服務」上方；僅調整 `index.html` 區塊順序，保留區塊內容與樣式。已靜態確認首頁 section 順序並執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

- [x] 依需求將首頁最新消息恢復至緊接 Hero 下方改版之前的位置，排在「我們的服務／關於亞太」之後、關係企業之前；恢復新聞圖片卡片、最多 8 筆 SSR／API 顯示與桌機切換控制，手機保留原生水平滑動與 scroll snap。Edge 實際檢查 `1440x1000` 與 `390x844`：5 筆已發布消息可顯示、桌機下一則控制可移動輪播、手機文件寬度維持 390px 且卡片可橫向瀏覽。`dotnet build -c Release`、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

## 2026-09-19

- [x] 依首屏高度回饋調整首頁最新消息：桌機資訊帶高度改為 `clamp(180px, 15vw, 210px)`，Hero／最新消息在 `1440x768`、`1440x1000` 首屏內完整收斂；手機同步以 `100svh` 調整 Hero 與淺灰公告區留白。最新消息標題明確使用 `var(--font-size-h3)`，Edge 實測桌機計算為 `24px`、手機 `20px`；已確認三種尺寸均無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依參考網站再次整理首頁最新消息的整體視覺節奏：資訊帶改為全寬淺灰區塊，左側窄欄與右側公告區等高，右側四筆公告等寬且以低對比垂直欄線建立資訊分組；移除卡片上方水平線，保留 APLI 自有卡片內容與 hover icon。已用 Edge 實際檢查桌機 `1440x1000` 與手機 `390x844`，確認桌機資訊帶高度約 `259px`、四欄等高、手機仍可水平滑動且無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依參考網站調整首頁最新消息版型：最新消息改為全寬資訊帶，左側窄欄放標題／更多按鈕，右側四筆公告等寬排列，保留左／右區域中間垂直邊線；公告卡片內部仍維持 APLI 自有的分類、日期、標題與 hover 前往 icon。手機恢復內容容器寬度並保留水平拖曳；更新首頁 CSS cache-busting。已用 Edge 實際檢查桌機 `1440x1000`，確認資訊帶全寬、左欄約 `259px`、四張卡片各約 `295px`、無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依畫面回饋調整首頁最新消息視覺比例：保留左右分欄與四筆公告，將左側標題欄縮窄為約 18%，整區背景恢復 `var(--color-surface-soft)` 淺灰、文字恢復深色，中央垂直分隔線改用既有 `var(--color-border)`，卡片上方維持無邊線；手機仍維持四筆公告的水平拖曳。更新首頁 CSS cache-busting；已用 Edge 實際檢查桌機 `1440x1000` 與手機 `390x844`，確認左欄寬度約 `238px`、淺灰背景、4 筆公告、桌機無水平溢位與手機可水平滑動；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依最新需求重整首頁最新消息：桌機改為左側標題／更多按鈕、右側最新消息卡片的左右分欄，中央以垂直邊線分隔；首頁僅取最新 3 筆，桌機不支援拖曳且隱藏輪播提示，手機保留手指左右拖曳與中央三點提示；區塊背景改為 `#53565a`，文字改為淺色，卡片 hover 不改背景／文字，只顯示右下角前往 icon。更新首頁 CSS／JS cache-busting 與 SEO 初始輸出；已用 Edge 實際檢查桌機 `1440x1000`、手機 `390x844`，確認桌機 3 筆、左右分欄、垂直分隔線、桌機無輪播提示、手機可水平滑動且無頁面水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求恢復首頁「更多」按鈕：有最新消息時保留 `/news` 連結並可點擊，無最新消息時保留按鈕但以 `aria-disabled`、`tabindex=-1` 與停用樣式阻止操作；保留公告卡片僅在有資料時生成。將公告溢位提示從卡片右側移至最新消息列下方水平中央，改用三點輪播樣式，僅在仍有未瀏覽資料時顯示。更新首頁 CSS／JS cache-busting；已用 Edge 實際檢查桌機 `1440x1000` 與手機 `390x844`，確認 5 筆公告、更多按鈕可用、中央三點提示位置與頁面水平溢位狀態；無公告停用狀態已由 JS 分支與靜態樣式檢查，尚未以空資料實際路由驗證；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依回饋修正首頁公告資料軌：確認 `wwwroot/data/news.json` 目前有 5 筆 `Published: true` 公告；將桌機公告從會換行的 Grid 改回單列水平拖曳，避免第 5 筆掉到卡片下方。移除卡片 hover 右下角可點擊箭頭與首頁右上角「更多」連結，改為僅在右側仍有未瀏覽公告時顯示不可點擊的 `…` 溢位提示，拖到最右側或無後續資料時隱藏；同步移除 SEO 初始卡片箭頭。更新首頁 CSS／JS cache-busting；已用 Edge 實際檢查桌機與 `390x844`，確認 5 筆資料維持單列、水平資料寬度大於視窗、溢位提示可顯示且頁面無水平溢位；已完成 `dotnet build -c Release`（0 warnings／0 errors）；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依回饋修正首頁公告列：公告標題恢復使用 `var(--color-text-primary)` 深色，桌機改為四欄等寬 CSS Grid，統一卡片內距、公告類別／日期起始位置與標題兩行高度；手機保留橫向滑動列。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認四欄寬度與文字起始位置一致、標題為深色、手機可橫向瀏覽且無頁面水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依回饋修正首頁公告列細節：將水平邊線統一為公告列表上方單一 `var(--color-border)`，移除標題底線與卡片間垂直邊線；公告類別與日期統一為 `var(--font-size-body-sm)`、`var(--font-weight-normal)`、`var(--color-text-muted)`，標題改用 `var(--color-primary)`；更新首頁 CSS cache-busting。已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認 5 筆公告可渲染、邊線狀態與文字計算樣式一致，且無水平溢位；已完成 `dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 將首頁最新消息改為緊接 Hero 的輕量公告列：移除公告圖片卡片與深藍背景，改用既有 `--color-surface-soft`、`--color-text-primary`、`--color-border`、`--color-primary` 與按鈕／字級 token；保留現有新聞 API、連結、鍵盤操作與手機橫向滑動。Hero 高度改用 `svh` 依瀏覽器高度適配，讓 Hero 與完整公告區塊在首屏盡量同時可見；更新首頁 CSS cache-busting。已用 Edge 實際檢查本機 ASP.NET 路由 `1440x1000`、`1024x768`、`390x844`，確認公告列底部均在首屏內、5 筆公告可渲染且三種尺寸均無水平溢位；已完成 `dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

## 2026-09-18

- [x] 依需求將首頁「關於亞太」區塊上下外距改用首頁共用 `--home-section-space`／`--home-section-space-sm`，保留內部文字節奏、圖文排列與點陣圖定位；更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認桌機使用約 `79.2px`、手機使用 `48px` 全域間距，手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 修正首頁「關於亞太」的「了解更多」icon，改用與最新消息「更多」按鈕相同的向右箭頭 SVG path；按鈕其他樣式不變。已用 Edge 實際確認兩個 SVG path 一致，並完成 `git diff --check`；未 commit。

- [x] 依需求將首頁「關於亞太」的「了解更多」按鈕對齊最新消息區塊「更多」樣式：白底、邊框、尺寸、字級、箭頭間距與 hover／focus 行為一致；手機維持同樣按鈕比例。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認兩者計算樣式一致，手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求僅恢復首頁「最新消息」卡片圓弧：桌機 `24px`、手機 `20px`；其他首頁圖片／卡片／按鈕圓角 token 與 Hero 右下角設定不變。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認卡片圓弧與手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求統一首頁圓角 token：圖片使用 `--radius-lg`、卡片使用 `--card-radius`、按鈕／文字連結使用 `--button-primary-radius`；保留 Hero 右下角 `12px`、圓形／膠囊控制、指示線與 About 弧形背景的既有語意造型。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認圖片 `8px`、卡片 `6px`、按鈕 `4px` 且 Hero 手機右下角仍為 `12px`，手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求將首頁「關於亞太」區塊背景改為全域淺灰 `--color-surface-soft`，保留 `::after` 點陣圖規則不變，圖片改用全域 `--radius-lg` 圓角；更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認背景色、圖片 `8px` 圓角、點陣圖仍載入，手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求恢復首頁「關於亞太」圖文搭配：標題文字維持不變，桌機改為左側單一段落與左對齊按鈕、右側 `09.png` 圖片，手機改為上下堆疊；關係企業區塊未變。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認左右／上下排列、段落左對齊、圖片載入與手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求移除首頁 `.home-page .home-intro-section::before` 及其響應式規則，保留 `::after` 點陣地圖層與 section 原有底色；更新首頁 CSS cache-busting，`git diff --check` 通過；未 commit。

- [x] 依使用者要求撤回本輪地球球體實驗，恢復首頁「關於亞太」的 `v52` 平面點陣地圖、壓平弧面與置中段落；Edge 桌機 `1440x1000`／手機 `390x844` 複驗無水平溢出且段落中心對齊；未 commit。

- [x] 修正首頁 `home-intro__description` 內部段落未置中的問題：保留段落文字左對齊，將受 `max-width: 50rem` 限制的 `<p>` 水平置中；更新首頁 CSS cache-busting。已完成桌機／手機瀏覽器複驗與 `git diff --check`；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求調整首頁「關於亞太」：保留單一左對齊段落與原關係企業區塊，將地球弧面壓平並縮短弧頂至標題的距離；地圖改為左右較清楚、中央文字區淡化，桌機弧面內距約 `115px`、手機約 `68px`。已以 Edge 實際檢查 ASP.NET 路由桌機 `1440x1000` 與手機 `390x844`，確認標題／段落／按鈕在弧面內、手機無水平溢出、關係企業未變；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 將關於亞太標題、單一段落與按鈕置於地球弧面內：弧面改為從 section 上緣覆蓋全區，隨內容高度伸展，桌機與手機保留弧頂內距並降低地圖透明度。關係企業維持原樣。git diff --check 通過；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

- [x] 依使用者要求撤回上一輪關於亞太／關係企業整合樣式，恢復 v46 的地圖、圓弧、間距與 Logo 展示方式；保留公司介紹單一段落。git diff --check 通過；未進行瀏覽器驗證，未 commit。
- [x] 合併首頁「關於亞太」的兩段公司介紹為同一個敘述段落，移除第二段專用的段落間距規則，保留原文字內容與版面對齊，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依使用者回饋收回首頁 About 區塊調整幅度：內容容器調整為 `1040px`、敘述區塊 `960px`，弧面高度與向上延伸幅度縮小，降低地圖的尺寸與視覺重量，保留文字左對齊與地圖素材，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依參考圖片調整首頁「關於亞太」區塊的文字與左右留白，內容容器放寬至 `1120px`、敘述區塊至 `1040px`；地球弧面改為固定於區塊底部並向上延伸至內容背景，保留敘述文字左對齊，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 修正首頁「關於亞太」地球圓弧漂移問題，改以 `--home-intro-curve-height` 同時控制 section 底部留白與弧面高度，讓弧面固定從內容區塊之後開始；移除依賴內容高度的 `top` 定位，並同步處理平板／手機版，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 調整首頁「關於亞太」內容與背景層次，將敘述區塊最大寬度收窄至 `820px`，並將圓弧／世界地圖起點下移至按鈕之後，避免背景穿過敘述與 CTA；同步調整桌機、平板與手機弧度，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 調整首頁「關於亞太」HTML／CSS 結構，拆分為標題、敘述與按鈕三個區塊；敘述區塊置中但維持段落文字左對齊，標題與按鈕維持置中，並修正後段覆寫規則與按鈕重複間距，更新首頁 CSS cache-busting。已執行 `git diff --check`、首頁 JS 語法檢查與 CSS 括號檢查；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 參考提供的地球圓弧版型，將首頁 About 背景弧面與世界地圖區域往上收斂，桌機提高中央弧面落差，手機同步提前弧面起點並加大垂直弧度；保留既有地圖素材與文字內容，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 首頁「關於亞太」改為置中標題與單一 `home-intro__copy` 內容區塊，移除 `home-intro__media` 圖片 HTML／CSS、保留文字與 CTA；背景世界地圖 pseudo-element 定位與樣式未修改，更新首頁 CSS cache-busting。已執行 `git diff --check` 與舊 selector 靜態檢查；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 提高首頁服務卡片標題／敘述區塊底部遮罩濃度，位置維持 `60%／80%／100%`，黑色濃度調整為 `18%／45%／84%`；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 首頁服務卡片標題與敘述改用全域字級 token：桌機標題使用 `--font-size-card-title`、手機使用 `--font-size-card-title-compact`，敘述使用 `--font-size-card-description`；與首頁最新消息文字系統對齊，更新 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依使用者澄清，維持服務卡片遮罩位置 `43%／60%／80%` 不變，僅提高黑色濃度至 `12%／36%／78%`，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依使用者再次回饋，將首頁服務卡片遮罩再往上移至 36% 起始，調整中段為 54%／76%，底部濃度維持 70%；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依首頁服務卡片實際畫面，將底部深色遮罩起點由 48% 提前至 43%，中段調整為 60%／80%，保留底部 70% 濃度與卡片尺寸；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依參考版型收斂首頁服務卡片桌機群組寬度至 `1200px`，保留三欄配置；手機版取消最大寬度限制並維持單欄滿容器，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 將首頁服務卡片深色遮罩調淡並集中至底部：移除整張圖片的 per-card tint，改為上半部透明、底部最高 70% 黑色的單一垂直漸層；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依使用者要求恢復首頁服務卡片原本的深色圖片遮罩，還原各卡片 tint、白色標題／說明／箭頭與底部深色漸層；保留整卡連結與 hover／focus 箭頭互動，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 首頁服務卡片保留上方圖片，將底部文字區改用與最新消息一致的實色冷灰藍漸層，標題、說明與右下角箭頭改為深色以提升可讀性；移除原滿版深色遮罩與未使用的服務 tint 變數，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 統一首頁最新消息公告類別與日期文字大小，`home-latest__meta span`／`home-latest__date` 均使用 `var(--font-size-body-sm)`（14px）；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 移除首頁最新消息公告類別 `home-latest__meta` 的背景色，保留類別文字、間距與日期樣式；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 首頁「我們的服務」移除 `home-services-compare__actions` 文字連結與對應 CSS，將三張服務卡片改為整卡連結，右下角沿用最新消息的 24px 線條箭頭，僅於 hover／鍵盤 focus 顯示；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 將 `wwwroot/js/site.js` 的 `var` 改為區塊作用域的 `const`／`let`，同步修正迴圈事件 callback 的變數作用域；未改變功能流程；已執行 `node --check wwwroot/js/site.js` 與 `git diff --check`；未進行瀏覽器、手機、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 補充 `site.js` 的圖片解碼與頁面載入流程註解，未變更執行邏輯；已執行 `node --check wwwroot/js/site.js` 與 `git diff --check`；未進行瀏覽器、手機、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 透過實機焦點畫面與計算樣式定位首頁最新消息箭頭問題：箭頭 hover／focus 時 opacity 已為 1，但被舊規則覆寫為白色，於白色卡片上不可見。最終顯示規則改為固定深色，保留 opacity／位移。重新載入本機首頁後以鍵盤 focus 實機確認右下箭頭深色可見；hover 與 focus 共用同一最終顯示規則。更新 CSS cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。

- [x] 依實際桌機首頁畫面確認最新消息卡片 hover 箭頭未顯示後，將事件委派改為每張卡片直接綁定 mouseenter／mouseleave；初始伺服器卡片與 API 重繪卡片都會綁定，拖曳結束仍清除狀態。更新 JavaScript cache-busting；待執行靜態檢查與實際 hover 複驗；未 commit。

- [x] 修正首頁最新消息卡片 hover 箭頭未顯示：新增滑鼠進入／離開卡片的 JavaScript 狀態 class，CSS 以該狀態或鍵盤 focus 顯示右下箭頭；拖曳結束時清除狀態。更新 CSS／JavaScript cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；hover 畫面、手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。

- [x] 補做首頁最新消息功能確認：本機首頁實際載入 5 張卡片，橫向列寬大於容器；點擊上一則後，下一則控制恢復可用，確認輪播控制可切換；瀏覽器 console 無錯誤，DOM 確認每張卡片均含右下箭頭 SVG。hover 視覺顯示、手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。

- [x] 修正首頁最新消息卡片 hover 右下箭頭未出現：伺服器端卡片原本缺少箭頭標記且仍輸出圖片／摘要，現改為與 JavaScript 卡片相同的分類、日期、標題與線條右箭頭結構，讓前端 API 尚未完成載入時也能顯示。更新 CSS cache-busting，`dotnet build -c Release` 0 warnings／0 errors、`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器驗證；未 commit。

- [x] 依使用者澄清，恢復首頁最新消息右上角「更多」原本的膠囊外框、白底與細邊線；保留線條式 `>` chevron，避免 SVG 顯示為實心三角形。更新 CSS cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器驗證；未 commit。

- [x] 修正首頁最新消息右上角「更多」控制：移除不符合設計的膠囊外框，改為純文字連結；將 SVG fill 明確設為 none，固定顯示線條式 `>` chevron。更新 CSS cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器驗證；未 commit。

- [x] 移除首頁最新消息卡片列滑鼠移入時的左右晃動，保留 grab／grabbing 游標；標題右上角「更多」改用單純的 `>` 型 chevron 圖示。更新 CSS／JavaScript cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器驗證；未 commit。

- [x] 首頁最新消息卡片依參考圖調整：標題右上角的「更多」使用共用標準右箭頭，卡片第一列為分類與日期、第二列為標題，降低卡片高度，右下箭頭只在 hover／鍵盤 focus 顯示；滑鼠每次移入消息列時播放一次左右晃動提示並顯示 grab／grabbing 游標。首頁伺服器與 JavaScript 載入上限均提高為最新 8 則，現有公開消息可完整加入橫向拖曳列。已更新 CSS／JavaScript cache-busting，`dotnet build -c Release` 0 warnings／0 errors、`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

- [x] 依提供參考圖將首頁 Hero 下方「最新消息」由公告列恢復為可橫向瀏覽的白色文字卡片：日期置頂、標題置中段落、分類與箭頭置底，卡片列下方保留了解更多與左右輪播控制；恢復 JavaScript 最新三則資料載入，停止建立與載入新聞圖片。更新首頁 CSS／JavaScript cache-busting，已執行 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`；尚未進行桌機／手機瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

- [x] 標題層級統一使用 `--font-weight-heading: 500`，未修改一般文字、按鈕或其他共用角色的字重 token；已執行 `git diff --check` 與 `dotnet build -c Release`；未進行瀏覽器、手機、跨瀏覽器與完整人工無障礙驗證；未 commit。
- [x] 全站移除公開頁面與管理後台的英文小標 HTML 標記及對應 CSS 規則，保留標題、內文與功能；已執行 `git diff --check` 與 `dotnet build -c Release`；未進行全站瀏覽器、手機、跨瀏覽器與完整人工無障礙驗證；未 commit。
- [x] 首頁關係企業卡片改為桌機預設只顯示 Logo，hover／鍵盤 focus 顯示標題與敘述；觸控與手機維持文字可見。已執行 `git diff --check`；未進行瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。
- [x] 撤回關於亞太文字區的白色閱讀層，改以地圖／圓弧起點下移避開標題與段落，讓背景裝飾從內容下方自然展開；保留主要按鈕樣式。更新 CSS cache-busting，已執行 git diff --check；待重新瀏覽器驗證。未 commit。
- [x] 完成撤回後驗證：Edge 桌機畫面確認文字區恢復透明、地圖自內容下方展開，主要按鈕維持深色 48px；DOM 確認文字區背景透明且桌機無水平溢出。手機尺寸測試頁亦確認無水平溢出；因瀏覽器尺寸重設時截圖回到預設寬度，手機畫面細節未作為通過依據。實體裝置、跨瀏覽器與完整人工無障礙未驗證；未 commit。
- [x] 提高首頁關於亞太可讀性：降低點陣地圖在文案區的對比，為文字內容增加白色閱讀層；恢復「了解更多」使用主要按鈕的深色底與橘色 hover，避免按鈕融入背景。更新 CSS cache-busting。已執行 git diff --check；本次待重新進行桌機／手機瀏覽器驗證。未 commit。
- [x] 補做首頁關於亞太可讀性驗證：Edge 1440×1000 與 390×844 畫面確認文案背景層、主要按鈕辨識度及無水平溢出；DOM 確認按鈕桌機／手機皆為 48px 深色底。實體裝置、跨瀏覽器與完整人工無障礙未驗證；未 commit。

- [x] 參考英業達地圖的滿幅延伸，調整首頁關於亞太／關係企業／CTA 銜接：點陣地圖依背景全寬縮放並提高辨識度，圓弧與淡出終點收於區塊內，增加圖片下方地圖展示空間；關係企業上方留白改為 24px、下方桌機 40–64px／手機 40px，銜接 CTA。保留既有 SVG、白色企業區塊及輪播互動。已以 Edge 1440×1000、390×844 畫面及 DOM 確認地圖淡出、企業與 CTA 排版、無水平溢出；git diff --check 通過。實體裝置、跨瀏覽器及完整人工無障礙未驗證；未 commit。

- [x] 最新消息卡片底部長箭頭改為 20px SVG mask 右向 chevron（> 型），保留橘色、hover／focus 向右位移與 reduced-motion，更新 CSS 版本。git diff --check 通過；本次未進行桌機／手機瀏覽器及跨瀏覽器驗證。未 commit。

- [x] 依使用者要求撤回最新消息淡藍灰漸層試套，恢復原本 color-surface-soft 背景、了解更多 medium 字重與試套前 CSS 版本；保留先前卡片分隔線、hover 及閱讀更多調整。git diff --check 通過；未重新進行瀏覽器驗證，未 commit。

- [x] 試套最新消息背景為關係企業卡片相同的淡藍灰漸層（#edf0f5／#e3e8ef／#d8e0e9），保留直線分欄；了解更多字重降為 400，並更新 CSS cache-busting。git diff --check 通過；本次未進行桌機／手機瀏覽器及實體裝置驗證，視覺效果待確認。未 commit。

- [x] 最新消息最後一張卡片補右側分隔線（手機不顯示直線）；了解更多 hover／focus 改為與關於亞太一致的透明背景、橘色文字、底線展開與斜箭頭位移。卡片底部改為閱讀更多與箭頭並略縮高度。已執行 git diff --check；本次桌機／手機瀏覽器、hover 實測與實體裝置未驗證。未 commit。

- [x] 確認首頁最新消息伺服器輸出最多三則，並將 JavaScript 備援載入上限同步改為三則；消息列表頁不變。已執行 node 語法檢查與 git diff --check；本次未重新建置或瀏覽器驗證，執行中的舊版伺服器需重新啟動以載入既有 C# 上限修改。未 commit。

- [x] 首頁最新消息「查看全部」改為「了解更多」，套用關於亞太的文字連結樣式；消息分類／日期移至標題上方，卡片箭頭於 hover／focus 向右移動 6px，並支援 reduced-motion。已以 Edge 桌機 1366×900、手機 390×844 畫面與 DOM 確認順序及無水平溢出，鍵盤 focus 的箭頭位移已確認；滑鼠 hover、實體裝置、跨瀏覽器與完整無障礙人工驗收未驗證。未 commit。

- [x] 依使用者提供的緯創圖片將 Hero 下方最新消息改為橫向分欄公告帶：左側標題與查看全部，右側各則消息以直線分隔、標題在上、日期／分類在下並加上箭頭；依實際消息數平均分欄，手機改為上下排列。Edge 1366×900／390×844 實際畫面與 DOM 確認換行、鍵盤焦點及無水平溢出，`git diff --check` 通過。現有兩則公開消息，三則資料、實體裝置、跨瀏覽器與完整人工無障礙尚未驗證；未 commit。
- [x] 補做首頁公告列 Edge 實際畫面驗證並修正兩項舊樣式殘留：清除公告內文固定列高，消除每則消息下方大段空白；恢復手機標題群組並固定查看全部連結不拆字。1366×900 桌機、768×900 平板、390×844 手機畫面及 DOM 確認 Hero／公告／服務順序、對齊、換行與無水平溢出，點擊公告可進入對應詳細頁。目前公開資料為兩則，尚未實測三則資料版型；實體裝置、跨瀏覽器與完整人工無障礙驗收未驗證。更新 CSS cache-busting，`git diff --check` 通過；未 commit。
- [x] 將首頁最新消息移至 Hero 下方、服務項目上方，參考提供圖片改為淺灰公告列：桌機左側標題／查看全部、右側最新三則日期／分類／標題，手機改為上下排列；不顯示新聞圖片並停用該區輪播與進場隱藏，保留伺服器輸出及無 JavaScript 閱讀。Release 隔離輸出建置 0 warnings／0 errors、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過，靜態確認區塊順序與唯一資料標記。尚未進行桌機／手機瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。
- [x] 將首頁關係企業區塊背景明確固定為白色，避免受到全域背景 token 變更影響，並更新 CSS cache-busting。已完成 `git diff --check`；尚未進行瀏覽器桌機／手機、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。
- [x] 依英業達首頁的視覺方向調整首頁「關於亞太」背景：保留既有 `world-dot-map-plain-light.svg`，放大並下移點陣地圖、提高可見度與向下延伸範圍，重新調整淺灰半圓弧的起點、垂直半徑與底部銜接，並更新 CSS cache-busting。已完成 `git diff --check`；尚未進行瀏覽器桌機／手機、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

## 2026-09-17

- [x] 加強首頁「關於亞太」地球圓弧曲率：縮小背景水平外擴並加大垂直半徑，讓中央至兩側的落差更明顯，保留標題下方起點與底部淡出；同步調整手機曲率與 CSS cache-busting。Edge 1432px／390px 畫面確認、1920px DOM 檢查，無水平溢出；子代理完成曲率與圓角高度風險審查，`git diff --check` 通過。未驗證實體裝置、跨瀏覽器與人工無障礙；未 commit。
- [x] 將首頁「關於亞太」背景圓弧下移至標題下方，桌機提高弧面起點，平板／手機依既有內容留白與圖片比例定位；更新 CSS cache-busting。Edge 1432px／390px 畫面確認標題留在白底，圓弧最高點分別低於標題約 25px／15px；768px DOM 確認弧面低於標題，三尺寸無水平溢出；子代理審查響應式定位公式，`git diff --check` 通過。未驗證實體裝置、跨瀏覽器與人工無障礙；未 commit。
- [x] 參考英業達首頁的弧面背景，將首頁「關於亞太」長方形灰底改為白底上的寬幅淺灰弧面，地圖移至下半部並降低濃度、上下淡出，下緣回到白色銜接最新消息；保留原圖文與內容順序，調整桌機／手機區塊留白並更新 CSS cache-busting。主代理完成 Edge 實際路由 1432px、1024px、768px、390px 畫面與 DOM 檢查，確認雙欄／單欄、背景銜接、文字可讀及無水平溢出；子代理完成 CSS 差異、層級、裝飾不攔截操作與響應式規則審查；`git diff --check` 通過。實體裝置、跨瀏覽器、完整進場動畫與人工無障礙尚未驗證；未 commit。
- [x] 將關係企業輪播箭頭改為沿用最新消息共用的 SVG 箭頭（18px、1.8px 線寬、圓角端點），修正文字箭頭造成的粗細差異；完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`，未 commit。
- [x] 將首頁關係企業左右切換按鈕調整為與最新消息一致的 48px 圓形、透明背景、細邊框與箭頭字級；完成 `git diff --check`，未 commit。
- [x] 重新整理首頁關係企業視覺節奏：縮短標題與 Logo 列距離，將左右輪播按鈕移至卡片下方，並保留桌機滿版四欄與手機響應式排版。完成 `git diff --check`，未 commit。
- [x] 調整首頁關係企業卡片 hover：Logo 收入淺色卡片內並靠近公司名稱，卡片改用 `#edf0f5` 冷灰藍漸層，名稱與敘述改為深色；同步處理手機狀態。完成 `git diff --check`，未 commit。
- [x] 將首頁關係企業輪播改為無縫由右至左循環：補上開頭 Logo 的循環副本，最後一組直接銜接第一組，不再整列跳回最左側；完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`，未 commit。
- [x] 重整首頁關係企業輪播：展示列改為滿版四欄，左右保留 5vw 內距；輪播由一次跳四張改為每次平移一張並循環，避免六張資料在第二組只剩左右兩張的空缺。完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`，未 commit。
- [x] 修正關係企業 Logo 間距視覺不明顯的問題，將桌機輪播展示列向左右延伸 160px，減少內容容器左右留白；980px 以下恢復原容器寬度。完成 `git diff --check`，未 commit。
- [x] 放寬首頁關係企業桌機 Logo 卡片間距至 40px，並加入每 5 秒自動切換、到最後一組後循環回第一組；滑鼠 hover、鍵盤 focus 與 reduced-motion 會暫停自動播放。已完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`，未 commit。
- [x] 恢復 ALPHA TOTAL SOLUTION Logo 的 hover 位置，改回與其他關係企業 Logo 相同的上移呈現；完成 `git diff --check`，未 commit。
- [x] 修正首頁關係企業第 6 張 ALPHA TOTAL SOLUTION 卡片的 hover／focus Logo 位置，改為留在深色框內並置於公司名稱上方；其他企業維持原本 Logo 上移效果。完成 `git diff --check`，未 commit。
- [x] 將首頁「關於亞太」世界地圖水平移至右側並下移，讓右側空白區承接地圖視覺，左側圖片與文字主要區域維持清楚；完成 `git diff --check`，未 commit。
- [x] 將 world-dot-map-plain-light.svg 背景放大並下移至區塊下方，讓下方留白能看見更多地圖點位；完成 `git diff --check`，未 commit。
- [x] 調整首頁「關於亞太」世界地圖背景定位至區塊底部，讓點位避開圖片與標題並填補下方留白；完成 `git diff --check`，未 commit。
- [x] 降低首頁「關於亞太」世界地圖對文字的干擾，於右側文字區加入淺色漸層遮罩，保留左側背景氛圍；完成 `git diff --check`，未重新進行瀏覽器驗證，未 commit。
- [x] 首頁「關於亞太」加入指定 world-dot-map-plain-light.svg 背景，保留淺灰底與既有圖文比例；背景不重複，手機限制地圖高度並靠下呈現。Edge 已檢視桌機與 390px 手機背景及文字排版，git diff --check 通過；未驗證實體裝置與跨瀏覽器，未 commit。
- [x] 移除首頁關係企業 Logo 的 CSS 白底、內距與圓角；縮短標題下方間距（104→80px）、卡片高度（420→330px）及 Logo／名稱留白，保留圖片上移與敘述顯示。Edge 已檢視桌機及 390px 手機畫面；手機 Logo 與文字無重疊，未另做滑鼠 hover、實體裝置或跨瀏覽器驗證。git diff --check 通過，未 commit。
- [x] 實際讀取緯創獲獎實績的圖片與 hover 結構，重整首頁關係企業 CSS：統一首頁無襯線中英文標題、原比例 Logo，圖片上移 100px 跨出圓角漸層背景，名稱與敘述延遲淡入；沿用 APLI 色系與六個企業輪播，手機直接顯示說明，補上無 JS 橫向閱讀及鍵盤焦點切換。Edge 已檢視桌機 focus 與 390px 排版；最後 Logo 白底修正未完成瀏覽器複驗，JS 語法及 diff 檢查通過，未 commit。

- [x] 依參考網站補強首頁關係企業：移除區塊說明段落，新增左右切換輪播按鈕以瀏覽六個企業，active 卡片改用 APLI 深藍與橘色，並將服務卡片標題字重固定為 500；已完成 JS 語法檢查、git diff --check，以及 Edge 桌機輪播與 active 卡片畫面確認，未 commit。

- [x] 依參考網站的獲獎實績展示方式重做首頁關係企業區塊：改為置中標題、寬留白、橫向 Logo 展示列，hover／focus 時以品牌色背景顯示描述；已校正六個既有企業 Logo 對應，Edge 桌機畫面與鍵盤 focus 展開狀態已確認，手機以響應式 CSS 檢查，未 commit。
- [x] 在首頁最新消息下方新增關係企業區塊，沿用既有六個企業 Logo 與簡介；後續依參考網站調整為橫向展示列，桌機 hover／focus 顯示敘述，手機保留可讀內容。已完成 git diff --check，Edge 桌機與鍵盤 focus 已確認，未 commit。
- [x] 撤回最新消息前移與精簡列表 UI，恢復原本位於「關於亞太」之後的最新消息輪播；已完成 node --check wwwroot/js/pages/home.js 與 git diff --check，未重新進行瀏覽器畫面驗證。
- [x] 重新設計首頁「關於亞太」為共用內容寬度的淺灰底雙欄區塊，照片採小圓角與 1.75 比例，文字垂直置中，CTA 改為靠左文字連結；清除本輪疊加的滿版與斜切覆寫，更新 CSS 版本。Edge 已檢視桌機與 390px 手機畫面，最終樣式確認 1912px 區塊高 456px、390px 連結靠左且兩者無水平溢出；另檢查 1366px 雙欄排版。`git diff --check` 通過；未驗證實體裝置、跨瀏覽器與完整人工無障礙，未 commit。
- [x] 將首頁「關於亞太」桌機版改為內縮容器與左右 50/50 圖文配置，修正圖片左側留白後的比例失衡；保留斜切效果與手機版滿寬；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 調整首頁「關於亞太」桌機版圖片左側留白，保留斜切效果；手機版維持滿寬；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 撤回上一個「關於亞太」UI 收斂步驟，恢復原本區塊高度、文字位置與服務區塊間距；保留 52/48 圖文比例、斜切效果與無邊線設定；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 收斂「關於亞太」UI：降低區塊實際高度、讓右側內容垂直置中並縮減右側留白，同時縮短服務區塊與關於亞太之間的空白；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除「關於亞太」區塊外圍邊線顏色，保留斜切圖片與左右圖文比例；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 依參考圖調整「關於亞太」左右圖文比例，將左側圖片由約 58% 縮至 52%，並同步調整右側文字起始位置；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 修正斜切圖片遮住右側文字的問題，將文字內容右移並降低「關於亞太」桌機區塊高度至約 360–420px；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 修正斜切版面圖片被文字面板覆蓋的層級問題，讓左側圖片與右側文字同時呈現；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 修正「關於亞太」斜切版面，改由圖片本身裁切出斜角右邊界，右側文字面板完整延伸；手機版維持矩形上下排列；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將首頁「關於亞太」改為參考圖的左圖右文斜切版面，右側加入淺色文字面板與外框 CTA，手機版改為無斜切上下排列；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 修正服務卡片文字因前次版型調整誤移至上方的問題，恢復文字固定於卡片底部；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 恢復首頁「關於亞太」至僅使用背景顏色的內容寬度雙欄版本，移除滿版圖片疊字與額外裝飾效果；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將「關於亞太」改為真正的滿版圖片面板，標題與介紹文字疊在圖片上，使用白字與深色漸層確保桌機／手機可讀性；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將首頁「關於亞太」改為標題下方的寬幅背景圖文疊合版，文字置於圖片上的暗色漸層區，手機版改用由下往上的漸層以維持可讀性；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除首頁「關於亞太」桌機文字區的橘色垂直引導線與左側內距，手機版上方分隔線維持不變；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除「關於亞太」標題下方的橘色識別線，保留區塊背景與文字區引導線；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除「關於亞太」區塊的橘色背景光暈，保留冷灰藍背景與結構性橘色識別線；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 強化首頁「關於亞太」區塊的視覺層次，加入淡品牌光暈、標題橘色識別線與文字區品牌引導線，並調整手機版為上方引導線；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 為首頁「關於亞太」區塊加入低對比冷灰藍漸層背景與淡邊界，增加段落層次但保留現有主視覺圖片；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將首頁 `home-hero-title` 桌機字重固定恢復為 `500`，避免受到全域標題字重調整影響；手機版維持原有設定，已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除首頁「以客為尊，專業服務」與 `OUR APPROACH`，改為區塊置中的 `ABOUT APLI／關於亞太` 標題組，並清理 `home-intro__subtitle` HTML／CSS；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 調整首頁服務卡片的標題、敘述與「查看服務」連結層級，將卡片連結改為較小且較輕的文字導覽樣式，不影響全域主要按鈕；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 縮短首頁服務區塊標題與卡片的間距，並將卡片藍色遮罩改為中性暗色遮罩；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除首頁「我們的服務」區塊的補充說明文字，並清理對應的桌機／手機 CSS；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將全域中等字重由 `500` 調整為 `600`，讓全站標題與卡片標題更清晰醒目；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 調整首頁區塊順序，將「我們的服務」移至 Hero 後，並將「以客為尊，專業服務」移至服務區塊後，補上 `OUR APPROACH` 眉標與 `home-intro-title` 標題關聯；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除非首頁 Hero 圖片隨頁面上下捲動產生的垂直位移，保留圖片載入時的縮放動畫；已完成 `git diff --check`、`node --check wwwroot/js/site.js`，未進行瀏覽器畫面驗證。

## 2026-09-16

- [x] 恢復共用 Hero 圖片載入完成後由放大比例回到正常比例的 `transform` 過渡效果；已完成靜態 CSS 檢查與 `git diff --check`，未進行瀏覽器畫面驗證。
- [x] 確認 `careers.js` 未被任何頁面載入，且福利輪播 `data-*` 標記未在其他檔案使用；移除已停用的舊福利輪播程式。已完成全專案文字引用檢查與 `git diff --check`，未進行瀏覽器畫面驗證。

## 2026-09-14

- [x] 將首頁 `.home-services-compare__heading h2`、`.home-latest h2`、`.home-intro h2` 與 Company History `.milestones-section-heading h2` 字級調整為與其他主要頁面區塊標題一致的 `clamp(1.875rem, 2.3vw, 2.5rem)`，首頁主要內容 H2 字重統一為 `--font-weight-medium`；Company History 在 `768px` 以上將時間軸事件標題提升為 `--font-size-body-lg`、說明提升為 `--font-size-body`，手機維持原尺寸；首頁服務卡片依原圖色調套用低濃度中性藍灰遮罩，第二張略加強並共用底部深藍漸層，使圖片保留自然色彩且維持一致主題；移除首頁最新消息圖片卡片遮罩及相關 Hover 規則；已更新兩頁 CSS cache-busting 並執行 `git diff --check`，未進行瀏覽器畫面驗證。

## 2026-09-13

- [x] Company History 時間軸改為與 About 認證與獎項一致的水平資訊瀏覽 UI，移除 `milestone-tabs__track` 年份切換，只保留左右控制；資訊直接呈現、資訊區取消背景色，同年份多筆資訊以 24px 間距及灰色虛線區隔，移除先前加入的品牌 Logo 背景，保留原 HTML 沿革內容作為停用 JavaScript 時的可讀 fallback。已完成 CSS／JavaScript cache-busting；ASP.NET 實際路由瀏覽器桌機 1440px、平板 1024px、手機 390px 確認左右按鈕、最後 1970s 邊界、透明資訊區、同年份資訊間距與虛線、文字內容、卡片寬度與無文件水平溢出；`dotnet build -c Release`、`node --check wwwroot/js/pages/company-history.js`、`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證。
- [x] About「認證與獎項」區塊同一年份的多筆紀錄加入 18px 間距與灰色虛線分隔；已完成 CSS cache-busting，瀏覽器桌機與手機版確認分隔樣式；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證。
- [x] 首頁「我們的服務」區塊移除背景顏色，並收斂與「以客為尊，專業服務」區塊交界的上下留白；已完成 CSS／cache-busting 調整。瀏覽器桌機 1432px 與手機 390px 均確認背景透明、間距生效且無水平溢出；`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證。
- [x] P1 首頁／關係企業 heading 層級與首頁 CSS 間距覆寫整理完成；首頁將「以客為尊，專業服務」及關係企業首層企業標題調整為 H2，並移除已被最終規則覆蓋的首頁舊間距宣告。首頁最新消息少量卡片填滿網格的實驗已依視覺需求撤回，恢復原本橫向卡片尺寸。已完成 cache-busting；ASP.NET 實際路由瀏覽器桌機 1440px、平板 1024px、手機 390px 確認服務區塊透明背景、原有手機滑動卡片與無水平溢出；`dotnet build -c Release --no-restore`、全頁 JavaScript `node --check`、`git diff --check` 通過。實體裝置、跨瀏覽器、Lighthouse／axe 與人工無障礙尚未驗證。
- [x] About 公司簡介 `about-profile` 依參考版型改為左側文字敘述、右側三張不規則背景影像卡片；左側標題改為「ABOUT APLI／關於亞太」標題群組，使用與「OUR PHILOSOPHY／經營理念」相同的 eyebrow `4px` 下間距，標題至內文的局部間距調整為 `24px`，影像區改為左右配置，左欄直立並以完整鋪滿、調整 Logo 至視覺中心的公司大樓背景圖顯示「創立於」，三張卡片統一使用深色漸層與白色文字，右欄上下分別顯示「員工數／營運場規模」，以下方較高的營運場規模卡片保留不規則設計感，保留原本 `dt/dd` 語意與計數動畫。已完成 cache-busting；ASP.NET 實際路由瀏覽器桌機 1440px、平板 1024px、手機 390px 確認標題層級、標題群組間距、卡片比例、文字／數據順序、背景影像與無水平溢出；`dotnet build -c Release --no-restore`、全頁 JavaScript `node --check`、`git diff --check` 通過。實體裝置、跨瀏覽器、Lighthouse／axe 與人工無障礙尚未驗證。

## 2026-09-11

- [x] 依 About 標題基準統一 Services 與 Occupational Safety 的標題群組間距、英文小標題下距與標題字體；尚未進行瀏覽器畫面驗證。
- [x] 以 About 標題樣式為基準統一人才招募頁標題群組的間距、英文小標題下距與中文標題字重；尚未進行瀏覽器畫面驗證。
- [x] 修正「加入亞太」英文小標題間距被 `.join-intro > div` 的 `20px` grid gap 覆蓋問題，改為與 `BENEFITS／公司福利` 一致；尚未進行瀏覽器畫面驗證。
- [x] 統一人才招募頁 `JOIN US／加入亞太` 與 `BENEFITS／公司福利` 的英文小標題間距，移除額外的 4px 下方間距；尚未進行瀏覽器畫面驗證。
- [x] 縮短 `.join-benefits-heading` 與福利表格的間距，並為「加入亞太」標題補上 `JOIN US` 英文小標題；尚未進行瀏覽器畫面驗證。
- [x] 移除人才招募頁 `.join-section-heading h2::after` 裝飾線及其預留間距；尚未進行瀏覽器畫面驗證。
- [x] 移除服務頁 `.service-section__heading h2::after` 裝飾線及其預留間距；尚未進行瀏覽器畫面驗證。
- [x] 移除職業安全衛生頁 `.safety-credentials__heading h2::after` 裝飾線及其預留間距；尚未進行瀏覽器畫面驗證。
- [x] 調整營運資源頁行動版 `resource-link`，改為與首頁「了解更多」相同的非全寬文字連結排列；尚未進行瀏覽器畫面驗證。
- [x] 將營運資源頁 `resource-link` 的 SVG icon 改為與首頁「了解更多」相同的外開箭頭；尚未進行瀏覽器畫面驗證。
- [x] 將營運資源頁 `resource-link` 按鈕改為首頁「了解更多」的文字連結樣式，包含底線展開與箭頭 Hover 效果；尚未進行瀏覽器畫面驗證。
- [x] 恢復營運資源頁「地理優勢」標題搭配的英文小標題 `LOCATION`；尚未進行瀏覽器畫面驗證。
- [x] 移除營運資源頁兩組標題 `h2::after` 裝飾線規則；尚未進行瀏覽器畫面驗證。
- [x] 同步移除營運資源頁標題為裝飾線預留的下方間距；尚未進行瀏覽器畫面驗證。
- [x] 移除職業安全衛生頁面的 `PROFESSIONAL CERTIFICATIONS` 英文小標題；尚未進行瀏覽器畫面驗證。
- [x] 將新聞詳細頁 Hero 圖片改用 `news-detail-hero.jpg`，並更新 HTML 引用；尚未進行瀏覽器畫面驗證。

- [x] 新聞附件下載回應補上原始檔名，避免瀏覽器以雜湊檔名並在重複下載時追加 `(1)`；已完成 Release 建置與差異檢查，尚未進行瀏覽器驗證。

## 2026-09-07

### 最新消息卡片預設背景與連結位置

- [x] 首頁最新消息卡片「查看更多」恢復左側；預設公告資訊背景改為右側裁切並降低預設遮罩，保留 AP 標誌與背景波紋。
- [x] 首頁最新消息卡片 Hover 時取消標題底線，背景圖片放大至 `1.05`，並降低一般圖片與預設圖片的漸層遮罩濃度。
- [x] 首頁最新消息卡片依預設圖／上傳圖分流文字色與標籤背景，並讓 SSR 與前端渲染使用相同圖片狀態 class。
- [x] 首頁最新消息預設圖移除藍灰漸層遮罩，保留上傳圖片卡片的深色遮罩與白色文字。
- [x] 首頁最新消息卡片統一卡片、media、圖片與遮罩圓角，並將預設圖「查看更多」改用 `var(--color-text-body)`。
- [x] 首頁最新消息卡片改由外層單一圓角裁切滿版圖片，避免內外層圓角反鋸齒造成四角暗邊。
- [x] 首頁最新消息卡片外層改為透明背景，避免滿版圖片圓角裁切邊緣露出深色 fallback。
- [x] 首頁上方最新消息卡片圓角與「掌握最新消息」卡片統一使用 `var(--radius-sm)`。
- [x] 首頁「我們的服務」圖片卡片外層改為透明背景，避免圓角反鋸齒邊緣露出深色 fallback。
- [x] 首頁移除「掌握最新消息」第二區塊，保留主要「最新消息」輪播。
- [x] 移除「掌握最新消息」專用 CSS、前端卡片產生函式與資料填充邏輯，避免保留無效程式。

### 已完成

- Footer 恢復原有桌機版型：Logo 置頂並加上分隔線、四欄導覽、最新消息歸入快速連結，以及深色底部版權列與右側法律連結。
- Footer 恢復原有色彩、字級、欄距與 Logo 尺寸；保留目前正式路由與手機版折疊互動。
- Footer 修正為原始上下兩列滿寬版型，Logo／分隔線與四欄導覽統一對齊 1324px 內容網格。
- Footer 選單標題改用一般字體；快速連結整合員工專區；新增可直接前往 `/news` 的最新消息標題選單；底部版權與法律連結左右位置對調。
- Footer 底部隱私權政策文字改為與選單子項目一致的字級、字重與行高。
- 最新消息 Footer 標題改為 500 字重；版權文字改為與隱私權政策一致的字級與字重。
- Footer bottom 改為以品牌主橘為核心的同色系深橘漸層，並將圓弧翻轉至右上角，讓底部維持直角。
- Footer bottom 右上圓弧改為橫向拉長的橢圓弧，桌機約 52px × 16px、手機 24px × 6px，保留品牌細節並降低切角感。
- Footer bottom 高度收斂為桌機 48px、手機約 64px，減少橘色區塊的厚重感並保留文字留白。
- Footer 手機版法律連結改為白色文字，桌機／筆電維持原有顏色。
- Footer 快速連結與最新消息欄位對調，最新消息位於快速連結之前。
- 首頁「我們的服務」卡片移除預設圖片遮罩，保留卡片內容與互動效果。
- 首頁「我們的服務」說明文字桌機字級調整為較收斂的 16–20px，手機維持 16px。
- 首頁「我們的服務」卡片改為直向滿版圖片、底部局部漸層、標題／說明／單一查看服務連結的圖片卡片版型。
- 首頁服務卡片桌機內容寬度收斂至網站主要內容寬度，降低三張卡片過大的視覺比例。
- 首頁服務卡片桌機內容寬度再收窄至 1200px，進一步降低卡片尺寸與視覺份量。
- 首頁「關於亞太」桌機內容寬度收斂至 1324px，改善大視窗下區塊過度展開的比例。
- 首頁「最新消息」桌機內容區固定為 1324px，卡片寬度上限固定為 380px，讓桌機與筆電視覺尺度一致。
- 首頁「最新消息」桌機輪播軌道從內容左側延伸至瀏覽器右側邊界，保留固定卡片尺度並消除右側空白。
- 首頁新增「最新消息-2」對比區塊，使用置中標題／媒體中心按鈕與三張圖片資訊卡片，卡片預設背景統一使用 `index/公告資訊.png`。
- 首頁「最新消息」卡片改為與「最新消息-2」一致的圖片背景卡片；有上傳圖片時使用該圖片，無圖片時使用 `index/公告資訊.png`，內容順序為類別／標題／日期／查看更多。
- 首頁「最新消息」卡片的「查看更多」改為與「關於亞太」的文字連結一致，並將連結位置下移至較接近卡片底部。
- 首頁「最新消息」卡片的日期與類別整合至同一個 `home-latest__meta` 橫列，並將該列微幅上移。
- 首頁「最新消息」卡片的 meta 順序改為日期／類別，日期改為數字格式；「查看更多」改為卡片內容區右側對齊。
- 首頁「最新消息」卡片的 meta 顯示順序調整為類別／日期，並取消過度上移，恢復與對比卡片一致的上方內距。

### 已驗證

- 瀏覽器桌機版：1912x948 確認 Footer bottom 使用約 52px × 16px 橢圓右上圓弧、底部直角，且無水平溢出。
- 瀏覽器手機版：390x844 確認 Footer bottom 使用 24px × 6px 橢圓右上圓弧、底部直角，且無水平溢出。
- 瀏覽器桌機／手機版：確認 Footer bottom 高度分別為 48px／64px，法律連結與版權文字未被裁切，且無水平溢出。
- 瀏覽器桌機／手機版：確認 Footer legal links 手機版為白色，桌機／筆電維持原有顏色。
- 瀏覽器桌機／手機版：確認 Footer 欄位順序為關於亞太、服務項目、營運資源、最新消息、快速連結。
- 瀏覽器桌機／手機版：確認首頁「我們的服務」卡片無預設遮罩，圖片與卡片內容正常顯示，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「我們的服務」說明文字桌機較小、手機維持 16px，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁服務卡片直向版型、底部內容與查看服務連結正常顯示，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁服務卡片保留單一查看服務連結、箭頭與底線互動，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁服務卡片縮小後比例與內容正常，手機版維持單欄，且無水平溢出。
- 瀏覽器桌機／手機版：確認服務卡片群組收窄後三張卡片內容正常、手機版維持單欄，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「關於亞太」桌機寬度為 1324px、手機版維持 40px 內距，且無水平溢出。
- 瀏覽器桌機／筆電／手機版：確認最新消息卡片桌機寬度上限 380px、手機版維持單卡橫向滑動，且無水平溢出。
- 瀏覽器桌機／筆電／手機版：確認最新消息輪播右側延伸至桌機／筆電視窗邊界，手機版維持單卡橫向滑動，且頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息-2」區塊標題、媒體中心按鈕、三張預設背景圖片卡片與最新消息資料正常顯示，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」卡片依類別／標題／日期／查看更多順序顯示，含圖與無圖資料分別使用上傳圖片／`index/公告資訊.png` 背景，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」查看更多連結位置、橘色短底線與 Hover 展開／箭頭位移效果正常，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」日期與類別同列顯示，meta 列位置正常，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」meta 依日期／類別順序顯示、日期不含英文月份，「查看更多」位於卡片右側，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」meta 依類別／日期順序顯示，meta 不貼近卡片上緣，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」查看更多恢復左側，無圖片或圖片載入失敗時顯示右側裁切的公告資訊預設圖與 AP 標誌，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認 Footer bottom 使用主橘核心的同色系深橘漸層，與 Hero 橘色線條及白色 Footer 背景搭配一致。
- Release 建置：`dotnet build -c Release --no-restore`，0 warnings／0 errors。
- JavaScript 語法檢查：`node --check wwwroot/js/site.js`，通過。
- 首頁 JavaScript 語法檢查：`node --check wwwroot/js/pages/home.js`，通過。
- 本次首頁最新消息卡片調整使用隔離輸出執行 Release 建置，0 warnings／0 errors；`git diff --check` 通過。
- 本次首頁最新消息卡片 SSR 狀態 class 與預設／上傳圖片文字樣式調整使用隔離輸出執行 Release 建置，0 warnings／0 errors。
- `git diff --check`：通過；所有公開頁面已更新 Footer／Token cache-busting 版本。
- 瀏覽器桌機版：1912x948 確認 Logo／分隔線／四欄導覽對齊 1324px 內容網格、深灰底部列與右側法律連結，且無水平溢出。
- 瀏覽器手機版：390x844 確認四欄初始收合、點擊可展開，且無水平溢出。
- 瀏覽器桌機／手機版：確認底部隱私權政策與快速連結子項目計算後同為 14.72px、400、24.288px。
- 瀏覽器桌機／手機版：確認最新消息標題為 500 字重，版權文字與隱私權政策字級／字重一致，且無水平溢出。

### 未驗證

- 實體裝置、跨瀏覽器、正式 IIS 與人工無障礙驗收。
- 本次最新消息卡片 Hover、圖片放大、遮罩濃度與預設／上傳圖片文字分流尚未完成桌機／手機瀏覽器實際驗證；本機瀏覽器拒絕存取 `http://localhost:5127/`。

## 2026-09-06

### 已完成

- Footer Logo 與聯絡資訊間距由 12px 調整為 20px，改善 Logo 與地址區塊過於靠近的視覺問題。
- Footer 聯絡資訊 SVG icon：縮小內部 padding 並允許線條完整繪製，避免電話圖示在圓形背景內顯示不完整。

### 已驗證

- Release 建置：`dotnet build -c Release --no-restore`，0 warnings／0 errors。

### 未驗證

- 瀏覽器桌機版、手機版與實體裝置的實際視覺驗收。

## 2026-09-04

### 已完成

- Services 頁面恢復至服務項目導覽連結修正時的原本排版，保留原有標題、實景圖片／輪播、主要服務項目與優勢區塊。
- Services「我們的優勢」改用既有副標題字級，優勢卡片標題改用 compact card title 字級，未修改全域 typography variables。
- Services 主要服務項目的箭頭 icon 改為參考 Affiliates 的 8px 品牌橘色小方形，並同步收窄 icon 欄位。
- Services 主要內容、優勢區、CTA 與 service-switcher 恢復原本寬度規則。
- Services 服務描述區移除下底線，保留原有內容間距與容器對齊。
- Services 移除「我們的優勢」副標題下方的品牌橘色底線，保留其他標題 accent 線。
- 全站 Header／Footer 的服務項目連結統一導向 `/services`，不再附帶區段錨點。
- 修正最新消息詳細頁圖片狀態 placeholder 混入 `class` 屬性的問題。
- 確保 `.site-container` 在有圖片與無圖片新聞詳細頁都能正常套用置中與響應式內距。
- 修正短內容新聞詳細頁的 Footer 未貼齊 viewport 底部問題。
- 保留有圖片／無圖片自適應方向，調整桌機雙欄比例與右側圖片垂直位置。
- 無自訂圖片時由伺服器端移除 media wrapper，避免留下 image column 或 placeholder。
- 恢復有自訂圖片時依序顯示文字、附件、圖片的垂直版型。
- 圖片沿用內容區下方的受控寬度，避免恢復垂直排列後放大成整欄圖片。
- 沿用既有 media marker 輸出圖片，兼容目前開發服務組件。
- 圖片輸出已恢復為附件下方的垂直 media 區塊，避免現有開發服務因組件版本差異而漏圖。
- News Detail 詳細頁：年份與類別改為置中且分開的背景標籤；標題下方恢復分隔線；內容、附件與圖片各自使用獨立背景區塊。

### 已驗證

- Release 建置：`dotnet build -c Release --no-restore -p:OutDir=.\obj\build-check\`，0 warnings／0 errors。
- JavaScript 語法檢查：`node --check wwwroot/js/site.js`、`node --check wwwroot/js/pages/news-detail.js`，通過。
- 瀏覽器桌機版：預設 1912px viewport，容器置中並與共用 Footer 對齊。
- 瀏覽器手機版：390x844，容器左右各 20px，圖片寬 335px。
- 有圖片與無圖片新聞詳細頁：容器與圖片狀態均正常。
- `git diff --check`：通過。
- 服務項目導覽連結靜態檢查：全站 Header／Footer 均導向 `/services`；首頁服務卡片的區段錨點保留。
- Services 原本排版瀏覽器桌機版：1366px 確認三個分頁皆保留標題、敘述、實景圖片／輪播、主要服務項目與優勢區塊，文件無水平溢出。
- Services 原本排版瀏覽器手機版：390px 確認三個分頁皆可切換，內容寬度 335px、圖片與清單單欄；倉儲與機具輪播控制點分別為 5 與 2 個，文件無水平溢出。
- Services 優勢字級瀏覽器檢查：1366px「我們的優勢」為 24px、卡片標題為 20px；390px 分別為 20px 與 20px，且無水平溢出。
- Services 服務項目 icon 瀏覽器檢查：桌機與手機三個分頁皆顯示 8px 小方形，使用品牌橘色且無水平溢出。
- Services 原本寬度瀏覽器檢查：1366px 主內容與 service-switcher 為 1280px，CTA 恢復共用容器寬度；390px 維持內容寬度 335px，無水平溢出。
- Services 優勢標題底線瀏覽器檢查：1366px 與 390px 三個分頁皆無該橘色底線，其他版面無水平溢出。
- Services 服務描述區瀏覽器檢查：1366px 與 390px 三個分頁皆無 description 下底線，且頁面無水平溢出。
- Release 建置：`dotnet build -c Release --no-restore -p:OutDir=.\\obj\\build-check-services-links-20260904\\`，0 warnings／0 errors。
- Footer sticky layout：1366x900 無圖片短內容頁 Footer 底部為 900px，白色空隙為 0px；390x844 有圖片頁版面正常。
- News Detail layout：恢復文字／附件／圖片垂直排列；桌機圖片最大寬度 640px，無圖片不輸出 media wrapper；Mobile 維持單欄。
- News Detail layout：5127 實際回應與瀏覽器均確認有圖片時 media／image 位於附件後方；無圖片 media／image 均為 0；Mobile 390px 單欄。
- News Detail layout：有圖片時圖片位於附件下方且最大寬度 640px；無圖片不輸出 media wrapper。
- News Detail layout：改由附件後輸出單一 media wrapper 與圖片；無圖片狀態不輸出 media wrapper。
- News Detail 詳細頁區塊樣式：瀏覽器桌機版確認年份／類別分色置中、標題分隔線，以及內容／附件／圖片共用連續背景容器。
- News Detail 無圖片狀態：瀏覽器確認不輸出 media／image，內容背景區塊與 880px 內容寬度維持正常。
- News Detail 詳細頁：標題改為置中；內容、附件與圖片背景統一為同一套淺灰色內容區塊。
- News Detail 詳細頁：將內容、附件與圖片改為共用連續背景容器，並將內容區塊最大寬度收斂至 880px。
- News Detail 詳細頁：將共用內容背景容器水平置中，保留容器內文字、附件與圖片的垂直排列。
- News Detail 詳細頁：依東元頁面風格改為主要內容、標題與年份／類別列靠左對齊。
- News Detail 詳細頁：移除內容容器背景色，將桌機內容依主要 grid 內縮，並縮短標題與分隔線的間距；Mobile 清除桌機內縮。
- News Detail 詳細頁：將返回連結、標題／標籤、分隔線與正文統一至同一個左側內縮起點，正文改為無左右額外內距以維持對齊。
- News Detail 詳細頁：收緊分隔線至內容、內容至附件、附件至圖片及內容容器上下的垂直間距，改用全域 content-padding。
- News Detail 詳細頁：移除標題分隔線下方重複 margin，將分隔線至內容的間距收斂為單一 content-padding。
- News Detail 詳細頁：增加返回按鈕至標題區的垂直距離，使用 section-space 加 content-padding 的全域間距組合。
- News Detail Mobile：將返回按鈕至標題區收斂為 section-space，移除分隔線至內容的重複間距，讓各段落維持一致節奏。
- News Detail 詳細頁：依 Desktop／Mobile 指定值重整返回、Meta、H1、摘要、附件、圖片與底部的垂直 spacing；Mobile 隱藏 H1 分隔線，圖片改為 detail container 全寬。
- News Detail 詳細頁：重新建立群組化 vertical rhythm，避免所有元素使用近似間距；Desktop 圖片改為 detail container 的 85% 且上限 800px，Mobile 維持全寬。
- News Detail Desktop：返回按鈕至 Meta 間距修正為 32px，與指定群組化節奏一致。
- News Detail：背景圖片延伸涵蓋文章區塊左右兩側，使用 86% 白色遮罩降低對比，僅保留線條作為淡雅點綴。
- News List Filter：將 hover 背景限制於支援 hover 且使用精準指標的裝置，並獨立保留 focus-visible 樣式，避免觸控裝置點擊後殘留 hover 背景。
- News List Filter：觸控／粗略指標裝置維持與桌面預設相同的透明背景，同時保留 focus 外框。
- News List Filter：觸控裝置點擊時維持原文字顏色，不因 hover／focus／active 狀態變色；已選取分類的既有 active 文字樣式保留。
- News List Filter：明確統一 filter、inner、list 三層背景為桌面版基準，並於 760px 以下維持點擊時透明背景與非 active 文字顏色。

### 未驗證

- 正式 IIS、實體裝置、跨瀏覽器與人工無障礙驗收。
- 本次區塊樣式調整的 390px 實際瀏覽器 viewport 未驗證；目前 Edge 連線不接受 viewport 覆寫，僅確認既有 Mobile 單欄 CSS 規則仍保留。
- News List Filter：修正 touch-buttons.css 後置選取規則覆蓋，讓行動裝置選取分類沿用桌面版透明背景與文字色，不再顯示橘色底。
# 2026-09-11

- [x] 調整人才招募頁 `benefits-list` 最大寬度為 1120px，使其與 `join-benefits-heading` 一致；已完成靜態差異檢查，尚未進行瀏覽器桌機與手機畫面驗證。
- [x] 調整首頁服務卡片桌機／筆電版比例，將高度縮短至約原本的 84%；保留手機版比例，尚未進行瀏覽器畫面驗證。
- [x] 將首頁服務卡片底部遮罩改為深藍色漸層；尚未進行瀏覽器畫面驗證。
- [x] 將經營理念卡片文字區背景改為指定深藍漸層，並補上 `--dark-blue` 共用 token；尚未進行瀏覽器畫面驗證。
- [x] 將經營理念卡片文字區背景更新為 `135deg` 的 `--blue-700` 至 `--blue-300` 漸層；尚未進行瀏覽器畫面驗證。
- [x] 將經營理念卡片文字區背景改為 `#edf0f5`，並同步調整文字顏色以維持對比；尚未進行瀏覽器畫面驗證。
- [x] 將認證內容 `.about-certifications-preview__events` 背景改為 `#edf0f5`；尚未進行瀏覽器畫面驗證。
- [x] 將認證內容文字改為深色以配合 `#edf0f5` 背景；尚未進行瀏覽器畫面驗證。
- [x] 移除經營理念區塊 `.about-philosophy-editorial` 的背景顏色；尚未進行瀏覽器畫面驗證。
- [x] 非首頁統一固定 Header，並加入共用 Hero 捲動緩慢位移；已完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 修正非首頁 Hero 視差：圖片層改為 Hero 內 130% 高度、`top: -15%` 並以 `translateY()` 隨捲動位移；尚未進行瀏覽器驗證。
- [x] 移除 Hero 視差圖片的 transform transition，避免上下捲動時因追趕前一個位置造成晃動；尚未進行瀏覽器驗證。
- [x] 修正非首頁 Hero 標題被固定 Header 遮住的層級問題，保留圖片 `translateY()` 視差；尚未進行瀏覽器驗證。
- [x] 修正固定 Header 與 Hero 的層級：Header 改為不透明白底並提高至 `z-index: 30`，Hero 內容恢復低於 Header；保留背景視差效果，尚未進行瀏覽器驗證。
- [x] 縮小新聞分頁視覺尺寸與間距，保留目前頁碼與箭頭操作；尚未進行瀏覽器驗證。
- [x] 修正新聞詳細頁在 `content` 僅有標題時被清空的問題，保留唯一內容行顯示；尚未進行瀏覽器驗證。
- [x] 縮短人才招募頁 `.join-content` 上方 `padding-top`；尚未進行瀏覽器驗證。
- [x] 統一 careers 主要區塊左右寬度，移除局部 `1120px` 限制並沿用共用 `.site-container` 內容寬度；尚未進行瀏覽器驗證。
- [x] 收緊「加入亞太」與「公司福利」區塊間距，移除福利區塊額外的上方 margin；尚未進行瀏覽器驗證。
- [x] 移除 services 頁面三個服務區塊的 eyebrow 文案；聯絡區原本已隱藏，尚未進行瀏覽器驗證。
- [x] 首頁最新消息卡片：標題字級調降為 `clamp(1.125rem, 1.02rem + .3vw, 1.3rem)`，標題下新增最多兩行的內文摘要（前端與 SSR 皆處理，長度最多 68 字）。已重新載入本機首頁確認摘要載入；`node --check wwwroot/js/pages/home.js`、`dotnet build -c Release` 及 `git diff --check` 通過。桌機畫面已檢視；手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 移除首頁最新消息的 `home-latest__footer`、左右切換按鈕、分頁控制與相關 CSS／JavaScript；保留卡片的原生橫向捲動與拖曳。已重新載入本機首頁確認控制列不再出現；`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息摘要改用全域 `--color-text-body` 與 `--font-size-body`，卡片靜態與 hover 陰影改用全域 `--shadow-card`、`--shadow-lg`。已重新載入本機首頁並讀取實際樣式：摘要為 16px、`rgb(68, 80, 95)`，卡片陰影為 `0 6px 18px rgb(0 0 0 / 5%)`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息日期改用全域 `--color-text-body`，與摘要文字一致。已重新載入本機首頁並確認計算後色值為 `rgb(68, 80, 95)`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息卡片預設陰影改為 `none`，僅在 hover 或鍵盤 focus 時保留 `--shadow-lg`。已重新載入本機首頁確認靜止狀態計算陰影為 `none`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息卡片背景改用全域 `--color-surface-soft`，讓預設無陰影的卡片仍具有明確區隔。已重新載入本機首頁並確認實際背景為 `rgb(245, 245, 245)`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息卡片背景改為指定漸層 `linear-gradient(135deg, #edf0f5 0%, #e3e8ef 52%, #d8e0e9 100%)`。已重新載入本機首頁並確認瀏覽器計算後漸層；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 移除首頁最新消息卡片預設與 hover 的邊線規則，保留漸層背景和 hover 陰影。已重新載入本機首頁並確認計算後邊線為 `0px none`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 移除誤加在首頁最新消息標題列 `.home-latest__heading` 的邊線；卡片樣式未因本次修正變更。已重新載入本機首頁並確認標題列 `border-top-width` 為 `0px`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 移除首頁最新消息標題列下方原有的共用邊線，最終 `.home-latest__heading` 明確設為 `border: 0`。已重新載入本機首頁並確認 `border-bottom-width` 為 `0px`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息標題與卡片的間距由 48px 收為 40px，卡片 hover／focus 的右下角標準右箭頭由 22px、1.8px 線寬調為 24px、2.2px 線寬。已重新載入本機首頁確認實際間距為 40px、箭頭為 24px／2.2px；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 新增全域 `--section-heading-content-gap: 40px`，首頁最新消息標題至卡片改為使用此 token；後續頁面區塊標題與主體內容沿用同一 token。已確認 CSS token 定義與首頁引用；`git diff --check` 通過。瀏覽器介面未回傳 CSS custom property 計算值，未將此列為實機樣式驗證；手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁服務卡片至 About 主體、About 主體至關係企業標題的視覺區塊距離統一為 80px：服務區下方、About 區塊上下方與關係企業上方均改為使用既有全域 `--section-space`（40px）組合。已重新載入本機首頁並確認兩段實際距離皆為 80px；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 依使用者要求，恢復首頁服務區、About 區塊與關係企業的原始區塊間距設定；全域標題到主體 40px token 保留。已重新載入本機首頁確認恢復後服務至 About 為 126px、About 至關係企業為 207px；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁「我們的服務」標題至卡片網格間距改用全域 `--section-heading-content-gap`，與最新消息一致為 40px。已重新載入本機首頁並確認實際距離為 40px；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息改為參考圖的直向條列：標題獨立置中，日期與標題排列於分隔線列表，桌機與手機皆採單欄；移除卡片圖片、摘要及橫向拖曳／輪播控制，保留最多 8 則資料、新聞連結、API 與 SSR 初始輸出，並將「查看全部」置於列表下方。同步更新首頁 CSS／JS cache-busting。Edge 實際確認桌機 1440px、手機 390px 均呈現 5 則消息、標題置中且無水平溢位；`dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器及人工無障礙未驗證；未 commit。
- [x] 首頁最新消息移除標題英文小標；標題與「我們的服務」共用 `--font-size-section-heading` 及 `--font-weight-heading`（500），並以 `--color-surface-soft` 套用全寬淺灰底；移除列表頂線，消息標題字重設為 500。Edge 實測桌機 1440px 為 33.12px、手機 390px 為 30px，兩處標題尺寸／字重一致，背景滿版、第一則上方無邊線且無水平溢位；`dotnet build -c Release`、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器及人工無障礙未驗證；未 commit。
- [x] 依參考圖將首頁最新消息改為「亞太動態／最新消息／簡介」標題區與消息卡片；桌機每列 3 張、平板 2 張、手機 1 張，卡片顯示日期、標題、最多 128 字摘要與箭頭；摘要與標題重複時省略。首頁前端及 SSR 均限制最新 3 則，並更新首頁 CSS／JS cache-busting。Edge 實測 1440px 三欄、980px 雙欄、390px 單欄，均無頁面水平溢位；確認三卡片高度一致、SSR/API 均顯示 3 則；`dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 依使用者澄清，首頁最新消息恢復至本輪改版前的水平文字卡片列（最多 8 則、原生橫向捲動與拖曳、卡片日期／類別／標題／摘要、hover 箭頭及右側「更多」）；移除本輪加入的置中列表、淺灰滿版底色及列表專屬標題設定。Edge 瀏覽器確認桌機 1440px、手機 390px 均有 5 張卡片、卡片列可橫向捲動且頁面本身無水平溢位；`dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
# 2026-09-22: Increased About philosophy card heading weight to the shared heading token; static CSS diff check pending.
# 2026-09-22: Increased the About related-information heading to the shared H2 size while retaining regular weight; static CSS diff check pending.
# 2026-09-22: Reworked About profile and philosophy into formal left-copy/right-image editorial rows with mobile stacking; static CSS diff check pending.
# 2026-09-22: Bumped the About stylesheet cache key so the editorial layout loads in browsers; desktop visual verification pending.
# 2026-09-22: Changed About profile to a 70/30 text-to-image split, removed its internal title, and bumped the stylesheet cache key; static CSS diff check pending.
# 2026-09-22: Applied the 70/30 editorial split to About philosophy with one shared right-side image and removed the unused philosophy media markup; static CSS diff check pending.
# 2026-09-22: Removed the About philosophy intro copy and reduced its H2 to a regular-weight subheading style; static CSS diff check pending.
# 2026-09-22: Aligned About philosophy copy with the profile section by removing gray card surfaces and retaining a clean text-column treatment; static CSS diff check pending.
# 2026-09-22: Balanced About philosophy to a 55/45 text-image split and added restrained separators between the three principles; static CSS diff check pending.
# 2026-09-22: Restored About philosophy to the prior 70/30 text-image split without separators after visual review; static CSS diff check pending.
# 2026-09-22: Restored About profile and philosophy to the pre-editorial-split layout: profile image-left/text-right and three philosophy cards; static CSS diff check pending.
# 2026-09-22: Adjusted the About profile to a 60/40 text-to-image balance while preserving the restored image-left/text-right layout; static CSS diff check pending.
# 2026-09-22: Changed the About profile reading order to text-left/image-right on desktop and text-first/image-second on mobile; static CSS diff check pending.
# 2026-09-22: Matched About philosophy to the profile's 60/40 text-left/image-right layout with one shared image; static CSS diff check pending.
# 2026-09-22: Matched About philosophy body copy to the profile's larger body text and line-height treatment; static CSS diff check pending.
# 2026-09-22: Aligned About philosophy heading and intro to the left 60% content column like the profile section; static CSS diff check pending.
# 2026-09-22: Moved About philosophy heading and intro inside the editorial grid's left column, with the shared image starting beside the principles; static CSS diff check pending.
# 2026-09-22: Added an accessible philosophy accordion: activating each principle updates the shared right-side image; static checks pending.
# 2026-09-22: Removed the philosophy accordion and restored static text plus shared image presentation; static checks pending.
# 2026-09-22: Matched the philosophy section structure to About profile: left heading and copy column, right 16:10 shared image aligned to the column top; static checks pending.
# 2026-09-22: Added orange circular philosophy selectors with keyboard-accessible image switching and a dark image caption overlay for the active description; static checks pending.
# 2026-09-22: Arranged the philosophy circular selectors in one horizontal row and reduced their size and typography; static checks pending.
# 2026-09-22: Replaced the circular philosophy switcher with three image cards that reveal each principle description on hover or focus; static checks pending.
# 2026-09-22: Left-aligned the certifications heading and decade navigation within the section header; static checks pending.
# 2026-09-22: Removed the certifications section background image and background color, retaining the existing content styling; static checks pending.
# 2026-09-22: Restored a subtle surface color to each certifications event card while keeping the section background transparent; static checks pending.
# 2026-09-22: Aligned About typography, card gaps, heading spacing, certification event text, and related-information heading with the verified Index rules and shared tokens; static checks pending.
# 2026-09-22: Updated mobile About ordering to image-before-copy and made philosophy card descriptions visible on touch devices without Hover; static checks pending.
# 2026-09-22: Reduced mobile certifications carousel page width and removed the desktop bleed calculation so event cards stay within the mobile content column; static checks pending.
# 2026-09-22: Left-aligned the philosophy heading and positioned hidden card descriptions independently so all card slogans stay vertically centered; static checks pending.
# 2026-09-22: Added the wedding-rings, team, and target icons above the three philosophy card headings; static checks pending.
# 2026-09-22: Replaced the core-values icon with `hand-heart-light.svg` to better express care and shared values; static checks pending.
# 2026-09-23: Removed the homepage latest-news section background and applied the same subtle background to the services section; `git diff --check` and `dotnet build -c Release` passed, browser desktop/mobile verification not run.
# 2026-09-23: Changed the homepage latest-news carousel to show four cards on desktop while retaining two-card tablet and one-card mobile breakpoints; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Reduced latest-news carousel side and card gaps to enlarge the four desktop news cards while preserving responsive breakpoints; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Restored the homepage latest-news carousel to three desktop cards per view while keeping the reduced spacing and responsive tablet/mobile counts; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Harmonized homepage service/latest-news card hierarchy with shared heading spacing, subtle card elevation, consistent image radius, and a light section divider; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Restyled the homepage latest-news link as a centered news-center row with a circular arrow and bottom divider to match the supplied reference; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Restored the latest-news link label to `更多資訊` and centered both arrow SVG states inside the circular icon; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Removed the homepage contact/recruitment CTA markup, its dedicated styles, and its interaction setup; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Made the homepage related-company section and carousel use the full available width without content-gutter or max-width side constraints; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Removed the bottom padding from the homepage related-company section on desktop and mobile; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Adjusted the related-company image crop positions for 亞柏會舘 and 亞柏羽球隊 so the upper subject area, including the player's head, remains visible; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Set the 亞柏會舘 and 亞柏羽球隊 image crops to the top edge so the upper subject area and player head are explicitly retained; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Applied dedicated crop classes to the 亞柏會舘 and 亞柏羽球隊 cards so carousel clones retain the top-aligned image position on desktop; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Tuned the 亞柏羽球隊 focal point to 35% on desktop and 25% below 1100px so the player's head and lower body remain balanced across screen widths; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Lowered the 亞柏會舘 image focal point to 68% on desktop and 55% below 1100px so more of the building remains visible instead of excess sky; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Added the shared subtle surface background to the homepage related-company section to separate its white brand cards from the page surface; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Added a subtle bottom border to separate the related-company section from the similar-toned footer without restoring bottom spacing; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Removed the related-company background and bottom border, and left-aligned its section heading; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Restored the related-company section heading to centered alignment; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Changed the homepage services section background from `#efefef` to `#fafafa`; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Unified homepage content rails, section heading typography, heading-to-content gaps, and vertical section spacing while preserving the full-width affiliates carousel and its zero bottom spacing; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Clarified homepage section roles with service-capability, latest-news, and group-ecosystem labels/descriptions plus distinct heading rhythm; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Removed the homepage section-role labels, descriptions, and related editorial grid overrides while retaining the unified container, heading, and spacing rules; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Unified homepage media radius/shadow tokens and circular arrow controls across services, latest news, and affiliates while preserving the service cards' vertical ratio; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Restored the original homepage carousel, service-card, and latest-news arrow treatments while retaining the shared image radius and shadow rules; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Restyled the homepage affiliates section as a dark full-width logo showcase with left-aligned branded heading, dark rounded cards, centered identity marks, and header-level carousel controls; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Restored the homepage affiliates section after removing the dark logo-showcase experiment; existing transparent background, image cards, and carousel layout are retained, along with the shared media radius/shadow rules; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Left-aligned the homepage affiliates heading on the shared About content rail and moved its carousel controls into the heading area's upper-right corner; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Added a subtle `#f7f8fa` background to the homepage affiliates card pseudo-element so each card has clearer separation from the white page surface; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Changed homepage affiliates cards to square image tiles with company name and description revealed on hover/focus, while keeping the text visible on touch layouts; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Restored the previous homepage affiliates card proportions and below-image text layout after removing the square hover-overlay experiment; the card background, left heading, and header controls remain unchanged; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Removed the homepage affiliates card pseudo-element background so the cards return to a transparent surface; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Reduced the desktop homepage affiliates card height from `280px` to `240px` to remove excess space below the company names while preserving the mobile card height; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Balanced the shorter affiliates cards by moving hover descriptions upward, tightening their line-height, and adding a restrained bottom buffer before the footer; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Strengthened mobile homepage Hero copy contrast to follow the desktop readability treatment, using a localized dark radial overlay, stronger text shadow, and CTA shadow without changing other pages; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Softened the mobile Hero contrast treatment with a wider, lighter radial overlay and reduced text/CTA shadows for a more natural image presentation; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Updated mobile homepage order and interaction: About now presents the image first, service cards use the desktop overlay with always-visible text at a shorter height, latest news supports pointer/touch dragging, and mobile section spacing was rebalanced; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Removed homepage mobile header utility links, enlarged the menu toggle hit area/icon, and applied the primary orange color with an orange focus ring; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Refined the homepage mobile menu: kept the toggle at the right edge, added a smooth hamburger-to-close rotation/fade transition, and increased menu row height, typography, padding, and separators to follow the supplied mobile reference; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Verified the homepage mobile menu in the local browser at a 440px viewport, reduced the mobile homepage Header/nav start from `72px` to `64px`, and enlarged the close icon while retaining the measured `58px` menu rows and `17px` text; static checks pending, browser desktop/mobile verification not run.
# 2026-09-23: Followed up the real-device check by cache-busting the homepage stylesheet so the intended `64px` mobile Header/nav alignment is actually loaded; mobile browser recheck passed at the local 440px viewport, while desktop browser verification remains unrun.
# 2026-09-23: Replaced the mobile menu icon shadow workaround with interaction-state styling: clicked menus retain the background and orange hamburger/close icon, while leaving a closed header restores the transparent background and white hamburger; desktop browser verification remains unrun.
# 2026-09-23: Fixed the mobile Header hover/focus cascade so any visible Header background now forces the hamburger icon orange; white is reserved for the transparent Header state.
# 2026-09-23: Removed separators between homepage mobile submenu items while retaining the main navigation row dividers.
# 2026-09-23: Unified non-homepage mobile Headers with the homepage mobile layout: 64px Header, 52px menu button, 36px icon, orange icon on the always-background Header, matching 58px navigation rows, typography, spacing, carets, and separator-free submenus; desktop browser verification remains unrun.
# 2026-09-23: Unified desktop Footer main-section vertical padding with `padding-block: clamp(42px, 5vw, 64px)` while preserving the existing mobile footer padding; desktop browser verification remains unrun.
# 2026-09-23: Changed the shared Footer background to `#3b3b3b`, updated Footer text and divider tokens to light-on-dark values, and added company information directly below the Footer logo before the navigation; browser verification remains unrun.
# 2026-09-23: Repositioned the shared Footer dividers so the first line sits directly below the logo and the second line sits below company information before the navigation, matching the supplied reference layout; browser verification remains unrun.
# 2026-09-23: Positioned company information as a full-width Footer block aligned with the `關於亞太` column, kept `關於亞太` as the first navigation column, changed the desktop navigation grid to four columns, and removed the `最新消息` Footer column; browser verification remains unrun.
# 2026-09-23: Rebuilt the shared Footer to match the supplied reference: Logo and horizontal navigation in the first row, divider, company information below, and copyright/legal links in the bottom row; `最新消息` remains removed.
# 2026-09-23: Matched the reference company-information format: Chinese address, English address, and TEL line; removed the separate company-name and email rows from the Footer information block.
# 2026-09-23: Matched the reference company-information typography: enlarged the Chinese address, aligned the English address and TEL line to a lighter scale, and adjusted letter spacing and line rhythm for desktop and mobile.
# 2026-09-23: Reorganized the shared Footer into left-side company information and right-side menu groups for 關於亞太, 服務項目, and 快速連結; company information now uses 18px Chinese text and 14px English/TEL text.
# 2026-09-23: Reduced the desktop vertical padding of `site-footer__main` to tighten the shared Footer while preserving the existing mobile spacing.
# 2026-09-23: Reduced `.site-footer__top` bottom padding so the Footer logo sits closer to its divider on desktop and mobile.
# 2026-09-23: Added the company Email address back to the shared Footer company-information block below the TEL line.
# 2026-09-23: Updated the mobile Footer order to show the expandable navigation below the logo divider before company information, with up/down chevron controls for each submenu.
# 2026-09-23: Corrected the mobile Footer submenu controls by removing the inherited plus-icon background, forcing full-width rows, and aligning clean chevrons to the right edge.
# 2026-09-23: Fixed mobile Footer alignment by stretching the content and navigation containers so submenu chevrons remain at the far right edge.
# 2026-09-23: Changed only the homepage Footer to a light surface with dark text and dividers, matching the other-page Footer presentation while preserving the dark Footer on inner pages.
# 2026-09-23: Matched the homepage Footer text hierarchy to the light reference: dark primary color for menu headings, arrows, and copyright; muted body color for company details and submenu links.
# 2026-09-23: Corrected the homepage Footer copyright cascade so it retains the same dark primary text color as the light reference.
# 2026-09-23: Forced every homepage Footer navigation heading, submenu link, toggle button, and arrow to use the same dark primary text color as the reference light Footer.
# 2026-09-23: Unified the Footer interface across homepage and inner pages with `#f3f4f3` background, `#40403e` menu headings, and `#81817e` submenu/legal links.
# 2026-09-23: Added an operational-resources quick navigation bar below the Hero with anchors for facilities, equipment, capacity, safety, and location; mobile supports horizontal scrolling.
# 2026-09-23: Removed the quick-navigation background color and made it sticky below the fixed Header; adjusted anchor scroll margins so sections remain visible below both controls.
# 2026-09-23: Restored an opaque surface background for the sticky operational-resources quick navigation so content does not show through while scrolling.
# 2026-09-23: Added active-state synchronization for the operational-resources quick navigation on click and scroll, including the orange underline under the current section.
# 2026-09-23: Stabilized quick-navigation active-state switching with forward/backward hysteresis and a short anchor-click lock to prevent underline flicker.
# 2026-09-23: Matched the facilities section spacing to About's company-profile section with the shared compact section padding and a 32px-to-64px content gap.
# 2026-09-23: Matched the facilities section desktop image-to-copy ratio to About's company-profile layout at 6:4; other operational-resource sections remain unchanged.
# 2026-09-23: Applied the same 6:4 About-style image-to-copy proportions and spacing to equipment configuration, capacity, and occupational safety sections, mirrored for reverse layouts.
# 2026-09-23: Explicitly set `.footer-column a.footer-column__title--link` and its mobile title counterpart to `#40403e`.
# 2026-09-23: Reduced the Footer Chinese company address text size to 16px on desktop and mobile; English address, TEL, and Email remain 14px.
# 2026-09-23: Explicitly set `.footer-column__title` to `#40403e` across the shared Footer.
# 2026-09-23: Corrected the homepage Footer cascade so `.footer-column__title` remains `#40403e` while only submenu links use `#81817e`.
# 2026-09-23: Removed the background color from the About certifications preview events container.
# 2026-09-23: Kept `public/images/about/02.png` exclusively in the About profile section and softened it with a translucent white overlay.
# 2026-09-23: Added the softened `public/images/about/03.png` decoration exclusively to the About certifications and awards section.
# 2026-09-23: Aligned the company-history timeline header and circular previous/next controls with the About certifications timeline while preserving company-history text sizes.
# 2026-09-23: Replaced company-history arrow controls with the same bottom pagination-dot controls used by the About certifications timeline.
# 2026-09-23: Matched company-history dragging to the About certification carousel with pointer capture, mouse-drag snap suspension, and guarded scroll-state syncing.
# 2026-09-23: Removed the company-history `milestones-preview__header` markup and its unused heading-layout styles.
# 2026-09-23: Left-aligned the 2023 `public/images/index/50.png` decoration with the `2023` year label while preserving timeline alignment.
# 2026-09-23: Added year-above representative images for 2018 (`affiliates/taisounds.jpg`) and 2016 (`affiliates/小港加油站.png`) using the same aligned treatment as 2023.
# 2026-09-23: Removed all company-history year representative images and restored the original timeline spacing and shared-line position.
# 2026-09-23: Matched desktop gaps between company-history carousel pages to the year-column gap so years split across pages do not appear unusually close; mobile keeps its compact gap.
# 2026-09-23: Added `public/images/affiliates/123456.jpg` as a softened cover background for `.milestones-content` only.
# 2026-09-23: Removed the background color from `.milestone-preview__events`; the section background image remains unchanged.
# 2026-09-23: Removed the company-history Hero markup, preload, and page-specific Hero positioning so the timeline content follows the breadcrumb directly.
# 2026-09-23: Horizontally flipped the independent company-history background image layer so its visual focus shifts from the left toward the right and stays clear of the timeline text.
# 2026-09-23: Polished the existing company-history four-column timeline: constrained desktop width, tightened year/timeline/event spacing, softened the line and nodes, removed dotted separators, reduced pagination, lowered background opacity, and kept four columns from 1200px upward.
# 2026-09-23: Restored company-history to the state before the requested timeline polish: original full-width carousel sizing, spacing, line/node treatment, dotted event separators, pagination scale, background opacity, and desktop page-size breakpoints are restored; the earlier background flip, transparent events, drag behavior, and pagination-dot controls remain.
# 2026-09-23: Further softened the company-history port background image by reducing the overlay layer opacity from .28 to .18 without changing timeline layout or content.
# 2026-09-23: Converted company-history to a vertical year-navigation timeline: desktop uses a left year rail with an active event panel, mobile uses a horizontal year selector, and the existing milestone source content and background remain unchanged.
# 2026-09-23: Revised company-history to a single central vertical timeline: all years render from newest to oldest with alternating left/right event content; mobile collapses the content to one side of the axis.
# 2026-09-23: Converted the company-history central timeline into a sticky feature section: the stage stays fixed while the visible year and events change as the user scrolls through newest-to-oldest steps.
# 2026-09-23: Refined the sticky company-history stage to a single viewport-sized fixed presentation with non-visible scroll steps, preventing each year from creating a large visible block.
# 2026-09-23: Changed company-history to a fixed-height inner scroll viewport: the outer section stays at one height while the central-axis timeline content scrolls internally from newest to oldest.
# 2026-09-23: Fixed the inner-scroll timeline axis by moving the line outside the scrolling content layer so it remains visible from the newest year through the oldest year.
# 2026-09-23: Reset the internal timeline scroll position on page load and bumped the JavaScript cache version so the corrected axis and lower-year content are loaded consistently.
# 2026-09-23: Reversed the alternating timeline order so 2023 starts on the right, followed by 2018 on the left and subsequent years alternating left and right.
# 2026-09-23: Restored the previous timeline order so 2023 starts on the left and the following years alternate from the right.
# 2026-09-23: Reduced the fixed company-history inner viewport height to make the `milestones-content` section more compact while preserving internal scrolling.
# 2026-09-23: Added an animated orange downward scroll hint to the fixed company-history viewport; it fades out after the user begins scrolling.
# 2026-09-23: Changed the company-history scroll hint text to `Scroll Down`, moved the arrow after the text, and repositioned the hint at the fixed viewport's bottom center.
# 2026-09-23: Restored the previous company-history scroll hint presentation with `向下滑動`, the arrow before the text, and the original hint offset.
# 2026-09-23: Moved the company-history scroll hint away from the central axis line; desktop sits to the line's right and mobile stays clear of the left axis.
# 2026-09-23: Relocated the company-history scroll hint to the fixed viewport's upper-right whitespace so it no longer overlaps the 2018 content or central axis.
# 2026-09-23: Repositioned the company-history scroll hint below the central axis endpoint, with a small gap from the line so it reads as the next-scroll cue.
# 2026-09-23: Removed the direct background color from `.milestones-content`; the existing softened port image layer remains.
# 2026-09-23: Aligned the mobile company-history axis with its event markers and restored the scroll hint to the bottom center of the fixed viewport.
# 2026-09-23: Aligned mobile timeline markers with the year headings and moved the bottom-center scroll hint below the scrolling content so it no longer overlaps the next year.
# 2026-09-23: Added a 20px mobile right inset to company-history timeline content so text keeps a consistent edge gap.
# 2026-09-23: Changed desktop left-side company-history titles and descriptions to left alignment for normal left-to-right reading.
# 2026-09-23: Restored the previous right alignment for desktop left-side company-history content; mobile remains left aligned.
# 2026-09-23: Applied left alignment to desktop left-side company-history content for more consistent Chinese reading flow while keeping the column on the left of the axis.
# 2026-09-23: Kept left-side company-history text left aligned while anchoring its content block toward the central axis to reduce the visual gap.
# 2026-09-23: Changed the company-history scroll hint label from `向下滑動` to `SCROLL` without changing its arrow or animation.
# 2026-09-23: Moved the About Hero image focal point upward so more of the upper image area is visible on mobile and desktop.
# 2026-09-23: Moved the About Hero image focal point slightly further upward for the requested framing adjustment.
# 2026-09-23: Reverted the later company-history timeline-line extension; the shared line now uses the pre-polish full-width track behavior again.
# 2026-09-23: Restored the homepage mobile related-company carousel; each visible card now directly shows its image, title, and description without requiring hover, while keeping one-card-at-a-time navigation.
# 2026-09-24: Updated the occupational-safety certification carousel controls to match the About certification section's pagination-dot style while retaining the safety-specific class names and behavior.
# 2026-09-24: Moved the occupational-safety certification pagination dots below the card carousel and centered them, while keeping the heading row free of controls.
# 2026-09-24: Fixed certification pagination visibility by removing the single-page hide condition and refreshed the occupational-safety CSS/JS cache versions; browser verification remains pending.
# 2026-09-24: Fixed mobile certification pagination count to use one dot per credential card, so horizontal swiping can update the corresponding active dot; browser verification remains pending.
# 2026-09-24: Updated certification pagination visibility to show dots only when the card viewport actually overflows; desktop layouts with all four cards visible no longer show unnecessary carousel controls.
# 2026-09-24: Unified occupational-safety credential card radius and base/hover shadows with the global `--card-radius`, `--shadow-card`, and `--shadow-lg` tokens; browser verification remains pending.
# 2026-09-24: Restored global table cell horizontal padding on mobile operational-resources tables so text no longer touches the border lines; browser verification remains pending.
# 2026-09-24: Unified services page section spacing, content column gap, heading/body typography, and advantage spacing with global tokens; retained services-specific carousel and contact-card behavior; browser verification remains pending.
# 2026-09-24: Restyled the services `service-switcher__inner` and tabs to match the operational-resources quick navigation pattern, including sticky positioning, full-width underline, equal desktop tabs, and horizontal mobile scrolling; browser verification remains pending.
# 2026-09-24: Matched services switcher tab text size to operational-resources quick navigation by using the global `--font-size-body-lg` token; browser verification remains pending.
# 2026-09-24: Matched the services switcher tab line height to the operational-resources quick navigation typography; browser verification remains pending.
# 2026-09-24: Unified news page typography, filter navigation, list spacing, card radius, content padding, pagination spacing, and empty-state sizing with global tokens; retained news filtering and card interactions; browser verification remains pending.
# 2026-09-24: Changed the news results from image cards to Synology-inspired list rows with date/category, title, and action columns; mobile collapses each row to a readable single-column flow while preserving filtering and pagination; browser verification remains pending.
# 2026-09-24: Restyled `news-filter__inner site-container` to match the quick-navigation pattern with sticky positioning, a full-width bottom border, equal desktop categories, and horizontal mobile scrolling; browser verification remains pending.
# 2026-09-24: Corrected the news filter reference to the supplied Synology news design: removed sticky/equal-width quick-nav behavior and changed categories to a left-aligned, spaced text filter row with a lightweight active underline; browser verification remains pending.
# 2026-09-24: Refined the news filter/list hierarchy against the supplied reference screenshot by adding the full-width divider beneath the category row while retaining the left metadata, centered title, and right action row layout; browser verification remains pending.
# 2026-09-24: Performed an actual local news-page render check and removed the duplicate list-top divider and excess gap below the category filter so the first news row follows the reference layout more closely; browser verification is partially checked on desktop only.
# 2026-09-24: Increased news metadata text size, reduced the metadata-to-title gap, and removed the news row's right-side read-more element from the rendered list; browser verification remains pending.
# 2026-09-23: Slightly reduced homepage service-card height by changing the desktop aspect ratio to `1` and mobile aspect ratio to `1.12`.
# 2026-09-23: Tightened homepage latest-news card body vertical spacing to 8px above and 18px below the metadata and title content across desktop and mobile.
# 2026-09-23: Changed dynamically generated homepage latest-news titles from `<strong>` to semantic `<h3>` elements and updated the title-row/body containers to valid block structure without changing visual styling.
# 2026-09-23: Set only the homepage Hero main title `.home-hero__copy h1` to font weight 400 on desktop and mobile; lower section headings remain unchanged.
# 2026-09-23: Removed the later mobile cascade override that restored the Hero title to the heading weight; mobile now also resolves to 400.
# 2026-09-23: Unified the Footer interface across homepage and inner pages with `#f3f4f3` background, `#40403e` menu headings, and `#81817e` submenu/legal links.
# 2026-09-23: Refined the homepage mobile menu states: the closed toggle remains white and closer to the right edge, the open toggle changes to orange, and expanded navigation rows now use a consistent 16px normal-weight type scale, 58px rhythm, letter spacing, and caret spacing; the reloaded 440px mobile closed state was visually checked, while expanded-state interaction and desktop browser verification remain unrun.
# 2026-09-29: Changed the homepage visual section order to Services, Latest News, About APLI, then Affiliates using the main-content layout order; restored the About APLI section to its original two-column left-text/right-image layout; existing section markup and interactions remain unchanged, and desktop/mobile browser verification remains pending.
# 2026-09-29: Set the homepage visual order to About APLI, Services, Latest News, then Affiliates; retained the rounded service-card treatment and restored Latest News to its previous card UI, with desktop/mobile browser verification remaining pending.
# 2026-09-29: Moved the homepage related-enterprise carousel to the bottom of the About page after the certification and awards content; About now loads the shared carousel markup, styling, and behavior, with desktop/mobile browser verification remaining pending.
# 2026-09-29: Removed the About page Explore More block and its page-specific styles and reveal selector; the related-enterprise carousel remains as the final About content section, with desktop/mobile browser verification remaining pending.
# 2026-10-16: Finalized the homepage latest-news section to match the supplied reference composition: gray band, left heading, blue-cap white cards, circular controls, right-edge card clipping, and mobile stacking fallback. Release build, JavaScript syntax checks, diff check, and desktop browser verification passed; mobile browser, device, cross-browser, and manual accessibility verification remain pending; not committed.
# 2026-10-16: Fixed the final desktop grid gap so the latest-news heading and first card no longer overlap; desktop browser verification repeated after reload.
# 2026-10-16: Restored homepage section order so Latest News appears below Services; About remains above Services and Affiliates follows Latest News. Static validation pending for this order-only change; not committed.
# 2026-10-16: Bumped the homepage CSS cache key after restoring the section order so browsers load the updated ordering rules.
# 2026-10-16: Changed homepage Latest News from cards to the requested list layout with centered heading, category column, title column, separators, and orange arrow links; updated the CSS cache key. Validation pending; not committed.
# 2026-10-16: Disabled the existing reveal opacity for the latest-news list so category, title, and arrow content remains visible in the new static list layout.
# 2026-10-16: Explicitly overrode the homepage reveal state on the latest-news viewport so list text remains visible after scrolling.
# 2026-10-16: Bumped the homepage JavaScript cache key so the new list-item DOM structure replaces the previous card structure in the browser.
# 2026-10-16: Changed the latest-news section heading to `最新消息` to match the supplied list reference.
# 2026-10-16: Raised the latest-news list layout selector priority so legacy carousel positioning no longer overrides the centered heading and full-width list.
# 2026-10-16: Aligned the latest-news list width and heading typography with homepage global tokens: `--content-width`, `--content-max-width`, `--font-size-section-heading`, `--font-weight-heading`, `--letter-spacing-tight`, and `--line-height-heading`.
# 2026-10-16: Replaced the latest-news item title color with `var(--color-text-body)` and aligned About section background/border plus affiliates control hover border with existing global tokens. Hero/image overlays remain intentional alpha treatments; mobile browser and cross-browser checks remain pending.
# 2026-10-16: Increased latest-news category/title typography from body to global body-lg tokens across desktop/mobile while keeping size and weight aligned, matched reference hover styling, removed hover row movement, added a conditional centered `更多資訊` link below the five-item homepage list using the About CTA button treatment when additional published news exists, and tuned the always-visible orange chevrons to a smaller readable size while preserving the thicker stroke. Validation pending; not committed.
# 2026-10-16: Updated the homepage Services section to use a subtle cool blue-gray gradient background from a shared global token, matching the supplied reference mood while preserving the existing service cards. Validation pending; not committed.
# 2026-10-16: Restyled homepage service cards as full-image cards with a bottom dark gradient, white title, and two reference-style CTA treatments while leaving the Services section gradient background unchanged and preserving existing service-page links. Validation pending; not committed.
# 2026-10-16: Fixed homepage service-card content alignment so the title and CTA treatments stay anchored at the bottom of each image card instead of being affected by legacy CSS overrides. Validation pending; not committed.
# 2026-10-16: Replaced the service-card flex alignment with explicit bottom positioning for the card content, preventing legacy rules from moving the title and CTA treatments to the top. Validation pending; not committed.
# 2026-10-16: Fixed the remaining service-card overflow by overriding the legacy `height: 100%` content rule with `height: auto`, so the title and CTA group occupy only the bottom overlay area. Validation pending; not committed.
# 2026-10-16: Removed service-card image zoom on hover, removed card borders, removed the `諮詢專家` CTA, and renamed the remaining CTA to `了解更多`. Validation pending; not committed.
# 2026-10-16: Changed service-card interaction to reveal the existing description below the title on hover/focus, added a simple forward chevron beside the title, and removed the `了解更多` button. Validation pending; not committed.
# 2026-10-16: Strengthened the service-card bottom overlay for text readability and slightly reduced the image scale to soften the crop while keeping the full-bleed card composition. Validation pending; not committed.
# 2026-10-16: Matched the revealed image edge to the services-section background so the reduced image scale does not appear as an unintended white border. Validation pending; not committed.
# 2026-10-16: Removed the legacy service-card shadow so the cards no longer read as bordered panels after reducing the image scale. Validation pending; not committed.
# 2026-10-16: Removed the reduced image transform after confirming it exposed the card background as an unintended pale border; service images now fill the card edge-to-edge and remain fixed on hover. Validation pending; not committed.
# 2026-10-16: Bumped the homepage stylesheet cache version so browsers load the edge-to-edge service-card image fix immediately. Validation pending; not committed.
# 2026-10-16: Strengthened and extended the service-card bottom gradient overlay so hover descriptions remain readable over bright image areas. Validation pending; not committed.
# 2026-10-16: Fixed service-card overlay stacking so the gradient renders above the image and below the title/description content instead of remaining behind the image. Validation pending; not committed.
# 2026-10-16: Reduced the service-card overlay intensity and moved the gradient lower so the image stays bright while the bottom title/description remains readable. Validation pending; not committed.
# 2026-10-16: Lightened the service-card overlay again, limiting the darker treatment to the lower portion of the image. Validation pending; not committed.
# 2026-10-16: Increased the spacing between homepage service cards while preserving the existing card proportions and responsive mobile spacing. Validation pending; not committed.
# 2026-10-16: Slightly widened the homepage service-card grid so each of the three cards has more horizontal room without changing the gap or card layout. Validation pending; not committed.
# 2026-10-16: Normalized homepage service-card image positioning and applied a restrained shared color treatment for a cleaner, more consistent three-card presentation. Validation pending; not committed.
# 2026-10-16: Restored the prior homepage service-card image positioning and color treatment at the user's request. Validation pending; not committed.
# 2026-10-16: Removed the custom gradient from the homepage services section and applied the same services background gradient to the latest-news section. Validation pending; not committed.
# 2026-10-16: Kept homepage service-card dimensions unchanged while slightly scaling the images inward with a clean white card background and no hover enlargement. Validation pending; not committed.
# 2026-10-16: Reworked the service-card image reduction to inset the image and its overlay together, keeping an even 2% border on all sides and removing the inconsistent transformed-image edges. Validation pending; not committed.
# 2026-10-16: Matched the service-card overlay border radius and clipping to the inset image so all four corners render consistently. Validation pending; not committed.
# 2026-10-16: Reworked the light-blue background into layered section decoration: a lower band behind service cards and a centered upper-middle band behind latest news. Validation pending; not committed.
# 2026-10-16: Removed the white service-card edge revealed by the inset image and extended the latest-news light-blue band from the section top to avoid a white strip above the heading. Validation pending; not committed.
# 2026-10-16: Extended the latest-news light-blue background through the entire section so the bottom more-information button is included in the same background area. Validation pending; not committed.
# 2026-10-16: Replaced the blue decorative background with the project's global neutral surface token for a more consistent visual language. Validation pending; not committed.
# 2026-10-16: Switched the decorative section backgrounds from neutral gray to the global soft brand-orange token at the user's request. Validation pending; not committed.
# 2026-10-16: Restored the neutral global surface background after the orange decorative treatment was rejected. Validation pending; not committed.
# 2026-10-16: Changed latest-news row hover and focus states to the global white surface so the interaction remains visible against the neutral section background. Validation pending; not committed.
# 2026-10-16: Added a subtle default full-card image overlay to normalize the different service-image styles while preserving the stronger bottom text readability gradient. Validation pending; not committed.
# 2026-10-16: Added a homepage related-enterprises section below latest news with three linked cards and a link to the full affiliates page. Validation pending; not committed.
# 2026-10-16: Resolved a collision with the legacy homepage affiliates carousel styles so the new related-enterprises cards retain their full image-and-content height. Validation pending; not committed.
# 2026-10-16: Centered the related-enterprises heading after visual inspection showed a legacy alignment rule overriding the new card layout. Validation pending; not committed.
# 2026-10-16: Restructured the related-enterprises cards into a layered five-card grid with two featured cards and a stacked right-side layout inspired by the supplied reference. Validation pending; not committed.
# 2026-10-16: Adjusted the two featured affiliate cards so their images fill the available feature height and their content stays anchored at the bottom without blank space. Validation pending; not committed.
# 2026-10-16: Converted related-enterprises cards to full-image overlay cards, placing title, description, and arrow directly over the image instead of using separate image-and-text panels. Validation pending; not committed.
# 2026-10-16: Removed related-enterprises card borders and hover motion, and changed card text to the global normal font weight. Validation pending; not committed.
# 2026-10-16: Removed the related-enterprises heading description, card descriptions, and per-card more-information links so cards show only the enterprise name over the image. Validation pending; not committed.
# 2026-10-16: Reduced the related-enterprises grid row heights so the featured cards remain compact instead of stretching excessively tall. Validation pending; not committed.
# 2026-10-16: Added the missing ALPHA TOTAL SOLUTION PTE LTD card to the homepage related-enterprises grid and changed the compact layout to display six cards. Validation pending; not committed.
# 2026-10-16: Removed the related-enterprises all-items link and card overlays/hover motion, and limited the light-gray section background to the upper portion of the section. Validation pending; not committed.
# 2026-10-16:首頁關係企業卡片改用 About 關係企業區塊的對應圖片：世新貨櫃使用 01.png、亞柏油品使用小港加油站.png、亞柏羽球隊使用 aplus-badminton-player.jpg、ALPHA TOTAL SOLUTION 使用 alpha-port-equipment.png；其餘圖片維持與 About 對應。已完成首頁本機瀏覽器檢查，未提交。
# 2026-10-16:縮小首頁世新貨櫃卡片的 Grid 區域，從桌機 5 欄 4 列調整為 4 欄 2 列，保留不規則排列但改善與其他關係企業卡片的比例；已完成靜態檢查，瀏覽器畫面需重新確認，未提交。
# 2026-10-16:首頁關係企業卡片交換亞柏羽球隊與亞柏油品的位置，並同步調整 reveal delay 以符合新的卡片順序；未提交。
# 2026-10-16:整理首頁關係企業卡片 CSS 為單一不規則 Grid 版型，桌機／窄桌機／手機分別提供響應式排列；標題固定左下並使用正常字重，移除卡片 hover 視覺變化與首頁關係企業 carousel 啟用呼叫。已完成桌機瀏覽器檢查、JavaScript 語法檢查與 git diff --check；手機瀏覽器、跨瀏覽器、裝置與人工無障礙驗證尚未完成；未提交。
# 2026-10-16:首頁世新貨櫃卡片改用 services/container-handler-operation.png，並更新圖片原始尺寸為 1672x941；標題樣式維持正常字重、左下定位與無 hover 視覺變化。已完成檔案存在與靜態檢查，未提交。
# 2026-10-16:首頁關係企業卡片標題由 h3 統一調整為 h4，並同步更新首頁 CSS selector；未提交。
# 2026-10-16:加寬首頁關係企業卡片間距與內距、放大並下移卡片標題，並將亞柏羽球隊圖片焦點下移至 72% 以保留人物畫面；已完成靜態檢查，手機畫面需重新確認，未提交。
# 2026-10-16:更新首頁 home.css cache key，確保關係企業卡片間距、標題與圖片焦點調整能載入；未提交。
# 2026-10-16:依畫面回饋縮小首頁關係企業卡片 h4 標題，桌機上限調整為 24px、手機調整為 20px，保留靠底定位與加寬內距；已更新 CSS cache key，未提交。
# 2026-10-16:將首頁亞柏羽球隊卡片圖片焦點由 72% 上移至 15%，避免人物頭部被卡片裁切；已更新 CSS cache key，未提交。
# 2026-10-16:將首頁關係企業區塊標題改為「集團事業群」，以更貼近亞太國際物流集團的品牌定位；未提交。
# 2026-10-16:移除首頁「集團事業群」區塊背景色與裝飾色帶，改為透明背景並保留卡片內容；已更新 CSS cache key，未提交。
# 2026-10-16:將首頁「集團事業群」與「最新消息」的視覺順序對調，集團事業群改置於最新消息之前；已更新 CSS cache key，未提交。
# 2026-10-16:恢復首頁「集團事業群」區塊上半部的淺色背景帶，下半部維持透明；已更新 CSS cache key，未提交。
# 2026-10-16:恢復首頁「最新消息」與「集團事業群」的原本順序，最新消息再次排在集團事業群之前；已更新 CSS cache key，未提交。
# 2026-10-16:再次移除首頁「集團事業群」區塊的背景色與上半部色帶，恢復整區透明背景；已更新 CSS cache key，未提交。
# 2026-10-16:調整首頁集團事業群為階梯式 Grid：世新維持主卡、羽球隊與會舘置於上方、油品縮窄為中間垂直卡、太報放寬為右側主卡、ALPHA 置於左下；已更新 CSS cache key，未提交。
# 2026-10-16:將首頁最新消息區塊改為深色背景，並同步調整標題與新聞文字為白色、保留橘色分類與對比清楚的內容層級；已更新 CSS cache key，未提交。
# 2026-10-16:修正最新消息深色版的舊優先權覆蓋，確保區塊標題與新聞標題實際使用白色；已更新 CSS cache key，未提交。
# 2026-10-16:依使用者要求恢復最新消息區塊的淺色背景、深色標題與深色新聞文字；已更新 CSS cache key，未提交。
# 2026-10-16:將最新消息淺色背景改為低對比斜向色塊與細斜線設計，並提供手機版較收斂的斜向背景；已更新 CSS cache key，未提交。
# 2026-10-16:依使用者要求恢復最新消息區塊的原本背景，移除斜向色塊與細斜線；已更新 CSS cache key，未提交。
# 2026-10-18: 調整營運資源頁面資料呈現：收窄廠區資訊內容、移除廠區／機具／作業量能圖片，並以「機具配置／作業量能」原生 tab 切換表格；已完成靜態檢查，桌機與手機瀏覽器、跨瀏覽器、裝置及人工無障礙驗證尚待執行，未提交。
# 2026-10-18: 完成營運資源資料 tab 的表格樣式與 CSS cache key 更新；已驗證桌機版資料區 960px、圖片數為 0、tab 可切換且切換後 panel 與表格可見，`node --check` 與 `git diff --check` 通過；目前瀏覽器連線不提供手機 viewport 模擬，手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 將廠區資訊、機具配置、作業量能整合為同一資料區塊與三項切換選單；切換時同步更新標題、敘述與表格，預設顯示廠區資訊；已完成靜態檢查，桌機切換驗證待重跑，手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 重跑營運資源桌機驗證：確認頁面只保留一個資料區塊，預設為廠區資訊，且機具配置與作業量能切換會同步更新標題、敘述、panel 與表格資料；手機 viewport、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 移除營運資源資料 tab 的整條底線與底部指示線，並加入資料 panel 由右至左滑入的切換過渡效果；提供 reduced-motion 停用動畫，未提交。
# 2026-10-18: 已在桌機頁面確認 tab 列無底線、切換後 panel 套用 `resource-data-panel-enter` 並由右側滑入；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 移除營運資源頁面的 `resources-quick-nav` 與其 JavaScript／CSS，並將資料切換選單改為參考圖的文字間距與垂直分隔線樣式；未提交。
# 2026-10-18: 已在桌機頁面確認快速導覽不存在、三項 tab 間使用 1px 垂直分隔線且無底線，切換 panel 會由右側滑入；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 固定營運資源切換內容的基準高度，避免切換時版面上下跳動；將選單分隔線縮短為文字區高度，並把選單與表格的間距收窄；未提交。
# 2026-10-18: 將標題敘述區固定為兩行基準高度，讓三個資料選項切換時維持一致的內容區高度；未提交。
# 2026-10-18: 已在桌機頁面確認三個選項切換後資料區高度均為 500.5px、表格距離選單 16px、分隔線高度 32px 且無 border-left；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 縮短營運資源三項切換選單的項目間距與分隔線前內距，桌機使用 16–24px 的響應式間距，手機使用 16px；未提交。
# 2026-10-18: 已在桌機頁面確認切換選單目前項目間距為 24px、分隔線高度維持 32px；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 為營運資源三組切換表格加入輕微圓角，保留原有表格邊框與內容切換行為；未提交。
# 2026-10-18: 依要求恢復上一個表格圓角調整，表格恢復原本的 collapse 邊框呈現；保留其他營運資源切換選單與版面調整，未提交。
# 2026-10-18: 重載桌機頁面確認表格已回復為 0px 圓角、`border-collapse: collapse`、原生 overflow 呈現；未提交。
# 2026-10-18: 依參考頁面在營運資源細節區塊上方新增固定的「營運資源」標題與總覽敘述，下面保留廠區資訊／機具配置／作業量能切換細節；未提交。
# 2026-10-18: 已在桌機頁面確認「營運資源」總覽標題與敘述位於切換細節區塊上方，且細節區仍保留三項資料切換；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 移除資料細節的 `resource-heading resource-animate`，將動態 `resource-intro resource-animate` 移至三項切換選單下方，切換時保留敘述與表格同步更新；未提交。
# 2026-10-18: 修正資料切換器內既有 Grid area 衝突，固定呈現順序為切換選單、動態敘述、表格；未提交。
# 2026-10-18: 已在桌機頁面確認細節標題已移除，固定總覽標題為「營運資源」，切換選單下方依選項顯示敘述，再接對應表格；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 依畫面回饋縮短「營運資源」總覽敘述與下方切換選單之間的垂直間距，桌機最大調整為 40px、手機為 28px；未提交。
# 2026-10-18: 已在桌機頁面確認總覽敘述至切換選單的實際間距為 40px，CSS cache key 已更新；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 縮短切換選單與下方動態敘述的間距至 8px，並增加動態敘述與表格之間的 16px 間距，避免廠區資訊較長時貼近表格；未提交。
# 2026-10-18: 已在桌機頁面確認切換選單到敘述為 8px、敘述到表格為 16px；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 再縮短切換選單到下方敘述的間距，改為 0px；敘述到表格維持 16px；未提交。
# 2026-10-18: 已在桌機頁面確認切換選單到敘述為 0px、敘述到表格為 16px，CSS cache key 已更新；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 為固定的「營運資源」標題加入與 About／Services／Careers 等頁面一致的橘色漸層裝飾線，手機版降為 2px；未提交。
# 2026-10-18: 已在桌機頁面確認「營運資源」裝飾線寬度 960px、高度 3px、上方間距 12px；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 依「規則一樣」要求，將營運資源標題裝飾線改為跟隨標題文字寬度，保留既有裝飾線高度與間距 token；未提交。
# 2026-10-18: 已在桌機頁面確認營運資源標題與裝飾線同寬約 117.6px，高度 3px、間距約 12px；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 將營運資源頁面的職業安全衛生區塊改為與上方營運資源同寬的 960px 內容區，桌機採左圖右側淺色文字面板，手機改為上下堆疊；未提交。
# 2026-10-18: 已在桌機頁面確認職業安全衛生區塊與營運資源同為 960px，左右欄各 480px，左圖右側文字面板呈現正常；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 調整職業安全衛生版型背景色，外層恢復白色，右側文字面板改用較明顯的淺灰區塊，讓圖片與文字區域形成清楚的左右拼接；未提交。
# 2026-10-18: 已在桌機頁面確認職業安全衛生外層背景為白色、右側文字面板為 `#f6f6f6`，並維持 960px 版型寬度；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 依參考版型調整職業安全衛生桌機圖片呈現，改為填滿左欄並與右側文字面板等高，移除桌機圖片圓角與欄間空白；手機維持原本堆疊樣式，未提交。
# 2026-10-18: 將職業安全衛生圖片裁切焦點微調至 58%，讓右側內容多顯示一些；縮小 `occupational-safety-title` 並改用 regular 字重；未提交。
# 2026-10-18: 已在桌機頁面確認職業安全衛生圖片 `object-position: 58% 50%`、標題約 36px 且字重為 400；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 依回饋再次縮小職業安全衛生標題，改為 `clamp(1.5rem, 2.2vw, 2rem)`，讓桌機視覺尺寸約 28px、最大 32px；未提交。
# 2026-10-18: 依回饋讓職業安全衛生圖片本體向左移 24px，並增加圖片寬度避免右側空白，使右側內容確實多顯示；未提交。
# 2026-10-18: 將營運資源頁「地理優勢」標題與敘述改為置中，並依相同規格加入橘色漸層裝飾線；未提交。
# 2026-10-18: 已在桌機頁面確認地理優勢標題與敘述置中，標題裝飾線高度 3px 且隨標題寬度呈現；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 先檢視 Inventec ESG 願景與策略頁的 `e-tabs`，依其 active tab 200ms 顏色過渡與內容 wrapper 400ms 橫向位移方式，將營運資源資料切換改為固定高度的水平滑動 track；未提交。
# 2026-10-18: 已在桌機頁面確認資料切換由右至左使用 400ms `transform` 滑動、active tab 使用 200ms 顏色／字重過渡，且切換後維持固定內容高度；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 將營運資源職業安全衛生區塊的「了解更多」按鈕高度改為沿用首頁關於亞太 CTA 的 `--button-primary-min-height`，由 40px 調整為 48px；未提交。
# 2026-10-18: 已在桌機頁面實際比對首頁與營運資源按鈕高度，兩者皆為 48px；手機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 重新整理營運資源手機版間距：收斂資料區塊與地理優勢上下留白、縮短總覽至切換選單距離、縮短 tab 項目與分隔線間距、收窄描述至表格距離，並重置手機職業安全圖片的桌機左移裁切；未提交。
# 2026-10-18: 已在 375px 手機 viewport 確認新樣式已透過 cache key `v30` 載入，頁面無橫向溢位；資料 tab 高度 40px、項目間距 12px、描述至表格 12px，職業安全圖片恢復滿寬置中；桌機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 重新校正手機版內容容器，修正後段 `width: 100%` 覆蓋全域 gutter 的問題；營運資源總覽、資料 feature 與職業安全 feature 改回 `var(--content-width)`，區塊上下間距改用 `var(--section-space-sm)`，內部描述間距改用 `var(--section-content-gap)`；未提交。
# 2026-10-18: 已在 375px 手機 viewport 確認營運資源主要內容左右各保留 20px gutter、內容寬度 335px、職業安全區塊同寬且頁面無橫向溢位；桌機、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 修正手機資料切換器沿用桌機最大高度造成的空白，手機改為依目前選中的表格內容高度平滑收合；桌機仍維持固定高度，未提交。
# 2026-10-18: 已在 375px 手機 viewport 確認廠區資訊表格結束後至職業安全區塊間距收斂為 48px，資料 panel 高度由 459px 降為目前內容高度 294px，CSS／JS cache key 為 `v32`／`v6`；實體裝置、桌機、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-18: 修正手機總覽敘述與切換選單間多出的 40px 空白 Grid row，讓 `#facilities .resource-feature--data` 僅保留實際 body row；區塊間距回到全域 20px，未提交。
# 2026-10-18: 補上最終手機 breakpoint 覆寫，避免 1099px 規則重新建立空的 title／intro row；未提交。
# 2026-10-18: 已完成 CSS 語法與 diff 檢查，最後一版手機覆寫已更新至 cache key `v34`；目前瀏覽器 viewport 已回到桌機，手機最終畫面尚待重新截圖確認，未提交。
# 2026-10-18: 依定案版重構營運資源 HTML／CSS：移除未引用的 `resource-animate`／舊區塊導向 class、已不存在區塊的選擇器、重複 CTA 與表格規則，合併資料切換器為單一穩定版型，並修正營運資源標題的 `aria-labelledby` 對應；未提交。
# 2026-10-18: 已完成 `git diff --check`、營運資源 JavaScript `node --check`，並在桌機瀏覽器確認 cache key `operational-resources-cleanup-v1`、三個切換項目、敘述更新、右至左滑動與固定 294px panel 高度；手機最終瀏覽器畫面、實體裝置、跨瀏覽器與人工無障礙驗證尚未完成，未提交。
# 2026-10-20: 縮小 services.html 內陸貨櫃集散站兩段說明的段落間距，將第二段的上方間距調整為 16px；已更新 services CSS cache key，未提交。
# 2026-10-20: 依需求移除 services.html 內陸貨櫃集散站兩段說明之間的額外段落間距，第二段 `margin-top` 改為 0；已更新 services CSS cache key，未提交。
# 2026-10-20: 將 services.html 內陸貨櫃集散站的「我們的優勢」由 3 個項目調整為使用者指定的 5 個段落，未提交。
# 2026-10-20: 為內陸貨櫃集散站五項優勢補上對應 h3 標題：安全監控管理、交通位置優勢、IICL專業檢驗、一站式物流服務、專業修櫃服務；未提交。
# 2026-10-20: 移除內陸貨櫃集散站優勢區塊的 warehouse media 欄位，讓優勢文字內容佔滿整個版面；更新 services CSS cache key，未提交。
# 2026-10-20: 將「我們的優勢」內文文字大小調整為與「主要服務項目」一致，兩者皆使用 `var(--font-size-body-copy)`；更新 services CSS cache key，未提交。
# 2026-10-20: 僅放大「我們的優勢」區塊標題，改用 `var(--font-size-section-heading)`；五個優勢項目 h3 恢復原本字級與行高，更新 services CSS cache key，未提交。
# 2026-10-20: 調整「我們的優勢」間距層級：區塊標題下方 32px、五項優勢間距 24px、項目標題與內文間距 6px；更新 services CSS cache key，未提交。
# 2026-10-20: 為「我們的優勢」五個項目標題加入既有 `.service-list__icon`，並調整標題內 icon 與文字的對齊；更新 services CSS cache key，未提交。
# 2026-10-20: 將「我們的優勢」五個項目前的 icon 改為 01～05 編號，保留標題排列與間距；更新 services CSS cache key，未提交。
# 2026-10-20: 將「我們的優勢」五段內文向右內縮，使用 `calc(2ch + 12px)` 對齊標題文字並建立層次；更新 services CSS cache key，未提交。
# 2026-10-20: 收斂內陸貨櫃集散地說明文字與圖片之間的空白，移除說明區塊多出的下方 padding，保留 Grid 基本間距；更新 services CSS cache key，未提交。
# 2026-10-20: 再移除內陸貨櫃集散地圖片在桌機版額外套用的上方 margin，讓說明文字與圖片實際間距回到 20px；更新 services CSS cache key，未提交。
# 2026-10-20: 參照 index 的底層旋轉灰色幾何層，加入 services 頁面幾何背景，並讓 `/services#warehousing` 的內容與優勢區塊透明以顯示斜角背景；更新 services CSS cache key，未提交。
# 2026-10-20: 補上 services 頁面灰色斜角背景的手機版尺寸與位置，並更新 CSS cache key；目前瀏覽器即時檢查仍受開發伺服器舊 CSS 回應影響，原始檔已完成，未提交。
# 2026-10-20: 修正 `/services#warehousing` hash 定位被 header 與 sticky 服務切換列遮住的問題，將服務區塊 scroll margin-top 調整為 160px；更新 services CSS cache key，未提交。
# 2026-10-20: 再增加 `/services#warehousing` hash 定位預留至 180px，消除標題與 sticky 服務切換列的剩餘重疊；更新 services CSS cache key，未提交。
# 2026-10-20: 修正桌機 `/services#warehousing` hash 狀態下內容上方 padding 小於服務切換列高度的問題，將目標區塊 padding-top 調整為 88px，避免標題被壓住；更新 services CSS cache key，未提交。
# 2026-10-20: 再拉開 `/services#warehousing` 切換選單與區塊標題的距離，hash 狀態下內容上方 padding 調整為 120px；更新 services CSS cache key，未提交。
# 2026-10-20: 收斂 services Hero 與服務切換選單之間多出的固定 Header 高度空白，桌機與手機分別以負 margin 78px／64px 將切換選單拉回 Hero 底部；更新 services CSS cache key，未提交。
# 2026-10-20: 修正幾何背景層級規則覆蓋服務切換選單造成無法點擊的問題，將 service-switcher z-index 恢復為 20；更新 services CSS cache key，未提交。
# 2026-10-20: 依需求移除 services 頁面灰色幾何背景與其層級／透明背景規則，避免影響全域；切換選單與 Hero 改為零額外 margin，緊接但不重疊，保留既有 hash 間距調整，更新 services CSS cache key，未提交。
# 2026-10-20: 將內陸貨櫃集散站內容面板 ID 由 `warehousing` 統一調整為 `inland-yard`，同步更新服務頁連結、ARIA、CSS 選擇器與首頁導向；倉儲物流 tab 維持共用此內容面板，更新 services CSS cache key，未提交。
# 2026-10-20: 建立獨立的 `warehousing` 倉儲物流內容面板，恢復原有倉儲文案、服務清單與獨立輪播；內陸貨櫃集散站使用 `inland-yard`，首頁倉儲物流卡片改導向 `#warehousing`，更新 services CSS cache key，未提交。
# 2026-10-20: 在獨立的 `warehousing` 倉儲物流面板補回自己的「我們的優勢」區塊，使用完整場站、多元倉儲與場區動線三項既有倉儲優勢內容；更新 services CSS cache key，未提交。
# 2026-10-20: 將倉儲物流「我們的優勢」比照內陸貨櫃集散站，移除圖片欄位、改為全寬文字、加入 01～03 編號並沿用相同層級與間距；更新 services CSS cache key，未提交。
# 2026-10-20: 為倉儲物流四項優勢補上對應 h3：「場內轉運效率」、「全方位整合服務」、「客製化作業能力」、「木材熱處理服務」，並將最後一項編號修正為 04；更新 services CSS cache key，未提交。
# 2026-10-20: 將碼頭裝卸版面比照倉儲物流：移除 reverse 版型與優勢圖片欄位，改為全寬優勢文字並加入 01～03 編號；更新 services CSS cache key，未提交。
# 2026-10-20: 為碼頭裝卸三項優勢補上對應 h3：「專業碼頭作業」、「一站式物流整合」、「全流程物流服務」；更新 services CSS cache key，未提交。
# 2026-10-20: 將機具維修與銷售的「我們的優勢」版面比照碼頭裝卸，移除圖片欄位、改為全寬文字並加入 01～03 編號；更新 services CSS cache key，未提交。
# 2026-10-20: 將碼頭裝卸圖片改為兩張圖輪播，使用 `container-yard-overview-4.png` 與 `container-yard-overview-3.png`，補上切換控制與無障礙標示；更新 services CSS cache key，未提交。
# 2026-10-20: 將內陸貨櫃集散地圖片輪播改為指定的 4 張圖片：`warehousing-yard.png`、`container-cleaning.jpg`、`container-yard-overview-1.png`、`new.png`，並同步更新輪播張數與替代文字，未提交。
# 2026-10-20: 將機具維修與銷售說明由三段收斂為兩段，第一段整合維修範圍與服務據點，第二段保留設備銷售及售後支援內容，未提交。
# 2026-10-20: 將服務內容說明文字在桌機版統一調整為 16px，手機版維持原有響應式文字尺寸；更新 services CSS cache key，未提交。
# 2026-10-20: 將內陸貨櫃集散地圖片與說明文字的間距恢復為其他服務選單共用的 Grid／下方 padding 間距，移除該選單的特殊零間距覆寫，未提交。
# 2026-10-20: 將四個服務選單「我們的優勢」內文在桌機版統一調整為 16px，手機版維持原有響應式文字尺寸；更新 services CSS cache key，未提交。
# 2026-10-20: 為四個服務選單「我們的優勢」標題加入與主要服務標題相同的橘灰漸層裝飾線；更新 services CSS cache key，未提交。
# 2026-10-20: 將四個服務選單「我們的優勢」標題字重調整為粗體，桌機與手機一致；更新 services CSS cache key，未提交。
# 2026-10-20: 將四個服務選單主標題與「我們的優勢」標題統一調整為粗體；更新 services CSS cache key，未提交。
# 2026-10-20: 移除內陸貨櫃集散地 hash 狀態專屬的 120px 頂部間距，讓切換後標題與其他服務選單對齊；保留既有 scroll margin，更新 services CSS cache key，未提交。
# 2026-10-20: 依需求改為真正的滑出／滑入切換，services 四個面板共用 viewport／track，以 500ms `translateX` 橫向平移呈現前後內容；支援 reduced-motion，並同步更新 CSS／JS cache key，未提交。
# 2026-10-20: 將 index「我們的服務」四張卡片名稱與服務頁統一為「內陸貨櫃集散站、倉儲物流、碼頭裝卸、機具銷售與維修」，並修正第一張卡片連結至 `#inland-yard`，未提交。
# 2026-10-20: 補上 index「我們的服務」四張卡片對應的簡短服務敘述，包含內陸貨櫃集散站、倉儲物流、碼頭裝卸與機具銷售與維修，未提交。
# 2026-10-20: 將 about「子公司簡介」六張卡片背景色調整為 `#d8d8d6`，更新 about CSS cache key，未提交。
# 2026-10-21: 加強 index「我們的服務」卡片底部深色漸層遮罩，將底部透明度由 72% 提高至 86%、中段由 30% 提高至 38%，提升展開卡片底部文字可讀性；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 所有 `.home-section-eyebrow` 英文小標題統一調整為 24px、`#999999`，並同步更新 NEWS 區塊覆寫與 home CSS cache key；未提交。
# 2026-10-21: 移除 index 最新消息區塊英文小標題的專屬顏色覆寫，改由共用 `.home-section-eyebrow` 規則統一控制；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息區塊恢復為淺色背景 `var(--color-surface-section)`，同步將標題、日期、新聞標題、分隔線與 hover 狀態改回深色系；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息區塊背景改為透明，不使用深色或淺色背景；保留深色文字、淺色分隔線與 hover 對比，更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息淺色背景限定在新聞列表容器，標題區與列表左右外側維持透明；更新 home CSS cache key，未提交。
# 2026-10-21: 移除 `.home-page .home-latest` 背景色，將深色背景恢復至 `.home-latest__list` 列表容器，並同步恢復列表內白色文字、分隔線與 hover 樣式；更新 home CSS cache key，未提交。
# 2026-10-21: 增加 index 最新消息列表項目的左右內距，桌機使用 `clamp(20px, 3vw, 40px)`、手機使用 16px，避免文字貼近深色列表邊緣；更新 home CSS cache key，未提交。
# 2026-10-21: 拉開 index 每則最新消息的垂直間距，桌機列表項目上下 padding 調整為 28px、手機為 20px，標題上方間距調整為 12px；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息深色背景從整個列表容器移至每一筆消息，項目之間改用透明 gap 分隔；桌機 gap 12px、手機 gap 10px，更新 home CSS cache key，未提交。
# 2026-10-21: 為 index 每一筆最新消息深色卡片加入輕微 4px 圓角，更新 home CSS cache key，未提交。
# 2026-10-21: 收斂 index 最新消息列表內距，桌機每筆上下留白調整為 20px、手機為 16px，日期／分類到標題間距調整為 8px；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 每筆最新消息卡片背景由深色改為 `#d8d8d6`，同步改用深色文字與淺色背景適用的 hover 狀態；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index `.home-page .home-latest__item h3` 字重由 regular 提高一級至 heading，更新 home CSS cache key，未提交。
# 2026-10-21: 調整 index 最新消息互動：hover／focus 不改變卡片背景，只將標題變為主題橘；列表右側預設顯示主題橘箭頭，hover／focus 時向右位移 5px，更新 home CSS cache key，未提交。
# 2026-10-21: 收窄 index 最新消息日期／類別與標題之間的距離，移除 meta 下方 8px 留白並將標題上方間距調整為 4px；更新 home CSS cache key，未提交。
# 2026-10-21: 移除 index 最新消息列表項目背景色，並讓 hover／focus 維持透明，保留文字、箭頭與列表間距；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息整理為獨立卡片樣式，每則消息使用白色背景、淡邊框、6px 圓角與 12px 間距；移除不必要的首末筆 border 覆寫，hover 僅保留標題與箭頭互動；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息改為正方形卡片排列，桌機四張同列、521–1100px 顯示兩張、520px 以下顯示單張；沿用既有輪播位移與箭頭互動，更新 home CSS cache key，未提交。
# 2026-10-21: 恢復 index 最新消息封面圖邏輯：公告有 `ImageUrl` 時使用公告圖片，沒有時使用 `/public/images/index/news1.png`；SSR 與前端 API 卡片同步顯示上方圖片，更新 CSS／JS cache key，未提交。
# 2026-10-21: 暫時移除 index `.home-page .home-affiliates::before` 幾何背景裝飾規則，保留集團事業群內容與其他版型；更新 home CSS cache key，未提交。
# 2026-10-21: 清理並調整 index 最新消息卡片為編輯式呈現：移除外框、整卡背景與多餘 hover 規則，保留正方形比例，圖片獨立圓角呈現，文字區改為透明資訊區；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息改回參考圖的單列列表樣式，移除首頁 SSR／前端 API 的封面圖與預設圖邏輯；日期置左、分類與標題置中、箭頭置右，清理正方形卡片相關 CSS／JS，更新 cache key，未提交。
# 2026-10-21: 收窄 index 最新消息列表日期欄位與欄距，桌機第一欄改為最多 120px、欄距 12px，手機欄距改為 8px，讓日期更靠近分類與標題；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息日期移至標題起始位置上方，分類接在日期後方，標題與日期／分類共用同一個內容起始線；移除獨立日期欄位，更新 home CSS cache key，未提交。
# 2026-10-21: 為 index 最新消息標題加入 hover／focus 橘色底線動畫，底線由左至右展開並保留標題變橘效果；更新 home CSS cache key，未提交。
# 2026-10-21: 修正 index 最新消息標題底線動畫改為跟隨文字寬度，不再延伸至整個標題欄位；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息標題底線調細為 1px，並將文字與底線距離收窄至 2px；更新 home CSS cache key，未提交。
# 2026-10-21: 再將 index 最新消息標題底線上移至文字行底部 `bottom: 0`，縮短文字與線條的視覺距離；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息標題底線再上移 2px，改為 `bottom: 2px`，使線條更貼近文字；更新 home CSS cache key，未提交。
# 2026-10-21: 調整 index 最新消息「更多資訊」按鈕，預設使用 `rgb(245 130 20 / 54%)` 背景與白字，hover／focus 改為主題橘背景與白字，保留既有 icon 動畫；更新 home CSS cache key，未提交。
# 2026-10-21: 移除 index 最新消息「更多資訊」按鈕的邊框線，預設與 hover／focus 均僅使用背景色與文字／icon 效果；更新 home CSS cache key，未提交。
# 2026-10-21: 放大 index 最新消息「更多資訊」按鈕，最小高度調整為 52px、左右內距 24px、上下內距 4px；更新 home CSS cache key，未提交。
# 2026-10-21: 清理 index「更多資訊」icon 的 CSS 視覺屬性覆寫，移除尺寸與 stroke 設定，改由 `home.js` 的 `createArrow()` 統一提供，CSS 僅保留定位與動畫；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index 最新消息「更多資訊」icon 改為與「關於亞太／了解更多」相同的 16px 箭頭規格與 path，保留最新消息按鈕的滑入動畫；更新 home JS cache key，未提交。
# 2026-10-21: 修正兩個了解更多類型按鈕的 icon 共用樣式，將 16px、1.4px stroke、描邊端點與填色設定移至共用 `.home-text-link__icon`，移除個別覆寫；更新 home CSS cache key，未提交。
# 2026-10-21: 將「關於亞太／了解更多」與最新消息「更多資訊」共用 `.home-primary-action` 主要按鈕樣式，統一尺寸、背景、文字、hover／focus 與 icon 滑入效果；更新 home CSS cache key，未提交。
# 2026-10-21: 移除 About 舊 icon 容器的深色文字色覆寫，讓 `.home-primary-action` 的 icon 繼承白色；保留共用主要按鈕結構並更新 home CSS cache key，未提交。
# 2026-10-21: 修正首頁斜灰幾何圖形僅固定 `550px` 高度，將其改為響應式 `clamp(900px, 72vw, 1180px)`，延伸至集團事業群區塊；更新 home CSS cache key，未提交。
# 2026-10-21: 依需求恢復首頁斜灰幾何圖形原本的 `550px` 高度，撤回上一筆延伸調整並還原 home CSS cache key，未提交。
# 2026-10-21: 將首頁斜灰幾何背景層由 `absolute` 改為固定於瀏覽器視窗的 `fixed`，維持全視窗背景並保留內容層級；更新 home CSS cache key，未提交。
# 2026-10-21: 依需求撤回斜灰幾何背景層的 `fixed` 設定，恢復原本 `absolute` 定位與頁面高度計算；還原 home CSS cache key，未提交。
# 2026-10-21: 重整首頁斜灰背景：將最新消息與集團事業群包入 `.home-news-affiliates-stage`，以容器內容高度承載固定 `skewX(-20deg)` 背景層，移除全頁 `100vw`／`28vw`／旋轉幾何估算，並將集團事業群背景改為透明；更新 home CSS cache key，待桌面瀏覽器驗證。
# 2026-10-21: 依國泰首頁實際折返造型，將 stage 背景改為兩條等寬極淡灰長帶，分別以 `45deg` 與 `-45deg` 旋轉並共用明確折返錨點；恢復下段灰帶、保留透明集團區塊背景，更新 home CSS cache key，待不同桌面寬度驗證。
# 2026-10-21: 修正首頁折返背景範圍與接角：將共同容器上移至關於亞太、服務、最新消息、集團事業群四個區塊，兩條長帶放大為桌面 clamp(360px, 28vw, 550px)，以共享尖角 clip-path 形成乾淨「〈」形，消除重疊菱形與突角；更新 home CSS cache key，待 1440／1536／1920px 驗證。
# 2026-10-21: 已以 Edge 實際檢視首頁 1912px 桌面視窗，確認四區塊共用容器、上段與下段灰帶連續、集團事業群透明背景與尖角接合；目前瀏覽器工具無法直接切換至 1440／1536px 視窗，兩個精確寬度仍待後續驗證。
# 2026-10-21: 重做首頁折返背景幾何：移除獨立頂點 X／Y、clamp 帶寬與兩段 clip-path，改用單一 SVG 多邊形路徑，以 1920px 基準座標等比例縮放，延長下段至容器裁切範圍外，避免 Hero 入口缺口、折返裂縫、交疊菱形與縮放比例漂移；更新 home CSS cache key，待 1280／1440／1920px 驗證。
# 2026-10-21: 移除 SVG 背景元素本身的整片填色，只保留折返 path 填色，並更新 home CSS cache key，避免灰帶外區域被整片染灰。
# 2026-10-21: 修正 SVG 外框自我交叉：保留單一 path 元素，改為兩個共享折返座標的 45° 等寬子路徑與不透明同色填滿，更新 home CSS cache key，待 1280／1440／1920px 驗證。
# 2026-10-21: 將折返子路徑端面收斂至單一共享頂點，移除等寬端面互穿造成的 X 型接角；更新 home CSS cache key，待 1280／1440／1920px 驗證。
# 2026-10-21: 改用單一 SVG 45° 折線 stroke 建立等寬折返帶，使用 `stroke-width: 550`、miter join 與容器裁切，移除多邊形端面交疊與尖角缺口；更新 home CSS cache key，待 1280／1440／1920px 驗證。
# 2026-10-21: Edge 實際檢視 1912px 桌面寬度，確認 SVG 折返帶由服務區延伸至最新消息與集團事業群、接角無 X 型交疊且下段未在內容底部前截斷；1280／1440／1920px 精確視窗切換仍待可調整瀏覽器視窗後驗證。
# 2026-10-21: 將首頁 SVG 折返灰色幾何圖形改為 `#fafafa`，更新 home CSS cache key。
# 2026-10-21: 放大 index「我們的服務」卡片，清除前段被覆寫的重複尺寸規則，將最終生效的桌機容器調整為 1320px、卡片高度調整為 480px，中型桌機調整為 410px，保留既有四欄展開互動與手機比例；更新 home CSS cache key，未提交。
# 2026-10-21: 將 index「關於亞太」點陣背景限制在左側顯示，改用左側定位與 66% 背景寬度，移除右側點陣以避免與灰色幾何折返線條互相干擾；手機版同步左側定位，更新 home CSS cache key，未提交。
# 2026-10-21: 移除最新消息空狀態面板邊框，改以橘色公告 icon 搭配置中文字呈現；整理空狀態 CSS，更新 home CSS／JS cache key，未提交。
# 2026-10-21: 將最新消息空狀態公告 icon 調整為 70x70px，更新 home CSS cache key，未提交。
# 2026-10-21: 修正最新消息左右版面重複顯示第一則公告的問題，第一則僅作為左側主視覺，右側列表從第二則公告開始呈現；更新 home JS cache key，未提交。
# 2026-10-21: 將 index 最新消息「更多資訊」按鈕移入標題列，桌機版置於區塊右上角並與標題對齊，手機版改為標題下方置中；移除原本底部定位並更新 CSS／JS cache key，未提交。
# 2026-10-21: 在 index 左側最新消息主視覺的類別前加入公告日期，並與第一則公告資料同步更新；更新 home CSS／JS cache key，未提交。
# 2026-10-21: 在 index 左側最新消息主視覺左上角加入橘色置頂圖釘提示 icon，搭配淡白圓形底辨識主卡為消息而非單純照片；更新 home CSS cache key，未提交。
# 2026-10-21: 將最新消息主卡左上角提示改用 `<i class="ph ph-push-pin"></i>` Phosphor icon，移除手寫 SVG 與其專用樣式；更新 home CSS cache key，未提交。
# 2026-10-21: 將最新消息主卡左上角提示改用 `wwwroot/public/images/icon/push-pin.svg` 圖片資產，移除 Phosphor icon 覆寫；更新 home CSS cache key，未提交。
# 2026-10-21: 將最新消息左側封面遮罩調整為下方 25% 淡入、黑色 30% 透明度，更新 home CSS cache key，未提交。
# 2026-10-21: 將全站基礎 `--font-size-body` 由 16px 調整為 17px；保留 1023px 以下的響應式 15px 設定，未提交。
# 2026-10-21: 將 index「關於亞太」按鈕改為桌機左欄底部對齊右側圖片底部，透過內容欄 flex 與 auto margin 拉開敘述與按鈕距離；手機版維持自然垂直間距，更新 home CSS cache key，未提交。
# 2026-10-21: 修正關於亞太對齊調整未被瀏覽器舊 CSS 快取套用的問題，更新 home CSS cache key 至 v2。
# 2026-10-21: 將 index 最新消息改為桌機左右版面，左側新增第一則公告的動態封面圖（無圖時使用 `news1.png`），右側保留消息列表與更多資訊按鈕；手機版改為上下排列，更新 home CSS／JS cache key，未提交。
# 2026-10-21: 修正最新消息左右版面未套用新版 JS cache key 的問題，讓第一則公告的圖片與標題能正確同步至左側主視覺。
# 2026-10-21: 新增 index 最新消息無已發布資料時的空狀態，隱藏預設封面與查看公告文案，改以跨欄簡潔提示面板呈現；更新 home CSS／JS cache key，未提交。
# 2026-10-21: 移除最新消息空狀態面板邊框，改以橘色公告 icon 搭配置中文字呈現；整理空狀態 CSS，更新 home CSS／JS cache key，未提交。
# 2026-10-21: 移除首頁 `.home-affiliates__media` 的 `box-shadow`，更新 home CSS cache key。
# 2026-10-21: 修正 SVG 折返背景右上角白色缺口：沿 45° 將上段起點延伸至容器上方／右側之外，並將共享折返錨點調整至同一條幾何線，更新 home CSS cache key，保留容器裁切與 `pointer-events: none`。
# 2026-10-21: 將 SVG 折返點由 `L300 1600` 下移回 `L300 1900`，同步重算上段 `M3000 -800` 與下段 `L4200 5800`，維持兩段斜率絕對值 1、45° 角度、目前帶寬及右上角畫布外延伸；更新 home CSS cache key。
# 2026-10-21: 將首頁 SVG 折返角度由 45° 調整為約 35°，改用 `M3500 -800L-500 2000L4500 5500`，兩段斜率絕對值約 0.7，折返點下移並保留右上角畫布外延伸與下段內容裁切；更新 home CSS cache key。
# 2026-10-21: 將 index「關於亞太」點陣背景限制在左側顯示，改用左側定位與 66% 背景寬度，移除右側點陣以避免與灰色幾何折返線條互相干擾；手機版同步左側定位，更新 home CSS cache key，未提交。
