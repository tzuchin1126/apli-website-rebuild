# 專案進度與待辦

## 已完成
### 2026-09-03 獎項年份與頒發單位元件化

- 將每張獎項卡片的年份與頒發單位包在 `affiliate-award-meta` 元件內，由單一 flex 結構控制同列對齊與間距；獎項名稱保留為獨立第二排。
- 實際驗證：`dotnet build -c Release --no-restore`、`git diff --check`；Edge Desktop `1366×900` 確認三張獎項卡片皆有 `affiliate-award-meta` 且包含年份與頒發單位兩個子元素，兩者同列、獎項名稱位於下一排。
- 未建立 commit。

### 2026-09-03 移除服務品質肯定區塊背景與邊線

- 移除三個獎項卡片、圖片區與文字區的背景色及邊線，保留上方獎牌圖片、下方獎項敘述、原有尺寸與文字樣式。
- 實際驗證：`dotnet build -c Release --no-restore`、`git diff --check`；Edge Desktop `1366×900` 確認三張獎項卡片、圖片區與文字區背景皆為透明且邊線為 `0px`；Mobile `390×844` 確認單欄與無水平溢出。
- 未建立 commit。

### 2026-09-03 世新貨櫃獎項年份與頒發單位文字統一

- 將 2005 FLORENS、2006 TEXTAINER、2008 TEXTAINER 的年份與頒發單位統一為品牌橘色與相同字級，保留獎項名稱原有層級。
- 實際驗證：`dotnet build -c Release --no-restore`、`git diff --check`；Edge Desktop `1366×900` 確認 2005 FLORENS、2006 TEXTAINER、2008 TEXTAINER 的年份與頒發單位皆為品牌橘色、`18px`，三組樣式一致。
- 未建立 commit。

### 2026-09-03 恢復世新貨櫃上一版內容結構

- 撤回本次新增的月桂徽章與服務圖片移位，恢復企業介紹右側輪播、服務項目獨立列表及下方服務品質肯定獎牌卡片。
- 保留進度線輪播動畫、右至左圖片轉場、獎牌卡片灰階配色與兩排獎項文字；未修改左側 Navigation、Header、Hero、Footer 或其他企業內容。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`；Edge Desktop `1366×900` 與 Mobile `390×844` 確認企業介紹右側輪播、服務獨立列表、下方三張獎牌卡片已恢復，月桂徽章與服務圖片移位已移除，獎牌圖片未溢出且手機無水平溢出。
- 未建立 commit。

### 2026-09-03 世新貨櫃企業殊榮月桂徽章與服務圖文重排

- 將三項既有獎項文字移至企業介紹文字下方，以原生細線月桂 SVG 徽章呈現；年份、頒發單位與獎項名稱均保留，未使用實心背景、陰影或金色獎牌。
- 移除下方原大型獎牌卡片區，將既有四張企業作業圖片輪播移至服務項目右側，Desktop／Laptop 左文右圖，Tablet／Mobile 單欄。
- 未修改左側關係企業導覽、Header、Hero、Footer 或其他企業內容。
- 實際驗證：待執行。
- 未建立 commit。

### 2026-09-03 世新貨櫃獎項資訊改為兩排

- 獎項卡片改為第一排顯示「年份＋頒發單位」，第二排顯示獎項名稱；包含 2008 TEXTAINER／台灣區最佳櫃場，保留原有文字內容。
- 實際驗證：`dotnet build -c Release --no-restore`、`git diff --check`；Edge Desktop `1366×900` 確認三張獎項卡片的年份與頒發單位同列、獎項名稱位於第二排。
- 未建立 commit。

### 2026-09-03 世新貨櫃獎項卡片灰階配色

- 獎牌圖片區改用淺灰 `#f3f3f3`，下方獎項敘述區改用較深灰 `#e5e5e5`，保留品牌橘色年份與既有卡片結構。
- 實際驗證：`dotnet build -c Release --no-restore`、`git diff --check`；Edge Desktop `1366×900` 與 Mobile `390×844` 確認圖片區為 `#f3f3f3`、敘述區為 `#e5e5e5`、獎項卡片高度一致、手機單欄且無水平溢出。
- 未建立 commit。

### 2026-09-03 世新貨櫃間距、服務標記與獎項卡片修正

