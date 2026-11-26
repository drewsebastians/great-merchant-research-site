# Interface Fidelity Review — V5.1 Xian TGM Reset

**Updated:** 26 November 2026
**Scope:** V5.0 production baseline, V5.1 deployed client and available Xian/TGM references
**Authority:** [TGM Interface Fidelity Blueprint](tgm-interface-blueprint-v1.md)

## Finding

The V5.0 production screen did not closely resemble Xian The Great Merchant. It was a playable original game, but the previous review used broad genre patterns as evidence of interface fidelity. That assessment is retired.

The pre-change production page was inspected in its Pack state. The official interface guide screenshot and official shortcut guide were also reviewed. The V5.1 implementation replaces the modern dashboard with a scene-first client structure. Corrected commit `c80eaa217568dee3c6fd4be50736e8d63d3807a5` deployed in Pages run 45767255947 and was visually checked in the production browser. The first UI build exposed a stale dashboard lookup; it was fixed and redeployed before that verification. Tablet-width fix commit `da6a5cf89ce7865a7169d75d3ab8cabf54c4dd9f` deployed in Pages run 45784931192. Visual pass commit `05c2607a22aa0c7596d83b4ebaa0079fb648fd28` deployed in run 45786650163, duplicate-header-label fix `ca683f0b1fe2d6de4af7f95cd626a5312df63006` deployed in run 45787017262, and the original illustrated town scene `a38cbdbeb0e35e57c580f524973e1cc26fcafd7d` deployed in run 45788583206. The latest client commit `6bcd76e1d2625015227216eb513f1deaa0da8c1f` is live; production browser inspection confirmed the illustration and revised quest window. The save remained at day 05 and 102 marks. Narrow-width emulations have not been repeated after `b1b7b0e`.

## Public reference review

Reviewed 26 November 2026. Dates below are publication or access dates, not verified Xian client build numbers.

