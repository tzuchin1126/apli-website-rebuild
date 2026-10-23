# Operational Resources 頁面樣式分析報告

> 檢查日期：2026-10-23  
> 檢查頁面：`/operational-resources`  
> 檢查方式：原始 HTML／CSS／JavaScript 靜態檢查，搭配本機 ASP.NET Core 實際頁面與 Edge 瀏覽器計算樣式驗證。  
> 檢查視窗：桌機 1440×900、筆電 1280×800、行動裝置 390×844。

## 結論摘要

- 頁面使用全站共用的 `Roboto`, `Noto Sans TC`, `Microsoft JhengHei` 字體堆疊；三種視窗的字體載入狀態均為 `loaded`。
- 基礎 body、標題、表格與 supporting 文字主要由全域 token 控制，Operational Resources 再針對資料 tab、地理優勢節點與安全區塊做頁面專屬調整。
- 目前 JavaScript 正常啟用時，資料區塊是三個 tab 切換的表格；地理優勢區塊會啟用進場動畫，並依 viewport 顯示桌機網絡圖或手機單欄節點。
- 一般內容圖片桌機／筆電使用直角安全區塊或 6px 圓角；手機安全圖片使用 6px 圓角。Hero 圖片本身沒有圓角，地理優勢中心 Logo hub 使用 50% 圓形容器。
- 本頁沒有 CSS `mask-image`。主要視覺效果來自 Hero overlay、`object-fit: cover`、圖片位置調整、CSS 節點／虛線網絡與地理優勢橘色圓形 hub。
- 三種視窗均確認文件級沒有非預期水平溢位；手機的 tab 列與表格內容依設計在容器內處理。

## 1. 字體使用什麼？是否是全域？

### 字體設定

來源：`wwwroot/css/base/tokens.css:29-31`、`wwwroot/css/base/reset.css:12-20`、`wwwroot/operational-resources.html:18-30`

```css
--font-body: "Roboto", "Noto Sans TC", "Microsoft JhengHei", "微軟正黑體", sans-serif;
--font-special: "Noto Serif TC", "Songti TC", serif;
```

`body` 使用 `var(--font-body)`。Operational Resources 的 Header、Hero、章節標題、tab、表格、地理優勢節點、按鈕與 Footer 均沿用這組字體；本頁沒有使用 `--font-special`。

本次瀏覽器檢查結果：

| 視窗 | Roboto | Noto Sans TC | Noto Serif TC | document.fonts |
|---|---:|---:|---:|---|
| 桌機 1440px | 可用 | 可用 | 可用 | `loaded` |
| 筆電 1280px | 可用 | 可用 | 可用 | `loaded` |
| 手機 390px | 可用 | 可用 | 可用 | `loaded` |

### 是否全域

是。字體 family 與 body 預設由 base 層統一管理；頁面 CSS 的明確 `font-family: var(--font-body)` 仍然指向全域 token。

## 2. 各區塊文字大小與全域性

以下為 JavaScript 正常啟用後的瀏覽器實際計算值；尺寸單位為 px。

