export const SAVE_VERSION = 1;
export const STORAGE_KEY = "wayfarers-ledger:v5:save";
export const SCOUT_COST = 22;
export const PARTY_LIMIT = 3;

export const ITEMS = [
  { id: "ration", name: "Trail Ration", detail: "A day's food for the road. One ration is used when you set out.", glyph: "R", buyPrice: 6, sellPrice: 2, kind: "supply" },
  { id: "tonic", name: "Field Tonic", detail: "Restores 22 vitality to the crew member who needs it most.", glyph: "+", buyPrice: 16, sellPrice: 7, kind: "healing", healing: 22 },
  { id: "tea", name: "Amber Tea Brick", detail: "A compact trade good. The ridge courier's parcel contains two bricks.", glyph: "T", buyPrice: 10, sellPrice: 13, kind: "trade" },
  { id: "fittings", name: "Bronze Fittings", detail: "Useful hardware traded by the town's caravaners.", glyph: "B", buyPrice: 18, sellPrice: 22, kind: "trade" },
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
    party: [{ id: "mara", name: "Mara Venn", role: "Wayfarer", hp: 64, maxHp: 64, focus: 2, maxFocus: 3, portrait: "assets/wayfarer.svg" }],
    inventory: { ration: 2, tonic: 1, tea: 0, fittings: 0, seal: 0 },
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

export function createEncounter() {
  return {
    turn: 1,
    targetId: "lookout",
    guard: 0,
    enemies: [
      { id: "lookout", name: "Ridge Lookout", hp: 27, maxHp: 27, damage: 6, portrait: "assets/raider.svg" },
      { id: "skirmisher", name: "Road Skirmisher", hp: 24, maxHp: 24, damage: 5, portrait: "assets/skirmisher.svg" }
    ]
  };
}