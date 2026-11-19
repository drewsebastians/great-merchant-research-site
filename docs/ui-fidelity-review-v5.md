# Interface Fidelity Review — V5.0

Updated: 19 November 2026  
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
| Journal | Persistent activity and trip accounting | Ordered field log plus cargo sale progress and net proceeds | No additional gap blocks the first loop |
| Preferences | Player-controlled interface options | Saved English/Indonesian common labels and combat shortcut toggle | Story and item descriptions remain English by design |
| Combat | Encounter context, target selection, party order and explicit actions | Illustrated scene, turn, target cards, HP bars, Strike/Brace/Technique, tonic and formation note | Party HP was only in the side rail; each combat portrait now includes current/max HP and a bar |
| Onboarding | Brief tutorial with a way back to play | Four-step guide, skip, close, replay and Escape | Outside tap now closes the guide and releases page controls |

## Implemented from this review

- At widths up to 1160px, show a compact active-errand strip with the current step and completion count, replacing information hidden with the desktop status rail.
- Show every crew member's current/max HP and vitality bar in the encounter scene, so combat status stays visible on tablets and phones.
- At widths up to 430px, reflow market rows into compact trade cards and enlarge the buy/sell tap targets.
- Retain the desktop side rail and existing save schema; this is a presentation-only change.

## Verification

- Rendered-flow check confirms the errand strip and party HP values are present in combat.
- `node --test tests/*.test.mjs`: 34/34 pass.
- `node scripts/validate-game-content.mjs`: catalogs and seven scene/portrait paths pass.
- Responsive CSS is checked at 1160px, 760px and 430px breakpoints. Actual device rendering still needs a device-level review.

## Next review target

Verify the compact Town Exchange cards and the guide dismissal on a physical phone. Verify PWA installation and offline launch in Edge when an appropriate Windows device is available.
