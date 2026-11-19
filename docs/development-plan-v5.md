# Development Plan v5.0

**Project:** Wayfarer's Ledger — a browser-first, single-player trading and party-adventure prototype  
**Started:** 19 November 2026  
**Phase:** playable core iteration  
**Game repository:** drewsebastians/great-merchant-research-site

## Direction

Build an independently authored game that captures broad interface and play patterns of a classic merchant-led party RPG. The first milestone favors a familiar game-client structure—location scene, navigation rail, party status, inventory, combat orders, market board, journal and quest progress—alongside a complete short gameplay loop.

The site remains browser-based and works on desktop and mobile. The local prototype is an original adaptation. It does not use source-game client code, screenshots, sprites, logos, maps, guide text or private research records.

## Research translated into specifications

Only system-level findings are carried into the public development repo. The private evidence ledger, source identifiers, guide excerpts and media stay in the research repo.

| Confirmed system pattern | Development specification | Boundary |
| --- | --- | --- |
| Tutorial and nearby tasks introduce money, purchasing, production, storage, travel and hiring | Teach the first loop through a short errand: recruit a partner, pack a supply, travel, resolve an encounter, recover cargo and trade it back in town | This prototype uses its own fictional town, task, prices and values |
| A party/roster supports recruitment, storage, ordering and progression | Give the player a crew screen, a small formation, visible vitality and a recruit action | The first slice has one optional companion; deeper formation rules remain in backlog |
| Combat has direct movement/attack orders and contextual skills | Present explicit Strike, Brace and Technique orders with target selection and visible focus | Click controls are used; no source-game key mapping or damage formula is claimed |
| Items enter through several routes and can be traded or used in production | Separate supplies, healing items, trade goods and quest items; expose buy, sell and use actions | Quotes and item effects are prototype balance, not copied live-game values |
| Encounters connect monsters, item acquisition and progression | Make two original routes reward distinct cargo and reputation; unlock the second after the introductory route | No drop probability or exact source-game route is represented |

The research corpus contains version-scoped and community-reported findings. Current client behavior and exact balance are not assumed by this prototype. Where evidence is unresolved, the game uses clearly labelled original placeholder rules.

## V5.0 scope

### Included in the first playable slice

- Static, dependency-free web app under /game/.
- A version 8 local save with migrations from versions 1–7 and a fresh-journey reset.
- Hearthcross as a town hub with a short errand and journey status.
- A four-step optional field guide that can be skipped, dismissed and replayed.
- A compact crew board; hiring a trail scout is required before the route.
- A small market with buy/sell quotes, an inventory and usable healing supply.
- Two data-driven route choices with distinct art, encounters and rewards.
- Turn-based combat with target selection, Strike, Brace, a focus-gated technique and a consumable.
- A selectable crew front member that changes the action opening, first target and rear-line damage protection.
- One original weapon with an equipment slot, local equip/unequip and a visible +3 Strike effect.
- A settlement ledger that separates ration cost, route reward, total cargo value, cargo sold and net proceeds.
- A Hearthcross workbench recipe that converts route-earned Bronze Fittings into an original, sellable Quarry Tool Roll.
- Saved interface language choice for English/Indonesian common labels and an independent toggle for combat number shortcuts.
- An accessible, data-driven region map with original route positions, connections and locked/selected state beside the route cards.
- A data-driven quest catalog with stable IDs, entry conditions, ordered objectives, one-time completion rewards, prerequisites and unlocks; the first errand's objective counter and quarry gate read from this catalog.
- A content-validation pass for item/route/quest/recipe IDs, references, route and quest rewards, prerequisite cycles, map positions, encounter data and referenced art files.
- An installable Windows PWA shell with original app icons, a repository-subdirectory-aware manifest, and a same-origin service worker that supports offline game loading after its first online cache fill.
- Victory, retreat, loot, return-to-town recovery, reputation and repeatable route flow.
- Original hand-authored SVG scenes, portraits, marks and interface icons.
- Responsive desktop and mobile navigation, keyboard combat shortcuts and accessible button labels.

