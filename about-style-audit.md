# About 頁面樣式分析報告

> 檢查日期：2026-10-23  
> 檢查頁面：`/about`  
> 檢查方式：原始 HTML／CSS／JavaScript 靜態檢查，搭配本機 ASP.NET Core 實際頁面與 Edge 瀏覽器計算樣式驗證。  
> 檢查視窗：桌機 1440×900、筆電 1280×800、行動裝置 390×844。

## 結論摘要

- About 頁面使用全站共用的 `Roboto`, `Noto Sans TC`, `Noto Serif TC` 字體堆疊；本次三種視窗的字體載入狀態均為 `loaded`。
- 基礎文字尺寸、行高、字重、色彩 token 集中在 `wwwroot/css/base/tokens.css` 與 `reset.css`，但各頁面區塊仍有部分專屬覆寫。
- 桌機與筆電主要差異不是整體字級，而是 1024–1439px 的字重調整；手機則依 CSS media query 將一般內文縮為 15px，部分標題仍維持 30px。
- About 頁面的圖片圓角並非全域一致：公司簡介圖片使用 6px，企業價值圖片與卡片沒有圓角，Hero 圖片也沒有圓角。
- About 沒有套用 CSS `mask` 圖片遮罩。主要視覺效果來自 Hero 漸層 overlay、公司簡介背景圖上的白色透明漸層，以及企業價值圖片的亮度／飽和度／對比濾鏡。

## 1. 字體使用什麼？是否是全域？

### 全站字體設定

來源：`wwwroot/css/base/tokens.css:29-31`、`wwwroot/css/base/reset.css:12-20`

```css
--font-body: "Roboto", "Noto Sans TC", sans-serif;
--font-special: "Noto Serif TC", serif;
```

`body` 使用 `var(--font-body)`，因此 About 頁面的標題、內文、導覽與頁尾預設皆使用 Roboto／Noto Sans TC。About 本身沒有改寫成其他頁面專屬字體。

本次瀏覽器檢查結果：

| 視窗 | Roboto | Noto Sans TC | Noto Serif TC | document.fonts |
|---|---:|---:|---:|---|
| 桌機 1440px | 可用 | 可用 | 可用 | `loaded` |
| 筆電 1280px | 可用 | 可用 | 可用 | `loaded` |
| 手機 390px | 可用 | 可用 | 可用 | `loaded` |

### 是否全域

是。字體家族由 base token 與 `body` 全域規則控制；About 頁面只引用這組共用字體，沒有另外設定頁面字體。

## 2. 各區塊文字大小與全域性

以下為瀏覽器實際計算後的主要值；尺寸單位為 px。

| 區塊 | 桌機 1440 | 筆電 1280 | 手機 390 | 規則來源 | 是否全域 |
|---|---:|---:|---:|---|---|
| Header 導覽 | 17 | 17 | 15 | tokens／site-header／mobile media query | 基礎全域，手機有版型覆寫 |
| Hero 麵包屑 | 14 | 14 | 14 | `--font-size-body-sm`、page-hero | 共用元件 |
| Hero 標題 | 43.2 | 40.32 | 28.8 | page-hero `clamp()` | 共用元件，About 使用共用樣式 |
| 公司簡介 Lead | 33.12 | 30 | 30 | `--font-size-section-heading` | token 全域，About 專屬使用 |
| 公司簡介內文 | 17 | 17 | 15 | `--font-size-body`、body media query | token 全域，手機有基礎覆寫 |
| 企業價值標題 | 33.12 | 30 | 30 | `--font-size-section-heading` | token 全域 |
| 企業價值介紹／卡片內文 | 17 | 17 | 15 | body token／About card | token 全域，手機有基礎覆寫 |
| 企業價值卡片標題 | 24 | 24 | 24 | About 專屬 `.about-enterprise-values__card h3` | 否 |
| 認證標題 | 33.12 | 30 | 30 | `--font-size-section-heading` | token 全域 |
| 認證年代切換 | 20 | 17.92 | 16 | About 專屬 `clamp()`／mobile query | 否 |
| 認證年份 | 32.4 | 32 | 32 | About 專屬 `clamp()` | 否 |
| 認證事件 | 17 | 17 | 15 | `--font-size-card-description` | token 全域，手機有基礎覆寫 |
| 子公司標題 | 33.12 | 30 | 30 | `--font-size-section-heading` | token 全域 |
| 子公司摘要／內文 | 17 | 17 | 15 | body token／mobile query | token 全域，手機有基礎覆寫 |
| Footer 公司資訊 | 14 | 14 | 14 | `--font-size-supporting` | 共用 Footer |
| Footer 欄位標題 | 17 | 17 | 15 | `--font-size-body`／mobile query | 共用 Footer，手機有覆寫 |
| Footer 連結／版權 | 15 | 15 | 15 | `--font-size-body-sm` | 共用 Footer |

