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

## 2026-09-08 Careers 招募文案字體與尺寸
- `.recruitment-copy` 改用 `var(--font-heading)`（Noto Serif TC），並以響應式尺寸放大至 `clamp(1.375rem, 1.8vw, 1.75rem)`。
- 更新 Careers CSS cache key；未改動文案、連結或其他區塊。
- 已驗證：本機靜態 Careers 頁、Edge 1440／390px；計算字體皆為 `"Noto Serif TC", "Songti TC", serif`，字号分別為 25.92／22px，頁面無水平溢出；`git diff --check` 通過。
- 未驗證：本次靜態環境未載入外部 Google Noto Serif TC 字體檔，正式環境的字體網路載入與其他瀏覽器仍待確認。
- 未 commit 或 push。

## 2026-09-08 Careers 招募按鈕內距
- `.recruitment-link` 左右 padding 由 18px 調整為 12px；未改動按鈕寬度、文字、排列與上下 padding。
- 更新 Careers CSS cache key。
- 已驗證：本機靜態 Careers 頁、Edge 1440／390px；兩個按鈕的左右 padding 皆為 12px，頁面無水平溢出；`git diff --check` 通過。
- 未 commit 或 push。

## 2026-09-08 Careers 招募按鈕外框寬度
- 因固定寬度會抵消 padding 縮短的外觀效果，`.recruitment-link` 寬度由桌機 220px／手機 280px 收斂為 200px／260px；左右 padding 維持 12px。
- 更新 Careers CSS cache key。
- 已驗證：本機靜態 Careers 頁、Edge 1440／390px；兩個按鈕寬度分別為 200／260px，左右 padding 皆為 12px，頁面無水平溢出。
- 未 commit 或 push。

## 2026-09-08 Careers 招募按鈕整體尺寸
- `.recruitment-link` 再縮小為桌機 180px／手機 240px，padding 調整為上下 12px、左右 10px；未改動文字與排列。
- 更新 Careers CSS cache key。
- 已驗證：本機靜態 Careers 頁、Edge 1440／390px；兩個按鈕尺寸分別為 180×50／240×50px，padding 皆為上下 12px、左右 10px，頁面無水平溢出。
- 未 commit 或 push。

## 2026-09-08 News 卡片標題字體尺寸
- `.news-card__title` 桌機字級調整為 `clamp(1.125rem, 1.4vw, 1.375rem)`，手機調整為 `1.125rem`；未改動卡片內容、圖片、排列與行數限制。
- 更新 News CSS cache key。
- 已驗證：本機靜態 News 頁、Edge 1440／390px；News CSS 正確載入新 cache key，桌機／手機規則分別生效，頁面無水平溢出。
- 未驗證：靜態伺服器未提供 `/api/public/news`，因此未生成實際新聞卡片；需在 ASP.NET 執行環境補做動態資料畫面確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容區最小高度
- `.news-detail` 增加響應式最小高度：桌機 `clamp(560px, 60vh, 720px)`，手機 520px；內容較長時可自然延伸。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片或 Footer。
- 已驗證：待補 ASP.NET 動態新聞詳細頁的桌機／手機實際渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容區背景
- `.news-detail__header` 與 `.news-detail__layout` 套用 `var(--color-surface-subtle)` 淺灰背景；返回按鈕所在的 `.news-detail` 外層維持原背景，不包含按鈕。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片或 Footer。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；標題／內容區為 `rgb(245, 245, 245)`，返回按鈕維持透明背景，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的實際內容高度與圖片狀態仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容區內距
- `.news-detail__header` 與 `.news-detail__layout` 增加響應式水平內距，桌機最多 32px、手機約 20px；保留返回按鈕與灰色內容區的分離。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片或 Footer。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；標題／內容區左右內距分別為 32／20px，返回按鈕維持透明背景，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的實際內容高度與圖片狀態仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁分隔線範圍
- 標題區底部分隔線改為只延伸至內容水平內距範圍，桌機左右縮進 32px；手機維持不顯示分隔線。
- 更新 News Detail CSS cache key；未改動背景、內容或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；無主圖背景 CSS 規則載入 64% 白色遮罩與指定圖片路徑，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，無主圖 class 的實際背景呈現仍待 ASP.NET 動態詳細頁確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁淺灰背景高度
- `.news-detail__layout` 增加最小高度：桌機 360px、手機 280px，讓內容較少時淺灰背景仍保持完整區塊；內容較長時可自然延伸。
- 更新 News Detail CSS cache key；未改動返回按鈕、分隔線或新聞內容。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；淺灰內容區最小高度規則分別為 360／280px，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的實際內容高度與圖片狀態仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁標題字重
- `[data-news-title]` 對應的 `.news-detail h1` 字重由 500 調整為 `var(--font-weight-regular)`（400）；未改動字号、字體、間距或內容。
- 更新 News Detail CSS cache key。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；`[data-news-title]` 計算字重皆為 400，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的實際內容狀態仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁與 Footer 間距
- `.news-detail` 增加響應式底部留白 `clamp(40px, 4vw, 64px)`，讓淺灰內容區與 Footer 之間保留白色間隔；未改動灰色區塊、內容或返回按鈕。
- 更新 News Detail CSS cache key。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；底部留白計算值為 57.6／40px，淺灰內容區與外層背景分離，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的 Footer 實際銜接仍待確認。
- 未 commit 或 push。

