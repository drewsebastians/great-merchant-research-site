# Development Handoff

Updated: 19 November 2026  
Next task: V5-007 — small production recipe

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `aa90154c780a87d703acca9a94a5447f59708655`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (22 tests currently pass). Run `node --check` on the app, engine, data and storage modules. Production app, data, engine, storage and CSS returned HTTP 200 with settlement-ledger markers.

Tests cover route unlocking and rewards, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, both route settlement calculations, cargo-sale updates, storage failure handling and migration from versions 1–5 to version 6.

## Next increment

Add one compact production recipe that converts materials from a completed route into a trade item. Use original recipe inputs, costs and output values, show the conversion before confirming, prevent crafting with insufficient ingredients, and add rule and UI tests plus a v7 save migration only if the recipe needs persistent state.
