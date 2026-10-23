# Services 頁面樣式分析報告

> 檢查日期：2026-10-23  
> 檢查頁面：`/services`  
> 檢查方式：原始 HTML／CSS／JavaScript 靜態檢查，搭配本機 ASP.NET Core 實際頁面與 Edge 瀏覽器計算樣式驗證。  
> 檢查視窗：桌機 1440×900、筆電 1280×800、行動裝置 390×844。

## 結論摘要

- 頁面使用全站共用的 `Roboto`, `Noto Sans TC`, `Microsoft JhengHei` 字體堆疊；三種視窗的字體載入狀態均為 `loaded`。
- 基礎 body、section heading、card title、button 與 supporting 文字主要由全域 token 控制；Services 再針對 tab、carousel、服務優勢與聯絡卡片做頁面專屬設定。
- 目前 JavaScript 正常啟用時，四個服務面板會由 tab 控制，只有 active panel 實際呈現；每個服務的圖片 carousel 會建立圓點、支援按鈕／拖曳，並在非 reduced-motion 狀態自動播放。
- 桌機／筆電服務切換列高度為 64px，手機為 48px；手機 tab 列預期水平捲動，實測 `scrollWidth` 480px、`clientWidth` 390px。
- 一般服務 carousel 圖片使用 6px 圓角；Hero 圖片本身沒有圓角，Hero 外框有右下角圓角。聯絡卡片使用 6px 圓角與 30% 黑色背景 overlay。
- 本頁沒有 CSS `mask-image`。主要視覺處理來自 Hero overlay、carousel 圖片 `object-fit`／位置、聯絡卡片背景圖 overlay 與按鈕／carousel 控制項。
- 三種視窗均確認文件級沒有非預期水平溢位；手機水平溢位只存在於預期的服務 tab 列與 carousel 內部。

## 1. 字體使用什麼？是否是全域？

### 字體設定

來源：`wwwroot/css/base/tokens.css:29-31`、`wwwroot/css/base/reset.css:12-20`、`wwwroot/services.html:13-26`、`wwwroot/css/pages/services.css:7-17`

```css
--font-body: "Roboto", "Noto Sans TC", "Microsoft JhengHei", "微軟正黑體", sans-serif;
--font-special: "Noto Serif TC", "Songti TC", serif;
```

Services 的 body、Hero、tab、服務標題、服務說明、清單、優勢內容、聯絡卡片與 Footer 均使用 `var(--font-body)`。本頁沒有使用 `--font-special`。

本次瀏覽器檢查結果：

| 視窗 | Roboto | Noto Sans TC | Noto Serif TC | document.fonts |
|---|---:|---:|---:|---|
| 桌機 1440px | 可用 | 可用 | 可用 | `loaded` |
| 筆電 1280px | 可用 | 可用 | 可用 | `loaded` |
| 手機 390px | 可用 | 可用 | 可用 | `loaded` |

### 是否全域

是。字體 family 與 body 預設由 base 層統一管理；Services 的頁面規則只是明確沿用相同 token，沒有另設頁面字體。

## 2. 各區塊文字大小與全域性

以下為 JavaScript 正常載入且第一個服務面板 active 時的瀏覽器實際計算值；尺寸單位為 px。

| 區塊 | 桌機 1440 | 筆電 1280 | 手機 390 | 規則來源 | 是否全域 |
|---|---:|---:|---:|---|---|
| Header 導覽 | 17 | 17 | 15 | tokens／site-header／mobile query | 基礎全域，手機有覆寫 |
| Hero 麵包屑 | 14 | 14 | 14 | `--font-size-body-sm`／page-hero | 共用元件 |
| Hero 標題 | 43.2 | 40.32 | 28.8 | page-hero `clamp()` | 共用元件 |
| 服務切換 tab | 16 | 16 | 16 | Services 專屬 | 否 |
| 服務區塊標題 | 33.12 | 30 | 30 | `--font-size-section-heading` | token 全域 |
| 服務說明段落 | 17 | 17 | 15 | body token／mobile query | token 全域，手機有覆寫 |
| 主要服務項目標題 | 20 | 20 | 20 | `--font-size-card-title-compact` | token 全域 |
| 主要服務項目清單 | 17 | 17 | 15 | body-copy token | token 全域，手機有覆寫 |
| 優勢區標題 | 33.12 | 30 | 20 | section heading／mobile h3 override | 頁面 RWD 有覆寫 |
| 優勢項目標題 | 20 | 20 | 20 | card title token | token 全域 |
| 優勢說明 | 17 | 17 | 15 | body token／mobile query | token 全域，手機有覆寫 |
| 聯絡卡片標題 | 24 | 24 | 20 | `--font-size-card-title`／mobile token | 頁面 RWD 有覆寫 |
| 聯絡卡片欄位標籤 | 14 | 14 | 12 | `0.875rem`／mobile final rules | 否 |
| 聯絡卡片欄位內容 | 18.72 | 18.4 | 15.2 | `clamp()` | 否 |
| Footer 公司資訊 | 14 | 14 | 14 | supporting token | 共用 Footer |
| Footer 欄位標題 | 17 | 17 | 15 | navigation token／mobile query | 共用 Footer |
| Footer 連結／版權 | 15 | 15 | 15 | supporting／Footer | 共用 Footer |

