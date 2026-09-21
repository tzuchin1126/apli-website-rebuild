# APLI 專案進度

## 2026-09-21
- [x] 加強首頁「關於亞太」按鈕 hover 底線辨識度：改為 2px 橘線，預設隱藏、hover／focus 展開；更新首頁 CSS cache key。Edge 確認桌機 hover 時 2px 橘線完整顯示，390px 手機無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 快速連結 CTA 區標題改為「了解更多」，關係企業卡片改用公司建築物照片；「了解更多」hover 下線與雙箭頭滑入效果比照首頁「關於亞太」按鈕，三卡箭頭統一為同一 SVG path；更新 About CSS cache key。Edge 預覽確認載入 v8 CSS、hover 下線展開及箭頭滑入，圖示尺寸維持 16×16；`git diff --check` 通過；未 commit。
- [x] About CTA 移除上框線與敘述，標題左對齊並改為「關於亞太」，卡片標題字重設為 400；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機與 390px 手機確認標題對齊、卡片排列及無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 快速連結桌機改為三張圖片卡片同列，調整比例與間距；手機維持單欄；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機確認三卡同列、390px 手機確認單欄與無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 快速連結依參考改為寬幅圖片 CTA 卡片：桌機雙欄、第三張置中，手機單欄；各卡呈現標題、「了解更多」及雙箭頭動畫，使用公司沿革、營運資源、碼頭吊車照片；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機與 390px 手機確認卡片位置、圖片與無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 快速連結 CTA 標題改為「繼續探索亞太」，按鈕縮小至 56px 高／16px 字級並保留 hover 邊線原色，箭頭恢復雙箭頭滑入動畫及減少動態偏好；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機與 390px 手機確認排列及無水平溢出；`git diff --check` 通過；未 commit。
- [x] About「亞太多元事業版圖」改為快速連結 CTA，提供公司沿革、營運資源及關係企業三個頁面入口；更新 About CSS cache key；Edge 靜態預覽 1440px 桌機及 390px 手機確認排列與無水平溢出；`git diff --check` 通過；未 commit。
- [x] About 經營理念於 840px 以下改為置中、最大寬度 560px 的 16:10 卡片，降低窄螢幕單欄卡片高度；更新 About CSS cache key；`git diff --check` 通過；未做桌機／手機瀏覽器畫面確認；未 commit。
- [x] 首頁最新消息最多顯示筆數由 8 筆調為 5 筆，更新首頁 JS cache key；`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁最新消息列表標題字級由 22px 調為桌機 20px、手機 18px，更新首頁 CSS cache key；`git diff --check` 通過；未做瀏覽器桌機／手機畫面確認；未 commit。
- [x] 依需求移除 About Hero 下方快速導覽及其專屬樣式與 anchor scroll margin，保留各內容區塊 ID；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 快速導覽連結字重限定為 400，導覽項目 gap 統一為 30px，手機維持相同間距並可橫向滑動；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About Hero 下方新增四項區塊錨點導覽（關於亞太、經營理念、認證與獎項、關係企業），桌機深色橫列、手機橫向滑動；設定固定 Header／導覽列高度對應的 anchor scroll margin。更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 認證與獎項區塊上下 padding 改為比照經營理念區塊：上方 `clamp(48px, 4vw, 64px)`、下方 `clamp(56px, 6vw, 88px)`；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 依更正將 About 認證與獎項區塊上下 padding 改用一般全域 `--section-space`（24–40px）；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證與獎項區塊上下 padding 改用全域 `--section-space-sm`（48–64px）；更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證與獎項資訊區背景改用專案中性淺灰 token `--color-surface-soft`，取代偏藍的色值；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證與獎項資訊區恢復水藍背景 `#edf0f5`；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 經營理念卡片遮罩與底色統一改用專案深藍 `#172538`，維持白色文字及背景圖片；更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 關係企業 CTA 按鈕改為比照首頁最新消息「更多資訊」的白底細框樣式與雙箭頭滑入 hover／focus 動畫。更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 關係企業 CTA 標題縮小至 24–32px，並與右欄說明文字頂端對齊；按鈕 hover／focus 套用首頁關於亞太文字連結的橘色底線展開及箭頭位移效果。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證獎項 events 移除背景色，圓點改跟隨文字顏色；關係企業 CTA 加回滿版貨櫃場背景與深色遮罩，改用白字確保對比。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 認證獎項資訊卡背景恢復原水藍色 `#edf0f5`，文字配合改回深色；保留使用者指定的白色項目圓點。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 關係企業 CTA 依參考改為淺灰底雙欄版型，左側標題、右側說明與深藍按鈕，移除背景照片；手機改單欄排列。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 重整 About 關係企業 CTA 為桌機左右配置：左側 APLI GROUP 標記與短標題，右側套用全站橘色主按鈕；小螢幕改直向排列。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 關係企業 CTA 標題改為「探索亞太多元事業版圖」，連結按鈕改為「認識關係企業」；`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 將 About 關係企業滿版圖片 CTA 移除 320–480px 最小高度，桌機上下 padding 縮為 36–56px、手機 32px；更新 About CSS cache key。`git diff --check` 通過；尚未做瀏覽器畫面確認；未 commit。
- [x] About「關係企業」區塊改為滿版貨櫃場背景圖、置中標題及連至 `/affiliates` 的按鈕；移除原企業 Logo 卡片 markup 與對應 CSS，新增桌機及手機區塊樣式並更新 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] About 頁面企業列表區塊標題及清單無障礙名稱由「多角化經營」改為「關係企業」；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] About 認證獎項項目前方圓點改為白色；更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] About 認證獎項資訊移除項目間分隔線，改在各筆文字前顯示圓點；更新 About CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 將 About 認證獎項卡片標題限定設為 `font-weight: 400`，更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 縮小認證與獎項年份導覽項目間距；將 events 卡片背景改為 `#333333`，文字改白並提高分隔線對比；更新 About CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 修正認證獎項導覽橘色作用線被水平捲動容器裁切的定位，恢復完整可見的 2px 粗度；更新 About CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 再加寬 About 認證獎項桌機輪播容器，最大寬度由內容軌道額外 96px 調為 192px；維持 viewport gutter 限制及手機原寬。更新 CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 將認證獎項年份導覽底線連成一條，寬度限於年份導覽列，保留作用中 2px 橘色底線；更新 About CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] 認證與獎項年份導覽底線改為各按鈕各自顯示，不延伸整列；作用中橘色線維持原本 2px 粗度。更新 About CSS cache key；`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。
- [x] About「認證與獎項」標題至年份導覽間距比照 About 內文標題間距設為 24px；年份導覽加整條淺色底線與選取項目綠色底線；擴寬桌機內容輪播區，並將切換按鈕改為首頁關係企業相同的 chevron SVG 與 hover 邊框效果。更新 CSS／JS cache key；`node --check wwwroot/js/pages/about.js`、`git diff --check` 通過；尚未進行瀏覽器／手機畫面驗證；未 commit。
- [x] About「經營理念」標題與引言的間距比照「關於亞太」標題下方設定為 24px，移除標題多餘的 16px 底部 padding，並更新 About CSS cache key。瀏覽器幾何量測未完成（本機頁面自動化逾時）；手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] About「認證與獎項」標題置中，年份導覽置於標題下方置中，前後切換鈕移至內容兩側。Edge 桌機已確認標題、年份導覽置中及切換鈕位於內容左右；手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] About「關於亞太」移除區塊底色；「經營理念」改用全域淺色背景，理念卡片加入原對應的港口、團隊及貨櫃作業背景圖，保留正方形並將標題與內容置中；更新 About CSS cache key。Edge 桌機 1892×900 已確認版面；手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] About「經營理念」移除三張圖與圖示，保留「使命／核心價值觀／共同願景」為文字卡片，並於標題下增加理念引言；依既有卡片底色 `#edf0f5` 呈現正方形卡片，更新 About CSS cache key。Edge 桌機 1892×900 已確認正方形與原底色；手機瀏覽器、實體裝置、跨瀏覽器及無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] About「關於亞太」改回左側公司大樓圖片、右側標題與敘述，平板／手機改為圖片在上、文字在下；標題下方間距依首頁「關於亞太」設為 24px，移除區塊 `margin-top`；保留一般內文字體、全域字級／字重 token 與全寬淺灰底色。Edge 桌機已確認左圖右文與全寬底色；本次間距及上緣調整未重新量測瀏覽器畫面；手機畫面、實體裝置、跨瀏覽器與無障礙人工驗收未驗證；`git diff --check` 通過；未 commit。
- [x] 依需求將非首頁 10 個 Hero 頁面的標題字級縮小約 10%：共用 Hero 改用 `clamp(1.8rem, 3.15vw, 2.7rem)`，News Detail 動態標題同步縮小；首頁與無 Hero 頁面維持原樣。Edge 計算樣式確認 About 桌機 1366×900 為 43.03px、手機 390×844 為 28.8px，News Detail 桌機標題為 43.03px／21.6px；`git diff --check` 通過。News Detail 手機未驗證；實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] About Hero 圖片與 preload 改用 `public/images/about/company-facility.jpg`，並將尺寸屬性同步為 1638x1335；已確認圖片檔存在並完成 `git diff --check`，未進行瀏覽器畫面驗證；未 commit。
- [x] 全部 11 個 Hero 頁面的標題改為靠左，並比麵包屑多內縮 16–28px；涵蓋共用內頁 Hero、首頁與 News Detail，更新相關 CSS cache key。`git diff --check` 通過；Edge 確認 About 桌機 1912×914／手機 390×844，首頁與 News Detail 桌機 1366×900／手機 390×844 均靠左並保留內縮；其他內頁未逐頁檢查，未做實體裝置／跨瀏覽器驗證；未 commit。
- [x] 麵包屑加入文字層級：可點連結使用 `--color-text-body`，當前頁使用 `--color-text-primary` 與 `--font-weight-medium`；hover／focus 維持 `--color-primary`。更新共用 CSS cache key 與 11 個頁面引用。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 全站麵包屑文字色統一改用 `--color-text-body`，移除聯絡頁重複的色彩覆寫；hover／focus 維持 `--color-primary`。更新 11 個麵包屑頁面的 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 全站麵包屑桌機左緣改與 Header Logo 對齊，分隔符統一為 `/`；連結 hover/focus 延用主題橘色。更新共用 CSS cache key。`git diff --check` 通過；未做桌機/手機瀏覽器畫面確認；未 commit。
- [x] 精簡 `site.js` 的逐行註解與冗長區段說明，合併過度拆行的 selector、事件處理與 Footer Accordion 程式；保留載入失敗、路徑比對、下拉選單與捲動門檻等必要行為說明。`node --check wwwroot/js/site.js`、`git diff --check` 通過；未做瀏覽器互動驗證；未 commit。
- [x] 將首頁 Hero 文案底部板狀漸層改為低對比柔焦暈染，保留文字可讀性並減少遮罩存在感；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 為首頁 Hero 文案後方加入局部淡黑漸層，僅加深文字周圍；手機版將暗部置於置中文字後方，不改動整張 Hero 遮罩。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁桌機 Hero 內容容器改為沿用共用 Header 的左右內距，使 Hero 文案左緣與 Logo 對齊；手機版版位不變。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 修正共用 Header 981px 以上的舊 media query 覆蓋，所有桌機頁面現在與首頁採用相同的左右間距；沿用已更新的共用 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 移除首頁 Header 預設暗色遮罩；桌機加寬邊界移至共用 Header 樣式，所有頁面採用一致間距，手機版間距維持原值。同步更新共用 Header 快取版本。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁桌機 Header 左右邊界加寬，Logo 與導覽列向視窗兩側延伸；頂端預設加淡黑半透明底，捲動／hover 時切回白底。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 Hero CTA 恢復原始外觀：透明底、白色外框與文字、原本的圖示及 hover 白底樣式；保留 Hero 遮罩已移除的設定。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 Hero CTA 預設背景恢復白色、文字使用深色；保留品牌橘 hover 與箭頭滑入效果。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 Hero CTA 改為預設顯示共用按鈕底色，圖示替換成 16px 細線右箭頭，hover／focus 沿用「關於亞太」了解更多按鈕的雙箭滑入效果；支援減少動態偏好。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 移除首頁 Hero 全尺寸遮罩，包含手機版覆寫，保留圖片與文字版面。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 依參考圖加深首頁 Hero 左側遮罩，讓暗區覆蓋標題區並延伸至畫面中段，再淡出至透明；右側主體保留亮度。手機版置中標題遮罩維持原樣。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 Hero 桌機遮罩改為左側較深、向右漸淡至透明，凸顯左側標題並保留右側圖片亮度；手機版置中標題的原遮罩維持不變。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁聯絡／招募 CTA 標題恢復使用全站標題字體，內文維持一般字體，讓標題層級與首頁其他區塊一致。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 移除首頁聯絡／招募 CTA 標題與內文的文字陰影，保留圖片遮罩；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 聯絡／招募 CTA 標題改用一般內文字體；按鈕預設顯示，箭頭使用與「更多資訊」一致的 16px 雙箭滑入動畫。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 關係企業區塊桌機上方留白增加、下方留白略減，讓標題與卡片組視覺下移並平衡卡片下方空間；手機留白維持原值。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 `home-contact-cta` 還原為原有全寬聯絡／招募雙面板，恢復原文案、圖片裁切、hover 展開與按鈕互動；其他首頁區塊變更保留。更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 為首頁「關於亞太」描述段落指定可讀的內文字色 `--color-text-body`，避免受外層文字色繼承影響；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面確認；未 commit。
- [x] 首頁 CTA 恢復聯絡資訊與職缺資訊兩張圖片卡片，桌機並排、手機直向排列；沿用聯絡與招募各自的原背景圖，不加區塊底色或地圖背景。更新首頁 CSS cache key。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 首頁單一卡片改為聯絡資訊，使用原聯絡卡背景圖 `news-hero.png`，列出已在聯絡頁使用的電話、電子郵件與地址，並連至聯絡頁。更新首頁 CSS cache key。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 恢復首頁職缺資訊原有的 `core-values.jpg` 背景圖片，使用深色遮罩維持文字對比，保留透明區塊底色與單一職缺內容。更新首頁 CSS cache key。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 首頁 CTA 簡化為單一人才招募資訊，移除聯絡卡、世界地圖與裝飾點、圖片及面板底色；保留職缺頁連結並移除不再需要的左右面板互動。更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 首頁聯絡／招募 CTA 改為置中的雙欄圖片卡片，加入點陣世界地圖與品牌色標記；標題及按鈕置中，手機改為直向排列，保留原圖片與連結。更新首頁 CSS cache key。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。
- [x] 首頁區塊順序試調為主視覺 → 我們的服務 → 最新消息 → 關於亞太 → 關係企業，後依需求恢復原順序主視覺 → 關於亞太 → 我們的服務 → 最新消息 → 關係企業；內容與樣式保留。`git diff --check` 通過；未進行瀏覽器畫面驗證；未 commit。

