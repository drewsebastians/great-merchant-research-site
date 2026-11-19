# Development Handoff

Updated: 19 November 2026  
Active task: V5-001 — first playable vertical slice

## Start here

- Read docs/development-plan-v5.md for scope, system translation and implementation boundaries.
- Read docs/STATUS.md for the current branch, checkpoints and release state.
- Read docs/BACKLOG.md and continue with the highest-priority unchecked item.
- Start the local app with any static HTTP server from the repository root, then open /game/. No dependencies or build step are needed.

## Repository safety

- Development repo: drewsebastians/great-merchant-research-site.
- Research repo is a read-only source for this task; do not alter it.
- Checkpoint branch: checkpoint/pre-v5-2026-11-19.
- Work branch: development/v5-first-playable-slice.
- Pre-change main commit: a1bfc98df853ace84e4894c91361dcc3c5120935.
- Existing data/vault.json is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain only original game code, original prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Verification path

Run: node --test tests/game-engine.test.mjs  
Run: node --check game/app.mjs  
Run: node --check game/engine.mjs  
Serve locally and walk the hire → prepare → fight → return → sell → reload loop.
Check that non-town routes lock town-only actions, healing cannot exceed maximum vitality, failed purchases do not change currency, and a failed save degrades to a session-only message.

After tests and asset/content checks pass, push the work branch, merge its commit into main by a fast-forward update, then verify the deployed /game/ route and run the same player loop against production. Record the final deployed URL and outcome in docs/STATUS.md before the session ends.
