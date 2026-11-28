import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const elements = new Map();
const clickHandlers = [];
const submitHandlers = [];
const contextMenuHandlers = [];
const keyHandlers = [];
const storage = new Map();
let scheduledNoticeTimer = null;
let nextNoticeTimerId = 0;
const scheduledIntervals = [];
const guideFocusables = ["close", "skip", "next"].map((name) => ({ name, focus() { document.activeElement = this; } }));
function element(selector) {
  if (!elements.has(selector)) elements.set(selector, {
    innerHTML: "", textContent: "", disabled: false, style: {}, dataset: {}, value: "",
    classList: {
      values: new Set(),
      toggle(name, force) {
        const enabled = force ?? !this.values.has(name);
        if (enabled) this.values.add(name);
        else this.values.delete(name);
        return enabled;
      },
      contains(name) { return this.values.has(name); }
    },
    setAttribute() {}, focus() { document.activeElement = this; }
  });
  return elements.get(selector);
}
globalThis.document = {
  documentElement: { lang: "en" },
  activeElement: null,
  querySelector: element,
  querySelectorAll() { return []; },
  addEventListener(type, handler) {
    if (type === "click") clickHandlers.push(handler);
    else if (type === "submit") submitHandlers.push(handler);
    else if (type === "contextmenu") contextMenuHandlers.push(handler);
    else keyHandlers.push(handler);
  },
  body: { dataset: {} }
};
element("#guide-layer").querySelector = (selector) => selector === "[data-guide-next]" ? guideFocusables[2] : null;
element("#guide-layer").querySelectorAll = () => guideFocusables;
globalThis.window = {
  confirm: () => true,
  setTimeout(callback, delay) {
    const id = ++nextNoticeTimerId;
    scheduledNoticeTimer = { id, callback, delay };
    return id;
  },
  clearTimeout(id) { if (scheduledNoticeTimer?.id === id) scheduledNoticeTimer = null; },
  setInterval(callback, delay) {
    const id = ++nextNoticeTimerId;
    scheduledIntervals.push({ id, callback, delay });
    return id;
  },
  clearInterval() {},
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); },
    removeItem(key) { storage.delete(key); }
  }
};
function fireNoticeTimer() {
  const timer = scheduledNoticeTimer;
  scheduledNoticeTimer = null;
  timer?.callback();
}
await import("../game/app.mjs?client-shell-test");
const gameStyles = await readFile(new URL("../game/styles.css", import.meta.url), "utf8");
const gameHtml = await readFile(new URL("../game/index.html", import.meta.url), "utf8");
const gameApp = await readFile(new URL("../game/app.mjs", import.meta.url), "utf8");
const staticIds = new Set([...gameHtml.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));

function savedState() { return JSON.parse(storage.get("wayfarers-ledger:v5:save")); }
function fakeButton(dataset = {}, options = {}) {
  return { dataset, disabled: false, ...options };
}
function click(button) {
  const target = { closest(selector) {
    if (selector === '[data-action^="onboarding-"]') return button?.dataset?.action?.startsWith("onboarding-") ? button : null;
    if (selector === ".guide-backdrop") return button?.backdrop ? button : null;
    if (selector === ".guide-dialog") return button?.insideGuide ? button : null;
    if (selector === "[data-unit-select]") return button?.dataset?.unitSelect ? button : null;
    if (selector === "[data-status-unit-select]") return button?.dataset?.statusUnitSelect ? button : null;
    if (selector === "[data-formation-front]") return button?.dataset?.formationFront ? button : null;
    if (selector === "[data-route]") return button?.dataset?.route ? button : null;
    if (selector === "[data-target]") return button?.dataset?.target ? button : null;
    if (selector === "[data-window-name]") return button?.dataset?.windowName ? button : null;
    if (selector === "button") return button || null;
    return null;
  } };
  clickHandlers.at(-1)({ target });
}
function contextMenu(button) {
  let prevented = false;
  const target = { closest(selector) {
    if (selector === "#portrait-rail [data-unit-select]") return button?.inPortraitRail && button?.dataset?.unitSelect ? button : null;
    return null;
  } };
  contextMenuHandlers.at(-1)({ target, preventDefault() { prevented = true; } });
  return prevented;
}
function openWindow(name) { click(fakeButton({ window: name })); }
function action(name, extra = {}) { click(fakeButton({ action: name, ...extra })); }

