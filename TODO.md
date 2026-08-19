# APLI Website Rebuild TODO
- [x] 2026-08-19：修正 About 乾淨網址 404
  - 範圍：`wwwroot/about.html`、`TODO.md`。
  - 完成：移除 About 頁重複的 Footer，改回 `<!-- shared-site-footer -->` 標記，讓 `/about` 使用與其他公開頁面一致的共用 Footer 注入流程。
  - 已驗證：確認 About 頁包含共用 Footer 標記、`git diff --check`。
  - 未驗證：尚未完成重新發布後 IIS `/about` 實際請求、瀏覽器渲染與手機裝置驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：修正舊新聞網址轉址遺失 ID
  - 範圍：`Program.cs`、`TODO.md`。
  - 完成：舊的 `/news-detail.html?id=...` 轉址至 `/news-detail` 時保留 Query String，避免詳細頁遺失新聞 ID 而顯示找不到消息。
  - 已驗證：`dotnet build .\apli-website-rebuild.csproj --configuration Release`、`git diff --check`。
  - 未驗證：尚未完成 IIS 實際 301 轉址、瀏覽器與手機裝置驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：公開頁面改用乾淨網址
  - 範圍：`Program.cs`、`wwwroot/*.html`、`wwwroot/js/pages/home.js`、`wwwroot/js/pages/news.js`、`README.md`、`TODO.md`。
  - 完成：由專案直接提供 `/about`、`/services`、`/news`、`/join` 等乾淨網址；舊 `.html` 網址改以永久轉址導向新網址；同步更新站內導覽、Footer、麵包屑、服務錨點與新聞詳細頁連結。
  - 已驗證：`dotnet build .\apli-website-rebuild.csproj --configuration Release`、確認 HTML／JavaScript 無站內 `.html` 連結。
  - 未驗證：尚未完成 IIS 發布後的實際 301／乾淨網址請求、桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：統一首頁標題字重
  - 範圍：`wwwroot/css/pages/home.css`、`TODO.md`。
  - 完成：將首頁服務／最新消息等共用標題的 700 統一為 `var(--font-weight-semibold)`（600）。
  - 已驗證：`git diff --check`、確認 `home.css` 已無標題用的 `font-weight: 700`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：補上 Safari 的 user-select 相容性前綴
  - 範圍：`wwwroot/css/pages/home.css`、`wwwroot/css/pages/occupational-safety.css`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：在拖曳／不可選取區塊補上 `-webkit-user-select: none`，並保留標準 `user-select` 宣告。
  - 已驗證：`git diff --check`、確認 3 處宣告皆包含 Safari 前綴。
  - 未驗證：尚未完成 Safari／iOS Safari 實機或瀏覽器渲染驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：修正首頁介紹標題字重
  - 範圍：`wwwroot/index.html`、`wwwroot/css/pages/home.css`、`TODO.md`。
  - 完成：將首頁介紹區塊 `.home-intro h2` 從 300 修正為 `var(--font-weight-semibold)`（600），避免後置規則覆蓋原本粗體設定，並更新 CSS 快取版本。
  - 已驗證：`git diff --check`、檢查首頁 CSS 與 HTML 快取版本。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：增加 Services 標題敘述分隔線
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務標題與敘述下方加入淡色水平分隔線，將上方介紹與下方圖片／服務項目區隔；手機版同步保留。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：對齊 Services 主要服務與優勢欄位
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務與優勢區塊統一左側圖片欄寬、右側文字欄起點與欄間距，讓上下圖片尺寸一致、右側內容對齊。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：將 Services 主要服務圖片固定於左側
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務項目桌機版改為左圖右文字；「我們的優勢」維持左圖右文字，手機版維持直向閱讀順序。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除 Services 優勢資訊 icon
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除三個優勢區塊共 9 個 icon 與對應 CSS，恢復原本無 icon 的資訊排版。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：恢復 Services 原本優勢區塊排版
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：優勢區塊恢復原本左圖右文字、`16:9` 圖片比例與垂直分布方式；保留已補回的三組資訊 icon。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：縮短 Services 優勢圖片並恢復資訊 icon
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：桌機優勢圖片比例由 `2.2:1` 調整為 `2.8:1`，三欄優勢資訊補回原本對應的 Phosphor icon；手機圖片比例維持原本設定。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 Services 為傳統企業資訊型排版
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：優勢區塊改為寬幅圖片在上、下方三欄資訊排列；降低圓角與卡片感，加入細分隔線，保留服務切換、內容與 CTA。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：恢復 Services 背景顏色設定
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除「我們的優勢」淡色背景，恢復原本主要服務反向區塊的淡色背景設定；其他 Services 修改保留。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：統一 Services 主要服務與優勢背景分界
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：所有主要服務區塊統一使用白色背景，各自的「我們的優勢」獨立使用淡色背景，避免反向服務區塊造成背景延伸與分界錯位。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：修正 Services 主要服務區塊誤套淡色背景
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務區塊恢復白色背景，只保留「我們的優勢」區塊使用淡色背景；反向服務區塊原有淡色背景維持不變。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：增加 Services 優勢區塊背景色
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：「我們的優勢」區塊改用 `var(--color-surface-soft)` 淡色背景，與白色主要服務內容區隔；其他內容維持不變。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：重排 Services 主要服務與優勢桌機版左右配置
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：桌機／平板主要服務項目改為左圖右文字；「我們的優勢」標題維持不變，優勢內容改為左文字右圖片；手機版維持直向閱讀順序。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：恢復 Services 主要服務與優勢左右配置
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：恢復主要服務原本右圖左文字、優勢內容原本左圖右文字，以及原本 `1099px` 單欄斷點；其他既有 Services 修改保留。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：改為 Operational Resources 地理優勢捲動觸發動畫
  - 範圍：`wwwroot/operational-resources.html`、`wwwroot/css/pages/operational-resources.css`、`wwwroot/js/pages/operational-resources.js`、`TODO.md`。
  - 完成：參考首頁 `IntersectionObserver`，只有地理優勢網絡進入視窗附近才播放左右列表與中心 Logo 動畫；支援未支援 Observer 與減少動態偏好的靜態顯示。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/operational-resources.js`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：增加 Operational Resources 地理優勢進場動畫
  - 範圍：`wwwroot/operational-resources.html`、`wwwroot/css/pages/operational-resources.css`、`TODO.md`。
  - 完成：桌機／平板版左側列表由左滑入、右側列表由右滑入並連向中心 Logo；手機版改為上下淡入，並支援減少動態偏好。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：保留 Operational Resources 地理優勢平板版桌機排版
  - 範圍：`wwwroot/operational-resources.html`、`wwwroot/css/pages/operational-resources.css`、`TODO.md`。
  - 完成：地理優勢區塊由 `980px` 以下才切換為單欄，調整為 `760px` 以下才切換；平板寬度維持桌機的左右距離網絡排版，手機才使用上下列表。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／平板／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：增加 About 經營理念預設文字遮罩
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`TODO.md`。
  - 完成：桌機版經營理念三張圖片在未 hover／未展開時加入淡色遮罩，展開時維持較深遮罩；其他區塊不變。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 About 經營理念第三張圖片位置
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`TODO.md`。
  - 完成：將「願景」圖片水平位置由 `center` 調整為 `65%`，讓畫面內容往右移；垂直位置維持 `70%`。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 About 經營理念第二張圖片位置
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`TODO.md`。
  - 完成：將「價值」圖片水平位置由 `35%` 調整為 `50%`，讓人物更接近圖片中央；其他圖片不變。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 About 經營理念桌機版展開遮罩
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`TODO.md`。
  - 完成：桌機版僅在展開中的經營理念圖片套用文字遮罩，其他未展開圖片維持無遮罩；手機版維持遮罩。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/about.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：恢復 About 經營理念行動版遮罩
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`TODO.md`。
  - 完成：恢復行動版經營理念圖片的深色漸層遮罩；桌機版維持無遮罩。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除 About 經營理念區塊遮罩
  - 範圍：`wwwroot/about.html`、`wwwroot/css/pages/about.css`、`TODO.md`。
  - 完成：移除經營理念三張圖片上的深色 `::before` 遮罩，桌機與行動版皆不再套用遮罩。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：再次下移 Services 行動版業務諮詢內容
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：行動版 CTA 內容再向下微移約 8px，維持圖片高度與雙欄聯絡資訊。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：微調 Services 行動版業務諮詢內容位置
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：行動版 CTA 內容向下微移約 8px，維持圖片高度與雙欄聯絡資訊。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 Services 行動版業務諮詢內容垂直位置
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：業務諮詢 CTA 內容改為垂直置中，拉開標題與聯絡資訊間距，改善上方擁擠與下方留白不均。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：更新 Services CSS 快取版本
  - 範圍：`wwwroot/services.html`、`TODO.md`。
  - 完成：更新 Services stylesheet query，讓行動版業務諮詢 CTA 的 `2.5:1` 高度設定能重新載入，避免沿用舊快取。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：縮短 Services 行動版業務諮詢圖片高度
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：行動版業務諮詢 CTA 比例由 `2.15:1` 調整為 `2.5:1`，減少圖片高度與底部留白，保留聯絡資訊雙欄排列。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：Services 優勢區塊獨立化
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：三個「我們的優勢」標題移出圖片／內容欄，建立獨立區塊外層；桌機統一主要服務標題規則，行動版自然排列為「標題→圖片→內容」。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：重排 Services 行動版優勢與業務諮詢資訊
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：行動版優勢區塊改為「標題→圖片→內容」，放大「我們的優勢」標題；業務諮詢改為上方對齊內容並縮短 CTA 高度，保留聯絡部門與聯絡電話同列。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 Services 行動版優勢與業務諮詢 CTA
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：收緊行動版「我們的優勢」標題與內容間距；業務諮詢 CTA 改為較矮的 16:9 圖片比例，聯絡部門與聯絡電話改為同列兩欄，並縮小標題、標籤與電話字級以減少換行。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：增加 Services 主要服務項目與上方敘述的間距
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：在平板與桌機版將主要服務項目／圖片整列下移 `clamp(16px, 2vw, 28px)`，增加與上方敘述的呼吸空間；手機版維持原本間距。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：重新整理 Services 業務諮詢 CTA 聯絡資訊排版
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除業務說明句，增加標題與聯絡資訊間距；聯絡部門與聯絡電話改為兩欄資訊排版；CTA 底部增加與 Footer 的間距，手機版改為單欄。
  - 已驗證：`git diff --check`、`node --check wwwroot/js/pages/services.js`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除 Services 業務諮詢聯絡資訊標題
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除「聯絡部門」與「服務電話」標題，只保留「營業部」與可點擊的 `07-813-7912`；保留 CTA 標題「業務諮詢」與電話連結行為。
  - 已驗證：`git diff --check`。
  - 未驗證：尚未完成桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：更新 Services 業務諮詢 CTA 圖片樣式
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除「聯絡我們」按鈕、卡片外框與內部分隔線；使用既有聯絡情境圖片搭配深色遮罩作為背景；區塊下方留白設為 0，直接銜接 footer。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成修改後實機截圖。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：縮短 Services 業務諮詢 CTA 高度
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：維持透明背景，將業務諮詢改為低矮橫向 CTA；設定 192px 最小高度、移除重複的 CONTACT US 行、收斂內距與文字間距，並將右側聯絡資訊垂直置中。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成修改後實機截圖。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除 Services 業務諮詢背景
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除業務諮詢區塊的淺色底、深色圖片底與遮罩，改為透明背景與細框；文字改回深色系，並增加與上方優勢區塊的間距。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成修改後實機截圖。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除貨櫃清洗與維修輪播效果
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：貨櫃清洗與維修改為單張靜態圖片，移除該區輪播軌道、按鈕與圓點；保留原有圖片裁切與桌機 `16:9`／行動版 `4:3` 比例。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成修改後實機截圖。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：修正優勢內容與圖片的上下對齊
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：不變更圖片高度與 `16:9` 比例，讓優勢文字容器填滿圖片高度；調整標題間距、項目間距與內文行高，讓文字內容維持在圖片上下邊界內並與圖片頂端對齊。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成修改後實機截圖。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：統一優勢標題與主要服務項目字級
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：保留圖片原有高度與 `16:9` 比例，將「我們的優勢」標題調整為與「主要服務項目」相同的 `clamp(1.125rem, 1.05rem + 0.25vw, 1.25rem)` 字級與 1.5 行高；優勢內文原已使用相同 body-copy 字級。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成修改後實機截圖。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：依實際截圖修正 Services 圖片尺寸與對齊
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：優勢區塊改用與主要服務相同的 1280px 容器與欄距，左右圖片欄實際同寬；主要服務圖片改為對齊服務項目頂端；優勢文字移除上方 padding，與左側圖片頂端對齊；描述文字解除 760px 人為斷行限制，改為自然換行。
  - 已驗證：依使用者提供的實際桌機截圖定位 CSS 原因；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，修改後尚未取得新的實機截圖。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：統一主要服務與優勢圖片欄寬
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：優勢區塊改為 `1fr / 0.92fr`，左側圖片欄與主要服務區右側圖片欄同為 `1fr`；兩者維持相同 `16:9` 比例，因此寬高一致。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成實機 DOM 尺寸量測。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：解除 Services 標題敘述受欄距限制
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：標題與敘述改為各自跨越上方完整列，並限制內容最大寬度；中間欄距只作用於下方主要服務項目與圖片區塊。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成實機截圖與 DOM 尺寸量測。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 Services 主要服務與優勢區塊對齊
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務標題／敘述獨立在上方左欄，下方以主要服務項目左側、圖片右側形成同一區塊；下方優勢改為圖片左側、優勢文字右側。主要標題與內文尺寸、粗細依營運資源頁規則對齊。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，尚未完成實機截圖與 DOM 尺寸量測。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：Services 改用營運資源同款內容排版
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務改為營運資源頁的 grid 結構，標題／敘述／主要服務項目與圖片分欄呈現；桌機圖片固定在右側 `16:9`，反向服務依 reverse 欄位排列；優勢區塊同步使用相同 `0.92fr / 1fr` 欄寬，文字左、圖片右。
  - 已驗證：`http://localhost:5127/services.html` 回應 200；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：瀏覽器工具目前無可用連線，Chrome headless 受系統權限阻擋，尚未完成截圖與實際 DOM 尺寸量測。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 Services 上下區塊圖片與文字方向
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務改為左側圖片、右側服務項目；我們的優勢改為左側文字、右側圖片；兩個區塊圖片欄寬統一為較寬欄位，並維持桌機 `16:9`、手機 `4:3`。
  - 已驗證：CSS grid areas 與欄寬已更新；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染與圖片尺寸視覺比對。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：統一 Services 圖片比例、優勢副標題與文字字級
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：上方輪播與下方優勢圖片統一為相同欄寬與 `16:9`；「我們的優勢」改為較小副標題；移除優勢 icon；主要服務項目與優勢文字統一使用 `var(--font-size-body-copy)`。
  - 已驗證：`services-advantages__icon` 已移除；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、圖片實際尺寸與字級視覺比對。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：依紅線示意拆分 Services 內容列
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：標題獨立第一列、敘述獨立第二列，第三列才呈現左側主要服務項目與右側 16:9 圖片；手機版依序排列標題、敘述、圖片、主要服務項目。
  - 已驗證：三個服務均新增 `service-section__description`；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染與紅線區塊視覺比對。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：修正 Services 右側圖片高度
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：依營運資源頁將桌機 Services 圖片改為固定 `16 / 9` 比例並置中，不再使用 `height: 100%` 隨左側內容撐高；行動版維持 `4 / 3`，標題／敘述與主要服務項目內容不變。
  - 已驗證：CSS 圖片比例與對齊規則已更新；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染與圖片視覺高度檢查。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：修正 Services 標題敘述跑版
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除 breakpoint 後方覆蓋用的標題 grid，恢復標題與敘述為單一左欄區塊；右側圖片維持跨列，左側下方接主要服務項目。
  - 已驗證：CSS breakpoint 規則已改為 `display: block`；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染與實際等高檢查。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除 Services 雙欄內容的背景色並校正等高
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務項目內容底色改為透明，右側圖片改為跨列 stretch；優勢左側圖片保留圓角，與營運資源頁一致。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染與實際等高檢查。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：Services 對齊營運資源頁雙欄版型
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：主要服務項目改為左側標題／清單、右側圖片跨列等高；我們的優勢維持左圖／右側文字等高，移除優勢區塊背景色、邊框與卡片感；手機版改為標題→圖片→內容。
  - 已驗證：CSS grid areas、圖片高度與背景設定已更新；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、欄位實際等高、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：重整 Services 優勢與業務諮詢 CTA
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：三個「我們的優勢」改為左側服務場景圖、右側標題與優勢清單；業務諮詢改為深色圖片背景 CTA，保留部門／電話資料並加入聯絡我們按鈕。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、CTA 互動、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：同步收緊行動版優勢區塊上方間距
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除行動版 `var(--section-space)` 覆寫，改為 `8px`，避免手機版重新出現過大的上方空白。
  - 已驗證：`git diff --check` 通過。
  - 未驗證：本次尚未進行實際手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：縮短 Services 優勢區塊與上方內容的距離
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：將 `.services-advantages` 上方 padding 調整為 `8–20px`，優勢 band 上方 margin 調整為 `8–20px`；保留區塊內部標題、背景圖與卡片間距。
  - 已驗證：CSS 值已更新；`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整 Services 我們的優勢區塊寬度
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：深色優勢區塊改用與主要內容一致的 `content-padding` 與 `content-max-width`，不再左右滿版；保留內部內容左右 padding、背景圖與三欄／手機排列。
  - 已驗證：CSS 已設定優勢 band 自動置中並採用共用內容寬度；`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除行動版 Services claim 空白區間
  - 範圍：`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：刪除行動版 service section grid 中殘留的 `claim` 空白列，服務標題後直接銜接深色服務說明文字。
  - 已驗證：行動版 grid areas 不再包含 `claim`；`git diff --check` 通過。
  - 未驗證：本次尚未進行實際手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除 Services 服務區塊 claim 並加深內容文字
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：移除三個服務區塊的 `service-section__claim`，並將服務說明段落與主要服務項目清單文字改為 `var(--color-ink)` 深色；保留 eyebrow、標題、頁籤與圖片輪播。
  - 已驗證：`service-section__claim` 已無 HTML／CSS 使用；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：恢復 Services 服務切換選單
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`wwwroot/js/pages/services.js`、`TODO.md`。
  - 完成：移除一次展開模式新增的快速導覽區塊，恢復三個服務 tab／tabpanel、URL hash、鍵盤左右切換與預設顯示倉儲物流；圖片輪播行為保留。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check`，並確認 tab／tabpanel 結構與 `setupServiceTabs()` 已恢復。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、切換互動、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：新增 Services 頁面服務項目快速導覽
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`TODO.md`。
  - 完成：在 Hero 下方新增「服務項目」區塊，以倉儲物流、貨櫃清洗與維修、機具維修與銷售三個 Phosphor 圖示連結快速跳轉；未點擊時依文件順序先顯示倉儲物流。
  - 已驗證：三個連結分別指向 `#warehousing`、`#terminal-handling`、`#maintenance`；`node --check wwwroot/js/pages/services.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、錨點跳轉視覺位置、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：Services 改為一次呈現全部服務內容
  - 範圍：`wwwroot/services.html`、`wwwroot/css/pages/services.css`、`wwwroot/js/pages/services.js`、`TODO.md`。
  - 完成：移除服務頁籤切換與面板隱藏機制，依序呈現倉儲物流、貨櫃清洗與維修、機具維修與銷售；保留各服務區塊的文字、優勢、圖片輪播、箭頭、圓點、拖曳與既有導覽連結。
  - 參考方向：依 YES Logistics 服務頁採用分類後連續展示各服務詳細內容的資訊架構調整。
  - 已驗證：`node --check wwwroot/js/pages/services.js`、`git diff --check`；已確認 HTML 不再使用服務 tab／tabpanel 切換屬性。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、輪播互動、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：Services 我們的優勢標題移入圖片區
  - 範圍：services.html、wwwroot/css/pages/services.css、TODO.md。
  - 已完成：三個「我們的優勢」區塊移除 OUR ADVANTAGES 英文眉標，中文標題改置於圖片遮罩內並位於優勢內容上方。
  - 未驗證：桌機、手機、平板、實體裝置與其他瀏覽器實際呈現。

- [x] 2026-08-19：職業安全衛生內文標題進場動畫
  - 範圍：occupational-safety.html、occupational-safety.css、TODO.md。
  - 已完成：安全，是每一項作業的前提標題套用與首頁 Hero 相同方向的淡入上移動畫，並支援 prefers-reduced-motion。
  - 未驗證：手機、平板、實體裝置與其他瀏覽器實際呈現。

- [x] 2026-08-19：職業安全衛生 Hero 圖片恢復原本裁切設定
  - 範圍：occupational-safety.css、TODO.md。
  - 已完成：桌機與手機 Hero 圖片容器恢復 16:9，圖片位置恢復為 center 0%。
  - 未驗證：手機、平板、實體裝置與其他瀏覽器實際呈現。

- [x] 2026-08-19：職業安全衛生內文圖片快速重新整理穩定化
  - 範圍：occupational-safety.html、TODO.md。
  - 已完成：內文作業圖片改為 eager 載入與 sync 解碼，降低快速重新整理時圖片解碼造成的閃動。
  - 未驗證：不同網路速度、手機、平板與實體裝置實際呈現。

- [x] 2026-08-19：職業安全衛生全頁圖片載入穩定化
  - 範圍：occupational-safety.html、TODO.md。
  - 已完成：Hero、內文與專業證照卡片圖片統一改為 eager 載入與 sync 解碼，降低快速重新整理時圖片依序解碼造成的抖動。
  - 未驗證：不同網路速度、手機、平板與實體裝置實際呈現。

- [x] 2026-08-19：全站 HTML 圖片載入策略統一
  - 範圍：wwwroot/*.html、TODO.md。
  - 已完成：其他頁面所有 HTML 圖片統一補上 loading="eager" 與 decoding="sync"，避免快速重新整理時圖片依序載入與解碼造成抖動。
  - 未驗證：不同網路速度、手機、平板、實體裝置與其他瀏覽器實際呈現。

- [x] 2026-08-19：調整職業安全衛生專業證照卡片圖示
  - 範圍：`wwwroot/occupational-safety.html`、`TODO.md`。
  - 完成：ISO 45001 使用盾牌、安全守護使用安全帽、重機具使用齒輪、物流樞紐使用貨件圖示；保留卡片內容、圖片、輪播與既有圖示樣式。
  - 已驗證：本地 Phosphor 圖示 class 與 codepoint 皆有專案既有使用依據；`node --check wwwroot/js/pages/occupational-safety.js`、`git diff --check` 通過。
  - 未驗證：本次尚未進行桌機／手機實際瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：專業證照卡片改為純白圖示資訊卡
  - 範圍：`wwwroot/occupational-safety.html`、`wwwroot/css/pages/occupational-safety.css`、`TODO.md`。
  - 方向：卡片保留頂部橫幅圖片，圓形圖示跨接圖片與白色內容區；並以藍色圓形白色圖示、白色圓弧外框、短底線、藍色勾選 bullet、變數圓角、柔和陰影與 hover 加深組成資訊卡；後三張圖片套用一致的深藍色調遮罩，ISO 證書圖片維持原色；保留 4 張卡片內容與水平輪播行為。
  - 已驗證：桌機瀏覽器確認四張卡片圖片均顯示、後三張圖片有遮罩且 ISO 圖片沒有遮罩、圖片比例為 3 / 1、icon 約一半壓在圖片上且有白色外框、標題獨立下移 20px 並在白底標題區內對齊、卡片使用至少 12px 的變數圓角且裁切生效、卡片陰影為 0 4px 12px 8%，安全守護者／重機具達人裁切位置為目前頁面設定；node --check wwwroot/js/pages/occupational-safety.js、git diff --check 通過。
  - 未驗證：本次未重新進行手機／平板實際渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：首頁 Hero 左下角同步改為直角
  - 範圍：`wwwroot/css/pages/home.css`、`TODO.md`。
  - 完成：首頁 `.home-hero` 桌機與手機版移除左下角圓角，保留右下角圓角與橘色底線，與共用內頁 Hero 規則一致。
  - 已驗證：本機首頁桌機頁面確認 `.home-hero` 左下角為 `0px`、右下角為 `52px`；`git diff --check`。
  - 未驗證：本次未重新進行手機／平板完整視覺渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：共用 Hero 橘色線條改為左下角直角
  - 範圍：`wwwroot/css/components/page-hero.css`、`TODO.md`。
  - 完成：所有共用 `.page-hero` 的桌機與手機版移除左下角圓角，保留右下角圓角與橘色底線。
  - 已驗證：本機桌機頁面確認 `.page-hero` 左下角為 `0px`、右下角為 `52px`；`git diff --check`。
  - 未驗證：本次未重新進行手機／平板完整視覺渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：將「地理優勢」標題改為左對齊
  - 範圍：`wwwroot/css/pages/operational-resources.css`、`TODO.md`。
  - 完成：僅調整地理優勢區塊的標題、底線與說明文字為左對齊；距離節點網絡仍維持置中對稱。
  - 已驗證：本機頁面確認地理優勢標題 `text-align: left`、標題 margin 左側為 `0px`，距離節點仍為 grid；`git diff --check`。
  - 未驗證：本次未重新進行桌機／手機完整視覺渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：將營運資源區塊標題改為「地理優勢」
  - 範圍：`wwwroot/operational-resources.html`、`TODO.md`。
  - 完成：移除 `LOCATION` 英文眉標，中文標題改為「地理優勢」；保留原有說明與距離節點內容。
  - 已驗證：搜尋確認頁面只保留「地理優勢」中文標題、已移除 `LOCATION`；`git diff --check`。
  - 未驗證：本次未重新進行桌機／手機瀏覽器渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：調整地理位置區塊上下留白
  - 範圍：`wwwroot/css/pages/operational-resources.css`、`TODO.md`。
  - 完成：桌機將說明與距離節點間距調整為 `48–56px`，區塊底部留白調整為 `64–80px`；手機保留緊湊上方間距並補足底部留白。
  - 已驗證：`git diff --check`；本機 391px 視窗確認手機版底部留白為 `48px`、上方節點間距為 `14px`，地圖仍未出現。
  - 未驗證：本次未重新以桌機／平板實際視窗渲染、實體裝置、其他瀏覽器與人工無障礙驗收；桌機目標值已依 CSS 設定為上方 `48–56px`、下方 `64–80px`。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：移除地理位置區塊下方的 Google 地圖
  - 範圍：`wwwroot/operational-resources.html`、`wwwroot/css/pages/operational-resources.css`、`TODO.md`。
  - 完成：移除 Google Maps iframe 與其專屬桌機／手機版 CSS；保留地理位置說明、距離節點與中央 logo 動畫。
  - 已驗證：搜尋確認 HTML／CSS／JS 已無 Google Maps 與地圖 selector；`git diff --check`；本機頁面確認地圖數量為 0，地理位置內容與中央 logo hub 仍存在。
  - 未驗證：本次未以實際手機／平板視窗渲染、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-19：為地理位置中央 APLI logo 加入持續脈衝光暈動畫
  - 範圍：`wwwroot/css/pages/operational-resources.css`、`TODO.md`。
  - 完成：中央 logo 容器加入較霧化且明暗差異更明顯的呼吸式光暈，logo 同步做輕微明暗變化；保留原有連線、距離節點與手機版隱藏中央 hub 的行為；支援 `prefers-reduced-motion: reduce`。
  - 已驗證：`git diff --check`；獨立輸出目錄 Release 建置成功（0 errors、1 個既有 MSBuild 路徑警告）；本機 `operational-resources.html` 桌機渲染確認 hub 與 logo animation 名稱生效，並取樣確認光暈與透明度會隨時間變化。
  - 未驗證：本次未以實際手機／平板視窗渲染、實體裝置、其他瀏覽器與人工無障礙驗收；原輸出目錄建置仍受既有程序鎖定 DLL 影響。
  - 狀態：程式修正完成，待提交；未自行 push。

- [x] 2026-08-18：移除未使用的 CSS 變數
  - 範圍：wwwroot/css/base/tokens.css、wwwroot/css/pages/operational-resources.css、wwwroot/css/pages/occupational-safety.css、wwwroot/css/pages/services.css、TODO.md。
  - 完成：移除未被 CSS 實際引用的字體、卡片陰影、Hero 標題、物流距離透明度與頁面間距變數；保留由 about.js 動態設定且 CSS 有讀取的 --about-certification-event-delay 與 --certification-progress。
  - 已驗證：重新掃描 CSS 變數後，沒有定義但未以 var() 引用的 CSS 變數；git diff --check。
  - 未驗證：本次未重新進行瀏覽器桌機／行動版、實體裝置、其他瀏覽器與人工無障礙驗收。
  - 狀態：程式修正完成，待提交；未自行 commit 或 push。


## 待處理事項

- [ ] 待辦：補做平板介面尺寸的視覺驗證
  - 建議檢查：平板直向／橫向尺寸下的 Header、漢堡選單、Hero、內容區塊與 Footer 排版。


- [ ] 統一處理全站正文與主要按鈕 hover 的文字色彩對比。
  - 發現：`--color-muted: #81817e` 對白底約 3.91:1；主要按鈕白字對 `--color-primary: #f58214` hover 背景約 2.60:1，均有一般文字 WCAG AA 對比風險。
  - 範圍：屬 `tokens.css` 與共用按鈕元件的全站決策，不在單一 `affiliates.html` 頁面私自改色；後續需同步檢查所有使用位置與品牌視覺。


