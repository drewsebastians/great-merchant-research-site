# Development Handoff

**Updated:** 26 November 2026  
**Next task:** P0 — verify Xian-specific reference frames, then rebuild the desktop client shell

## Start here

1. Read docs/tgm-interface-blueprint-v1.md. It is the controlling specification for interface structure, evidence limits and the acceptance gate.
2. Read docs/ui-fidelity-review-v5.md for the production-to-reference gap matrix.
3. Read docs/STATUS.md and docs/BACKLOG.md, then continue the highest-priority unchecked V5.1 task.
4. Open the current production game at https://drewsebastians.github.io/great-merchant-research-site/game/ for a baseline. It remains the V5.0 dashboard build until the shell redesign is deployed.
5. Use the repository's dependency-free static server when checking local UI; preserve the existing local save until the new interface migration is ready.

## Repository and recovery

- Development repo: drewsebastians/great-merchant-research-site.
- Research repo: drewsebastians/great-merchant-research. Read-only; do not modify it.
- Pre-reset main/development baseline: c57ac16f4ed32f4636b20cc07c814a4805c580f3.
- Rollback branch: checkpoint/pre-tgm-fidelity-reset-2026-11-26 at that baseline.
- Previous game checkpoints: checkpoint/pre-v5-2026-11-19, checkpoint/pre-v5-025-2026-11-25, checkpoint/pre-v5-026-2026-11-25, checkpoint/pre-v5-027-2026-11-25 and checkpoint/pre-v5-028-2026-11-25.
- Last production game-code commit: 55d22522d3cba7b6c9b5286bdcb195034ab21ae3; last successful game-code Pages run: 45543428008.
- data/vault.json is encrypted research. Preserve it byte-for-byte. Do not put private records, source IDs, excerpts or media into the public repository.

## Current technical baseline

The game has original route, crew, inventory, trading, quest, recovery, recipe, settlement, PWA and local-save systems. Recorded code verification is 35/35 Node tests plus a passing content validator. Production browser checks covered navigation, encounter outcomes, recovery and trade.

The current presentation is a modern web dashboard. It does not match Xian/TGM's documented client layout. Its turn-based Strike/Brace/Technique UI must be treated as a temporary playable scaffold until the battlefield command view is rebuilt.

The official interface and shortcut guides provide a primary macro-layout/control reference. Xian-specific videos are community-produced and version-scoped; compare their visible frames before asserting exact keys, timing or window behavior. See links in the blueprint.

## Next implementation increment

- Record Xian reference frame URLs/timestamps and a screen-zone comparison, without copying source imagery into the repo.
- Replace persistent website navigation and the permanent quest rail with the scene-first field client shell.
- Add the left character/mercenary portraits, minimap overlay, lower status/chat/menu/date HUD and contextual windows.
- Create distinct shop and battlefield modes; expose verified movement/attack/hold/stop/group/withdraw command families.
- Reconnect the existing local gameplay loop after the shell is working.
- Run the existing tests and content validator when code changes; deploy and verify the resulting production screen before marking backlog items complete.