- 世新貨櫃內容區專用 section gap 調整為桌機 `clamp(40px, 4vw, 56px)`、小螢幕 `40px`，收斂企業介紹、服務項目與服務品質肯定的上下留白。
- 服務項目 bullet 改為參考職業安全衛生頁面的品牌橘色小方框。
- 服務品質肯定改為參考關於亞太經營理念的「上方圖片、下方敘述」卡片結構，圖片區比例與高度統一，避免獎牌圖片溢出；未修改既有獎項內容。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`；Edge Desktop `1366×900` 與 Mobile `390×844`，確認世新區 section gap 分別為約 `54.64px`／`40px`、服務 bullet 為 `8px` 橘色方框、獎項三欄／單欄卡片高度一致且獎牌圖片未溢出圖片區、手機無水平溢出。
- 未建立 commit。

### 2026-09-03 世新貨櫃輪播滑動轉場與進度線置中

- 進度線縮短為最大 `128px` 並置中於圖片下方；保留四段可點擊進度線與 Active 填滿動畫。
- 圖片切換改為下一張由右側滑入、目前圖片向左側滑出，並在轉場完成後清理離場狀態，避免瞬間替換；未修改左側 Vertical Navigation、Header、Hero、Footer 或其他企業內容。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`；Edge Desktop `1366×900` 確認進度線寬度 `128px` 且置中、轉場中下一張由右至左進場、轉場完成後離場狀態清除、點擊第 2 張成功；Mobile `390×844` 確認置中與無水平溢出。
- 未建立 commit。

### 2026-09-03 世新貨櫃進度線動畫與寬度調整

- 進度線改為 Active 線段由左至右填滿品牌橘色，填滿後以 `animationend` 切換下一張圖片；滑入／聚焦時保留暫停，reduced-motion 時停用自動切換並顯示完整 Active 線段。
- 進度線群組限制最大寬度為 `320px`，保留四張既有圖片、點擊切換功能與其他企業內容；未修改左側 Vertical Navigation、Header、Hero、Footer。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`；Edge Desktop `1366×900` 確認動畫中填色、約 5 秒後自動切換、點擊第 4 段切換成功且無上一張／下一張按鈕；Mobile `390×844` 確認進度線寬度 `320px`、四段線與無水平溢出。
- 未建立 commit。

### 2026-09-03 世新貨櫃輪播進度線調整

- 移除輪播「上一張／下一張」文字按鈕與圓點指示，改為圖片下方四段式進度線；目前圖片使用品牌橘色，其餘可切換圖片使用細灰線，進度線仍可點擊切換。
- 保留四張既有企業作業圖片、自動輪播、滑入／聚焦暫停與 reduced-motion 行為；未修改左側 Vertical Navigation、Header、Hero、Footer 或其他企業內容。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`；Edge Desktop `1366×900` 與 Mobile `390×844`，確認已移除上一張／下一張按鈕與圓點、改為四段式進度線、可點擊切換圖片、目前線段為品牌橘色、手機無水平溢出。
- 未建立 commit。

### 2026-09-03 世新貨櫃企業圖片輪播與獎項卡片調整

- 企業介紹區塊維持無上邊線，右側改為使用既有 `container-cleaning.jpg`、`container-handler-operation.png`、`equipment-maintenance.png`、`port-equipment-maintenance.jpg` 的四張圖片輪播。
- 移除世新「服務項目」與「服務品質肯定」英文標語；獎項改為統一圖片區高度、上方圖片下方文字的細框卡片樣式，保留年份、頒發單位與獎項名稱。
- 未修改左側 Vertical Navigation、Header、Hero、Footer、Services／Service Recognition 內容順序或其他企業 Tab。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`；Edge 瀏覽器 Desktop `1366×900` 與 Mobile `390×844`，確認四張企業圖片輪播、輪播下一張控制、企業介紹無上邊線、Services／Service Recognition 英文標語已移除、獎項圖片 wrapper 高度一致與手機無水平溢出。
- 未建立 commit。

### 2026-09-03 移除世新貨櫃 Company Header

- 移除右側「專業服務・贏得殊榮」與「世新貨櫃企業股份有限公司」Company Header，不保留原 Header 的空白高度或分隔線。
- 「企業介紹」直接成為世新貨櫃右側第一個正式 Section Heading，維持企業介紹文字＋圖片、服務項目、服務品質肯定的既有順序與版型。
- 內容區上方 spacing 收斂為桌機／筆電 `clamp(40px, 4vw, 56px)`、手機 32px；未修改左側 Vertical Navigation、Header、Hero、Footer 或其他企業內容。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`；Edge 瀏覽器 1366×900 與 390×844，確認 Company Header 已移除、第一個 Section 為「企業介紹」、無上方 border／padding、Hero 後留白已收斂且手機無水平溢出。
- 未建立 commit。

### 2026-09-03 世新貨櫃 Company Header 層級調整

- 移除 Company Header 的 `SPECIALIZED CONTAINER SERVICES`，將現有「專業服務・贏得殊榮」移至公司名稱上方並改為較小的品牌橘色 Eyebrow。
- 公司名稱維持為主要 Content Heading，兩者間距調整為 8px；下方企業介紹＋圖片、服務項目、服務品質肯定順序不變。
- 未修改左側 Vertical Navigation、Header、Hero、Footer 或其他關係企業內容。
- 實際驗證：待執行。
- 未建立 commit。

### 2026-09-03 世新貨櫃右側內容順序與圖文版型調整