- [x] 關係企業輪播初次載入時直接定位第一組卡片，避免初始 transform 套用切換動畫而暫時偏移；後續切換動畫保留。更新首頁 JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 關係企業區塊上下內距改為一致：桌機共用 `clamp(40px, 4vw, 60px)`，手機上下均為 40px；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 首頁「最新消息」區塊改用全寬 `#333333` 深色背景，標題、日期、類別、分隔線與前往圖示調整為淺色，保留白底「更多資訊」按鈕。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息列表寬度收窄並置中；「更多資訊」按鈕桌機高度／字級增大，手機版同步加高加字。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息標題調整為區塊置中，列表與下方「更多資訊」按鈕位置維持不變；更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息列表恢復與標題左緣對齊；「更多資訊」按鈕移至列表下方置中。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 移除最新消息標題下方分隔線；桌機列表起點改與標題文字右緣對齊，手機維持完整可讀寬度。更新首頁 CSS cache key。`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息列表可見時左右內縮；每則恢復公告類別，hover／鍵盤 focus 顯示前往箭頭。更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 首頁最新消息改為垂直條列，逐則顯示日期與標題並以細線分隔；移除卡片摘要及水平輪播互動，保留全寬淺灰底與標題分隔線。更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 首頁最新消息卡片移除圖片 markup、圖片載入程式與預設圖片 CSS，保留日期、標題、摘要及連結；更新首頁 CSS／JS cache key。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；未做瀏覽器畫面驗證；未 commit。

- [x] 最新消息圖片區恢復原 2:1 比例，減少縮小卡片時 `object-fit: cover` 導致的裁切；保留卡片尺寸與標題間距調整，更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「最新消息」卡片寬度縮至最多 360px、圖片比例縮短，卡片內距與標題上方間距增加；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 恢復首頁「最新消息」標題下方原有的分隔線；保留全寬淺灰背景與上下留白，更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「最新消息」淺灰背景延伸至全視窗寬度，區塊保留上下留白並移除標題下方分隔線；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「最新消息」區塊加上淺灰背景（`--color-surface-soft`），更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 移除首頁「我們的服務」區塊上下邊線，維持無背景色；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 移除首頁「我們的服務」區塊背景色，標題恢復深色、上下邊線恢復淡色；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「我們的服務」背景改為 `#2a3139`，標題與區塊上下邊線調整為深底可讀的淺色；更新首頁 CSS cache key。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁「我們的服務」改用淺灰背景並加入上下細邊線；移除「關係企業」區塊的背景色與上下邊線，保留版型。已執行 `git diff --check`；未進行瀏覽器畫面驗證；未 commit。

- [x] 首頁關係企業輪播調整為桌機一次顯示 4 張，卡片置中並保留間距，左右切換鈕改用 SVG chevron icon；平板顯示 2 張、手機顯示 1 張，hover／focus 敘述樣式保留。Edge 桌機約 1920px 畫面確認置中四張卡片與切換按鈕，並確認點擊下一張可移動；`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。手機瀏覽器畫面、實體裝置、跨瀏覽器與完整人工無障礙尚未驗證；未 commit。

- [x] 將首頁關係企業輪播改為置中的固定最大寬版型，桌機同時顯示 4 張卡片，左右新增可鍵盤操作的切換按鈕；保留窄螢幕卡片列、拖曳與自動輪播。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；Edge 桌機畫面已確認，手機瀏覽器畫面、實體觸控、跨瀏覽器與完整人工無障礙尚未驗證；未 commit。

- [x] 關係企業輪播切換按鈕 hover 時改為黑色邊線，SVG icon 保持原色；完成 `git diff --check`，未 commit。

- [x] 整理首頁區塊整體節奏：服務、關於、最新消息與關係企業統一使用置中的內容寬度；服務卡列對齊內容容器，關係企業改為與關於區塊一致的淺底色區段，卡片列與切換按鈕仍維持置中。Edge 桌機畫面確認內容欄位對齊與企業區塊淺底色；手機斷點僅檢視 CSS，未實際確認手機瀏覽器畫面。`git diff --check` 通過；未 commit。

- [x] 試作聯發科風格的 APLI 橘色／深藍大面積區段，依使用者回饋色彩過強，已完整撤回配色試作；恢復各區段既有白色／淺灰底色，同時保留首頁內容寬度對齊。Edge 桌機已確認恢復淺色版面，手機畫面未驗證；`git diff --check` 通過；未 commit。

- [x] 將首頁「關於亞太」移至主視覺後、服務區塊前，先介紹公司再呈現服務內容；其他區塊順序與樣式不變。Edge 桌機畫面確認 About 後接續服務區；`git diff --check` 通過；手機畫面未驗證；未 commit。

- [x] 移除關於亞太區塊的底色、保留點陣地圖；我們的服務區塊改用淡橘品牌色背景（`--color-primary-soft`）。Edge 桌機確認關於區塊透明且點陣圖仍顯示、服務區塊為淡橘色；手機畫面未驗證；未 commit。

## 2026-09-20

- [x] 關係企業輪播切換間隔由 5 秒改為 4 秒；hover 時保持輪播，循序滑入第一張的複製卡後於 transitionend 無動畫歸位，消除循環停頓與跳位。Edge 確認桌機 hover 時輪播持續推進，桌機與 390px 手機尺寸都能從最後一張接回第一張。`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；實體觸控、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 關係企業卡片預設顯示企業名稱；固定桌機高度 280px，hover／focus 僅淡入簡介、不改變卡片或下方區塊位置；手機維持 320px 與完整資訊常駐。Edge 實測桌機 hover 前後卡片高度與下方區塊位置不變，390×844 手機顯示名稱及簡介；`git diff --check` 通過。實體觸控、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 將首頁世新貨櫃 Logo 襯底照片改為 `public/images/affiliates/01.png`；確認圖片檔存在並檢視素材。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 移除關係企業輪播左右按鈕，改為拖曳卡片列並依卡片吸附切換；保留無 JavaScript 時的原生水平滑動。Edge 檢查桌機與 390×844 響應式畫面，確認按鈕移除且拖曳會推進一張卡片；`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。實體觸控、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 移除 `home-affiliates__showcase` 容器；將輪播箭頭定位改由關係企業區塊承接並保留原有桌機／手機間距。hover／focus 不再縮小 Logo。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 關係企業標題下方間距改用全域 `--section-heading-content-gap`（40px），比照服務區塊標題與卡片的間距；移除卡片列頂部 4px 內距以保持實際視覺間距一致。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 微幅加深關係企業照片遮罩，深色漸層由 18%–28% 調為 24%–34%。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 移除關係企業 Logo 陰影與卡片 `::before` 底色，將桌機照片區提高至 152px、手機提高至 160px，並同步調整 hover 資訊起點。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 關係企業 Logo 統一顯示白色；透明 PNG 套用白色濾鏡，ALPHA JPG 以灰階高對比搭配 screen 混色呈現白色圖樣。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 為關係企業 Logo 襯底照片加上深色漸層遮罩（18% 至 28%），讓 Logo 更清晰並保留照片可見度。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 將關係企業 Logo 襯底做成獨立照片 `<img>`，實際顯示於 Logo 區塊後方；Logo 圖使用透明底，襯底僅加 10% 淺色層，維持照片清晰。更新 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 移除關係企業 Logo 區塊的純色底，保留各企業背景照片直接襯托 Logo；更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 依要求撤回整張卡片鋪照片與 Logo 白底襯板，恢復照片只作為 Logo 區塊襯底；保留預設／hover 內容狀態與卡片高度。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 加強關係企業卡片襯底照片可見度：六張企業照片改為覆蓋整張卡片，預設白色覆層降至 24%，Logo 保留半透明白底襯板；hover 時照片壓暗以顯示白色文字。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 依參考圖修正關係企業卡片預設／hover 狀態：預設只顯示 Logo 與對應背景照片；hover／鍵盤 focus 顯示公司名稱與說明。觸控裝置維持資訊可讀；更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 調整關係企業卡片：高度由 330px 降至桌機 280px／手機 320px，預設顯示 Logo 與公司名稱；Logo 區加入各企業對應背景照片及淺色覆層，hover／focus 再顯示說明。更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 收緊首頁關係企業標題與卡片資訊間距，將標題下方局部留白由 24px 調為 12px；Logo 與卡片 hover 位置維持不變，更新 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 首頁最新消息與關係企業區塊改用各自明確的局部上下間距，參考 `home-services-compare`：桌機上方 `clamp(40px, 4vw, 60px)`、下方 `clamp(56px, 5.5vw, 80px)`；手機 `40px / 48px`。最新消息不再沿用原 72–112px 範圍；更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 修正上一輪誤套通用左滑入的最新消息動畫；依 Git 歷史恢復原本 1200ms 左移後回彈至定位的 `home-latest-left-right` 入場效果，並保留減少動態偏好支援。`git diff --check` 通過；未另做瀏覽器檢查；未 commit。

- [x] 恢復首頁最新消息卡片列進入視窗時的水平滑入動畫，改用首頁既有左側 reveal 動效，延遲 120ms；`git diff --check` 通過，未另做瀏覽器檢查；未 commit。

- [x] 首頁關係企業區塊背景改用 `--color-surface-soft` 淺灰色，更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 首頁最新消息卡片圖片改為靠下對齊裁切，讓圖片底部 Logo 完整露出；更新首頁 CSS cache key。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 「關於亞太／了解更多」按鈕尺寸對齊最新消息「更多」：桌機字級 1rem、高度 40px、左右內距 18px；手機字級 14px、高度 40px、左右內距 14px。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 保持最新消息「更多」按鈕尺寸與間距不變，箭頭改為與「關於亞太／了解更多」相同的雙箭頭滑入圖示與 hover／focus 動效；`git diff --check` 通過，未另做瀏覽器／RWD 檢查；未 commit。

- [x] 依回饋恢復最新消息「更多」按鈕原有外觀、chevron 圖示與 3px hover 位移；保留卡片 hover 陰影修改。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 最新消息卡片 hover 改為柔和陰影、取消卡片上移，避免圖片區出現突兀遮罩感；「更多」箭頭改用首頁 `home-text-link` 同款箭頭及 hover 位移／底色效果，更新 CSS cache key。`git diff --check` 通過；未另做瀏覽器／RWD 檢查；未 commit。

- [x] 首頁最新消息摘要字級調整為 `.9375rem`（標準 16px 根字級下約 15px），其餘樣式不變；`git diff --check` 通過。未另做瀏覽器／RWD 視覺檢查；未 commit。

- [x] 首頁 Hero 標題恢復為「優質服務 唯客思維」，移除聯絡 CTA 並還原單一服務 CTA；最新消息日期／類別對調文字顏色，卡片 hover 游標恢復為抓取手勢。輪播指示點改按目前視窗可完整顯示的卡片數分組；桌機 1440px 每次由第 1 則移至第 4 則（可見第 4 至約第 6.5 則），手機每頁移動 1 則，點選及手動拖曳均同步 active 狀態；更新首頁 CSS／JS cache key。Edge 靜態預覽以 8 則樣本於 `1440x900` 確認每頁移動 3 則、第 4 則起始位置與第 3 頁可達；`390x844` 確認 8 點、初始位置及單則切換，文件寬度 390px。`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。正式新聞 API、實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 統一最新消息卡片日期與類別文字為 14px／400；圖片比例調為 2:1、文字區最小高度 210px 並收緊內距，以縮短卡片；卡片 hover 游標改為水平雙向 `ew-resize`。新增參照 Hero dots 視覺的卡片列指示點，依捲動進度更新、可點選跳轉，只有可橫向捲動且至少兩筆消息時顯示；更新首頁 CSS／JS cache key。Edge 靜態預覽於 `1440x900` 確認卡片約 `415px` 高、圖片 `205px`、內容 `210px`，meta 字級／字重一致且游標為 `ew-resize`；點選第 5 點後 active 為第 5 點。`390x844` 確認文件寬度仍為 `390px`、卡片約 `401px` 高、圖片 `153px`、內容 `216px`，點選第 5 點後 active 正確。`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。正式 API、實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 參考 NVIDIA 台灣首頁「關於 NVIDIA」卡片調整最新消息：圖片改為 16:9 原色呈現，白底文字區增加留白，日期／類別置於標題與摘要之前；字級層級改為 15px 分類、20px 標題、16px 摘要，取消 hover 箭頭，改以輕微上移與陰影回饋，保留 6px 圓角及無圖預設圖。更新首頁 CSS cache key。Edge 本機預覽於 `1440x900`、`390x844` 確認圖片裁切、文字層級、卡片高度和手機無水平溢位；桌機 hover 計算為上移 2px／陰影加深，圖片本身不縮放或加暗遮罩；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 最新消息卡片桌機與手機圓角改為共用 `--card-radius`，與我們的服務卡片相同；更新首頁 CSS cache key。Edge 本機預覽於 `1440x900` 與 `390x844` 確認兩種卡片計算圓角均為 `6px`；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 加深首頁服務卡片下半部遮罩以襯托服務標題：線性漸層黑色濃度調為 60%／24%、80%／58%、100%／90%，保留 43% 前圖片無遮罩；更新首頁 CSS cache key。Edge 本機靜態頁面確認 `1440x900` 與 `390x844` 標題可讀、圖片上方仍清楚且文件無水平溢位；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 首頁最新消息卡片改為上方圖片、下方文字，資訊順序調為日期／公告類別、標題、摘要；同步更新伺服器端與前端卡片輸出，移除最新消息標題裝飾線。服務卡摘要改為平滑展開／收合並支援鍵盤 focus；更新首頁 CSS cache key。`dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。Edge 本機靜態預覽確認桌機 `1440x900` 與手機 `390x844` 圖文方向、資訊順序、標題裝飾線已移除及無水平溢位；服務卡摘要 hover 動畫在約 80ms 時透明度約 0.83，約 380ms 完成顯示。ASP.NET 路由／新聞 API、實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 首頁服務卡片 H3 字重設為 400，說明文字預設隱藏並於 hover／鍵盤 focus 顯示；關於亞太區塊改用 `--color-surface-soft` 淺灰底色。更新首頁 CSS cache key。Edge 透過本機靜態伺服器確認桌機 `1440x900` 預設隱藏／hover 顯示、手機 `390x844` 字重與背景色正確且文件無水平溢位；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依首頁企業客戶服務導流目標調整資訊順序：Hero 後先呈現服務，再呈現公司介紹；Hero 標題改為「高雄港區物流服務」並加入「聯絡我們」入口；公司介紹改用成立日期與現有服務事實，移除已過時的「屆滿五十年」說法。更新首頁 CSS cache key。Edge 透過本機靜態伺服器確認 `1440x900`、`390x844`、`320x740` 三種尺寸的 Hero 內容與雙 CTA 顯示，文件寬度均無水平溢位；section 順序與連結靜態確認，`git diff --check` 通過。ASP.NET 路由／新聞 API、實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 微調首頁「關於亞太／了解更多」箭頭：改為深色 1.4px 線條，雙箭頭滑換調為 520ms 柔和緩入緩出，保留 hover／focus 與減少動態偏好支援；更新 CSS cache key。已比對 Polestar Careers 動態，Edge 確認桌機滑換及手機 `390x844` 顯示無溢位，`git diff --check` 通過；減少動態偏好僅檢查 CSS 規則，實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 移除首頁「關於亞太」區塊底色，保留點陣地圖背景圖片與其他版面；更新首頁 CSS cache key。Edge 本機頁面確認桌機與 `390x844` 手機的區塊背景皆透明、點陣背景圖仍載入，手機文件寬度為 390px；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 將首頁「關於亞太」區塊移至 Hero 下方、「我們的服務」上方；僅調整 `index.html` 區塊順序，保留區塊內容與樣式。已靜態確認首頁 section 順序並執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

