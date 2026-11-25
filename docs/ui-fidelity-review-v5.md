# Interface Fidelity Review — V5.0

Updated: 25 November 2026  
Scope: first playable web-game slice

## Review boundary

This review compares the prototype to the broad, confirmed patterns already translated in `development-plan-v5.md`: a persistent game shell, location and travel choice, roster management, trade and inventory, quest progress, and direct combat orders. It assesses hierarchy and interaction only. It does not reproduce source screenshots, names, exact values, source artwork, or private evidence records.

## Screen review

| Screen | Pattern represented | Current implementation | Remaining gap |
| --- | --- | --- | --- |
| Journey and travel | Location context, route choice, active errand, gated destinations | Illustrated town, connected route map, route cards, chapter summary and quest progress | Status rail is hidden on narrower screens; a compact errand strip now keeps progress visible there |
| Town Exchange | Goods, quotes, quantities and clear buy/sell actions | Item rows, buy and sell quotes, held quantity, one-item actions, workbench and settlement ledger; at 430px and below rows become two-column trade cards with larger buy/sell targets | Confirm the compact card layout on a physical phone |
| Crew | Roster, recruitment and party order | Hire board, crew vitality, front-member selection and formation effect | Deeper advancement and contract management are outside this slice |
| Pack | Distinct carried items with relevant actions | Supplies, trade goods, quest items and equipment show quantity and applicable use/equip/sell actions | Filtering and sorting are deferred until the catalog grows |
| Journal | Persistent activity, trip accounting and objective tracking | Ordered field log, cargo sale progress and net proceeds, plus a contract board showing each quest's completed, current, upcoming or locked objectives | Physical-phone visual review remains pending |
| Preferences | Player-controlled interface options | Saved English/Indonesian shared labels across shell, travel, market, crew, pack, journal, guide and combat; combat shortcut toggle | Route/quest prose and item descriptions remain English by design |
| Combat | Encounter context, target selection, party order and explicit actions | Illustrated scene, turn, target cards, HP bars, Strike/Brace/Technique, tonic and formation note | Party HP was only in the side rail; each combat portrait now includes current/max HP and a bar |
| Onboarding | Brief tutorial with a way back to play | Four-step guide, skip, close, replay and Escape | Outside tap now closes the guide and releases page controls |

## Implemented from this review

- At widths up to 1160px, show a compact active-errand strip with the current step and completion count, replacing information hidden with the desktop status rail.
- Show every crew member's current/max HP and vitality bar in the encounter scene, so combat status stays visible on tablets and phones.
- At widths up to 430px, reflow market rows into compact trade cards and enlarge the buy/sell tap targets.
- Render the quest catalog in Journal, marking completed, current, upcoming and prerequisite-locked objectives; the Journey button returns to route selection.
- Keep keyboard focus within the open field guide and return focus to the guide trigger when it closes.
- Translate all user-facing settings labels and helper text in Indonesian mode, including the shortcut toggle state; leave story and item descriptions in English.
- Translate the shared Market and Crew interface copy, including market actions' accessible labels; use word boundaries so translating `open` never corrupts a word such as `opens`, and preserve item names and descriptions as English.
- Extend shared Indonesian UI copy across Journey, Pack and Journal, including route-state labels, inventory actions and quest-board controls; leave route/quest prose, proper names and item descriptions as English.
- Translate the field guide steps, combat orders/status labels and static shell notes/accessibility names so the selected language remains consistent through the core gameplay loop.
- Translate victory/retreat actions and the settlement ledger's cost, reward, cargo and proceeds labels/helper copy; keep route victory text and item names in English.
- Retain the desktop side rail and existing save schema; this is a presentation-only change.

## Verification

- Rendered-flow check confirms the errand strip, party HP values and quest journal stage changes are present across game state transitions.
- `node --test tests/*.test.mjs`: 34/34 pass.
- `node scripts/validate-game-content.mjs`: catalogs and seven scene/portrait paths pass.
- Responsive CSS is checked at 1160px, 760px and 430px breakpoints. Actual device rendering still needs a device-level review.
- Live production smoke check confirms that tapping outside the first-run guide closes it and that Crew navigation responds afterward.
- Live Journal content initially appeared only after a cache-busted reload, revealing that an existing browser HTTP cache could keep an older app module after deployment. The service worker now uses a versioned shell cache, reloads shell requests on install and revalidates online files; after deployment, the normal production URL rendered the current Journal on reload.
- The production guide focus loop was checked with Tab, Shift+Tab and Escape. At 400% browser zoom, the compact bottom navigation and a market purchase action also responded; physical phone rendering remains unverified.
- Production Indonesian screen checks found mixed English labels across the game and a partial-word replacement defect (`opens` became `terbukas`). The localization pass now uses word boundaries, fills shared headings, controls, status labels, the onboarding guide, battle orders and result/settlement actions, and skips item name/description fragments. Cloud Chromium verified the deployed victory/settlement screens and their preserved route victory and item copy. Rendered-flow tests now also verify defeat copy, recovery into town, restored crew, cleared trip accounting and route switching; the defeat/recovery path is queued for production review after deployment.

## Next review target

Continue screen-by-screen interaction checks in Cloud Chromium. Review the defeat/recovery state and route switching after deployment. Keep item names/descriptions and route/quest prose in English. Verify the compact Town Exchange cards, quest journal and guide dismissal on a physical phone; verify PWA installation and offline launch in Edge when an appropriate Windows device is available.