### 版型差異

- 桌機 1440px：服務標題 33.12px，服務說明與清單 17px，優勢標題 33.12px，聯絡卡片標題 24px。
- 筆電 1280px：服務與優勢 section heading 30px，一般內文仍為 17px；tab 維持 16px。
- 手機 390px：服務 section heading 30px，但優勢區標題降為 20px；一般內文 15px，聯絡卡片標題 20px。
- 服務切換列桌機／筆電 64px，手機 48px；手機 tab 列本身採水平捲動，不是文件級溢位。

### 是否全域

- body、section heading、card title、button 與 supporting 的基本尺寸來自全域 token。
- tab、聯絡卡片標籤／內容與手機優勢標題有 Services 專屬尺寸。
- Hero 文字尺寸由共用 page-hero 控制。

## 3. 各區塊文字顏色與全域性

| 區塊 | 實際顏色 | 規則來源 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333333` | `--color-text-primary`／site-header | 共用全域 |
| Hero 麵包屑／標題 | `#FFFFFF` | page-hero | 共用元件 |
| 服務切換 tab 一般狀態 | `#737373` | `--color-text-muted` | 全域 token |
| 服務切換 active／hover／focus | `#F58214` | `--color-primary` | 全域品牌色，元件狀態使用 |
| 服務區塊標題 | `#333333` | `--color-ink` | 全域 alias |
| 服務說明段落 | `#555555` | `--color-text-body` | 全域 token |
| 主要服務項目清單 | `#333333` | `--color-ink` | 全域 alias |
| 清單 icon | `#F58214` | `--color-primary` | 全域品牌色 |
| 優勢標題／內容 | `#333333` | `--color-ink` | 全域 alias |
| 優勢說明 | `#555555` | `--color-muted` | 全域 alias |
| 優勢編號 | `#F58214` | `--color-primary` | 全域品牌色 |
| Carousel 控制項 | 白色 | `--color-surface` | 全域 token |
| Carousel 控制項背景 | 黑色 72% | 頁面專屬 | 否 |
| 聯絡卡片標題／內容 | `#FFFFFF` | `--color-surface` | 全域 token |
| 聯絡卡片欄位標籤 | 白色 68% | 頁面專屬 | 否 |
| Footer 公司資訊／連結／版權 | `#D8D8D6` | Footer token | 共用 Footer |
| Footer 欄位標題 | `#F3F4F3` | Footer token | 共用 Footer |

### 顏色補充

- 服務標題與優勢標題下方裝飾線使用主題橘漸層，不是文字顏色。
- Active tab 使用主題橘文字與 3px 橘色底線。
- 聯絡卡片是深色背景圖加 30% 黑色 pseudo overlay，白色文字用於提高對比。
- 桌機、筆電、手機沒有因 viewport 改變主要文字色；差異主要在尺寸、字重與 active 狀態。

## 4. 各區塊文字粗細與全域性

全站字重 token 位於 `wwwroot/css/base/tokens.css:33-39`：regular 400、heading 500、medium／semibold 600、bold 700。Services 另有 1024–1439px 的服務細節／優勢標題固定 500 規則。