- [x] 依需求將首頁最新消息恢復至緊接 Hero 下方改版之前的位置，排在「我們的服務／關於亞太」之後、關係企業之前；恢復新聞圖片卡片、最多 8 筆 SSR／API 顯示與桌機切換控制，手機保留原生水平滑動與 scroll snap。Edge 實際檢查 `1440x1000` 與 `390x844`：5 筆已發布消息可顯示、桌機下一則控制可移動輪播、手機文件寬度維持 390px 且卡片可橫向瀏覽。`dotnet build -c Release`、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

## 2026-09-19

- [x] 依首屏高度回饋調整首頁最新消息：桌機資訊帶高度改為 `clamp(180px, 15vw, 210px)`，Hero／最新消息在 `1440x768`、`1440x1000` 首屏內完整收斂；手機同步以 `100svh` 調整 Hero 與淺灰公告區留白。最新消息標題明確使用 `var(--font-size-h3)`，Edge 實測桌機計算為 `24px`、手機 `20px`；已確認三種尺寸均無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依參考網站再次整理首頁最新消息的整體視覺節奏：資訊帶改為全寬淺灰區塊，左側窄欄與右側公告區等高，右側四筆公告等寬且以低對比垂直欄線建立資訊分組；移除卡片上方水平線，保留 APLI 自有卡片內容與 hover icon。已用 Edge 實際檢查桌機 `1440x1000` 與手機 `390x844`，確認桌機資訊帶高度約 `259px`、四欄等高、手機仍可水平滑動且無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依參考網站調整首頁最新消息版型：最新消息改為全寬資訊帶，左側窄欄放標題／更多按鈕，右側四筆公告等寬排列，保留左／右區域中間垂直邊線；公告卡片內部仍維持 APLI 自有的分類、日期、標題與 hover 前往 icon。手機恢復內容容器寬度並保留水平拖曳；更新首頁 CSS cache-busting。已用 Edge 實際檢查桌機 `1440x1000`，確認資訊帶全寬、左欄約 `259px`、四張卡片各約 `295px`、無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依畫面回饋調整首頁最新消息視覺比例：保留左右分欄與四筆公告，將左側標題欄縮窄為約 18%，整區背景恢復 `var(--color-surface-soft)` 淺灰、文字恢復深色，中央垂直分隔線改用既有 `var(--color-border)`，卡片上方維持無邊線；手機仍維持四筆公告的水平拖曳。更新首頁 CSS cache-busting；已用 Edge 實際檢查桌機 `1440x1000` 與手機 `390x844`，確認左欄寬度約 `238px`、淺灰背景、4 筆公告、桌機無水平溢位與手機可水平滑動；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依最新需求重整首頁最新消息：桌機改為左側標題／更多按鈕、右側最新消息卡片的左右分欄，中央以垂直邊線分隔；首頁僅取最新 3 筆，桌機不支援拖曳且隱藏輪播提示，手機保留手指左右拖曳與中央三點提示；區塊背景改為 `#53565a`，文字改為淺色，卡片 hover 不改背景／文字，只顯示右下角前往 icon。更新首頁 CSS／JS cache-busting 與 SEO 初始輸出；已用 Edge 實際檢查桌機 `1440x1000`、手機 `390x844`，確認桌機 3 筆、左右分欄、垂直分隔線、桌機無輪播提示、手機可水平滑動且無頁面水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求恢復首頁「更多」按鈕：有最新消息時保留 `/news` 連結並可點擊，無最新消息時保留按鈕但以 `aria-disabled`、`tabindex=-1` 與停用樣式阻止操作；保留公告卡片僅在有資料時生成。將公告溢位提示從卡片右側移至最新消息列下方水平中央，改用三點輪播樣式，僅在仍有未瀏覽資料時顯示。更新首頁 CSS／JS cache-busting；已用 Edge 實際檢查桌機 `1440x1000` 與手機 `390x844`，確認 5 筆公告、更多按鈕可用、中央三點提示位置與頁面水平溢位狀態；無公告停用狀態已由 JS 分支與靜態樣式檢查，尚未以空資料實際路由驗證；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依回饋修正首頁公告資料軌：確認 `wwwroot/data/news.json` 目前有 5 筆 `Published: true` 公告；將桌機公告從會換行的 Grid 改回單列水平拖曳，避免第 5 筆掉到卡片下方。移除卡片 hover 右下角可點擊箭頭與首頁右上角「更多」連結，改為僅在右側仍有未瀏覽公告時顯示不可點擊的 `…` 溢位提示，拖到最右側或無後續資料時隱藏；同步移除 SEO 初始卡片箭頭。更新首頁 CSS／JS cache-busting；已用 Edge 實際檢查桌機與 `390x844`，確認 5 筆資料維持單列、水平資料寬度大於視窗、溢位提示可顯示且頁面無水平溢位；已完成 `dotnet build -c Release`（0 warnings／0 errors）；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依回饋修正首頁公告列：公告標題恢復使用 `var(--color-text-primary)` 深色，桌機改為四欄等寬 CSS Grid，統一卡片內距、公告類別／日期起始位置與標題兩行高度；手機保留橫向滑動列。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認四欄寬度與文字起始位置一致、標題為深色、手機可橫向瀏覽且無頁面水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依回饋修正首頁公告列細節：將水平邊線統一為公告列表上方單一 `var(--color-border)`，移除標題底線與卡片間垂直邊線；公告類別與日期統一為 `var(--font-size-body-sm)`、`var(--font-weight-normal)`、`var(--color-text-muted)`，標題改用 `var(--color-primary)`；更新首頁 CSS cache-busting。已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認 5 筆公告可渲染、邊線狀態與文字計算樣式一致，且無水平溢位；已完成 `dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 將首頁最新消息改為緊接 Hero 的輕量公告列：移除公告圖片卡片與深藍背景，改用既有 `--color-surface-soft`、`--color-text-primary`、`--color-border`、`--color-primary` 與按鈕／字級 token；保留現有新聞 API、連結、鍵盤操作與手機橫向滑動。Hero 高度改用 `svh` 依瀏覽器高度適配，讓 Hero 與完整公告區塊在首屏盡量同時可見；更新首頁 CSS cache-busting。已用 Edge 實際檢查本機 ASP.NET 路由 `1440x1000`、`1024x768`、`390x844`，確認公告列底部均在首屏內、5 筆公告可渲染且三種尺寸均無水平溢位；已完成 `dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js` 與 `git diff --check`；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

## 2026-09-18

- [x] 依需求將首頁「關於亞太」區塊上下外距改用首頁共用 `--home-section-space`／`--home-section-space-sm`，保留內部文字節奏、圖文排列與點陣圖定位；更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認桌機使用約 `79.2px`、手機使用 `48px` 全域間距，手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 修正首頁「關於亞太」的「了解更多」icon，改用與最新消息「更多」按鈕相同的向右箭頭 SVG path；按鈕其他樣式不變。已用 Edge 實際確認兩個 SVG path 一致，並完成 `git diff --check`；未 commit。

- [x] 依需求將首頁「關於亞太」的「了解更多」按鈕對齊最新消息區塊「更多」樣式：白底、邊框、尺寸、字級、箭頭間距與 hover／focus 行為一致；手機維持同樣按鈕比例。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認兩者計算樣式一致，手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求僅恢復首頁「最新消息」卡片圓弧：桌機 `24px`、手機 `20px`；其他首頁圖片／卡片／按鈕圓角 token 與 Hero 右下角設定不變。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認卡片圓弧與手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求統一首頁圓角 token：圖片使用 `--radius-lg`、卡片使用 `--card-radius`、按鈕／文字連結使用 `--button-primary-radius`；保留 Hero 右下角 `12px`、圓形／膠囊控制、指示線與 About 弧形背景的既有語意造型。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認圖片 `8px`、卡片 `6px`、按鈕 `4px` 且 Hero 手機右下角仍為 `12px`，手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求將首頁「關於亞太」區塊背景改為全域淺灰 `--color-surface-soft`，保留 `::after` 點陣圖規則不變，圖片改用全域 `--radius-lg` 圓角；更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認背景色、圖片 `8px` 圓角、點陣圖仍載入，手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求恢復首頁「關於亞太」圖文搭配：標題文字維持不變，桌機改為左側單一段落與左對齊按鈕、右側 `09.png` 圖片，手機改為上下堆疊；關係企業區塊未變。更新首頁 CSS cache-busting；已用 Edge 實際檢查 `1440x1000` 與 `390x844`，確認左右／上下排列、段落左對齊、圖片載入與手機無水平溢位；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求移除首頁 `.home-page .home-intro-section::before` 及其響應式規則，保留 `::after` 點陣地圖層與 section 原有底色；更新首頁 CSS cache-busting，`git diff --check` 通過；未 commit。

- [x] 依使用者要求撤回本輪地球球體實驗，恢復首頁「關於亞太」的 `v52` 平面點陣地圖、壓平弧面與置中段落；Edge 桌機 `1440x1000`／手機 `390x844` 複驗無水平溢出且段落中心對齊；未 commit。

- [x] 修正首頁 `home-intro__description` 內部段落未置中的問題：保留段落文字左對齊，將受 `max-width: 50rem` 限制的 `<p>` 水平置中；更新首頁 CSS cache-busting。已完成桌機／手機瀏覽器複驗與 `git diff --check`；實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 依需求調整首頁「關於亞太」：保留單一左對齊段落與原關係企業區塊，將地球弧面壓平並縮短弧頂至標題的距離；地圖改為左右較清楚、中央文字區淡化，桌機弧面內距約 `115px`、手機約 `68px`。已以 Edge 實際檢查 ASP.NET 路由桌機 `1440x1000` 與手機 `390x844`，確認標題／段落／按鈕在弧面內、手機無水平溢出、關係企業未變；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證；未 commit。

- [x] 將關於亞太標題、單一段落與按鈕置於地球弧面內：弧面改為從 section 上緣覆蓋全區，隨內容高度伸展，桌機與手機保留弧頂內距並降低地圖透明度。關係企業維持原樣。git diff --check 通過；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

- [x] 依使用者要求撤回上一輪關於亞太／關係企業整合樣式，恢復 v46 的地圖、圓弧、間距與 Logo 展示方式；保留公司介紹單一段落。git diff --check 通過；未進行瀏覽器驗證，未 commit。
- [x] 合併首頁「關於亞太」的兩段公司介紹為同一個敘述段落，移除第二段專用的段落間距規則，保留原文字內容與版面對齊，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依使用者回饋收回首頁 About 區塊調整幅度：內容容器調整為 `1040px`、敘述區塊 `960px`，弧面高度與向上延伸幅度縮小，降低地圖的尺寸與視覺重量，保留文字左對齊與地圖素材，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依參考圖片調整首頁「關於亞太」區塊的文字與左右留白，內容容器放寬至 `1120px`、敘述區塊至 `1040px`；地球弧面改為固定於區塊底部並向上延伸至內容背景，保留敘述文字左對齊，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 修正首頁「關於亞太」地球圓弧漂移問題，改以 `--home-intro-curve-height` 同時控制 section 底部留白與弧面高度，讓弧面固定從內容區塊之後開始；移除依賴內容高度的 `top` 定位，並同步處理平板／手機版，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 調整首頁「關於亞太」內容與背景層次，將敘述區塊最大寬度收窄至 `820px`，並將圓弧／世界地圖起點下移至按鈕之後，避免背景穿過敘述與 CTA；同步調整桌機、平板與手機弧度，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 調整首頁「關於亞太」HTML／CSS 結構，拆分為標題、敘述與按鈕三個區塊；敘述區塊置中但維持段落文字左對齊，標題與按鈕維持置中，並修正後段覆寫規則與按鈕重複間距，更新首頁 CSS cache-busting。已執行 `git diff --check`、首頁 JS 語法檢查與 CSS 括號檢查；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 參考提供的地球圓弧版型，將首頁 About 背景弧面與世界地圖區域往上收斂，桌機提高中央弧面落差，手機同步提前弧面起點並加大垂直弧度；保留既有地圖素材與文字內容，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 首頁「關於亞太」改為置中標題與單一 `home-intro__copy` 內容區塊，移除 `home-intro__media` 圖片 HTML／CSS、保留文字與 CTA；背景世界地圖 pseudo-element 定位與樣式未修改，更新首頁 CSS cache-busting。已執行 `git diff --check` 與舊 selector 靜態檢查；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 提高首頁服務卡片標題／敘述區塊底部遮罩濃度，位置維持 `60%／80%／100%`，黑色濃度調整為 `18%／45%／84%`；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 首頁服務卡片標題與敘述改用全域字級 token：桌機標題使用 `--font-size-card-title`、手機使用 `--font-size-card-title-compact`，敘述使用 `--font-size-card-description`；與首頁最新消息文字系統對齊，更新 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依使用者澄清，維持服務卡片遮罩位置 `43%／60%／80%` 不變，僅提高黑色濃度至 `12%／36%／78%`，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依使用者再次回饋，將首頁服務卡片遮罩再往上移至 36% 起始，調整中段為 54%／76%，底部濃度維持 70%；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依首頁服務卡片實際畫面，將底部深色遮罩起點由 48% 提前至 43%，中段調整為 60%／80%，保留底部 70% 濃度與卡片尺寸；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依參考版型收斂首頁服務卡片桌機群組寬度至 `1200px`，保留三欄配置；手機版取消最大寬度限制並維持單欄滿容器，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 將首頁服務卡片深色遮罩調淡並集中至底部：移除整張圖片的 per-card tint，改為上半部透明、底部最高 70% 黑色的單一垂直漸層；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 依使用者要求恢復首頁服務卡片原本的深色圖片遮罩，還原各卡片 tint、白色標題／說明／箭頭與底部深色漸層；保留整卡連結與 hover／focus 箭頭互動，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 首頁服務卡片保留上方圖片，將底部文字區改用與最新消息一致的實色冷灰藍漸層，標題、說明與右下角箭頭改為深色以提升可讀性；移除原滿版深色遮罩與未使用的服務 tint 變數，更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 統一首頁最新消息公告類別與日期文字大小，`home-latest__meta span`／`home-latest__date` 均使用 `var(--font-size-body-sm)`（14px）；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 移除首頁最新消息公告類別 `home-latest__meta` 的背景色，保留類別文字、間距與日期樣式；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 首頁「我們的服務」移除 `home-services-compare__actions` 文字連結與對應 CSS，將三張服務卡片改為整卡連結，右下角沿用最新消息的 24px 線條箭頭，僅於 hover／鍵盤 focus 顯示；更新首頁 CSS cache-busting。已執行 `git diff --check`；尚未完成桌機／手機瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 將 `wwwroot/js/site.js` 的 `var` 改為區塊作用域的 `const`／`let`，同步修正迴圈事件 callback 的變數作用域；未改變功能流程；已執行 `node --check wwwroot/js/site.js` 與 `git diff --check`；未進行瀏覽器、手機、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 補充 `site.js` 的圖片解碼與頁面載入流程註解，未變更執行邏輯；已執行 `node --check wwwroot/js/site.js` 與 `git diff --check`；未進行瀏覽器、手機、跨瀏覽器與完整人工無障礙驗證；未 commit。

- [x] 透過實機焦點畫面與計算樣式定位首頁最新消息箭頭問題：箭頭 hover／focus 時 opacity 已為 1，但被舊規則覆寫為白色，於白色卡片上不可見。最終顯示規則改為固定深色，保留 opacity／位移。重新載入本機首頁後以鍵盤 focus 實機確認右下箭頭深色可見；hover 與 focus 共用同一最終顯示規則。更新 CSS cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。

- [x] 依實際桌機首頁畫面確認最新消息卡片 hover 箭頭未顯示後，將事件委派改為每張卡片直接綁定 mouseenter／mouseleave；初始伺服器卡片與 API 重繪卡片都會綁定，拖曳結束仍清除狀態。更新 JavaScript cache-busting；待執行靜態檢查與實際 hover 複驗；未 commit。

- [x] 修正首頁最新消息卡片 hover 箭頭未顯示：新增滑鼠進入／離開卡片的 JavaScript 狀態 class，CSS 以該狀態或鍵盤 focus 顯示右下箭頭；拖曳結束時清除狀態。更新 CSS／JavaScript cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；hover 畫面、手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。

- [x] 補做首頁最新消息功能確認：本機首頁實際載入 5 張卡片，橫向列寬大於容器；點擊上一則後，下一則控制恢復可用，確認輪播控制可切換；瀏覽器 console 無錯誤，DOM 確認每張卡片均含右下箭頭 SVG。hover 視覺顯示、手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。

- [x] 修正首頁最新消息卡片 hover 右下箭頭未出現：伺服器端卡片原本缺少箭頭標記且仍輸出圖片／摘要，現改為與 JavaScript 卡片相同的分類、日期、標題與線條右箭頭結構，讓前端 API 尚未完成載入時也能顯示。更新 CSS cache-busting，`dotnet build -c Release` 0 warnings／0 errors、`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器驗證；未 commit。

