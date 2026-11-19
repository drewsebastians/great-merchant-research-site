# Development Handoff

Updated: 19 November 2026  
Next task: V5-005 — equipment slot and combat upgrade

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `1514a19f9933d2560cebfa028416ea9f9d07ac7e`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (19 tests currently pass). Run `node --check` on the app, engine, data and storage modules. Production app, data, storage and CSS returned HTTP 200 with formation markers.

Tests cover route unlocking and rewards, front formation action order and rear protection, onboarding skip/replay/completion, save failure behavior and migration from versions 1–3 to version 4. The live browser smoke test completed and sold the first route's cargo before the later route/formation increments.

## Next increment

Add one original equipment item and one visible combat effect. Decide whether it enters through the Town Exchange or route rewards, expose equip/unequip in Pack or Crew, and ensure the effect is reflected in combat feedback. Update save migration to version 5, test price/equip/unequip/combat outcomes and verify the public build before deployment.
