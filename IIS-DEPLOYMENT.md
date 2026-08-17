# APLI Website Rebuild：IIS 部署與更新手冊

本文件記錄 APLI Website Rebuild 在 Windows IIS 上的目前部署方式、實際資料夾、初次設定與後續更新流程。

## 一、目前實際路徑

| 用途 | 路徑 |
| --- | --- |
| 原始碼專案 | `C:\Users\U096\apli-website-rebuild` |
| 專案檔 | `C:\Users\U096\apli-website-rebuild\apli-website-rebuild.csproj` |
| 開發用公開頁面 | `C:\Users\U096\apli-website-rebuild\wwwroot` |
| 發布暫存資料夾 | `C:\Deploy\APLI` |
| IIS 實際網站根目錄 | `C:\Sites\APLI` |
| 新聞 JSON 資料 | `C:\Sites\APLI\wwwroot\data` |
| 新聞附件 | `C:\Sites\APLI\App_Data\news` |
| IIS Site 名稱 | `APLI Website` |
| IIS Application Pool | `APLIWebsite` |

IIS 執行的是 `C:\Sites\APLI`，不會自動讀取原始碼目錄。修改原始碼後，必須重新發布並同步到 IIS 網站根目錄。

## 二、目前的 IIS 設定

### Application Pool

`APLIWebsite` 應設定為：

- `.NET CLR Version`：`No Managed Code`
- Managed pipeline：`Integrated`
- Identity：`ApplicationPoolIdentity`

ASP.NET Core 由 ASP.NET Core Module for IIS 啟動，不使用傳統 ASP.NET Framework CLR。

### Website

目前測試網站設定：

- Site name：`APLI Website`
- Physical path：`C:\Sites\APLI`
- 暫時測試網址：`http://localhost:8080/index.html`

正式公開前必須建立 HTTPS Binding（通常為 443），並設定正式憑證與網域。Production 環境會啟用 HTTPS redirection，不能長期只使用 HTTP。

## 三、第一次建立 IIS 的必要設定

### 1. 安裝 IIS

Windows Server 透過 Server Manager 安裝 **Web Server (IIS)**，至少包含：

- IIS Management Console
- Static Content
- Default Document
- HTTP Errors

### 2. 安裝 .NET 8 Hosting Bundle

在 IIS 伺服器安裝與本專案 `net8.0` 相容的 [.NET 8 Hosting Bundle](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/hosting-bundle?view=aspnetcore-8.0)。

Hosting Bundle 會提供 .NET Runtime、ASP.NET Core Runtime 與 IIS 的 ASP.NET Core Module。

安裝完成後，以系統管理員 PowerShell 執行：

```powershell
net stop was /y
net start w3svc
```

### 3. 發布原始碼

在開發機執行：

```powershell
Set-Location C:\Users\U096\apli-website-rebuild

dotnet publish .\apli-website-rebuild.csproj `
  --configuration Release `
  --output C:\Deploy\APLI
```

發布結果必須包含：

- `C:\Deploy\APLI\web.config`
- `C:\Deploy\APLI\apli-website-rebuild.dll`
- `C:\Deploy\APLI\wwwroot`
- `C:\Deploy\APLI\Pages\Shared\_Footer.cshtml`

`web.config` 由 .NET SDK 產生，必須保留在發布根目錄。專案的 `apli-website-rebuild.csproj` 已加入 publish target，確保 `Pages/Shared/_Footer.cshtml` 會被複製出去；這是因為 `Program.cs` 會在執行時讀取該 Partial。

### 4. 複製到 IIS 網站根目錄

第一次部署可建立資料夾並複製：

```powershell
New-Item -ItemType Directory -Force C:\Sites\APLI
Copy-Item C:\Deploy\APLI\* C:\Sites\APLI -Recurse -Force
```

確認：

```powershell
Test-Path C:\Sites\APLI\web.config
Test-Path C:\Sites\APLI\wwwroot\index.html
Test-Path C:\Sites\APLI\Pages\Shared\_Footer.cshtml
```

三個結果都應為 `True`。

### 5. 設定資料夾寫入權限

Admin 會修改新聞 JSON 並儲存附件，因此只對必要資料夾授予 `Modify`：

```powershell
New-Item -ItemType Directory -Force C:\Sites\APLI\wwwroot\data
New-Item -ItemType Directory -Force C:\Sites\APLI\App_Data\news

icacls "C:\Sites\APLI\wwwroot\data" `
  /grant "IIS AppPool\APLIWebsite:(OI)(CI)(M)"

icacls "C:\Sites\APLI\App_Data\news" `
  /grant "IIS AppPool\APLIWebsite:(OI)(CI)(M)"
```

不要把整個 `C:\Sites\APLI` 開放寫入。

### 6. 設定系統環境變數

必須在「系統變數」設定，不是目前登入使用者的「使用者變數」：

```text
ASPNETCORE_ENVIRONMENT=Production
Admin__Username=實際後台帳號
Admin__Password=實際後台密碼
```

帳密不可寫入：

- Git
- `appsettings.json`
- `web.config`
- 本文件
- 聊天訊息或截圖

設定環境變數後，重啟 IIS 服務或至少回收 Application Pool，讓新的 IIS worker process 取得變數。

### 7. 建立 IIS Website

在 IIS Manager：

