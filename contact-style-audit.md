# Contact 頁面樣式分析

> 分析日期：2026-10-23  
> 分析路由：`/contact`  
> 分析範圍：桌機瀏覽器、筆電瀏覽器、行動裝置  
> 分析方式：檢查 `contact.html`、`contact.css`、共用 tokens／Hero／Header／Footer 樣式，並以本機 Release 版本實際計算瀏覽器樣式。  
> 本次僅產出分析文件，未修改 Contact 頁面程式碼。

## 一、目前頁面結構與生效版型

Contact 頁面目前由以下主要區塊組成：

- 共用 Header 與導覽列
- Contact Hero、麵包屑與「聯絡我們」標題
- 聯絡資訊區：公司地址、電話／Email、服務時間、停車資訊
- Google Maps 外部 iframe 地圖
- 共用 Footer

目前頁面沒有：

- 站內聯絡表單
- 額外內容圖片卡片
- 自訂 JavaScript 互動元件
- Contact 頁面專用表單驗證或送出流程

Contact 的主要 RWD 斷點為：

- `981px` 以上：資訊與地圖雙欄，兩欄高度拉齊。
- `980px` 以下：資訊與地圖改為單欄。
- `760px` 以下：地圖比例由 16:9 改為 4:3。

## 二、各裝置實際驗證尺寸

| 裝置類型 | 驗證視窗 | 主要結果 |
|---|---:|---|
| 桌機瀏覽器 | 1440 × 900 | 資訊／地圖雙欄，地圖約 736.8 × 444.8px，無水平溢出 |
| 筆電瀏覽器 | 1280 × 800 | 資訊／地圖雙欄，地圖約 655.1 × 444px，無水平溢出 |
| 行動裝置 | 390 × 844 | 資訊／地圖單欄，地圖 350 × 262.5px，無水平溢出 |

三種視窗皆確認：

- `document.fonts.status` 為 `loaded`。
- Hero 圖片實際成功載入，`naturalWidth`／`naturalHeight` 為非零值。
- 文件寬度沒有超過視窗寬度。
- 地址、電話、Email、服務時間與停車資訊均正常顯示。
- Google Maps iframe 存在且具備描述性 `title`。

## 三、六項樣式分析

### 1. 字體使用什麼？是否是全域？

#### 全域字體

網站使用以下主要字體堆疊：

```css
Roboto, "Noto Sans TC", "Microsoft JhengHei", 微軟正黑體, sans-serif
```

Contact 頁面沒有設定特殊襯線字體或頁面專用字體。

#### Contact 實際字體

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Body 基準 | Roboto 優先 | Roboto 優先 | 是 |
| Header 導覽 | Roboto | Roboto | 是 |
| Breadcrumb | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| Hero 標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 資訊標籤 dt | Roboto | Roboto | 是 |
| 聯絡資訊 dd | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 電話／Email | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| Footer | Roboto | Roboto | 是 |

結論：Contact 頁面所有可見文字都沿用網站全域無襯線字體，沒有額外的 Contact 專用字體。

### 2. 各區塊文字大小是多少？是否是全域？

#### 桌機瀏覽器：1440px

| 區塊 | 實際大小 | 來源／性質 |
|---|---:|---|
| Body 基準 | 17px | 全域 body |
| Header 導覽 | 17px | 共用 Header |
| Breadcrumb | 14px | 共用 Hero Breadcrumb |
| Hero 標題 | 43.2px | 共用 Hero fluid heading |
| 聯絡資訊標籤 | 14px | Contact label |
| 地址／聯絡／服務／停車內容 | 18px | `body-lg` |
| 電話／Email | 18px | 沿用 dd 的 body-lg |
| Google Maps iframe | 不適用 | 外部嵌入內容 |
| Footer 標題 | 17px | 共用 Footer |
| Footer 連結／版權 | 15px | 共用 Footer |

#### 筆電瀏覽器：1280px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 17px |
| Header 導覽 | 17px |
| Breadcrumb | 14px |
| Hero 標題 | 40.32px |
| 聯絡資訊標籤 | 14px |
| 地址／聯絡／服務／停車內容 | 約 17.92px |
| 電話／Email | 約 17.92px |
| Footer 標題 | 17px |
| Footer 連結／版權 | 15px |

#### 行動裝置：390px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 15px |
| Header 導覽 | 15px |
| Breadcrumb | 14px |
| Hero 標題 | 28.8px |
| 聯絡資訊標籤 | 14px |
| 地址／聯絡／服務／停車內容 | 17px |
| 電話／Email | 17px |
| Footer 標題 | 15px |
| Footer 連結／版權 | 15px |

