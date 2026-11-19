import { createEncounter, createInitialState, findItem, findRoute, PARTY_LIMIT, ROUTES, SCOUT_COST } from "./data.mjs";

function copy(state) { return JSON.parse(JSON.stringify(state)); }
function record(state, message) {
  state.notice = message;
  state.log.unshift(message);
  state.log = state.log.slice(0, 14);
  return state;
}
function reject(state, message) {
  const next = copy(state);
  next.notice = message;
  return next;
}
function livingEnemies(state) { return state.battle.enemies.filter((enemy) => enemy.hp > 0); }
function livingParty(state) { return state.party.filter((unit) => unit.hp > 0); }
function firstLivingEnemy(state) { return livingEnemies(state)[0] || null; }
export function isRouteUnlocked(state, routeId) {
  const route = ROUTES.find((entry) => entry.id === routeId);
  return Boolean(route && (!route.requiresRoute || (state.completedRoutes || []).includes(route.requiresRoute)));
}
function hitEnemy(enemy, amount) {
  const actual = Math.min(enemy.hp, amount);
  enemy.hp = Math.max(0, enemy.hp - amount);
  return actual;
}
function finishVictory(state) {
  const route = findRoute(state.activeRoute || state.battle?.routeId);
  state.phase = "victory";
  state.coin += route.reward.coin;
  for (const [itemId, quantity] of Object.entries(route.reward.items)) {
    state.inventory[itemId] = (state.inventory[itemId] || 0) + quantity;
  }
  state.reputation += route.reward.reputation;
  state.routeCleared = true;
  state.completedRoutes = Array.from(new Set([...(state.completedRoutes || []), route.id]));
  state.routeRuns += 1;
  return record(state, route.recovery);
}
function enemyPhase(state) {
  const attackers = livingEnemies(state);
  if (!attackers.length) return finishVictory(state);
  for (let index = 0; index < attackers.length; index += 1) {
    const activeParty = livingParty(state);
    if (!activeParty.length) break;
    const targetIndex = (state.battle.turn + index - 1) % state.party.length;
    let target = state.party[targetIndex];
    if (target.hp <= 0) target = activeParty[0];
    const attacker = attackers[index];
    let damage = attacker.damage;
    if (state.battle.guard > 0) {
      damage = Math.max(1, damage - state.battle.guard);
      state.battle.guard = 0;
    }
    target.hp = Math.max(0, target.hp - damage);
    record(state, attacker.name + " hits " + target.name + " for " + damage + ".");
  }
  if (!livingParty(state).length) {
    state.phase = "defeat";
    return record(state, "Your crew retreats from the ridge. Recover in Hearthcross and try again.");
  }
  state.battle.turn += 1;
  return state;
}
function resolveCrewAction(state, kind, selectedTarget) {
  const hero = state.party[0];
  const scout = state.party.find((unit) => unit.id === "scout");
  const target = state.battle.enemies.find((enemy) => enemy.id === selectedTarget && enemy.hp > 0) || firstLivingEnemy(state);
  if (kind === "strike") {
    const hit = hitEnemy(target, 14);
    record(state, hero.name + " strikes " + target.name + " for " + hit + ".");
    if (scout) {
      const nextTarget = target.hp > 0 ? target : firstLivingEnemy(state);
      if (nextTarget) record(state, scout.name + " follows with " + hitEnemy(nextTarget, 8) + " damage.");
    }
    hero.focus = Math.min(hero.maxFocus, hero.focus + 1);
  } else if (kind === "brace") {
    state.battle.guard = 8;
    hero.focus = Math.min(hero.maxFocus, hero.focus + 1);
    record(state, hero.name + " braces. The next incoming blow is softened.");
    if (scout && target) record(state, scout.name + " keeps the lookout busy for " + hitEnemy(target, 5) + ".");
  } else if (kind === "technique") {
    if (hero.focus < 2) return reject(state, "Build two focus with Strike or Brace before using the technique.");
    hero.focus -= 2;
    for (const enemy of livingEnemies(state)) record(state, "Wayfarer's Arc hits " + enemy.name + " for " + hitEnemy(enemy, 13) + ".");
    if (scout) {
      const nextTarget = firstLivingEnemy(state);
      if (nextTarget) record(state, scout.name + " follows the opening for " + hitEnemy(nextTarget, 7) + ".");
    }
  }
  if (!livingEnemies(state).length) return finishVictory(state);
  return enemyPhase(state);
}