- 僅調整右側 `#affiliate-sexin` 內容：固定為「公司名稱＋小標語 → 企業介紹文字＋圖片 → 服務項目 → 服務品質肯定」。
- 企業介紹改為 Desktop／Laptop 左文右圖，圖片使用現有 `equipment-maintenance.png` 並改為橫向 `3:2`；Tablet／Mobile 改為文字後接圖片的單欄順序。
- 服務項目移除下方大型圖片，保留既有四項服務並改為無卡片的雙欄／單欄清單；三個獎項保留三欄並統一圖片 wrapper 高度。
- 未修改左側 Vertical Navigation、Header、Hero、Footer、其他企業 Tab 或既有內容資料。
- 實際驗證：依需求未執行任何驗證。
- 未建立 commit。

### 2026-09-03 關係企業 Editorial Content Area 重構

- Desktop／Laptop 改為左側企業 Vertical Navigation Rail、右側 Editorial Content；rail 使用連續 `#e5e5e5` 2px 線，Active 區段使用品牌橘色，未新增右側分隔線、卡片背景或圓形 Icon。
- Tablet／Mobile 改為頂部可水平滑動且不換行的 Tabs，內容改為單欄；世新服務圖片改為文字後的大型 16:7.5 Editorial Image，Recognition 改為三欄並拆出年份、頒發單位與獎項名稱。
- 其他企業依既有資料保留各自圖片數量與內容結構，維持 Editorial section 層級與細分隔線；未新增 placeholder，也未刪除既有企業文字、圖片、據點、連結或篩選功能。
- 目前來源已有「太報」內容但沒有「大都」資料，因此保留「太報」既有 Tab 與 panel，未建立無內容的「大都」入口。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check`；Edge 瀏覽器 1366×900、1024×768、768×1024、390×844，確認 rail／Tabs breakpoint、服務圖片比例、無水平溢出、六個既有企業切換、油品南部據點篩選與鍵盤方向鍵。
- 未驗證項目：實體裝置、其他瀏覽器、人工無障礙驗收；未建立 commit。

### 2026-09-03 移除關係企業英文小標題

- 移除關係企業頁面所有英文 Eyebrow 小標題及其專屬 CSS，保留既有中文標題、內容、圖片與 Editorial 版型。
- 依需求未執行建置、語法、差異或瀏覽器驗證。
- 未建立 commit。

### 2026-09-03 世新貨櫃三區塊版型

- 世新貨櫃內容拆分為三個獨立區塊，保留原本「世新貨櫃企業股份有限公司」標題文字：標題與公司介紹、左側服務項目搭配右側圖片、服務品質肯定獎項區。
- 第一個介紹區塊僅保留標題與內容；服務區使用既有 `equipment-maintenance.png`，獎項保留現有圖片；其他企業、切換選單及 Header、Hero、Footer 不變。
- 世新介紹區塊標題置中，內文維持內容區左側起始對齊。
- 介紹區塊恢復完整內容寬度，服務區調整為 5:5 左右欄，避免圖片過度靠右造成大面積空白。
- 依參考版面將世新三區塊內容寬度收斂為 1234px，讓服務圖片縮小並減少左右留白。
- 依網站既有極簡企業風格重新整理世新視覺節奏：介紹標題置中、內文完整左對齊，服務照片限制最大寬度，品質區以細線與獎項網格收尾；所有樣式限定於世新區塊。
- 重新建立世新專用內容結構與 CSS class，不沿用原本世新版面配置；其他企業切換後的內容樣式維持原狀。
- 世新主標題改為左側排列並加入右側延伸線，上方新增「專業服務 贏得殊榮」小標語；移除介紹內容區底部分隔線。
- 世新標題右側延伸線移除品牌橘色，改為淺灰色。
- 世新介紹與服務區的上下間距調整為較緊湊的響應式留白，並移除服務項目區塊下方的分隔線。
- 實際驗證：`git diff --check`、`node --check wwwroot/js/pages/affiliates.js`。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收（依需求不做實機驗證）。
- Commit：未建立。

### 2026-09-03 Affiliates Active Tab 背景樣式恢復

- 撤回 Active 企業切換項目的淡橘色背景、細框與圓點，恢復原本水平 Tabs 外觀。
- 保留 Affiliates 原始切換選單、世新貨櫃長圖版面與上方間距調整。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 Affiliates Active Tab 淡橘色標題背景

- Active 企業切換項目加入淡橘色橫向背景、細灰框與品牌橘色圓點，呈現參考圖的標題選取狀態。
- 保留原本水平 Tabs、未選取項目與切換互動不變。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 Affiliates 企業標題字級縮小

- 將 Affiliates 各企業切換內容中的 `.affiliate-panel h2` 統一改用 `var(--font-size-h3)`，降低公司名稱標題過大的問題。
- 僅調整 Affiliates 企業內容標題，不修改 Hero、全站標題、企業內容或其他頁面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃小標題與介紹文字恢復正常呈現

- 在世新貨櫃公司標題上方加入「品質卓越 業績殊榮」小標題。
- 將公司介紹合併為單一連續段落，移除兩段文字之間造成的額外間距；保留原有文字內容與版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 Affiliates 切換選單上方間距調整

- Affiliates 頁面內容起始距離由全域最大 112px 調整為 64px，讓 `affiliate-tabs` 更靠近 Hero 下方。
- 僅調整 Affiliates 頁面專屬內容上方間距，未修改其他頁面、切換功能或企業內容。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 Affiliates 頁面恢復原始版型

- 恢復 Affiliates 原本的水平企業切換選單、原始 Tabs 互動與方向鍵行為。
- 恢復原有企業內容版型與世新貨櫃右側長型 `世新.jpg` 圖片，移除本次新增的垂直導覽、5:5 配置與設備維修圖片。
- 僅還原 Affiliates 相關 HTML、CSS、JS，其他頁面與工作區既有變更保留。
- 實際驗證：`node --check wwwroot/js/pages/affiliates.js`、`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃版面恢復原始長圖配置

