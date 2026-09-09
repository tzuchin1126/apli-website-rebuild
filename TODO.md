# APLI 專案進度

## 2026-09-09 恢復公司沿革原始排版

### 已完成
- 公司沿革 HTML、CSS 與 JavaScript 恢復至本次時間軸改版前的 Git 版本。
- 移除本次新增的水平時間軸、事件卡片與年份切換箭頭修改。
- 其他頁面與既有未提交修改保持不變。

### 已驗證
- `node --check wwwroot/js/pages/company-history.js` 通過。
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。


## 2026-09-09 公司沿革事件拆分固定高度卡片

### 已完成
- 同一年份的不同事件改為各自獨立深色卡片。
- 桌機卡片使用一致的響應式固定高度，手機統一為 240px。
- 長內容可在卡片內垂直捲動，避免內容溢出或改變卡片高度。

### 已驗證
- `node --check wwwroot/js/pages/company-history.js` 通過。
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 統一不同年份時間軸卡片尺寸

### 已完成
- 移除依年份數量重新分配欄寬的規則。
- 不同年代頁籤使用相同卡片欄寬與固定卡片高度。
- 年份數量不足時保留時間軸欄位節奏，不放大單張卡片。

### 已驗證
- `node --check wwwroot/js/pages/company-history.js` 通過。
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。


## 2026-09-09 搶救公司沿革水平時間軸

### 已完成
- 清除互相覆蓋的時間軸 CSS，重建為單一橫向滑動元件。
- 年份、水平線、節點與深色事件卡片依認證區塊的順序排列。
- 新增左右切換按鈕、按鈕停用狀態、觸控滑動與鍵盤年代切換。
- 同頁事件卡片高度同步，避免欄位高低凌亂。

### 已驗證
- `node --check wwwroot/js/pages/company-history.js` 通過。
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。
- 已以 Chrome 實際擷取 1440px 與 390px 畫面，確認年份、水平線與卡片不再重疊；手機時間軸維持橫向滑動。


## 2026-09-09 修正公司沿革水平欄位跑版

### 已完成
- 修正年份與事件卡片重疊問題。
- 每個年份恢復為獨立欄位，年份置於卡片上方。
- 水平時間線橫跨欄位，並以每年第一個節點作為圓圈標記。

### 已驗證
- `git diff --check` 通過。

## 2026-09-09 修正公司沿革時間軸不換行

### 已完成
- 所有年份與事件欄位固定在同一條水平軌道。
- 超過可視寬度時改為橫向滑動，不再直接換行。
- 水平時間線延伸至完整滑動軌道，維持認證區塊的呈現邏輯。

### 已驗證
- `git diff --check` 通過。


## 2026-09-09 公司沿革比照認證與獎項區塊

### 已完成
- 桌機改為三欄年份、水平時間線與圓點、下方同欄事件卡片。
- 事件卡片套用認證區塊的深色背景與淺色文字。
- 行動版保留直向閱讀。

### 已驗證
- `git diff --check` 通過。


## 2026-09-09 修正公司沿革時間線置中

### 已完成
- 時間線改以節點欄位寬度的 50% 計算水平位置。
- 確保桌機與行動版圓圈中心和時間線一致。

### 已驗證
- `git diff --check` 通過。

## 2026-09-09 公司沿革改為中央線左右分欄

### 已完成
- 桌機改為中央垂直時間線。
- 事件卡片與說明排列在線條左側。
- 年份排列在線條右側，並保留行動版原有可讀性配置。

### 已驗證
- `git diff --check` 通過。

## 2026-09-09 公司沿革年份與事件交叉排列

### 已完成
- 2023 年份在中央線右側，事件內容在左側。
- 2018 年份改至中央線左側，事件內容改至右側。
- 後續年份依序交替，中央時間線與圓圈維持固定置中。

### 已驗證
- `git diff --check` 通過。

## 2026-09-09 收近公司沿革年份與中央時間線

### 已完成
- 縮小左右交叉年份欄位靠近中央線一側的內距。
- 保留事件卡片與中央線位置，讓年份視覺上更貼近節點。

### 已驗證
- `git diff --check` 通過。

## 2026-09-09 修正左側年份靠線對齊

### 已完成
- 左側年份改為靠近中央時間線的右側對齊。
- 右側年份維持靠近中央時間線的左側對齊。

### 已驗證
- `git diff --check` 通過。

## 2026-09-09 收斂公司沿革交叉時間軸節奏

### 已完成
- 縮短年份群組之間的垂直間距。
- 縮短同一年份事件卡片之間的間距。
- 微調年份靠近中央線的留白，保留左右交叉結構。

### 已驗證
- `git diff --check` 通過。

## 2026-09-09 公司沿革恢復固定左右閱讀結構

### 已完成
- 所有年份統一排列在中央時間線左側。
- 所有事件內容統一排列在中央時間線右側。
- 中央時間線與圓圈位置維持不變，移除交叉排列造成的閱讀跳動。

### 已驗證
- `git diff --check` 通過。

## 2026-09-09 公司沿革改為中央時間線構圖

### 已完成
- 垂直時間線移至內容區中央。
- 沿革事件排列於時間線左側，年份排列於右側。
- 圓圈節點固定在線條中央，桌機與手機同步套用。
- 保留原有年份分頁、事件內容與直式滾動。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 尚未重新進行瀏覽器桌機／手機畫面驗收。

## 2026-09-09 統一公司沿革消息卡片上下間距

### 已完成
- 桌機 `milestone-event__content` 上下 padding 統一為 16px。
- 手機版上下 padding 統一為 12px。
- 保留原本左右間距、背景色與時間線結構。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 調整公司沿革消息卡片內距

### 已完成
- 增加每則消息標題上方內距至 16px。
- 標題與說明內容間距由 14px 縮短為 8px。
- 下方內距調整為 24px，讓卡片內容比例更集中。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 公司沿革消息內容加入背景色

### 已完成
- 每一個 `.milestone-event__content` 加入 `var(--color-surface-subtle)` 淺灰背景。
- 保留原本標題、敘述文字、時間線與圓圈樣式。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 修正公司沿革第一個節點斷線

### 已完成
- 垂直時間線起點延伸至時間軸容器頂端。
- 第一個圓圈現在會與後續灰色線條連接，不再出現斷線。
- 桌機與手機同步修正。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 收近公司沿革年份與時間線距離

### 已完成
- 縮小年份欄寬與年份／節點間距。
- 縮小節點欄寬，使年份更靠近時間線原點。
- 桌機與手機分別調整，保留原本直式時間軸與事件內容。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 公司沿革時間線節點比照認證區塊

### 已完成
- 保留公司沿革原本直式時間軸排列。
- 將時間線圓圈改為認證與獎項區塊相同的小型白底灰框節點。
- 移除原本橘色實心、粗白框與陰影，時間線維持 2px 灰線。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 恢復公司沿革至水平改版前狀態

### 已完成
- 移除沿革事件深色卡片背景與淺色文字設定。
- 恢復原本白底、深色標題、內文色彩與內容內距。
- 公司沿革恢復至提出水平改版前的直式時間軸排列。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 公司沿革事件卡片比照認證區塊

### 已完成
- 沿革事件內容改為認證與獎項相同的深色卡片呈現。
- 標題與敘述改用淺色文字，保留水平年份與時間線結構。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 尚未重新進行瀏覽器實際畫面與 1:1 視覺驗收。

