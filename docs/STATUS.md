# Development Status

**Updated:** 26 November 2026
**Task:** V5.1 P0 — implement the scene-first client shell and battlefield controls
**Plan:** Development Plan v5.1

## Current state

**Production game:** https://drewsebastians.github.io/great-merchant-research-site/game/
**Production game-code commit:** ca683f0b1fe2d6de4af7f95cd626a5312df63006
**Pages deployment:** run 45787017262 succeeded for the slim-header duplicate-label fix.
**Recent visual pass:** commit 05c2607a22aa0c7596d83b4ebaa0079fb648fd28 deployed in run 45786650163; it shortened the client chrome and lower HUD and darkened the contextual-window frame.
**Earlier UI deployment:** run 45766624535 succeeded but the first browser load exposed a stale `#coin-count` lookup; commit c80eaa2 removed the obsolete lookup and added a selector regression check.
**V5.1 specification commit:** c2cb72dc84bfcf9e93bf51e4f587b55f349d950e; Pages run 45762703141 succeeded. This was a documentation-only change.
**Status:** the scene-first redesign, compact-window styling and tablet-width fix are live on `main` and `development/v5-first-playable-slice`. The desktop field, quest window, shop mode and narrow CSS-width layout were checked in the production browser. A public Xian field screenshot dated 14 Jan 2017 has now been visually compared with the deployed client; its client patch and capture date are unknown. The existing save remained day 5, 102 marks and “saved.” The current claim remains “playable prototype; TGM interface fidelity in progress.”

**Pre-implementation repository head:** main and development/v5-first-playable-slice at 79197de751e66580257d7c5c042b2290b7201a08.
**Pre-reset repository baseline:** c57ac16f4ed32f4636b20cc07c814a4805c580f3.
**New rollback checkpoint:** checkpoint/pre-tgm-fidelity-reset-2026-11-26 at c57ac16f4ed32f4636b20cc07c814a4805c580f3.
**Pre-scene-first rollback checkpoint:** checkpoint/pre-scene-first-ui-2026-11-26 at 79197de751e66580257d7c5c042b2290b7201a08.
**Pre-window-visual-pass checkpoint:** checkpoint/pre-window-visual-pass-2026-11-26 at da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f.
**Earlier checkpoints:** checkpoint/pre-v5-2026-11-19 (a1bfc98df853ace84e4894c91361dcc3c5120935); checkpoint/pre-v5-025-2026-11-25 (ccaae5a52f1694dc76be599dd0789f0b8f116423); checkpoint/pre-v5-026-2026-11-25 (3c463e506829818125c0f497f0da410ee250468f); checkpoint/pre-v5-027-2026-11-25 (0635af9b4311ef580196797d53da30af1a19eea3); checkpoint/pre-v5-028-2026-11-25 (6758a4fa0a598e3dfab1386b41c9dee7cd412a63).

**Research source:** great-merchant-research main commit f52446e6a8f25a9cff4fe15a21e63b976df85317, reviewed read-only.
**Encrypted vault:** data/vault.json remains blob 748f8863212c1a2911c53569e7c934293c5e4205. It and all research records/media remain unchanged and excluded from the public game.

## Interface-fidelity reset

The pre-change V5.0 Pack screen was compared with the public official TGM interface guide. The V5.1 implementation replaces the persistent page rail, inventory-card dashboard and right-side quest panel with an original scene-first client, portrait strip, upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Battlefield commands include clickable Move, Attack, Hold, Stop, group selection and Withdraw controls.

The earlier claim that V5.0 represented TGM's general interface is withdrawn. Read [the TGM interface blueprint](tgm-interface-blueprint-v1.md) and [the screen-by-screen review](ui-fidelity-review-v5.md) for the new design authority and acceptance gate. Official guide links and Xian-specific visual comparators are recorded there.

