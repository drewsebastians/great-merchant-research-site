# Development Handoff

Updated: 19 November 2026  
Next task: V5-003 — dismissible onboarding overlay

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production and development commit: `ab7c7cf2a3d23507526051e2bcc3cdc8ef771cf8`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, original prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (16 tests currently pass). Run `node --check` on the app, engine, data and storage modules. Verify SVG/XML assets and the production route.

The UI test covers hiring, starting Mosswind, completing its encounter, returning to town, selecting Amber Quarry and rendering its distinct encounter. Engine tests cover the route unlock, reward, save behavior and failure cases. Version 1 saves migrate to version 2 without discarding the existing run.

## Next increment

Add the Priority 1 onboarding overlay. It should explain the ledger, hiring, route selection, combat orders and return loop in short steps; allow skip, dismiss and replay; and persist completion locally. Keep it optional so returning players reach the game quickly. Add tests for skip, completion, replay and save migration before deployment.
