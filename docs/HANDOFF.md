# Development Handoff

Updated: 19 November 2026  
Next task: V5-009 — region map and accessible route selection

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `3d04e9f34d659cf31c0bf25855b0a852b51b1898`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (27 tests currently pass). Run `node --check` on the app, engine, data and storage modules. Production HTML, app, data, engine, storage and CSS returned HTTP 200 with preferences markers.

Tests cover route unlocking and rewards, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, route settlement calculations, recipe conversion and sale, language switching, combat shortcut toggling, storage handling and migration from versions 1–7 to version 8.

## Next increment

Extend the existing route catalog with a compact original region map. Use position and connection data rather than hardcoded node markup; make each location keyboard-accessible, announce locked/selected status, preserve card selection as an alternative, and test both route unlock states. Avoid changing route progression or save data unless needed.