The official interface guide establishes the broad client structure. The general official battle guide documents Ctrl+number group assignment and Esc → Withdraw, with an experience penalty for withdrawing in the first 20 seconds. Neither guide identifies a current Xian client build, so those controls and timing are not treated as verified Xian behavior or implemented as game rules. Public Xian evidence inspected includes a 17 Jan 2016 quest window, a 26 Aug 2019 mercenary-book window, and a 14 Jan 2017 full field screenshot from a tutorial. The 2017 screenshot shows the scene, left portrait stack, upper-right minimap, centered framed windows, and bottom status/chat/menu/date zones; its client patch and capture date are unknown. The deployed client has the same broad zones but uses flatter original scene art, simpler window framing and an extra top brand/location bar. The comparison is recorded; current-version correspondence and visual treatment remain open.

## V5.0 playable foundation retained

- Dependency-free browser/PWA architecture with original SVG scenes and portraits.
- Local versioned save/migrations; town, route, hiring, crew, inventory, trading, quests, recovery and two-route game loop.
- Original encounters, equipment, workbench recipe and settlement ledger.
- English/Indonesian shared UI labels, accessible onboarding, responsive breakpoints and local progress.
- 38 automated tests, content validation, local save/migration checks and PWA shell checks pass after the client rebuild.

These features remain useful prototype systems. The old dashboard arrangement failed the new interface-fidelity gate; the new command deck still uses original prototype turn-based combat resolution and does not claim TGM timing.

## Verification

- Baseline production page showed the V5.0 dashboard and a 102-mark save. After deployment, the corrected client rendered the town scene, left portrait stack, minimap, lower HUD and context windows. Quest and route windows opened and closed; the shop opened in its own mode.
- Production progression remained at day 5 and 102 marks with the save indicator active. No battle, trade or reset action was run against that saved journey.
- Official interface, shortcut and battle-system guides were reviewed. The generic battle guide's Ctrl+number grouping and first-20-second withdrawal penalty are documented with an explicit Xian-version caveat in `docs/ui-fidelity-review-v5.md`.
- `node --check game/app.mjs`, `node --check game/engine.mjs`, `node --test` (38/38), `validateGameContent()` and `git diff --check` all pass.
- Tests cover the redesigned shell, contextual windows, party/travel/trade/quest/battle flow, withdrawal, reload persistence, migrations and PWA cache shell.
- The pre-scene-first checkpoint is anchored at the old remote head; the research repository remains read-only at f52446e6a8f25a9cff4fe15a21e63b976df85317.
- Corrected Pages run 45767255947 succeeded; the production scene and core contextual interactions were visually checked after reload. Automated flow tests cover battle commands and withdrawal without modifying the production save.
- A 779 CSS-pixel browser-width check exposed horizontal overflow; the responsive stack breakpoint moved from 760px to 900px, with a regression assertion added. After deployment run 45784931192 succeeded, browser-zoom emulations at 779px, 681px and 340px showed no visible horizontal scrolling. The follow-up in run 45787017262 removed the duplicate mode chip; at 779px the location title is now legible. These are CSS-width emulations, not physical-device checks.
- Browser offline behavior was not manually toggled because the managed browser reported that DevTools are blocked by organization policy. No policy workaround was attempted. The existing automated service-worker test verifies shell precaching and serving the saved page in its mocked offline path; this is not a live offline-browser check.

## Evidence boundary

Use the official interface and shortcut guides for visible client structure and control categories. Use Xian-specific community screens only as dated, version-scoped comparators. The private research repository's Korean-server findings are not a source for Xian-specific interface, values or rules. Do not publish private research records, source IDs or media. Do not copy TGM client code, screenshots, sprites, logos, maps, music or guide text into the game; author original visual assets and keep prototype values fictional.

## Next work

1. Improve the original field-scene density and reconcile the still-extra brand strip and broad lower-HUD panels with the dated comparison; the compact topbar and dark double-framed windows are now live.
2. Review another Xian-specific frame if accessible, while keeping exact Xian key mappings, click gestures, battle timing and current-version field/window geometry unresolved until suitable evidence verifies them.
3. Perform physical-device, focus and live offline-PWA checks only through available permitted workflows. The managed browser's DevTools policy block remains in effect.
