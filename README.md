# APLI 企業官網

亞太國際物流企業官網的主要開發專案，負責網站的內容、介面、互動、RWD、路由、後端功能與正式部署維護。既有網站與舊版專案僅作為參考，本專案維持獨立程式碼與 Git 歷史。

## 專案原則

- 使用 ASP.NET Core 8 Razor Pages。
- 前端只使用原生 CSS 與必要的原生 JavaScript。
- 不使用 Tailwind CSS、Bootstrap、jQuery 或其他 CSS framework。
- 舊版參考專案：`C:\Users\U096\Downloads\apli-website`。
- 舊版專案僅供比對，不可直接修改，也不可複製其中的 Tailwind utility class。
- 新增或修改頁面樣式時，必須依 CSS 責任分區放置，避免跨頁互相影響。

完整開發規範請參閱 [AGENTS.md](AGENTS.md)。目前進度與待辦統一記錄在 [TODO.md](TODO.md)。

IIS 部署、發布路徑、環境變數與更新流程請參閱 [IIS-DEPLOYMENT.md](IIS-DEPLOYMENT.md)。

## 技術環境

- .NET 8
- ASP.NET Core Razor Pages
- 原生 HTML、CSS、JavaScript
- JSON 最新消息資料

## 啟動與建置

```powershell
dotnet run
```

預設開發網址：

- HTTP：`http://localhost:5127`
- HTTPS：`https://localhost:7232`

Release 建置：

```powershell
dotnet build -c Release
```

員工專區 `/Admin` 的登入帳號不寫入版本庫，啟動前必須設定環境變數 `Admin__Username` 與 `Admin__Password`。應用程式未設定完整帳密時會直接停止啟動；Production 另必須設定 `AllowedHosts` 與 `Apli__DataRoot`，並將可變資料放在發布目錄外。登入後可管理資料根目錄內的 `news.json`、`news-categories.json` 與 `news/` 附件。公開首頁、最新消息與詳細頁透過 `/api/public/news` 及其子路徑取得已發布資料，不能以公開 API 取得草稿或未來公告。後台會將原始新聞圖片（上限 5 MB）縮至最長邊 1920px、轉為 WebP 並控制在 1 MB 內；既有 Base64 圖片仍可讀取，但新圖片不再寫入 `news.json`。部署與備份時不可遺漏整個資料根目錄。

JavaScript 語法檢查：

```powershell
node --check wwwroot/js/site.js
node --check wwwroot/js/pages/<page>.js
```

提交前至少執行：

```powershell
git diff --check
git status --short
```

## 專案結構

```text
Pages/                         Razor Pages 與後端處理，目前保留 Admin
Pages/Shared/_Footer.cshtml    全站唯一 Footer HTML 來源
wwwroot/*.html                 目前主要公開靜態頁面
wwwroot/css/base/              Reset、設計 token、基礎元素
wwwroot/css/layout/            Header、Footer、容器與主要版型
wwwroot/css/components/        可重用元件
wwwroot/css/pages/             各頁專屬樣式
wwwroot/css/site.css           少量網站層級共用規則
wwwroot/js/site.js             網站共用互動
wwwroot/js/pages/              各頁專屬互動
wwwroot/data/                  最新消息 JSON 資料
wwwroot/public/images/         圖片與品牌素材
```

公開網站頁面仍由 `wwwroot/*.html` 提供，但對外統一使用 `Program.cs` 管理的乾淨網址，例如 `/about`、`/services`、`/careers` 與 `/company-history`；目前存在的 `.html` 路徑會依 `Program.cs` 設定導向對應的正式路由。

Footer 由 `Pages/Shared/_Footer.cshtml` 統一管理。既有靜態 HTML 只保留 `<!-- shared-site-footer -->` 標記，由 `Program.cs` 在伺服器回傳頁面時注入同一份 Partial。修改 Footer 結構或連結時不得重新在各頁複製 HTML。

## CSS 責任分區

- 共用顏色、字體與寬度：`wwwroot/css/base/tokens.css`
- Header、Footer：`wwwroot/css/layout/`
- 共用按鈕或卡片：`wwwroot/css/components/`
- 單一頁面：`wwwroot/css/pages/<page>.css`
- 頁面專屬 selector 必須以頁面根 class 限定，例如 `.home-page`。
- 不使用 `!important` 或過度具體的 selector 掩蓋責任錯置。

### 非首頁 Hero

- `wwwroot/css/site.css` 載入共用 `wwwroot/css/components/page-hero.css`；高度、標題、遮罩與動畫 token 集中於 `wwwroot/css/base/tokens.css`。
- 一般頁面使用 `.page-hero__overlay` 與預設的 `--page-hero-overlay-light`。頁面可透過 `--page-hero-overlay` 改用不同遮罩，但不應重複建立遮罩規則。
- `company-history.html` 的 `.milestones-hero__overlay` 同時套用 `.page-hero__overlay`，因此遮罩屬於共用 Hero；`wwwroot/css/pages/company-history.css` 目前只設定該頁 Hero 圖片位置。

