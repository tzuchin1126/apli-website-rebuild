# APLI Website Rebuild TODO

- [x] 2026-08-13：依已記錄的精確基準，恢復首頁 Hero 原始波浪。
  - 範圍：`wwwroot/index.html`、`wwwroot/css/pages/home.css`、`TODO.md`。
  - 內容：恢復原始 1 個白色 cutout 與 shadow／main／olive／pink／hairline 5 條裝飾線，並逐項還原桌機與手機的波浪尺寸、位置、線條顏色與粗細，以及輪播圓點高度；進場動畫維持原始設定。
  - 快取：只更新 `home.css` 查詢參數，確保瀏覽器取得恢復後的樣式；不改變波浪視覺數據。
  - 已驗證：6 個 SVG path 的 class 與路徑資料、桌機／手機容器尺寸、5 條線的顏色與粗細、輪播圓點位置及進場動畫均與下方既有恢復基準逐項一致；簡化版 accent path／selector 殘留為 0；`dotnet build -c Release`（0 warnings、0 errors）；全工作樹 `git diff --check`。
  - 未驗證：本次依使用者要求不進行瀏覽器／實機驗證；桌機／手機實際畫面、Safari／Firefox 與人工無障礙驗收未進行。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：簡化首頁 Hero 波浪並保留精確恢復基準。
  - 範圍：`wwwroot/index.html`、`wwwroot/css/pages/home.css`、`TODO.md`。
  - 調整前恢復基準：SVG 為 `viewBox="0 0 1440 260"`、`preserveAspectRatio="none"`，共 1 個白色 cutout 與 5 條裝飾線。
  - 原始 paths：cutout／shadow=`M-90 174 C168 242 332 206 532 144 C724 84 886 62 1076 98 C1238 130 1358 150 1530 98`（cutout 另接 `L1530 260 L-90 260 Z`）；main=`M-80 156 C174 222 338 190 534 132 C726 74 890 54 1078 88 C1242 118 1362 138 1530 88`；olive=`M-88 139 C166 204 336 174 530 118 C724 62 892 42 1086 78 C1246 106 1366 126 1538 78`；pink=`M-84 124 C170 190 334 160 530 106 C724 52 896 34 1090 70 C1248 98 1370 116 1538 68`；hairline=`M-70 112 C188 176 350 150 542 96 C730 44 898 28 1094 60 C1258 86 1384 100 1544 54`。
  - 原始桌機 CSS：容器 `bottom:-8px; width:116vw; height:clamp(118px,17vh,168px)`；shadow `rgb(17 34 57 / 58%) 18px`、main `rgb(31 62 93 / 78%) 12px`、olive `rgb(237 150 52 / 92%) 9px`、pink `rgb(255 255 255 / 76%) 5px`、hairline `rgb(138 190 216 / 68%) 3px`；圓點 `bottom:clamp(142px,calc(17vh + 20px),188px)`。
  - 原始手機 CSS（≤760px）：`bottom:-6px; width:158vw; height:112px`；圓點 `bottom:124px`。原始進場動畫為 `.9s cubic-bezier(.22,1,.36,1) .68s both`，位移由 `translate(-50%,28px)` 到 `translate(-50%,0)`。
  - 新版內容：改為白色 cutout、8px 深藍主線與 4px 橘色細線，共 3 個 paths；曲線控制點改為較平緩的 `M-90 184 C190 232 360 204 548 154 C730 106 902 82 1082 112 C1248 140 1376 146 1530 104`，橘線沿相同曲線上移 16 單位。桌機容器改為 `bottom:-6px; width:108vw; height:clamp(96px,12vh,128px)`，圓點改為 `clamp(112px,calc(12vh + 18px),146px)`；手機改為 `bottom:-4px; width:148vw; height:96px`，圓點 `108px`。進場動畫及 Reduced Motion 行為維持不變。
  - 已驗證：原始恢復基準與修改前來源逐項核對；新版 SVG 共有 3 個 paths，舊 shadow／olive／pink／hairline markup 與 selector 殘留為 0；新版 CSS 快取參數、`dotnet build -c Release`（0 warnings、0 errors）及全工作樹 `git diff --check`。
  - 未驗證：目前 Browser 執行環境沒有可用瀏覽器，尚未確認新版桌機／手機實際曲線、圓點距離及進場動畫；Safari／Firefox、實體裝置與人工無障礙驗收亦未進行。
  - 狀態：此版經使用者比較後未採用；已依上方項目恢復原始波浪。以上「調整前恢復基準」仍保留作為精確還原紀錄。

- [x] 2026-08-13：移除全站 Header 搜尋入口，改為電話與寄信快速連結。
  - 範圍：14 個 `wwwroot/*.html` 公開靜態頁、`Pages/Shared/_Layout.cshtml`、`TODO.md`。
  - 內容：原信封 icon 改為電話 icon，連結仍導向聯絡我們頁面；原搜尋 icon／`#search` 連結改為信封 icon與 `mailto:apadm@mail.apli.com.tw`。同步補上「前往聯絡我們頁面」及「寄信給亞太國際物流」無障礙名稱；盤點確認專案原本沒有獨立搜尋面板、CSS 或 JavaScript 搜尋功能，因此無其他搜尋程式需要移除。
  - 已驗證：14／14 個公開靜態頁及 Razor Layout 均各有一組電話／寄信連結；`#search`、搜尋無障礙名稱與舊「郵件／搜尋」註解殘留為 0；`dotnet build -c Release`（0 warnings、0 errors）；全工作樹 `git diff --check`。
  - 未驗證：目前 Browser 執行環境沒有可用瀏覽器，尚未確認桌機／手機 icon 外觀與點擊；作業系統郵件程式啟動、Safari／Firefox、實體裝置與人工無障礙驗收亦未進行。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：補回關係企業、人才招募與公司沿革頁面的共用 Footer。
  - 範圍：`wwwroot/affiliates.html`、`wwwroot/join.html`、`wwwroot/milestones.html`、`TODO.md`。
  - 原因：三頁已列在 `Program.cs` 的共用 Footer 注入白名單，但 HTML 缺少 `<!-- shared-site-footer -->` 標記，伺服器沒有可替換的位置。
  - 內容：在三頁 `main` 後補上共用 Footer 標記，沿用 `_Footer.cshtml` 唯一來源及既有注入流程，不複製 Footer HTML。
  - 已驗證：三頁各有且僅有一個 Footer 標記，並各自在 `Program.cs` 白名單出現一次；`dotnet build -c Release`（0 warnings、0 errors）；全工作樹 `git diff --check`。
  - 未驗證：目前 `localhost:5127` 沒有服務運行，尚未完成 HTTP Footer 注入與桌機／手機瀏覽器實際畫面；Safari／Firefox、實體裝置與人工無障礙驗收亦未進行。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：上移全站回到頂端按鈕，避開 Footer 員工專區。
  - 範圍：`wwwroot/css/components/back-to-top.css`、`wwwroot/css/site.css`、14 個 `wwwroot/*.html` 公開靜態頁、`TODO.md`。
  - 內容：依 Footer 深色底列 56px 高度，將按鈕桌機底部距離由 24px 調為 80px、手機由 16px 調為 72px，保留安全區計算，使按鈕完整位於「隱私權政策／員工專區」上方；同步更新共用樣式及元件快取版本。
  - 已驗證：14／14 個公開靜態頁均載入新版 `site.css`，元件匯入帶新版快取參數；`dotnet build -c Release`（0 warnings、0 errors）；全工作樹 `git diff --check`。
  - 未驗證：目前 Browser 執行環境沒有可用瀏覽器，尚未確認桌機／手機實際位置；Safari／Firefox、實體裝置與人工無障礙驗收亦未進行。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：為全站長頁面加入條件式回到頂端按鈕。
  - 範圍：`wwwroot/js/site.js`、`wwwroot/css/site.css`、`wwwroot/css/components/back-to-top.css`、14 個 `wwwroot/*.html` 公開靜態頁、`TODO.md`。
  - 內容：由共用 `site.js` 自動建立按鈕，頁面可捲動距離超過 320px 且向下捲動約半個畫面後才顯示；短頁面不建立可操作狀態。按鈕支援鍵盤 focus、Reduced Motion、動態內容高度與手機安全區，靜態頁統一更新共用 CSS／JS 快取版本；Razor Layout 沿用既有 `asp-append-version`。
  - 已驗證：`node --check wwwroot/js/site.js`；14／14 個公開靜態頁均載入新版 `site.css`／`site.js`，Razor Layout 維持共用載入；`dotnet build -c Release`（0 warnings、0 errors）；全工作樹 `git diff --check`。
  - 未驗證：目前 Browser 執行環境沒有可用瀏覽器，尚未確認桌機／手機實際顯示、捲動及鍵盤操作；Safari／Firefox、實體裝置與人工無障礙驗收亦未進行。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：限制消息內頁上傳圖片的顯示尺寸。
  - 範圍：`wwwroot/css/pages/news-detail.css`、`wwwroot/news-detail.html`、`TODO.md`。
  - 內容：消息圖片由最大寬度 720px 調整為 640px，新增桌機與手機可視高度上限；圖片維持原始比例並完整顯示，不以裁切方式縮圖。靜態消息內頁同步更新 CSS 快取版本，Razor 消息內頁仍透過 `asp-append-version` 取得新版樣式。
  - 已驗證：靜態與 Razor 消息內頁共用 `.news-detail__image` 規則、來源 selector／快取版本檢查、`dotnet build -c Release`（0 warnings、0 errors）與範圍內 `git diff --check`。
  - 未驗證：目前 Browser 執行環境沒有可用瀏覽器，尚未確認桌機／手機實際圖片尺寸；Safari／Firefox、實體裝置與人工無障礙驗收亦未進行。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：修正首頁最新消息卡片無法開啟消息內頁。
  - 範圍：`wwwroot/js/pages/home.js`、`wwwroot/css/pages/home.css`、`wwwroot/index.html`、`TODO.md`。
  - 原因：滑鼠按下卡片時，首頁拖曳程式立即將 pointer capture 綁到外層 viewport；即使沒有拖曳，放開時 click 目標仍可能被重定向至 viewport，導致原生 `<a>` 不啟動。首頁卡片另使用 Razor 專屬的 `/news/{id}` 網址，與目前公開靜態消息流程 `news-detail.html?id={id}` 不一致；卡片 hover 在觸控裝置也存在首次輕觸只切換 hover 的風險。
  - 內容：改為滑鼠移動超過 4px 拖曳門檻後才啟用 pointer capture，普通點擊保留原生連結；首頁卡片統一使用既有靜態詳情頁 query-string 網址；粗指標／無 hover 裝置停用卡片 hover 遮罩與縮放並直接顯示裝飾圖示，桌機滑鼠及鍵盤 focus 效果維持；同步更新首頁 CSS／JS 快取版本參數，避免裝置沿用舊檔。
  - 已驗證：`node --check wwwroot/js/pages/home.js`、`node --check wwwroot/js/pages/news-detail.js`；首頁與靜態消息列表的詳情網址格式一致；抽取目前第一筆公開消息 ID 產生 `news-detail.html?id=...` 並確認詳情腳本以相同 query ID 讀取 `data/news.json`；Production HTTP 驗證首頁與帶有效 ID 的 `news-detail.html` 均為 200，首頁回應包含新版 `home.js`；桌機 Edge 1366×900 實際點擊第一張消息卡片，網址成功切換至 `news-detail.html?id=...`，詳情區顯示且標題正確；`dotnet build -c Release`（0 warnings、0 errors）；範圍內 `git diff --check`。
  - 未驗證：手機觸控 hover 行為、Safari／Firefox、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [ ] 2026-08-13：盤點並修復既有消息圖片的失效引用。
  - 發現：本次桌機消息導向驗證中，`/api/uploads/news/aca1d89bd91f40878fc374623eb48d03.png` 與 `/api/uploads/news/02c59acf168f46e89e4c56de407121df.jpg` 回應 404；目前 `App_Data/news/` 沒有對應檔案。此問題不影響消息卡片導向與文字詳情顯示，且不在本次修正範圍，因此未自行修改消息資料或上傳檔案。
  - 待驗證：確認原始圖片來源、應補回檔案或清除失效 `ImageUrl`，並檢查其他消息附件／圖片。

- [x] 2026-08-13：載入 Google Fonts，統一手機與桌機中文字型。
  - 範圍：14 個 `wwwroot/*.html` 公開靜態頁、`Pages/Shared/_Layout.cshtml`、`TODO.md`。
  - 內容：比照台泥官網的外部字型載入方式，預連線 Google Fonts／Google Fonts Static，載入 `Noto Sans TC` 400／500／600／700 與 `Noto Serif TC` 400／500／600，讓既有 `--font-body`、`--font-heading` 在未安裝 Noto 字型的手機上仍能取得實際 Webfont。
  - 已驗證：14／14 個公開靜態 HTML 與 Razor 共用 Layout 均載入同一組 preconnect／stylesheet；以 iPhone Safari User-Agent 唯讀取得 Google Fonts CSS，確認 Sans 400／500／600／700、Serif 400／500／600、`font-display: swap` 與 `fonts.gstatic.com` WOFF2 分割字型來源；`dotnet build -c Release`（0 warnings、0 errors）；範圍內 `git diff --check`。
  - 未驗證：目前 Browser 執行環境沒有可用瀏覽器，尚未確認實際 Rendered Font、桌機／手機畫面與字型載入前後的版面位移；Safari／Firefox、實體裝置、外部 Google Fonts 被封鎖時的視覺 fallback 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：更新共用 Footer 的職安頁面名稱。
  - 範圍：`Pages/Shared/_Footer.cshtml`、`TODO.md`。
  - 內容：將營運資源欄位中的「健康與安全」改為正式頁名「職業安全衛生」，連結仍維持 `/occupational-safety.html`；所有 Razor 與伺服器注入的靜態頁 Footer 共用此唯一來源。
  - 已驗證：共用 Footer 來源文字／連結檢查與範圍內 `git diff --check`。
  - 未驗證：依使用者要求未進行瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：依舊版完成 404、500 與隱私權政策頁面。
  - 範圍：`Program.cs`、`Pages/Privacy.cshtml.cs`、`wwwroot/404.html`、`wwwroot/500.html`、`wwwroot/privacy.html`、`wwwroot/css/pages/error-pages.css`、`wwwroot/css/pages/privacy.css`、`TODO.md`。
  - 內容：以舊版正式文案與視覺層級為參考，使用新版共用 Header、Footer、tokens、按鈕與原生頁面 scoped CSS 重建 404／500；Production 公開頁的未處理例外改由 500 頁承接，非 API 的 404／500 空白狀態回應會載入對應品牌頁並保留原狀態碼，API 錯誤不轉為 HTML。隱私權頁補齊 2026 年 7 月 31 日來源版七節政策、Breadcrumb、共用 Hero 與政策內容卡；Razor `/Privacy` 永久導向 `/privacy.html`，避免兩份政策內容分歧。未搬入舊版 Tailwind、Lucide 或共用舊樣式。
  - 已驗證：舊版三頁文案／素材／RWD 規則比對；三張 Privacy 圖片 SHA-256 與舊版一致；`node --check wwwroot/js/site.js`；`dotnet build -c Release`（0 warnings、0 errors）；範圍內 `git diff --check`；Production HTTP 驗證 `/privacy.html` 200、`/Privacy` 301 至 `/privacy.html`、直接 `/404.html` 與 `/500.html` 200、未知公開網址 404 且顯示品牌頁、未知 `/api` 網址 404 且維持空 body，三個靜態頁均只注入一份 Footer。
  - 未驗證：Browser 技能執行環境未提供可用瀏覽器，因此未完成本次桌機／手機實際渲染；未以受控例外端對端觸發 Production 500，只完成直接頁面、路由設定與建置檢查；舊版政策文案尚未確認為法務核定版本；Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：放大 Services 區塊內容敘述文字。
  - 範圍：`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`。
  - 內容：桌機敘述文字由 16px 調為 17px 並微增行高，手機維持 16px，避免窄螢幕換行過碎；同步更新 Services CSS 快取版本參數。
  - 已驗證：來源 selector 檢查與範圍內 `git diff --check`。
  - 未驗證：待補本次字級修改後桌機／手機實際渲染、Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：補足 Services 服務區塊的內容敘述。
  - 範圍：`wwwroot/services.html`、`TODO.md`。
  - 內容：恢復舊版既有的倉儲場區與調度說明；依舊版既有服務清單及作業特色，為貨櫃清洗與維修補上清洗、檢查、結構維修、噴砂、除銹、噴漆、車架整修及場站配合說明；機具維修原有三段內容維持不變。
  - 已驗證：舊版文案／服務內容來源比對、目前頁面結構檢查與範圍內 `git diff --check`；Edge 1366×900 與 390×844 實際渲染，確認倉儲及貨櫃清洗均為兩段敘述且標題區高度一致、機具維修維持三段，兩種尺寸均無文字／水平溢位且 console 無 error／warning。
  - 未驗證：Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：依參考圖調整 Services 三個服務區塊的標題與敘述排列。
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 內容：三區統一改為中文標題置中、英文副標置於下方並置中，移除標題橘色底線；敘述文字另起一列、橫跨服務區塊並維持靠左閱讀，圖片拼貼與服務清單不變；同步更新 Services 頁面 CSS 快取版本參數。
  - 已驗證：來源結構／selector 檢查與範圍內 `git diff --check`；Edge 1366×900 與 390×844 實際渲染，確認三區中文標題及英文副標置中、敘述靠左且順序正確、標題不再顯示底線、圖片與服務清單順序維持，兩種尺寸均無水平溢位且 console 無 error／warning。
  - 未驗證：Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：恢復 `contact.html` Hero，沿用聯絡頁主視覺，並將公司地址、總機、服務時間、Google 地圖與 Google Maps 外連整合至 Hero；下方保留各部門聯絡窗口。已驗證 1366px 桌機與 390px 手機版面、Hero 內容完整呈現且無水平溢位；此檢查環境未顯示外部 Google 地圖 iframe 內容，地圖實際畫面仍待正式環境確認。
