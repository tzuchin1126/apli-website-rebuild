# APLI Website Rebuild 安全基線與防護紀錄

更新日期：2026-08-19  
適用專案：`apli-website-rebuild`  
文件目的：記錄目前已實作的安全防護、尚未實作或尚未驗證的項目，以及各項防護缺少時可能造成的影響。

本文件是開發與部署基線，不是滲透測試報告、弱點掃描報告或正式資安認證。內容以目前原始碼與部署文件檢視結果為準；標示「尚未驗證」的項目不可視為正式環境已通過。

## 一、目前安全狀態摘要

目前專案已具備基本的網站與後台防護，包括管理員驗證、Cookie 基本安全屬性、CSRF 防護、登入速率限制、附件格式檢查，以及部分瀏覽器安全標頭。

目前尚未達到完整正式上線安全基準，主要原因是：

- 公開頁面已改用伺服器端發布狀態 API，且網站已封鎖兩個原始新聞 JSON 路徑；但新聞資料與附件仍位於應用程式目錄內，部署時可能被覆蓋或與附件資料分離。
- 新聞 JSON 與附件仍位於應用程式目錄內，部署時可能被覆蓋或與附件資料分離。
- 管理員使用共用帳號密碼，尚無個別帳號、操作稽核或多因素驗證。
- 附件尚無防毒／惡意內容掃描。
- Production HTTPS、Cookie Secure、正式 Domain、備份還原與實際回應標頭尚未完成完整環境驗證。

建議目前狀態：可作為開發與單機測試基礎；正式上線前應先完成「高優先級待補強項目」。

## 二、已實作的防護

### 2.1 管理員密碼不寫入程式碼