### Deliberately deferred

- Full map traversal, pathfinding, online services, multiplayer, accounts and server saves.
- Source-game names, exact unit/stat/item data, exact prices, drop odds or formulas.
- Long-form quest chains, production professions, multi-step crafting and advanced promotion.
- Full translation of story, item descriptions and all narrative content; the current Indonesian setting covers navigation, common interface labels and controls.
- Imported screenshots, client files, music, copyrighted sprites or guide images.
- User data collection; the save stays in this browser's local storage.

## Web architecture

| Layer | Files | Responsibility |
| --- | --- | --- |
| Content | game/data.mjs | Original item, route, quest, route-connection and recipe catalogs, guide copy, starting state and encounter definitions |
| Rules | game/engine.mjs, game/quests.mjs | State transitions for hiring, trade, production, supplies, combat and route rewards; quest stages, entry gates and unlock evaluation |
| Persistence | game/storage.mjs | Versioned local-storage read/write, v1–v7 migrations and safe fallback |
| Presentation | game/app.mjs, game/index.html, game/styles.css, game/manifest.webmanifest, game/sw.js | Screen rendering, input handling, responsive layout, accessibility, install metadata and offline caching |
| Original art | game/assets/*.svg | Hand-authored scenes, portraits and UI symbols |
| Verification | tests/*.test.mjs, game/validation.mjs, scripts/validate-game-content.mjs | Node tests for rules, quests, save migrations and rendered flow, plus ID/reference/balance/asset checks |

No runtime library or build step is required. The game module is isolated under /game/ so the existing encrypted research library and its files remain unchanged.

## Acceptance criteria

The first slice is complete when a new player can:

1. Open the game without a password or account.
2. Hire the scout and see the crew and currency update.
3. Set out only when the crew and ration requirements are met.
4. Select an enemy and win or lose with visible turn-by-turn outcomes.
5. Use a tonic, earn route cargo and return to town after victory.
6. Sell cargo and see the ledger balance update.
7. Reload the page and continue from the saved state.
8. Reset only this game's local save.
9. Complete the same loop on a narrow mobile layout.
10. Verify that the public build contains no private research records or unauthorized assets.
11. Choose between routes, unlock the second route and play its distinct encounter.
12. Skip or complete the field guide, replay it later, dismiss it with Escape or an outside click, and keep that choice across reloads.
13. Change the front member and see the action order, first target and rear protection change in combat.
14. Buy, equip and unequip an original weapon; see its damage effect in the crew, pack and combat UI.
15. Return from either route and review its costs, reward, cargo sale progress and net proceeds.
16. Convert a route material at the workbench, see its output and resale value, and sell the crafted good.
17. Choose English or Indonesian for common interface labels, switch combat number shortcuts off/on, and keep both settings across reloads.
18. Select routes from the regional map or route cards and hear whether a location is open, selected, cleared or locked.
19. Run the catalog checker and receive a clear failure for invalid references, balances, positions or missing route/portrait artwork.
20. Track each errand's ordered objectives, entry requirements, first-completion rewards and next-route unlock from the quest catalog; returning home completes the quest and repeat runs do not duplicate its one-time reward.
21. Install the game from the production URL as an Edge PWA, load the saved app shell offline after the initial online cache fill, and retain the same origin-scoped local save.

## Release guardrails

- Keep the private research repo read-only during game work.
- Keep the existing encrypted vault byte-for-byte unchanged.
- Do not copy research source IDs, provenance metadata, private claims, guide text or research records into this public repo.
- Treat all newly introduced prices, damage, HP, rewards and timings as original prototype tuning.
- Keep artwork original and generated from authored SVG markup.
- Push the implementation branch for review, then fast-forward the Pages branch only after tests and content checks pass.
