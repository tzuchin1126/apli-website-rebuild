using System.Diagnostics;

namespace apli_website_rebuild.Services;

public class UploadScanner
{
    private readonly IConfiguration _config;
    private readonly ILogger<UploadScanner> _logger;
    private readonly IHostEnvironment _environment;

    public UploadScanner(
        IConfiguration config,
        ILogger<UploadScanner> logger,
        IHostEnvironment environment)
    {
        _config = config;
        _logger = logger;
        _environment = environment;
    }

    public async Task ScanAsync(string filePath, CancellationToken cancellationToken)
    {
        string? scannerPath = FindScannerPath();
        if (scannerPath == null)
        {
            if (_environment.IsDevelopment())
            {
                _logger.LogWarning("Development 環境找不到檔案安全掃描工具，略過掃描以便本機測試上傳。正式環境仍會阻擋未經掃描的檔案。");
                return;
            }

            throw new UploadScanException("目前無法儲存檔案：網站的檔案安全檢查服務尚未啟用，請聯絡系統管理員。", true);
        }

        var startInfo = new ProcessStartInfo(scannerPath);
        startInfo.UseShellExecute = false;
        startInfo.CreateNoWindow = true;
        startInfo.ArgumentList.Add("-Scan");
        startInfo.ArgumentList.Add("-ScanType");
        startInfo.ArgumentList.Add("3");
        startInfo.ArgumentList.Add("-File");
        startInfo.ArgumentList.Add(filePath);

        Process? process = Process.Start(startInfo);
        if (process == null)
        {
            throw new UploadScanException("目前無法儲存檔案：檔案安全檢查服務未正常啟動，請聯絡系統管理員。", true);
        }

        using (process)
        {
            // 全域請求逾時目前是 30 秒，掃描逾時必須更短，才能穩定回傳明確的 503。
            int timeoutSeconds = _config.GetValue<int>("Security:UploadScanning:TimeoutSeconds", 20);
            timeoutSeconds = Math.Clamp(timeoutSeconds, 5, 25);

            using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            timeout.CancelAfter(TimeSpan.FromSeconds(timeoutSeconds));

            try
            {
                await process.WaitForExitAsync(timeout.Token);
            }
            catch (OperationCanceledException)
            {
                process.Kill(true);

                // 使用者自己取消請求，就照原樣往外丟
                if (cancellationToken.IsCancellationRequested)
                {
                    throw;
                }

                throw new UploadScanException("目前無法儲存檔案：檔案安全檢查逾時，請稍後再試。", true);
            }

            // Windows Defender：0 = 沒有威脅，2 = 發現威脅
            // 檔案被 Defender 刪掉的話也視為失敗
            if (process.ExitCode == 0 && File.Exists(filePath))
            {
                return;
            }

            _logger.LogWarning("上傳檔案掃描未通過，ExitCode = " + process.ExitCode);

            if (process.ExitCode == 2)
            {
                throw new UploadScanException("檔案安全掃描發現威脅，檔案未公開。", false);
            }

            throw new UploadScanException("目前無法儲存檔案：檔案安全檢查未完成，請稍後再試。", true);
        }
    }

    private string? FindScannerPath()
    {
        // 1. 設定檔有指定就用設定檔的
        string? configuredPath = _config["Security:UploadScanning:CommandPath"];
        if (!string.IsNullOrWhiteSpace(configuredPath) && File.Exists(configuredPath))
        {
            return configuredPath;
        }

        // 2. Program Files 底下的預設位置
        string programFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
        string defaultPath = Path.Combine(programFiles, "Windows Defender", "MpCmdRun.exe");
        if (File.Exists(defaultPath))
        {
            return defaultPath;
        }

        // 3. ProgramData 底下的 Platform 資料夾，挑版本號最新的
        string appData = Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData);
        string platformFolder = Path.Combine(appData, "Microsoft", "Windows Defender", "Platform");
        if (!Directory.Exists(platformFolder))
        {
            return null;
        }

        string[] versions = Directory.GetDirectories(platformFolder);
        Array.Sort(versions);

        for (int i = versions.Length - 1; i >= 0; i--)
        {
            string path = Path.Combine(versions[i], "MpCmdRun.exe");
            if (File.Exists(path))
            {
                return path;
            }
        }

        return null;
    }
}

public class UploadScanException : Exception
{
    public bool ServiceUnavailable { get; }

    public UploadScanException(string message, bool serviceUnavailable) : base(message)
    {
        ServiceUnavailable = serviceUnavailable;
    }
}
