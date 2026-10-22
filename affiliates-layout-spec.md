# Affiliates 頁面文字與版面規格

本文件記錄 `wwwroot/affiliates.html` 搭配 `wwwroot/css/pages/affiliates.css`、`wwwroot/js/pages/affiliates.js` 與全域 `wwwroot/css/base/tokens.css` 的主要文字與版面數值。數值以 CSS token 為來源，避免只修改文件而沒有同步修改樣式。

## 量測基準

- 桌機基準：1366px viewport 寬度。
- 手機基準：390px viewport 寬度。
- 下列數值以 CSS 宣告與 token 推算；瀏覽器實際驗證項目另列於文件末尾。
- `clamp()` 的值會隨 viewport 改變；表格列出基準寬度的實際值或使用的 token。

## 文字規格與 careers 的一致性

### 一般敘述文字

affiliates 的一般公司介紹、服務項目與列表文字，已與 careers 的一般敘述文字共用同一組全域 token：

| 項目 | affiliates | careers | 說明 |
| --- | --- | --- | --- |
| 文字顏色 | `#555555` | `#555555` | `--color-muted` alias 至 `--color-text-body`；careers 直接使用 `--color-text-body` |
| 桌機文字大小 | 17px | 17px | `--font-size-body` |
| 手機文字大小 | 15px | 15px | 1023px 以下由 `tokens.css` 調整 `--font-size-body` |
| 文字粗細 | 400 | 400 | `--font-weight-regular` |
| 桌機行高 | 1.6 | 1.6 | `--line-height-body` |
| 手機行高 | 1.7 | 1.7 | 1023px 以下由 `tokens.css` 調整 `--line-height-body` |

因此，正常段落與服務項目文字的顏色、大小、粗細是與人才招募頁面一致的。

### 標題與特殊文字

標題並非全部使用同一層級，差異是刻意保留的語意規格：

| 文字角色 | affiliates | careers | 1366px 基準 |
| --- | --- | --- | ---: |
| Affiliates 公司／服務 h2、h3 | `--font-size-h3`、`--font-weight-heading`、`--color-text-primary` | 不適用 | 24px；此寬度的 heading token 為 400 |
| Careers 主區塊 h2 | 不適用 | `--font-size-section-heading`、`--font-weight-section-heading`、`--color-text-primary` | 約 31.4px；此寬度的 section heading token 為 600 |
| Careers 福利列 h3 | 不適用 | `--font-size-card-title-compact`、`--font-weight-heading` | 20px；此寬度的 heading token 為 400 |
| Affiliates tagline | `--font-size-body-copy`、`--font-weight-section-heading`、橘色 | 不適用 | 17px；section heading token 為 600 |
| 油品事業引言 | body size、特殊 serif／medium 設定 | 不適用 | 為特定內容的視覺例外 |

因此，若比較「一般敘述文字」或同層級的卡片／列表標題，寫法一致；若比較 affiliates 公司標題與 careers 的主區塊標題，大小與粗細不同是因為使用不同的標題層級。

## 桌機基準（1366px）

| 項目 | 數值 | 來源／說明 |
| --- | ---: | --- |
| 一般敘述文字大小 | 17px | `.affiliate-panel p, .affiliate-panel li` 使用 `--font-size-body` |
| 一般敘述文字粗細 | 400 | `.affiliate-panel p, .affiliate-panel li` 使用 `--font-weight-regular` |
| 一般敘述文字顏色 | `#555555` | `--color-muted` → `--color-text-body` |
| 一般敘述行高 | 1.6 | `--line-height-body` |
| Affiliates h2／h3 字級 | 24px | `--font-size-h3` 上限值 |
| Affiliates h2／h3 顏色 | `#333333` | `--color-ink` → `--color-text-primary` |
| Affiliates h2／h3 粗細 | 400 | 1024–1439px 時 `--font-weight-heading` 使用 regular |
| 公司介紹欄位間距 | 20px | `.affiliate-profile-copy { gap: 20px }` |
| 一般區塊上內距 | 32–48px | `.affiliate-editorial-section` 等使用 `clamp(32px, 4vw, 48px)` |
| Sexin 公司介紹下內距 | 40px | `.affiliate-company-profile--spaced { padding-bottom: var(--section-space) }` |
| Sexin 服務項目下內距 | 40px | `.affiliate-services-redesign--spaced { padding-bottom: var(--section-space) }` |
| Sexin 公司介紹與服務分隔線距離 | 40px | `--section-space` 的桌機上限值 |
| Sexin 服務項目與下方分隔線距離 | 40px | `--section-space` 的桌機上限值 |

## 手機基準（390px）

| 項目 | 數值 | 來源／說明 |
| --- | ---: | --- |
| 一般敘述文字大小 | 15px | 1023px 以下 `--font-size-body` |
| 一般敘述文字粗細 | 400 | `--font-weight-regular` |
| 一般敘述文字顏色 | `#555555` | `--color-muted` → `--color-text-body` |
| 一般敘述行高 | 1.7 | 1023px 以下 `--line-height-body` |
| Affiliates h2／h3 字級 | 20px | `--font-size-h3` 下限值 |
| Affiliates h2／h3 粗細 | 500 | 手機未進入 1024–1439px heading 覆寫範圍 |
| 所有企業公司介紹下內距 | 24px | 手機 `.affiliate-company-profile { padding-bottom: var(--section-space) }` |
| Sexin 服務項目下內距 | 24px | `.affiliate-services-redesign--spaced` 使用 `--section-space` 的手機下限值 |

## 維護備註

- 一般文字已改用全域文字 token，避免 affiliates 與 careers 各自維護相同的顏色、大小與粗細。
- `affiliate-sexin-*` 的共用命名已整理為通用 `affiliate-*` 命名；仍保留 `affiliate-sexin-*` 的 entity ID，因為它們是內容識別與互動定位用途，不是共用樣式名稱。
- 手機版所有企業公司介紹共用相同的下內距，讓圖片輪播控制列至下一個分隔線的距離一致；Sexin 服務區塊另保留 modifier 以維持桌機版需求。
- 特殊引言、tagline、獎項標籤仍保留各自的語意樣式，不將所有文字強制套成一般 body 文字。

## 驗證狀態

- 已通過：`node --check wwwroot/js/pages/affiliates.js`。
- 已通過：`git diff --check`。
- 已完成瀏覽器檢查：共用 profile carousel 類別、Sexin 間距計算、其他企業區塊未被增加下內距、頁面無水平溢位。
- 未驗證：實體裝置、跨瀏覽器與無障礙人工驗收；本文件的手機數值為 CSS token 推算，尚未標示為手機瀏覽器驗收結果。
