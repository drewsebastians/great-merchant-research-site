# Development Handoff

**Updated:** 27 November 2026
**Next task:** P0 — compare the deployed quest ledger and lower HUD against dated Xian interface references; refine original styling where supported, and keep the fidelity gate open

## Start here

1. Read docs/tgm-interface-blueprint-v1.md for the interface structure, evidence limits and acceptance gate.
2. Read docs/ui-fidelity-review-v5.md for the dated sources, implementation comparison and unresolved checks.
3. Read docs/STATUS.md and docs/BACKLOG.md, then continue the highest-priority unchecked task.
4. Production game: https://drewsebastians.github.io/great-merchant-research-site/game/. Latest deployed game-code commit is `38834b8df1f19d80bd22f5ff3bcec8c5addfbda4` in Pages run `45962041736`, with PWA shell v17. The quest ledger filters and detail selection, route-chart action, Escape close, and shop return were checked in production; the visible save remained day 05 / 102 marks.
5. Preserve the user's existing local game progress. The browser check left it at day 5 and 102 marks, with its save indicator active.

## Repository and recovery

- Development repo: drewsebastians/great-merchant-research-site.
- Research repo: drewsebastians/great-merchant-research. Read-only; do not modify it.
- Pre-reset main/development baseline: c57ac16f4ed32f4636b20cc07c814a4805c580f3.
- Pre-scene-first checkpoint: checkpoint/pre-scene-first-ui-2026-11-26 at 79197de751e66580257d7c5c042b2290b7201a08.
- Pre-window-visual-pass checkpoint: checkpoint/pre-window-visual-pass-2026-11-26 at `da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f`.
- Pre-town-art checkpoint: `checkpoint/pre-town-art-pass-2026-11-26` at `8f2691269d4d9259669c5d49d7157c0309bd2a30`.
- Pre-lower-HUD checkpoint: `checkpoint/pre-lower-hud-pass-2026-11-26` at `a38cbdbeb0e35e57c580f524973e1cc26fcafd7d`.
- Pre-window-ornament checkpoint: `checkpoint/pre-window-ornament-pass-2026-11-26` at `b1b7b0ef6bf43087175bbcbcfab867fe344768f9`.
- Pre-visual-refinement checkpoint: `checkpoint/pre-visual-refinement-pass-2026-11-26` at `6a53eee1582f41dba6df0d33fcf0cb21c3f8f289`.
- Pre-route-art checkpoint: `checkpoint/pre-route-art-pass-2026-11-26` at `f9e94a5f01f4654c1adaa7fe1d2e72dfae6e4daa`.
- Pre-multi-window checkpoint: `checkpoint/pre-multi-window-pass-2026-11-27` at `4f75932e0fd572b87590af47185c7f2f240859c6`.
- Pre-window-ornament-detail checkpoint: `checkpoint/pre-window-ornament-detail-2026-11-27` at `3366b2ebf759a4f24c4cd2a3f3c6c563e025bbd8`.
- Pre-window-frame-detail checkpoint: `checkpoint/pre-window-frame-detail-2026-11-27` at `65117023dec80b4841aba1f54e1963e0c5a302d2`.
- Pre-campaign-date HUD checkpoint: `checkpoint/pre-campaign-clock-hud-2026-11-27` at `338c430fb51ba608ddf8e5da208d56097ccf5b3f`.
- Pre-overlap-window checkpoint: `checkpoint/pre-overlap-window-layout-2026-11-27` at `4eb720fec9595bda61c848ab447dca0ffba8ea6f`.
- Pre-client-density-pass checkpoint: `checkpoint/pre-client-density-pass-2026-11-27` at `eb007f632d0a5830015f33ca48b0391543e1e62e`.
- Pre-window-refinement checkpoint: `checkpoint/pre-window-refinement-2026-11-27` at `1cf7dc454bb82c994914b68f78657df721f9edf7`.
- Pre-quest-journal-refinement checkpoint: `checkpoint/pre-quest-journal-refinement-2026-11-27` at `71fbfc999115f9cb661629ce44fc9278277a1de9`.
- Code commits include the scene-first rebuild `edde45034b85c93fc900d77d0efbfb345f87ddca`, production render fix `c80eaa217568dee3c6fd4be50736e8d63d3807a5`, tablet-width overflow fix `da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f`, compact styling `05c2607a22aa0c7596d83b4ebaa0079fb648fd28`, duplicate-header-label fix `ca683f0b1fe2d6de4af7f95cd626a5312df63006`, original town art/PWA v4 `a38cbdbeb0e35e57c580f524973e1cc26fcafd7d`, compact utility/HUD `b1b7b0ef6bf43087175bbcbcfab867fe344768f9`, refined window frame `6bcd76e1d2625015227216eb513f1deaa0da8c1f`, notice expiry `f9e94a5f01f4654c1adaa7fe1d2e72dfae6e4daa`, road/quarry art/PWA v5 `1784c24692fda4a904c12bafbd4a174b6773c078`, denser window frame `23fa5361fae682f37be5beb1f5b44d06dde92174`, and PWA shell v6 `2a78f5c27c6196565d01cccbd7ac9711c9bf2447`.
- Latest implementation chain: `c32d9bf` corrects the 2017 screenshot interpretation; `e7c7433` adds original titlebar engraving, equal-height paired windows, a 1:2:1 HUD ratio and shell v15; `d87e94d` refines the quest window as a route ledger; `38834b8` preserves structural controls during Indonesian localization and advances the shell to v17. Before this documentation update, both branches were aligned at `38834b8`.
- Pages run 45767255947 succeeded for the scene-first interface; run 45784931192 succeeded for the responsive breakpoint fix. The first scene-first run 45766624535 also succeeded, but browser inspection found a stale dashboard element lookup; it was fixed before the corrected deploy.
- `data/vault.json` is encrypted research. Preserve it byte-for-byte. Do not put private records, source IDs, excerpts or media into the public repository.