- 世新貨櫃恢復原本左側企業內容、右側長型 `世新.jpg` 圖片的版面結構。
- 還原原有兩段公司介紹、服務項目與服務品質肯定的內容階層，移除本次嘗試的 5:5 圖文與設備維修圖片配置。
- 未修改企業導覽、其他企業內容、Header、Hero、Footer 與共用版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃服務圖片同列對齊

- 移除服務項目原本多出的上方 40px 外距與 20px 內距，讓左側服務項目標題與右側圖片在同一列、同一起始高度呈現。
- 服務品質肯定接續於圖片列下方，保留 32px 區塊間距與既有獎項內容。
- 僅調整世新貨櫃專屬 CSS，未修改其他企業內容與版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃上方介紹與下方服務圖文版型

- 世新貨櫃上方整列顯示小標題、公司名稱與完整介紹文字；下方改為 5:5 圖文配置，左側服務項目、右側設備維修圖片。
- 服務品質肯定接續在最下方；手機版改為介紹、服務項目、圖片、服務品質肯定的單欄順序。
- 保留既有文字與 `equipment-maintenance.png` 圖片資產，未修改其他企業版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃 5:5 圖文版型

- 將世新貨櫃第一列改為左右等寬的 5:5 Grid，左側放公司小標題、名稱與介紹，右側圖片填滿右半欄並維持自然比例。
- 保留服務項目與服務品質肯定的後續列排列，以及手機版單欄順序；未修改其他企業版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃小標題與介紹文字調整

- 在公司標題上方加入「品質卓越 業績殊榮」小標題。
- 將世新貨櫃既有兩段介紹合併為指定的單一段落，保留原有文字內容，不調整字級、行高或區塊間距。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃圖文同列對齊

- 修正世新貨櫃第一列 Grid 結構，改為左側完整公司標題與介紹、右側圖片同列並頂端對齊，避免拆列後由圖片高度造成左側下方大面積空白。
- 右側圖片改為自然比例並限制最大寬度 280px；服務項目與服務品質肯定依序接續在下一列，手機版維持單欄順序。
- 僅調整世新貨櫃專屬 CSS，未修改文字、圖片資產或其他企業版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃圖文對齊與 Grid 間距調整

- 將公司標題、公司介紹與右側圖片改為明確的 Grid 列定位，讓圖片頂端對齊公司介紹文字區，而非只依賴外層內容區起點。
- 固定服務項目與服務品質肯定為後續獨立列，並將桌機列間距調整為 40px；手機版恢復單欄自然順序與 32px 間距。
- 僅調整世新貨櫃專屬 CSS，未修改 HTML 內容、圖片或其他企業版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃標題字級與間距重新排版

- 將「世新貨櫃企業股份有限公司」字級改為與「服務項目」標題相同的 `var(--font-size-h3)`。
- 調整世新貨櫃內容區第一列與服務項目、服務品質肯定之間的列間距，並收斂兩個下方區塊的上方內距，避免垂直留白過大。
- 僅調整世新貨櫃專屬字級與間距，未修改文字、圖片或其他企業版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃公司名稱字級調整

- 將「世新貨櫃企業股份有限公司」H2 字級改為與服務項目文字相同的 `var(--font-size-body-lg)`。
- 僅調整世新貨櫃公司名稱字級，保留字重、內容與其他企業版面不變。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃右側圖片替換

- 將世新貨櫃內容區第一列右側圖片替換為既有 `public/images/services/equipment-maintenance.png`，同步更新替代文字。
- 保留既有排版、公司文字、服務項目、獎項圖片與其他企業版面不變。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 世新貨櫃內容區重新排版