### 判斷

- 全站 token 控制基礎 body、section heading、card description、supporting 與 navigation 尺寸。
- Hero、企業價值卡片標題、認證年代／年份屬於元件或頁面專屬尺寸，不是單一全域值。
- `tokens.css:162-173` 在 1023px 以下將 body 基礎尺寸降為 15px；因此手機多數一般內文為 15px。

## 3. 各區塊文字顏色與全域性

| 區塊 | 實際顏色 | 規則來源 | 是否全域 |
|---|---|---|---|
| Header 導覽 | `#333333` | `--color-text-primary`／site-header | 共用全域 |
| Hero 麵包屑／標題 | `#FFFFFF` | page-hero | 共用元件 |
| 公司簡介 Lead、各段標題 | `#333333` | `--color-text-primary` | 全域 token |
| 公司簡介內文 | `#555555` | `--color-text-body` | 全域 token |
| 企業價值介紹／卡片內文 | `#555555` | `--color-text-body` | 全域 token |
| 企業價值卡片標題 | `#333333` | `--color-text-primary` | 全域 token |
| 認證標題／事件 | `#333333` | About／token | 主要為全域 token |
| 認證年代／年份 | `#F58214` | `--color-primary` | 全域 token |
| 子公司標題／摘要 | `#333333` | `--color-text-primary` | 全域 token |
| 子公司內文 | `#555555` | `--color-text-body` | 全域 token |
| Footer 公司資訊／連結／版權 | `#D8D8D6` | `--color-text-on-dark-muted` | 共用 Footer |
| Footer 欄位標題 | `#F3F4F3` | `--color-text-on-dark` | 共用 Footer |

### 顏色補充

- 認證年代切換的 hover／active 使用主題橘 `#F58214`。
- Hero 使用白色文字疊在深色漸層之上。
- About 標題下方的裝飾線使用主題橘漸層，不是文字顏色。
- About 沒有發現桌機、筆電或手機另外指定不同文字色的規則；主要差異是尺寸與字重。

## 4. 各區塊文字粗細與全域性

全站字重 token 位於 `wwwroot/css/base/tokens.css:33-39`：regular 400、heading 500、medium／semibold 600、bold 700、section heading 700。筆電區間另有 `tokens.css:162-173` 的標題字重調整。

| 區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Header 導覽 | 400 | 400 | 400 | 是 |
| Hero 標題 | 500 | 400 | 500 | 共用元件；筆電有全站調整 |
| 公司簡介 Lead | 700 | 600 | 700 | token，筆電有調整 |
| 公司簡介內文 | 400 | 400 | 400 | 是 |
| 企業價值區標題 | 700 | 600 | 700 | token，筆電有調整 |
| 企業價值卡片標題 | 500 | 400 | 500 | About 使用 heading token，筆電受全站調整 |
| 企業價值卡片內文 | 400 | 400 | 400 | 是 |
| 認證年代切換 | 700 | 700 | 700 | About 專屬 |
| 認證年份 | 700 | 700 | 700 | About 專屬 |
| 認證事件 | 400 | 400 | 400 | 是 |
| 子公司摘要 | 600 | 500 | 600 | About 專屬；筆電有調整 |
| 子公司內文 | 400 | 400 | 400 | 是 |
| Footer 公司資訊／連結／版權 | 400 | 400 | 400 | 共用 Footer |
| Footer 欄位標題 | 500 | 400 | 500 | 共用 Footer；筆電受全站調整 |

### 判斷

文字粗細大部分由全域 token 控制，但筆電 1024–1439px 是明確的設計例外：標題層級普遍變為較輕的 400 或 600，以配合較窄的版面。這是跨頁共用規則，不是 About 單獨行為。

## 5. 各區塊圖片圓角與全域性

| 圖片／區塊 | 桌機 | 筆電 | 手機 | 是否全域 |
|---|---:|---:|---:|---|
| Hero 圖片 | 0 | 0 | 0 | 共用 page-hero，無圖片圓角 |
| Hero 外框右下角 | 52px（clamp 上限） | 約 46px（clamp 計算） | 約 30px（clamp 下限） | 共用 page-hero 外框 |
| 公司簡介 media／圖片 | 6px | 6px | 6px | 使用 `--card-radius`，共用 token |
| 企業價值卡片 | 0 | 0 | 0 | About 專屬，未設定 radius |
| 企業價值 media／圖片 | 0 | 0 | 0 | About 專屬，未設定 radius |
| 認證內容 shell／時間軸 | 0 | 0 | 0 | About 專屬 |
| 子公司 accordion item | 0 | 0 | 0 | About 專屬 |
| 認證 pagination dot | 圓形 50% | 圓形 50% | 圓形 50% | About 專屬；active 為 999px 膠囊 |

