# News 頁面樣式分析

> 分析日期：2026-10-23  
> 分析路由：`/news`  
> 分析範圍：桌機瀏覽器、筆電瀏覽器、行動裝置  
> 分析方式：檢查 HTML、Razor／靜態頁面結構、CSS cascade、JavaScript 動態產生內容，並以本機建置版本實際計算瀏覽器樣式。  
> 本次僅產出分析文件，未修改 News 頁面程式碼。

## 一、目前頁面結構與生效版型

News 頁面目前由以下主要區塊組成：

- 共用 Header 與導覽列
- News Hero 圖片與頁面標題
- 分類篩選列
- 最新消息文字列表
- 分頁控制
- 共用 Footer

目前列表不是圖片卡片牆，而是資料列形式：

- 桌機與筆電：日期、分類、標題、右側操作欄的單列資料結構。
- 行動裝置：日期／分類與標題改為直向摘要排列。
- 目前 `news.js` 產生的 `.news-card` 不會插入 `.news-card__media` 圖片區塊。
- 即使資料來源存在 `imageUrl`，目前頁面也不會將其渲染為列表圖片。
- News 頁面目前沒有獨立的「置頂消息」或 Feature Card 結構，所有消息使用相同列表樣式。

`news.css` 前段仍保留較早期的三欄圖片卡片樣式，但後段的 `.news-page .news-list`、`.news-card` 與 `.news-card__media { display: none; }` 覆蓋了該版型，因此不應將前段圖片卡片規則視為目前畫面結果。

## 二、各裝置實際驗證尺寸

| 裝置類型 | 驗證視窗 | 主要結果 |
|---|---:|---|
| 桌機瀏覽器 | 1440 × 900 | 顯示桌機列表版型，內容寬度 1120px，無水平溢出 |
| 筆電瀏覽器 | 1280 × 800 | 顯示桌機列表版型，內容寬度 1120px，無水平溢出 |
| 行動裝置 | 390 × 844 | 顯示手機直向列表版型，內容寬度 350px，無水平溢出 |

三種視窗皆確認：

- `document.fonts.status` 為 `loaded`。
- 文件寬度與視窗寬度一致，未發現水平捲軸。
- API 載入 5 筆消息、2 個分類與 3 個分頁控制項。
- 目前實際顯示 5 筆文字消息。

## 三、六項樣式分析

### 1. 字體使用什麼？是否是全域？

#### 全域字體

目前網站使用以下字體堆疊：

```css
Roboto, "Noto Sans TC", "Microsoft JhengHei", 微軟正黑體, sans-serif
```

News 頁面的 body 與主要文字沿用全域字體，並非 News 頁面自行指定另一套字體。

#### News 實際字體

| 區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---:|---:|---:|---|
| Body 基準 | Roboto 優先 | Roboto 優先 | Roboto 優先 | 是 |
| Header 導覽 | Roboto | Roboto | Roboto | 是 |
| Hero 標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 分類篩選 | Roboto | Roboto | Roboto | 是 |
| 消息列表 | Roboto | Roboto | Roboto | 是 |
| 分頁 | Roboto | Roboto | Roboto | 是 |
| Footer | Roboto | Roboto | Roboto | 是 |

結論：News 頁面沒有額外的頁面專用字體，字體家族屬於網站全域設定。

### 2. 各區塊文字大小是多少？是否是全域？

#### 桌機瀏覽器：1440px

| 區塊 | 實際大小 | 來源／性質 |
|---|---:|---|
| Body 基準 | 17px | 全域 body 設定 |
| Header 導覽 | 17px | 共用 Header，沿用 body |
| Breadcrumb | 14px | 共用元件／頁面導覽設定 |
| Hero 標題 | 43.2px | 共用 Hero 的 fluid heading |
| 分類篩選按鈕 | 18px | `body-lg` 尺寸 |
| 消息日期 | 17px | News 列表沿用 body 尺寸 |
| 消息分類 | 17px | News 列表沿用 body 尺寸 |
| 消息標題 | 18px | News 專用 card title |
| 分頁一般文字 | 17px | body 尺寸 |
| 分頁目前頁碼 | 17px | body 尺寸 |
| Footer 標題 | 17px | 共用 Footer |
| Footer 連結／版權 | 15px | 共用 Footer |

#### 筆電瀏覽器：1280px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 17px |
| Header 導覽 | 17px |
| Breadcrumb | 14px |
| Hero 標題 | 40.32px |
| 分類篩選按鈕 | 17.92px |
| 消息日期／分類 | 17px |
| 消息標題 | 18px |
| 分頁文字 | 17px |
| Footer 標題 | 17px |
| Footer 連結／版權 | 15px |

