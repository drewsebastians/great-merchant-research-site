# Development Status

Updated: 19 November 2026  
Task: V5-005 — equipment and combat upgrade  
Plan: Development Plan v5.0

## Current state

**Production:** live at https://drewsebastians.github.io/great-merchant-research-site/game/  
**Deployed game code:** commit `41f872a8a67982098887185548a9e2011ef51822` from `main`.  
**Rollback checkpoint:** `checkpoint/pre-v5-2026-11-19` remains at pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.  
**Research source:** reviewed read-only at `great-merchant-research` main commit `f52446e6a8f25a9cff4fe15a21e63b976df85317`, dated 17 November 2026.  
**Encrypted vault:** unchanged; `data/vault.json` remains blob `748f8863212c1a2911c53569e7c934293c5e4205`. No research records, source IDs or private media are included in the game.

## Delivered

- Original browser-game architecture under `game/`, with content, rules, persistence, presentation and hand-authored SVG art.
- Complete town-to-route-to-town loop with two distinct routes, route rewards and trading.
- Four-step field guide that can be skipped, dismissed, replayed or closed with Escape; completion saves locally.
- Formation choice between Mara and Tarin. The front member opens, receives first contact, and screens the rear member from 2 damage on rear attacks.
- Buyable Wayfarer's Edge, one weapon slot, equip/unequip from Pack, and +3 damage to Mara's Strike. The effect is visible in Crew, Pack and combat orders.
- Version 5 local saves migrate v1–v4 data while preserving the journey, route progress, guide preference and formation.
- Public plan, status, backlog and handoff documents.

## Verification

- `node --test tests/*.test.mjs`: **21/21 pass**, including purchase/equip/unequip and combat effect, app-render interaction, route and formation rules, onboarding, and v1–v4 save migration.
- JavaScript syntax checks pass. SVG/XML art checks passed for new assets.
- Production `app.mjs`, `data.mjs`, `storage.mjs` and `styles.css` returned HTTP 200 and contained the current equipment/save-version markers.
- Production tree retains the original encrypted research vault blob SHA unchanged.
- Earlier live-browser smoke test completed Mosswind, returned to town, sold cargo and confirmed the saved balance/day after reload.

## Evidence boundary

Research supports broad patterns for onboarding, hiring and roster management, tactical orders, trade and reward progression. Exact current-game values and several behaviors remain version-scoped or unresolved. This prototype uses original fictional content and placeholder tuning; it makes no claims about current live-game balance.

## Next work

Continue with the highest-priority unchecked item in `docs/BACKLOG.md`: add a settlement ledger that shows trip cost, cargo value and net proceeds. Keep the calculation transparent and test it against the route rewards and market quotes.