export function changeTab(state, tab) {
  const allowed = ["journey", "market", "roster", "inventory", "journal"];
  if (!allowed.includes(tab)) return state;
  if (state.phase !== "town" && ["market", "roster"].includes(tab)) return reject(state, "Town Exchange and Crew are available when you return to Hearthcross.");
  const next = copy(state);
  next.activeTab = tab;
  return next;
}
export function selectRoute(state, routeId) {
  if (state.phase !== "town") return reject(state, "Choose a route from Hearthcross before setting out.");
  if (!ROUTES.some((route) => route.id === routeId)) return reject(state, "That route is not on the board.");
  if (!isRouteUnlocked(state, routeId)) return reject(state, "Complete the Courier's Mark on Mosswind Road to unlock Amber Quarry.");
  const next = copy(state);
  next.selectedRoute = routeId;
  next.routeCleared = false;
  return record(next, findRoute(routeId).name + " selected for the next journey.");
}
export function hireScout(state) {
  if (state.phase !== "town") return reject(state, "Crew changes are available in Hearthcross.");
  if (state.party.some((unit) => unit.id === "scout")) return reject(state, "Tarin is already in your crew.");
  if (state.party.length >= PARTY_LIMIT) return reject(state, "Your crew is full.");
  if (state.coin < SCOUT_COST) return reject(state, "You need " + SCOUT_COST + " marks to hire a trail scout.");
  const next = copy(state);
  next.coin -= SCOUT_COST;
  next.party.push({ id: "scout", name: "Tarin Reed", role: "Trail Scout", hp: 46, maxHp: 46, focus: 0, maxFocus: 0, portrait: "assets/scout.svg" });
  next.activeTab = "roster";
  return record(next, "Tarin Reed joins the crew for " + SCOUT_COST + " marks.");
}
export function buyItem(state, itemId, quantity = 1) {
  const item = findItem(itemId);
  if (state.phase !== "town") return reject(state, "Trading is available in Hearthcross.");
  if (!item || item.buyPrice === null) return reject(state, "That item is not for sale.");
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return reject(state, "Choose a quantity from 1 to 10.");
  const cost = item.buyPrice * quantity;
  if (state.coin < cost) return reject(state, "Not enough marks for that purchase.");
  const next = copy(state);
  next.coin -= cost;
  next.inventory[itemId] = (next.inventory[itemId] || 0) + quantity;
  return record(next, "Bought " + quantity + " × " + item.name + " for " + cost + " marks.");
}
export function sellItem(state, itemId, quantity = 1) {
  const item = findItem(itemId);
  if (state.phase !== "town") return reject(state, "Trading is available in Hearthcross.");
  if (!item || item.sellPrice === null) return reject(state, "The Town Exchange does not buy that item.");
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > (state.inventory[itemId] || 0)) return reject(state, "You do not have enough to sell that quantity.");
  const next = copy(state);
  next.inventory[itemId] -= quantity;
  const value = item.sellPrice * quantity;
  next.coin += value;
  return record(next, "Sold " + quantity + " × " + item.name + " for " + value + " marks.");
}
export function setTarget(state, targetId) {
  if (state.phase !== "battle" || !state.battle) return state;
  if (!state.battle.enemies.some((enemy) => enemy.id === targetId && enemy.hp > 0)) return state;
  const next = copy(state);
  next.battle.targetId = targetId;
  return next;
}
export function startRoute(state) {
  if (state.phase !== "town") return reject(state, "Finish the current encounter before setting out again.");
  if (!isRouteUnlocked(state, state.selectedRoute || "mosswind")) return reject(state, "That route is still locked.");
  if (!state.party.some((unit) => unit.id === "scout")) return reject(state, "Hire a trail scout in Crew before taking the ridge road.");
  if ((state.inventory.ration || 0) < 1) return reject(state, "Pack at least one Trail Ration before setting out.");
  const next = copy(state);
  next.inventory.ration -= 1;
  next.activeRoute = next.selectedRoute || "mosswind";
  next.routeCleared = false;
  next.phase = "battle";
  next.activeTab = "journey";
  next.battle = createEncounter(next.activeRoute);
  const route = findRoute(next.activeRoute);
  return record(next, "You set out for " + route.name + ". " + route.opening);
}
export function performAction(state, kind) {
  if (state.phase !== "battle" || !state.battle) return reject(state, "There is no active encounter.");
  if (!["strike", "brace", "technique"].includes(kind)) return reject(state, "Choose a combat order.");
  return resolveCrewAction(copy(state), kind, state.battle.targetId);
}
export function useTonic(state) {
  if (!["town", "battle"].includes(state.phase)) return reject(state, "Use supplies after returning to Hearthcross.");
  if ((state.inventory.tonic || 0) < 1) return reject(state, "You have no Field Tonic.");
  const target = state.party.filter((unit) => unit.hp < unit.maxHp).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
  if (!target) return reject(state, "Your crew is already at full vitality.");
  const next = copy(state);
  const recipient = next.party.find((unit) => unit.id === target.id);
  const restored = Math.min(findItem("tonic").healing, recipient.maxHp - recipient.hp);
  recipient.hp += restored;
  next.inventory.tonic -= 1;
  record(next, recipient.name + " uses a Field Tonic and restores " + restored + " vitality.");
  return next.phase === "battle" ? enemyPhase(next) : next;
}
export function returnToTown(state) {
  if (state.phase !== "victory") return reject(state, "Return to town after the encounter is complete.");
  const next = copy(state);
  next.party.forEach((unit) => { unit.hp = Math.min(unit.maxHp, unit.hp + 8); });
  next.phase = "town";
  next.activeTab = "journey";
  next.day += 1;
  next.battle = null;
  return record(next, "Back in Hearthcross, you deliver the parcel and update the ledger.");
}
export function recoverInTown(state) {
  if (state.phase !== "defeat") return reject(state, "Your crew is not retreating.");
  const next = copy(state);
  next.party.forEach((unit) => { unit.hp = Math.max(1, Math.ceil(unit.maxHp * 0.55)); });
  next.phase = "town";
  next.activeTab = "journey";
  next.day += 1;
  next.battle = null;
  return record(next, "The crew recovers in Hearthcross. No route reward was collected.");
}
export function resetJourney() { return createInitialState(); }
