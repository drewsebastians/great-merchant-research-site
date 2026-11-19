# Development Handoff

Updated: 19 November 2026  
Next task: V5-004 — formation-aware combat

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `2311ed2c299c9f9abec05f6cf96ede0df9f83f5a`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (17 tests currently pass). Run `node --check` on the app, engine, data and storage modules. Verify SVG/XML assets and the production route.

Tests cover route unlocking, two encounter/reward sets, v1/v2-to-v3 save migration, local save failure behavior, and app-render interactions for route selection and onboarding skip/replay/finish/Escape. Production page, app, data and styles returned HTTP 200 with current release markers.

## Next increment

Make formation affect turn order and protection. Define the rule in original prototype terms, show the formation and order clearly in the crew and combat interfaces, and test that changes cannot create extra actions or bypass the turn. Preserve v1/v2 migration coverage, now targeting save version 3.
