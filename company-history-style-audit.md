# Company History 頁面樣式分析報告

> 檢查日期：2026-10-23  
> 檢查頁面：`/company-history`  
> 檢查方式：原始 HTML／CSS／JavaScript 靜態檢查，搭配本機 ASP.NET Core 實際頁面與 Edge 瀏覽器計算樣式驗證。  
> 檢查視窗：桌機 1440×900、筆電 1280×800、行動裝置 390×844。

## 結論摘要

- 頁面使用全站共用的 `Roboto`, `Noto Sans TC`, `Microsoft JhengHei` 字體堆疊；三種視窗的字體載入狀態均為 `loaded`。
- 基礎 body 字級、行高、字重與文字色彩由 `tokens.css`／`reset.css` 控制；公司沿革的年份導覽、年份標題與事件文字則由 `company-history.css` 專屬規則覆寫。
- 目前 JavaScript 正常啟用時，實際畫面是「上方年份導覽＋下方垂直內容」的中央內容軸版本；原始 HTML 中的舊式水平時間軸與停用 JavaScript fallback 仍保留作為備援結構。
- 桌機、筆電與手機的主要差異是年份導覽方向、內容軸版型與字級；筆電仍保留桌機式內容寬度，手機改為水平年份導覽、單欄內容。
- 頁面沒有內容圖片卡片；只有共用 Hero 圖片。Hero 圖片本身沒有圓角或 CSS mask，外框則有右下角圓角與主題橘底線。

## 1. 字體使用什麼？是否是全域？

### 字體設定

來源：`wwwroot/css/base/tokens.css:29-31`、`wwwroot/css/base/reset.css:12-20`、`wwwroot/company-history.html:18-30`

```css
--font-body: "Roboto", "Noto Sans TC", "Microsoft JhengHei", "微軟正黑體", sans-serif;
--font-special: "Noto Serif TC", "Songti TC", serif;
```

`body` 使用 `var(--font-body)`，Company History 的 Header、Hero、年份、事件內容與 Footer 均沿用這組全站字體。頁面沒有使用 `--font-special`，也沒有另外指定頁面專屬字體。

本次瀏覽器檢查結果：

| 視窗 | Roboto | Noto Sans TC | Noto Serif TC | document.fonts |
|---|---:|---:|---:|---|
| 桌機 1440px | 可用 | 可用 | 可用 | `loaded` |
| 筆電 1280px | 可用 | 可用 | 可用 | `loaded` |
| 手機 390px | 可用 | 可用 | 可用 | `loaded` |

### 是否全域

是。字體 family 與 body 預設由 base 層統一管理；Company History 只有個別元素明確指定 `font-family: var(--font-body)`，仍然指向同一個全域 token。

## 2. 各區塊文字大小與全域性

以下為 JavaScript 啟用後的目前實際內容；尺寸單位為 px。

| 區塊 | 桌機 1440 | 筆電 1280 | 手機 390 | 規則來源 | 是否全域 |
|---|---:|---:|---:|---|---|
| Header 導覽 | 17 | 17 | 15 | tokens／site-header／mobile media query | 基礎全域，手機有覆寫 |
| Hero 麵包屑 | 14 | 14 | 14 | `--font-size-body-sm`／page-hero | 共用元件 |
| Hero 標題 | 43.2 | 40.32 | 28.8 | page-hero `clamp()` | 共用元件 |
| 年份導覽按鈕 | 19.44 | 17.28 | 16 | Company History `clamp()`／mobile query | 否 |
| 目前年份標題 | 34.56 | 30.72 | 28 | Company History `clamp()`／mobile final override | 否 |
| 里程碑事件標題 | 18 | 17.92 | 17 | `--font-size-body-lg` | token 全域 |
| 里程碑事件內文 | 17 | 17 | 15 | `--font-size-body`／body media query | token 全域，手機有覆寫 |
| Footer 公司資訊 | 14 | 14 | 14 | `--type-supporting-size` | 共用 Footer |
| Footer 欄位標題 | 17 | 17 | 15 | navigation token／mobile query | 共用 Footer |
| Footer 連結／版權 | 15 | 15 | 15 | supporting token／Footer | 共用 Footer |

### 各版型的字級行為

- 桌機 1440px：年份導覽 19.44px，年份標題 34.56px，事件標題 18px，事件內文 17px。
- 筆電 1280px：年份導覽 17.28px，年份標題 30.72px；事件標題約 17.92px，事件內文仍為 17px。
- 手機 390px：年份導覽 16px，年份標題 28px；事件標題 17px，事件內文 15px。
- 手機 body 基礎尺寸由 `tokens.css:162-166` 降為 15px；Company History 的年份標題又以頁面專屬 `2rem` 規則保留較明顯的層級。

