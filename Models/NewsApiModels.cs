using Microsoft.AspNetCore.Http;
using apli_website_rebuild.Services;

namespace apli_website_rebuild.Models;

public sealed record LoginRequest(string? Username, string? Password, string? Captcha);
public sealed record CategoryRequest(string? Name);
public sealed record NewsSaveRequest(NewsItem Item, IFormFile? ImageFile, IFormFile? AttachmentFile, bool RemoveImage, bool RemoveAttachment);
public sealed record PublicNewsListItem(string Id, string Date, string Tag, string Title, string Content, string ImageUrl, bool HasAttachment, string CreatedAt);
public sealed record PublicNewsDetailItem(string Id, string Date, string Tag, string Title, string Content, string Url, string AttachmentName, string ImageUrl);