| 區塊 | 桌機 1440 | 筆電 1280 | 手機 390 | 規則來源 | 是否全域 |
|---|---:|---:|---:|---|---|
| Header 導覽 | 17 | 17 | 15 | tokens／site-header／mobile query | 基礎全域，手機有覆寫 |
| Hero 麵包屑 | 14 | 14 | 14 | `--font-size-body-sm`／page-hero | 共用元件 |
| Hero 標題 | 43.2 | 40.32 | 28.8 | page-hero `clamp()` | 共用元件 |
| 營運資源總覽標題 | 33.12 | 30 | 30 | `--font-size-section-heading` | token 全域 |
| 營運資源總覽說明 | 17 | 17 | 15 | `--font-size-body`／body query | token 全域，手機有覆寫 |
| 資料切換 tab | 18 | 17.92 | 15 | `--font-size-body-lg`／mobile query | 元件／頁面專屬 |
| 資料 tab 說明 | 17 | 17 | 15 | body token | token 全域 |
| 表格表頭／內容 | 17 | 17 | 15 | `--table-font-size`／mobile query | table token 全域 |
| 表格註記 | 17 | 17 | 15 | body token | token 全域 |
| 職業安全衛生標題 | 33.12 | 30 | 30 | section heading token | token 全域 |
| 職業安全內文 | 17 | 17 | 15 | body token | token 全域 |
| 了解更多按鈕 | 17 | 17 | 15 | button token | 共用按鈕 |
| 地理優勢標題 | 33.12 | 30 | 30 | section heading token | token 全域 |
| 地理優勢說明 | 17 | 17 | 15 | body token | token 全域 |
| 地理節點距離數字 | 28 | 28 | 28 | Operational Resources `1.75rem` | 否 |
| 地理節點地點文字 | 17 | 17 | 15 | body token | token 全域 |
| Footer 公司資訊 | 14 | 14 | 14 | supporting token | 共用 Footer |
| Footer 欄位標題 | 17 | 17 | 15 | navigation token／mobile query | 共用 Footer |
| Footer 連結／版權 | 15 | 15 | 15 | supporting／Footer | 共用 Footer |

### 版型差異

- 桌機 1440px：section heading 33.12px、tab 18px、表格與一般內文 17px。
- 筆電 1280px：section heading 30px、tab 約 17.92px；一般內文仍為 17px。
- 手機 390px：section heading 30px、tab 與表格 15px、一般內文 15px；地理距離數字仍維持 28px。
- 520px 以下資料 tab 會使用 body 15px 並允許 tab 列水平捲動；這是 tab 元件的 RWD 規則，不是文件級水平溢位。

### 是否全域

- body、section heading、table、supporting、button 的基本尺寸來自全域 token。
- 資料 tab 的 18px／17.92px 與地理距離數字 28px 是頁面或元件專屬尺寸。
- Hero 標題與 Footer 尺寸由共用元件控制。

## 3. 各區塊文字顏色與全域性

| 區塊 | 實際顏色 | 規則來源 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333333` | `--color-text-primary`／site-header | 共用全域 |
| Hero 麵包屑／標題 | `#FFFFFF` | page-hero | 共用元件 |
| 區塊標題 | `#333333` | `--color-text-primary`／`--color-ink` | 全域 token |
| 一般說明／段落 | `#555555` | `--color-text-body` | 全域 token |
| 資料 tab 一般狀態 | `#737373` | `--color-text-muted` | 全域 token |
| 資料 tab active／hover／focus | `#F58214` | `--color-primary` | 全域品牌色，元件狀態使用 |
| 表格表頭背景 | `#4D4F53` | `--color-surface-dark` | 全域 token |
| 表格表頭文字 | `#FFFFFF` | `--color-surface` | 全域 token |
| 表格內容 | `#555555` | `--color-text-body` | 全域 token |
| 表格註記 | `#737373` | `--color-text-muted` | 全域 token |
| 地理距離數字 | `#F58214` | `--color-primary` | 全域品牌色，頁面專屬使用 |
| 地理地點文字 | `#555555` | `--color-text-body` | 全域 token |
| 主要按鈕文字 | `#FFFFFF` | `--button-primary-color` | 共用按鈕 |
| Footer 公司資訊／連結／版權 | `#D8D8D6` | Footer token | 共用 Footer |
| Footer 欄位標題 | `#F3F4F3` | Footer token | 共用 Footer |

### 顏色補充

- 各區塊標題下方的裝飾線使用主題橘漸層，不是文字顏色。
- 地理優勢的虛線連接與節點使用主題橘 42% 透明度。
- Hero 的白色文字搭配黑色透明漸層，地理 hub 使用實心主題橘背景。
- 桌機、筆電與手機沒有因 viewport 改變主要文字色；差異是 active 狀態與 RWD 配置。

## 4. 各區塊文字粗細與全域性

全站字重 token 位於 `wwwroot/css/base/tokens.css:33-39`：regular 400、heading 500、medium／semibold 600、bold 700；筆電區間另有全站 heading token 調整。

