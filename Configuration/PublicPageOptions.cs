using System.Collections.Generic;

namespace apli_website_rebuild.Configuration;

public sealed class PublicPageOptions
{
    public Dictionary<string, string> PublicPagePaths { get; init; } = new(StringComparer.OrdinalIgnoreCase)
    {
        ["/"] = "index.html",
        ["/about"] = "about.html",
        ["/affiliates"] = "affiliates.html",
        ["/contact"] = "contact.html",
        ["/careers"] = "careers.html",
        ["/company-history"] = "company-history.html",
        ["/future-outlook"] = "future-outlook.html",
        ["/news"] = "news.html",
        ["/occupational-safety"] = "occupational-safety.html",
        ["/operational-resources"] = "operational-resources.html",
        ["/privacy"] = "privacy.html",
        ["/services"] = "services.html",
        ["/404.html"] = "404.html",
        ["/500.html"] = "500.html"
    };

    public Dictionary<string, string> LegacyPageRedirects { get; init; } = new(StringComparer.OrdinalIgnoreCase)
    {
        ["/index.html"] = "/",
        ["/about.html"] = "/about",
        ["/affiliates.html"] = "/affiliates",
        ["/contact.html"] = "/contact",
        ["/careers.html"] = "/careers",
        ["/company-history.html"] = "/company-history",
        ["/future-outlook.html"] = "/future-outlook",
        ["/news.html"] = "/news",
        ["/occupational-safety.html"] = "/occupational-safety",
        ["/operational-resources.html"] = "/operational-resources",
        ["/privacy.html"] = "/privacy",
        ["/services.html"] = "/services"
    };

    public string SharedFooterMarker { get; init; } = "<!-- shared-site-footer -->";

    public string SharedFooterPath { get; init; } = "Pages/Shared/_Footer.cshtml";
}