- [x] 2026-08-13：統一 `contact.html` Hero 高度，改回共用 `--page-hero-height`（桌機 350px、手機 280px），並壓縮 Hero 內公司資訊與 Google 地圖配置以維持內容完整；已驗證桌機／手機 Hero 高度、內容位置與無水平溢位。此檢查環境未顯示外部 Google 地圖 iframe 內容，地圖實際畫面仍待正式環境確認。
- [x] 2026-08-13：將 Contact Hero 左側改為公司資訊（公司名稱、地址、總機、服務信箱 `apadm@mail.apli.com.tw`、服務時間），右側改為 Google 地圖；沿用共用 Hero 高度。已驗證 1366px 桌機與 390px 手機版面、信箱 mailto 連結與無水平溢位；此檢查環境未顯示外部 Google 地圖 iframe 內容，地圖實際畫面仍待正式環境確認。
- [x] 2026-08-13：移除 Contact Hero 的 `contact-hero__eyebrow` 與 `contact-hero__map-link`，放大 `contact-hero__list` 文字，並將 Hero 圖片焦點由 52% 調整至 30% 以顯示更多上方畫面；已驗證 1366px 桌機與 390px 手機版面、固定 Hero 高度、元素移除與無水平溢位。
- [x] 2026-08-13：在 Contact Hero 公司資訊最後補上停車資訊，並將 Hero 圖片焦點由 30% 再上移至 15%；手機版同步壓縮列表間距與地圖高度以容納新增內容。已驗證桌機／手機版面、停車文字完整、圖片位置與無水平溢位。
- [x] 2026-08-13：將 Contact Hero 內 Google 地圖與公司資訊左右位置對調，改為地圖左側、文字右側；已驗證 1366px 桌機與 390px 手機版面、固定 Hero 高度與無水平溢位。
- [x] 2026-08-13：將 Contact Hero 左右欄改為等寬配置，統一地圖與公司資訊兩側的欄位寬度與間距；已驗證 1366px 桌機與 390px 手機版面、欄位等寬、固定 Hero 高度與無水平溢位。
- [x] 2026-08-13：為 Contact Hero 的公司地址、總機專線、服務信箱與停車資訊加入 Phosphor `map-pin`、`phone`、`envelope-open`、`car` icon，並補上本頁字型與 glyph mapping；已驗證 icon 字型／glyph、1366px 桌機與 390px 手機版面、固定 Hero 高度與無水平溢位。
- [x] 2026-08-13：將 Hero 內的公司資訊移至 Google 地圖 Hero 下方、各部門聯絡窗口上方；Hero 改為只顯示地圖，並保留公司資訊的 Phosphor icons；已驗證 1366px 桌機與 390px 手機版面、資訊順序、固定 Hero 高度與無水平溢位。

- [x] 2026-08-13：依參考圖重做職業安全衛生「專業證照與專責能力」卡片。
  - 範圍：`wwwroot/css/pages/occupational-safety.css`、`wwwroot/js/pages/occupational-safety.js`、`TODO.md`。
  - 內容：保留四張卡片、現有文案、輪播控制與水平拖曳；卡片改為滿版淺幅圖片、跨接圓形 icon、標題短底線及分隔式勾選條列，桌機顯示三張完整卡片，平板兩張、手機單張並露出下一張提示；補齊卡片 scroll snap 對齊點，並在跨響應式斷點時回到第一張，避免保留舊捲動位置造成半張卡片。
  - 已驗證：`node --check wwwroot/js/pages/occupational-safety.js`、`node --check wwwroot/js/site.js`、`dotnet build -c Release`（0 warnings、0 errors）、範圍內 `git diff --check`；Edge 1366×900、1099×900、390×844 實際渲染，確認桌機三張、平板兩張、手機單張並露出下一張，四張圖片載入、圓形 icon 跨接、卡片等高、前後控制、手機 `touch-action: pan-x`、跨斷點回到第一組，頁面無水平溢位且 console 無 error／warning。
  - 未驗證：滑鼠實際按住拖曳、實體觸控裝置、Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：對齊職安證照卡片 icon 與標題，並恢復圖片凹入效果。
  - 範圍：`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：icon 與標題改用同一個 grid 列垂直對齊並一起跨接圖片下緣；圖片增加卡片內縮留白與圓角，由淺色卡片背景形成凹入圖片框。
  - 已驗證：來源 selector 檢查與範圍內 `git diff --check`。
  - 未驗證：依使用者要求未進行瀏覽器、桌機／手機實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：依使用者要求恢復職安證照卡片前一版呈現。
  - 範圍：`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：撤銷 icon／標題同列位移與圖片凹入框，恢復 icon 跨接圖片、標題位於右側及圖片滿版的前一版；其餘卡片設計、內容、輪播與拖曳維持不變。
  - 已驗證：來源 selector 檢查與範圍內 `git diff --check`。
  - 未驗證：未進行瀏覽器、桌機／手機實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：對齊職安證照卡片 icon 與標題並改用深藍色識別。
  - 範圍：`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：icon 與標題改為同一個 grid 列垂直置中，縮短標題區高度及標題到資格清單的間距；卡片圓形 icon、標題短線與清單勾選標記統一改用既有 `--color-secondary` 深藍色 token。
  - 已驗證：來源 selector 檢查與範圍內 `git diff --check`。
  - 未驗證：未進行瀏覽器、桌機／手機實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：對齊職安證照卡片清單勾選 icon 與標題 icon 中心。
  - 範圍：`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：桌機清單勾選 icon 依 52px 標題 icon 中心定位，手機依 48px icon 中心定位；同步增加清單文字左側空間，避免 icon 與文字重疊。
  - 已驗證：來源 selector 與尺寸計算檢查、範圍內 `git diff --check`。
  - 未驗證：未進行瀏覽器、桌機／手機實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：增加職安卡片標題 icon 白色外圈並恢復清單 icon 位置。
  - 範圍：`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：標題 icon 保留深藍色圓形底，外層新增白色包覆效果以強化圖片凹入層次；撤銷清單勾選 icon 對齊標題 icon 中心的位移，恢復靠左位置及原有文字間距。
  - 已驗證：來源 selector 檢查與範圍內 `git diff --check`。
  - 未驗證：未進行瀏覽器、桌機／手機實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：修正職業安全衛生證照卡片圖片邊線與凹入效果，改由卡片背景形成內縮圖片框，並增加標題 icon 圓形背景尺寸與周圍間距；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：調整職業安全衛生證照卡片，標題 icon 加上圓形底色，圖片改為向卡片內縮並增加圓角留白；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：依參考圖調整職業安全衛生專業證照卡片外觀，改為圖片、白色資訊區、標題與勾選條列內容，保留原有四張卡片與水平拖曳；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：恢復職業安全衛生證照卡片邊線，將標題 icon 改為與標題相同顏色，並對齊下方條列圓點與上方 icon；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：將職業安全衛生證照卡片改回完整展開內容，移除 hover 展開、固定高度與多段轉場，改為圖片、標題、橘色條列內容的簡潔卡片；保留水平拖曳，已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：修正職業安全衛生證照卡片 hover 標題抖動，固定標題列高度與內距，移除標題本身的 hover 高度動畫，改由內容列表單獨展開；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：統一職業安全衛生證照卡片 hover 的上移、內容展開與淡入動畫為 600ms 同一 easing，改善三段效果不同步的問題；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：再放慢職業安全衛生證照卡片 hover 動畫，卡片上移改為 650ms、內容展開改為 620ms；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：修正職業安全衛生證照卡片 hover 內容被截斷問題，縮短列表分隔線範圍並放慢卡片上移動畫；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：微調職業安全衛生證照卡片 hover 狀態，拉開標題與內容間距、放大內容文字，並將標題左側 icon 改為橘色；已完成來源規則檢查，瀏覽器畫面尚未驗證。

- [x] 2026-08-13：依 TECO 官網卡片設計調整職業安全衛生證照卡片。固定卡片高度，讓 hover 時內容區增加、圖片自然縮短，移除圖片縮放與額外外露邊框，保留卡片上移與標題 icon 內距；已完成來源規則檢查與 `git diff --check`，瀏覽器畫面尚未驗證。

本檔案是專案唯一的待辦與進度紀錄。每次功能、介面、內容、資料、路由或驗證狀態有調整時，必須同步更新本檔案。

- [x] 2026-08-13：將 Services 的 `service-section__heading` 調整為獨立區塊。
  - 內容：標題、英文眉標與說明文字獨立佔據服務區塊上方整列；圖片與主要服務清單保留在下方左右交錯排列，手機順序維持標題、圖片、內容。
  - 已驗證：來源 CSS grid selector 檢查。
  - 未驗證：Services 桌機／手機瀏覽器實際版面、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：移除 Services 頁面的圖片輪播效果。
  - 內容：移除三個服務區塊的圖片切換按鈕、輪播 data attribute、相關控制項 CSS 與 `services.js` 輪播邏輯；保留三圖靜態拼貼展示與一左一右交錯版型。
  - 已驗證：來源 selector 檢查。
  - 未驗證：Services 桌機／手機瀏覽器實際版面、圖片靜態展示、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

## 紀錄規則

- 待處理使用 `- [ ]`，完成使用 `- [x]`。
- 每個項目記錄範圍、日期與驗證狀態。
- 尚未實際驗證的內容必須標示「未驗證」。
- 已完成但尚未 commit 的內容必須標示「待提交」。
- 建立 commit 後補上 commit hash。
- 不把桌機瀏覽器檢查當成手機、跨瀏覽器、實體裝置或人工無障礙驗收。
- 新發現的問題與頁面差異必須加入本檔案，不只記錄在聊天或 commit 訊息。

## 進行中

- [x] 2026-08-13：移除 Services 頁面的 service-index 頁內導覽列。
  - 內容：移除 `wwwroot/services.html` 的三項服務快速導覽，並清除桌機、手機與 reduced-motion 專屬 CSS selector；服務內容區塊與頁首導覽不變。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：Services 桌機／手機瀏覽器實際版面、頁內錨點與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：固定職業安全衛生證照卡片高度並調整 hover 內容區。
  - 內容：卡片改為固定高度，hover／focus 時只重新分配卡片內的圖片與內容空間，不推高卡片；標題列增加左右 padding，圖片縮小時顯示內縮邊框與留白。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：職業安全衛生桌機／手機瀏覽器實際卡片高度、hover／focus 與拖曳效果、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整職業安全衛生專業證照卡片拖曳與 hover 展開。
  - 內容：專業證照與專責能力區塊沿用首頁最新消息的水平捲動方向，新增滑鼠按住左右拖曳；卡片預設只顯示圖片與標題，hover／focus 時卡片上移、圖片縮小並展開內容；標題 icon 改用與文字相同的 `var(--color-ink)`。
  - 已驗證：`node --check wwwroot/js/pages/occupational-safety.js`、來源 selector 檢查與 `git diff --check`。
  - 未驗證：職業安全衛生桌機／手機瀏覽器實際拖曳、hover／focus、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：微調營運資源表格文字與職業安全衛生英文標題。
  - 內容：表格文字調整為 0.95rem、較寬鬆的 1.65 行高；欄位標題保留 `var(--color-ink)` 與 500 字重，數值內容改用 `var(--color-muted)`；英文小標由 `OCCUPATIONAL SAFETY` 修正為正式完整的 `OCCUPATIONAL SAFETY AND HEALTH`。
  - 已驗證：來源 selector／文案檢查與 `git diff --check`。
  - 未驗證：營運資源桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整營運資源四個主要區塊的圖片與間距。
  - 內容：將廠區資訊、機具配置、作業量能與職業安全衛生圖片統一為與 About 公司簡介相同的 4:3 比例；移除圓角、陰影與健康安全圖片的額外放大裁切；標題「健康與安全」改為「職業安全衛生」；區塊間距 token 對齊 About 的 `clamp(64px, 8vw, 112px)` 節奏。
  - 已驗證：來源結構／selector 檢查與 `git diff --check`。
  - 未驗證：營運資源桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：對齊 About 公司簡介正文背景與圖片底部。
  - 內容：桌機版讓公司簡介左欄與右側圖片同高，正文背景從內容起點延伸至圖片底部；文字寬度維持原本左欄寬度，手機版不變。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：About 桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：修正 About 公司簡介背景延伸範圍。
  - 內容：保留正文原本左欄文字寬度，僅以背景伪元素向右延伸至欄位中間，避免文字跟著背景一起變寬。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：About 桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：讓 About 公司簡介正文文字同步延伸至中間區域。
  - 內容：將桌機版正文背景區塊改為明確增加欄位間距的寬度，讓文字排版也能使用延伸後的空間；手機版維持單欄寬度。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：About 桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：延伸 About 公司簡介正文背景至桌機欄位中間。
  - 內容：讓正文淺色背景在桌機版向右延伸，填滿公司簡介文字欄與圖片欄之間的 grid gap；841px 以下維持單欄寬度，避免水平溢位。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：About 桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 About 公司簡介標題間距與正文背景區塊。
  - 內容：將公司簡介英文小標與中文標題間距由文字欄原本的 20px 調整為 8px；兩段正文新增淺色背景與內距，並同步套用靜態 `wwwroot/about.html` 與 Razor `Pages/About.cshtml`。
  - 已驗證：來源結構檢查與 `git diff --check`。
  - 未驗證：About 桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將 About 經營理念改為 sticky 圖片滾動呈現。
  - 內容：經營理念改為限定寬度的三張直式圖片卡片，移除區塊背景色，預設等寬排列並加入較明顯的 42% 黑色半透明遮罩；hover／focus／click 時展開目前卡片，保留 18% 淡遮罩以維持文字對比，icon、標題與說明移至卡片中央，不使用文字立體效果與中央內容背景色；標題 `strong` 改用既有標題字體 token；認證與獎項區塊移除 `services/services-hero.jpg` 背景圖片與漸層，改用 `var(--color-surface-soft)` 淡色背景，增加區塊上下留白避免背景貼齊相鄰內容；補上靜態 `about.html` 的完整 Footer；相鄰區塊交界改為只保留單一份垂直 padding；移除卡片兩側貼齊並降低桌機與手機卡片高度。
  - 已驗證：`node --check wwwroot/js/pages/about.js`、`dotnet build -c Release` 與 `git diff --check`。
  - 未驗證：About 桌機／手機瀏覽器實際卡片 hover／focus／click 與字體呈現、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 About 公司簡介圖片版面。
  - 內容：移除公司簡介圖片的圓角與陰影，並讓圖片容器填滿右側欄位寬度。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：修正首頁服務卡片整卡導向與 hover 邊線。
  - 內容：服務卡片改為整卡可點擊並導向對應服務 anchor，icon 保留為右上角視覺提示；hover／focus 的卡片邊線固定維持 `var(--color-line)`。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：桌機／手機瀏覽器實際點擊與 hover、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整首頁服務項目 hover 圖片與 icon 位置。
  - 內容：服務卡片右下角 icon 移至圖片右上角，hover／focus 時顯示白色 icon；圖片放大至 1.08 倍並加入黑色半透明遮罩，新增圖片層以限制遮罩範圍。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：首頁最新消息改為顯示全部已發布消息。
  - 內容：移除 `wwwroot/js/pages/home.js` 的 `.slice(0, 6)` 限制，保留最新排序、已發布篩選、水平拖曳與分頁控制。
  - 已驗證：來源 selector 檢查、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`。
  - 未驗證：本機服務啟動後的實際消息數量、桌機／手機瀏覽器、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整首頁最新消息卡片 hover 視覺。
  - 內容：卡片 hover／focus 時僅讓標題顯示類似 `<a>` 的 2px 文字底線，消息圖片放大至 1.08 倍並加入黑色半透明遮罩，右上角顯示白色 icon；預設背景圖維持可縮放的背景層。
  - 已驗證：來源 selector 檢查與 `git diff --check`。
  - 未驗證：桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：修正首頁最新消息卡片導向。
  - 內容：將 `wwwroot/js/pages/home.js` 產生的消息詳情連結由 `news-detail.html?id=...` 統一改為正式 Razor 路由 `/news/{id}`，與 `Pages/News/Index.cshtml` 的消息列表連結一致。
  - 已驗證：來源路由檢查、`node --check wwwroot/js/pages/home.js`、`dotnet build -c Release` 與 `git diff --check`。
  - 未驗證：本機服務啟動後的實際點擊導向、桌機／手機瀏覽器、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 固定首頁最新消息卡片 hover 邊線顏色。
  - 範圍：`wwwroot/css/pages/home.css`。
  - 內容：hover／focus 時維持與一般狀態相同的 `var(--color-line)`，不再變為透明。
  - 已驗證：來源 selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 恢復首頁最新消息區塊邊線。
  - 範圍：`wwwroot/css/pages/home.css`。
  - 內容：恢復標題下方分隔線與消息卡片外框線；保留 hover 圖片放大及 hover／focus 顯示 icon 的行為。
  - 已驗證：來源 selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 調整首頁最新消息區塊邊線與 hover icon 顯示。
  - 範圍：`wwwroot/css/pages/home.css`。
  - 內容：移除標題下方與消息卡片的可見邊線，右下角 icon 預設隱藏，僅在卡片 hover／focus 時顯示，貼近參考圖的視覺呈現。
  - 已驗證：來源 selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 調整首頁最新消息卡片 hover 與右下角 icon。
  - 範圍：`wwwroot/js/pages/home.js`、`wwwroot/css/pages/home.css`。
  - 內容：移除最新消息卡片陰影與 hover 上移，改為圖片放大；移除右下角 `MORE` 文字，改用與服務項目一致的 `ph-arrow-bend-up-right` icon、22px 尺寸與相同顏色。
  - 已驗證：來源 selector／動態產生邏輯檢查、`node --check wwwroot/js/pages/home.js`、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 放大首頁服務項目卡片右下角 icon。
  - 範圍：`wwwroot/css/pages/home.css`。
  - 內容：將服務卡片右下角 `ph-arrow-bend-up-right` 由 16px 放大為 22px，保留原本顯示時機與位置。
  - 已驗證：來源 selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 修正首頁服務項目右下角 Phosphor icon 未顯示。
  - 範圍：`wwwroot/css/pages/home.css`。
  - 原因：專案未載入完整 Phosphor class mapping；補上 `ph-arrow-bend-up-right` 對應的 `\e026` glyph codepoint。
  - 已驗證：來源 selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 替換首頁服務項目卡片右下角 icon。
  - 範圍：`wwwroot/index.html`、`wwwroot/css/pages/home.css`。
  - 內容：三個服務卡片的右下角 icon 改為 Phosphor `ph-arrow-bend-up-right`，保留 hover／focus 顯示與 icon 位移效果。
  - 已驗證：來源 class／selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 調整首頁服務項目卡片 hover 互動。
  - 範圍：`wwwroot/index.html`、`wwwroot/css/pages/home.css`。
  - 內容：移除卡片 hover 位移，改為圖片放大；右下角服務連結預設隱藏，hover／focus-within 時只顯示 icon，移除 `MORE` 文字並補上各服務的 `aria-label`。
  - 已驗證：HTML／CSS selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 移除首頁服務項目卡片陰影。
  - 範圍：`wwwroot/css/pages/home.css`。
  - 內容：保留卡片邊框與 hover 上移效果，移除一般狀態及 hover／focus-within 狀態的陰影。
  - 已驗證：來源 selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 調整首頁「關於亞太」圖片左側對齊與外觀。
  - 範圍：`wwwroot/css/pages/home.css`。
  - 內容：圖片容器改為寬度 100%、左側對齊，移除圓角與陰影；同步移除手機版圓角覆寫。保留先前最新消息區塊的未提交修改。
  - 已驗證：來源 selector 檢查、`git diff --check`。
  - 未驗證：本次修改後桌機／手機瀏覽器實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 更新：2026-08-13。狀態：待提交。

