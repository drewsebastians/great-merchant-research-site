# Development Status

**Updated:** 27 November 2026
**Task:** V5.1 P0 — contextual-window finish and balanced lower HUD
**Plan:** Development Plan v5.1

## Current state

**Production game:** https://drewsebastians.github.io/great-merchant-research-site/game/
**Production game-code commit:** e7c7433ba4b2a157a76650609bc604f6e6211f28
**Latest Pages run:** `45958274697` succeeded for `e7c7433`; PWA shell v15 is deployed.
**Pages deployments:** run `45958274697` succeeded for `e7c7433` with original titlebar engraving, equal-height paired contextual windows, the revised 1:2:1 lower-HUD grid and PWA shell v15. Production browser inspection at 1363×936 CSS pixels measured HUD zones at 337/674/337px and Inventory/Quest windows at 432×440px with a 13px gap. Inventory focus followed by Escape closed only Inventory; Quest remained, the separate shop mode opened, and the visible save stayed at day 05 / 102 marks. No transaction or progression action was performed. Earlier run `45950316946` deployed `c32d9bf` with side-by-side windows and shell v14. Earlier run 45947396844 deployed `eb007f6`; run 45946939415 for `bc05a2c` also reported success, but browser inspection found its app module had been truncated during API upload. `eb007f6` restored the complete module from the checkpoint. Prior runs 45944691666, 45926785566 and 45926424401 deployed the frame, window-focus and initial layered-window work.
**Recent visual passes:** prior changes added independently authored field/route illustrations, scene-first layout and layered window trim. Commit `c32d9bf` placed contextual windows side by side and grouped the lower HUD into three zones. New commit `e7c7433` adds a bespoke SVG engraving to the window titlebar, gives a two-window stack a shared 440px maximum height, sets the desktop lower-HUD grid to 1:2:1 and advances the offline shell to v15. These sizing choices are prototype decisions; the contextual-window treatment is still simpler than the dated Xian quest-panel image.
**Earlier UI deployment:** run 45766624535 succeeded but the first browser load exposed a stale `#coin-count` lookup; commit c80eaa2 removed the obsolete lookup and added a selector regression check.
**V5.1 specification commit:** c2cb72dc84bfcf9e93bf51e4f587b55f349d950e; Pages run 45762703141 succeeded. This was a documentation-only change.
**Status:** `main` and `development/v5-first-playable-slice` were aligned at implementation commit `e7c7433` for the production deployment; the documentation follow-up records the completed visual pass on both branches. The scene-first client, original town/route illustrations, 1:2:1 lower HUD and original framed contextual windows are live. The 14 Jan 2017 screenshot remains a historical comparator with unknown capture date and client patch. The 2019 Repeat Loop image is the available quest-window comparator; the 2023 and 2025 video players yielded no inspectable frames. The claim remains “playable prototype; TGM interface fidelity in progress.”