| 區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 是 |
| Hero 標題 | 500 | 400 | 500 | 共用元件；筆電有全站調整 |
| Hero 麵包屑目前頁 | 600 | 600 | 600 | 共用 breadcrumb／頁面狀態 |
| 章節標題 | 700 | 600 | 700 | section heading token；筆電有全站調整 |
| 資料 tab 一般狀態 | 400 | 400 | 400 | 頁面元件 |
| 資料 tab active | 600 | 600 | 600 | 全域 medium token |
| 表格表頭／內容 | 400 | 400 | 400 | table／body token |
| 地理距離數字 | 600 | 600 | 600 | 頁面專屬，使用 medium token |
| 地理地點文字 | 400 | 400 | 400 | body token |
| 了解更多按鈕 | 400 | 400 | 400 | 共用 button |
| Footer 公司資訊／連結／版權 | 400 | 400 | 400 | 共用 Footer |
| Footer 欄位標題 | 500 | 400 | 500 | 共用 Footer；筆電受全站調整 |

### 判斷

- Section heading 在桌機／手機為 700，筆電由全站 laptop token 降為 600。
- 資料 tab 只有 active 狀態使用 600，一般 tab 維持 400。
- 表格、段落與按鈕文字維持 400，頁面沒有額外加重一般內文。

## 5. 各區塊圖片圓角與全域性

| 圖片／區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Hero 圖片本身 | 0 | 0 | 0 | 共用 page-hero，圖片無圓角 |
| Hero 外框右下角 | 50.4px | 44.8px | 12px | 共用 page-hero 外框；mobile 有調整 |
| 職業安全圖片 media | 0 | 0 | 6px | 一般 media 使用 `--card-radius`，1100px 以上被專屬規則改直角 |
| 地理優勢節點卡片 | 6px | 6px | 6px | 使用 `--card-radius`，共用 token |
| 地理優勢中心 hub | 50% 圓形 | 50% 圓形 | 隱藏 | 頁面專屬；手機不顯示 |
| 資料表格 | 0 | 0 | 0 | 無表格圓角 |
| 標題裝飾線 | 0 | 0 | 0 | 漸層線，不是圖片 |

### 判斷

- 職業安全區塊在桌機／筆電是左右切分的整合版面，因此圖片 media 的圓角被最後規則設為 0；1099px 以下回到一般 16/9 或 4/3 media 並使用 6px 圓角。
- 地理優勢節點固定使用 6px，中心 hub 是獨立的 184px 橘色圓形，不是圖片本身的圓角。
- Hero 圖片保持直角，只有 Hero 外框有右下角圓角。

## 6. 各區塊圖片遮罩與全域性

本頁沒有 CSS `mask-image` 或 `-webkit-mask-image`。實際效果如下：

| 區塊 | 實際效果 | 設定 | 是否全域 |
|---|---|---|---|
| Hero | 黑色漸層 overlay | `rgb(0 0 0 / 18%)` 至 `rgb(0 0 0 / 30%)` | 共用 page-hero |
| Hero 圖片 | 裁切與位置調整 | `object-fit: cover`、`center 95%` | 共用元件＋頁面位置覆寫 |
| 職業安全圖片 | 容器裁切 | `object-fit: cover`；桌機 object-position `58% center` | 頁面專屬 |
| 地理優勢 Logo | 無圖片遮罩 | 白色 Logo 放在橘色 50% 圓形 hub 中 | 頁面專屬 |
| 地理優勢網絡 | CSS 虛線／陰影／動畫 | repeating-linear-gradient、box-shadow、transform | 頁面專屬 |

### RWD 差異

- Hero overlay 三種視窗均使用相同共用漸層。
- 職業安全圖片桌機／筆電使用 `58% center`，手機改回 `center`，並取消桌機版的水平位移。
- 地理 hub 在手機隱藏，手機改以兩組單欄節點顯示；這是版型調整，不是圖片 mask。
- `prefers-reduced-motion: reduce` 時，地理優勢進場、hub pulse 與 Logo glow 動畫會停用。