- 世新貨櫃第一列改為左側公司敘述、右側既有企業圖片；服務項目獨立移至下一列，服務品質肯定移至再下一列。
- 移除原本將長型圖片延伸為右側整組區塊的舊版排列，保留現有文字、獎項圖片與企業圖片資產，不修改其他企業內容。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 Affiliates Navigation Rail 視覺微調

- Desktop／Laptop 左側企業導覽改為單一連續 Navigation Rail：移除企業項目水平分隔線與左側區域右邊的垂直分隔線，保留 `#e5e5e5` 淺灰 rail，Active 區段改為 2px 品牌橘色。
- 左側導覽寬度縮減至 180px–210px，企業名稱與 rail 保留 18px 內距，左右內容 gap 調整為 48px–64px；未修改右側企業內容、圖片或其他版面。
- 實際驗證：`git diff --check` 已通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 Affiliates 企業索引式分頁版型

- 將企業切換區改為 Desktop／Laptop 左側垂直企業索引、右側內容面板，左右以 `#e5e5e5` 淺灰色垂直分隔線區隔；左側不使用背景卡片、圓形 Icon 或 Dashboard Sidebar 風格。
- Tablet／Mobile 維持水平可滑動 Tabs、單欄企業內容與不換行企業名稱；圖片 Gallery 改用 `auto-fit` 自適應欄數，不依企業資料數量建立空白欄位。
- 保留現有企業文字、圖片、Header、Breadcrumb、Hero、Footer 與全域 Typography variables；同步補上垂直／水平 Tabs 的 ARIA 方向與方向鍵操作。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check` 已通過。
- 未驗證項目：實體裝置、瀏覽器畫面、其他瀏覽器與人工無障礙驗收。
- Commit：未建立。

### 2026-09-03 Careers 福利表格與職缺資訊間距調整

- 增加職缺資訊區塊與上方福利表格之間的專屬留白，避免表格結束後標題過於接近。
- 保留其他區塊間距不變；實際間距約為桌機 64px、筆電 51px、行動版 40px。
- 實際驗證：Edge 1366×900、1024×768、390×844；確認福利表格底部至職缺標題的實際間距分別為 64px、51.19px、40px，且三種版型皆無水平溢出；`git diff --check` 通過。
- 未驗證項目：實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 Careers 職缺背景圖移除並恢復原樣

- 移除職缺資訊區塊的 `join/1.jpg` 背景圖與 full-bleed 設定。
- 恢復原本 `recruitment-links` 寬度、雙欄／單欄排列，以及求職平台卡片白色背景。
- 實際驗證：已檢查職缺區塊 HTML 結構與 CSS 差異；`git diff --check` 通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 Careers 職缺背景圖滿版與透明 Logo 卡片

- 職缺背景圖改為 full-bleed，從內容容器延伸至視窗左右邊線並以 `cover` 填滿。
- 求職平台連結卡片移除白色背景，logo 直接呈現在背景圖片上；標題區塊仍維持白底。
- 實際驗證：Edge 1366×900、1024×768、390×844；確認背景圖左右延伸至視窗邊線、使用 `cover` 填滿、連結卡片背景透明、標題背景為 `none`，且桌機／筆電雙欄、行動版單欄無水平溢出；`git diff --check` 通過。
- 未驗證項目：實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 Careers 職缺資訊背景圖

- 職缺資訊區塊下方連結內容加入 `public/images/join/1.jpg` 背景圖，標題區塊維持白底不套用背景圖。
- 新增 `recruitment-links__grid` 保留兩個求職平台卡片的寬度與排列，桌機雙欄、行動版單欄。
- 實際驗證：Edge 1366×900、1024×768、390×844；確認標題區域未套用背景圖、職缺內容區成功載入 `join/1.jpg`，桌機／筆電雙欄、行動版單欄且無水平溢出；`git diff --check` 通過。
- 未驗證項目：實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 Careers 區塊順序恢復

- 恢復 Careers 內容區塊順序為「加入亞太 → 公司福利 → 職缺資訊」。
- 保留前一輪 Careers 文字色彩、全域字級與區塊間距調整。
- 實際驗證：已檢查 `careers.html` 內容順序；`git diff --check` 通過。
- 未驗證項目：瀏覽器畫面、實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 Careers 公司福利與職缺資訊順序調整

- Careers 內容區塊順序調整為「加入亞太 → 職缺資訊 → 公司福利」。
- 保留兩個區塊原有內容、樣式與響應式設定。
- 實際驗證：Edge 1366×900 與 390×844；確認 DOM 順序為「加入亞太 → 職缺資訊 → 公司福利」，且兩種版型皆無水平溢出；`git diff --check` 通過。
- 未驗證項目：實體裝置、1024×768 筆電、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 Careers 字級、文字色彩與區塊間距檢查

- Careers 頁範圍內將次要文字色彩由 `rgb(0 0 0 / 60%)` 統一為 `#5c5c5c`，同步修正麵包屑與福利表格實際文字顏色，不影響其他頁面。
- Careers 主要標題、正文、表格與招募連結均使用全域字級 token；共用麵包屑字級改用 `var(--font-size-body-sm)`。
- 福利表格正文行高改用全域 `var(--line-height-body)`；區塊間距確認沿用 `--section-space`、`--page-content-start-space` 與既有響應式細部間距。
- 實際驗證：Edge 1366×900、1024×768、390×844；確認無水平溢出、字級與主要區塊間距的計算結果；`node --check wwwroot/js/site.js`、`git diff --check` 通過。
- 未驗證項目：實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 News Filter 改為服務切換器風格

