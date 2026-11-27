# Interface Fidelity Review — V5.1 Xian TGM Reset

**Updated:** 27 November 2026
**Scope:** V5.0 production baseline, V5.1 deployed client and available Xian/TGM references
**Authority:** [TGM Interface Fidelity Blueprint](tgm-interface-blueprint-v1.md)

## Finding

The V5.0 production screen did not closely resemble Xian The Great Merchant. It was a playable original game, but the previous review used broad genre patterns as evidence of interface fidelity. That assessment is retired.

The pre-change production page was inspected in its Pack state. The official interface, shortcut and battle-system guides were reviewed; source dates and version limits are listed below. V5.1 replaces the modern dashboard with a scene-first client. Commit `c32d9bf` corrected the two-window arrangement; `e7c7433` added original titlebar engraving, equal-height paired windows, a prototype 1:2:1 lower-HUD grid and shell v15. Quest-ledger commit `d87e94d1ca12ca67b2cb9a2637efac7cb81ce758` reorganizes the journal around All/Open/Completed filters, a contract list, focused detail, progress, milestones and a route-chart action; Pages run `45961499731` succeeded. Localization fix `38834b8df1f19d80bd22f5ff3bcec8c5addfbda4` preserves control classes and `data-*` attributes during Indonesian text replacement and advances the PWA shell to v17; Pages run `45962041736` succeeded. Production checks verified the three filters, contract/detail updates, empty state, route-chart navigation, Escape close, shop return to field and the visible day 05 / 102-mark save. No purchase or progression action was performed. The synced status/fidelity documentation commit `84e8851` also deployed successfully in Pages run `45963240569`.

## Public reference review

**Latest visual pass — 27 Nov 2026:** Pages run `45965078349` deployed `11e1a0401d42520086b55ce8bc2cc68743ad76ce` with the PWA shell advanced from v17 to v18. On the production page at 1363×936 CSS px, the single quest window measures 880×580px inside a 1271×772px client window layer (69%×75%), and the ledger heading is 21px. This brings the original list/detail panel closer to the source image's large, dense-window role while improving reading size; the source image is 1041×650px, but that is the image canvas size, not a verified Xian interface specification. The 2019 panel still uses denser ornament and sections. The 2017 field screenshot remains the basis only for the broad two-window side-by-side arrangement. Neither capture has a known capture date or client patch.

Rechecked 27 November 2026. Dates below are publication or access dates, not verified Xian client build numbers.

