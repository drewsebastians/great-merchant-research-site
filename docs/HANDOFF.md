# Development Handoff

Updated: 19 November 2026  
Next task: V5-015 — device-level responsive interaction verification

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `166a41cc6bbdb2cb4134f808d25be435f24dd550`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (34 tests currently pass) and `node scripts/validate-game-content.mjs`. Run `node --check` on the app, engine, data, quests, storage, service worker and validation modules. GitHub Pages run 44557440687 passed for the current code commit. PWA cache and offline fallback have a Node simulation; phone interaction and Windows Edge install/offline tests remain to be done on actual devices.

Tests cover route and quest unlocking, ordered objective progress, entry requirements, first-completion quest rewards, PWA metadata/precache/offline fallback, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, route settlement calculations, recipe conversion and sale, language switching, combat shortcut toggling, accessible map state, content-validation failures, storage handling and migration from versions 1–7 to version 8.

## Next increment

The screen-by-screen review is recorded in `docs/ui-fidelity-review-v5.md`. The responsive update keeps errand progress visible, shows party vitality in combat and reflows Town Exchange into larger tap-target cards on narrow phones. Next, verify those controls and the guide's outside-tap dismissal on a physical phone, then verify Edge PWA install/offline launch on Windows. Continue interface refinement after that. Do not invent combat status effects while their rules lack independent support.
