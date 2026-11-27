# Inventory and Status Reference Evidence — 27 November 2026

This note keeps three evidence tracks separate. Publication date, server identity, screenshot capture date and client build are distinct fields; none can stand in for another. Only the broad visual hierarchy below informed an original prototype adaptation. No source image, text, asset or control mapping was copied into the public game.

## Track A — Historical Indonesian Episode 2 guide context

- [Game Intro Xian TGM Indonesia Episode 2](https://xiantgmindo.blogspot.com/2016/07/game-intro-xian-tgm-indonesia-episode-2.html) is an Indonesian guide explicitly framed around Xian TGM Indonesia Episode 2 and published 10 July 2016. Its article text describes character/mercenary, inventory and overview functions. The page exposes a 1600×1205 image named `window.jpg`; the inspected frame broadly shows a character block, equipment area and carried-goods grid within an open inventory window.
- Companion page [Perkenalam Xian The Great Merchant](https://xiantgmindo.blogspot.com/2016/07/perkenalam-xian-great-merchant.html) acknowledges mixed article, image and video sources, including `lasthero-xian2.blogspot.com`, `gersang.co.kr`, `thegreatmerchant.com` and `gersangjiang.com`. This prevents attributing the `window.jpg` frame to the Indonesian client with confidence.
- Evidence classification: **Indonesian Episode 2 editorial context; screenshot client/server and capture build unresolved**. Article publication is not screenshot capture date. Treat the frame only as a historical, mixed-provenance comparator for the broad inventory/status relationship. Do not infer exact geometry, slot counts, controls, formulas or patch.

## Track B — Global Server

- [The Great Merchant Global Server livestream](https://www.youtube.com/watch?v=Q3kx_8KuvU4) is titled `[LIVE] Farming Santai The Great Merchant`, published 9 May 2026. Its description explicitly identifies the Global Server and mentions a Full Client date of 09/02/26.
- The video page and stream metadata were inspectable, but the player remained at 0:00 without a usable frame during review. The described client date is not tied to an inspectable frame or proven to be the footage build.
- Evidence classification: **Global Server metadata lead only; no frame-level Inventory or Status evidence**. Keep it separate from the Indonesian and unidentified-client tracks.

## Track C — Unidentified or mixed-provenance clients

- [Duniaku's 6 May 2015 event article](https://duniaku.idntimes.com/game/konsol-pc/event-besar-the-great-merchant-xian-00-ygqb6-lrh6p9/amp) is a contemporary Episode 2 / 8ternals-era screenshot lead. No Inventory or Status frame from it has been inspected or tied to a specific client build.
- [LastHero Xian2 archive](https://lasthero-xian2.blogspot.com/p/blog-page.html) is a mixed archive lead with material spanning multiple servers. It is useful for finding candidate pages, but not for assigning a client identity without page-level provenance.
- Evidence classification: **unidentified until an inspectable frame is tied to a named server**. A Xian label, repost or archive location alone does not identify the client or patch.

## Prototype response and limits

The Inventory window now groups the currently selected crew portrait and existing HP/Focus values, the currently equipped field weapon, then the existing item cards and actions. The Status window places the existing prototype summary above a selected-character profile and keyboard/touch-accessible crew selectors. Selection is transient UI state; it does not enter the save schema. These are original readability choices using existing local game data, not a reconstruction of the reference geometry.

The displayed values remain prototype values. No STR/AGY/VIT/WIS fields or Xian formula were added. The release changes presentation and cache version only: no gameplay rules, original assets, save key/schema/migrations, or research data changed.

## Evidence needed before a fidelity claim

For an Inventory/Status screen to graduate from comparator to version-scoped reference, obtain an inspectable frame, source context that identifies the server, a capture date distinct from publication date where possible, and a defensible client/build or patch link. Until those are established, keep Indonesian Episode 2, Global Server and unidentified-client evidence separate; do not infer exact dimensions, controls, formulas or patch. The overall blueprint gate remains open.

## Implementation validation and release

The presentation pass was isolated on `candidate/inventory-status-research-2026-11-27`, commit `be7ddd88e5b25fee9fdbbc9a7f63c29f21a53457`, with rollback checkpoint `checkpoint/pre-inventory-status-pass-2026-11-27` at `936f6eae66896c14e0e4c0e0016e7da9a0d9900b`. GitHub Actions validation run `46009842569` passed the 42 existing tests, content/syntax validation, source/save-preservation diff checks, desktop paired windows, mobile widths 390×844 and 340×740, English/Indonesian labels, selector save preservation, reload and offline reload using a disposable browser profile. Pages run `46010209631` deployed PWA shell v24. Direct production review confirmed both updated windows and the existing day 05 / 102-mark game state after reload. Production offline mode was not tested in the user's browser. Research main and encrypted vault remained read-only and unchanged.
