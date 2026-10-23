# Affiliates 頁面樣式分析

> 分析日期：2026-10-23  
> 分析路由：`/affiliates`  
> 分析範圍：桌機瀏覽器、筆電瀏覽器、行動裝置  
> 分析方式：檢查 `affiliates.html`、`affiliates.css`、`affiliates.js`、共用 tokens／Hero／Header／Footer 樣式，並以本機 Release 版本實際計算瀏覽器樣式。  
> 本次僅產出分析文件，未修改 Affiliates 頁面程式碼。

## 一、目前頁面結構與生效版型

Affiliates 頁面目前由以下主要區塊組成：

- 共用 Header 與導覽列
- Affiliates Hero、麵包屑與「關係企業」標題
- 關係企業 Tab 導覽
- 六個企業面板：世新貨櫃、亞柏油品、亞柏會舘、亞柏羽球隊、太報、ALPHA TOTAL SOLUTION
- 企業介紹文字與圖片輪播
- 服務項目、品質肯定、地點資訊與 CTA 等面板專屬內容
- 共用 Footer

目前互動由 `affiliates.js` 控制：

- 桌機使用垂直 Tab，位於內容左側並 sticky 於 `top: 102px`。
- 1024px 以下改成水平滑動 Tab 列。
- Tab 以 `aria-selected`、`aria-controls`、`aria-hidden` 與 `hidden` 控制面板顯示。
- 桌機鍵盤使用上下方向鍵切換，平板／手機使用左右方向鍵切換。
- 企業圖片使用 carousel，支援進度按鈕、滑動手勢、`aria-hidden` 與 reduced-motion。
- 亞柏油品地圖使用 marker 選取地點，選取後切換地點卡片與 `aria-pressed` 狀態。

## 二、各裝置實際驗證尺寸

| 裝置類型 | 驗證視窗 | 主要結果 |
|---|---:|---|
| 桌機瀏覽器 | 1440 × 900 | 左側垂直 sticky Tab、右側內容面板，無水平溢出 |
| 筆電瀏覽器 | 1280 × 800 | 左側垂直 sticky Tab、右側內容面板，無水平溢出 |
| 行動裝置 | 390 × 844 | 水平滑動 Tab、單欄內容與圖片，無文件層級水平溢出 |

三種視窗皆確認：

- `document.fonts.status` 為 `loaded`。
- Hero、企業輪播圖片與獎項圖片均成功載入，`naturalWidth`／`naturalHeight` 為非零值。
- 初始顯示世新貨櫃面板，其餘面板為 hidden。
- 切換至亞柏油品後，Tab 的 `aria-selected` 與面板 hidden 狀態正確更新。
- 手機 Tab 列內容寬度約 648px，可在 350px 可視寬度內水平滑動。
- 文件層級沒有水平溢出。

## 三、六項樣式分析

### 1. 字體使用什麼？是否是全域？

#### 全域字體

網站使用以下主要字體堆疊：

```css
Roboto, "Noto Sans TC", "Microsoft JhengHei", 微軟正黑體, sans-serif
```

部分企業內容使用全域 `--font-special` 作為品牌／引言例外：

```css
"Noto Serif TC", "Songti TC", serif
```

#### Affiliates 實際字體

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Body 基準 | Roboto 優先 | Roboto 優先 | 是 |
| Header 導覽 | Roboto | Roboto | 是 |
| Breadcrumb | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| Hero 標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 企業 Tab | Roboto | Roboto | 是 |
| 企業標題／內文 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 亞柏油品引言 | Noto Serif TC／Songti TC／serif | Noto Serif TC／Songti TC／serif | 局部特殊字體 |
| 服務、地點與獎項文字 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| Footer | Roboto | Roboto | 是 |

結論：Affiliates 大部分文字沿用網站全域無襯線字體；亞柏油品引言使用特殊襯線字體，是頁面局部例外。

### 2. 各區塊文字大小是多少？是否是全域？

#### 桌機瀏覽器：1440px

| 區塊 | 實際大小 | 來源／性質 |
|---|---:|---|
| Body 基準 | 17px | 全域 body |
| Header 導覽 | 17px | 共用 Header |
| Breadcrumb | 14px | 共用 Hero Breadcrumb |
| Hero 標題 | 43.2px | 共用 Hero fluid heading |
| 企業 Tab | 17px | Affiliates Tab |
| 企業標題 h2 | 24px | `--font-size-h3` |
| 服務／區塊標題 h3 | 20px | card title compact |
| 一般內文／列表 | 17px | body token |
| 亞柏油品引言 | 17px | body copy，特殊字體 |
| 地點標籤 | 13px | location label |
| 獎項年份／發行者／名稱 | 17px | body copy |
| Footer 標題 | 17px | 共用 Footer |
| Footer 連結／版權 | 15px | 共用 Footer |

