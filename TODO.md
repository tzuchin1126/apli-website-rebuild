# TODO

- [x] 2026-09-02: Extended the About Hero image transition from 1.5 seconds to 1.7 seconds for a slightly slower zoom-out.
  - Verified: About Hero resolves to a 1.7-second transform transition after image load, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Extended the About Hero image transition from 1.2 seconds to 1.5 seconds for a slower zoom-out.
  - Verified: About Hero resolves to a 1.5-second transform transition after image load, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Extended the About Hero image return to normal scale from 900ms to 1.2 seconds for a calmer transition.
  - Verified: About Hero resolves to a 1.2-second transform transition after image load, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Changed the About Hero to start its zoom-out only after the image has loaded, matching the TCC-style visible transition while keeping the title animation-free.
  - Verified: the image receives `is-loaded` after loading, uses a 0.9-second transform transition from scale 1.1 to 1 without the shared keyframe animation, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Matched the About Hero image motion more closely to the TCC Organization reference with a 1.1 starting scale, 900ms ease transition, and no Hero title animation.
  - Verified: About Hero resolves to scale 1.1 with a 0.9-second `ease` zoom-out animation, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Smoothed the About Hero zoom-out motion by restoring a 5-second duration and changing the page-scoped easing to `ease-in-out` while keeping the more visible 1.16 starting scale.
  - Verified: About Hero resolves to scale 1.16 with a 5-second `ease-in-out` zoom-out animation, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Increased the About Hero zoom-out starting scale to 1.16 and shortened the duration to 3 seconds for a faster, more visible motion.
  - Verified: About Hero resolves to scale 1.16 with a 3-second zoom-out animation, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Extended the About Hero zoom-out animation from 3 seconds to 5 seconds so the movement remains visible longer.
  - Verified: About Hero resolves to the page-scoped 5-second zoom-out animation, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Shortened the About Hero zoom-out animation from 6 seconds to 3 seconds for a faster image movement.
  - Verified: About Hero resolves to the page-scoped 3-second zoom-out animation, the title remains animation-free, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Updated the About Hero so the image loads from a closer zoom into the normal view while the Hero title appears without an entrance animation.
  - Verified: About Hero image uses the page-scoped 6-second zoom-out animation from scale 1.08 to 1, the title resolves with no animation, and the page has no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Tightened the mobile philosophy card spacing and aligned mobile certification event insets and heights with the desktop presentation.
  - Verified: mobile philosophy card gap resolves to 32px; mobile certification pages use equal left and right 20px insets and all 18 event groups resolve to the same 271px height; desktop event groups remain equal at 324px; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Reordered the mobile About company profile to show the facility image first, followed by the 50+ years lead and then the company description.
  - Verified: at 390px, the rendered order is image, lead, body, and facts; at 1440px, the desktop two-column layout remains unchanged; both sizes have no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Reduced the shared Hero heading scale by removing the 1100px desktop H1 enlargement and aligned the homepage Hero title with the global H1 token so page Hero titles are less oversized across desktop and mobile.
  - Verified: major page Heroes resolve to 48px on desktop and 32px on mobile; the homepage Hero resolves to the same 48px／32px scale after its CSS cache version update; tested pages have no horizontal overflow; Release build, Site/About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Matched the About philosophy section heading underline to the shared short centered orange underline used by the other About section headings.
  - Verified: desktop philosophy and affiliate underlines both resolve to 72px by 2px and centered; mobile philosophy underline resolves to 48px by 2px with no page overflow; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Replaced the affiliate card text arrow with the same diagonal up-right SVG icon used by the About block's `了解更多` action on the homepage; the static Ya-An card remains without an icon.
  - Verified: six linked cards each render a 16px diagonal up-right SVG with default opacity 0, the static Ya-An card has no icon, desktop cards remain 361px by 139px, mobile horizontal scrolling remains enabled with no page overflow, and Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Added a bottom-right forward arrow that appears on hover or keyboard focus for linked About affiliate cards; the static Ya-An card does not receive the indicator.
  - Verified: six linked cards expose the hidden `→` indicator rule, the static Ya-An card has no arrow content, desktop cards remain 361px by 139px, mobile horizontal scrolling remains enabled with no page overflow, and Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Restored the About affiliate cards to the simple Logo-and-description layout, removing the background images and overlays while preserving the desktop three-column and mobile horizontal-scroll behavior.
  - Verified: desktop renders seven 361px by 139px Logo-and-description cards in three columns; mobile renders 320px by 123px cards with horizontal scrolling, no card background image, and no page overflow; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Removed the Logo background blocks, strengthened the full-card overlay, and shortened the About affiliate cards so the images remain understated visual backgrounds.
  - Verified: desktop cards now render at 361px by 301px and mobile cards at 320px by 267px; Logo images have no CSS background, the stronger overlay and reduced image contrast render, and desktop/mobile layouts remain free of horizontal overflow.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Reduced the About affiliate card height and strengthened the image overlay so the background photos remain decorative while the fixed Logo areas and descriptions stay prominent.
  - Verified: desktop cards now render at 361px by 344px and mobile cards at 320px by 305px; the darker overlay and softened image treatment render with readable white descriptions, and desktop/mobile layouts remain free of horizontal overflow.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Updated the About affiliate cards to use existing company and business images as full-card backgrounds, with fixed logo areas and readable descriptions over a bottom gradient while preserving the desktop three-column and mobile horizontal-scroll layouts.
  - Verified: desktop cards render equal 361px by 441px dimensions in three columns with loaded background images and white descriptions; mobile cards render 320px by 390px with horizontal scrolling and no page overflow; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: desktop/mobile visual confirmation, physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Updated the About affiliate descriptions to use full-width separators and changed Ya-An Business Management Consultants to `人力資源服務／人力派遣／企業管理顧問`.
  - Verified: the affiliate descriptions no longer use half-width `/` separators; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Reduced the About affiliate card text to the existing global body-size token (`var(--font-size-body)`) so the descriptions no longer read like oversized headings.
  - Verified: `.about-affiliates__name` resolves to the shared body size and no new font-size variable was added; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Added the Aplus Badminton Team card to the About affiliates overview using the existing team Logo, business description, and affiliate detail link.
  - Verified: the About card Grid now includes the badminton-team entry without changing the existing card structure or responsive behavior; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Updated the About certification timeline year labels to the existing semibold weight token (`600`).
  - Verified: `.about-certifications-preview__year` resolves to `font-weight: 600`; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Restored the About affiliates overview to its original three-column card layout with the original six affiliate entries, Logo treatment, company-name display, and responsive horizontal scrolling behavior.
  - Verified: the network hub and one-sided node selectors are removed from the About affiliates markup/styles; desktop restores a three-column card Grid, mobile restores horizontal scrolling, and Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Removed the visible company-name headings from the About affiliates nodes, leaving only each fixed-size Logo area, business description, and introduction action.
  - Verified: all six nodes use accessible labels, the name class and visible name elements are absent, and the Logo column remains fixed on desktop with responsive sizing on mobile; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Removed the unnecessary `about-affiliates__name` class and used semantic `<strong>` elements for the six affiliate names, retaining the existing typography through the About page selector.
  - Verified: no `about-affiliates__name` class remains in the About markup or styles; Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Reworked the About affiliates overview into a geographic-network layout with one AP hub on the left and six right-side information nodes for APLI, Shih Hsin Container, Aplus Service Station, Aplus Recreation Center, Aplus Badminton Team, and TaiSounds.
  - Verified: the desktop layout uses one hub with a single right-side rail, each node includes the requested existing logo, name, business description, and introduction link, mobile collapses to one column without horizontal overflow, and Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, manual accessibility review, and production deployment rendering.
  - Commit: not created; not requested.