- [x] 依使用者澄清，恢復首頁最新消息右上角「更多」原本的膠囊外框、白底與細邊線；保留線條式 `>` chevron，避免 SVG 顯示為實心三角形。更新 CSS cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器驗證；未 commit。

- [x] 修正首頁最新消息右上角「更多」控制：移除不符合設計的膠囊外框，改為純文字連結；將 SVG fill 明確設為 none，固定顯示線條式 `>` chevron。更新 CSS cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器驗證；未 commit。

- [x] 移除首頁最新消息卡片列滑鼠移入時的左右晃動，保留 grab／grabbing 游標；標題右上角「更多」改用單純的 `>` 型 chevron 圖示。更新 CSS／JavaScript cache-busting，`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器驗證；未 commit。

- [x] 首頁最新消息卡片依參考圖調整：標題右上角的「更多」使用共用標準右箭頭，卡片第一列為分類與日期、第二列為標題，降低卡片高度，右下箭頭只在 hover／鍵盤 focus 顯示；滑鼠每次移入消息列時播放一次左右晃動提示並顯示 grab／grabbing 游標。首頁伺服器與 JavaScript 載入上限均提高為最新 8 則，現有公開消息可完整加入橫向拖曳列。已更新 CSS／JavaScript cache-busting，`dotnet build -c Release` 0 warnings／0 errors、`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過；未進行瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

