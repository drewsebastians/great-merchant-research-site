import { ITEMS, PARTY_LIMIT, RECIPES, ROUTES, SCOUT_COST, createInitialState, findItem, findRoute } from "./data.mjs";
import { buyItem, changeTab, craftRecipe, equipItem, hireScout, isRouteUnlocked, performAction, recoverInTown, resetJourney, returnToTown, selectRoute, sellItem, setCombatShortcutsEnabled, setFormationFront, setLanguage, setTarget, startRoute, useTonic } from "./engine.mjs";
import { clearGame, loadGame, saveGame } from "./storage.mjs";

let state = loadGame() || createInitialState();
const content = document.querySelector("#game-content");
const notice = document.querySelector("#notice");
const title = document.querySelector("#screen-title");
const eyebrow = document.querySelector("#screen-eyebrow");
const phaseLabel = document.querySelector("#phase-label");
const guideLayer = document.querySelector("#guide-layer");
const $ = (selector) => document.querySelector(selector);
let guideOpen = !state.onboardingSeen;
let guideStep = 0;
const GUIDE_STEPS = [
  { kicker: "01 · GET READY", title: "Start from Hearthcross.", copy: "Hire a trail scout from Crew, check your pack and buy supplies at the Town Exchange. A ration is needed for every trip." },
  { kicker: "02 · PICK A ROAD", title: "Choose a route.", copy: "Select an open card on the travel board. Clear the Courier's Mark on Mosswind Road to open Amber Quarry." },
  { kicker: "03 · DIRECT THE CREW", title: "Choose a target, then act.", copy: "Front position sets who opens. The rear line softens incoming damage. Strike builds focus, Brace protects the front, and Wayfarer's Arc spends two focus." },
  { kicker: "04 · CLOSE THE LEDGER", title: "Bring your gains home.", copy: "After victory, return to Hearthcross to recover. Sell trade cargo, prepare again and continue. Your journey saves on this device." }
];
const STATIC_LABELS = {
  en: {
    "local.journey": "LOCAL JOURNEY", "town.name": "HEARTHCROSS", "currency.marks": "MARKS", "guide.how": "HOW TO PLAY",
    "ledger.yours": "YOUR LEDGER", "tab.journey": "Journey", "tab.market": "Town Exchange", "tab.crew": "Crew", "tab.pack": "Pack",
    "tab.journal": "Journal", "tab.preferences": "Preferences", "day.label": "DAY", "prototype.label": "ORIGINAL PROTOTYPE",
    "errand.active": "ACTIVE ERRAND", "crew.yours": "YOUR CREW", "log.field": "FIELD LOG", "action.open": "OPEN"
  },
  id: {
    "local.journey": "JURNAL LOKAL", "town.name": "HEARTHCROSS", "currency.marks": "MARK", "guide.how": "CARA BERMAIN",
    "ledger.yours": "BUKU PERJALANAN", "tab.journey": "Perjalanan", "tab.market": "Bursa Kota", "tab.crew": "Awak", "tab.pack": "Bekal",
    "tab.journal": "Jurnal", "tab.preferences": "Preferensi", "day.label": "HARI", "prototype.label": "PROTOTIPE ORISINAL",
    "errand.active": "TUGAS AKTIF", "crew.yours": "AWAKMU", "log.field": "CATATAN LAPANGAN", "action.open": "BUKA"
  }
};
const UI_PHRASES = [
  ["Language and controls", "Bahasa dan kontrol"], ["SAVED HERE", "TERSIMPAN"], ["SESSION ONLY", "SESI SAJA"],
  ["Combat number shortcuts disabled.", "Pintasan angka untuk pertempuran dimatikan."],
  ["Combat number shortcuts enabled.", "Pintasan angka untuk pertempuran diaktifkan."],
  ["Goods and provisions", "Barang dan perbekalan"], ["A small crew, well chosen", "Awak kecil, pilihan tepat"],
  ["The journey so far", "Perjalanan sejauh ini"], ["What you carry", "Barang bawaan"], ["A road opens", "Jalan terbuka"],
  ["Make for the caravan", "Produksi untuk karavan"], ["Settlement ledger", "Ringkasan hasil perjalanan"],
  ["Choose today&#39;s route", "Pilih rute hari ini"], ["SELECTED ROUTE", "RUTE PILIHAN"], ["TRAVEL BOARD", "PAPAN RUTE"],
  ["FIELD NOTES", "CATATAN LAPANGAN"], ["ACTIVE FORMATION", "FORMASI AKTIF"], ["Road crew", "Awak perjalanan"],
  ["Available goods", "Barang tersedia"], ["YOUR ORDER", "PERINTAHMU"], ["OPPONENTS · SELECT A TARGET", "LAWAN · PILIH TARGET"],
  ["TRIP COST", "BIAYA PERJALANAN"], ["ROUTE REWARD", "HADIAH RUTE"], ["CARGO VALUE", "NILAI MUATAN"],
  ["CARGO SOLD", "MUATAN TERJUAL"], ["NET PROCEEDS", "HASIL BERSIH"], ["ORIGINAL RECIPE", "RESEP ORISINAL"],
  ["Sell value: ", "Nilai jual: "], ["Materials in pack: ", "Bahan di bekal: "], ["Make for the caravan", "Produksi untuk karavan"],
  ["The interface language updates navigation, controls and common labels. Story and item descriptions remain in English.", "Bahasa mengubah navigasi, kontrol, dan label utama. Cerita dan deskripsi barang tetap berbahasa Inggris."],
  ["Choose an interface language", "Pilih bahasa antarmuka"], ["Combat number shortcuts", "Pintasan angka untuk pertempuran"],
  ["Use 1, 2 and 3 during combat to issue orders.", "Gunakan 1, 2, dan 3 saat bertempur untuk memberi perintah."],
  ["Keyboard shortcuts are off", "Pintasan papan ketik mati"], ["Keyboard shortcuts are on", "Pintasan papan ketik aktif"],
  ["KEYBOARD SHORTCUTS OFF", "PINTASAN PAPAN KETIK MATI"], ["Keys: 1 · 2 · 3", "Tombol: 1 · 2 · 3"],
  ["PREFERENCES", "PREFERENSI"], ["Town Exchange", "Bursa Kota"], ["Journey", "Perjalanan"], ["Crew", "Awak"],
  ["Pack", "Bekal"], ["Journal", "Jurnal"], ["Preferences", "Preferensi"], ["OPEN PACK", "BUKA BEKAL"],
  ["BEFORE YOU LEAVE", "SEBELUM BERANGKAT"], ["Pack for the road", "Siapkan bekal"], ["TRAVEL PARTNER", "REKAN PERJALANAN"],
  ["DAILY BOARD · PROTOTYPE QUOTES", "PAPAN HARGA · NILAI PROTOTIPE"], ["GOOD", "BARANG"], ["BUY", "BELI"], ["SELL", "JUAL"],
  ["MARKS", "MARK"], ["LOCKED", "TERKUNCI"], ["AVAILABLE", "TERSEDIA"], ["COMPLETED", "SELESAI"], ["CLEARED", "DITUNTASKAN"],
  ["SELECTED", "DIPILIH"], ["SET OUT AGAIN", "BERANGKAT LAGI"], ["BEGIN THE JOURNEY", "MULAI PERJALANAN"], ["MAKE", "BUAT"],
  ["Strike", "Serang"], ["Brace", "Bertahan"], ["TURN", "GILIRAN"], ["ACTIVE", "AKTIF"], ["RETURN TO HEARTHCROSS", "KEMBALI KE HEARTHCROSS"]
].sort((a, b) => b[0].length - a[0].length);

