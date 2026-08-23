# APLI 企業官網 TODO

## 待處理事項

- [ ] 確認正式環境 HTTPS 憑證與部署設定；Development 已維持 HTTP 啟動，不再因找不到 HTTPS 連接埠觸發受限 Windows 帳號的 EventLog 錯誤。

- [ ] 完成主要頁面後安排跨瀏覽器、實體裝置與人工無障礙驗收。
- [ ] 確認正式 Domain 與公開 URL 策略（正式主網域、www／非 www、正式路由命名與必要的舊網址處理）；確認前不設定絕對網址。

- [ ] 正式 Domain 確認後補上 canonical、`og:url`、`og:image`、Sitemap、JSON-LD，以及需要時的 `hreflang` 與多語言 metadata。

- [ ] 正式環境確認後完成 HTTPS 憑證、IIS／ASP.NET 部署、靜態檔案與資料目錄、Security Headers／CSP 的正式設定確認。

- [ ] 正式站上線後驗證公開頁面、clean routes、`/news/{id}`、404、圖片／附件、公開 API、HTTP headers 與快取行為。

## 紀錄規則

- TODO 只記錄待處理、受外部條件阻塞或待確認的事項；完成後直接移除，不保留 `- [x]` 完成紀錄。
- 需要正式 Domain／正式環境才能執行的項目，明確標示前置條件與阻塞原因。
- 尚未實際驗證的內容必須標示「未驗證」。
- 不把桌機瀏覽器檢查當成手機、跨瀏覽器、實體裝置或人工無障礙驗收。
- 新發現的問題與頁面差異必須加入本檔案，不只記錄在聊天或 commit 訊息。
