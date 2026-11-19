# Development Handoff

Updated: 19 November 2026  
Next task: V5-010 — validate data catalogs

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `b2510d03ef776d5fd4f46e378c9e2f61edc37e09`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (27 tests currently pass). Run `node --check` on the app, engine, data and storage modules. Production HTML, app, data and CSS returned HTTP 200 with accessible-map markers.

Tests cover route unlocking and rewards, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, route settlement calculations, recipe conversion and sale, language switching, combat shortcut toggling, accessible map state, storage handling and migration from versions 1–7 to version 8.

## Next increment

Add an explicit content validator and focused tests for duplicate IDs, broken route/reward/recipe references, invalid prices or quantities, and map coordinates outside the canvas. Keep validation independent of runtime state and avoid changing game balance or player saves.