1. 右鍵 **Sites** → **Add Website**。
2. 設定 Site name：`APLI Website`。
3. Physical path：`C:\Sites\APLI`。
4. Application Pool 選 `APLIWebsite`。
5. 測試時可使用 HTTP `8080`。
6. 正式環境需建立 HTTPS `443` Binding、網域與 SSL 憑證。

## 四、修改程式碼後的標準更新流程

### A. 修改 C#、Razor、Program.cs、Services 或 csproj

這些變更必須完整重新發布：

```powershell
Set-Location C:\Users\U096\apli-website-rebuild

dotnet build -c Release

dotnet publish .\apli-website-rebuild.csproj `
  --configuration Release `
  --output C:\Deploy\APLI
```

接著：

1. 在 IIS 停止 `APLI Website`。
2. 停止 `APLIWebsite` Application Pool。
3. 備份 IIS 上的新聞資料與附件。
4. 將 `C:\Deploy\APLI` 複製到 `C:\Sites\APLI`。
5. 確認 `Pages\Shared\_Footer.cshtml` 與 `web.config` 存在。
6. 啟動 Application Pool。
7. 啟動 Website。
8. 測試首頁、About、News 與 `/Admin`。

### B. 只修改 HTML、CSS、JavaScript 或圖片

技術上可以只複製變更檔案，但建議仍使用完整 `dotnet publish`，避免漏掉：

- CSS cache query
- 新增的圖片或 JavaScript
- `web.config`
- 發布 target 所需的檔案

如果只是 CSS，仍要注意修改 HTML 內的 cache query，例如：

```html
css/pages/about.css?v=新的版本字串
```

### C. 只修改環境變數

不需要重新 publish，但需要：

1. 修改「系統環境變數」。
2. 回收 `APLIWebsite` Application Pool，或重啟 IIS。

### D. Admin 修改新聞資料

透過 `/Admin` 新增或修改新聞時，不需要重新發布。資料會直接寫入 IIS 伺服器上的：

```text
C:\Sites\APLI\wwwroot\data\news.json
C:\Sites\APLI\wwwroot\data\news-categories.json
C:\Sites\APLI\App_Data\news\
```

## 五、更新前的資料保護

重新發布前，先備份 IIS 上的可變資料：

```powershell
$backupRoot = "C:\Backups\APLI\$(Get-Date -Format yyyyMMdd-HHmmss)"
New-Item -ItemType Directory -Force $backupRoot

Copy-Item C:\Sites\APLI\wwwroot\data\news.json $backupRoot -Force
Copy-Item C:\Sites\APLI\wwwroot\data\news-categories.json $backupRoot -Force
Copy-Item C:\Sites\APLI\App_Data\news $backupRoot -Recurse -Force
```

不要用會鏡像刪除資料的部署指令覆蓋 `C:\Sites\APLI`，除非已經確認新聞資料與附件有獨立備份。

## 六、目前這次 IIS 問題的修正

第一次部署遇到 HTTP 500.30，Windows Event Log 顯示：

```text
Could not find a part of the path:
C:\Sites\APLI\Pages\Shared\_Footer.cshtml
```

目前已在 `apli-website-rebuild.csproj` 加入 publish target，並完成：

- `dotnet build -c Release`：成功
- `dotnet publish`：成功
- 發布輸出包含 `Pages\Shared\_Footer.cshtml`：確認存在
- `git diff --check`：通過

接下來只需重新發布至 `C:\Deploy\APLI`，再複製到 `C:\Sites\APLI`。

## 七、常見錯誤排查

### HTTP 500.30

先檢查：

1. `.NET 8 Hosting Bundle` 是否安裝。
2. `web.config` 是否在 `C:\Sites\APLI` 根目錄。
3. `apli-website-rebuild.dll` 是否存在。
4. Admin 環境變數是否設定在「系統變數」。
5. Windows Event Viewer → Windows Logs → Application。

### HTTP 500 且畫面顯示無法運作

查看 Event Viewer 的 `.NET Runtime` 記錄。不要只依瀏覽器錯誤頁猜測原因。

### 找不到 Footer Partial

確認：

```powershell
Test-Path C:\Sites\APLI\Pages\Shared\_Footer.cshtml
```

若為 `False`，表示 IIS 尚未取得修正後的 publish output。

### HTTPS redirection 警告

若事件記錄出現 `Failed to determine the https port for redirect`，代表 Production 已啟用 HTTPS redirection，但 IIS 尚未設定 HTTPS Binding。正式環境要建立 443 Binding 與有效憑證。

### Admin 無法儲存新聞或附件

重新檢查：

```powershell
icacls C:\Sites\APLI\wwwroot\data
icacls C:\Sites\APLI\App_Data\news
```

確認 `IIS AppPool\APLIWebsite` 擁有 `Modify` 權限。

### CSS 或 JavaScript 看起來仍是舊版本

確認：

- HTML 內的 CSS query version 已更新。
- IIS 已取得最新檔案。
- 瀏覽器執行強制重新整理。

## 八、官方參考文件

- [Publish an ASP.NET Core app to IIS](https://learn.microsoft.com/en-us/aspnet/core/tutorials/publish-to-iis?view=aspnetcore-8.0)
- [Host ASP.NET Core on Windows with IIS](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/?view=aspnetcore-8.0)
- [.NET Hosting Bundle](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/hosting-bundle?view=aspnetcore-8.0)
- [`web.config` for ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/web-config?view=aspnetcore-8.0)