**Pre-implementation repository head:** main and development/v5-first-playable-slice at 79197de751e66580257d7c5c042b2290b7201a08.
**Pre-reset repository baseline:** c57ac16f4ed32f4636b20cc07c814a4805c580f3.
**New rollback checkpoint:** checkpoint/pre-tgm-fidelity-reset-2026-11-26 at c57ac16f4ed32f4636b20cc07c814a4805c580f3.
**Pre-scene-first rollback checkpoint:** checkpoint/pre-scene-first-ui-2026-11-26 at 79197de751e66580257d7c5c042b2290b7201a08.
**Pre-window-visual-pass checkpoint:** checkpoint/pre-window-visual-pass-2026-11-26 at da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f.
**Pre-town-art pass checkpoint:** checkpoint/pre-town-art-pass-2026-11-26 at 8f2691269d4d9259669c5d49d7157c0309bd2a30.
**Pre-lower-HUD pass checkpoint:** checkpoint/pre-lower-hud-pass-2026-11-26 at a38cbdbeb0e35e57c580f524973e1cc26fcafd7d.
**Pre-window-ornament pass checkpoint:** checkpoint/pre-window-ornament-pass-2026-11-26 at b1b7b0ef6bf43087175bbcbcfab867fe344768f9.
**Pre-visual-refinement checkpoint:** checkpoint/pre-visual-refinement-pass-2026-11-26 at 6a53eee1582f41dba6df0d33fcf0cb21c3f8f289.
**Pre-route-art checkpoint:** checkpoint/pre-route-art-pass-2026-11-26 at f9e94a5f01f4654c1adaa7fe1d2e72dfae6e4daa.
**Pre-window-density checkpoint:** checkpoint/pre-window-density-pass-2026-11-26 at 1784c24692fda4a904c12bafbd4a174b6773c078.
**Pre-multi-window checkpoint:** checkpoint/pre-multi-window-pass-2026-11-27 at 4f75932e0fd572b87590af47185c7f2f240859c6.
**Pre-window-frame-detail checkpoint:** checkpoint/pre-window-frame-detail-2026-11-27 at 65117023dec80b4841aba1f54e1963e0c5a302d2.
**Pre-campaign-date HUD checkpoint:** `checkpoint/pre-campaign-clock-hud-2026-11-27` at `338c430fb51ba608ddf8e5da208d56097ccf5b3f`.
**Pre-overlap-window checkpoint:** `checkpoint/pre-overlap-window-layout-2026-11-27` at `4eb720fec9595bda61c848ab447dca0ffba8ea6f`.
**Pre-client-density-pass checkpoint:** `checkpoint/pre-client-density-pass-2026-11-27` at `eb007f632d0a5830015f33ca48b0391543e1e62e`.
**Pre-window-refinement checkpoint:** `checkpoint/pre-window-refinement-2026-11-27` at `1cf7dc454bb82c994914b68f78657df721f9edf7`.
**Earlier checkpoints:** checkpoint/pre-v5-2026-11-19 (a1bfc98df853ace84e4894c91361dcc3c5120935); checkpoint/pre-v5-025-2026-11-25 (ccaae5a52f1694dc76be599dd0789f0b8f116423); checkpoint/pre-v5-026-2026-11-25 (3c463e506829818125c0f497f0da410ee250468f); checkpoint/pre-v5-027-2026-11-25 (0635af9b4311ef580196797d53da30af1a19eea3); checkpoint/pre-v5-028-2026-11-25 (6758a4fa0a598e3dfab1386b41c9dee7cd412a63).

**Research source:** great-merchant-research main commit f52446e6a8f25a9cff4fe15a21e63b976df85317, reviewed read-only.
**Encrypted vault:** data/vault.json remains blob 748f8863212c1a2911c53569e7c934293c5e4205. It and all research records/media remain unchanged and excluded from the public game.

## Interface-fidelity reset

The pre-change V5.0 Pack screen was compared with the public official TGM interface guide. The V5.1 implementation replaces the persistent page rail, inventory-card dashboard and right-side quest panel with an original scene-first client, portrait strip, upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Battlefield commands include clickable Move, Attack, Hold, Stop, group selection and Withdraw controls.

The earlier claim that V5.0 represented TGM's general interface is withdrawn. Read [the TGM interface blueprint](tgm-interface-blueprint-v1.md) and [the screen-by-screen review](ui-fidelity-review-v5.md) for the new design authority and acceptance gate. Official guide links and Xian-specific visual comparators are recorded there.

The official interface guide establishes broad client structure and describes Stamina as hunger. The general battle guide documents Ctrl+number group assignment and Esc → Withdraw, with an experience penalty for withdrawing in the first 20 seconds; neither official guide identifies a current Xian client build, so these are not asserted as current Xian behavior. The Xian article dated 17 Jan 2016 shows a field/NPC scene, not a quest-window screenshot. The Repeat Loop article dated 26 Aug 2019 contains the inspected quest-panel screenshot. The 14 Jan 2017 tutorial screenshot shows the scene, left portrait stack, upper-right minimap, two centered framed windows side by side with a small gap, and bottom status/chat/menu/date zones; its capture date and client patch are unknown. The 11 Jan 2023 UI video and 28 Mar 2025 newbie-camp video are dated leads, but both players remained black/buffering and yielded no frame for visual verification. All precise current-Xian dimensions, keys, timing and build details remain unresolved.

