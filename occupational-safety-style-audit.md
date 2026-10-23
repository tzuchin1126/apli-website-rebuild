# Occupational Safety 頁面樣式分析報告

> 檢查日期：2026-10-23  
> 檢查頁面：`/occupational-safety`  
> 檢查方式：原始 HTML／CSS／JavaScript 靜態檢查，搭配本機 ASP.NET Core 實際頁面與 Edge 瀏覽器計算樣式驗證。  
> 檢查視窗：桌機 1440×900、筆電 1280×800、行動裝置 390×844。

## 結論摘要

- 頁面一般文字使用全站共用的 `Roboto`, `Noto Sans TC`, `Microsoft JhengHei` 字體堆疊；Intro 主標題是明確的 `Noto Serif TC` 特殊字體例外。
- 基礎 body、section heading、card title、button 與 supporting 文字主要由全域 token 控制；職安頁面再針對 Intro serif 標題、證照卡片與證照圖像遮罩做專屬規則。
- 桌機／筆電的證照卡片是 4 張卡片的水平可捲動列，單卡寬 380px；手機單卡寬 306px，仍保留水平滑動結構。
- 一般內容圖片與證照卡片使用 6px 圓角；Hero 圖片本身沒有圓角。證照卡片的非 ISO 圖片有 14% 黑色遮罩，ISO 證書圖不使用該遮罩。
- 本頁沒有 CSS `mask-image`。主要圖片處理是 Hero overlay、`object-fit: cover`／`contain`、圖片位置調整與證照卡片的 pseudo-element 遮罩。
- 三種視窗均確認文件級沒有非預期水平溢位；證照列的水平溢位被限制在 `.safety-credentials__viewport` 內，屬於預期互動。

## 1. 字體使用什麼？是否是全域？

### 字體設定

來源：`wwwroot/css/base/tokens.css:29-31`、`wwwroot/css/base/reset.css:12-20`、`wwwroot/occupational-safety.html:15-30`、`wwwroot/css/pages/occupational-safety.css:20-30,72-74`

```css
--font-body: "Roboto", "Noto Sans TC", "Microsoft JhengHei", "微軟正黑體", sans-serif;
--font-special: "Noto Serif TC", "Songti TC", serif;
```

一般頁面文字使用 `var(--font-body)`。`.safety-intro__heading h2` 明確使用 `var(--font-special)`，因此「安全，是每一項作業的前提」是本頁的 serif 字體例外。其餘 Hero、段落、健康清單、證照卡片、按鈕與 Footer 使用 body 字體。

本次瀏覽器檢查結果：

| 視窗 | Roboto | Noto Sans TC | Noto Serif TC | document.fonts |
|---|---:|---:|---:|---|
| 桌機 1440px | 可用 | 可用 | 可用 | `loaded` |
| 筆電 1280px | 可用 | 可用 | 可用 | `loaded` |
| 手機 390px | 可用 | 可用 | 可用 | `loaded` |

### 是否全域

- Body 字體是全域設定。
- `Noto Serif TC` token 也是全域可用的特殊字體，但只有 Intro 主標題在本頁實際使用；這不是本頁所有標題的預設。
- 證照卡片圖示使用 `Phosphor` icon font，屬於按鈕／圖示元件，不是一般文字字體。

## 2. 各區塊文字大小與全域性

以下為 JavaScript 正常載入後的瀏覽器實際計算值；尺寸單位為 px。

