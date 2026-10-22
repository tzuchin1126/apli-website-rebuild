# Careers 頁面版面規格

本文件記錄 `wwwroot/careers.html` 搭配 `wwwroot/css/pages/careers.css`、全域 `tokens.css` 的主要版面數值。數值以 CSS token 為來源，避免日後只改文件而沒有同步修改樣式。

## 量測基準

- 桌機基準：1366px viewport 寬度。
- 手機基準：390px viewport 寬度。
- 這份資料是依 CSS 宣告與 token 推算的靜態規格，不代表已完成瀏覽器截圖或實機驗收。
- `clamp()` 的值會隨 viewport 改變；下表列出基準寬度的實際值。

## 桌機基準（1366px）

| 項目 | 數值 | 來源／說明 |
| --- | ---: | --- |
| Hero 高度 | 350px | `--page-hero-height` 上限 |
| Hero 到「加入亞太」區塊上緣 | 40px | `.join-career { padding-top: var(--section-space) }` |
| 介紹區內部上下留白 | 64px | `.join-intro { padding-block: var(--section-space-sm) }` |
| Hero 後到圖片／文字內容上緣 | 104px | 40px + 64px，依目前巢狀結構計算 |
| 介紹圖片與文字欄距 | 40px | `.join-intro { gap: var(--section-heading-content-gap) }` |
| 區塊之間距 | 40px | `--section-space` |
| 「加入亞太」標題字級 | 約 31.4px | `--font-size-section-heading` |
| 「加入亞太」標題字重 | 600 | 1024–1439px 時 `--font-weight-section-heading` 使用 medium |
| 標題行高 | 1.2 | `--line-height-heading` |
| 標題與裝飾線距離 | 12px | `--section-heading-accent-gap` |
| 裝飾線寬度／高度 | 120px／3px | `.join-section-heading h2::after` |
| 標題區與敘述間距 | 20px | `.join-section-heading--left { margin-bottom: var(--section-content-gap) }` |
| 敘述文字大小 | 17px | `--font-size-body` |
| 敘述文字粗細 | 400 | `--font-weight-regular`，body 預設值 |
| 敘述行高 | 1.6 | `--line-height-body` |
| 敘述與按鈕間距 | 20px | `.join-intro-copy { margin-bottom: var(--section-content-gap) }` |
| 福利標題與 tab 列間距 | 40px | `--section-heading-content-gap` |
| 福利 tab 最小高度 | 56px | `.benefits-tabs__tab` |
| 福利列內距 | 20px | `.benefits-list__row { padding: var(--section-content-gap) }` |
| 招募區上下留白 | 約 95.6px | `--page-content-start-space` 在 1366px 的 clamp 值 |
| 招募區左右留白 | 24px | `--site-padding` 上限 |
| 招募文案字級 | 24px | `--font-size-h3` 上限值 |

## 手機基準（390px）

| 項目 | 數值 | 來源／說明 |
| --- | ---: | --- |
| Hero 高度 | 280px | `--page-hero-height` 下限 |
| Hero 到「加入亞太」區塊上緣 | 24px | `--section-space` 下限 |
| 介紹區內部上下留白 | 24px | 手機 `.join-intro { padding-block: var(--section-space) }` |
| Hero 後到圖片／文字內容上緣 | 48px | 24px + 24px |
| 圖片與文字上下間距 | 20px | 手機 `.join-intro { gap: var(--section-content-gap) }` |
| 「加入亞太」標題字級 | 30px | `--font-size-section-heading` 下限 |
| 「加入亞太」標題字重 | 700 | `--font-weight-section-heading` 預設值 |
| 標題與裝飾線距離 | 8px | `--section-heading-accent-gap` 下限 |
| 敘述文字大小 | 15px | 1023px 以下覆寫 `--font-size-body` |
| 敘述文字粗細 | 400 | `--font-weight-regular` |
| 敘述行高 | 1.7 | 1023px 以下覆寫 `--line-height-body` |
| 福利 tab 最小高度 | 52px | 手機 `.benefits-tabs__tab` |
| 福利 tab 左右內距 | 12px | 手機覆寫值 |
| 福利列欄位 | 32px + 剩餘寬度 | icon 與文字內容兩欄 |
| 招募區上下留白 | 64px | 760px 以下 `--page-content-start-space` |
| 招募區左右留白 | 16px | `--site-padding` 下限 |

## 維護備註

- 目前 careers 頁面已使用全域的按鈕、Hero、字體、顏色與間距 token；頁面 CSS 不再重複定義按鈕外觀。
- 目前保留的覆寫只有必要的 modifier 與 RWD 規則：`.join-section-heading--left` 的左對齊、840px 以下的介紹區堆疊、760px 以下的福利 tab／列表調整，以及 reduced-motion 設定；相同值的高 specificity 覆寫已移除。
- `tokens.css` 中的 compatibility alias 暫不刪除，因為其他頁面仍可能使用，不能只依 careers 頁面判定為冗餘。
- 福利 tab 的滑動軌道仍由 `wwwroot/js/pages/careers.js` 建立，這是為了保留鍵盤操作、ARIA 狀態與面板切換；未將互動版面邏輯改放進 CSS。
- 未驗證項目：本次尚未執行桌機／手機瀏覽器人工驗收，也未進行實體裝置、跨瀏覽器或無障礙人工驗收。
