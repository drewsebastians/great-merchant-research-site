# Interface Fidelity Review — V5.1 Xian TGM Reset

**Updated:** 26 November 2026
**Scope:** V5.0 production baseline, V5.1 implementation candidate and available Xian/TGM references
**Authority:** [TGM Interface Fidelity Blueprint](tgm-interface-blueprint-v1.md)

## Finding

The V5.0 production screen did not closely resemble Xian The Great Merchant. It was a playable original game, but the previous review used broad genre patterns as evidence of interface fidelity. That assessment is retired.

The pre-change production page was inspected in its Pack state. The official interface guide screenshot and official shortcut guide were also reviewed. The V5.1 implementation now replaces the modern dashboard with a scene-first client structure. Corrected commit `c80eaa217568dee3c6fd4be50736e8d63d3807a5` deployed in Pages run 45767255947 and was visually checked in the production browser. The first UI build exposed a stale dashboard lookup; it was fixed and redeployed before this verification.

## Public reference review

Reviewed 26 November 2026. Dates below are publication or access dates, not verified Xian client build numbers.

| Reference | Date and version scope | What was actually verified | Design use and boundary |
| --- | --- | --- | --- |
| [Official TGM interface guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-interface.gs) | Accessed 26 Nov 2026; page does not identify a client patch or regional client. | Describes character/mercenary window, overview values, chat, menu, date/time, minimap and NPC/GM markers; screenshot shows broad field-first relationships. | Primary macro-layout reference; do not copy screenshot, assets or exact dimensions. |
| [Official TGM shortcut guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-shortcuts.gs) | Accessed 26 Nov 2026; no Xian patch is identified. | Separates field, shop and battlefield controls, including move, attack, hold, stop, grouping, group selection and withdraw. The guide does not prove that those keys or timings apply to the current Xian build. | Prototype presents command families as clickable controls. No exact source-game mapping, gesture, combat timing or animation timing is claimed. |
| [Xian newbie-camp walkthrough, Part 1](https://www.youtube.com/watch?v=Sbo_Ec8vNuA&t=404s) | Published 28 Mar 2025. Description labels 06:44 “UI Xian” and 18:58 “Prologue”; its “Full Client 10/06/26” wording does not identify the footage build. | Page and chapter labels were accessible; the player stayed on a black buffering frame, so no field frame was visually inspected. | Dated lead only; cannot close the field-layout comparison. |
| [Xian quest-window screenshot, Jawoonbi guide](https://lasthero-xian2.blogspot.com/2016/01/quest-npc-jawoonbi-danau-1000-tahun.html) | Article dated 17 Jan 2016; capture date and client patch are not stated. | Screenshot was visually inspected. A compact dark, metal-framed “Quest Info” window overlays the field and groups task text, prerequisites, NPC, task goals, rewards and action buttons into narrow rows. | Dated Xian comparator for contextual-window density and layering. It is old and does not verify today's Xian field HUD, exact dimensions or current controls. Nothing was copied. |
| [Xian mercenary-book screenshot in the 2019 beginner guide](https://repeatloop.blogspot.com/2019/08/Tips-Newbie-Xian-Online.html) | Article dated 26 Aug 2019; capture date and client patch are unstated. | Screenshot was inspected. It shows a centered “Pictorial book of mercenaries” window with a dark panel, dense list, small labels and ornate border over an in-game scene. | Dated comparator for compact framed windows only; it does not verify current field geometry. Nothing was copied. |
| [“Beberapa UI Interface In Game” Xian video](https://www.youtube.com/watch?v=CM98PnuvXuI) | Published 11 Jan 2023; capture patch is not identified. | Search metadata identifies a Xian UI walkthrough, but footage was unavailable for frame-by-frame inspection. | Secondary candidate; not evidence for current controls or layout until a specific frame is accessible. |

## Screen-zone comparison and implementation candidate

The official guide directly supports the macro arrangement below. The production screenshot after run 45767255947 shows the central scene, portrait strip, minimap, lower HUD and contextual windows in their intended broad relationships, without the old navigation rail or permanent quest sidebar. A current Xian field-screen comparison remains incomplete: the 2016 and 2019 Xian screenshots show only contextual windows, and the 2025 video's UI chapter did not render in the review browser.

| Zone | Official-guide relationship | V5.1 implementation | Verification at this update |
| --- | --- | --- | --- |
| Main scene | Dominant field surface | Original town/road/quarry scene occupies the client stage | Production screenshot checked after run 45767255947 |
| Character and mercenary strip | Portrait column beside the scene | Original portrait buttons with health and selection state | Production screenshot and render test pass |
| Minimap | Upper-right overlay | Original local map with location line and zoom controls | Production screenshot and render test pass |
| Lower HUD | Compact overview, chat/menu and date/time | Overview strip, local-only note field, client menu and fictional day counter | Production screenshot and render test pass |
| Contextual windows | Opened from client controls | Inventory, character, status, property, quest, community, system, route and shop panels | Quest/route/shop smoke checks and open/close tests pass |
| Shop and battlefield | Separate control contexts | Framed shop mode; tactical scene and command deck for battlefield | Shop mode checked in production; battle state-flow tested automatically |

The V5.1 candidate uses original illustrations, portrait art, fictional content and prototype values. Its command note labels timing as prototype timing. Exact Xian key bindings, selection gestures, battle timing and current-build field/window geometry remain unresolved.

## V5.0 production-baseline gap matrix

| Area | V5.0 production screen | Reference baseline | Result before V5.1 |
| --- | --- | --- | --- |
| Main composition | Web-app header, numbered navigation rail, content cards and fixed right status rail | In-world scene with client controls and windows around or over it | Major mismatch |
| Character and mercenaries | Crew summary in the right sidebar; separate Crew page | Portrait strip beside the field scene | Major mismatch |
| Location context | Route cards and map nodes inside a page | Field/town scene with minimap and NPC markers | Major mismatch |
| Menu and windows | Full-page Journeys, Market, Crew, Pack, Journal and Preferences | Client menu opens contextual functions | Major mismatch |
| Trading | Web inventory/card layout inside a market page | Separate shop context | Major mismatch |
| Combat | Turn-based target cards and Strike/Brace/Technique | Battlefield command families | Major behavior/layout gap |
| Chat and status HUD | Save/currency in header; no persistent in-game chat | Compact character overview, chat, date/time and menu | Major mismatch |
| Visual treatment | Spacious HTML cards and persistent navigation | Dense, framed client chrome around the playfield | Major mismatch |

The corrected production rendering was checked after Pages run 45767255947. The existing browser save still showed day 5 and 102 marks, with the saved indicator active. No battle or trade action was run against that local journey.

## Acceptance checks

- [ ] A usable Xian field-screen frame is compared with the official guide. Available inspected Xian images show a 2016 quest window and 2019 mercenary window; video frames remain inaccessible.
- [x] Deployed desktop screenshot confirms a dominant in-world scene with no persistent dashboard rail or quest sidebar.
- [x] Deployed screenshot confirms the portrait strip, minimap, lower HUD/chat/menu/date and contextual windows in the intended broad relationships.
- [x] Code and automated render tests confirm distinct field, shop and battlefield modes.
- [x] Code and engine tests confirm clickable Move, Attack, Hold, Stop, group-selection and Withdraw controls; exact Xian timing, keys and selection gestures remain unresolved.
- [x] Existing gameplay transitions and save/reload/migration paths pass automated tests (38/38 total).
- [x] No source-client assets or private research records were added; the game continues to use original project artwork, fiction and fictional values.

The acceptance gate is not passed. Keep the description “playable prototype; TGM interface fidelity in progress” until every blueprint criterion is verified.

## Scope note

This review records the implemented macro structure, not an exact Xian client build or a current-Xian match. It does not claim pixel coordinates, screen ratio, font, icon set, key mapping, battle timing or game balance. Public guide imagery was not copied into the repository; private research records and media remain untouched.
