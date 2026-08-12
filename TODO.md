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
  - 更新：2026-08-11。後續頁面調整已併入 `e05a0d4`。

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

- [x] 2026-08-12：人才招募頁面完成。
  - 範圍：`wwwroot/join.html`、`wwwroot/css/pages/join.css`、`wwwroot/css/base/tokens.css`、`wwwroot/css/site.css`、`TODO.md`。
  - 內容：統一招募內容標題與英文標題樣式；移除職缺卡片邊框／陰影；加入 Logo hover 放大與 Phosphor `ph-link`；加入亞太圖片改為 16:9、填滿欄寬且無圓角；建立 1200px 內容最大寬度與響應式左右留白規則，Header 維持寬版導覽。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/site.js`、`node --check wwwroot/js/pages/join.js`、來源 selector 與容器規則檢查。
  - 未驗證：瀏覽器實際畫面、跨瀏覽器、實體裝置與人工無障礙驗收；本機瀏覽器控制環境無可用瀏覽器。
  - 狀態：已提交，Commit：`e05a0d4`。

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
