# Development Backlog

**Updated:** 27 November 2026
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
- [x] Fix transient notices that could persist across reloads or obscure the field on narrow screens; commit `f9e94a5` dismisses notices after 3.6 seconds and clears stale notices without changing saved journey progress.
- [x] Add original 1199×675 Mosswind Road and Amber Quarry encounter scenes and include them in PWA app-shell cache v5. Commit `1784c24` is live in Pages run 45795440090; both deployed image assets loaded in the browser.
- [x] Increase original contextual-window depth with stepped inset bevels, corner rivets and a doubled titlebar edge. Commit `23fa536` deployed in Pages run 45796646359; the shop window rendered and opened/closed in production without changing the saved journey.
- [x] Bump the service-worker app-shell cache from v5 to v6 so installed clients re-fetch the updated window styling. Commit `2a78f5c` deployed in Pages run 45797607295; the live game reloaded and the shop still opened/closed with the save at day 05 / 102 marks.
- [x] Replace the single modal scrim with layered, nonmodal contextual windows. Two desktop windows are shown side by side over the undimmed scene; clicking an exposed window brings it forward, and Escape closes only the front window. At the narrow breakpoint, the same stack keeps the active window in front for readability. Commits `6830d00` and `4e1e930` deployed successfully in Pages runs 45926424401 and 45926785566.
- [x] Bump the app-shell cache to v8 for the focus behavior. The live production check confirmed inventory/quest layering, focus, front-window close, shop mode and the preserved day 05 / 102-mark save.
- [x] Add an independently authored inset rail, center fasteners and midpoint fittings to the contextual-window frame; bump the app-shell cache to v9. Commit `aa86f74` deployed in Pages run 45944691666; the production browser showed inventory and quest together, verified focus and Escape behavior, and kept the save at day 05 / 102 marks.
- [x] Add an original campaign date derived from journey day and a separately labeled device-local clock; replace the misleading prototype `STAMINA` label with `RATIONS`; bump the app-shell cache to v10. Commit `4eb720f` deployed in Pages run 45946408400; production showed day 05 / 102 marks and no horizontal overflow at 1363 CSS pixels.
- [x] Correct the earlier reading of the 14 Jan 2017 screenshot: its two centered windows are side by side with a small gap, not overlapping. The overlap in `bc05a2c` was based on the mistaken interpretation and is superseded by this local layout pass. The app-module truncation incident was repaired in `eb007f6` from checkpoint `checkpoint/pre-overlap-window-layout-2026-11-27`; the local and remote Git blob hashes matched before repair.
- [x] Rework the desktop lower HUD into three broad zones and place the menu and compact date/time strip together at right. The local 1363px preview measures 303/690/354px (about 22.5%/51.2%/26.3%); these figures describe only this prototype viewport.
- [x] Place the two desktop contextual windows side by side with a small gap, matching only the visible 2017 screenshot arrangement. At a 1363px local viewport, the preview measured 432px windows with a 13px gap. Production deployment verification is pending.
- [x] Bump the PWA app-shell cache from v11 to v14 for the revised lower HUD and window layout; automated service-worker checks cover the new shell version. Live offline mode remains unverified.
- [x] Verify the deployed 900px responsive breakpoint at 779 CSS pixels after run 45784931192; browser-zoom emulations at 779px, 681px and 340px show no visible horizontal scrolling. These checks do not replace physical-device testing.
- [x] Polish the 779px topbar: commit `ca683f0` hides the duplicate mode chip while retaining the full location title; verified in Pages run 45787017262.
- [x] Recheck 779px, 681px and 340px browser-width emulations after the compact utility/HUD pass. At 175%, 200% and 400% zoom, no horizontal scrolling appeared; at 340px the transient notice dismissed and the day 05 / 102-mark HUD remained visible. These checks do not replace physical-device testing.
- [ ] Verify on a physical narrow device, check keyboard focus and accessible labels, and test actual PWA offline behavior. The browser's organization policy blocked DevTools, so the live offline toggle was not attempted; automated service-worker tests are mocked.
- [x] Shorten top/header chrome and lower HUD; use a darker double border and tighter title spacing for original contextual windows. Commit `05c2607` deployed in Pages run 45786650163.
- [ ] Continue comparing independently authored contextual-window trim and compact HUD proportions with available dated Xian frames. The frame is still simpler than the 2017 screenshot; current Xian client version and exact geometry remain unverified.

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

- [x] `node --check` on app and service-worker modules; current local candidate passes 39/39 tests.
- [x] 39/39 Node tests, including three-zone HUD/window layout assertions, transient notice expiry, the playable loop, withdrawal and save/PWA behavior.
- [x] Game content validator and `git diff --check` after local candidate changes.
- [x] Production desktop browser visual verification and context-window smoke checks.
- [x] Post-`4e1e930` production browser check: the cache-v8 build reloads into the illustrated town, inventory and quest windows layer, clicking focuses a window, Escape closes only the front one, shop mode is separate, and the saved journey remains day 05 / 102 marks. Both route images loaded after `1784c24`.
- [x] Post-`aa86f74` production screenshot and interaction check: the cache-v9 client shows the new inset rail, two windows remain over the field, clicking an exposed frame focuses it, Escape closes only the front window, and the save remains day 05 / 102 marks.
- [x] Post-`eb007f6` production check: the then-current build showed overlapping Inventory and Quest windows; clicking the exposed Inventory titlebar raised it and Escape closed it to reveal Quest. This result was subsequently superseded after correcting the 2017 screenshot interpretation.
- [x] Local preview check after the side-by-side layout pass: two 432px windows with a 13px gap at 1363px viewport; click-to-focus, Escape close/reveal and distinct shop mode worked. Production check is pending deployment.
- [x] Confirm successful Pages run `45947396844` corresponds to `eb007f632d0a5830015f33ca48b0391543e1e62e`; verify production browser loads the complete module without an app-script parse error.
- [x] Documentation follow-up committed as `967f574` and deployed successfully in Pages run 45927330146.
- [x] Final deployment record committed as `3366b2e` and deployed successfully in Pages run 45927567313; production workflow linked the run to that exact commit.
- [x] Historical Xian field screenshot visually compared with the production layout; date, scope and unknown patch are recorded in the fidelity review.
- [x] CSS-width browser smoke checks at 779px, 681px and 340px after the compact-client and notice-fix deployments; no visible horizontal scrolling, and the 340px save values remain visible after the notice clears.
- [ ] Physical-device, keyboard-focus and live offline-PWA verification remain open.