### 是否全域

- body、一般內文與 supporting 文字尺寸主要是全域 token。
- Hero 文字尺寸由共用 page-hero 控制。
- 年份導覽與年份標題是 Company History 專屬尺寸，不應直接視為全站標題標準。

## 3. 各區塊文字顏色與全域性

| 區塊 | 實際顏色 | 規則來源 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333333` | `--color-text-primary`／site-header | 共用全域 |
| Hero 麵包屑／標題 | `#FFFFFF` | page-hero | 共用元件 |
| 年份導覽一般狀態 | `#737373` | `--color-text-muted` | 全域 token |
| 年份導覽 active／hover／focus | `#F58214` | `--color-primary` | 全域品牌色，頁面狀態使用 |
| 年份標題 | `#F58214` | `--color-primary` | 全域品牌色，頁面專屬使用 |
| 事件標題 | `#333333` | `--color-text-primary` | 全域 token |
| 事件內文 | `#555555` | `--color-text-body` | 全域 token |
| Footer 公司資訊／連結／版權 | `#D8D8D6` | Footer token | 共用 Footer |
| Footer 欄位標題 | `#F3F4F3` | Footer token | 共用 Footer |

### 顏色補充

- 年份導覽右側節點預設為 muted 灰色，active 狀態改為主題橘。
- 內容區事件分隔線使用 `var(--color-border-light)`；年份導覽的垂直軌道使用 `rgb(20 40 55 / 14%)`。
- Hero 使用白色文字搭配共用黑色透明漸層，確保圖片上的對比。
- 未發現桌機、筆電、手機另行指定不同文字色；差異主要是尺寸、排列與 active 狀態。

## 4. 各區塊文字粗細與全域性

全站字重 token 位於 `wwwroot/css/base/tokens.css:33-39`：regular 400、heading 500、medium／semibold 600、bold 700。筆電 1024–1439px 另有全站 heading token 調整。

| 區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 是 |
| Hero 標題 | 500 | 400 | 500 | 共用元件；筆電有全站調整 |
| Hero 麵包屑目前頁 | 600 | 600 | 600 | 共用 breadcrumb／頁面狀態 |
| 年份導覽 | 600 | 600 | 600 | Company History 專屬，active 使用同一 medium |
| 年份標題 | 600 | 600 | 600 | Company History 專屬 |
| 事件標題 | 600 | 600 | 600 | 使用全域 medium token |
| 事件內文 | 400 | 400 | 400 | 全域 body |
| Footer 公司資訊／連結／版權 | 400 | 400 | 400 | 共用 Footer |
| Footer 欄位標題 | 500 | 400 | 500 | 共用 Footer；筆電受全站調整 |

### 判斷

- Company History 目前的年份、年份標題與事件標題主要使用 600，形成橘色年份與深色事件標題的階層。
- 筆電的 Company History 內容仍使用 600，沒有跟隨一般 section heading 的 500／600 規則降低，這是頁面專屬設定。
- Hero 標題與 Footer 欄位標題仍會受到全站 laptop heading weight 規則影響。

## 5. 各區塊圖片圓角與全域性

| 圖片／區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Hero 圖片本身 | 0 | 0 | 0 | 共用 page-hero，圖片無圓角 |
| Hero 外框右下角 | 50.4px | 44.8px | 12px | 共用 page-hero 外框；mobile 有調整 |
| 年份導覽按鈕 | 0 | 0 | 0 | Company History 專屬 |
| 年份導覽節點 | 50% 圓形 | 50% 圓形 | 50% 圓形 | Company History 專屬 |
| 事件內容區 | 0 | 0 | 0 | 無卡片圓角 |
| 頁面內容 shell | 0 | 0 | 0 | Company History 專屬 |

### 判斷

Company History 沒有圖片卡片，因此沒有 About 頁面那種內容圖片卡片圓角。只有 Hero 外框右下角與年份節點使用圓角；Hero 圖片本身仍為直角。

## 6. 各區塊圖片遮罩與全域性

本頁沒有 CSS `mask-image` 或 `-webkit-mask-image`。實際視覺處理如下：

| 區塊 | 實際效果 | 強度／設定 | 是否全域 |
|---|---|---|---|
| Hero | 黑色漸層 overlay | `rgb(0 0 0 / 18%)` 至 `rgb(0 0 0 / 30%)` | 共用 page-hero |
| Hero 圖片 | `object-fit: cover`、位置調整 | `.milestones-page` 設定 `center 28%` | 共用元件＋頁面位置覆寫 |
| 年份軸／節點 | 純 CSS 線條與圓形節點 | 無圖片遮罩 | Company History 專屬 |
| 事件分隔 | CSS border | `var(--color-border-light)` | Company History 專屬 |