function localizeUI(value) {
  if (state.language !== "id") return value;
  let localized = String(value);
  for (const [english, indonesian] of UI_PHRASES) localized = localized.replaceAll(english, indonesian);
  return localized;
}
function applyStaticLabels() {
  const labels = STATIC_LABELS[state.language] || STATIC_LABELS.en;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const label = labels[element.dataset.i18n];
    if (label) element.textContent = label;
  });
}

function safe(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function portrait(id) {
  const assets = { mara: "assets/wayfarer.svg", scout: "assets/scout.svg", lookout: "assets/raider.svg", skirmisher: "assets/skirmisher.svg", warden: "assets/quarry-warden.svg" };
  return "./" + (assets[id] || "assets/mark.svg");
}
function bar(value, max, tone) {
  const percent = max ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;
  return '<div class="meter ' + tone + '"><span style="width:' + percent + '%"></span></div>';
}
function unitCard(unit, compact) {
  const image = portrait(unit.id);
  return '<article class="unit-card ' + (compact ? "compact" : "") + '"><div class="unit-avatar"><img src="' + image + '" alt=""></div>' +
    '<div class="unit-info"><div class="unit-top"><strong>' + safe(unit.name) + '</strong><span>' + Math.max(0, unit.hp) + '<i> / ' + unit.maxHp + '</i></span></div><small>' + safe(unit.role) + '</small>' +
    bar(unit.hp, unit.maxHp, "health") + (!compact && unit.maxFocus ? '<div class="focus-row"><span>FOCUS</span>' + Array.from({ length: unit.maxFocus }, (_, i) => '<i class="' + (i < unit.focus ? "filled" : "") + '"></i>').join("") + '</div>' : "") + '</div></article>';
}
function renderSide() {
  $("#coin-count").textContent = String(state.coin);
  $("#day-count").textContent = String(state.day).padStart(2, "0");
  $("#crew-count").textContent = state.party.length + " / " + PARTY_LIMIT;
  $("#crew-summary").innerHTML = state.party.map((unit) => unitCard(unit, true)).join("");
  $("#log-summary").innerHTML = localizeUI(state.log.slice(0, 3).map((entry) => '<div class="log-entry"><i></i><span>' + safe(entry) + '</span></div>').join(""));
  const complete = state.phase === "victory" || (state.phase === "town" && state.routeCleared);
  const returned = state.phase === "town" && state.routeCleared;
  const hasScout = state.party.some((unit) => unit.id === "scout");
  const route = findRoute(state.phase === "battle" || state.phase === "victory" || state.phase === "defeat" ? state.activeRoute : state.selectedRoute);
  $("#objective-step").textContent = localizeUI(returned ? "ERRAND DELIVERED" : complete ? "PARCEL RECOVERED" : hasScout ? "READY FOR THE ROAD" : "PREPARE YOUR CREW");
  $("#objective-count").textContent = returned ? "3 / 3" : complete ? "2 / 3" : hasScout ? "1 / 3" : "0 / 3";
  $("#objective-progress").style.width = (returned ? 100 : complete ? 78 : hasScout ? 34 : 12) + "%";
  $("#objective-title").textContent = localizeUI(returned ? route.name + " complete" : complete ? route.name + " cleared" : route.title);
  $("#objective-copy").textContent = localizeUI(returned ? route.name + " cleared. Trade the recovered cargo or set out again with a fresh ration." :
    complete ? "The route is clear. Return to Hearthcross to close the errand and collect your reputation." :
    hasScout ? route.summary + " Pack a ration, then set out." : "Hire a trail scout, pack a ration, then choose a route from the board.");
}
function setHeader(tab, phase) {
  const names = {
    journey: ["FIELD NOTES · CHAPTER 01", "A road opens"],
    market: ["HEARTHCROSS · TOWN EXCHANGE", "Goods and provisions"],
    roster: ["HEARTHCROSS · YOUR CREW", "A small crew, well chosen"],
    inventory: ["TRAVEL KIT · PACK", "What you carry"],
    journal: ["FIELD NOTES · LEDGER", "The journey so far"],
    preferences: ["HEARTHCROSS · PLAYER SETTINGS", "Language and controls"]
  };
  const current = names[tab] || names.journey;
  eyebrow.textContent = localizeUI(current[0]);
  title.textContent = localizeUI(current[1]);
  const route = findRoute(state.activeRoute || state.selectedRoute);
  phaseLabel.innerHTML = '<span class="status-pip ' + (phase === "battle" ? "danger-pip" : "") + '"></span>' +
    localizeUI(phase === "battle" ? safe(route.name.toUpperCase()) + " · ENCOUNTER" : phase === "victory" ? "ROUTE CLEARED" : phase === "defeat" ? "RETREAT" : "HEARTHCROSS");
}
function navState() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    const tab = button.dataset.tab;
    button.classList.toggle("active", tab === state.activeTab);
    const locked = state.phase !== "town" && ["market", "roster"].includes(tab);
    button.disabled = locked;
    button.setAttribute("aria-disabled", String(locked));
  });
}
function renderTown() {
  const hasScout = state.party.some((unit) => unit.id === "scout");
  const route = findRoute(state.selectedRoute);
  const unlocked = isRouteUnlocked(state, route.id);
  const completed = (state.completedRoutes || []).includes(route.id);
  const canSetOut = hasScout && state.inventory.ration > 0 && unlocked;
  const subtitle = completed ? "A familiar road, another day's work." : route.summary;
  return '<section class="landscape town-scene" aria-label="Illustrated view of Hearthcross market town"><div class="scene-vignette"></div>' +
    '<div class="scene-label"><span class="location-pin">⌖</span><div><small>HOME BASE · DAY ' + String(state.day).padStart(2, "0") + '</small><strong>Hearthcross</strong></div></div><div class="scene-coordinate">NORTH GATE <span>·</span> MARKET WARD</div>' +
    '<div class="scene-bottom"><div><small>SELECTED ROUTE · ' + safe(route.name.toUpperCase()) + '</small><h2>' + safe(subtitle) + '</h2><p>Prepare at the exchange, check your crew, then choose a road from the route board.</p></div>' +
    '<button class="primary-button" type="button" data-action="start" ' + (canSetOut ? "" : "disabled") + '><span>' + (completed ? "SET OUT AGAIN" : "BEGIN THE JOURNEY") + '</span><b>→</b></button></div></section>' +
    '<section class="chapter-strip"><div class="chapter-icon">0' + (ROUTES.findIndex((entry) => entry.id === route.id) + 1) + '</div><div class="chapter-copy"><small>SELECTED ROUTE · ' + safe(route.terrain) + '</small><strong>' + safe(route.title) + '</strong><span>' + safe(route.summary) + '</span></div><div class="chapter-status"><span class="status-pill">' + (completed ? "COMPLETED" : unlocked ? hasScout ? "CREW READY" : "CREW NEEDED" : "LOCKED") + '</span><span class="chapter-arrow">↗</span></div></section>' +
    '<section class="route-board panel"><div class="panel-head"><div><small>TRAVEL BOARD · ' + (state.completedRoutes || []).length + ' ROUTE' + ((state.completedRoutes || []).length === 1 ? "" : "S") + ' CLEARED</small><h2>Choose today&#39;s route</h2></div><span class="status-pill">' + ROUTES.filter((entry) => isRouteUnlocked(state, entry.id)).length + ' AVAILABLE</span></div><div class="route-options">' +
    ROUTES.map((entry, index) => {
      const available = isRouteUnlocked(state, entry.id);
      const selected = route.id === entry.id;
      const routeDone = (state.completedRoutes || []).includes(entry.id);
      return '<button type="button" class="route-card ' + (selected ? "selected" : "") + (!available ? " locked" : "") + '" data-route="' + entry.id + '" aria-pressed="' + selected + '" ' + (!available ? "disabled" : "") + '><span class="route-number">0' + (index + 1) + '</span><span class="route-card-copy"><small>' + safe(entry.terrain) + '</small><strong>' + safe(entry.name) + '</strong><span>' + safe(entry.summary) + '</span></span><span class="route-card-status">' + (!available ? "LOCKED" : routeDone ? "CLEARED" : selected ? "SELECTED" : "OPEN") + '</span></button>';
    }).join("") + '</div></section>' +
    renderSettlement() +
    '<div class="lower-grid"><section class="panel prep-panel"><div class="panel-head"><div><small>BEFORE YOU LEAVE</small><h2>Pack for the road</h2></div><button type="button" data-tab="inventory" class="text-button">OPEN PACK →</button></div>' +
    '<div class="prep-grid"><div class="prep-item"><span class="item-glyph ration-glyph">R</span><div><strong>Trail Rations</strong><small>' + state.inventory.ration + ' in pack · 1 required</small></div><span class="check-mark ' + (state.inventory.ration > 0 ? "ready" : "") + '">' + (state.inventory.ration > 0 ? "✓" : "·") + '</span></div>' +
    '<div class="prep-item"><span class="item-glyph tonic-glyph">+</span><div><strong>Field Tonic</strong><small>' + state.inventory.tonic + ' in pack · restores vitality</small></div><button type="button" class="tiny-button" data-action="use-tonic" ' + (state.inventory.tonic < 1 || state.party.every((unit) => unit.hp === unit.maxHp) ? "disabled" : "") + '>USE</button></div></div></section>' +
    '<section class="panel crew-callout"><div class="panel-head"><div><small>TRAVEL PARTNER</small><h2>' + (hasScout ? "Tarin is on the route" : "Hire a trail scout") + '</h2></div><span class="round-seal">♙</span></div><p>' +
    (hasScout ? "Tarin watches the ridgeline and adds a follow-up strike in an encounter." : "A second pair of eyes makes this first route safer. Your ledger has enough for the contract.") + '</p><button class="secondary-button" type="button" data-tab="roster">' +
    (hasScout ? "VIEW YOUR CREW" : "VISIT THE HIRING BOARD") + '<span>→</span></button></section></div>';
}
function renderBattle() {
  const battle = state.battle;
  const route = findRoute(battle.routeId || state.activeRoute);
  const weapon = findItem(state.equipment?.weapon);
  const strikeDamage = 14 + (weapon?.strikeBonus || 0);
  const enemies = battle.enemies.map((enemy) => {
    const selected = battle.targetId === enemy.id;
    const hp = Math.max(0, enemy.hp);
    return '<button type="button" class="enemy-card ' + (selected ? "selected" : "") + (hp === 0 ? " defeated" : "") + '" data-target="' + enemy.id + '" ' + (hp === 0 ? "disabled" : "") + '><img src="./' + portrait(enemy.id) + '" alt="">' +
      '<span class="enemy-name">' + safe(enemy.name) + '</span><span class="enemy-state">' + (hp === 0 ? "DOWN" : selected ? "TARGET" : "SELECT") + '</span>' + bar(hp, enemy.maxHp, "enemy-health") + '<small>' + hp + ' / ' + enemy.maxHp + ' VITALITY</small></button>';
  }).join("");
  return '<section class="landscape road-scene battle-scene ' + (route.id === "amber-quarry" ? "quarry-scene" : "") + '" aria-label="Illustrated encounter on ' + safe(route.name) + '"><div class="scene-vignette"></div>' +
    '<div class="scene-label"><span class="location-pin">⌖</span><div><small>' + safe(route.name.toUpperCase()) + ' · TURN ' + String(battle.turn).padStart(2, "0") + '</small><strong>' + safe(route.encounter) + '</strong></div></div><div class="scene-coordinate">' + safe(route.coordinate) + ' <span>·</span> ISSUE AN ORDER</div>' +
    '<div class="combat-parties"><div class="battle-party">' + state.party.map((unit) => '<div class="battle-unit ' + (unit.id === state.formationFrontId ? "front-unit" : "rear-unit") + '"><img src="./' + portrait(unit.id) + '" alt=""><span>' + safe(unit.name.split(" ")[0]) + '</span><small>' + (unit.id === state.formationFrontId ? "FRONT" : "REAR") + '</small></div>').join("") + '</div><div class="battle-enemies">' +
    battle.enemies.map((enemy) => '<div class="battle-foe ' + (enemy.hp <= 0 ? "gone" : "") + '"><img src="./' + portrait(enemy.id) + '" alt=""><span>' + safe(enemy.name.split(" ")[1]) + '</span></div>').join("") + '</div></div>' +
    '<div class="scene-bottom battle-caption"><div><small>ENCOUNTER</small><h2>Hold the road.</h2><p>Choose a target, then strike, brace or spend focus on a technique.</p></div><span class="turn-badge">TURN ' + battle.turn + '</span></div></section>' +
    '<section class="combat-panel"><div class="panel-head"><div><small>OPPONENTS · SELECT A TARGET</small><h2>' + safe(route.foeLabel) + '</h2></div><span class="status-pill alert-pill">' + battle.enemies.filter((enemy) => enemy.hp > 0).length + ' ACTIVE</span></div>' +
    '<div class="enemy-row ' + (battle.enemies.length === 1 ? "single-enemy" : "") + '">' + enemies + '</div><div class="formation-effect-note"><span>FORMATION</span> ' + safe(state.party.find((unit) => unit.id === state.formationFrontId)?.name || "Mara") + ' leads; the rear line reduces incoming damage by 2. <span class="gear-effect">WEAPON · ' + safe(weapon?.name || "UNARMED") + ' · STRIKE ' + strikeDamage + '</span></div><div class="combat-orders"><div class="orders-label"><small>YOUR ORDER</small><span>' + (state.formationFrontId === "scout" ? "Tarin opens · Mara follows" : "Mara leads · Tarin follows") + ' · ' + (state.combatShortcutsEnabled ? "Keys: 1 · 2 · 3" : "Keyboard shortcuts are off") + '</span></div>' +
    '<button class="order-button" type="button" data-action="strike"><span class="order-key">1</span><span><strong>Strike</strong><small>Deal ' + strikeDamage + ' damage · gain 1 focus</small></span><b>↗</b></button>' +
    '<button class="order-button" type="button" data-action="brace"><span class="order-key">2</span><span><strong>Brace</strong><small>Soften a hit · scout follows</small></span><b>◇</b></button>' +
    '<button class="order-button skill-order" type="button" data-action="technique" ' + (state.party[0].focus < 2 ? "disabled" : "") + '><span class="order-key">3</span><span><strong>Wayfarer&#39;s Arc</strong><small>Area technique · costs 2 focus</small></span><b>✦</b></button></div>' +
    '<button class="supply-action" type="button" data-action="use-tonic" ' + (state.inventory.tonic < 1 || state.party.every((unit) => unit.hp === unit.maxHp) ? "disabled" : "") + '>USE FIELD TONIC <span>' + state.inventory.tonic + ' IN PACK</span></button></section>';
}
function renderVictory() {
  const route = findRoute(state.activeRoute);
  const cargo = Object.entries(route.reward.items).map(([itemId, quantity]) => {
    const item = ITEMS.find((entry) => entry.id === itemId);
    return '<span><i>' + safe(item?.glyph || "◆") + '</i>' + quantity + ' ' + safe(item?.name || itemId) + '</span>';
  }).join("");
  return '<section class="result-card victory-card"><div class="result-emblem">✓</div><small>ROUTE CLEARED · REWARD SECURED</small><h2>' + safe(route.victoryTitle) + '</h2><p>' + safe(route.victoryCopy) + '</p><div class="reward-row"><span><i>＋</i>' + route.reward.coin + ' marks</span>' + cargo + '<span><i>✦</i>' + route.reward.reputation + ' reputation</span></div>' +
    '<button class="primary-button" type="button" data-action="return-town"><span>RETURN TO HEARTHCROSS</span><b>→</b></button></section><section class="panel result-notes"><div class="panel-head"><div><small>FIELD NOTES</small><h2>Close the errand</h2></div><span class="round-seal">01</span></div><p>Visit the Town Exchange to sell the recovered cargo, or review the crew and pack before another journey.</p><div class="mini-log">' +
    state.log.slice(0, 2).map((entry) => '<span>· ' + safe(entry) + '</span>').join("") + '</div></section>';
}
function renderDefeat() {
  const route = findRoute(state.activeRoute);
  return '<section class="result-card defeat-card"><div class="result-emblem">↶</div><small>ROUTE INTERRUPTED</small><h2>The crew falls back.</h2><p>No reward was recovered from ' + safe(route.name) + '. Rest in Hearthcross, replace the ration, then choose your route again.</p><button class="primary-button" type="button" data-action="recover"><span>RECOVER IN HEARTHCROSS</span><b>→</b></button></section>';
}
function renderJourney() {
  if (state.phase === "battle") return renderBattle();
  if (state.phase === "victory") return renderVictory();
  if (state.phase === "defeat") return renderDefeat();
  return renderTown();
}
function renderMarket() {
  const tradeItems = ITEMS.filter((item) => item.buyPrice !== null || item.sellPrice !== null);
  return '<section class="market-banner"><div><small>HEARTHCROSS · MARKET WARD</small><h2>Good routes begin with good terms.</h2><p>Buy the supplies you need. Sell trade goods after your return.</p></div><span class="market-stamp">LOCAL<br>EXCHANGE</span></section>' +
    '<section class="panel market-panel"><div class="panel-head"><div><small>DAILY BOARD · PROTOTYPE QUOTES</small><h2>Available goods</h2></div><span class="status-pill">MARKS ' + state.coin + '</span></div><div class="market-table"><div class="market-header"><span>GOOD</span><span>BUY</span><span>SELL</span><span>PACK</span><span></span></div>' +
    tradeItems.map((item) => '<div class="market-row"><div class="good-cell"><span class="item-glyph ' + item.kind + '-glyph">' + item.glyph + '</span><span><strong>' + safe(item.name) + '</strong><small>' + safe(item.detail) + '</small></span></div><span class="quote">' + (item.buyPrice === null ? "—" : item.buyPrice) + '<small> M</small></span><span class="quote">' + (item.sellPrice === null ? "—" : item.sellPrice) + '<small> M</small></span><span class="pack-count">' + (state.inventory[item.id] || 0) + '</span><span class="trade-actions">' +
    '<button type="button" data-action="buy" data-item="' + item.id + '" ' + (item.buyPrice === null ? "disabled" : "") + ' aria-label="Buy one ' + safe(item.name) + '">BUY</button><button type="button" data-action="sell" data-item="' + item.id + '" ' + ((state.inventory[item.id] || 0) < 1 ? "disabled" : "") + ' aria-label="Sell one ' + safe(item.name) + '">SELL</button></span></div>').join("") +
    '</div><div class="market-foot"><span>Original prototype quotes; not copied from any live game.</span><span>Held: ' + state.inventory.tea + ' tea · ' + state.inventory.fittings + ' fittings</span></div></section>' +
    renderProduction() + '<div class="market-tip"><span>✦</span><p><strong>Trade note</strong> The parcel route rewards cargo that can be sold here. Keep a ration in your pack before another trip.</p></div>' + renderSettlement();
}
function renderProduction() {
  return '<section class="panel production-panel"><div class="panel-head"><div><small>HEARTHCROSS · WORKBENCH</small><h2>Make for the caravan</h2></div><span class="status-pill">ORIGINAL RECIPE</span></div><div class="recipe-list">' + RECIPES.map((recipe) => {
    const output = findItem(recipe.output.itemId);
    const materials = Object.entries(recipe.inputs).map(([itemId, quantity]) => quantity + ' × ' + safe(findItem(itemId)?.name || itemId)).join(' + ');
    const available = Object.entries(recipe.inputs).every(([itemId, quantity]) => (state.inventory[itemId] || 0) >= quantity);
    return '<article class="recipe-card"><div class="recipe-glyph">⚒</div><div class="recipe-copy"><strong>' + safe(recipe.name) + '</strong><small>' + materials + ' → ' + recipe.output.quantity + ' × ' + safe(output.name) + '</small><span>Sell value: ' + output.sellPrice + ' marks · Materials in pack: ' + Object.entries(recipe.inputs).map(([itemId]) => (state.inventory[itemId] || 0) + ' ' + safe(findItem(itemId)?.name || itemId)).join(', ') + '</span></div><button type="button" class="tiny-button" data-action="craft" data-recipe="' + recipe.id + '" ' + (!available || state.phase !== "town" ? "disabled" : "") + '>MAKE</button></article>';
  }).join("") + '</div></section>';
}
function renderRoster() {
  const hasScout = state.party.some((unit) => unit.id === "scout");
  const weapon = findItem(state.equipment?.weapon);
  return '<section class="roster-banner"><div><small>HEARTHCROSS · HIRING BOARD</small><h2>Travel light. Watch each other&#39;s backs.</h2><p>Set the front member before you leave. Formation changes turn order and how the crew screens incoming hits.</p></div><div class="slot-count">' + state.party.length + '<i> / ' + PARTY_LIMIT + '</i><small>CREW SLOTS</small></div></section>' +
    '<div class="roster-grid"><section class="panel roster-panel"><div class="panel-head"><div><small>ACTIVE FORMATION</small><h2>Road crew</h2></div><span class="status-pill">' + state.party.length + ' MEMBERS</span></div>' +
    state.party.map((unit, index) => '<div class="roster-member"><span class="formation-index">0' + (index + 1) + '</span><img src="' + portrait(unit.id) + '" alt=""><div class="roster-member-info"><strong>' + safe(unit.name) + '</strong><small>' + safe(unit.role) + '</small>' + bar(unit.hp, unit.maxHp, "health") + '</div>' + (unit.id === state.formationFrontId ? '<span class="role-tag front-tag">FRONT</span>' : '<button type="button" class="formation-toggle" data-formation-front="' + unit.id + '">MOVE TO FRONT</button>') + '</div>').join("") +
    '<div class="equipment-slot"><div><small>WEAPON SLOT</small><strong>' + safe(weapon?.name || "Empty") + '</strong><span>' + (weapon ? "+" + weapon.strikeBonus + " Strike damage" : "Equip a blade from your pack.") + '</span></div><button type="button" class="text-button" data-tab="inventory">OPEN PACK →</button></div>' +
    '<div class="formation-note">Prototype rule: the front member takes the first attack and opens the crew turn. The rear member takes 2 less damage from screened hits.</div></section>' +
    '<section class="panel hire-panel"><div class="hire-portrait"><img src="./assets/scout.svg" alt=""></div><small>AVAILABLE FOR HIRE</small><h2>Tarin Reed</h2><span class="role-tag">TRAIL SCOUT</span><p>Knows the ridge paths. Adds a follow-up strike and keeps an eye on the crew&#39;s supplies.</p><div class="hire-footer"><span><small>CONTRACT</small><strong>' + SCOUT_COST + ' marks</strong></span><button type="button" class="secondary-button" data-action="hire" ' + (hasScout || state.coin < SCOUT_COST || state.party.length >= PARTY_LIMIT ? "disabled" : "") + '>' + (hasScout ? "IN YOUR CREW" : "HIRE SCOUT") + '<span>→</span></button></div></section></div>';
}
function renderInventory() {
  const total = Object.values(state.inventory).reduce((sum, count) => sum + count, 0);
  const itemCards = ITEMS.map((item) => {
    const quantity = state.inventory[item.id] || 0;
    const equipped = state.equipment?.weapon === item.id;
    let actions = '<span class="bound-tag">' + (item.kind === "quest" ? "QUEST" : "SUPPLY") + '</span>';
    if (item.kind === "equipment") actions = equipped ? '<button type="button" data-action="unequip" class="tiny-button" ' + (state.phase !== "town" ? "disabled" : "") + '>UNEQUIP</button>' : quantity > 0 ? '<div class="equipment-actions"><button type="button" data-action="equip" data-item="' + item.id + '" class="tiny-button" ' + (state.phase !== "town" ? "disabled" : "") + '>EQUIP</button><button type="button" data-action="sell" data-item="' + item.id + '" class="tiny-button" ' + (state.phase !== "town" ? "disabled" : "") + '>SELL</button></div>' : '<span class="bound-tag">WEAPON SLOT</span>';
    else if (item.id === "tonic") actions = '<button type="button" data-action="use-tonic" class="tiny-button" ' + (quantity < 1 || state.party.every((unit) => unit.hp === unit.maxHp) ? "disabled" : "") + '>USE</button>';
    else if (item.sellPrice !== null) actions = '<button type="button" data-action="sell" data-item="' + item.id + '" class="tiny-button" ' + (quantity < 1 || state.phase !== "town" ? "disabled" : "") + '>SELL</button>';
    return '<article class="inventory-card"><span class="item-glyph ' + item.kind + '-glyph">' + item.glyph + '</span><div class="inventory-copy"><strong>' + safe(item.name) + '</strong><small>' + safe(item.detail) + '</small><span class="inventory-quantity">' + (equipped ? "EQUIPPED" : "QUANTITY") + ' <b>' + (equipped ? "WEAPON SLOT" : quantity) + '</b></span></div>' + actions + '</article>';
  }).join("");
  return '<section class="pack-banner"><div><small>TRAVEL KIT · CARRY LIMIT 20 EACH</small><h2>Every item has a purpose.</h2><p>Use a Field Tonic to restore the crew member who needs it most.</p></div><span class="pack-total">' + total + '<small>ITEMS</small></span></section>' +
    '<section class="panel pack-panel"><div class="panel-head"><div><small>YOUR PACK</small><h2>Supplies and cargo</h2></div><span class="status-pill">' + state.inventory.ration + ' RATIONS</span></div><div class="inventory-grid">' +
    itemCards + '</div>' +
    (state.phase === "battle" ? '<div class="pack-battle-note">The road is still active. Using a tonic spends your crew order and the raiders will respond.</div>' : '') + '</section>';
}
function renderJournal() {
  return renderSettlement() + '<section class="journal-banner"><div><small>FIELD NOTES · DAY ' + String(state.day).padStart(2, "0") + '</small><h2>A journey is made of small decisions.</h2><p>Every order, purchase and discovery is recorded here on this device.</p></div><span class="journal-seal">≋</span></section>' +
    '<section class="panel journal-panel"><div class="panel-head"><div><small>RECENT ENTRIES</small><h2>Ledger</h2></div><span class="status-pill">' + state.log.length + ' NOTES</span></div><div class="journal-list">' +
    state.log.map((entry, index) => '<article><span class="journal-index">' + String(state.log.length - index).padStart(2, "0") + '</span><i></i><p>' + safe(entry) + '</p></article>').join("") + '</div></section>';
}
function renderSettlement() {
  const ledger = state.lastSettlement;
  if (!ledger) return "";
  const route = findRoute(ledger.routeId);
  const remaining = Math.max(0, ledger.cargoValue - ledger.cargoSoldRevenue);
  const progress = ledger.cargoValue > 0 ? Math.min(100, Math.round((ledger.cargoSoldRevenue / ledger.cargoValue) * 100)) : 0;
  return '<section class="panel settlement-panel"><div class="panel-head"><div><small>LAST TRIP · ' + safe(route.name.toUpperCase()) + '</small><h2>Settlement ledger</h2></div><span class="status-pill">' + ledger.cargoSoldCount + ' / ' + ledger.cargoCount + ' CARGO SOLD</span></div><div class="settlement-grid">' +
    '<div class="settlement-cell"><small>TRIP COST</small><strong>−' + ledger.rationCost + ' M</strong><span>1 ration used</span></div><div class="settlement-cell"><small>ROUTE REWARD</small><strong>+' + ledger.rewardCoin + ' M</strong><span>reward currency</span></div><div class="settlement-cell"><small>CARGO VALUE</small><strong>' + ledger.cargoValue + ' M</strong><span>full resale value</span></div><div class="settlement-cell"><small>CARGO SOLD</small><strong>+' + ledger.cargoSoldRevenue + ' M</strong><span>' + remaining + ' M remaining</span></div><div class="settlement-cell settlement-net"><small>NET PROCEEDS</small><strong>' + (ledger.netProceeds >= 0 ? "+" : "") + ledger.netProceeds + ' M</strong><span>reward + sold cargo − ration</span></div></div><div class="settlement-progress"><span style="width:' + progress + '%"></span></div><p class="settlement-foot">Cargo value excludes quest items. Only cargo sold from this trip changes the net proceeds.</p></section>';
}
function renderPreferences() {
  const language = state.language || "en";
  return '<section class="preferences-banner"><div><small>HEARTHCROSS · PLAYER SETTINGS</small><h2>Make the journey yours.</h2><p>Choose the interface language and the combat input that suit you.</p></div><span class="market-stamp">LOCAL<br>SETTINGS</span></section>' +
    '<section class="panel preferences-panel"><div class="preference-row"><div class="preference-copy"><small>DISPLAY</small><h3>Choose an interface language</h3><p>The interface language updates navigation, controls and common labels. Story and item descriptions remain in English.</p></div><div class="language-options" role="group" aria-label="Interface language"><button type="button" data-language-option="en" class="' + (language === "en" ? "selected" : "") + '" aria-pressed="' + (language === "en") + '">English</button><button type="button" data-language-option="id" class="' + (language === "id" ? "selected" : "") + '" aria-pressed="' + (language === "id") + '">Bahasa Indonesia</button></div></div>' +
    '<div class="preference-row"><div class="preference-copy"><small>COMBAT INPUT</small><h3>Combat number shortcuts</h3><p>Use 1, 2 and 3 during combat to issue orders. You can still choose an order with the on-screen buttons.</p></div><button type="button" class="preference-toggle ' + (state.combatShortcutsEnabled ? "enabled" : "") + '" data-action="toggle-shortcuts" aria-pressed="' + state.combatShortcutsEnabled + '">' + (state.combatShortcutsEnabled ? "ON" : "OFF") + '</button></div>' +
    '<p class="preferences-note">Preferences save with this local journey and stay on this device.</p></section>';
}
function renderGuide() {
  const topbar = document.querySelector(".topbar");
  const gameLayout = document.querySelector(".game-layout");
  topbar.inert = guideOpen;
  gameLayout.inert = guideOpen;
  if (!guideOpen) {
    guideLayer.innerHTML = "";
    return;
  }
  const step = GUIDE_STEPS[guideStep];
  const last = guideStep === GUIDE_STEPS.length - 1;
  guideLayer.innerHTML = '<div class="guide-backdrop"><section class="guide-dialog" role="dialog" aria-modal="true" aria-labelledby="guide-title" aria-describedby="guide-copy"><button type="button" class="guide-close" data-action="onboarding-close" aria-label="Close quick guide">×</button><div class="guide-emblem"><span>W</span><i>✦</i></div><small class="guide-kicker">FIELD GUIDE · ' + step.kicker + '</small><h2 id="guide-title">' + safe(step.title) + '</h2><p id="guide-copy">' + safe(step.copy) + '</p><div class="guide-progress" aria-label="Step ' + (guideStep + 1) + ' of ' + GUIDE_STEPS.length + '">' + GUIDE_STEPS.map((_, index) => '<i class="' + (index === guideStep ? "current" : index < guideStep ? "passed" : "") + '"></i>').join("") + '<span>' + (guideStep + 1) + ' / ' + GUIDE_STEPS.length + '</span></div><div class="guide-actions">' +
    (guideStep > 0 ? '<button type="button" class="guide-back-button" data-action="onboarding-back">← BACK</button>' : '<button type="button" class="guide-back-button" data-action="onboarding-close">SKIP GUIDE</button>') +
    '<button type="button" class="guide-next" data-action="' + (last ? "onboarding-close" : "onboarding-next") + '" data-guide-next>' + (last ? "FINISH GUIDE" : "CONTINUE") + '<span>→</span></button></div><div class="guide-note">YOU CAN REPLAY THIS GUIDE FROM THE TOP BAR</div></section></div>';
  const next = guideLayer.querySelector?.("[data-guide-next]");
  next?.focus();
}
function render() {
  document.documentElement.lang = state.language || "en";
  applyStaticLabels();
  setHeader(state.activeTab, state.phase);
  navState();
  renderSide();
  notice.textContent = localizeUI(state.notice || "");
  notice.classList.toggle("show", Boolean(state.notice));
  const renderers = { journey: renderJourney, market: renderMarket, roster: renderRoster, inventory: renderInventory, journal: renderJournal, preferences: renderPreferences };
  content.innerHTML = localizeUI(renderers[state.activeTab]());
  renderGuide();
  const saved = saveGame(state);
  $("#save-state").innerHTML = '<span class="save-dot ' + (saved ? "" : "save-warning") + '"></span>' + localizeUI(saved ? " SAVED HERE" : " SESSION ONLY");
  document.body.dataset.phase = state.phase;
}
function transition(next) { state = next; render(); }