結論：Body、Header、Breadcrumb、Hero、Footer 使用共用文字系統；Contact 的資訊內容使用 `body-lg`，在桌機為 18px、筆電約 17.92px、手機約 17px。資訊標籤維持 14px，不隨 body 直接縮小。

### 3. 各區塊文字顏色是多少？是否是全域？

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333` | `#333` | 共用文字色 |
| Breadcrumb | `#fff` | `#fff` | 共用 Hero Breadcrumb |
| Hero 標題 | `#fff` | `#fff` | 共用 Hero |
| 聯絡資訊標籤 | `#555` | `#555` | muted 色 |
| 聯絡資訊標籤背景 | `#FAFAFA` | `#FAFAFA` | surface subtle token |
| 地址／聯絡／服務／停車內容 | `#555` | `#555` | body text token |
| 電話／Email | `#555` | `#555` | 沿用內容文字色 |
| 電話／Email hover／focus | 維持 `#555` | 維持 `#555` | Contact 明確規則 |
| Footer 標題 | `#F3F4F3` | `#F3F4F3` | 共用 Footer |
| Footer 連結／版權 | `#D8D8D6` | `#D8D8D6` | 共用 Footer |

結論：Contact 的主要資訊文字使用全域 muted／body 色 `#555`，標籤也維持相同文字色，只透過淡灰背景與膠囊形狀建立層級。電話與 Email 的 hover／focus 沒有額外變色，仍維持 `#555`。

### 4. 各區塊文字粗細是多少？是否是全域？

| 區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 共用 Header |
| Breadcrumb 目前頁 | 600 | 600 | 600 | 共用 Breadcrumb |
| Hero 標題 | 500 | 400 | 500 | Hero／responsive 規則 |
| 聯絡資訊標籤 | 600 | 600 | 600 | Contact label |
| 地址／聯絡／服務／停車內容 | 400 | 400 | 400 | 全域 regular |
| 電話／Email | 400 | 400 | 400 | 全域 regular |
| Footer 標題 | 500 | 400 | 500 | 共用 Footer responsive 規則 |
| Footer 連結／版權 | 400 | 400 | 400 | 共用 Footer |

結論：Contact 的資訊內容全部使用 regular 400，資訊標籤使用 600。Hero 標題與 Footer 標題在筆電寬度受全域 laptop heading 降重規則影響，從 500 變為 400。

### 5. 各區塊圖片圓角是多少？是否是全域？

| 圖片／區塊 | 桌機 | 筆電 | 行動裝置 | 目前是否生效 |
|---|---:|---:|---:|---|
| Contact Hero 圖片本身 | 0px | 0px | 0px | 是 |
| Hero 外層右下角 | 約 50.4px | 約 44.8px | 12px | 是，共用 Hero |
| Google Maps iframe | 0px | 0px | 0px | 是 |
| 地圖外框 | 0px | 0px | 0px | 是 |
| 資訊標籤 | 999px | 999px | 999px | 是，膠囊標籤 |

Contact 頁面沒有內容圖片卡片；Hero 圖片本身不使用圓角，圓角作用在共用 Page Hero 外層。Google Maps iframe 與外框皆為直角，避免嵌入地圖內容被額外裁切。

### 6. 各區塊圖片遮罩是多少？是否是全域？

Contact 頁面唯一的實際圖片遮罩是 Hero overlay：

```css
linear-gradient(
  180deg,
  rgb(0 0 0 / 18%) 9.88%,
  rgb(0 0 0 / 30%) 100%
)
```

| 圖片區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|---|
| Contact Hero | 頂部約 18%，底部約 30% | 相同 | 相同 | 共用 Page Hero 預設值 |
| Google Maps iframe | 無圖片 overlay | 無圖片 overlay | 無圖片 overlay | 不適用 |

Contact 頁面沒有另外覆寫 Hero overlay 濃度，只覆寫 Hero 圖片位置：

- 980px 以下：`center`
- 981px 以上：`center 1%`

Google Maps 由外部 iframe 自行呈現地圖視覺，Contact CSS 沒有在 iframe 上加遮罩。

## 四、目前 Contact 各區塊的版型細節

### Hero

- 桌機高度約 350px，筆電約 332.8px，手機 280px。
- 981px 以上圖片位置為 `center 1%`，較窄尺寸改為 `center`。
- Hero 標題與 Breadcrumb 靠左排列。
- Hero 外層保留主題橘底線與右下角 responsive 圓角。
- 圖片本身沒有圓角，外層負責裁切。

### 聯絡資訊