- [x] 對齊 `occupational-safety.html` 舊版內容區介面。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：參考舊版 Hero、健康與安全前導、ISO 45001 大圖資訊卡與三張專業證照卡片，改用新版語意 HTML、頁面 scoped 原生 CSS、既有 tokens 與舊版對應圖片，不帶入 Tailwind；補上實際證書編號與有效日期，並以可鍵盤操作的原圖連結取代舊版不可讀的收合縮圖，避免進頁即下載約 2 MB 證書。
  - 已驗證：舊／新版安全素材逐檔 SHA-1 相同；`node --check wwwroot/js/site.js`；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`；Headless Edge 1366×900、1100×900、1099×900、390×844、320×800 實際渲染，確認 Hero／前導／ISO／證照卡圖片載入、1100px 三欄與 1099px 雙欄切換、手機單欄、ISO 資訊卡未超出背景區、三張卡片 16:9 裁切、Footer 單一注入且所有尺寸無水平溢位；證書連結鍵盤 focus 保留橘色 outline；Reduced Motion 停用 Hero 動畫及新增 transition。
  - 未驗證：證書連結開啟新分頁僅完成 href、提示與 focus 靜態／瀏覽器狀態檢查，未自動開啟原圖；證照卡 hover 僅完成 CSS 與 Reduced Motion 檢查；實體裝置、Firefox／Safari、人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`3701066`。

- [x] 對齊 `operational-resources.html` 舊版內容區介面。
  - 範圍：`wwwroot/operational-resources.html`、`wwwroot/css/pages/operational-resources.css`。
  - 內容：以舊版廠區資訊、機具配置、作業量能、健康與安全、營運優勢及地理位置為視覺與內容基準，換回對應圖片與完整數據；使用新版語意 HTML、頁面 scoped 原生 CSS、既有 tokens、共用 Hero／Breadcrumb／主要按鈕完成，不帶入 Tailwind。手機內容順序統一為標題、圖片、內文，地圖沿用新版 Contact 已採用的 Google Maps iframe，避免搬入舊版 MapLibre 套件與資料不一致的 `map.js`。
  - 已驗證：`node --check wwwroot/js/site.js`；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`；Headless Chrome 1366×900、390×844、320×800 實際渲染，確認四段圖片成功載入、桌機左右交錯、手機閱讀順序、表格換行、七個距離圓點橫向滑動、Footer 單一注入且頁面無水平溢位；Headless Edge 980、1099、1100px 斷點，確認 1100px 切換雙欄且三個尺寸均無水平溢位；Headless Edge 確認按鈕 focus 轉橘並保留 outline、Reduced Motion 停用內容進場動畫，以及 390px 距離列可取得鍵盤焦點並以方向鍵橫向捲動。
  - 未驗證：無頭瀏覽器未能觸發實際 `:hover`，hover 色彩與 icon 位移僅完成 CSS 靜態確認；Google Maps 外部 iframe 在無頭完整頁截圖未顯示地圖內容，僅確認 iframe 存在且沒有載入失敗紀錄；實體裝置、Firefox／Safari、人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`18b63bc`。

- [x] 建立員工專區 `/Admin` 登入與最新消息管理頁。
  - 2026-08-12 補充驗證：以隔離測試資料及當前 shell 暫時帳密完成登入後頁面重新載入、消息新增／讀取／刪除、分類新增／刪除 HTTP API 驗證，並以 SHA-256 確認 `news.json` 與 `news-categories.json` 還原；本次僅更新紀錄，尚未另行提交。
  - 範圍：`Pages/Admin/Index.cshtml`、`Services/NewsService.cs`、`Program.cs`、`.gitignore`、`wwwroot/css/pages/admin.css`、`wwwroot/js/pages/admin.js`、`Pages/News/Detail.cshtml`、`Pages/News/Index.cshtml.cs`、`wwwroot/js/pages/news-detail.js`。
  - 狀態：已完成原生 CSS/JavaScript 頁面、Cookie 登入、登入限流、CSRF、一次性圖形驗證碼與消息／分類 CRUD；新增公告圖片及 PDF／Word／Excel 附件上傳，檔案存放於 `App_Data` 並由受限 API 提供；首頁無圖片時沿用預設消息背景圖。原始功能 Commit：`0754ebe`；本次功能尚未提交。
  - 已驗證：`dotnet build -c Release`（0 warnings、0 errors）、`node --check wwwroot/js/pages/admin.js`、`node --check wwwroot/js/pages/news-detail.js`、`git diff --check`；隔離 HTTP API 驗證驗證碼拒絕／接受、multipart 圖片／PDF 上傳、原始檔名與資料儲存、已發布檔案匿名讀取，且未改動目前工作樹的 `news.json`。
  - 未驗證：本次瀏覽器存取本機 `127.0.0.1` 被瀏覽器權限拒絕，因此未完成登入卡片桌機／手機實際截圖；正式環境 HTTPS、實體裝置、跨瀏覽器、人工無障礙驗收；整體工作樹仍保留既有 `wwwroot/news.html:89` trailing whitespace 紀錄。
  - 更新：2026-08-12。狀態：原始功能已提交，Commit：`0754ebe`；本次功能尚未提交。

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

- [x] 對齊 `join.html` 舊版人才招募介面。
  - 範圍：`wwwroot/join.html`、`wwwroot/css/pages/join.css`、`wwwroot/public/images/join/104-job-bank-logo.png`、`wwwroot/public/images/join/1111-job-bank-logo.png`。
  - 內容：移除獨立教育訓練頁籤與區塊；保留公司福利表內的員工在職教育訓練福利列；改為加入亞太、公司福利、職缺資訊的單頁順序；取用舊版 104／1111 Logo，沿用新版既有 CSS tokens 與 RWD 結構。
  - 已驗證：舊版頁面內容與畫面比對；新版 `join.html` 桌機實際渲染；兩個 Logo SHA-256 與舊版一致；`node --check wwwroot/js/pages/join.js`、`git diff --check`。
  - 未驗證：新版 390px／320px 實際瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。後續頁面調整已併入 `1d01733`。

## 下一步

- [ ] 以舊版專案逐頁比對剩餘頁面內容區，確認文字大小、粗細、間距、按鈕、動畫、圖片位置與 RWD。
  - 建議順序：`about.html`、`milestones.html`、`operational-resources.html`、`services.html`、`occupational-safety.html`、`news.html`、`news-detail.html`、`join.html`、`affiliates.html`、`contact.html`、`privacy.html`。
  - 驗證：尚未進行本輪逐頁驗收。
- [ ] 取得隱私權政策法務核定文案；`privacy.html` 已依舊版 2026 年 7 月 31 日來源版補齊七節內容，但仍不得視為法務核定完成。
- [ ] 確認公開頁面是否維持 `wwwroot/*.html`，或逐步移轉為 Razor Pages；未確認前不進行大規模路由重構。
- [ ] 為首頁補做 390px 與 320px 實際渲染檢查，確認輪播、水平溢位、CTA 裁切與文字換行。
- [ ] 確認正式環境 HTTPS 憑證與部署設定；Development 已維持 HTTP 啟動，不再因找不到 HTTPS 連接埠觸發受限 Windows 帳號的 EventLog 錯誤。
- [ ] 完成主要頁面後安排跨瀏覽器、實體裝置與人工無障礙驗收。

## 已完成紀錄

- [x] 調整職安圖片 `1.png` 的右側構圖。
  - 範圍：`wwwroot/public/images/occupational-safety/1.png`、`TODO.md`。
  - 內容：保留左側起重機、中央吊具與前景作業人員，補強右側貨櫃堆疊、港區設備與作業動線，讓右側場景更完整。
  - 已驗證：輸出 PNG 為 1672 × 941、RGB；已確認檔案成功覆寫；影像內容已檢視。
  - 未驗證：目前 `occupational-safety.html` 仍引用 `1-1.png`，未切換頁面圖片；未進行網站桌機／手機渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-12。狀態：待提交。

- [x] 調整職安證照卡片標題高度與專業證照區左右延伸範圍。
  - 範圍：wwwroot/occupational-safety.html、wwwroot/css/pages/occupational-safety.css、TODO.md。
  - 內容：移除標題群組固定高度，改由標題內容與上下內距決定，縮小標題下方空白；專業證照區桌機左側增加至 clamp(32px, 7vw, 104px)，右側延伸至視窗邊緣，手機恢復 16px 兩側邊距。
  - 已驗證：node --check wwwroot/js/pages/occupational-safety.js；git diff --check；source 確認卡片 viewport 右側無額外 margin／padding 設定。
  - 未驗證：本次修改後瀏覽器渲染因瀏覽器無法建立新分頁未執行；實體裝置、Firefox／Safari、跨瀏覽器與人工無障礙驗收未執行。
  - 更新：2026-08-12。狀態：待提交。

- [x] 移除職安證照卡片標題下方的橘色底線。
  - 範圍：wwwroot/occupational-safety.html、wwwroot/css/pages/occupational-safety.css、TODO.md。
  - 內容：移除四張證照卡片的標題底線 HTML 元素與對應 CSS，保留標題與 icon 排版。
  - 已驗證：確認頁面不再產生 safety-credential-card__title-rule；node --check wwwroot/js/pages/occupational-safety.js；git diff --check。
  - 未驗證：本次修改後桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收未執行。
  - 更新：2026-08-12。狀態：待提交。

- [x] 修正職安證照卡片標題與底線的排列結構。
  - 範圍：wwwroot/occupational-safety.html、wwwroot/css/pages/occupational-safety.css、TODO.md。
  - 內容：標題改為 icon 搭配標題內容群組，底線直接隸屬標題群組；桌機標題到底線 20px、手機 16px，避免外層 grid 將底線推遠。
  - 已驗證：四張卡片桌機標題與底線位置一致；本機 /occupational-safety.html 以 1366×900 與 390×844 實際渲染，確認無水平溢位；瀏覽器 console 無 error／warning；node --check wwwroot/js/pages/occupational-safety.js；git diff --check。
  - 未驗證：實體裝置、Firefox／Safari、跨瀏覽器與人工無障礙驗收未執行。
  - 更新：2026-08-12。狀態：待提交。

- [x] 統一職安證照卡片標題底線介面並讓 ISO 圖片填滿兩側。
  - 範圍：wwwroot/css/pages/occupational-safety.css、TODO.md。
  - 內容：證照標題採用與公司標題一致的標題留白與橘色底線規則；ISO 證書圖片改用 cover 裁切並以上方第三方 logo 為焦點，填滿卡片圖片區兩側。
  - 已驗證：本機 /occupational-safety.html 以 1366×900 與 390×844 實際渲染，確認 ISO 圖片 object-fit 為 cover、標題與底線間距為 0px、頁面無水平溢位；瀏覽器 console 無 error／warning；git diff --check。
  - 未驗證：實體裝置、Firefox／Safari、跨瀏覽器與人工無障礙驗收未執行。
  - 更新：2026-08-12。狀態：待提交。

- [x] 放大職安專業證照第一張 ISO 圖片並調整卡片標題間距。
  - 範圍：wwwroot/css/pages/occupational-safety.css、TODO.md。
  - 內容：ISO 證書圖片使用 1.7 倍放大並以上方第三方認證 logo 為視覺焦點；證照標題區增加上方間距並整理內容對齊，讓標題更接近底線。
  - 已驗證：本機 /occupational-safety.html 以 1366×900 與 390×844 實際渲染，確認圖片 transform、標題與底線間距、頁面無水平溢位；瀏覽器 console 無 error／warning；git diff --check。
  - 未驗證：實體裝置、Firefox／Safari、跨瀏覽器與人工無障礙驗收未執行。
  - 更新：2026-08-12。狀態：待提交。

- [x] 將職安證照卡片 icon 改為與標題對齊的實際 Phosphor glyph 元素。
  - 範圍：wwwroot/occupational-safety.html、wwwroot/css/pages/occupational-safety.css、TODO.md。
  - 內容：標題 icon 改為直接放入 Phosphor codepoint，移除證照 icon 與清單勾選對 `::before`／`::after` 的依賴；icon 與標題同列對齊，標題底線改為實際 HTML 元素。
  - 已驗證：ISO icon 與標題上緣差為 0px，Phosphor 字型正常載入，icon pseudo content 為 none；本機 /occupational-safety.html 以 1366×900 與 390×844 實際渲染，確認頁面無水平溢位；瀏覽器 console 無 error／warning；git diff --check。
  - 未驗證：實體裝置、Firefox／Safari、跨瀏覽器與人工無障礙驗收未執行。
  - 更新：2026-08-12。狀態：待提交。

- [x] 將 ISO 45001 證照卡片移至專業證照列第一張並補齊證書 icon。
  - 範圍：wwwroot/occupational-safety.html、wwwroot/css/pages/occupational-safety.css、TODO.md。
  - 內容：ISO 45001 卡片改為第一個顯示項目，並以本機 Phosphor ph-certificate 與 codepoint e766 顯示證書圖示；其餘三張卡片順序不變。
  - 已驗證：ISO 卡片為四張卡片中的第一張，HTML 使用 ph-certificate，CSS codepoint 為 e766；node --check wwwroot/js/site.js；node --check wwwroot/js/pages/occupational-safety.js；dotnet build -c Release（0 warnings、0 errors）；git diff --check；本機 /occupational-safety.html 以 1366×900 與 390×844 實際渲染，確認 ISO 標題與 icon 顯示、頁面無水平溢位；瀏覽器 console 無 error／warning。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 更新：2026-08-12。狀態：已提交，Commit：ef0e331。

