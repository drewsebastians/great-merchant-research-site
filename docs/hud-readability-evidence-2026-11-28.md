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
