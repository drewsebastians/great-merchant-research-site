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
    oldSave.coin = 41;
    oldSave.party[0].hp = 53;
    store.set("wayfarers-ledger:v5:save", JSON.stringify(oldSave));
    const migrated = loadGame();
    assert.equal(migrated.saveVersion, 2);
    assert.equal(migrated.coin, 41);
    assert.equal(migrated.party[0].hp, 53);
    assert.equal(migrated.selectedRoute, "mosswind");
    assert.deepEqual(migrated.completedRoutes, []);
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