#### 行動裝置：390px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 15px |
| Header 導覽 | 15px |
| Breadcrumb | 14px |
| Hero 標題 | 28.8px |
| 分類篩選按鈕 | 17px |
| 消息日期／分類 | 15px |
| 消息標題 | 15px |
| 分頁一般文字 | 14px |
| 目前頁碼 | 14px |
| Footer 標題 | 15px |
| Footer 連結／版權 | 15px |

結論：body、Breadcrumb、Footer 與常用文字尺寸大多由全域 token 或共用元件提供；消息標題、分類篩選與 Hero 標題則是 News／Hero 版型的局部尺寸。桌機與筆電採 fluid heading，手機再由 media query 調整。

### 3. 各區塊文字顏色是多少？是否是全域？

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333` | `#333` | 共用文字色 |
| Breadcrumb 目前頁 | `#fff` | `#fff` | 共用 Hero／Breadcrumb |
| Hero 標題 | `#fff` | `#fff` | 共用 Hero |
| 分類篩選文字 | `#555` | `#555` | 共用 body muted 色系 |
| 分類 active 底線 | `#F58214` | `#F58214` | 主題橘，News 局部狀態 |
| 消息日期 | `#555` | `#555` | News 列表局部設定 |
| 消息分類 | `#F58214` | `#F58214` | 主題橘，News 列表局部設定 |
| 消息標題 | `#333` | `#333` | News 列表／連結文字 |
| 消息標題 hover | `#F58214` | 維持 `#333` | News 桌機互動狀態 |
| 分頁一般文字／箭頭 | `#737373` 或 `#333` | `#737373` 或 `#333` | 共用 pagination 色系 |
| 分頁目前頁碼 | `#fff` | `#fff` | 共用 pagination inverse 狀態 |
| Footer 標題 | `#F3F4F3` | `#F3F4F3` | 共用 Footer |
| Footer 連結／版權 | `#D8D8D6` | `#D8D8D6` | 共用 Footer |

結論：基本文字色、白色反白文字與 Footer 顏色屬於全域／共用元件；消息分類與 active 底線使用主題橘，但其套用位置屬於 News 元件局部規則。手機刻意停用標題 hover 變橘，避免觸控狀態殘留。

### 4. 各區塊文字粗細是多少？是否是全域？

| 區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 共用 Header |
| Breadcrumb 目前頁 | 600 | 600 | 600 | 共用 Breadcrumb |
| Hero 標題 | 500 | 400 | 500 | Hero／responsive 規則 |
| 分類篩選 | 400 | 400 | 400 | News filter |
| 消息日期 | 400 | 400 | 400 | News 列表 |
| 消息分類 | 400 | 400 | 400 | News 列表 |
| 消息標題 | 400 | 400 | 400 | News 列表 |
| 分頁一般文字 | 400／600（依箭頭或控制項） | 400／600 | 400／600 | Pagination 共用規則 |
| 分頁目前頁碼 | 600 | 600 | 600 | Pagination current 狀態 |
| Footer 標題 | 500 | 400 | 500 | 共用 Footer responsive 規則 |
| Footer 連結／版權 | 400 | 400 | 400 | 共用 Footer |

結論：News 消息列表本身全部採 regular `400`，沒有以粗體凸顯標題。Breadcrumb、目前分頁與部分共用元件使用 `600`；這些屬於元件狀態或共用元件規則，不是 News 全域文字粗細。

### 5. 各區塊圖片圓角是多少？是否是全域？

目前 News 列表沒有實際渲染圖片，因此消息卡片沒有圖片圓角。

| 圖片／區塊 | 桌機 | 筆電 | 行動裝置 | 目前是否生效 |
|---|---:|---:|---:|---|
| News Hero 圖片本身 | 0px | 0px | 0px | 是 |
| Hero 外層右下角 | 約 50.4px | 約 44.8px | 12px | 是 |
| News 列表消息卡片 | 0px | 0px | 0px | 是，但卡片非圖片卡片 |
| 舊版 `.news-card__media` | 約 16px／卡片型圓角 | 約 16px／卡片型圓角 | 約 16px | 否，media 被隱藏且 DOM 未產生 |

News Hero 的外層右下圓角屬於共用 Page Hero／responsive 規則；列表目前是白底無圓角資料列。舊版圖片卡片相關圓角仍在 CSS 中，但不代表目前畫面會顯示該圓角。

### 6. 各區塊圖片遮罩是多少？是否是全域？

目前真正可見的 News 圖片是 Hero 背景／圖片，實際遮罩為：

```css
linear-gradient(
  rgba(0, 0, 0, 0.18) 9.88%,
  rgba(0, 0, 0, 0.30) 100%
)
```

