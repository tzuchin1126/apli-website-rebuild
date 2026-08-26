using Microsoft.AspNetCore.Http;
using apli_website_rebuild.Services;

namespace apli_website_rebuild.Middleware;

public sealed class PublicPageMiddleware
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
        var requestPath = context.Request.Path.Value ?? string.Empty;
        var result = await _renderer.TryRenderAsync(context, requestPath, context.RequestAborted);

        if (result is null)
        {
            await _next(context);
            return;
        }

        if (!string.IsNullOrEmpty(result))
        {
            await _renderer.WriteHtmlResponseAsync(context, result, context.RequestAborted);
        }
    }
}

public static class PublicPageMiddlewareExtensions
{
    public static IApplicationBuilder UsePublicPages(this IApplicationBuilder app)
    {
        return app.UseMiddleware<PublicPageMiddleware>();
    }
}