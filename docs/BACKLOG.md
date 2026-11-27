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
- [x] Add the Xian-labelled stream published 22 May 2026 as a dated lead. Browser playback did not yield an inspectable frame and the capture build is unknown.
- [x] Compare available dated Xian window evidence with the official guide; correct the source labels. The 17 Jan 2016 article image is field/NPC context; the 26 Aug 2019 Repeat Loop image is a quest panel. Both capture dates and client patches are unknown.
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
- [x] Correct the earlier reading of the 14 Jan 2017 screenshot: its two centered windows are side by side with a small gap, not overlapping. The overlap in `bc05a2c` was based on the mistaken interpretation and is superseded by `c32d9bf`. The app-module truncation incident was repaired in `eb007f6` from checkpoint `checkpoint/pre-overlap-window-layout-2026-11-27`; the local and remote Git blob hashes matched before repair.
- [x] Rework the desktop lower HUD into three broad zones and place the menu and compact date/time strip together at right. The earlier v14 production viewport measured 303/690/354px; those were prototype measurements and were superseded by the v15 1:2:1 grid below.
- [x] Place the two desktop contextual windows side by side with a small gap, matching only the visible 2017 screenshot arrangement. Pages run `45950316946` deployed the 432px windows with a 13px gap at 1363px; the canonical production URL confirmed it after the service-worker update cycle.
- [x] Bump the PWA app-shell cache from v11 to v14 for the revised lower HUD and window layout; Pages run `45950316946` succeeded. Live offline mode remains unverified.
- [x] Add an original engraved SVG titlebar detail, a shared height for paired desktop windows, and a 1:2:1 lower-HUD grid; bump the shell cache from v14 to v15. Commit `e7c7433` deployed in Pages run `45958274697`.
- [x] Verify the deployed v15 layout and basic interactions at 1363×936 CSS px. HUD zones measured 337/674/337px; Inventory/Quest windows measured 432×440px with a 13px gap. Focus and Escape closed only the front window; shop mode opened and returned to the field; the save remained day 05 / 102 marks with no transaction or progression action.
- [x] Verify the deployed 900px responsive breakpoint at 779 CSS pixels after run 45784931192; browser-zoom emulations at 779px, 681px and 340px show no visible horizontal scrolling. These checks do not replace physical-device testing.
- [x] Polish the 779px topbar: commit `ca683f0` hides the duplicate mode chip while retaining the full location title; verified in Pages run 45787017262.
- [x] Recheck 779px, 681px and 340px browser-width emulations after the compact utility/HUD pass. At 175%, 200% and 400% zoom, no horizontal scrolling appeared; at 340px the transient notice dismissed and the day 05 / 102-mark HUD remained visible. These checks do not replace physical-device testing.
- [ ] Verify on a physical narrow device, check keyboard focus and accessible labels, and test actual PWA offline behavior. The browser's organization policy blocked DevTools, so the live offline toggle was not attempted; automated service-worker tests are mocked.
- [x] Shorten top/header chrome and lower HUD; use a darker double border and tighter title spacing for original contextual windows. Commit `05c2607` deployed in Pages run 45786650163.
- [x] Reorganize the quest window as an original route ledger with All/Open/Completed filters, contract selection, focused detail, step progress, milestone rows and a route-chart action. Commit `d87e94d` deployed in Pages run `45961499731`.
- [x] Preserve quest filter/control classes and `data-*` values while applying Indonesian UI text; add a regression check and bump the PWA shell from v16 to v17. Commit `38834b8` deployed in Pages run `45962041736`.
- [x] Verify deployed quest filtering and selection in production: All/Open/Completed filters, selected-contract detail updates, empty state, route-chart action, Escape close, shop return to field, and retained day 05 / 102-mark save. No transaction or progression was performed.
- [x] Compare the deployed route ledger and lower HUD with the dated 2019 quest-panel image and 2017 full-client screenshot. The production quest panel is now 880×580px (69%×75% of the 1271×772px client layer) with a 21px heading at 1363×936 CSS px. Its original list/detail hierarchy is more readable but still simpler and less ornate than the 2019 image; the 1:2:1 lower-HUD ratio remains unverified against Xian. Run `45965078349` deployed commit `11e1a04`; production filters, selection, empty state and route-map action passed, and the day 05 / 102-mark save remained intact.
- [x] Translate the official interface guide's portrait interaction into the original prototype: left-click opens Inventory in town; right-click selects that crew member and opens Status outside battle. Mark the selected member in Status and explain the pointer actions in localized labels. Treat this as generic guide-derived behavior, not as verified Xian-specific control semantics. Commit `840610e` advances the shell to v19.
- [x] Verify portrait right-click → selected Status and left-click → Inventory in production after Pages run `45976274699`. Day 05 / 102 marks remained visible; no game progression or economy action was performed. Regression coverage checks selection feedback and unchanged journey values.
- [x] Add an original expanded local route chart from the minimap, with route state, selectable unlocked destinations, a dialog focus trap, close controls and Escape dismissal with focus returned to the expand button. Viewing it leaves the saved journey unchanged. This is a generic adaptation informed by a Global Server update notice, not a verified Xian-specific behavior.
- [x] Bump the PWA shell from v19 to v20 and cover map rendering, focus containment, Escape dismissal, focus restoration and save preservation. The suite now passes 41/41 tests.
- [x] Verify Pages run `45979347526` in the production browser: the chart opens, both fictional route nodes render, Escape closes it, focus returns to the map button, and the visible save remains at day 05 / 102 marks.
- [x] Record the official [Update Notice 19/NOV/2026](https://www.thegreatmerchant.com/board/bbsPatch.gs?GSbid=18202&GSuid=148&page=1): posted 18 Nov 2026 for a Global Server update scheduled 19 Nov, Patch V34411, it says Escape closes the UI when the map is maximized. The notice identifies the Global Server, not Xian; do not call this Xian-specific evidence.
- [ ] Revisit the lower HUD and contextual-window comparison only when a newer or version-identifiable Xian screenshot/video frame is inspectable. Current reference captures and patches are unknown, so keep sizing and styling labeled as prototype choices.
- [ ] Find a dated, inspectable Xian frame or video segment and record the footage/build uncertainty. The 22 May 2026 stream is not inspectable in the current player.

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

- [x] Before the window refinement, confirm `checkpoint/pre-window-refinement-2026-11-27` at `1cf7dc454bb82c994914b68f78657df721f9edf7`; research main remains `f52446e6a8f25a9cff4fe15a21e63b976df85317`, and its encrypted-vault blob remains `748f8863212c1a2911c53569e7c934293c5e4205`. The research repository was read-only.
- [x] Before the quest-journal code change, create and verify `checkpoint/pre-quest-journal-refinement-2026-11-27` at remote head `71fbfc999115f9cb661629ce44fc9278277a1de9`.
- [x] Before the quest-window scale pass, verify rollback checkpoint `checkpoint/pre-quest-window-scale-pass-2026-11-27` at remote head `096e1f9f8564419a3c2b75a553823cbd55d0d0d7`.
- [x] Before the portrait context action, verify rollback checkpoint `checkpoint/pre-portrait-context-status-2026-11-27` at remote head `6fc1695cb2a92aeed74fa37ef223c9a3a40dbf1d`.
- [x] Confirm both branches contain implementation commit `38834b8df1f19d80bd22f5ff3bcec8c5addfbda4`; Pages run `45962041736` succeeded for that game build.
- [x] Publish the synced status, backlog, handoff, development plan, blueprint and fidelity review to both branches; documentation commit `84e8851` deployed successfully in Pages run `45963240569`.
- [x] `node --check` on game modules; commit `e7c7433` passes 39/39 tests.
- [x] 39/39 Node tests, including three-zone HUD/window layout assertions, transient notice expiry, the playable loop, withdrawal and save/PWA behavior.
- [x] Game content validator and `git diff --check` before the `e7c7433` publication.
- [x] Production desktop browser visual verification and context-window smoke checks.
- [x] After `38834b8`, run all 39 existing Node tests, `node scripts/validate-game-content.mjs`, syntax checks and `git diff --check`; all passed.
- [x] After `11e1a04`, rerun all 39 Node tests, syntax checks across game/scripts/tests, `node scripts/validate-game-content.mjs` and `git diff --check`; all passed.
- [x] After `840610e`, run `node --check game/app.mjs`, `node --test` (40/40), `node scripts/validate-game-content.mjs` and `git diff --check`; all passed.
- [x] Production browser check after Pages run `45962041736`: English and Indonesian quest controls remained functional, route-chart opened the map, Escape closed the front window, shop returned to the field, and the visible save remained day 05 / 102 marks.
- [x] Production browser check after Pages run `45965078349`: the single quest panel measured 880×580px with a 21px heading; selecting a contract, showing/restoring the empty Open filter and opening the route map worked; the save remained at day 05 / 102 marks.
- [x] Production browser check after Pages run `45976274699`: right-click on Tarin's portrait opened Status and marked Tarin as selected; left-click on Mara opened Inventory; day 05 / 102 marks and saved indicator remained. Research main was read-only verified at `f52446e6a8f25a9cff4fe15a21e63b976df85317`; the encrypted vault blob remains `748f8863212c1a2911c53569e7c934293c5e4205`.
- [x] Before the map pass, fetch and confirm main and development at `b690d071317bea450abdf52cb72569ef3e1770b2`; verify `checkpoint/pre-expanded-local-map-2026-11-27` at that same head. Research main remains `f52446e6a8f25a9cff4fe15a21e63b976df85317`, and the vault fingerprint remains `748f8863212c1a2911c53569e7c934293c5e4205`.
- [x] Publish map implementation commit `188d0c2b5456b0f51fa4b206663546bbb36c6117` to main and development; both branches align, Pages run `45979347526` succeeded, and the local tree was checked against remote Git blob/tree hashes.
- [x] After the map pass, `node --check game/app.mjs`, `node --test` (41/41), `node scripts/validate-game-content.mjs` and `git diff --check` all passed.
- [x] Production check after Pages run `45979347526`: expanded map rendered both fictional routes and statuses, Escape closed it and restored focus, and the day 05 / 102-mark save remained unchanged.
- [x] Post-`4e1e930` production browser check: the cache-v8 build reloads into the illustrated town, inventory and quest windows layer, clicking focuses a window, Escape closes only the front one, shop mode is separate, and the saved journey remains day 05 / 102 marks. Both route images loaded after `1784c24`.
- [x] Post-`aa86f74` production screenshot and interaction check: the cache-v9 client shows the new inset rail, two windows remain over the field, clicking an exposed frame focuses it, Escape closes only the front window, and the save remains day 05 / 102 marks.
- [x] Post-`eb007f6` production check: the then-current build showed overlapping Inventory and Quest windows; clicking the exposed Inventory titlebar raised it and Escape closed it to reveal Quest. This result was subsequently superseded after correcting the 2017 screenshot interpretation.
- [x] Production browser check after `c32d9bf` and run `45950316946`: earlier three-zone HUD measured 303/690/354px, windows measured 432px with a 13px gap, focus/Escape worked, shop mode was distinct, and day 05 / 102 marks remained saved.
- [x] Production browser check after `e7c7433` and run `45958274697`: HUD measured 337/674/337px, windows measured 432×440px with a 13px gap, focus/Escape and shop mode worked, and day 05 / 102 marks remained saved.
- [x] Confirm successful Pages run `45947396844` corresponds to `eb007f632d0a5830015f33ca48b0391543e1e62e`; verify production browser loads the complete module without an app-script parse error.
- [x] Documentation follow-up committed as `967f574` and deployed successfully in Pages run 45927330146.
- [x] Final deployment record committed as `3366b2e` and deployed successfully in Pages run 45927567313; production workflow linked the run to that exact commit.
- [x] Historical Xian field screenshot visually compared with the production layout; date, scope and unknown patch are recorded in the fidelity review.
- [x] CSS-width browser smoke checks at 779px, 681px and 340px after the compact-client and notice-fix deployments; no visible horizontal scrolling, and the 340px save values remain visible after the notice clears.
- [ ] Physical-device, keyboard-focus and live offline-PWA verification remain open.
