# Development Handoff

Updated: 19 November 2026  
Next task: V5-011 — quest progression schema

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `d71c496cf958093a27ed207dfb497a68c2a7e6c0`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (30 tests currently pass) and `node scripts/validate-game-content.mjs`. Run `node --check` on the app, engine, data, storage and validation modules. Production validation files returned HTTP 200; the live game modules were verified in the preceding release.

Tests cover route unlocking and rewards, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, route settlement calculations, recipe conversion and sale, language switching, combat shortcut toggling, accessible map state, content-validation failures, storage handling and migration from versions 1–7 to version 8.

## Next increment

Create a small quest catalog with stable IDs, objectives, conditions, rewards and unlock links. Migrate the Courier's Mark out of UI-only assumptions without changing its current player experience; connect the side objective and Amber Quarry unlock to the catalog; validate the references and preserve save v8.
