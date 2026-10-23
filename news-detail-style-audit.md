# News Detail 頁面樣式分析

> 分析日期：2026-10-23  
> 分析路由：`/news/{id}`  
> 分析範圍：桌機瀏覽器、筆電瀏覽器、行動裝置  
> 分析方式：檢查 `news-detail.html`、`news-detail.css`、`news-detail.js`、SSR News SEO／頁面渲染邏輯，並以本機 Release 版本實際計算瀏覽器樣式。  
> 本次僅產出分析文件，未修改 News Detail 頁面程式碼。

## 一、目前頁面結構與渲染方式

News Detail 主要由以下區塊組成：

- 共用 Header 與導覽列
- News Hero、麵包屑與「最新消息」頁面標題
- 返回最新消息連結
- 消息日期與分類標籤
- 消息標題
- 消息內文
- 條件式附件連結
- 條件式自訂圖片
- 共用 Footer

目前頁面採取 SSR 與瀏覽器 JavaScript 協作：

- `PublicPageRenderer` 依 `/news/{id}` 找到已發布消息後，伺服器端輸出 `news-detail.html`。
- `NewsSeoService` 會預先輸出標題、日期、分類、內文、SEO metadata 與自訂圖片。
- `news-detail.js` 載入公開 API 後，再更新標題、內文、附件、圖片狀態與頁面 metadata。
- 沒有自訂圖片時，SSR 不輸出 `.news-detail__media`。
- 有自訂圖片時，SSR 輸出 `.news-detail__media` 與 `.news-detail__image`，並將 detail 標記為 `news-detail--with-image`。
- 沒有附件時，附件區塊保持 hidden。
- 目前 related news section 已被註解移除，不是目前頁面的可見區塊。

本次使用以下資料狀態交叉確認：

- 無自訂圖片、含附件的消息：`138022f4958641beba694c1a51bb7f43`
- 有自訂圖片、無附件的消息：`8248eed1c6794f9e82eb12dcd4660e0b`

## 二、各裝置實際驗證尺寸

| 裝置類型 | 驗證視窗 | 主要結果 |
|---|---:|---|
| 桌機瀏覽器 | 1440 × 900 | Detail 內容寬度 960px，無水平溢出 |
| 筆電瀏覽器 | 1280 × 800 | Detail 內容寬度 960px，無水平溢出 |
| 行動裝置 | 390 × 844 | Detail 內容寬度 350px，無水平溢出 |

三種視窗皆確認：

- `document.fonts.status` 為 `loaded`。
- `document.documentElement.scrollWidth` 與 `clientWidth` 一致。
- 無自訂圖片消息會隱藏圖片媒體欄位。
- 含附件消息會顯示附件標題與附件連結。
- 有自訂圖片消息會輸出圖片 DOM 與 `.news-detail--with-image` 狀態。
- 本機資料中的自訂圖片 URL 在本次瀏覽器驗證中 `naturalWidth`／`naturalHeight` 為 0，表示資源未成功載入；這不等同於 CSS 圖片樣式未生效。

## 三、六項樣式分析

### 1. 字體使用什麼？是否是全域？

#### 全域字體

目前網站使用以下字體堆疊：

```css
Roboto, "Noto Sans TC", "Microsoft JhengHei", 微軟正黑體, sans-serif
```

News Detail 沒有指定獨立字體，主要文字與標題全部沿用 `--font-body`／全域字體系統。

#### News Detail 實際字體

| 區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|---|
| Body 基準 | Roboto 優先 | Roboto 優先 | Roboto 優先 | 是 |
| Header 導覽 | Roboto | Roboto | Roboto | 是 |
| Breadcrumb | Roboto／中文字型 fallback | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| Hero 標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 返回連結 | Roboto | Roboto | Roboto | 是 |
| 日期／分類 | Roboto | Roboto | Roboto | 是 |
| Detail 標題 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 內文 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| 附件 | Roboto／中文字型 fallback | Roboto／中文字型 fallback | Roboto／中文字型 fallback | 是 |
| Footer | Roboto | Roboto | Roboto | 是 |

結論：News Detail 沒有頁面專用字體，使用網站全域字體與中文字型 fallback。

### 2. 各區塊文字大小是多少？是否是全域？

#### 桌機瀏覽器：1440px

