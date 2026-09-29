using System.Globalization;
using System.Text.Json;

namespace apli_website_rebuild.Services;

public static class NewsService
{
    private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true,
        WriteIndented = true
    };

    public static async Task<List<NewsItem>> ReadAsync(string filePath)
    {
        if (!File.Exists(filePath))
        {
            return new List<NewsItem>();
        }

        using var stream = File.OpenRead(filePath);
        List<NewsItem>? news = await JsonSerializer.DeserializeAsync<List<NewsItem>>(stream, JsonOptions);

        if (news == null)
        {
            return new List<NewsItem>();
        }

        return news;
    }

    // 先寫到 .tmp 檔案,寫完再改名蓋過正式檔案。
    // 這樣就算寫到一半當機或斷電,原本的 news.json 也不會壞掉,最多是白做工。
    public static async Task WriteAsync(string filePath, List<NewsItem> news)
    {
        string temporaryPath = filePath + ".tmp";

        // 這組大括號不能省，要先把檔案關掉才能改名
        using (var stream = File.Create(temporaryPath))
        {
            await JsonSerializer.SerializeAsync(stream, news, JsonOptions);
        }

        File.Move(temporaryPath, filePath, true);
    }

    // 舊資料若缺少 ID 或出現重複 ID，啟動時補成唯一值，避免詳細頁連結變成 /news/。
    public static async Task<int> RepairMissingOrDuplicateIdsAsync(string filePath)
    {
        List<NewsItem> news = await ReadAsync(filePath);
        var usedIds = new HashSet<string>();
        int repairedCount = 0;

        foreach (NewsItem item in news)
        {
            bool idIsBad = string.IsNullOrWhiteSpace(item.Id) || usedIds.Contains(item.Id);

            if (idIsBad)
            {
                item.Id = CreateUniqueId();
                repairedCount++;
            }

            usedIds.Add(item.Id);
        }

        if (repairedCount > 0)
        {
            await WriteAsync(filePath, news);
        }

        return repairedCount;
    }

    public static string CreateUniqueId()
    {
        return Guid.NewGuid().ToString("N");
    }

    // 一則新聞要「已發布」而且「日期不是未來」,前台才看得到
    public static bool IsPublicNewsItem(NewsItem item)
    {
        if (!item.Published)
        {
            return false;
        }

        bool isValidDate = DateOnly.TryParseExact(
            item.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly date);

        if (!isValidDate)
        {
            return false;
        }

        // 用台灣時間（UTC+8）算「今天」，這樣伺服器放在哪個時區都一樣
        DateTime taiwanNow = DateTime.UtcNow.AddHours(8);
        DateOnly today = DateOnly.FromDateTime(taiwanNow);

        return date <= today;
    }

    // 依最新排序：CreatedAt 新的在前 → Date 新的在前 → Id 大的在前。
    // 公開 API 與靜態頁面伺服器端渲染共用這份排序，確保兩邊順序一致。
    public static List<NewsItem> SortByLatest(IEnumerable<NewsItem> items)
    {
        var result = new List<NewsItem>(items);
        result.Sort(CompareByLatest);
        return result;
    }

    private static int CompareByLatest(NewsItem a, NewsItem b)
    {
        // 要「新的排前面」，所以是 b 跟 a 比，不是 a 跟 b 比
        int result = ParseCreatedAt(b.CreatedAt).CompareTo(ParseCreatedAt(a.CreatedAt));
        if (result != 0)
        {
            return result;
        }

        result = string.CompareOrdinal(b.Date, a.Date);
        if (result != 0)
        {
            return result;
        }

        return string.CompareOrdinal(b.Id, a.Id);
    }

    // CreatedAt 萬一格式壞掉或是空字串,就當作最舊的資料,排到最後面
    private static DateTimeOffset ParseCreatedAt(string value)
    {
        bool ok = DateTimeOffset.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTimeOffset createdAt);

        if (ok)
        {
            return createdAt;
        }

        return DateTimeOffset.MinValue;
    }
}

public class NewsItem
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