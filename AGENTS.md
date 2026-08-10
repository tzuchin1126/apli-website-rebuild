# APLI Website Rebuild 開發規則

## 專案目標

- 本專案是現有 APLI 官網的乾淨重建版本。
- 以現有網站的畫面、內容結構、互動與 RWD 行為作為參考。
- 本專案與 `/Users/tzuchin/Projects/apli-website` 分開，禁止直接修改舊專案。

## 技術規則

- 使用 ASP.NET Core 8 Razor Pages。
- 不使用 Tailwind CSS、Bootstrap 或其他 CSS framework。
- 只使用原生 CSS 與必要的原生 JavaScript。
- 不引入 jQuery，除非有明確且已確認的需求。
- 優先使用瀏覽器原生能力與現有專案工具，避免不必要的套件。

## CSS 規則

CSS 必須依責任分區，不建立無限制增長的單一樣式檔：

- `wwwroot/css/base/`：reset、tokens、基礎元素
- `wwwroot/css/layout/`：Header、Footer、容器與主要版型
- `wwwroot/css/components/`：按鈕、卡片、表單等可重用元件
- `wwwroot/css/pages/`：頁面專屬樣式
- `wwwroot/css/site.css`：網站層級的少量共用規則

其他規則：

- 色彩、字體、容器寬度等共用值集中在 `base/tokens.css`。
- 避免使用 `!important`；只有處理第三方或明確優先權問題時才允許使用。
- 不用過度具體的 selector 堆疊解決 CSS 衝突，應先整理責任範圍。
- 頁面專屬規則必須以頁面根 class 限定，避免影響其他頁面。
- CSS 修改後檢查桌機與手機，不只確認單一視窗尺寸。

## HTML、Razor 與 JavaScript

- 保留語意 HTML、正確 heading 階層、ARIA、鍵盤操作與 focus 狀態。
- 不為了套樣式刪除必要的 `id`、`class`、`data-*` 或表單欄位。
- Razor 共用結構放在 Layout 或 Partial，避免複製整份 Header／Footer。
- JavaScript 只處理互動與狀態，不把整個版面邏輯塞進 JS。
- 所有互動元件都要考慮停用 JavaScript 時的基本內容可讀性。

## 修改流程

1. 修改前先閱讀 `README.md`、`TODO.md`，並檢查 `git status` 與目前差異。
2. 先確認現有畫面與需求範圍，再修改最少的檔案。
3. 不自行處理未指定的重構或設計變更。
4. 完成後執行適合本次變更的建置、語法、RWD 與瀏覽器檢查。
5. 未實際驗證的項目不可標示為已通過。
6. Commit 訊息要清楚描述變更，確認狀態乾淨後才 push。

## 驗證要求

涉及 Razor 或 C# 時：

```bash
dotnet build -c Release
```

涉及 JavaScript 時：

```bash
node --check wwwroot/js/site.js
```

所有程式碼變更都應至少執行：

```bash
git diff --check
git status --short
```

畫面變更需分別確認桌機與手機；瀏覽器驗證、實體裝置驗證、跨瀏覽器驗證與無障礙人工驗收要分開記錄，不可互相代替。

## Git 與安全

- 不提交密碼、Token、User Secrets、真實帳密或個人環境檔案。
- 不使用 `git reset --hard`、`git checkout --` 或刪除大量檔案來掩蓋問題。
- Push 前確認 remote、branch、diff 與要上傳的檔案都正確。
- 舊專案與新專案的 Git 歷史分開管理。