- [x] 2026-09-02: Redesigned the About affiliates overview as a geographic-network style list with a circular AP mark, connector line, subsidiary logo, business description, and introduction action for each existing affiliate.
  - Verified: six affiliate rows render within the shared content container at 1440px and 390px; the desktop rows use the full container width, mobile rows reflow without horizontal overflow, and Release build, About JavaScript syntax, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, manual accessibility review, and final visual review of lazy-loaded subsidiary logos in a production deployment.
  - Commit: not created; not requested.

- [x] 2026-09-02: Added a subtle CSS image treatment to the About philosophy cards (`contrast(0.97) saturate(0.96)`) to soften the strong texture impression without changing the source assets, crop, or image ratio.
  - Verified: the filter resolves on all three philosophy images at desktop and mobile widths with no horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.
- [x] 2026-09-02: Shifted the shared-vision philosophy card image crop slightly right with `object-position: 60% center`, leaving image ratio, card structure, and the other images unchanged.
  - Verified: the third image resolves to `60% center` at desktop and mobile widths with no horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.
- [x] 2026-09-02: Updated the About Hero page title from `關於我們` to `公司簡介` while preserving the shared Hero typography and image settings.
  - Verified: the Hero renders `公司簡介` at desktop and mobile widths with no horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.
