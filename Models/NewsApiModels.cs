using apli_website_rebuild.Services;

namespace apli_website_rebuild.Models;

// 後台登入：帳號、密碼、驗證碼
public record LoginRequest(string? Username, string? Password, string? Captcha);

// 新增分類
public record CategoryRequest(string? Name);

// 儲存新聞：新聞內容 + 有沒有上傳新圖片/附件 + 有沒有按移除
public record NewsSaveRequest(
    NewsItem Item,
    IFormFile? ImageFile,
    IFormFile? AttachmentFile,
    bool RemoveImage,
    bool RemoveAttachment);

// 前台新聞列表用（不含附件網址，只告訴前端有沒有附件）
public record PublicNewsListItem(
    string Id,
    string Date,
    string Tag,
    string Title,
    string Content,
    string ImageUrl,
    bool HasAttachment,
    string CreatedAt);

// 前台新聞內頁用
public record PublicNewsDetailItem(
    string Id,
    string Date,
    string Tag,
    string Title,
    string Content,
    string Url,
    string AttachmentName,
    string ImageUrl);