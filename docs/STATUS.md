# Development Status

Updated: 19 November 2026  
Task: V5-003 — onboarding and save compatibility  
Plan: Development Plan v5.0

## Current state

**Production:** live at https://drewsebastians.github.io/great-merchant-research-site/game/  
**Deployed game code:** commit `2311ed2c299c9f9abec05f6cf96ede0df9f83f5a` from `main`.  
**Rollback checkpoint:** `checkpoint/pre-v5-2026-11-19` remains at pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.  
**Research source:** reviewed read-only at `great-merchant-research` main commit `f52446e6a8f25a9cff4fe15a21e63b976df85317`, dated 17 November 2026.  
**Encrypted vault:** unchanged; `data/vault.json` remains blob `748f8863212c1a2911c53569e7c934293c5e4205`. No research records, source IDs or private media are included in the game.  
**Core commits:** first playable slice `f0b501f245ad57b49bb89ed4e7fc0501c080db50`; route expansion `ab7c7cf2a3d23507526051e2bcc3cdc8ef771cf8`; onboarding `2311ed2c299c9f9abec05f6cf96ede0df9f83f5a`.

## Delivered

- Original browser-game architecture under `game/`, with content, rules, persistence, presentation and hand-authored SVG art.
- Complete town-to-route-to-town loop: hire, pack, fight, recover rewards, trade cargo, save and replay.
- Two distinct routes. Mosswind Road introduces the loop; clearing it unlocks Amber Quarry.
- Optional four-step field guide covering preparation, route choice, combat and returning cargo. Players can skip, close, replay or use Escape; completion persists locally.
- Save version 3 migrates v1 and v2 journeys without discarding currency, crew, inventory or route progress.
- Public development plan, status, backlog and handoff.

## Verification

- `node --test tests/*.test.mjs`: **17/17 pass**, covering engine rules, v1/v2 save migrations, route selection and reward flow, and app-render interactions for guide skip, replay, completion and route combat.
- JavaScript syntax checks and SVG/XML asset checks pass.
- Production page, app, route data and styles returned HTTP 200 with the new release markers.
- Earlier live-browser smoke test completed Mosswind, returned to town, sold cargo and confirmed the saved balance/day after reload. The route expansion was also verified through production file checks and the rendered app interaction test.
- Production tree retains the encrypted research vault blob SHA unchanged.

## Evidence boundary

Research supports broad patterns for onboarding, hiring and roster management, tactical orders, trade and reward progression. Exact current-game values and several behaviors remain version-scoped or unresolved. This prototype uses original fictional content and placeholder tuning; it makes no claims about current live-game balance.

## Next work

Continue with the highest-priority unchecked item in `docs/BACKLOG.md`: make crew formation affect turn order and protection. Keep the new rule set small, explicit and tested before deployment.
