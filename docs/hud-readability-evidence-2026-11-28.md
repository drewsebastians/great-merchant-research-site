# HUD readability and source-search ledger — 28 November 2026

## Result

No newly inspected image or video frame can be identified as an Xian client screenshot tied to a capture build or patch. The additional 8ternals archive pages provide Indonesian publisher and patch-label metadata, while a `[2.52GS] / TW2` stream remains an uninspectable Taiwan/private-server lead. None links a specific gameplay frame to a known or narrowed client build. Do not infer exact Xian dimensions, control placement, formulas or game rules from these references.

## Historical Indonesian Episode 2

- [Xian TGM Indonesia Episode 2 guide](https://xiantgmindo.blogspot.com/2016/07/game-intro-xian-tgm-indonesia-episode-2.html) is explicitly labeled for the Indonesian Episode 2 context. Retrieval is blocked by an interstitial in this review, and the guide's images are acknowledged as gathered from multiple sites in the existing source record. They do not establish image capture date or patch.
- The archived [8ternals Indonesian publisher homepage, snapshot 17 May 2016](https://web.archive.org/web/20160517205401/http://tgm.8ternals.com/) displays a promotional banner reading “NEW PATCH RELEASE V2.5404.” The banner is marketing artwork, not a gameplay screenshot. The same homepage separately lists a 20 April 2016 update notice. The [Wayback availability record for that notice](https://archive.org/wayback/available?url=http%3A%2F%2Ftgm.8ternals.com%2Fblog%2Fblog%2Fq2w3e4r51qw2%2FwAIMqCsOcLMXvKg160419203148&timestamp=20160430) reports an available capture at 30 April 2016 08:30:31 UTC; its fetched text says “Patch V 2.6019 Notes” and “Patch v.26019.” These are separate publisher-page references; they do not establish the patch shown in any particular screenshot or frame, and their labels should not be reconciled into a capture-build claim.
- The archived [8ternals Feature guide, snapshot 3 November 2015](https://web.archive.org/web/20151103013804/http://tgm.8ternals.com/guide/feature.php), presents Economic, Battle and Social sections with linked feature images. The page gives no capture date or client-build link for those images. Treat it as a historical Indonesian publisher guide, not version-specific gameplay evidence.
- [KotakGame's Episode 2 listing](https://www.kotakgame.com/gamebox/detail/20/4623/) reports a screenshot update dated 27 July 2015. The page returns 403 to the inspection tool, so no image was inspected and no UI evidence was added.
- Existing January 2016 and January 2017 Xian-labeled image leads remain historical; the article dates are not proven capture dates and their client patch/build is unknown.

## Global Server — kept separate

- The official [Global Server notice list](https://www.thegreatmerchant.com/main.gs) lists “Manual Patch Uploaded [v.34411]” on 19 November 2026; the notice concerns downloading that Global patch and contains no qualifying Xian screenshot. See the [official notice](https://www.thegreatmerchant.com/board/bbsNotice.gs?GSbid=95801&GSuid=10605&page=1).
- Current official Global material can help identify Global builds, but cannot be relabeled as Indonesian Episode 2 or Xian evidence.

## Other regional clients — kept separate

- The unofficial [Kirin Merchant community site](https://thekirinmerchant.com/) links a V34300 “new UI” video from a channel labeled HK/TW. This is another regional client lead, not an Xian frame, and it was not used to set HUD dimensions.
- The YouTube stream [“[2.52GS] GSOL (TW2) — One Hour of Grinding”](https://www.youtube.com/watch?v=f3mIBbc0khs), published 6 August 2026, has a description identifying the game as a Taiwan-based private server. The search result exposed its title and description, but the video page fetch was throttled and no gameplay frame was inspectable beyond its cover. The `[2.52GS]` title label is not linked to any specific captured frame or to the Indonesian Xian Episode 2 client; keep it in the Taiwan/private-server lead set.
- Korean-server references are likewise not Xian evidence unless a source independently identifies the Xian server/build.

## Unidentified or mixed-source leads

- The 2016 Indonesian tutorial and the January 2016 quest-guide screenshots have mixed or unknown screenshot provenance; no capture build is established.
- The 14 January 2017 field frame and the 2019 quest-panel comparator remain viewable historical references with unknown capture date/build.
- Xian-labeled 2023, 2025 and 2026 video pages were found, but no inspectable frame could be paired with a confirmed server and footage build. A May 2026 live stream's description explicitly allows “Xian or Global,” so it is ambiguous.
- KotakGame's publication metadata and video descriptions are leads, not screenshot capture metadata.

### Version-labelled login-screen lead — unidentified source scope

- [Software Informer's The Great Merchant listing](https://the-great-merchant.software.informer.com/) identifies developer 8ternals, labels 2.5221 as the latest version and reports listing metadata updated 3 August 2025. Its linked [816×638 login-screen image](https://img.informer.com/screenshots/6117/6117632_1.jpg) visibly has a “Gersang” title bar, “Ver 2.5221” text and an Indonesian safety warning.
- The listing does not connect that screen to Indonesian Xian Episode 2, identify its server, map 2.5221 to an Xian patch, or state the image capture date. This is a version-labelled but otherwise unidentified/mixed-source lead, not a qualifying Xian gameplay frame. No window geometry, control, formula or gameplay detail is inferred from it.
- KotakGame's 2015 screenshot-update metadata remains separate; its image was not inspectable in this review and does not establish the Software Informer image's provenance.

## Implementation boundary

The v25 release responds to the project's own CSS and narrow-viewport layout: labels were 4–6px and nine menu buttons shared a single row on mobile. It sets overview/chat labels to 8–9px, menu labels to 8px across viewports; labels wrap, the menu uses five columns over two rows across desktop and narrow widths, and buttons have a 44px minimum height. These are original usability choices, not measurements or controls learned from TGM. Validation run `46084604216` passed 42/42 existing tests and actual Chromium browser checks at 1363×936, 390×844 and 340×740, including bilingual labels, menu target size, save/reload preservation and v25 offline reload. Pages run `46084804013` succeeded; production CSS and worker match implementation `9c537e5e4973d645ebd9f546dce224758515196d` byte-for-byte, and a read-only live review showed day 05 / 102 marks. Production offline mode was not tested in the user's browser. Gameplay, save schema, original assets and encrypted research vault remain untouched.

## Open fidelity and verification items

Keep “playable prototype; TGM interface fidelity in progress.” The blueprint gate remains open. Physical Android/iOS, broader keyboard/accessibility checks and offline testing in the user's production browser remain open, even if disposable browser validation passes.

## Verified keyboard-focus implementation — 28 November 2026

Implementation `f272f5ee567d3659da16822ddfe32b45cb1fb8a8` adds focus placement when a contextual client window opens or comes to the front, restores focus to the remaining window or originating menu control after close, and prevents the browser's default Escape action while the game closes its active window. The only PWA update is the cache name bump from v25 to v26; no game rules, save fields, art or evidence-derived geometry changed.

Isolated Actions run `46095629624` passed 43/43 existing tests, syntax/content/diff checks, baseline stylesheet/worker checks and actual Chromium scenarios at 1363×936, 390×844 and 340×740. The browser checks covered English/Indonesian labels, focus/open/front/Escape/close paths, unchanged day 05 / 102-mark saves, reload and v26 offline reload in disposable contexts. Pages run `46095920214` deployed the code; the live service worker reports v26, and a read-only production review showed the Indonesian game with day 05 / 102 marks. The run's screenshots are retained as its Actions artifact. The encrypted research repository and vault were not changed. Direct offline testing in the user's production browser remains open.


## Continued source-search pass — 28 November 2026

A follow-up search targeted the archived 8ternals patch record, exact version labels, Indonesian Xian pages, video metadata and indexed images. It produced new leads, but no inspectable field/window frame linked to a known or reasonably narrowed client build.

### Indonesian Episode 2 archive lead

- The [Wayback availability API record for the 20 April 2016 8ternals notice](https://archive.org/wayback/available?url=http%3A%2F%2Ftgm.8ternals.com%2Fblog%2Fblog%2Fq2w3e4r51qw2%2FwAIMqCsOcLMXvKg160419203148&timestamp=20160430) returned `available: true`, status `200`, timestamp `20160430083031` (30 April 2016, 08:30:31 UTC). Opening the returned archived URL directly in this pass displayed “The Wayback Machine has not archived that URL.” Keep the API availability metadata separate from the unavailable replay body. Earlier retrieved notice text labels the page V2.6019; that page still does not link its version to a gameplay frame.
- A [RepeatLoop video titled “AKHIRNYA PENSIUN DIA - XIAN THE GREAT MERCHANT INDONESIA”](https://www.youtube.com/watch?v=WaEp-C710D0) is listed as published 24 August 2022 and is 10:16 long. The page exposed the title and channel metadata, but the player remained black/buffering at 0:00 after one reload. No gameplay frame, server identity for the footage, or client build was inspectable. Treat “Indonesia” in the title as a lead label, not proof of the footage’s server/build.

### Regional/version-label exclusion

- An exact V2.6019 search also surfaced a third-party Japanese blog post that explicitly labels its 20 April 2016 reference as the USA version: [巨商伝 USA version, V2.6019](https://ameblo.jp/kazudenrou/entry-12151385318.html). This is not a primary source and is not Xian evidence. It does not reconcile the Indonesian publisher’s V2.6019 notice with any other regional client; it reinforces that a shared version string alone is insufficient to identify a frame’s server/build.
- Targeted image searches surfaced no new Xian Episode 2 PC gameplay frame. Results included the previously recorded Software Informer 2.5221 login screen and an unrelated modern mobile Great Merchant image; neither adds Xian field/window evidence.

The research repository and its encrypted vault were not accessed or changed. No implementation change is justified by this search; the next task remains finding an inspectable frame with a source that narrows its client build while preserving the Indonesian Episode 2, Global Server, HK/TW and unidentified/mixed-source categories.


## Continued field and contextual-window source search — 28 November 2026

This targeted pass checked dated Indonesian community and editorial pages, a public video description, archive leads, and accessible image/page metadata. It did not find an inspectable field or contextual-window frame tied to a known or reasonably narrowed client build. The development prototype remains unchanged and its TGM fidelity gate stays open.

### Indonesian Episode 2 and community archive leads

- The [Duniaku article dated 6 May 2015](https://duniaku.idntimes.com/game/konsol-pc/event-besar-the-great-merchant-xian-00-ygqb6-lrh6p9/amp) explicitly describes The Great Merchant — Xian Episode 2 and identifies 8ternals as publisher. It says the Coin Collector event included an example screenshot of Aged and Victory Coin totals. The currently accessible AMP rendering showed the text reference but did not render an inspectable example frame at that point. Its publication date is not a screenshot capture date, and the article gives no patch or client-build link. The event and installer links point to old 8ternals pages; a separate Wayback/CDX request for those targets did not return an inspectable API response in this pass, so no archive availability or replay claim is made for them.
- The [LastHero Tautan page](https://lasthero-xian2.blogspot.com/p/blog-page.html) describes a linked personal Google Drive folder as containing Xian screenshots, assets, tools and reference material. The linked folder currently leads to a Google sign-in wall in the browser; the connected Drive fetch returned “File not found.” No folder contents were inspected, and the link is only a lead. The same page points to a [2017 recollection of an offline archive of the old Xian website](https://lasthero-xian2.blogspot.com/2017/04/memoar-xian-lama.html); it does not establish screenshot capture dates or builds.
- A [LastHero screenshot tutorial dated 7 January 2016](https://lasthero-xian2.blogspot.com/2016/01/membuat-screenshot.html) says F12 saved files named sywXXXX in sequence in the Xian/TGM install folder. This documents a community-described capture method and naming convention only; the sequence is not a timestamp or a client-build identifier.
- The [Scribd upload titled “Panduan Resmi Xian The Great Merchant”](https://id.scribd.com/document/709414930/Official-Guide-Book-Vol-1) is a third-party uploaded guide; the document credits SunJian and others, but the available listing does not establish publisher provenance, a capture date or a build for the screenshots it contains. Do not promote the title’s word “Resmi” into proof of official publication.
- The [SellCyber Xian tutorial](https://sellcyber.blogspot.com/2015/02/tutorial-part-1-1-hour.html) and [gold-farming guide](https://sellcyber.blogspot.com/2015/02/gold-farming-guide-part-1.html) provide Indonesian Xian Episode 2 / closed-beta context. The inspected text does not expose a field/window frame linked to a client build. Post dates remain post dates, not screenshot capture dates.

### Regional and mixed-source separation

- A [May 2026 video listing](https://www.youtube.com/watch?v=Q3kx_8KuvU4) describes its subject as “Xian atau The Great Merchant server global” and includes “Full Client 09/02/26” text. The wording mixes Indonesian Xian and Global Server, and the build string is not tied to an inspectable frame. Classify this as mixed-source metadata, not Xian Episode 2 or Global gameplay evidence. The video page could not be fetched in this pass because YouTube throttled the metadata request.
- A [KotakGame Xian Episode 2 listing](https://www.kotakgame.com/gamebox/detail/6/4623/The-Great-Merchant-Xian-Episode-2) search result points to a 2015 release record and a July 2015 screenshot update, but opening the listing returned HTTP 403. No screenshot or build association was inspected.
- The new pass did not change any prior category assignments: Xian Indonesian Episode 2, Global Server, HK/TW, Korea, USA and unidentified/mixed-source material remain separate. Shared title words, version strings, article dates and marketing labels do not identify a frame’s server, capture date or client build.

No source-client image or text was copied into the public development repository. No geometry, controls, formulas, stats or gameplay rules were inferred from these leads. Implementation remains blocked on inspectable evidence that supports a specific change.


## Coin-event screenshot lead: targeted follow-up — 28 November 2026

### Page content inspected

The current non-AMP [Duniaku article](https://duniaku.idntimes.com/game/konsol-pc/event-besar-the-great-merchant-xian-00-ygqb6-lrh6p9) is dated 6 May 2015, 12:13 WIB, by Ferry. It explicitly names The Great Merchant — Xian Episode 2 and says it was published by 8ternals. Its text describes a Coin Collector event running 25–29 May 2015 and says participants could send a screenshot of their Aged Coin and Victory Coin totals to the linked [The Great Merchant Indonesia Facebook page](https://www.facebook.com/tgmindonesia). The article says an example screenshot follows.

Direct inspection of the current article body found no example image in that section. Its current page image is served from a URL with a `/post/20250307/` path and, at 1200×798, is a generic IDN placeholder rather than a game screen: [current article header image](https://image.idntimes.com/post/20250307/upload_0292784930007535995bcd3459ef77ef.png?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75). That current page asset is not the referenced coin-count screenshot. The path is asset metadata, not a screenshot capture date. No screenshot content, client build, server identity beyond the article's Xian Episode 2 context, or capture date was inspected.

The article links the former publisher page [event-big-event-merchant-mayday](http://tgm.8ternals.com/blog/event-big-event-merchant-mayday/) and the Facebook page above. These links are leads in a contemporary editorial article; no page body or post containing the example screenshot was independently inspected.

### Archive and access outcomes

- The [Wayback availability API query for the former event page](https://archive.org/wayback/available?url=http%3A%2F%2Ftgm.8ternals.com%2Fblog%2Fevent-big-event-merchant-mayday%2F&timestamp=201505) with requested timestamp `201505` returned `{"url":"http://tgm.8ternals.com/blog/event-big-event-merchant-mayday/","archived_snapshots":{},"timestamp":"201505"}`. This is availability metadata for that requested timestamp; it returned no replay URL. It does not establish that no capture exists at any other time, and no direct replay body was available to inspect.
- The [CDX query](https://web.archive.org/cdx/search/cdx?url=tgm.8ternals.com%2Fblog%2Fevent-big-event-merchant-mayday%2F&output=json&filter=statuscode%3A200) was reported by the approved web reader as not accessible through that tool; no CDX response was inspected.
- The current former-publisher URL did not load in the cloud browser (`net::ERR_HTTP2_PROTOCOL_ERROR`). The browser policy also rejected the subsequent issue-report action for that legacy HTTP URL, so no origin status or page body was confirmed. The reader's direct open also returned “not accessible via this tool.” Do not describe this as a site-served 403/404 or as proof the page is gone.
- Searches targeting the linked Facebook page did not surface a dated post containing the screenshot. The page itself was not opened.

The older 8ternals 20 April 2016 V2.6019 notice is a separate URL and remains classified separately: its availability record reports a 30 April 2016 capture at 08:30:31 UTC, while direct replay reports “The Wayback Machine has not archived that URL.” Neither outcome links that notice's version label to a gameplay frame.

### Exact search strings

Text searches:

1. `"Aged Coin" "Victory Coin" Xian 8ternals screenshot`
2. `"Aged" "Victory Coin" "Xian" Duniaku screenshot event 2015`
3. `site:tgm.8ternals.com "Victory Coin" Xian event`
4. `"Coin Collector" "Aged Coin" "Xian" 8ternals Indonesia`
5. `"event-big-event-merchant-mayday" 8ternals Wayback`
6. `"event-big-event-merchant-mayday" "Coin Collector"`
7. `site:facebook.com/tgmindonesia "Aged Coin" "Victory Coin"`
8. `site:facebook.com "The Great Merchant Indonesia" "Victory Coin" 2015 event screenshot`
9. `site:lasthero-xian2.blogspot.com 2015 "Aged Coin" "Victory Coin"`
10. `"25 Mei" "Aged Coin" "Victory Coin" "The Great Merchant" Indonesia`
11. `"Coin Collector Event" "Victory Coin" Xian Indonesia 2015 8ternals`
12. `"The Great Merchant Indonesia" "Aged Coin" "2015" screenshot Xian`

Image searches:

1. `"Aged Coin" "Victory Coin" Xian screenshot 8ternals`
2. `Xian Episode 2 Indonesia Coin Collector event Aged Victory Coin screenshot`
3. `"4 Event Besar Menyambut Bulan Mei" screenshot Aged Coin Victory Coin Xian`
4. `"Aged & Victory Coin" The Great Merchant Xian 2015 screenshot`
5. `site:facebook.com/tgmindonesia "Aged" "Victory Coin"`
6. `site:archive.org "event-big-event-merchant-mayday"`

The image-search result inspected was for a modern mobile Great Merchant adaptation and was excluded; it was not an Xian Episode 2 PC frame.

### Classification and result

- **Verified article content:** Duniaku's current article text names Xian Episode 2/8ternals, gives its publication time, dates the event, and refers to an example screenshot. This is contemporary editorial source content, not the screenshot itself.
- **Source metadata:** the 8ternals event URL and Facebook page are linked destinations; the Wayback response above is availability metadata only. The current IDN header placeholder and its URL path describe current page media, not 2015 game capture metadata.
- **Unavailable material:** the referenced coin-count example, the linked old publisher page body, a matching Facebook event post, and any frame-to-build link were not inspectable.
- **Assumptions:** none. Do not infer that the absent example was a field/window screenshot, infer its capture date from the article or asset path, or assign it a patch/build.

No qualifying Xian field/contextual-window frame was found. No interface, controls, geometry, formula, stat, or game rule change is supported. Continue only through a new accessible archive or dated community/publisher post; treat any build-unknown frame as a historical comparator. The research repository remains read-only and no research media was copied.

## Xian Episode 2 publisher-labelled video archive — 28 November 2026

### Directly inspected page and image preview

A new public route, the [YouTube Videos archive for “The Great Merchant(TGM)-Xian Episode2 | Official”](https://www.youtube.com/@thegreatmerchanttgm-xianep7896/videos), was inspected in the browser. At access time the channel page displayed 57 videos and a Facebook link resolving to the public TGM Indonesia page. The page title, channel branding, video titles, displayed “9y ago” age and outbound link are source metadata; channel ownership and the videos’ server/build are not independently confirmed.

The archive lists multiple videos titled as Xian Episode 2 tutorials, including “[TUTORIAL] QUEST NPC japan MASUDASU” and its parts. Their visible preview thumbnails show in-game scenes, a left portrait strip, lower client controls and at least one framed contextual window. These are inspectable thumbnail previews and may be used only as historical visual comparators. The displayed age is approximate upload metadata, not a capture date; no thumbnail or title identifies a patch/build.

The [Part 4 video page](https://www.youtube.com/watch?v=uNeY70_EAR4) identifies an 8:39 Xian Episode 2 tutorial and displays “9y ago,” but its player remained black/loading at 0:00 during inspection. No underlying footage frame, exact publication date, server proof or build label was inspected. Do not treat the poster preview as proof of the footage’s capture build, infer a patch, or retune geometry from it.

### Other new routes that did not qualify

- The [Wadah Games article](https://wadahgames.blogspot.com/2015/11/5-game-online-yang-akan-rilis-di-tahun.html), dated 21 Nov 2015, discusses Xian Episode 2 and names 8ternals and a 13 Feb 2015 OBT date. Its two Xian-related image proxies timed out; the article does not link an inspectable client frame to a build. Record only as historical release-context metadata.
- The [3CUSTOMPAINT article](https://3custompaint.blogspot.com/2016/10/helm-nolan-bertema-game-great-merchant-xian-episode-2.html), dated 2 Oct 2016, describes an 8ternals-commissioned Xian-themed helmet. It is promotional artwork context, not an in-game frame or build record.

### Exact search strings used

1. `"Xian The Great Merchant" screenshot Indonesian forum Kaskus 8ternals`
2. `"The Great Merchant Xian Episode 2" screenshot 2015 Indonesia community`
3. `"Xian TGM Indonesia" patch screenshot forum 8ternals 2015`
4. `"Official Teaser - The Great Merchant (Xian Eps 2)"`
5. `site:youtube.com/watch "Official Teaser" "Xian Eps 2" 8ternals`
6. `site:facebook.com 8ternals "Xian Episode 2" "patch" 2016 screenshot`
7. `"The Great Merchant Xian Episode 2" "Wadah Games" screenshot`
8. `site:blogger.googleusercontent.com "The Great Merchant Xian Episode 2" 2015`
9. `"Official Teaser - The Great Merchant (Xian Eps 2)" 8ternals YouTube`
10. `"The Great Merchant" "Xian Episode 2" gameplay trailer 2015 8ternals`
11. `site:youtube.com/@thegreatmerchanttgm-xianep7896 Xian Episode 2 Official Teaser`

### Classification and result

- **Direct observation:** an inspectable YouTube archive page and its preview thumbnails; a separate linked video page whose player stayed at 0:00.
- **Source metadata:** channel title/branding, titles and approximate upload ages, visible links, and the dated Wadah Games / 3CUSTOMPAINT article text.
- **Unverified or unavailable:** channel ownership, exact video publication dates, frame capture dates, client builds/patches, and the underlying footage from the Part 4 player.
- **Assumptions:** none. Do not assign a build from the channel label, “9y ago,” or the 2015/2016 article dates.
- **Conclusion:** no frame was tied to a known or reasonably narrowed build. The thumbnail previews are historical comparators only. No UI, code, geometry, controls, stats, formulas or game rules change is supported.


## Xian Indonesian community-guide inventory crop — 28 November 2026

### Directly inspected

The [“Tips Saat Melakukan Battle Herding” community guide](https://xiantgmindo.blogspot.com/2017/10/tips-saat-melakukan-battle-herding.html) is dated 6 October 2017 and appears on a blog identifying itself as a Guide for Xian The Great Merchant Episode 2 / Xian TGM Indonesia. Its embedded [syw0008.bmp image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVdbWhlfnARs5sBx90wfi4IGKMeSE531gQMwIdofju9aqTBQOfHzcZSgukKB86Acy4qBpSFL2pjGETVg5uP7BEpICXLdeGdvYLMPoOQQS0Bk_Rva6OZQE__573ibruYv1PP3banlCJyAY/s400/syw0008.bmp) was opened and visually inspected at 328×188 pixels. It shows a cropped inventory window and a selected Herding Command tooltip; it does not show the full field, HUD or client layout.

### Source metadata and limits

The article date is publication metadata, not the screenshot capture date. The blog’s bibliography says its images, videos and article material draw from several sites and player contributions, but gives no image-specific attribution for syw0008.bmp. The image’s capture date, original source, server, client build and patch are unknown. The Indonesian Episode 2 wording identifies the article’s context; it does not independently identify the screenshot’s server/build.

### Classification and result

- **Direct observation:** an inspectable game-interface crop of an inventory window.
- **Source metadata:** a community article dated 6 October 2017 under Indonesian Xian Episode 2 guide context.
- **Unverified or unavailable:** image provenance, capture date, server, client build and patch.
- **Assumptions:** none. Do not infer the image’s server or version from the article context or the item shown.
- **Classification:** unidentified/mixed-source historical comparator, attached to an Indonesian Episode 2 guide post. It cannot establish current-Xian geometry, controls, stats or game rules.

No source image was copied into the development repository. No UI change is supported; keep the fidelity gate open and the product status “playable prototype; TGM interface fidelity in progress.”

## Xian screenshot-instructions page — 28 November 2026

### Directly inspected

The [“Membuat Screenshot” community post](https://lasthero-xian2.blogspot.com/2016/01/membuat-screenshot.html) is dated 7 January 2016. Its embedded example was visually inspected on the page: it is a Windows Explorer view of a Xian/TGM client folder, accompanied by the page caption “contoh file hasil screenshot.” It is not an in-game frame; no field, HUD or game interface is visible.

### Source metadata and limits

The date belongs to the article, not to a gameplay capture. The post is on a community blog identifying itself with Xian versi 2 / Indonesia context, but the file-manager illustration does not identify an in-game screenshot’s capture date, server, client build or patch. Do not use the folder listing to infer those attributes.

### Classification and result

- **Direct observation:** the article embeds a Windows Explorer view, not an inspectable game frame.
- **Source metadata:** community post dated 7 January 2016 under Indonesian Xian guide context.
- **Unverified or unavailable:** any gameplay image’s capture date, server, client build and patch.
- **Assumptions:** none.
- **Classification:** checked, non-qualifying source route; it is not an interface comparator and supplies no build-linked frame.

No image was copied. No UI, geometry, control, stats, formulas or game rules change is supported; keep the fidelity gate open and the product status “playable prototype; TGM interface fidelity in progress.”

## KotakGame Xian catalog lead — 28 November 2026

### Search and source metadata

New searches returned the [KotakGame Gamebox page for The Great Merchant: Xian Episode 2](https://www.kotakgame.com/gamebox/detail/20/4623/). The search-result text identifies the game, lists 8ternals as publisher and AK Interactive as developer, and shows a latest-update entry dated 27 July 2015 labelled “Screenshot Update.” Direct page retrieval returned HTTP 403; the available search result exposes no screenshot, image source or client-build link. No image or game frame was inspected.

Queries used:

- `"Xian TGM" screenshot "version" update site:facebook.com`
- `"The Great Merchant Xian" gameplay screenshot patch notes build`
- `"Xian Episode 2" client screenshot forum patch`
- `"Xian TGM" "screenshot" community blog`
- `site:kotakgame.com/gamebox/detail/20/4623 "Screenshot Update" "Xian Episode 2" images`
- `site:kotakgame.com "The Great Merchant Xian Episode 2" screenshot 27-07-2015`
- `"The Great Merchant: Xian Episode 2" "Screenshot Update"`
- Image search: `site:kotakgame.com/gamebox/detail/20/4623 The Great Merchant Xian Episode 2 screenshots`

### Classification and result

- **Source metadata:** Indonesian game-catalog listing and search-result text; its “Screenshot Update” label is not an inspected image.
- **Unavailable:** page contents beyond the search snippet, any screenshot, image provenance, capture date, server, client build and patch.
- **Assumptions:** none. Do not infer a frame or build from the catalog label.
- **Classification:** Indonesian publisher/catalog metadata lead only; not visual evidence or a historical image comparator.

No retry or alternate route was used after the 403 response. No UI or code change is supported; keep the fidelity gate open and the product status “playable prototype; TGM interface fidelity in progress.”

## RepeatLoop community article image check — 28 November 2026

### Directly inspected

The new [RepeatLoop article, “Xian The Great Merchant, Game Lawas yang tetap menarik”](https://repeatloop.blogspot.com/2018/09/xian-great-merchant-game-lawas-yang-menarik.html), is dated 16 September 2018. Its text describes the Indonesian 8ternals Episode 2 relaunch, reports that service ended in February 2018, and also points readers to a then-current official version under a different publisher. The page’s comments later distinguish Indonesian and Global play. These are statements and comments on that page, not independent verification of either screenshot’s server.

Two linked in-article images were opened and visually inspected:

- The embedded [640×421 image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiuzh1ZQSBJcvtm2oPZU_V5k1LsG0zux_NZj8h6Ot9CeNfWrstw7EIUnDOhLkTN7iyR8zW6XrHlXHW10c_wMlk4wqVVNvDtkQK0AIH_GvRGSShOPK4o7s4ERhgIhGPdlJRExQf2x7PGQgmO/s1600/gambar+karakter.jpg) is a character/country-selection screen with a portrait grid and a character-information panel.
- The [second image](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_FhXBo7yPg0ANy6yDYkyZ0KXecM-lfkk08N2y4O-0vEGBmV6Gk7UO1z-NyN9Z-oy3fm1_RnbSXR5EJi33z-KG69BGKHm5GagfbUFRiXSoCbmbYsVfbUh7bcrZbMzxplLD7YNneLaAe-ea/s1600/1111.jpg) is a 532×751 tall crop (the page embeds a 284×400 version). It shows a field scene, a left-side party portrait stack, lower status/currency areas and chat; the crop does not show a complete client or minimap.

The article associates these images with its Xian discussion, but does not individually attribute them, state their capture dates, or name a server, client build or patch. Its 2018 publication date is not a capture date. Keep both as **unidentified/mixed-source historical comparators attached to Indonesian Episode 2 editorial context**; do not assign either image to Indonesian Episode 2 or Global Server. They add no verified geometry, control, stat, formula or game-rule evidence.

### Other new community routes

- The [Xian TGM Indonesia guide post on elemental attributes](https://xiantgmindo.blogspot.com/2020/08/atribut-element-system-general-guide.html), dated 26 August 2020, describes an element system as a recent update but supplies no client build or image-to-build link. The blog’s own bibliography names Indonesian, Korean, Global and Chinese source sites and player contributions; keep the article’s regional scope unresolved.
- New [The Great Merchant Indonesia community posts](https://xianindo.blogspot.com/2015/12/item-black-market.html) provide dated text guides, not inspectable client frames. A separate trade-route page explicitly discusses an international-server context; do not treat its content as Indonesian Episode 2 evidence.
- The linked MMOiNdo guide and the tgm.astagames.com route did not expose page bodies through the approved reader. No site status, image or build was inferred from those access failures.

### Search strings used

- "The Great Merchant Xian Episode 2" screenshots build patch 8ternals community forum
- site:repeatloop.blogspot.com/2018/09/xian-great-merchant-game-lawas-yang-menarik.html Xian Great Merchant screenshot
- site:xiantgmindo.blogspot.com/2020/08/atribut-element-system-general-guide.html Xian element screenshot
- site:xianindo.blogspot.com/2015 "screenshot" "The Great Merchant Indonesia" patch
- site:xianindo.blogspot.com "Xian Indonesia" "Screenshot" "update"
- site:xianindo.blogspot.com/2016 "Xian Indonesia" screenshot version
- site:tgm.astagames.com Xian The Great Merchant patch update screenshot
- site:facebook.com/tgmindonesia "Xian Episode 2" screenshot patch 2017
- site:mmoindo.club/mmo-indonesia/the-great-merchant Xian screenshot patch build

### Classification and result

- **Direct observation:** two inspectable original images embedded in a dated community article; one character-selection screen and one partial field/HUD/chat crop.
- **Source metadata:** article publication date and its Xian/8ternals narrative; later comments and links refer to distinct Indonesian and Global contexts.
- **Unverified or unavailable:** each image’s provenance, capture date, server, client build and patch; the body of the linked MMOiNdo and Astagames routes.
- **Assumptions:** none. The article date, its service-closure statement and approximate upload or update labels do not identify the screenshots’ build.
- **Conclusion:** no frame was linked to a known or reasonably narrowed Xian build. No UI, code, asset, geometry, control, stats, formula or game-rule change is supported. The research repository remains read-only; no source-client or private-research material was copied.

## New public-route sweep — 28 November 2026

### Result

No newly inspected original gameplay frame could be linked to a known or reasonably narrowed client build. The new routes below provided text or archive metadata only; no image pixels were visually inspected. No new comparator is added, no implementation change is supported, and no capture date, build, server, geometry, control, stat, formula or game rule is inferred. Search-result snippets were treated as leads only. Access redirects and throttling are not evidence of site status.

### New routes inspected

- The [Duniaku article about 2015 online-game releases](https://duniaku.idntimes.com/game/konsol-pc/game-online-terbaru-indonesia-2015-00-hjc4x-jycfg7/amp), published 26 March 2015, identifies The Great Merchant (Xian Episode 2), names 8ternals, and lists an OBT date of 13 February 2015. The accessible article section is text-only; it supplies no gameplay frame, patch label or image-to-build link. These dates are publication/release metadata, not screenshot capture metadata.
- The [Lasthero 2015 archive](https://lasthero-xian2.blogspot.com/2015/) exposes dated post summaries including an event post and an “after maintenance” equipment-upgrade post, with image placeholders. The linked 24 December event post redirected the approved reader to a Google interstitial. No detail-page body or image was inspected, and no patch/build identifier is shown in the accessible archive text. Do not treat “after maintenance” or the post date as a build or capture date.
- The [XianTGMIndo 2016 archive](https://xiantgmindo.blogspot.com/2016/) and [2017 archive](https://xiantgmindo.blogspot.com/2017/) expose dated community-guide summaries and image placeholders. The 2017 archive mentions changes “after patches” without naming a patch. The blog bibliography lists material from Indonesian, Global, Korean and Chinese sites plus player contributions; the blog’s Episode 2 framing does not establish the scope or build of each embedded image. No individual image was opened.
- The [XianTGMIndo game page](https://xiantgmindo.blogspot.com/p/xian-great-merchant.html) displays a client/patch label dated 28 April 2021 and community comments that distinguish a Global client from HK private-server play. It contains no inspectable gameplay frame or image-to-build link. Treat this as community metadata for Global/HK scope only, not as Indonesian Episode 2 evidence; no client download was accessed.
- The [RepeatLoop international patch article](https://repeatloop.blogspot.com/2019/03/download-xian-great-merchant-server-international.html) is dated 26 March 2019 and says the administrator last updated its client link on 25 March. The article identifies its subject as the International server, but contains no inspectable gameplay frame or exact client-build identifier. Keep it in the Global/International evidence bucket, separate from Indonesian Episode 2.
- Direct reader opens of the new [RepeatLoop January 2020 patch page](https://repeatloop.blogspot.com/2020/01/download-xian-great-merchant-patch-januari-2020.html) and [October 2019 patch page](https://repeatloop.blogspot.com/2019/10/download-xian-online-patch-terbaru.html) redirected to a Google interstitial. Their bodies and images were not inspected; make no site-status inference.
- A direct open of the [XianTGM Gallery root](https://xiantgmgalery.blogspot.com/) returned HTTP 429 from the approved reader. No page body or image was inspected; do not infer site status or retry without a new public access path.

No direct page was reopened for the previously blocked KotakGame catalog route. Search results surfaced its metadata again, but it was filtered without another page-access attempt. Previously inspected routes, including the RepeatLoop article images, were not re-opened.

### Search strings used

- `"Xian The Great Merchant Indonesia" screenshot patch update 8ternals`
- `site:tgm.8ternals.com/blog "screenshot" "patch" The Great Merchant Xian`
- `site:xianindo.blogspot.com "Episode 2" "patch" "screenshot" game Xian`
- `"syw000" "Xian" "version" "The Great Merchant Indonesia"`
- `"The Great Merchant Xian Episode 2" "V2." Indonesia 8ternals community screenshot`
- `"The Great Merchant" "Xian Episode 2" screenshots gameplay 8ternals Indonesia 2015`
- `"Xian The Great Merchant" "Update" "2016" patch gameplay screenshot Indonesia`
- `"Xian Indonesia" "Patch" "Version" 8ternals game screenshot blog`
- `site:xiantgmgalery.blogspot.com "screenshot" Xian TGM`
- `site:xiantgmgalery.blogspot.com/2017 Xian screenshot interface`

### Classification and decision

No new visual comparator was established in this pass. Keep Indonesian Episode 2, Global/International, HK/TW, Korea, USA and unidentified/mixed-source evidence separate. Do not infer image scope from a blog label, shared version string, patch date, archive placeholder or article date. Continue only with genuinely new public routes that expose an original inspectable gameplay frame and independently link that specific frame to a known or reasonably narrowed build. No source image, client asset or private research material was copied. The research repository remains read-only; this pass did not open its contents.


## New public-route sweep — 28 November 2026 (follow-up)

Four new public routes were inspected. Two expose gameplay frames in an Indonesian Episode 2 article context, but neither links its specific frame to a named client build or patch. The remaining inspected images are selection screens rather than gameplay. No UI or code change is supported; keep “playable prototype; TGM interface fidelity in progress.”

| Page URL | Publication date | Region/server stated by the page | Explicit build/patch label | Frame-to-build link and classification |
| --- | --- | --- | --- | --- |
| [Pinguo Blogger: 11 game online terbaru](https://pinguoblogger.blogspot.com/2015/11/11-game-online-terbaru-pc-dan-android.html) | 5 Nov 2015 | Indonesian article context; identifies Xian Episode 2 and 8ternals. The frame’s server is unverified. | None. The in-game date display is not capture/build metadata. | A gameplay screenshot with a field and HUD is embedded, but the page does not tie that frame to a build. Unknown-build comparator only. |
| [XianTGMIndo: Perkenalam Xian The Great Merchant](https://xiantgmindo.blogspot.com/2016/07/perkenalam-xian-great-merchant.html?m=0) | 10 Jul 2016 | Indonesian community blog; the text contrasts the earlier Xian appearance with later Episode 2. The image source/scope is not established. | The image visibly carries “2004”; this is not a client build label. | The inspected image is a character-selection screen, not gameplay. No frame-to-build link. |
| [RaGEZONE: The Great Merchant / Kyosyoden request thread](https://forum.ragezone.com/threads/request-%E5%B7%A8%E5%95%86-the-great-merchant-kyosyoden.1263622/) | 10 Apr 2026 | Mixed/unidentified: the post discusses Korean, Chinese/Japanese and Indonesian versions; the attached frame is not assigned to one. | “Ver1.2301” is visible in the attached image, but the post does not attribute that label to the attachment’s client. | The inspected attachment is a character/server-selection screen, not gameplay. The visible version text is not a page-level frame-to-build link. |
| [XianTGMIndo: Game Intro Xian TGM Indonesia Episode 2](https://xiantgmindo.blogspot.com/2016/07/game-intro-xian-tgm-indonesia-episode-2.html) | 10 Jul 2016 | Indonesian Episode 2 guide context; the specific screenshot’s server session is not independently identified. | None. The in-game calendar display is not capture/build metadata. | An embedded gameplay/HUD frame is visually inspectable, but the article gives no patch/build label and does not link that frame to one. Unknown-build comparator only. |

A navigation link on the 2016 XianTGMIndo page led once to the already logged XianTGM game-information route. It resolved to a Google interstitial; it was recognized as a duplicate and not retried or used as evidence. Do not revisit that route without a genuinely new public access path.

Keep Indonesian Episode 2, Global/International, HK/TW, Korea, USA and unidentified/mixed-source evidence separate. No source image or client asset was copied, no private research material was opened, and the production save was not touched.

## New public-route sweep — 28 November 2026 (additional routes)

Six new routes were screened and their accessible page/image states inspected where available. None provides an inspectable gameplay frame directly tied to a named or reasonably narrowed build. Keep their text metadata in the stated source/region bucket; no UI or code change is supported.

| Page URL | Publication date | Region/server stated | Explicit build/patch label | Specific frame linked to build? |
| --- | --- | --- | --- | --- |
| [Tistory: 2016 first update event](https://bongrye001.tistory.com/2075) | 31 Mar 2016 | Not stated; Korean-language blog does not establish server. | None; “2016 first update” is the post title. | No. Inspected images are update/event banners and signup/reward artwork, not gameplay frames. |
| [Bahamut GNN: September 2016 update preview](https://gnn.gamer.com.tw/detail.php?sn=137184) | Search metadata: 9 Sep 2016, 18:50. | Not verified from page content. | Search excerpt mentions a 13 Sep update, but no build/patch label. | Not assessable. The page displayed a maintenance screen; article images were not available. Treat only as an inaccessible search lead. |
| [Nakuz: Hong Kong update announcement thread](https://www.nakuz.com/thread-4509476-1-1.html) | 11 Feb 2015, 16:52:59 | Hong Kong (“港巨”); quoted notice names the HK operator site. | Manual patch file `patch23419.exe`; update scheduled for 12 Feb 2015. | No. The inspected thread contains update text and profile/reply images, with no gameplay frame. |
| [2000Fun: June 2018 update preview](https://www.2000fun.com/102877) | 12 Jun 2018 | Taiwan and Hong Kong servers, as stated in the article. | None; the article says the update was due 13 Jun 2018. | No inspectable frame. The article image elements appeared broken in the page; no image-to-build link can be confirmed. |
| [Nakuz: Update Notice [5/31/2012]](https://www.nakuz.com/thread-4356770-1-1.html) | 31 May 2012, 14:27:03 | Unidentified/mixed. The quoted English notice gives an EST maintenance window but does not identify the server; do not infer one. | “The Great Merchant patch V.22023” dated 30 May 2012. | No. The inspected post is text-only for game evidence; it shows no gameplay frame. |
| [Nakuz: HK/TW version discussion, page 2](https://www.nakuz.com/thread-4540243-2-1.html) | 26 Feb 2017, 10:15:28 (quoted build note dated 21 Dec 2016) | Mixed HK/TW discussion quoting a Korean official-server note; keep the Korean build note separate. | “Korean Gersang v.26800 (official server) — 2016.12.21.” | No. The inspected post quotes build text but contains no gameplay frame tied to it. |

The Bahamut page remains an inaccessible lead, and the 2000Fun image placeholders remain uninspectable; neither is visual evidence. Do not infer capture dates, server, patch, geometry, controls, stats, formulas or rules from publication dates, event dates, a timezone, or quoted metadata. No source screenshot/client asset was copied and the production save was not opened or changed. Product status remains “playable prototype; TGM interface fidelity in progress.” Physical Android/iOS, broader accessibility and direct production-browser offline checks remain open.


## New public-route sweep — 28 November 2026 (follow-up)

No qualifying gameplay frame tied to a named or reasonably narrowed build was found. The inspected regional comparators below remain separate; no Xian geometry, controls, stats, formulas or rules are inferred.

| Page URL | Publication date | Stated region/server | Explicit build/patch label | Specific frame linked to that build? |
| --- | --- | --- | --- | --- |
| [Gamebase update preview](https://news.gamebase.com.tw/news/detail/98913769) | 10 Nov 2017 | Taiwan and Hong Kong servers | None. The article announces a 15 Nov update but gives no version label. | Four in-game interface screenshots are placed with the announced feature descriptions, but none is linked to a named build. Unknown-build TW/HK comparator; no full field frame. Inspected images: [3743104](https://image.gamebase.com.tw/gb_img/4/003/743/3743104.jpg), [3743105](https://image.gamebase.com.tw/gb_img/5/003/743/3743105.jpg), [3743106](https://image.gamebase.com.tw/gb_img/6/003/743/3743106.jpg), [3743107](https://image.gamebase.com.tw/gb_img/7/003/743/3743107.jpg). |
| [Ameblo USA setup article](https://ameblo.jp/kyosyo-radio/entry-12043622277.html) | 27 Jun 2015 | USA version, as stated in the article | Ver 2.5403 is visible on the linked 800×625 client image; this is recorded as a version label, not a patch label. | Yes for that specific character-selection screen: the image itself displays Ver 2.5403, and the article places it after login. It is not an in-game field/gameplay frame; capture date is unstated. Keep in the USA bucket, separate from Xian and Indonesian Episode 2. [Inspected image](https://stat.ameba.jp/user_images/20150627/23/kyosyo-radio/75/6a/j/o0800062513349708797.jpg). |
| [Bahamut GNN Taiwan launch article](https://gnn.gamer.com.tw/detail.php?sn=94497) | Not verified from the page | Not verified | Not verified | Not assessed: direct page open returned 403; no article image was inspectable. Do not classify from search metadata. |
| [Bahamut GNN Hong Kong server article](https://gnn.gamer.com.tw/detail.php?sn=126880) | Not verified from the page | Not verified | Not verified | Not assessed: direct page open returned 403; no article image was inspectable. Do not classify from search metadata. |

The result remains metadata/comparator material only. No source image or client asset was copied; no code or UI change is supported. Keep “playable prototype; TGM interface fidelity in progress.” Continue only through genuinely new public routes, using this ledger as the exclusion list.

## Indonesian-language quest frame — 28 November 2026

The 11 July 2016 [Xian Episode 2 shortcut guide](https://xiantgmindo.blogspot.com/2016/07/menu-dan-fungsi-tombol-shortcut-bagian-2.html) displays [syw0212.bmp](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgv3a6FZOFS8uHmBa1hQMGKL1xZ_FW64YpR_bDW6pO08TtNTaw-wVT9arGXnvekf0_BUlcl1v0XxqGOtMDyUflz86qcQ202KfD5hGu7fhsamjc5n8Rap-mqXEinLn0JAg9BPCbZ342IzQlK/s400/syw0212.bmp), an inspected 400×300 image with Indonesian quest text over an in-game field and a visible lower HUD. The guide gives Indonesian Episode 2 context and credits several sources for its media collectively. The frame itself has no visible build/patch label or source-specific attribution, and its capture date and server are unstated. Retain it as an unidentified/mixed-source historical comparator. It supplies no frame-to-build link or basis for an implementation change.

Other routes screened in the same pass:

| Page URL | Publication date | Stated region/server | Explicit build/patch and frame linkage |
| --- | --- | --- | --- |
| [Community map guide](https://xiantgmindo.blogspot.com/2016/07/map-dan-menu-didalamnya.html) | 16 Jul 2016 | Xian Episode 2 article context; image server unverified. | No build in retrieved text. The article refers to illustrations, but none was visually inspected. |
| [Community combat demo](https://xiantgmindo.blogspot.com/2016/07/video-demo-skill-cowo-china-xiantgm_15.html) | 15 Jul 2016 | Xian Episode 2 article context; footage server unverified. | No build in retrieved text. The embedded player could not be retrieved, so no footage frame was inspected. |
| [HappyTuk pre-download announcement](https://www.mangot5.com/Index/News/NoticeDetail?contentNo=69536) | 6 Aug 2026 on the game listing; platform copy updated 13 Aug | TW publisher context; individual server unstated in the retrieved body. | Upcoming rendering update described without a displayed build number in the inspected material. No gameplay frame was exposed. |
| [HappyTuk update preview and quiz](https://gs.mangot5.com/game/gs/notice/detail?contentNo=70669) | 5 Nov 2026 | TW publisher context; individual server unstated in the retrieved body. | Upcoming update described without a displayed build number in the inspected material. No gameplay frame was exposed. |

## Lasthero battlefield and equipment comparators — 28 November 2026

- [Black Key event report](https://lasthero-xian2.blogspot.com/2015/12/suasana-event-drop-langsung-2-black-key.html), published 24 Dec 2015. The linked original still shows two Indonesian Black Key pickup messages at upper left, a portrait/status block at upper right, a map at lower left and action slots at lower right. The messages match the author's account. The author links the [22 Dec Kolektor III post](https://lasthero-xian2.blogspot.com/2015/12/event-tgm.html), whose [8ternals holiday notice](http://tgm.8ternals.com/blog/event-natal-dan-tahun-baru/) returned HTTP 502 on retrieval. This identifies the event context only.
- [Equipment upgrade report](https://lasthero-xian2.blogspot.com/2015/12/trend-usai-maintenis-upgrade-equipment.html), published 4 Dec 2015. The first captioned JPEG shows a reinforcement dialog at left and character equipment and carried items at right. The second is a separate equipment crop. The author mentions maintenance without identifying a release. The embedded video's “(korea)” title does not establish the server of either still.
- Both are Indonesian-community sources. The specific servers, capture dates and builds are unverified. Retain these as unknown-build comparators. The P0 screen-zone comparison remains open.

## SellCyber character window during the 8ternals closed-beta tutorial — 28 November 2026

The [series introduction](https://sellcyber.blogspot.com/2015/02/sorry-guys-sorry-for-long-wait.html) identifies the author's return to 8ternals after playing International. In the [live February 2015 post sequence](https://sellcyber.blogspot.com/2015/), Part 1 explicitly describes the author's play as closed beta, Parts 2–4 continue that character's progress, and a later post says the beta ended the previous night. The individual publication days, capture dates, server name and patch number were unverified.

- [Part 3](https://sellcyber.blogspot.com/2015/02/tutorial-part-3-2-hour.html), linked original `xian02.jpg`. The author identifies the pictured character and reports 4126 BP at this stage. The crop visibly names Yuni and shows 4126 in the lower HUD. The Character Info window sits beside the visible left portrait column, with the field still visible below. This first-person match and the linked sequence support the Indonesian Episode 2 closed-beta **release phase** for this crop. Exact build and full-screen geometry remain unknown.
- [Part 4](https://sellcyber.blogspot.com/2015/02/tutorial-part-4-2-hours.html), linked original `xian3.jpg`. The author calls out the pictured New Battle Spear. Its name appears in the item tooltip and Yuni appears in the message log. This independently matches the follow-up account. Both crops were inspected directly.
- P0 follow-up: compare open Character Status against the existing portrait column at desktop width. If the window covers portraits, shift that window just enough to keep the column visible. The crops supply no basis for a fixed offset, mobile layout, controls or gameplay rules. Full-screen comparison remains open.
