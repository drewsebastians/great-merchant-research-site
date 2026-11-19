import { ITEMS, PARTY_LIMIT, SCOUT_COST, createInitialState } from "./data.mjs";
import { buyItem, changeTab, hireScout, performAction, recoverInTown, resetJourney, returnToTown, sellItem, setTarget, startRoute, useTonic } from "./engine.mjs";
import { clearGame, loadGame, saveGame } from "./storage.mjs";

let state = loadGame() || createInitialState();
const content = document.querySelector("#game-content");
const notice = document.querySelector("#notice");
const title = document.querySelector("#screen-title");
const eyebrow = document.querySelector("#screen-eyebrow");
const phaseLabel = document.querySelector("#phase-label");
const $ = (selector) => document.querySelector(selector);

function safe(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function portrait(id) {
  const assets = { mara: "assets/wayfarer.svg", scout: "assets/scout.svg", lookout: "assets/raider.svg", skirmisher: "assets/skirmisher.svg" };
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
  $("#log-summary").innerHTML = state.log.slice(0, 3).map((entry) => '<div class="log-entry"><i></i><span>' + safe(entry) + '</span></div>').join("");
  const complete = state.phase === "victory" || (state.phase === "town" && state.routeCleared);
  const returned = state.phase === "town" && state.routeCleared;
  const hasScout = state.party.some((unit) => unit.id === "scout");
  $("#objective-step").textContent = returned ? "ERRAND DELIVERED" : complete ? "PARCEL RECOVERED" : hasScout ? "READY FOR THE ROAD" : "PREPARE YOUR CREW";
  $("#objective-count").textContent = returned ? "3 / 3" : complete ? "2 / 3" : hasScout ? "1 / 3" : "0 / 3";
  $("#objective-progress").style.width = (returned ? 100 : complete ? 78 : hasScout ? 34 : 12) + "%";
  $("#objective-title").textContent = complete && !returned ? "Parcel recovered" : "The courier's mark";
  $("#objective-copy").textContent = returned ? "Parcel delivered. Trade the recovered cargo or set out again with a fresh ration." :
    complete ? "The route is clear. Return to Hearthcross to close the errand and collect your reputation." :
    "Hire a trail scout, pack a ration, then recover a sealed parcel from the ridge road.";
}
function setHeader(tab, phase) {
  const names = {
    journey: ["FIELD NOTES · CHAPTER 01", "A road opens"],
    market: ["HEARTHCROSS · TOWN EXCHANGE", "Goods and provisions"],
    roster: ["HEARTHCROSS · YOUR CREW", "A small crew, well chosen"],
    inventory: ["TRAVEL KIT · PACK", "What you carry"],
    journal: ["FIELD NOTES · LEDGER", "The journey so far"]
  };
  const current = names[tab] || names.journey;
  eyebrow.textContent = current[0];
  title.textContent = current[1];
  phaseLabel.innerHTML = '<span class="status-pip ' + (phase === "battle" ? "danger-pip" : "") + '"></span>' +
    (phase === "battle" ? "MOSSWIND ROAD · ENCOUNTER" : phase === "victory" ? "ROUTE CLEARED" : phase === "defeat" ? "RETREAT" : "HEARTHCROSS");
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
  const canSetOut = hasScout && state.inventory.ration > 0;
  const subtitle = state.routeCleared ? "A familiar road, another day's work." : "A missing parcel is waiting beyond the ridge.";
  return '<section class="landscape town-scene" aria-label="Illustrated view of Hearthcross market town"><div class="scene-vignette"></div>' +
    '<div class="scene-label"><span class="location-pin">⌖</span><div><small>HOME BASE · DAY ' + String(state.day).padStart(2, "0") + '</small><strong>Hearthcross</strong></div></div><div class="scene-coordinate">NORTH GATE <span>·</span> MARKET WARD</div>' +
    '<div class="scene-bottom"><div><small>THE MORNING ROUTE</small><h2>' + subtitle + '</h2><p>Prepare at the exchange, check your crew, then follow Mosswind Road to the ridge.</p></div>' +
    '<button class="primary-button" type="button" data-action="start" ' + (canSetOut ? "" : "disabled") + '><span>' + (state.routeCleared ? "SET OUT AGAIN" : "BEGIN THE ERRAND") + '</span><b>→</b></button></div></section>' +
    '<section class="chapter-strip"><div class="chapter-icon">01</div><div class="chapter-copy"><small>OPEN ERRAND</small><strong>The Courier&#39;s Mark</strong><span>Find the sealed parcel on Mosswind Road and bring it home.</span></div><div class="chapter-status"><span class="status-pill">' + (state.routeCleared ? "READY TO REPLAY" : hasScout ? "CREW READY" : "CREW NEEDED") + '</span><span class="chapter-arrow">↗</span></div></section>' +
    '<div class="lower-grid"><section class="panel prep-panel"><div class="panel-head"><div><small>BEFORE YOU LEAVE</small><h2>Pack for the road</h2></div><button type="button" data-tab="inventory" class="text-button">OPEN PACK →</button></div>' +
    '<div class="prep-grid"><div class="prep-item"><span class="item-glyph ration-glyph">R</span><div><strong>Trail Rations</strong><small>' + state.inventory.ration + ' in pack · 1 required</small></div><span class="check-mark ' + (state.inventory.ration > 0 ? "ready" : "") + '">' + (state.inventory.ration > 0 ? "✓" : "·") + '</span></div>' +
    '<div class="prep-item"><span class="item-glyph tonic-glyph">+</span><div><strong>Field Tonic</strong><small>' + state.inventory.tonic + ' in pack · restores vitality</small></div><button type="button" class="tiny-button" data-action="use-tonic" ' + (state.inventory.tonic < 1 || state.party.every((unit) => unit.hp === unit.maxHp) ? "disabled" : "") + '>USE</button></div></div></section>' +
    '<section class="panel crew-callout"><div class="panel-head"><div><small>TRAVEL PARTNER</small><h2>' + (hasScout ? "Tarin is on the route" : "Hire a trail scout") + '</h2></div><span class="round-seal">♙</span></div><p>' +
    (hasScout ? "Tarin watches the ridgeline and adds a follow-up strike in an encounter." : "A second pair of eyes makes this first route safer. Your ledger has enough for the contract.") + '</p><button class="secondary-button" type="button" data-tab="roster">' +
    (hasScout ? "VIEW YOUR CREW" : "VISIT THE HIRING BOARD") + '<span>→</span></button></section></div>';
}
function renderBattle() {
  const battle = state.battle;
  const enemies = battle.enemies.map((enemy) => {
    const selected = battle.targetId === enemy.id;
    const hp = Math.max(0, enemy.hp);
    return '<button type="button" class="enemy-card ' + (selected ? "selected" : "") + (hp === 0 ? " defeated" : "") + '" data-target="' + enemy.id + '" ' + (hp === 0 ? "disabled" : "") + '><img src="./' + portrait(enemy.id) + '" alt="">' +
      '<span class="enemy-name">' + safe(enemy.name) + '</span><span class="enemy-state">' + (hp === 0 ? "DOWN" : selected ? "TARGET" : "SELECT") + '</span>' + bar(hp, enemy.maxHp, "enemy-health") + '<small>' + hp + ' / ' + enemy.maxHp + ' VITALITY</small></button>';
  }).join("");
  return '<section class="landscape road-scene battle-scene" aria-label="Illustrated encounter on Mosswind Road"><div class="scene-vignette"></div>' +
    '<div class="scene-label"><span class="location-pin">⌖</span><div><small>MOSSWIND ROAD · TURN ' + String(battle.turn).padStart(2, "0") + '</small><strong>Ridge Ambush</strong></div></div><div class="scene-coordinate">SELECT A TARGET <span>·</span> ISSUE AN ORDER</div>' +
    '<div class="combat-parties"><div class="battle-party">' + state.party.map((unit) => '<div class="battle-unit"><img src="./' + portrait(unit.id) + '" alt=""><span>' + safe(unit.name.split(" ")[0]) + '</span></div>').join("") + '</div><div class="battle-enemies">' +
    battle.enemies.map((enemy) => '<div class="battle-foe ' + (enemy.hp <= 0 ? "gone" : "") + '"><img src="./' + portrait(enemy.id) + '" alt=""><span>' + safe(enemy.name.split(" ")[1]) + '</span></div>').join("") + '</div></div>' +
    '<div class="scene-bottom battle-caption"><div><small>ENCOUNTER</small><h2>Hold the road.</h2><p>Choose a target, then strike, brace or spend focus on a technique.</p></div><span class="turn-badge">TURN ' + battle.turn + '</span></div></section>' +
    '<section class="combat-panel"><div class="panel-head"><div><small>OPPONENTS · SELECT A TARGET</small><h2>Ridge raiders</h2></div><span class="status-pill alert-pill">' + battle.enemies.filter((enemy) => enemy.hp > 0).length + ' ACTIVE</span></div>' +
    '<div class="enemy-row">' + enemies + '</div><div class="combat-orders"><div class="orders-label"><small>YOUR ORDER</small><span>Keyboard: 1 · 2 · 3</span></div>' +
    '<button class="order-button" type="button" data-action="strike"><span class="order-key">1</span><span><strong>Strike</strong><small>Deal damage · gain 1 focus</small></span><b>↗</b></button>' +
    '<button class="order-button" type="button" data-action="brace"><span class="order-key">2</span><span><strong>Brace</strong><small>Soften a hit · scout follows</small></span><b>◇</b></button>' +
    '<button class="order-button skill-order" type="button" data-action="technique" ' + (state.party[0].focus < 2 ? "disabled" : "") + '><span class="order-key">3</span><span><strong>Wayfarer&#39;s Arc</strong><small>Area technique · costs 2 focus</small></span><b>✦</b></button></div>' +
    '<button class="supply-action" type="button" data-action="use-tonic" ' + (state.inventory.tonic < 1 || state.party.every((unit) => unit.hp === unit.maxHp) ? "disabled" : "") + '>USE FIELD TONIC <span>' + state.inventory.tonic + ' IN PACK</span></button></section>';
}
function renderVictory() {
  return '<section class="result-card victory-card"><div class="result-emblem">✓</div><small>ROUTE CLEARED · REWARD SECURED</small><h2>The parcel is yours.</h2><p>The ridge is quiet again. Your crew recovered a sealed parcel and two Amber Tea Bricks.</p><div class="reward-row"><span><i>＋</i>18 marks</span><span><i>T</i>2 tea bricks</span><span><i>✦</i>1 reputation</span></div>' +
    '<button class="primary-button" type="button" data-action="return-town"><span>RETURN TO HEARTHCROSS</span><b>→</b></button></section><section class="panel result-notes"><div class="panel-head"><div><small>FIELD NOTES</small><h2>Close the errand</h2></div><span class="round-seal">01</span></div><p>Visit the Town Exchange to sell the recovered cargo, or review the crew and pack before another journey.</p><div class="mini-log">' +
    state.log.slice(0, 2).map((entry) => '<span>· ' + safe(entry) + '</span>').join("") + '</div></section>';
}
function renderDefeat() {
  return '<section class="result-card defeat-card"><div class="result-emblem">↶</div><small>ROUTE INTERRUPTED</small><h2>The crew falls back.</h2><p>No parcel was recovered. Rest in Hearthcross, replace the ration, then try the ridge again.</p><button class="primary-button" type="button" data-action="recover"><span>RECOVER IN HEARTHCROSS</span><b>→</b></button></section>';
}
function renderJourney() {
  if (state.phase === "battle") return renderBattle();
  if (state.phase === "victory") return renderVictory();
  if (state.phase === "defeat") return renderDefeat();
  return renderTown();
}
function renderMarket() {
  const tradeItems = ITEMS.filter((item) => item.buyPrice !== null);
  return '<section class="market-banner"><div><small>HEARTHCROSS · MARKET WARD</small><h2>Good routes begin with good terms.</h2><p>Buy the supplies you need. Sell trade goods after your return.</p></div><span class="market-stamp">LOCAL<br>EXCHANGE</span></section>' +
    '<section class="panel market-panel"><div class="panel-head"><div><small>DAILY BOARD · PROTOTYPE QUOTES</small><h2>Available goods</h2></div><span class="status-pill">MARKS ' + state.coin + '</span></div><div class="market-table"><div class="market-header"><span>GOOD</span><span>BUY</span><span>SELL</span><span>PACK</span><span></span></div>' +
    tradeItems.map((item) => '<div class="market-row"><div class="good-cell"><span class="item-glyph ' + item.kind + '-glyph">' + item.glyph + '</span><span><strong>' + safe(item.name) + '</strong><small>' + safe(item.detail) + '</small></span></div><span class="quote">' + item.buyPrice + '<small> M</small></span><span class="quote">' + item.sellPrice + '<small> M</small></span><span class="pack-count">' + (state.inventory[item.id] || 0) + '</span><span class="trade-actions">' +
    '<button type="button" data-action="buy" data-item="' + item.id + '" aria-label="Buy one ' + safe(item.name) + '">BUY</button><button type="button" data-action="sell" data-item="' + item.id + '" ' + ((state.inventory[item.id] || 0) < 1 ? "disabled" : "") + ' aria-label="Sell one ' + safe(item.name) + '">SELL</button></span></div>').join("") +
    '</div><div class="market-foot"><span>Original prototype quotes; not copied from any live game.</span><span>Held: ' + state.inventory.tea + ' tea · ' + state.inventory.fittings + ' fittings</span></div></section>' +
    '<div class="market-tip"><span>✦</span><p><strong>Trade note</strong> The parcel route rewards cargo that can be sold here. Keep a ration in your pack before another trip.</p></div>';
}
function renderRoster() {
  const hasScout = state.party.some((unit) => unit.id === "scout");
  return '<section class="roster-banner"><div><small>HEARTHCROSS · HIRING BOARD</small><h2>Travel light. Watch each other&#39;s backs.</h2><p>Your crew&#39;s formation affects how much room you have for new companions.</p></div><div class="slot-count">' + state.party.length + '<i> / ' + PARTY_LIMIT + '</i><small>CREW SLOTS</small></div></section>' +
    '<div class="roster-grid"><section class="panel roster-panel"><div class="panel-head"><div><small>ACTIVE FORMATION</small><h2>Road crew</h2></div><span class="status-pill">' + state.party.length + ' MEMBERS</span></div>' +
    state.party.map((unit, index) => '<div class="roster-member"><span class="formation-index">0' + (index + 1) + '</span><img src="' + portrait(unit.id) + '" alt=""><div class="roster-member-info"><strong>' + safe(unit.name) + '</strong><small>' + safe(unit.role) + '</small>' + bar(unit.hp, unit.maxHp, "health") + '</div><span class="role-tag">' + (index === 0 ? "LEAD" : "SCOUT") + '</span></div>').join("") +
    '<div class="formation-note">Formation and combat values are prototype rules. Detailed class and promotion systems are planned for a later slice.</div></section>' +
    '<section class="panel hire-panel"><div class="hire-portrait"><img src="./assets/scout.svg" alt=""></div><small>AVAILABLE FOR HIRE</small><h2>Tarin Reed</h2><span class="role-tag">TRAIL SCOUT</span><p>Knows the ridge paths. Adds a follow-up strike and keeps an eye on the crew&#39;s supplies.</p><div class="hire-footer"><span><small>CONTRACT</small><strong>' + SCOUT_COST + ' marks</strong></span><button type="button" class="secondary-button" data-action="hire" ' + (hasScout || state.coin < SCOUT_COST || state.party.length >= PARTY_LIMIT ? "disabled" : "") + '>' + (hasScout ? "IN YOUR CREW" : "HIRE SCOUT") + '<span>→</span></button></div></section></div>';
}
function renderInventory() {
  const total = Object.values(state.inventory).reduce((sum, count) => sum + count, 0);
  return '<section class="pack-banner"><div><small>TRAVEL KIT · CARRY LIMIT 20 EACH</small><h2>Every item has a purpose.</h2><p>Use a Field Tonic to restore the crew member who needs it most.</p></div><span class="pack-total">' + total + '<small>ITEMS</small></span></section>' +
    '<section class="panel pack-panel"><div class="panel-head"><div><small>YOUR PACK</small><h2>Supplies and cargo</h2></div><span class="status-pill">' + state.inventory.ration + ' RATIONS</span></div><div class="inventory-grid">' +
    ITEMS.map((item) => '<article class="inventory-card"><span class="item-glyph ' + item.kind + '-glyph">' + item.glyph + '</span><div class="inventory-copy"><strong>' + safe(item.name) + '</strong><small>' + safe(item.detail) + '</small><span class="inventory-quantity">QUANTITY <b>' + (state.inventory[item.id] || 0) + '</b></span></div>' +
    (item.id === "tonic" ? '<button type="button" data-action="use-tonic" class="tiny-button" ' + (state.inventory.tonic < 1 || state.party.every((unit) => unit.hp === unit.maxHp) ? "disabled" : "") + '>USE</button>' :
    item.sellPrice !== null ? '<button type="button" data-action="sell" data-item="' + item.id + '" class="tiny-button" ' + ((state.inventory[item.id] || 0) < 1 || state.phase !== "town" ? "disabled" : "") + '>SELL</button>' :
    '<span class="bound-tag">' + (item.kind === "quest" ? "QUEST" : "SUPPLY") + '</span>') + '</article>').join("") + '</div>' +
    (state.phase === "battle" ? '<div class="pack-battle-note">The road is still active. Using a tonic spends your crew order and the raiders will respond.</div>' : '') + '</section>';
}
function renderJournal() {
  return '<section class="journal-banner"><div><small>FIELD NOTES · DAY ' + String(state.day).padStart(2, "0") + '</small><h2>A journey is made of small decisions.</h2><p>Every order, purchase and discovery is recorded here on this device.</p></div><span class="journal-seal">≋</span></section>' +
    '<section class="panel journal-panel"><div class="panel-head"><div><small>RECENT ENTRIES</small><h2>Ledger</h2></div><span class="status-pill">' + state.log.length + ' NOTES</span></div><div class="journal-list">' +
    state.log.map((entry, index) => '<article><span class="journal-index">' + String(state.log.length - index).padStart(2, "0") + '</span><i></i><p>' + safe(entry) + '</p></article>').join("") + '</div></section>';
}
function render() {
  setHeader(state.activeTab, state.phase);
  navState();
  renderSide();
  notice.textContent = state.notice || "";
  notice.classList.toggle("show", Boolean(state.notice));
  const renderers = { journey: renderJourney, market: renderMarket, roster: renderRoster, inventory: renderInventory, journal: renderJournal };
  content.innerHTML = renderers[state.activeTab]();
  const saved = saveGame(state);
  $("#save-state").innerHTML = '<span class="save-dot ' + (saved ? "" : "save-warning") + '"></span>' + (saved ? " SAVED HERE" : " SESSION ONLY");
  document.body.dataset.phase = state.phase;
}
function transition(next) { state = next; render(); }

document.addEventListener("click", (event) => {
  const targetButton = event.target.closest("[data-target]");
  if (targetButton) { transition(setTarget(state, targetButton.dataset.target)); return; }
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  if (button.dataset.tab) { transition(changeTab(state, button.dataset.tab)); return; }
  const action = button.dataset.action;
  if (!action) return;
  if (action === "start") transition(startRoute(state));
  else if (action === "hire") transition(hireScout(state));
  else if (action === "buy") transition(buyItem(state, button.dataset.item));
  else if (action === "sell") transition(sellItem(state, button.dataset.item));
  else if (action === "use-tonic") transition(useTonic(state));
  else if (["strike", "brace", "technique"].includes(action)) transition(performAction(state, action));
  else if (action === "return-town") transition(returnToTown(state));
  else if (action === "recover") transition(recoverInTown(state));
  else if (action === "reset" && window.confirm("Start a fresh journey? This clears only this game's save on this device.")) {
    clearGame();
    state = resetJourney();
    render();
  }
});
document.addEventListener("keydown", (event) => {
  if (state.phase !== "battle" || event.altKey || event.ctrlKey || event.metaKey) return;
  const orders = { "1": "strike", "2": "brace", "3": "technique" };
  if (!orders[event.key]) return;
  event.preventDefault();
  transition(performAction(state, orders[event.key]));
});
render();