| 區塊 | 桌機 1440 | 筆電 1280 | 手機 390 | 規則來源 | 是否全域 |
|---|---:|---:|---:|---|---|
| Header 導覽 | 17 | 17 | 15 | tokens／site-header／mobile query | 基礎全域，手機有覆寫 |
| Hero 麵包屑 | 14 | 14 | 14 | `--font-size-body-sm`／page-hero | 共用元件 |
| Hero 標題 | 43.2 | 40.32 | 28.8 | page-hero `clamp()` | 共用元件 |
| Intro 主標題 | 33.12 | 30 | 30 | section heading token | token 全域，字體為頁面例外 |
| Intro 兩段說明 | 17 | 17 | 15 | body token／body query | token 全域，手機有覆寫 |
| 健康支持說明／清單 | 17 | 17 | 15 | body token | token 全域 |
| 專業證照標題 | 33.12 | 30 | 30 | section heading token | token 全域 |
| 專業證照說明 | 17 | 17 | 15 | body token | token 全域 |
| 證照卡片標題 | 20 | 20 | 20 | `--font-size-card-title-compact` | token 全域 |
| 證照卡片清單 | 17 | 17 | 15 | body token | token 全域，手機有覆寫 |
| Footer 公司資訊 | 14 | 14 | 14 | supporting token | 共用 Footer |
| Footer 欄位標題 | 17 | 17 | 15 | navigation token／mobile query | 共用 Footer |
| Footer 連結／版權 | 15 | 15 | 15 | supporting／Footer | 共用 Footer |

### 版型差異

- 桌機 1440px：section heading 33.12px，Intro、證照說明與卡片清單 17px，證照卡片標題 20px。
- 筆電 1280px：section heading 30px，一般內文仍為 17px；證照卡片標題仍為 20px。
- 手機 390px：section heading 30px，一般內文與卡片清單 15px；證照卡片標題仍維持 20px。
- Hero 標題由共用 page-hero 的 `clamp()` 控制，與內容 section heading 是兩套不同階層。

### 是否全域

- body、section heading、card title、button、supporting 尺寸主要是全域 token。
- Intro 使用 serif 字體是頁面專屬，但尺寸仍沿用 section heading token。
- 證照卡片媒體高度與卡片寬度是本頁版型規則，不屬於文字尺寸。

## 3. 各區塊文字顏色與全域性

| 區塊 | 實際顏色 | 規則來源 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333333` | `--color-text-primary`／site-header | 共用全域 |
| Hero 麵包屑／標題 | `#FFFFFF` | page-hero | 共用元件 |
| Intro 主標題 | `#333333` | `--color-text-primary` | 全域 token |
| Intro 說明／健康清單 | `#555555` | `--color-text-body` | 全域 token |
| 健康清單 marker | `#F58214` | `--color-primary` | 全域品牌色 |
| 專業證照標題 | `#333333` | `--color-text-primary` | 全域 token |
| 證照卡片標題／清單 | `#333333` | `--color-ink` | 全域 alias |
| 證照卡片 icon／check icon | 白色 | `--color-surface` | 共用 token |
| 證照卡片 icon 背景 | `#4D4F53` | `--color-secondary` | 全域 alias |
| Footer 公司資訊／連結／版權 | `#D8D8D6` | Footer token | 共用 Footer |
| Footer 欄位標題 | `#F3F4F3` | Footer token | 共用 Footer |

### 顏色補充

- 證照卡片預設 icon accent 是 `var(--color-secondary)`，目前計算結果為深灰 `#4D4F53`，不是主題橘。
- 證照卡片非 certification 圖片使用黑色 14% overlay，但這是圖片遮罩，不是文字顏色。
- Hero 白字搭配共用黑色漸層 overlay；主體內容則使用 `#333333`／`#555555` 的中性階層。
- 桌機、筆電、手機沒有因 viewport 改變主要文字色；差異主要是尺寸、字重與卡片排列。

## 4. 各區塊文字粗細與全域性

全站字重 token 位於 `wwwroot/css/base/tokens.css:33-39`：regular 400、heading 500、medium／semibold 600、bold 700。筆電區間另有全站 heading token 調整；職安 Intro heading 在 981px 以上又有頁面專屬 600 覆寫。

