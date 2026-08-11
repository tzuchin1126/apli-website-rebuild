# APLI Website Rebuild

亞太國際物流官網的乾淨重建專案。畫面、內容結構、互動與 RWD 行為以舊版專案作為參考，但新專案必須維持獨立程式碼與 Git 歷史。

## 專案原則

- 使用 ASP.NET Core 8 Razor Pages。
- 前端只使用原生 CSS 與必要的原生 JavaScript。
- 不使用 Tailwind CSS、Bootstrap、jQuery 或其他 CSS framework。
- 舊版參考專案：`C:\Users\U096\Downloads\apli-website`。
- 舊版專案僅供比對，不可直接修改，也不可複製其中的 Tailwind utility class。
- 新增或修改頁面樣式時，必須依 CSS 責任分區放置，避免跨頁互相影響。

完整開發規範請參閱 [AGENTS.md](AGENTS.md)。目前進度與待辦統一記錄在 [TODO.md](TODO.md)。

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
Pages/                         Razor Pages 與後端處理
Pages/Shared/                  Razor 共用 Layout
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

目前 Razor Pages 與 `wwwroot` 靜態頁面並存。是否將所有公開頁面移轉為 Razor Page，需另行確認；在決策前不得自行大規模改寫路由或頁面結構。

Footer 由 `Pages/Shared/_Footer.cshtml` 統一管理。Razor Layout 直接載入此 Partial；既有靜態 HTML 只保留 `<!-- shared-site-footer -->` 標記，由 `Program.cs` 在伺服器回傳頁面時注入同一份 Partial。修改 Footer 結構或連結時不得重新在各頁複製 HTML。

## CSS 責任分區

- 共用顏色、字體與寬度：`wwwroot/css/base/tokens.css`
- Header、Footer：`wwwroot/css/layout/`
- 共用按鈕或卡片：`wwwroot/css/components/`
- 單一頁面：`wwwroot/css/pages/<page>.css`
- 頁面專屬 selector 必須以頁面根 class 限定，例如 `.home-page`。
- 不使用 `!important` 或過度具體的 selector 掩蓋責任錯置。

## 主要按鈕規範

目前專案的主要按鈕以首頁「關於亞太」區塊的「了解更多」按鈕作為視覺基準：

- 使用實體 inline SVG icon，不使用文字符號，也不以 `::after` 產生 icon。
- 使用 Phosphor `share` icon，尺寸 `16px`，文字與 icon 間距 `12px`。
- 採實心按鈕樣式，保留 hover、focus-visible 與手機版狀態。
- 共用 class 為 `.button--primary`，定義於 `wwwroot/css/components/buttons.css`；首頁的 `.home-text-link` 保留頁面語意 class。
- 卡片右下角的 `MORE` 使用共用 `.button--text-arrow`，由 `--button-text-arrow-*` tokens 控制顏色、間距、字級與 icon 位移；icon 沿用 `.home-text-link__icon`，動畫共用 `--button-icon-transition`。
- 首頁服務卡片的卡片與圖片圓角分別使用 `--card-radius`、`--card-image-radius`，集中定義於 `wwwroot/css/base/tokens.css`。
- 原本的橘色 `.button` 基礎樣式暫時註解，不作為主要按鈕使用。

## 開發與紀錄流程

每次功能、介面、內容、資料、路由或驗證狀態有調整時，都必須在同一次工作中同步更新 `TODO.md`：

1. 開始前確認目前待辦與工作樹狀態。
2. 將處理項目標記為「進行中」。
3. 完成後記錄修改範圍、日期、實際驗證與未驗證項目。
4. 有建立 commit 時補上 commit hash；尚未提交時明確標記「待提交」。
5. 只有實際執行的檢查才能記錄為通過。桌機、手機、跨瀏覽器、實體裝置與人工無障礙驗收必須分開記錄。
6. 新發現的差異或技術債直接新增至 `TODO.md`，不得只留在聊天紀錄。

`TODO.md` 是本專案唯一的待辦與進度來源；README 只記錄長期有效的專案說明與工作規則。
