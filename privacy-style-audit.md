# Privacy 頁面樣式分析

> 分析日期：2026-10-23  
> 分析路由：`/privacy`  
> 分析範圍：桌機瀏覽器、筆電瀏覽器、行動裝置  
> 分析方式：檢查 `privacy.html`、`privacy.css`、共用 tokens／Header／Footer／Breadcrumb 樣式，並以本機 Release 版本實際計算瀏覽器樣式。  
> 本次僅產出分析文件，未修改 Privacy 頁面程式碼。

## 一、目前頁面結構與生效版型

Privacy 頁面目前由以下主要區塊組成：

- 共用 Header 與導覽列
- 桌機／筆電顯示的 Breadcrumb
- 置中的隱私權政策文章
- 文章主標題、八個章節標題、段落與內文連結
- 共用 Footer

目前頁面是純文字政策頁，沒有：

- Page Hero 圖片
- 內容圖片
- 圖片卡片或圖片遮罩
- 表單或送出互動
- 頁面專用 JavaScript

頁面僅載入共用 `site.js`，Privacy 本身沒有額外互動邏輯。

## 二、各裝置實際驗證尺寸

| 裝置類型 | 驗證視窗 | 主要結果 |
|---|---:|---|
| 桌機瀏覽器 | 1440 × 900 | 顯示 Breadcrumb，文章最大寬度 896px，無水平溢出 |
| 筆電瀏覽器 | 1280 × 800 | 顯示 Breadcrumb，文章最大寬度 896px，無水平溢出 |
| 行動裝置 | 390 × 844 | 隱藏 Breadcrumb，文章寬度 350px，無水平溢出 |

三種視窗皆確認：

- `document.fonts.status` 為 `loaded`。
- 頁面文件寬度沒有超過視窗寬度。
- 文章內容、八個政策章節與內文連結均正常顯示。
- 桌機／筆電 Breadcrumb 可見，手機透過 `display: none` 隱藏。
- 頁面內沒有內容圖片；實際 DOM 圖片只有 Header／Footer 的品牌 Logo。

## 三、六項樣式分析

### 1. 字體使用什麼？是否是全域？

#### 全域字體

網站使用以下主要字體堆疊：

```css
Roboto, "Noto Sans TC", "Microsoft JhengHei", 微軟正黑體, sans-serif
```

Privacy 頁面沒有設定特殊襯線字體或頁面專用字體。

#### Privacy 實際字體

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Body 基準 | Roboto 優先 | Roboto 優先 | 是 |
| Header 導覽 | Roboto | Roboto | 是 |
| Breadcrumb | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 政策主標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 章節標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 政策段落 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 文章內文連結 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| Footer | Roboto | Roboto | 是 |

結論：Privacy 頁面全部沿用網站全域無襯線字體，沒有獨立字體系統。

### 2. 各區塊文字大小是多少？是否是全域？

#### 桌機瀏覽器：1440px

| 區塊 | 實際大小 | 來源／性質 |
|---|---:|---|
| Body 基準 | 17px | 全域 body |
| Header 導覽 | 17px | 共用 Header |
| Breadcrumb 文字 | 14px | 共用 Breadcrumb 元件 |
| Privacy 主標題 | 40px | `--font-size-h2` |
| 章節標題 h2 | 24px | `--font-size-h3` |
| 政策段落 | 17px | `--font-size-body` |
| 政策內文連結 | 17px | 沿用段落字級 |
| Footer 標題 | 17px | 共用 Footer |
| Footer 連結／版權 | 15px | 共用 Footer |

#### 筆電瀏覽器：1280px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 17px |
| Header 導覽 | 17px |
| Breadcrumb 文字 | 14px |
| Privacy 主標題 | 38.4px |
| 章節標題 h2 | 23.04px |
| 政策段落／內文連結 | 17px |
| Footer 標題 | 17px |
| Footer 連結／版權 | 15px |

#### 行動裝置：390px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 15px |
| Header 導覽 | 15px |
| Breadcrumb | 隱藏，不佔版面 |
| Privacy 主標題 | 20px |
| 章節標題 h2 | 17px |
| 政策段落 | 15px |
| 政策內文連結 | 15px |
| Footer 標題 | 15px |
| Footer 連結／版權 | 15px |