- 移除 News Card Hover 右上角 icon，保留圖片放大、遮罩與標題下底線效果。
- News Filter 改為獨立的 `.news-filter__inner`、`.news-filter__list` 結構，呈現與服務頁切換器相同的橫向分頁列、底線與目前項目狀態。
- 未共用 `service-switcher` class，並同步調整觸控裝置的 News Filter 狀態樣式。
- 實際驗證：未執行實機／瀏覽器畫面驗證（依需求不執行）；`node --check wwwroot/js/pages/news.js`、`node --check wwwroot/js/site.js` 與 `git diff --check` 通過。
- 未驗證項目：實體裝置、瀏覽器畫面、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 News Card Hover 視覺效果同步首頁

- News Card Hover 比照首頁最新消息區塊，加入圖片放大、黑色圖片遮罩、右上角導覽 icon 與新聞標題文字下底線。
- 保留 News Card「閱讀更多」既有 Hover 間距與橘色文字效果不變。
- 實際驗證：未執行實機／瀏覽器畫面驗證（依需求不執行）；`git diff --check` 與 `node --check wwwroot/js/pages/news.js` 通過。
- 未驗證項目：實體裝置、瀏覽器畫面、其他瀏覽器與人工無障礙驗收。
- Commit：待提交。

### 2026-09-03 News 目前頁碼改用文字下底線

- 目前頁碼移除元件 `border-bottom`，改用文字 `text-decoration` 下底線。
- 保留數字頁碼無方框、箭頭控制項有方框的分頁 UI。
- 實際驗證：Edge 瀏覽器 1366x900 與 390x844；目前頁碼使用文字下底線且元件底框透明，箭頭控制項保留方框，手機版未溢出；`git diff --check` 通過。
- 未驗證項目：實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 News 分頁按鈕狀態微調

- 數字頁碼移除可見方框，保留目前頁面的橘色底線提示。
- 數字頁碼 Hover 不改變文字顏色。
- 上一頁／下一頁預設保留方框，Hover 不更換背景色。
- 實際驗證：Edge 瀏覽器 1366x900 與 390x844；數字頁碼無可見方框、目前頁面保留橘色底線、箭頭按鈕保留方框且手機版未溢出；`node --check wwwroot/js/pages/news.js` 成功；`git diff --check` 通過。
- 未驗證項目：實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 News 分頁 UI 調整

- 分頁控制項改用符合網站按鈕語言的圓角方形樣式。
- 目前頁面使用 APLI 橘色高亮，上一頁／下一頁、Hover、Focus 與 Disabled 狀態清楚區分。
- 手機版縮小控制項並允許換行，避免多頁碼超出內容寬度。
- 實際驗證：Edge 瀏覽器 1366x900 與 390x844；分頁控制項排列、目前頁面高亮、Disabled 狀態與手機版寬度均正常；`node --check wwwroot/js/pages/news.js` 成功；`git diff --check` 通過。
- 未驗證項目：實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 News 列表高度恢復自然縮放

- 移除完整一頁 9 筆的列表最小高度保留邏輯，列表依目前頁面實際筆數自然縮放。
- 保留切換分頁後捲回 News 內容區頂端的功能。
- 實際驗證：`node --check wwwroot/js/pages/news.js` 成功；`git diff --check` 通過。
- 未驗證項目：實機與瀏覽器畫面；依需求不執行。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 News 分頁捲動與列表高度穩定

- 切換 News 分頁後平滑捲回 News 內容區頂端，支援減少動態效果偏好。
- 列表區依完整一頁 9 筆的實際版面高度保留最小高度，避免較少資料的分頁讓 Footer 上移。
- 分類篩選與視窗尺寸變更時同步重新計算列表高度。
- 實際驗證：`node --check wwwroot/js/pages/news.js` 成功；`git diff --check` 通過。
- 未驗證項目：實機與瀏覽器畫面；依需求不執行。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 News 圖片恢復原始比例

- News Card 圖片容器與手機縮圖恢復為 `16:9`。
- 預設公告圖片恢復使用原本的 `news.png`。
- 保留既有新聞標題、摘要層級與三欄版型設定。
- 實際驗證：`node --check wwwroot/js/pages/news.js` 成功；`git diff --check` 通過。
- 未驗證項目：實機與瀏覽器畫面；依需求不執行。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 News 預設公告橫幅圖

