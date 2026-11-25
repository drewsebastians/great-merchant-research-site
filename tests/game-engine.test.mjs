import test from "node:test";
import assert from "node:assert/strict";
import { createInitialState } from "../game/data.mjs";
import { buyItem, changeTab, craftRecipe, equipItem, hireScout, performAction, recoverInTown, returnToTown, selectRoute, sellItem, setCombatShortcutsEnabled, setFormationFront, setLanguage, startRoute, useTonic } from "../game/engine.mjs";
import { getQuestProgress, isQuestComplete, isQuestUnlocked } from "../game/quests.mjs";

function preparedState() { return hireScout(createInitialState()); }

test("hiring updates the crew and marks without exceeding the crew limit", () => {
  const initial = createInitialState();
  const hired = hireScout(initial);
  assert.equal(hired.coin, initial.coin - 22);
  assert.equal(hired.party.length, 2);
  assert.equal(hireScout(hired).party.length, 2);
});
test("language and combat shortcut preferences update persistable state", () => {
  let state = createInitialState();
  assert.equal(state.language, "en");
  assert.equal(state.combatShortcutsEnabled, true);
  state = setLanguage(state, "id");
  assert.equal(state.language, "id");
  state = setCombatShortcutsEnabled(state, false);
  assert.equal(state.combatShortcutsEnabled, false);
  assert.equal(setLanguage(state, "fr").language, "id");
});
test("market purchase and sale update currency and inventory", () => {
  const bought = buyItem(createInitialState(), "ration", 2);
  assert.equal(bought.coin, 48);
  assert.equal(bought.inventory.ration, 4);
  const sold = sellItem(bought, "ration", 1);
  assert.equal(sold.coin, 50);
  assert.equal(sold.inventory.ration, 3);
});
test("the workbench converts route fittings into a trade item and updates the linked settlement", () => {
  let state = startRoute(preparedState());
  while (state.phase === "battle") state = performAction(state, "strike");
  state = returnToTown(state);
  state = selectRoute(state, "amber-quarry");
  state = startRoute(state);
  while (state.phase === "battle") state = performAction(state, "strike");
  state = returnToTown(state);
  assert.equal(state.inventory.fittings, 1);
  assert.equal(state.lastSettlement.cargoValue, 22);
  state = craftRecipe(state, "quarry-roll");
  assert.equal(state.inventory.fittings, 0);
  assert.equal(state.inventory["tool-roll"], 1);
  assert.equal(state.lastSettlement.cargoValue, 28);
  assert.equal(state.lastSettlement.cargoCount, 1);
  state = sellItem(state, "tool-roll", 1);
  assert.equal(state.lastSettlement.cargoSoldRevenue, 28);
  assert.equal(state.lastSettlement.cargoSoldCount, 1);
  assert.equal(state.lastSettlement.netProceeds, 49);
});
test("the workbench rejects recipes without their required materials", () => {
  const rejected = craftRecipe(createInitialState(), "quarry-roll");
  assert.equal(rejected.inventory.fittings, 0);
  assert.equal(rejected.inventory["tool-roll"], 0);
  assert.match(rejected.notice, /Bronze Fittings/);
});
test("Wayfarer's Edge can be bought, equipped, unequipped and increases Strike damage", () => {
  let state = buyItem(preparedState(), "edge");
  assert.equal(state.coin, 4);
  assert.equal(state.inventory.edge, 1);
  state = equipItem(state, "edge");
  assert.equal(state.equipment.weapon, "edge");
  assert.equal(state.inventory.edge, 0);
  state = equipItem(state, null);
  assert.equal(state.equipment.weapon, null);
  assert.equal(state.inventory.edge, 1);
  state = equipItem(state, "edge");
  state = startRoute(state);
  state = performAction(state, "strike");
  assert.equal(state.battle.enemies[0].hp, 2);
  assert.equal(equipItem(state, null).equipment.weapon, "edge");
});
test("a rejected purchase leaves balance and pack unchanged", () => {
  const initial = createInitialState();
  const failed = buyItem({ ...initial, coin: 1 }, "fittings", 1);
  assert.equal(failed.coin, 1);
  assert.equal(failed.inventory.fittings, 0);
  assert.match(failed.notice, /Not enough marks/);
});
test("route gates require a scout and one ration", () => {
  const noScout = startRoute(createInitialState());
  assert.equal(noScout.phase, "town");
  assert.match(noScout.notice, /required crew member/);
  assert.equal(startRoute(preparedState()).phase, "battle");
  const noRation = preparedState();
  noRation.inventory.ration = 0;
  const rejected = startRoute(noRation);
  assert.equal(rejected.phase, "town");
  assert.match(rejected.notice, /Trail Ration/);
});
test("Amber Quarry unlocks after Mosswind and uses its own encounter and reward", () => {
  let state = preparedState();
  assert.equal(selectRoute(state, "amber-quarry").selectedRoute, "mosswind");
  state = startRoute(state);
  while (state.phase === "battle") state = performAction(state, "strike");
  state = returnToTown(state);
  assert.ok(state.completedRoutes.includes("mosswind"));
  state = selectRoute(state, "amber-quarry");
  assert.equal(state.selectedRoute, "amber-quarry");
  state = startRoute(state);
  assert.equal(state.battle.routeId, "amber-quarry");
  assert.equal(state.battle.enemies.length, 1);
  assert.equal(state.battle.enemies[0].id, "warden");
  while (state.phase === "battle") state = performAction(state, "strike");
  assert.equal(state.inventory.fittings, 1);
  assert.equal(state.reputation, 3);
  assert.equal(state.completedRoutes.includes("amber-quarry"), false);
  state = returnToTown(state);
  assert.ok(state.completedRoutes.includes("amber-quarry"));
  assert.deepEqual(state.lastSettlement, {
    routeId: "amber-quarry", rationCost: 6, rewardCoin: 27, cargoValue: 22,
    cargoSoldRevenue: 0, cargoCount: 1, cargoSoldCount: 0, netProceeds: 21
  });
  state = sellItem(state, "fittings", 1);
  assert.equal(state.lastSettlement.cargoSoldRevenue, 22);
  assert.equal(state.lastSettlement.cargoSoldCount, 1);
  assert.equal(state.lastSettlement.netProceeds, 43);
});
test("ordinary strikes can win Amber Quarry while repeated defense can cause a real defeat", () => {
  let state = startRoute(preparedState());
  while (state.phase === "battle") state = performAction(state, "strike");
  assert.equal(state.phase, "victory");
  state = returnToTown(state);
  state = selectRoute(state, "amber-quarry");
  state = startRoute(state);
  let turns = 0;
  while (state.phase === "battle" && turns < 20) {
    state = performAction(state, "brace");
    turns += 1;
  }
  assert.equal(state.phase, "defeat");
  assert.ok(turns < 20);
  assert.equal(state.tripLedger.rewardCoin, 0);
  assert.equal(state.completedRoutes.includes("amber-quarry"), false);
  const recovered = recoverInTown(state);
  assert.equal(recovered.phase, "town");
  assert.equal(recovered.tripLedger, null);
  assert.ok(recovered.party.every((unit) => unit.hp > 0));
});
test("the Courier's Mark stages drive progress, completion and the next quest unlock", () => {
  let state = createInitialState();
  assert.equal(getQuestProgress(state, "courier-mark").completedCount, 0);
  assert.equal(isQuestUnlocked(state, "quarry-ledger"), false);
  state = hireScout(state);
  assert.equal(getQuestProgress(state, "courier-mark").completedCount, 1);
  state = startRoute(state);
  while (state.phase === "battle") state = performAction(state, "strike");
  assert.equal(getQuestProgress(state, "courier-mark").completedCount, 2);
  assert.equal(isQuestComplete(state, "courier-mark"), false);
  state = returnToTown(state);
  assert.equal(getQuestProgress(state, "courier-mark").completedCount, 3);
  assert.equal(isQuestComplete(state, "courier-mark"), true);
  assert.equal(state.inventory.seal, 1);
  assert.equal(isQuestUnlocked(state, "quarry-ledger"), true);
  state = selectRoute(state, "mosswind");
  state = startRoute(state);
  while (state.phase === "battle") state = performAction(state, "strike");
  state = returnToTown(state);
  assert.equal(state.inventory.seal, 1);
});
test("the encounter can be won, returned from and traded for a net gain", () => {
  let state = startRoute(preparedState());
  assert.equal(state.inventory.ration, 1);
  while (state.phase === "battle") state = performAction(state, "strike");
  assert.equal(state.phase, "victory");
  assert.equal(state.inventory.tea, 2);
  assert.equal(state.inventory.seal, 0);
  state = returnToTown(state);
  assert.equal(state.phase, "town");
  assert.equal(state.inventory.seal, 1);
  assert.deepEqual(state.lastSettlement, {
    routeId: "mosswind", rationCost: 6, rewardCoin: 18, cargoValue: 26,
    cargoSoldRevenue: 0, cargoCount: 2, cargoSoldCount: 0, netProceeds: 12
  });
  const beforeSale = state.coin;
  state = sellItem(state, "tea", 2);
  assert.equal(state.coin, beforeSale + 26);
  assert.equal(state.inventory.tea, 0);
  assert.equal(state.lastSettlement.cargoSoldRevenue, 26);
  assert.equal(state.lastSettlement.cargoSoldCount, 2);
  assert.equal(state.lastSettlement.netProceeds, 38);
});
test("tonics heal a damaged unit without exceeding maximum vitality", () => {
  let state = preparedState();
  state.party[0].hp = 50;
  state = useTonic(state);
  assert.equal(state.party[0].hp, 64);
  assert.equal(state.inventory.tonic, 0);
});
test("town-only screens stay locked during an encounter", () => {
  const state = startRoute(preparedState());
  assert.equal(changeTab(state, "market").activeTab, "journey");
  assert.equal(changeTab(state, "inventory").activeTab, "inventory");
  assert.equal(changeTab(state, "preferences").activeTab, "preferences");
});
test("front formation changes the opening order and screens the rear", () => {
  let state = preparedState();
  state = setFormationFront(state, "scout");
  assert.equal(state.formationFrontId, "scout");
  state = startRoute(state);
  const result = performAction(state, "strike");
  assert.equal(result.battle.enemies[0].hp, 7);
  assert.equal(result.party.find((unit) => unit.id === "scout").hp, 40);
  assert.equal(result.party.find((unit) => unit.id === "mara").hp, 61);
  assert.ok(result.log.some((entry) => /screens Mara Venn, softening the hit by 2/.test(entry)));
  assert.equal(setFormationFront(result, "mara").formationFrontId, "scout");
});
test("Brace softens the next incoming hit", () => {
  const state = startRoute(preparedState());
  const braced = performAction(state, "brace");
  assert.equal(braced.party[0].hp, 63);
  assert.equal(braced.battle.guard, 0);
});

test("using a tonic in battle spends the crew order", () => {
  const state = startRoute(preparedState());
  state.party[0].hp = 40;
  const healed = useTonic(state);
  assert.equal(healed.inventory.tonic, 0);
  assert.equal(healed.party[0].hp, 56);
  assert.equal(healed.battle.turn, 2);
});

test("a defeated crew can recover and retry without taking route rewards", () => {
  const state = startRoute(preparedState());
  state.battle.enemies.forEach((enemy) => { enemy.damage = 100; });
  const defeated = performAction(state, "brace");
  assert.equal(defeated.phase, "defeat");
  const recovered = recoverInTown(defeated);
  assert.equal(recovered.phase, "town");
  assert.equal(recovered.inventory.seal, 0);
  assert.equal(recovered.day, 2);
});
