# Development Handoff

**Updated:** 27 November 2026
**Next task:** P0 — find a version-identifiable Xian field/window frame; keep the fidelity gate open

## Start here

1. Read docs/tgm-interface-blueprint-v1.md for the interface structure, evidence limits and acceptance gate.
2. Read docs/ui-fidelity-review-v5.md for the dated sources, implementation comparison and unresolved checks.
3. Read docs/STATUS.md and docs/BACKLOG.md, then continue the highest-priority unchecked task.
4. Production game: https://drewsebastians.github.io/great-merchant-research-site/game/. Latest implementation commit `4c3ccbdea3be7b2e7f7b784649bcf02ef9e2661f` deployed in Pages run `45988310959`, with PWA shell v21. The System window groups original prototype actions by field/town, shop and battlefield in English and Indonesian; it does not claim Xian key bindings or timing.
5. Preserve the user's existing local game progress. Production checks left the visible save at day 05 / 102 marks; the guide was viewed, the expanded map opened/closed, and the shop opened/closed without a transaction. Indonesian was restored.

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
- Pre-quest-window-scale-pass checkpoint: `checkpoint/pre-quest-window-scale-pass-2026-11-27` at `096e1f9f8564419a3c2b75a553823cbd55d0d0d7`.
- Pre-portrait-context-status checkpoint: `checkpoint/pre-portrait-context-status-2026-11-27` at `6fc1695cb2a92aeed74fa37ef223c9a3a40dbf1d`.
- Pre-expanded-local-map checkpoint: `checkpoint/pre-expanded-local-map-2026-11-27` at `b690d071317bea450abdf52cb72569ef3e1770b2`.
- Pre-mode-controls-guide checkpoint: `checkpoint/pre-mode-controls-guide-2026-11-27` at `3c60a4472b375358cf1886422d33c4bd6322ea59`.
- Code commits include the scene-first rebuild `edde45034b85c93fc900d77d0efbfb345f87ddca`, production render fix `c80eaa217568dee3c6fd4be50736e8d63d3807a5`, tablet-width overflow fix `da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f`, compact styling `05c2607a22aa0c7596d83b4ebaa0079fb648fd28`, duplicate-header-label fix `ca683f0b1fe2d6de4af7f95cd626a5312df63006`, original town art/PWA v4 `a38cbdbeb0e35e57c580f524973e1cc26fcafd7d`, compact utility/HUD `b1b7b0ef6bf43087175bbcbcfab867fe344768f9`, refined window frame `6bcd76e1d2625015227216eb513f1deaa0da8c1f`, notice expiry `f9e94a5f01f4654c1adaa7fe1d2e72dfae6e4daa`, road/quarry art/PWA v5 `1784c24692fda4a904c12bafbd4a174b6773c078`, denser window frame `23fa5361fae682f37be5beb1f5b44d06dde92174`, and PWA shell v6 `2a78f5c27c6196565d01cccbd7ac9711c9bf2447`.
- Latest implementation chain: `c32d9bf` corrects the 2017 screenshot interpretation; `e7c7433` adds original titlebar engraving, equal-height paired windows, a prototype 1:2:1 HUD ratio and shell v15; `d87e94d` refines the quest window as a route ledger; `38834b8` preserves controls during Indonesian localization and advances the shell to v17; `11e1a04` scales the single quest window and advances the shell to v18; `840610e` implements guide-derived right-click portrait-to-Status behavior and shell v19; `188d0c2` adds the expanded local route chart, modal focus handling, Escape close and shell v20; `4c3ccbd` adds the bilingual mode command guide and shell v21. Pages run `45988310959` succeeded for the latest implementation. Rollback point before this change: `checkpoint/pre-mode-controls-guide-2026-11-27` at `3c60a4472b375358cf1886422d33c4bd6322ea59`.
- Pages run 45767255947 succeeded for the scene-first interface; run 45784931192 succeeded for the responsive breakpoint fix. The first scene-first run 45766624535 also succeeded, but browser inspection found a stale dashboard element lookup; it was fixed before the corrected deploy.
- `data/vault.json` is encrypted research. Preserve it byte-for-byte. Do not put private records, source IDs, excerpts or media into the public repository.