- [x] 2026-09-02: Reduced the desktop About Hero image position from 50% to 42% to show less foreground ground area while keeping the shared overlay and mobile position unchanged.
  - Verified: desktop About uses `center 42%`, mobile uses `center 36%`, the standard overlay remains shared with Services, and both widths have no horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.
- [x] 2026-09-02: Kept the About Hero on the shared standard light overlay and shifted only the desktop Hero image position from 36% to 50% so more of the lower image area is visible; mobile positioning remains unchanged.
  - Verified: About and Services use the same computed Hero overlay, desktop About uses `center 50%`, mobile retains `center 36%`, and both widths have no horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Set the Company Profile data numbers to the existing semibold weight token (`600`) and replaced the About Hero quote with the standard centered `關於我們` page title using the shared Hero typography.
  - Verified: all four data values resolve to `font-weight: 600`; the quote and citation are absent; the standard Hero title is present at desktop and mobile widths without horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Set the distinctive Company Profile lead to the existing semibold weight token (`600`) without changing its size, color, spacing, or content.
  - Verified: the lead resolves to `font-weight: 600` at desktop and mobile widths with no horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Reduced the vertical gap between the Company Profile lead and body copy from the previous large spacing to 24px for a more connected content block.
  - Verified: the desktop lead-to-body gap is 24px; mobile preserves the existing lead-to-image-to-body reading order without horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Removed the separator from the Company Profile lead and reduced its size to the existing `var(--font-size-card-title)` token so it reads as introductory copy rather than a section heading.
  - Verified: the lead is one line without the separator, uses the existing Noto Serif TC font and shared color, and remains within desktop and mobile containers; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Restored the Company Profile lead to one consistent normal text style: `50+` is no longer enlarged, all lead text shares one color, and the size now uses the existing `var(--font-size-h2)` token.
  - Verified: all lead parts share the same computed size and color at desktop and mobile widths, Noto Serif TC remains active, and no horizontal overflow is introduced; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Adjusted the Company Profile lead text to a 40px desktop size while keeping a responsive mobile size that fits the one-line layout.
  - Verified: desktop lead resolves to 40px and mobile remains within the content container without horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Enlarged the Company Profile lead by about 30%, increased its weight, added a stronger `50+` emphasis with a lighter `始於 1973`, and tightened the section upward while adding more separation before the body copy.
  - Verified: the lead stays on one line with Noto Serif TC at desktop and mobile widths, the `50+`/secondary hierarchy is applied at the intended larger size, the increased body-copy separation is applied, and no horizontal overflow is introduced; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Removed the English `ABOUT APLI` label from Company Profile, kept the lead copy on one line, and applied the existing Noto Serif TC heading font token.
  - Verified: the lead is one line at desktop and mobile widths without horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Replaced the visible Company Profile heading with the lead copy `50+ 年物流經驗` and `始於 1973`, keeping it as paragraph text rather than a heading while retaining the section accessibility label.
  - Verified: the lead renders as two lines at desktop and mobile widths, existing company content remains intact, and no horizontal overflow is introduced; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Restored the About philosophy card titles to the original text color and removed the temporary `--color-accent-orange` global token.
  - Verified: titles resolve to the existing primary text color at desktop and mobile widths; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Set the new About philosophy card titles to `#e37811` through the global `--color-accent-orange` token.
  - Verified: all three card titles resolve to `rgb(227, 120, 17)` at desktop and mobile widths; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Removed the icons from the new About philosophy cards while preserving the card width, image ratio, text content, and equal-height copy areas.
  - Verified: all three cards render without philosophy icons at desktop and mobile widths; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Matched the new About philosophy card Grid to the same `.site-container` width and side boundaries as the Company Profile section while keeping the three-column layout and existing Gap unchanged.
  - Verified: at 1440px both section containers share the same left and right edges and each philosophy card expands evenly; image ratio, card structure, icons, copy, and equal-height behavior remain unchanged; 390px remains within the viewport.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Added small existing-system icons above each title in the new About philosophy cards, using the mission, values, and vision icon variants with the existing left-aligned layout.
  - Verified: icons render at 28px above all three titles at desktop and mobile widths; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Removed the legacy About philosophy Overlay section and its page-specific interaction/styles, leaving only the new three-column card-style philosophy section.
  - Verified: only the `about-philosophy-editorial` section remains in `about.html`; no legacy philosophy selectors remain under `wwwroot`; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Connected each new About philosophy text area directly to its image and stretched the three desktop `#f7f7f7` copy blocks to equal height.
  - Verified: 1440px image and copy edges connect with equal copy heights; 390px remains a single-column layout with connected image/copy blocks; `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Applied `#f7f7f7` to the text copy area of each new About philosophy item while keeping the images on white and preserving the image-title-copy structure.
  - Verified: 1440px copy widths match image widths and use 24px padding; 390px copy stays within the single-column layout; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Added a new static About philosophy section below the existing interactive philosophy block with three desktop columns in image, title, and description order.
  - Verified: 1440px has three equal 355px by 266px images with left-aligned headings/body copy, white background, no border or shadow; 390px switches to one column without horizontal overflow; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Equalized certification information-card heights across adjacent pages by measuring the tallest desktop information group and applying the shared height to every event block.
  - Verified: 1920px 2010/2000s adjacent cards share 364px width and 271px height; 390px keeps natural 370px card width and remains within viewport; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Equalized About certification information-card backgrounds within each desktop page by stretching the `#f7f7f7` event containers to the shared row height while preserving mobile content height.
  - Verified: 1440px card widths/heights match, 390px card remains within viewport, computed background is `rgb(247, 247, 247)`, and 16px padding remains; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Made the About certifications section transparent and applied `#f7f7f7` to each year information block with internal spacing.
  - Verified: 1440px and 390px computed backgrounds, 16px event padding, and event bounds; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: About certifications now continues the horizontal timeline into the next decade when the current desktop page has fewer years, so 2000s information follows 2010 instead of leaving an empty remainder.
  - Verified: 1440px shows 2010 followed by 2009/2008/2007/2006; 390px keeps single-column paging and event bounds; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Restored About certifications arrow navigation across the 2020s, 2010s, and 2000s while keeping decade tabs available for direct selection.
  - Verified: 1440px and 390px; arrow boundary states, cross-decade next/previous navigation, selected decade state, and existing content alignment; `node --check wwwroot/js/pages/about.js` and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: Fixed About certifications page width and decade-switch alignment so the default 2020s content stays within the viewport and later decades keep the shared left content inset.
  - Verified: 1440px, 1920px, and 390px; initial 2020s content, 2010s first page, 2010s next page, and event bounds; `dotnet build -c Release`, `node --check wwwroot/js/pages/about.js`, and `git diff --check` passed.
  - Not verified: physical touch device, cross-browser validation, and manual accessibility review.
  - Commit: not created; not requested.