#### 筆電瀏覽器：1280px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 17px |
| Header 導覽 | 17px |
| Breadcrumb | 14px |
| Hero 標題 | 40.32px |
| 企業 Tab | 17px |
| 企業標題 h2 | 約 23.04px |
| 服務／區塊標題 h3 | 20px |
| 一般內文／列表 | 17px |
| 地點標籤 | 13px |
| Footer 標題 | 17px |
| Footer 連結／版權 | 15px |

#### 行動裝置：390px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 15px |
| Header 導覽 | 15px |
| Breadcrumb | 14px |
| Hero 標題 | 28.8px |
| 企業 Tab | 15px |
| 企業標題 h2 | 20px |
| 服務／區塊標題 h3 | 20px |
| 一般內文／列表 | 15px |
| 亞柏油品引言 | 15px |
| 地點標籤 | 13px，另有手機 marker label 12px |
| 獎項年份／發行者／名稱 | 15px |
| Footer 標題 | 15px |
| Footer 連結／版權 | 15px |

結論：Body、Hero、Footer、一般內文與常用標題大多使用全域 token；企業 Tab、面板標題、地點標籤與獎項資訊則由 Affiliates 元件規則補充。面板標題在筆電受 fluid heading 與 laptop responsive 規則影響。

### 3. 各區塊文字顏色是多少？是否是全域？

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333` | `#333` | 共用文字色 |
| Breadcrumb | `#fff` | `#fff` | 共用 Hero Breadcrumb |
| Hero 標題 | `#fff` | `#fff` | 共用 Hero |
| 企業 Tab 一般 | `#555` | `#555` | muted 色 |
| 企業 Tab hover／focus | `#333` | `#333` | Affiliates 互動狀態 |
| 企業 Tab active | `#333` | `#333` | active 狀態 |
| Tab active 指示線 | `#F58214` | `#F58214` | 主題橘 |
| 企業標題 | `#333` | `#333` | ink／text primary |
| 企業內文／列表 | `#555` | `#555` | muted／body 色 |
| 服務項目 bullet | `#F58214` | `#F58214` | 主題橘 |
| 地點標籤文字 | 約 `#5C5C5C` | 約 `#5C5C5C` | Affiliates location token |
| 地點內容文字 | 約 `#4A4A4A` | 約 `#4A4A4A` | Affiliates location token |
| 地點標籤背景 | `#F2F2F2` | `#F2F2F2` | 局部 location 規則 |
| 獎項年份／發行者 | `#333` | `#333` | ink 色 |
| 獎項名稱 | `#555` | `#555` | muted 色 |
| 地圖 marker | 主題橘，active 為深色 | 相同 | Affiliates map 狀態 |
| Footer 標題 | `#F3F4F3` | `#F3F4F3` | 共用 Footer |
| Footer 連結／版權 | `#D8D8D6` | `#D8D8D6` | 共用 Footer |

結論：基本文字層級沿用全域色彩 token；Tab、bullet、地圖 marker 與地點卡片屬於 Affiliates 局部互動／資訊色彩。active Tab 的文字仍是深色，主要透過主題橘指示線辨識選取狀態。

### 4. 各區塊文字粗細是多少？是否是全域？

| 區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 共用 Header |
| Breadcrumb 目前頁 | 600 | 600 | 600 | 共用 Breadcrumb |
| Hero 標題 | 500 | 400 | 500 | Hero／responsive 規則 |
| 企業 Tab 一般 | 400 | 400 | 400 | Affiliates Tab |
| 企業 Tab active | 600 | 600 | 600 | Affiliates active 狀態 |
| 企業標題 h2 | 500 | 500 | 500 | 面板標題；部分 laptop 規則 |
| 服務／區塊標題 h3 | 500 | 500 | 500 | card title／section heading |
| 企業內文／列表 | 400 | 400 | 400 | 全域 regular |
| 亞柏油品引言 | 400／局部 medium 容器 | 400／局部 medium 容器 | 400／局部 medium 容器 | 特殊字體內容 |
| 地點標籤 | 600 | 600 | 600 | location label |
| 獎項年份／發行者 | 600 | 600 | 600 | award meta |
| 獎項名稱 | 400 | 400 | 400 | award name |
| Footer 標題 | 500 | 400 | 500 | 共用 Footer responsive 規則 |
| Footer 連結／版權 | 400 | 400 | 400 | 共用 Footer |