- 新增 `wwwroot/public/images/index/news-default-banner.png`，尺寸為 1983x793（約 2.5:1）。
- 預設公告圖改用專用橫幅資產，完整保留「公告資訊／ANNOUNCEMENT」、橘色波浪與 AP Logo。
- 實際新聞照片仍沿用原本的 `object-fit: cover`；未改動 News Card 容器高度與三欄版型。
- 實際驗證：圖片內容與尺寸已檢查（1983x793，約 2.5:1）；`node --check wwwroot/js/pages/news.js` 成功；`git diff --check` 通過。
- 未驗證項目：實機與瀏覽器畫面；依需求不執行。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 News 卡片視覺層級與間距調整

- 新聞圖片比例由 16:9 調整為 2.5:1，維持原有三欄與圖片寬度。
- 日期、標題、摘要與閱讀更多重新設定字級、色彩與字重，並調整卡片內元素間距。
- News Grid 桌機 row gap 固定為 64px。
- 實際驗證：Edge 瀏覽器 1366x900 與 390x844；桌機維持三欄、圖片為 5:2、Grid row gap 為 64px；手機圖片為 5:2 且無版面溢出；`node --check wwwroot/js/pages/news.js` 成功；`git diff --check` 通過。
- 未驗證項目：實體裝置、其他瀏覽器與人工無障礙驗收。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 News 頁面分頁數量調整

- news 頁面每頁顯示數量由 15 筆調整為 9 筆，保留既有前端數字分頁功能。
- 實際驗證：`node --check wwwroot/js/pages/news.js` 成功；`git diff --check` 通過。
- 未驗證項目：瀏覽器操作與桌機／手機 RWD。
- Commit：本地 HEAD commit（本次變更）。

### 2026-09-03 Admin 驗證碼限流修正

- 驗證碼 API 改用獨立的 `admin-captcha` 限流政策，每個 IP 每分鐘最多 30 次。
- 登入 API 維持 `admin-login` 限流，每個 IP 每分鐘最多 5 次。
- 目的：避免錯誤登入後自動重新載入驗證碼時，因登入限流而顯示破圖。
- 實際驗證：`dotnet build -c Release` 成功（0 warnings、0 errors）；`git diff --check` 成功。
- 未驗證項目：實際瀏覽器登入流程與桌機／手機 RWD；本次僅調整後端限流設定。
- Commit：`c23ec60`。

### 2026-09-03 Contact Hero 與全域文字樣式

- Contact 頁面恢復共用 Hero 結構與 `contact-us.jpg` 主視覺，標題改由全域 `--font-size-h1`、`--color-text-on-dark`、字體與行高控制。
- Contact 麵包屑、資訊標籤、資訊內文維持使用全域字級與色彩變數，並補回內容區全域起始間距。
- 實際驗證：Edge 1366x900、1024x768、390x844；Hero 標題分別為 47.81px、35.84px、32px，顏色為 `rgb(255, 255, 255)`；資訊標籤為 14px、`rgb(92, 92, 92)`；`dotnet build -c Release` 成功（0 warnings、0 errors）；`git diff --check` 成功。
- 未驗證項目：實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：未建立（依目前工作指示不自行 commit）。

### 2026-09-03 Contact Hero 桌機圖片位置

- 桌機與筆電 Hero 圖片垂直焦點由置中調整至 `center 30%`，圖片再向上呈現；行動版維持原本垂直置中。
- 實際驗證：Edge 1366x900、1024x768 的圖片 `object-position` 為 `50% 30%`；390x844 行動版維持 `50% 50%`；`dotnet build -c Release` 成功（0 warnings、0 errors）；`git diff --check` 成功。
- 未驗證項目：實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：未建立（依目前工作指示不自行 commit）。

### 2026-09-03 全站麵包屑文字顏色

- 共用麵包屑的目前文字與首頁連結預設顏色統一為 `#5c5c5c`，Hover／Focus 狀態仍保留網站橘色互動色。
- 實際驗證：未執行瀏覽器、實機或跨頁面視覺驗證；已完成 `git diff --check`。
- 未驗證項目：瀏覽器、實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：未建立（依目前工作指示不自行 commit）。

### 2026-09-03 Affiliates 全域文字字級與字重

- Affiliates 頁面專屬文字中的硬編字級改為全域 tokens：聯絡資訊小標題使用 `--font-size-h3`，標語使用 `--font-size-body`，引用區與據點按鈕同步使用全域行高與字重變數。
- 共用麵包屑字級由固定值改為 `--font-size-body-sm`，並沿用全站 `#5c5c5c` 文字色。
- 實際驗證：未執行瀏覽器、實機或跨頁面視覺驗證；已完成 `git diff --check`。
- 未驗證項目：瀏覽器、實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：未建立（依目前工作指示不自行 commit）。

