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
const navI18n = { journey: "tab.journey", market: "tab.market", roster: "tab.crew", inventory: "tab.pack", journal: "tab.journal", preferences: "tab.preferences" };
const navButtons = ["journey", "market", "roster", "inventory", "journal", "preferences"].map((tab) => ({
  dataset: { tab, i18n: navI18n[tab] }, textContent: tab, disabled: false, classList: { toggle() {} }, setAttribute() {}
}));
globalThis.document = {
  documentElement: { lang: "en" },
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
    if (selector === '[data-action^="onboarding-"]') return button?.dataset?.action?.startsWith("onboarding-") ? button : null;
    if (selector === ".guide-backdrop") return button?.backdrop ? button : null;
    if (selector === ".guide-dialog") return button?.insideGuide ? button : null;
    if (selector === "[data-formation-front]") return button?.dataset?.formationFront ? button : null;
    if (selector === "[data-route]") return button?.dataset?.route ? button : null;
    if (selector === "[data-target]") return button?.dataset?.target ? button : null;
    if (selector === "button") return button || null;
    return null;
  } };
  clickHandlers.at(-1)({ target });
}

test("route board and rendered journey flow select the distinct quarry encounter", () => {
  assert.match(element("#guide-layer").innerHTML, /FIELD GUIDE/);
  assert.match(element("#guide-layer").innerHTML, /Start from Hearthcross/);
  assert.match(element("#guide-layer").innerHTML, /CLICK OUTSIDE TO CLOSE/);
  click({ backdrop: true, dataset: {} });
  assert.equal(savedState().onboardingSeen, true);
  assert.equal(element("#guide-layer").innerHTML, "");

  assert.match(element("#game-content").innerHTML, /Mosswind Road/);
  assert.match(element("#game-content").innerHTML, /Amber Quarry/);
  assert.match(element("#game-content").innerHTML, /LOCKED/);
  assert.match(element("#game-content").innerHTML, /travel-map/);
  assert.match(element("#game-content").innerHTML, /aria-label="Amber Quarry, locked"/);

  click({ dataset: { action: "hire" } });
  click({ dataset: { formationFront: "scout" } });
  assert.equal(savedState().formationFrontId, "scout");
  click({ dataset: { formationFront: "mara" } });
  assert.equal(savedState().formationFrontId, "mara");
  click({ dataset: { tab: "market" } });
  assert.match(element("#game-content").innerHTML, /Wayfarer&#39;s Edge/);
  click({ dataset: { action: "buy", item: "edge" } });
  assert.equal(savedState().inventory.edge, 1);
  assert.equal(savedState().coin, 4);
  click({ dataset: { tab: "inventory" } });
  click({ dataset: { action: "equip", item: "edge" } });
  assert.equal(savedState().equipment.weapon, "edge");
  assert.match(element("#game-content").innerHTML, /UNEQUIP/);
  click({ dataset: { action: "unequip" } });
  assert.equal(savedState().inventory.edge, 1);
  click({ dataset: { action: "equip", item: "edge" } });
  click({ dataset: { tab: "roster" } });
  assert.match(element("#game-content").innerHTML, /Wayfarer&#39;s Edge/);
  assert.match(element("#game-content").innerHTML, /\+3 Strike damage/);
  click({ dataset: { tab: "journey" } });
  click({ dataset: { action: "start" } });
  assert.match(element("#game-content").innerHTML, /STRIKE 17/);
  for (let turn = 0; turn < 3; turn += 1) click({ dataset: { action: "strike" } });
  assert.equal(savedState().phase, "victory");
  click({ dataset: { action: "return-town" } });
  assert.equal(savedState().phase, "town");
  assert.equal(savedState().lastSettlement.netProceeds, 12);
  click({ dataset: { tab: "market" } });
  assert.match(element("#game-content").innerHTML, /Settlement ledger/);
  assert.match(element("#game-content").innerHTML, /NET PROCEEDS/);
  click({ dataset: { action: "sell", item: "tea" } });
  click({ dataset: { action: "sell", item: "tea" } });
  assert.equal(savedState().lastSettlement.cargoSoldRevenue, 26);
  assert.equal(savedState().lastSettlement.netProceeds, 38);

  click({ dataset: { tab: "journey" } });
  click({ dataset: { route: "amber-quarry" } });
  assert.equal(savedState().selectedRoute, "amber-quarry");
  assert.match(element("#game-content").innerHTML, /SELECTED/);
  assert.match(element("#game-content").innerHTML, /aria-label="Amber Quarry, selected"/);
  click({ dataset: { action: "start" } });
  const rendered = element("#game-content").innerHTML;
  assert.match(rendered, /quarry-scene/);
  assert.match(rendered, /Quarry Watch/);
  assert.match(rendered, /Quarry Warden/);
  assert.equal(savedState().battle.routeId, "amber-quarry");

  click({ dataset: { action: "onboarding-replay" } });
  assert.match(element("#guide-layer").innerHTML, /FIELD GUIDE · 01/);
  click({ dataset: { action: "onboarding-next" } });
  assert.match(element("#guide-layer").innerHTML, /Choose a route/);
  click({ dataset: { action: "onboarding-back" } });
  assert.match(element("#guide-layer").innerHTML, /Start from Hearthcross/);
  for (let step = 0; step < 3; step += 1) click({ dataset: { action: "onboarding-next" } });
  assert.match(element("#guide-layer").innerHTML, /Bring your gains home/);
  click({ dataset: { action: "onboarding-close" } });
  assert.equal(savedState().onboardingSeen, true);
  assert.equal(element("#guide-layer").innerHTML, "");

  click({ dataset: { action: "onboarding-replay" } });
  keyHandlers.at(-1)({ key: "Escape", preventDefault() {} });
  assert.equal(element("#guide-layer").innerHTML, "");
  assert.equal(savedState().onboardingSeen, true);

  for (let turn = 0; turn < 3; turn += 1) click({ dataset: { action: "strike" } });
  assert.equal(savedState().phase, "victory");
  click({ dataset: { action: "return-town" } });
  click({ dataset: { tab: "market" } });
  assert.match(element("#game-content").innerHTML, /Make for the caravan/);
  assert.match(element("#game-content").innerHTML, /1 × Bronze Fittings/);
  click({ dataset: { action: "craft", recipe: "quarry-roll" } });
  assert.equal(savedState().inventory.fittings, 0);
  assert.equal(savedState().inventory["tool-roll"], 1);
  assert.equal(savedState().lastSettlement.cargoValue, 28);
  click({ dataset: { action: "sell", item: "tool-roll" } });
  assert.equal(savedState().lastSettlement.cargoSoldRevenue, 28);
  assert.equal(savedState().lastSettlement.netProceeds, 49);

  click({ dataset: { tab: "preferences" } });
  assert.equal(savedState().activeTab, "preferences");
  assert.match(element("#game-content").innerHTML, /Bahasa Indonesia/);
  click({ dataset: { languageOption: "id" } });
  assert.equal(savedState().language, "id");
  assert.equal(element("#screen-title").textContent, "Bahasa dan kontrol");
  assert.equal(navButtons[0].textContent, "Perjalanan");
  assert.equal(navButtons[5].textContent, "Preferensi");
  assert.match(element("#game-content").innerHTML, /Pintasan angka untuk pertempuran/);
  click({ dataset: { action: "toggle-shortcuts" } });
  assert.equal(savedState().combatShortcutsEnabled, false);
  assert.match(element("#game-content").innerHTML, /OFF/);
  click({ dataset: { tab: "market" } });
  click({ dataset: { action: "buy", item: "ration" } });
  click({ dataset: { tab: "journey" } });
  click({ dataset: { action: "start" } });
  assert.equal(savedState().phase, "battle");
  const turnBeforeShortcut = savedState().battle.turn;
  let keyPrevented = false;
  keyHandlers.at(-1)({ key: "1", preventDefault() { keyPrevented = true; } });
  assert.equal(keyPrevented, false);
  assert.equal(savedState().battle.turn, turnBeforeShortcut);
  click({ dataset: { tab: "preferences" } });
  click({ dataset: { action: "toggle-shortcuts" } });
  assert.equal(savedState().combatShortcutsEnabled, true);
  click({ dataset: { tab: "journey" } });
  keyHandlers.at(-1)({ key: "1", preventDefault() { keyPrevented = true; } });
  assert.equal(keyPrevented, true);
  assert.equal(savedState().battle.turn, turnBeforeShortcut + 1);
});
