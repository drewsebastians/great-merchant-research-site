import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const elements = new Map();
const clickHandlers = [];
const keyHandlers = [];
const storage = new Map();
const guideFocusables = ["close", "skip", "next"].map((name) => ({ name, focus() { document.activeElement = this; } }));
function element(selector) {
  if (!elements.has(selector)) elements.set(selector, {
    innerHTML: "", textContent: "", disabled: false, style: {}, dataset: {},
    classList: { toggle() {} }, setAttribute() {}, focus() { document.activeElement = this; }
  });
  return elements.get(selector);
}
const navI18n = { journey: "tab.journey", market: "tab.market", roster: "tab.crew", inventory: "tab.pack", journal: "tab.journal", preferences: "tab.preferences" };
const navButtons = ["journey", "market", "roster", "inventory", "journal", "preferences"].map((tab) => ({
  dataset: { tab, i18n: navI18n[tab] }, textContent: tab, disabled: false, classList: { toggle() {} }, setAttribute() {}
}));
const shellLabels = ["footer.save", "footer.scope", "footer.brandline"].map((key) => ({
  dataset: { i18n: key }, textContent: "", setAttribute(name, value) { this[name] = value; }
}));
const resetControl = { dataset: { i18nAria: "action.reset", i18nTitle: "action.reset" }, setAttribute(name, value) { this[name] = value; } };
const guideReplayControl = { dataset: { i18nTitle: "action.guideReplay" }, setAttribute(name, value) { this[name] = value; } };
globalThis.document = {
  documentElement: { lang: "en" },
  activeElement: null,
  querySelector: element,
  querySelectorAll(selector) {
    if (selector === "[data-i18n]") return [...navButtons, ...shellLabels];
    if (selector === "[data-i18n-aria]") return [resetControl];
    if (selector === "[data-i18n-title]") return [resetControl, guideReplayControl];
    return navButtons;
  },
  addEventListener(type, handler) { (type === "click" ? clickHandlers : keyHandlers).push(handler); },
  body: { dataset: {} }
};
element("#guide-layer").querySelector = (selector) => selector === "[data-guide-next]" ? guideFocusables[2] : null;
element("#guide-layer").querySelectorAll = () => guideFocusables;
globalThis.window = {
  confirm: () => true,
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); },
    removeItem(key) { storage.delete(key); }
  }
};
await import("../game/app.mjs?app-render-test");
const gameStyles = await readFile(new URL("../game/styles.css", import.meta.url), "utf8");

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

