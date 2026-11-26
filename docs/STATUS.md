# Development Status

**Updated:** 26 November 2026
**Task:** V5.1 P0 — implement the scene-first client shell and battlefield controls
**Plan:** Development Plan v5.1

## Current state

**Production game:** https://drewsebastians.github.io/great-merchant-research-site/game/
**Production game-code commit:** c80eaa217568dee3c6fd4be50736e8d63d3807a5
**Pages deployment:** run 45767255947 succeeded for the corrected client.
**Earlier UI deployment:** run 45766624535 succeeded but the first browser load exposed a stale `#coin-count` lookup; commit c80eaa2 removed the obsolete lookup and added a selector regression check.
**V5.1 specification commit:** c2cb72dc84bfcf9e93bf51e4f587b55f349d950e; Pages run 45762703141 succeeded. This was a documentation-only change.
**Status:** the scene-first redesign is live on `main` and `development/v5-first-playable-slice`, and the desktop field, quest/route windows and shop mode were verified in the production browser. The existing save still showed day 5, 102 marks and “saved.” The current claim remains “playable prototype; TGM interface fidelity in progress.”

**Pre-implementation repository head:** main and development/v5-first-playable-slice at 79197de751e66580257d7c5c042b2290b7201a08.
**Pre-reset repository baseline:** c57ac16f4ed32f4636b20cc07c814a4805c580f3.
**New rollback checkpoint:** checkpoint/pre-tgm-fidelity-reset-2026-11-26 at c57ac16f4ed32f4636b20cc07c814a4805c580f3.
**Pre-scene-first rollback checkpoint:** checkpoint/pre-scene-first-ui-2026-11-26 at 79197de751e66580257d7c5c042b2290b7201a08.
**Earlier checkpoints:** checkpoint/pre-v5-2026-11-19 (a1bfc98df853ace84e4894c91361dcc3c5120935); checkpoint/pre-v5-025-2026-11-25 (ccaae5a52f1694dc76be599dd0789f0b8f116423); checkpoint/pre-v5-026-2026-11-25 (3c463e506829818125c0f497f0da410ee250468f); checkpoint/pre-v5-027-2026-11-25 (0635af9b4311ef580196797d53da30af1a19eea3); checkpoint/pre-v5-028-2026-11-25 (6758a4fa0a598e3dfab1386b41c9dee7cd412a63).

**Research source:** great-merchant-research main commit f52446e6a8f25a9cff4fe15a21e63b976df85317, reviewed read-only.
**Encrypted vault:** data/vault.json remains blob 748f8863212c1a2911c53569e7c934293c5e4205. It and all research records/media remain unchanged and excluded from the public game.

## Interface-fidelity reset

The pre-change V5.0 Pack screen was compared with the public official TGM interface guide. The V5.1 implementation replaces the persistent page rail, inventory-card dashboard and right-side quest panel with an original scene-first client, portrait strip, upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Battlefield commands include clickable Move, Attack, Hold, Stop, group selection and Withdraw controls.

The earlier claim that V5.0 represented TGM's general interface is withdrawn. Read [the TGM interface blueprint](tgm-interface-blueprint-v1.md) and [the screen-by-screen review](ui-fidelity-review-v5.md) for the new design authority and acceptance gate. Official guide links and Xian-specific visual comparators are recorded there.

The official guide establishes the broad client structure, but its exact build applicability to Xian and detailed key/timing behavior remain unresolved. Public Xian evidence inspected includes a 17 Jan 2016 quest window and a 26 Aug 2019 mercenary-book window. Neither shows the main field HUD. The 2025 walkthrough's UI chapter would not load in the review browser. Comparing an accessible Xian field frame against the implementation remains a P0 task.

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
- Official guide screenshot and interface descriptions were inspected directly; the official shortcuts page was reviewed. Public Xian references and version limits are recorded in `docs/ui-fidelity-review-v5.md`.
- `node --check game/app.mjs`, `node --check game/engine.mjs`, `node --test` (38/38), `validateGameContent()` and `git diff --check` all pass.
- Tests cover the redesigned shell, contextual windows, party/travel/trade/quest/battle flow, withdrawal, reload persistence, migrations and PWA cache shell.
- The pre-scene-first checkpoint is anchored at the old remote head; the research repository remains read-only at f52446e6a8f25a9cff4fe15a21e63b976df85317.
- Corrected Pages run 45767255947 succeeded; the production scene and core contextual interactions were visually checked after reload. Automated flow tests cover battle commands and withdrawal without modifying the production save.

## Evidence boundary

Use the official interface and shortcut guides for visible client structure and control categories. Use Xian-specific community screens only as dated, version-scoped comparators. The private research repository's Korean-server findings are not a source for Xian-specific interface, values or rules. Do not publish private research records, source IDs or media. Do not copy TGM client code, screenshots, sprites, logos, maps, music or guide text into the game; author original visual assets and keep prototype values fictional.

## Next work

1. Find and inspect an accessible Xian field-screen frame from a public video or screenshot, then compare it with the deployed scene and official guide.
2. Check a narrow viewport and actual offline PWA behavior.
3. Keep exact Xian key mappings, click gestures, battle timing and current-version field/window geometry unresolved until Xian evidence verifies them.
