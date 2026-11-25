# Development Status

Updated: 25 November 2026  
Task: V5-027 — localize route and trade records across all game screens
Plan: Development Plan v5.0

## Current state

**Production:** live at https://drewsebastians.github.io/great-merchant-research-site/game/  
**Latest production code commit:** `b55fea7555a9f5500eb8b159ae7d36d92a0bba3f` from `main`.
**Latest production deployment:** Pages run `45542156190` succeeded for `b55fea7555a9f5500eb8b159ae7d36d92a0bba3f`.
**Rollback checkpoint:** `checkpoint/pre-v5-2026-11-19` remains at pre-change commit `a1bfc98df853ace84e4894c91361dcc3c5120935`.  
**Pre-tuning checkpoint:** `checkpoint/pre-v5-025-2026-11-25` is saved at `ccaae5a52f1694dc76be599dd0789f0b8f116423`.  
**Pre-localization-boundary checkpoint:** `checkpoint/pre-v5-026-2026-11-25` is saved at `3c463e506829818125c0f497f0da410ee250468f`.  
**Pre-log-localization checkpoint:** `checkpoint/pre-v5-027-2026-11-25` is saved at `0635af9b4311ef580196797d53da30af1a19eea3`.  
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
- Indonesian Preferences now translates the settings banner, help copy, local-settings badge, saved-on-device note and shortcut on/off state alongside the existing labels; story and item copy remain English.
- Indonesian Market and Crew screens now translate the shared headings, helper copy, formation rules, hiring controls, trade note and accessible buy/sell labels. Word-boundary matching prevents partial-word corruption (for example, `opens`), and item names and descriptions stay English.
- Indonesian Journey, Pack and Journal now translate their shared headers, progress/status labels, inventory controls and concise helper text. Route/quest prose and item descriptions remain English; common replacements use word boundaries.
- Indonesian onboarding and combat now translate all four guide steps, guide actions, target/turn/party labels, order instructions and recovery/status labels. The static reset button's accessible name, guide title and save/scope notes follow the selected language.
- Indonesian victory, retreat and settlement screens now translate results headings, return/recover actions, cargo/reward/proceeds labels and ledger helper text. Route victory copy and item names/descriptions stay English.
- Combat number shortcuts can be disabled/re-enabled from Preferences, including during an encounter.
- Original region map draws route positions and connections from the data catalog, marks locked/selected/cleared locations, and supports the same accessible route action as the existing cards.
- A quest catalog drives entry requirements, ordered objective progress, first-completion rewards and route unlocks. The Courier's Mark completes on return to Hearthcross, grants its Courier's Seal once, and unlocks the Quarry Ledger; replaying a completed route does not duplicate the quest reward.
- The game is installable as a Windows PWA from Edge. Its game-scoped manifest and service worker cache the app shell and original assets, revalidate online files against the deployment, and serve the saved shell when offline.
- The Amber Quarry encounter uses original prototype tuning at 64 HP and 18 damage. A standard Strike plan still wins; repeated Brace actions can defeat the crew, making retreat and recovery reachable through normal play.
- Indonesian UI localization protects complete route, quest and item prose from word-level substitutions; route selection and buy/sell confirmations are rendered as complete Indonesian notices.
- Route-selection and buy/sell messages now use the same complete Indonesian wording in the confirmation, field log and Journal. The English route and quest source copy remains intact.
- Cache refresh reliability is hardened: a v2 shell cache installs with HTTP-cache reload and successful online requests revalidate, addressing older modules persisting after a new deployment.
- The first-run guide still opens on a new save, but tapping outside its dialog now closes it, records the choice and releases the page controls. Escape, the close button and Skip Guide remain available.
- The guide keeps Tab and Shift+Tab within the open dialog and returns focus to the guide trigger after dismissal, including when the user presses Escape.
- At widths up to 1160px, the Journey screen shows a compact active-errand strip with stage and progress when the desktop status rail is hidden.
- Combat portraits display each crew member's current/max HP and vitality bar, including on tablet and phone layouts.
- At widths up to 430px, Town Exchange rows reflow into trade cards with larger buy/sell tap targets.
- Journal now renders the quest catalog with completed/current/upcoming objective states, locked prerequisites, and a direct Journey action.
- Live production checks in Cloud Chromium confirmed outside-tap guide dismissal, Crew and Journal navigation, a market purchase, and the quest Journal after a normal reload. At 400% browser zoom, the compact bottom navigation and market purchase target responded; this is a narrow-width browser check, not a physical-device test.
- `docs/ui-fidelity-review-v5.md` records the screen-by-screen high-level interface review, completed gaps and device checks still pending.
- `docs/windows-offline-packaging.md` records the PWA recommendation, trade-offs against Tauri and Electron, setup limits and release checks.
- Catalog validation checks duplicate IDs, item/route/quest/recipe references, prices and rewards, quest prerequisite cycles, recipe quantities, map coordinates, enemy stats and scene/portrait asset paths. `node scripts/validate-game-content.mjs` gives a clear nonzero failure on invalid content.
- Version 8 local saves migrate v1–v7 data while preserving journey progress, equipment, settlement, language and input settings.
- Public plan, status, backlog and handoff documents.