### 2026-09-03 Affiliates 次要文字色彩來源

- Affiliates 頁面原先使用 `var(--color-muted)`，其全域別名會連到舊次要文字色彩；已改為直接使用 `var(--color-text-body)`，避免沿用 60% 透明黑色。
- 實際驗證：未執行瀏覽器、實機或跨頁面視覺驗證；已完成 `git diff --check`。
- 未驗證項目：瀏覽器、實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：未建立（依目前工作指示不自行 commit）。

### 2026-09-03 全站移除次要文字色彩別名

- 全站原先引用舊次要文字色彩的 About、News 與 Footer 樣式已改用 `var(--color-text-body)`。
- `--color-muted` 相容別名同步改為指向 `var(--color-text-body)`，Careers 頁面不再保留局部舊次要文字色彩宣告。
- 確認全站引用完成後，已刪除舊次要文字色彩 token。
- 實際驗證：未執行瀏覽器、實機或跨頁面視覺驗證；已完成 `git diff --check`。
- 未驗證項目：瀏覽器、實體裝置、跨瀏覽器與無障礙人工驗收。
- Commit：未建立（依目前工作指示不自行 commit）。

### 2026-09-03 About 認證與獎項載入動畫範圍

- 認證與獎項原先將左右晃動動畫套用在整個區塊，造成標題、年代導覽與控制項同步位移；已改為只動畫 `.about-certifications-preview__content-shell`，標題區保持固定。
- `prefers-reduced-motion` 規則同步改為針對內容容器，保留無動畫時的完整顯示。
- 實際驗證：Edge 1366x900、390x844 載入並捲動至認證區塊後，標題區 `transform: none`，僅內容容器套用 `about-certifications-sway-in`；`git diff --check` 成功。
- 未驗證項目：桌機、筆電、行動版瀏覽器與無障礙人工驗收。
- Commit：未建立（依目前工作指示不自行 commit）。

## 待辦

- 依各次變更補充實際驗證結果與 commit 紀錄。
### 2026-09-03 獎項卡片圖片與文字欄位對齊

- 調整關係企業頁面的三張獎項卡片，讓圖片區與下方年份／頒發單位／獎項名稱共用同一個垂直欄位與左右邊界，維持圖片在上、文字在下且不恢復背景或邊線。
- 實際驗證：`dotnet build -c Release --no-restore`、`node --check wwwroot/js/pages/affiliates.js`、`git diff --check` 均通過；Edge Desktop `1366×900` 與 Mobile `390×844` 確認三張卡片的圖片區與文字區左右邊界一致、圖片在上文字在下、手機單欄且無水平溢出。
- 調整關係企業服務品質肯定區塊的 Mobile RWD：獎項改為左圖右文的 compact horizontal list，並將 Mobile Tabs 固定為單列水平滑動；Desktop `>=768px` 維持原三欄排列。
- 亞柏油品依序整理為「品牌理念 → 企業介紹＋圖片輪播 → 服務據點」，保留既有文字、三張油品圖片與全部服務據點資料。
- 亞柏油品輪播新增 `加油站-2.png`、`加油站-3.png`，輪播與進度線同步更新為 5 張。
- 優化亞柏油品企業介紹敘述間距、五張輪播進度線單列顯示，並為企業理念加入引號與淡色背景。
- 亞柏油品企業介紹間距與世新貨櫃一致；企業理念移除左橘線、改為底部橘線，並改用左右雙引號裝飾。
- 放寬亞柏油品企業理念文字 span 的最大寬度，讓桌機版使用完整內容寬度並保留手機自然換行。
- 縮小亞柏油品企業理念區塊的水平內距，讓放寬後的文字寬度在桌機版更充分使用。
- 企業理念文字取消突然短尾換行，改用平衡換行讓桌機版在可用寬度足夠時單行呈現，手機版維持自然折行。
- 企業理念僅保留左側開頭雙引號，移除右側結尾雙引號。
- 企業理念文字移除平衡換行，恢復依容器實際寬度自然排版。
- 亞柏油品服務據點改為 `tw.svg` 台灣地圖搭配可點擊站點標記，點擊後顯示電話與地址，保留地區篩選。
### 2026-09-03 亞柏油品服務據點互動調整
- 移除區域篩選列，預設顯示第一筆站點資訊，新增地圖點擊提示並校正各站點標記位置；完成桌機與手機互動確認。
### 2026-09-03 亞柏油品服務據點地圖視覺調整
- 將站點提示移至服務據點標題下方，並將 `tw.svg` 改為灰底搭配據點縣市綠色標示；完成桌機與手機版檢查。
### 2026-09-03 亞柏油品服務據點站點標籤
- 據點區域改為品牌橘色，地圖標記加入站點名稱與引導線；站點名稱與圓點可點擊切換右側地址、電話，手機版隱藏標籤避免水平溢出。