結論：主標題與章節標題使用全域 h2／h3 token，手機由 Privacy 專用 media query 降為 20px／17px；段落沿用全域 body 尺寸，桌機／筆電 17px、手機 15px。

### 3. 各區塊文字顏色是多少？是否是全域？

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333` | `#333` | 共用文字色 |
| Breadcrumb 一般文字 | 約 `#555` | 隱藏 | 共用 Breadcrumb |
| Breadcrumb 目前頁 | 約 `#555` | 隱藏 | 共用 Breadcrumb |
| Privacy 主標題 | `#333` | `#333` | ink／text primary |
| 章節標題 | `#333` | `#333` | ink／text primary |
| 政策段落 | `#555` | `#555` | muted／body 色 |
| 政策內文連結 | `#F58214` | `#F58214` | 主題 primary |
| 連結 hover／focus | `#151515` | `#151515` | secondary／互動狀態 |
| Footer 標題 | `#F3F4F3` | `#F3F4F3` | 共用 Footer |
| Footer 連結／版權 | `#D8D8D6` | `#D8D8D6` | 共用 Footer |

結論：標題使用全域深色 `#333`，段落使用 muted `#555`；政策內文連結使用主題橘，hover／focus 改為深色並加強底線。手機只隱藏 Breadcrumb，不改變文章文字色彩。

### 4. 各區塊文字粗細是多少？是否是全域？

| 區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 共用 Header |
| Breadcrumb | 400 | 400 | 隱藏 | 共用 Breadcrumb |
| Privacy 主標題 | 500 | 400 | 500 | heading token／laptop 規則 |
| 章節標題 h2 | 500 | 400 | 500 | heading token／laptop 規則 |
| 政策段落 | 400 | 400 | 400 | 全域 regular |
| 政策內文連結 | 600 | 600 | 600 | Privacy link 局部規則 |
| Footer 標題 | 500 | 400 | 500 | 共用 Footer responsive 規則 |
| Footer 連結／版權 | 400 | 400 | 400 | 共用 Footer |

結論：Privacy 的主標題與章節標題桌機／手機使用 500，筆電因 1024–1439px 的全域 laptop heading 規則降為 400。內文 regular 400，政策連結固定以 600 強調。

### 5. 各區塊圖片圓角是多少？是否是全域？

Privacy 頁面沒有內容圖片，因此不存在政策文章圖片圓角。

| 圖片／區塊 | 桌機 | 筆電 | 行動裝置 | 目前是否生效 |
|---|---:|---:|---:|---|
| Privacy 內容圖片 | 不適用 | 不適用 | 不適用 | 頁面沒有內容圖片 |
| Header Logo | 由 SVG／共用 Header 控制 | 相同 | 相同 | 共用元件 |
| Footer Logo | 由 SVG／共用 Footer 控制 | 相同 | 相同 | 共用元件 |
| 政策文章容器 | 0px | 0px | 0px | 是，無背景卡片與圓角 |
| 內文連結 focus outline | 2px outline，radius 2px | 相同 | 相同 | 是，連結 focus 狀態 |

結論：Privacy 沒有 Hero 或內容圖片圓角；文章是透明背景的純文字容器。唯一與圓角相關的頁面專用規則是內文連結 focus outline 的 2px radius。

### 6. 各區塊圖片遮罩是多少？是否是全域？

Privacy 頁面沒有 Hero，也沒有內容圖片，因此圖片遮罩不適用。

| 圖片區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|---|
| Privacy Hero | 不適用，頁面沒有 Hero | 不適用 | 不適用 | 無 |
| 政策內容圖片 | 不適用，頁面沒有內容圖片 | 不適用 | 不適用 | 無 |
| Header／Footer Logo | 無 overlay | 無 overlay | 無 overlay | 共用元件 |

Privacy 頁面沒有任何圖片遮罩或圖片背景漸層。品牌 Logo 是共用 Header／Footer 的 SVG，沒有頁面 overlay。

## 四、目前 Privacy 各區塊的版型細節

### Breadcrumb