| 圖片區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|---|
| News Hero | 黑色漸層，頂部約 18%，底部約 30% | 相同 | 相同 | 共用 Hero 規則 |
| News 列表圖片 | 無實際圖片 | 無實際圖片 | 無實際圖片 | 不適用 |
| 舊版消息卡片 media | CSS 曾有半透明黑色 overlay | CSS 曾有半透明黑色 overlay | CSS 曾有半透明黑色 overlay | 否，目前未生效 |

News Hero 的遮罩是為了維持標題在圖片上的可讀性，屬於共用 Hero 類型的設定；News 頁面只透過 `--page-hero-image-position` 調整圖片位置，桌機約為 `center 75%`，手機約為 `center 60%`。

## 四、目前 News 列表的實際版型細節

### 桌機／筆電

- `.news-list` 實際為直向 flex list，不是前段 CSS 所定義的三欄 grid。
- 消息列寬度上限為 1120px。
- 每列桌機高度約 80px，水平排列日期、分類、標題與操作欄。
- 消息列上下 padding 為 16px，列與列之間以底線區隔。
- 消息卡片為白底、無陰影、無圓角。
- `.news-card__media` 不顯示。
- attachment 狀態目前不顯示。
- 桌機滑入或鍵盤 focus 時，標題可變為主題橘並顯示箭頭；目前 JavaScript 會移除原本的 read-more 文字節點並插入箭頭 SVG。

### 行動裝置

- 消息列表維持直向 flex list。
- 內容寬度為視窗減去左右 gutter，390px 視窗實際內容寬度約 350px。
- 每列約 80px，高度由日期／分類與標題內容共同決定。
- 日期、分類與標題改為直向排列，文字大小皆為 15px。
- 每列底線為 2px。
- 箭頭隱藏，觸控裝置不套用 hover 變色。
- 分類列保留水平溢位能力，未發現目前兩個分類造成水平溢出。

## 五、共用與頁面專用規則整理

### 全域／共用規則

- 字體家族與 body 基準文字。
- Header 導覽文字。
- Breadcrumb 的文字大小與目前頁粗細。
- Page Hero 標題、白色文字與圖片遮罩。
- Footer 文字與連結顏色。
- Pagination 的圓形控制項、目前頁反白樣式與 focus 行為。
- 主要色彩 token，例如文字色、muted 色、inverse 色與主題橘。

### News 頁面專用規則

- News Hero 圖片位置：桌機約 `center 75%`，手機約 `center 60%`。
- 分類篩選列與 active 橘色底線。
- 消息列表從舊版圖片卡片改為文字資料列的最終 cascade 規則。
- 日期、分類、標題欄位的 grid／mobile flex 排列。
- 消息標題 hover 變色與箭頭顯示。
- News 分類、分頁、空狀態與 API 動態渲染邏輯。

## 六、發現與建議

1. 目前 News 頁面已經是文字列表，不是圖片卡片列表；若需求是調整「消息圖片大小」，需要先確認是否要恢復或新增消息圖片呈現，不能只修改目前未生效的 `.news-card__media` CSS。
2. API／資料檔包含圖片欄位，但目前 `news.js` 的 card renderer 沒有使用 `imageUrl`；這是資料結構與目前 UI 呈現之間的落差。
3. `news.css` 同時保留舊版圖片卡片 CSS 與後段文字列表 CSS，閱讀與維護時容易誤判。若未來確認不再恢復圖片卡片，可另行安排小範圍 CSS 清理，但不建議在本次分析中直接移除。
4. 消息標題目前桌機與手機皆為 regular 400，視覺層級主要靠 18px／15px 尺寸、欄位位置與留白建立；若要提高可掃讀性，可另行評估只調整標題粗細，不應連動修改全域 body。
5. 目前三種視窗均未發現水平溢出；分類資料增加後，仍應維持分類列可水平滑動的行為。

## 七、驗證紀錄

### 已驗證

- 已檢查 `news.html`、`news.css`、`news.js` 與 News 資料來源。
- 已以本機 Release 建置版本開啟 `/news`。
- 已驗證桌機 1440 × 900。
- 已驗證筆電 1280 × 800。
- 已驗證行動裝置 390 × 844。
- 已確認字體載入完成。
- 已確認三種視窗沒有文件層級水平溢出。
- 已確認目前列表實際為文字資料列，沒有 `.news-card__media` 實際 DOM。

### 尚未驗證

- 未以實體 iOS／Android 裝置驗證。
- 未以 Safari、Firefox 等其他瀏覽器進行跨瀏覽器實機驗證。
- 未進行完整人工無障礙驗收；本次僅檢查既有 ARIA、focus 與分頁狀態在程式結構中的保留情形。
- 未驗證正式部署環境的 API 資料量與圖片欄位內容。

