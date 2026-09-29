using apli_website_rebuild.Services;

namespace apli_website_rebuild.Middleware;

public class PublicPageMiddleware
{
    private readonly RequestDelegate _next;
    private readonly PublicPageRenderer _renderer;

    public PublicPageMiddleware(RequestDelegate next, PublicPageRenderer renderer)
    {
        _next = next;
        _renderer = renderer;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        string requestPath = context.Request.Path.Value ?? "";
        string? html = await _renderer.TryRenderAsync(context, requestPath, context.RequestAborted);

        // null = 這個網址不是公開頁面，交給下一個 middleware
        if (html == null)
        {
            await _next(context);
            return;
        }

        // 空字串 = 轉址或 404 已經處理完了，不用再輸出內容
        if (html == "")
        {
            return;
        }

        await _renderer.WriteHtmlResponseAsync(context, html, context.RequestAborted);
    }
}

public static class PublicPageMiddlewareExtensions
{
    public static IApplicationBuilder UsePublicPages(this IApplicationBuilder app)
    {
        return app.UseMiddleware<PublicPageMiddleware>();
    }
}