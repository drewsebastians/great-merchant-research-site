# Development Handoff

Updated: 25 November 2026  
Next task: V5-028 — complete device-specific responsive and PWA checks when suitable devices are available

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Latest production code commit: `b55fea7555a9f5500eb8b159ae7d36d92a0bba3f`.
- Latest game-code deploy: Pages run `45542156190` succeeded for this commit.
- Pre-tuning rollback checkpoint: `checkpoint/pre-v5-025-2026-11-25` at `ccaae5a52f1694dc76be599dd0789f0b8f116423`.
- Pre-localization-boundary checkpoint: `checkpoint/pre-v5-026-2026-11-25` at `3c463e506829818125c0f497f0da410ee250468f`.
- Pre-log-localization checkpoint: `checkpoint/pre-v5-027-2026-11-25` at `0635af9b4311ef580196797d53da30af1a19eea3`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (35 tests currently pass) and `node scripts/validate-game-content.mjs`. Run `node --check` on the app, engine, data, quests, storage, service worker and validation modules. The service-worker shell installs with HTTP-cache reload, online game files revalidate, and the previous cache version is removed; the guide focus loop works live in Chromium. Indonesian Preferences, Market, Crew, Journey, Pack, Journal, onboarding, battle, victory, retreat, settlement and transaction notices translate shared interface copy. Rendered-flow tests cover a normal Quarry win, reachable Brace-driven defeat, recovery and route switching. In Indonesian mode, route and trade notices are complete across the notice, field log and Journal; catalog route/quest/item prose remains English. Production verified a normal Strike victory, reachable defeat, recovery without route reward, route switching, live purchase and sale notices, and working navigation/content on all six tabs. PWA refresh/offline fallback have a Node simulation; physical-phone interaction and Windows Edge install/offline tests remain open.

Tests cover route and quest unlocking, ordered objective progress, entry requirements, first-completion quest rewards, PWA metadata/precache/offline fallback, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, route settlement calculations, recipe conversion and sale, language switching, combat shortcut toggling, accessible map state, content-validation failures, storage handling and migration from versions 1–7 to version 8.

## Next increment

The screen-by-screen review is recorded in `docs/ui-fidelity-review-v5.md`. Journal now shows quest stages and locked prerequisites; production browser testing confirmed guide dismissal, core navigation, purchasing, keyboard focus containment, Indonesian result screens, reachable defeat, recovery, route switching and ordinary Strike victory. It also confirmed that route and buy/sell messages are fully localized across notices and logs, while route/quest prose stays intact. All six tabs render in production. Continue responsive checks that can be automated; keep physical-phone and Windows Edge PWA verification open until suitable devices are available. Do not invent combat status effects while their rules lack independent support.