- [x] 新增 ISO 45001 專業證照卡片並將證照區塊改為可水平拖移的卡片列。
  - 範圍：wwwroot/occupational-safety.html、wwwroot/css/pages/occupational-safety.css、wwwroot/js/pages/occupational-safety.js、TODO.md。
  - 內容：於 safety-credentials__grid 新增 ISO 45001 通過紀錄卡片與證書圖片，參照首頁最新消息使用水平 scroll-snap、隱藏捲軸、分頁點與上一組／下一組控制；桌機每組三張、平板每組兩張、手機每組一張，保留 Reduced Motion 行為。
  - 已驗證：四張卡片與 ISO 卡片 HTML 結構；node --check wwwroot/js/site.js；node --check wwwroot/js/pages/occupational-safety.js；dotnet build -c Release（0 warnings、0 errors）；git diff --check；本機 /occupational-safety.html 以 1366×900 與 390×844 實際渲染，確認桌機每組三張、手機每組一張、水平 overflow-x: auto、scroll-snap、touch-action: pan-y、上一組／下一組控制可切換、頁面無水平溢位；瀏覽器 console 無 error／warning。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 更新：2026-08-12。狀態：已提交，Commit：3101203。

- [x] 調整職業安全頁專業證照卡片的 hover 與圖示。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：`safety-credentials__grid` 卡片 hover 保留位移但不再改變邊線顏色或加入陰影；移除 `safety-credential-card__icon` 陰影；改用本機 Phosphor icon，健康防護使用 `ph-shield-check`、特種操作使用 `ph-hard-hat`、物流使用 `ph-gear`。
  - 已驗證：HTML icon class 與三組 Phosphor codepoint、卡片 hover CSS、icon 無 `box-shadow`；`node --check wwwroot/js/site.js`；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`；本機 `/occupational-safety.html` 以 1366×900 與 390×844 實際渲染，確認三個 icon 使用 Phosphor 字型、卡片與 icon 的 computed `box-shadow` 為 `none`、hover 規則只保留位移且未設定 `border-color`／`box-shadow`、手機無水平溢位；瀏覽器 console 無 error／warning。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 更新：2026-08-12。狀態：已提交，Commit：`177c04c`。

- [x] 移除職業安全頁完整的 ISO 45001 `safety-certification` 區塊。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：移除 ISO 45001 認證說明、認證資料、證書連結與整段區塊 HTML；同步移除全部 `safety-certification-*` CSS、響應式樣式與 Reduced Motion 相關規則；檢查 `wwwroot/js/` 後確認沒有對應 JavaScript 邏輯，因此不新增無效 JS 變更。
  - 已驗證：`safety-certification` 與 `iso-45001` 已不存在於職安頁 HTML／CSS／JS；`node --check wwwroot/js/site.js`；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`；本機 `/occupational-safety.html` 以 1366×900 與 390×844 實際渲染，確認認證區塊與其 class／ID 已移除、專業證照區塊仍存在、手機無水平溢位；瀏覽器 console 無 error／warning。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 更新：2026-08-12。狀態：已提交，Commit：`adf1623`。

- [x] 移除職業安全頁 ISO 認證區塊的 `safety-certification__media` 圖片區塊。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：移除 ISO 認證區塊的 HTML 圖片、桌機／手機圖片樣式與遮罩樣式；檢查 `wwwroot/js/` 後確認沒有對應 JavaScript 邏輯，因此不新增無效 JS 變更；保留認證說明、資料與證書連結。
  - 已驗證：`safety-certification__media` 已不存在於 HTML／CSS／JS；`node --check wwwroot/js/site.js`；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`；本機 `/occupational-safety.html` 以 1366×900 與 390×844 實際渲染，確認 ISO 標題與內容卡仍可見、圖片媒體未出現、手機無水平溢位；瀏覽器 console 無 error／warning。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 更新：2026-08-12。狀態：已提交，Commit：`cbea054`。

- [x] 移除員工健康與照護獨立區塊並重整健康安全前導版型。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：移除獨立的「員工健康與照護」三卡片區塊，保留措施文字於安全前導內容；前導版型改為桌機左側文字、右側 3:4 直立圖片，手機改為單欄堆疊。
  - 已驗證：HTML 區塊結構、移除選取器、scoped CSS 與響應式斷點檢查；`git diff --check`。
  - 未驗證：未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 在健康與安全前導內容後補充員工健康照護措施。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：於 ISO 45001 說明段落後新增健康照護引導文字與三項措施清單，包含年度健康檢查、心理減壓講座及職業安全衛生護理師臨場健康諮詢服務。
  - 已驗證：HTML 語意結構、scoped CSS 與清單樣式檢查；`git diff --check`。
  - 未驗證：未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 新增健康安全頁的員工健康與照護區塊。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：在前導安全理念與 ISO 45001 區塊之間新增「員工健康與照護」，以三張卡片呈現年度健康檢查、心理減壓講座與職業安全衛生護理師健康諮詢臨場服務；桌機三欄、手機單欄。
  - 已驗證：HTML 語意結構、scoped CSS 與響應式斷點檢查；`git diff --check`。
  - 未驗證：未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 切換健康與安全前導圖片至 `1-1.png` 並整理取景 CSS。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：`<picture>` 的 `source` 與 `<img>` 統一改用 `public/images/occupational-safety/1-1.png`，同步修正圖片 intrinsic 尺寸為 1672 × 941；確認寬幅圖片在 4:3 圖框中仍需 `object-fit: cover` 與 `object-position: 92% center`，移除不必要的 `max-width: none`、`scale(1.02)` 與 `transform-origin`。
  - 已驗證：圖片尺寸、HTML 引用與 CSS selector 檢查；`git diff --check`。
  - 未驗證：未進行網站實際渲染、桌機／手機、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 更新健康與安全前導說明文案並分段呈現。
  - 範圍：`wwwroot/occupational-safety.html`、`TODO.md`。
  - 內容：替換前導標題下方文案，補充 ISO 45001 外部稽核與營運總部現場查核內容，並拆分為四段以建立清楚的閱讀層次。
  - 已驗證：HTML 段落結構與文案來源檢查；`git diff --check`。
  - 未驗證：未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 調整健康與安全前導圖片取景位置。
  - 範圍：`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：因原本 `scale(1.4)` 會大幅裁切新增的右側場景，將前導圖片縮放調整為 `1.08`，並把取景焦點移至 `72%`，讓右側港區內容更明顯。
  - 已驗證：CSS selector 與圖片引用檢查；`git diff --check`。
  - 未驗證：未進行網站實際渲染、桌機／手機、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 調整健康與安全前導圖片右側構圖。
  - 範圍：`wwwroot/public/images/occupational-safety/1.png`、`TODO.md`。
  - 內容：保留左側橘色機具、中央吊具與原有光線，延伸右側港區背景與作業地面，讓圖片在頁面裁切時保有更多右側場景。
  - 已驗證：輸出 PNG 檔案為 1672 × 941、RGB；已確認頁面引用 `1.png`。
  - 未驗證：未進行網站實際渲染、桌機／手機、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 簡化健康與安全前導重要標題。
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 內容：移除 `safety-heading__icon`、`OCCUPATIONAL SAFETY` eyebrow 與前導標題下底線，保留「安全，是每一項作業的前提」作為獨立的重要訊息；認證區標題底線維持原樣。
  - 已驗證：來源 class、標題結構與 scoped CSS 檢查；`git diff --check`。
  - 未驗證：未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 更新健康與安全前導圖片來源。
  - 範圍：`wwwroot/occupational-safety.html`、`TODO.md`。
  - 內容：將前導圖片 `<picture>` 的 `source` 改為 `image/png`，改用 `public/images/occupational-safety/1.png`，並保留相同圖片的 `<img>` fallback。
  - 已驗證：HTML 圖片來源與檔案路徑檢查；`git diff --check`。
  - 未驗證：未啟動網站，未進行圖片實際渲染、桌機／手機、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：待提交。

- [x] 改用 Phosphor icon 呈現營運優勢。
  - 範圍：`wwwroot/operational-resources.html`、`wwwroot/css/pages/operational-resources.css`、`TODO.md`。
  - 內容：移除三個手繪 SVG，分別改用 `ph-security-camera`、`ph-users-three`、`ph-shipping-container`；沿用專案既有本機 Phosphor 字型，並將 icon 的字型與 codepoint 規則限定於營運優勢區塊。專案目前僅有 regular 字型，因此不引入外部字型，將 icon 尺寸縮為 `38–48px` 以降低筆畫的視覺重量。
  - 已驗證：指定 class、Phosphor 字型載入與三個官方 regular codepoint 比對；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`。
  - 未驗證：依需求未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`458e9f2`。

- [x] 修正營運資源內容區的捲動淡出、間距與表格對齊。
  - 範圍：`wwwroot/css/pages/operational-resources.css`、`TODO.md`。
  - 內容：移除 `view()` 捲動時間軸造成區塊反向捲動時淡出的效果；標題底線至內容的間距調整為與首頁相同的 20px；移除表格儲存格左右內距，讓表頭首字與上方內文左緣對齊。
  - 已驗證：來源 selector 與首頁間距值比對；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`。
  - 未驗證：依需求未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`458e9f2`。

- [x] 調整公司沿革年份位置與切換選單間距。
  - 範圍：`wwwroot/css/pages/milestones.css`、`TODO.md`。
  - 內容：保留既有年代切換選單與 JavaScript 行為；沿革項目的年份改為置於標題上方，並縮短 Hero 與年代選單的距離。依最新決定移除固定年份指示器與每筆年份浮水印；桌機與手機均維持單欄年份、標題、內文的閱讀順序。
  - 已驗證：來源結構、既有頁籤與 JavaScript 合約檢查；`node --check wwwroot/js/pages/milestones.js`；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`。
  - 未驗證：未進行桌機／手機瀏覽器渲染、切換選單實際互動、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`458e9f2`。

- [x] 微調 About 關係企業區塊的背景、標題與卡片互動。
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`TODO.md`。
  - 內容：移除區塊背景色；標題下底線改為與 About 經營理念相同的置中偽元素造型；移除卡片 hover 陰影，改為與 `MORE` 一致的 `--color-primary-dark` 邊線；`MORE` 改用既有 `.button--text-arrow` 相同的 token、share icon 與位移動畫。
  - 已驗證：來源 selector 與共用 `button--text-arrow` token／SVG 結構比對；`dotnet build -c Release`（0 warnings、0 errors）；`git diff --check`。
  - 未驗證：依需求未啟動網站，未進行桌機／手機瀏覽器渲染、hover／focus 實際互動、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`458e9f2`。

- [x] 在 About 認證與獎項下方加入關係企業區塊。
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`TODO.md`。
  - 內容：依舊版的六張關係企業 Logo 卡片與連結目標加入「AFFILIATES／關係企業」區塊；樣式使用新版頁面 scoped CSS、既有色彩／圓角／陰影／按鈕 icon tokens，並保留鍵盤 focus 與 reduced-motion 狀態。`MORE` 採 inline SVG，避免使用未註冊的 Phosphor glyph。六張圖片均已存在於新專案，且與舊版素材逐一比對一致，因此不重複覆寫素材。
  - 已驗證：舊版區塊結構、連結與素材路徑比對；六個圖片檔案內容比對；`node --check wwwroot/js/pages/about.js`；`dotnet build -c Release`；`git diff --check`。
  - 未驗證：依需求未啟動網站，未進行桌機／手機瀏覽器渲染、hover／focus 實際互動、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`bc866e0`、`7eb4dca`。

- [x] 調整 About 靜態頁 Hero 引言版型。
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`。
  - 內容：隱藏 Hero 標題（保留 `sr-only` h1）、引言置中、開頭加入 `〝`、署名前使用 inline SVG 橘色線，未使用 `::before`。
  - 驗證：`dotnet build -c Release` 通過；瀏覽器實際驗證 1366x900、390x844，確認標題不可見、引言置中、橘線顯示且手機無水平溢位；未驗證跨瀏覽器、實體裝置與人工無障礙。
  - 更新：2026-08-11。狀態：已提交，Commit：`e59fe86`。

- [x] 調整 About 公司簡介區塊圖片比例與標題底線。
  - 範圍：`wwwroot/css/pages/about.css`；同步套用 `/about` Razor 頁面。
  - 內容：參考首頁「關於亞太」的左右欄配置，將右側公司圖片縮為欄寬 88% 並靠近文字側；標題底線改用首頁「最新消息」的 `h2::after` 寫法與既有 `--color-primary` 變數。
  - 已驗證：來源 selector、版型與既有 CSS 變數檢查；`node --check wwwroot/js/pages/about.js`；一次 `dotnet build -c Release`（0 warnings、0 errors）；本次暫存差異 `git diff --cached --check`。
  - 未驗證：桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受保留中的 `about.html` 既有 trailing whitespace 影響；最後一次重跑 Release build 因既有 dotnet 程序鎖定 `bin\Release\net8.0\apli-website-rebuild.dll` 而失敗。
  - 更新：2026-08-11。狀態：已提交，Commit：`e59fe86`。

- [x] 調整 About 經營理念互動區塊。
  - 範圍：`wwwroot/about.html`、`Pages/About.cshtml`、`wwwroot/css/pages/about.css`、`wwwroot/js/pages/about.js`。
  - 內容：標題底線改用置中的 `h2::after` 與 `--color-primary`；`philosophy-gallery` 改為左右填滿並使用 `var(--card-radius)`；預設顯示與首頁核心理念相同的 target、team、increase 圖示及換行標題；依舊版介面支援 hover／focus／click 展開、橘色 icon 與內文顯示。
  - 已驗證：來源結構、selector、`--card-radius` 與首頁核心理念 target／team／increase 圖示對照；`node --check wwwroot/js/pages/about.js`；暫存差異 `git diff --cached --check`；`git status --short`。
  - 未驗證：`dotnet build -c Release` 因既有 `.NET Host (PID 21820)` 鎖定 `bin\Release\net8.0\apli-website-rebuild.dll` 而失敗；桌機／手機瀏覽器渲染、hover／focus 實際互動、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受保留中的 `about.html` 與 `affiliates.html` 既有 trailing whitespace 影響。
  - 更新：2026-08-11。狀態：已提交，Commit：`022a979`。

- [x] 微調 About 經營理念圖片與互動視覺。
  - 範圍：`wwwroot/css/pages/about.css`。
  - 內容：保留預設、使命、核心價值觀與共同願景 4 張圖片；降低圖片與面板遮罩濃度；縮小 icon 並降低視覺重量；標題改回 `var(--font-body)` 並縮小；面板分隔線改為上明下淡的漸層，手機版改為左明右淡。
  - 已驗證：CSS selector、遮罩、icon 尺寸、字體 token、4 張圖片 class 與漸層方向來源檢查；`node --check wwwroot/js/pages/about.js`。
  - 未驗證：`dotnet build -c Release` 因既有 `.NET Host (PID 21820)` 鎖定 `bin\Release\net8.0\apli-website-rebuild.dll` 而失敗；桌機／手機瀏覽器渲染、圖片清晰度、hover／focus 實際互動、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受保留中的 `about.html` 與 `affiliates.html` 既有 trailing whitespace 影響。
  - 更新：2026-08-11。狀態：已提交，Commit：`4cda642`。

- [ ] 再調淡 About 經營理念圖片遮罩。
  - 範圍：`wwwroot/css/pages/about.css`。
  - 內容：將 `philosophy-gallery__overlay` 漸層由 48%／4% 調整為 32%／0%，讓背景圖片更清楚。
  - 已驗證：`node --check wwwroot/js/pages/about.js`；暫存差異 `git diff --cached --check`；`git status --short`。
  - 未驗證：`dotnet build -c Release` 因既有 `.NET Host (PID 21820)` 鎖定 `bin\Release\net8.0\apli-website-rebuild.dll` 而失敗；桌機／手機瀏覽器渲染、圖片清晰度、hover／focus 實際互動、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受保留中的 `about.html` 與 `affiliates.html` 既有 trailing whitespace 影響。
  - 更新：2026-08-11。狀態：已提交，Commit：`87b2ba3`。

- [x] 補回服務頁 Header 缺少的搜尋連結。
  - 範圍：`wwwroot/services.html`。
  - 內容：補回與其他靜態頁一致的 `index.html#search` 搜尋連結與搜尋 SVG；共用 `site-header.css` 樣式不需調整。
  - 已驗證：來源結構比對；`/services.html` 桌機實際瀏覽器檢查搜尋連結與 SVG 存在；390px 手機實際檢查搜尋連結可見、頁面寬度未溢出。
  - 更新：2026-08-11。狀態：已提交，Commit：`dcaf579`。

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
  - 更新：2026-08-11。狀態：已提交，Commit：`b95ac95`。
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

