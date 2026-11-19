# Development Handoff

Updated: 19 November 2026  
Next task: V5-014 — screen-by-screen interface fidelity review

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `7e1cb98ea467ed95d47df31a0eebfc0971881c25`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (33 tests currently pass) and `node scripts/validate-game-content.mjs`. Run `node --check` on the app, engine, data, quests, storage, service worker and validation modules. The current code commit passed the GitHub Pages deployment workflow. PWA cache and offline fallback have a Node simulation; a Windows Edge install test remains to be done on an actual device.

Tests cover route and quest unlocking, ordered objective progress, entry requirements, first-completion quest rewards, PWA metadata/precache/offline fallback, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, route settlement calculations, recipe conversion and sale, language switching, combat shortcut toggling, accessible map state, content-validation failures, storage handling and migration from versions 1–7 to version 8.

## Next increment

Review Journey, Town Exchange, Crew, Pack, Journal, Preferences and combat against confirmed high-level interface patterns in the read-only research repo. Record concrete layout and interaction gaps, then implement the highest-impact improvement with original artwork and without publishing private source records or assets. Test the responsive browser flow and preserve the existing save. Verify PWA installation/offline launch on Windows Edge when an appropriate device is available. Do not invent combat status effects while their rules lack independent support.
