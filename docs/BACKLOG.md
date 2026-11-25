# Development Backlog

Last updated: 25 November 2026  
Plan: Development Plan v5.0

## Priority 0 — first playable loop

- [x] Translate confirmed research patterns into a public, copyright-aware development specification.
- [x] Create a separated browser game architecture under `/game/`.
- [x] Build town, hiring, market, pack, journal and crew screens.
- [x] Build repeatable turn-based encounters with target selection and combat orders.
- [x] Connect victory, route rewards, return-to-town, selling and local save.
- [x] Let the first-run guide close from an outside click so page controls are reachable if the modal is blocking navigation.
- [x] Hand-author original scene art and portraits.
- [x] Add automated engine, save and rendered-flow checks.
- [x] Deploy and verify the playable route at the production URL.

## Priority 1 — next playable improvements

- [x] Review each screen against confirmed high-level interface patterns and implement the highest-impact responsive gaps while keeping all artwork original: visible errand progress, combat vitality and narrow-phone market cards.
- [x] Add a data-driven quest board to Journal with ordered stage states, prerequisite locks and a Journey shortcut.
- [x] Verify guide outside-tap dismissal and screen navigation on the live production page in Cloud Chromium.
- [x] Verify guide Tab/Shift+Tab focus containment, Escape focus return, and narrow-layout navigation and market purchase in production Chromium.
- [ ] Verify the guide, mobile market cards and combat controls on a physical phone after production deploy.
- [x] Add a second route with a distinct encounter and an optional route choice.
- [x] Add a short onboarding overlay that can be skipped, dismissed and replayed.
- [x] Make crew formation affect turn order and protection.
- [x] Add an equipment slot and one original upgrade with a visible effect.
- [x] Add a settlement ledger showing trip cost, cargo value and net proceeds.
- [x] Add a small production recipe that converts gathered materials into a trade item.
- [x] Add language and input preferences that persist locally.
- [x] Complete Indonesian settings headings, helper copy, local-save note and shortcut toggle state while leaving story and item descriptions in English.
- [x] Translate the shared Indonesian Market and Crew interface, use word-boundary matching to prevent partial-word corruption, and preserve English item names and descriptions.
- [x] Translate shared Journey, Pack and Journal headings, labels, status text, controls and short helper copy while preserving story/quest prose and item descriptions.
- [x] Translate Indonesian onboarding steps, combat controls/order labels and static shell notes, including accessible guide/reset names.

## Priority 2 — broader game architecture

- [x] Add a data-driven route/map catalog and accessible travel screen.
- [x] Add a quest and progression schema with entry conditions, ordered objectives, one-time rewards and unlocks; connect the first errand and quarry gate.
- [x] Compare static PWA, Tauri and Electron options; select and document the PWA path for the current static game.
- [x] Add install metadata, original Windows app icons, and offline app-shell caching with a tested network fallback.
- [x] Revalidate deployed files through the service worker, version the shell cache and test the offline fallback after the refresh change.
- [ ] Verify PWA install and offline launch on Windows Edge after the online cache fill.
- [x] Add versioned save migrations for route progress, onboarding and formation preferences.
- [ ] Add combat status effects only when their rules are independently specified and tested.
- [x] Add content validation for IDs, item references, balances and missing assets.
- [x] Research and design the offline-first Windows packaging path; PWA selected for the current static game.

## Deferred pending evidence, rights or scope

- [ ] Exact current-game formulas, item prices, drop probabilities and route gates.
- [ ] Import of third-party art, sound, guides, client files or screenshots.
- [ ] Multiplayer, online account services, server persistence or anti-cheat interaction.
