using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace apli_website_rebuild.Pages.News;

public class DetailModel(IWebHostEnvironment environment) : PageModel
{
    private readonly IWebHostEnvironment environment = environment;

    public IndexModel.NewsItem? Item { get; private set; }

    public async Task<IActionResult> OnGetAsync(string id)
    {
        var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var dataPath = Path.Combine(environment.WebRootPath, "data", "news.json");
        await using var stream = System.IO.File.OpenRead(dataPath);
        var items = await JsonSerializer.DeserializeAsync<List<IndexModel.NewsItem>>(stream, jsonOptions) ?? [];
        Item = items.FirstOrDefault(item => item.Published && item.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
        return Item is null ? NotFound() : Page();
    }
}