- [x] 依提供參考圖將首頁 Hero 下方「最新消息」由公告列恢復為可橫向瀏覽的白色文字卡片：日期置頂、標題置中段落、分類與箭頭置底，卡片列下方保留了解更多與左右輪播控制；恢復 JavaScript 最新三則資料載入，停止建立與載入新聞圖片。更新首頁 CSS／JavaScript cache-busting，已執行 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`；尚未進行桌機／手機瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

- [x] 標題層級統一使用 `--font-weight-heading: 500`，未修改一般文字、按鈕或其他共用角色的字重 token；已執行 `git diff --check` 與 `dotnet build -c Release`；未進行瀏覽器、手機、跨瀏覽器與完整人工無障礙驗證；未 commit。
- [x] 全站移除公開頁面與管理後台的英文小標 HTML 標記及對應 CSS 規則，保留標題、內文與功能；已執行 `git diff --check` 與 `dotnet build -c Release`；未進行全站瀏覽器、手機、跨瀏覽器與完整人工無障礙驗證；未 commit。
- [x] 首頁關係企業卡片改為桌機預設只顯示 Logo，hover／鍵盤 focus 顯示標題與敘述；觸控與手機維持文字可見。已執行 `git diff --check`；未進行瀏覽器、實體裝置、跨瀏覽器與完整人工無障礙驗證；未 commit。
- [x] 撤回關於亞太文字區的白色閱讀層，改以地圖／圓弧起點下移避開標題與段落，讓背景裝飾從內容下方自然展開；保留主要按鈕樣式。更新 CSS cache-busting，已執行 git diff --check；待重新瀏覽器驗證。未 commit。
- [x] 完成撤回後驗證：Edge 桌機畫面確認文字區恢復透明、地圖自內容下方展開，主要按鈕維持深色 48px；DOM 確認文字區背景透明且桌機無水平溢出。手機尺寸測試頁亦確認無水平溢出；因瀏覽器尺寸重設時截圖回到預設寬度，手機畫面細節未作為通過依據。實體裝置、跨瀏覽器與完整人工無障礙未驗證；未 commit。
- [x] 提高首頁關於亞太可讀性：降低點陣地圖在文案區的對比，為文字內容增加白色閱讀層；恢復「了解更多」使用主要按鈕的深色底與橘色 hover，避免按鈕融入背景。更新 CSS cache-busting。已執行 git diff --check；本次待重新進行桌機／手機瀏覽器驗證。未 commit。
- [x] 補做首頁關於亞太可讀性驗證：Edge 1440×1000 與 390×844 畫面確認文案背景層、主要按鈕辨識度及無水平溢出；DOM 確認按鈕桌機／手機皆為 48px 深色底。實體裝置、跨瀏覽器與完整人工無障礙未驗證；未 commit。

- [x] 參考英業達地圖的滿幅延伸，調整首頁關於亞太／關係企業／CTA 銜接：點陣地圖依背景全寬縮放並提高辨識度，圓弧與淡出終點收於區塊內，增加圖片下方地圖展示空間；關係企業上方留白改為 24px、下方桌機 40–64px／手機 40px，銜接 CTA。保留既有 SVG、白色企業區塊及輪播互動。已以 Edge 1440×1000、390×844 畫面及 DOM 確認地圖淡出、企業與 CTA 排版、無水平溢出；git diff --check 通過。實體裝置、跨瀏覽器及完整人工無障礙未驗證；未 commit。

- [x] 最新消息卡片底部長箭頭改為 20px SVG mask 右向 chevron（> 型），保留橘色、hover／focus 向右位移與 reduced-motion，更新 CSS 版本。git diff --check 通過；本次未進行桌機／手機瀏覽器及跨瀏覽器驗證。未 commit。

- [x] 依使用者要求撤回最新消息淡藍灰漸層試套，恢復原本 color-surface-soft 背景、了解更多 medium 字重與試套前 CSS 版本；保留先前卡片分隔線、hover 及閱讀更多調整。git diff --check 通過；未重新進行瀏覽器驗證，未 commit。

- [x] 試套最新消息背景為關係企業卡片相同的淡藍灰漸層（#edf0f5／#e3e8ef／#d8e0e9），保留直線分欄；了解更多字重降為 400，並更新 CSS cache-busting。git diff --check 通過；本次未進行桌機／手機瀏覽器及實體裝置驗證，視覺效果待確認。未 commit。

- [x] 最新消息最後一張卡片補右側分隔線（手機不顯示直線）；了解更多 hover／focus 改為與關於亞太一致的透明背景、橘色文字、底線展開與斜箭頭位移。卡片底部改為閱讀更多與箭頭並略縮高度。已執行 git diff --check；本次桌機／手機瀏覽器、hover 實測與實體裝置未驗證。未 commit。

- [x] 確認首頁最新消息伺服器輸出最多三則，並將 JavaScript 備援載入上限同步改為三則；消息列表頁不變。已執行 node 語法檢查與 git diff --check；本次未重新建置或瀏覽器驗證，執行中的舊版伺服器需重新啟動以載入既有 C# 上限修改。未 commit。

- [x] 首頁最新消息「查看全部」改為「了解更多」，套用關於亞太的文字連結樣式；消息分類／日期移至標題上方，卡片箭頭於 hover／focus 向右移動 6px，並支援 reduced-motion。已以 Edge 桌機 1366×900、手機 390×844 畫面與 DOM 確認順序及無水平溢出，鍵盤 focus 的箭頭位移已確認；滑鼠 hover、實體裝置、跨瀏覽器與完整無障礙人工驗收未驗證。未 commit。

- [x] 依使用者提供的緯創圖片將 Hero 下方最新消息改為橫向分欄公告帶：左側標題與查看全部，右側各則消息以直線分隔、標題在上、日期／分類在下並加上箭頭；依實際消息數平均分欄，手機改為上下排列。Edge 1366×900／390×844 實際畫面與 DOM 確認換行、鍵盤焦點及無水平溢出，`git diff --check` 通過。現有兩則公開消息，三則資料、實體裝置、跨瀏覽器與完整人工無障礙尚未驗證；未 commit。
- [x] 補做首頁公告列 Edge 實際畫面驗證並修正兩項舊樣式殘留：清除公告內文固定列高，消除每則消息下方大段空白；恢復手機標題群組並固定查看全部連結不拆字。1366×900 桌機、768×900 平板、390×844 手機畫面及 DOM 確認 Hero／公告／服務順序、對齊、換行與無水平溢出，點擊公告可進入對應詳細頁。目前公開資料為兩則，尚未實測三則資料版型；實體裝置、跨瀏覽器與完整人工無障礙驗收未驗證。更新 CSS cache-busting，`git diff --check` 通過；未 commit。
- [x] 將首頁最新消息移至 Hero 下方、服務項目上方，參考提供圖片改為淺灰公告列：桌機左側標題／查看全部、右側最新三則日期／分類／標題，手機改為上下排列；不顯示新聞圖片並停用該區輪播與進場隱藏，保留伺服器輸出及無 JavaScript 閱讀。Release 隔離輸出建置 0 warnings／0 errors、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過，靜態確認區塊順序與唯一資料標記。尚未進行桌機／手機瀏覽器、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。
- [x] 將首頁關係企業區塊背景明確固定為白色，避免受到全域背景 token 變更影響，並更新 CSS cache-busting。已完成 `git diff --check`；尚未進行瀏覽器桌機／手機、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。
- [x] 依英業達首頁的視覺方向調整首頁「關於亞太」背景：保留既有 `world-dot-map-plain-light.svg`，放大並下移點陣地圖、提高可見度與向下延伸範圍，重新調整淺灰半圓弧的起點、垂直半徑與底部銜接，並更新 CSS cache-busting。已完成 `git diff --check`；尚未進行瀏覽器桌機／手機、實體裝置、跨瀏覽器與人工無障礙驗證；未 commit。

## 2026-09-17

- [x] 加強首頁「關於亞太」地球圓弧曲率：縮小背景水平外擴並加大垂直半徑，讓中央至兩側的落差更明顯，保留標題下方起點與底部淡出；同步調整手機曲率與 CSS cache-busting。Edge 1432px／390px 畫面確認、1920px DOM 檢查，無水平溢出；子代理完成曲率與圓角高度風險審查，`git diff --check` 通過。未驗證實體裝置、跨瀏覽器與人工無障礙；未 commit。
- [x] 將首頁「關於亞太」背景圓弧下移至標題下方，桌機提高弧面起點，平板／手機依既有內容留白與圖片比例定位；更新 CSS cache-busting。Edge 1432px／390px 畫面確認標題留在白底，圓弧最高點分別低於標題約 25px／15px；768px DOM 確認弧面低於標題，三尺寸無水平溢出；子代理審查響應式定位公式，`git diff --check` 通過。未驗證實體裝置、跨瀏覽器與人工無障礙；未 commit。
- [x] 參考英業達首頁的弧面背景，將首頁「關於亞太」長方形灰底改為白底上的寬幅淺灰弧面，地圖移至下半部並降低濃度、上下淡出，下緣回到白色銜接最新消息；保留原圖文與內容順序，調整桌機／手機區塊留白並更新 CSS cache-busting。主代理完成 Edge 實際路由 1432px、1024px、768px、390px 畫面與 DOM 檢查，確認雙欄／單欄、背景銜接、文字可讀及無水平溢出；子代理完成 CSS 差異、層級、裝飾不攔截操作與響應式規則審查；`git diff --check` 通過。實體裝置、跨瀏覽器、完整進場動畫與人工無障礙尚未驗證；未 commit。
- [x] 將關係企業輪播箭頭改為沿用最新消息共用的 SVG 箭頭（18px、1.8px 線寬、圓角端點），修正文字箭頭造成的粗細差異；完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`，未 commit。
- [x] 將首頁關係企業左右切換按鈕調整為與最新消息一致的 48px 圓形、透明背景、細邊框與箭頭字級；完成 `git diff --check`，未 commit。
- [x] 重新整理首頁關係企業視覺節奏：縮短標題與 Logo 列距離，將左右輪播按鈕移至卡片下方，並保留桌機滿版四欄與手機響應式排版。完成 `git diff --check`，未 commit。
- [x] 調整首頁關係企業卡片 hover：Logo 收入淺色卡片內並靠近公司名稱，卡片改用 `#edf0f5` 冷灰藍漸層，名稱與敘述改為深色；同步處理手機狀態。完成 `git diff --check`，未 commit。
- [x] 將首頁關係企業輪播改為無縫由右至左循環：補上開頭 Logo 的循環副本，最後一組直接銜接第一組，不再整列跳回最左側；完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`，未 commit。
- [x] 重整首頁關係企業輪播：展示列改為滿版四欄，左右保留 5vw 內距；輪播由一次跳四張改為每次平移一張並循環，避免六張資料在第二組只剩左右兩張的空缺。完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`，未 commit。
- [x] 修正關係企業 Logo 間距視覺不明顯的問題，將桌機輪播展示列向左右延伸 160px，減少內容容器左右留白；980px 以下恢復原容器寬度。完成 `git diff --check`，未 commit。
- [x] 放寬首頁關係企業桌機 Logo 卡片間距至 40px，並加入每 5 秒自動切換、到最後一組後循環回第一組；滑鼠 hover、鍵盤 focus 與 reduced-motion 會暫停自動播放。已完成 `node --check wwwroot/js/pages/home.js` 與 `git diff --check`，未 commit。
- [x] 恢復 ALPHA TOTAL SOLUTION Logo 的 hover 位置，改回與其他關係企業 Logo 相同的上移呈現；完成 `git diff --check`，未 commit。
- [x] 修正首頁關係企業第 6 張 ALPHA TOTAL SOLUTION 卡片的 hover／focus Logo 位置，改為留在深色框內並置於公司名稱上方；其他企業維持原本 Logo 上移效果。完成 `git diff --check`，未 commit。
- [x] 將首頁「關於亞太」世界地圖水平移至右側並下移，讓右側空白區承接地圖視覺，左側圖片與文字主要區域維持清楚；完成 `git diff --check`，未 commit。
- [x] 將 world-dot-map-plain-light.svg 背景放大並下移至區塊下方，讓下方留白能看見更多地圖點位；完成 `git diff --check`，未 commit。
- [x] 調整首頁「關於亞太」世界地圖背景定位至區塊底部，讓點位避開圖片與標題並填補下方留白；完成 `git diff --check`，未 commit。
- [x] 降低首頁「關於亞太」世界地圖對文字的干擾，於右側文字區加入淺色漸層遮罩，保留左側背景氛圍；完成 `git diff --check`，未重新進行瀏覽器驗證，未 commit。
- [x] 首頁「關於亞太」加入指定 world-dot-map-plain-light.svg 背景，保留淺灰底與既有圖文比例；背景不重複，手機限制地圖高度並靠下呈現。Edge 已檢視桌機與 390px 手機背景及文字排版，git diff --check 通過；未驗證實體裝置與跨瀏覽器，未 commit。
- [x] 移除首頁關係企業 Logo 的 CSS 白底、內距與圓角；縮短標題下方間距（104→80px）、卡片高度（420→330px）及 Logo／名稱留白，保留圖片上移與敘述顯示。Edge 已檢視桌機及 390px 手機畫面；手機 Logo 與文字無重疊，未另做滑鼠 hover、實體裝置或跨瀏覽器驗證。git diff --check 通過，未 commit。
- [x] 實際讀取緯創獲獎實績的圖片與 hover 結構，重整首頁關係企業 CSS：統一首頁無襯線中英文標題、原比例 Logo，圖片上移 100px 跨出圓角漸層背景，名稱與敘述延遲淡入；沿用 APLI 色系與六個企業輪播，手機直接顯示說明，補上無 JS 橫向閱讀及鍵盤焦點切換。Edge 已檢視桌機 focus 與 390px 排版；最後 Logo 白底修正未完成瀏覽器複驗，JS 語法及 diff 檢查通過，未 commit。

- [x] 依參考網站補強首頁關係企業：移除區塊說明段落，新增左右切換輪播按鈕以瀏覽六個企業，active 卡片改用 APLI 深藍與橘色，並將服務卡片標題字重固定為 500；已完成 JS 語法檢查、git diff --check，以及 Edge 桌機輪播與 active 卡片畫面確認，未 commit。