實作位置：[Program.cs](Program.cs#L18-L24)、[IIS-DEPLOYMENT.md](IIS-DEPLOYMENT.md#L124-L142)

目前啟動時從 `Admin__Username` 與 `Admin__Password` 讀取管理員帳密；若沒有完整設定，應用程式會停止啟動。帳密未放入 `appsettings.json`、HTML 或 Git 版本庫。

防護作用：降低帳密被提交到 Git、部署包或前端原始碼的風險。

若沒有這項防護：帳密可能被 Git 歷史、備份檔、錯誤分享或前端檔案洩漏；一旦提交，即使刪除目前檔案，舊版本仍可能保留。

目前狀態：已實作；正式伺服器環境變數與權限尚未由本機確認。

### 2.2 Admin API 需要登入授權

實作位置：[Program.cs](Program.cs#L288-L301)、[Program.cs](Program.cs#L303-L405)

登出、新聞查詢、新聞新增／修改／刪除及分類管理 API 使用 Cookie Authentication 與 `RequireAuthorization()`。未登入使用者不能使用後台管理 API。

防護作用：避免未登入者直接修改公告、刪除新聞、上傳附件或讀取後台完整資料。

若沒有這項防護：任何人只要知道 API 路徑，就可能直接新增、修改或刪除網站內容。

目前狀態：已實作；尚未完成正式 IIS 上的未登入／已登入 API 實際驗收。

### 2.3 管理員 Cookie 與工作階段基本限制

實作位置：[Program.cs](Program.cs#L28-L70)

目前設定包括：

- `HttpOnly`：降低 JavaScript 直接讀取登入 Cookie 的風險。
- `SameSite=Strict`：降低跨網站請求攜帶 Cookie 的風險。
- Session 逾時 10 分鐘。
- 登入 Cookie 逾時 30 分鐘並支援滑動延長。

防護作用：降低 XSS 直接竊取 Cookie，以及管理員長時間閒置後仍保持登入的風險。

若沒有這些設定：瀏覽器中的登入狀態較容易被腳本讀取、被跨站請求攜帶，或在共用電腦上長時間保持有效。

目前狀態：基本設定已實作；`SecurePolicy` 目前是 `SameAsRequest`，Production 正式環境仍應改為 `Always` 並強制 HTTPS。

### 2.4 CSRF 防護

實作位置：[Program.cs](Program.cs#L63-L70)、[Program.cs](Program.cs#L262-L305)、[Pages/Admin/Index.cshtml](Pages/Admin/Index.cshtml#L1-L16)、[wwwroot/js/pages/admin.js](wwwroot/js/pages/admin.js#L20-L30)

管理員頁面取得 antiforgery token，寫入／刪除／登出請求必須透過 `X-CSRF-TOKEN` Header 驗證。

防護作用：避免管理員已登入時，被惡意網站誘導，偷偷新增公告、刪除資料或登出。

若沒有這項防護：攻擊者可能利用管理員瀏覽器的有效 Cookie，偽造後台表單請求。

目前狀態：已實作；尚未在正式 Domain、跨來源情境與所有管理員操作流程實際驗證。

### 2.5 登入 CAPTCHA 與速率限制

實作位置：[Program.cs](Program.cs#L72-L87)、[Program.cs](Program.cs#L253-L286)

登入需要 CAPTCHA，且每個來源 IP 每分鐘最多 5 次登入嘗試，超過後回傳 429。

防護作用：降低自動化密碼猜測與大量登入請求。

若沒有這項防護：攻擊者可以快速嘗試常見帳密，或以大量請求消耗後台資源。

目前狀態：已實作；目前只有登入 API 限速，其他 API 與附件上傳尚無獨立速率限制；尚未完成正式環境壓力與繞過測試。

### 2.6 附件副檔名、大小與內容簽章檢查

實作位置：[Program.cs](Program.cs#L636-L704)

目前附件限制為 PDF、Word、Excel，最大 10 MB；圖片限制為 JPG、PNG、WebP，最大 5 MB，並檢查檔案內容簽章，不只相信使用者提供的副檔名。

防護作用：降低上傳可執行檔、偽裝檔案或過大檔案造成的風險。

若沒有這項防護：攻擊者可能上傳可執行程式、偽裝成圖片的惡意內容，或利用超大檔案造成磁碟與記憶體壓力。

目前狀態：已實作；尚無防毒掃描、內容消毒、PDF／Office 惡意內容分析。

### 2.7 隨機附件檔名與路徑穿越檢查

實作位置：[Program.cs](Program.cs#L426-L433)、[Program.cs](Program.cs#L642-L662)

上傳檔案使用隨機 GUID 檔名儲存，下載端點會拒絕包含路徑的檔名，附件存放於 `App_Data/news/`，不直接位於公開靜態目錄。

防護作用：降低檔名猜測、路徑穿越與直接執行上傳檔案的風險。

若沒有這項防護：攻擊者可能嘗試讀取伺服器其他路徑，或利用可預測檔名存取他人附件。

目前狀態：已實作；正式 IIS 的檔案權限與下載行為尚未實測。

### 2.8 公開附件需對應已發布新聞

實作位置：[Program.cs](Program.cs#L426-L445)

未登入使用者下載附件時，系統會確認該檔案是否被已發布新聞的 `Url` 或 `ImageUrl` 引用；未被公開新聞引用的檔案會回傳 404。

防護作用：降低使用者僅憑猜測檔名取得未公開附件的風險。

若沒有這項防護：即使新聞尚未發布，只要攻擊者知道檔案名稱，也可能直接下載附件。

目前狀態：已實作；仍須先完成新聞 JSON 不直接公開的改善，才能完整保護草稿資料。

### 2.9 瀏覽器安全標頭

實作位置：[Program.cs](Program.cs#L117-L127)

目前加入：

- `Content-Security-Policy`：限制腳本、樣式、字型、圖片、iframe 與連線來源。
- `X-Frame-Options: DENY`：禁止網站被其他網站以 iframe 嵌入。
- `X-Content-Type-Options: nosniff`：避免瀏覽器猜測錯誤的 MIME 類型。
- `Referrer-Policy: strict-origin-when-cross-origin`：降低跨站 Referer 洩漏資訊。

防護作用：降低 XSS、Clickjacking、MIME 混淆與 URL 路徑洩漏風險。

若沒有這些標頭：瀏覽器在資源載入、iframe 嵌入、內容類型判斷與跨站導覽上會缺少額外限制。

目前狀態：原始碼已加入；Release 建置與 `git diff --check` 已通過，但尚未在實際 IIS HTTPS 網域取得完整回應標頭驗證。

### 2.10 Production HTTPS、HSTS 與自訂錯誤頁設定

實作位置：[Program.cs](Program.cs#L107-L115)、[Program.cs](Program.cs#L166-L188)、[IIS-DEPLOYMENT.md](IIS-DEPLOYMENT.md#L33-L41)

非 Development 環境會啟用 HTTPS redirect 與 HSTS；公開 404／500 錯誤會使用品牌錯誤頁，不直接顯示一般錯誤頁。

防護作用：降低傳輸內容被竊聽或竄改的風險，也避免公開頁面洩漏過多伺服器錯誤資訊。

若沒有這些設定：登入資料、Cookie 與新聞管理內容可能經由 HTTP 傳輸；錯誤頁也可能暴露框架或路徑資訊。

目前狀態：程式設定已存在；正式 HTTPS Binding、憑證、反向代理轉發標頭與實際 IIS 行為尚未完成驗證。

## 三、尚未實作或需要補強的防護

### 3.1 公開頁面直接暴露完整 `news.json`（已處理，資料分離仍待完成）

目前 [wwwroot/js/pages/news.js](wwwroot/js/pages/news.js)、[wwwroot/js/pages/news-detail.js](wwwroot/js/pages/news-detail.js) 與 [wwwroot/js/pages/home.js](wwwroot/js/pages/home.js) 改由 `/api/public/news` 及其子路徑取得資料。API 會在伺服器端要求 `Published = true`，並要求公告日期不晚於 Asia/Taipei 今日；詳細頁也會再次驗證指定公告的公開狀態。

已降低的影響：草稿、未發布新聞與未來公告不再由公開頁面的正常資料 API 回傳；前端不再負責安全過濾。

已補上的即時防護：[Program.cs](Program.cs) 在靜態檔案 middleware 前對 `/data/news.json` 與 `/data/news-categories.json` 回傳 404，因此即使知道檔案路徑也不能從網站直接下載原始 JSON。

尚未完成的部分：`news.json` 目前仍位於 `wwwroot/data/`，部署時仍可能覆蓋或與附件資料分離。下一步要將新聞 JSON、分類與附件移出發布目錄，並讓 API 讀取外部資料根目錄。

### 3.2 新聞資料與附件仍位於應用程式目錄（高優先級）

目前 `news.json` 位於 `wwwroot/data/`，附件位於 `App_Data/news/`。`App_Data` 被 Git 忽略，新聞 JSON 卻仍在版本庫內，容易造成兩台電腦或不同發布版本資料不一致。

影響：發布新版本時可能覆蓋正式新聞；只同步 JSON 時可能產生附件 404；若備份不完整，新聞與附件可能無法一起還原。

建議：將新聞 JSON、分類與附件移至發布目錄外的正式資料根目錄，使用環境設定指定位置；部署程式碼時排除可變資料，並定期備份與測試還原。

### 3.3 Production Cookie 尚未固定使用 HTTPS

目前 Cookie 使用 `CookieSecurePolicy.SameAsRequest`。

影響：若 Production 仍存在 HTTP Binding、反向代理判斷錯誤，或管理員透過 HTTP 請求，登入 Cookie 可能沒有 `Secure` 屬性，增加被竊取的風險。

建議：正式環境改用 `CookieSecurePolicy.Always`，只保留 HTTPS，並確認 IIS／反向代理正確傳遞 HTTPS 狀態。

### 3.4 `AllowedHosts` 目前是萬用設定

目前 [appsettings.json](appsettings.json#L1-L8) 使用 `"AllowedHosts": "*"`。

影響：應用程式不會以正式 Domain 限制 Host Header。若反向代理、IIS Binding 或快取設定不嚴謹，可能增加 Host Header 混淆、錯誤連結或快取污染風險。

建議：Production 設定為正式 Domain 與必要別名，例如 `www.example.com;example.com`，並同步檢查 IIS Binding。

### 3.5 沒有個別管理員帳號、MFA 與操作稽核

目前是單一共用帳號密碼，登入 Claim 也只代表同一個管理員名稱。

影響：無法知道哪位人員新增、修改或刪除公告；人員離職時只能更換所有人共用的密碼；密碼一旦外洩，難以只停用單一使用者。

建議：正式營運前導入個別帳號、角色權限、登入紀錄、內容異動紀錄、停權機制；若條件允許，使用公司 SSO 或 MFA。

### 3.6 沒有防毒與惡意附件掃描

目前只做檔案類型、大小與簽章檢查。

影響：合法格式的 PDF、Word 或 Excel 仍可能包含惡意內容；公開下載後可能攻擊管理員或網站訪客的裝置。

建議：上傳後先隔離，交由伺服器防毒或雲端掃描服務確認無威脅後才公開；掃描失敗或服務不可用時不要發布附件。

### 3.7 沒有完整的全站／上傳 API 速率限制

目前主要限制登入 API；新聞查詢、上傳與部分公開請求沒有獨立的 IP、帳號或檔案速率限制。

影響：可能被大量請求消耗 CPU、磁碟、頻寬或新聞 JSON 鎖定時間；附件上傳也可能被用於資源耗盡攻擊。

建議：在 IIS 或反向代理加入 WAF／限流，並為上傳、登入、管理 API 設定不同限制與記錄。

### 3.8 備份與還原尚未自動化及實際演練

部署文件已有新聞 JSON 與 `App_Data/news/` 的備份指令，但尚未在正式環境確認排程、保留週期、異地備份與還原結果。

影響：硬碟故障、誤刪、錯誤發布或勒索事件後，可能只有程式碼而沒有新聞與附件，造成內容無法恢復。

建議：建立自動備份、異地或不可變備份、保留週期與還原演練；備份檔也要限制存取權限。

### 3.9 多伺服器或多執行個體尚未支援共用儲存

目前檔案與 `SemaphoreSlim` 鎖定都是單一應用程式執行個體設計。

影響：若未來使用多台 IIS、負載平衡、容器或自動擴展，不同執行個體可能讀到不同附件與 JSON，或同時寫入造成資料遺失。

建議：改用資料庫、共用檔案儲存或雲端物件儲存，並使用跨執行個體的資料鎖定與交易策略。

### 3.10 尚未完成正式安全測試

目前已完成原始碼層級檢查與 Release 建置，但尚未完成：

- 正式 IIS HTTPS 回應標頭檢查。
- 未登入／已登入 API 權限測試。
- CSRF、Cookie 與 Session 行為測試。
- 附件惡意內容、超大檔案與錯誤副檔名測試。
- 錯誤路由、Host Header、反向代理與快取行為測試。
- 依賴套件弱點掃描、DAST 或滲透測試。

影響：無法只依原始碼判斷正式網路環境、IIS 設定與代理層沒有安全問題。

## 四、正式上線前優先順序

### P0：必須先處理

1. 將新聞 JSON 與附件移出發布目錄，避免部署覆蓋或只同步部分資料。
2. Production Cookie 改為 `SecurePolicy.Always`，完成 HTTPS Binding、憑證與 HSTS 驗證。
3. 將 `AllowedHosts` 改為正式 Domain。
4. 建立正式資料備份並完成一次還原演練。

### P1：建議正式上線前完成

1. 管理員改用個別帳號與操作紀錄。
2. 加入 MFA 或公司 SSO。
3. 加入附件防毒／惡意內容掃描。
4. 為上傳與管理 API 加入限流、記錄與告警。
5. 完成 IIS、瀏覽器與附件下載的實際安全驗收。

### P2：營運期間持續處理

1. 定期更新 .NET、套件與作業系統安全修補。
2. 定期檢查登入紀錄、異常上傳、404／401／403／429 與伺服器錯誤。
3. 定期執行弱點掃描與備份還原演練。
4. 依公司資安政策檢討資料保留、管理員權限與離職停權流程。

## 五、目前驗證紀錄

已完成：

- `dotnet build -c Release`：0 warnings、0 errors。
- `node --check wwwroot/js/pages/home.js`、`news.js`、`news-detail.js`：通過。
- `git diff --check`：通過。
- 原始碼檢查確認公開 JavaScript 已不再直接 fetch `news.json`，且靜態檔案 middleware 前已封鎖兩個可變 JSON 路徑。
- 已檢視管理員驗證、CSRF、Cookie、速率限制、附件驗證與安全標頭原始碼。

尚未完成：

- 實際 IIS HTTPS 網域驗證。
- 本機 ASP.NET listener 因執行環境 `nice(5) failed` 無法啟動，尚未取得公開 API、404 封鎖與安全標頭的實際 HTTP 回應。
- 實際瀏覽器回應標頭驗證。
- 真實管理員登入、附件上傳／下載與權限驗收。
- 實體裝置、跨瀏覽器、人工無障礙與正式滲透測試。

本文件本次新增，未自行 commit 或 push。
