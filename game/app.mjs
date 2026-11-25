Warning: truncated output (original token count: 15009)
Total output lines: 553

import { ITEMS, PARTY_LIMIT, QUESTS, RECIPES, ROUTE_LINKS, ROUTES, SCOUT_COST, createInitialState, findItem, findRoute, findQuest } from "./data.mjs";
import { buyItem, changeTab, craftRecipe, equipItem, hireScout, isRouteUnlocked, performAction, recoverInTown, resetJourney, returnToTown, selectRoute, sellItem, setCombatShortcutsEnabled, setFormationFront, setLanguage, setTarget, startRoute, useTonic } from "./engine.mjs";
import { clearGame, loadGame, saveGame } from "./storage.mjs";
import { getQuestProgress, isQuestUnlocked } from "./quests.mjs";

if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
}

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
let guideTrigger = null;
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
  document.querySelectorAll("[data-i18…5009 tokens truncated…a-label="Sell one ' + safe(item.name) + '">SELL</button></span></div>').join("") +
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
    '<div class="preference-row"><div class="preference-copy"><small>COMBAT INPUT</small><h3>Combat number shortcuts</h3><p>Use 1, 2 and 3 during combat to issue orders. You can still choose an order with the on-screen buttons.</p></div><button type="button" class="preference-toggle ' + (state.combatShortcutsEnabled ? "enabled" : "") + '" data-action="toggle-shortcuts" aria-pressed="' + state.combatShortcutsEnabled + '">' + (state.language === "id" ? (state.combatShortcutsEnabled ? "AKTIF" : "MATI") : (state.combatShortcutsEnabled ? "ON" : "OFF")) + '</button></div>' +
    '<p class="preferences-note">Preferences save with this local journey and stay on this device.</p></section>';
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
  setHeader(state.activeTab, state.phase);
  navState();
  renderSide();
  notice.textContent = localizeNotice(state.notice);
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
  if (guideOpen && !guideAction) {
    const backdrop = event.target.closest(".guide-backdrop");
    if (backdrop && !event.target.closest(".guide-dialog")) {
      closeGuide();
    }
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
  else if (action === "onboarding-replay") { guideTrigger = button; guideStep = 0; guideOpen = true; render(); }
  else if (action === "onboarding-next") { guideStep = Math.min(guideStep + 1, GUIDE_STEPS.length - 1); render(); }
  else if (action === "onboarding-back") { guideStep = Math.max(guideStep - 1, 0); render(); }
  else if (action === "onboarding-close") closeGuide();
  else if (action === "reset" && window.confirm("Start a fresh journey? This clears only this game's save on this device.")) {
    clearGame();
    state = resetJourney();
    guideTrigger = button;
    guideStep = 0;
    guideOpen = true;
    render();
  }
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
  if (state.phase !== "battle" || !state.combatShortcutsEnabled || event.altKey || event.ctrlKey || event.metaKey) return;
  const orders = { "1": "strike", "2": "brace", "3": "technique" };
  if (!orders[event.key]) return;
  event.preventDefault();
  transition(performAction(state, orders[event.key]));
});
render();