- [x] 依參考網站的獲獎實績展示方式重做首頁關係企業區塊：改為置中標題、寬留白、橫向 Logo 展示列，hover／focus 時以品牌色背景顯示描述；已校正六個既有企業 Logo 對應，Edge 桌機畫面與鍵盤 focus 展開狀態已確認，手機以響應式 CSS 檢查，未 commit。
- [x] 在首頁最新消息下方新增關係企業區塊，沿用既有六個企業 Logo 與簡介；後續依參考網站調整為橫向展示列，桌機 hover／focus 顯示敘述，手機保留可讀內容。已完成 git diff --check，Edge 桌機與鍵盤 focus 已確認，未 commit。
- [x] 撤回最新消息前移與精簡列表 UI，恢復原本位於「關於亞太」之後的最新消息輪播；已完成 node --check wwwroot/js/pages/home.js 與 git diff --check，未重新進行瀏覽器畫面驗證。
- [x] 重新設計首頁「關於亞太」為共用內容寬度的淺灰底雙欄區塊，照片採小圓角與 1.75 比例，文字垂直置中，CTA 改為靠左文字連結；清除本輪疊加的滿版與斜切覆寫，更新 CSS 版本。Edge 已檢視桌機與 390px 手機畫面，最終樣式確認 1912px 區塊高 456px、390px 連結靠左且兩者無水平溢出；另檢查 1366px 雙欄排版。`git diff --check` 通過；未驗證實體裝置、跨瀏覽器與完整人工無障礙，未 commit。
- [x] 將首頁「關於亞太」桌機版改為內縮容器與左右 50/50 圖文配置，修正圖片左側留白後的比例失衡；保留斜切效果與手機版滿寬；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 調整首頁「關於亞太」桌機版圖片左側留白，保留斜切效果；手機版維持滿寬；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 撤回上一個「關於亞太」UI 收斂步驟，恢復原本區塊高度、文字位置與服務區塊間距；保留 52/48 圖文比例、斜切效果與無邊線設定；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 收斂「關於亞太」UI：降低區塊實際高度、讓右側內容垂直置中並縮減右側留白，同時縮短服務區塊與關於亞太之間的空白；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除「關於亞太」區塊外圍邊線顏色，保留斜切圖片與左右圖文比例；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 依參考圖調整「關於亞太」左右圖文比例，將左側圖片由約 58% 縮至 52%，並同步調整右側文字起始位置；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 修正斜切圖片遮住右側文字的問題，將文字內容右移並降低「關於亞太」桌機區塊高度至約 360–420px；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 修正斜切版面圖片被文字面板覆蓋的層級問題，讓左側圖片與右側文字同時呈現；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 修正「關於亞太」斜切版面，改由圖片本身裁切出斜角右邊界，右側文字面板完整延伸；手機版維持矩形上下排列；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將首頁「關於亞太」改為參考圖的左圖右文斜切版面，右側加入淺色文字面板與外框 CTA，手機版改為無斜切上下排列；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 修正服務卡片文字因前次版型調整誤移至上方的問題，恢復文字固定於卡片底部；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 恢復首頁「關於亞太」至僅使用背景顏色的內容寬度雙欄版本，移除滿版圖片疊字與額外裝飾效果；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將「關於亞太」改為真正的滿版圖片面板，標題與介紹文字疊在圖片上，使用白字與深色漸層確保桌機／手機可讀性；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將首頁「關於亞太」改為標題下方的寬幅背景圖文疊合版，文字置於圖片上的暗色漸層區，手機版改用由下往上的漸層以維持可讀性；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除首頁「關於亞太」桌機文字區的橘色垂直引導線與左側內距，手機版上方分隔線維持不變；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除「關於亞太」標題下方的橘色識別線，保留區塊背景與文字區引導線；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除「關於亞太」區塊的橘色背景光暈，保留冷灰藍背景與結構性橘色識別線；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 強化首頁「關於亞太」區塊的視覺層次，加入淡品牌光暈、標題橘色識別線與文字區品牌引導線，並調整手機版為上方引導線；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 為首頁「關於亞太」區塊加入低對比冷灰藍漸層背景與淡邊界，增加段落層次但保留現有主視覺圖片；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將首頁 `home-hero-title` 桌機字重固定恢復為 `500`，避免受到全域標題字重調整影響；手機版維持原有設定，已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除首頁「以客為尊，專業服務」與 `OUR APPROACH`，改為區塊置中的 `ABOUT APLI／關於亞太` 標題組，並清理 `home-intro__subtitle` HTML／CSS；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 調整首頁服務卡片的標題、敘述與「查看服務」連結層級，將卡片連結改為較小且較輕的文字導覽樣式，不影響全域主要按鈕；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 縮短首頁服務區塊標題與卡片的間距，並將卡片藍色遮罩改為中性暗色遮罩；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除首頁「我們的服務」區塊的補充說明文字，並清理對應的桌機／手機 CSS；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 將全域中等字重由 `500` 調整為 `600`，讓全站標題與卡片標題更清晰醒目；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 調整首頁區塊順序，將「我們的服務」移至 Hero 後，並將「以客為尊，專業服務」移至服務區塊後，補上 `OUR APPROACH` 眉標與 `home-intro-title` 標題關聯；已完成 `git diff --check`，未進行瀏覽器桌機／手機畫面驗證。
- [x] 移除非首頁 Hero 圖片隨頁面上下捲動產生的垂直位移，保留圖片載入時的縮放動畫；已完成 `git diff --check`、`node --check wwwroot/js/site.js`，未進行瀏覽器畫面驗證。

## 2026-09-16

- [x] 恢復共用 Hero 圖片載入完成後由放大比例回到正常比例的 `transform` 過渡效果；已完成靜態 CSS 檢查與 `git diff --check`，未進行瀏覽器畫面驗證。
- [x] 確認 `careers.js` 未被任何頁面載入，且福利輪播 `data-*` 標記未在其他檔案使用；移除已停用的舊福利輪播程式。已完成全專案文字引用檢查與 `git diff --check`，未進行瀏覽器畫面驗證。

## 2026-09-14

- [x] 將首頁 `.home-services-compare__heading h2`、`.home-latest h2`、`.home-intro h2` 與 Company History `.milestones-section-heading h2` 字級調整為與其他主要頁面區塊標題一致的 `clamp(1.875rem, 2.3vw, 2.5rem)`，首頁主要內容 H2 字重統一為 `--font-weight-medium`；Company History 在 `768px` 以上將時間軸事件標題提升為 `--font-size-body-lg`、說明提升為 `--font-size-body`，手機維持原尺寸；首頁服務卡片依原圖色調套用低濃度中性藍灰遮罩，第二張略加強並共用底部深藍漸層，使圖片保留自然色彩且維持一致主題；移除首頁最新消息圖片卡片遮罩及相關 Hover 規則；已更新兩頁 CSS cache-busting 並執行 `git diff --check`，未進行瀏覽器畫面驗證。

## 2026-09-13