- [x] 2026-09-02: About certifications decade controls stay within the selected decade; navigation is required before showing another decade.
  - Verified: 1366px, 1440px, 1920px, and 390px; selected decade content only, control boundaries, initial container alignment, and shared timeline visibility.

- [x] Verified the native About certifications carousel against the TECO-style horizontal interaction: desktop widths, all decade tabs, final scroll position, mouse drag, resize, and mobile viewport all keep one continuous shared timeline visible.
  - Verified: 1366px, 1440px, 1920px, 390px; shared track count 1; right-edge extension present; JS syntax and build checks passed.

- [x] Refactored About certifications carousel to native horizontal scroll/snap behavior, keeping one continuous shared timeline track across the full content width.
  - Verified: pending local browser checks for desktop widths, decade switching, right edge, drag, and resize.

- [x] 參考東元里程碑的水平 carousel 行為，將 About 認證切換改為原生 horizontal scroll／snap；shared timeline 保留在完整 content track 上，避免滑動與切換後主線消失。
  - 已驗證：待完成本機瀏覽器的 1366px／1440px／1920px、年代切換、最右端與拖曳檢查。

- [x] Tightened About certifications timeline: 2px shared orange track, 10px hollow orange dots, smaller year size and vertical structure gaps.
  - Verified: 1366px, 1440px, 1920px; 2020s/2010s/2000s switching; carousel end state; drag interaction; shared track continuity and right-edge extension after resize.
  - Not verified: physical touch device, cross-browser, and manual accessibility review.

