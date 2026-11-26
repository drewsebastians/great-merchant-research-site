# Interface Fidelity Review — V5.1 Xian TGM Reset

**Updated:** 26 November 2026  
**Scope:** Live V5.0 screen compared with Xian/TGM reference structure  
**Authority:** [TGM Interface Fidelity Blueprint](tgm-interface-blueprint-v1.md)

## Finding

The live production screen does not closely resemble Xian The Great Merchant. It is a playable original game, but the previous review used only broad genre patterns and gave a misleading impression of interface fidelity. That assessment is retired.

The production page was visually inspected in its current Pack state. The official interface guide screenshot was inspected directly, and the official shortcut guide was reviewed. The reference guide shows a field-centered client with a left portrait stack, minimap in the upper-right, and a compact lower HUD, chat and control area. Its companion guide distinguishes field, shop and battlefield controls.

## Gap matrix

| Area | Live V5.0 prototype | TGM reference baseline | Result |
| --- | --- | --- | --- |
| Main composition | Modern web-app header, numbered navigation rail, large content cards and fixed right quest/status rail | In-world scene is the primary surface; game windows and controls sit around or over it | Major mismatch |
| Character and mercenaries | Compact crew summary in the right sidebar; dedicated Crew page | Main character and mercenary window with a vertical portrait strip visible beside the field scene | Major mismatch |
| Location context | Illustrated route cards and map nodes inside a page | Field/town scene with minimap and NPC/GM markers | Major mismatch |
| Menu and windows | Full-page Journeys, Market, Crew, Pack, Journal and Preferences navigation | Client menu opens inventory, status, property, character, quest, community and system functions | Major mismatch |
| Trading | Web inventory-style card/table layout inside a market page | Separate shop context with selected-item and visited-town controls | Major mismatch |
| Combat | Turn-based target cards and Strike/Brace/Technique actions | Battlefield mode with command families for move, attack, hold, stop, group selection and withdrawal | Major behavior and layout gap |
| Chat and status HUD | Save/currency in website header; no persistent in-game chat surface | Character overview, chat, game date/time and menu controls grouped in the lower client HUD | Major mismatch |
| Visual treatment | Spacious, polished HTML cards and persistent navigation | Dense, framed game-client chrome around the playfield | Major mismatch |

## Acceptance checks for the next review

- [ ] Xian-specific screenshot/video frames are recorded with source date/version and compared against the official guide.
- [ ] Desktop field view uses the in-world scene as its dominant surface.
- [ ] Portrait column, minimap, lower HUD/chat/menu/date and contextual window affordances match the reference relationships.
- [ ] Field, shop and battlefield appear as separate modes.
- [ ] Battlefield shows the verified command families; unverified key bindings/timing are labeled unresolved.
- [ ] The playable loop remains operable and saves after reload.
- [ ] Public assets are original or licensed; no private research data or source-client assets are copied.

## Scope note

This review confirms macro structure only. It does not claim exact Xian client build, pixel coordinates, screen ratio, font, icon set, key mapping, battle timing or current game balance. The interface guides are public references; their screenshots and other game artwork are not copied into the development repository.
