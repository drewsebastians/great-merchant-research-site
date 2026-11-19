# Development Status

Updated: 19 November 2026  
Task: V5-002 — unlockable second route  
Plan: Development Plan v5.0

## Current state

**Production:** live at https://drewsebastians.github.io/great-merchant-research-site/game/  
**Production commit:** `ab7c7cf2a3d23507526051e2bcc3cdc8ef771cf8` on `main`; the development branch points to the same commit.  
**Rollback checkpoint:** `checkpoint/pre-v5-2026-11-19` remains at the pre-change main commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.  
**Research source:** reviewed read-only at `great-merchant-research` main commit `f52446e6a8f25a9cff4fe15a21e63b976df85317`, dated 17 November 2026.  
**Existing encrypted vault:** unchanged; `data/vault.json` remains blob `748f8863212c1a2911c53569e7c934293c5e4205`. No research records, source IDs or private media are included in the game.  
**Core commits:** first playable slice `f0b501f245ad57b49bb89ed4e7fc0501c080db50`; route expansion `ab7c7cf2a3d23507526051e2bcc3cdc8ef771cf8`.

## Delivered

- Original static browser game architecture under `game/`, with data, rules, persistence, presentation and hand-authored SVG art.
- Playable town-to-road-to-town loop: hire, pack, fight, recover route rewards, trade cargo, save and replay.
- Two routes: the Mosswind Road introductory errand and Amber Quarry, unlocked after completing Mosswind. Their encounters, art and rewards are original prototype content.
- Version 1 local saves migrate to version 2 while preserving the current journey and inventory.
- Public v5 plan, status, backlog and handoff documents.

## Verification

- `node --test tests/*.test.mjs`: **16/16 pass**, including engine rules, save migration, and a rendered app interaction that selects and starts the second route.
- JavaScript syntax checks and SVG/XML asset checks pass.
- Production route, app module, route data and new landscape asset returned HTTP 200. Production data includes the Amber Quarry encounter.
- Earlier live-browser smoke test completed the first route, returned to town, sold the cargo and verified the saved balance/day after reload.
- The committed production tree still contains the original encrypted vault blob SHA unchanged.

## Evidence boundary

Research supports broad patterns for onboarding, hiring and roster management, tactical orders, trade and reward progression. Exact current-game values and several behaviors remain version-scoped or unresolved. This prototype uses original fictional content and placeholder tuning; it makes no claims about current live-game balance.

## Next work

Continue with the highest-priority unchecked item in `docs/BACKLOG.md`: add a dismissible, replayable onboarding overlay, then make crew formation affect combat turn order and protection. Keep each increment tested and checkpointed before publishing it.
