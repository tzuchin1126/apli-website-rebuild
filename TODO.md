# APLI 企業官網 TODO

## 待處理事項
- [x] 2026-08-27 依需求恢復首頁 News Card 原本 hover 圖片的 48% 黑色遮罩，新增與 Services 相同的 `ph-arrow-bend-up-right` 右上角 icon；修正桌機每頁卡片數由 4 改為 3，使 4 筆資料在顯示 3.5 張時可切換為 2 組。已完成 `node --check`、Release 建置與 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-27 精修首頁 News Card：保留既有四欄／Slider 與資料結構，統一圖片 16:9，將 hover 縮放由 1.08 收斂至 1.02、移除強烈暗化，弱化 Meta、固定標題／摘要最多兩行並統一 Card 高度，查看全部改為 42px，指示器縮小。已完成 Release 建置與 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-27 精修首頁 Services 三張 Card：維持 16:9 圖片裁切，弱化邊框，將內容內距調整為 18px 20px 22px、標題改為 600、圖像 hover 縮放 1.03、Card 上移 3px，並縮小箭頭至 20px。已完成 Release 建置與 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-27 依需求增加首頁 About Section 垂直留白，桌機採約 100–112px／120px、平板約 72–96px／80–104px、手機約 64–80px／72–88px；利用既有 Services 上方斜切延後進場，保留約 60–90px 白色呼吸空間。已完成 CSS 來源確認與 `git diff --check`，依需求未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-27 依需求將首頁 Services Section 與上方斜切背景色由 `#f5f7f8` 改為 `#f7f7f7`；已完成 CSS 來源修改與 `git diff --check`，未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-27 依最新需求重新收斂首頁斜切：Services 僅保留上方斜切、移除下方斜切，並將桌機／平板／手機斜切高度縮至 40–60px／30–40px／20–30px；同步增加 About 底部白色留白。已完成 Release 建置、首頁 CSS 來源規則確認與 `git diff --check`；依需求未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-27 依首頁 Section 斜切設計需求，將 About／Services 與 Services／News 交界改為 Services 淡冷灰藍背景的上下斜切；保留 Hero、三張服務卡、News、CTA 與既有 JavaScript。已完成 Release 建置、`git diff --check`，以及本機 Edge 1366×900／390×844 檢查：桌機斜切約 95.6px、手機約 39px，斜切背景為最低層且無水平溢位；實體裝置、跨瀏覽器與正式站仍待驗證，尚未 commit。
- [ ] 2026-08-27 移除首頁「我們的服務」區塊背景顏色，改回透明背景；尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 依需求將首頁 About 桌機版版面恢復為圖片在左、文字在右；保留年份標語移除與內容間距 20px 設定，尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 將首頁 About 標題與內容間距由 32px 統一調整為 20px，與 About 內頁一致；尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 依需求移除首頁 About 的 `home-intro__established` 年份標語與對應樣式，不再顯示；尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 修正首頁 About 年份標語的 CSS 優先權，避免共用段落規則覆蓋 `margin-top`，使標題／標語／內文間距一致；尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 依截圖回饋再次放大並加重首頁 About 年份標語，將標題／標語／內文的間距拉開至 32px，並降低桌機右側圖片高度；尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 放大首頁 About 年份標語字級，並統一與標題底線及下方內文的間距為 20px；僅維持該句使用 `Noto Serif TC`，尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 調整首頁 About 區塊為文字優先、圖片輔助，新增「成立於 1973 年，至今超過 50 年」年份標語並僅套用 `Noto Serif TC`；尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 依需求恢復首頁 About 企業介紹區塊原本的圖片欄位寬度與高度設定；保留其他既有圖片與 Hero 調整，尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 調整首頁 About 企業介紹區塊的桌機版圖片欄位、寬度與高度，降低圖片視覺重量並增加文字呼吸感；手機版維持滿寬，尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 依需求移除全站圖片不再使用的 `<source>` 標籤，保留原圖 `<img>` 與必要的 Hero／輪播容器；已完成原始碼修改，尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 調整首頁 INDEX Hero 圖片飽和度、對比與 8%～15% 深色遮罩，讓 Header 與 Hero 文案更穩定；已完成原始碼修改，尚未進行瀏覽器或實機驗證，尚未 commit。
- [ ] 2026-08-27 依需求將全站公開頁面目前引用的 `resized` 圖片改回對應原圖，並修正圖片原始尺寸；已完成來源檢查，未進行實機或瀏覽器驗證，尚未 commit。