- 桌機／筆電位於文章內容上方，使用共用 `page-breadcrumb` 結構。
- Breadcrumb 內容區寬度跟隨 site-container，桌機左右 padding 約 57.6px，筆電約 51.2px。
- Breadcrumb 文字實際 14px、line-height 22.4px。
- 手機透過 `display: none` 完全隱藏，避免政策頁在窄版增加額外高度。

### 政策文章

- 文章最大寬度為 896px，桌機與筆電置中。
- 桌機／筆電文章內 padding 為 32px。
- 手機文章寬度約 350px，padding 為 24px，實際文字內容寬度約 302px。
- 頁面背景與文章背景皆為白色／透明，不使用卡片陰影。
- 主標題下方桌機／筆電間距為 32px，手機為 24px。
- 章節標題桌機／筆電上 margin-top 32px、margin-bottom 10px；手機改為 28px／8px。
- 段落底部 margin 為 12px，文字使用 1.6 倍 body line-height。
- 內文連結使用主題橘、600 粗細與底線偏移 4px。
- 連結 focus 使用 2px 主題橘 outline、3px offset 與 2px outline radius。

## 五、共用與頁面專用規則整理

### 全域／共用規則

- 字體家族、body 基準文字與 responsive body 尺寸。
- Header、Footer 與 Breadcrumb 文字系統。
- h2／h3 fluid 尺寸、heading line-height 與 laptop heading 降重規則。
- `--color-ink`、`--color-muted`、`--color-primary`、`--color-secondary` 等色彩 token。
- site-container、content gutter 與共用 section spacing。
- Skip link、focus outline 與共用導覽互動。

### Privacy 頁面專用規則

- 政策文章最大寬度 896px 與置中布局。
- 桌機／筆電文章 padding 32px、手機 padding 24px。
- 手機隱藏 Privacy Breadcrumb。
- 政策主標題與章節標題的 margin／mobile 尺寸。
- 政策段落 12px 間距。
- 內文連結主題橘、600 粗細、底線偏移與 focus outline。
- 無圖片、無 Hero、無圖片遮罩的純文字頁面結構。

## 六、發現與建議

1. Privacy 頁面沒有 Hero，因此與其他內容頁不同，標題直接位於政策文章內；若未來要新增 Hero，需重新評估 Breadcrumb 的位置與手機是否仍應隱藏。
2. 文章最大寬度 896px、內容文字寬度 832px（桌機／筆電）可維持較好的長文閱讀長度；手機文字寬度約 302px，已保留 24px 內距。
3. 手機隱藏 Breadcrumb 可減少長文頁前置高度，但也會移除使用者在頁面頂端看到的階層提示；若未來增加更深層政策子頁，需重新評估此行為。
4. 政策內文連結僅在 hover／focus 改色，且 focus 具有 outline；若使用觸控裝置，仍保留橘色文字與底線作為可識別連結提示。
5. 頁面沒有內容圖片，因此圖片圓角與遮罩在本頁屬於不適用，不應套用其他頁面的 Hero 或卡片圖片規則。
6. Privacy 內容是長文，若未來修改政策文字，應優先檢查手機長句換行、連結換行、標題層級與文章總高度，不應只以桌機畫面判斷。

## 七、驗證紀錄

### 已驗證

- 已檢查 `privacy.html`、`privacy.css`。
- 已檢查全域 tokens、Header、Footer、Breadcrumb 與文字系統。
- 已以本機 ASP.NET Release 版本開啟 `/privacy`。
- 已驗證桌機 1440 × 900。
- 已驗證筆電 1280 × 800。
- 已驗證行動裝置 390 × 844。
- 已確認字體載入完成。
- 已確認文章標題、章節標題、段落與內文連結的實際計算樣式。
- 已確認桌機／筆電 Breadcrumb 可見、手機隱藏。
- 已確認頁面沒有內容圖片，只有共用 Header／Footer Logo。
- 已確認三種視窗沒有文件層級水平溢出。

### 尚未驗證

- 未以實體 iOS／Android 裝置驗證。
- 未以 Safari、Firefox 等其他瀏覽器進行跨瀏覽器實機驗證。
- 未進行完整人工無障礙驗收；本次僅檢查文章 heading 階層、Breadcrumb nav、skip link、連結 focus 與基本語意結構。
- 未測試系統字體放大、長網址、超長 Email、極窄螢幕與政策文字大幅增加的情況。