- [x] 2026-08-12：依舊版 `affiliates.html` 重整關係企業頁面排版與呈現。
  - 內容：補回亞柏羽球隊頁籤；世新、亞柏油品、亞柏會舘、羽球隊、太報與 ALPHA 改用各自的原生內容結構、圖片圖庫、服務／聯絡資訊與服務品質區塊；以新版頁面 scoped CSS 重建舊版桌機雙欄、圖庫與手機單欄排列，不搬入 Tailwind class。
  - 已驗證：舊版內容與圖片比對；確認新版所有頁面圖片素材存在；確認 6 個 tab 的 `aria-controls` 對應 6 個 panel；`node --check wwwroot/js/pages/affiliates.js`；`git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、六個 tab 切換互動、桌機／手機 RWD 渲染、圖庫裁切、服務據點手風琴、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：統一關係企業主圖片高度。
  - 內容：所有關係企業主圖片使用相同的響應式高度 `clamp(320px, 32vw, 480px)`，以 `object-fit: cover` 保持比例並避免拉伸；手機版取消固定高度，恢復圖片自然比例。
  - 已驗證：確認 `affiliates.css` 主圖片共用高度與 `object-fit: cover`，完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、圖片裁切比例與跨瀏覽器、實體裝置及人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：修正亞柏油品圖片被內容高度拉長的問題。
  - 內容：移除關係企業主圖片的 `align-self: stretch`、固定最小高度與強制比例，改依圖片原始比例自動高度呈現，避免服務據點增加後圖片變形。
  - 已驗證：確認 `affiliates.css` 主圖片使用 `height: auto`、`min-height: 0`、`aspect-ratio: auto`，完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、圖片比例與跨瀏覽器、實體裝置及人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：補上亞柏油品服務據點資訊。
  - 內容：新增 9 個服務據點的原生 `<details>` 手風琴，包含站點名稱、電話與地址；使用頁面專屬 CSS 處理展開符號、分隔線與內容層級，不新增 JavaScript。
  - 已驗證：確認 9 個據點資料、`aria-labelledby`、原生 `details` 結構，完成 `git diff --check` 與 `node --check wwwroot/js/pages/affiliates.js`。
  - 未驗證：修改後瀏覽器實際畫面、手風琴展開互動、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：調整亞柏油品子標題文字顏色。
  - 內容：參考舊專案 `.affiliate-tagline` 的品牌色，新增 `--color-secondary: #223547` token，將「油品質純 綠能永續」與同類子標題改為深藍色。
  - 已驗證：確認 `tokens.css` token 與 `affiliates.css` selector 對應，完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：補上亞柏油品子標題「油品質純 綠能永續」。
  - 內容：於 `affiliate-oil` 公司標題下新增 `.affiliate-tagline`，沿用既有橘色強調樣式。
  - 已驗證：確認 `affiliates.html` 子標題位置與 `affiliates.css` selector 對應，完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：統一關係企業內容區字級與網站既有規則。
  - 內容：主標題調整為與 About 內容區相同的 `clamp(2rem, 3.2vw, 2.6rem)`；服務標題調整為網站常用的 `clamp(1rem, 1.25vw, 1.16rem)`；說明文字與清單恢復 1rem 基礎字級，保留 600／400 字重層級。
  - 已驗證：確認 `affiliates.css` 字級設定與 About 頁面規則一致，完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：調細關係企業內容區標題字重以符合網站風格。
  - 內容：主標題與服務標題由 `font-weight: 700` 調整為 `600`，比照網站其他內容區標題層級；字級、行高與間距維持不變。
  - 已驗證：確認 `affiliates.css` 標題字重為 600，完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：縮短世新貨櫃服務品質區塊與主內容的間距。
  - 內容：保留正確的 HTML grid area 結構，將 `.affiliate-panel` 的欄距與列距拆開，避免原本整體 `gap` 與服務品質區塊 `margin-top` 疊加造成距離過大；手機版改由固定列距控制。
  - 已驗證：確認 `affiliate-sexin-awards` 仍位於 `article` 內且保留 `aria-labelledby`，完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：移除關係企業內容區的 `Delivery, Verdana` 字體設定。
  - 內容：主標題、服務標題、說明文字與清單恢復使用專案既有 `var(--font-body)` 字體，保留既有字級與粗細調整。
  - 已驗證：確認 `affiliates.css` 不再包含 `Delivery`／`Verdana` 字體設定，並完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：依 DHL 實際 DevTools 字體資訊調整關係企業內容字型。
  - 內容：主標題、服務標題、說明文字與清單改用 `Delivery, Verdana, sans-serif` 字體堆疊；主標題以 `clamp()` 對應 DHL 標示的 36px 桌機基準，並保留繁中文字體 fallback。
  - 已驗證：確認 `affiliates.css` 字體堆疊與 36px 上限設定、完成 `git diff --check`。
  - 未驗證：本專案未提供 Delivery 字型檔，實際字型取決於使用者環境；修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：依參考企業網站調整關係企業內容區字體層級。
  - 內容：主標題改用無襯線字體、加大並提高粗細；服務標題、說明文字與清單同步放大並調整行高／間距，證書說明文字微幅放大。
  - 已驗證：確認 `affiliates.css` 已設定響應式 `clamp()` 字級與明確 `font-weight`，並完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：參考企業網站左圖右文版型調整關係企業內容區。
  - 內容：一般關係企業面板改為左側大圖、右側文字與服務清單；世新貨櫃服務品質肯定區塊維持下方證書展示，圖片保留無圓角，手機改為圖片在上、文字在下。
  - 已驗證：確認 `affiliates.css` 使用頁面 scoped grid areas、圖片無圓角且服務品質區塊未恢復分隔線；完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：調整世新貨櫃服務品質區塊圖片與分隔線。
  - 內容：關係企業頁面圖片移除 `border-radius`；服務品質肯定區塊移除上方灰色分隔線，改以區塊間距與標題橘線維持視覺層次。
  - 已驗證：確認 `affiliates.css` 圖片規則為 `border-radius: 0`、服務品質區塊不再設定 `border-top`，並完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：補上 `affiliates.html` 世新貨櫃企業的服務品質肯定區塊。
  - 內容：參考舊專案加入「服務品質肯定」標題與三張 FLORENS／TEXTAINER 證書圖片；新版素材與舊專案檔案 SHA-256 一致，沿用頁面專屬原生 HTML/CSS 與桌機三欄、手機單欄排列。
  - 已驗證：確認三張證書圖片存在且與舊專案 SHA-256 一致、HTML 圖片 alt／尺寸屬性、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、桌機／手機 RWD 渲染、跨瀏覽器、實體裝置與人工無障礙驗收。
  - 狀態：待提交。

- [x] 2026-08-12：移除 `affiliates.html` 內容區英文 eyebrow 標題。
  - 內容：移除五個關係企業面板的英文 eyebrow，保留中文企業名稱、介紹文字與服務內容，避免未確認的英文翻譯。
  - 已驗證：確認 `affiliates.html` 不再包含內容區 `eyebrow`，並完成 `git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、跨瀏覽器、實體裝置與人工無障礙驗收。

- [x] 2026-08-12：移除 `affiliates.html` 內容面板邊線與陰影。
  - 內容：以 `.affiliate-panel { border: 0; box-shadow: none; }` 明確移除面板邊線與陰影，保留既有內容間距、圖片與響應式排列。
  - 已驗證：確認 `affiliates.css` 面板規則明確關閉邊線／陰影、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、跨瀏覽器、實體裝置與人工無障礙驗收。

- [x] 2026-08-12：人才招募頁面完成。
  - 範圍：`wwwroot/join.html`、`wwwroot/css/pages/join.css`、`wwwroot/css/base/tokens.css`、`wwwroot/css/site.css`、`TODO.md`。
  - 內容：統一招募內容標題與英文標題樣式；移除職缺卡片邊框／陰影；加入 Logo hover 放大與 Phosphor `ph-link`；加入亞太圖片改為 16:9、填滿欄寬且無圓角；建立 1200px 內容最大寬度與響應式左右留白規則，Header 維持寬版導覽。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/site.js`、`node --check wwwroot/js/pages/join.js`、來源 selector 與容器規則檢查。
  - 未驗證：瀏覽器實際畫面、跨瀏覽器、實體裝置與人工無障礙驗收；本機瀏覽器控制環境無可用瀏覽器。
  - 狀態：已提交，Commit：`1d01733`。

- [x] 2026-08-12：調整 `join.html` 加入亞太圖片比例與圓角。
  - 內容：參考台泥第一段落圖片，將加入亞太右側圖片改為填滿欄寬的 16:9 比例，移除 `border-radius`。
  - 已驗證：確認 `join.css` 圖片規則為 `width: 100%`、`aspect-ratio: 16 / 9` 且未設定圓角；`git diff --check`。
  - 未驗證：修改後瀏覽器實際畫面、跨瀏覽器、實體裝置與人工無障礙驗收。

- [x] 2026-08-12：建立企業網站內容容器間距規則。
  - 內容：新增 `--content-max-width: 1200px` 與 `--content-padding: clamp(20px, 5vw, 72px)`；共用 `.site-container` 改用受控內容寬度，讓 Hero 內容、各頁正文與 Footer 保持一致邊界；Header 維持原有寬版導覽列，不直接套用內容容器限制。
  - 已驗證：來源確認 Header 使用自身 `width: 100%`／`max-width: none` 覆蓋規則；`git diff --check`。
  - 未驗證：修改後各頁桌機／手機瀏覽器實際渲染、跨瀏覽器、實體裝置與人工無障礙驗收。

- [x] 2026-08-12：移除 `join.html` 介紹圖片陰影。
  - 內容：移除加入亞太介紹圖片的 `box-shadow`，保留首頁參考的 88% 寬度、4:3 比例與圓角。
  - 已驗證：確認 `join.css` 介紹圖片不再設定陰影、`git diff --check`。
  - 未驗證：依需求未進行瀏覽器、實機、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：再次調整 `join.html` 標題色彩、圖片比例與福利表間距。
  - 內容：參考首頁「關於亞太」區塊，統一 JOIN APLI／BENEFITS／CAREER OPPORTUNITIES 的英文標題為灰色、1rem、0.04em 字距與 18px 下距；職缺介紹圖片沿用首頁 88% 寬、4:3 比例與相同陰影；公司福利標題與表格之間補上區塊間距。
  - 已驗證：來源 selector 與首頁規則比對、`git diff --check`。
  - 未驗證：依需求未進行瀏覽器、實機、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：調整 `join.html` 招募內容標題與職缺連結樣式。
  - 內容：統一「加入亞太／公司福利／職缺資訊」的頁面標題結構與橘色底線；移除職缺資訊卡片的邊框與陰影；職缺 Logo 在 hover／focus 時放大；「查看最新職缺與應徵」改用 Phosphor `ph-link` icon。
  - 已驗證：HTML 結構與指定 class／icon 檢查、`node --check wwwroot/js/pages/join.js`、`git diff --check`。
  - 未驗證：依需求未進行實機驗證；未進行瀏覽器畫面、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：員工專區 `/Admin` 調整完成。
  - 內容：移除登入驗證碼下方說明文字；保留目前清楚且適度干擾的 5 碼驗證碼設計；修正儲存成功訊息被清空的問題；最新消息改以建立時間 `CreatedAt` 排序，同時間再以公告日期與 ID 後備排序。
  - 已驗證：`dotnet build -c Release`（0 warnings、0 errors）、`node --check wwwroot/js/pages/admin.js`、`node --check wwwroot/js/pages/home.js`、`git diff --check`。
  - 未驗證：瀏覽器實際登入、儲存成功通知與首頁最新消息排序畫面；實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：對齊 `join.html` 舊版人才招募介面。
  - 內容：移除教育訓練頁籤與獨立區塊；保留福利表內的員工在職教育訓練列；補入舊版 104／1111 Logo 與外部職缺連結，並改用現有 tokens 控制文字與卡片排版。
  - 已驗證：舊版內容與桌機畫面比對、新版桌機實際渲染、Logo SHA-256、`node --check wwwroot/js/pages/join.js`、`git diff --check`。
  - 未驗證：新版手機實際渲染、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：擴充 `/Admin` 登入與最新消息上傳能力。
  - 內容：登入加入伺服器端一次性圖形驗證碼；消息編輯支援公告圖片與 PDF／Word／Excel 附件，檔案存放於 `App_Data`，已發布消息的圖片與附件透過受限 API 提供；首頁無公告圖片時沿用預設背景，公開詳情頁顯示附件原始檔名；登入卡片 Logo 下移少許。
  - 已驗證：Release build、Admin／News Detail JavaScript 語法、`git diff --check`；隔離 HTTP API 的驗證碼與 multipart 圖片／PDF 上傳流程。
  - 未驗證：本次瀏覽器存取本機 `127.0.0.1` 被權限拒絕，登入卡片桌機／手機實際畫面仍待驗證；正式 HTTPS、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：調整 `/Admin` 登入卡片品牌與標題層級。
  - 內容：移除登入卡片內的 `APLI EMPLOYEE AREA` 與登入說明，將公司 Logo 移入卡片並置中；縮小「員工專區」標題。
  - 已驗證：Razor Release build、`git diff --check`。
  - 未驗證：瀏覽器桌機／手機實際畫面、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：對齊消息詳情返回按鈕的 hover icon 動畫。
  - 內容：參考首頁「關於亞太／了解更多」按鈕，改為使用 `--button-text-arrow-hover-shift-x` 的水平 2px 位移；移除原本左上方位移效果。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：調整消息詳情頁返回按鈕位置與 icon 動畫。
  - 內容：返回最新消息按鈕移至 `news-detail__header` 上方，改用 Phosphor `ph-arrow-u-up-left`；hover／focus 時沿用首頁文字箭頭的水平位移 token `--button-text-arrow-hover-shift-x`，並支援 reduced motion。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：調淡共用一般 Hero 遮罩。
  - 內容：將 `--page-hero-overlay-light` 由上方 25%／下方 40% 調整為上方 18%／下方 30%；`page-hero--quote` 的專用深色遮罩維持不變。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：下移消息詳情頁 Hero 圖片取景位置。
  - 內容：將 `news-detail.html` 與 `/news/{id}` 共用的 Hero 圖片位置由桌機 `center 58%` 調整為 `center 68%`，手機由 `center 62%` 調整為 `center 70%`，讓畫面呈現更多圖片下方內容。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：補回消息詳情頁 Hero 並修正附件與返回按鈕樣式。
  - 內容：`news-detail.html` 與 `/news/{id}` 新增共用 News Hero；附件連結改為僅檔名加底線，紙夾 icon 不再帶底線；返回最新消息改用 `.button--primary` 與 Phosphor 返回 icon。
  - 已驗證：`node --check wwwroot/js/pages/news-detail.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：調整 `news-detail.html` 消息內頁附件與返回連結版面。
  - 內容：維持舊版消息內頁的無 Hero 緊湊版型；附件改為「附件：」標題、Phosphor `ph-paperclip` icon 與實際檔名連結；返回最新消息連結放在正文與附件之後的內容區底部。
  - 同步：更新靜態 `wwwroot/news-detail.html`、`wwwroot/js/pages/news-detail.js` 與 Razor `Pages/News/Detail.cshtml`，保留兩種路徑的相同呈現。
  - 已驗證：`node --check wwwroot/js/pages/news-detail.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 2026-08-12：調整 `news.html` 與舊版消息列表介面一致。
  - 內容：移除年份篩選；消息列表改為每次顯示 8 筆，超過目前顯示數量時才呈現「載入更多」按鈕；保留分類篩選與原有消息連結。
  - 範圍：`wwwroot/news.html`、`wwwroot/css/pages/news.css`、`wwwroot/js/pages/news.js`、`TODO.md`。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收；依本次工作要求不啟動網站或進行實機驗證。

- [x] 2026-08-12：完成 News 與 News Detail 桌機版介面整理。
  - 內容：News 保留舊版分類篩選與列表排列，移除年份篩選並加入分批載入；News Detail 補回 Hero、附件檔名連結與符合共用按鈕變數的返回按鈕，並同步靜態頁與 Razor 詳情頁。
  - 範圍：`wwwroot/news.html`、`wwwroot/news-detail.html`、`wwwroot/css/base/tokens.css`、`wwwroot/css/pages/news.css`、`wwwroot/css/pages/news-detail.css`、`wwwroot/js/pages/news.js`、`wwwroot/js/pages/news-detail.js`、`Pages/News/Detail.cshtml`、`TODO.md`。
  - 已驗證：`node --check wwwroot/js/pages/news.js`、`node --check wwwroot/js/pages/news-detail.js`、`dotnet build -c Release`（0 warnings、0 errors）、`git diff --check`。
  - 未驗證：桌機／手機瀏覽器實際渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - Commit：已提交；以 `git log -1` 為準。

- [x] 2026-08-12：修正 News 頁面空狀態文字未隨 `hidden` 屬性隱藏的問題。
  - 內容：補上 `.news-empty[hidden]` 的 `display: none` 規則，避免正常消息列表下仍顯示「沒有符合條件的最新消息」。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收；依本次工作要求不啟動網站或進行實機驗證。

- [x] 2026-08-12：為 News 頁面空狀態訊息加入消息文件 inline SVG icon。
  - 內容：在「沒有符合條件的最新消息」上方加入橘色消息文件圖示，載入失敗訊息更新時保留圖示結構。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收；依本次工作要求不啟動網站或進行實機驗證。

- [x] 2026-08-12：將 News 空狀態圖示改用 Phosphor `ph-newspaper`。
  - 內容：以 `<i class="ph ph-newspaper"></i>` 取代 inline SVG，沿用專案 Phosphor 字型與橘色圖示樣式。
  - 未驗證：瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗收；依本次工作要求不啟動網站或進行實機驗證。