- [ ] 2026-08-27 依需求將關係企業頁 Hero 的 `<source>`、`<img>` 與 preload 改回使用原圖 `public/images/affiliates/affiliates-hero.jpg`；未進行實機或瀏覽器驗證，尚未 commit。

- [ ] 2026-08-27 已移除重新載入遮罩中央的橘色進度短線，保留全畫面遮罩與載入完成淡出功能；尚未重新進行正式站與實機驗證，尚未 commit。

- [ ] 2026-08-27 已修正 CSP 阻擋頁面載入遮罩 inline script 的問題：`page-loading` 改由同源同步外部 `js-ready.js` 在樣式表前設定，所有相關公開頁面已移除 inline script。已完成來源檢查，尚未重新進行正式站 CSP 回應標頭與瀏覽器快取驗證；尚未 commit。

- [ ] 2026-08-27 依最新需求將公開靜態圖片改採類似台泥的 `<picture>` 結構：桌機由 `<source media="(min-width: 768px)">` 載入衍生圖，手機／fallback 使用 `img`，並將 59 個尺寸衍生檔集中至 `wwwroot/public/images/resized/`、保留原圖位置；已同步更新 Hero preload、內容圖與 CSS 背景圖引用。已完成本機檔案路徑核對，尚未進行 Release 建置、瀏覽器／實機驗證與正式站冷快取驗證；尚未 commit。

- [ ] 2026-08-27 依需求移除首頁 Hero 圖片的 `<link rel="preload">`；保留 Hero `<img>` 的 `loading="eager"` 與 `fetchpriority="high"`。未進行實機或瀏覽器驗證。

- [ ] 2026-08-27 首頁圖片依最新需求改回每張只使用一個原尺寸 PNG／JPG；共用全頁遮罩會等待首頁兩張輪播圖、目前視窗圖片完成載入與 `decode()` 及網站字型就緒後，再以 200ms 淡出。JavaScript 最多等待 8 秒，CSS 另有 10 秒安全降級；不再使用 `srcset` 或多尺寸候選。未進行實機或瀏覽器驗證，正式站冷快取與慢速網路仍待確認；尚未 commit。

- [ ] 2026-08-27 首頁第一張 Hero 因 1600px 壓縮 JPG 在寬螢幕搭配 `scale(1.1)` 圖片動畫時有明顯模糊感，已為第一張新增原始尺寸 1717px、約 468KB 的高品質 JPG 桌機候選，保留 960px／1600px 響應式選擇與匹配 preload；依最新確認恢復兩張 Hero 原有的 2 秒縮放進場效果，並改為首屏圖片完成解碼、就緒遮罩開始退場時才啟動。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置（0 警告／0 錯誤）、`git diff --check` 與本機 Edge 1366×900／390×844 驗證：首次載入及輪播切換皆套用 `home-hero-image-scale-in` 2 秒動畫，手機選用 960px Hero，無水平溢位且主控台無錯誤。正式站冷快取、跨瀏覽器與實體裝置仍待驗證；尚未 commit。

