# APLI 企業官網 TODO

## 待處理事項
- [x] 2026-08-28 調整首頁 Services 背景斜切：保留上方「右高左低」斜切，新增同方向的底部斜切白色層，並將 Services 內容／圖片提升至較高 z-index、以 6–10px 視覺位移輕微覆蓋底部邊界；未修改圖片尺寸、Grid 排列、Overlay、Icon 或標題。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 恢復首頁 Services 的圖片內 Overlay 版本並修正欄距：Desktop 使用 `.home-page .home-service-grid` 的 `repeat(3, minmax(0, 1fr))` 與 `gap: 24px`，三個 `.home-service-grid__card`／`article` 設為 `min-width: 0`，圖片使用 `width: 100%`、`height: 100%`、`object-fit: cover`；保留大型圖片高度、底部 gradient、完整服務文字與輕微 hover scale，未使用 `width: 33.333%`。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、瀏覽器 DOM／computed width／實際 gap 驗證與本次相關檔案 `git diff --check`；Desktop viewport 1912px 下 Grid 寬度 1460px、三個 item 約 470.66px、圖片間距均為 24px，尚未 commit。
- [x] 2026-08-28 恢復首頁 Services 項目至原始樣式：三欄圖片上方／白色文字區下方 Card、原始 border／圓角／shadow、原始 16:9 圖片比例與 Phosphor `button--text-arrow`；移除 Overlay、Desktop 放大圖片／欄距與 inline SVG 箭頭調整。僅恢復 Services，保留 About、News 與其他未提交修改。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 依 HTML／CSS cascade 分析修正首頁 Services Desktop 間距：將後置 Desktop Grid 規則改為明確 `repeat(3, minmax(0, 1fr))` 與完整 `gap: 40px`，避免欄位被同名 shorthand 或最小內容尺寸影響；更新首頁 CSS cache-busting 版本，Tablet／Mobile 間距與服務內容維持不變。未修改服務文字、圖片、箭頭或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 修正首頁 Services 三欄仍視覺貼合：Desktop 明確使用 `repeat(3, minmax(0, 1fr))` 搭配 `40px` `column-gap`，避免 `1fr` 欄位最小內容尺寸造成 Grid 橫向撐開；更新首頁 CSS cache-busting 版本，Tablet／Mobile 間距與其他 Services 內容維持不變。未修改服務文字、圖片、箭頭或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 修正首頁 Services Desktop 欄距未生效：確認前置 `gap: 32px` 被後方共用 `.home-page .home-service-grid { gap: 26px; }` 覆蓋，已將 Desktop 規則移至正確 cascade 位置並將三項服務欄距設為 `40px`；Tablet／Mobile 維持既有 responsive 間距，並更新首頁 CSS cache-busting 版本。未修改服務文字、圖片、箭頭或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁 Services 項目間距與箭頭一致性：Desktop 三欄 gap 由 24px 增加至 32px，Tablet／Mobile 維持既有 responsive 間距；三個 Services 的 inline SVG 改用與 About「了解更多」相同的細線 northeast arrow 與 `translate(2px, -2px)` hover 動畫，未修改服務文字、圖片或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 強化首頁 Services Desktop 視覺份量：服務容器最大寬度調整至 1460px、三欄 gap 為 24px、圖片高度使用 `clamp(360px, 26vw, 400px)` 並維持等高與 `object-fit: cover`；移除圓形 icon 背景／邊框，改用標題右側 18px 細線 inline SVG northeast arrow，保留完整 Overlay 文案與整張圖片連結。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 依服務圖片主體調整 Overlay 圖片裁切位置：第一張設為 `45% center`、第二張 `60% center`、第三張 `58% center`，配合 `1.35 / 1` 比例保留主要主體；未修改圖片來源、Overlay 文字或其他 Services 設計。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 提高首頁 Services 視覺份量：三張圖片統一改為 `aspect-ratio: 1.35 / 1`、保留 `object-fit: cover`／`overflow: hidden`，Overlay 文字完整保留並維持左下方，底部 padding 為 26px；將右下角提示改為 44px 半透明圓形 inline SVG 彎曲箭頭，整張圖片仍為可點擊連結，未新增編號或大型陰影。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁 Services Overlay 位置：文字群組向上約 8px、左右內距調整為 24px，底部漸層延後至圖片約 52–64% 才開始淡入並維持原有底部強度；箭頭統一固定於圖片右下角，未修改任何服務文字、圖片比例或其他 Section 設計。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁 Services 圖片高度：三張圖片統一改為 `aspect-ratio: 1.48 / 1` 並保留 `object-fit: cover` 與 `overflow: hidden`，Overlay 文字距離圖片左側／底部調整為 22px；未修改服務文字、圖片來源、欄位配置或其他 Section 設計。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 將首頁三項 Services 的既有服務名稱與完整敘述移入各自圖片左下方 overlay：保留原文不改寫、不縮寫，維持圖片 `16 / 9` 比例與整體連結；以底部漸層確保白色文字可讀性，箭頭仍與標題同行，未新增編號、Badge 或額外裝飾。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 精修首頁 Services 互動細節：移除整個服務項目的上浮效果，保留圖片 `scale(1.02)` 並由圖片容器裁切；將既有箭頭移至服務標題右側，平時低調顯示、hover／focus 時向右上位移 2px；標題底線僅依標題寬度由左至右展開。未新增編號、Badge、背景、border、shadow 或其他裝飾。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 精簡首頁 Services 三項服務展示：移除服務項目 article 的卡片背景、完整 border、圓角、陰影與整張卡片上浮效果；保留三欄／既有圖片比例、標題、說明、連結與右上角箭頭，圖片 hover 收斂為 `scale(1.02)`，未新增編號或裝飾元素。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 移除首頁 About 的 `50+ YEARS / SINCE 1973` credential 文字與所有背景 Typography HTML／CSS（Desktop、Tablet、Mobile）；保留 `ABOUT APLI`、`關於亞太`、橘色短線、公司介紹原文、CTA、右側圖片與既有版型。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 將首頁 About 的 `50+ YEARS / SINCE 1973` 從標題下方副標題改為不佔版面流的淡色背景 Typography：Desktop 配置於 About 左下方、Tablet 縮小、Mobile 隱藏，使用 Sans Serif、`pointer-events: none` 與低透明度；保留公司介紹原文、圖片、CTA、section 高度與既有版型。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置與本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 將首頁 About credential 改為單行呈現：`50+ YEARS` 與 `SINCE 1973` 改以 inline-flex 同行排列，整組改用既有 `Noto Serif TC`，保留主資訊 18–20px／600、次資訊 11–12px／字距 `.14em` 與標題下方位置；未新增背景大字或修改其他版型。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁 About 標題下方 credential：`50+ YEARS` 調整為 18–20px／600，`SINCE 1973` 維持 11–12px 並將字距調整為 `.14em`，資歷資訊至公司正文間距調整為 15px；不新增背景大字，未修改正文、圖片、欄位、section padding、CTA 或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 將首頁 About credential 改回「關於亞太」標題下方的兩行資訊：移除大型背景 Typography，將 `50+ YEARS / SINCE 1973` 放入 `.home-intro__heading`；恢復 20–22px／11–12px 的 sans-serif 層級與 3px 行距，保留完整公司介紹正文、圖片、欄位、section padding、CTA 與 RWD。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁 About 背景 Typography 的垂直位置與色彩：由 section 左下邊線上移約 100–130px，改用淡冷藍灰 `#b5c3cc` 與 `.28` 透明度，降低與正文同色造成的干擾並保留襯托感；未修改大型字級、完整兩行、正文、圖片、section 高度、欄位比例或 CTA，Tablet／Mobile 仍隱藏。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 將首頁 About 大型背景 Typography 改置於 section 左下角：從左下邊線開始呈現完整 `50+ YEARS / SINCE 1973`，保留原字級、字體、`.035` 透明度與正文／圖片上層關係；Tablet／Mobile 隱藏，不改變 section flow、高度、圖片、欄位比例或 CTA。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 移除首頁 About 橘色短線下方殘留的 `.home-intro__subtitle` 小字元素：保留完整公司介紹正文與 section 級大型 `50+ YEARS / SINCE 1973` 背景 Typography，未修改 About 版型、圖片、欄位比例、CTA 或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁 About 大型背景 Typography 位置：確認沒有獨立副標題小字後，將完整 `50+ YEARS / SINCE 1973` 向右移約 80–120px，保留原字級、字體與 `.035` 透明度；背景可延伸至圖片左側，正文／標題維持上層避免閱讀干擾，Tablet／Mobile 隱藏。未修改正文、圖片、section 高度、欄位比例或 CTA。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 放大首頁 About section 背景 Typography：保留完整公司介紹正文，將 `50+ YEARS` 調整為 110–140px 粗體、`SINCE 1973` 調整為 18–22px，整組以深藍灰 `opacity: .035` 置於中央偏右並完整顯示；Desktop 顯示，Tablet／Mobile 隱藏，不影響原有 flow、高度、圖片、欄位比例或 CTA。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 將首頁 About credential 改為 section 級大型背景 Typography：移出 `.home-intro__body`，以獨立 absolute layer 呈現 `50+ YEARS`（80–110px）與 `SINCE 1973`（16–20px），使用深藍灰 `opacity: .05`、位於中央偏右且低於正文／圖片；Tablet／Mobile 隱藏，不參與 grid 排版或增加 section 高度。保留完整公司介紹中的成立年份／五十年敘述，未修改主標題、CTA 或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁 About 背景 credential 的可見性與位置：將 `50+ YEARS / SINCE 1973` 置於左側文字欄右側並垂直置中，透明度由 `.12` 提升至 `.2` 以維持低調但可辨識；窄版回到文字欄上方定位，未改變 section 高度、圖片、欄位比例、正文或 CTA。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 恢復首頁 About 正文中的成立年份與五十年敘述，並將 `50+ YEARS / SINCE 1973` 改為左側文字欄內的低對比背景 credential：移出正文流位置、使用 `opacity: .12`，並以 `aria-hidden` 避免資訊重複；未改變 About section、圖片、欄位比例、CTA 或其他首頁區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁 About 企業資歷群組間距：`50+ YEARS` 維持 20–22px 並改為 600 字重，與 `SINCE 1973` 的排列間距調整為 3px，資歷群組與正文間距調整為 12px；未改變主標題與副標題群組距離、section 高度、圖片、欄位比例、CTA 或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 將首頁 About 副標題改為低調企業資歷資訊：以同一 `.home-intro__subtitle` 群組呈現 `50+ YEARS` 與 `SINCE 1973`，使用 Noto Sans TC sans-serif、20–22px／500 與 11–12px／0.12em，兩行間距 4px，與正文間距 16px；保留主標題、橘色短線、圖片、欄位、CTA、section padding 與 RWD。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 修正首頁 About 內容群組間距疊加：確認次標語排除通用正文 selector 後遺留瀏覽器 `<p>` 預設上下 margin，造成標題／次標語與正文間距未如預期；已補回次標語 `margin: 0`，Desktop heading→body 設為 13px、次標語→正文 13px、正文→CTA 19px，並更新 `home.css` cache-busting 版本。未改變 section padding、高度設定、圖片或欄位比例。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 確認首頁 About 間距調整未反映於畫面：原始碼中的 `.home-intro__body`、次標語與 CTA 間距已正確，但 `index.html` 使用固定舊版 `home.css` query version，可能導致瀏覽器沿用舊 CSS；已更新 About 使用的 CSS cache-busting 版本，未修改 section 高度、圖片或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 再次收緊首頁 About 左側內容群組：主標題橘色短線至次標語約 22–26px，次標語至正文 13px，正文至「了解更多」約 21px；次標語改回 500 字重並維持較深的深藍灰色與 `.02em` 字距，未改變 section 高度、上下 padding、圖片或欄位比例。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁 About 左側文字群組間距：Desktop 將主標題橘色短線至次標語的欄間距收斂至約 30–36px，次標語至正文維持約 20px，正文至「了解更多」收斂至約 26px；次標語字距調整為 `.02em`，Tablet／Mobile 沿用較緊湊的既有 RWD 間距，未改變 section 高度、上下留白、圖片或欄位比例。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 修正首頁 About 次標題樣式未生效：排除通用正文 selector 對 `.home-intro__subtitle` 的覆蓋，讓 20–22px 與 600 字重設定實際套用；未修改圖片、欄位、CTA 或其他區塊。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁 About 次標題視覺層級：將「自 1973 年起，專注物流服務超過 50 年」放大至約 20–22px，並提高至 600 字重；維持 Noto Serif TC、深藍灰色、既有間距、圖片、欄位、CTA 與 RWD。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁 About 次標題與正文層級：新增「自 1973 年起，專注物流服務超過 50 年」並沿用 Noto Serif TC、18–20px、500 字重與深藍灰色；同步移除正文第一句重複的成立年份／五十年資訊，保留圖片、欄位、CTA 與 RWD。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁 About 文字型 CTA：將「了解更多」文字與 northeast arrow inline SVG 的間距限定為 8px，讓文字與 icon 維持同一 CTA 的整體感；未影響其他按鈕。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 修正首頁 About「了解更多」CTA icon：將原本非 northeast 方向的實心外連圖示改為 24px viewBox 的細線 `↗` inline SVG，hover／focus 維持約 2px 右上位移與 220ms transition；保留橘色底線與文字 CTA，不影響其他按鈕。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 將首頁 About「了解更多」改為文字型 CTA：移除深藍實心背景與按鈕外框，保留文字及右側 inline SVG icon，使用深藍灰 16px／500 字重與低調橘色底線；hover／focus 時底線由左向右延伸、箭頭輕微右上位移，並同步修正行動版 touch override。未影響其他首頁按鈕。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 依需求恢復首頁「關於亞太」加入副標題前的版型：移除成立年份副標題，標題回到左側文字欄，保留圖片縮小、右下對齊與左寬右窄比例；未修改其他首頁區塊。已完成本次相關 HTML／CSS `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁「關於亞太」標題區域：標題 Grid 跨滿左右兩欄並置中，副標題「成立於 1973 年，至今超過 50 年」放大至約 20–24px 並維持 `Noto Serif TC`；下方保留左側文字、右下圖片與窄版直向 RWD。已完成本次相關 CSS `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁「關於亞太」標題與副標題：標題及橘色底線於左側文字欄置中，段落上方新增「成立於 1973 年，至今超過 50 年」副標題並沿用 `Noto Serif TC` 標題字體；保留圖片位置、既有文案、連結與 RWD。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 微調首頁「關於亞太」區塊比例：Desktop 左側文字欄加寬、右側圖片限制最大寬度為 520px 並維持右下對齊，降低圖片與文字 1:1 的視覺重量；Tablet／Mobile RWD、文案、圖片與其他區塊不變。已完成本次相關 CSS `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁「關於亞太」區塊版型：Desktop 將文字內容配置於左側，圖片移至右欄右下方並與文字區底部對齊，保留既有文案、圖片、連結與 reveal 行為；Tablet／Mobile 維持文字在上、圖片在下的 RWD 閱讀順序。已完成本次相關 CSS `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁 News Carousel 行動版導航：Mobile 每頁仍依 1 張 Card 計算，但改以單一 `01 / 08` 數字 counter 取代逐則 indicator，避免公告增加時產生過多 icon；Desktop／Tablet 保留 occupational-safety 同款 page indicator，並保留箭頭、drag、touch、scroll snap 與實際 page position。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check` 與 `git status --short`；全域 `git diff --check` 仍受既有 `wwwroot/js/pages/about.js:116` trailing whitespace 影響；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 修正首頁 News Carousel 在僅有 4 則新聞時箭頭無法移動：因 Desktop 約顯示 3.5 張 Card 仍有實際水平溢出，控制器現在將 scroll 尾端納入 page positions，讓 Next 可移至實際最後位置；保留既有 SVG、Card、drag、touch、scroll snap 與 progress／indicator 邏輯。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check` 與 `git status --short`；全域 `git diff --check` 仍受既有 `wwwroot/js/pages/about.js:116` trailing whitespace 影響；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 移除首頁最新消息公開列表的 60 秒瀏覽器快取：前端 `/api/public/news?limit=8` 使用 `cache: "no-store"`，列表 API 回應改為 `Cache-Control: no-store`，讓後台新增公告後返回首頁可重新取得最新資料；未調整新聞內容、limit=8、排序、Carousel scroll 或其他公開新聞端點。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置、本次相關檔案 `git diff --check` 與 `git status --short`；全域 `git diff --check` 仍受既有 `wwwroot/js/pages/about.js:116` trailing whitespace 影響；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 恢復首頁 News Carousel Navigation 為 `occupational-safety` 專業證照區塊同款：下方透明 Previous／Next 按鈕與圓點／active 短線 indicator，移除外側箭頭與 progress bar 排版；保留首頁 inline SVG 箭頭、實際 Card position、drag、touch、scroll snap 與 RWD 導覽邏輯。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置（0 警告／0 錯誤）與本次相關檔案 `git diff --check`；全域 `git diff --check` 仍受既有 `wwwroot/js/pages/about.js:116` trailing whitespace 影響，未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 重新安排首頁 News Carousel Navigation：Desktop 將 Previous／Next inline SVG 箭頭移至 carousel wrapper 左右並垂直置中，Tablet／Mobile 依既有 `≤980px` touch layout 隱藏箭頭，progress 保留於 Card 下方置中；保留既有 drag、touch、scroll snap、progress 計算與 Card 尺寸。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置（0 警告／0 錯誤）與本次相關檔案 `git diff --check`；全域 `git diff --check` 仍受既有 `wwwroot/js/pages/about.js:116` trailing whitespace 影響，未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 修正首頁 News Carousel Previous／Next 箭頭未顯示：確認原本動態 Button 只有依賴 Phosphor glyph mapping 的 `<i class="ph ph-caret-left/right">`，改為 inline SVG 左右箭頭；不調整 scroll、drag、touch、progress 或 News Card 邏輯。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置（0 警告／0 錯誤）與本次相關檔案 `git diff --check`；全域 `git diff --check` 仍受既有 `wwwroot/js/pages/about.js:116` trailing whitespace 影響，未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 重新設計首頁 News Carousel 導航控制：桌機／平板／手機統一使用上一則箭頭、實際 scroll progress bar、下一則箭頭，移除 desktop dots 與 mobile `01 / 08` counter；保留既有 drag、touch、scroll snap、RWD 與依實際 Card 位置的箭頭導覽。已完成 `node --check wwwroot/js/pages/home.js`、Release 建置（0 警告／0 錯誤）與本次相關檔案 `git diff --check`；全域 `git diff --check` 仍受既有 `wwwroot/js/pages/about.js:116` trailing whitespace 影響，未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 調整首頁 News Carousel 資料與分頁：首頁透過公開新聞 API 的 `limit=8` 僅取得最新 8 則，桌機每頁依 4 則計算 page indicator，手機改顯示 `01 / 08` 格式並依實際 scroll／drag index 更新；完整 News List 不帶 limit，後端仍回傳完整公開資料。已完成 `node --check`、Release 建置與 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
- [x] 2026-08-28 修正首頁 News Carousel 分頁指示器同步：以 carousel 實際 `scrollLeft`、`scrollWidth - clientWidth` 與各頁首張卡片位置計算最近 page index，並以 `requestAnimationFrame` 節流 scroll 更新；拖曳、touch、trackpad、scroll 與點擊 indicator 共用同一套狀態。已完成 `node --check`、Release 建置與 `git diff --check`；未進行瀏覽器／實機驗證，尚未 commit。
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
