using System.Globalization;
using System.Text.Json;

namespace apli_website_rebuild.Services;

public static class NewsService
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        WriteIndented = true
    };

    public static async Task<List<NewsItem>> ReadAsync(string filePath)
    {
        if (!File.Exists(filePath))
        {
            return [];
        }

        await using var stream = File.OpenRead(filePath);
        var news = await JsonSerializer.DeserializeAsync<List<NewsItem>>(stream, JsonOptions);
        return news ?? [];
    }

    // 先寫到 .tmp 檔案,寫完再改名蓋過正式檔案。
    // 這樣就算寫到一半當機或斷電,原本的 news.json 也不會壞掉,最多是白做工。
    public static async Task WriteAsync(string filePath, List<NewsItem> news)
    {
        var temporaryPath = filePath + ".tmp";

        await using (var stream = File.Create(temporaryPath))
        {
            await JsonSerializer.SerializeAsync(stream, news, JsonOptions);
        }

        File.Move(temporaryPath, filePath, overwrite: true);
    }

    // 舊資料若缺少 ID 或意外出現重複 ID，啟動時補成唯一值，避免詳細頁連結變成 /news/。
    public static async Task<int> RepairMissingOrDuplicateIdsAsync(string filePath)
    {
        var news = await ReadAsync(filePath);
        var usedIds = new HashSet<string>(StringComparer.Ordinal);
        var repairedCount = 0;

        foreach (var item in news)
        {
            if (!string.IsNullOrWhiteSpace(item.Id) && usedIds.Add(item.Id))
            {
                continue;
            }

            item.Id = CreateUniqueId(usedIds);
            repairedCount++;
        }

        if (repairedCount > 0)
        {
            await WriteAsync(filePath, news);
        }

        return repairedCount;
    }

    public static string CreateUniqueId(IEnumerable<NewsItem> news)
    {
        var usedIds = news
            .Where(item => !string.IsNullOrWhiteSpace(item.Id))
            .Select(item => item.Id)
            .ToHashSet(StringComparer.Ordinal);

        return CreateUniqueId(usedIds);
    }

    private static string CreateUniqueId(HashSet<string> usedIds)
    {
        string id;

        do
        {
            id = Guid.NewGuid().ToString("N");
        }
        while (!usedIds.Add(id));

        return id;
    }

    // 一則新聞要「已發布」而且「日期不是未來」,前台才看得到
    public static bool IsPublicNewsItem(NewsItem item)
    {
        if (!item.Published)
            return false;

        var isValidDate = DateOnly.TryParseExact(
            item.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out var date);

        if (!isValidDate)
            return false;

        var today = DateOnly.FromDateTime(DateTimeOffset.UtcNow.ToOffset(TimeSpan.FromHours(8)).DateTime);
        return date <= today;
    }

    /// <summary>
    /// 依最新排序：CreatedAt 降冪 → Date 降冪 → Id 降冪。
    /// 公開 API 與靜態頁面伺服器端渲染共用同一份排序規則,確保兩邊顯示的順序一致。
    /// </summary>
    public static List<NewsItem> SortByLatest(IEnumerable<NewsItem> items) => items
        .OrderByDescending(item => ParseCreatedAt(item.CreatedAt))
        .ThenByDescending(item => item.Date)
        .ThenByDescending(item => item.Id)
        .ToList();

    // CreatedAt 萬一格式壞掉或是空字串,就當作最舊的資料處理,排到最後面
    private static DateTimeOffset ParseCreatedAt(string value) =>
        DateTimeOffset.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.None, out var createdAt)
            ? createdAt
            : DateTimeOffset.MinValue;
}

public sealed class NewsItem
{
    public string Id { get; set; } = "";
    public string Date { get; set; } = "";
    public string Tag { get; set; } = "";
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public string Url { get; set; } = "";
    public string AttachmentName { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public string ImageName { get; set; } = "";
    public bool Published { get; set; } = true;
    public string CreatedAt { get; set; } = "";
    public string UpdatedAt { get; set; } = "";
}
