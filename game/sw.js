const CACHE_NAME = "wayfarers-ledger-shell-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./styles.css",
  "./app.mjs",
  "./data.mjs",
  "./engine.mjs",
  "./quests.mjs",
  "./storage.mjs",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png",
  "./assets/amber-quarry.svg",
  "./assets/coin.svg",
  "./assets/hearthcross.svg",
  "./assets/mark.svg",
  "./assets/mosswind-road.svg",
  "./assets/quarry-warden.svg",
  "./assets/raider.svg",
  "./assets/scout.svg",
  "./assets/skirmisher.svg",
  "./assets/wayfarer.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const shellUrls = APP_SHELL.map((asset) => new URL(asset, self.registration.scope).href);
    // Install the deployed files instead of reusing stale browser HTTP-cache copies.
    await cache.addAll(shellUrls.map((url) => new Request(url, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const oldCaches = await caches.keys();
    await Promise.all(oldCaches
      .filter((name) => name.startsWith("wayfarers-ledger-shell-") && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);
  const scopeUrl = new URL(self.registration.scope);
  if (request.method !== "GET" || requestUrl.origin !== scopeUrl.origin || !requestUrl.pathname.startsWith(scopeUrl.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      // Revalidate online requests so existing installs pick up each deployment.
      const response = await fetch(request, { cache: "no-cache" });
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch {
      const cached = await cache.match(request, { ignoreSearch: true });
      if (cached) return cached;
      if (request.mode === "navigate") {
        const offlinePage = await cache.match(new URL("./index.html", scopeUrl).href);
        if (offlinePage) return offlinePage;
      }
      return new Response("This game file is not available offline yet.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
