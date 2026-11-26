# Development Handoff

**Updated:** 26 November 2026  
**Next task:** P0 — compare the deployed client with an accessible Xian field-screen reference

## Start here

1. Read docs/tgm-interface-blueprint-v1.md for the interface structure, evidence limits and acceptance gate.
2. Read docs/ui-fidelity-review-v5.md for the dated sources, implementation comparison and unresolved checks.
3. Read docs/STATUS.md and docs/BACKLOG.md, then continue the highest-priority unchecked task.
4. Production game: https://drewsebastians.github.io/great-merchant-research-site/game/. Corrected client commit `c80eaa217568dee3c6fd4be50736e8d63d3807a5` deployed successfully in Pages run 45767255947.
5. Preserve the user's existing local game progress. The browser check left it at day 5 and 102 marks, with its save indicator active.

## Repository and recovery

- Development repo: drewsebastians/great-merchant-research-site.
- Research repo: drewsebastians/great-merchant-research. Read-only; do not modify it.
- Pre-reset main/development baseline: c57ac16f4ed32f4636b20cc07c814a4805c580f3.
- Pre-scene-first checkpoint: checkpoint/pre-scene-first-ui-2026-11-26 at 79197de751e66580257d7c5c042b2290b7201a08.
- Code commits: `edde45034b85c93fc900d77d0efbfb345f87ddca` (scene-first rebuild) and `c80eaa217568dee3c6fd4be50736e8d63d3807a5` (production render fix and DOM selector regression test).
- `main` and `development/v5-first-playable-slice` carry the same corrected client and closeout documentation; fetch both remote heads before continuing.
- Pages run 45767255947 succeeded. The first scene-first run 45766624535 also succeeded, but browser inspection found a stale dashboard element lookup; it was fixed before the corrected deploy.
- `data/vault.json` is encrypted research. Preserve it byte-for-byte. Do not put private records, source IDs, excerpts or media into the public repository.

## Current implementation and verification

The client uses a scene-first town/field layout with left portraits, an upper-right minimap, lower status/chat/menu/date HUD and contextual windows. Field/town, shop and battlefield modes are distinct. Battlefield controls expose Move, Attack, Hold, Stop, group selection and Withdraw. Party, travel, trade, quests, recovery and local saves remain connected.

Production browser checks confirmed the field scene, quest/route windows, shop window and shop mode. The existing journey remained at day 5 and 102 marks. No battle, trade or reset was run against that save. Automated tests pass 38/38, the content validator passes, and `git diff --check` passes.

Public references inspected include the official interface, shortcut and battle-system guides; a Xian quest-window screenshot from 17 Jan 2016; a Xian mercenary-book screenshot from 26 Aug 2019; and 2023/2025 community videos whose footage could not be visually inspected in this review. The general official battle guide states Ctrl+number group assignment and an Esc → Withdraw route with an XP penalty for withdrawal within 20 seconds; it does not establish that these mappings or timing apply to Xian. Exact Xian keys, selection gestures, battle timing and current field geometry remain unverified.

## Next concrete actions

- Find and inspect an accessible Xian field-screen frame from a public video or screenshot, then compare it with the deployed scene and official guide.
- Verify the shell at a narrow viewport and check real offline service-worker behavior.
- Keep the acceptance gate open until the Xian field comparison is documented. Continue to describe the product as “playable prototype; TGM interface fidelity in progress.”