test("desktop shell is scene-first with client portraits, minimap, HUD, chat and contextual windows", () => {
  for (const id of ["screen-eyebrow", "screen-title", "phase-label", "day-count", "campaign-date", "campaign-season", "campaign-day-label", "device-time", "clock-label", "portrait-rail", "world-content", "mini-map-root", "map-overlay-root", "overview-strip", "client-menu", "chat-feed", "client-window-root", "save-state"]) {
    assert.match(gameHtml, new RegExp('id="' + id + '"'));
  }
  for (const [, id] of gameApp.matchAll(/(?:document\.querySelector|\$)\("#([^\"]+)"\)/g)) assert.ok(staticIds.has(id), `Missing static shell node: #${id}`);
  assert.match(gameHtml, /id="portrait-rail"/);
  assert.match(gameHtml, /id="mini-map-root"/);
  assert.match(gameHtml, /id="overview-strip"/);
  assert.match(gameHtml, /id="client-menu"/);
  assert.match(gameHtml, /id="local-chat-form"/);
  assert.match(element("#world-content").innerHTML, /world-scene town-scene/);
  assert.match(element("#world-content").innerHTML, /Hearthcross/);
  assert.match(element("#portrait-rail").innerHTML, /Mara/);
  assert.match(element("#mini-map-root").innerHTML, /mini-map/);
  assert.match(element("#mini-map-root").innerHTML, /data-action="map-maximize"/);
  assert.match(element("#overview-strip").innerHTML, /TOTAL ATTACK|ATTACK/);
  assert.match(element("#overview-strip").innerHTML, /RATIONS/);
  assert.doesNotMatch(element("#overview-strip").innerHTML, /STAMINA/);
  assert.match(element("#campaign-season").textContent, /YEAR 01 · BUDBREAK/);
  assert.match(element("#day-count").textContent, /^01$/);
  assert.match(element("#device-time").textContent, /^\d{2}:\d{2}$/);
  assert.equal(scheduledIntervals.find((timer) => timer.delay === 30_000)?.delay, 30_000);
  scheduledIntervals.find((timer) => timer.delay === 30_000)?.callback();
  assert.match(element("#device-time").textContent, /^\d{2}:\d{2}$/);
  assert.match(element("#client-menu").innerHTML, /data-window="inventory"/);
  assert.equal(element("#client-window-root").innerHTML, "");
  assert.match(gameHtml, /id="map-overlay-root"/);
  assert.match(gameStyles, /grid-template-columns: 74px minmax\(0, 1fr\)/);
  assert.match(gameStyles, /\.world-scene\.town-scene \{ background-image: url\("\.\/assets\/hearthcross-field\.jpg"\); \}/);
  assert.match(gameStyles, /\.world-scene\.road-scene \{ background-image: url\("\.\/assets\/mosswind-road\.jpg"\); \}/);
  assert.match(gameStyles, /\.world-scene\.quarry-scene \{ background-image: url\("\.\/assets\/amber-quarry\.jpg"\); \}/);
  assert.match(gameHtml, /class="topbar" aria-label="Client controls"/);
  assert.match(gameHtml, /class="client-heading sr-only" aria-live="polite"/);
  assert.doesNotMatch(gameHtml, /class="brand"/);
  assert.match(gameStyles, /\.topbar \{ height: 28px; display: flex;/);
  assert.match(gameStyles, /grid-template-rows: minmax\(330px, 1fr\) 118px/);
  assert.match(gameStyles, /\.lower-hud \{[^}]*minmax\(0,1fr\) minmax\(0,2fr\) minmax\(0,1fr\)[^}]*padding: 4px 8px;[^}]*border-bottom:/);
  assert.match(gameHtml, /class="client-controls" role="group" aria-label="Client menu and campaign date"/);
  assert.match(gameStyles, /\.client-menu \{ display: grid; grid-template-columns: repeat\(7, minmax\(0,1fr\)\); grid-template-rows: 1fr 1fr;/);
  assert.match(gameStyles, /\.client-menu-button\.state-toggle:nth-child\(8\) \{ grid-column: 1 \/ span 3; grid-row: 2; \}/);
  assert.match(gameStyles, /\.client-menu-button\.state-toggle:nth-child\(9\) \{ grid-column: 5 \/ span 3; grid-row: 2; \}/);
  assert.match(gameStyles, /\.client-window::before \{[^}]*background:/);
  assert.match(gameStyles, /\.client-window::before \{[^}]*radial-gradient\(circle/);
  assert.match(gameStyles, /\.client-window::after \{[^}]*inset: 4px; border: 1px solid/);
  assert.match(gameStyles, /\.client-window::after \{[^}]*radial-gradient\(circle[^}]*linear-gradient\(90deg, transparent, rgba\(221,191,125/);
  assert.match(gameStyles, /\.client-window \{[^}]*0 0 0 3px rgba\(207,180,120,\.32\)/);
  assert.match(gameStyles, /\.client-window-layer \{[^}]*pointer-events: none/);
  assert.match(gameStyles, /\.client-window:not\(\.window-active\) \{ display: none; \}/);
  assert.match(gameStyles, /\.window-titlebar \{ min-height: 32px;/);
  assert.match(gameStyles, /\.window-titlebar \{[^}]*url\("\.\/assets\/window-engraving\.svg"\)/);
  assert.match(gameStyles, /\.window-titlebar \{[^}]*border-top: 1px solid/);
  assert.match(gameStyles, /\.window-titlebar h2 \{[^}]*font: 14px\/1\.1 var\(--serif\);/);
  assert.match(gameStyles, /\.screen-status \{ display: none; \}/);
  assert.match(gameStyles, /@media \(max-width: 900px\)/);
  assert.match(gameStyles, /@media \(max-height: 700px\) and \(min-width: 901px\)/);
  assert.match(gameStyles, /grid-template-rows: minmax\(300px,1fr\) 120px/);
  assert.match(gameStyles, /grid-template-columns: minmax\(0,1fr\) minmax\(0,2fr\) minmax\(0,1fr\)/);
  assert.match(gameStyles, /\.hud-date time \{ color: #e2d5ad; font: 10px\/1 var\(--mono\);/);
  assert.match(gameStyles, /grid-template-columns: minmax\(0,1fr\); grid-template-rows: auto 90px 106px/);
  click(fakeButton({ action: "onboarding-close" }));
  openWindow("status");
  assert.match(element("#client-window-root").innerHTML, /ROAD RATIONS/);
  assert.doesNotMatch(element("#client-window-root").innerHTML, /STAMINA/);
  click(fakeButton({ action: "close-window", windowClose: "status" }));
  assert.equal(element("#client-window-root").innerHTML, "");
});

test("expanded original map traps focus, closes with Escape and preserves the journey", () => {
  click(fakeButton({ action: "onboarding-close" }));
  const before = savedState();
  const overlayRoot = element("#map-overlay-root");
  const first = element("#maximized-map-close");
  const route = element("#map-route-focus-test");
  const last = element("#maximized-map-footer-close");
  overlayRoot.querySelectorAll = () => [first, route, last];
  overlayRoot.querySelector = (selector) => selector === "#maximized-map-close" ? first : null;
  element("#mini-map-root").querySelector = (selector) => selector === "#map-maximize-button" ? element("#map-maximize-button") : null;

  action("map-maximize");
  assert.match(overlayRoot.innerHTML, /role="dialog" aria-modal="true"/);
  assert.match(overlayRoot.innerHTML, /The Ridgeway/);
  assert.match(overlayRoot.innerHTML, /Mosswind Road/);
  assert.match(overlayRoot.innerHTML, /Amber Quarry/);
  assert.equal(element(".topbar").inert, true);
  assert.equal(element(".game-layout").inert, true);
  assert.equal(document.activeElement, element("#maximized-map-close"));

  document.activeElement = last;
  let prevented = false;
  keyHandlers.at(-1)({ key: "Tab", preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(document.activeElement, first);
  document.activeElement = first;
  prevented = false;
  keyHandlers.at(-1)({ key: "Tab", shiftKey: true, preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(document.activeElement, last);

  prevented = false;
  keyHandlers.at(-1)({ key: "Escape", preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(overlayRoot.innerHTML, "");
  assert.equal(element(".topbar").inert, false);
  assert.equal(element(".game-layout").inert, false);
  assert.equal(document.activeElement, element("#map-maximize-button"));
  assert.deepEqual(savedState(), before);
});

test("system window groups visible controls by mode without claiming Xian key bindings", () => {
  click(fakeButton({ action: "onboarding-close" }));
  const before = savedState();
  const progressBefore = { phase: before.phase, day: before.day, coin: before.coin, inventory: before.inventory, party: before.party };

  openWindow("system");
  let html = element("#client-window-root").innerHTML;
  assert.equal((html.match(/class="mode-command-card"/g) || []).length, 3);
  assert.match(html, /Field \/ town/);
  assert.match(html, /Shop/);
  assert.match(html, /Battlefield/);
  assert.match(html, /Move, Attack, Hold, or Stop/);
  assert.match(html, /Xian key mappings and battle timing remain unverified/);
  assert.deepEqual({ phase: savedState().phase, day: savedState().day, coin: savedState().coin, inventory: savedState().inventory, party: savedState().party }, progressBefore);
  action("close-window", { windowClose: "system" });

  click(fakeButton({ languageOption: "id" }));
  openWindow("system");
  html = element("#client-window-root").innerHTML;
  assert.match(html, /Lapangan \/ kota/);
  assert.match(html, /Pilih rute dan berangkat/);
  assert.match(html, /Pilih unit atau kelompok/);
  assert.match(html, /Pemetaan tombol dan waktu pertempuran Xian belum terverifikasi/i);
  assert.match(html, /role="list"/);
  action("close-window", { windowClose: "system" });
  click(fakeButton({ languageOption: "en" }));
});

test("travel, recruitment, trade, battle commands, withdrawal and local saves remain connected", () => {
  click(fakeButton({ action: "onboarding-close" }));
  openWindow("travel");
  assert.match(element("#client-window-root").innerHTML, /World map/);
  assert.match(element("#client-window-root").innerHTML, /Mosswind Road/);
  assert.match(element("#client-window-root").innerHTML, /Amber Quarry/);

  openWindow("character");
  action("hire");
  assert.equal(savedState().party.length, 2);
  assert.equal(savedState().coin, 38);

  openWindow("market");
  assert.equal(document.body.dataset.mode, "shop");
  action("buy", { item: "ration" });
  assert.equal(savedState().inventory.ration, 3);

  openWindow("travel");
  action("start");
  assert.equal(savedState().phase, "battle");
  assert.equal(document.body.dataset.mode, "battlefield");
  const battleHtml = element("#world-content").innerHTML;
  for (const control of ["move", "attack", "hold", "stop", "select-group", "withdraw"]) {
    assert.match(battleHtml, new RegExp('data-action="' + control + '"'));
  }
  assert.match(battleHtml, /data-target="lookout"/);

  action("move");
  assert.match(element("#world-content").innerHTML, /data-action="move-to"/);
  assert.equal(element("#notice").classList.contains("show"), true);
  fireNoticeTimer();
  assert.equal(element("#notice").classList.contains("show"), false);
  click(fakeButton({ action: "move-to", zone: "east" }));
  assert.match(savedState().notice, /repositioned to the east position/);
  assert.equal(element("#notice").classList.contains("show"), true);
  fireNoticeTimer();
  assert.equal(element("#notice").classList.contains("show"), false);

  click(fakeButton({ action: "select-group", group: "rear" }));
  assert.match(element("#world-content").innerHTML, /data-group="rear" class="selected"/);
  assert.equal(element("#notice").classList.contains("show"), false);
  const turn = savedState().battle.turn;
  action("attack");
  assert.equal(savedState().battle.turn, turn + 1);

  action("withdraw");
  assert.equal(savedState().phase, "town");
  assert.equal(savedState().battle, null);
  assert.equal(savedState().day, 2);
  assert.equal(element("#day-count").textContent, "02");
  assert.equal(savedState().lastSettlement.rewardCoin, 0);
  assert.ok(savedState().party.every((unit) => unit.hp > 0));
  assert.equal(document.body.dataset.mode, "field");
});

test("portrait right-click opens selected status without changing the saved journey", () => {
  const before = savedState();
  assert.ok(before.party.some((unit) => unit.id === "scout"));
  const journeyBefore = {
    phase: before.phase,
    day: before.day,
    coin: before.coin,
    completedRoutes: before.completedRoutes,
    routeRuns: before.routeRuns,
    party: before.party,
    inventory: before.inventory
  };
  assert.equal(contextMenu(fakeButton({ unitSelect: "scout" }, { inPortraitRail: true })), true);
  assert.match(element("#client-window-root").innerHTML, /data-window-name="status"/);
  assert.match(element("#client-window-root").innerHTML, /class="status-member selected" data-status-member="scout" data-status-unit-select="scout" aria-label="Select character Tarin Reed" aria-pressed="true"/);
  assert.match(element("#client-window-root").innerHTML, /SELECTED PORTRAIT/);
  assert.match(element("#portrait-rail").innerHTML, /left click: inventory · right click: status/i);
  assert.match(element("#client-window-root").innerHTML, /CHARACTER PROFILE · CURRENT SELECTION/);
  click(fakeButton({ statusUnitSelect: "mara" }));
  assert.match(element("#client-window-root").innerHTML, /class="status-member selected" data-status-member="mara" data-status-unit-select="mara" aria-label="Select character Mara Venn" aria-pressed="true"/);
  const statusOpen = savedState();
  assert.deepEqual({ phase: statusOpen.phase, day: statusOpen.day, coin: statusOpen.coin, completedRoutes: statusOpen.completedRoutes, routeRuns: statusOpen.routeRuns, party: statusOpen.party, inventory: statusOpen.inventory }, journeyBefore);

  click(fakeButton({ unitSelect: "mara" }));
  assert.match(element("#client-window-root").innerHTML, /Inventory · party pack/);
  assert.match(element("#client-window-root").innerHTML, /class="inventory-context-strip"/);
  assert.match(element("#client-window-root").innerHTML, /SELECTED CREW MEMBER/);
  const inventoryOpen = savedState();
  assert.deepEqual({ phase: inventoryOpen.phase, day: inventoryOpen.day, coin: inventoryOpen.coin, completedRoutes: inventoryOpen.completedRoutes, routeRuns: inventoryOpen.routeRuns, party: inventoryOpen.party, inventory: inventoryOpen.inventory }, journeyBefore);
  action("close-window");
  action("close-window");
  assert.equal(element("#client-window-root").innerHTML, "");
});

test("context windows open and close without returning to dashboard pages", () => {
  click(fakeButton({ action: "onboarding-close" }));
  openWindow("inventory");
  assert.match(element("#client-window-root").innerHTML, /Inventory · party pack/);
  assert.match(element("#client-window-root").innerHTML, /Supplies and cargo/);
  openWindow("quest");
  assert.equal((element("#client-window-root").innerHTML.match(/role="dialog"/g) || []).length, 2);
  assert.match(element("#client-window-root").innerHTML, /aria-modal="false"/);
  assert.doesNotMatch(element("#client-window-root").innerHTML, /window-scrim/);
  assert.match(element("#client-window-root").innerHTML, /--window-center-x:37%/);
  assert.match(element("#client-window-root").innerHTML, /--window-center-x:72%/);
  assert.match(gameStyles, /\.client-window-layer\.window-layer-two \.client-window[^}]*width: min\(34%, 520px\)/);
  assert.match(gameStyles, /\.client-window-layer\.window-layer-two \.client-window[^}]*height: min\(60%, 440px\)/);
  assert.ok(element("#client-window-root").innerHTML.indexOf('data-window-name="inventory"') < element("#client-window-root").innerHTML.indexOf('data-window-name="quest"'));
  assert.match(element("#client-window-root").innerHTML, /Quest information/);
  assert.doesNotMatch(element("#client-window-root").innerHTML, /WAYFARER CLIENT WINDOW/);
  assert.match(element("#client-window-root").innerHTML, /The Courier&#39;s Mark/);
  assert.match(element("#client-window-root").innerHTML, /class="quest-journal-layout"/);
  assert.match(element("#client-window-root").innerHTML, /data-action="quest-filter" data-filter="all"[^>]*aria-pressed="true"/);
  assert.match(element("#client-window-root").innerHTML, /data-action="quest-select" data-quest-id="courier-mark"/);
  assert.match(element("#client-window-root").innerHTML, /role="progressbar" aria-label="Step progress"/);
  assert.match(element("#client-window-root").innerHTML, /OPEN ROUTE CHART/);
  click(fakeButton({ action: "quest-select", questId: "quarry-ledger" }));
  assert.match(element("#client-window-root").innerHTML, /data-quest-id="quarry-ledger" aria-pressed="true"/);
  assert.match(element("#client-window-root").innerHTML, /UNLOCKS AFTER/);
  click(fakeButton({ action: "quest-filter", filter: "open" }));
  assert.match(element("#client-window-root").innerHTML, /data-filter="open"[^>]*aria-pressed="true"/);
  assert.doesNotMatch(element("#client-window-root").innerHTML, /data-quest-id="quarry-ledger"/);
  click(fakeButton({ action: "quest-filter", filter: "completed" }));
  assert.match(element("#client-window-root").innerHTML, /No contracts match this filter\./);
  click(fakeButton({ action: "quest-filter", filter: "all" }));
  click(fakeButton({ windowName: "inventory" }));
  assert.ok(element("#client-window-root").innerHTML.indexOf('data-window-name="quest"') < element("#client-window-root").innerHTML.indexOf('data-window-name="inventory"'));
  let prevented = false;
  keyHandlers.at(-1)({ key: "Escape", preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.match(element("#client-window-root").innerHTML, /Quest information/);
  assert.doesNotMatch(element("#client-window-root").innerHTML, /Inventory · party pack/);
  action("close-window");
  assert.equal(element("#client-window-root").innerHTML, "");
  click(fakeButton({ languageOption: "id" }));
  openWindow("quest");
  assert.match(element("#client-window-root").innerHTML, /class="quest-filter-button selected" data-action="quest-filter" data-filter="all"/);
  assert.match(element("#client-window-root").innerHTML, /data-tab="journey"/);
  assert.match(element("#client-window-root").innerHTML, /aria-label="KONTRAK TERBUKA"/);
  click(fakeButton({ action: "quest-filter", filter: "open" }));
  assert.match(element("#client-window-root").innerHTML, /data-filter="open" aria-label="KONTRAK TERBUKA" aria-pressed="true"/);
  action("close-window");
  click(fakeButton({ languageOption: "en" }));
});

test("local chat is explicit and does not change game progression", () => {
  click(fakeButton({ action: "onboarding-close" }));
  const form = {
    id: "local-chat-form",
    querySelector() { return { value: "Ready for the road" }; },
    reset() {}
  };
  let prevented = false;
  submitHandlers.at(-1)({ target: form, preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.match(element("#chat-feed").innerHTML, /Ready for the road/);
  assert.equal(savedState().phase, "town");
  assert.match(element("#chat-feed").innerHTML, /local/i);
});

test("context windows move focus on open, active-window change, Escape and close", () => {
  click(fakeButton({ action: "onboarding-close" }));
  const before = savedState();

  openWindow("quest");
  assert.equal(document.activeElement, element('[data-window-name="quest"] .window-close'));
  openWindow("inventory");
  assert.equal(document.activeElement, element('[data-window-name="inventory"] .window-close'));
  click(fakeButton({ windowName: "quest" }));
  assert.equal(document.activeElement, element('[data-window-name="quest"] .window-close'));

  let prevented = false;
  keyHandlers.at(-1)({ key: "Escape", preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.match(element("#client-window-root").innerHTML, /Inventory · party pack/);
  assert.equal(document.activeElement, element('[data-window-name="inventory"] .window-close'));

  action("close-window", { windowClose: "inventory" });
  assert.equal(element("#client-window-root").innerHTML, "");
  assert.equal(document.activeElement, element('#client-menu [data-window="inventory"]'));
  const after = savedState();
  assert.equal(after.day, before.day);
  assert.equal(after.coin, before.coin);
  assert.deepEqual(after.inventory, before.inventory);
  assert.deepEqual(after.party, before.party);
});

test("reload clears a stale saved toast without changing journey progress", async () => {
  const prior = savedState();
  prior.day = 5;
  prior.coin = 102;
  prior.notice = "Old sale notification";
  storage.set("wayfarers-ledger:v5:save", JSON.stringify(prior));

  await import("../game/app.mjs?stale-notice-reload-test");

  assert.equal(savedState().day, 5);
  assert.equal(savedState().coin, 102);
  assert.equal(savedState().notice, null);
  assert.equal(element("#notice").textContent, "");
  assert.equal(element("#notice").classList.contains("show"), false);
});
