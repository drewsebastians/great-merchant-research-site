# HUD readability and source-search ledger — 28 November 2026

## Result

No newly inspected image or video frame can be identified as an Xian client screenshot tied to a capture build or patch. Do not use this search to infer exact Xian dimensions, control placement, formulas or game rules. Earlier verified comparators remain historical, version-unknown leads.

## Historical Indonesian Episode 2

- [Xian TGM Indonesia Episode 2 guide](https://xiantgmindo.blogspot.com/2016/07/game-intro-xian-tgm-indonesia-episode-2.html) is explicitly labeled for the Indonesian Episode 2 context. Retrieval is blocked by an interstitial in this review, and the guide's images are acknowledged as gathered from multiple sites in the existing source record. They do not establish image capture date or patch.
- [KotakGame's Episode 2 listing](https://www.kotakgame.com/gamebox/detail/20/4623/) reports a screenshot update dated 27 July 2015. The page returns 403 to the inspection tool, so no image was inspected and no UI evidence was added.
- Existing January 2016 and January 2017 Xian-labeled image leads remain historical; the article dates are not proven capture dates and their client patch/build is unknown.

## Global Server — kept separate

- The official [Global Server notice list](https://www.thegreatmerchant.com/main.gs) lists “Manual Patch Uploaded [v.34411]” on 19 November 2026; the notice concerns downloading that Global patch and contains no qualifying Xian screenshot. See the [official notice](https://www.thegreatmerchant.com/board/bbsNotice.gs?GSbid=95801&GSuid=10605&page=1).
- Current official Global material can help identify Global builds, but cannot be relabeled as Indonesian Episode 2 or Xian evidence.

## Other regional clients — kept separate

- The unofficial [Kirin Merchant community site](https://thekirinmerchant.com/) links a V34300 “new UI” video from a channel labeled HK/TW. This is another regional client lead, not an Xian frame, and it was not used to set HUD dimensions.
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