The HUD keeps an original campaign calendar (four invented 30-day seasons, advancing from the existing journey day) separate from the device-local clock. The clock does not advance game time or represent Xian’s in-client clock. The official interface guide labels a status field “Stamina” and explains it as hunger; this prototype instead labels its food inventory count “Rations” to avoid implying that it reproduces the source status metric. The side-by-side window placement follows the visible arrangement in the historical screenshot, but its prototype width and gap are not Xian measurements.

## V5.0 playable foundation retained

- Dependency-free browser/PWA architecture with original SVG portraits and original illustrated town, road and quarry scene JPEGs; the app shell precaches all three scenes.
- Local versioned save/migrations; town, route, hiring, crew, inventory, trading, quests, recovery and two-route game loop.
- Original encounters, equipment, workbench recipe and settlement ledger.
- English/Indonesian shared UI labels, accessible onboarding, responsive breakpoints and local progress.
- 39 automated tests, content validation, local save/migration checks and PWA shell checks pass after the client rebuild.

These features remain useful prototype systems. The old dashboard arrangement failed the new interface-fidelity gate; the new command deck still uses original prototype turn-based combat resolution and does not claim TGM timing.

## Verification

- Baseline production page showed the V5.0 dashboard and a 102-mark save. After deployment, the corrected client rendered the town scene, left portrait stack, minimap, lower HUD and context windows. Quest and route windows opened and closed; the shop opened in its own mode.
- Original Hearthcross, Mosswind Road and Amber Quarry illustrations are 1199×675 JPEGs. The current v8 shell precaches the road and quarry scenes alongside the existing app shell. The production browser showed Hearthcross as the scene background; both route assets returned as 1199×675 images.
- The deployed app uses shell v15 after `e7c7433`, and its new SVG engraving is listed in the PWA precache. Automated service-worker tests cover shell installation and offline fallback; live offline mode remains unverified because the managed browser blocks DevTools.
- Commit `b1b7b0e` removes the separate wordmark, keeps save/help/reset in a 28px utility strip and reduces the desktop HUD from 160px to 118px. Commit `6bcd76e` removes the window eyebrow and adds original corner bevels. The latest production check left the existing save at day 05 / 102 marks; no progression action was performed.
- Commit `23fa536` adds a stepped inset bevel, original corner rivets and a double-edged title bar. The deployed shop window opened and closed correctly; the dated Xian window remains more densely ornamented.
- Pages run `45926424401` deployed the first layered-window version; run `45926785566` deployed the front-window focus refinement. In production, inventory and quest windows were open together without dimming the scene; clicking inventory focused it, and Escape closed that front window while leaving quest open. The shop window entered shop mode. No transaction, battle, reset or recovery action was performed.
- Production progression remained at day 5 and 102 marks with the save indicator active. No battle, trade or reset action was run against that saved journey.
- Official interface, shortcut and battle-system guides were reviewed. The generic battle guide's Ctrl+number grouping and first-20-second withdrawal penalty are documented with an explicit Xian-version caveat in `docs/ui-fidelity-review-v5.md`.
- `node --check game/app.mjs`, `node --test` (39/39), `node scripts/validate-game-content.mjs` and `git diff --check` all pass.
- The new window-stack render and focus behavior is covered by tests; all 39 tests pass after commit `4e1e930`.
- Commit `aa86f74` adds an original inset window rail with midpoint fittings and updates the shell cache to v9. Production Pages run 45944691666 succeeded; the deployed inventory/quest stack showed the new rail, click-to-focus and Escape-to-close behavior, and saved progress stayed at day 05 / 102 marks. All 39 tests, syntax checks, content validation and `git diff --check` pass.
- Commit `4eb720f` adds the explicitly labeled campaign calendar and device-local time, renames the prototype food count to Rations, and updates the shell to v10. Production showed day 05, 102 marks, a saved indicator and the local clock; the status window opened and Escape closed it. At 1363 CSS px, document width equaled viewport width.
- Commit `bc05a2c` changes the desktop two-window placement to a more visible overlap and updates the shell to v11. The first API upload accidentally embedded a truncation notice at the top of `app.mjs`; run 45946939415 completed but the browser exposed the parse failure. The rollback branch at 4eb720f supplied the exact complete source; the restored file’s local Git blob SHA was checked against the API blob before the `eb007f6` repair commit.
- Pages run `45947396844` completed successfully for `eb007f6`. At the time, production showed overlapping inventory/quest windows; selecting the exposed Inventory titlebar brought it forward, and Escape closed it to reveal Quest. This layout was later superseded by `c32d9bf` after the 2017 screenshot interpretation was corrected. The app log showed no game-module error. The existing save remained day 05 / 102 marks with the saved indicator active; no purchase, travel, battle, recovery or reset was performed.
- Pages run `45950316946` deployed the candidate. On the canonical production URL after service-worker refresh, the 1363 CSS-pixel viewport showed three lower-HUD zones at 303/690/354px; document width equaled viewport width. Inventory and Quest windows measured 432px each with a 13px gap. Clicking the exposed Inventory titlebar raised it, Escape closed it to reveal Quest, and the distinct Hearthcross shop mode opened. No transaction was performed; the save remained day 05 / 102 marks with its saved indicator active.
- Pages run `45958274697` deployed commit `e7c7433`. At 1363×936 CSS px the lower HUD measured 337/674/337px (1:2:1); Inventory and Quest measured 432×440px with a 13px gap. Focusing Inventory and pressing Escape closed it while leaving Quest open. The shop mode opened and returned to the field. The visible save remained day 05 / 102 marks. No transaction or progression action was performed.
- Tests cover the redesigned shell, contextual windows, party/travel/trade/quest/battle flow, withdrawal, reload persistence, migrations and PWA cache shell.
- The pre-scene-first checkpoint is anchored at the old remote head; the research repository remains read-only at f52446e6a8f25a9cff4fe15a21e63b976df85317.
- Corrected Pages run 45767255947 succeeded; the production scene and core contextual interactions were visually checked after reload. Automated flow tests cover battle commands and withdrawal without modifying the production save.
- Browser-zoom emulations at 175%, 200% and 400% (about 779px, 681px and 340px CSS widths) showed no horizontal scrolling after the notice fix; at 400%, the transient sale notice dismissed and the saved date/currency remained visible. These are CSS-width emulations, not physical-device checks.
- Browser offline behavior was not manually toggled because the managed browser reported that DevTools are blocked by organization policy. No policy workaround was attempted. The existing automated service-worker test verifies shell precaching and serving the saved page in its mocked offline path; this is not a live offline-browser check.

## Evidence boundary

Use the official interface and shortcut guides for visible client structure and control categories. Use Xian-specific community screens only as dated, version-scoped comparators. The private research repository's Korean-server findings are not a source for Xian-specific interface, values or rules. Do not publish private research records, source IDs or media. Do not copy TGM client code, screenshots, sprites, logos, maps, music or guide text into the game; author original visual assets and keep prototype values fictional.

## Next work

1. Continue the P0 visual comparison using the dated 2019 quest-panel image for window detail and the 2017 full-client image for field structure. The new engraved titlebar and HUD ratio are independent prototype interpretations; compare remaining density and panel organization without copying source art or claiming exact Xian dimensions.
2. Revisit the 2023/2025 videos or another newer Xian frame only when an inspectable frame is available. Keep exact Xian keys, selection gestures, battle timing, date-clock behavior and current-client geometry unverified unless direct evidence establishes them.
3. Perform physical-device, keyboard/accessibility and live offline-PWA checks only through permitted workflows. DevTools remains blocked by browser policy; do not work around that restriction.
