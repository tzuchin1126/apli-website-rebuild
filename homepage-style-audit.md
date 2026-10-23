# 首頁樣式盤點報告

日期：2026-10-23  
範圍：`wwwroot/index.html`、`wwwroot/css/pages/home.css`、全域 tokens、共用 Header／Footer／按鈕樣式

## 驗證範圍

已檢查：

- 原始碼與 cascade：`reset.css`、`tokens.css`、`site-header.css`、`site-footer.css`、`buttons.css`、`home.css`。
- Edge 本機 viewport computed style：桌機 `1440×900`、筆電 `1280×800`、行動版 `390×844`。
- 三種 viewport 的 media query 是否生效，以及 cache-busted `home.css` 是否實際載入。

未檢查：實體 iOS／Android 裝置、Safari、Chrome、Firefox、跨瀏覽器差異與人工無障礙驗收。行動版結果是 viewport 實測，不等同於實體手機驗收。

## 1. 字體：使用什麼，是否全域？

全域 body 字體 stack 是：

```css
"Roboto", "Noto Sans TC", "Microsoft JhengHei", "微軟正黑體", sans-serif
```

來源：`wwwroot/css/base/tokens.css:29`，並由 `wwwroot/css/base/reset.css:12-20` 套用到 `body`。

| 範圍 | 字體 | 是否全域 |
|---|---|---|
| 一般正文、Header、按鈕、Footer、服務卡、最新消息 | `var(--font-body)` | 是，共用 body 字體系統 |
| Hero 小標與主標 | `Noto Serif TC`, `Songti TC`, `serif` | 否，首頁 Hero 專屬例外 |

Edge 本機實測中，`document.fonts.status` 為 `loaded`，可確認 Roboto 與 Noto Serif TC；Noto Sans TC 的 `document.fonts.check()` 回傳 `false`。因此 CSS 宣告仍是全域 fallback stack，但中文實際繪製可能落到 Microsoft JhengHei 或作業系統中文字體。

主要來源：`home.css:72`、`home.css:76`、`home.css:231-232`、`buttons.css:2-18`。

## 2. 各區塊文字大小，是否全域？

以下為三種 viewport 的最終 computed style。`D` = 桌機、`L` = 筆電、`M` = 行動版。

| 區塊／文字 | D 1440 | L 1280 | M 390 | 判斷 |
|---|---:|---:|---:|---|
| Header 主選單 | 17px | 17px | 16px | 共用 navigation token；首頁行動版覆寫 |
| Hero 小標 | 24px | 24px | 17.6px | 首頁 Hero 專屬 |
| Hero `h1` | 48px | 44.8px | 32px | 使用全域 h1 token，但由 Hero 專屬規則控制 |
| Hero CTA | 17px | 17px | 15px | 共用按鈕／body token |
| 各區塊英文 eyebrow | 14px | 14px | 14px | 首頁共用 `.home-section-eyebrow`，不是全站 selector |
| 關於亞太 `h2` | 33.12px | 30px | 30px | 全域 `font-size-h2` |
| 關於亞太內文 | 17px | 17px | 15px | 全域 body token，行動版 root media query 降為 15px |
| 服務區 `h2` | 33.12px | 30px | 30px | 全域 section heading token |
| 服務卡標題 | 20px | 20px | 20px | card title token |
| 服務卡說明 | 17px | 17px | 15px | card description／body token |
| 最新消息 `h2` | 33.12px | 30px | 35.1px | 行動版有專屬 `clamp(2rem, 9vw, 2.75rem)` |
| 置頂消息日期 | 14px | 14px | 14px | supporting size token |
| 置頂消息標題 | 23.04px | 20.48px | 18px | 首頁置頂消息專屬 clamp |
| 最新消息列表日期 | 17px | 17px | 15px | body token |
| 最新消息列表標題 | 18px | 18px | 15px | news title；行動版改用 body size |
| 集團事業群 `h2` | 33.12px | 30px | 30px | section heading token |
| 聯絡我們 `h2` | 33.12px | 30px | 30px | section heading token |
| 聯絡我們內文 | 17px | 17px | 16px | 行動版 `max-width: 767px` 專屬覆寫 |
| 聯絡 CTA | 17px | 17px | 15px | 共用按鈕／body token |
| Footer 公司資訊 | 14px | 14px | 14px | supporting token |
| Footer 欄位標題 | 17px | 17px | 15px | navigation token；行動版受 root body token 影響 |
| Footer 連結／copyright | 15px | 15px | 15px | Footer 共用固定值 |