## 2026-09-08 無主圖 News 詳細頁背景圖
- `.news-detail.news-detail--without-image::before` 使用 `public/images/new/pexels-ilkinefendiyev-21134318.jpg` 作為背景圖；有主圖的詳細頁維持原背景設定。
- 更新 News Detail CSS cache key；未改動新聞內容、主圖邏輯或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；無主圖背景 CSS 規則已載入指定圖片路徑，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，無主圖 class 與背景圖片實際呈現仍待 ASP.NET 動態詳細頁確認。
- 未 commit 或 push。

## 2026-09-08 無主圖 News 詳細頁背景淡化程度
- 無主圖背景圖白色遮罩由 86% 降為 64%，提高圖片可見度；有主圖詳細頁維持原遮罩設定。
- 更新 News Detail CSS cache key；未改動灰色內容區、新聞內容或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；背景 CSS 規則載入 64% 白色遮罩與指定圖片路徑，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，無主圖 class 的實際背景呈現仍待 ASP.NET 動態詳細頁確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁共用背景圖片
- 將指定背景圖片與 64% 白色遮罩移至 `.news-detail::before` 共用規則，讓所有消息詳細頁都套用；保留 `news-detail--with-image`／`news-detail--without-image` 的內容版面邏輯。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片判斷或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；Hero 圖片成功載入，Hero 高度為 350／280px，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁背景圖片固定位置
- `.news-detail::before` 新增 `background-attachment: fixed`，讓背景圖片固定於視窗位置，保留置中與 64% 白色遮罩。
- 更新 News Detail CSS cache key；未改動內容區、圖片判斷或返回按鈕。
- 已驗證：待補桌機／手機實際動態新聞頁捲動確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁恢復 Hero 背景
- 移除 `.news-detail__header` 與 `.news-detail__layout` 的淺灰背景，恢復由 `.news-detail::before` 統一呈現的 Hero 背景；保留固定圖片、淡化、高度、間距與內縮分隔線。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片判斷或返回按鈕。
- 已驗證：待補桌機／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁恢復共用 Hero 區塊
- 移除 `.news-detail::before` 的橘色背景圖片引用，恢復 `.news-detail__header`／`.news-detail__layout` 淺灰背景。
- 在 News 詳細頁加入與其他內頁一致的 `page-hero`「最新消息」區塊，載入共用 `page-hero.css` 與 `news-hero.png`。
- 更新 News Detail CSS cache key；未刪除使用者提供的背景圖片檔，未改動新聞內容、圖片判斷或返回按鈕。
- 已驗證：待補桌機／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Hero 背景圖片
- 將共用 Hero 圖片改為 `public/images/new/pexels-ilkinefendiyev-21134318.jpg`，沿用 `page-hero` 的 Overlay、裁切與響應式高度。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片判斷或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；Hero 圖片成功載入，Hero 高度為 350／280px，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Hero 遮罩與圖片位置
- News 詳細頁 Hero 遮罩調淡為 10%／20%，圖片位置調整為桌機 `center 40%`、手機 `center 38%`，讓圖片內容往上呈現。
- 更新 News Detail CSS cache key；未改動 Hero 高度、新聞內容或內容區背景。
- 已驗證：待補桌機／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Hero 圖片裁切位置
- 因原圖上半部為淺色區域，將 Hero 圖片裁切位置調整為桌機 `center 75%`、手機 `center 70%`，讓下方橘色影像內容顯示於 Hero 區塊。
- 更新 News Detail CSS cache key；未改動遮罩、Hero 高度或新聞內容。
- 已驗證：待補桌機／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Editorial Article 版型
- Hero 下方文章區改為白底純文章排版，移除大面積淺灰 Card 感；文章閱讀寬度置中為 960px，保留淡橘分類 Badge 與淡灰 H1 分隔線。
- 依 Editorial 閱讀動線調整返回連結、Meta、H1、Divider 與正文間距；手機同步保留分隔線與閱讀寬度。
- 正文第一行與 H1 完全相同時不再重複顯示；未改動 Header、Breadcrumb、Hero、全站 container 或 typography tokens。
- 更新 News Detail CSS／JS cache key。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；文章寬度上限 960px、白底透明背景、間距與分隔線規則正確，JavaScript 語法檢查通過，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，正文首行去重與實際文章渲染仍待 ASP.NET 動態詳細頁確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容與 Footer 間距
- 恢復 `.news-detail` 底部響應式留白 `clamp(40px, 4vw, 64px)`，讓文章內容與 Footer 保持分離。
- 更新 News Detail CSS cache key；未改動 Header、Breadcrumb、Hero 或文章內部排版。
- 已驗證：待補桌機／手機實際動態新聞頁與 Footer 銜接確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容區高度
- 恢復 `.news-detail__layout` 最小高度：桌機 360px、手機 280px，避免短篇文章過快銜接 Footer。
- 更新 News Detail CSS cache key；未改動 Header、Breadcrumb、Hero 或文章閱讀排版。
- 已驗證：待補桌機／手機實際動態新聞頁與 Footer 銜接確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Editorial Header Overlap
- 文章區以負 margin 向上交疊 Hero：桌機 96px、手機 40px；Article Header 改為白底、960px 置中、無陰影／圓角／外框。
- 返回最新消息移至 Article Header 上方外側；正文沿用同一閱讀寬度，不新增第二層背景框。
- 更新 News Detail CSS cache key；未修改 Header、Breadcrumb、Hero、全站 container 或 typography tokens。
- 已驗證：待補桌機／平板／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Editorial Header overlap 微調
- Article Header overlap 增加 48px：桌機 144px、平板 112px；手機維持 40px，避免小螢幕擁擠。
- 返回最新消息移入 Article Header，置於日期／分類上方；Header／Body／返回連結皆共用 960px 左側 alignment，手機也移除 Header 水平內縮；未改動 Hero、文章 typography 或 CMS 資料。
- 更新 News Detail CSS cache key；已驗證：待補桌機／平板／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Article Header 內部間距
- 返回連結與 Meta 間距調整為 38px，Meta／H1 間距為 20px，H1／Divider 間距為桌機 30px、手機 28px；Divider／正文維持 44／40px。
- 返回箭頭向左突出 24px，返回文字、Meta、H1、Divider、正文與圖片共用同一左側基準線；未改動 Article Width、overlap、Hero 或文章 typography。
- 更新 News Detail CSS cache key；已驗證：待補桌機／平板／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁返回連結與容器位置微調
- 返回連結文字恢復與 Article 左側基準線對齊，箭頭改為獨立向左突出 24px；Meta、H1、Divider、正文與圖片 alignment 不變。
- Article Container 向下調整 24px：桌機 overlap 為 120px、平板 88px；手機維持 40px overlap，避免小螢幕交疊不足。
- 未改動 Article Width、Hero、typography 或 CMS 資料；更新 News Detail CSS cache key。
- 已驗證：待補桌機／平板／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁恢復內容區高度版本
- 恢復至內容區高度版本：移除 Article Header overlap 與箭頭突出定位，返回連結回到文章區上方；Article Container 維持 960px。
- 內容區最小高度恢復為桌機 360px、手機 280px，內容與 Footer 保留響應式間距。
- 保留白底 Editorial Article、Meta／H1／Divider 間距與正文首行去重；未改動 Header、Breadcrumb、Hero 或 CMS 資料。
- 更新 News Detail CSS cache key；已驗證：本機靜態 News Detail 頁、Edge 1440／390px；文章最小高度 360／280px、Footer 留白 57.6／40px，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁短篇消息首屏節奏
- 縮短 Hero 後至返回連結、返回連結至文章 Meta，以及標題區至正文的垂直留白，讓短篇消息更快呈現日期、分類與標題。
- 進一步收斂桌機 Article Header 上方留白，維持返回連結到日期 Meta 的緊湊閱讀節奏。
- 保留 960px Article Container、白底 Editorial Article、桌機／手機內容區最小高度與 Footer 間距；未改動 Header、Breadcrumb、Hero、文章內容或全域 typography tokens。
- 更新 News Detail CSS cache key；已驗證：待補桌機／手機瀏覽器實際渲染確認。
- 未 commit 或 push。

