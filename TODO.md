# APLI 專案進度

## 2026-09-07 首頁跨尺寸寬度與文字調整

原工作樹的 TODO.md 已刪除；本檔依專案規則僅記錄本次工作，未還原舊進度。

### 已完成
- 共用 tokens 新增 content-gutter 與 content-width，首頁套用連續側邊留白與 1324px 最大內容寬度；服務區保留 1200px 上限。
- 收斂首頁區塊標題至 30–36px（預設根字級），服務卡片標題與關於副標題使用 24px token；新聞與服務介紹使用正文 token。
- 更新首頁 CSS 版本參數，保留既有內容、排列及上下區塊間距。

### 已驗證
- 本機靜態首頁，無頭 Edge：1920、1440、1366、1200、981、980、768、767、390px 視窗寬度。
- documentElement 無水平溢出，服務卡片文字高度未超過卡片。
- 1366px 關於／最新消息左右留白約 54.64px；390px 為 20px。
- 1920px 區塊標題 35.52px；1366px 為 32.196px；390px 為 30px。
- git diff --check 通過。

### 未驗證
- ASP.NET 動態新聞資料、共用 Footer 注入、其他內頁、正式部署、實體装置及跨瀏覽器驗收。
- 未變更 C#、Razor 或 JavaScript，未執行 Release 建置或 JavaScript 語法檢查。
- 依本次 AGENTS.md 未自行 commit 或 push；保留既有未提交修改。

## 2026-09-07 麵包屑對齊 Header Logo
- 共用麵包屑容器改用 Header 相同的左右內距與 981px／840px 斷點，未改動 Header 或內容區。
- 更新 breadcrumb.css 載入版本。
- 已驗證：本機靜態 About 頁、無頭 Edge，1912／1366／980／840／390px，麵包屑首個連結與 Logo 左側座標一致；1912px 皆為 294px，390px 皆為 16px。
- 已驗證：git diff --check。
- 未驗證：其他內頁逐頁驗收、實體裝置、其他瀏覽器與正式部署。未修改 C#／Razor／JS，未執行其建置或語法檢查。
- 未 commit 或 push。
