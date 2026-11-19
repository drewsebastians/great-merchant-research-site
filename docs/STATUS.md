# Development Status

Updated: 19 November 2026  
Task: V5-004 — formation-aware combat  
Plan: Development Plan v5.0

## Current state

**Production:** live at https://drewsebastians.github.io/great-merchant-research-site/game/  
**Deployed game code:** commit `1514a19f9933d2560cebfa028416ea9f9d07ac7e` from `main`.  
**Rollback checkpoint:** `checkpoint/pre-v5-2026-11-19` remains at pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.  
**Research source:** reviewed read-only at `great-merchant-research` main commit `f52446e6a8f25a9cff4fe15a21e63b976df85317`, dated 17 November 2026.  
**Encrypted vault:** unchanged; `data/vault.json` remains blob `748f8863212c1a2911c53569e7c934293c5e4205`. No research records, source IDs or private media are included in the game.

## Delivered

- Original browser-game architecture under `game/`, with content, rules, persistence, presentation and hand-authored SVG art.
- Complete town-to-route-to-town loop with two distinct routes. Mosswind Road introduces the loop; completing it unlocks Amber Quarry.
- Four-step field guide that can be skipped, dismissed, replayed or closed with Escape; guide completion is saved locally.
- Formation choice between Mara and Tarin. The front member opens, receives the first enemy hit, and screens the rear member from 2 damage on rear attacks.
- Version 4 local saves migrate v1, v2 and v3 data while preserving the existing journey, route progress and guide preference.
- Public plan, status, backlog and handoff documents.

## Verification

- `node --test tests/*.test.mjs`: **19/19 pass**, covering route and trade rules, formation effects, app-render flows and v1–v3 save migration.
- JavaScript syntax checks pass. SVG/XML art checks passed for newly added assets.
- Production `app.mjs`, `data.mjs`, `storage.mjs` and `styles.css` returned HTTP 200 and contained current formation/save-version markers.
- The production tree retains the original encrypted research vault blob SHA unchanged.
- Earlier live-browser smoke test completed Mosswind, returned to town, sold cargo and confirmed the saved balance/day after reload.

## Evidence boundary

Research supports broad patterns for onboarding, hiring and roster management, tactical orders, trade and reward progression. Exact current-game values and several behaviors remain version-scoped or unresolved. This prototype uses original fictional content and placeholder tuning; it makes no claims about current live-game balance.

## Next work

Continue with the highest-priority unchecked item in `docs/BACKLOG.md`: add an equipment slot and one original upgrade with a visible effect. Keep the effect small, teach it in the interface and test both purchase and combat behavior.
