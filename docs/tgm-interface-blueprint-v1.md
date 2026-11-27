# Xian The Great Merchant Interface Fidelity Blueprint

> Verified implementation update: v25 HUD readability pass is deployed; see the release and evidence note at the end. The fidelity gate is unchanged.

**Version:** 1.0  
**Governs:** Development Plan v5.1  
**Updated:** 28 November 2026
**Target:** Xian The Great Merchant desktop-client experience, adapted for a browser game

## Decision and correction

The V5.0 Wayfarer's Ledger build is a playable original merchant-and-party prototype. Its current interface is not a faithful reference to Xian The Great Merchant. The previous plan treated generic game concepts—navigation, party, inventory, trade and quests—as if they established interface fidelity. They do not. That claim is withdrawn.

The live production comparison found a modern dashboard composition: persistent page navigation, a wide inventory-card grid and a fixed quest/status rail. The official TGM interface guide shows a field-first game client: an in-world scene with a left character/mercenary portrait column, a circular minimap at the upper right, compact status/chat/menu controls along the bottom, and separate in-game windows. The official shortcut guide divides controls into field, shop and battlefield modes.

This blueprint replaces that generic layout as the controlling design specification. Until the criteria below are met, describe the current build as a playable prototype inspired by some merchant-party systems, not as a TGM-faithful interface.

The client uses the broad scene-first zones and independently authored 1199×675 town, road and quarry illustrations. The lower HUD has three zones: overview at left, chat in the broad center, and menu/date controls at right. At 1363×936 CSS px in the production browser, the zones measured 337/674/337px (1:2:1) and the HUD was 107px high; these are prototype measurements, not measurements of Xian. The utility strip is 28px without the project wordmark. Paired contextual windows measured 432×440px with a 13px gap at the same viewport. They use an original stepped inset bevel, corner rivets, layered title edge, fine inner rail, midpoint fittings and an SVG titlebar engraving. Desktop windows can remain open together over the undimmed scene, can be focused, and Escape closes only the front window. The 14 Jan 2017 Xian screenshot visibly shows two centered framed windows side by side with a small gap. The 2019 Repeat Loop image provides a denser quest-panel comparator. Both images have unknown capture dates and client patches. The prototype proportions and frame remain interpretation, not a current-Xian specification, so the visual-treatment gate stays open.

In the 27 Nov 2026 production review, the single quest ledger measured 880×580px against a 1271×772px client-window layer at a 1363×936 CSS-pixel browser viewport (69%×75%); its heading is 21px. A second contextual window restores the separate 432×440px paired-window layout. The single-window scale and typography improve readability and answer a different, single-window layout state; neither dimension is a verified Xian measurement. The ledger still has a simpler, less ornamented hierarchy than the dated 2019 image. The 1:2:1 HUD remains unmeasured against Xian.

The v19 client translates the official interface guide's generic portrait semantics into the prototype: left-click opens Inventory in town, right-click opens Status outside battle, and the selected portrait is called out in the status roster. The guide has no displayed publication/update date or Xian client build, so this behavior is not described as verified for Xian. Localized labels explain the pointer actions; the status menu remains available as the keyboard/touch route. The browser check confirmed the interaction while preserving the day 05 / 102-mark save.

