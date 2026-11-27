# Development Handoff

**Updated:** 27 November 2026
**Next task:** P0 — continue the dated Xian window/HUD comparison; keep the fidelity gate open

## Start here

1. Read docs/tgm-interface-blueprint-v1.md for the interface structure, evidence limits and acceptance gate.
2. Read docs/ui-fidelity-review-v5.md for the dated sources, implementation comparison and unresolved checks.
3. Read docs/STATUS.md and docs/BACKLOG.md, then continue the highest-priority unchecked task.
4. Production game: https://drewsebastians.github.io/great-merchant-research-site/game/. Latest deployed game code is `c32d9bf1a3c50fc624cc67df3636ad2cf91c6d7d` in Pages run `45950316946`, with PWA shell v14. Documentation-only commit `df83d46` followed and deployed in Pages run `45951202359`. The lower HUD has three zones and the desktop contextual windows sit side by side. A fresh canonical-URL load after the service-worker update showed the new layout; one pre-existing tab first retained its cached v11 shell. Production browser checks confirmed focus/Escape, separate shop mode, and the saved day 05 / 102 marks.
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
- Code commits include the scene-first rebuild `edde45034b85c93fc900d77d0efbfb345f87ddca`, production render fix `c80eaa217568dee3c6fd4be50736e8d63d3807a5`, tablet-width overflow fix `da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f`, compact styling `05c2607a22aa0c7596d83b4ebaa0079fb648fd28`, duplicate-header-label fix `ca683f0b1fe2d6de4af7f95cd626a5312df63006`, original town art/PWA v4 `a38cbdbeb0e35e57c580f524973e1cc26fcafd7d`, compact utility/HUD `b1b7b0ef6bf43087175bbcbcfab867fe344768f9`, refined window frame `6bcd76e1d2625015227216eb513f1deaa0da8c1f`, notice expiry `f9e94a5f01f4654c1adaa7fe1d2e72dfae6e4daa`, road/quarry art/PWA v5 `1784c24692fda4a904c12bafbd4a174b6773c078`, denser window frame `23fa5361fae682f37be5beb1f5b44d06dde92174`, and PWA shell v6 `2a78f5c27c6196565d01cccbd7ac9711c9bf2447`.
- Latest implementation chain: `4eb720f` added the original campaign date/device-clock HUD and Rations nomenclature (PWA cache v10); `bc05a2c` increased window overlap based on a mistaken interpretation of the 2017 screenshot (PWA cache v11); `eb007f6` restored the app module after a truncated API upload; and `c32d9bf` corrects the screenshot interpretation with side-by-side windows, a three-zone HUD and shell v14. `main` and `development/v5-first-playable-slice` remain aligned; `c32d9bf` is the latest game-code commit, followed by documentation-only updates.
- Pages run 45767255947 succeeded for the scene-first interface; run 45784931192 succeeded for the responsive breakpoint fix. The first scene-first run 45766624535 also succeeded, but browser inspection found a stale dashboard element lookup; it was fixed before the corrected deploy.
- `data/vault.json` is encrypted research. Preserve it byte-for-byte. Do not put private records, source IDs, excerpts or media into the public repository.

## Current implementation and verification

The client uses a scene-first town/field layout with left portraits, an upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Field/town, shop and battlefield modes are distinct. The deployed client keeps two desktop windows open side by side with a small gap; clicking an exposed titlebar brings it forward, and Escape closes only the front window. Narrow layouts show the active window while preserving window state. Battlefield controls expose Move, Attack, Hold, Stop, group selection and Withdraw. Party, travel, trade, quests, recovery and local saves remain connected. Original 1199×675 town, road and quarry illustrations fill the scenes. The utility strip is 28px without the project wordmark, and the desktop HUD is 118px with an original four-season campaign day and separate device-local clock. At a production 1363px viewport, the overview/chat/menu-date zones measure approximately 303/690/354px; these are prototype measurements, not Xian dimensions. The overview’s Rations value is the prototype food count; the official guide describes Stamina as hunger. The independently authored window trim remains simpler than the dated Xian comparator.

Pages run `45950316946` passed, and the canonical production URL now loads the shell-v14 layout. At 1363 CSS px the HUD measures 303/690/354px and the two windows are 432px wide with a 13px gap; document width equals viewport width. Production focus/Escape behavior and the separate shop mode were checked without a transaction. Save remained at day 05 / 102 marks. Commit `c32d9bf` passes 39/39 tests, syntax/content validation and `git diff --check`. Documentation-only commit `df83d46` also deployed successfully in run `45951202359`. Prior browser-zoom checks at about 779px, 681px and 340px CSS width showed no horizontal scrolling. Physical-device, broader keyboard/accessibility and live offline-PWA checks remain open.

Recovery note: Pages run `45946939415` for `bc05a2c` completed, but its deployed app initially rendered blank. The browser console identified an `Unexpected identifier 'output'` parse error because the oversized `app.mjs` content passed through a truncated command result before blob creation. Restored the complete app file from `checkpoint/pre-overlap-window-layout-2026-11-27`, verified its Git blob SHA matched the local file, committed `eb007f6`, and confirmed the successful run and live app. For future large API-file writes, request sufficient output capacity and compare the created remote blob SHA to `git hash-object <path>` before moving refs.

Public references rechecked 27 Nov 2026 include the official interface, shortcut and battle-system guides; a Xian quest-window screenshot from 17 Jan 2016; a Xian mercenary-book screenshot from 26 Aug 2019; a full Xian field screenshot from an article dated 14 Jan 2017; and 2023/2025 community videos. The 2017 screenshot shows left-side portraits, an upper-right minimap, a scene-first field, two centered framed windows side by side with a small gap, and bottom status/chat/menu/date controls, but its capture date and client patch are unknown. The official interface guide says Stamina is hunger. The 2025 video labels 06:44 “UI Xian,” but the player remained black/buffering at 0:00/0:15; no new frame was visually verified. The client’s campaign calendar is original and its clock is device-local, not a verified mapping of Xian date/time behavior. The general official battle guide’s group/withdraw controls and timing do not establish current Xian mappings. Exact keys, selection gestures, battle timing and current field geometry remain unresolved.

## Next concrete actions

- Continue the P0 comparison of independently authored window ornament and compact HUD proportions against dated Xian reference frames. The side-by-side arrangement follows the visible 2017 screenshot, but the ornament remains simpler and exact HUD proportions remain unverified; keep the gate open.
- Review a newer Xian field reference if one becomes accessible. Keep client-version uncertainty visible and do not claim exact Xian details.
- DevTools reported an organization policy block during the live offline check. Do not attempt to bypass it. The service-worker unit test passed using a mocked offline path; a permitted real offline workflow is still needed.
- Continue to describe the product as “playable prototype; TGM interface fidelity in progress” until the blueprint gate, including the expanded visual-treatment comparison, is satisfied.
