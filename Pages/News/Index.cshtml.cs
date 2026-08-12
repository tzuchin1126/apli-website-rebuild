using System.Globalization;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace apli_website_rebuild.Pages.News;

public class IndexModel(IWebHostEnvironment environment) : PageModel
{
    private readonly IWebHostEnvironment environment = environment;

    public IReadOnlyList<NewsItem> Items { get; private set; } = [];
    public IReadOnlyList<string> Categories { get; private set; } = [];

    public async Task OnGetAsync()
    {
        var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var dataDirectory = Path.Combine(environment.WebRootPath, "data");

        await using var newsStream = System.IO.File.OpenRead(Path.Combine(dataDirectory, "news.json"));
        Items = (await JsonSerializer.DeserializeAsync<List<NewsItem>>(newsStream, jsonOptions) ?? [])
            .Where(item => item.Published)
            .OrderByDescending(item => ParseCreatedAt(item.CreatedAt))
            .ThenByDescending(item => item.Date)
            .ThenByDescending(item => item.Id)
            .ToList();

        await using var categoriesStream = System.IO.File.OpenRead(Path.Combine(dataDirectory, "news-categories.json"));
        Categories = await JsonSerializer.DeserializeAsync<List<string>>(categoriesStream, jsonOptions) ?? [];
    }

    public sealed class NewsItem
    {
        public string Id { get; init; } = "";
        public string Date { get; init; } = "";
        public string Tag { get; init; } = "";
        public string Title { get; init; } = "";
        public string Content { get; init; } = "";
        public string Url { get; init; } = "";
        public string AttachmentName { get; init; } = "";
        public string ImageUrl { get; init; } = "";
        public string ImageName { get; init; } = "";
        public bool Published { get; init; }
        public string CreatedAt { get; init; } = "";
    }

    private static DateTimeOffset ParseCreatedAt(string value) =>
        DateTimeOffset.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.None, out var createdAt)
            ? createdAt
            : DateTimeOffset.MinValue;
}
