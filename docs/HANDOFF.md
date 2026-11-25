# Development Handoff

Updated: 25 November 2026  
Next task: V5-023 — verify Indonesian guide/combat copy on production, then review result states

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Latest game-code commit: `cbc5caf273a8d995a64f8c38418622d44e6a7cc7`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (34 tests currently pass) and `node scripts/validate-game-content.mjs`. Run `node --check` on the app, engine, data, quests, storage, service worker and validation modules. The service-worker shell installs with HTTP-cache reload, online game files revalidate, and the previous cache version is removed; the guide focus loop works live in Chromium. Indonesian Preferences, Market, Crew, Journey, Pack, Journal, onboarding and battle controls now translate shared interface copy. Rendered-flow checks pass, item names/descriptions and route/quest prose remain English, and whole-word matching avoids corrupting longer words; the guide/combat deployment still needs production verification. PWA refresh/offline fallback have a Node simulation; physical-phone interaction and Windows Edge install/offline tests remain open.

Tests cover route and quest unlocking, ordered objective progress, entry requirements, first-completion quest rewards, PWA metadata/precache/offline fallback, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, route settlement calculations, recipe conversion and sale, language switching, combat shortcut toggling, accessible map state, content-validation failures, storage handling and migration from versions 1–7 to version 8.

## Next increment

The screen-by-screen review is recorded in `docs/ui-fidelity-review-v5.md`. Journal now shows quest stages and locked prerequisites; production browser testing confirmed guide dismissal, Market/Crew/Journal navigation and purchasing, and keyboard focus containment. After the next push, reload production to verify Indonesian guide/combat copy, then review victory, defeat and settlement states in Cloud Chromium. Verify Edge PWA install/offline launch on Windows when an appropriate device is available. Keep physical-phone checks flagged for the user's later review. Do not invent combat status effects while their rules lack independent support.