### 判斷

只有公司簡介圖片使用共用 `--card-radius`。About 的企業價值卡片、認證時間軸與子公司手風琴刻意維持直角，不能將全站卡片圓角直接套用到所有 About 區塊。

## 6. 各區塊圖片遮罩與全域性

本頁沒有 CSS `mask-image` 或 `-webkit-mask-image` 圖片遮罩。實際使用的是以下三種效果：

| 區塊 | 實際效果 | 強度／設定 | 是否全域 |
|---|---|---|---|
| Hero | 黑色漸層 overlay | `rgb(0 0 0 / 18%)` 至 `rgb(0 0 0 / 30%)` | 共用 page-hero |
| 公司簡介背景 | 白色透明漸層疊在背景圖上 | `rgb(255 255 255 / 42%)` | About 專屬 |
| 企業價值圖片 | CSS filter | `brightness(.98) saturate(.96) contrast(1.08)` | About 專屬 |
| 其他內容圖片 | 無遮罩、無 filter | 原圖搭配 `object-fit: cover` | About 專屬 |

### RWD 差異

- 公司簡介背景圖在 840px 以下移除，手機不再使用該背景圖或白色疊加效果。
- Hero overlay 在三種視窗均沿用相同的共用漸層 token。
- 企業價值圖片的 filter 沒有因桌機、筆電、手機而改變。

## 區塊級完整盤點

### Hero

- 結構：`.about-hero.page-hero`。
- 字體：全站 body 字體。
- 標題：桌機 43.2px／500，筆電 40.32px／400，手機 28.8px／500，白色。
- 麵包屑：14px／400，白色。
- 圖片：無圖片圓角、無 mask；使用共用黑色漸層 overlay。
- 外框：底部主題橘邊線，右下角有 page-hero 外框圓角。

### 公司簡介

- 結構：`.about-profile`、`.about-profile__media`、`.about-profile__copy`。
- Lead 使用 section heading token；一般內文使用 body token。
- 圖片與 media 使用 6px `--card-radius`。
- 桌機／筆電有背景圖與 42% 白色透明漸層；840px 以下移除背景圖。
- 版面在 980px 以下由雙欄改為單欄，圖片比例也由 16/10 調整為 16/9。

### 企業價值

- 三欄卡片在寬螢幕顯示，840px 以下改為單欄。
- 卡片標題 24px，桌機／手機 500，筆電 400。
- 圖片比例 16/9，直角，使用固定 filter，不使用 mask。
- 內文與介紹文字使用 body token；手機為 15px。

### 認證與時間軸

- 年代切換由 JavaScript 動態產生，但文字樣式由 About CSS 控制。
- 年代切換桌機 20px、筆電約 17.92px、手機 16px，均為 700。
- 年份約 32px、700、主題橘；事件文字桌機／筆電 17px、手機 15px。
- 使用線條、節點、分頁圓點建立視覺層級，不涉及圖片遮罩。

### 子公司

- 使用原生 `<details>`／`<summary>`，保留不依賴 JavaScript 的基本可讀性。
- 摘要桌機／手機 600，筆電 500；內文為 400。
- 手風琴項目直角，背景使用共用 section surface token。

### Footer

- 沿用共用 Footer 樣式，不是 About 專屬設計。
- 公司資訊 14px；欄位標題桌機 17px、手機 15px；連結與版權 15px。
- 深色背景上的文字採 muted／on-dark token，與 About 內容區的 `#333333`／`#555555` 分離。

## 驗證範圍與限制

### 已驗證

- 已讀取 About HTML、About CSS、About JavaScript，以及共用 tokens、reset、page-hero、header、footer 樣式。
- 已用本機 ASP.NET Core 實際載入 `/about`。
- 已在 Edge 瀏覽器讀取三種視窗的 `getComputedStyle()` 結果，包含字體、尺寸、顏色、字重、圓角與 overlay／filter。
- 已確認三種視窗的 CSS media query 落點與字體載入狀態。

### 尚未驗證

- 尚未以實體手機、Safari、Firefox 或其他實體瀏覽器進行人工驗收。
- 尚未進行螢幕閱讀器與完整鍵盤操作的人工無障礙驗收；本報告僅記錄原始結構與 CSS／瀏覽器結果。
- 本報告沒有修改 About 程式碼，也未驗證未來 CDN、正式環境或快取版本與本機結果是否完全一致。

