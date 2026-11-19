export const SAVE_VERSION = 8;
export const STORAGE_KEY = "wayfarers-ledger:v5:save";
export const SCOUT_COST = 22;
export const PARTY_LIMIT = 3;

export const ROUTES = [
  {
    id: "mosswind",
    questId: "courier-mark",
    name: "Mosswind Road",
    title: "The Courier's Mark",
    summary: "Find the sealed parcel on Mosswind Road and bring it home.",
    terrain: "RIDGE TRACK · SCOUTING ERRAND",
    scene: "assets/mosswind-road.svg",
    encounter: "Ridge Ambush",
    foeLabel: "Ridge raiders",
    coordinate: "MOSSWIND RIDGE",
    mapPosition: { x: 23, y: 63 },
    opening: "A lookout steps from the ridge.",
    victoryTitle: "The parcel is yours.",
    victoryCopy: "The ridge is quiet again. Your crew recovered a sealed parcel and two Amber Tea Bricks.",
    recovery: "The road is clear. You recover the sealed parcel and two Amber Tea Bricks.",
    reward: { coin: 18, reputation: 1, items: { tea: 2 } },
    enemies: [
      { id: "lookout", name: "Ridge Lookout", hp: 27, damage: 6, portrait: "assets/raider.svg" },
      { id: "skirmisher", name: "Road Skirmisher", hp: 24, damage: 5, portrait: "assets/skirmisher.svg" }
    ]
  },
  {
    id: "amber-quarry",
    questId: "quarry-ledger",
    name: "Amber Quarry",
    title: "The Quarry Ledger",
    summary: "Clear the old workings and bring a set of bronze fittings home.",
    terrain: "OLD WORKINGS · SALVAGE RUN",
    scene: "assets/amber-quarry.svg",
    encounter: "Quarry Watch",
    foeLabel: "Quarry keeper",
    coordinate: "EASTERN CUT",
    mapPosition: { x: 77, y: 34 },
    opening: "A quarry keeper blocks the narrow cut.",
    victoryTitle: "The cut is yours again.",
    victoryCopy: "The keeper leaves the old workings. Your crew salvages a crate of Bronze Fittings.",
    recovery: "The quarry is open again. You salvage a crate of Bronze Fittings.",
    reward: { coin: 27, reputation: 2, items: { fittings: 1 } },
    enemies: [
      { id: "warden", name: "Quarry Warden", hp: 54, damage: 8, portrait: "assets/quarry-warden.svg" }
    ]
  }
];

export const QUESTS = [
  {
    id: "courier-mark",
    routeId: "mosswind",
    title: "The Courier's Mark",
    summary: "Hire a trail scout, recover the sealed parcel, and bring it back to Hearthcross.",
    entryConditions: [
      { type: "crew-member", memberId: "scout" },
      { type: "inventory-minimum", itemId: "ration", quantity: 1 }
    ],
    rewards: { coin: 0, reputation: 0, items: { seal: 1 } },
    stages: [
      { id: "recruit", label: "Hire a trail scout", type: "crew-member", memberId: "scout" },
      { id: "recover", label: "Clear Mosswind Road", type: "route-cleared", routeId: "mosswind" },
      { id: "return", label: "Return to Hearthcross", type: "returned-home", routeId: "mosswind" }
    ],
    rewardRouteId: "mosswind",
    requiresQuests: [],
    unlocks: ["quarry-ledger"]
  },
  {
    id: "quarry-ledger",
    routeId: "amber-quarry",
    title: "The Quarry Ledger",
    summary: "Clear the old workings, salvage the fittings, and deliver them to Hearthcross.",
    entryConditions: [
      { type: "crew-member", memberId: "scout" },
      { type: "inventory-minimum", itemId: "ration", quantity: 1 }
    ],
    rewards: { coin: 0, reputation: 0, items: {} },
    stages: [
      { id: "crew", label: "Bring a trail scout", type: "crew-member", memberId: "scout" },
      { id: "salvage", label: "Clear Amber Quarry", type: "route-cleared", routeId: "amber-quarry" },
      { id: "return", label: "Return to Hearthcross", type: "returned-home", routeId: "amber-quarry" }
    ],
    rewardRouteId: "amber-quarry",
    requiresQuests: ["courier-mark"],
    unlocks: []
  }
];