| 區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 是 |
| Hero 標題 | 500 | 400 | 500 | 共用元件；筆電有全站調整 |
| Hero 麵包屑目前頁 | 600 | 600 | 600 | 共用 breadcrumb／頁面狀態 |
| 服務切換 tab | 400 | 400 | 400 | Services 專屬 |
| 服務區塊標題 | 700 | 600 | 700 | section heading token；筆電有全站調整 |
| 服務說明段落 | 400 | 400 | 400 | body token |
| 主要服務項目標題 | 500 | 500 | 500 | card heading；筆電頁面規則固定 500 |
| 主要服務項目清單 | 400 | 400 | 400 | body token |
| 優勢區標題 | 700 | 600 | 700 | section heading／mobile override |
| 優勢項目標題 | 500 | 500 | 500 | card heading；筆電頁面規則固定 500 |
| 優勢說明 | 400 | 400 | 400 | body token |
| 聯絡卡片標題 | 500 | 500 | 500 | heading token |
| 聯絡卡片欄位內容 | 700 | 600 | 700 | section heading token／laptop override |
| Footer 公司資訊／連結／版權 | 400 | 400 | 400 | 共用 Footer |
| Footer 欄位標題 | 500 | 400 | 500 | 共用 Footer；筆電受全站調整 |

### 判斷

- 服務區塊與優勢 section heading 遵循全站標題階層：桌機／手機 700，筆電 600。
- 主要服務項目與優勢項目標題維持 500，筆電也有頁面規則固定為 500。
- tab 一般狀態維持 400，沒有用粗體強化；active 狀態主要依靠主題橘與底線辨識。

## 5. 各區塊圖片圓角與全域性

| 圖片／區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Hero 圖片本身 | 0 | 0 | 0 | 共用 page-hero，圖片無圓角 |
| Hero 外框右下角 | 50.4px | 44.8px | 12px | 共用 page-hero 外框；mobile 有調整 |
| 服務 carousel 容器 | 6px | 6px | 6px | 使用 `--card-radius`，共用 token |
| 服務 carousel 內部圖片 | 0 | 0 | 0 | 圖片貼合已圓角的容器 |
| 靜態服務 media | 6px | 6px | 6px | 使用 `--card-radius` |
| 服務優勢 layout | 0 | 0 | 0 | 頁面專屬；目前沒有實際 advantage media |
| 聯絡卡片 | 6px | 6px | 6px | 使用 `--card-radius` |
| Carousel 控制按鈕 | 50% 圓形 | 50% 圓形 | 50% 圓形 | 頁面專屬控制項 |
| Carousel dot | 50% 圓形 | 50% 圓形 | 50% 圓形 | 頁面專屬指示器 |

### 判斷

- 服務圖片與聯絡卡片使用共用 6px 圓角。
- Carousel 圖片本身是直角，圓角由外層 carousel 容器裁切產生。
- Hero 圖片直角，外框右下角才有共用 page-hero 圓角。
- 服務優勢 HTML 目前只有內容欄位，沒有實際 `.services-advantages__media` 圖片元素，因此優勢圖片規則目前未被使用。

## 6. 各區塊圖片遮罩與全域性

本頁沒有 CSS `mask-image` 或 `-webkit-mask-image`。實際圖片處理如下：

| 區塊 | 實際效果 | 設定 | 是否全域 |
|---|---|---|---|
| Hero | 黑色漸層 overlay | `rgb(0 0 0 / 18%)` 至 `rgb(0 0 0 / 30%)` | 共用 page-hero |
| Hero 圖片 | 裁切與位置調整 | `object-fit: cover`、`center 28%` | 共用元件＋頁面位置覆寫 |
| Service carousel | 容器裁切 | `object-fit: cover`、16/9 桌機／4/3 手機 | 頁面專屬 |
| Service carousel 圖片 | 無額外黑色 mask | 圖片本身 filter 為 `none` | 頁面專屬 |
| 聯絡卡片 | 背景圖片黑色 overlay | `::before { background: rgb(0 0 0 / 30%) }` | 頁面專屬 |

### RWD 差異

- Hero overlay 三種視窗均使用相同共用漸層。
- Service carousel 桌機／筆電使用 16/9，手機使用 4/3，讓手機圖片提高視覺高度。
- 不同 service carousel 會針對圖片設定不同 `object-position`，例如內陸服務為 `center 65%`、維修為 `center 60%`。
- 聯絡卡片背景圖與 30% overlay 三種視窗均保留；手機只改變內容欄位排列。

## 目前生效互動與結構

### Service switcher

`wwwroot/js/pages/services.js:21-101` 會：

1. 建立 panel viewport／track，將四個服務 panel 放入同一個水平 track。
2. 依 tab 更新 `aria-selected`、`tabIndex`、`aria-hidden` 與 `inert`。
3. 支援 URL hash 深層連結與 hashchange。
4. 支援左右方向鍵切換 tab。
5. 以 transform 切換 panel，並依 active panel 高度更新 viewport。