## Current implementation and verification

The client uses a scene-first town/field layout with left portraits, an upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Field/town, shop and battlefield modes are distinct. The desktop keeps contextual windows side by side; clicking one brings it forward and Escape closes only the front window. Battlefield controls expose Move, Attack, Hold, Stop, group selection and Withdraw. Party, travel, trade, quests, recovery and local saves remain connected. The quest window now uses an original route-ledger hierarchy: All/Open/Completed filters, contract selection, focused detail, progress, milestones and a route-chart action. Filter state is UI-only and does not alter the saved journey. The localization fix keeps control classes and `data-*` values intact in Indonesian. The 2019 comparator remains denser and more ornate than this adaptation. The lower HUD and window sizing remain prototype measurements, not Xian dimensions.

Pages run `45961499731` deployed quest-ledger commit `d87e94d`; run `45962041736` deployed commit `38834b8` and shell v17. At 1363×936 CSS px, production checks covered All/Open/Completed filters, contract selection/detail updates, the empty state, route-chart action, Escape close, shop mode returning to field, and the save remaining day 05 / 102 marks. No purchase or progression action was performed. The 39-test suite, syntax checks, content validator and `git diff --check` passed. Earlier browser-width emulations at about 779px, 681px and 340px CSS width showed no horizontal scrolling. Physical-device, keyboard/accessibility and live offline-PWA checks remain open.

Recovery note: Pages run `45946939415` for `bc05a2c` completed, but its deployed app initially rendered blank. The browser console identified an `Unexpected identifier 'output'` parse error because the oversized `app.mjs` content passed through a truncated command result before blob creation. Restored the complete app file from `checkpoint/pre-overlap-window-layout-2026-11-27`, verified its Git blob SHA matched the local file, committed `eb007f6`, and confirmed the successful run and live app. For future large API-file writes, request sufficient output capacity and compare the created remote blob SHA to `git hash-object <path>` before moving refs.

Public references rechecked 27 Nov 2026 include the official interface, shortcut and battle-system guides; a 17 Jan 2016 Xian field/NPC image (not a quest-window frame); the 26 Aug 2019 Repeat Loop quest-panel image; the 14 Jan 2017 full field screenshot; and community videos published 11 Jan 2023 and 28 Mar 2025. The 2017 screenshot shows left-side portraits, an upper-right minimap, a scene-first field, two centered framed windows side by side with a small gap, and bottom status/chat/menu/date controls, but its capture date and client patch are unknown. The official interface guide says Stamina is hunger. The 2025 video description labels 06:44 “UI Xian,” but its player remained black/buffering at 0:00; no frame was visually verified. The campaign calendar is original and the clock is device-local, not a verified mapping of Xian date/time behavior. Official guide controls and timing do not establish current Xian mappings. Exact keys, selection gestures, battle timing and current field geometry remain unresolved.

## Next concrete actions

- Compare the deployed route ledger and lower HUD with the 2019 quest-panel image and the 2017 full-client screenshot. Record which hierarchy differences remain, then make another original refinement only if the references support it; keep all dimensions labeled as prototype choices.
- Revisit a newer Xian field reference only if a video frame or current-build screenshot becomes inspectable. Keep client-version uncertainty visible and do not claim exact Xian details.
- DevTools reported an organization policy block during the live offline check. Do not attempt to bypass it. The service-worker unit test passed using a mocked offline path; a permitted real offline workflow is still needed.
- Continue to describe the product as “playable prototype; TGM interface fidelity in progress” until the blueprint gate, including the expanded visual-treatment comparison, is satisfied.
