# Development Handoff

Updated: 19 November 2026  
Next task: V5-012 — offline-first Windows packaging research and prototype decision

## Start here

- Read `docs/development-plan-v5.md` for scope, research translation and implementation boundaries.
- Read `docs/STATUS.md` for deployed commit, rollback point and verification evidence.
- Read `docs/BACKLOG.md` and continue with the highest-priority unchecked item.
- Start a static HTTP server from the repository root and open `/game/`. No dependencies or build step are required.

## Repository and rollback

- Development repo: `drewsebastians/great-merchant-research-site`.
- Research repo is read-only for this project; do not change it.
- Checkpoint branch: `checkpoint/pre-v5-2026-11-19` → pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.
- Current production game-code commit: `2cf536d12c0d61c699337448544bb2156edc1c60`.
- `data/vault.json` is encrypted research material. Leave it byte-for-byte unchanged.
- Public files may contain original game code, prototype tuning and high-level system specifications. Never copy source IDs, source records, private claims, guide text or media.

## Current verification

Run `node --test tests/*.test.mjs` (31 tests currently pass) and `node scripts/validate-game-content.mjs`. Run `node --check` on the app, engine, data, quests, storage and validation modules. The GitHub Pages deployment workflow passed for the current commit.

Tests cover route and quest unlocking, ordered objective progress, entry requirements, first-completion quest rewards, formation order and rear protection, onboarding skip/replay/completion, weapon buy/equip/unequip and Strike bonus, route settlement calculations, recipe conversion and sale, language switching, combat shortcut toggling, accessible map state, content-validation failures, storage handling and migration from versions 1–7 to version 8.

## Next increment

Research whether the current static browser game can meet the project's offline-first Windows goal as a PWA or should use a desktop wrapper. Compare installation, offline caching, local-save behavior, update path, native API needs, support burden and build/release requirements. Keep the game dependency-free until a clear product need justifies packaging; document the recommendation before implementing a wrapper. Do not invent combat status effects while their rules lack independent support.
