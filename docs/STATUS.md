# Development Status

**Updated:** 26 November 2026  
**Task:** V5-030 — reset the interface target to Xian The Great Merchant  
**Plan:** Development Plan v5.1

## Current state

**Production game:** https://drewsebastians.github.io/great-merchant-research-site/game/  
**Production game-code commit:** 55d22522d3cba7b6c9b5286bdcb195034ab21ae3  
**Last verified Pages run for game code:** 45543428008 succeeded.  
**Status:** the V5.0 prototype remains playable in production. Its current interface is a generic web dashboard and is not yet TGM-faithful. This reset updates specifications and backlog; gameplay UI redesign remains the highest-priority work.

**Pre-reset repository baseline:** main and development/v5-first-playable-slice at c57ac16f4ed32f4636b20cc07c814a4805c580f3.  
**New rollback checkpoint:** checkpoint/pre-tgm-fidelity-reset-2026-11-26 at c57ac16f4ed32f4636b20cc07c814a4805c580f3.  
**Earlier checkpoints:** checkpoint/pre-v5-2026-11-19 (a1bfc98df853ace84e4894c91361dcc3c5120935); checkpoint/pre-v5-025-2026-11-25 (ccaae5a52f1694dc76be599dd0789f0b8f116423); checkpoint/pre-v5-026-2026-11-25 (3c463e506829818125c0f497f0da410ee250468f); checkpoint/pre-v5-027-2026-11-25 (0635af9b4311ef580196797d53da30af1a19eea3); checkpoint/pre-v5-028-2026-11-25 (6758a4fa0a598e3dfab1386b41c9dee7cd412a63).

**Research source:** great-merchant-research main commit f52446e6a8f25a9cff4fe15a21e63b976df85317, reviewed read-only.  
**Encrypted vault:** data/vault.json remains blob 748f8863212c1a2911c53569e7c934293c5e4205. It and all research records/media remain unchanged and excluded from the public game.

## Interface-fidelity reset

The live Pack screen was compared with the public official TGM interface guide. V5.0's persistent page rail, inventory card grid and right-side quest panel differ substantially from the reference's field-first scene, left portrait strip, upper-right minimap, lower HUD/chat/menu and contextual game windows. The official shortcut guide further separates field, shop and battlefield controls.

The earlier claim that V5.0 represented TGM's general interface is withdrawn. Read [the TGM interface blueprint](tgm-interface-blueprint-v1.md) and [the screen-by-screen review](ui-fidelity-review-v5.md) for the new design authority and acceptance gate. Official guide links and Xian-specific visual comparators are recorded there.

The official guide establishes the broad client structure, but its exact build applicability to Xian and detailed key/timing behavior remain unresolved. Comparing Xian-specific public screenshots/video frames against that structure is still a P0 task.

## V5.0 playable foundation retained

- Dependency-free browser/PWA architecture with original SVG scenes and portraits.
- Local versioned save/migrations; town, route, hiring, crew, inventory, trading, quests, recovery and two-route game loop.
- Original encounters, equipment, workbench recipe and settlement ledger.
- English/Indonesian shared UI labels, accessible onboarding, responsive breakpoints and local progress.
- 35 automated tests, content validation, production navigation checks, combat/result/recovery and buy/sell verification were recorded before this documentation reset.

These features remain useful prototype systems. Their screen arrangement and current turn-based combat presentation do not pass the new interface-fidelity gate.

## Verification

- Production route was opened and visually inspected in a desktop browser; the Pack screen and persistent dashboard shell rendered.
- Official guide screenshot and interface descriptions were inspected directly; the official shortcuts page was reviewed.
- This update changes documentation only. It does not change the running game code, save schema or research repository.
- The last code verification remains 35/35 Node tests and a passing game-content validator, as recorded in the preceding status. Re-run them when implementation files change.
- Production game code was last deployed in Pages run 45543428008. Verify the documentation commit's Pages workflow after push; the game interface itself remains V5.0 pending the P0 redesign.

## Evidence boundary

Use the official interface and shortcut guides for visible client structure and control categories. Use Xian-specific community screens only as dated, version-scoped comparators. The private research repository's Korean-server findings are not a source for Xian-specific interface, values or rules. Do not publish private research records, source IDs or media. Do not copy TGM client code, screenshots, sprites, logos, maps, music or guide text into the game; author original visual assets and keep prototype values fictional.

## Next work

1. Complete the Xian-specific screenshot/frame comparison and mark each unresolved version detail.
2. Build the scene-first desktop shell with a portrait strip, minimap, compact lower HUD/chat/menu and contextual windows.
3. Add distinct field/town, shop and battlefield modes.
4. Replace turn-based-only presentation with the verified command families, then reconnect the existing playable progression and save.
5. Test, deploy and compare the new production screenshots against the blueprint before restoring any fidelity claim.
