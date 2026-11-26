import { ITEMS, PARTY_LIMIT, QUESTS, RECIPES, ROUTE_LINKS, ROUTES, SCOUT_COST, createInitialState, findItem, findRoute, findQuest } from "./data.mjs";
import { buyItem, changeTab, craftRecipe, equipItem, hireScout, isRouteUnlocked, performAction, recoverInTown, resetJourney, returnToTown, selectRoute, sellItem, setFormationFront, setLanguage, setTarget, startRoute, useTonic, withdrawFromBattle } from "./engine.mjs";
import { clearGame, loadGame, saveGame } from "./storage.mjs";
import { getQuestProgress, isQuestUnlocked } from "./quests.mjs";

if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
}

let state = loadGame() || createInitialState();
const notice = document.querySelector("#notice");
const title = document.querySelector("#screen-title");
const eyebrow = document.querySelector("#screen-eyebrow");
const phaseLabel = document.querySelector("#phase-label");
const guideLayer = document.querySelector("#guide-layer");
const $ = (selector) => document.querySelector(selector);
let guideOpen = !state.onboardingSeen;
let guideStep = 0;
let guideTrigger = null;
const ui = {
  activeWindow: null,
  selectedUnitId: state.formationFrontId || state.party[0]?.id || "mara",
  selectedGroup: "all",
  pendingCommand: null,
  unitZones: {},
  mapZoom: 1,
  tradeEnabled: false,
  peaceMode: true,
  chatLines: []
};
if (state.phase === "victory" || state.phase === "defeat") ui.activeWindow = "results";
const label = (english, indonesian = english) => state.language === "id" ? indonesian : english;
const GUIDE_STEPS = [
  { kicker: "01 · GET READY", title: "Start from Hearthcross.", copy: "Hire a trail scout from Crew, check your pack and buy supplies at the Town Exchange. A ration is needed for every trip." },
  { kicker: "02 · PICK A ROAD", title: "Choose a route.", copy: "Select an open card on the travel board. Clear the Courier's Mark on Mosswind Road to open Amber Quarry." },
  { kicker: "03 · DIRECT THE CREW", title: "Issue field commands.", copy: "Select a unit or group, then move, attack, hold or stop. You can also withdraw. Battle timing and source-game key mappings are not verified for this prototype." },
  { kicker: "04 · CLOSE THE LEDGER", title: "Bring your gains home.", copy: "After victory, return to Hearthcross to recover. Sell trade cargo, prepare again and continue. Your journey saves on this device." }
];
const STATIC_LABELS = {
  en: {
    "local.journey": "LOCAL JOURNEY", "town.name": "HEARTHCROSS", "currency.marks": "MARKS", "guide.how": "HOW TO PLAY",
    "ledger.yours": "YOUR LEDGER", "tab.journey": "Journey", "tab.market": "Town Exchange", "tab.crew": "Crew", "tab.pack": "Pack",
    "tab.journal": "Journal", "tab.preferences": "Preferences", "day.label": "DAY", "prototype.label": "ORIGINAL PROTOTYPE",
    "errand.active": "ACTIVE ERRAND", "crew.yours": "YOUR CREW", "log.field": "FIELD LOG", "action.open": "OPEN",
    "action.reset": "Start a new journey", "action.guideReplay": "Replay the quick guide", "footer.brandline": "Prototype balance · original artwork · browser save",
    "footer.save": "Progress saves on this device.", "footer.scope": "Prototype values are not source-game balance."
  },
  id: {
    "local.journey": "JURNAL LOKAL", "town.name": "HEARTHCROSS", "currency.marks": "MARK", "guide.how": "CARA BERMAIN",
    "ledger.yours": "BUKU PERJALANAN", "tab.journey": "Perjalanan", "tab.market": "Bursa Kota", "tab.crew": "Awak", "tab.pack": "Bekal",
    "tab.journal": "Jurnal", "tab.preferences": "Preferensi", "day.label": "HARI", "prototype.label": "PROTOTIPE ORISINAL",
    "errand.active": "TUGAS AKTIF", "crew.yours": "AWAKMU", "log.field": "CATATAN LAPANGAN", "action.open": "BUKA",
    "action.reset": "Mulai perjalanan baru", "action.guideReplay": "Buka ulang panduan singkat", "footer.brandline": "Keseimbangan prototipe · ilustrasi orisinal · simpanan browser",
    "footer.save": "Progres tersimpan di perangkat ini.", "footer.scope": "Nilai prototipe bukan acuan keseimbangan game sumber."
  }
};
const UI_PHRASES = [
  ["Language and controls", "Bahasa dan kontrol"], ["SAVED HERE", "TERSIMPAN"], ["SESSION ONLY", "SESI SAJA"],
  ["HEARTHCROSS · TOWN EXCHANGE", "HEARTHCROSS · BURSA KOTA"], ["HEARTHCROSS · YOUR CREW", "HEARTHCROSS · AWAKMU"],
  ["TRAVEL KIT · PACK", "PERLENGKAPAN JALAN · BEKAL"], ["TRAVEL KIT · CARRY LIMIT 20 EACH", "PERLENGKAPAN JALAN · BATAS BAWA 20 TIAP BARANG"], ["FIELD NOTES · LEDGER", "CATATAN LAPANGAN · BUKU PERJALANAN"],
  ["FIELD NOTES · CHAPTER 01", "CATATAN LAPANGAN · BAB 01"], ["FIELD NOTES · DAY ", "CATATAN LAPANGAN · HARI "],
  ["Progress saves on this device.", "Progres tersimpan di perangkat ini."],
  ["Prototype balance · original artwork · browser save", "Keseimbangan prototipe · ilustrasi orisinal · simpanan browser"],
  ["Prototype values are not source-game balance.", "Nilai prototipe bukan acuan keseimbangan game sumber."],
  ["HOME BASE · DAY ", "MARKAS · HARI "], ["NORTH GATE", "GERBANG UTARA"], ["MARKET WARD", "KAWASAN PASAR"], ["ISSUE AN ORDER", "BERI PERINTAH"],
  ["ROUTES CLEARED", "RUTE SELESAI"], ["ROUTE CLEARED", "RUTE SELESAI"], ["CREW READY", "AWAK SIAP"], ["CREW NEEDED", "AWAK DIPERLUKAN"], ["OPEN", "TERBUKA"],
  ["Travel partner", "Rekan perjalanan"], ["VIEW YOUR CREW", "LIHAT AWAKMU"], ["VISIT THE HIRING BOARD", "KUNJUNGI PAPAN REKRUTMEN"],
  ["Pack for the road", "Siapkan bekal"], ["Every item has a purpose.", "Setiap barang punya kegunaan."],
  ["Use a Field Tonic to restore the crew member who needs it most.", "Gunakan Field Tonic untuk memulihkan anggota awak yang paling membutuhkan."],
  ["ITEMS", "BARANG"], ["YOUR PACK", "BEKALMU"], ["Supplies and cargo", "Perbekalan dan muatan"], ["RATIONS", "RANSUM"],
  ["QUANTITY", "JUMLAH"], ["EQUIPPED", "DIPAKAI"], ["SUPPLY", "PERBEKALAN"], ["QUEST", "MISI"], ["EQUIP", "PASANG"], ["UNEQUIP", "LEPAS"], ["USE", "GUNAKAN"], ["UNLOCKS AFTER", "TERBUKA SETELAH"], ["IS COMPLETED", "DISELESAIKAN"],
  ["QUEST JOURNAL · CURRENT OBJECTIVES", "JURNAL MISI · TUJUAN SAAT INI"], ["Active contracts", "Kontrak aktif"], ["VIEW JOURNEY", "LIHAT PERJALANAN"],
  ["RECENT ENTRIES", "CATATAN TERBARU"], ["NOTES", "CATATAN"],
  ["A journey is made of small decisions.", "Perjalanan terbentuk dari keputusan kecil."],
  ["Every order, purchase and discovery is recorded here on this device.", "Setiap perintah, pembelian, dan temuan dicatat di perangkat ini."],
  [" in pack · ", " di bekal · "], [" required", " diperlukan"], [" restores vitality", " memulihkan daya tahan"],
  ["The road is still active. Using a tonic spends your crew order and the raiders will respond.", "Perjalanan masih berlangsung. Menggunakan tonik memakai giliran awak dan para perampok akan membalas."],
  ["ROUTE INTERRUPTED", "PERJALANAN TERHENTI"], ["RECOVER IN HEARTHCROSS", "PULIHKAN DI HEARTHCROSS"],
  ["ERRAND DELIVERED", "TUGAS DIANTARKAN"], ["PREPARE YOUR CREW", "SIAPKAN AWAKMU"],
  ["GET READY", "SIAPKAN DIRI"], ["PICK A ROAD", "PILIH JALUR"], ["DIRECT THE CREW", "ATUR AWAK"], ["CLOSE THE LEDGER", "TUTUP PEMBUKUAN"],
  ["FIELD GUIDE", "PANDUAN SINGKAT"], ["Start from Hearthcross.", "Mulai dari Hearthcross."], ["Choose a route.", "Pilih rute."],
  ["Choose a target, then act.", "Pilih sasaran, lalu bertindak."], ["Bring your gains home.", "Bawa pulang hasilmu."],
  ["Hire a trail scout from Crew, check your pack and buy supplies at the Town Exchange. A ration is needed for every trip.", "Rekrut penjelajah jalur dari Awak, periksa bekalmu, lalu beli perbekalan di Bursa Kota. Setiap perjalanan memerlukan satu ransum."],
  ["Select an open card on the travel board. Clear the Courier&#39;s Mark on Mosswind Road to open Amber Quarry.", "Pilih kartu yang tersedia di papan rute. Selesaikan Courier&#39;s Mark di Mosswind Road untuk membuka Amber Quarry."],
  ["Front position sets who opens. The rear line softens incoming damage. Strike builds focus, Brace protects the front, and Wayfarer&#39;s Arc spends two focus.", "Posisi depan menentukan siapa yang memulai giliran. Barisan belakang mengurangi serangan yang diterima. Serang menambah fokus, Bertahan melindungi posisi depan, dan Wayfarer&#39;s Arc memakai dua fokus."],
  ["After victory, return to Hearthcross to recover. Sell trade cargo, prepare again and continue. Your journey saves on this device.", "Setelah menang, kembali ke Hearthcross untuk memulihkan awak. Jual muatan dagang, bersiaplah, lalu lanjutkan perjalanan. Perjalananmu tersimpan di perangkat ini."],
  ["CLICK OUTSIDE TO CLOSE · REPLAY FROM THE TOP BAR", "KLIK DI LUAR UNTUK MENUTUP · BUKA ULANG DARI BILAH ATAS"],
  ["Close quick guide", "Tutup panduan singkat"], ["Replay the quick guide", "Buka ulang panduan singkat"], ["SKIP GUIDE", "LEWATI PANDUAN"], ["CONTINUE", "LANJUTKAN"], ["BACK", "KEMBALI"], ["FINISH GUIDE", "SELESAIKAN PANDUAN"],
  ["Illustrated encounter on ", "Pertarungan di "], [" · TURN ", " · GILIRAN "],
  ["DOWN", "TUMBANG"], ["TARGET", "SASARAN"], ["SELECT", "PILIH"], ["VITALITY", "DAYA TAHAN"], ["ENCOUNTER", "PERTARUNGAN"],
  ["Hold the road.", "Pertahankan jalan."], ["Choose a target, then strike, brace or spend focus on a technique.", "Pilih sasaran, lalu serang, bertahan, atau gunakan fokus untuk mengaktifkan teknik."],
  ["OPPONENTS · SELECT A TARGET", "LAWAN · PILIH SASARAN"], ["FORMATION", "FORMASI"], ["WEAPON · ", "SENJATA · "], ["STRIKE", "SERANG"],
  ["Strike damage", "daya serang"], [" leads; the rear line reduces incoming damage by 2.", " memimpin; barisan belakang mengurangi kerusakan yang diterima sebesar 2."],
  ["Tarin opens · Mara follows", "Tarin memulai · Mara mengikuti"], ["Mara leads · Tarin follows", "Mara memimpin · Tarin mengikuti"],
  ["Deal ", "Berikan "], [" damage · gain ", " kerusakan · dapatkan "], ["Soften a hit · scout follows", "Tahan serangan · penjelajah menyusul"],
  ["Area technique · costs 2 focus", "Teknik area · gunakan 2 fokus"], ["USE FIELD TONIC", "GUNAKAN FIELD TONIC"], [" IN PACK", " DI BEKAL"],
  ["1 ration used", "1 ransum digunakan"], ["reward currency", "mata uang hadiah"], ["full resale value", "nilai jual kembali penuh"],
  [" M remaining", " M tersisa"], ["reward + sold cargo − ration", "hadiah + muatan terjual − ransum"],
  ["Cargo value excludes quest items. Only cargo sold from this trip changes the net proceeds.", "Nilai muatan tidak mencakup barang misi. Hanya muatan dari perjalanan ini yang terjual akan mengubah hasil bersih."],
  [" marks", " mark"], ["reputation", "reputasi"], ["focus", "fokus"], ["FOCUS", "FOKUS"], ["REAR", "BELAKANG"],
  ["ROUTE CLEARED · REWARD SECURED", "RUTE SELESAI · HADIAH DIAMANKAN"], ["Close the errand", "Tutup tugas"],
  ["Visit the Town Exchange to sell the recovered cargo, or review the crew and pack before another journey.", "Kunjungi Bursa Kota untuk menjual muatan, atau periksa awak dan bekal sebelum perjalanan berikutnya."],
  ["The crew falls back.", "Awak mundur."], ["No reward was recovered from ", "Tidak ada hadiah yang diperoleh dari "],
  [". Rest in Hearthcross, replace the ration, then choose your route again.", ". Beristirahat di Hearthcross, ganti ransum, lalu pilih kembali rute."],
  ["LAST TRIP · ", "PERJALANAN TERAKHIR · "],
  ["HEARTHCROSS · MARKET WARD", "HEARTHCROSS · KAWASAN PASAR"], ["Good routes begin with good terms.", "Perjalanan baik dimulai dengan transaksi yang tepat."],
  ["Buy the supplies you need. Sell trade goods after your return.", "Beli perbekalan yang kamu butuhkan. Jual barang dagangan setelah kembali."],
  ["LOCAL<br>EXCHANGE", "BURSA<br>LOKAL"], ["Original prototype quotes; not copied from any live game.", "Harga prototipe orisinal; tidak disalin dari game lain."],
  ["Trade note", "Catatan dagang"], ["The parcel route rewards cargo that can be sold here. Keep a ration in your pack before another trip.", "Rute kurir memberi barang muatan yang bisa dijual di sini. Simpan satu ransum di bekal sebelum berangkat lagi."],
  ["Buy one ", "Beli satu "], ["Sell one ", "Jual satu "], ["Held: ", "Dimiliki: "],
  ["HEARTHCROSS · WORKBENCH", "HEARTHCROSS · BENGKEL"],
  ["HEARTHCROSS · HIRING BOARD", "HEARTHCROSS · PAPAN REKRUTMEN"], ["Travel light. Watch each other&#39;s backs.", "Bepergianlah dengan ringan. Saling jaga satu sama lain."],
  ["Set the front member before you leave. Formation changes turn order and how the crew screens incoming hits.", "Atur anggota di posisi depan sebelum berangkat. Formasi menentukan urutan giliran dan cara awak melindungi anggota dari serangan."],
  ["CREW SLOTS", "SLOT AWAK"], ["MEMBERS", "ANGGOTA"], ["MOVE TO FRONT", "PINDAHKAN KE DEPAN"], ["FRONT", "DEPAN"],
  ["WEAPON SLOT", "SLOT SENJATA"], ["Empty", "Kosong"], ["Equip a blade from your pack.", "Pasang senjata dari bekalmu."],
  ["Prototype rule: the front member takes the first attack and opens the crew turn. The rear member takes 2 less damage from screened hits.", "Aturan prototipe: anggota di posisi depan menerima serangan pertama dan memulai giliran awak. Anggota di posisi belakang menerima 2 poin lebih sedikit dari serangan yang tertahan formasi."],
  ["AVAILABLE FOR HIRE", "TERSEDIA UNTUK DIREKRUT"], ["TRAIL SCOUT", "PENJELAJAH JALUR"],
  ["Knows the ridge paths. Adds a follow-up strike and keeps an eye on the crew&#39;s supplies.", "Hafal jalur punggung bukit. Ia memberi satu serangan susulan dan membantu mengawasi perbekalan awak."],
  ["CONTRACT", "KONTRAK"], ["IN YOUR CREW", "SUDAH DI AWAK"], ["HIRE SCOUT", "REKRUT PENJELAJAH"],
  ["HEARTHCROSS · PLAYER SETTINGS", "HEARTHCROSS · PENGATURAN PEMAIN"], ["Make the journey yours.", "Atur perjalananmu."],
  ["Choose the interface language and the combat input that suit you.", "Pilih bahasa antarmuka dan kontrol pertempuran sesuai keinginanmu."],
  ["LOCAL SETTINGS", "PENGATURAN LOKAL"], ["LOCAL<br>SETTINGS", "PENGATURAN<br>LOKAL"], ["DISPLAY", "TAMPILAN"], ["COMBAT INPUT", "KONTROL PERTEMPURAN"],
  ["Interface language", "Bahasa antarmuka"], ["You can still choose an order with the on-screen buttons.", "Kamu tetap dapat memilih perintah melalui tombol di layar."],
  ["Preferences save with this local journey and stay on this device.", "Pengaturan tersimpan bersama perjalanan lokal ini di perangkat ini."],
  ["Combat number shortcuts disabled.", "Pintasan angka untuk pertempuran dimatikan."],
  ["Combat number shortcuts enabled.", "Pintasan angka untuk pertempuran diaktifkan."],
  ["REGION CHART · HEARTHCROSS", "PETA WILAYAH · HEARTHCROSS"], ["The Ridgeway", "Jalur Pegunungan"],
  ["Choose an open location to see its errand.", "Pilih lokasi terbuka untuk melihat tugasnya."],
  ["Region map with route choices", "Peta wilayah dengan pilihan rute"], ["locked", "terkunci"], ["selected", "dipilih"],
  ["cleared", "dituntaskan"], ["open", "terbuka"],
  ["Goods and provisions", "Barang dan perbekalan"], ["A small crew, well chosen", "Awak kecil, pilihan tepat"],
  ["The journey so far", "Perjalanan sejauh ini"], ["What you carry", "Barang bawaan"], ["A road opens", "Jalan terbuka"],
  ["Make for the caravan", "Produksi untuk karavan"], ["Settlement ledger", "Ringkasan hasil perjalanan"],
  ["Choose today&#39;s route", "Pilih rute hari ini"], ["SELECTED ROUTE", "RUTE PILIHAN"], ["TRAVEL BOARD", "PAPAN RUTE"],
  ["FIELD NOTES", "CATATAN LAPANGAN"], ["ACTIVE FORMATION", "FORMASI AKTIF"], ["Road crew", "Awak perjalanan"],
  ["Available goods", "Barang tersedia"], ["YOUR ORDER", "PERINTAHMU"],
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
  ["ACTIVE ERRAND", "TUGAS AKTIF"], ["Active errand", "Tugas aktif"], ["ACTIVE CONTRACTS", "KONTRAK AKTIF"], ["QUEST JOURNAL", "JURNAL MISI"], ["CURRENT", "SAAT INI"], ["UPCOMING", "BERIKUTNYA"], ["IN PROGRESS", "BERJALAN"], ["DONE", "SELESAI"],
  ["BEFORE YOU LEAVE", "SEBELUM BERANGKAT"], ["Pack for the road", "Siapkan bekal"], ["TRAVEL PARTNER", "REKAN PERJALANAN"],
  ["DAILY BOARD · PROTOTYPE QUOTES", "PAPAN HARGA · NILAI PROTOTIPE"], ["GOOD", "BARANG"], ["BUY", "BELI"], ["SELL", "JUAL"],
  ["MARKS", "MARK"], ["LOCKED", "TERKUNCI"], ["AVAILABLE", "TERSEDIA"], ["COMPLETED", "SELESAI"], ["CLEARED", "DITUNTASKAN"],
  ["SELECTED", "DIPILIH"], ["SET OUT AGAIN", "BERANGKAT LAGI"], ["BEGIN THE JOURNEY", "MULAI PERJALANAN"], ["MAKE", "BUAT"],
  ["Strike", "Serang"], ["Brace", "Bertahan"], ["TURN", "GILIRAN"], ["ACTIVE", "AKTIF"], ["RETURN TO HEARTHCROSS", "KEMBALI KE HEARTHCROSS"]
].sort((a, b) => b[0].length - a[0].length);
const COMPLETE_UI_PHRASES = UI_PHRASES.filter(([english]) => english.length >= 45);
const PRESERVED_GAME_COPY = [
  ...ROUTES.flatMap((route) => [route.name, route.title, route.summary, route.terrain, route.encounter, route.foeLabel, route.coordinate, route.opening, route.victoryTitle, route.victoryCopy, route.recovery]),
  ...QUESTS.flatMap((quest) => [quest.title, quest.summary, ...quest.stages.map((stage) => stage.label)]),
  ...ITEMS.flatMap((item) => [item.name, item.detail])
].filter(Boolean).map(safe).sort((a, b) => b.length - a.length);

