# Development Plan v5.1 — Xian TGM Interface-Fidelity Reset

**Project:** Wayfarer's Ledger, an original browser game using Xian The Great Merchant as a direct interface reference  
**Updated:** 26 November 2026  
**Repository:** drewsebastians/great-merchant-research-site  
**Controlling specification:** [TGM Interface Fidelity Blueprint](tgm-interface-blueprint-v1.md)

## Current decision

V5.0 produced a playable browser-game loop and a modular local-save/PWA foundation. Before the V5.1 rebuild, its live interface was a modern web dashboard with a page-navigation rail, inventory cards and a persistent quest rail. That composition differed substantially from the field-first Xian/TGM client shown in the official interface guide. The V5.0 description overstated how closely its interface referred to TGM; that claim is withdrawn.

V5.1 resets the UI target around Xian The Great Merchant's actual client organization: a central in-world scene, left-side character/mercenary portraits, an upper-right minimap, a compact lower HUD with status/chat/menu/date, contextual client windows, and separate field, shop and battlefield modes. The latest production code commit `ca683f0b1fe2d6de4af7f95cd626a5312df63006` deployed in Pages run 45787017262. The visual treatment pass in `05c2607a22aa0c7596d83b4ebaa0079fb648fd28` shortened the header and lower HUD and darkened the double-framed client windows. A full Xian field screenshot dated 14 Jan 2017 is visually compared with production; its client patch and capture date are unknown. The broad zones align, but the flat scene art, extra brand strip and broad divided lower panels remain material differences, so the expanded visual-treatment acceptance criterion remains open. Browser-zoom checks at 779px, 681px and 340px CSS widths show no visible horizontal scrolling; the 779px location title remains legible. A live offline check was blocked by the managed browser's DevTools policy.

## Research and reference translation

| Evidence | Specification | Boundary |
| --- | --- | --- |
| Official TGM interface guide | Build the main client around the field scene, character/mercenary window, overview values, chat, menu functions, date/time, minimap and NPC/GM markers. | Official page does not identify the Xian client patch; use it for structure and compare with Xian-specific screens before freezing detailed styling. |
| Official TGM shortcuts guide | Treat field, shop and battlefield as distinct control contexts. Add the documented movement, party/window, trade, shop, attack/hold/stop/group and withdraw affordances. | Confirm exact bindings and Xian behavior using Xian-specific references; do not infer a universal timing model from the shortcut list alone. |
| Official TGM battle-system guide | Record the general guide's Ctrl+number battle-group assignment and Esc → Withdraw route; it reports an experience loss when withdrawing within the first 20 seconds. | The page does not identify Xian or a client patch. These are reference claims only and are not implemented as prototype rules until Xian-specific applicability is verified. |
| Xian King Shinsu tutorial field screenshot | Compare the field scene, left portraits, upper-right minimap, compact lower controls and framed windows as broad hierarchy. | Article dated 14 Jan 2017; screenshot is 1024×768, but capture date and Xian client patch are unknown. Do not infer current geometry or exact controls. |
| Xian walkthrough videos | Compare the official guide layout with visible Xian client screens, especially the introductory interface and play flow. | Community evidence is dated/version-scoped and is not a source of exact game balance. |
| Existing research repository | Reuse broad system findings only where the specification identifies their game/server scope and they fit the independently authored prototype. | Korean main-server findings do not automatically describe Xian UI, names, values or current rules. Private source records/media remain in the research repository. |

## Playable core to retain

Keep the useful, independently authored V5.0 systems as a scaffold while replacing their presentation and correcting mode behavior:

- Dependency-free web game with local versioned saves, migration and PWA offline shell.
- Original town/travel loop, recruitment, party status, routes, errands, rewards, inventory, trade, recovery and quest progress.
- Original prototype equipment, production recipe and settlement ledger, if they fit the new client windows and remain clearly prototype systems.
- English and Indonesian common interface labels, keyboard accessibility, browser zoom and touch operation.

The current turn-based Strike/Brace/Technique battle screen is not evidence of TGM fidelity. The new battlefield should expose the command-oriented controls listed in the official shortcut guide. Exact selection gestures, battle timing, unit behavior and Xian-specific mechanics remain subject to Xian reference verification.

## V5.1 delivery plan and current progress

### P0 — Match the client interface

1. Complete the screen-zone comparison in the blueprint and review Xian-specific public reference frames.
2. Rebuild the desktop field shell as a scene-first client with portrait strip, minimap overlay, lower HUD/chat/menu and hidden-until-open client windows.
3. Add separate field/town, shop and battlefield modes with distinct control surfaces.
4. Make the battlefield command affordances visible and usable, while keeping any unverified timing or key semantics out of the specification.
5. Preserve the existing core loop through the redesigned views; use fictional names, art and balance data.

### P1 — Complete the playable adaptation

1. Reconnect quest, recruitment, trading, route access, reward and recovery flows to in-client windows and world interaction.
2. Migrate existing local saves without losing progress.
3. Verify the shell at desktop and narrow/mobile viewports, including keyboard focus and accessible labels.
4. Re-run the browser/PWA and offline checks after UI changes; verify the deployed build before calling this milestone complete.

The scene-first shell, contextual windows, shop and battlefield command surface, and existing save-backed loop are implemented. Automated verification passes 38/38 tests and content validation; production browser checks covered the field, quest window, shop mode and CSS-width layouts. The historical Xian field-frame comparison is recorded, but the scene/window visual treatment remains a blocker. Physical-device, keyboard-focus and actual offline checks remain open.

## Architecture

Retain the existing static browser architecture under game/. Organize presentation and state around explicit modes—field/town, shop, battlefield and results—and active windows. Keep content catalogs, rules, persistence, rendering and original SVG assets separate. Refactor game/app.mjs and game/styles.css for the client shell; adapt game/engine.mjs and game/storage.mjs only where new command/mode state requires it. No new external runtime dependency is needed for the current scope.

## Definition of done

Do not describe a release as TGM interface-inspired until it passes the eight-item acceptance gate in the blueprint: scene-first composition, correct client zones, separate field/shop/battle modes, documented battlefield commands, a playable persistent loop, dated screenshot comparison, visual treatment reviewed against Xian evidence, and original or licensed shipped assets. Exact Xian balance, source-game character/unit/item data, copied client files, logos, screenshots, sprites, maps, sounds, guide text or private research records are outside scope.

The V5.0 dashboard remains a useful playable baseline, but it is not accepted as the V5.1 interface target. The deployed V5.1 shell is a playable prototype; TGM interface fidelity remains in progress until the full gate passes.