- [ ] 2026-08-27 首屏圖片就緒遮罩已從首頁抽成共用 `page-loader.css`／`site.js`，並套用首頁、公司簡介、公司沿革、營運資源、服務項目、人才招募、關係企業、聯絡我們、職業安全衛生、最新消息與新聞內頁；404／500 保持立即顯示。共用邏輯等待首頁兩張輪播圖及各頁目前視窗圖片完成 `decode()` 與字型就緒，最多等待 8 秒，CSS 另有 10 秒安全降級。依最新需求，各頁改用單一原尺寸 PNG／JPG，不再使用 `srcset`；首頁 Hero 的 2 秒縮放動畫會在 `page-ready` 後持續完成。未進行實機或瀏覽器驗證，正式站冷快取與慢速網路仍待驗證；尚未 commit。

- [ ] 2026-08-27 營運資源頁因重整時 Hero 與內容圖片延遲顯示／閃動，已恢復 Hero 960px／1920px 及四張內容圖 720px／1280px 的響應式 JPG，保留首屏 preload／high priority 與內容圖 lazy loading；依最新需求移除 Hero 圖片／標題與四個內容區塊的載入、滑入動畫，只保留地理優勢區塊的進場與中心圖示動畫。已完成 `node --check wwwroot/js/pages/operational-resources.js`、Release 建置（0 警告／0 錯誤）、`git diff --check`，以及本機 Edge 1366×900／390×844 驗證：Hero 圖片、標題與一般內容區塊皆為 `animation: none`，地理優勢的桌機左右／中心動畫及手機資訊進場動畫仍正常，主控台無錯誤。慢速網路、跨瀏覽器、實體裝置與正式站冷快取仍待驗證；尚未 commit。

- [ ] 2026-08-27 首頁輪播兩張 Hero 依最新需求改回單一原尺寸 PNG；第一張維持 eager／high，第二張維持 eager／low。共用首屏遮罩等待兩張輪播圖完成載入與 decode；兩張圖片原有的 2 秒縮放進場效果已恢復，首次載入會在首屏就緒後啟動。載入失敗／逾時會保留目前圖片並允許後續重試，自動切換仍遵守焦點、頁面可見性與減少動畫設定。未進行實機或瀏覽器驗證；尚未 commit。

- [ ] 2026-08-27 已移除首頁「我們的服務」標題與三張服務卡片的頁面載入／捲動進場動畫，保留卡片 hover、focus 與連結互動；首頁其他區塊動畫未調整。已完成 Release 建置（0 警告／0 錯誤）、`git diff --check`，以及本機 Edge 1366×900／390×844 驗證：標題與三張卡片皆無 reveal／delay 屬性，計算後為可見、`opacity: 1`、`transform: none`，主控台無錯誤。跨瀏覽器與實體裝置仍待驗證；尚未 commit。

- [ ] 2026-08-27 已調整公開新聞 API 60 秒短期快取、公開新聞圖片 7 天快取，並移除前端公開 API 的強制 `no-store`；管理頁面與管理 API 維持 `private, no-store`，附件仍採保守的不快取策略。已完成來源修改、JavaScript 語法檢查、Release 建置（0 警告／0 錯誤）與 `git diff --check`；IIS gzip／Brotli、Plesk 實際回應標頭、正式站快取失效與慢速網路尚未驗證，尚未 commit。

- [ ] 2026-08-26 已完成全站圖片首次載入改善：共用 Hero 改用 960px／桌機尺寸的響應式 JPEG 與匹配的 preload，非首屏內容圖改用 1280px 顯示版、`loading="lazy"`／`decoding="async"`，圖片與字型回應新增 7 天快取、CSS／JS 新增 1 天快取；營運資源進場動畫不再先隱藏內容。已驗證 `dotnet build -c Release`（0 警告／0 錯誤）、`git diff --check`、本機 Edge 1440×900 與 390×844 的 10 個主要路由 Hero 均完成載入且無破圖，Careers 與營運資源桌機／手機畫面正常，圖片／CSS 回應含預期 `Cache-Control`。待重新發布至 Plesk 後驗證正式站冷快取、慢速網路、跨瀏覽器與實體裝置；尚未 commit。