## 2026-09-08 News Detail Hero 顯示文章標題
- Hero 在「最新消息」下方新增目前消息的文章標題，使用小於 Hero 主標題的響應式字級，並由 News Detail API 動態帶入。
- 保留 Hero 圖片、高度、橘色底線、右下圓角與原有「最新消息」主標題；未改動 Header、Breadcrumb、Article Container 或 CMS 資料。
- 更新 News Detail CSS／JS cache key；已驗證：本機靜態 News Detail 頁、Edge 1440／390px；Hero 副標題樣式分別為 24／16px，Hero 高度與原有橘線／右下圓角保留，頁面無水平溢出。
- 未驗證：ASP.NET 動態資料實際帶入不同新聞標題的畫面，以及正式環境字體載入。
- 未 commit 或 push。

## 2026-09-08 Footer 下方區塊改為橘色線條
- 移除 `.site-footer__bottom` 的滿版橘色背景；上方改為與 Logo 下方線條同寬的淺灰線，底部恢復漸層橘色裝飾線與原有右上圓弧。
- Footer 下方文字改用深色 Footer 標題色，更新所有公開頁面的 Footer CSS cache key；未改動 Footer HTML、導覽內容或手機手風琴互動。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，淺灰上邊線與 Logo 下方線條同寬，底部漸層橘色弧形點綴正確，頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 Footer 下方區塊上下間距
- `.site-footer__bottom` 增加上下留白，桌機隱私連結同步上移，避免內容貼近底部橘色裝飾線；未改動線條寬度、漸層、右上圓弧或 Footer HTML。
- 更新所有公開頁面的 Footer CSS cache key。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，上下間距與內容／裝飾線分離正常，頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 Footer 下方區塊間距與文字對齊
- `.site-footer__bottom` 上下 padding 調整為 `8px`；隱私權政策改與 Footer copyright 共用同一個 flex 對齊流程，修正同列垂直對齊問題。
- 保留淺灰上邊線、漸層橘色底部裝飾、右上圓弧與內容容器寬度；更新所有公開頁面的 Footer CSS cache key。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，padding 8px、桌機隱私權政策與 copyright 垂直對齊，頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 Footer 橘色弧形裝飾高度
- 底部橘色漸層裝飾線高度調整為桌機 `clamp(8px, 0.7vw, 10px)`、手機 `8px`，提高右上圓弧的可見度；未改動淺灰上邊線、Footer 文字對齊或 padding。
- 更新所有公開頁面的 Footer CSS cache key。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，橘色裝飾高度與右上圓弧已放大，Footer 文字未被截切且頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 Footer 恢復原橘色裝飾高度
- 恢復上一版本的底部橘色漸層裝飾高度：桌機 `clamp(4px, 0.35vw, 6px)`、手機 `4px`；保留 padding 8px、文字對齊、淺灰上邊線與右上圓弧。
- 更新所有公開頁面的 Footer CSS cache key。
- 已驗證：`git diff --check` 通過；沿用前一版本 Edge 1440／390px 預覽結果，頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Pagination UI 樣式
- `news-pagination` 改為參考圖的無框頁碼配置：左右箭頭與一般頁碼使用既有文字 token，目前頁碼使用 `--color-surface-inverse` 圓形底搭配 `--color-text-on-dark`。
- 移除頁碼外框與目前頁底線，保留鍵盤 focus 狀態；桌機／手機分別調整間距與目前頁圓形尺寸，未改動新聞資料、分頁計算或點擊行為。
- 更新 `news.html` 的 News CSS cache key。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，確認無框頁碼、目前頁 50／44px 圓形、箭頭字型與頁面無水平溢出。
- 未驗證：ASP.NET 動態新聞資料實際渲染、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Pagination 頁碼格式
- 頁碼移除兩位數補零，改為直接顯示 `1`、`2` 等數字；未改動分頁計算、切換行為或 Pagination UI 樣式。
- 更新 `news.js` cache key。
- 已驗證：`node --check wwwroot/js/pages/news.js`、`git diff --check` 通過。
- 未 commit 或 push。