| Reference | Date and version scope | What was actually verified | Design use and boundary |
| --- | --- | --- | --- |
| [Official TGM interface guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-interface.gs) | No publication/updated date is shown; accessed 27 Nov 2026; page does not identify a client patch or regional client. | Describes character/mercenary window, overview values, chat, menu, date/time, minimap and NPC/GM markers. It identifies Stamina as hunger and the screenshot shows broad field-first relationships. | Primary macro-layout reference; do not copy screenshot, assets or exact dimensions. The prototype labels its food inventory count Rations rather than claiming it reproduces this status field. |
| [Official TGM shortcut guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-shortcuts.gs) | No publication/updated date is shown; accessed 27 Nov 2026; no Xian patch is identified. | Separates field, shop and battlefield controls, including move, attack, hold, stop, grouping, group selection and withdraw. The guide does not prove that those keys or timings apply to the current Xian build. | Prototype presents command families as clickable controls. No exact Xian key mapping, gesture, combat timing or animation timing is claimed. |
| [Official TGM battle-system guide](https://www.thegreatmerchant.com/pub/guid/syst/systems-battle.gs) | No publication/updated date is shown; accessed 27 Nov 2026; no Xian region or client patch is identified. | States that battle groups can be assigned with Ctrl+number; withdrawal uses Esc then the Withdraw option; withdrawal during the first 20 seconds incurs an experience loss. | Records what the official general TGM guide says, not verified current Xian behavior. The prototype's retreat/recovery values are fictional and do not implement that penalty. |
| [Xian newbie-camp walkthrough, Part 1](https://www.youtube.com/watch?v=Sbo_Ec8vNuA&t=404s) | Published 28 Mar 2025. Description labels 06:44 “UI Xian” and 18:58 “Prologue”; its “Full Client 10/06/26” wording does not identify the footage build. | Page and chapter labels were accessible; the player stayed black/buffering at 0:00, so no field frame was visually inspected. | Dated lead only; cannot close the field-layout comparison. |
| [Xian Jawoonbi quest/NPC article](https://lasthero-xian2.blogspot.com/2016/01/quest-npc-jawoonbi-danau-1000-tahun.html) | Article dated 17 Jan 2016; capture date and client patch are not stated. | The inspected image shows an in-world field/NPC scene. It is not a quest-window screenshot. | Dated field-interaction lead only; it does not support window styling or current field geometry. Nothing was copied. |
| [Xian Repeat Loop beginner guide](https://repeatloop.blogspot.com/2019/08/Tips-Newbie-Xian-Online.html) | Article dated 26 Aug 2019; the inspected image is 1041×650; capture date and client patch are unstated. | The `quest panel.jpg` image shows a dense quest window with category tabs, a left task list, inset information sections and bottom action buttons over the game scene. | Dated contextual-window comparator only; it does not verify current Xian geometry or controls. Nothing was copied. |
| [Xian King Shinsu tutorial field screenshot](https://xiantgmgalery.blogspot.com/2017/01/tutorial-membuat-king-shinsu-blak.html) | Article dated 14 Jan 2017; the screenshot capture date and client patch are unstated. It is 1024×768. Its in-game clock reads `08. DEC. 1543. 13:00`; this is fictional game time, not the screenshot date. | Full client screenshot visually inspected. It shows the world scene, a left portrait stack, an upper-right minimap, two centered dark framed windows side by side with a small gap, compact status/currency at lower left, chat along the bottom, and menu/date controls at lower right. The windows do not overlap in this image. | Historical Xian field-layout comparator. It establishes only what is visible in this screenshot, not current Xian geometry, exact controls or client version. No image or assets were copied. |
| [“Beberapa UI Interface In Game” Xian video](https://www.youtube.com/watch?v=CM98PnuvXuI) | Published 11 Jan 2023; capture patch is not identified. | The player remained black/loading at 0:00 during this review; no frame was visually verified. | Dated lead only; not evidence for current controls or layout until a specific frame is accessible. |

## Screen-zone comparison and implementation candidate

The official guide directly supports the macro arrangement below. On 27 Nov 2026, the production screenshot was compared with the 14 Jan 2017 Xian field screenshot. Both place the field scene in the center, portraits at left, a minimap at upper right, and status/chat/menu/date controls along the bottom. The Xian image shows two centered windows side by side with a small gap; an earlier note incorrectly described them as overlapping, so the layout and backlog have been corrected. The 2019 Repeat Loop quest-panel image is the available window-detail comparator; the 2016 Jawoonbi image is field/NPC context only. The client removes the old navigation rail and permanent quest sidebar. Original 1199×675 Hearthcross, Mosswind Road and Amber Quarry illustrations give the field and route encounters distinct scenes and are included in the PWA app-shell cache. The lower HUD uses three zones: overview, chat/field log, and client menu plus date/time. At 1363×936 CSS px in production these zones measure 337/674/337px (1:2:1). This is a prototype CSS ratio informed by the visual grouping, not a measured Xian ratio. The 28px utility strip remains separate. The frame uses original bevels, corner rivets, a double title edge, inner rail, midpoint fittings and an engraved titlebar ornament; it remains simpler than the dated quest-panel image. This comparison does not establish current Xian geometry or styling.

| Zone | Official-guide relationship | V5.1 implementation | Verification at this update |
| --- | --- | --- | --- |
| Main scene | Dominant field surface | Original town/road/quarry scene occupies the client stage | Town scene checked in game; route images loaded from production after run 45795440090 |
| Character and mercenary strip | Portrait column beside the scene | Original portrait buttons with health and selection state | Production screenshot and render test pass |
| Minimap | Upper-right overlay | Original local map with location line and zoom controls | Production screenshot and render test pass |
| Lower HUD | Compact overview, chat/menu and date/time | Three zones: overview at left, broad chat/field log in the center, menu/date/time at right | Production at 1363×936 CSS px measured 337/674/337 px; prototype 1:2:1 ratio, not an Xian measurement |
| Contextual windows | Opened from client controls; 2017 Xian frame shows two windows at once; 2019 image shows a dense quest window | Original route ledger with All/Open/Completed filters, contract selector, detail/progress/milestones and route-chart action; a single quest window scales to 880×580px at 1363×936 CSS px | Production verified filter and detail behavior, empty state, route action, Escape close and shop mode. Single-window size is 69%×75% of the client layer; paired windows retain their separate 432×440px layout. All measurements are prototype choices |
| Shop and battlefield | Separate control contexts | Framed shop mode; tactical scene and command deck for battlefield | Shop mode checked in production; battle state-flow tested automatically |

### Field-screen visual comparison

The 2017 Xian frame is a 1024×768 field view with portraits and minimap integrated into the scene, compact controls on the lower edge, and two dark, ornate windows side by side with a small gap. The 2019 Repeat Loop image shows a denser quest panel with category tabs, a left task list, inset sections and bottom actions. The current prototype uses original painted town and route backdrops, a left portrait rail, upper-right minimap, a 1:2:1 lower HUD and contextual windows. Its quest ledger now gives the contract list and selected detail distinct roles and exposes progress/milestones plus a route-chart action. The utility strip has no project wordmark. At 1363×936 CSS px, the HUD zones measure 337/674/337px and the older paired-window layout measured 432×440px with a 13px gap; these are prototype measurements only. The independent titlebar ornament, bevel, rivets, inner rail and midpoint fittings remain simpler than the dated quest-panel image. Filter and detail changes, the empty state, route action, Escape close, shop return and save preservation were checked in production. This is a version-scoped structural comparison, not a visual match to a known current Xian build. Exact HUD proportions and remaining window treatment differences remain open.

The latest single-window quest state at the same production viewport measured 880×580px against a 1271×772px window layer; its 21px heading is substantially larger than the previous micro-label hierarchy. Production selection changed the active contract, the Open filter displayed its empty state, All restored the list, and the route action opened the map window. The day 05 / 102-mark save remained visible. No economy, travel or battle action was run. The screenshot comparison now supports an original larger, readable quest panel, but does not establish a matching pixel size or current-Xian styling.

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
- [x] Existing gameplay transitions and save/reload/migration paths pass automated tests (39/39 total).
- [x] Comparison against the official guides and available Xian screenshot/video references is recorded with publication/access dates and client-version uncertainty. The 2017 tutorial screenshot and 2019 quest-panel image were visually inspected; their capture dates and Xian client patches are unknown. The 2023 and 2025 video players yielded no inspectable frames.
- [ ] Material visual differences are resolved: the 880×580 single-window scale improves reading size, but the 2019 quest panel remains denser and more ornate, and the 1:2:1 lower-HUD ratio has not been verified against a current Xian build. Window sizing and titlebar ornament are prototype choices; they do not close the comparison gate.
- [x] No source-client assets or private research records were added; the game continues to use original project artwork, fiction and fictional values.

The blueprint gate remains open because detailed visual treatment and precise current-Xian geometry remain unresolved. The quest ledger now has clearer list/detail hierarchy and original progress/milestone treatment, but the 2019 panel is still denser and more ornate; the 1:2:1 HUD split is not a measured Xian proportion. The updates improve the prototype’s organization but do not establish a match to a current Xian client. Keep the description “playable prototype; TGM interface fidelity in progress.”

## Additional release checks

- [x] After the compact-client and notice-fix deployments, browser-zoom emulations at 779px, 681px and 340px CSS widths showed no visible horizontal scrolling; the 340px view returned to a clear scene after transient notice expiry. These emulations are not physical-device checks.
- [ ] Physical narrow-device, keyboard-focus and accessible-control checks remain open.
- [ ] Live PWA offline behavior remains unverified. The managed browser blocked DevTools under organization policy, so no live offline toggle or workaround was attempted. Automated service-worker tests use a mocked offline path.

## Scope note

This review records the implemented macro structure, not an exact Xian client build or a current-Xian match. It does not claim pixel coordinates, screen ratio, font, icon set, key mapping, battle timing or game balance. Public guide imagery was not copied into the repository; private research records and media remain untouched.

**27 November implementation follow-up:** Pages run `45961499731` deployed quest-ledger commit `d87e94d`; run `45962041736` deployed localization fix `38834b8` and shell v17. Filters, selected-contract detail, empty state, route-chart action, Escape close, shop return and saved day 05 / 102 marks were checked in production. The 39 existing tests and game-content validation passed. This does not close the visual fidelity finding.
