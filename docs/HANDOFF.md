# Development Handoff

**Updated:** 27 November 2026
**Next task:** P0 — refine the original contextual-window and HUD treatment against dated Xian visual references

## Start here

1. Read docs/tgm-interface-blueprint-v1.md for the interface structure, evidence limits and acceptance gate.
2. Read docs/ui-fidelity-review-v5.md for the dated sources, implementation comparison and unresolved checks.
3. Read docs/STATUS.md and docs/BACKLOG.md, then continue the highest-priority unchecked task.
4. Production game: https://drewsebastians.github.io/great-merchant-research-site/game/. Latest code commit `4e1e930c338bce34e9b9e99064674f8e7e3d98a5` is live in Pages run 45926785566. The cache-v8 build reloaded, two windows stayed open over the scene, clicking an exposed frame brought it forward, Escape closed only the front window, and shop mode remained distinct.
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
- Code commits include the scene-first rebuild `edde45034b85c93fc900d77d0efbfb345f87ddca`, production render fix `c80eaa217568dee3c6fd4be50736e8d63d3807a5`, tablet-width overflow fix `da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f`, compact styling `05c2607a22aa0c7596d83b4ebaa0079fb648fd28`, duplicate-header-label fix `ca683f0b1fe2d6de4af7f95cd626a5312df63006`, original town art/PWA v4 `a38cbdbeb0e35e57c580f524973e1cc26fcafd7d`, compact utility/HUD `b1b7b0ef6bf43087175bbcbcfab867fe344768f9`, refined window frame `6bcd76e1d2625015227216eb513f1deaa0da8c1f`, notice expiry `f9e94a5f01f4654c1adaa7fe1d2e72dfae6e4daa`, road/quarry art/PWA v5 `1784c24692fda4a904c12bafbd4a174b6773c078`, denser window frame `23fa5361fae682f37be5beb1f5b44d06dde92174`, and PWA shell v6 `2a78f5c27c6196565d01cccbd7ac9711c9bf2447`.
- Latest implementation commits are `6830d0030bd011c75897d9bc1e44dd751fe2aefb` (nonmodal windows, PWA cache v7) and `4e1e930c338bce34e9b9e99064674f8e7e3d98a5` (click-to-focus, PWA cache v8). `main` and `development/v5-first-playable-slice` are aligned at the latter; fetch both heads before continuing.
- Pages run 45767255947 succeeded for the scene-first interface; run 45784931192 succeeded for the responsive breakpoint fix. The first scene-first run 45766624535 also succeeded, but browser inspection found a stale dashboard element lookup; it was fixed before the corrected deploy.
- `data/vault.json` is encrypted research. Preserve it byte-for-byte. Do not put private records, source IDs, excerpts or media into the public repository.

## Current implementation and verification

The client uses a scene-first town/field layout with left portraits, an upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Field/town, shop and battlefield modes are distinct. Desktop contextual windows can stay open together above the undimmed field; clicking an exposed frame brings it to the front, and Escape closes only the front window. Narrow layouts show the active window while preserving the window state. Battlefield controls expose Move, Attack, Hold, Stop, group selection and Withdraw. Party, travel, trade, quests, recovery and local saves remain connected. Original 1199×675 town, road and quarry illustrations fill the scenes; all scenes are precached in PWA shell v8. The utility strip is 28px without the project wordmark, and the desktop HUD is 118px. Context windows use an inset double bevel, original corner rivets and a layered title bar; the frame remains simpler than the dated Xian screenshot.

The production browser check after `4e1e930` reloaded the cache-v8 build, showed the town art, opened inventory and quest windows together, focused inventory by clicking its exposed titlebar, then closed only that front window with Escape. The shop entered its distinct mode. The existing journey remained at day 05 and 102 marks; no progression action or reset was run. Both route images loaded after `1784c24`. Automated tests pass 39/39, the content validator passes, and `git diff --check` passes. Browser-zoom checks at about 779px, 681px and 340px CSS width showed no horizontal scrolling after the notice fix. Physical-device, broader keyboard/accessibility and live offline-PWA checks remain open.

Public references inspected include the official interface, shortcut and battle-system guides; a Xian quest-window screenshot from 17 Jan 2016; a Xian mercenary-book screenshot from 26 Aug 2019; a full Xian field screenshot from a tutorial article dated 14 Jan 2017; and 2023/2025 community videos whose footage could not be visually inspected in this review. The 2017 screenshot shows left-side portraits, a top-right minimap, a scene-first field, centered framed windows and bottom status/chat/menu/date controls. Its capture date and client patch are unknown. The deployed client uses original illustrated scene art, the broad same zones, no project wordmark, a 28px utility strip and a 118px lower HUD; its window frame and exact proportions remain different or unresolved. The general official battle guide states Ctrl+number group assignment and an Esc → Withdraw route with an XP penalty for withdrawal within 20 seconds; it does not establish that these mappings or timing apply to Xian. Exact Xian keys, selection gestures, battle timing and current field geometry remain unverified.

## Next concrete actions

- Continue the P0 comparison of independently authored window ornament and compact HUD proportions against dated Xian reference frames. The new inset bevel/rivet treatment is a visual refinement, not proof of current-Xian fidelity; keep the gate open until material visual differences are resolved.
- Review a newer Xian field reference if one becomes accessible. Keep client-version uncertainty visible and do not claim exact Xian details.
- DevTools reported an organization policy block during the live offline check. Do not attempt to bypass it. The service-worker unit test passed using a mocked offline path; a permitted real offline workflow is still needed.
- Continue to describe the product as “playable prototype; TGM interface fidelity in progress” until the blueprint gate, including the expanded visual-treatment comparison, is satisfied.