| 區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 是 |
| Hero 標題 | 500 | 400 | 500 | 共用元件；筆電有全站調整 |
| Hero 麵包屑目前頁 | 600 | 600 | 600 | 共用 breadcrumb／頁面狀態 |
| Intro 主標題 | 600 | 600 | 700 | 頁面規則；981px 以上與 mobile 有差異 |
| Intro 說明／健康清單 | 400 | 400 | 400 | body token |
| 專業證照標題 | 700 | 600 | 700 | section heading token；筆電有全站調整 |
| 證照卡片標題 | 500 | 500 | 500 | heading token／頁面 laptop 固定 500 |
| 證照卡片清單 | 400 | 400 | 400 | body token |
| Footer 公司資訊／連結／版權 | 400 | 400 | 400 | 共用 Footer |
| Footer 欄位標題 | 500 | 400 | 500 | 共用 Footer；筆電受全站調整 |

### 判斷

- Intro 標題在桌機與筆電為 600，手機為 700；這是 `.safety-heading h2`、981px media query 與全域 mobile token 疊加後的結果。
- 專業證照標題遵循 section heading：桌機／手機 700，筆電 600。
- 證照卡片標題明確維持 500，筆電也有頁面規則固定為 500，不跟隨一般 laptop heading token 降至 400。

## 5. 各區塊圖片圓角與全域性

| 圖片／區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Hero 圖片本身 | 0 | 0 | 0 | 共用 page-hero，圖片無圓角 |
| Hero 外框右下角 | 50.4px | 44.8px | 12px | 共用 page-hero 外框；mobile 有調整 |
| Intro 圖片 media | 6px | 6px | 6px | 使用 `--card-radius`，共用 token |
| 證照卡片 | 6px | 6px | 6px | 使用頁面 alias `--safety-credential-radius` |
| 證照卡片圖片 | 上方 6px、下方 0 | 上方 6px、下方 0 | 上方 6px、下方 0 | 卡片圖片專屬規則 |
| 證照 icon | 50% 圓形 | 50% 圓形 | 50% 圓形 | 頁面專屬 icon |
| 清單 check icon | 50% 圓形 | 50% 圓形 | 50% 圓形 | 頁面專屬 icon |
| 分頁 dot（CSS 保留規則） | 50%／active 999px | 50%／active 999px | 50%／active 999px | 目前 HTML 未渲染 pager |

### 判斷

- Intro 圖片與證照卡片使用共用 6px card radius。
- 證照卡片內的圖片只保留上方圓角，因為圖片貼合卡片頂部、下方接續標題區。
- Hero 圖片直角，外框右下角才有圓角。
- CSS 中保留 pagination dot 樣式，但目前 HTML 沒有 `.safety-credentials__controls` 或 `.safety-credentials__pagination` 實際控制列，實際互動是 viewport 水平拖曳／捲動。

## 6. 各區塊圖片遮罩與全域性

本頁沒有 CSS `mask-image` 或 `-webkit-mask-image`。實際圖片處理如下：

| 區塊 | 實際效果 | 設定 | 是否全域 |
|---|---|---|---|
| Hero | 黑色漸層 overlay | `rgb(0 0 0 / 18%)` 至 `rgb(0 0 0 / 30%)` | 共用 page-hero |
| Hero 圖片 | 裁切與位置調整 | `object-fit: cover`、`center 88%` | 共用元件＋頁面位置覆寫 |
| Intro 圖片 | 容器裁切 | `object-fit: cover`、`center` | 頁面專屬 |
| ISO 45001 證書圖 | 保留證書完整比例 | `object-fit: contain`、surface-soft 背景 | 頁面專屬 |
| 其他證照圖片 | 容器裁切 | `object-fit: cover` | 頁面專屬 |
| 非 ISO 證照圖片 | 黑色圖片遮罩 | `::after { background: rgb(0 0 0 / 14%) }` | 頁面專屬 |

### RWD 差異

- Hero overlay 三種視窗均使用相同共用漸層。
- Hero 的圖片位置在本頁為 `center 88%`，避免安全帽與鐵鎚主體在裁切時偏離。
- Intro 圖片三種視窗均使用 16/9 與 `object-fit: cover`。
- 證照卡片在三種視窗均維持 3/1 圖片比例與 14% 非 certification 圖片遮罩。
- `prefers-reduced-motion: reduce` 時 Intro heading 動畫與 pager transition 會停用；卡片水平捲動仍是內容可讀性所需的互動容器。

