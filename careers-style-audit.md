# Careers 頁面樣式分析

> 分析日期：2026-10-23  
> 分析路由：`/careers`  
> 分析範圍：桌機瀏覽器、筆電瀏覽器、行動裝置  
> 分析方式：檢查 `careers.html`、`careers.css`、`careers.js`、共用 tokens／Hero／Header／Footer 樣式，並以本機 Release 版本實際計算瀏覽器樣式。  
> 本次僅產出分析文件，未修改 Careers 頁面程式碼。

## 一、目前頁面結構與生效版型

Careers 頁面目前由以下主要區塊組成：

- 共用 Header 與導覽列
- Careers Hero、麵包屑與「人才招募」標題
- 「加入亞太」介紹區：工作場域圖片、文字與查看職缺按鈕
- 「公司福利」區：四組福利分類 Tab 與福利項目清單
- 招聘 CTA：背景圖片、招聘標語與外部人力銀行連結
- 共用 Footer

目前福利互動由 `careers.js` 控制：

- 四個按鈕使用 `role="tab"` 與 `aria-selected`。
- 目前選取的 panel 保持可操作，其他 panel 設為 `inert`。
- 點擊 Tab 後，內容軌道以 `translateX` 平移切換。
- 鍵盤支援左右／上下方向鍵、Home、End，並將 focus 移至新的 Tab。
- 手機福利分類列使用水平滑動，四個 Tab 各自固定約 160px 寬。

## 二、各裝置實際驗證尺寸

| 裝置類型 | 驗證視窗 | 主要結果 |
|---|---:|---|
| 桌機瀏覽器 | 1440 × 900 | Hero 350px，介紹區雙欄，福利 Tab 四欄，無水平溢出 |
| 筆電瀏覽器 | 1280 × 800 | Hero 350px，介紹區雙欄，福利 Tab 四欄，無水平溢出 |
| 行動裝置 | 390 × 844 | Hero 280px，介紹區單欄，福利 Tab 可水平滑動，無文件層級水平溢出 |

三種視窗皆確認：

- `document.fonts.status` 為 `loaded`。
- 頁面文件寬度沒有超過視窗寬度。
- Hero、介紹圖片與招聘背景圖片皆成功載入。
- 福利區有 4 個 Tab 與 4 個 panel。
- 福利 Tab 切換後，`aria-selected` 與內容軌道位置會更新。
- 手機福利 Tab 列的內容寬度大於可視寬度，使用元件內水平滑動，不造成 body 水平溢出。

## 三、六項樣式分析

### 1. 字體使用什麼？是否是全域？

#### 全域字體

網站使用以下主要字體堆疊：

```css
Roboto, "Noto Sans TC", "Microsoft JhengHei", 微軟正黑體, sans-serif
```

Careers 頁面另有一個明確的特殊字體例外：招聘 CTA 標語使用 `--font-special`。

```css
"Noto Serif TC", "Songti TC", serif
```

#### Careers 實際字體

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Body 基準 | Roboto 優先 | Roboto 優先 | 是 |
| Header 導覽 | Roboto | Roboto | 是 |
| Breadcrumb | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| Hero 標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 「加入亞太」標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是，共用 heading token |
| 介紹內文 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 福利 Tab | Roboto | Roboto | 是 |
| 福利項目 | Roboto | Roboto | 是 |
| 招聘標語 | Noto Serif TC／Songti TC／serif | Noto Serif TC／Songti TC／serif | 否，Careers 特殊字體 |
| 招聘按鈕 | Roboto | Roboto | 是 |
| Footer | Roboto | Roboto | 是 |

結論：除了招聘 CTA 標語外，Careers 頁面全部沿用網站全域無襯線字體。招聘標語的襯線字體是頁面專用的視覺例外。

### 2. 各區塊文字大小是多少？是否是全域？

#### 桌機瀏覽器：1440px

