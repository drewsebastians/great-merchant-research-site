# Development Handoff

Updated: 19 November 2026  
Next task: V5-006 — settlement ledger

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `41f872a8a67982098887185548a9e2011ef51822`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (21 tests currently pass). Run `node --check` on the app, engine, data and storage modules. Production app, data, storage and CSS returned HTTP 200 with equipment markers.

Tests cover route unlocking and rewards, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, storage failure handling and migration from versions 1–4 to version 5.

## Next increment

Add a settlement ledger showing ration cost, route reward value, cargo sold, and net proceeds. Keep reward value and sale revenue separate so the player can see what came from the encounter and what they chose to sell. Add calculation tests for both routes and preserve current save compatibility.