The v20 client adds an expanded original local route chart from the minimap. The dialog shows fictional route nodes and their prototype status, traps keyboard focus while open, dismisses with Escape or a close control, and restores focus to the minimap trigger. The Global Server [Update Notice 19/NOV/2026](https://www.thegreatmerchant.com/board/bbsPatch.gs?GSbid=18202&GSuid=148&page=1), posted 18 Nov 2026 for a 19 Nov update under Patch V34411, says Escape closes the UI while the map is maximized. That notice does not verify Xian behavior; this is a generic reference-informed prototype interaction. Production review confirmed the dialog and Escape behavior while retaining the day 05 / 102-mark save. Neither this interaction nor the route-chart styling closes the visual acceptance gate.

## Reference set and confidence

| Reference | What it supports | Confidence and limits |
| --- | --- | --- |
| [Official TGM interface guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-interface.gs) | Character and mercenary window; overview values; chat; menu functions; date/time; minimap; NPC and GM markers. It says left-clicking a character icon opens inventory and right-clicking opens status. Its screenshot provides the field-screen composition. | No publication/updated date or client build is shown; page does not establish every Xian-specific variation or confirm that these pointer actions match current Xian. |
| [Official TGM shortcut guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-shortcuts.gs) | Separate field, shop and battlefield control groups. It lists exit town, map/window controls, inventory/status, shop exit, selected-item purchase and visited-town listing, plus battle option/withdraw, stop, move, attack, hold and unit-group controls. | No publication/updated date or Xian build is shown. Exact key mappings and behavior must be checked against Xian material before implementation is presented as version-exact. |
| [Official Global Server Update Notice 19/NOV/2026](https://www.thegreatmerchant.com/board/bbsPatch.gs?GSbid=18202&GSuid=148&page=1) | Posted 18 Nov 2026; announces a Global Server update scheduled for 19 Nov 2026; Patch V34411. The notice does not identify Xian. | States that Escape can close the UI while the map is maximized. | Informs a generic map-dismiss interaction only. It does not establish Xian controls, timing or interface geometry. |
| [Xian Jawoonbi quest/NPC article](https://lasthero-xian2.blogspot.com/2016/01/quest-npc-jawoonbi-danau-1000-tahun.html) | Article dated 17 Jan 2016; the inspected image shows field/NPC context. | It is not a quest-window screenshot. Capture date and client patch are unknown. |
| [Xian Repeat Loop beginner guide](https://repeatloop.blogspot.com/2019/08/Tips-Newbie-Xian-Online.html) | Article dated 26 Aug 2019; its `quest panel.jpg` image is 1041×650. | Use only as a dated quest-window comparator; capture date and client patch are unknown. |
| [Xian King Shinsu tutorial field screenshot](https://xiantgmgalery.blogspot.com/2017/01/tutorial-membuat-king-shinsu-blak.html) | Article dated 14 Jan 2017; image is 1024×768. | Shows the field HUD and two side-by-side framed windows. Capture date and client patch are unknown. |
| [Xian newbie-camp walkthrough](https://www.youtube.com/watch?v=Sbo_Ec8vNuA) | Published 28 Mar 2025; description labels 06:44 “UI Xian” and 18:58 “Prologue.” | Player remained black/buffering at 0:00 during review; no frame or footage build was verified. |
| [Xian interface walkthrough](https://www.youtube.com/watch?v=CM98PnuvXuI) | Published 11 Jan 2023. | Player remained black/loading at 0:00 during review; no frame or footage build was verified. |
| [“May 22, 2026 - Xian The Great Merchant” livestream](https://www.youtube.com/watch?v=4dcTxP8Yfsw) | Published 22 May 2026; capture build is not stated. | Web player remained at 0:00 during review; no frame or footage build was verified. |
| Existing private research repository | Supports selected broad gameplay-system concepts already translated into the prototype. | It is not the visual authority for Xian. Its Korea-server records must not be silently relabeled as Xian facts; do not copy private records, IDs, excerpts or media into this public development repository. |

The official guide screenshot visibly places the playfield at the center, portraits down the left edge, a circular map in the upper-right area, and compact controls/status/chat across the lower edge. This establishes the macro layout. The 2017 screenshot supplies a dated full-client example with two side-by-side framed windows; the 2019 quest panel is the strongest available window-detail comparator. The 2016 Jawoonbi image is field/NPC context, not a quest-window example. The two video pages expose publication/chapter metadata, but neither yielded an inspectable frame during the 27 Nov 2026 review. Exact pixel sizes, aspect ratio, icon art, fonts, colors and Xian client-version differences remain open.

## What the target interface must feel like

Build a desktop game client inside the browser, not a conventional website dashboard.

- The in-world scene is the primary surface and occupies most of the client window.
- Character and mercenary portraits form a persistent vertical strip at the left of the scene.
- The minimap sits over the scene at the upper right and shows location context and relevant markers.
- A compact lower HUD groups character/party information, chat, menu/control icons and the date/time.
- Inventory, status, property, character, quest, community and system controls open contextual game windows from the client chrome. They do not become permanent website pages.
- Desktop can keep contextual windows open over the scene. The current adaptation places two windows side by side with a small gap, following the arrangement visible in the 14 Jan 2017 screenshot; clicking an exposed window brings it forward and Escape closes only the front window. It does not assert exact current-Xian window behavior. Small screens may show only the active window while preserving the open-window state.
- Town, shop and battlefield are distinct client modes with controls appropriate to each.
- Use dense, framed, layered client UI with restrained metallic, dark and warm accents informed by the dated 2017 field screenshot and 2019 quest panel. The prototype’s original SVG ornament and frame are design interpretation, not copied source artwork. Avoid modern oversized cards, a numbered web-app rail, a permanent right quest dashboard and marketing-site hero panels.
- Preserve readability, keyboard access, browser zoom and touch support. Responsive adaptation may rearrange or open the same client windows differently on small screens, while desktop remains the fidelity target.
- Do not lock a canvas aspect ratio, exact coordinates or numeric color tokens until the Xian-specific screenshot comparison establishes them.

## Screen and behavior specification

| Mode or window | Required structure | Interaction target |
| --- | --- | --- |
| Field / town | Large in-world scene; player and NPC context; left portrait stack; upper-right minimap; lower HUD, chat, menu and date/time. | Move through locations, approach or select NPCs, open town information, exit town, and open/close client windows. |
| Minimap / expanded local route chart | The minimap is an upper-right location cue; an original chart may open over the field. | Show fictional route nodes and availability. Trap focus and close with a button or Escape; this Escape behavior is informed only by a Global Server notice, not verified for Xian. |
| Character / mercenaries | Main character and owned mercenaries represented as client portraits with clear selection. | Selecting a portrait exposes that unit's inventory/status actions; preserve a readable party overview. |
| Overview / status | Compact level, stamina/hunger, total attack power, credit level and money values as shown in the official guide. | Values update from the local prototype state; all exact figures remain fictional and are labeled prototype data. |
| Inventory / character status | Inventory groups selected-character context, equipped item and carried goods; Status shows the selected character above the prototype summary and crew selectors. | Use only existing local data. Portrait selection changes transient UI state; it does not alter save fields. Keep the layout an original adaptation until a server- and version-identifiable screen is inspectable. |
| Inventory / property / quest / community / system | Windowed client panels opened from the menu controls, each with a clear close action and mode-aware state. | Keep core actions in those contextual windows; do not force all functions into permanent sidebar navigation. |
| Shop | Dedicated in-client trading view tied to a seller/location, with item selection and quantity controls. | Support buying/selling and a town availability/list view. The shortcut guide documents a selected-item buy-100 action and a list of visited towns; validate whether Xian still uses those exact controls before copying the shortcut. |
| Battlefield | Separate tactical scene and command HUD, with a clear selected-unit/group state. | Provide the documented command families: option/withdraw, stop, move, attack, hold, trade toggle and group selection. The current turn-based action menu is not the fidelity target. Verify timing, selection gestures and exact Xian behavior from Xian-specific material before claiming equivalence. |
| Results / return | Compact outcome view connected to field/town state, party condition, acquired goods and progress. | Preserve the playable loop and persist progress locally; use original labels, fiction and balance values. |

### Inventory and Status evidence update — 27 November 2026

The 10 July 2016 Indonesian Episode 2 guide supplies a historical editorial context and an inspectable inventory-window image, but a companion page acknowledges mixed screenshot sources. The 9 May 2026 livestream identifies Global Server in its description but has no inspectable frame. The May 2015 Duniaku image lead and LastHero archive remain unidentified. Keep these tracks distinct and use only their broad hierarchy. See [Inventory and Status reference evidence](inventory-status-evidence-2026-11-27.md) for the evidence ledger and limits. No exact geometry, keys, formula or patch is inferred; the blueprint gate stays open.

### Core playable loop

Keep the useful v5.0 game-state work—recruitment, travel, encounter, goods, trading, quest progress, recovery and local saves—as a scaffold. Re-present those actions through the client modes above. A player should still be able to start, explore, enter a shop, acquire and sell goods, enter a playable encounter, issue commands, return and continue after reload.

The exact Great Merchant progression, formulas, item prices, character names, skills, drop rates and server-specific rules are not part of this blueprint unless they have been independently verified for Xian and explicitly approved for the public specification. Existing prototype characters, goods and numerical tuning remain fictional.

## Architecture direction

Keep the dependency-free browser/PWA architecture and separate content, rules, save data and presentation. Refactor presentation around explicit modes and client windows:

- **Client shell:** scene canvas, portrait rail, minimap overlay, compact lower HUD and client menu.
- **Mode state:** field/town, shop, battlefield and results, with an ordered window stack, active window, selection and location state.
- **Windows:** inventory, character/status, property, quest, community and system panels, focusable and dismissible without dimming the desktop field.
- **Rules:** local game transitions for movement, recruitment, trade, encounters, command selection, rewards and recovery.
- **Content:** original setting, icons, portraits, maps and prototype values, kept separate from evidence.
- **Persistence:** retain versioned local saves and migrate them as the presentation and state model changes.
- **Verification:** state-transition tests plus screenshot comparisons at a standard desktop viewport and narrow browser widths.

The existing route/map cards may become an in-client world/town map window. The Crew screen may become the character/mercenary window. Pack, Journal and Preferences may supply inventory, quest and system-window content. Reuse state and rules only where they fit; do not preserve the web-dashboard navigation simply to avoid a shell redesign.

## Delivery sequence

1. **Reference baseline — P0.** Review the official interface/shortcut pages and Xian-specific walkthrough frames. Record a labeled screen-zone map and a source/version note. Keep unsupported details explicitly unresolved.
2. **Client shell — P0.** Replace the fixed web-app rail and permanent right status panel with the scene-first field layout, left portrait stack, minimap and compact lower HUD. Use original artwork.
3. **Client windows and shop — P0.** Open and close the character, inventory, status, property, quest and system windows from in-client controls. Allow multiple contextual windows over the desktop scene, use the side-by-side arrangement visible in the dated screenshot as a version-scoped reference, add a distinct shop mode and keep the trading loop playable.
4. **Battlefield commands — P0.** Replace the turn-based presentation with a battlefield surface and the verified command families. Keep battle timing and selection gestures version-scoped until Xian footage confirms them.
5. **Reconnect progression — P1.** Route recruitment, errands, cargo, rewards, recovery and save migration through the new shell. Add only gameplay specifics with adequate Xian evidence or clearly original adaptation labels.
6. **Responsive and offline release — P1.** Preserve the same mode/window model on small screens, then verify the PWA, keyboard, screen-reader names and install/offline path.

## Fidelity acceptance gate

A release may call itself “Xian TGM interface-inspired” only after all of these are true:

1. A normal desktop gameplay screenshot is scene-first and no longer resembles a generic dashboard.
2. The portrait stack, minimap, lower status/chat/menu region and client window model are present in the same broad relationships shown in the reference.
3. Field, shop and battlefield have separate layouts and mode-specific controls.
4. The battlefield exposes the verified TGM command families; unverified timing/keys are not stated as fact.
5. The main loop is playable with prototype-owned content and persists after reload.
6. Screen comparison against the cited official guide and Xian-specific reference frames is recorded in the fidelity review with publication dates and client-version uncertainty.
7. The scene and client-window visual hierarchy are compared with usable Xian field/window frames. The implementation uses original town and route illustrations, no separate project wordmark, a three-zone lower HUD, side-by-side windows, and an original quest-ledger hierarchy with filters, contract selection, focused detail, progress and milestone rows. The single quest window is now 880×580px with a 21px heading at a 1363×936 CSS-pixel viewport, while paired windows remain 432×440px; these are prototype layout values, not measurements or reproduced artwork. The 1:2:1 HUD ratio and titlebar ornament are also prototype choices. The contextual-window treatment remains simpler than the dated 2019 quest-panel comparator; exact HUD proportions and current-client details remain unknown, so unresolved differences keep the gate closed.
8. All imagery, names, map tiles, sounds, text, item values and tuning shipped in the public game are independently authored or properly licensed. No private research record or unauthorized TGM asset is copied.

Until all eight checks pass, retain the status “playable prototype; TGM interface fidelity in progress.” A dated field screenshot with unknown patch can support a version-scoped comparison, but it cannot verify current Xian client details by itself.

## Verified quest detail and paired-layout releases — 27 November 2026

- v22: candidate `b5cd70856abb9974dd19f07aa12c1d3c27734a6c` initially passed 40/42 tests; two PWA assertions still expected v21. Commit `1cbab01ab38c9fc44b9cd6b7e45249948b169a79` corrects them and asserts old cache removal. All 42 tests, syntax, content validation and Git diff checks passed in run 45998086065. A first browser harness expectation was corrected to account for the two intentional language-change log entries; all other save state was compared exactly. Pages 45998288370 succeeded; live verification 45998465634 confirmed byte-identical CSS/service worker, actual Chrome game interactions and offline reload.
- v23: original CSS-only paired desktop quest layout improves the cramped detail seen in the v22 browser screenshot. At 1363×936 the detail spans 384.125px and two compact contract cards are 182.062px each. The outer paired window geometry and single-window layout remain unchanged. At 390×844 and 340×740 the single-column narrow layout remains intact; no horizontal document overflow. The historical 2017 side-by-side window and 2016 inset detail evidence inform the broad organization, not exact measurements. Scroll is still required to read all milestones in the height-limited paired window. Implementation head `c9b1047f54c8c80d0c37bacc24c6e6940b491cd7`; 42/42, syntax, content, diff and browser/offline checks in 45998588961; Pages 45998737438 succeeded; live run 45998825387 passed byte comparison, all three viewports, filters, detail selection, empty state, bilingual controls, route-chart action, Escape/focus, save reload and actual offline reload through the active worker.
- The validation branch `validation/quest-inset-detail-2026-11-27` retains the isolated GitHub Actions workflow (head `e2a434f718f63017886572dfe7033d76f9d7171a`); it checks out the exact candidate SHA, uses a disposable browser profile, and adds no shipped dependency. Local container DNS did not permit cloning, so full-repository checks ran in GitHub Actions. The disposable saves were seeded day 05 / 102 marks; actual user local storage was never accessed or changed. Physical Android/iOS and Windows Edge install and broader accessibility checks remain open.
- Recovery: `checkpoint/pre-quest-candidate-validation-2026-11-27` at `b5cd70856abb9974dd19f07aa12c1d3c27734a6c`; `checkpoint/pre-quest-inset-promotion-2026-11-27` at `b11a6bacc578230fdeebc11f5b7ccaa07ad6ddfd`; `checkpoint/pre-quest-paired-layout-2026-11-27` at `1cbab01ab38c9fc44b9cd6b7e45249948b169a79`. Candidate branches retained. No gameplay, original assets, save schema or encrypted vault changed. Research main remains read-only at `f52446e6a8f25a9cff4fe15a21e63b976df85317`; its actual vault path `dist-github-pages/data/vault.json` and development `data/vault.json` share blob `748f8863212c1a2911c53569e7c934293c5e4205`.
- Evidence correction: the [26 Aug 2019 Repeat Loop quest guide](https://repeatloop.blogspot.com/2019/08/Tips-Newbie-Xian-Online.html) discusses the Global Server after Indonesian releases; the same community's [27 Mar 2019 article](https://repeatloop.blogspot.com/2019/03/download-xian-great-merchant-server-international.html) reports the Indonesian server closed 28 Jan 2018. The shutdown date is a community report, not independently verified. The quest panel is a Global-context comparator with unverified image provenance and patch, not established Indonesian Xian footage. The [10 Jul 2016 Indonesian Episode 2 introduction](https://xiantgmindo.blogspot.com/2016/07/game-intro-xian-tgm-indonesia-episode-2.html) gives an explicit Indonesian-server guide context and describes client controls; its images' actual capture build remains unverified. KotakGame's [Episode 2 listing](https://www.kotakgame.com/gamebox/detail/6/4623/The-Great-Merchant-Xian-Episode-2) notes a 27 Jul 2015 screenshot update, but direct retrieval returned 403 and no linked screenshot was inspected. January 2016 quest image previews and January 2017 field frame remain historical only; Xian-labelled later video titles do not establish server identity. Seek an inspectable frame paired with a named server and verifiable patch; do not substitute Global patch notices for Xian evidence. The fidelity gate remains open.

### Verified implementation update — 27 November 2026

PWA shell v24 deploys the Inventory and Status presentation pass under implementation `be7ddd88e5b25fee9fdbbc9a7f63c29f21a53457` (Pages run `46010209631`). Existing vitality/focus, equipped weapon and cargo are grouped in Inventory; Status surfaces the selected character and accessible crew selectors. Selection is not saved. Isolated browser validation `46009842569` passed at desktop and two narrow widths, including English/Indonesian labels, save preservation and offline reload. Production UI and the existing day 05 / 102-mark save were checked after deployment. These checks establish prototype behavior only. The historical Indonesian Episode 2 screen has mixed image provenance, the Global Server lead has metadata but no frame, and the remaining image leads are unidentified; no geometry or exact controls can yet be derived.


### Verified HUD implementation update — 28 November 2026

Implementation `9c537e5e4973d645ebd9f546dce224758515196d` ships the original responsive HUD usability update as v25. Overview/chat labels use 8–9px, menu labels use 8px, the menu wraps over five columns and two rows across desktop and narrow widths, and buttons have a 44px minimum height. Validation run `46084604216` passed; Pages run `46084804013` deployed successfully and the live production CSS/service worker match the implementation commit. These values are not sourced from Xian and do not satisfy the blueprint's reference-comparison gate. The latest search still lacks an inspectable Xian frame linked to a capture build or patch. Indonesian Episode 2, Global Server, HK/TW and unidentified/mixed-source references remain distinct in the evidence ledger.