| 區塊 | 實際大小 | 來源／性質 |
|---|---:|---|
| Body 基準 | 17px | 全域 body |
| Header 導覽 | 17px | 共用 Header |
| Breadcrumb | 14px | 共用 Hero Breadcrumb |
| Hero 標題 | 43.2px | 共用 Hero fluid heading |
| 返回最新消息 | 17px | Detail 局部返回連結，沿用 body |
| 日期 | 14px | Detail meta supporting text |
| 分類標籤 | 14px | Detail meta supporting text |
| Detail 標題 | 40px | `--font-size-h2` |
| 內文 | 17px | `--font-size-body` |
| 內文段落 | 17px | 沿用 detail content |
| 附件標題 | 17px | body 尺寸 |
| 附件連結 | 17px | body 尺寸 |
| Footer 標題 | 17px | 共用 Footer |
| Footer 連結／版權 | 15px | 共用 Footer |

#### 筆電瀏覽器：1280px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 17px |
| Header 導覽 | 17px |
| Breadcrumb | 14px |
| Hero 標題 | 40.32px |
| 返回最新消息 | 17px |
| 日期／分類 | 14px |
| Detail 標題 | 38.4px |
| 內文／附件 | 17px |
| Footer 標題 | 17px |
| Footer 連結／版權 | 15px |

筆電的 Detail 標題使用 `clamp`，並受 1024–1439px 的 responsive heading 規則影響；實際計算為 38.4px。

#### 行動裝置：390px

| 區塊 | 實際大小 |
|---|---:|
| Body 基準 | 15px |
| Header 導覽 | 15px |
| Breadcrumb | 14px |
| Hero 標題 | 28.8px |
| 返回最新消息 | 15px |
| 日期 | 14px |
| 分類標籤 | 14px |
| Detail 標題 | 26px |
| 內文／段落 | 15px |
| 附件標題 | 15px |
| 附件連結 | 14px |
| Footer 標題 | 15px |
| Footer 連結／版權 | 15px |

結論：body、Header、Breadcrumb、Footer 與 Hero 多數尺寸來自全域／共用元件；Detail 標題、meta、附件與內容間距是 News Detail 專用規則。Detail 標題在桌機、筆電、手機分別約為 40px、38.4px、26px。

### 3. 各區塊文字顏色是多少？是否是全域？

| 區塊 | 桌機／筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333` | `#333` | 共用文字色 |
| Breadcrumb | `#fff` | `#fff` | 共用 Hero Breadcrumb |
| Hero 標題 | `#fff` | `#fff` | 共用 Hero |
| 返回連結 | `#151515` | `#151515` | 共用 secondary 色，News Detail 局部使用 |
| 返回連結 hover／focus | `#F58214` | `#F58214` | 主題互動色 |
| 日期 | `#555` | `#555` | muted／body 色系 |
| 分類標籤文字 | `#555` | `#555` | Detail meta 局部設定 |
| 分類標籤背景 | `rgb(245 130 20 / 12%)` | 相同 | 主題橘 soft token |
| Detail 標題 | `#333` | `#333` | 共用 ink／primary text |
| 內文 | `#555` | `#555` | body text token |
| 附件標題 | `#333` | `#333` | ink token |
| 附件連結 | `#F58214` | `#F58214` | 主題 primary |
| 附件連結 hover／focus | `#F58214` | `#F58214` | primary-dark alias，目前同色 |
| Footer 標題 | `#F3F4F3` | `#F3F4F3` | 共用 Footer |
| Footer 連結／版權 | `#D8D8D6` | `#D8D8D6` | 共用 Footer |

結論：Detail 主要文字沿用全域 token；日期、內文使用 muted/body 色，標題使用 ink 色，分類背景與附件連結使用主題橘。News Detail 沒有另設一套頁面色彩系統。

### 4. 各區塊文字粗細是多少？是否是全域？

