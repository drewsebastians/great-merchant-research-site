# Xian The Great Merchant Interface Fidelity Blueprint

**Version:** 1.0  
**Governs:** Development Plan v5.1  
**Updated:** 26 November 2026  
**Target:** Xian The Great Merchant desktop-client experience, adapted for a browser game

## Decision and correction

The V5.0 Wayfarer's Ledger build is a playable original merchant-and-party prototype. Its current interface is not a faithful reference to Xian The Great Merchant. The previous plan treated generic game concepts—navigation, party, inventory, trade and quests—as if they established interface fidelity. They do not. That claim is withdrawn.

The live production comparison found a modern dashboard composition: persistent page navigation, a wide inventory-card grid and a fixed quest/status rail. The official TGM interface guide shows a field-first game client: an in-world scene with a left character/mercenary portrait column, a circular minimap at the upper right, compact status/chat/menu controls along the bottom, and separate in-game windows. The official shortcut guide divides controls into field, shop and battlefield modes.

This blueprint replaces that generic layout as the controlling design specification. Until the criteria below are met, describe the current build as a playable prototype inspired by some merchant-party systems, not as a TGM-faithful interface.

## Reference set and confidence

| Reference | What it supports | Confidence and limits |
| --- | --- | --- |
| [Official TGM interface guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-interface.gs) | Character and mercenary window; overview values; chat; menu functions; date/time; minimap; NPC and GM markers. Its screenshot provides the field-screen composition. | Primary reference for the documented interface. The page does not identify the exact client build or establish every Xian-specific variation. |
| [Official TGM shortcut guide](https://www.thegreatmerchant.com/pub/guid/gett/gettingstarted-shortcuts.gs) | Separate field, shop and battlefield control groups. It lists exit town, map/window controls, inventory/status, shop exit, selected-item purchase and visited-town listing, plus battle option/withdraw, stop, move, attack, hold and unit-group controls. | Primary reference for control categories. Exact key mappings and behavior must be checked against Xian material before implementation is presented as version-exact. |
| [Xian newbie-camp walkthrough](https://www.youtube.com/watch?v=Sbo_Ec8vNuA) | Xian-specific visual cross-check; its chapter list identifies the interface at 06:44 and the early-game prologue/quest sequence. | Community-produced. Use dated frames as a comparator, not as proof of current rules or a universal client version. |
| [Xian interface walkthrough](https://www.youtube.com/watch?v=CM98PnuvXuI) | Additional Xian-specific client-screen reference. | Community-produced and older. Use only to compare visible layout; re-check against newer evidence. |
| Existing private research repository | Supports selected broad gameplay-system concepts already translated into the prototype. | It is not the visual authority for Xian. Its Korea-server records must not be silently relabeled as Xian facts; do not copy private records, IDs, excerpts or media into this public development repository. |

The official guide screenshot visibly places the playfield at the center, portraits down the left edge, a circular map in the upper-right area, and compact controls/status/chat across the lower edge. This establishes the macro layout. Exact pixel sizes, aspect ratio, icon art, fonts, colors and Xian client-version differences remain open until the Xian-specific visual cross-check is completed.

## What the target interface must feel like

Build a desktop game client inside the browser, not a conventional website dashboard.

- The in-world scene is the primary surface and occupies most of the client window.
- Character and mercenary portraits form a persistent vertical strip at the left of the scene.
- The minimap sits over the scene at the upper right and shows location context and relevant markers.
- A compact lower HUD groups character/party information, chat, menu/control icons and the date/time.
- Inventory, status, property, character, quest, community and system controls open contextual game windows from the client chrome. They do not become permanent website pages.
- Town, shop and battlefield are distinct client modes with controls appropriate to each.
- Use dense, framed, layered client UI with restrained metallic, dark and warm accents consistent with the inspected game screenshot. Avoid modern oversized cards, a numbered web-app rail, a permanent right quest dashboard and marketing-site hero panels.
- Preserve readability, keyboard access, browser zoom and touch support. Responsive adaptation may rearrange or open the same client windows differently on small screens, while desktop remains the fidelity target.
- Do not lock a canvas aspect ratio, exact coordinates or numeric color tokens until the Xian-specific screenshot comparison establishes them.

## Screen and behavior specification

| Mode or window | Required structure | Interaction target |
| --- | --- | --- |
| Field / town | Large in-world scene; player and NPC context; left portrait stack; upper-right minimap; lower HUD, chat, menu and date/time. | Move through locations, approach or select NPCs, open town information, exit town, and open/close client windows. |
| Character / mercenaries | Main character and owned mercenaries represented as client portraits with clear selection. | Selecting a portrait exposes that unit's inventory/status actions; preserve a readable party overview. |
| Overview / status | Compact level, stamina/hunger, total attack power, credit level and money values as shown in the official guide. | Values update from the local prototype state; all exact figures remain fictional and are labeled prototype data. |
| Inventory / property / quest / community / system | Windowed client panels opened from the menu controls, each with a clear close action and mode-aware state. | Keep core actions in those contextual windows; do not force all functions into permanent sidebar navigation. |
| Shop | Dedicated in-client trading view tied to a seller/location, with item selection and quantity controls. | Support buying/selling and a town availability/list view. The shortcut guide documents a selected-item buy-100 action and a list of visited towns; validate whether Xian still uses those exact controls before copying the shortcut. |
| Battlefield | Separate tactical scene and command HUD, with a clear selected-unit/group state. | Provide the documented command families: option/withdraw, stop, move, attack, hold, trade toggle and group selection. The current turn-based action menu is not the fidelity target. Verify timing, selection gestures and exact Xian behavior from Xian-specific material before claiming equivalence. |
| Results / return | Compact outcome view connected to field/town state, party condition, acquired goods and progress. | Preserve the playable loop and persist progress locally; use original labels, fiction and balance values. |

### Core playable loop

Keep the useful v5.0 game-state work—recruitment, travel, encounter, goods, trading, quest progress, recovery and local saves—as a scaffold. Re-present those actions through the client modes above. A player should still be able to start, explore, enter a shop, acquire and sell goods, enter a playable encounter, issue commands, return and continue after reload.

The exact Great Merchant progression, formulas, item prices, character names, skills, drop rates and server-specific rules are not part of this blueprint unless they have been independently verified for Xian and explicitly approved for the public specification. Existing prototype characters, goods and numerical tuning remain fictional.

## Architecture direction

Keep the dependency-free browser/PWA architecture and separate content, rules, save data and presentation. Refactor presentation around explicit modes and client windows:

- **Client shell:** scene canvas, portrait rail, minimap overlay, compact lower HUD and client menu.
- **Mode state:** field/town, shop, battlefield and results, with active window, selection and location state.
- **Windows:** inventory, character/status, property, quest, community and system panels.
- **Rules:** local game transitions for movement, recruitment, trade, encounters, command selection, rewards and recovery.
- **Content:** original setting, icons, portraits, maps and prototype values, kept separate from evidence.
- **Persistence:** retain versioned local saves and migrate them as the presentation and state model changes.
- **Verification:** state-transition tests plus screenshot comparisons at a standard desktop viewport and narrow browser widths.

The existing route/map cards may become an in-client world/town map window. The Crew screen may become the character/mercenary window. Pack, Journal and Preferences may supply inventory, quest and system-window content. Reuse state and rules only where they fit; do not preserve the web-dashboard navigation simply to avoid a shell redesign.

## Delivery sequence

1. **Reference baseline — P0.** Review the official interface/shortcut pages and Xian-specific walkthrough frames. Record a labeled screen-zone map and a source/version note. Keep unsupported details explicitly unresolved.
2. **Client shell — P0.** Replace the fixed web-app rail and permanent right status panel with the scene-first field layout, left portrait stack, minimap and compact lower HUD. Use original artwork.
3. **Client windows and shop — P0.** Open and close the character, inventory, status, property, quest and system windows from in-client controls. Add a distinct shop mode and keep the trading loop playable.
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
7. The scene and client-window visual hierarchy are compared with a usable Xian field frame. Material differences in scene density, panel framing, persistent chrome or lower-HUD proportions are addressed with independently authored styling; unresolved material differences keep the gate closed.
8. All imagery, names, map tiles, sounds, text, item values and tuning shipped in the public game are independently authored or properly licensed. No private research record or unauthorized TGM asset is copied.

Until all eight checks pass, retain the status “playable prototype; TGM interface fidelity in progress.” A dated field screenshot with unknown patch can support a version-scoped comparison, but it cannot verify current Xian client details by itself.