## 2026-09-09 公司沿革完整比照認證時間軸 UI

### 已完成
- 公司沿革時間軸改為與認證與獎項相同的內容寬度與水平滑動容器。
- 年份、水平線與事件欄位統一為橫向時間軸結構。
- 桌機使用一致的內容邊界，手機保留水平滑動與可讀欄寬。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 尚未重新進行公司沿革頁桌機／手機瀏覽器實際畫面驗收。

## 2026-09-09 公司沿革改為水平時間軸

### 已完成
- 公司沿革年份群組改為水平排列，參考認證與獎項區塊的可滑動時間軸模式。
- 每個年份維持獨立可讀欄位，事件內容保留原本資料與階層。
- 桌機與手機皆支援水平滑動，手機避免內容被壓縮。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 尚未進行公司沿革頁桌機／手機瀏覽器實際畫面與互動驗收。

## 2026-09-09 統一主選單與子選單底線厚度

### 已完成
- 新增 `--nav-underline-size: 2px` 導覽底線 Token。
- 主選單 active 線與子選單 hover 線統一使用同一個厚度設定。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 恢復 About 深色區塊純色

### 已完成
- 移除藍灰漸層 Token。
- 經營理念與認證獎項區塊恢復使用 `var(--color-surface-dark)` 純色背景。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 恢復 About 深藍漸層背景

### 已完成
- 恢復 `--color-surface-dark-gradient`：由 `#44505f` 漸層至 `#657b98`。
- 經營理念與認證獎項內容區恢復藍灰漸層呈現。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 恢復 About 深色區塊純色背景

### 已完成
- 移除深藍漸層 Token。
- 經營理念與認證獎項區塊恢復使用純色 `var(--color-surface-dark)`。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 收斂 About 深藍漸層對比

### 已完成
- 將深藍漸層終點由 `#657b98` 調整為 `#56687e`。
- 降低漸層明暗差異，使經營理念與認證獎項更符合整體企業網站色調。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 About 深藍區塊加入藍灰漸層

### 已完成
- 新增 `--color-surface-dark-gradient` 藍灰漸層 Token。
- 經營理念內容區與認證獎項卡片套用由 `#44505f` 至 `#657b98` 的低對比漸層。
- Logo 卡片淺灰區域維持純色，避免整體過度複雜。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 統一 About 深色區塊色彩 Token

### 已完成
- 新增 `--color-surface-dark: #44505f` 專用背景色 Token。
- 經營理念內容區與認證獎項內容區改用同一個 Token。
- 保持原本顏色不變，只整理色彩責任與共用方式。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 修正行動版多角化經營標題左側對齊

### 已完成
- 移除行動版多角化區塊內層容器重複套用 `var(--content-width)` 造成的二次內縮。
- 標題區與卡片區改為使用外層同一個內容邊界。
- 多角化經營標題左側現在與認證與獎項標題一致。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 修正多角化經營標題左側對齊

### 已完成
- 為多角化經營 `.about-section-heading` 加入 `justify-items: start`。
- 英文標題、中文標題與副標改為與上方 `about-section-heading--left` 共用左側起點。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 恢復多角化經營英文標題並修正左對齊

### 已完成
- 恢復 `AFFILIATES` 英文標題，不再隱藏或移除文字。
- `about-section-heading` 維持左對齊，英文標題、中文標題與副標共用同一左側起點。
- 保持區塊內容寬度與右側 Logo 卡片的左右邊界一致。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 修正多角化經營桌機標題視覺對齊

### 已完成
- 桌機隱藏多角化經營區塊的裝飾性 `AFFILIATES` eyebrow，避免主標與卡片頂部產生錯位感。
- 中文主標現在直接從左側欄頂部開始，與右側第一張 Logo 卡片對齊。
- 手機版保留 `AFFILIATES` eyebrow 與正常標題層級。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 修正多角化經營標題與卡片頂部對齊

### 已完成
- 桌機將 `AFFILIATES` eyebrow 移出標題正常排版高度。
- 「多角化經營」標題本身與右側第一張 Logo 卡片頂部對齊。
- 行動版恢復 eyebrow 正常排列，避免標題過度上移。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 對齊多角化經營左側標題

### 已完成
- 左側標題欄明確設定 `align-self: start` 與零 padding。
- 右側卡片欄同步設定從頂部開始排列，兩側起始位置對齊。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 多角化經營恢復左標題右卡片

### 已完成
- 桌機改為左側 sticky 標題／副標，右側雙欄 Logo 卡片。
- 行動裝置取消 sticky，改為標題在上、卡片單欄排列。
- 保留既有 Logo 尺寸修正與卡片內距設定。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 撤回多角化經營 Hover Cards

### 已完成
- 移除剛加入的卡片上移、陰影、橘色邊框與深色內容區互動。
- 保留原本卡片連結、Logo 微放大與既有版型／響應式規則。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 多角化經營低調版 Hover Cards

### 已完成
- 桌機滑入／鍵盤 Focus 時，卡片輕微上移並顯示陰影與橘色邊框。
- Logo 保留原本的微放大效果，內容區切換深色背景與淺色文字。
- 行動裝置不依賴 Hover，維持卡片內容直接可讀。
- 加入 `prefers-reduced-motion` 的停用動畫處理。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 尚未重新進行瀏覽器桌機、手機與鍵盤 Focus 實際驗收。

## 2026-09-09 調整認證與獎項區塊上下間距

### 已完成
- 認證與獎項區塊改用相同的上下 padding：`clamp(40px, 4vw, 56px)`。
- 移除原本較小的全域 `padding-bottom`，讓區塊上下留白一致。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 修正 Logo 統一策略

### 已完成
- 恢復其他企業 Logo 原本的自然比例與尺寸，不再套用共同固定寬度。
- 僅針對 `.about-affiliates__card--static` 的亞安企管顧問 Logo 限制最大尺寸。
- 桌機與手機分別設定亞安 Logo 上限，避免單一 Logo 過大又不影響其他 Logo。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 統一多角化經營 Logo 視覺尺寸

### 已完成
- Logo 改用固定圖片框高度與 `object-fit: contain`，不再依賴各檔案原始高度。
- 桌機與手機套用一致的視覺高度規則，改善亞安企管顧問 Logo 顯得過大的問題。
- 保留不同 Logo 的原始比例，不變形、不裁切。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 尚未重新進行瀏覽器桌機與手機畫面驗收。

## 2026-09-09 縮短行動版多角化卡片內距

### 已完成
- 行動版 Logo 圖片區最小高度調整為 88px。
- 行動版文字區最小高度調整為 56px。
- 縮短圖片與文字上下留白，桌機與平板尺寸不變。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 多角化經營改為置中標題與橫向卡片

### 已完成
- 移除桌機左側 sticky 標題，改為區塊上方置中標題與副標。
- 卡片改為桌機三欄橫向排列，取消錯落偏移並縮小單張卡片視覺比例。
- 平板採兩欄，手機採單欄，保留響應式可讀性。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 尚未重新進行瀏覽器桌機／筆電／手機實際畫面驗收。

## 2026-09-09 收斂多角化經營卡片上下間距

