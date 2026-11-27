import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const gameRoot = resolve(projectRoot, "game");
const manifest = JSON.parse(readFileSync(resolve(gameRoot, "manifest.webmanifest"), "utf8"));
const workerSource = readFileSync(resolve(gameRoot, "sw.js"), "utf8");
const appShellMatch = workerSource.match(/const APP_SHELL = (\[[\s\S]*?\]);/);
assert.ok(appShellMatch, "service worker must declare its offline app shell");
const appShell = JSON.parse(appShellMatch[1]);

test("PWA metadata, registration and precache entries match the game folder", () => {
  const html = readFileSync(resolve(gameRoot, "index.html"), "utf8");
  const app = readFileSync(resolve(gameRoot, "app.mjs"), "utf8");
  assert.equal(manifest.start_url, "./");
  assert.equal(manifest.scope, "./");
  assert.equal(manifest.display, "standalone");
  assert.match(html, /rel="manifest" href="\.\/manifest\.webmanifest"/);
  assert.match(app, /serviceWorker\.register\("\.\/sw\.js"/);
  assert.match(workerSource, /wayfarers-ledger-shell-v23/);
  assert.ok(appShell.includes("./assets/window-engraving.svg"), "the original window trim is precached for offline use");
  assert.ok(appShell.includes("./assets/hearthcross-field.jpg"), "the original town art must be precached for offline use");
  assert.ok(appShell.includes("./assets/mosswind-road.jpg"), "the original road art must be precached for offline use");
  assert.ok(appShell.includes("./assets/amber-quarry.jpg"), "the original quarry art must be precached for offline use");
  for (const icon of manifest.icons) assert.ok(existsSync(resolve(gameRoot, icon.src.replace(/^\.\//, ""))), icon.src);
  for (const asset of appShell) assert.ok(existsSync(resolve(gameRoot, asset.replace(/^\.\//, ""))), asset);
});

test("service worker precaches the app shell and serves its saved page while offline", async () => {
  const listeners = new Map();
  const records = new Map();
  let online = true;
  let observedFetchCacheMode;
  let observedShellCacheModes = [];
  const cache = {
    async addAll(urls) {
      observedShellCacheModes = urls.map((request) => request.cache);
      for (const request of urls) records.set(request.url, new Response("cached:" + request.url));
    },
    async match(request, options = {}) {
      const url = typeof request === "string" ? request : request.url;
      if (records.has(url)) return records.get(url);
      if (options.ignoreSearch) {
        const target = new URL(url);
        for (const [key, response] of records) {
          const candidate = new URL(key);
          if (candidate.origin === target.origin && candidate.pathname === target.pathname) return response;
        }
      }
      return undefined;
    },
    async put(request, response) { records.set(typeof request === "string" ? request : request.url, response); }
  };
  const cacheNames = new Set();
  cacheNames.add("wayfarers-ledger-shell-v1");
  cacheNames.add("wayfarers-ledger-shell-v21");
  const context = {
    URL,
    Request,
    Response,
    fetch: async (request, options = {}) => {
      if (!online) throw new Error("offline");
      observedFetchCacheMode = options.cache;
      return new Response("network:" + request.url);
    },
    caches: {
      async open(name) { cacheNames.add(name); return cache; },
      async keys() { return [...cacheNames]; },
      async delete(name) { return cacheNames.delete(name); }
    },
    self: {
      registration: { scope: "https://example.test/great-merchant-research-site/game/" },
      clients: { claim: async () => {} },
      skipWaiting: async () => {},
      addEventListener(type, listener) { listeners.set(type, listener); }
    }
  };
  runInNewContext(workerSource, context);

  let installPromise;
  listeners.get("install")({ waitUntil(promise) { installPromise = promise; } });
  await installPromise;
  assert.equal(records.size, appShell.length);
  assert.ok(observedShellCacheModes.every((mode) => mode === "reload"), "new app-shell files bypass the browser HTTP cache");

  let activatePromise;
  listeners.get("activate")({ waitUntil(promise) { activatePromise = promise; } });
  await activatePromise;
  assert.deepEqual([...cacheNames].sort(), ["wayfarers-ledger-shell-v23"]);

  let onlineResponse;
  listeners.get("fetch")({
    request: { method: "GET", url: "https://example.test/great-merchant-research-site/game/styles.css", mode: "no-cors" },
    respondWith(promise) { onlineResponse = promise; }
  });
  assert.match(await (await onlineResponse).text(), /network:.*styles\.css/);
  assert.equal(observedFetchCacheMode, "no-cache", "online files revalidate against the deployed site");
  online = false;

  let responsePromise;
  listeners.get("fetch")({
    request: {
      method: "GET",
      url: "https://example.test/great-merchant-research-site/game/?offline-check=1",
      mode: "navigate"
    },
    respondWith(promise) { responsePromise = promise; }
  });
  const response = await responsePromise;
  assert.equal(response.status, 200);
  assert.match(await response.text(), /cached:https:\/\/example\.test\/great-merchant-research-site\/game\/$/);

  let outOfScopeHandled = false;
  listeners.get("fetch")({
    request: { method: "GET", url: "https://example.test/other/", mode: "navigate" },
    respondWith() { outOfScopeHandled = true; }
  });
  assert.equal(outOfScopeHandled, false);
});