## Verification

- `node --test tests/*.test.mjs`: **35/35 pass**, including a normal Strike victory and a reachable Brace-driven Quarry defeat, Indonesian victory/settlement/defeat rendering, recovery, route switching, preserved English route/item/quest copy, safe word matching, focus/dismissal, quest progress, PWA refresh/offline fallback, workbench and v1–v7 save migration.
- `node scripts/validate-game-content.mjs`: catalog checks pass; seven route/party scene and portrait paths exist.
- JavaScript syntax checks pass. SVG/XML art checks passed for new assets.
- The Indonesian victory/settlement deployment is live. Cloud Chromium confirmed the result copy, return-to-town action, and preserved English route victory text and item names; Pages workflow run `45537422625` succeeded.
- Production Cloud Chromium confirmed a Brace-driven Amber Quarry defeat, Indonesian retreat result, recovery into Hearthcross with no reward settlement, route switching, and a normal Strike victory. Pages workflow run `45539788548` succeeded for the tuning.
- The follow-up copy-boundary fix preserves full English story prose and localizes route selection and buy/sell notices. All 35 automated tests and the content validator passed; Pages workflow run `45540650380` succeeded. Production verification of these latest notice changes is the next task.
- A truncated app-module upload briefly caused the latest production screen to render blank. The full 553-line source was restored, locally validated and checkpointed; Pages run `45541878333` succeeded. The follow-up log fix is deployed in run `45542156190`.
- Production Cloud Chromium verified the game screen and controls render, route-selection copy is wholly Indonesian in the notice, side log and Journal, purchase and sale confirmations are wholly Indonesian, and English narrative text remains unchanged. No production `game/app.mjs` runtime errors were observed.
- Production tree retains the original encrypted research vault blob SHA unchanged.
- Automated rendered-flow and offline-cache simulations pass. A physical phone review of guide dismissal, trade cards and combat controls plus Windows Edge install/offline verification remain pending.

## Evidence boundary

Research supports broad patterns for onboarding, hiring and roster management, tactical orders, trade and reward progression. Exact current-game values and several behaviors remain version-scoped or unresolved. This prototype uses original fictional content and placeholder tuning; it makes no claims about current live-game balance.

## Next work

Continue screen-by-screen production checks and responsive behavior. The defeat, recovery, route switch, ordinary Strike victory, route/trade notices and preserved story copy are verified live. Physical-phone review of the guide, market cards and combat controls and Windows Edge PWA install/offline checks still need suitable devices. Status effects remain deferred because the research repository contains no independently specified rule set.
