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
7. 每次功能、介面、內容、資料、路由或驗證狀態有調整時，必須在同一次工作中同步更新 `TODO.md`；完成後記錄日期、實際驗證、未驗證項目與 commit（若有）。

## 新視窗與任務交接

為節省 token，可以依頁面或明確區塊拆分成新的 Codex 視窗，不需要貼上完整舊對話。每個新視窗必須先從專案檔案與 Git 還原上下文：

1. 完整閱讀 `AGENTS.md`、`README.md`、`TODO.md`。
2. 檢查目前 branch、`git status`、目前差異與最近 5 筆 commit。
3. 完成上述唯讀盤點後、開始規劃或實作前，必須先詢問使用者選擇本次工作模式；若使用者在新視窗第一則訊息已明確指定模式，則不必重複詢問。
   - **主代理＋子代理模式**：由主代理拆分並調用子代理進行盤點、實作或 QA，主代理負責整合、審查、驗證與最終品質。適合介面調整、跨頁共用元件、研究與較複雜工作。
   - **一般模式**：由目前代理直接處理，不建立子代理。適合文件、單行文字或範圍明確的小型修正。
4. 在使用者選擇模式前，只能進行讀取文件、Git 狀態與必要的唯讀盤點，不得開始修改檔案或實作。
5. 以 `TODO.md` 作為唯一進度來源，不重做已完成項目，也不把聊天內容當成專案紀錄。
6. 保留所有既有或未提交修改；只處理使用者在新視窗指定的頁面或區塊。
7. 需要參考舊版時，只讀取 `C:\Users\U096\Downloads\apli-website` 中與本次範圍直接相關的檔案，禁止修改舊專案。
8. 選擇主代理＋子代理模式時，以「舊版盤點」、「新版盤點／實作」及「最終 QA」等互不衝突的明確子任務分工；不為了湊數建立沒有獨立產出的子任務。
9. 一個新視窗原則上只處理一個頁面或一個明確區塊；只載入本次需要的檔案，避免重複掃描整個專案。
10. 完成後同步更新 `TODO.md`，清楚區分已驗證與未驗證項目；未經使用者要求不得自行 commit 或 push。

新視窗只需由使用者補充本次範圍，例如：「請從 `TODO.md` 的下一步繼續，本次處理 `about.html` 內容區。」代理完成啟動盤點後，應詢問：「本次要使用『主代理＋子代理模式』，還是『一般模式』？」

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