- [ ] 統一頁籤元件在停用 JavaScript 時的內容可讀性策略。
  - 發現：`affiliates.html`、Services 與 Milestones 等頁籤元件會以 `hidden` 隱藏非首個面板；停用 JavaScript 時無法展開其餘內容。
  - 範圍：屬全站頁籤的漸進增強策略，後續應統一處理，避免只在單一頁面建立不同模式。


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


- [ ] 以舊版專案逐頁比對剩餘頁面內容區，確認文字大小、粗細、間距、按鈕、動畫、圖片位置與 RWD。
  - 建議順序：`about.html`、`milestones.html`、`operational-resources.html`、`services.html`、`occupational-safety.html`、`news.html`、`news-detail.html`、`join.html`、`affiliates.html`、`contact.html`、`privacy.html`。
  - 驗證：尚未進行本輪逐頁驗收。

- [ ] 確認公開頁面是否維持 `wwwroot/*.html`，或逐步移轉為 Razor Pages；未確認前不進行大規模路由重構。

- [ ] 為首頁補做 390px 與 320px 實際渲染檢查，確認輪播、水平溢位、CTA 裁切與文字換行。

- [ ] 確認正式環境 HTTPS 憑證與部署設定；Development 已維持 HTTP 啟動，不再因找不到 HTTPS 連接埠觸發受限 Windows 帳號的 EventLog 錯誤。