| 日期 | 範圍 | 紀錄 |
| --- | --- | --- |
| 2026-08-11 | 營運資源頁面 | 依舊版介面補齊四段圖文、健康與安全 CTA、三欄營運優勢、周邊距離與嵌入式地圖；全部採用頁面 scoped 原生 CSS、既有 tokens 與共用元件，不帶入 Tailwind。已完成 Release 建置、JS／差異檢查、1366／390／320 實際渲染及 980／1099／1100 斷點檢查；外部地圖內容、實際 hover、跨瀏覽器、實體裝置與人工無障礙仍待驗證。Commit：`18b63bc`。 |
| 2026-08-11 | 頁面命名與多語言規劃 | 記錄為最後階段處理：先完成主要頁面內容、路由與功能，再統一正式 canonical URL、舊 `.html` 轉址、`/zh-tw`／`/en` 語言前綴、翻譯內容策略與 `hreflang`／SEO metadata。Commit：`2f68685`。 |
| 2026-08-11 | 靜態頁 HTML 整理 | 展開健康安全、營運資源、隱私權與服務項目 HTML，保留單一 Footer 注入標記並補齊服務頁籤鍵盤狀態；程式檢查通過，畫面驗證待進行。Commit：`b7fd2b2`。 |
| 2026-08-11 | 員工專區 `/Admin` | 新增獨立 Razor 登入／最新消息管理頁，使用原生 CSS/JavaScript；Program 補上 Cookie 認證、CSRF、登入限流、與舊專案一致的啟動前帳密必要檢查與消息／分類 API，帳號密碼由 `Admin__Username`／`Admin__Password` 環境變數提供；檔案上傳未納入。完成 1366px／390px 實際渲染、登入與資料載入、編輯／清空互動；消息／分類寫入操作、未設定帳密的啟動失敗、正式 HTTPS、實體裝置、跨瀏覽器與人工無障礙尚未驗證。`dotnet build -c Release`、`node --check wwwroot/js/pages/admin.js`、本次修改檔案 `git diff --check` 通過。Commit：`0754ebe`。 |
| 2026-08-11 | 新視窗交接流程 | 在 `AGENTS.md` 補充以文件與 Git 接續上下文、縮小單次範圍，並強制於實作前詢問「主代理＋子代理模式」或「一般模式」；已完成文件及差異檢查。Commit：`b7fd2b2`。 |
| 2026-08-11 | 非首頁共用 Hero | 建立共用 Hero 元件與深淺遮罩 tokens，換回 9 頁專屬圖片／裁切，補上圖片與文字動畫、reduced-motion 及 AVIF MIME；建置與差異檢查通過，逐頁手機與 MIME 修正後瀏覽器重載待驗證。Commit：`aa1cab7`。 |
| 2026-08-11 | 共用 Breadcrumb 與 Header active | 建立 `.page-breadcrumb` 共用樣式；About 與 `/about` 補齊「首頁 › 關於我們 › 公司簡介」；`site.js` 依 URL 標記子選單父層 `.nav-link.is-active` 與 `aria-current`。JS 語法與 Release 建置通過；瀏覽器渲染、互動、跨瀏覽器、實體裝置與人工無障礙待驗證；完整 `git diff --check` 受既有 4 個靜態頁 trailing whitespace 影響。狀態：已提交，Commit：`b95ac95`。 |
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

- [x] 調整 About 經營理念圖片裁切比例。
  - 範圍：`wwwroot/css/pages/about.css`。
  - 內容：桌機 gallery 改用以視窗寬度計算的固定 14:5 圖片框架，避免 `60vh` 使筆電與桌機因可視高度不同而產生不同裁切；手機版恢復自動高度並保留 `min-height: 520px`。
  - 已驗證：`node --check wwwroot/js/pages/about.js`；`dotnet build -c Release`（0 warnings、0 errors）；暫存差異 `git diff --cached --check`；`git status --short`。
  - 未驗證：桌機／手機瀏覽器實際圖片裁切、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受保留中的既有 HTML trailing whitespace 影響。
  - 更新：2026-08-11。狀態：已提交，Commit：`04555a8`。

- [x] 調整 About 認證與獎項時間軸區塊。
  - 範圍：`Pages/About.cshtml`、`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`wwwroot/js/pages/about.js`。
  - 內容：參考舊版完整認證與獎項資料，加入桌機 sticky 年份、滾動進度線、近期八筆與完整清單的收合互動；標題底線改用 About 既有標題底線邏輯，按鈕沿用 `.button--primary`。
  - 已驗證：Razor／靜態頁區塊順序與資料結構來源檢查；`node --check wwwroot/js/pages/about.js`；`dotnet build -c Release`（0 warnings、0 errors）；本次 staged `git diff --check`。
  - 未驗證：桌機／手機瀏覽器渲染、sticky 年份與收合互動實機結果、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受保留中的靜態 HTML trailing whitespace 影響。
  - 更新：2026-08-11。狀態：已提交，Commit：`0e44ca4`。

- [x] 修正 About 認證時間軸收合後年份與底部滾動狀態。
  - 範圍：`wwwroot/js/pages/about.js`。
  - 內容：收合後年份應回到最後一筆近期獎項 2019；依目前可見事件與視窗錨點重新校正 sticky 年份，並在展開／收合狀態變更後更新時間軸進度。
  - 已驗證：`node --check wwwroot/js/pages/about.js`；`dotnet build -c Release`（0 warnings、0 errors）；本次 staged `git diff --check`。
  - 未驗證：瀏覽器實際收合、展開、滑到底與桌機／手機渲染、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受既有靜態 HTML trailing whitespace 影響。
  - 更新：2026-08-11。狀態：已提交，Commit：`c6959ef`。

## 2026-08-11 Contact 頁面調整

- [x] 移除 Contact Hero，改為先顯示各部門聯絡窗口，再顯示公司位置。
- [x] 調整 `h1`／`h2` 標題層級與橘色底線樣式，補回 `CONTACT APLI`／`LOCATION` 英文小標，縮短標題與內文距離，並移除區塊邊線、內部分隔線與陰影。
- [x] 右側公司照片改為 Google Maps iframe，移除不需要的 `map-link` 外部連結。
- [x] 將公司位置左側資料欄在桌機版向下內縮 24–32px，使其與右側地圖視覺對齊；手機版維持 0px 內縮。
- [x] 修正 `contact.html` 缺少 `shared-site-footer` marker 的問題，恢復共用 Footer 注入。
- [x] 公司位置左側資料欄加入淺色背景、內距與桌機高低差；手機版取消偏移並保留單欄閱讀。
- 驗證：已完成 `/contact.html` 桌機 1366×1400 與手機 390×844 瀏覽器檢查；已確認桌機灰色背景向左右邊界延伸、手機恢復單欄且無水平溢出、Footer 1 個；`dotnet build -c Release` 成功（0 警告、0 錯誤）。
- 未驗證：跨瀏覽器、實體裝置與人工無障礙驗收。
- 更新：2026-08-11。狀態：已提交，Commit：`ffc9f03`。

- [x] 修正 Contact 公司位置背景層級與地圖寬度。
  - 內容：撤回 `.location-card` 向右滿版延伸，讓 Google Maps 恢復在 `site-container` 原本寬度內；將淺灰背景移至 `.location-card` 作為地圖與左側資料區共同底層，標題區保留白底。
  - 已驗證：Headless Chrome 桌機 1366×1400、手機 390×2200；確認桌機地圖恢復容器寬度、灰色底層橫跨左右欄並延伸至地圖下方，手機維持單欄與 Footer 顯示。
  - 未驗證：Google Maps 外部 iframe 在 Headless Chrome 中未載入地圖內容；跨瀏覽器、實體裝置與人工無障礙驗收。
  - 更新：2026-08-11。狀態：已提交，Commit：`dea0c69`。

## 2026-08-11 About 認證按鈕圖示

- [x] 認證與獎項按鈕補上 Phosphor `ph-caret-line-down`／`ph-caret-line-up`，並讓展開與收合狀態同步切換圖示。
- 範圍：`Pages/About.cshtml`、`wwwroot/about.html`、`wwwroot/css/components/buttons.css`、`wwwroot/js/pages/about.js`、`wwwroot/public/fonts/Phosphor.woff2`。
- 已驗證：`node --check wwwroot/js/pages/about.js`；`dotnet build -c Release`（0 警告、0 錯誤）；本次 staged `git diff --check`。
- 未驗證：未啟動網站，未進行瀏覽器實際展開／收合、桌機與手機渲染、跨瀏覽器、實體裝置與人工無障礙驗收；完整工作樹 `git diff --check` 仍受既有靜態 HTML 尾端空白影響。
- 更新：2026-08-11。狀態：已提交，Commit：`4156341`。

## 2026-08-11 公司沿革頁面微調

- [x] 調整公司沿革年份頁籤與事件文字層級。
  - 範圍：`wwwroot/css/pages/milestones.css`。
  - 內容：年份頁籤統一維持墨色文字，hover 與目前選項僅以橘色下底線表示；年份、事件標題與內文的字級、粗細與行高對齊新版 About 認證時間軸，頁籤高度與內距沿用新版 Join／Affiliates 規則；切換年份時加入淡入上移過渡，並支援 `prefers-reduced-motion`。
  - 已驗證：新版 `about.css`、`join.css`、`affiliates.css` selector 與數值對照、`node --check wwwroot/js/pages/milestones.js`、本次檔案 `git diff --check`。
  - 未驗證：依需求未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。初次提交：`3f23e4b`；新版樣式基準修正另記。

- [x] 更正公司沿革文字與過渡效果的參照基準。
  - 範圍：`wwwroot/css/pages/milestones.css`、`TODO.md`。
  - 內容：撤回舊版數值參照；改以新版 About 認證時間軸的文字層級與新版 Join／Affiliates 的頁籤尺寸為準，過渡時間採新版互動元件一致的 350ms。
  - 已驗證：新版 `about.css`、`join.css`、`affiliates.css` selector 與數值對照、`node --check wwwroot/js/pages/milestones.js`、本次檔案 `git diff --check`。
  - 未驗證：依需求未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：本次提交。

- [x] 對齊公司沿革當前頁籤的橘色下底線。
  - 範圍：`wwwroot/css/pages/milestones.css`、`TODO.md`。
  - 內容：以目前頁籤的偽元素覆蓋灰色基線，避免橘線上浮；橘色線厚度由 2px 提高至 4px。
  - 已驗證：來源 selector、偽元素定位與本次檔案 `git diff --check`。
  - 未驗證：未啟動網站，未進行桌機／手機瀏覽器渲染、實體裝置、跨瀏覽器與人工無障礙驗收。
  - 更新：2026-08-11。狀態：本次提交。

- [x] 補充公司沿革 Hero 遮罩的共用來源。
  - 範圍：`README.md`、`TODO.md`。
  - 內容：記錄 `milestones.html` 的 `.milestones-hero__overlay.page-hero__overlay` 使用共用 Hero 遮罩；共用元件由 `site.css` 載入，預設遮罩 token 位於 `tokens.css`，頁面 CSS 只設定圖片定位。
  - 已驗證：`milestones.html`、`site.css`、`components/page-hero.css`、`base/tokens.css` 與 `milestones.css` 來源關係檢查；本次檔案 `git diff --check`。
  - 未驗證：文件更新不涉及瀏覽器渲染驗證。
  - 更新：2026-08-11。狀態：本次提交。
- [x] 2026-08-12：重新排版 `occupational-safety.html` 的 `site-container safety-intro__layout`。
  - 版面：標題與兩段說明文字橫跨完整寬度；健康照護清單與圖片改為下方左右兩欄，手機版改為上下排列。
  - 已驗證：`node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check`、HTML/CSS 結構與 responsive grid source 檢查。
  - 未驗證：本機站台未能在 `localhost:5088` 啟動，尚未完成瀏覽器桌機／手機實際渲染檢查。
- [x] 2026-08-12：調整 `occupational-safety.html` 的 `public/images/occupational-safety/1-1.png` 圖片呈現比例。
  - 版面：改為 16:9 橫向長方形，配合圖片原始比例；桌機與手機共用同一長方形比例。
  - 已驗證：`dotnet build -c Release`、`node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check`。
- [x] 2026-08-12：調整 `safety-intro__layout` 下方左右欄位順序與間距。
  - 版面：保留上方兩段完整寬度段落；下方改為左側圖片、右側健康照護文字，並縮小圖片與文字欄位間距。
  - 已驗證：`dotnet build -c Release`、`node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check`。
- [x] 2026-08-12：調整職安介紹區塊圖片與右側文字的欄位距離。
  - 版面：以圖片實際最大寬度建立左欄，右側文字使用剩餘寬度，避免因左欄過寬造成不必要的空白與過早換行；未變更 HTML 結構。
  - 已驗證：`dotnet build -c Release`、`node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check`。
- [x] 2026-08-12：放大職安介紹區塊左側圖片，強化段落視覺層次。
  - 版面：圖片最大寬度由 420px 調整為 520px；1099px 以下依欄位寬度自適應，手機版維持滿寬。
  - 已驗證：`dotnet build -c Release`、`node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check`。
- [x] 2026-08-12：統一職安證照區塊與 `safety-intro__layout` 的左側容器對齊。
  - 版面：證照區塊沿用介紹區塊在桌機與 1099px 以下的容器邊界計算，右側仍保留輪播延伸空間；手機版維持 16px 內距。
  - 已驗證：`dotnet build -c Release`、`node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check`。
- [x] 2026-08-12：將職安頁面正式名稱由「健康與安全」更新為「職業安全衛生」。
  - 範圍：頁面 `<title>`、description、Breadcrumb 與 Hero 標題。
  - 已驗證：`dotnet build -c Release`、`git diff --check`。
- [x] 2026-08-12：修正職業安全衛生頁面的行動裝置閱讀順序與證照卡片觸控滑動。
  - 行動版順序：標題 → 圖片 → 兩段說明 → 健康照護內文；證照 viewport 改用原生水平觸控捲動設定，支援手指左右拖曳並保留輪播按鈕與 scroll snap。
  - 已驗證：`node --check wwwroot/js/pages/occupational-safety.js`、`dotnet build -c Release`、`git diff --check`。
- [x] 2026-08-12：`occupational-safety.html` 頁面完成。
  - 完成：正式頁名、前導圖文版面、行動版「標題 → 圖片 → 內文」閱讀順序、職業安全衛生證照卡片、左右控制圖示與手指水平拖曳。
  - 已驗證：`node --check wwwroot/js/pages/occupational-safety.js`、`dotnet build -c Release`（0 warnings、0 errors）、`git diff --check`；桌機版容器對齊與前導區塊版面已實際檢查。
  - 未驗證：實體行動裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：頁面變更已提交，commit `bfc406c`；本文件紀錄另行提交。

- [x] 2026-08-12：重新調整 `services.html` 服務內容區塊版面。
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 版面：沿用職業安全衛生第一區塊的標題與內文層級；服務說明置於上方，下方採左側 16:9 圖片、右側服務細項，並將所有 services selector 限定在 `.services-page` 下；手機版改為圖片後接細項的單欄閱讀。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`（0 warnings、0 errors）、1366px 桌機、1024px 平板、390px 手機實際渲染、三種尺寸無水平溢出、服務分頁 hash／ARIA／tabpanel 切換。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收；5088 埠未啟動，瀏覽器驗證使用目前可連線的 `http://localhost:5127/services.html`。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：調整 `services.html` 介紹區塊文字對齊、倉儲物流圖片輪播與服務細項層級。
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`wwwroot/js/pages/services.js`、`TODO.md`。
  - 內容：eyebrow、h2 與介紹段落改為置中；倉儲物流區塊新增四張指定圖片的輪播、前後切換與指示點；服務內容改用 h3，清單文字放大並使用深色文字。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`（0 warnings、0 errors）、`git diff --check`；1366px 桌機、1024px 平板、390px 手機實際渲染；三種尺寸無水平溢出；輪播前後控制、指示點、服務分頁 hash／ARIA／tabpanel 切換。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：統一 `services.html` 輪播控制列與職業安全衛生證照區塊的 icon 呈現。
  - 內容：輪播控制列移至圖片下方，改用既有 Phosphor caret icon、active 長條與未選取圓點；保留 8 秒自動切換，滑鼠停留／鍵盤聚焦時暫停；同步調整 Services 介紹文字與服務細項的字體層級。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`；1366px 桌機、1024px 平板、390px 手機實際渲染；自動輪播前後狀態變更、icon／指示點初始化與三種尺寸無水平溢出。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：收斂 `services.html` 介紹文字寬度並平衡服務內容 typography。
  - 內容：介紹區最大寬度調整為 860px、說明段落限制為 820px，縮短介紹區內部與下方內容的視覺間距；右側 `h3` 降低字級與字重，清單同步調整字級與行高，保留深色文字與既有 heading／body 字體分工。
  - 已驗證：1366px 桌機、1024px 平板、390px 手機實際渲染；三種尺寸無水平溢出；`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：僅調整 Services 頁面標題字體搭配。
  - 內容：限定 `.services-page`，將 eyebrow、h2、服務內容 h3 改為 `--font-body` 無襯線字體；h2 採參考圖的橘色粗體，h3 採黑色粗體；其他頁面與 Services 段落／清單字體維持原規則。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`（0 warnings、0 errors）、`git diff --check`；1366px 桌機與 390px 手機實際渲染，兩種尺寸無水平溢出。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：將 Services 服務分頁改為參考頁的標題與說明版面。
  - 內容：保留「倉儲物流」、「貨櫃清洗與維修」、「機具維修與銷售」標題名稱；移除英文 eyebrow，改為上方置中深色標題、橘色底線與下方整列說明文字。
  - 版面：圖片與服務內容移至標題／說明下方，桌機採較寬圖片與右側服務內容，平板與手機維持響應式排列。
  - 已驗證：1366px 桌機、390px 手機實際渲染；標題字級、顏色、字重、橘色底線與三種內容區塊位置已檢查；`git diff --check`。
  - 未驗證：本次尚未重新執行 `dotnet build -c Release` 與 `node --check wwwroot/js/pages/services.js`；實體裝置、Firefox／Safari、人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：將 Services 分頁標題顏色恢復為既有橘色。
  - 內容：`.service-panel__intro h2` 改回使用 `var(--color-primary)`；保留目前字級、字重、置中與橘色底線版面。
  - 已驗證：`git diff --check`。
  - 未驗證：本次未重新進行瀏覽器渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：恢復 Services 標題原本的下底線造型。
  - 內容：標題改回文字寬度的 3px 橘色 `border-bottom`，移除目前整列 1px 偽元素底線；保留標題橘色與目前版面配置。
  - 已驗證：`git diff --check`。
  - 未驗證：本次未重新進行瀏覽器渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：統一 Services 標題底線與其他頁面標題樣式。
  - 內容：移除文字寬度的整段 border，改用既有置中標題模式的短橘線（`clamp(48px, 5vw, 72px)`、2px）。
  - 參考：沿用 About 與首頁置中標題的 `::after` 規則。
  - 已驗證：`git diff --check`；來源 selector 與既有頁面標題規則對照完成。
  - 未驗證：本次未重新進行瀏覽器渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：將倉儲物流服務內容改為圖片卡片呈現。
  - 內容：移除倉儲物流區塊的輪播與自動切換，改以五張既有專案圖片搭配五項服務內容卡片；保留服務分頁切換與聯絡 CTA。
  - 版面：桌機三欄、平板兩欄、手機單欄；卡片包含服務圖片與項目標題，延續現有圓角、陰影、色彩與字體規範。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check`；待完成瀏覽器渲染檢查。
  - 未驗證：本次尚未執行 `dotnet build -c Release`、桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：重新整理 `services.html` 服務內容版面與 Banner 裁切。
  - 版面：縮短 Banner 與分頁籤之間的上方留白；桌機改為左側標題／說明、右側圖片／服務內容的網格；服務清單下方新增共用 CTA；輪播指示器上移至圖片下方；Banner 改用較乾淨的上方裁切。
  - RWD：平板改為右欄圖片與服務內容上下排列，手機維持標題／說明、圖片、服務內容與 CTA 的單欄閱讀順序。
  - 未採用：目前服務項目數量仍適合單欄清單，未強制改為兩欄，避免製造額外空白。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`；1024px 平板、390px 手機與桌機版實際渲染；三種尺寸無水平溢出，CTA、輪播控制列與 Banner 裁切已檢查。
  - 未驗證：實體裝置、Firefox／Safari、人工無障礙驗收。
  - 狀態：待提交；依本次工作要求保留未提交狀態。

