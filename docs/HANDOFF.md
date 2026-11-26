# Development Handoff

**Updated:** 26 November 2026  
**Next task:** P0 — recheck the compact client at narrow widths and continue the dated Xian visual comparison

## Start here

1. Read docs/tgm-interface-blueprint-v1.md for the interface structure, evidence limits and acceptance gate.
2. Read docs/ui-fidelity-review-v5.md for the dated sources, implementation comparison and unresolved checks.
3. Read docs/STATUS.md and docs/BACKLOG.md, then continue the highest-priority unchecked task.
4. Production game: https://drewsebastians.github.io/great-merchant-research-site/game/. The original illustrated town-scene commit `a38cbdbeb0e35e57c580f524973e1cc26fcafd7d` deployed in Pages run 45788583206. Latest client commit `6bcd76e1d2625015227216eb513f1deaa0da8c1f` is live; the production browser confirmed its quest window.
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
- Code commits: `edde45034b85c93fc900d77d0efbfb345f87ddca` (scene-first rebuild), `c80eaa217568dee3c6fd4be50736e8d63d3807a5` (production render fix), `da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f` (tablet-width overflow fix), `05c2607a22aa0c7596d83b4ebaa0079fb648fd28` (compact client/window styling), `ca683f0b1fe2d6de4af7f95cd626a5312df63006` (remove duplicate header mode label), `a38cbdbeb0e35e57c580f524973e1cc26fcafd7d` (original town art/PWA cache v4), `b1b7b0ef6bf43087175bbcbcfab867fe344768f9` (compact utility/HUD), and `6bcd76e1d2625015227216eb513f1deaa0da8c1f` (refined original window frame).
- `main` and `development/v5-first-playable-slice` carry the same corrected client and closeout documentation; fetch both remote heads before continuing.
- Pages run 45767255947 succeeded for the scene-first interface; run 45784931192 succeeded for the responsive breakpoint fix. The first scene-first run 45766624535 also succeeded, but browser inspection found a stale dashboard element lookup; it was fixed before the corrected deploy.
- `data/vault.json` is encrypted research. Preserve it byte-for-byte. Do not put private records, source IDs, excerpts or media into the public repository.

## Current implementation and verification

The client uses a scene-first town/field layout with left portraits, an upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Field/town, shop and battlefield modes are distinct. Battlefield controls expose Move, Attack, Hold, Stop, group selection and Withdraw. Party, travel, trade, quests, recovery and local saves remain connected. The original illustrated town scene fills the field. The utility strip is 28px without the project wordmark, and the desktop HUD is 118px. Context windows now use independent corner bevels and a layered compact title bar.

Production browser checks after `6bcd76e` confirmed the town art and revised quest window. The existing journey remained at day 5 and 102 marks. No battle, trade or reset was run against that save. Automated tests pass 38/38, the content validator passes, and `git diff --check` passes. Narrow-width checks after the compact utility/HUD pass remain open.

Public references inspected include the official interface, shortcut and battle-system guides; a Xian quest-window screenshot from 17 Jan 2016; a Xian mercenary-book screenshot from 26 Aug 2019; a full Xian field screenshot from a tutorial article dated 14 Jan 2017; and 2023/2025 community videos whose footage could not be visually inspected in this review. The 2017 screenshot shows left-side portraits, a top-right minimap, a scene-first field, centered framed windows and bottom status/chat/menu/date controls. Its capture date and client patch are unknown. The deployed client uses original illustrated scene art, the broad same zones, no project wordmark, a 28px utility strip and a 118px lower HUD; its window frame and exact proportions remain different or unresolved. The general official battle guide states Ctrl+number group assignment and an Esc → Withdraw route with an XP penalty for withdrawal within 20 seconds; it does not establish that these mappings or timing apply to Xian. Exact Xian keys, selection gestures, battle timing and current field geometry remain unverified.

## Next concrete actions

- Recheck browser-width emulations at 779px, 681px and 340px after `b1b7b0e` before relying on earlier responsive results.
- Continue the P0 comparison of independently authored window ornament and compact HUD proportions against dated Xian reference frames.
- Review a newer Xian field reference if one becomes accessible. Keep client-version uncertainty visible and do not claim exact Xian details.
- DevTools reported an organization policy block during the live offline check. Do not attempt to bypass it. The service-worker unit test passed using a mocked offline path; a permitted real offline workflow is still needed.
- Continue to describe the product as “playable prototype; TGM interface fidelity in progress” until the blueprint gate, including the expanded visual-treatment comparison, is satisfied.