- [ ] 確認正式環境 HTTPS 憑證與部署設定；Development 已維持 HTTP 啟動，不再因找不到 HTTPS 連接埠觸發受限 Windows 帳號的 EventLog 錯誤。

- [ ] 2026-08-25 因戰國策不允許網站程式寫入 `httpdocs` 同層資料夾，Plesk 用 `appsettings.Production.json` 改採 `App_Data` 儲存新聞 JSON、分類與附件；已完成重新 Publish、網站啟動與新增公告驗證。HTTPS、正式備份流程與後台帳密安全性仍待確認；更新時不得覆蓋或刪除既有 `App_Data` 資料。

- [ ] 2026-08-25 已新增並執行驗證 `scripts/Publish-Plesk.ps1`，會將 Publish 內容直接壓在 ZIP 根目錄，避免解壓後多出 `/httpdocs/APLI`；產生的 ZIP 需直接解壓至 `/httpdocs`，並保留既有 `App_Data`。

- [ ] 2026-08-26 依戰國策主機限制，Plesk 正式後台帳密改由專案根目錄 `web.config` 的 `Admin__Username`／`Admin__Password` 提供，並隨 `Publish-Plesk.ps1` 產出的 ZIP 覆蓋 `/httpdocs/web.config`；已驗證 Release publish 成功、發布版保留兩個設定節點且 ZIP 根目錄含 `web.config`，目前帳密欄位保留空值，需由維護者在本機填入後重新執行腳本。尚未重新上傳 Plesk；發布 ZIP 上傳解壓後應立即從主機刪除。

- [ ] 完成主要頁面後安排跨瀏覽器、實體裝置與人工無障礙驗收。
- [ ] 驗證首頁 Hero 移除滑鼠停留暫停後，在不同瀏覽器、鍵盤焦點與減少動畫設定下的輪播行為；目前已完成桌面滑鼠停留來源檢查，跨瀏覽器與實體裝置尚未驗證。
- [ ] 驗證 Careers 職缺資訊區塊的 518 人力銀行圖片與外部連結在正式站及新分頁中的實際呈現與導向；目前已完成來源替換，外部連結尚未實際開啟驗證。
- [ ] 驗證 Careers Hero 左側透明漸層在桌機、手機與不同圖片裁切下的文字對比；目前已完成來源層級調整，跨裝置實際效果尚未完整驗證。
- [ ] 確認正式 Domain 與公開 URL 策略（正式主網域、www／非 www、正式路由命名與必要的舊網址處理）；確認前不設定絕對網址。

- [ ] 正式 Domain 確認後補上 canonical、`og:url`、`og:image`、Sitemap、JSON-LD，以及需要時的 `hreflang` 與多語言 metadata。

- [ ] 正式環境確認後完成 HTTPS 憑證、IIS／ASP.NET 部署、靜態檔案與 Security Headers／CSP 的正式設定確認；2026-08-25 已將 IIS 新聞 JSON、分類、附件與圖片分離至 `C:\Sites\APLI-Data`，設定 `APLIWebsite` App Pool 使用該資料根目錄，確認 23 個檔案與搬移前備份一致、公開新聞 API 回應 200，並完成一次重新 publish／部署驗證：測試公告仍存在且部署前後 `news.json` SHA-256 相同。Production／HTTPS 與正式網域仍待驗證。

- [ ] 正式站上線後驗證公開頁面、clean routes、`/news/{id}`、404、圖片／附件、公開 API、HTTP headers 與快取行為。

## 紀錄規則

- TODO 只記錄待處理、受外部條件阻塞或待確認的事項；完成後直接移除，不保留 `- [x]` 完成紀錄。
- 需要正式 Domain／正式環境才能執行的項目，明確標示前置條件與阻塞原因。
- 尚未實際驗證的內容必須標示「未驗證」。
- 不把桌機瀏覽器檢查當成手機、跨瀏覽器、實體裝置或人工無障礙驗收。
- 新發現的問題與頁面差異必須加入本檔案，不只記錄在聊天或 commit 訊息。