| 區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 共用 Header |
| Breadcrumb 目前頁 | 600 | 600 | 600 | 共用 Breadcrumb |
| Hero 標題 | 500 | 400 | 500 | Hero／responsive 規則 |
| 返回連結 | 400 | 400 | 400 | Detail 局部連結 |
| 日期 | 400 | 400 | 400 | Detail meta |
| 分類標籤 | 400 | 400 | 400 | Detail meta |
| Detail 標題 | 500 | 400 | 500 | `--font-weight-heading` 與 laptop 規則 |
| 內文 | 400 | 400 | 400 | 全域 regular |
| 附件標題 | 600 | 600 | 600 | Detail 局部強調 |
| 附件連結 | 400 | 400 | 400 | Detail 連結 |
| Footer 標題 | 500 | 400 | 500 | 共用 Footer responsive 規則 |
| Footer 連結／版權 | 400 | 400 | 400 | 共用 Footer |

結論：Detail 標題桌機與手機使用 500，筆電因 1024–1439px 的全域 heading 降重規則變成 400。附件標題使用 600，是 News Detail 內部明確的局部強調；內文與附件連結維持 400。

### 5. 各區塊圖片圓角是多少？是否是全域？

| 圖片／區塊 | 桌機 | 筆電 | 行動裝置 | 目前是否生效 |
|---|---:|---:|---:|---|
| News Hero 圖片本身 | 0px | 0px | 0px | 是 |
| Hero 外層右下角 | 約 50.4px | 約 44.8px | 12px | 是，共用 Hero |
| Detail 自訂圖片 | 6px | 6px | 6px | 有自訂圖片時生效 |
| 無自訂圖片消息 | 無圖片 | 無圖片 | 無圖片 | SSR 不輸出 media |
| Detail 內容／附件區 | 0px | 0px | 0px | 是 |
| 分類標籤 | 999px | 999px | 999px | 是，膠囊標籤 |

Detail 自訂圖片使用全域 `--card-radius`，目前 token 值為 6px。Hero 圓角則由共用 `.page-hero` 控制，並依視窗寬度調整；Hero 圖片本身沒有獨立圓角，圓角作用在 Hero 外層。

### 6. 各區塊圖片遮罩是多少？是否是全域？

News Detail 目前真正可見的圖片遮罩只有 Hero：

```css
linear-gradient(
  180deg,
  rgb(0 0 0 / 10%) 9.88%,
  rgb(0 0 0 / 20%) 100%
)
```

| 圖片區塊 | 桌機 | 筆電 | 行動裝置 | 是否全域 |
|---|---|---|---|---|
| News Detail Hero | 頂部約 10%，底部約 20% | 相同 | 相同 | 共用 Hero 基礎規則，Detail 覆寫濃度 |
| Detail 自訂圖片 | 無 overlay | 無 overlay | 無 overlay | Detail 圖片本身沒有遮罩 |
| Detail 內容／附件 | 不適用 | 不適用 | 不適用 | 無圖片背景 |

News Detail 的 Hero 以 `news-detail.css` 覆寫共用 Hero 預設遮罩，使用較淡的 10%／20% 黑色漸層。自訂新聞圖片只使用 `object-fit: contain` 與 6px 圓角，不疊加文字遮罩。

## 四、News Detail 目前生效版型細節

### Hero

- Hero 高度沿用共用 `--page-hero-height`：桌機／筆電約 350px，手機約 280px。
- 桌機、筆電與手機圖片位置皆為 `center 60%`。
- Hero 標題靠左排列，不是共用 Hero 的置中標題形式。
- Breadcrumb、Hero 標題與 overlay 位於內容層，文字為白色。
- Hero 外層底部保留主題橘底線，右下角保留 responsive 圓角。

### Detail header

- Detail 內容最大寬度為 960px。
- 桌機／筆電上方 padding 約 40px，手機約 32px。
- 返回連結位於日期／分類與標題之前，採文字連結而非實心按鈕。
- 日期與分類使用同一個 flex meta row。
- 分類標籤為主題橘淡色背景的膠囊形標籤。
- 標題下方以 1px `var(--color-line)` 分隔。

### 內容與附件

- 內容區上方與 header 分隔線約 40px，手機約 32px。
- 內文每個段落底部 margin 為 18px，最後一段移除 margin。
- 目前內容以換行分割成 `<p>`；空白行不輸出。
- 附件區與內文間隔 24px。
- 附件標題使用 600，附件檔名使用主題橘並加底線。
- 附件連結允許長檔名換行，避免超出手機寬度。

### 自訂圖片

