using System.Text;
using Microsoft.AspNetCore.StaticFiles;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

var sharedFooterPages = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
{
    "/index.html",
    "/about.html",
    "/affiliates.html",
    "/contact.html",
    "/join.html",
    "/milestones.html",
    "/news-detail.html",
    "/news.html",
    "/occupational-safety.html",
    "/operational-resources.html",
    "/privacy.html",
    "/services.html"
};

const string sharedFooterMarker = "<!-- shared-site-footer -->";

app.Use(async (context, next) =>
{
    var requestPath = context.Request.Path.Value ?? string.Empty;
    var pagePath = requestPath == "/" ? "/index.html" : requestPath;

    if (!HttpMethods.IsGet(context.Request.Method) || !sharedFooterPages.Contains(pagePath))
    {
        await next();
        return;
    }

    var staticPage = app.Environment.WebRootFileProvider.GetFileInfo(pagePath.TrimStart('/'));

    if (!staticPage.Exists)
    {
        await next();
        return;
    }

    var footerPath = Path.Combine(app.Environment.ContentRootPath, "Pages", "Shared", "_Footer.cshtml");
    var footerMarkup = await File.ReadAllTextAsync(footerPath, context.RequestAborted);
    using var staticPageStream = staticPage.CreateReadStream();
    using var reader = new StreamReader(staticPageStream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true);
    var pageMarkup = await reader.ReadToEndAsync(context.RequestAborted);

    if (!pageMarkup.Contains(sharedFooterMarker, StringComparison.Ordinal))
    {
        await next();
        return;
    }

    var responseMarkup = pageMarkup.Replace(sharedFooterMarker, footerMarkup, StringComparison.Ordinal);
    var responseBytes = Encoding.UTF8.GetBytes(responseMarkup);
    context.Response.ContentType = "text/html; charset=utf-8";
    context.Response.ContentLength = responseBytes.Length;
    await context.Response.Body.WriteAsync(responseBytes, context.RequestAborted);
});

app.UseDefaultFiles();
var staticFileContentTypes = new FileExtensionContentTypeProvider();
staticFileContentTypes.Mappings[".avif"] = "image/avif";
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = staticFileContentTypes
});

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
