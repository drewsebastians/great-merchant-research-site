# Development Status

Updated: 19 November 2026  
Task: V5-011 — data-driven quest progression
Plan: Development Plan v5.0

## Current state

**Production:** live at https://drewsebastians.github.io/great-merchant-research-site/game/  
**Deployed game code:** commit `2cf536d12c0d61c699337448544bb2156edc1c60` from `main`.
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
- Hearthcross workbench recipe converts one trip-earned Bronze Fittings into a Quarry Tool Roll. The output stays sellable, and the latest trip ledger reprices linked cargo from 22 to 28 marks.
- Preferences screen switches common interface labels between English and Indonesian and persists the choice; narrative and item descriptions stay English.
- Combat number shortcuts can be disabled/re-enabled from Preferences, including during an encounter.
- Original region map draws route positions and connections from the data catalog, marks locked/selected/cleared locations, and supports the same accessible route action as the existing cards.
- A quest catalog drives entry requirements, ordered objective progress, first-completion rewards and route unlocks. The Courier's Mark completes on return to Hearthcross, grants its Courier's Seal once, and unlocks the Quarry Ledger; replaying a completed route does not duplicate the quest reward.
- Catalog validation checks duplicate IDs, item/route/quest/recipe references, prices and rewards, quest prerequisite cycles, recipe quantities, map coordinates, enemy stats and scene/portrait asset paths. `node scripts/validate-game-content.mjs` gives a clear nonzero failure on invalid content.
- Version 8 local saves migrate v1–v7 data while preserving journey progress, equipment, settlement, language and input settings.
- Public plan, status, backlog and handoff documents.

## Verification

- `node --test tests/*.test.mjs`: **31/31 pass**, including quest stage progression, one-time quest reward, entry-gate and unlock checks, negative content-validation cases, workbench creation and sale, English/Indonesian UI labels, live shortcut toggling, accessible map state and v1–v7 save migration.
- `node scripts/validate-game-content.mjs`: catalog checks pass; seven route/party scene and portrait paths exist.
- JavaScript syntax checks pass. SVG/XML art checks passed for new assets.
- GitHub Pages deployment workflow for commit `2cf536d12c0d61c699337448544bb2156edc1c60` completed successfully. The production game remains at the URL above.
- Production tree retains the original encrypted research vault blob SHA unchanged.
- Earlier live-browser smoke test completed Mosswind, returned to town, sold cargo and confirmed the saved balance/day after reload.

## Evidence boundary

Research supports broad patterns for onboarding, hiring and roster management, tactical orders, trade and reward progression. Exact current-game values and several behaviors remain version-scoped or unresolved. This prototype uses original fictional content and placeholder tuning; it makes no claims about current live-game balance.

## Next work

Continue with the highest-priority unchecked item in `docs/BACKLOG.md`. Status effects remain deferred until independently supported rules are available; offline-first Windows packaging is the next research/design item.