結論：目前實際 active Tab 為 600，文字顏色仍為 `#333`；桌機與筆電企業 Tab 皆維持 600 active 粗細。企業標題與服務標題多為 500，筆電部分特定區塊會透過 responsive 規則降為 500／regular 層級。

### 5. 各區塊圖片圓角是多少？是否是全域？

| 圖片／區塊 | 桌機 | 筆電 | 行動裝置 | 目前是否生效 |
|---|---:|---:|---:|---|
| Affiliates Hero 圖片本身 | 0px | 0px | 0px | 是 |
| Hero 外層右下角 | 約 50.4px | 約 44.8px | 12px | 是，共用 Hero |
| 企業介紹 carousel 圖片 | 6px | 6px | 6px | 是 |
| 企業 carousel 外框 | 6px | 6px | 6px | 是，overflow 裁切 |
| 太報 feature 圖片 | 6px | 6px | 6px | 是 |
| 獎項圖片 | 0px | 0px | 0px | 是，使用 contain |
| 油品地圖圖片 | 0px | 0px | 0px | 是，地圖本身無圓角 |
| 地圖 marker dot | full | full | full | 是，圓形 marker |
| 地點資訊標籤 | 999px | 999px | 999px | 是，膠囊標籤 |

企業介紹 carousel、太報圖片與共用卡片圓角使用全域 `--card-radius`，目前為 6px。獎項、地圖等資訊圖不使用圓角；Hero 圓角作用在外層而不是圖片本身。

### 6. 各區塊圖片遮罩是多少？是否是全域？

Affiliates 目前真正生效的圖片遮罩主要只有 Hero overlay：

```css
linear-gradient(
  180deg,
  rgb(0 0 0 / 18%) 9.88%,
  rgb(0 0 0 / 30%) 100%
)
```

| 圖片區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|---|
| Affiliates Hero | 頂部約 18%，底部約 30% | 相同 | 相同 | 共用 Hero 預設值 |
| 企業 carousel 圖片 | 無 overlay | 無 overlay | 無 overlay | 不適用 |
| 太報 feature 圖片 | 無 overlay | 無 overlay | 無 overlay | 不適用 |
| 獎項圖片 | 無 overlay | 無 overlay | 無 overlay | 不適用 |
| 油品地圖圖片 | 無 overlay | 無 overlay | 無 overlay | 不適用 |
| 地圖 marker | 無圖片遮罩，使用 dot／active 色 | 相同 | 相同 | 局部互動規則 |

Hero overlay 屬於共用 Page Hero 預設遮罩，Affiliates 只覆寫圖片位置為 `center 90%`；企業內容圖片本身沒有黑色遮罩，主要依靠圓角、圖片裁切與文字分區建立層次。

## 四、目前 Affiliates 各區塊的版型細節

### Hero

- Hero 桌機高度約 350px，筆電約 332.8px，手機 280px。
- 圖片位置為 `center 90%`。
- Hero 標題與 Breadcrumb 靠左排列。
- Hero 外層保留主題橘底線與右下角 responsive 圓角。
- 圖片本身沒有圓角，外層負責裁切。

### 企業 Tab

- 桌機／筆電：左側欄寬約 180px，Tab 內容垂直排列。
- 桌機／筆電：Tab sticky 於 `top: 102px`，低於固定 Header。
- 左側有 2px 灰色基準線，active Tab 以主題橘 2px 線覆蓋。
- 1023px 以下：Tab 改為水平內容列，底部使用 1px 邊線。
- 手機 Tab 高度 52px、左右 padding 16px，內容寬度約 648px。
- active Tab 以底部 2px 主題橘線表示，文字維持深色並提高粗細。

### 企業介紹與圖片輪播

- 桌機／筆電：企業介紹為文字與圖片雙欄，圖片欄約佔右側。
- 手機：企業介紹改為單欄，文字與圖片依結構順序排列。
- carousel 使用 3:2 圖片比例，外框與圖片皆為 6px 圓角。
- 圖片使用 `object-fit: cover`，各企業可有不同圖片數量。
- 進度控制列位於圖片下方，單條高度 2px，active fill 使用主題橘。
- 點擊進度按鈕或滑動圖片會更新 active slide 與 `aria-hidden`。
- reduced-motion 時停用 slide transition 與進度動畫。

### 服務項目與獎項

- 服務清單桌機／筆電通常為雙欄，手機改為單欄。
- 項目 bullet 為主題橘 8px 方形標記。
- 獎項桌機／筆電為三欄卡片，圖片容器約 200–240px 高。
- 手機獎項改為單欄列表，獎狀圖片約 100×110px，文字置於右側。
- 獎狀圖片使用 `object-fit: contain`，不加黑色 overlay 或圓角。

