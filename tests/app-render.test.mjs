import test from "node:test";
import assert from "node:assert/strict";

const elements = new Map();
const clickHandlers = [];
const keyHandlers = [];
const storage = new Map();
function element(selector) {
  if (!elements.has(selector)) elements.set(selector, {
    innerHTML: "", textContent: "", disabled: false, style: {}, dataset: {},
    classList: { toggle() {} }, setAttribute() {}
  });
  return elements.get(selector);
}
const navButtons = ["journey", "market", "roster", "inventory", "journal"].map((tab) => ({
  dataset: { tab }, disabled: false, classList: { toggle() {} }, setAttribute() {}
}));
globalThis.document = {
  querySelector: element,
  querySelectorAll: () => navButtons,
  addEventListener(type, handler) { (type === "click" ? clickHandlers : keyHandlers).push(handler); },
  body: { dataset: {} }
};
globalThis.window = {
  confirm: () => true,
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); },
    removeItem(key) { storage.delete(key); }
  }
};
await import("../game/app.mjs?app-render-test");

function savedState() { return JSON.parse(storage.get("wayfarers-ledger:v5:save")); }
function click(button) {
  const target = { closest(selector) {
    if (selector === "[data-route]") return button?.dataset?.route ? button : null;
    if (selector === "[data-target]") return button?.dataset?.target ? button : null;
    if (selector === "button") return button || null;
    return null;
  } };
  clickHandlers.at(-1)({ target });
}

test("route board and rendered journey flow select the distinct quarry encounter", () => {
  assert.match(element("#game-content").innerHTML, /Mosswind Road/);
  assert.match(element("#game-content").innerHTML, /Amber Quarry/);
  assert.match(element("#game-content").innerHTML, /LOCKED/);

  click({ dataset: { action: "hire" } });
  click({ dataset: { action: "start" } });
  for (let turn = 0; turn < 3; turn += 1) click({ dataset: { action: "strike" } });
  assert.equal(savedState().phase, "victory");
  click({ dataset: { action: "return-town" } });
  assert.equal(savedState().phase, "town");

  click({ dataset: { route: "amber-quarry" } });
  assert.equal(savedState().selectedRoute, "amber-quarry");
  assert.match(element("#game-content").innerHTML, /SELECTED/);
  click({ dataset: { action: "start" } });
  const rendered = element("#game-content").innerHTML;
  assert.match(rendered, /quarry-scene/);
  assert.match(rendered, /Quarry Watch/);
  assert.match(rendered, /Quarry Warden/);
  assert.equal(savedState().battle.routeId, "amber-quarry");
});