主要來源：`tokens.css:41-55`、`tokens.css:81-89`、`tokens.css:162-173`、`home.css:75-78`、`home.css:203-209`、`home.css:301-340`、`home.css:1277-1290`、`home.css:1353-1373`、`home.css:1489-1492`。

### 尺寸結論

- 全站有共同 body、supporting、navigation、button、section heading token。
- Hero、英文 eyebrow、最新消息置頂標題與行動版最新消息標題是首頁專屬規則。
- 筆電不是單純縮放；`1024px–1439px` 會保留多數字級，但降低 heading 粗細。
- 行動版主要透過 root body size 由 17px 降為 15px，再由個別區塊覆寫。

## 3. 各區塊文字顏色，是否全域？

| 區塊／用途 | 最終顏色 | 判斷 |
|---|---|---|
| 一般正文、最新消息列表日期 | `#555555` | 全域 `--color-text-body` |
| 一般標題、section heading、最新消息列表標題 | `#333333` | 全域 `--color-text-primary`／`--color-ink` |
| 英文 eyebrow | `#999999` | 首頁專屬 literal |
| Hero 小標／主標 | `rgba(255,255,255,.90)`／`.95` | Hero 專屬 |
| Hero CTA、服務卡文字、聯絡區文字 | `#ffffff`，部分說明為 92%／94% 透明白 | 首頁區塊專屬或共用按鈕狀態 |
| 最新消息置頂日期／標籤 | `rgba(255,255,255,.82)`／`.76` | 最新消息專屬 |
| 最新消息列表分類、箭頭、hover | `#F58214` | 全域 `--color-primary` |
| Footer 欄位標題／copyright | `#F3F4F3` | Footer local custom property |
| Footer 公司資訊／一般連結 | `#D8D8D6` | Footer local custom property |

主要來源：`tokens.css:3-25`、`home.css:203-209`、`home.css:223-229`、`home.css:301-340`、`home.css:1277-1289`、`home.css:1343-1357`、`site-footer.css:1-8`。

## 4. 各區塊文字粗細，是否全域？

全域 token：`regular: 400`、`heading: 500`、`medium: 600`、`semibold: 600`、`bold: 700`、`section-heading: 700`，來源：`tokens.css:33-39`。

| 區塊／用途 | 桌機 | 筆電 | 行動版 | 判斷 |
|---|---:|---:|---:|---|
| 一般正文、日期、Footer 連結 | 400 | 400 | 400 | 全域 regular |
| Section `h2`（關於／服務／最新／集團） | 700 | 600 | 700 | 全域 token；筆電 media query 降為 600 |
| Hero 小標 | 400 | 400 | 600 | Hero 專屬，行動版另加重 |
| Hero `h1` | 400 | 400 | 400 | Hero 專屬固定值 |
| 服務卡標題 | 500 | 400 | 500 | heading／card token，受筆電規則影響 |
| 服務卡說明 | 400 | 400 | 400 | 全域 regular |
| 最新消息置頂標題 | 600 | 600 | 600 | `--font-weight-semibold` |
| 最新消息列表標題 | 500 | 400 | 500 | `--font-weight-heading`，筆電受 media query 影響 |
| 聯絡我們 `h2` | 500 | 400 | 500 | heading token，受筆電規則影響 |
| Footer 欄位標題 | 500 | 400 | 500 | heading token，受筆電規則影響 |
| Footer copyright | 400 | 400 | 400 | supporting weight |

> 筆電 `1024px–1439px` 的 root media query 將 `--font-weight-heading` 改為 400、`--font-weight-section-heading` 改為 600，因此不能只看 tokens 的預設值。

## 5. 各區塊圖片圓角，是否全域？

全域 radius token：`--radius-sm: 4px`、`--radius-md: 6px`、`--radius-lg: 8px`、`--radius-full: 999px`、`--card-radius: var(--radius-md)`，來源：`tokens.css:129-134`。

