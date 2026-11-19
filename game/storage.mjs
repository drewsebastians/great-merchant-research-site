import { ROUTE_IDS, SAVE_VERSION, STORAGE_KEY } from "./data.mjs";

function validSave(state) {
  const tabs = ["journey", "market", "roster", "inventory", "journal", "preferences"];
  const unitIds = ["mara", "scout"];
  const itemIds = ["ration", "tonic", "tea", "fittings", "tool-roll", "edge", "seal"];
  if (!state || state.saveVersion !== SAVE_VERSION || !tabs.includes(state.activeTab)) return false;
  if (!ROUTE_IDS.includes(state.selectedRoute) || !ROUTE_IDS.includes(state.activeRoute) || !Array.isArray(state.completedRoutes) ||
    state.completedRoutes.some((routeId) => !ROUTE_IDS.includes(routeId))) return false;
  if (typeof state.onboardingSeen !== "boolean") return false;
  if (!["en", "id"].includes(state.language) || typeof state.combatShortcutsEnabled !== "boolean") return false;
  if (!state.equipment || ![null, "edge"].includes(state.equipment.weapon)) return false;
  if (state.tripLedger !== null && state.tripLedger !== undefined) {
    const ledger = state.tripLedger;
    if (!ROUTE_IDS.includes(ledger.routeId) || !["rationCost", "rewardCoin", "cargoValue", "cargoSoldRevenue", "cargoCount", "cargoSoldCount"].every((key) => Number.isSafeInteger(ledger[key]) && ledger[key] >= 0) ||
      !ledger.unsoldCargo || Object.values(ledger.unsoldCargo).some((count) => !Number.isInteger(count) || count < 0)) return false;
  }
  if (state.lastSettlement !== null && state.lastSettlement !== undefined) {
    const settlement = state.lastSettlement;
    if (!ROUTE_IDS.includes(settlement.routeId) || !["rationCost", "rewardCoin", "cargoValue", "cargoSoldRevenue", "cargoCount", "cargoSoldCount"].every((key) => Number.isSafeInteger(settlement[key]) && settlement[key] >= 0) ||
      !Number.isSafeInteger(settlement.netProceeds)) return false;
  }
  if (!Array.isArray(state.party) || state.party.length < 1 || state.party.length > 3) return false;
  if (!["mara", "scout"].includes(state.formationFrontId)) return false;
  if (!state.party.some((unit) => unit.id === state.formationFrontId)) return false;
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

function migrateToLatest(state, additions = {}) {
  return {
    ...state,
    ...additions,
    saveVersion: SAVE_VERSION,
    inventory: { ...state.inventory, edge: state.inventory?.edge ?? 0, "tool-roll": state.inventory?.["tool-roll"] ?? 0 },
    equipment: state.equipment || { weapon: null },
    tripLedger: state.tripLedger || null,
    lastSettlement: state.lastSettlement || null,
    language: state.language || "en",
    combatShortcutsEnabled: state.combatShortcutsEnabled ?? true
  };
}

function migrateSave(state) {
  if (!state || state.saveVersion === SAVE_VERSION) return state;
  if (state.saveVersion === 7) return migrateToLatest(state);
  if (state.saveVersion === 6) return migrateToLatest(state);
  if (state.saveVersion === 5) return migrateToLatest(state);
  if (state.saveVersion === 4) return migrateToLatest(state);
  if (state.saveVersion === 3) return migrateToLatest(state, { formationFrontId: state.formationFrontId || "mara" });
  if (state.saveVersion === 2) return migrateToLatest(state, { onboardingSeen: state.onboardingSeen ?? false, formationFrontId: "mara" });
  if (state.saveVersion === 1) return migrateToLatest(state, {
    selectedRoute: "mosswind",
    activeRoute: "mosswind",
    completedRoutes: state.phase === "town" && state.routeCleared ? ["mosswind"] : [],
    onboardingSeen: false,
    formationFrontId: "mara",
    battle: state.battle ? { ...state.battle, routeId: "mosswind" } : null
  });
  return state;
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
