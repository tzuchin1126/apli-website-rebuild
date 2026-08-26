using System.Collections.Generic;

namespace apli_website_rebuild.Configuration;

/// <summary>
/// 網站前台頁面的路徑設定。
/// 統一管理「乾淨網址」對應到實際頁面檔案的規則，
/// 以及舊網址（.html 結尾）要導向哪個新網址。
/// </summary>
public sealed class PublicPageOptions
{
    /// <summary>
    /// 目前正式使用的網址對應表。
    /// Key：使用者實際瀏覽的路徑（例如 /about）
    /// Value：對應到的實際頁面檔案（例如 about.html）
    /// 用 OrdinalIgnoreCase 是為了讓網址不分大小寫都能對應到同一頁
    /// （例如 /About 和 /about 視為同一個）。
    /// </summary>
    public Dictionary<string, string> PublicPagePaths { get; init; } = new(StringComparer.OrdinalIgnoreCase)
    {
        ["/"] = "index.html",
        ["/about"] = "about.html",
        ["/affiliates"] = "affiliates.html",
        ["/contact"] = "contact.html",
        ["/careers"] = "careers.html",
        ["/company-history"] = "company-history.html",
        ["/news"] = "news.html",
        ["/occupational-safety"] = "occupational-safety.html",
        ["/operational-resources"] = "operational-resources.html",
        ["/privacy"] = "privacy.html",
        ["/services"] = "services.html",
        ["/404.html"] = "404.html",
        ["/500.html"] = "500.html"
    };

    /// <summary>
    /// 舊網址轉址對應表。
    /// 用於處理舊版網站遺留下來、直接帶 .html 的網址
    /// （例如別人書籤存的 /about.html，或搜尋引擎還沒更新的舊連結）。
    /// Key：舊的 .html 網址，Value：要轉導到的新網址。
    /// 這樣可以避免使用者點到舊連結時看到 404，也有利於 SEO
    /// （搜尋引擎會知道這個頁面已經搬到新網址）。
    /// </summary>
    public Dictionary<string, string> LegacyPageRedirects { get; init; } = new(StringComparer.OrdinalIgnoreCase)
    {
        ["/index.html"] = "/",
        ["/about.html"] = "/about",
        ["/affiliates.html"] = "/affiliates",
        ["/contact.html"] = "/contact",
        ["/careers.html"] = "/careers",
        ["/company-history.html"] = "/company-history",
        ["/news.html"] = "/news",
        ["/occupational-safety.html"] = "/occupational-safety",
        ["/operational-resources.html"] = "/operational-resources",
        ["/privacy.html"] = "/privacy",
        ["/services.html"] = "/services"
    };

    /// <summary>
    /// 共用頁尾（footer）在頁面 HTML 裡的標記字串。
    /// 程式會搜尋這個標記，把它替換成實際的共用頁尾內容，
    /// 這樣所有頁面只要放這一行標記，就不用每個頁面都重複寫一次頁尾。
    /// </summary>
    public string SharedFooterMarker { get; init; } = "<!-- shared-site-footer -->";

    /// <summary>
    /// 共用頁尾的實際檔案路徑，程式會讀取這個檔案的內容，
    /// 拿去替換上面 SharedFooterMarker 標記的位置。
    /// </summary>
    public string SharedFooterPath { get; init; } = "Pages/Shared/_Footer.cshtml";
}