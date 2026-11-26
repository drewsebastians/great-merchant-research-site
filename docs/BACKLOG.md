# Development Backlog

**Updated:** 26 November 2026
**Plan:** Development Plan v5.1 — Xian TGM Interface-Fidelity Reset
**Specification:** [TGM Interface Fidelity Blueprint](tgm-interface-blueprint-v1.md)

## Priority 0 — Xian/TGM interface fidelity reset

- [x] Inspect the current production screen and record the concrete interface mismatch.
- [x] Review the official TGM interface and shortcut guides.
- [x] Review the official battle-system guide and record its generic group/withdraw timing with an explicit Xian-version caveat.
- [x] Create rollback checkpoint before the fidelity reset.
- [x] Replace the generic V5.0 interface claim with the V5.1 blueprint and screen review.
- [x] Record dated official references and available Xian-specific screenshot/video leads with version limits.
- [x] Compare the dated Xian quest and mercenary windows with the official guide; keep their old version scope explicit.
- [x] Compare a usable Xian field-screen frame with the official guide; the 14 Jan 2017 tutorial screenshot shows the full client HUD. Its capture date and Xian client patch are unstated, so it is a historical comparator only.
- [x] Record the macro screen-zone map for field, shop, battlefield and core windows; label Xian-specific geometry unresolved.
- [x] Replace the persistent web dashboard shell with a scene-first desktop client shell.
- [x] Add the persistent left character/mercenary portrait stack and upper-right minimap.
- [x] Add the compact bottom status/chat/menu/date HUD.
- [x] Open character, inventory, status, property, quest, community and system views as contextual client windows.
- [x] Create distinct field/town, shop and battlefield modes.
- [x] Add clickable Move, Attack, Hold, Stop, group-selection and Withdraw controls; keep source-game key mappings and timing unclaimed.
- [x] Reconnect recruitment, travel, trade, objective progress, results, recovery and local saving to the redesigned client.
- [x] Verify the deployed scene and context windows in the production browser after corrected Pages run 45767255947; save progression remains day 5 and 102 marks.
- [x] Compare the deployed screenshot with the dated Xian field frame and record visible differences, using only the broad layout as evidence.
- [x] Replace the flat vector Hearthcross town background with an independently generated 1199×675 illustration; add the JPEG to PWA app-shell cache v4. Commit `a38cbdb` deployed in Pages run 45788583206 and was checked in the live game.
- [x] Remove the separate project wordmark, reduce the utility strip from 40px to 28px and shorten the desktop lower HUD from 160px to 118px while preserving save/help/reset and scene location. Commit `b1b7b0e` is live.
- [x] Refine contextual windows with original corner bevels, a layered 32px title bar and no repeated project eyebrow. Commit `6bcd76e` was confirmed in the live quest window.
- [x] Verify the deployed 900px responsive breakpoint at 779 CSS pixels after run 45784931192; browser-zoom emulations at 779px, 681px and 340px show no visible horizontal scrolling. These checks do not replace physical-device testing.
- [x] Polish the 779px topbar: commit `ca683f0` hides the duplicate mode chip while retaining the full location title; verified in Pages run 45787017262.
- [ ] Recheck 779px, 681px and 340px browser-width emulations after commit `b1b7b0e`; previous checks predate the compact utility/HUD pass.
- [ ] Verify on a physical narrow device, check keyboard focus and accessible labels, and test actual PWA offline behavior. The browser's organization policy blocked DevTools, so the live offline toggle was not attempted; automated service-worker tests are mocked.
- [x] Shorten top/header chrome and lower HUD; use a darker double border and tighter title spacing for original contextual windows. Commit `05c2607` deployed in Pages run 45786650163.
- [ ] Continue comparing independently authored contextual-window trim and compact HUD proportions with available dated Xian frames. Current Xian client version and exact geometry remain unverified.

## Retained V5.0 playable work

These tasks remain complete as original prototype functionality. Their completion does not satisfy the new fidelity gate.

- [x] Build a dependency-free web architecture, local save/migration, installable PWA shell and original SVG assets.
- [x] Implement town/travel, recruitment, trading, inventory, quest journal, recovery and two-route gameplay.
- [x] Add original equipment, workbench recipe, settlement ledger, interface localization and accessible onboarding.
- [x] Verify the current turn-based encounters and other core flows with tests and production smoke checks.
- [x] Preserve rollback checkpoints for the existing game state.

## Deferred or evidence-gated

- [ ] Exact Xian client version-specific formulas, prices, values, drop rates, map gates and skill details.
- [ ] Exact Xian key bindings, click/drag selection gestures, battle timing and window sizing until verified. The general official guide says Ctrl+number assigns battle groups and Esc → Withdraw can incur an XP loss during the first 20 seconds, but it does not identify Xian or a client patch.
- [ ] Physical-phone interaction and Windows Edge install/offline checks after the redesigned shell is deployed.
- [ ] Any use of third-party assets, client files, screenshots, music, maps or copied guide text.

## Verification recorded this update

- [x] `node --check` on the app and engine modules.
- [x] 38/38 Node tests, including shell/window coverage, the playable loop, withdrawal and save/PWA behavior.
- [x] Game content validator and `git diff --check`.
- [x] Production desktop browser visual verification and context-window smoke checks.
- [x] Post-`6bcd76e` production browser check: illustrated town art remains visible, the revised quest window opens, and the saved journey remains day 05 / 102 marks.
- [x] Historical Xian field screenshot visually compared with the production layout; date, scope and unknown patch are recorded in the fidelity review.
- [x] Post-fix CSS-width browser smoke checks at 779px, 681px and 340px after Pages runs 45784931192 and 45787017262; no visible horizontal scrolling, and the 779px location title is legible.
- [ ] Physical-device, keyboard-focus and live offline-PWA verification remain open.