## 目前生效互動與結構

### Intro

- `.safety-intro__heading` 有 0.65 秒向上淡入動畫。
- Intro desktop／laptop 使用 heading、lead、media、health 的網格配置；手機改為 heading、media、lead、health 單欄順序。
- 健康支持使用語意 `<ul>`，marker 為主題橘方形。

### 專業證照

- HTML 目前有 4 張 `.safety-credential-card`。
- 桌機／筆電卡片寬度為 380px、最小高度 360px，viewport `scrollWidth` 約 1656–1649px。
- 手機卡片寬度為 306px、viewport `scrollWidth` 為 1272px；文件本身仍維持 viewport 寬度 390px，水平溢位只存在於卡片 viewport。
- CSS 有卡片 hover／focus-within 上移 6px 與 shadow 強化。
- 證照卡片沒有使用 JavaScript 動態重排；`occupational-safety.js` 目前只包含另一頁地理優勢／快速導覽函式，因本頁沒有對應 DOM，不會改變證照卡片內容。

## 區塊級完整盤點

### Hero

- 標題：桌機 43.2px／500，筆電 40.32px／400，手機 28.8px／500，白色。
- 麵包屑：14px，實際目前頁文字 600，白色。
- 圖片：無圖片圓角、無 mask；使用共用黑色漸層 overlay 與 `center 88%` 裁切位置。
- 外框：底部主題橘邊線，右下角有共用 page-hero 外框圓角。

### 安全介紹

- Intro 標題使用 Noto Serif TC；桌機／筆電 33.12／30px、600，手機 30px、700。
- 兩段說明與健康清單使用 `#555555` body 文字；桌機／筆電 17px，手機 15px。
- Intro 圖片 16/9、6px 圓角、cover，不使用圖片 overlay。

### 專業證照

- 標題桌機 33.12px、筆電／手機 30px；說明桌機／筆電 17px、手機 15px。
- 卡片 6px 圓角、白色背景、card shadow；卡片圖片 3/1。
- ISO 證書使用 contain；其他三張圖片使用 cover 並疊加 14% 黑色遮罩。
- 卡片標題 20px／500，清單桌機／筆電 17px、手機 15px／400。

### Footer

- 沿用共用 Footer，不是 Occupational Safety 專屬樣式。
- 公司資訊 14px；欄位標題桌機／筆電 17px、手機 15px；連結與版權 15px。
- Footer 文字色與主內容區的 `#333333`／`#555555` 分離。

## 驗證範圍與限制

### 已驗證

- 已讀取 Occupational Safety HTML、CSS、JavaScript，以及共用 tokens、reset、page-hero、header、footer、buttons 樣式。
- 已用本機 ASP.NET Core 實際載入 `/occupational-safety`。
- 已在 Edge 瀏覽器讀取 1440×900、1280×800、390×844 的計算字體、尺寸、顏色、字重、圖片圓角、overlay、filter、卡片數量與溢位狀態。
- 已確認三種視窗均有 4 張證照卡片，且文件 `scrollWidth` 等於 viewport 寬度；卡片水平溢位僅存在於預期的 credentials viewport。

### 尚未驗證

- 尚未以實體手機、Safari、Firefox 或其他實體瀏覽器進行人工驗收。
- 尚未進行螢幕閱讀器與完整鍵盤操作的人工無障礙驗收；本報告僅記錄原始語意、ARIA 與瀏覽器計算結果。
- 尚未逐一以 `prefers-reduced-motion` 開關重跑完整視覺流程；相關結論來自 CSS 條件檢查。
- 本報告沒有修改 Occupational Safety 程式碼，也未驗證正式環境 CDN 或快取版本與本機結果是否完全一致。

