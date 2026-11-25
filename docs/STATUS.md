# Development Status

Updated: 25 November 2026  
Task: V5-017 — responsive interaction review
Plan: Development Plan v5.0

## Current state

**Production:** live at https://drewsebastians.github.io/great-merchant-research-site/game/  
**Latest game code:** commit `38ac0cdc78c98f075aa29e7ef443848082afe9f6` from `main`.
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
- The game is installable as a Windows PWA from Edge. Its game-scoped manifest and service worker cache the app shell and original assets, revalidate online files against the deployment, and serve the saved shell when offline.
- Cache refresh reliability is hardened: a v2 shell cache installs with HTTP-cache reload and successful online requests revalidate, addressing older modules persisting after a new deployment.
- The first-run guide still opens on a new save, but tapping outside its dialog now closes it, records the choice and releases the page controls. Escape, the close button and Skip Guide remain available.
- At widths up to 1160px, the Journey screen shows a compact active-errand strip with stage and progress when the desktop status rail is hidden.
- Combat portraits display each crew member's current/max HP and vitality bar, including on tablet and phone layouts.
- At widths up to 430px, Town Exchange rows reflow into trade cards with larger buy/sell tap targets.
- Journal now renders the quest catalog with completed/current/upcoming objective states, locked prerequisites, and a direct Journey action.
- Live production checks in Cloud Chromium confirmed outside-tap guide dismissal, Crew navigation and the quest Journal after a normal reload of the production URL. The service-worker refresh fix is deployed; physical-phone visual and touch review remains pending.
- `docs/ui-fidelity-review-v5.md` records the screen-by-screen high-level interface review, completed gaps and device checks still pending.
- `docs/windows-offline-packaging.md` records the PWA recommendation, trade-offs against Tauri and Electron, setup limits and release checks.
- Catalog validation checks duplicate IDs, item/route/quest/recipe references, prices and rewards, quest prerequisite cycles, recipe quantities, map coordinates, enemy stats and scene/portrait asset paths. `node scripts/validate-game-content.mjs` gives a clear nonzero failure on invalid content.
- Version 8 local saves migrate v1–v7 data while preserving journey progress, equipment, settlement, language and input settings.
- Public plan, status, backlog and handoff documents.

## Verification

- `node --test tests/*.test.mjs`: **34/34 pass**, including guide dismissal, mobile-market CSS, quest journal progress/lock/unlock rendering, combat vitality, PWA shell refresh and offline fallback, workbench, preferences and v1–v7 save migration.
- `node scripts/validate-game-content.mjs`: catalog checks pass; seven route/party scene and portrait paths exist.
- JavaScript syntax checks pass. SVG/XML art checks passed for new assets.
- GitHub Pages deployment for commit `38ac0cdc78c98f075aa29e7ef443848082afe9f6` succeeded in run `45530898916`.
- Production tree retains the original encrypted research vault blob SHA unchanged.
- Automated rendered-flow and offline-cache simulations pass. A physical phone review of guide dismissal, trade cards and combat controls plus Windows Edge install/offline verification remain pending.

## Evidence boundary

Research supports broad patterns for onboarding, hiring and roster management, tactical orders, trade and reward progression. Exact current-game values and several behaviors remain version-scoped or unresolved. This prototype uses original fictional content and placeholder tuning; it makes no claims about current live-game balance.

## Next work

Continue with automated narrow-screen and keyboard interaction review in Cloud Chromium. Verify the guide, market cards and combat controls on a physical phone, and complete Windows Edge PWA install/offline checks when suitable devices are available. Status effects remain deferred because the research repository contains no independently specified rule set.