- [x] Company History 時間軸改為與 About 認證與獎項一致的水平資訊瀏覽 UI，移除 `milestone-tabs__track` 年份切換，只保留左右控制；資訊直接呈現、資訊區取消背景色，同年份多筆資訊以 24px 間距及灰色虛線區隔，移除先前加入的品牌 Logo 背景，保留原 HTML 沿革內容作為停用 JavaScript 時的可讀 fallback。已完成 CSS／JavaScript cache-busting；ASP.NET 實際路由瀏覽器桌機 1440px、平板 1024px、手機 390px 確認左右按鈕、最後 1970s 邊界、透明資訊區、同年份資訊間距與虛線、文字內容、卡片寬度與無文件水平溢出；`dotnet build -c Release`、`node --check wwwroot/js/pages/company-history.js`、`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證。
- [x] About「認證與獎項」區塊同一年份的多筆紀錄加入 18px 間距與灰色虛線分隔；已完成 CSS cache-busting，瀏覽器桌機與手機版確認分隔樣式；`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證。
- [x] 首頁「我們的服務」區塊移除背景顏色，並收斂與「以客為尊，專業服務」區塊交界的上下留白；已完成 CSS／cache-busting 調整。瀏覽器桌機 1432px 與手機 390px 均確認背景透明、間距生效且無水平溢出；`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙尚未驗證。
- [x] P1 首頁／關係企業 heading 層級與首頁 CSS 間距覆寫整理完成；首頁將「以客為尊，專業服務」及關係企業首層企業標題調整為 H2，並移除已被最終規則覆蓋的首頁舊間距宣告。首頁最新消息少量卡片填滿網格的實驗已依視覺需求撤回，恢復原本橫向卡片尺寸。已完成 cache-busting；ASP.NET 實際路由瀏覽器桌機 1440px、平板 1024px、手機 390px 確認服務區塊透明背景、原有手機滑動卡片與無水平溢出；`dotnet build -c Release --no-restore`、全頁 JavaScript `node --check`、`git diff --check` 通過。實體裝置、跨瀏覽器、Lighthouse／axe 與人工無障礙尚未驗證。
- [x] About 公司簡介 `about-profile` 依參考版型改為左側文字敘述、右側三張不規則背景影像卡片；左側標題改為「ABOUT APLI／關於亞太」標題群組，使用與「OUR PHILOSOPHY／經營理念」相同的 eyebrow `4px` 下間距，標題至內文的局部間距調整為 `24px`，影像區改為左右配置，左欄直立並以完整鋪滿、調整 Logo 至視覺中心的公司大樓背景圖顯示「創立於」，三張卡片統一使用深色漸層與白色文字，右欄上下分別顯示「員工數／營運場規模」，以下方較高的營運場規模卡片保留不規則設計感，保留原本 `dt/dd` 語意與計數動畫。已完成 cache-busting；ASP.NET 實際路由瀏覽器桌機 1440px、平板 1024px、手機 390px 確認標題層級、標題群組間距、卡片比例、文字／數據順序、背景影像與無水平溢出；`dotnet build -c Release --no-restore`、全頁 JavaScript `node --check`、`git diff --check` 通過。實體裝置、跨瀏覽器、Lighthouse／axe 與人工無障礙尚未驗證。

## 2026-09-11

- [x] 依 About 標題基準統一 Services 與 Occupational Safety 的標題群組間距、英文小標題下距與標題字體；尚未進行瀏覽器畫面驗證。
- [x] 以 About 標題樣式為基準統一人才招募頁標題群組的間距、英文小標題下距與中文標題字重；尚未進行瀏覽器畫面驗證。
- [x] 修正「加入亞太」英文小標題間距被 `.join-intro > div` 的 `20px` grid gap 覆蓋問題，改為與 `BENEFITS／公司福利` 一致；尚未進行瀏覽器畫面驗證。
- [x] 統一人才招募頁 `JOIN US／加入亞太` 與 `BENEFITS／公司福利` 的英文小標題間距，移除額外的 4px 下方間距；尚未進行瀏覽器畫面驗證。
- [x] 縮短 `.join-benefits-heading` 與福利表格的間距，並為「加入亞太」標題補上 `JOIN US` 英文小標題；尚未進行瀏覽器畫面驗證。
- [x] 移除人才招募頁 `.join-section-heading h2::after` 裝飾線及其預留間距；尚未進行瀏覽器畫面驗證。
- [x] 移除服務頁 `.service-section__heading h2::after` 裝飾線及其預留間距；尚未進行瀏覽器畫面驗證。
- [x] 移除職業安全衛生頁 `.safety-credentials__heading h2::after` 裝飾線及其預留間距；尚未進行瀏覽器畫面驗證。
- [x] 調整營運資源頁行動版 `resource-link`，改為與首頁「了解更多」相同的非全寬文字連結排列；尚未進行瀏覽器畫面驗證。
- [x] 將營運資源頁 `resource-link` 的 SVG icon 改為與首頁「了解更多」相同的外開箭頭；尚未進行瀏覽器畫面驗證。
- [x] 將營運資源頁 `resource-link` 按鈕改為首頁「了解更多」的文字連結樣式，包含底線展開與箭頭 Hover 效果；尚未進行瀏覽器畫面驗證。
- [x] 恢復營運資源頁「地理優勢」標題搭配的英文小標題 `LOCATION`；尚未進行瀏覽器畫面驗證。
- [x] 移除營運資源頁兩組標題 `h2::after` 裝飾線規則；尚未進行瀏覽器畫面驗證。
- [x] 同步移除營運資源頁標題為裝飾線預留的下方間距；尚未進行瀏覽器畫面驗證。
- [x] 移除職業安全衛生頁面的 `PROFESSIONAL CERTIFICATIONS` 英文小標題；尚未進行瀏覽器畫面驗證。
- [x] 將新聞詳細頁 Hero 圖片改用 `news-detail-hero.jpg`，並更新 HTML 引用；尚未進行瀏覽器畫面驗證。

- [x] 新聞附件下載回應補上原始檔名，避免瀏覽器以雜湊檔名並在重複下載時追加 `(1)`；已完成 Release 建置與差異檢查，尚未進行瀏覽器驗證。

## 2026-09-07

### 最新消息卡片預設背景與連結位置

- [x] 首頁最新消息卡片「查看更多」恢復左側；預設公告資訊背景改為右側裁切並降低預設遮罩，保留 AP 標誌與背景波紋。
- [x] 首頁最新消息卡片 Hover 時取消標題底線，背景圖片放大至 `1.05`，並降低一般圖片與預設圖片的漸層遮罩濃度。
- [x] 首頁最新消息卡片依預設圖／上傳圖分流文字色與標籤背景，並讓 SSR 與前端渲染使用相同圖片狀態 class。
- [x] 首頁最新消息預設圖移除藍灰漸層遮罩，保留上傳圖片卡片的深色遮罩與白色文字。
- [x] 首頁最新消息卡片統一卡片、media、圖片與遮罩圓角，並將預設圖「查看更多」改用 `var(--color-text-body)`。
- [x] 首頁最新消息卡片改由外層單一圓角裁切滿版圖片，避免內外層圓角反鋸齒造成四角暗邊。
- [x] 首頁最新消息卡片外層改為透明背景，避免滿版圖片圓角裁切邊緣露出深色 fallback。
- [x] 首頁上方最新消息卡片圓角與「掌握最新消息」卡片統一使用 `var(--radius-sm)`。
- [x] 首頁「我們的服務」圖片卡片外層改為透明背景，避免圓角反鋸齒邊緣露出深色 fallback。
- [x] 首頁移除「掌握最新消息」第二區塊，保留主要「最新消息」輪播。
- [x] 移除「掌握最新消息」專用 CSS、前端卡片產生函式與資料填充邏輯，避免保留無效程式。

### 已完成

- Footer 恢復原有桌機版型：Logo 置頂並加上分隔線、四欄導覽、最新消息歸入快速連結，以及深色底部版權列與右側法律連結。
- Footer 恢復原有色彩、字級、欄距與 Logo 尺寸；保留目前正式路由與手機版折疊互動。
- Footer 修正為原始上下兩列滿寬版型，Logo／分隔線與四欄導覽統一對齊 1324px 內容網格。
- Footer 選單標題改用一般字體；快速連結整合員工專區；新增可直接前往 `/news` 的最新消息標題選單；底部版權與法律連結左右位置對調。
- Footer 底部隱私權政策文字改為與選單子項目一致的字級、字重與行高。
- 最新消息 Footer 標題改為 500 字重；版權文字改為與隱私權政策一致的字級與字重。
- Footer bottom 改為以品牌主橘為核心的同色系深橘漸層，並將圓弧翻轉至右上角，讓底部維持直角。
- Footer bottom 右上圓弧改為橫向拉長的橢圓弧，桌機約 52px × 16px、手機 24px × 6px，保留品牌細節並降低切角感。
- Footer bottom 高度收斂為桌機 48px、手機約 64px，減少橘色區塊的厚重感並保留文字留白。
- Footer 手機版法律連結改為白色文字，桌機／筆電維持原有顏色。
- Footer 快速連結與最新消息欄位對調，最新消息位於快速連結之前。
- 首頁「我們的服務」卡片移除預設圖片遮罩，保留卡片內容與互動效果。
- 首頁「我們的服務」說明文字桌機字級調整為較收斂的 16–20px，手機維持 16px。
- 首頁「我們的服務」卡片改為直向滿版圖片、底部局部漸層、標題／說明／單一查看服務連結的圖片卡片版型。
- 首頁服務卡片桌機內容寬度收斂至網站主要內容寬度，降低三張卡片過大的視覺比例。
- 首頁服務卡片桌機內容寬度再收窄至 1200px，進一步降低卡片尺寸與視覺份量。
- 首頁「關於亞太」桌機內容寬度收斂至 1324px，改善大視窗下區塊過度展開的比例。
- 首頁「最新消息」桌機內容區固定為 1324px，卡片寬度上限固定為 380px，讓桌機與筆電視覺尺度一致。
- 首頁「最新消息」桌機輪播軌道從內容左側延伸至瀏覽器右側邊界，保留固定卡片尺度並消除右側空白。
- 首頁新增「最新消息-2」對比區塊，使用置中標題／媒體中心按鈕與三張圖片資訊卡片，卡片預設背景統一使用 `index/公告資訊.png`。
- 首頁「最新消息」卡片改為與「最新消息-2」一致的圖片背景卡片；有上傳圖片時使用該圖片，無圖片時使用 `index/公告資訊.png`，內容順序為類別／標題／日期／查看更多。
- 首頁「最新消息」卡片的「查看更多」改為與「關於亞太」的文字連結一致，並將連結位置下移至較接近卡片底部。
- 首頁「最新消息」卡片的日期與類別整合至同一個 `home-latest__meta` 橫列，並將該列微幅上移。
- 首頁「最新消息」卡片的 meta 順序改為日期／類別，日期改為數字格式；「查看更多」改為卡片內容區右側對齊。
- 首頁「最新消息」卡片的 meta 顯示順序調整為類別／日期，並取消過度上移，恢復與對比卡片一致的上方內距。

### 已驗證

- 瀏覽器桌機版：1912x948 確認 Footer bottom 使用約 52px × 16px 橢圓右上圓弧、底部直角，且無水平溢出。
- 瀏覽器手機版：390x844 確認 Footer bottom 使用 24px × 6px 橢圓右上圓弧、底部直角，且無水平溢出。
- 瀏覽器桌機／手機版：確認 Footer bottom 高度分別為 48px／64px，法律連結與版權文字未被裁切，且無水平溢出。
- 瀏覽器桌機／手機版：確認 Footer legal links 手機版為白色，桌機／筆電維持原有顏色。
- 瀏覽器桌機／手機版：確認 Footer 欄位順序為關於亞太、服務項目、營運資源、最新消息、快速連結。
- 瀏覽器桌機／手機版：確認首頁「我們的服務」卡片無預設遮罩，圖片與卡片內容正常顯示，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「我們的服務」說明文字桌機較小、手機維持 16px，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁服務卡片直向版型、底部內容與查看服務連結正常顯示，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁服務卡片保留單一查看服務連結、箭頭與底線互動，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁服務卡片縮小後比例與內容正常，手機版維持單欄，且無水平溢出。
- 瀏覽器桌機／手機版：確認服務卡片群組收窄後三張卡片內容正常、手機版維持單欄，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「關於亞太」桌機寬度為 1324px、手機版維持 40px 內距，且無水平溢出。
- 瀏覽器桌機／筆電／手機版：確認最新消息卡片桌機寬度上限 380px、手機版維持單卡橫向滑動，且無水平溢出。
- 瀏覽器桌機／筆電／手機版：確認最新消息輪播右側延伸至桌機／筆電視窗邊界，手機版維持單卡橫向滑動，且頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息-2」區塊標題、媒體中心按鈕、三張預設背景圖片卡片與最新消息資料正常顯示，且無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」卡片依類別／標題／日期／查看更多順序顯示，含圖與無圖資料分別使用上傳圖片／`index/公告資訊.png` 背景，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」查看更多連結位置、橘色短底線與 Hover 展開／箭頭位移效果正常，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」日期與類別同列顯示，meta 列位置正常，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」meta 依日期／類別順序顯示、日期不含英文月份，「查看更多」位於卡片右側，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」meta 依類別／日期順序顯示，meta 不貼近卡片上緣，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認首頁「最新消息」查看更多恢復左側，無圖片或圖片載入失敗時顯示右側裁切的公告資訊預設圖與 AP 標誌，且輪播與頁面無水平溢出。
- 瀏覽器桌機／手機版：確認 Footer bottom 使用主橘核心的同色系深橘漸層，與 Hero 橘色線條及白色 Footer 背景搭配一致。
- Release 建置：`dotnet build -c Release --no-restore`，0 warnings／0 errors。
- JavaScript 語法檢查：`node --check wwwroot/js/site.js`，通過。
- 首頁 JavaScript 語法檢查：`node --check wwwroot/js/pages/home.js`，通過。
- 本次首頁最新消息卡片調整使用隔離輸出執行 Release 建置，0 warnings／0 errors；`git diff --check` 通過。
- 本次首頁最新消息卡片 SSR 狀態 class 與預設／上傳圖片文字樣式調整使用隔離輸出執行 Release 建置，0 warnings／0 errors。
- `git diff --check`：通過；所有公開頁面已更新 Footer／Token cache-busting 版本。
- 瀏覽器桌機版：1912x948 確認 Logo／分隔線／四欄導覽對齊 1324px 內容網格、深灰底部列與右側法律連結，且無水平溢出。
- 瀏覽器手機版：390x844 確認四欄初始收合、點擊可展開，且無水平溢出。
- 瀏覽器桌機／手機版：確認底部隱私權政策與快速連結子項目計算後同為 14.72px、400、24.288px。
- 瀏覽器桌機／手機版：確認最新消息標題為 500 字重，版權文字與隱私權政策字級／字重一致，且無水平溢出。

### 未驗證

- 實體裝置、跨瀏覽器、正式 IIS 與人工無障礙驗收。
- 本次最新消息卡片 Hover、圖片放大、遮罩濃度與預設／上傳圖片文字分流尚未完成桌機／手機瀏覽器實際驗證；本機瀏覽器拒絕存取 `http://localhost:5127/`。

## 2026-09-06

### 已完成

- Footer Logo 與聯絡資訊間距由 12px 調整為 20px，改善 Logo 與地址區塊過於靠近的視覺問題。
- Footer 聯絡資訊 SVG icon：縮小內部 padding 並允許線條完整繪製，避免電話圖示在圓形背景內顯示不完整。

### 已驗證

- Release 建置：`dotnet build -c Release --no-restore`，0 warnings／0 errors。

### 未驗證

- 瀏覽器桌機版、手機版與實體裝置的實際視覺驗收。

## 2026-09-04

### 已完成

- Services 頁面恢復至服務項目導覽連結修正時的原本排版，保留原有標題、實景圖片／輪播、主要服務項目與優勢區塊。
- Services「我們的優勢」改用既有副標題字級，優勢卡片標題改用 compact card title 字級，未修改全域 typography variables。
- Services 主要服務項目的箭頭 icon 改為參考 Affiliates 的 8px 品牌橘色小方形，並同步收窄 icon 欄位。
- Services 主要內容、優勢區、CTA 與 service-switcher 恢復原本寬度規則。
- Services 服務描述區移除下底線，保留原有內容間距與容器對齊。
- Services 移除「我們的優勢」副標題下方的品牌橘色底線，保留其他標題 accent 線。
- 全站 Header／Footer 的服務項目連結統一導向 `/services`，不再附帶區段錨點。
- 修正最新消息詳細頁圖片狀態 placeholder 混入 `class` 屬性的問題。
- 確保 `.site-container` 在有圖片與無圖片新聞詳細頁都能正常套用置中與響應式內距。
- 修正短內容新聞詳細頁的 Footer 未貼齊 viewport 底部問題。
- 保留有圖片／無圖片自適應方向，調整桌機雙欄比例與右側圖片垂直位置。
- 無自訂圖片時由伺服器端移除 media wrapper，避免留下 image column 或 placeholder。
- 恢復有自訂圖片時依序顯示文字、附件、圖片的垂直版型。
- 圖片沿用內容區下方的受控寬度，避免恢復垂直排列後放大成整欄圖片。
- 沿用既有 media marker 輸出圖片，兼容目前開發服務組件。
- 圖片輸出已恢復為附件下方的垂直 media 區塊，避免現有開發服務因組件版本差異而漏圖。
- News Detail 詳細頁：年份與類別改為置中且分開的背景標籤；標題下方恢復分隔線；內容、附件與圖片各自使用獨立背景區塊。

### 已驗證

