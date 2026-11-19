import { ROUTE_IDS, SAVE_VERSION, STORAGE_KEY } from "./data.mjs";

function validSave(state) {
  const tabs = ["journey", "market", "roster", "inventory", "journal"];
  const unitIds = ["mara", "scout"];
  const itemIds = ["ration", "tonic", "tea", "fittings", "seal"];
  if (!state || state.saveVersion !== SAVE_VERSION || !tabs.includes(state.activeTab)) return false;
  if (!ROUTE_IDS.includes(state.selectedRoute) || !ROUTE_IDS.includes(state.activeRoute) || !Array.isArray(state.completedRoutes) ||
    state.completedRoutes.some((routeId) => !ROUTE_IDS.includes(routeId))) return false;
  if (!Array.isArray(state.party) || state.party.length < 1 || state.party.length > 3) return false;
  if (state.party.some((unit) => !unitIds.includes(unit.id) || typeof unit.name !== "string" || typeof unit.role !== "string" ||
    !Number.isInteger(unit.hp) || !Number.isInteger(unit.maxHp) || unit.maxHp < 1 || unit.hp < 0 || unit.hp > unit.maxHp ||
    !Number.isInteger(unit.focus) || !Number.isInteger(unit.maxFocus) || unit.focus < 0 || unit.focus > unit.maxFocus)) return false;
  if (!state.inventory || itemIds.some((id) => !Number.isInteger(state.inventory[id]) || state.inventory[id] < 0 || state.inventory[id] > 999)) return false;
  if (!Number.isSafeInteger(state.coin) || state.coin < 0 || !Number.isSafeInteger(state.day) || state.day < 1) return false;
  if (!Array.isArray(state.log) || state.log.length > 14 || state.log.some((entry) => typeof entry !== "string")) return false;
  if (!["town", "battle", "victory", "defeat"].includes(state.phase)) return false;
  if (state.phase === "battle" && (!state.battle || !ROUTE_IDS.includes(state.battle.routeId) || !Array.isArray(state.battle.enemies) || state.battle.enemies.length < 1 || state.battle.enemies.length > 4)) return false;
  return true;
}

function migrateSave(state) {
  if (!state || state.saveVersion === SAVE_VERSION) return state;
  if (state.saveVersion !== 1) return state;
  return {
    ...state,
    saveVersion: SAVE_VERSION,
    selectedRoute: "mosswind",
    activeRoute: "mosswind",
    completedRoutes: state.phase === "town" && state.routeCleared ? ["mosswind"] : [],
    battle: state.battle ? { ...state.battle, routeId: "mosswind" } : null
  };
}

export function loadGame() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = migrateSave(JSON.parse(raw));
    if (!validSave(state)) return null;
    return state;
  } catch {
    return null;
  }
}

export function saveGame(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearGame() {
  try { window.localStorage.removeItem(STORAGE_KEY); }
  catch { /* The in-memory game still works if private browsing blocks storage. */ }
}