- [x] 2026-08-12：將 Services 三個服務項目改為單頁連續展示，並套用頁面專屬 Pilat 字體堆疊。
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`wwwroot/css/base/tokens.css`、`TODO.md`。
  - 版面：移除分頁籤與隱藏面板，改為三項完整顯示的頁內導覽；三段採一致的標題、說明、代表圖片與編號清單，桌機左右交錯，980px 以下統一為「標題／說明 → 圖片 → 服務清單」，並將三個重複 CTA 合併為頁尾聯絡區塊。
  - 圖片：倉儲物流、貨櫃清洗與維修、機具維修與銷售分別使用現有 `warehousing-yard.png`、`container-cleaning.jpg`、`equipment-maintenance.png`，不新增推測性素材。
  - 字體：新增 `--font-pilat-wide` 與 `--font-pilat`，僅套用於 Services Hero 與內容區；目前專案未包含 Pilat Webfont，瀏覽器會依序回退至 `Noto Sans TC` 等既有字體，取得正式授權字型檔後仍需補上 `@font-face` 才能在所有裝置呈現實際 Pilat 字形。
  - 已驗證：`dotnet build -c Release`（0 warnings、0 errors）、`node --check wwwroot/js/site.js`、`git diff --check`；Edge 1366×900 與 390×844 實際渲染，兩種尺寸無水平溢出，桌機三段高度約 802／744／768px、手機約 975／866／917px；三項導覽在 390px 同列完整顯示，鍵盤 Enter 可定位至 `#maintenance`，三張圖片均可在進入對應區塊後完成載入；瀏覽器 computed style 已確認標題與正文分別取得 `Pilat Wide`／`Pilat` 字體堆疊。
  - 未驗證：Pilat 實際字形（缺少字型檔）、實體裝置、Firefox／Safari、人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：移除 Services 頁面服務導覽、區塊標題與服務清單中的數字標記。
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 內容：保留服務名稱與清單文字，移除 `01／02／03` 導覽與區塊編號，以及清單的自動計數；同步收斂清單欄位，避免留下編號空間。
  - 已驗證：待執行 `dotnet build -c Release`、`git diff --check` 與桌機／手機實際渲染檢查。
  - 未驗證：本次修改尚未完成瀏覽器、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：以 chevron icon 取代 Services 頁面的數字標記位置。
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 內容：頁內服務導覽與各服務清單改用橘色 inline SVG `>` icon；區塊標題維持無編號，保留鍵盤 focus 與 hover 位移效果。
  - 已驗證：`dotnet build -c Release`（0 warnings、0 errors）、`node --check wwwroot/js/site.js`、`git diff --check`；Edge 1366×900 與 390×844 實際渲染，三項導覽與 14 個服務清單均顯示 chevron icon，兩種尺寸無水平溢出，原本的數字與 CSS counter 均已移除。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：調整 Services Hero 字體、服務導覽與內容版面。
  - 內容：恢復 Hero 標題的專案共用標題字體；移除服務導覽中的 `service-index__icon`，保留文字連結的 flex 水平置中；各服務標題與敘述獨立水平置中，下面改為左側服務內容、右側搭配圖片。
  - 已驗證：來源結構檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：縮短 Services 多段介紹文字之間的間距。
  - 內容：為同一服務區塊內相鄰的介紹段落設定 12px 上間距，保留第一段與標題之間原有的間距。
  - 已驗證：來源檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：對調 Services 圖片與服務內容的位置。
  - 內容：桌機／平板改為左側搭配圖片、右側服務內容；980px 以下改為標題／敘述、圖片、服務內容的堆疊順序。
  - 已驗證：來源結構檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：將倉儲物流左側圖片改為三圖拼接版面。
  - 內容：沿用既有 `warehousing-yard.png` 作為上方圖片，搭配 `container-yard-overview.png` 與 `warehouse-storage.png` 形成上方一張、下方左右兩張的圖片網格；右側服務內容在桌機版於圖片拼圖中段垂直置中，響應式堆疊時恢復靠上排列。
  - 已驗證：來源結構檢查、素材檔案存在檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：修正倉儲物流三圖拼接下方留白與圖片間距。
  - 內容：讓三張圖片填滿各自 grid 區域並使用 `object-fit: cover`，使上下與左右圖片間距按拼圖 `gap` 正常顯示，移除固定拼圖外框造成的下方空白。
  - 已驗證：來源結構檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：新增倉儲物流三圖拼接的圖片位置切換。
  - 內容：三張圖片改為純展示；移除圖片本身的點擊操作，改於圖片下方加入上一張、頁面指示點與下一張控制，使用者透過明確控制切換圖片位置。
  - 版面：右側服務內容維持相對圖片拼圖垂直置中，響應式堆疊順序不變。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、來源結構檢查、素材檔案存在檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：圖片控制列實際瀏覽器互動、桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：下移倉儲物流拼圖上方主圖的取景位置。
  - 內容：將 `warehousing-yard.png` 的 `object-position` 設為 `center 65%`，讓圖片裁切焦點往下呈現；其他圖片維持原位置。
  - 已驗證：來源 selector 檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：圖片實際裁切效果、桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：將貨櫃清洗與維修、機具維修與銷售套用倉儲物流圖片版面。
  - 內容：兩個服務區塊均改為左側三圖拼接、圖片下方上一張／指示點／下一張控制列，右側維持服務內容並於桌機版垂直置中；平板／手機沿用圖片後接服務內容的堆疊順序。
  - 素材：貨櫃清洗區使用 `container-cleaning.jpg`、`container-yard-teamwork.png`、`container-handler-operation.png`；機具維修區使用 `equipment-maintenance.png`、`container-handler-operation.png`、`container-yard-teamwork.png`。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、來源結構檢查、素材檔案存在檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：兩個新增圖片控制列的實際瀏覽器互動、桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：上移貨櫃清洗與維修區塊 `326.jpg` 的圖片取景。
  - 內容：針對 `public/images/occupational-safety/326.jpg` 將 `object-position` 設為 `center 25%`，讓圖片裁切位置往上；不影響同區塊其他圖片與切換順序。
  - 已驗證：精確 selector 與來源檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：圖片實際裁切效果、桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：下移機具維修與銷售區塊三張圖片的取景。
  - 內容：針對 `container-handler.png`、`home-hero-container-handling.png` 與 `port-equipment-maintenance.jpg` 設定 `object-position: center 60%`，讓三張圖片都稍微往下呈現；不影響其他服務區塊圖片。
  - 已驗證：精確 selector 與來源檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：三張圖片實際裁切效果、桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-12：調整 Services 內容文字對齊與服務清單分隔線。
  - 內容：服務區塊內多段介紹文字改為左對齊，讓第二段與第一段的文字起點一致；移除服務內容清單的上方與項目間分隔線，保留 chevron、間距與文字樣式。
  - 已驗證：來源 selector 檢查、`git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：桌機／平板／手機實際渲染、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整首頁經營理念圓圈互動。
  - 內容：將 `.home-page .home-philosophy__list li > span` 改為深藍背景，保留原有圖示，滑鼠移入或鍵盤聚焦時以 3D 翻轉顯示對應理念文字，並加入 reduced-motion 支援。
  - 已驗證：來源 selector 檢查、`node --check wwwroot/js/pages/home.js`、`dotnet build -c Release`（0 警告、0 錯誤）與 `git diff --check`；依需求未啟動網站，未進行實機／瀏覽器驗證。
  - 未驗證：桌機／平板／手機實際翻轉效果、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 Contact 公司資訊與 Google 地圖版位。
  - 內容：Hero 保留與其他頁面一致的圖片高度並移除地圖內容；公司資訊改以「公司資訊／COMPANY INFORMATION」標題呈現，移除欄位 icon；Google 地圖移至 Hero 下方，與公司資訊左右並列，手機版改為上下排列。
  - 已驗證：來源結構與 selector 檢查、桌機／手機瀏覽器版面檢查、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、Google 地圖第三方內容實際載入與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：精簡 Contact 地圖與內容區塊。
  - 內容：移除 Google 地圖容器的 padding 與陰影，並完整移除各部門聯絡窗口區塊及其相關 CSS；同步更新頁面描述文字。
  - 已驗證：來源結構與 selector 檢查、桌機／手機瀏覽器版面檢查、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、Google 地圖第三方內容實際載入與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：恢復 Contact Hero 標題顯示。
  - 內容：依共用 Hero 結構補回「聯絡我們」標題，Hero 維持原有高度與圖片焦點；公司資訊標題調整為 `h2`，保留頁面唯一的 `h1`。
  - 已驗證：桌機／手機瀏覽器檢查、Hero 高度與標題可見性、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 Services「倉儲物流」左右版位。
  - 內容：桌機版將「主要服務項目」移至右側、圖片展示移至左側；平板與手機維持圖片在前、服務項目在後的單欄排列。
  - 已驗證：桌機／手機瀏覽器版位與水平溢位檢查、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：統一全站公開頁面主要內文字級。
  - 內容：在 `tokens.css` 新增響應式主要內文字級（約 16–17px），並套用至首頁、公司簡介、公司沿革、營運資源、職業安全、服務項目、關係企業、聯絡我們、人才招募、新聞內頁及隱私權頁面的段落、說明與內容清單；導覽、頁尾、按鈕、標題、日期、標籤及資料表輔助資訊維持原尺寸。
  - 已驗證：`dotnet build -c Release`（0 warning、0 error）、指定檔案 `git diff --check`、共用字級 token 使用位置檢查。
  - 未驗證：桌機／手機實際畫面（本機服務未啟動且瀏覽器無可用一般視窗）、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：簡化 Services「倉儲物流」圖片展示。
  - 內容：移除左側三張圖片拼貼，改為保留一張倉儲物流主圖，維持圖片在左、主要服務項目在右的桌機版位。
  - 已驗證：桌機／手機瀏覽器圖片數量、版位與水平溢位檢查、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將「倉儲物流」圖片與服務項目整合為雙欄卡片。
  - 內容：依參考圖將左側主圖與右側主要服務項目放入同一張卡片，服務項目改為兩欄小卡；平板／手機改為上下排列。
  - 已驗證：桌機／手機瀏覽器視覺與版位檢查、圖片載入確認、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：恢復「倉儲物流」原本的圖片與服務清單版型。
  - 內容：撤回整合卡片與服務項目小卡樣式，保留單張主圖在左、原本主要服務項目清單在右；未恢復三張圖片拼貼。
  - 已驗證：桌機／手機瀏覽器版位與水平溢位檢查、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整「倉儲物流」圖片尺寸與服務項目高低差。
  - 內容：放大桌機版左側圖片比例，並將右側主要服務項目對齊圖片底部；平板／手機維持標準上下排列。
  - 已驗證：桌機／手機瀏覽器尺寸、底部對齊與水平溢位檢查、圖片載入確認、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：為「主要服務項目」增加公司簡介風格背景。
  - 內容：套用與公司簡介內容區相近的 `var(--color-surface-soft)` 淺色背景與內距，維持服務項目在圖片底部的高低差配置。
  - 已驗證：桌機／手機瀏覽器背景色、版位與水平溢位檢查、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：銜接「主要服務項目」與圖片之間的背景色。
  - 內容：桌機版以服務項目區塊的淺色背景向左延伸至圖片與文字區塊之間，維持原有文字位置與高低差；手機版不改變上下排列。
  - 已驗證：桌機／手機瀏覽器背景銜接、文字位置與水平溢位檢查、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：新增「倉儲物流」左側圖片輪播。
  - 內容：將倉庫、貨櫃場與場站全景三張圖片整合為輪播，加入上一張／下一張、指示點、自動播放、滑鼠／鍵盤聚焦暫停與 reduced-motion 支援，維持既有圖片尺寸與右側服務項目位置。
  - 已驗證：桌機／手機瀏覽器輪播初始化、下一張切換、版位與水平溢位檢查、`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、自動播放完整週期與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整輪播「下一張」控制鈕配色。
  - 內容：下一張按鈕改為白色背景、橘色 icon，並同步套用 hover／focus 狀態；上一張按鈕維持原本深色樣式。
  - 已驗證：桌機瀏覽器按鈕 computed style 與水平溢位檢查、`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：放大「倉儲物流」左側輪播圖片並向左外溢。
  - 內容：桌機版圖片向左超出內容容器一小段並增加寬度，圖片右緣與服務項目位置維持不變；手機版不外溢。
  - 已驗證：桌機／手機瀏覽器圖片邊界、右側文字位置與水平溢位檢查、`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：恢復輪播「下一張」控制鈕原本配色。
  - 內容：移除白底橘色覆寫，下一張按鈕恢復與上一張一致的深色背景、白色 icon。
  - 已驗證：桌機瀏覽器 computed style 與水平溢位檢查、`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：同步輪播圖片寬度與指示點數量。
  - 內容：再次增加桌機版左側輪播圖片的左側外溢寬度；指示點改由輪播圖片數量自動產生，現有 6 張圖片會顯示 6 個點，並同步更新 slide ARIA 張數資訊。
  - 已驗證：桌機／手機瀏覽器圖片邊界、6 張圖片／6 個指示點、ARIA 張數、水平溢位檢查、`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、自動播放完整週期與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將「主要服務項目」背景延伸至頁面右側。
  - 內容：服務項目的淺色背景向右延伸至頁面邊界，保留原有文字位置與圖片／服務項目高低差；加入 Services 頁面水平溢位裁切，避免背景延伸產生水平捲軸。
  - 已驗證：桌機／手機瀏覽器右側背景延伸、文字位置與水平捲軸檢查、`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、自動播放完整週期與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：恢復 Services 背景延伸前的範圍。
  - 內容：取消背景填滿至頁面最右側與水平溢位裁切，保留圖片與主要服務項目之間的背景色銜接、圖片寬度與輪播功能。
  - 已驗證：桌機瀏覽器背景 pseudo 範圍、水平溢位與既有輪播指示點檢查、`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、自動播放完整週期與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：放大 Services 服務項目小標題。
  - 內容：將 `.service-section__details h3` 由固定 16px 調整為響應式約 18–20px，使其清楚高於服務清單內文，維持原有粗細、行高及間距。
  - 已驗證：指定檔案 `git diff --check`、CSS selector 與字級值檢查。
  - 未驗證：桌機／手機實際畫面、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將「貨櫃清洗與維修」及「機具維修與銷售」調整為與「倉儲物流」一致的區塊介面。
  - 內容：兩個區塊改用相同的左側圖片輪播、右側主要服務項目背景區塊、圖片左側外溢與桌機高低差版型；輪播指示點由既有 JavaScript 依圖片數量產生，並保留原有文字與圖片。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的三個區塊排列、圖片／資訊順序、背景色、水平溢位、輪播圖片數量與指示點數量；桌機輪播下一張控制；`node --check wwwroot/js/pages/services.js`、`dotnet build -c Release`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、自動播放完整週期與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：移除「貨櫃清洗與維修」區塊的預設淺色背景。
  - 內容：保留 `service-section--reverse` 的版面排列，只將 `#terminal-handling` 區塊背景恢復為一般頁面背景；右側主要服務項目背景維持不變。
  - 已驗證：桌機／手機瀏覽器背景色與版面排列、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：整合「機具維修與銷售」區塊說明文字。
  - 內容：將服務範圍、現場維修保養及代理銷售內容合併為單一段落，改善閱讀連續性並保留原有文案。
  - 已驗證：`git diff --check`。
  - 未驗證：實際瀏覽器畫面、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：新增 Services Hero 下方的服務項目切換選單。
  - 內容：加入純文字 tab 列，串接三個服務 panel 的顯示／隱藏、網址 hash 與頁首服務選單；保留無 JavaScript 時的內容可讀性，手機版改為自動換行，不使用水平拖曳。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的預設 panel、純文字選單、點選切換、網址 hash、鍵盤方向鍵／Enter、手機水平滑動與水平溢位；瀏覽器 console 無 error／warning；`node --check wwwroot/js/pages/services.js`、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 Services 切換列底線與溢位行為。
  - 內容：移除整列滿版底線，只保留目前選中項目下方的橘色指示線；取消水平拖曳與捲軸，手機版改為換行顯示。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的底線、捲軸、換行、水平溢位與服務切換；瀏覽器 console 無 error／warning；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：依照關係企業頁面調整 Services 切換列間距與底線。
  - 內容：增加 Hero 與切換列之間的上方留白，將下底線限制在內容容器寬度，並改用關係企業頁面的 tab 底線與選中項目樣式。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的 Hero 間距、內容容器寬度下底線、選中項目橘色底線、手機換行與水平溢位；瀏覽器 console 無 error／warning；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 Services 切換選單 hover 顏色。
  - 內容：hover／focus 時只顯示淺色背景，不改變文字顏色；目前選中項目的橘色文字與底線維持不變。
  - 已驗證：Edge 桌機 1366×900 實際 hover 背景與文字顏色、瀏覽器 console 無 error／warning、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、手機瀏覽器與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 Services 切換選單選中項目文字顏色。
  - 內容：選中項目文字維持一般灰色，不再變成橘色；保留粗體與橘色底線作為選中狀態提示。
  - 已驗證：Edge 桌機 1366×900 選中項目文字與一般項目顏色一致、橘色底線與粗體保留、無水平溢位、瀏覽器 console 無 error／warning、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、手機瀏覽器與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：移除 Services 切換選單選中項目的粗體。
  - 內容：選中項目只保留橘色底線，文字顏色與字重均維持一般狀態。
  - 已驗證：Edge 桌機 1366×900 選中／未選中字重均為一般字重、選中項目橘色底線保留、瀏覽器 console 無 error／warning、`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari、手機瀏覽器與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：比照 Services 調整 affiliates.html 切換選單。
  - 內容：關係企業切換選單 hover／focus 只顯示淺色背景，選中項目文字維持一般灰色與字重，只保留橘色底線。
  - 已驗證：Edge 桌機 1366×900 實際 hover／選中樣式、選中與一般文字顏色及字重一致、橘色底線保留、瀏覽器 console 無 error／warning、`git diff --check`；已加入 CSS 版本參數避免瀏覽器沿用舊樣式。
  - 未驗證：實體裝置、Firefox／Safari、手機瀏覽器與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：在「倉儲物流」主要服務項目下方新增營運資訊導引。
  - 內容：將「了解詳細營運資訊」導引移回「主要服務項目」卡片內的服務清單下方；保留原始背景圖片、白色標題、變數按鈕「前往查看」與 `operational-resources.html` 連結。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的卡片內位置、服務清單下方排列、按鈕樣式、原始背景圖片、`operational-resources.html` 目標網址、水平溢位與瀏覽器 console；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。
- [x] 2026-08-13：恢復「倉儲物流」原本的營運資訊導引位置。
  - 內容：移除獨立背景圖片 CTA，恢復放在「主要服務項目」服務清單下方的 `.service-section__details-link`；使用原本說明文字與文字箭頭連結，導向 `operational-resources.html`。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的卡片內位置、說明文字、連結網址、無獨立 CTA 結構、無水平溢位；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：重新設計 Services 業務洽談區塊。
  - 內容：將頁尾原本的水平聯絡 CTA 改為置中業務洽談區，採英文識別、中文標題與深藍色部門聯絡卡；卡片顯示「營業部」及可直接撥打的 `07-813-7912`，手機版改為上下排列。
  - 已驗證：`dotnet build -c Release`、指定檔案 `git diff --check`、電話連結及響應式 selector 檢查。
  - 未驗證：桌機／手機實際畫面、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：恢復 Services 原有聯絡 CTA。
  - 內容：依需求撤回「業務洽談／營業部」聯絡卡，恢復原本「了解詳細服務項目內容」文字與「聯絡我們」按鈕；保留其餘 Services 版面與字級調整。
  - 已驗證：指定檔案 `git diff --check`、聯絡區塊結構與相關 CSS selector 檢查。
  - 未驗證：桌機／手機實際畫面、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將 Services 聯絡區改為圖片與資訊雙欄版型。
  - 內容：左側使用 `privacy-policy.jpg`，右側顯示業務洽談說明、營業部與可直接撥打的 `07-813-7912`；桌機以斜切圖片邊界銜接文字，手機改為圖片在上、資訊在下並保留斜切感。
  - 已驗證：`dotnet build -c Release`、指定檔案 `git diff --check`、圖片路徑、電話連結及桌機／手機響應式 selector 檢查。
  - 未驗證：桌機／手機實際畫面、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：移除 Services 聯絡區外層背景與留白。
  - 內容：移除聯絡區塊新增的淺色背景及上下 padding，保留圖片斜切、雙欄資訊與右側文字必要內距。
  - 已驗證：指定檔案 `git diff --check`、聯絡區塊背景與外層 padding selector 檢查。
  - 未驗證：桌機／手機實際畫面、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將 Services 聯絡區改為低高度滿版呈現。
  - 內容：移除上邊線、容器寬度限制、卡片外框、圓角及陰影，讓圖片與文字填滿左右兩側；桌機最小高度由 380px 降為 320px，並縮減文字區垂直留白。
  - 已驗證：指定檔案 `git diff --check`、滿版結構及高度 selector 檢查。
  - 未驗證：桌機／手機實際畫面、實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。
- [x] 2026-08-13：將「查看場區設備與配置」改為可點擊文字連結。
  - 內容：移除「前往查看」按鈕，將文字本身導向 `operational-resources.html`，保留原本主要服務項目區塊內的分隔與間距。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的文字連結、`operational-resources.html` 目標網址、按鈕移除與無水平溢位；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。
- [x] 2026-08-13：調整「查看廠區設備與配置」導引的間距、對齊與 icon。
  - 內容：統一導引上下內距，文字改為右側對齊，補上既有箭頭 icon，並維持整段連結至 `operational-resources.html`。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的右側對齊、箭頭 icon、上下 20px 內距、連結網址與無水平溢位；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。
- [x] 2026-08-13：將服務項目區塊與導引連結下移，並統一使用 Phosphor icon。
  - 內容：桌機版主要服務項目卡片下移 12–20px，底部導引同步下移；導引箭頭改用網站既有 `ph-arrow-bend-up-right` Phosphor icon。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 的服務項目卡片下移、Phosphor icon、連結網址與無水平溢位；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。
- [x] 2026-08-13：增加桌機版服務項目區塊的下移幅度。
  - 內容：將主要服務項目卡片與底部導引的桌機版下移幅度調整為 24–40px，手機版維持不變。
  - 已驗證：Edge 桌機 1366×900 確認卡片下移 40px、手機 390×844 維持原位置，兩種尺寸均無水平溢位；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。
- [x] 2026-08-13：恢復加入「查看廠區設備與配置」導引前的服務項目區塊。
  - 內容：移除「查看廠區設備與配置」文字連結、Phosphor icon、分隔線與相關間距，並撤回服務項目卡片的額外下移；保留主要服務項目清單。
  - 已驗證：Edge 桌機 1366×900 與手機 390×844 確認導引移除、額外下移撤回、服務項目位置恢復與無水平溢位；`git diff --check`。
  - 未驗證：實體裝置、Firefox／Safari 與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將 Services「業務洽談」重整為扁平 CTA。
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 內容：修正先前只降低 `min-height`、仍被內容自然高度撐高的問題；CTA 改用固定矮橫幅，圖片與文字各佔 50%，移除 `BUSINESS INQUIRY`、說明文字及標題底線，「業務洽談」恢復一般中文字體與正常字重；手機仍維持左右各半並將聯絡資訊緊湊排列。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`、Release 建置；目前 Browser 技能未提供可用瀏覽器，桌機／手機實際渲染尚待補驗。
  - 未驗證：Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：恢復 Services 業務洽談 CTA 前一版圖片交界。
  - 內容：撤回圖片向文字側延伸與漸層霧化效果，恢復前一版斜切圖片邊界；50／50 欄位、扁平高度及精簡文字內容維持不變。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：增加 Services 業務洽談 CTA 文字區背景。
  - 內容：右側業務洽談文字欄改用較 `--color-surface-soft` 深一階的頁面專屬淺灰色 `--services-contact-surface`，與頁面白底及左側圖片建立區隔；CTA 外層同步使用相同底色，修正斜切圖片後方透出白色三角區域；高度、50／50 欄位與文字內容維持不變。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：增加 Services 業務洽談圖片右側局部霧化。
  - 內容：在圖片右側交界加入 2px 模糊與最高 68% 的背景色漸層，降低圖片邊緣清晰度；霧化層保留在既有 `clip-path` 內，不完全遮蔽圖片，維持斜切輪廓可辨識。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 Services 業務洽談 CTA 資訊層級。
  - 內容：右側改為「業務洽談」標題在上，聯絡部門與服務電話在下；聯絡資訊維持桌機雙欄、手機單欄，並以水平分隔線建立清楚閱讀順序。
  - 已驗證：來源結構／selector／快取版本檢查、`git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將 Services CTA 標題改為「業務諮詢」。
  - 內容：以較清楚且符合服務頁語境的「業務諮詢」取代「業務洽談」，其餘聯絡資訊與版面不變。
  - 已驗證：來源文案與 `git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：加強 Services 業務諮詢圖片右側霧化。
  - 內容：霧化範圍由 100–180px 加寬為 120–220px，模糊由 2px 提高為 4px，背景色漸層最高透明度由 68% 提高為 80%；既有斜切輪廓維持不變。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：區分 Services 業務諮詢 CTA 與 Footer 背景色。
  - 內容：確認 Footer 使用中性灰 `#f3f4f3` 後，將 CTA 由相近的灰色 `#f0f1f0` 改為帶深藍識別感的淡藍灰 `#edf1f3`；圖片右側霧化漸層同步更新為相同色值。
  - 已驗證：Footer／CTA 色值來源、霧化色值與快取版本檢查、`git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：移除 Services 業務諮詢圖片霧化效果。
  - 內容：移除圖片右側的背景色漸層與 `backdrop-filter` 模糊層；保留原有斜切輪廓、淡藍灰 CTA 背景、50／50 欄位與資訊排版。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：強化 Services 業務諮詢圖片斜切角度。
  - 內容：新增頁面專屬 `--services-contact-cut`，桌機依視窗在 56–80px 間響應，配合 176px CTA 高度呈現清楚但不過度裝飾的斜切；手機固定為 40px，避免窄欄圖片被裁切過多，50／50 結構維持不變。
  - 已驗證：來源 selector／響應式變數／快取版本檢查、`git diff --check`；瀏覽器實際畫面尚未驗證。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：在 Services 頁面試作深色企業版 Footer。
  - 範圍：`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`；未修改共用 `_Footer.cshtml` 或 `site-footer.css`，其他頁面不受影響。
  - 內容：沿用共用 Footer HTML 與手機收合互動，僅以 `.services-page .site-footer` 建立品牌深藍背景、白色 Logo、左側品牌區、右側四欄框線導覽及整合式深色版權列；桌機控制為企業網站所需的緊湊高度，手機恢復單欄收合閱讀。
  - 已驗證：頁面限定 selector、共用 Footer 結構與快取版本檢查、`git diff --check`、Release 建置；Browser 技能目前無可用瀏覽器，桌機／手機實際渲染尚待使用者檢視。
  - 未驗證：Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：Services 單頁試作、待確認；未自行 commit 或 push。

- [x] 2026-08-13：簡化 Services Footer 導覽並補上公司資訊。
  - 範圍：`Pages/Shared/_Footer.cshtml`、`wwwroot/css/layout/site-footer.css`、`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`。
  - 內容：移除 Services Footer 桌機與手機導覽選單的外框及欄位分隔線，改以欄距維持閱讀層級；Logo 下方加入語意化公司名稱、地址、總機與信箱。公司資訊在共用 Footer 預設隱藏，僅由 `.services-page` 顯示，其他頁面視覺不受影響。
  - 已驗證：公司資訊與 `contact.html` 來源比對、頁面限定顯示規則、Footer 手機斷點／快取版本、`git diff --check`、`node --check wwwroot/js/site.js`、Release 建置；Browser 技能目前無可用瀏覽器，桌機／手機實際渲染尚待使用者檢視。
  - 未驗證：Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：Services 單頁試作、待確認；未自行 commit 或 push。

- [x] 2026-08-13：恢復 Services 原本的共用 Footer。
  - 範圍：`Pages/Shared/_Footer.cshtml`、`wwwroot/css/layout/site-footer.css`、`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`。
  - 內容：完整移除 Services 深色 Footer 試作、公司資訊結構及桌機／840px 手機覆寫，恢復既有共用 Footer 的淺灰主區、四欄導覽、手機收合與深色版權列；業務諮詢 CTA 與其他 Services 調整維持不變。
  - 已驗證：完整 Footer selector／Partial／響應式規則及快取版本檢查、`git diff --check`、`node --check wwwroot/js/site.js`、Release 建置；Browser 技能目前無可用瀏覽器，桌機／手機實際渲染尚待使用者檢視。
  - 未驗證：Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：將共用 Footer 主區背景改為 `#f0f0f0`。
  - 範圍：`wwwroot/css/layout/site-footer.css`、12 個靜態頁面 Footer CSS 快取版本、`TODO.md`。
  - 內容：主 Footer 背景由 `#f3f4f3` 改為指定的 `#f0f0f0`；深色版權列維持不變，所有靜態頁面同步更新 `site-footer.css` 快取版本，Razor Layout 維持 `asp-append-version`。
  - 已驗證：共用 Footer 色值／載入頁面盤點、快取版本檢查、`git diff --check`、Release 建置；瀏覽器實際畫面尚未驗證。
  - 未驗證：桌機／手機瀏覽器、Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：為 Services 業務諮詢圖片加入右側淡出效果。
  - 範圍：`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`。
  - 內容：將業務諮詢圖片原本的均勻色彩遮罩改為由左至右融入 CTA 背景色的漸層；保留圖片主體辨識度與既有斜切輪廓，不使用模糊效果。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`、Release 建置；瀏覽器實際畫面尚未驗證。
  - 未驗證：桌機／手機瀏覽器、Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：收斂 Services 頁面服務標題與頁籤的上方間距。
  - 範圍：`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`。
  - 內容：依既有頁面 spacing token 與企業服務頁資訊密度，將 Hero 到頁籤的上間距調整為 `40–64px`，服務區上下內距調整為 `56–88px`；手機既有 `64px` 內距維持不變，未使用負 margin。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`、Release 建置；瀏覽器實際畫面尚未驗證。
  - 未驗證：桌機／手機瀏覽器、Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：調整 Services 敘述與下方圖片的間距。
  - 範圍：`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`。
  - 內容：桌機服務標題／敘述區與下方圖片的共用列間距由 `20px` 調整為 `24px`；手機既有 `28–40px` 間距維持不變，讓段落與圖片有清楚的內容分組。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`、Release 建置；瀏覽器實際畫面尚未驗證。
  - 未驗證：桌機／手機瀏覽器、Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：移除 Services 服務內容圖片圓角。
  - 範圍：`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`。
  - 內容：移除服務內容圖片與輪播外框的 `border-radius`，改為直角圖片；業務諮詢 CTA 的斜切圖片效果維持不變。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`、Release 建置；瀏覽器實際畫面尚未驗證。
  - 未驗證：桌機／手機瀏覽器、Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。

- [x] 2026-08-13：統一 Services 敘述上下間距。
  - 範圍：`wwwroot/css/pages/services.css`、`wwwroot/services.html`、`TODO.md`。
  - 內容：標題／英文副標到敘述，以及敘述到下方圖片，改由同一個 `--services-content-gap` 控制；桌機固定為 `24px`，中小螢幕響應為 `28–40px`，修正上下留白不一致。
  - 已驗證：來源 selector／快取版本檢查、`git diff --check`、Release 建置；瀏覽器實際畫面尚未驗證。
  - 未驗證：桌機／手機瀏覽器、Firefox／Safari、實體裝置與人工無障礙驗收。
  - 狀態：待提交；未自行 commit 或 push。