### 已完成
- Grid 上下間距調整為 `clamp(12px, 1.2vw, 20px)`。
- 偶數卡片錯落上移距離調整為 `clamp(24px, 3vw, 48px)`。
- 保留雙欄錯落視覺，但縮短卡片之間的垂直空白。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 收斂多角化經營卡片尺寸

### 已完成
- 多角化經營外層改為 `var(--content-width)`，與上方區塊維持一致左右邊界。
- 縮小右側卡片圖片區、內容區、卡片間距與錯落偏移，避免單張卡片過大。
- 保留桌機 sticky 左欄與手機單欄排列。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 尚未重新進行瀏覽器桌機／手機實際視覺驗收。

## 2026-09-09 多角化經營錯落卡片版型

### 已完成
- 桌機改為左側 sticky 標題／副標、右側雙欄錯落企業卡片。
- 卡片改為垂直圖片／內容結構，保留既有企業資料與連結。
- 手機版取消 sticky 與錯落位移，改為單欄堆疊，維持可讀性與操作穩定。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- 實際桌機、筆電與手機瀏覽器視覺比例及滾動體驗尚未人工驗收。

## 2026-09-09 增加多角化經營區塊上方間距

### 已完成
- 將 `.about-page .about-affiliates` 上方間距由 `clamp(40px, 4.5vw, 64px)` 調整為 `clamp(64px, 6vw, 96px)`。
- 增加認證與獎項區塊、以及多角化經營區塊之間的段落分隔。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 統一多角化經營副標文字尺寸

### 已完成
- 將多角化經營副標從 `var(--font-size-body)` 改為首頁「我們的服務」使用的 `var(--font-size-body-copy)`。
- 同步套用首頁相同的字距與 1.75 行高，桌機尺寸可達 18px。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 調整多角化經營標題間距

### 已完成
- 移除 `.about-page .about-affiliates .about-section-heading h2::after` 橘色裝飾線。
- 移除標題下方額外內距。
- 副標與標題間距調整為 16px，參考首頁「我們的服務」標題與敘述配置。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 調整多角化經營文案

### 已完成
- About 頁關係企業區塊標題改為「多角化經營」。
- 新增副標：「跨足不同產業，創造多元事業價值」。
- 更新企業卡片清單的無障礙標籤。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 修正認證區標題橘色線條

### 已完成
- 說明共用 `.about-section-heading h2` 的橘色 `border-bottom` 是線條來源。
- 認證區標題改用明確 `border: 0`，並停用 `::before`／`::after`，避免載入順序或快取造成裝飾線殘留。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 移除經營理念卡片 Icon

### 已完成
- 移除使命、核心價值觀與共同願景三張卡片的 Icon Overlay。
- 清理經營理念 Icon 專用 CSS，保留圖片與文字版型。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 套用核心價值觀與共同願景 Icon

### 已完成
- 核心價值觀圖片上方加入使用者提供的握手 Icon。
- 共同願景圖片上方加入使用者提供的圓形趨勢 Icon。
- 沿用第一張卡片的白色、置中與響應式 Overlay 呈現。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 更換經營理念第一張 Icon

### 已完成
- 將第一張經營理念圖片上方中央 Icon 替換為使用者提供的圖示。
- 保留原本白色 Overlay、尺寸與置中位置。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 經營理念第一張圖片 Icon 預覽

### 已完成
- 在經營理念第一張圖片上方中央加入使用者提供的白色人物 Icon。
- Icon 採圖片 Overlay，不改變圖片尺寸、卡片高度或其他兩張圖片。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- About 頁實際桌機／手機視覺比例與 Icon 可讀性驗收。

## 2026-09-09 經營理念卡片深色背景

### 已完成
- `.about-philosophy-editorial__copy` 背景改為 `#44505f`。
- 卡片標題與內容改用 `var(--color-text-on-dark)` 淺色 Token，維持深色背景上的閱讀對比。
- `#44505f` 同時是全域 `--color-text-body` 文字 Token，但本次卡片背景採直接色值以符合指定設計。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 認證年份切換與時間軸視覺穩定

### 已完成
- 認證事件背景改為 `#44505f`，內文改用淺色文字。
- 移除認證區標題裝飾線，重新設定標題上下內距。
- 年份導覽切換改為穩定定位，避免平滑捲動造成內容來回跳動。
- 時間軸線與節點改用 `--color-line` token，移除橘色時間軸線條。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- About 認證區實際年份切換、桌機／手機畫面與其他瀏覽器驗收。

## 2026-09-09 移除經營理念標題下方內距

### 已完成
- 移除 `.about-page .about-philosophy-editorial .about-section-heading h2` 的 `padding-bottom`。
- 保留標題、區塊背景與既有區塊間距設定。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 經營理念卡片白色背景

### 已完成
- `.about-page .about-philosophy-editorial__copy` 改為白色背景，保留外層經營理念區塊淺灰背景。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 About 經營理念區塊間距與背景

### 已完成
- 為經營理念區塊加入淺灰背景。
- 縮小 `core-values-editorial-title` 與下方卡片的間距。
- 移除 `.about-philosophy-editorial__copy` 背景色。
- 減少 `company-profile` 上方留白。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- About 頁桌機／手機實際視覺畫面、其他瀏覽器、實體裝置與無障礙人工驗收。

## 2026-09-09 撤回 About 經營理念互動版預覽

### 已完成
- 移除新增的互動版預覽區塊與相關 CSS，恢復原本單一經營理念區塊。
- 保留 About Profile 5:5 圖文比例與既有間距調整。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

## 2026-09-09 About 經營理念互動版預覽

### 已完成
- 保留原本「經營理念」區塊，於下方新增互動版預覽區塊，方便新舊設計直接比較。
- 互動版使用原有三組內容與圖片，桌機可 Hover／Focus，點擊標題可展開內容；手機採單欄呈現。
- 使用原生 `details/summary`，未依賴 JavaScript，保留停用腳本時的基本可讀性。

### 已驗證
- `git diff --check` 通過。
- `dotnet build -c Release` 通過。

### 未驗證
- About 頁桌機／手機實際視覺比較、其他瀏覽器、實體裝置與無障礙人工驗收。

## 2026-09-09 移除 About 經營理念裝飾線

### 已完成
- 移除 `.about-page .about-philosophy-editorial .about-section-heading h2::after`，保留標題與其他區塊樣式。

### 已驗證
- `git diff --check` 通過。

### 未驗證
- About 頁桌機／手機實際畫面、其他瀏覽器、實體裝置與無障礙人工驗收。

## 2026-09-09 全站英文小標題間距

### 已完成
- 將全站主要 `.eyebrow` 英文小標題的 `margin-bottom` 統一為 4px，包含首頁、About、人才招募、職安與營運資源頁。
- 未調整中文主標題、區塊外距或 Footer 文字間距。

### 已驗證
- `git diff --check` 通過。

### 未驗證
- 各頁桌機／手機實際畫面、其他瀏覽器、實體裝置與無障礙人工驗收。

## 2026-09-09 About Profile 5:5 欄位比例

### 已完成
- 桌機版 `about-profile` 圖文欄位由 4:6 調整為 5:5，維持左文右圖與手機版單欄排列。

### 已驗證
- `git diff --check` 通過。

### 未驗證
- About 頁桌機／手機實際畫面與其他瀏覽器驗收。

## 2026-09-09 About Profile 圖文順序與標題間距