function localizeUI(value) {
  if (state.language !== "id") return value;
  let localized = String(value);
  const preservedSegments = [];
  const preserve = (segment) => {
    if (!segment || !localized.includes(segment)) return;
    const marker = "\uE000" + preservedSegments.length + "\uE001";
    preservedSegments.push(segment);
    localized = localized.replaceAll(segment, marker);
  };
  localized = localized.replace(/<([a-z][\w-]*)\b[^>]*\bdata-locale-preserve\b[^>]*>[\s\S]*?<\/\1>/gi, (segment) => {
    const marker = "\uE000" + preservedSegments.length + "\uE001";
    preservedSegments.push(segment);
    return marker;
  });
  for (const [english, indonesian] of COMPLETE_UI_PHRASES) localized = localized.replaceAll(english, indonesian);
  for (const segment of PRESERVED_GAME_COPY) preserve(segment);
  for (const [english, indonesian] of UI_PHRASES) {
    const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordStart = /^[A-Za-z0-9_]/.test(english) ? "\\b" : "";
    const wordEnd = /[A-Za-z0-9_]$/.test(english) ? "\\b" : "";
    localized = localized.replace(new RegExp(wordStart + escaped + wordEnd, "g"), indonesian);
  }
  return localized.replace(/\uE000(\d+)\uE001/g, (_, index) => preservedSegments[Number(index)]);
}
function localizeNotice(value) {
  const message = String(value || "");
  if (state.language !== "id") return message;
  const selectedRoute = ROUTES.find((route) => message === route.name + " selected for the next journey.");
  if (selectedRoute) return selectedRoute.name + " dipilih untuk perjalanan berikutnya.";
  const trade = message.match(/^(Bought|Sold) (\d+) × (.+) for (\d+) marks?\.$/);
  if (trade) return (trade[1] === "Bought" ? "Membeli " : "Menjual ") + trade[2] + " × " + trade[3] + " seharga " + trade[4] + " mark.";
  return localizeUI(message);
}
function applyStaticLabels() {
  const labels = STATIC_LABELS[state.language] || STATIC_LABELS.en;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const label = labels[element.dataset.i18n];
    if (label) element.textContent = label;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const label = labels[element.dataset.i18nAria];
    if (label) element.setAttribute("aria-label", label);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const label = labels[element.dataset.i18nTitle];
    if (label) element.setAttribute("title", label);
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
function renderTravelMap() {
  const paths = ROUTE_LINKS.map((link) => {
    const from = findRoute(link.from).mapPosition;
    const to = findRoute(link.to).mapPosition;
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - 13;
    return '<path d="M ' + from.x + ' ' + from.y + ' Q ' + midX + ' ' + midY + ' ' + to.x + ' ' + to.y + '" />';
  }).join("");
  const nodes = ROUTES.map((route, index) => {
    const unlocked = isRouteUnlocked(state, route.id);
    const selected = state.selectedRoute === route.id;
    const completed = (state.completedRoutes || []).includes(route.id);
    const status = !unlocked ? "LOCKED" : completed ? "CLEARED" : selected ? "SELECTED" : "OPEN";
    const accessibleStatus = localizeUI(status.toLowerCase());
    return '<button type="button" class="map-node ' + (selected ? "selected" : "") + (!unlocked ? " locked" : "") + (completed ? " completed" : "") + '" data-route="' + route.id + '" style="left:' + route.mapPosition.x + '%;top:' + route.mapPosition.y + '%" aria-label="' + safe(route.name + ", " + accessibleStatus) + '" aria-pressed="' + selected + '" ' + (!unlocked ? "disabled" : "") + '><span class="map-node-number">0' + (index + 1) + '</span><span class="map-node-copy"><strong>' + safe(route.name) + '</strong><small>' + status + '</small></span></button>';
  }).join("");
  return '<div class="travel-map" role="group" aria-label="Region map with route choices"><div class="travel-map-head"><small>REGION CHART · HEARTHCROSS</small><strong>The Ridgeway</strong><span>Choose an open location to see its errand.</span></div><div class="map-canvas"><svg class="map-trails" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="map-river" d="M 3 81 Q 26 67 41 75 T 67 60 T 96 52" />' + paths + '</svg>' + nodes + '<span class="map-compass" aria-hidden="true">N<br>↑</span></div></div>';
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
    '<section class="route-board panel"><div class="panel-head"><div><small>TRAVEL BOARD · ' + (state.completedRoutes || []).length + ' ROUTE' + ((state.completedRoutes || []).length === 1 ? "" : "S") + ' CLEARED</small><h2>Choose today&#39;s route</h2></div><span class="status-pill">' + ROUTES.filter((entry) => isRouteUnlocked(state, entry.id)).length + ' AVAILABLE</span></div>' + renderTravelMap() + '<div class="route-options">' +
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
    '<div class="combat-parties"><div class="battle-party">' + state.party.map((unit) => '<div class="battle-unit ' + (unit.id === state.formationFrontId ? "front-unit" : "rear-unit") + '"><img src="./' + portrait(unit.id) + '" alt=""><span>' + safe(unit.name.split(" ")[0]) + '</span><small>' + (unit.id === state.formationFrontId ? "FRONT" : "REAR") + '</small><span class="battle-vitality">HP ' + Math.max(0, unit.hp) + '/' + unit.maxHp + '</span>' + bar(unit.hp, unit.maxHp, "health") + '</div>').join("") + '</div><div class="battle-enemies">' +
    battle.enemies.map((enemy) => '<div class="battle-foe ' + (enemy.hp <= 0 ? "gone" : "") + '"><img src="./' + portrait(enemy.id) + '" alt=""><span>' + safe(enemy.name.split(" ")[1]) + '</span></div>').join("") + '</div></div>' +
    '<div class="scene-bottom battle-caption"><div><small>ENCOUNTER</small><h2>Hold the road.</h2><p>Choose a target, then strike, brace or spend focus on a technique.</p></div><span class="turn-badge">TURN ' + battle.turn + '</span></div></section>' +
    '<section class="combat-panel"><div class="panel-head"><div><small>OPPONENTS · SELECT A TARGET</small><h2>' + safe(route.foeLabel) + '</h2></div><span class="status-pill alert-pill">' + battle.enemies.filter((enemy) => enemy.hp > 0).length + ' ACTIVE</span></div>' +
    '<div class="enemy-row ' + (battle.enemies.length === 1 ? "single-enemy" : "") + '">' + enemies + '</div><div class="formation-effect-note"><span>FORMATION</span> ' + safe(state.party.find((unit) => unit.id === state.formationFrontId)?.name || "Mara") + ' leads; the rear line reduces incoming damage by 2. <span class="gear-effect">WEAPON · ' + safe(weapon?.name || "UNARMED") + ' · STRIKE ' + strikeDamage + '</span></div><div class="combat-orders"><div class="orders-label"><small>YOUR ORDER</small><span>' + (state.formationFrontId === "scout" ? "Tarin opens · Mara follows" : "Mara leads · Tarin follows") + ' · ' + (state.combatShortcutsEnabled ? "Keys: 1 · 2 · 3" : "Keyboard shortcuts are off") + '</span></div>' +
    '<button class="order-button" type="button" data-action="strike"><span class="order-key">1</span><span><strong>Strike</strong><small>Deal ' + strikeDamage + ' damage · gain 1 focus</small></span><b>↗</b></button>' +
    '<button class="order-button" type="button" data-action="brace"><span class="order-key">2</span><span><strong>Brace</strong><small>Soften a hit · scout follows</small></span><b>◇</b></button>' +
    '<button class="order-button skill-order" type="button" data-action="technique" ' + (state.party[0].focus < 2 ? "disabled" : "") + '><span class="order-key">3</span><span><strong>Wayfarer&#39;s Arc</strong><small>Area technique · costs 2 focus</small></span><b>✦</b></button></div>' +
    '<button class="supply-action" type="button" data-action="use-tonic" ' + (state.inventory.tonic < 1 || state.party.every((unit) => unit.hp === unit.maxHp) ? "disabled" : "") + '>USE FIELD TONIC <span>' + state.inventory.tonic + ' IN PACK</span></button></section>';
}
function renderCompactObjective() {
  const route = findRoute(state.phase === "battle" || state.phase === "victory" || state.phase === "defeat" ? state.activeRoute : state.selectedRoute);
  const progress = getQuestProgress(state, route.questId);
  if (!progress) return "";
  const total = progress.totalStages;
  const completed = progress.completedCount;
  const step = progress.currentStage?.label || (progress.complete ? "ERRAND DELIVERED" : "PREPARE YOUR CREW");
  return '<section class="compact-objective" aria-label="Active errand"><div class="compact-objective-copy"><small>ACTIVE ERRAND</small><strong>' + safe(progress.quest.title) + '</strong><span>' + safe(progress.quest.summary) + '</span></div><div class="compact-objective-progress"><div class="objective-progress"><span style="width:' + (total ? Math.round((completed / total) * 100) : 0) + '%"></span></div><small>' + safe(step) + '</small><b>' + completed + ' / ' + total + '</b></div></section>';
}
function renderVictory() {
  const route = findRoute(state.activeRoute);
  const cargo = Object.entries(route.reward.items).map(([itemId, quantity]) => {
    const item = ITEMS.find((entry) => entry.id === itemId);
    return '<span><i>' + safe(item?.glyph || "◆") + '</i>' + quantity + ' ' + safe(item?.name || itemId) + '</span>';
  }).join("");
  return '<section class="result-card victory-card"><div class="result-emblem">✓</div><small>ROUTE CLEARED · REWARD SECURED</small><h2>' + safe(route.victoryTitle) + '</h2><p>' + safe(route.victoryCopy) + '</p><div class="reward-row"><span><i>＋</i>' + route.reward.coin + ' marks</span>' + cargo + '<span><i>✦</i>' + route.reward.reputation + ' reputation</span></div>' +
    '<button class="primary-button" type="button" data-action="return-town"><span>RETURN TO HEARTHCROSS</span><b>→</b></button></section><section class="panel result-notes"><div class="panel-head"><div><small>FIELD NOTES</small><h2>Close the errand</h2></div><span class="round-seal">01</span></div><p>Visit the Town Exchange to sell the recovered cargo, or review the crew and pack before another journey.</p><div class="mini-log">' +
    state.log.slice(0, 2).map((entry) => '<span>· ' + safe(localizeNotice(entry)) + '</span>').join("") + '</div></section>';
}
function renderDefeat() {
  const route = findRoute(state.activeRoute);
  return '<section class="result-card defeat-card"><div class="result-emblem">↶</div><small>ROUTE INTERRUPTED</small><h2>The crew falls back.</h2><p>No reward was recovered from ' + safe(route.name) + '. Rest in Hearthcross, replace the ration, then choose your route again.</p><button class="primary-button" type="button" data-action="recover"><span>RECOVER IN HEARTHCROSS</span><b>→</b></button></section>';
}
function renderJourney() {
  const compactStatus = renderCompactObjective();
  if (state.phase === "battle") return compactStatus + renderBattle();
  if (state.phase === "victory") return compactStatus + renderVictory();
  if (state.phase === "defeat") return compactStatus + renderDefeat();
  return compactStatus + renderTown();
}
function renderMarket() {
  const tradeItems = ITEMS.filter((item) => item.buyPrice !== null || item.sellPrice !== null);
  return '<section class="market-banner"><div><small>HEARTHCROSS · MARKET WARD</small><h2>Good routes begin with good terms.</h2><p>Buy the supplies you need. Sell trade goods after your return.</p></div><span class="market-stamp">LOCAL<br>EXCHANGE</span></section>' +
    '<section class="panel market-panel"><div class="panel-head"><div><small>DAILY BOARD · PROTOTYPE QUOTES</small><h2>Available goods</h2></div><span class="status-pill">MARKS ' + state.coin + '</span></div><div class="market-table"><div class="market-header"><span>GOOD</span><span>BUY</span><span>SELL</span><span>PACK</span><span></span></div>' +
    tradeItems.map((item) => '<div class="market-row"><div class="good-cell"><span class="item-glyph ' + item.kind + '-glyph">' + item.glyph + '</span><span><strong data-locale-preserve>' + safe(item.name) + '</strong><small data-locale-preserve>' + safe(item.detail) + '</small></span></div><span class="quote buy-quote">' + (item.buyPrice === null ? "—" : item.buyPrice) + '<small> M</small></span><span class="quote sell-quote">' + (item.sellPrice === null ? "—" : item.sellPrice) + '<small> M</small></span><span class="pack-count market-pack">' + (state.inventory[item.id] || 0) + '</span><span class="trade-actions">' +
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
    return '<article class="inventory-card"><span class="item-glyph ' + item.kind + '-glyph">' + item.glyph + '</span><div class="inventory-copy"><strong data-locale-preserve>' + safe(item.name) + '</strong><small data-locale-preserve>' + safe(item.detail) + '</small><span class="inventory-quantity">' + (equipped ? "EQUIPPED" : "QUANTITY") + ' <b>' + (equipped ? "WEAPON SLOT" : quantity) + '</b></span></div>' + actions + '</article>';
  }).join("");
  return '<section class="pack-banner"><div><small>TRAVEL KIT · CARRY LIMIT 20 EACH</small><h2>Every item has a purpose.</h2><p>Use a Field Tonic to restore the crew member who needs it most.</p></div><span class="pack-total">' + total + '<small>ITEMS</small></span></section>' +
    '<section class="panel pack-panel"><div class="panel-head"><div><small>YOUR PACK</small><h2>Supplies and cargo</h2></div><span class="status-pill">' + state.inventory.ration + ' RATIONS</span></div><div class="inventory-grid">' +
    itemCards + '</div>' +
    (state.phase === "battle" ? '<div class="pack-battle-note">The road is still active. Using a tonic spends your crew order and the raiders will respond.</div>' : '') + '</section>';
}
function renderQuestJournal() {
  const cards = QUESTS.map((quest) => {
    const progress = getQuestProgress(state, quest.id);
    const unlocked = isQuestUnlocked(state, quest.id);
    const status = !unlocked ? "LOCKED" : progress.complete ? "COMPLETED" : progress.completedCount ? "IN PROGRESS" : "AVAILABLE";
    const statusClass = !unlocked ? "locked" : progress.complete ? "complete" : progress.completedCount ? "progress" : "available";
    const stages = unlocked ? '<ol class="quest-stage-list">' + progress.stages.map((stage, index) => {
      const current = !stage.complete && progress.currentStage?.id === stage.id;
      const stageStatus = stage.complete ? "DONE" : current ? "CURRENT" : "UPCOMING";
      const stageClass = stage.complete ? "complete" : current ? "current" : "upcoming";
      return '<li class="quest-stage ' + stageClass + '" ' + (current ? 'aria-current="step"' : "") + '><span class="quest-stage-index">' + (stage.complete ? "✓" : String(index + 1).padStart(2, "0")) + '</span><span class="quest-stage-copy"><strong>' + safe(stage.label) + '</strong><small>' + stageStatus + '</small></span></li>';
    }).join("") + '</ol>' : '<div class="quest-locked-note"><span>◈</span><span>UNLOCKS AFTER ' + quest.requiresQuests.map((questId) => findQuest(questId)?.title).filter(Boolean).map((title) => '<strong>' + safe(title) + '</strong>').join(" · ") + ' IS COMPLETED</span></div>';
    return '<article class="quest-journal-card ' + statusClass + '"><div class="quest-journal-heading"><div><small>CONTRACT · ' + safe(findRoute(quest.routeId).name.toUpperCase()) + '</small><h3>' + safe(quest.title) + '</h3><p>' + safe(quest.summary) + '</p></div><span class="quest-status-pill ' + statusClass + '">' + status + '</span></div>' + stages + '</article>';
  }).join("");
  return '<section class="panel quest-journal-panel"><div class="panel-head"><div><small>QUEST JOURNAL · CURRENT OBJECTIVES</small><h2>Active contracts</h2></div><button type="button" class="text-button" data-tab="journey">VIEW JOURNEY →</button></div><div class="quest-journal-list">' + cards + '</div></section>';
}
function renderJournal() {
  return renderSettlement() + '<section class="journal-banner"><div><small>FIELD NOTES · DAY ' + String(state.day).padStart(2, "0") + '</small><h2>A journey is made of small decisions.</h2><p>Every order, purchase and discovery is recorded here on this device.</p></div><span class="journal-seal">≋</span></section>' + renderQuestJournal() +
    '<section class="panel journal-panel"><div class="panel-head"><div><small>RECENT ENTRIES</small><h2>Ledger</h2></div><span class="status-pill">' + state.log.length + ' NOTES</span></div><div class="journal-list">' +
    state.log.map((entry, index) => '<article><span class="journal-index">' + String(state.log.length - index).padStart(2, "0") + '</span><i></i><p>' + safe(localizeNotice(entry)) + '</p></article>').join("") + '</div></section>';
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
    '<section class="panel preferences-panel"><div class="preference-row"><div class="preference-copy"><small>' + label("DISPLAY", "TAMPILAN") + '</small><h3>' + label("Choose an interface language", "Pilih bahasa antarmuka") + '</h3><p>' + label("Common interface labels change language. Story and item descriptions remain in English.", "Label antarmuka utama berubah sesuai bahasa. Cerita dan deskripsi barang tetap dalam bahasa Inggris.") + '</p></div><div class="language-options" role="group" aria-label="' + label("Interface language", "Bahasa antarmuka") + '"><button type="button" data-language-option="en" class="' + (language === "en" ? "selected" : "") + '" aria-pressed="' + (language === "en") + '">English</button><button type="button" data-language-option="id" class="' + (language === "id" ? "selected" : "") + '" aria-pressed="' + (language === "id") + '">Bahasa Indonesia</button></div></div>' +
    '<div class="preference-row"><div class="preference-copy"><small>' + label("CONTROLS", "KONTROL") + '</small><h3>' + label("Pointer and touch commands", "Perintah dengan penunjuk dan sentuhan") + '</h3><p>' + label("Use the on-screen controls. Xian key mappings and battle timing remain unverified for this prototype.", "Gunakan kontrol di layar. Pemetaan tombol dan waktu pertempuran Xian belum terverifikasi untuk prototipe ini.") + '</p></div><span class="status-pill">' + label("KEYS UNVERIFIED", "TOMBOL BELUM TERVERIFIKASI") + '</span></div>' +
    '<p class="preferences-note">' + label("Preferences save with this local journey and stay on this device.", "Preferensi tersimpan bersama perjalanan lokal ini di perangkat ini.") + '</p></section>';
}
function renderRouteWindow() {
  const route = findRoute(state.selectedRoute);
  const hasScout = state.party.some((unit) => unit.id === "scout");
  const canSetOut = hasScout && state.inventory.ration > 0 && isRouteUnlocked(state, route.id);
  return '<section class="route-window"><div class="window-intro"><small>' + label("REGION CHART · PROTOTYPE LOCATIONS", "PETA WILAYAH · LOKASI PROTOTIPE") + '</small><h2>' + label("Choose a road", "Pilih jalan") + '</h2><p>' + label("Select a route, review its errand, then set out from Hearthcross.", "Pilih rute, tinjau tugasnya, lalu berangkat dari Hearthcross.") + '</p></div>' + renderTravelMap() +
    '<div class="route-options">' + ROUTES.map((entry, index) => {
      const available = isRouteUnlocked(state, entry.id);
      const selected = route.id === entry.id;
      const routeDone = (state.completedRoutes || []).includes(entry.id);
      return '<button type="button" class="route-card ' + (selected ? "selected" : "") + (!available ? " locked" : "") + '" data-route="' + entry.id + '" aria-pressed="' + selected + '" ' + (!available ? "disabled" : "") + '><span class="route-number">0' + (index + 1) + '</span><span class="route-card-copy"><small>' + safe(entry.terrain) + '</small><strong>' + safe(entry.name) + '</strong><span>' + safe(entry.summary) + '</span></span><span class="route-card-status">' + (!available ? label("LOCKED", "TERKUNCI") : routeDone ? label("CLEARED", "SELESAI") : selected ? label("SELECTED", "DIPILIH") : label("OPEN", "TERBUKA")) + '</span></button>';
    }).join("") + '</div><div class="route-departure"><span>' + label("Selected route", "Rute pilihan") + ': <strong>' + safe(route.name) + '</strong> · ' + (state.inventory.ration > 0 ? label("ration ready", "ransum tersedia") : label("buy a ration first", "beli ransum dahulu")) + '</span><button class="primary-button" type="button" data-action="start" ' + (canSetOut ? "" : "disabled") + '><span>' + label("SET OUT", "BERANGKAT") + '</span><b>→</b></button></div></section>';
}
function renderStatusWindow() {
  const hp = state.party.reduce((total, unit) => total + unit.hp, 0);
  const maxHp = state.party.reduce((total, unit) => total + unit.maxHp, 0);
  const attack = state.party.reduce((total, unit) => total + (unit.id === "mara" ? 14 : 7), 0) + (findItem(state.equipment?.weapon)?.strikeBonus || 0);
  return '<section class="status-window"><div class="status-metrics"><div><small>' + label("LEVEL", "NIVEL") + '</small><strong>01</strong></div><div><small>' + label("STAMINA", "STAMINA") + '</small><strong>' + Math.round((hp / Math.max(1, maxHp)) * 100) + '%</strong></div><div><small>' + label("TOTAL ATTACK", "TOTAL SERANGAN") + '</small><strong>' + attack + '</strong></div><div><small>' + label("CREDIT LEVEL", "TINGKAT KREDIT") + '</small><strong>01</strong></div><div><small>' + label("MONEY", "UANG") + '</small><strong>' + state.coin + ' M</strong></div></div><p class="prototype-note">' + label("Prototype-only values. They do not reproduce Xian character formulas.", "Nilai khusus prototipe. Angka ini tidak menyalin rumus karakter Xian.") + '</p><div class="status-party">' + state.party.map((unit) => unitCard(unit, false)).join("") + '</div></section>';
}
function renderPropertyWindow() {
  return '<section class="property-window"><div class="window-intro"><small>' + label("HEARTHCROSS · PROPERTY & LEDGER", "HEARTHCROSS · PROPERTI & BUKU") + '</small><h2>' + label("Local holdings", "Aset lokal") + '</h2><p>' + label("This original prototype tracks your coin and the results of each completed route.", "Prototipe orisinal ini mencatat uang dan hasil dari setiap rute yang selesai.") + '</p></div>' +
    (renderSettlement() || '<div class="empty-window">' + label("No settlement recorded yet. Complete a route to add an entry.", "Belum ada catatan hasil. Selesaikan rute untuk menambahkan catatan.") + '</div>') +
    '<div class="property-summary"><span>' + label("CURRENT FUNDS", "DANA SAAT INI") + '</span><strong>' + state.coin + ' M</strong><small>' + label("Prototype marks", "Mark prototipe") + '</small></div></section>';
}
function renderCommunityWindow() {
  return '<section class="community-window"><div class="window-intro"><small>' + label("TOWN BOARD · LOCAL ONLY", "PAPAN KOTA · LOKAL") + '</small><h2>' + label("Messages from Hearthcross", "Pesan dari Hearthcross") + '</h2><p>' + label("This is a local prototype board. It does not connect to other players or send messages online.", "Ini papan prototipe lokal. Papan ini tidak terhubung dengan pemain lain dan tidak mengirim pesan ke internet.") + '</p></div><div class="notice-board"><article><b>⌂</b><span><strong>' + label("Exchange Keeper", "Penjaga Bursa") + '</strong><small>' + label("Supplies and trade are available in the shop window.", "Perbekalan dan perdagangan tersedia di jendela toko.") + '</small></span></article><article><b>♙</b><span><strong>' + label("Route Steward", "Pengelola Rute") + '</strong><small>' + label("Open the region chart to choose your next road.", "Buka peta wilayah untuk memilih jalan berikutnya.") + '</small></span></article></div></section>';
}
function renderPortraitRail() {
  return state.party.map((unit, index) => {
    const active = ui.selectedUnitId === unit.id;
    return '<button type="button" class="portrait-slot ' + (active ? "selected" : "") + '" data-unit-select="' + unit.id + '" aria-label="' + safe(unit.name) + ', ' + safe(unit.role) + ', ' + Math.max(0, unit.hp) + ' of ' + unit.maxHp + (state.phase === "battle" ? "" : ", open inventory") + '" aria-pressed="' + active + '"><span class="portrait-index">' + (index + 1) + '</span><img src="' + portrait(unit.id) + '" alt=""><strong>' + safe(unit.name.split(" ")[0]) + '</strong><span class="portrait-role">' + safe(unit.role) + '</span>' + bar(unit.hp, unit.maxHp, "health") + '</button>';
  }).join("") + '<button type="button" class="portrait-add" data-window="character" aria-label="' + label("Open character and mercenary window", "Buka jendela karakter dan pengawal") + '">＋<small>' + state.party.length + '/' + PARTY_LIMIT + '</small></button>';
}
function renderOverview() {
  const hp = state.party.reduce((total, unit) => total + unit.hp, 0);
  const maxHp = state.party.reduce((total, unit) => total + unit.maxHp, 0);
  const attack = state.party.reduce((total, unit) => total + (unit.id === "mara" ? 14 : 7), 0) + (findItem(state.equipment?.weapon)?.strikeBonus || 0);
  return '<div class="overview-heading">' + label("PROTOTYPE VALUES · LOCAL", "NILAI PROTOTIPE · LOKAL") + '</div><div class="overview-cell"><small>' + label("LEVEL", "NIVEL") + '</small><strong>01</strong></div><div class="overview-cell"><small>' + label("STAMINA", "STAMINA") + '</small><strong>' + Math.round((hp / Math.max(1, maxHp)) * 100) + '%</strong></div><div class="overview-cell"><small>' + label("ATTACK", "SERANGAN") + '</small><strong>' + attack + '</strong></div><div class="overview-cell"><small>' + label("CREDIT", "KREDIT") + '</small><strong>01</strong></div><div class="overview-cell money-cell"><small>' + label("MONEY", "UANG") + '</small><strong>' + state.coin + '<i> M</i></strong></div>';
}
function renderMenu() {
  const inBattle = state.phase === "battle";
  const menu = [
    ["inventory", "▤", label("Inventory", "Inventaris")],
    ["status", "◉", label("Status", "Status")],
    ["property", "⌂", label("Property", "Properti")],
    ["character", "♙", label("Character", "Karakter")],
    ["quest", "✦", label("Quest", "Misi")],
    ["community", "☷", label("Community", "Komunitas")],
    ["system", "⚙", label("System", "Sistem")]
  ];
  return menu.map(([name, glyph, titleText]) => '<button type="button" class="client-menu-button" data-window="' + name + '" aria-label="' + titleText + '" title="' + titleText + '"><span>' + glyph + '</span><small>' + titleText + '</small></button>').join("") +
    '<button type="button" class="client-menu-button state-toggle" data-action="toggle-peace" aria-pressed="' + ui.peaceMode + '"><span>◈</span><small>' + (ui.peaceMode ? label("Peace", "Penuh") : label("Battle", "Siaga")) + '</small></button>' +
    '<button type="button" class="client-menu-button state-toggle" data-action="toggle-trade" aria-pressed="' + ui.tradeEnabled + '"><span>⇄</span><small>' + label("Trade", "Dagang") + ' ' + (ui.tradeEnabled ? "ON" : "OFF") + '</small></button>';
}
function renderChatFeed() {
  const lines = [...ui.chatLines.slice(-2).map((entry) => ({ text: entry, type: "local" })), ...state.log.slice(0, 2).map((entry) => ({ text: localizeNotice(entry), type: "event" }))];
  return lines.map((entry) => '<div class="chat-line ' + entry.type + '"><i></i><span>' + safe(entry.text) + '</span></div>').join("") || '<div class="chat-line"><i></i><span>' + label("The road is quiet.", "Jalan sedang tenang.") + '</span></div>';
}
function renderTownHotspots() {
  return '<div class="town-hotspots"><button type="button" class="npc-hotspot route-hotspot" data-window="travel"><span class="npc-medallion">⌖</span><small>' + label("ROUTE STEWARD", "PENGELOLA RUTE") + '</small><strong>' + label("Region chart", "Peta wilayah") + '</strong></button>' +
    '<button type="button" class="npc-hotspot market-hotspot" data-window="market"><span class="npc-medallion">¤</span><small>' + label("EXCHANGE KEEPER", "PENJAGA BURSA") + '</small><strong>' + label("Shop & provisions", "Toko & bekal") + '</strong></button>' +
    '<button type="button" class="npc-hotspot crew-hotspot" data-window="character"><span class="npc-medallion">♙</span><small>' + label("RECRUITMENT BOARD", "PAPAN REKRUTMEN") + '</small><strong>' + label("Meet the crew", "Temui awak") + '</strong></button></div>';
}
function renderMiniMap() {
  const activeRoute = findRoute(state.phase === "battle" ? state.activeRoute : state.selectedRoute);
  const zoom = Math.max(0, Math.min(2, ui.mapZoom));
  return '<aside class="mini-map" aria-label="' + label("Original local map", "Peta lokal orisinal") + '"><div class="map-title"><span>' + label("AREA MAP", "PETA AREA") + '</span><button type="button" data-action="map-zoom" data-delta="-1" aria-label="' + label("Zoom out", "Perkecil") + '">−</button><button type="button" data-action="map-zoom" data-delta="1" aria-label="' + label("Zoom in", "Perbesar") + '">＋</button></div><div class="map-disc zoom-' + zoom + '"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M12 70 Q28 57 40 63T68 43T91 29" /><path class="map-branch" d="M40 63 Q48 76 74 83" /></svg><i class="map-marker home"></i><i class="map-marker current"></i><i class="map-marker destination"></i><span class="map-north">N</span></div><button type="button" class="map-location" data-window="travel">' + safe(activeRoute.name) + ' <span>↗</span></button></aside>';
}
function renderBattlefield() {
  const battle = state.battle;
  const route = findRoute(battle?.routeId || state.activeRoute);
  const zones = { west: { left: 25, top: 53 }, center: { left: 39, top: 59 }, east: { left: 52, top: 52 } };
  const party = state.party.map((unit, index) => {
    const zone = ui.unitZones[unit.id] || (index === 0 ? "west" : "center");
    const pos = zones[zone] || zones.west;
    const selected = unit.id === ui.selectedUnitId;
    const memberGroup = unit.id === state.formationFrontId ? "front" : "rear";
    const groupSelected = ui.selectedGroup === "all" || ui.selectedGroup === memberGroup;
    return '<button type="button" class="battle-token party-token ' + (selected ? "selected" : "") + (groupSelected ? " in-group" : "") + '" style="left:' + pos.left + '%;top:' + pos.top + '%" data-unit-select="' + unit.id + '" aria-pressed="' + selected + '"><img src="' + portrait(unit.id) + '" alt=""><strong>' + safe(unit.name.split(" ")[0]) + '</strong><small>' + Math.max(0, unit.hp) + '/' + unit.maxHp + '</small></button>';
  }).join("");
  const enemies = (battle?.enemies || []).map((enemy, index) => {
    const selected = battle.targetId === enemy.id;
    const left = 67 + (index % 2) * 14;
    const top = index > 1 ? 56 : 35;
    return '<button type="button" class="battle-token enemy-token ' + (selected ? "selected" : "") + (enemy.hp <= 0 ? " defeated" : "") + '" style="left:' + left + '%;top:' + top + '%" data-target="' + enemy.id + '" ' + (enemy.hp <= 0 ? "disabled" : "") + '><img src="' + portrait(enemy.id) + '" alt=""><strong>' + safe(enemy.name.split(" ")[0]) + '</strong><small>' + Math.max(0, enemy.hp) + '/' + enemy.maxHp + '</small>' + bar(enemy.hp, enemy.maxHp, "enemy-health") + '</button>';
  }).join("");
  const destinations = ui.pendingCommand === "move" ? '<div class="move-destinations"><span>' + label("Choose a prototype position", "Pilih posisi prototipe") + '</span>' + ["west", "center", "east"].map((zone) => '<button type="button" data-action="move-to" data-zone="' + zone + '">' + label(zone.toUpperCase(), zone === "west" ? "BARAT" : zone === "center" ? "TENGAH" : "TIMUR") + '</button>').join("") + '</div>' : "";
  const target = battle?.enemies.find((enemy) => enemy.id === battle.targetId && enemy.hp > 0);
  return '<div class="battlefield-view"><div class="battle-scene-title"><small>' + safe(route.name.toUpperCase()) + ' · ' + label("PROTOTYPE ENCOUNTER", "PERTEMUAN PROTOTIPE") + '</small><strong>' + safe(route.encounter) + '</strong><span>' + label("Round", "Ronde") + ' ' + (battle?.turn || 1) + '</span></div><div class="battle-lanes" aria-label="' + label("Battlefield positions", "Posisi medan tempur") + '"><span class="lane-label left">' + label("CREW", "AWAK") + '</span><span class="lane-label right">' + label("OPPONENTS", "LAWAN") + '</span></div>' + party + enemies + destinations +
    '<section class="battle-command-deck"><div class="command-deck-top"><div><small>' + label("BATTLEFIELD COMMANDS", "PERINTAH MEDAN TEMPUR") + '</small><span>' + label("Selected", "Dipilih") + ': ' + safe(state.party.find((unit) => unit.id === ui.selectedUnitId)?.name || state.party[0].name) + (target ? ' · ' + label("Target", "Sasaran") + ': ' + safe(target.name) : "") + '</span></div><span class="prototype-tag">' + label("PROTOTYPE TIMING", "WAKTU PROTOTIPE") + '</span></div><div class="group-select"><span>' + label("SELECT GROUP", "PILIH KELOMPOK") + '</span>' + [["all", label("All", "Semua")], ["front", label("Front", "Depan")], ["rear", label("Support", "Pendukung")]].map(([id, text]) => '<button type="button" data-action="select-group" data-group="' + id + '" class="' + (ui.selectedGroup === id ? "selected" : "") + '" aria-pressed="' + (ui.selectedGroup === id) + '">' + text + '</button>').join("") + '</div><div class="command-row">' +
    '<button type="button" class="command-button" data-action="move"><b>↗</b><span>' + label("Move", "Bergerak") + '</span></button><button type="button" class="command-button" data-action="attack" ' + (!target ? "disabled" : "") + '><b>⚔</b><span>' + label("Attack", "Serang") + '</span></button><button type="button" class="command-button" data-action="hold"><b>⬟</b><span>' + label("Hold", "Tahan") + '</span></button><button type="button" class="command-button" data-action="stop"><b>■</b><span>' + label("Stop", "Berhenti") + '</span></button><button type="button" class="command-button withdraw-command" data-action="withdraw"><b>↶</b><span>' + label("Withdraw", "Mundur") + '</span></button></div><p class="battle-note">' + label("Click an opponent to target it. Move repositions a selected unit; Attack and Hold advance the original prototype combat turn. No Xian key or timing claim is made.", "Klik lawan untuk memilih sasaran. Bergerak memindahkan posisi unit; Serang dan Tahan melanjutkan giliran tempur prototipe. Tidak ada klaim tombol atau waktu Xian.") + '</p></section></div>';
}
function renderWorldScene() {
  const inBattle = state.phase === "battle";
  const onRoad = ["battle", "victory", "defeat"].includes(state.phase);
  const route = findRoute(onRoad ? state.activeRoute : state.selectedRoute);
  const area = onRoad ? route.name : "Hearthcross";
  const theme = onRoad ? (route.id === "amber-quarry" ? "quarry-scene" : "road-scene") : "town-scene";
  const caption = inBattle ? label("Command your crew in the encounter.", "Berikan perintah kepada awak dalam pertempuran.") :
    onRoad ? label("The field report is ready. Return to town to continue.", "Laporan perjalanan siap. Kembali ke kota untuk melanjutkan.") :
      label("Visit a town character or choose a road to continue.", "Temui warga kota atau pilih jalan untuk melanjutkan.");
  return '<section class="world-scene ' + theme + (inBattle ? " in-battle" : "") + '" aria-label="' + safe(area) + ' ' + label("world scene", "pemandangan dunia") + '"><div class="scene-vignette"></div><div class="scene-coordinate">' + (inBattle ? safe(route.coordinate) : label("NORTH GATE · MARKET WARD", "GERBANG UTARA · KAWASAN PASAR")) + '</div><div class="scene-location"><small>' + (inBattle ? label("BATTLEFIELD", "MEDAN TEMPUR") : label("FIELD · TOWN", "LAPANGAN · KOTA")) + ' · ' + label("DAY", "HARI") + ' ' + String(state.day).padStart(2, "0") + '</small><h1>' + safe(area) + '</h1><p>' + caption + '</p></div>' +
    (inBattle ? renderBattlefield() : renderTownHotspots()) +
    '<div class="scene-bottomline"><span>' + (inBattle ? label("Local encounter · original prototype rules", "Pertemuan lokal · aturan prototipe orisinal") : label("Original local setting · prototype values", "Latar lokal orisinal · nilai prototipe")) + '</span><span>' + label("LOCAL SAVE", "SIMPANAN LOKAL") + '</span></div></section>';
}
function renderWindowContent(name) {
  if (name === "travel") return renderRouteWindow();
  if (name === "market") return renderMarket();
  if (name === "character") return renderRoster();
  if (name === "inventory") return renderInventory();
  if (name === "status") return renderStatusWindow();
  if (name === "property") return renderPropertyWindow();
  if (name === "quest") return renderQuestJournal();
  if (name === "community") return renderCommunityWindow();
  if (name === "system") return renderPreferences();
  if (name === "results") return state.phase === "victory" ? renderVictory() : renderDefeat();
  return "";
}
function renderClientWindow() {
  const name = ui.activeWindow || ((state.phase === "victory" || state.phase === "defeat") ? "results" : null);
  const root = $("#client-window-root");
  if (!root) return;
  if (!name) { root.innerHTML = ""; return; }
  const titles = {
    travel: label("World map · route chart", "Peta dunia · pilihan rute"),
    market: label("Town shop · Hearthcross", "Toko kota · Hearthcross"),
    character: label("Character & mercenaries", "Karakter & pengawal"),
    inventory: label("Inventory · party pack", "Inventaris · bekal awak"),
    status: label("Overview and status", "Ringkasan dan status"),
    property: label("Property and ledger", "Properti dan buku"),
    quest: label("Quest information", "Informasi misi"),
    community: label("Community · local board", "Komunitas · papan lokal"),
    system: label("System settings", "Pengaturan sistem"),
    results: state.phase === "victory" ? label("Encounter complete", "Pertemuan selesai") : label("Crew retreat", "Awak mundur")
  };
  const isResult = name === "results";
  root.innerHTML = '<div class="window-scrim"><section class="client-window ' + (name === "market" ? "shop-window" : "") + '" role="dialog" aria-modal="true" aria-labelledby="client-window-title"><header class="window-titlebar"><span class="window-mark" aria-hidden="true">◇</span><h2 id="client-window-title">' + titles[name] + '</h2>' + (isResult ? '' : '<button type="button" class="window-close" data-action="close-window" aria-label="' + label("Close window", "Tutup jendela") + '">×</button>') + '</header><div class="window-content" id="game-content">' + localizeUI(renderWindowContent(name)) + '</div></section></div>';
}
function openWindow(name) {
  if (state.phase === "battle" && ["travel", "market", "character", "property"].includes(name)) return;
  const tabNames = { travel: "journey", market: "market", character: "roster", inventory: "inventory", status: "roster", property: "journal", quest: "journal", community: "journal", system: "preferences" };
  if (tabNames[name]) state = changeTab(state, tabNames[name]);
  ui.activeWindow = name;
  render();
}
function closeGuide() {
  guideOpen = false;
  guideStep = 0;
  state = { ...state, onboardingSeen: true };
  render();
  const focusTarget = guideTrigger || $(".guide-replay");
  guideTrigger = null;
  focusTarget?.focus?.();
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
    '<button type="button" class="guide-next" data-action="' + (last ? "onboarding-close" : "onboarding-next") + '" data-guide-next>' + (last ? "FINISH GUIDE" : "CONTINUE") + '<span>→</span></button></div><div class="guide-note">CLICK OUTSIDE TO CLOSE · REPLAY FROM THE TOP BAR</div></section></div>';
  guideLayer.innerHTML = localizeUI(guideLayer.innerHTML);
  const next = guideLayer.querySelector?.("[data-guide-next]");
  next?.focus();
}
function render() {
  document.documentElement.lang = state.language || "en";
  applyStaticLabels();
  const mode = state.phase === "battle" ? "battlefield" : (ui.activeWindow === "market" ? "shop" : (state.phase === "victory" || state.phase === "defeat" ? "results" : "field"));
  const heading = mode === "battlefield" ? [label("BATTLEFIELD", "MEDAN TEMPUR"), findRoute(state.activeRoute).name] :
    mode === "shop" ? [label("SHOP", "TOKO"), label("Hearthcross Exchange", "Bursa Hearthcross")] :
    mode === "results" ? [label("FIELD REPORT", "LAPORAN LAPANGAN"), label("Encounter results", "Hasil pertemuan")] :
    [label("FIELD · TOWN", "LAPANGAN · KOTA"), "Hearthcross"];
  $("#screen-eyebrow").textContent = heading[0];
  $("#screen-title").textContent = heading[1];
  $("#phase-label").innerHTML = '<span class="status-pip ' + (mode === "battlefield" ? "danger-pip" : "") + '"></span>' + heading[0];
  $("#day-count").textContent = String(state.day).padStart(2, "0");
  $("#portrait-rail").innerHTML = renderPortraitRail();
  $("#world-content").innerHTML = renderWorldScene();
  $("#mini-map-root").innerHTML = renderMiniMap();
  $("#overview-strip").innerHTML = renderOverview();
  $("#client-menu").innerHTML = renderMenu();
  $("#chat-feed").innerHTML = renderChatFeed();
  notice.textContent = localizeNotice(state.notice);
  notice.classList.toggle("show", Boolean(state.notice));
  renderClientWindow();
  renderGuide();
  const saved = saveGame(state);
  $("#save-state").innerHTML = '<span class="save-dot ' + (saved ? "" : "save-warning") + '"></span>' + label(saved ? " SAVED HERE" : " SESSION ONLY", saved ? " TERSIMPAN" : " SESI SAJA");
  document.body.dataset.phase = state.phase;
  document.body.dataset.mode = mode;
}
function transition(next) {
  const previousPhase = state.phase;
  state = next;
  if (state.phase === "victory" || state.phase === "defeat") ui.activeWindow = "results";
  else if (previousPhase !== "battle" && state.phase === "battle") ui.activeWindow = null;
  else if (previousPhase === "battle" && state.phase !== "battle") {
    ui.activeWindow = null;
    ui.pendingCommand = null;
  }
  render();
}