| 區塊 | 實際大小 | 來源／性質 |
|---|---:|---|
| Body 基準 | 17px | 全域 body |
| Header 導覽 | 17px | 共用 Header |
| Breadcrumb | 14px | 共用 Hero Breadcrumb |
| Hero 標題 | 43.2px | 共用 Hero fluid heading |
| 「加入亞太」標題 | 33.12px | section heading token |
| 介紹內文 | 17px | body token |
| 查看職缺按鈕 | 17px | 共用按鈕文字 |
| 福利區標題 | 33.12px | section heading token |
| 福利 Tab | 20px | Careers Tab 專用 |
| 福利項目標題 | 20px | card title compact |
| 福利項目內容 | 17px | body token |
| 招聘標語 | 24px | h3 token，特殊字體 |
| 招聘按鈕 | 17px | 共用按鈕文字 |
| Footer 標題 | 17px | 共用 Footer |
| Footer 連結／版權 | 15px | 共用 Footer |

#### 筆電瀏覽器：1280px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 17px |
| Header 導覽 | 17px |
| Breadcrumb | 14px |
| Hero 標題 | 40.32px |
| 區塊標題 | 約 30px |
| 介紹內文／福利內容 | 17px |
| 福利 Tab | 20px |
| 福利項目標題 | 20px |
| 招聘標語 | 約 22px |
| 按鈕 | 17px |
| Footer 標題 | 17px |
| Footer 連結／版權 | 15px |

筆電的 heading 尺寸受到 fluid `clamp` 與 1024–1439px responsive heading 規則影響；福利 Tab 與福利項目標題仍維持 20px。

#### 行動裝置：390px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 15px |
| Header 導覽 | 15px |
| Breadcrumb | 14px |
| Hero 標題 | 28.8px |
| 區塊標題 | 30px |
| 介紹內文／福利內容 | 15px |
| 查看職缺／招聘按鈕 | 15px |
| 福利 Tab | 20px |
| 福利項目標題 | 20px |
| 招聘標語 | 20px |
| Footer 標題 | 15px |
| Footer 連結／版權 | 15px |

結論：Hero、section heading、body、Footer 與按鈕大多使用全域 token；福利 Tab、福利項目標題與招聘標語則有 Careers 區塊專用尺寸或特殊字體規則。

### 3. 各區塊文字顏色是多少？是否是全域？

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333` | `#333` | 共用文字色 |
| Breadcrumb | `#fff` | `#fff` | 共用 Hero Breadcrumb |
| Hero 標題 | `#fff` | `#fff` | 共用 Hero |
| 區塊標題 | `#333` | `#333` | 共用 text primary |
| 區塊標題底線 | 主題橘漸層 | 主題橘漸層 | Careers heading 局部規則 |
| 介紹內文 | `#555` | `#555` | body text token |
| 福利 Tab 一般／active | `#333`／`#F58214` | `#333`／`#F58214` | active 為 Careers 狀態 |
| 福利 Tab active 底線 | `#F58214` | `#F58214` | 主題橘 |
| 福利項目標題 | `#333` | `#333` | text primary |
| 福利項目內容 | `#555` | `#555` | body text token |
| 福利圖示 | 主題橘 filter | 主題橘 filter | Careers 圖示局部規則 |
| 招聘標語 | `#fff` | `#fff` | CTA 深色背景上的反白文字 |
| 按鈕文字 | `#fff` | `#fff` | 共用 primary button |
| Footer 標題 | `#F3F4F3` | `#F3F4F3` | 共用 Footer |
| Footer 連結／版權 | `#D8D8D6` | `#D8D8D6` | 共用 Footer |

區塊標題底線不是單色，而是由透明到主題橘再回到透明的水平漸層；它是 Careers 共用 section heading 的局部視覺規則。福利圖示原始 SVG 透過 CSS filter 轉成主題橘。

### 4. 各區塊文字粗細是多少？是否是全域？

| 區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 共用 Header |
| Breadcrumb 目前頁 | 600 | 600 | 600 | 共用 Breadcrumb |
| Hero 標題 | 500 | 400 | 500 | Hero／responsive 規則 |
| 「加入亞太」標題 | 700 | 600 | 700 | Careers section heading token |
| 介紹內文 | 400 | 400 | 400 | 全域 regular |
| 福利區標題 | 700 | 600 | 700 | Careers section heading token |
| 福利 Tab | 500 | 400 | 500 | Careers Tab＋laptop 規則 |
| 福利項目標題 | 500 | 400 | 500 | card heading＋laptop 規則 |
| 福利項目內容 | 400 | 400 | 400 | 全域 regular |
| 招聘標語 | 400 | 400 | 400 | 特殊字體，regular |
| 按鈕文字 | 400 | 400 | 400 | 共用按鈕 |
| Footer 標題 | 500 | 400 | 500 | 共用 Footer responsive 規則 |
| Footer 連結／版權 | 400 | 400 | 400 | 共用 Footer |

