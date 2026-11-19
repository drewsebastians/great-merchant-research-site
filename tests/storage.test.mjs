import test from "node:test";
import assert from "node:assert/strict";
import { createInitialState } from "../game/data.mjs";
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
    oldSave.coin = 41;
    oldSave.party[0].hp = 53;
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 4);
    assert.equal(migrated.coin, 41);
    assert.equal(migrated.party[0].hp, 53);
    assert.equal(migrated.selectedRoute, "mosswind");
    assert.deepEqual(migrated.completedRoutes, []);
    assert.equal(migrated.onboardingSeen, false);
  });
});

test("version 2 saves keep route progress during the onboarding migration", () => {
  withMemoryStorage((store) => {
    const oldSave = createInitialState();
    oldSave.saveVersion = 2;
    delete oldSave.onboardingSeen;
    oldSave.completedRoutes = ["mosswind"];
    oldSave.selectedRoute = "amber-quarry";
    oldSave.coin = 74;
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 4);
    assert.deepEqual(migrated.completedRoutes, ["mosswind"]);
    assert.equal(migrated.selectedRoute, "amber-quarry");
    assert.equal(migrated.coin, 74);
    assert.equal(migrated.onboardingSeen, false);
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
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 4);
    assert.equal(migrated.onboardingSeen, true);
    assert.equal(migrated.formationFrontId, "mara");
    assert.deepEqual(migrated.completedRoutes, ["mosswind"]);
    assert.equal(migrated.selectedRoute, "amber-quarry");
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
