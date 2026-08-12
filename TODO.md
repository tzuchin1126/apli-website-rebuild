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
  - 更新：2026-08-11。狀態：已提交，Commit：`2f68685`。

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