- Release 建置：`dotnet build -c Release --no-restore -p:OutDir=.\obj\build-check\`，0 warnings／0 errors。
- JavaScript 語法檢查：`node --check wwwroot/js/site.js`、`node --check wwwroot/js/pages/news-detail.js`，通過。
- 瀏覽器桌機版：預設 1912px viewport，容器置中並與共用 Footer 對齊。
- 瀏覽器手機版：390x844，容器左右各 20px，圖片寬 335px。
- 有圖片與無圖片新聞詳細頁：容器與圖片狀態均正常。
- `git diff --check`：通過。
- 服務項目導覽連結靜態檢查：全站 Header／Footer 均導向 `/services`；首頁服務卡片的區段錨點保留。
- Services 原本排版瀏覽器桌機版：1366px 確認三個分頁皆保留標題、敘述、實景圖片／輪播、主要服務項目與優勢區塊，文件無水平溢出。
- Services 原本排版瀏覽器手機版：390px 確認三個分頁皆可切換，內容寬度 335px、圖片與清單單欄；倉儲與機具輪播控制點分別為 5 與 2 個，文件無水平溢出。
- Services 優勢字級瀏覽器檢查：1366px「我們的優勢」為 24px、卡片標題為 20px；390px 分別為 20px 與 20px，且無水平溢出。
- Services 服務項目 icon 瀏覽器檢查：桌機與手機三個分頁皆顯示 8px 小方形，使用品牌橘色且無水平溢出。
- Services 原本寬度瀏覽器檢查：1366px 主內容與 service-switcher 為 1280px，CTA 恢復共用容器寬度；390px 維持內容寬度 335px，無水平溢出。
- Services 優勢標題底線瀏覽器檢查：1366px 與 390px 三個分頁皆無該橘色底線，其他版面無水平溢出。
- Services 服務描述區瀏覽器檢查：1366px 與 390px 三個分頁皆無 description 下底線，且頁面無水平溢出。
- Release 建置：`dotnet build -c Release --no-restore -p:OutDir=.\\obj\\build-check-services-links-20260904\\`，0 warnings／0 errors。
- Footer sticky layout：1366x900 無圖片短內容頁 Footer 底部為 900px，白色空隙為 0px；390x844 有圖片頁版面正常。
- News Detail layout：恢復文字／附件／圖片垂直排列；桌機圖片最大寬度 640px，無圖片不輸出 media wrapper；Mobile 維持單欄。
- News Detail layout：5127 實際回應與瀏覽器均確認有圖片時 media／image 位於附件後方；無圖片 media／image 均為 0；Mobile 390px 單欄。
- News Detail layout：有圖片時圖片位於附件下方且最大寬度 640px；無圖片不輸出 media wrapper。
- News Detail layout：改由附件後輸出單一 media wrapper 與圖片；無圖片狀態不輸出 media wrapper。
- News Detail 詳細頁區塊樣式：瀏覽器桌機版確認年份／類別分色置中、標題分隔線，以及內容／附件／圖片共用連續背景容器。
- News Detail 無圖片狀態：瀏覽器確認不輸出 media／image，內容背景區塊與 880px 內容寬度維持正常。
- News Detail 詳細頁：標題改為置中；內容、附件與圖片背景統一為同一套淺灰色內容區塊。
- News Detail 詳細頁：將內容、附件與圖片改為共用連續背景容器，並將內容區塊最大寬度收斂至 880px。
- News Detail 詳細頁：將共用內容背景容器水平置中，保留容器內文字、附件與圖片的垂直排列。
- News Detail 詳細頁：依東元頁面風格改為主要內容、標題與年份／類別列靠左對齊。
- News Detail 詳細頁：移除內容容器背景色，將桌機內容依主要 grid 內縮，並縮短標題與分隔線的間距；Mobile 清除桌機內縮。
- News Detail 詳細頁：將返回連結、標題／標籤、分隔線與正文統一至同一個左側內縮起點，正文改為無左右額外內距以維持對齊。
- News Detail 詳細頁：收緊分隔線至內容、內容至附件、附件至圖片及內容容器上下的垂直間距，改用全域 content-padding。
- News Detail 詳細頁：移除標題分隔線下方重複 margin，將分隔線至內容的間距收斂為單一 content-padding。
- News Detail 詳細頁：增加返回按鈕至標題區的垂直距離，使用 section-space 加 content-padding 的全域間距組合。
- News Detail Mobile：將返回按鈕至標題區收斂為 section-space，移除分隔線至內容的重複間距，讓各段落維持一致節奏。
- News Detail 詳細頁：依 Desktop／Mobile 指定值重整返回、Meta、H1、摘要、附件、圖片與底部的垂直 spacing；Mobile 隱藏 H1 分隔線，圖片改為 detail container 全寬。
- News Detail 詳細頁：重新建立群組化 vertical rhythm，避免所有元素使用近似間距；Desktop 圖片改為 detail container 的 85% 且上限 800px，Mobile 維持全寬。
- News Detail Desktop：返回按鈕至 Meta 間距修正為 32px，與指定群組化節奏一致。
- News Detail：背景圖片延伸涵蓋文章區塊左右兩側，使用 86% 白色遮罩降低對比，僅保留線條作為淡雅點綴。
- News List Filter：將 hover 背景限制於支援 hover 且使用精準指標的裝置，並獨立保留 focus-visible 樣式，避免觸控裝置點擊後殘留 hover 背景。
- News List Filter：觸控／粗略指標裝置維持與桌面預設相同的透明背景，同時保留 focus 外框。
- News List Filter：觸控裝置點擊時維持原文字顏色，不因 hover／focus／active 狀態變色；已選取分類的既有 active 文字樣式保留。
- News List Filter：明確統一 filter、inner、list 三層背景為桌面版基準，並於 760px 以下維持點擊時透明背景與非 active 文字顏色。

### 未驗證

- 正式 IIS、實體裝置、跨瀏覽器與人工無障礙驗收。
- 本次區塊樣式調整的 390px 實際瀏覽器 viewport 未驗證；目前 Edge 連線不接受 viewport 覆寫，僅確認既有 Mobile 單欄 CSS 規則仍保留。
- News List Filter：修正 touch-buttons.css 後置選取規則覆蓋，讓行動裝置選取分類沿用桌面版透明背景與文字色，不再顯示橘色底。
# 2026-09-11

- [x] 調整人才招募頁 `benefits-list` 最大寬度為 1120px，使其與 `join-benefits-heading` 一致；已完成靜態差異檢查，尚未進行瀏覽器桌機與手機畫面驗證。
- [x] 調整首頁服務卡片桌機／筆電版比例，將高度縮短至約原本的 84%；保留手機版比例，尚未進行瀏覽器畫面驗證。
- [x] 將首頁服務卡片底部遮罩改為深藍色漸層；尚未進行瀏覽器畫面驗證。
- [x] 將經營理念卡片文字區背景改為指定深藍漸層，並補上 `--dark-blue` 共用 token；尚未進行瀏覽器畫面驗證。
- [x] 將經營理念卡片文字區背景更新為 `135deg` 的 `--blue-700` 至 `--blue-300` 漸層；尚未進行瀏覽器畫面驗證。
- [x] 將經營理念卡片文字區背景改為 `#edf0f5`，並同步調整文字顏色以維持對比；尚未進行瀏覽器畫面驗證。
- [x] 將認證內容 `.about-certifications-preview__events` 背景改為 `#edf0f5`；尚未進行瀏覽器畫面驗證。
- [x] 將認證內容文字改為深色以配合 `#edf0f5` 背景；尚未進行瀏覽器畫面驗證。
- [x] 移除經營理念區塊 `.about-philosophy-editorial` 的背景顏色；尚未進行瀏覽器畫面驗證。
- [x] 非首頁統一固定 Header，並加入共用 Hero 捲動緩慢位移；已完成靜態檢查，尚未進行桌機／手機瀏覽器驗證。
- [x] 修正非首頁 Hero 視差：圖片層改為 Hero 內 130% 高度、`top: -15%` 並以 `translateY()` 隨捲動位移；尚未進行瀏覽器驗證。
- [x] 移除 Hero 視差圖片的 transform transition，避免上下捲動時因追趕前一個位置造成晃動；尚未進行瀏覽器驗證。
- [x] 修正非首頁 Hero 標題被固定 Header 遮住的層級問題，保留圖片 `translateY()` 視差；尚未進行瀏覽器驗證。
- [x] 修正固定 Header 與 Hero 的層級：Header 改為不透明白底並提高至 `z-index: 30`，Hero 內容恢復低於 Header；保留背景視差效果，尚未進行瀏覽器驗證。
- [x] 縮小新聞分頁視覺尺寸與間距，保留目前頁碼與箭頭操作；尚未進行瀏覽器驗證。
- [x] 修正新聞詳細頁在 `content` 僅有標題時被清空的問題，保留唯一內容行顯示；尚未進行瀏覽器驗證。
- [x] 縮短人才招募頁 `.join-content` 上方 `padding-top`；尚未進行瀏覽器驗證。
- [x] 統一 careers 主要區塊左右寬度，移除局部 `1120px` 限制並沿用共用 `.site-container` 內容寬度；尚未進行瀏覽器驗證。
- [x] 收緊「加入亞太」與「公司福利」區塊間距，移除福利區塊額外的上方 margin；尚未進行瀏覽器驗證。
- [x] 移除 services 頁面三個服務區塊的 eyebrow 文案；聯絡區原本已隱藏，尚未進行瀏覽器驗證。
- [x] 首頁最新消息卡片：標題字級調降為 `clamp(1.125rem, 1.02rem + .3vw, 1.3rem)`，標題下新增最多兩行的內文摘要（前端與 SSR 皆處理，長度最多 68 字）。已重新載入本機首頁確認摘要載入；`node --check wwwroot/js/pages/home.js`、`dotnet build -c Release` 及 `git diff --check` 通過。桌機畫面已檢視；手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 移除首頁最新消息的 `home-latest__footer`、左右切換按鈕、分頁控制與相關 CSS／JavaScript；保留卡片的原生橫向捲動與拖曳。已重新載入本機首頁確認控制列不再出現；`node --check wwwroot/js/pages/home.js` 與 `git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息摘要改用全域 `--color-text-body` 與 `--font-size-body`，卡片靜態與 hover 陰影改用全域 `--shadow-card`、`--shadow-lg`。已重新載入本機首頁並讀取實際樣式：摘要為 16px、`rgb(68, 80, 95)`，卡片陰影為 `0 6px 18px rgb(0 0 0 / 5%)`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息日期改用全域 `--color-text-body`，與摘要文字一致。已重新載入本機首頁並確認計算後色值為 `rgb(68, 80, 95)`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息卡片預設陰影改為 `none`，僅在 hover 或鍵盤 focus 時保留 `--shadow-lg`。已重新載入本機首頁確認靜止狀態計算陰影為 `none`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息卡片背景改用全域 `--color-surface-soft`，讓預設無陰影的卡片仍具有明確區隔。已重新載入本機首頁並確認實際背景為 `rgb(245, 245, 245)`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息卡片背景改為指定漸層 `linear-gradient(135deg, #edf0f5 0%, #e3e8ef 52%, #d8e0e9 100%)`。已重新載入本機首頁並確認瀏覽器計算後漸層；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 移除首頁最新消息卡片預設與 hover 的邊線規則，保留漸層背景和 hover 陰影。已重新載入本機首頁並確認計算後邊線為 `0px none`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 移除誤加在首頁最新消息標題列 `.home-latest__heading` 的邊線；卡片樣式未因本次修正變更。已重新載入本機首頁並確認標題列 `border-top-width` 為 `0px`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 移除首頁最新消息標題列下方原有的共用邊線，最終 `.home-latest__heading` 明確設為 `border: 0`。已重新載入本機首頁並確認 `border-bottom-width` 為 `0px`；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息標題與卡片的間距由 48px 收為 40px，卡片 hover／focus 的右下角標準右箭頭由 22px、1.8px 線寬調為 24px、2.2px 線寬。已重新載入本機首頁確認實際間距為 40px、箭頭為 24px／2.2px；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 新增全域 `--section-heading-content-gap: 40px`，首頁最新消息標題至卡片改為使用此 token；後續頁面區塊標題與主體內容沿用同一 token。已確認 CSS token 定義與首頁引用；`git diff --check` 通過。瀏覽器介面未回傳 CSS custom property 計算值，未將此列為實機樣式驗證；手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁服務卡片至 About 主體、About 主體至關係企業標題的視覺區塊距離統一為 80px：服務區下方、About 區塊上下方與關係企業上方均改為使用既有全域 `--section-space`（40px）組合。已重新載入本機首頁並確認兩段實際距離皆為 80px；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 依使用者要求，恢復首頁服務區、About 區塊與關係企業的原始區塊間距設定；全域標題到主體 40px token 保留。已重新載入本機首頁確認恢復後服務至 About 為 126px、About 至關係企業為 207px；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁「我們的服務」標題至卡片網格間距改用全域 `--section-heading-content-gap`，與最新消息一致為 40px。已重新載入本機首頁並確認實際距離為 40px；`git diff --check` 通過。手機、實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 首頁最新消息改為參考圖的直向條列：標題獨立置中，日期與標題排列於分隔線列表，桌機與手機皆採單欄；移除卡片圖片、摘要及橫向拖曳／輪播控制，保留最多 8 則資料、新聞連結、API 與 SSR 初始輸出，並將「查看全部」置於列表下方。同步更新首頁 CSS／JS cache-busting。Edge 實際確認桌機 1440px、手機 390px 均呈現 5 則消息、標題置中且無水平溢位；`dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器及人工無障礙未驗證；未 commit。
- [x] 首頁最新消息移除標題英文小標；標題與「我們的服務」共用 `--font-size-section-heading` 及 `--font-weight-heading`（500），並以 `--color-surface-soft` 套用全寬淺灰底；移除列表頂線，消息標題字重設為 500。Edge 實測桌機 1440px 為 33.12px、手機 390px 為 30px，兩處標題尺寸／字重一致，背景滿版、第一則上方無邊線且無水平溢位；`dotnet build -c Release`、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器及人工無障礙未驗證；未 commit。
- [x] 依參考圖將首頁最新消息改為「亞太動態／最新消息／簡介」標題區與消息卡片；桌機每列 3 張、平板 2 張、手機 1 張，卡片顯示日期、標題、最多 128 字摘要與箭頭；摘要與標題重複時省略。首頁前端及 SSR 均限制最新 3 則，並更新首頁 CSS／JS cache-busting。Edge 實測 1440px 三欄、980px 雙欄、390px 單欄，均無頁面水平溢位；確認三卡片高度一致、SSR/API 均顯示 3 則；`dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
- [x] 依使用者澄清，首頁最新消息恢復至本輪改版前的水平文字卡片列（最多 8 則、原生橫向捲動與拖曳、卡片日期／類別／標題／摘要、hover 箭頭及右側「更多」）；移除本輪加入的置中列表、淺灰滿版底色及列表專屬標題設定。Edge 瀏覽器確認桌機 1440px、手機 390px 均有 5 張卡片、卡片列可橫向捲動且頁面本身無水平溢位；`dotnet build -c Release`（0 warnings／0 errors）、`node --check wwwroot/js/pages/home.js`、`git diff --check` 通過。實體裝置、跨瀏覽器與人工無障礙未驗證；未 commit。