test("narrow-screen market controls use larger tap targets and card layout", () => {
  assert.match(gameStyles, /@media\(max-width:430px\)\{\.market-panel/);
  assert.match(gameStyles, /\.trade-actions button\{min-width:44px;min-height:38px/);
  assert.match(gameStyles, /\.quest-stage\.current/);
  assert.match(gameStyles, /\.battle-vitality/);
});

test("route board and rendered journey flow select the distinct quarry encounter", async () => {
  assert.match(element("#guide-layer").innerHTML, /FIELD GUIDE/);
  assert.match(element("#guide-layer").innerHTML, /Start from Hearthcross/);
  assert.match(element("#guide-layer").innerHTML, /CLICK OUTSIDE TO CLOSE/);
  assert.equal(document.activeElement, guideFocusables[2]);
  let focusTrapPrevented = false;
  keyHandlers.at(-1)({ key: "Tab", shiftKey: false, preventDefault() { focusTrapPrevented = true; } });
  assert.equal(focusTrapPrevented, true);
  assert.equal(document.activeElement, guideFocusables[0]);
  keyHandlers.at(-1)({ key: "Tab", shiftKey: true, preventDefault() { focusTrapPrevented = true; } });
  assert.equal(document.activeElement, guideFocusables[2]);
  click({ backdrop: true, dataset: {} });
  assert.equal(savedState().onboardingSeen, true);
  assert.equal(element("#guide-layer").innerHTML, "");
  assert.equal(document.activeElement, element(".guide-replay"));

  click({ dataset: { tab: "journal" } });
  assert.match(element("#game-content").innerHTML, /QUEST JOURNAL/);
  assert.match(element("#game-content").innerHTML, /The Courier&#39;s Mark/);
  assert.match(element("#game-content").innerHTML, /Hire a trail scout/);
  assert.match(element("#game-content").innerHTML, /aria-current="step"/);
  assert.match(element("#game-content").innerHTML, /The Quarry Ledger/);
  assert.match(element("#game-content").innerHTML, /UNLOCKS AFTER <strong>The Courier&#39;s Mark<\/strong> IS COMPLETED/);
  click({ dataset: { tab: "journey" } });

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
  assert.match(element("#game-content").innerHTML, /class="quote buy-quote"/);
  assert.match(element("#game-content").innerHTML, /class="quote sell-quote"/);
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
  assert.match(element("#game-content").innerHTML, /class="compact-objective"/);
  assert.match(element("#game-content").innerHTML, /class="battle-vitality">HP 64\/64/);
  for (let turn = 0; turn < 3; turn += 1) click({ dataset: { action: "strike" } });
  assert.equal(savedState().phase, "victory");
  click({ dataset: { action: "return-town" } });
  assert.equal(savedState().phase, "town");
  assert.equal(savedState().lastSettlement.netProceeds, 12);
  click({ dataset: { tab: "journal" } });
  assert.match(element("#game-content").innerHTML, /class="quest-status-pill complete">COMPLETED/);
  assert.match(element("#game-content").innerHTML, /class="quest-status-pill progress">IN PROGRESS/);
  assert.doesNotMatch(element("#game-content").innerHTML, /class="quest-locked-note"/);
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
  assert.equal(shellLabels[0].textContent, "Progres tersimpan di perangkat ini.");
  assert.equal(shellLabels[1].textContent, "Nilai prototipe bukan acuan keseimbangan game sumber.");
  assert.equal(resetControl["aria-label"], "Mulai perjalanan baru");
  assert.equal(resetControl.title, "Mulai perjalanan baru");
  assert.equal(guideReplayControl.title, "Buka ulang panduan singkat");
  assert.match(element("#game-content").innerHTML, /Pintasan angka untuk pertempuran/);
  assert.match(element("#game-content").innerHTML, /Atur perjalananmu\./);
  assert.match(element("#game-content").innerHTML, /PENGATURAN PEMAIN/);
  assert.match(element("#game-content").innerHTML, /PENGATURAN<br>LOKAL/);
  assert.match(element("#game-content").innerHTML, /KONTROL PERTEMPURAN/);
  assert.match(element("#game-content").innerHTML, /Kamu tetap dapat memilih perintah melalui tombol di layar\./);
  assert.match(element("#game-content").innerHTML, /Pengaturan tersimpan bersama perjalanan lokal ini di perangkat ini\./);
  assert.match(element("#game-content").innerHTML, />AKTIF<\/button>/);
  assert.doesNotMatch(element("#game-content").innerHTML, /PLAYER SETTINGS|Make the journey yours\.|LOCAL<br>SETTINGS|>DISPLAY<|COMBAT INPUT|on-screen buttons/);
  click({ dataset: { tab: "roster" } });
  const indonesianCrew = element("#game-content").innerHTML;
  assert.equal(element("#screen-eyebrow").textContent, "HEARTHCROSS · AWAKMU");
  assert.match(indonesianCrew, /HEARTHCROSS · PAPAN REKRUTMEN/);
  assert.match(indonesianCrew, /Atur anggota di posisi depan sebelum berangkat\./);
  assert.match(indonesianCrew, /Aturan prototipe: anggota di posisi depan menerima serangan pertama dan memulai giliran awak\./);
  assert.match(indonesianCrew, /TERSEDIA UNTUK DIREKRUT/);
  assert.match(indonesianCrew, /SUDAH DI AWAK/);
  assert.match(indonesianCrew, /\+3 daya serang/);
  assert.match(indonesianCrew, /22 mark/);
  assert.doesNotMatch(indonesianCrew, /HIRING BOARD|Set the front member|opens the crew turn|terbukas the crew turn|AVAILABLE FOR HIRE|HIRE SCOUT/);
  click({ dataset: { tab: "preferences" } });
  click({ dataset: { action: "toggle-shortcuts" } });
  assert.equal(savedState().combatShortcutsEnabled, false);
  assert.match(element("#game-content").innerHTML, />MATI<\/button>/);
  click({ dataset: { tab: "market" } });
  const indonesianMarket = element("#game-content").innerHTML;
  assert.equal(element("#screen-eyebrow").textContent, "HEARTHCROSS · BURSA KOTA");
  assert.match(indonesianMarket, /HEARTHCROSS · KAWASAN PASAR/);
  assert.match(indonesianMarket, /Perjalanan baik dimulai dengan transaksi yang tepat\./);
  assert.match(indonesianMarket, /Barang tersedia/);
  assert.match(indonesianMarket, /Catatan dagang/);
  assert.match(indonesianMarket, /Simpan satu ransum di bekal sebelum berangkat lagi\./);
  assert.match(indonesianMarket, /aria-label="Beli satu Trail Ration"/);
  assert.match(indonesianMarket, /aria-label="Jual satu Trail Ration"/);
  assert.match(indonesianMarket, /A day&#39;s food for the road/);
  assert.match(indonesianMarket, /A balanced field blade\. Adds 3 damage to Mara&#39;s Strike while equipped\./);
  assert.doesNotMatch(indonesianMarket, /MARKET WARD|Good routes begin with good terms|Trade note|Held:|Buy one Trail Ration|Sell one Trail Ration/);
  click({ dataset: { tab: "inventory" } });
  const indonesianPack = element("#game-content").innerHTML;
  assert.equal(element("#screen-eyebrow").textContent, "PERLENGKAPAN JALAN · BEKAL");
  assert.match(indonesianPack, /Setiap barang punya kegunaan\./);
  assert.match(indonesianPack, /BEKALMU/);
  assert.match(indonesianPack, /0 RANSUM/);
  assert.match(indonesianPack, /A balanced field blade\. Adds 3 damage to Mara&#39;s Strike while equipped\./);
  assert.match(indonesianPack, />GUNAKAN<\/button>/);
  assert.match(indonesianPack, />MISI<\/span>/);
  click({ dataset: { tab: "journal" } });
  const indonesianJournal = element("#game-content").innerHTML;
  assert.equal(element("#screen-eyebrow").textContent, "CATATAN LAPANGAN · BUKU PERJALANAN");
  assert.match(indonesianJournal, /JURNAL MISI · TUJUAN SAAT INI/);
  assert.match(indonesianJournal, /Kontrak aktif/);
  assert.match(indonesianJournal, /LIHAT PERJALANAN/);
  assert.match(indonesianJournal, /CATATAN TERBARU/);
  assert.match(indonesianJournal, /Hire a trail scout, recover the sealed parcel, and bring it back to Hearthcross\./);
  click({ dataset: { tab: "journey" } });
  const indonesianJourney = element("#game-content").innerHTML;
  assert.equal(element("#screen-eyebrow").textContent, "CATATAN LAPANGAN · BAB 01");
  assert.match(indonesianJourney, /RUTE SELESAI/);
  assert.match(indonesianJourney, /2 TERSEDIA/);
  click({ dataset: { action: "buy", item: "ration" } });
  click({ dataset: { tab: "journey" } });
  assert.match(element("#game-content").innerHTML, /1 di bekal · 1 diperlukan/);
  click({ dataset: { action: "start" } });
  assert.equal(savedState().phase, "battle");
  const indonesianBattle = element("#game-content").innerHTML;
  assert.match(indonesianBattle, /Pertarungan di (?:Mosswind Road|Amber Quarry)/);
  assert.match(indonesianBattle, /LAWAN · PILIH SASARAN/);
  assert.match(indonesianBattle, /Pilih sasaran, lalu serang, bertahan/);
  assert.match(indonesianBattle, /Berikan 17 kerusakan · dapatkan 1 fokus/);
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
  click({ dataset: { action: "onboarding-replay" } });
  assert.match(element("#guide-layer").innerHTML, /PANDUAN SINGKAT · 01 · SIAPKAN DIRI/);
  assert.match(element("#guide-layer").innerHTML, /Mulai dari Hearthcross\./);
  assert.match(element("#guide-layer").innerHTML, /LEWATI PANDUAN/);
  click({ dataset: { action: "onboarding-close" } });
  for (let turn = 0; turn < 6 && savedState().phase === "battle"; turn += 1) click({ dataset: { action: "strike" } });
  assert.equal(savedState().phase, "victory");
  const indonesianVictory = element("#game-content").innerHTML;
  assert.match(indonesianVictory, /RUTE SELESAI · HADIAH DIAMANKAN/);
  assert.match(indonesianVictory, /The keeper leaves the old workings\. Your crew salvages a crate of Bronze Fittings\./);
  assert.match(indonesianVictory, /The quarry is open again\. You salvage a crate of Bronze Fittings\./);
  assert.doesNotMatch(indonesianVictory, /The quarry is terbuka again/);
  assert.match(element("#notice").textContent, /The quarry is open again/);
  assert.doesNotMatch(element("#log-summary").innerHTML, /terbuka again/);
  assert.match(indonesianVictory, /27 mark/);
  assert.match(indonesianVictory, /2 reputasi/);
  assert.match(indonesianVictory, /Tutup tugas/);
  click({ dataset: { action: "return-town" } });
  const indonesianSettlement = element("#game-content").innerHTML;
  assert.match(indonesianSettlement, /PERJALANAN TERAKHIR · AMBER QUARRY/);
  assert.match(indonesianSettlement, /BIAYA PERJALANAN/);
  assert.match(indonesianSettlement, /1 ransum digunakan/);
  assert.match(indonesianSettlement, /mata uang hadiah/);
  assert.match(indonesianSettlement, /Nilai muatan tidak mencakup barang misi/);

  const defeatSave = savedState();
  defeatSave.phase = "defeat";
  defeatSave.activeTab = "journey";
  defeatSave.activeRoute = "amber-quarry";
  defeatSave.battle = null;
  defeatSave.party.forEach((unit) => { unit.hp = 0; });
  storage.set("wayfarers-ledger:v5:save", JSON.stringify(defeatSave));
  await import("../game/app.mjs?app-defeat-render-test");
  const indonesianDefeat = element("#game-content").innerHTML;
  assert.match(indonesianDefeat, /PERJALANAN TERHENTI/);
  assert.match(indonesianDefeat, /Awak mundur\./);
  assert.match(indonesianDefeat, /Tidak ada hadiah yang diperoleh dari Amber Quarry/);
  assert.match(indonesianDefeat, /Beristirahat di Hearthcross, ganti ransum/);
  assert.match(indonesianDefeat, /PULIHKAN DI HEARTHCROSS/);

  const dayBeforeRecovery = savedState().day;
  click({ dataset: { action: "recover" } });
  assert.equal(savedState().phase, "town");
  assert.equal(savedState().day, dayBeforeRecovery + 1);
  assert.ok(savedState().party.every((unit) => unit.hp > 0));
  assert.equal(savedState().tripLedger, null);
  assert.match(element("#game-content").innerHTML, /Amber Quarry/);
  click({ dataset: { route: "mosswind" } });
  assert.equal(savedState().selectedRoute, "mosswind");
  assert.match(element("#game-content").innerHTML, /data-route="mosswind"[^>]*aria-pressed="true"/);
  assert.equal(element("#notice").textContent, "Mosswind Road dipilih untuk perjalanan berikutnya.");
  click({ dataset: { tab: "market" } });
  click({ dataset: { action: "buy", item: "ration" } });
  assert.equal(element("#notice").textContent, "Membeli 1 × Trail Ration seharga 6 mark.");
});