結論：Careers 兩個主要 section heading 桌機／手機使用 700，筆電使用 600；福利 Tab 與福利項目標題同樣受 laptop 降重規則影響。這是全域 responsive heading token 與 Careers 局部角色共同作用的結果。

### 5. 各區塊圖片圓角是多少？是否是全域？

| 圖片／區塊 | 桌機 | 筆電 | 行動裝置 | 目前是否生效 |
|---|---:|---:|---:|---|
| Careers Hero 圖片本身 | 0px | 0px | 0px | 是 |
| Hero 外層右下角 | 約 50.4px | 約 44.8px | 12px | 是，共用 Hero |
| 「加入亞太」介紹圖外層 | 6px | 6px | 6px | 是 |
| 「加入亞太」介紹圖本身 | 0px | 0px | 0px | 外層 overflow 裁切 |
| 福利項目列 | 6px | 6px | 6px | 是 |
| 福利圖示 | 0px | 0px | 0px | 是，32×32 圖示 |
| 招聘背景圖 | 0px | 0px | 0px | 是，整區背景 |
| 按鈕 | 4px | 4px | 4px | 共用 button token |

介紹圖片與福利列使用全域 `--card-radius`，目前為 6px。Hero 的圓角作用在 Hero 外層，招聘背景區沒有獨立圓角。

### 6. 各區塊圖片遮罩是多少？是否是全域？

Careers 頁面有兩個實際生效的圖片遮罩：

#### Hero 遮罩

```css
linear-gradient(
  90deg,
  rgb(0 0 0 / 20%) 0%,
  rgb(0 0 0 / 10%) 22%,
  transparent 58%
)
```

此遮罩由 `.join-page .join-hero` 覆寫共用 Hero 的預設遮罩，左側較暗，右側逐漸透明，主要服務左側麵包屑與標題可讀性。

#### 招聘背景遮罩

```css
rgb(0 0 0 / 30%)
```

此遮罩由 `.join-recruitment__background::after` 疊在招聘背景圖上，桌機、筆電與手機皆為固定 30% 黑色半透明遮罩。

| 圖片區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|---|
| Careers Hero | 左側 20%，22% 位置降至 10%，58% 後透明 | 相同 | 相同 | Careers Hero 局部覆寫 |
| 招聘背景 | 固定黑色 30% | 固定黑色 30% | 固定黑色 30% | Careers CTA 局部規則 |
| 加入亞太介紹圖 | 無遮罩 | 無遮罩 | 無遮罩 | 不適用 |
| 福利圖示 | 無 overlay，使用 filter | 無 overlay，使用 filter | 無 overlay，使用 filter | Careers 圖示規則 |

## 四、目前 Careers 各區塊的版型細節

### Hero

- 桌機／筆電高度約 350px，手機高度約 280px。
- 圖片位置為 `center`。
- Hero 標題與 Breadcrumb 靠左排列。
- Hero 外層保留主題橘底線與右下角 responsive 圓角。
- Hero 圖片本身沒有圓角，外層負責裁切與圓角。

### 加入亞太

- 桌機／筆電採兩欄 grid，左側圖片、右側文字。
- 840px 以下改為單欄，圖片與文字依 HTML 順序排列。
- 桌機介紹圖外層約 642×401px，比例為 16:10。
- 手機介紹圖約 350×219px，同樣維持 16:10。
- 介紹文字最大寬度為 560px。
- 查看職缺按鈕使用共用主題橘半透明背景，hover 時由共用按鈕規則加深。

### 公司福利

- 桌機／筆電福利 Tab 為四欄 grid，每個 Tab 平均分配寬度。
- 手機福利 Tab 變為四個固定 160px 寬的水平內容列。
- Tab active 文字與底線使用主題橘。
- 福利清單外層有 20–24px padding，項目列使用淡灰背景與 6px 圓角。
- 桌機福利項目列為 32px 圖示、180px 標題欄與剩餘內容欄。
- 手機福利項目列改為 32px 圖示與剩餘標題欄，內容清單移到第二欄。
- 福利圖示實際尺寸為 32×32px。
- 切換 panel 使用 500ms transform 動畫；`prefers-reduced-motion: reduce` 時停用該動畫。