document.addEventListener("click", (event) => {
  const guideAction = event.target.closest('[data-action^="onboarding-"]');
  if (guideOpen && !guideAction) return;
  const formationButton = event.target.closest("[data-formation-front]");
  if (formationButton) { transition(setFormationFront(state, formationButton.dataset.formationFront)); return; }
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) { transition(selectRoute(state, routeButton.dataset.route)); return; }
  const targetButton = event.target.closest("[data-target]");
  if (targetButton) { transition(setTarget(state, targetButton.dataset.target)); return; }
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  if (button.dataset.languageOption) { transition(setLanguage(state, button.dataset.languageOption)); return; }
  if (button.dataset.tab) { transition(changeTab(state, button.dataset.tab)); return; }
  const action = button.dataset.action;
  if (!action) return;
  if (action === "start") transition(startRoute(state));
  else if (action === "hire") transition(hireScout(state));
  else if (action === "buy") transition(buyItem(state, button.dataset.item));
  else if (action === "craft") transition(craftRecipe(state, button.dataset.recipe));
  else if (action === "toggle-shortcuts") transition(setCombatShortcutsEnabled(state, !state.combatShortcutsEnabled));
  else if (action === "equip") transition(equipItem(state, button.dataset.item));
  else if (action === "unequip") transition(equipItem(state, null));
  else if (action === "sell") transition(sellItem(state, button.dataset.item));
  else if (action === "use-tonic") transition(useTonic(state));
  else if (["strike", "brace", "technique"].includes(action)) transition(performAction(state, action));
  else if (action === "return-town") transition(returnToTown(state));
  else if (action === "recover") transition(recoverInTown(state));
  else if (action === "onboarding-replay") { guideStep = 0; guideOpen = true; render(); }
  else if (action === "onboarding-next") { guideStep = Math.min(guideStep + 1, GUIDE_STEPS.length - 1); render(); }
  else if (action === "onboarding-back") { guideStep = Math.max(guideStep - 1, 0); render(); }
  else if (action === "onboarding-close") { guideOpen = false; guideStep = 0; state = { ...state, onboardingSeen: true }; render(); }
  else if (action === "reset" && window.confirm("Start a fresh journey? This clears only this game's save on this device.")) {
    clearGame();
    state = resetJourney();
    guideStep = 0;
    guideOpen = true;
    render();
  }
});
document.addEventListener("keydown", (event) => {
  if (guideOpen && event.key === "Escape") {
    event.preventDefault();
    guideOpen = false;
    guideStep = 0;
    state = { ...state, onboardingSeen: true };
    render();
    return;
  }
  if (guideOpen) return;
  if (state.phase !== "battle" || !state.combatShortcutsEnabled || event.altKey || event.ctrlKey || event.metaKey) return;
  const orders = { "1": "strike", "2": "brace", "3": "technique" };
  if (!orders[event.key]) return;
  event.preventDefault();
  transition(performAction(state, orders[event.key]));
});
render();