- 有自訂圖片時，`.news-detail__media` 寬度為 85%，最大寬度 800px，桌機上方 margin 36px。
- 自訂圖片本身寬度 100%、`object-fit: contain`、圓角 6px。
- 手機時 media 寬度改為 100%，上方 margin 32px。
- 沒有自訂圖片時，`.news-detail__media` 不輸出／不顯示，不保留空欄位。
- 本次本機瀏覽器檢查中，自訂圖片 DOM 已存在，但圖片資源 `naturalWidth`／`naturalHeight` 為 0；圖片顯示結果需再以正式資料根目錄或部署環境確認。

## 五、共用與頁面專用規則整理

### 全域／共用規則

- 字體家族、body 基準文字與 responsive body 尺寸。
- Header 導覽、Breadcrumb、Footer 的文字系統。
- Page Hero 高度、底線、圓角、圖片 object-fit 與基本 overlay 結構。
- 主題橘、文字色、muted 色、inverse 色與 soft 背景 token。
- `--card-radius: 6px` 與 `--radius-full: 999px`。
- 內容容器、gutter 與 site-container 基礎寬度。

### News Detail 頁面專用規則

- Hero 圖片位置 `center 60%`。
- Hero overlay 覆寫為 10%／20% 黑色漸層。
- Hero 內容改為靠左排列。
- Detail 最大寬度 960px。
- 返回連結、日期／分類 meta、Detail 標題、內文、附件與自訂圖片排列。
- 桌機／手機的 Detail title、meta、內容與 media 間距。
- 自訂圖片判斷、SSR media 輸出與無圖片狀態。
- 附件顯示、檔名 fallback、長檔名換行與連結 focus 行為。

## 六、發現與建議

1. News Detail 與 News 列表目前的 Hero overlay 不同：列表頁使用較深的 18%／30%，Detail 使用較淡的 10%／20%。這是頁面專用覆寫，不是同一個實際遮罩值。
2. News Detail 的自訂圖片確實有 6px 圓角，但只有資料有自訂圖片時才輸出；無圖片消息不會留下空白圖片欄位。
3. 本機驗證中的自訂圖片 URL 已被 SSR 輸出，但圖片自然尺寸為 0，應另行確認發布資料根目錄、圖片 API 路由與部署環境靜態檔案是否一致。這是資源載入問題，不能直接判定為 CSS 問題。
4. Detail 標題在筆電寬度會由 500 降為 400，與全域 1024–1439px heading 規則一致；若希望 News Detail 標題維持強調，需要另行評估是否要排除該全域 responsive 規則。
5. 目前 related news 已註解移除，`news-detail.css` 仍保留完整 related carousel 樣式。若未來確認不再恢復，可以另行安排 CSS 清理；本次不建議未經確認直接刪除。
6. 內容與附件沒有圖片遮罩；若未來需要在新聞圖片上疊加標題或狀態，不應直接套用 Hero overlay，應另定義 Detail media 的獨立 overlay 規則。

## 七、驗證紀錄

### 已驗證

- 已檢查 `news-detail.html`、`news-detail.css`、`news-detail.js`。
- 已檢查 `Services/PublicPageRenderer.cs` 與 `Services/NewsSeoService.cs` 的 SSR 詳細頁渲染流程。
- 已檢查全域 tokens 與共用 Page Hero／Footer 樣式。
- 已以本機 ASP.NET Release 版本開啟公開消息詳細頁。
- 已驗證桌機 1440 × 900。
- 已驗證筆電 1280 × 800。
- 已驗證行動裝置 390 × 844。
- 已驗證無自訂圖片／有附件狀態。
- 已驗證有自訂圖片／無附件狀態的 SSR DOM 與 CSS 計算結果。
- 已確認三種視窗沒有文件層級水平溢出。
- 已確認字體載入完成。
- 已確認附件 hidden／顯示狀態會依資料切換。

### 尚未驗證

- 未以實體 iOS／Android 裝置驗證。
- 未以 Safari、Firefox 等其他瀏覽器進行跨瀏覽器實機驗證。
- 未進行完整人工無障礙驗收；本次僅檢查既有語意、ARIA、focus 與 hidden 狀態的程式結構。
- 自訂新聞圖片在本機資料的資源載入失敗，尚未以正式部署環境確認圖片是否可正常下載與顯示。
- 未測試長標題、多段落長文、超長附件檔名與極端窄螢幕尺寸。

