namespace apli_website_rebuild.Configuration;

public class PublicPageOptions
{
    // 網址 → wwwroot 底下要讀的 html 檔
    public Dictionary<string, string> PublicPagePaths { get; set; } =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
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

    // 舊的 .html 網址 → 新網址（永久轉址）
    public Dictionary<string, string> LegacyPageRedirects { get; set; } =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
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

    // html 檔裡放這個標記的地方，會被換成共用 footer
    public string SharedFooterMarker { get; set; } = "<!-- shared-site-footer -->";

    public string SharedFooterPath { get; set; } = "Pages/Shared/_Footer.cshtml";
}