### RWD 差異

- Hero overlay 三種視窗均使用相同漸層。
- Hero 圖片在 Company History 使用 `center 28%`，避免貨櫃主體在裁切時偏離視覺焦點。
- 手機年份導覽改為橫向可捲動，不是圖片遮罩或圖片裁切。

## 目前生效版型與備援版型

### JavaScript 啟用後：目前實際版型

`wwwroot/js/pages/company-history.js:48-171` 會：

1. 從原始 `.milestone-year-group` 讀取年份與事件。
2. 動態建立 `.milestone-vertical`、年份 tab 與 `role="tabpanel"` 內容。
3. 將原始內容替換成新版垂直時間軸。
4. 加上 `is-vertical-timeline` 與 `milestones-motion-ready` class。
5. 以 IntersectionObserver 隨捲動更新 active 年份。

目前實際 CSS 最後一組覆寫在 `company-history.css:939-1173`，並在 `1142-1155` 將時間軸改為單一垂直內容流：

- 桌機／筆電：年份導覽與事件內容為兩欄配置的基礎結構，最後再由中央內容流覆寫為單欄垂直內容。
- 手機：年份導覽為橫向可捲動列，內容為單欄，年份標題 28px。
- 事件以水平分隔線區隔，無圖片卡片與圓角。

### JavaScript 停用時：fallback

`company-history.css:229-332` 保留 `.milestones-page:not(.milestones-motion-ready)` 規則，讓原始 HTML 仍可讀：

- 年份群組以 118px 年份欄加內容欄排列。
- 使用 CSS 垂直線與橘色圓形節點。
- 事件標題使用 `--font-size-h3`，事件內文使用 body token。
- 這套 fallback 不是本次正常載入頁面的主要視覺結果，但屬於應保留的無 JavaScript 基本內容能力。

## 區塊級完整盤點

### Hero

- 結構：`.milestones-hero.page-hero`。
- 標題：桌機 43.2px／500，筆電 40.32px／400，手機 28.8px／500，白色。
- 麵包屑：14px，實際目前頁文字 600，白色。
- 圖片：無圖片圓角、無 mask；使用共用黑色漸層 overlay。
- 外框：底部主題橘邊線，右下角外框圓角；Company History 將圖片位置設為 `center 28%`。

### 年份導覽

- 桌機／筆電：垂直年份列，右側有灰色軌道與節點。
- 手機：水平可捲動年份列，底部有水平分隔線與 active 節點。
- 一般年份為 `#737373`／600；active、hover、focus 為 `#F58214`。
- 按鈕維持原生 button、tab、aria-selected 與 focus-visible 行為。

### 里程碑內容

- 年份標題為主題橘，桌機 34.56px、筆電 30.72px、手機 28px，字重 600。
- 事件標題為 `#333333`，桌機 18px、筆電約 17.92px、手機 17px，字重 600。
- 事件內文為 `#555555`，桌機／筆電 17px、手機 15px，字重 400。
- 事件之間使用 1px 淡色分隔線，不使用背景卡片或圖片遮罩。

### Footer

- 沿用共用 Footer，不是 Company History 專屬樣式。
- 公司資訊 14px；欄位標題桌機／筆電 17px、手機 15px；連結與版權 15px。
- Footer 深色背景文字與內容區的 `#333333`／`#555555` 分離。

## 驗證範圍與限制

### 已驗證

- 已讀取 Company History HTML、CSS、JavaScript，以及共用 tokens、reset、page-hero、header、footer 樣式。
- 已用本機 ASP.NET Core 實際載入 `/company-history`。
- 已在 Edge 瀏覽器讀取 1440×900、1280×800、390×844 的計算字體、尺寸、顏色、字重、圓角、overlay、filter 與水平溢位狀態。
- 已確認正常載入後頁面 class 為 `milestones-page milestones-motion-ready`，內容 shell 在三種視窗均無非預期文件級水平溢位。

### 尚未驗證

- 尚未以實體手機、Safari、Firefox 或其他實體瀏覽器進行人工驗收。
- 尚未進行螢幕閱讀器與完整鍵盤操作的人工無障礙驗收；本報告僅記錄原始語意、ARIA 與瀏覽器計算結果。
- 尚未以停用 JavaScript 的獨立瀏覽器實例實際截圖；fallback 結論來自 HTML／CSS 靜態檢查。
- 本報告沒有修改 Company History 程式碼，也未驗證正式環境 CDN 或快取版本與本機結果是否完全一致。