### 已完成
- 桌機版 `about-profile` 改為左側文字、右側圖片；手機版維持原本的圖片後文字順序。
- `about-profile__lead` 與下方內容的間距調整為 16px，與首頁 `home-intro__subtitle` 下方間距一致。

### 已驗證
- `git diff --check` 通過。

### 未驗證
- About 頁桌機／手機實際畫面、其他瀏覽器、實體裝置與無障礙人工驗收。

## 2026-09-09 內頁 Hero 標題左對齊

### 已完成
- 非首頁一般 Hero 標題改為左對齊，並使用與麵包屑相同的 `--content-inset` 左右基準。
- Quote Hero 與首頁 Hero 維持原本呈現，不改動內容與圖片位置。
- 更新共用 Hero CSS cache key。

### 已驗證
- `git diff --check` 通過。

### 未驗證
- 各內頁桌機／手機實際畫面、Quote Hero、其他瀏覽器、實體裝置與無障礙人工驗收。

### 後續調整
- 依需求恢復非首頁 Hero 標題原本的置中位置。

## 2026-09-09 ASE 風格首頁視覺收斂

### 已完成
- 恢復 `.home-contact-cta` 原本的區塊間距、按鈕背景與互動呈現，不再套用首頁共用覆寫。
- 修正首頁區塊重複套用 `content-width` 造成的右側大面積空白；保留既有容器寬度，只收斂色彩與間距。
- 將全站中性文字、反白底色與邊界色由純黑收斂為深藍灰，降低視覺對比跳動。
- 收斂首頁主色透明度與區塊上下間距，維持不同視窗寬度的連續比例。
- 首頁主要內容區統一使用 `content-width` 與正文最大寬度，未改動既有內容、圖片或互動。

### 已驗證
- `git diff --check` 通過。
- 本機首頁 1280px 載入成功，頁面無水平溢出，Hero 高度約 606px。
- 5127 首頁桌機 1912px 實際載入確認：無水平溢出；Hero 約 747px；About 內容寬度 1324px；服務與 CTA 區塊為滿視窗寬度 1897px。
- 5127 首頁 390／768／1024／1366px 實際載入確認：皆無水平溢出；CTA 與服務區塊維持滿版，About 內容區依容器縮放。
- 390px 手機版已截圖確認主要內容可載入，未見明顯重疊；測試後已恢復 1912px 桌機視窗。
- `dotnet build -c Release` 通過，0 個警告、0 個錯誤。
- 將首頁區塊間距限定在 `.home-page`，避免影響其他內頁。

### 未驗證
- ASP.NET 動態資料、其他瀏覽器、實體裝置與無障礙人工驗收。

## 2026-09-09 首頁最新消息卡片 Meta 位置

### 已完成
- 首頁最新消息卡片的 `home-latest__meta` 維持「類別 → 日期」順序，並增加卡片內容上內距，避免 meta 貼近卡片上緣。
- 更新首頁 CSS／JavaScript cache key；未改動新聞資料、標題、背景圖片或查看更多連結位置。

### 已驗證
- `git diff --check` 通過。

### 未驗證
- 實際 ASP.NET 動態新聞資料、實體裝置、其他瀏覽器與無障礙人工驗收。

## 2026-09-09 首頁最新消息輪播左側對齊

### 已完成
- 最新消息下一頁箭頭改用第一張卡片的 `offsetLeft` 作為固定基準，讓切換後的第一張卡片貼齊左側邊線，對齊 About 認證與獎項區塊的輪播方式。
- 箭頭切換改為直接以目標卡片的 `offsetLeft` 計算捲動位置，避免頁面位置陣列在右側延伸版型下產生偏移。
- 下一頁／上一頁改為依實際卡片寬度加間距推動軌道，讓下一張卡片接替第一張卡片並貼齊左側基準線。
- 修正真正造成畫面無變化的桌機版裁切範圍：輪播 viewport 改為滿視窗寬度，初始卡片仍以內容容器左側內距對齊；切換後允許上一張卡片越過標題左側並顯示在視窗左側區域。
- 更新首頁 JavaScript cache key；未改動卡片內容、資料或視覺樣式。