- [ ] 完成主要頁面後安排跨瀏覽器、實體裝置與人工無障礙驗收。


- [ ] 再調淡 About 經營理念圖片遮罩。
  - 範圍：`wwwroot/css/pages/about.css`。
  - 內容：將 `philosophy-gallery__overlay` 漸層由 48%／4% 調整為 32%／0%，讓背景圖片更清楚。
  - 已驗證：`node --check wwwroot/js/pages/about.js`；暫存差異 `git diff --cached --check`；`git status --short`。
  - 未驗證：`dotnet build -c Release` 因既有 `.NET Host (PID 21820)` 鎖定 `bin\Release\net8.0\apli-website-rebuild.dll` 而失敗；桌機／手機瀏覽器渲染、圖片清晰度、hover／focus 實際互動、實體裝置、跨瀏覽器與人工無障礙驗收；完整工作樹 `git diff --check` 仍受保留中的 `about.html` 與 `affiliates.html` 既有 trailing whitespace 影響。
  - 更新：2026-08-11。狀態：已提交，Commit：`87b2ba3`。


- [ ] ��b���D�GAbout �g��z���e�Y data-philosophy-image �����æ��h�l
  - �d��Gwwwroot/about.html�Bwwwroot/js/pages/about.js�Bwwwroot/css/pages/about.css�C
  - �����GJS �|���� [data-philosophy-image] �� data-active �ݩʡA�� CSS �����ϥ� button[data-philosophy-panel] ���I���� + flex-grow ������ܡA���w�� [data-philosophy-image] �g����˦��C�ݽT�{ HTML �O�_���O�d�Ӥ����A�Y�L�ݨD�i���� JS �����{���X�C
  - �����ҡG�s�����}�o�u���ˬd DOM ���c�BMutationObserver �ʴ��ݩ��ܤơB�L JS ���Ŧ欰�C


- [ ] ��b���D�G�ɶ��b�i�}���s .is-expanded class �L���� CSS
  - �d��Gwwwroot/js/pages/about.js (l.115)�Bwwwroot/css/pages/about.css�C
  - �����GupdateToggleButton() �|�b toggle ���s���� .is-expanded class�A�� CSS �L .about-certifications-toggle.is-expanded ��ܾ��C�ݨM�w�G���� JS �Ӧ�B�θɤW�����˦��C
  - �����ҡGConsole ���� class �����欰�B��ı�T�{�O�_�ݭn�B�~�˦��C


- [ ] 潛在問題：無 JS 時經營理念與時間軸內容可能全隱藏
  - 範圍：wwwroot/css/pages/about.css、 wwwroot/about.html。
  - 說明：經營理念說明文字依賴 [aria-expanded="true"] 顯示（CSS l.78），時間軸事件依賴 .is-visible 顯示（CSS l.120），兩者皆需 JS 加上。無 JS 環境下內容可能不可見，違反漸進增強原則。
  - 待驗證：停用 JS 重新載入頁面檢查內容可讀性、考慮在 CSS 加入預設顯示規則（如 :not([data-js-enabled]) 或預設 .is-visible）。

## 紀錄規則

- 待處理使用 `- [ ]`，完成使用 `- [x]`。
- 每個項目記錄範圍、日期與驗證狀態。
- 尚未實際驗證的內容必須標示「未驗證」。
- 已完成但尚未 commit 的內容必須標示「待提交」。
- 建立 commit 後補上 commit hash。
- 不把桌機瀏覽器檢查當成手機、跨瀏覽器、實體裝置或人工無障礙驗收。
- 新發現的問題與頁面差異必須加入本檔案，不只記錄在聊天或 commit 訊息。
