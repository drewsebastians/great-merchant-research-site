# Development Status

Updated: 19 November 2026  
Task: V5-006 — settlement ledger
Plan: Development Plan v5.0

## Current state

**Production:** live at https://drewsebastians.github.io/great-merchant-research-site/game/  
**Deployed game code:** commit `aa90154c780a87d703acca9a94a5447f59708655` from `main`.
**Rollback checkpoint:** `checkpoint/pre-v5-2026-11-19` remains at pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.  
**Research source:** reviewed read-only at `great-merchant-research` main commit `f52446e6a8f25a9cff4fe15a21e63b976df85317`, dated 17 November 2026.  
**Encrypted vault:** unchanged; `data/vault.json` remains blob `748f8863212c1a2911c53569e7c934293c5e4205`. No research records, source IDs or private media are included in the game.

## Delivered

- Original browser-game architecture under `game/`, with content, rules, persistence, presentation and hand-authored SVG art.
- Complete town-to-route-to-town loop with two distinct routes, route rewards and trading.
- Four-step field guide that can be skipped, dismissed, replayed or closed with Escape; completion saves locally.
- Formation choice between Mara and Tarin. The front member opens, receives first contact, and screens the rear member from 2 damage on rear attacks.
- Buyable Wayfarer's Edge, one weapon slot, equip/unequip from Pack, and +3 damage to Mara's Strike. The effect is visible in Crew, Pack and combat orders.
- Settlement ledger on Town, Market and Journal showing trip cost, route reward, full cargo value, cargo sold and net proceeds. Selling cargo updates the latest trip total.
- Version 6 local saves migrate v1–v5 data while preserving the journey, route progress, guide preference, formation and equipment.
- Public plan, status, backlog and handoff documents.

## Verification

- `node --test tests/*.test.mjs`: **22/22 pass**, including both route settlement calculations, cargo-sale updates, rendered ledger and v1–v5 save migration.
- JavaScript syntax checks pass. SVG/XML art checks passed for new assets.
- Production `app.mjs`, `data.mjs`, `engine.mjs`, `storage.mjs` and `styles.css` returned HTTP 200 and contained settlement/version markers.
- Production tree retains the original encrypted research vault blob SHA unchanged.
- Earlier live-browser smoke test completed Mosswind, returned to town, sold cargo and confirmed the saved balance/day after reload.

## Evidence boundary

Research supports broad patterns for onboarding, hiring and roster management, tactical orders, trade and reward progression. Exact current-game values and several behaviors remain version-scoped or unresolved. This prototype uses original fictional content and placeholder tuning; it makes no claims about current live-game balance.

## Next work

Continue with the highest-priority unchecked item in `docs/BACKLOG.md`: add a small production recipe that converts gathered materials into a trade item. Keep the recipe original and make the input, output and currency effects clear.
