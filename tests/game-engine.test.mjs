import test from "node:test";
import assert from "node:assert/strict";
import { createInitialState } from "../game/data.mjs";
import { buyItem, changeTab, hireScout, performAction, recoverInTown, returnToTown, sellItem, startRoute, useTonic } from "../game/engine.mjs";

function preparedState() { return hireScout(createInitialState()); }

test("hiring updates the crew and marks without exceeding the crew limit", () => {
  const initial = createInitialState();
  const hired = hireScout(initial);
  assert.equal(hired.coin, initial.coin - 22);
  assert.equal(hired.party.length, 2);
  assert.equal(hireScout(hired).party.length, 2);
});
test("market purchase and sale update currency and inventory", () => {
  const bought = buyItem(createInitialState(), "ration", 2);
  assert.equal(bought.coin, 48);
  assert.equal(bought.inventory.ration, 4);
  const sold = sellItem(bought, "ration", 1);
  assert.equal(sold.coin, 50);
  assert.equal(sold.inventory.ration, 3);
});
test("a rejected purchase leaves balance and pack unchanged", () => {
  const initial = createInitialState();
  const failed = buyItem({ ...initial, coin: 1 }, "fittings", 1);
  assert.equal(failed.coin, 1);
  assert.equal(failed.inventory.fittings, 0);
  assert.match(failed.notice, /Not enough marks/);
});
test("route gates require a scout and one ration", () => {
  assert.equal(startRoute(createInitialState()).phase, "town");
  assert.equal(startRoute(preparedState()).phase, "battle");
  const noRation = preparedState();
  noRation.inventory.ration = 0;
  assert.equal(startRoute(noRation).phase, "town");
});
test("the encounter can be won, returned from and traded for a net gain", () => {
  let state = startRoute(preparedState());
  assert.equal(state.inventory.ration, 1);
  while (state.phase === "battle") state = performAction(state, "strike");
  assert.equal(state.phase, "victory");
  assert.equal(state.inventory.tea, 2);
  assert.equal(state.inventory.seal, 1);
  state = returnToTown(state);
  assert.equal(state.phase, "town");
  const beforeSale = state.coin;
  state = sellItem(state, "tea", 2);
  assert.equal(state.coin, beforeSale + 26);
  assert.equal(state.inventory.tea, 0);
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
