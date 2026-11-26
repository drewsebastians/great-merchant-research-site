# Development Backlog

**Updated:** 26 November 2026
**Plan:** Development Plan v5.1 — Xian TGM Interface-Fidelity Reset
**Specification:** [TGM Interface Fidelity Blueprint](tgm-interface-blueprint-v1.md)

## Priority 0 — Xian/TGM interface fidelity reset

- [x] Inspect the current production screen and record the concrete interface mismatch.
- [x] Review the official TGM interface and shortcut guides.
- [x] Create rollback checkpoint before the fidelity reset.
- [x] Replace the generic V5.0 interface claim with the V5.1 blueprint and screen review.
- [x] Record dated official references and available Xian-specific screenshot/video leads with version limits.
- [x] Compare the dated Xian quest and mercenary windows with the official guide; keep their old version scope explicit.
- [ ] Compare a usable Xian field-screen frame with the official guide; none of the inspected Xian images shows the main field HUD.
- [x] Record the macro screen-zone map for field, shop, battlefield and core windows; label Xian-specific geometry unresolved.
- [x] Replace the persistent web dashboard shell with a scene-first desktop client shell.
- [x] Add the persistent left character/mercenary portrait stack and upper-right minimap.
- [x] Add the compact bottom status/chat/menu/date HUD.
- [x] Open character, inventory, status, property, quest, community and system views as contextual client windows.
- [x] Create distinct field/town, shop and battlefield modes.
- [x] Add clickable Move, Attack, Hold, Stop, group-selection and Withdraw controls; keep source-game key mappings and timing unclaimed.
- [x] Reconnect recruitment, travel, trade, objective progress, results, recovery and local saving to the redesigned client.
- [x] Verify the deployed scene and context windows in the production browser after corrected Pages run 45767255947; save progression remains day 5 and 102 marks.
- [ ] Check responsive desktop/mobile browser behavior, focus, accessible controls and PWA offline operation.
- [ ] Compare the deployed screenshot against an accessible Xian field frame before claiming TGM interface fidelity.

## Retained V5.0 playable work

These tasks remain complete as original prototype functionality. Their completion does not satisfy the new fidelity gate.

- [x] Build a dependency-free web architecture, local save/migration, installable PWA shell and original SVG assets.
- [x] Implement town/travel, recruitment, trading, inventory, quest journal, recovery and two-route gameplay.
- [x] Add original equipment, workbench recipe, settlement ledger, interface localization and accessible onboarding.
- [x] Verify the current turn-based encounters and other core flows with tests and production smoke checks.
- [x] Preserve rollback checkpoints for the existing game state.

## Deferred or evidence-gated

- [ ] Exact Xian client version-specific formulas, prices, values, drop rates, map gates and skill details.
- [ ] Exact Xian key bindings, click/drag selection gestures, battle timing and window sizing until verified.
- [ ] Physical-phone interaction and Windows Edge install/offline checks after the redesigned shell is deployed.
- [ ] Any use of third-party assets, client files, screenshots, music, maps or copied guide text.

## Verification recorded this update

- [x] `node --check` on the app and engine modules.
- [x] 38/38 Node tests, including shell/window coverage, the playable loop, withdrawal and save/PWA behavior.
- [x] Game content validator and `git diff --check`.
- [x] Production desktop browser visual verification and context-window smoke checks.
- [ ] Narrow-viewport, focus and actual offline-PWA verification remain pending.
