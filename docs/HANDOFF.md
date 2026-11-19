# Development Handoff

Updated: 19 November 2026  
Next task: V5-008 — language and input preferences

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `24544daffb9847f03327ce52996c638aba09d454`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (25 tests currently pass). Run `node --check` on the app, engine, data and storage modules. Production app, data, engine, storage and CSS returned HTTP 200 with workbench markers.

Tests cover route unlocking and rewards, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, both route settlement calculations, cargo-sale updates, route-material recipe conversion, storage failure handling and migration from versions 1–6 to version 7.

## Next increment

Add locally saved language and input preferences. Keep English as the default, support a clear English/Indonesian choice for the key play screens, and expose an on/off setting for combat number shortcuts. Ensure switching language updates visible controls and notices, persist both choices, and test default state, toggle behavior and v7 migration.