export const ROUTE_IDS = ROUTES.map((route) => route.id);
export function findRoute(id) { return ROUTES.find((route) => route.id === id) || ROUTES[0]; }
export function findQuest(id) { return QUESTS.find((quest) => quest.id === id) || null; }
export const ROUTE_LINKS = [{ from: "mosswind", to: "amber-quarry", label: "Ridge path" }];

export const RECIPES = [
  {
    id: "quarry-roll",
    name: "Quarry Tool Roll",
    detail: "Pack one crate of Bronze Fittings into a field-ready trade bundle.",
    inputs: { fittings: 1 },
    output: { itemId: "tool-roll", quantity: 1 }
  }
];
export function findRecipe(id) { return RECIPES.find((recipe) => recipe.id === id) || null; }

export const ITEMS = [
  { id: "ration", name: "Trail Ration", detail: "A day's food for the road. One ration is used when you set out.", glyph: "R", buyPrice: 6, sellPrice: 2, kind: "supply" },
  { id: "tonic", name: "Field Tonic", detail: "Restores 22 vitality to the crew member who needs it most.", glyph: "+", buyPrice: 16, sellPrice: 7, kind: "healing", healing: 22 },
  { id: "tea", name: "Amber Tea Brick", detail: "A compact trade good. The ridge courier's parcel contains two bricks.", glyph: "T", buyPrice: 10, sellPrice: 13, kind: "trade" },
  { id: "fittings", name: "Bronze Fittings", detail: "Useful hardware traded by the town's caravaners.", glyph: "B", buyPrice: 18, sellPrice: 22, kind: "trade" },
  { id: "tool-roll", name: "Quarry Tool Roll", detail: "A compact bundle of quarry tools, prepared from Bronze Fittings.", glyph: "K", buyPrice: null, sellPrice: 28, kind: "trade" },
  { id: "edge", name: "Wayfarer's Edge", detail: "A balanced field blade. Adds 3 damage to Mara's Strike while equipped.", glyph: "⚔", buyPrice: 34, sellPrice: 14, kind: "equipment", strikeBonus: 3 },
  { id: "seal", name: "Courier's Seal", detail: "Proof that the missing parcel reached Hearthcross.", glyph: "S", buyPrice: null, sellPrice: null, kind: "quest" }
];

export function createInitialState() {
  return {
    saveVersion: SAVE_VERSION,
    phase: "town",
    activeTab: "journey",
    day: 1,
    coin: 60,
    reputation: 0,
    selectedRoute: "mosswind",
    activeRoute: "mosswind",
    completedRoutes: [],
    onboardingSeen: false,
    language: "en",
    combatShortcutsEnabled: true,
    formationFrontId: "mara",
    party: [{ id: "mara", name: "Mara Venn", role: "Wayfarer", hp: 64, maxHp: 64, focus: 2, maxFocus: 3, portrait: "assets/wayfarer.svg" }],
    inventory: { ration: 2, tonic: 1, tea: 0, fittings: 0, "tool-roll": 0, edge: 0, seal: 0 },
    equipment: { weapon: null },
    tripLedger: null,
    lastSettlement: null,
    routeRuns: 0,
    routeCleared: false,
    battle: null,
    log: ["A courier's parcel went missing on the Mosswind Road.", "You arrive in Hearthcross with a modest purse and an open ledger."],
    notice: "Your first errand is ready. Recruit a scout before taking the ridge road."
  };
}

export function findItem(id) {
  return ITEMS.find((item) => item.id === id) || null;
}

export function createEncounter(routeId = "mosswind") {
  const route = findRoute(routeId);
  return {
    routeId: route.id,
    turn: 1,
    targetId: route.enemies[0].id,
    guard: 0,
    enemies: route.enemies.map((enemy) => ({ ...enemy, maxHp: enemy.hp }))
  };
}