## 2026-09-08 News 預設圖片調整恢復
- 恢復至 News Pagination 頁碼格式調整完成時的狀態：預設圖片回到原本 `right center` 定位與原有預設卡片文字色彩；保留頁碼顯示 `1`、`2` 與 Pagination UI 樣式。
- 已驗證：`git diff --check`、`node --check wwwroot/js/pages/news.js` 通過。
- 未 commit 或 push。

## 2026-09-08 News Detail Hero 手機取景位置
- 手機 Hero 圖片定位由 `center 70%` 調整為 `center 60%`，與桌機採用相同垂直取景基準，降低不同裝置的顏色區域差異。
- 更新 News Detail CSS cache key；未改動 Hero 圖片、遮罩強度或文字內容。
- 已驗證：`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 其他消息區塊
- 詳細頁文章內容下方新增「其他消息」，從公開 News API 載入並排除目前文章，顯示最多 3 筆；沿用 News 列表原有 `news-card` 卡片結構與 RWD 排版。
- 支援自訂圖片、預設圖、附件標記與圖片載入失敗 fallback；相關消息載入失敗時隱藏區塊，不影響詳細頁文章。
- 更新 `news-detail.html` 的 News／News Detail CSS 與 JS cache key；未改動既有文章內容、Hero 或 Footer。
- 已驗證：`node --check wwwroot/js/pages/news-detail.js`、`git diff --check` 通過。
- 未驗證：ASP.NET 動態 API 實際回傳下的相關消息內容、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 其他消息區塊比例
- 保留原有 News 卡片比例與排版，縮小「其他消息」區塊的上下留白、標題字級及標題與卡片間距，讓文章底部的相關內容更緊湊。
- 桌機／手機分別調整區塊間距；未改動相關消息數量、排除目前文章邏輯或卡片結構。
- 更新 News Detail CSS cache key。
- 已驗證：Edge 動態頁 1440／390px，確認相關消息仍顯示 3 張卡片、桌機 3 欄、手機 1 欄且無水平溢出；`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 其他消息輪播與返回按鈕
- 移除 `.news-detail-related` 上邊線，將相關消息改為桌機每組 3 張、手機每組 1 張的左右切換輪播，卡片沿用原有 `news-card` UI 並縮小區塊最大寬度。
- 卡片下方新增「返回最新消息」按鈕，讓使用者可從詳細頁底部直接回到 News 列表；保留排除目前文章與 API 失敗隱藏區塊行為。
- 更新 News Detail CSS／JS cache key。
- 已驗證：`node --check wwwroot/js/pages/news-detail.js`、`git diff --check` 通過；Edge 動態頁桌機／手機可切換相關消息，底部返回按鈕置中且無水平溢出。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 其他消息標題對齊
- `news-detail-related__title` 左側對齊輪播視窗內第一張卡片，桌機／手機皆扣除各自的左右控制按鈕欄位與間距；未改動卡片尺寸或輪播行為。
- 更新 News Detail CSS cache key。
- 已驗證：Edge 動態頁 1440／390px，標題與第一張卡片左側對齊且頁面無水平溢出；`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 相關卡片標題字級
- 針對 `news-detail-related` 內的 `news-card__title` 增加裝置尺寸響應式字級：桌機／平板使用 `clamp`，手機使用較緊湊字級；未影響 News 列表頁卡片。
- 保留原本標題最多兩行截斷與卡片 UI；更新 News Detail CSS cache key。
- 已驗證：Edge 動態頁 1440／768／390px，確認標題字級隨 viewport 調整且頁面無水平溢出；`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 返回按鈕與 Footer 間距
- 縮短 `news-detail-related` 底部留白，讓 `news-detail-related__back button--primary` 更靠近下方 Footer；桌機／平板採響應式間距，手機調整為 24px。
- 更新 News Detail CSS cache key。
- 已驗證：Edge 動態頁 1440／768／390px，確認返回按鈕與 Footer 間距縮短且頁面無水平溢出；`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 行動版相關消息滑動
- 行動版 `news-detail-related` 的 `site-container` 改與上方內容左側對齊；相關消息改為完整橫向卡片列，單次約顯示一張半，支援原生手指滑動與 scroll snap。
- 行動版（含 768px breakpoint）隱藏左右按鈕以保留卡片寬度；桌機左右分組切換維持原本功能；更新 News Detail CSS／JS cache key。
- 已驗證：Edge 動態頁桌機／768px／390px，確認手機卡片列可橫向滑動、左側對齊且無水平溢出；`node --check`、`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 相關消息切換滑順感
- 桌機 `news-detail-related__control` 切換時加入前後方向滑入動畫；行動版 viewport 加入 smooth scroll，搭配原生手指滑動與 scroll snap。
- `prefers-reduced-motion` 時停用切換動畫與平滑捲動；更新 News Detail CSS／JS cache key。
- 已驗證：Edge 動態頁桌機／768px／390px，確認桌機控制切換、手機滑動與頁面無水平溢出；`node --check`、`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。
