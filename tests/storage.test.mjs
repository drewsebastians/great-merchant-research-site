import test from "node:test";
import assert from "node:assert/strict";
import { createInitialState } from "../game/data.mjs";
import { hireScout } from "../game/engine.mjs";
import { clearGame, loadGame, saveGame } from "../game/storage.mjs";

function withMemoryStorage(run) {
  const store = new Map();
  const previous = globalThis.window;
  globalThis.window = { localStorage: {
    getItem: (key) => store.has(key) ? store.get(key) : null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key)
  } };
  try { run(store); }
  finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
}

test("save state survives reload and clear removes only this game's save", () => {
  withMemoryStorage(() => {
    const state = createInitialState();
    assert.equal(saveGame(state), true);
    assert.deepEqual(loadGame(), state);
    clearGame();
    assert.equal(loadGame(), null);
  });
});

test("malformed or outdated local saves are ignored", () => {
  withMemoryStorage((store) => {
    store.set("wayfarers-ledger:v5:save", JSON.stringify({ saveVersion: 0, phase: "town" }));
    assert.equal(loadGame(), null);
  });
});

test("version 1 saves migrate without losing the existing journey", () => {
  withMemoryStorage((store) => {
    const oldSave = createInitialState();
    oldSave.saveVersion = 1;
    delete oldSave.selectedRoute;
    delete oldSave.activeRoute;
    delete oldSave.completedRoutes;
    delete oldSave.onboardingSeen;
    delete oldSave.formationFrontId;
    delete oldSave.equipment;
    delete oldSave.inventory.edge;
    oldSave.coin = 41;
    oldSave.party[0].hp = 53;
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 8);
    assert.equal(migrated.coin, 41);
    assert.equal(migrated.party[0].hp, 53);
    assert.equal(migrated.selectedRoute, "mosswind");
    assert.deepEqual(migrated.completedRoutes, []);
    assert.equal(migrated.onboardingSeen, false);
    assert.equal(migrated.inventory.edge, 0);
    assert.deepEqual(migrated.equipment, { weapon: null });
  });
});

test("version 2 saves keep route progress during the onboarding migration", () => {
  withMemoryStorage((store) => {
    const oldSave = createInitialState();
    oldSave.saveVersion = 2;
    delete oldSave.onboardingSeen;
    delete oldSave.formationFrontId;
    delete oldSave.equipment;
    delete oldSave.inventory.edge;
    oldSave.completedRoutes = ["mosswind"];
    oldSave.selectedRoute = "amber-quarry";
    oldSave.coin = 74;
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 8);
    assert.deepEqual(migrated.completedRoutes, ["mosswind"]);
    assert.equal(migrated.selectedRoute, "amber-quarry");
    assert.equal(migrated.coin, 74);
    assert.equal(migrated.onboardingSeen, false);
    assert.deepEqual(migrated.equipment, { weapon: null });
  });
});

test("version 3 saves keep onboarding preference and route progress", () => {
  withMemoryStorage((store) => {
    const oldSave = createInitialState();
    oldSave.saveVersion = 3;
    oldSave.onboardingSeen = true;
    oldSave.completedRoutes = ["mosswind"];
    oldSave.selectedRoute = "amber-quarry";
    delete oldSave.formationFrontId;
    delete oldSave.equipment;
    delete oldSave.inventory.edge;
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 8);
    assert.equal(migrated.onboardingSeen, true);
    assert.equal(migrated.formationFrontId, "mara");
    assert.deepEqual(migrated.equipment, { weapon: null });
    assert.deepEqual(migrated.completedRoutes, ["mosswind"]);
    assert.equal(migrated.selectedRoute, "amber-quarry");
  });
});

test("version 4 saves preserve formation and onboarding while adding an empty gear slot", () => {
  withMemoryStorage((store) => {
    const oldSave = hireScout(createInitialState());
    oldSave.saveVersion = 4;
    oldSave.onboardingSeen = true;
    oldSave.formationFrontId = "scout";
    delete oldSave.equipment;
    delete oldSave.inventory.edge;
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 8);
    assert.equal(migrated.onboardingSeen, true);
    assert.equal(migrated.formationFrontId, "scout");
    assert.deepEqual(migrated.equipment, { weapon: null });
    assert.equal(migrated.inventory.edge, 0);
    assert.equal(migrated.tripLedger, null);
    assert.equal(migrated.lastSettlement, null);
  });
});

test("version 5 saves preserve crew, equipment and route progress while adding settlement fields", () => {
  withMemoryStorage((store) => {
    const oldSave = hireScout(createInitialState());
    oldSave.saveVersion = 5;
    oldSave.formationFrontId = "scout";
    oldSave.completedRoutes = ["mosswind"];
    oldSave.selectedRoute = "amber-quarry";
    oldSave.equipment = { weapon: "edge" };
    oldSave.inventory.edge = 0;
    delete oldSave.inventory["tool-roll"];
    delete oldSave.tripLedger;
    delete oldSave.lastSettlement;
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 8);
    assert.equal(migrated.party.length, 2);
    assert.equal(migrated.formationFrontId, "scout");
    assert.deepEqual(migrated.equipment, { weapon: "edge" });
    assert.deepEqual(migrated.completedRoutes, ["mosswind"]);
    assert.equal(migrated.selectedRoute, "amber-quarry");
    assert.equal(migrated.tripLedger, null);
    assert.equal(migrated.lastSettlement, null);
  });
});

test("version 6 saves preserve settlement data while adding the recipe output slot", () => {
  withMemoryStorage((store) => {
    const oldSave = createInitialState();
    oldSave.saveVersion = 6;
    delete oldSave.inventory["tool-roll"];
    delete oldSave.language;
    delete oldSave.combatShortcutsEnabled;
    oldSave.coin = 83;
    oldSave.lastSettlement = {
      routeId: "amber-quarry", rationCost: 6, rewardCoin: 27, cargoValue: 22,
      cargoSoldRevenue: 0, cargoCount: 1, cargoSoldCount: 0, netProceeds: 21
    };
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 8);
    assert.equal(migrated.coin, 83);
    assert.equal(migrated.inventory["tool-roll"], 0);
    assert.deepEqual(migrated.lastSettlement, oldSave.lastSettlement);
    assert.equal(migrated.language, "en");
    assert.equal(migrated.combatShortcutsEnabled, true);
  });
});

test("version 7 settlement saves gain English defaults for the new preferences", () => {
  withMemoryStorage((store) => {
    const oldSave = createInitialState();
    oldSave.saveVersion = 7;
    delete oldSave.language;
    delete oldSave.combatShortcutsEnabled;
    oldSave.lastSettlement = {
      routeId: "mosswind", rationCost: 6, rewardCoin: 18, cargoValue: 26,
      cargoSoldRevenue: 0, cargoCount: 2, cargoSoldCount: 0, netProceeds: 12
    };
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 8);
    assert.equal(migrated.language, "en");
    assert.equal(migrated.combatShortcutsEnabled, true);
    assert.deepEqual(migrated.lastSettlement, oldSave.lastSettlement);
  });
});

test("storage denial falls back without crashing the game", () => {
  const previous = globalThis.window;
  globalThis.window = { localStorage: { setItem() { throw new Error("blocked"); }, getItem() { throw new Error("blocked"); }, removeItem() { throw new Error("blocked"); } } };
  try {
    assert.equal(saveGame(createInitialState()), false);
    assert.equal(loadGame(), null);
    assert.doesNotThrow(() => clearGame());
  } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
});