| 圖片／區塊 | D | L | M | 判斷 |
|---|---:|---:|---:|---|
| Hero 圖片本身 | 0px | 0px | 0px | 圖片本身不裁圓角 |
| Hero 外層右下角 | 約 52px | 約 52px | 12px | 首頁 Hero 專屬 |
| 關於亞太圖片 | 8px | 8px | 8px | 全域 `--radius-lg` |
| 服務卡／服務圖片 frame | 6px | 6px | 6px | 全域 `--card-radius` |
| 最新消息置頂圖片 frame | 8px | 8px | 8px | 全域 `--radius-lg` |
| 集團事業群卡片 | 14px | 14px | 14px | 首頁專屬 literal |
| 聯絡我們背景圖區塊 | 0px | 0px | 0px | section background，無圖片圓角 |
| 最新消息列表項目 | 0px | 0px | 0px | 底線列表，不是卡片 |

Edge computed style 實測確認：關於 `8px`、服務 `6px`、最新消息 `8px`、集團卡片 `14px`。

## 6. 各區塊圖片遮罩，是否全域？

目前首頁多數不是 CSS `mask-image`，而是疊在圖片或內容上的 pseudo-element overlay／gradient。

| 區塊 | 遮罩／overlay 實作 | D／L | M | 判斷 |
|---|---|---|---|---|
| Hero 圖片 | 圖片本身無 mask；文案背後為黑色 radial gradient，約 26%／18%／8%，`blur(22px)` | 有 | 黑色 radial gradient 約 22%／12%，`blur(14px)` | Hero 專屬 |
| 關於亞太裝飾地圖 | `::after` 使用 `mask-image`：0% 透明、16%–60% 不透明、100% 透明；opacity `.3` | 同一規則 | 同一 mask，opacity `.26` | 首頁裝飾專屬 |
| 服務卡圖片 | `::after` 疊 `rgba(23,86,145,.12)` 藍色 overlay | 同一規則 | 同一規則 | 服務卡專屬 |
| 服務卡文字區 | `::before` 深色 linear gradient：頂部 10%／4%，中段透明，底部 38%／86% | 同一規則 | 同一規則 | 服務卡專屬 |
| 最新消息置頂圖片 | `::after`：上方 75% 透明，底部至黑色 30% | 同一規則 | 同一規則 | 最新消息專屬 |
| 集團事業群 Logo 卡 | 無 mask；media 使用白色 radial gradient 加灰階 linear gradient | 同一規則 | 同一規則 | affiliates 專屬 |
| 聯絡我們背景圖 | `::before` 疊 `rgba(0,0,0,.22)` | 同一規則 | 同一規則 | contact 專屬 |
| Footer | 無首頁圖片遮罩 | 同一規則 | 同一規則 | 共用 Footer |

主要來源：`home.css:73-74`、`home.css:382-386`、`home.css:937-944`、`home.css:978-992`、`home.css:1230-1235`、`home.css:777-800`。

## 總結

### 明確屬於全域／共用系統

- body 字體 stack、一般正文色、body 預設尺寸與行高。
- body、supporting、navigation、button、section heading、card title、news title 等 typography tokens。
- `1024px–1439px` 的筆電 heading weight 調整。
- `4px`、`6px`、`8px`、`999px` radius tokens。
- Header、Footer、按鈕的基本 typography。

### 明確屬於首頁專屬

- Hero 的 Noto Serif TC、白色透明文字、radial text backdrop、主標／小標尺寸。
- `.home-section-eyebrow` 的 `#999999`、14px、600。
- 服務卡、最新消息、集團事業群、聯絡我們各自的 overlay／gradient。
- 最新消息置頂圖片目前的 `aspect-ratio: 1.6` 與 8px 圓角。
- 集團事業群卡片的 14px 圓角。
- 行動版最新消息標題的專屬 clamp 與 Hero／Contact 局部覆寫。

## 專案狀態注意

本報告建立時，工作樹另有既存刪除狀態：`TODO.md`、`SECURITY-BASELINE.md`、`about-company-profile-rollback-1440.png`、`affiliates-layout-spec.md`、`careers-layout-spec.md` 顯示為 deleted。這些不是本次分析所修改，未自行恢復。
