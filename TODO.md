# APLI 企業官網 TODO

## 待處理事項

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