- [x] 收緊認證與獎項 timeline：年份約 32–36px、結構 gap 約 16–24px、主線 2px、dot 10px 空心橘框；維持單一 shared track 並延伸至最後節點後。
  - 已驗證：待完成 1366px／1440px／1920px、年代切換、拖曳狀態與 resize 瀏覽器驗證。

- [x] 認證與獎項背景色調整為 `#F7F7F7`，保留既有文字、timeline、dot 與互動行為。
  - 已驗證：建置、JS 語法與 diff 檢查。
  - 未驗證：本次僅色碼調整，未重新進行完整瀏覽器矩陣驗收。

- [x] 認證與獎項背景恢復為上一版淺灰 `#E5E7E9`，保留深色文字、橘色 timeline 與現有 shared track 結構。
  - 已驗證：檔案內容、建置、JS 語法與 diff 檢查。
  - 未驗證：本次僅背景色回復，未重新進行完整瀏覽器矩陣驗收。

- [x] 認證與獎項恢復白色背景，shared timeline 改為 4px 品牌橘色連續主線，dot 改為 12px 橘框白心，並同步維持年份／dot／獎項欄位對齊。
  - 已驗證：1366px、1440px、1920px；2020s／2010s／2000s；carousel 最右頁與 viewport resize；互動 JS 未修改。
  - 未驗證：實體觸控裝置、跨瀏覽器與人工無障礙驗收。

- [x] 認證與獎項背景改為淺灰 `#E5E7E9`，同步將標題、導覽、控制項、獎項文字與 shared timeline track 改用適合淺色背景的深色 token，並將 track 延伸至完整 content 右界。
  - 已驗證：1366px、1440px、1920px；2020s／2010s／2000s；carousel 最後頁與 viewport resize；背景無圖片、shared track 唯一且右界對齊。
  - 未驗證：DevTools 開關、實體裝置、跨瀏覽器與人工無障礙驗收。

## 2026-09-02

- [x] 調整 About Page「認證與獎項」背景、時間軸共用 grid、深色文字配色與獎項列表間距。
  - 已驗證：1440px、1366px、1920px、390px；2020s／2010s 年代切換與左右箭頭；`dotnet build -c Release --no-restore`；`node --check wwwroot/js/pages/about.js`；`git diff --check`。
  - 未驗證：實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 修正認證與獎項區塊的上方留白、全橘色 timeline dot、固定三列結構與單一共用水平線。
  - 已驗證：1440px、1366px、1920px、390px；不同年代資料量與年代切換後的欄位對齊；上述建置、JS 語法與 diff 檢查。
  - 未驗證：實體裝置、跨瀏覽器與人工無障礙驗收。

- [x] 將認證與獎項改為單一深色 token 背景、自然排列的 Awards List，以及 carousel 外層唯一 shared timeline track。
  - 已驗證：1366px、1440px、1920px；逐一切換 2020s／2010s／2000s；左右箭頭、拖曳與 viewport resize；Year／Dot／Awards 對齊、18px item gap、全橘色 dot 與連續線條。
  - 未驗證：實體觸控裝置、跨瀏覽器與人工無障礙驗收。
