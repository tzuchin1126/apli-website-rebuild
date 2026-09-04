# APLI 專案進度

## 2026-09-04

### 已完成

- Services 頁面恢復至服務項目導覽連結修正時的原本排版，保留原有標題、實景圖片／輪播、主要服務項目與優勢區塊。
- Services「我們的優勢」改用既有副標題字級，優勢卡片標題改用 compact card title 字級，未修改全域 typography variables。
- Services 主要服務項目的箭頭 icon 改為參考 Affiliates 的 8px 品牌橘色小方形，並同步收窄 icon 欄位。
- Services 主要內容、優勢區、CTA 與 service-switcher 恢復原本寬度規則。
- Services 服務描述區移除下底線，保留原有內容間距與容器對齊。
- Services 移除「我們的優勢」副標題下方的品牌橘色底線，保留其他標題 accent 線。
- Header／Footer 的「關於亞太」導覽新增「未來展望」，並建立 `/future-outlook` 公開頁面與舊路徑導向。
- 未來展望頁面收斂為單一內容區塊，更新指定標題與內文；標題使用 `var(--font-heading)` 與全域字級變數。
- 未來展望頁面恢復原本 Hero 圖片與「未來展望」標題，內容區塊仍僅保留指定標題與內文。
- 未來展望 Hero 標題改由共用 `.page-hero__title` 完整控制，避免內容標題樣式覆蓋 Hero 的字體與顏色。
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
- 未來展望頁面瀏覽器檢查：`/future-outlook` 在 1366px 與 390px 正常回傳；Header 子選單、行動版展開選單與 Footer 均顯示「未來展望」，頁面無水平溢出。
- 未來展望內容瀏覽器檢查：1366px 與 390px 均只顯示指定標題與內文；標題實際使用 Noto Serif TC 與全域 `--font-size-h2`（桌機 40px、手機 26px），頁面無水平溢出。
- 未來展望 Hero 標題瀏覽器檢查：1366px 與 390px 均回到共用 `.page-hero__title` 的 Noto Sans TC、白色、全域 Hero 字級與行高，Hero 圖片正常顯示且頁面無水平溢出。
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
