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
            return [];

        await using var stream = File.OpenRead(filePath);
        return await JsonSerializer.DeserializeAsync<List<NewsItem>>(stream, JsonOptions) ?? [];
    }

    public static async Task WriteAsync(string filePath, List<NewsItem> news)
    {
        var temporaryPath = filePath + ".tmp";
        await using (var stream = File.Create(temporaryPath))
        {
            await JsonSerializer.SerializeAsync(stream, news, JsonOptions);
        }

        File.Move(temporaryPath, filePath, true);
    }
}

public sealed class NewsItem
{
    public string Id { get; set; } = "";
    public string Date { get; set; } = "";
    public string Tag { get; set; } = "";
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public string Url { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public bool Published { get; set; } = true;
    public string CreatedAt { get; set; } = "";
    public string UpdatedAt { get; set; } = "";
}