## Current implementation and verification

The client uses a scene-first town/field layout with left portraits, an upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Field/town, shop and battlefield modes are distinct. The desktop keeps contextual windows side by side; clicking one brings it forward and Escape closes only the front window. The minimap now opens a larger original route chart with destination status, a focus trap, Escape/button dismissal and focus restoration; map viewing itself does not change the saved journey. Battlefield controls expose Move, Attack, Hold, Stop, group selection and Withdraw. Party, travel, trade, quests, recovery and local saves remain connected. The quest window uses an original route-ledger hierarchy and the localization fix preserves control attributes in Indonesian. The 2019 comparator remains denser and more ornate than this adaptation. The lower HUD and window sizing remain prototype measurements, not Xian dimensions.

Pages run `45961499731` deployed quest-ledger commit `d87e94d`; run `45962041736` deployed `38834b8` and shell v17; run `45965078349` deployed `11e1a04` and shell v18; run `45976274699` deployed `840610e` and shell v19; run `45979347526` deployed `188d0c2` and shell v20; run `45988310959` deployed `4c3ccbd` and shell v21. The latest production browser verified the mode guide in both languages, System close, map open/close, shop open/close without a transaction and the preserved day 05 / 102-mark save; Indonesian was restored. `node --check` on changed modules/tests, all 42 Node tests, content validation and `git diff --check` pass. The development vault blob still matches `748f8863212c1a2911c53569e7c934293c5e4205`; research main remains `f52446e6a8f25a9cff4fe15a21e63b976df85317` and was read-only. Earlier width emulations showed no horizontal scrolling. Physical-device, broader keyboard/accessibility and actual offline-PWA checks remain open.

Recovery note: Pages run `45946939415` for `bc05a2c` completed, but its deployed app initially rendered blank. The browser console identified an `Unexpected identifier 'output'` parse error because the oversized `app.mjs` content passed through a truncated command result before blob creation. Restored the complete app file from `checkpoint/pre-overlap-window-layout-2026-11-27`, verified its Git blob SHA matched the local file, committed `eb007f6`, and confirmed the successful run and live app. For future large API-file writes, request sufficient output capacity and compare the created remote blob SHA to `git hash-object <path>` before moving refs.

Public references rechecked 27 Nov 2026 include the official interface, shortcut and battle-system guides; the official Global Server Update Notice [19/NOV/2026] for Patch V34411, posted 18 Nov and scheduled for 19 Nov; Xian screenshots dated as articles in 2016, 2017 and 2019; and videos published 2023–2026. The notice says Escape closes the UI when the map is maximized. It is Global Server evidence, not Xian-specific evidence, and only informs the prototype's generic map-close affordance. The official interface guide says portrait left-click opens inventory and right-click opens status; the prototype interaction is generic guide-derived behavior. The 14 Jan 2017 screenshot was visibly rechecked, but its capture date/client patch remain unknown. The 2023, 2025 and May 2026 Xian-labelled videos yielded no inspectable frame; their capture builds remain unknown. The campaign calendar is original and the clock is device-local. Exact current-Xian keys, selection gestures, battle timing and field geometry remain unresolved.

## Next concrete actions

- Find an inspectable, dated Xian field/window screenshot or video frame that identifies or narrows the client version. The 14 Jan 2017 image is visible but its capture date and patch are unknown; the 2019 quest panel has the same uncertainty, and the 2023, 2025 and 22 May 2026 players yielded no frame.
- When stronger evidence is available, compare it with the deployed quest panel and lower HUD before changing proportions again. The new 880×580 window and 21px heading are prototype readability choices; the 1:2:1 HUD ratio and current-client geometry remain unresolved.
- DevTools reported an organization policy block during the live offline check. Do not attempt to bypass it. The service-worker unit test passed using a mocked offline path; a permitted real offline workflow is still needed.
- Continue to describe the product as “playable prototype; TGM interface fidelity in progress” until the blueprint gate, including the visual-treatment comparison, is satisfied.