### 亞柏油品地點資訊

- 桌機／筆電地圖與地點明細採雙欄排列。
- 地圖圖片使用正方形容器與 `object-fit: contain`。
- 地圖 marker 為 24×24px 透明按鈕，內部 dot 為 10px 圓形。
- active marker 會變更為深色並放大 1.35 倍。
- 地點卡片以頂部 1px 分隔線區隔，不使用卡片背景或圓角。
- 手機地圖與明細改為單欄，地圖會配合窄版位置調整。

## 五、共用與頁面專用規則整理

### 全域／共用規則

- 字體家族、body 基準文字與 responsive body 尺寸。
- Header、Breadcrumb、Footer 文字系統。
- Page Hero 高度、底線、外層圓角、圖片基本處理與預設 overlay。
- heading、body、label、card title 等 typography token。
- 主題橘、文字色、muted 色、inverse 色與 line 色。
- `--card-radius: 6px`、`--radius-full: 999px` 與共用 spacing token。
- site-container、content gutter 與固定 Header 高度。

### Affiliates 頁面專用規則

- Hero 圖片位置 `center 90%`。
- 左側 sticky 垂直 Tab 與 1024px 以下水平滑動 Tab。
- active Tab 的橘色指示線與 `aria-selected` 狀態。
- 六個企業面板的隱藏／顯示與面板進入動畫。
- 企業圖片 carousel、progress bar、滑動手勢與 reduced-motion 行為。
- 亞柏油品地圖 marker、地點卡片與 active marker 狀態。
- 企業服務清單、獎項 grid、手機獎項列表與特定企業版型。
- 局部特殊字體，例如亞柏油品引言。

## 六、發現與建議

1. Affiliates 是多企業、多版型內容頁，不同面板有各自的圖片、服務、地點與 CTA；若要調整樣式，應以面板或元件範圍修改，不宜直接改全域 `.affiliate-panel` 造成所有企業同步變更。
2. 桌機 Tab 使用 sticky，`top: 102px` 是配合固定 Header 的重要定位值；若調整 Header 高度或 Tab 間距，需要同步檢查 sticky 位置與內容遮擋。
3. 手機 Tab 的水平溢位是元件內預期行為，不是頁面水平溢出問題；應保留 `overflow-x: auto` 與 `touch-action: pan-x`。
4. Hero 使用共用 18%／30% 黑色漸層，企業圖片與獎項圖片沒有 overlay；若要加強企業圖片文字可讀性，應新增局部 media overlay，不應直接改 Hero token。
5. 企業 carousel 圖片與太報 feature 圖片使用 6px 圓角，獎項與地圖圖片不使用圓角，這是依圖片內容角色區分的設計，不宜一律套用圓角。
6. active Tab 文字維持 `#333`，主要依靠橘色指示線與 600 粗細辨識；若改成橘色文字，需一併評估六個 Tab 在窄版水平列中的對比與一致性。
7. 亞柏油品地點地圖包含大量定位與手機特殊偏移規則，修改地圖容器或圖片比例時必須同步檢查 marker 與標籤位置。

## 七、驗證紀錄

### 已驗證

- 已檢查 `affiliates.html`、`affiliates.css`、`affiliates.js`。
- 已檢查全域 tokens、Page Hero、Header、Footer 與按鈕樣式。
- 已以本機 ASP.NET Release 版本開啟 `/affiliates`。
- 已驗證桌機 1440 × 900。
- 已驗證筆電 1280 × 800。
- 已驗證行動裝置 390 × 844。
- 已確認 Hero、企業輪播與獎項圖片成功載入。
- 已確認字體載入完成。
- 已確認企業 Tab 切換、面板 hidden 狀態與 keyboard tabindex 更新。
- 已確認圖片 carousel 進度按鈕會更新 active slide 與 `aria-hidden`。
- 已確認手機 Tab 具備水平滑動寬度且沒有文件層級水平溢出。
- 已確認三種視窗沒有文件層級水平溢出。

### 尚未驗證

- 未以實體 iOS／Android 裝置驗證。
- 未以 Safari、Firefox 等其他瀏覽器進行跨瀏覽器實機驗證。
- 未進行完整人工無障礙驗收；本次僅檢查既有 role、ARIA、hidden、tabindex、focus 與 reduced-motion 程式結構。
- 未完整逐一點擊六個企業面板的所有外部連結與所有地點 marker。
- 未測試極長企業名稱、長地址、超長獎項文字與極窄螢幕尺寸。