- 桌機／筆電與地圖採 0.4fr／0.6fr 雙欄，內容間距使用全域 `--content-column-gap`。
- 981px 以上兩欄 stretch 到相同高度；實際資訊內容與地圖區高度一致。
- 每個資訊 row 為單欄 grid，標籤與內容上下排列。
- 標籤為淡灰背景、14px、600、999px 圓角膠囊。
- 內容左側保留 16px margin，讓文字與標籤形成明確縮排。
- 電話與 Email 使用原生 `tel:`／`mailto:` 連結。
- 服務時間與聯絡方式使用 stack，項目間距為 4px。
- 長地址、Email 與停車內容使用 `overflow-wrap: anywhere`，避免窄版溢出。

### Google Maps

- 桌機／筆電 iframe 寬度填滿右側欄位。
- 981px 以上地圖高度跟隨雙欄內容高度，實際約 444px。
- 980px 以下改為單欄，地圖使用 16:9 比例。
- 760px 以下改為 4:3 比例，390px 視窗實際為 350×262.5px。
- iframe 無 border、無圓角、無 CSS overlay。
- iframe `title` 提供地點描述，`loading="eager"`，並允許 fullscreen。

## 五、共用與頁面專用規則整理

### 全域／共用規則

- 字體家族、body 基準文字與 responsive body 尺寸。
- Header、Breadcrumb、Footer 文字系統。
- Page Hero 高度、底線、外層圓角、圖片基本處理與預設 overlay。
- body、body-lg、label、heading 等 typography token。
- 主題橘、文字色、muted 色、surface subtle 色與反白色。
- `--radius-full: 999px` 與共用 spacing token。
- site-container、content gutter、content column gap。

### Contact 頁面專用規則

- Hero 圖片位置：桌機／筆電 `center 1%`，窄版 `center`。
- 0.4fr／0.6fr 聯絡資訊與地圖雙欄。
- 981px、760px 兩組地圖與內容 RWD 斷點。
- 聯絡資訊 label 膠囊、16px 內容縮排、stack 間距。
- Google Maps iframe 16:9／4:3 比例與桌機等高行為。
- Contact 電話／Email hover／focus 維持原文字色的頁面規則。

## 六、發現與建議

1. Contact 頁面本身沒有聯絡表單，主要是資訊展示與地圖導向；若未來新增表單，應另定義表單欄位、錯誤狀態、focus 與送出狀態，不宜直接沿用目前資訊 row。
2. 桌機／筆電地圖與資訊欄使用等高排列，視覺上整齊，但地圖實際高度會受資訊內容與容器 stretch 影響，不是單純固定 460–540px。
3. 980px 以下改為單欄，760px 以下地圖由 16:9 改為 4:3；這兩個斷點應保留，否則手機地圖可能過矮或桌機雙欄過早切換。
4. 資訊標籤使用 999px 膠囊，而地圖與 Hero 外層使用直角／大右下圓角，頁面目前採用不同容器角色的圓角層級，不宜將所有區塊統一成同一數值。
5. 電話與 Email hover／focus 維持 `#555`，視覺變化較弱；若未來要強化互動提示，應同時補充 underline、focus outline 或 icon 狀態，避免只改顏色造成對比不足。
6. Hero 圖片在桌機定位為 `center 1%`、窄版定位為 `center`，若替換 Hero 圖片，需要重新檢查人物／主體是否仍位於可讀區域。
7. Google Maps 是外部 iframe，瀏覽器內嵌內容、第三方載入與正式環境 CSP／網路狀態需分開驗證；本次確認的是 iframe 容器與頁面布局，不代表已完成地圖內部操作驗收。

## 七、驗證紀錄

### 已驗證

- 已檢查 `contact.html`、`contact.css`。
- 已檢查全域 tokens、Page Hero、Header、Footer 與共用布局樣式。
- 已以本機 ASP.NET Release 版本開啟 `/contact`。
- 已驗證桌機 1440 × 900。
- 已驗證筆電 1280 × 800。
- 已驗證行動裝置 390 × 844。
- 已確認 Hero 圖片成功載入。
- 已確認字體載入完成。
- 已確認資訊內容、電話／Email 連結與 Google Maps iframe 存在。
- 已確認桌機／筆電雙欄、手機單欄與地圖比例切換。
- 已確認三種視窗沒有文件層級水平溢出。

### 尚未驗證

- 未以實體 iOS／Android 裝置驗證。
- 未以 Safari、Firefox 等其他瀏覽器進行跨瀏覽器實機驗證。
- 未進行完整人工無障礙驗收；本次僅檢查 address／dl／dt／dd 語意、iframe title、skip link 與基本 focus 結構。
- 未驗證 Google Maps iframe 內部地圖的縮放、鍵盤操作與第三方載入狀態。
- 未測試極長 Email、極長地址、系統字體放大與極窄螢幕尺寸。