### 招聘 CTA

- 背景圖覆蓋整個區塊，使用 `object-fit: cover`。
- 背景圖上固定疊加 30% 黑色遮罩。
- 標語使用白色 Noto Serif TC／Songti TC，桌機 24px、手機 20px。
- 招聘連結以 flex wrap 排列，桌機／筆電兩個按鈕並排，手機依可用寬度排列。
- 外部連結保留 `target="_blank"`、`rel="noopener noreferrer"` 與新視窗的螢幕閱讀器文字。
- CTA 區塊桌機／筆電上方間距約 40px，手機約 24px。

## 五、共用與頁面專用規則整理

### 全域／共用規則

- 字體家族、body 基準文字與 responsive body 尺寸。
- Header、Breadcrumb、Footer 文字系統。
- Page Hero 高度、底線、外層圓角、圖片基本處理與內容層。
- section heading 的字體尺寸 token 與 laptop heading 降重規則。
- 主題橘、文字色、body muted 色與反白色。
- `--card-radius: 6px`、按鈕圓角與按鈕尺寸。
- site-container、content gutter 與共用 spacing token。

### Careers 頁面專用規則

- Careers Hero 左側漸層遮罩與 `center` 圖片位置。
- 加入亞太兩欄／單欄 responsive 版型。
- 介紹圖 16:10 圖框與 6px 圓角。
- 福利四分類 Tab、active 橘色底線、水平滑動與 panel transform。
- 福利項目列、32px 主題橘圖示與手機欄位重排。
- 招聘 CTA 背景圖、30% 黑色 overlay、襯線標語與外部連結排列。

## 六、發現與建議

1. Careers 頁面有兩套不同遮罩：Hero 是左側水平漸層，招聘 CTA 是固定 30% 黑色遮罩；兩者用途不同，不應抽成同一個固定透明度。
2. 介紹圖片與福利項目列共用 6px 圓角，視覺系統一致；Hero 與招聘背景則由外層或整區裁切，不使用圖片本身圓角。
3. 福利 Tab 在手機刻意保留水平滑動，當前四個分類的總寬度大於可視寬度，但沒有造成 body 水平溢出，屬於預期互動。
4. 主要區塊標題桌機／手機使用 700，筆電使用 600；福利 Tab 與福利項目標題也會在筆電降為 400。若要維持筆電上的強標題層級，需要另行評估全域 laptop heading 規則。
5. 招聘標語是 Careers 頁面唯一明確使用特殊襯線字體的文字，屬於品牌／情境式視覺例外，不是全域字體。
6. 福利內容的 panel height 會先取各分類最大內容高度，再用 transform 切換，避免切換時容器高度不足；此互動邏輯應與 `aria-selected`、`inert` 一起保留。

## 七、驗證紀錄

### 已驗證

- 已檢查 `careers.html`、`careers.css`、`careers.js`。
- 已檢查全域 tokens、Page Hero、Header、Footer 與按鈕樣式。
- 已以本機 ASP.NET Release 版本開啟 `/careers`。
- 已驗證桌機 1440 × 900。
- 已驗證筆電 1280 × 800。
- 已驗證行動裝置 390 × 844。
- 已確認 Hero、介紹圖與招聘背景圖片實際載入。
- 已確認字體載入完成。
- 已確認福利 Tab 數量、active 狀態、panel transform 與手機水平滑動寬度。
- 已確認三種視窗沒有文件層級水平溢出。
- 已確認 `prefers-reduced-motion` 的福利 panel 動畫停用規則存在。

### 尚未驗證

- 未以實體 iOS／Android 裝置驗證。
- 未以 Safari、Firefox 等其他瀏覽器進行跨瀏覽器實機驗證。
- 未進行完整人工無障礙驗收；本次僅檢查既有 role、ARIA、focus、inert 與鍵盤事件程式結構。
- 未測試極長福利文字、長招聘標語、極窄螢幕與高系統字體放大倍率。