本次瀏覽器確認正常初始狀態為 `inland-yard` active，文件級水平尺寸正常，服務切換列手機內部寬度為 480px，符合預期水平滑動設計。

### Service carousel

`wwwroot/js/pages/services.js:111-297` 會：

- 為每個 carousel 建立圓點指示器與 `aria-current`。
- 支援上一張／下一張按鈕、圓點點擊、觸控／滑鼠拖曳。
- 非 reduced-motion 狀態每 5 秒自動播放；滑鼠 hover、focus 或頁面不可見時暫停。
- 目前 DOM 中 4 個 carousel 分別有 4、2、2、1 張圖片；單張圖片的維修 carousel 不會建立控制互動。

## 區塊級完整盤點

### Hero

- 標題：桌機 43.2px／500，筆電 40.32px／400，手機 28.8px／500，白色。
- 麵包屑：14px，實際目前頁文字 600，白色。
- 圖片：無圖片圓角、無 mask；使用共用黑色漸層 overlay 與 `center 28%` 裁切位置。
- 外框：底部主題橘邊線，右下角有共用 page-hero 外框圓角。

### 服務切換列

- 桌機／筆電 64px 高，手機 48px 高；tab 文字 16px／400。
- active tab 為主題橘並使用 3px 底線；手機 tab 列保留水平捲動。
- sticky top 桌機／筆電為 78px，手機為 64px，配合共用 Header 高度。

### 服務內容與 carousel

- 服務標題桌機 33.12px、筆電／手機 30px；一般說明桌機／筆電 17px、手機 15px。
- 桌機／筆電服務圖片為 16/9；手機為 4/3；圖片外層 6px 圓角。
- 主要服務項目標題 20px／500，清單桌機／筆電 17px、手機 15px／400。
- carousel 控制按鈕 40px 圓形，預設黑色 72% 並在 hover／focus 變為主題橘；圓點 8px 圓形，active／hover 以主題橘放大。

### 優勢區

- 桌機標題 33.12px、筆電 30px、手機 20px；優勢項目標題 20px／500。
- 優勢編號為 14px、主題橘、字距 0.08em；說明文字桌機／筆電 17px、手機 15px。
- 目前 HTML 沒有實際優勢圖片，版型只呈現內容清單；不能把保留的 media CSS 當成目前畫面。

### 業務諮詢

- 聯絡卡片使用 `privacy-policy.jpg` 作背景、30% 黑色 overlay、6px 圓角。
- 卡片標題桌機／筆電 24px、手機 20px，白色／500。
- 欄位標籤桌機／筆電 14px、手機 12px，白色 68%；欄位內容桌機 18.72px、筆電 18.4px、手機 15.2px。
- 手機欄位改為單欄排列，保留卡片內部資訊層級。

### Footer

- 沿用共用 Footer，不是 Services 專屬樣式。
- 公司資訊 14px；欄位標題桌機／筆電 17px、手機 15px；連結與版權 15px。
- Footer 文字色與主內容區的 `#333333`／`#555555` 分離。

## 驗證範圍與限制

### 已驗證

- 已讀取 Services HTML、CSS、JavaScript，以及共用 tokens、reset、page-hero、header、footer、buttons 樣式。
- 已用本機 ASP.NET Core 實際載入 `/services`。
- 已在 Edge 瀏覽器讀取 1440×900、1280×800、390×844 的計算字體、尺寸、顏色、字重、圖片圓角、overlay、carousel 數量與溢位狀態。
- 已確認服務切換列桌機／筆電 64px、手機 48px；手機內部 tab 寬度 480px、viewport 390px。
- 已確認文件 `scrollWidth` 等於 viewport 寬度，水平溢位僅存在於預期的 tab／carousel 內部。

### 尚未驗證

- 尚未以實體手機、Safari、Firefox 或其他實體瀏覽器進行人工驗收。
- 尚未進行螢幕閱讀器與完整鍵盤操作的人工無障礙驗收；本報告僅記錄原始語意、ARIA 與瀏覽器計算結果。
- 尚未逐一以 `prefers-reduced-motion` 開關重跑完整輪播與拖曳流程；相關結論來自 CSS／JavaScript 條件檢查。
- 本報告沒有修改 Services 程式碼，也未驗證正式環境 CDN 或快取版本與本機結果是否完全一致。