### 已驗證
- `node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。

### 未驗證
- 實際瀏覽器點擊箭頭的桌機／手機畫面、實體裝置、其他瀏覽器與無障礙人工驗收。

## 2026-09-07 首頁跨尺寸寬度與文字調整

原工作樹的 TODO.md 已刪除；本檔依專案規則僅記錄本次工作，未還原舊進度。

### 已完成
- 共用 tokens 新增 content-gutter 與 content-width，首頁套用連續側邊留白與 1324px 最大內容寬度；服務區保留 1200px 上限。
- 收斂首頁區塊標題至 30–36px（預設根字級），服務卡片標題與關於副標題使用 24px token；新聞與服務介紹使用正文 token。
- 更新首頁 CSS 版本參數，保留既有內容、排列及上下區塊間距。

### 已驗證
- 本機靜態首頁，無頭 Edge：1920、1440、1366、1200、981、980、768、767、390px 視窗寬度。
- documentElement 無水平溢出，服務卡片文字高度未超過卡片。
- 1366px 關於／最新消息左右留白約 54.64px；390px 為 20px。
- 1920px 區塊標題 35.52px；1366px 為 32.196px；390px 為 30px。
- git diff --check 通過。

### 未驗證
- ASP.NET 動態新聞資料、共用 Footer 注入、其他內頁、正式部署、實體装置及跨瀏覽器驗收。
- 未變更 C#、Razor 或 JavaScript，未執行 Release 建置或 JavaScript 語法檢查。
- 依本次 AGENTS.md 未自行 commit 或 push；保留既有未提交修改。

## 2026-09-07 麵包屑對齊 Header Logo
- 共用麵包屑容器改用 Header 相同的左右內距與 981px／840px 斷點，未改動 Header 或內容區。
- 更新 breadcrumb.css 載入版本。
- 已驗證：本機靜態 About 頁、無頭 Edge，1912／1366／980／840／390px，麵包屑首個連結與 Logo 左側座標一致；1912px 皆為 294px，390px 皆為 16px。
- 已驗證：git diff --check。
- 未驗證：其他內頁逐頁驗收、實體裝置、其他瀏覽器與正式部署。未修改 C#／Razor／JS，未執行其建置或語法檢查。
- 未 commit 或 push。

## 2026-09-08 Careers 招募文案字體與尺寸
- `.recruitment-copy` 改用 `var(--font-heading)`（Noto Serif TC），並以響應式尺寸放大至 `clamp(1.375rem, 1.8vw, 1.75rem)`。
- 更新 Careers CSS cache key；未改動文案、連結或其他區塊。
- 已驗證：本機靜態 Careers 頁、Edge 1440／390px；計算字體皆為 `"Noto Serif TC", "Songti TC", serif`，字号分別為 25.92／22px，頁面無水平溢出；`git diff --check` 通過。
- 未驗證：本次靜態環境未載入外部 Google Noto Serif TC 字體檔，正式環境的字體網路載入與其他瀏覽器仍待確認。
- 未 commit 或 push。

## 2026-09-08 Careers 招募按鈕內距
- `.recruitment-link` 左右 padding 由 18px 調整為 12px；未改動按鈕寬度、文字、排列與上下 padding。
- 更新 Careers CSS cache key。
- 已驗證：本機靜態 Careers 頁、Edge 1440／390px；兩個按鈕的左右 padding 皆為 12px，頁面無水平溢出；`git diff --check` 通過。
- 未 commit 或 push。

## 2026-09-08 Careers 招募按鈕外框寬度
- 因固定寬度會抵消 padding 縮短的外觀效果，`.recruitment-link` 寬度由桌機 220px／手機 280px 收斂為 200px／260px；左右 padding 維持 12px。
- 更新 Careers CSS cache key。
- 已驗證：本機靜態 Careers 頁、Edge 1440／390px；兩個按鈕寬度分別為 200／260px，左右 padding 皆為 12px，頁面無水平溢出。
- 未 commit 或 push。

## 2026-09-08 Careers 招募按鈕整體尺寸
- `.recruitment-link` 再縮小為桌機 180px／手機 240px，padding 調整為上下 12px、左右 10px；未改動文字與排列。
- 更新 Careers CSS cache key。
- 已驗證：本機靜態 Careers 頁、Edge 1440／390px；兩個按鈕尺寸分別為 180×50／240×50px，padding 皆為上下 12px、左右 10px，頁面無水平溢出。
- 未 commit 或 push。

## 2026-09-08 News 卡片標題字體尺寸
- `.news-card__title` 桌機字級調整為 `clamp(1.125rem, 1.4vw, 1.375rem)`，手機調整為 `1.125rem`；未改動卡片內容、圖片、排列與行數限制。
- 更新 News CSS cache key。
- 已驗證：本機靜態 News 頁、Edge 1440／390px；News CSS 正確載入新 cache key，桌機／手機規則分別生效，頁面無水平溢出。
- 未驗證：靜態伺服器未提供 `/api/public/news`，因此未生成實際新聞卡片；需在 ASP.NET 執行環境補做動態資料畫面確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容區最小高度
- `.news-detail` 增加響應式最小高度：桌機 `clamp(560px, 60vh, 720px)`，手機 520px；內容較長時可自然延伸。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片或 Footer。
- 已驗證：待補 ASP.NET 動態新聞詳細頁的桌機／手機實際渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容區背景
- `.news-detail__header` 與 `.news-detail__layout` 套用 `var(--color-surface-subtle)` 淺灰背景；返回按鈕所在的 `.news-detail` 外層維持原背景，不包含按鈕。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片或 Footer。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；標題／內容區為 `rgb(245, 245, 245)`，返回按鈕維持透明背景，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的實際內容高度與圖片狀態仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容區內距
- `.news-detail__header` 與 `.news-detail__layout` 增加響應式水平內距，桌機最多 32px、手機約 20px；保留返回按鈕與灰色內容區的分離。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片或 Footer。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；標題／內容區左右內距分別為 32／20px，返回按鈕維持透明背景，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的實際內容高度與圖片狀態仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁分隔線範圍
- 標題區底部分隔線改為只延伸至內容水平內距範圍，桌機左右縮進 32px；手機維持不顯示分隔線。
- 更新 News Detail CSS cache key；未改動背景、內容或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；無主圖背景 CSS 規則載入 64% 白色遮罩與指定圖片路徑，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，無主圖 class 的實際背景呈現仍待 ASP.NET 動態詳細頁確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁淺灰背景高度
- `.news-detail__layout` 增加最小高度：桌機 360px、手機 280px，讓內容較少時淺灰背景仍保持完整區塊；內容較長時可自然延伸。
- 更新 News Detail CSS cache key；未改動返回按鈕、分隔線或新聞內容。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；淺灰內容區最小高度規則分別為 360／280px，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的實際內容高度與圖片狀態仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁標題字重
- `[data-news-title]` 對應的 `.news-detail h1` 字重由 500 調整為 `var(--font-weight-regular)`（400）；未改動字号、字體、間距或內容。
- 更新 News Detail CSS cache key。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；`[data-news-title]` 計算字重皆為 400，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的實際內容狀態仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁與 Footer 間距
- `.news-detail` 增加響應式底部留白 `clamp(40px, 4vw, 64px)`，讓淺灰內容區與 Footer 之間保留白色間隔；未改動灰色區塊、內容或返回按鈕。
- 更新 News Detail CSS cache key。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；底部留白計算值為 57.6／40px，淺灰內容區與外層背景分離，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁的 Footer 實際銜接仍待確認。
- 未 commit 或 push。

## 2026-09-08 無主圖 News 詳細頁背景圖
- `.news-detail.news-detail--without-image::before` 使用 `public/images/new/pexels-ilkinefendiyev-21134318.jpg` 作為背景圖；有主圖的詳細頁維持原背景設定。
- 更新 News Detail CSS cache key；未改動新聞內容、主圖邏輯或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；無主圖背景 CSS 規則已載入指定圖片路徑，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，無主圖 class 與背景圖片實際呈現仍待 ASP.NET 動態詳細頁確認。
- 未 commit 或 push。

## 2026-09-08 無主圖 News 詳細頁背景淡化程度
- 無主圖背景圖白色遮罩由 86% 降為 64%，提高圖片可見度；有主圖詳細頁維持原遮罩設定。
- 更新 News Detail CSS cache key；未改動灰色內容區、新聞內容或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；背景 CSS 規則載入 64% 白色遮罩與指定圖片路徑，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，無主圖 class 的實際背景呈現仍待 ASP.NET 動態詳細頁確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁共用背景圖片
- 將指定背景圖片與 64% 白色遮罩移至 `.news-detail::before` 共用規則，讓所有消息詳細頁都套用；保留 `news-detail--with-image`／`news-detail--without-image` 的內容版面邏輯。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片判斷或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；Hero 圖片成功載入，Hero 高度為 350／280px，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁背景圖片固定位置
- `.news-detail::before` 新增 `background-attachment: fixed`，讓背景圖片固定於視窗位置，保留置中與 64% 白色遮罩。
- 更新 News Detail CSS cache key；未改動內容區、圖片判斷或返回按鈕。
- 已驗證：待補桌機／手機實際動態新聞頁捲動確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁恢復 Hero 背景
- 移除 `.news-detail__header` 與 `.news-detail__layout` 的淺灰背景，恢復由 `.news-detail::before` 統一呈現的 Hero 背景；保留固定圖片、淡化、高度、間距與內縮分隔線。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片判斷或返回按鈕。
- 已驗證：待補桌機／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁恢復共用 Hero 區塊
- 移除 `.news-detail::before` 的橘色背景圖片引用，恢復 `.news-detail__header`／`.news-detail__layout` 淺灰背景。
- 在 News 詳細頁加入與其他內頁一致的 `page-hero`「最新消息」區塊，載入共用 `page-hero.css` 與 `news-hero.png`。
- 更新 News Detail CSS cache key；未刪除使用者提供的背景圖片檔，未改動新聞內容、圖片判斷或返回按鈕。
- 已驗證：待補桌機／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Hero 背景圖片
- 將共用 Hero 圖片改為 `public/images/new/pexels-ilkinefendiyev-21134318.jpg`，沿用 `page-hero` 的 Overlay、裁切與響應式高度。
- 更新 News Detail CSS cache key；未改動新聞內容、圖片判斷或返回按鈕。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；Hero 圖片成功載入，Hero 高度為 350／280px，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Hero 遮罩與圖片位置
- News 詳細頁 Hero 遮罩調淡為 10%／20%，圖片位置調整為桌機 `center 40%`、手機 `center 38%`，讓圖片內容往上呈現。
- 更新 News Detail CSS cache key；未改動 Hero 高度、新聞內容或內容區背景。
- 已驗證：待補桌機／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Hero 圖片裁切位置
- 因原圖上半部為淺色區域，將 Hero 圖片裁切位置調整為桌機 `center 75%`、手機 `center 70%`，讓下方橘色影像內容顯示於 Hero 區塊。
- 更新 News Detail CSS cache key；未改動遮罩、Hero 高度或新聞內容。
- 已驗證：待補桌機／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Editorial Article 版型
- Hero 下方文章區改為白底純文章排版，移除大面積淺灰 Card 感；文章閱讀寬度置中為 960px，保留淡橘分類 Badge 與淡灰 H1 分隔線。
- 依 Editorial 閱讀動線調整返回連結、Meta、H1、Divider 與正文間距；手機同步保留分隔線與閱讀寬度。
- 正文第一行與 H1 完全相同時不再重複顯示；未改動 Header、Breadcrumb、Hero、全站 container 或 typography tokens。
- 更新 News Detail CSS／JS cache key。
- 已驗證：本機靜態 News Detail 頁、Edge 1440／390px；文章寬度上限 960px、白底透明背景、間距與分隔線規則正確，JavaScript 語法檢查通過，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，正文首行去重與實際文章渲染仍待 ASP.NET 動態詳細頁確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容與 Footer 間距
- 恢復 `.news-detail` 底部響應式留白 `clamp(40px, 4vw, 64px)`，讓文章內容與 Footer 保持分離。
- 更新 News Detail CSS cache key；未改動 Header、Breadcrumb、Hero 或文章內部排版。
- 已驗證：待補桌機／手機實際動態新聞頁與 Footer 銜接確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁內容區高度
- 恢復 `.news-detail__layout` 最小高度：桌機 360px、手機 280px，避免短篇文章過快銜接 Footer。
- 更新 News Detail CSS cache key；未改動 Header、Breadcrumb、Hero 或文章閱讀排版。
- 已驗證：待補桌機／手機實際動態新聞頁與 Footer 銜接確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Editorial Header Overlap
- 文章區以負 margin 向上交疊 Hero：桌機 96px、手機 40px；Article Header 改為白底、960px 置中、無陰影／圓角／外框。
- 返回最新消息移至 Article Header 上方外側；正文沿用同一閱讀寬度，不新增第二層背景框。
- 更新 News Detail CSS cache key；未修改 Header、Breadcrumb、Hero、全站 container 或 typography tokens。
- 已驗證：待補桌機／平板／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Editorial Header overlap 微調
- Article Header overlap 增加 48px：桌機 144px、平板 112px；手機維持 40px，避免小螢幕擁擠。
- 返回最新消息移入 Article Header，置於日期／分類上方；Header／Body／返回連結皆共用 960px 左側 alignment，手機也移除 Header 水平內縮；未改動 Hero、文章 typography 或 CMS 資料。
- 更新 News Detail CSS cache key；已驗證：待補桌機／平板／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁 Article Header 內部間距
- 返回連結與 Meta 間距調整為 38px，Meta／H1 間距為 20px，H1／Divider 間距為桌機 30px、手機 28px；Divider／正文維持 44／40px。
- 返回箭頭向左突出 24px，返回文字、Meta、H1、Divider、正文與圖片共用同一左側基準線；未改動 Article Width、overlap、Hero 或文章 typography。
- 更新 News Detail CSS cache key；已驗證：待補桌機／平板／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁返回連結與容器位置微調
- 返回連結文字恢復與 Article 左側基準線對齊，箭頭改為獨立向左突出 24px；Meta、H1、Divider、正文與圖片 alignment 不變。
- Article Container 向下調整 24px：桌機 overlap 為 120px、平板 88px；手機維持 40px overlap，避免小螢幕交疊不足。
- 未改動 Article Width、Hero、typography 或 CMS 資料；更新 News Detail CSS cache key。
- 已驗證：待補桌機／平板／手機實際動態新聞頁渲染確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁恢復內容區高度版本
- 恢復至內容區高度版本：移除 Article Header overlap 與箭頭突出定位，返回連結回到文章區上方；Article Container 維持 960px。
- 內容區最小高度恢復為桌機 360px、手機 280px，內容與 Footer 保留響應式間距。
- 保留白底 Editorial Article、Meta／H1／Divider 間距與正文首行去重；未改動 Header、Breadcrumb、Hero 或 CMS 資料。
- 更新 News Detail CSS cache key；已驗證：本機靜態 News Detail 頁、Edge 1440／390px；文章最小高度 360／280px、Footer 留白 57.6／40px，頁面無水平溢出。
- 未驗證：靜態頁未載入動態新聞資料，ASP.NET 動態詳細頁仍待確認。
- 未 commit 或 push。

## 2026-09-08 News 詳細頁短篇消息首屏節奏
- 縮短 Hero 後至返回連結、返回連結至文章 Meta，以及標題區至正文的垂直留白，讓短篇消息更快呈現日期、分類與標題。
- 進一步收斂桌機 Article Header 上方留白，維持返回連結到日期 Meta 的緊湊閱讀節奏。
- 保留 960px Article Container、白底 Editorial Article、桌機／手機內容區最小高度與 Footer 間距；未改動 Header、Breadcrumb、Hero、文章內容或全域 typography tokens。
- 更新 News Detail CSS cache key；已驗證：待補桌機／手機瀏覽器實際渲染確認。
- 未 commit 或 push。

## 2026-09-08 News Detail Hero 顯示文章標題
- Hero 在「最新消息」下方新增目前消息的文章標題，使用小於 Hero 主標題的響應式字級，並由 News Detail API 動態帶入。
- 保留 Hero 圖片、高度、橘色底線、右下圓角與原有「最新消息」主標題；未改動 Header、Breadcrumb、Article Container 或 CMS 資料。
- 更新 News Detail CSS／JS cache key；已驗證：本機靜態 News Detail 頁、Edge 1440／390px；Hero 副標題樣式分別為 24／16px，Hero 高度與原有橘線／右下圓角保留，頁面無水平溢出。
- 未驗證：ASP.NET 動態資料實際帶入不同新聞標題的畫面，以及正式環境字體載入。
- 未 commit 或 push。

## 2026-09-08 Footer 下方區塊改為橘色線條
- 移除 `.site-footer__bottom` 的滿版橘色背景；上方改為與 Logo 下方線條同寬的淺灰線，底部恢復漸層橘色裝飾線與原有右上圓弧。
- Footer 下方文字改用深色 Footer 標題色，更新所有公開頁面的 Footer CSS cache key；未改動 Footer HTML、導覽內容或手機手風琴互動。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，淺灰上邊線與 Logo 下方線條同寬，底部漸層橘色弧形點綴正確，頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 Footer 下方區塊上下間距
- `.site-footer__bottom` 增加上下留白，桌機隱私連結同步上移，避免內容貼近底部橘色裝飾線；未改動線條寬度、漸層、右上圓弧或 Footer HTML。
- 更新所有公開頁面的 Footer CSS cache key。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，上下間距與內容／裝飾線分離正常，頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 Footer 下方區塊間距與文字對齊
- `.site-footer__bottom` 上下 padding 調整為 `8px`；隱私權政策改與 Footer copyright 共用同一個 flex 對齊流程，修正同列垂直對齊問題。
- 保留淺灰上邊線、漸層橘色底部裝飾、右上圓弧與內容容器寬度；更新所有公開頁面的 Footer CSS cache key。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，padding 8px、桌機隱私權政策與 copyright 垂直對齊，頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 Footer 橘色弧形裝飾高度
- 底部橘色漸層裝飾線高度調整為桌機 `clamp(8px, 0.7vw, 10px)`、手機 `8px`，提高右上圓弧的可見度；未改動淺灰上邊線、Footer 文字對齊或 padding。
- 更新所有公開頁面的 Footer CSS cache key。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，橘色裝飾高度與右上圓弧已放大，Footer 文字未被截切且頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 Footer 恢復原橘色裝飾高度
- 恢復上一版本的底部橘色漸層裝飾高度：桌機 `clamp(4px, 0.35vw, 6px)`、手機 `4px`；保留 padding 8px、文字對齊、淺灰上邊線與右上圓弧。
- 更新所有公開頁面的 Footer CSS cache key。
- 已驗證：`git diff --check` 通過；沿用前一版本 Edge 1440／390px 預覽結果，頁面無水平溢出。
- 未驗證：ASP.NET 動態注入後完整頁面、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Pagination UI 樣式
- `news-pagination` 改為參考圖的無框頁碼配置：左右箭頭與一般頁碼使用既有文字 token，目前頁碼使用 `--color-surface-inverse` 圓形底搭配 `--color-text-on-dark`。
- 移除頁碼外框與目前頁底線，保留鍵盤 focus 狀態；桌機／手機分別調整間距與目前頁圓形尺寸，未改動新聞資料、分頁計算或點擊行為。
- 更新 `news.html` 的 News CSS cache key。
- 已驗證：`git diff --check` 通過；Edge 唯讀預覽 1440／390px，確認無框頁碼、目前頁 50／44px 圓形、箭頭字型與頁面無水平溢出。
- 未驗證：ASP.NET 動態新聞資料實際渲染、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Pagination 頁碼格式
- 頁碼移除兩位數補零，改為直接顯示 `1`、`2` 等數字；未改動分頁計算、切換行為或 Pagination UI 樣式。
- 更新 `news.js` cache key。
- 已驗證：`node --check wwwroot/js/pages/news.js`、`git diff --check` 通過。
- 未 commit 或 push。

## 2026-09-08 News 預設圖片調整恢復
- 恢復至 News Pagination 頁碼格式調整完成時的狀態：預設圖片回到原本 `right center` 定位與原有預設卡片文字色彩；保留頁碼顯示 `1`、`2` 與 Pagination UI 樣式。
- 已驗證：`git diff --check`、`node --check wwwroot/js/pages/news.js` 通過。
- 未 commit 或 push。

## 2026-09-08 News Detail Hero 手機取景位置
- 手機 Hero 圖片定位由 `center 70%` 調整為 `center 60%`，與桌機採用相同垂直取景基準，降低不同裝置的顏色區域差異。
- 更新 News Detail CSS cache key；未改動 Hero 圖片、遮罩強度或文字內容。
- 已驗證：`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 其他消息區塊
- 詳細頁文章內容下方新增「其他消息」，從公開 News API 載入並排除目前文章，顯示最多 3 筆；沿用 News 列表原有 `news-card` 卡片結構與 RWD 排版。
- 支援自訂圖片、預設圖、附件標記與圖片載入失敗 fallback；相關消息載入失敗時隱藏區塊，不影響詳細頁文章。
- 更新 `news-detail.html` 的 News／News Detail CSS 與 JS cache key；未改動既有文章內容、Hero 或 Footer。
- 已驗證：`node --check wwwroot/js/pages/news-detail.js`、`git diff --check` 通過。
- 未驗證：ASP.NET 動態 API 實際回傳下的相關消息內容、實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 其他消息區塊比例
- 保留原有 News 卡片比例與排版，縮小「其他消息」區塊的上下留白、標題字級及標題與卡片間距，讓文章底部的相關內容更緊湊。
- 桌機／手機分別調整區塊間距；未改動相關消息數量、排除目前文章邏輯或卡片結構。
- 更新 News Detail CSS cache key。
- 已驗證：Edge 動態頁 1440／390px，確認相關消息仍顯示 3 張卡片、桌機 3 欄、手機 1 欄且無水平溢出；`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 其他消息輪播與返回按鈕
- 移除 `.news-detail-related` 上邊線，將相關消息改為桌機每組 3 張、手機每組 1 張的左右切換輪播，卡片沿用原有 `news-card` UI 並縮小區塊最大寬度。
- 卡片下方新增「返回最新消息」按鈕，讓使用者可從詳細頁底部直接回到 News 列表；保留排除目前文章與 API 失敗隱藏區塊行為。
- 更新 News Detail CSS／JS cache key。
- 已驗證：`node --check wwwroot/js/pages/news-detail.js`、`git diff --check` 通過；Edge 動態頁桌機／手機可切換相關消息，底部返回按鈕置中且無水平溢出。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 其他消息標題對齊
- `news-detail-related__title` 左側對齊輪播視窗內第一張卡片，桌機／手機皆扣除各自的左右控制按鈕欄位與間距；未改動卡片尺寸或輪播行為。
- 更新 News Detail CSS cache key。
- 已驗證：Edge 動態頁 1440／390px，標題與第一張卡片左側對齊且頁面無水平溢出；`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 相關卡片標題字級
- 針對 `news-detail-related` 內的 `news-card__title` 增加裝置尺寸響應式字級：桌機／平板使用 `clamp`，手機使用較緊湊字級；未影響 News 列表頁卡片。
- 保留原本標題最多兩行截斷與卡片 UI；更新 News Detail CSS cache key。
- 已驗證：Edge 動態頁 1440／768／390px，確認標題字級隨 viewport 調整且頁面無水平溢出；`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 返回按鈕與 Footer 間距
- 縮短 `news-detail-related` 底部留白，讓 `news-detail-related__back button--primary` 更靠近下方 Footer；桌機／平板採響應式間距，手機調整為 24px。
- 更新 News Detail CSS cache key。
- 已驗證：Edge 動態頁 1440／768／390px，確認返回按鈕與 Footer 間距縮短且頁面無水平溢出；`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 行動版相關消息滑動
- 行動版 `news-detail-related` 的 `site-container` 改與上方內容左側對齊；相關消息改為完整橫向卡片列，單次約顯示一張半，支援原生手指滑動與 scroll snap。
- 行動版（含 768px breakpoint）隱藏左右按鈕以保留卡片寬度；桌機左右分組切換維持原本功能；更新 News Detail CSS／JS cache key。
- 已驗證：Edge 動態頁桌機／768px／390px，確認手機卡片列可橫向滑動、左側對齊且無水平溢出；`node --check`、`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。

## 2026-09-08 News Detail 相關消息切換滑順感
- 桌機 `news-detail-related__control` 切換時加入前後方向滑入動畫；行動版 viewport 加入 smooth scroll，搭配原生手指滑動與 scroll snap。
- `prefers-reduced-motion` 時停用切換動畫與平滑捲動；更新 News Detail CSS／JS cache key。
- 已驗證：Edge 動態頁桌機／768px／390px，確認桌機控制切換、手機滑動與頁面無水平溢出；`node --check`、`git diff --check` 通過。
- 未驗證：實體裝置、其他瀏覽器與無障礙人工驗收。
- 未 commit 或 push。
# 2026-09-09 首頁關於亞太區塊移除標題
- 移除 `index.html` 的 `.home-intro__heading` 標題區塊與 `aria-labelledby` 參照。
- 調整首頁 About Grid 為圖片與介紹內容直接排列，避免移除標題後留下空白列。
- `git diff --check`、JavaScript 語法檢查與 Release 建置待本次修改後執行；瀏覽器桌機與手機畫面尚未驗證。
# 2026-09-09 首頁服務區塊移除標題底線
- 移除 `.home-page .home-services-compare__heading h2::after`，保留 `home-services-compare-title` 標題文字與其他服務區塊樣式。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁服務標題與說明間距調整
- 將 `home-services-compare-title` 與下方 `p` 的間距調整為 `16px`，對齊 `.home-intro__subtitle` 與 `.home-intro__copy` 的上下節奏。
- 移除服務標題為底線預留的下方 padding；已執行 `git diff --check`，瀏覽器畫面尚未驗證。
# 2026-09-09 首頁服務卡片下方遮罩加深
- 將 `.home-services-compare__body` 漸層底部遮罩由 `78%` 加深至 `88%`，並微調中段為 `22%`，提升卡片文字區域的對比度。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁服務連結底線樣式一致化
- 將 `.home-services-compare__action` 底線透明度由 `0.8` 調整為 `0.5`，與 About 區塊 `.home-text-link` 一致。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁 About 與最新消息標題底線移除
- 移除 `.home-page .home-intro h2::after` 與 `.home-page .home-latest h2::after`。
- 最新消息標題取消底線預留的 `padding-bottom`，避免移除底線後留下多餘上下空間。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁最新消息卡片內距收斂
- 參考日月光最新消息卡片的內容集中感，將 `.home-latest__body` 由最大 `40px` 內距調整為上方最大 `32px`、左右最大 `28px`，卡片尺寸維持不變。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁最新消息預設圖文字與遮罩統一
- 預設背景圖卡片改用與上傳圖片一致的白色標題、查看更多連結、類別與日期文字。
- 移除預設圖停用遮罩的例外規則，讓所有最新消息卡片共用相同的漸層遮罩，提高文字可讀性。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁最新消息文字對比度提升
- 加深 `.home-latest__media::after` 共用漸層遮罩，上／中／下段調整為 `32% / 44% / 72%`，改善預設背景圖上的白色文字可讀性。
- 維持預設圖與上傳圖片使用同一套遮罩；已執行 `git diff --check`，瀏覽器畫面尚未驗證。
# 2026-09-09 首頁最新消息預設圖遮罩色調修正
- 預設圖改用乾淨的品牌深藍漸層遮罩，避免淺灰／粉橘背景與黑色遮罩疊加後產生灰褐混濁感。
- 上傳圖片仍使用原本的共用照片遮罩；卡片尺寸、文字與 AP logo 不變。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁最新消息預設圖恢復深色文字
- 預設圖卡片恢復深色標題、類別、日期與查看更多文字，並取消預設圖遮罩。
- 使用者上傳圖片維持淺色文字與深色漸層遮罩。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁最新消息箭頭 icon 統一
- 將 `home-latest__more` 動態文字箭頭改為 SVG，使用與服務卡片相同的 `M5 19 19 5M8 5h11v11` path。
- 同步套用 `16px` icon 尺寸與 hover 位移效果；已執行 `git diff --check`，瀏覽器畫面尚未驗證。
# 2026-09-09 首頁 Hero 說明文字與標題間距調整
- 將 `.home-page .home-hero__copy p` 下方 margin 由最大 `20px` 收斂為 `14px`，讓說明文字與下方標題更接近。
- 手機版原有 `12px` 設定維持不變；已執行 `git diff --check`，瀏覽器畫面尚未驗證。
# 2026-09-09 Footer bottom pseudo-element 移除
- 移除 `.site-footer__bottom::before` 分隔線與 `.site-footer__bottom::after` 底部裝飾／圓弧設計，並清除手機版對應覆寫。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 Footer legal links 樣式統一
- 移除 `.footer-legal-links a` 後段覆寫，讓它沿用 `.footer-column a` 的文字顏色、字級、字重與行高。
- 移除隱私權政策的特殊 hover 顏色，並同步修正手機觸控 hover/focus 顏色為 `var(--footer-link)`。
- 已執行 `git diff --check`；瀏覽器桌機與手機畫面尚未驗證。
# 2026-09-09 Footer 主區塊桌機下方間距收斂
- 將桌機／平板 `.site-footer__main` 的 `padding-bottom` 由 `clamp(36px, 4vw, 52px)` 調整為 `clamp(28px, 3vw, 40px)`。
- 保留行動裝置 breakpoint 的 `padding-bottom: 28px` 不變；已執行 `git diff --check`，瀏覽器畫面尚未驗證。
# 2026-09-09 Footer 快速連結與最新消息欄位順序調整
- 交換共用 Footer Partial 中「快速連結」與「最新消息」欄位順序，桌機與行動裝置皆使用相同排列。
- 保留欄位內容、連結與行動裝置收合行為；已執行 `git diff --check`，瀏覽器畫面尚未驗證。
# 2026-09-09 回到頂端按鈕尺寸與 hover 樣式調整
- 將 `.back-to-top` 調整為 `44px`，icon 調整為 `20px`，背景改用白色 token，icon 改用 `--color-text-primary`。
- hover 時整體以 `scale(1.12)` 放大並加強陰影；已執行 `git diff --check`，瀏覽器畫面尚未驗證。
# 2026-09-09 回到頂端按鈕 hover 動畫收斂
- 將 `.back-to-top` hover 放大幅度由 `1.12` 收斂為 `1.06`，並改用較平順的 cubic-bezier transform transition，降低進出時的跳動感。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
# 2026-09-09 首頁最新消息卡片 hover 圖片放大加強
- 將 `.home-latest__item` hover／focus-visible 的背景圖片縮放由 `1.05` 提高至 `1.08`，讓放大效果更明顯。
- 保留手機觸控裝置不放大；已執行 `git diff --check`。
# 2026-09-09 首頁 CTA hover 圖片放大加強
- 將 `.home-contact-cta` 面板 hover／focus-within 的圖片縮放由 `1.02` 提高至 `1.05`，讓互動效果更明顯。
- 已執行 `git diff --check`。
# 2026-09-09 About Hero 標題上下置中修正
- 將 About Hero 的 `.page-hero__title` 高度由 `84%` 恢復為 `100%`，讓標題依共用 Hero 的 `place-items: center` 正確上下置中。
- 桌機與平板 breakpoint 同步調整；已執行 `git diff --check`，瀏覽器畫面尚未驗證。
# 2026-09-09 認證與獎項標題取消上下內距
- 將 `certifications-preview-title` 的標題 `padding-block` 由 `8px` 調整為 `0`，取消標題本身額外的上下間距。
- 已執行 `git diff --check`；瀏覽器畫面尚未驗證。