| Reference | Date and version scope | What was actually verified | Design use and boundary |
| --- | --- | --- | --- |
| [Official TGM interface guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-interface.gs) | Accessed 26 Nov 2026; page does not identify a client patch or regional client. | Describes character/mercenary window, overview values, chat, menu, date/time, minimap and NPC/GM markers; screenshot shows broad field-first relationships. | Primary macro-layout reference; do not copy screenshot, assets or exact dimensions. |
| [Official TGM shortcut guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-shortcuts.gs) | Accessed 26 Nov 2026; no Xian patch is identified. | Separates field, shop and battlefield controls, including move, attack, hold, stop, grouping, group selection and withdraw. The guide does not prove that those keys or timings apply to the current Xian build. | Prototype presents command families as clickable controls. No exact source-game mapping, gesture, combat timing or animation timing is claimed. |
| [Official TGM battle-system guide](https://www.thegreatmerchant.com/pub/guid/syst/systems-battle.gs) | Accessed 26 Nov 2026; no Xian region or client patch is identified. | States that battle groups can be assigned with Ctrl+number; withdrawal uses Esc then the Withdraw option; withdrawal during the first 20 seconds incurs an experience loss. | Records what the official general TGM guide says, not verified current Xian behavior. The prototype's retreat/recovery values are fictional and do not implement that penalty. |
| [Xian newbie-camp walkthrough, Part 1](https://www.youtube.com/watch?v=Sbo_Ec8vNuA&t=404s) | Published 28 Mar 2025. Description labels 06:44 “UI Xian” and 18:58 “Prologue”; its “Full Client 10/06/26” wording does not identify the footage build. | Page and chapter labels were accessible; the player stayed on a black buffering frame, so no field frame was visually inspected. | Dated lead only; cannot close the field-layout comparison. |
| [Xian quest-window screenshot, Jawoonbi guide](https://lasthero-xian2.blogspot.com/2016/01/quest-npc-jawoonbi-danau-1000-tahun.html) | Article dated 17 Jan 2016; capture date and client patch are not stated. | Screenshot was visually inspected. A compact dark, metal-framed “Quest Info” window overlays the field and groups task text, prerequisites, NPC, task goals, rewards and action buttons into narrow rows. | Dated Xian comparator for contextual-window density and layering. It is old and does not verify today's Xian field HUD, exact dimensions or current controls. Nothing was copied. |
| [Xian mercenary-book screenshot in the 2019 beginner guide](https://repeatloop.blogspot.com/2019/08/Tips-Newbie-Xian-Online.html) | Article dated 26 Aug 2019; capture date and client patch are unstated. | Screenshot was inspected. It shows a centered “Pictorial book of mercenaries” window with a dark panel, dense list, small labels and ornate border over an in-game scene. | Dated comparator for compact framed windows only; it does not verify current field geometry. Nothing was copied. |
| [Xian King Shinsu tutorial field screenshot](https://xiantgmgalery.blogspot.com/2017/01/tutorial-membuat-king-shinsu-blak.html) | Article dated 14 Jan 2017; the screenshot capture date and client patch are unstated. It is 1024×768. Its in-game clock reads `08. DEC. 1543. 13:00`; this is fictional game time, not the screenshot date. | Full client screenshot visually inspected. It shows the world scene, a left portrait stack, an upper-right minimap, two centered dark framed windows, compact status/currency at lower left, chat along the bottom, and menu/date controls at lower right. | Historical Xian field-layout comparator. It establishes only what is visible in this screenshot, not current Xian geometry, exact controls or client version. No image or assets were copied. |
| [“Beberapa UI Interface In Game” Xian video](https://www.youtube.com/watch?v=CM98PnuvXuI) | Published 11 Jan 2023; capture patch is not identified. | Search metadata identifies a Xian UI walkthrough, but footage was unavailable for frame-by-frame inspection. | Secondary candidate; not evidence for current controls or layout until a specific frame is accessible. |

## Screen-zone comparison and implementation candidate

The official guide directly supports the macro arrangement below. On 26 Nov 2026, the production screenshot was compared with the 14 Jan 2017 Xian field screenshot. Both place the field scene in the center, portraits at left, a minimap at upper right, and status/chat/menu/date controls along the bottom. The deployed client removes the old navigation rail and permanent quest sidebar. The original 1199×675 town illustration increases scene density; commit `b1b7b0e` removes the project wordmark, retains a 28px strip for save/help/reset and reduces the desktop lower HUD from 160px to 118px. Commit `6bcd76e` adds original geometric corner bevels, a layered 32px title bar and removes the repeated project eyebrow. The lower HUD still uses separated function panels, and its exact proportions remain unverified; the new window frame is independently authored and remains simpler than the historical screenshot. This broad-composition comparison does not establish current Xian client geometry or styling.

| Zone | Official-guide relationship | V5.1 implementation | Verification at this update |
| --- | --- | --- | --- |
| Main scene | Dominant field surface | Original town/road/quarry scene occupies the client stage | Production screenshot checked after run 45767255947 |
| Character and mercenary strip | Portrait column beside the scene | Original portrait buttons with health and selection state | Production screenshot and render test pass |
| Minimap | Upper-right overlay | Original local map with location line and zoom controls | Production screenshot and render test pass |
| Lower HUD | Compact overview, chat/menu and date/time | Overview strip, local-only note field, client menu and fictional day counter | Production screenshot and render test pass |
| Contextual windows | Opened from client controls | Inventory, character, status, property, quest, community, system, route and shop panels | Quest/route/shop smoke checks and open/close tests pass |
| Shop and battlefield | Separate control contexts | Framed shop mode; tactical scene and command deck for battlefield | Shop mode checked in production; battle state-flow tested automatically |

### Field-screen visual comparison

The 2017 Xian frame is a 1024×768 field view with portraits and minimap integrated into the scene, compact controls on the lower edge, and two overlapping, dark, ornate windows. The current production client uses an original painted town backdrop, left portrait rail, upper-right minimap, compact lower HUD and contextual quest window. Its utility strip has no project wordmark and measures 28px; the lower HUD measures 118px at the checked desktop viewport. The contextual window now uses original corner bevels and a layered title bar, but remains simpler than the historical frame. Lower functions remain grouped in separated panels. This is a useful, version-scoped structural comparison, not a visual match to a known current Xian build. Further work should refine independent window ornament and verify HUD proportions against better-dated Xian material.

The V5.1 candidate uses original illustrations, portrait art, fictional content and prototype values. The general official battle guide specifies Ctrl+number group assignment and Esc → Withdraw, with an experience penalty for withdrawal within the first 20 seconds. It does not identify Xian or a client patch, so these are not claimed as current Xian mappings or timing, and the prototype does not implement that penalty. Exact Xian key bindings, selection gestures, battle timing and current-build field/window geometry remain unresolved.

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

The corrected production rendering was checked after Pages run 45767255947, and the breakpoint fix after run 45784931192. The existing browser save still showed day 5 and 102 marks, with the saved indicator active. No battle, trade or reset action was run during this review; prior sale and purchase entries were already visible in its local field log.

## Acceptance checks

- [x] Deployed desktop screenshot confirms a dominant in-world scene with no persistent dashboard rail or quest sidebar.
- [x] Deployed screenshot confirms the portrait strip, minimap, lower HUD/chat/menu/date and contextual windows in the intended broad relationships.
- [x] Code and automated render tests confirm distinct field, shop and battlefield modes.
- [x] Code and engine tests confirm clickable Move, Attack, Hold, Stop, group-selection and Withdraw controls; the official general guide documents Ctrl+number grouping and Esc → Withdraw with a first-20-second XP penalty, but their applicability to Xian remains unverified.
- [x] Existing gameplay transitions and save/reload/migration paths pass automated tests (38/38 total).
- [x] Comparison against the official guide and a usable Xian field frame is recorded with publication date and client-version uncertainty. The 14 Jan 2017 tutorial screenshot was visually inspected; its capture date and Xian client patch are unknown.
- [ ] Material visual differences are resolved: the window trim remains simpler than the 2017 frame, and the lower-HUD panel proportions have not been verified against a current Xian build. The wordmark is removed, the utility strip is 28px, and the field scene now uses original illustrated art.
- [x] No source-client assets or private research records were added; the game continues to use original project artwork, fiction and fictional values.

The blueprint gate is not passed because the visual-treatment item remains open: the contextual-window frame is simpler than the dated comparator and exact HUD proportions remain unverified. The new scene illustration and compact client chrome reduce earlier gaps but do not establish a match to a current Xian client. Keep the description “playable prototype; TGM interface fidelity in progress.”

## Additional release checks

- [x] After Pages runs 45784931192 and 45787017262, browser-zoom emulations at 779px, 681px and 340px CSS widths showed no visible horizontal scrolling. These emulations are not physical-device checks and predate `b1b7b0e`.
- [ ] Physical narrow-device, keyboard-focus and accessible-control checks remain open.
- [ ] Live PWA offline behavior remains unverified. The managed browser blocked DevTools under organization policy, so no live offline toggle or workaround was attempted. Automated service-worker tests use a mocked offline path.

## Scope note

This review records the implemented macro structure, not an exact Xian client build or a current-Xian match. It does not claim pixel coordinates, screen ratio, font, icon set, key mapping, battle timing or game balance. Public guide imagery was not copied into the repository; private research records and media remain untouched.