document.addEventListener("click", (event) => {
  const guideAction = event.target.closest('[data-action^="onboarding-"]');
  if (guideOpen && !guideAction) {
    const backdrop = event.target.closest(".guide-backdrop");
    if (backdrop && !event.target.closest(".guide-dialog")) {
      closeGuide();
    }
    return;
  }
  const unitButton = event.target.closest("[data-unit-select]");
  if (unitButton) {
    ui.selectedUnitId = unitButton.dataset.unitSelect;
    if (state.phase === "town") openWindow("inventory");
    else render();
    return;
  }
  const formationButton = event.target.closest("[data-formation-front]");
  if (formationButton) { transition(setFormationFront(state, formationButton.dataset.formationFront)); return; }
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) { transition(selectRoute(state, routeButton.dataset.route)); return; }
  const targetButton = event.target.closest("[data-target]");
  if (targetButton) { transition(setTarget(state, targetButton.dataset.target)); return; }
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  if (button.dataset.languageOption) { transition(setLanguage(state, button.dataset.languageOption)); return; }
  if (button.dataset.window) { openWindow(button.dataset.window); return; }
  if (button.dataset.tab) {
    const tabWindow = { journey: "travel", market: "market", roster: "character", inventory: "inventory", journal: "quest", preferences: "system" };
    openWindow(tabWindow[button.dataset.tab] || "travel");
    return;
  }
  const action = button.dataset.action;
  if (!action) return;
  if (action === "start") transition(startRoute(state));
  else if (action === "hire") transition(hireScout(state));
  else if (action === "buy") transition(buyItem(state, button.dataset.item));
  else if (action === "craft") transition(craftRecipe(state, button.dataset.recipe));
  else if (action === "equip") transition(equipItem(state, button.dataset.item));
  else if (action === "unequip") transition(equipItem(state, null));
  else if (action === "sell") transition(sellItem(state, button.dataset.item));
  else if (action === "use-tonic") transition(useTonic(state));
  else if (action === "strike" || action === "attack") transition(performAction(state, "strike"));
  else if (action === "brace" || action === "hold") transition(performAction(state, "brace"));
  else if (action === "technique") transition(performAction(state, action));
  else if (action === "move") { ui.pendingCommand = "move"; state.notice = label("Choose a position for the selected unit.", "Pilih posisi untuk unit yang dipilih."); render(); }
  else if (action === "move-to") {
    ui.unitZones[ui.selectedUnitId] = button.dataset.zone;
    ui.pendingCommand = null;
    const unitName = state.party.find((unit) => unit.id === ui.selectedUnitId)?.name || label("Selected unit", "Unit terpilih");
    state.notice = unitName + (state.language === "id" ? " dipindahkan ke posisi " + (button.dataset.zone === "west" ? "barat" : button.dataset.zone === "center" ? "tengah" : "timur") + ". Posisi dan waktu tempur hanya untuk prototipe." : " repositioned to the " + button.dataset.zone + " position. Prototype positioning only; battle timing is unverified.");
    render();
  }
  else if (action === "stop") { ui.pendingCommand = null; state.notice = label("The selected unit's pending order has stopped.", "Perintah tertunda untuk unit terpilih dihentikan."); render(); }
  else if (action === "select-group") { ui.selectedGroup = button.dataset.group; render(); }
  else if (action === "withdraw") transition(withdrawFromBattle(state));
  else if (action === "toggle-peace") { ui.peaceMode = !ui.peaceMode; render(); }
  else if (action === "toggle-trade") { ui.tradeEnabled = !ui.tradeEnabled; render(); }
  else if (action === "map-zoom") { ui.mapZoom = Math.max(0, Math.min(2, ui.mapZoom + Number(button.dataset.delta || 0))); render(); }
  else if (action === "close-window") { if (ui.activeWindow !== "results") { ui.activeWindow = null; render(); } }
  else if (action === "return-town") transition(returnToTown(state));
  else if (action === "recover") transition(recoverInTown(state));
  else if (action === "onboarding-replay") { guideTrigger = button; guideStep = 0; guideOpen = true; render(); }
  else if (action === "onboarding-next") { guideStep = Math.min(guideStep + 1, GUIDE_STEPS.length - 1); render(); }
  else if (action === "onboarding-back") { guideStep = Math.max(guideStep - 1, 0); render(); }
  else if (action === "onboarding-close") closeGuide();
  else if (action === "reset" && window.confirm("Start a fresh journey? This clears only this game's save on this device.")) {
    clearGame();
    state = resetJourney();
    ui.activeWindow = null;
    ui.selectedUnitId = state.formationFrontId;
    ui.selectedGroup = "all";
    ui.pendingCommand = null;
    ui.unitZones = {};
    ui.chatLines = [];
    guideTrigger = button;
    guideStep = 0;
    guideOpen = true;
    render();
  }
});
document.addEventListener("submit", (event) => {
  if (event.target?.id !== "local-chat-form") return;
  event.preventDefault();
  const input = event.target.querySelector('[name="chat-message"]');
  const message = String(input?.value || "").trim().slice(0, 160);
  if (!message) return;
  ui.chatLines.push(message);
  ui.chatLines = ui.chatLines.slice(-4);
  event.target.reset?.();
  render();
});
document.addEventListener("keydown", (event) => {
  if (guideOpen && event.key === "Escape") {
    event.preventDefault();
    closeGuide();
    return;
  }
  if (guideOpen) {
    if (event.key === "Tab") {
      const focusable = [...(guideLayer.querySelectorAll?.('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])') || [])];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus?.();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus?.();
      }
    }
    return;
  }
  if (event.key === "Escape" && ui.activeWindow && ui.activeWindow !== "results") {
    ui.activeWindow = null;
    render();
  }
});
render();