## 目前生效互動與結構

### 資料 tab

`wwwroot/js/pages/operational-resources.js:37-118` 會：

1. 建立 panel viewport 與 panel track。
2. 將三張表格放入同一個可切換 track，保留三個 tab 與對應 `role="tabpanel"`。
3. 依 active tab 更新 `aria-selected`、`aria-hidden`、`tabIndex` 與說明文字。
4. 支援滑鼠點擊、方向鍵、Home、End 鍵盤切換。
5. 依手機／非手機 viewport 計算 panel 高度。

本次瀏覽器確認頁面共有 3 張表格：廠區面積 4 列、機具配置 3 列、作業量能 4 列；正常載入時只顯示 active panel 的內容。

### 地理優勢動畫

`wwwroot/js/pages/operational-resources.js:5-35` 會以 IntersectionObserver 控制進場動畫；若使用者偏好減少動態或瀏覽器不支援 IntersectionObserver，則直接顯示內容。這不會改變文字尺寸、顏色、字重或圖片圓角。

## 區塊級完整盤點

### Hero

- 標題：桌機 43.2px／500，筆電 40.32px／400，手機 28.8px／500，白色。
- 麵包屑：14px，實際目前頁文字 600，白色。
- 圖片：無圖片圓角、無 mask；使用共用黑色漸層 overlay與 `center 95%` 裁切位置。
- 外框：底部主題橘邊線，右下角有共用 page-hero 外框圓角。

### 營運資料

- 區塊標題使用 section heading token；說明文字使用 body token。
- 三個 tab 一般狀態為 muted 灰色，active 為主題橘與 medium 字重。
- 表格表頭為深灰背景白字，內容為白底深灰文字與淡色分隔線。
- 表格本身沒有圓角；手機維持表格語意並對長內容使用 `overflow-wrap: anywhere`。

### 職業安全衛生

- 桌機／筆電為圖片與文字左右切分，圖片無圓角；1099px 以下改為圖片、標題、內文單欄。
- 標題桌機 33.12px、筆電／手機 30px；內文桌機／筆電 17px、手機 15px。
- 「了解更多」使用共用 primary button，4px 圓角、半透明主題橘背景，手機寬度略縮小但保留 52px 高度。

### 地理優勢

- 桌機／筆電以左右節點、中央橘色 Logo hub 與橘色虛線形成網絡圖。
- 手機隱藏中心 hub 與連接線，改為左右兩組上下排列的節點卡片。
- 節點卡片 6px 圓角；距離數字 28px／600／主題橘；地點文字使用 body token。

### Footer

- 沿用共用 Footer，不是 Operational Resources 專屬樣式。
- 公司資訊 14px；欄位標題桌機／筆電 17px、手機 15px；連結與版權 15px。
- Footer 文字色與主內容區的 `#333333`／`#555555` 分離。

## 驗證範圍與限制

### 已驗證

- 已讀取 Operational Resources HTML、CSS、JavaScript，以及共用 tokens、reset、page-hero、header、footer、buttons 樣式。
- 已用本機 ASP.NET Core 實際載入 `/operational-resources`。
- 已在 Edge 瀏覽器讀取 1440×900、1280×800、390×844 的計算字體、尺寸、顏色、字重、圖片圓角、overlay、filter、表格數量與溢位狀態。
- 已確認三種視窗均有 3 張表格，且文件 `scrollWidth` 等於 viewport 寬度。

### 尚未驗證

- 尚未以實體手機、Safari、Firefox 或其他實體瀏覽器進行人工驗收。
- 尚未進行螢幕閱讀器與完整鍵盤操作的人工無障礙驗收；本報告僅記錄原始語意、ARIA 與瀏覽器計算結果。
- 尚未逐一以 `prefers-reduced-motion` 開關重跑完整視覺流程；相關結論來自 CSS／JavaScript 條件檢查。
- 本報告沒有修改 Operational Resources 程式碼，也未驗證正式環境 CDN 或快取版本與本機結果是否完全一致。

