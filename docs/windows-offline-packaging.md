# Windows Offline Packaging Decision

**Reviewed:** 19 November 2026  
**Decision:** Keep the game as a static web app and ship an installable Progressive Web App (PWA) as the first Windows offline path.

## Why this fits the current game

The game has no server, account, network service, native Windows API or build-time dependency. Its HTML, JavaScript modules, CSS and original SVG/PNG assets are a small static app; journey state already saves in browser `localStorage`. A PWA manifest supplies install metadata, while a service worker caches the app shell and serves cached files when the network is unavailable. Microsoft Edge documents both the manifest/install model and the service-worker cache pattern for offline support.

The production URL uses HTTPS. The manifest and worker use paths relative to `/great-merchant-research-site/game/`, so GitHub Pages can serve the PWA from the repository subdirectory without taking control of the rest of the site. The worker handles only same-origin `GET` requests inside that scope. It tries the network first to pick up current game releases and falls back to the saved shell when a request fails.

The first install and cache fill need an internet connection. After that, the cached interface and game assets can load offline. The save stays in browser storage for this game origin; it is not synced to another device and can be removed by the player or browser. The PWA does not make an `.exe` installer.

## Options compared

| Option | Fit now | Cost and trade-off |
| --- | --- | --- |
| PWA in Microsoft Edge | **Selected** | Uses the existing web app, requires only a manifest and service worker, and supports offline shell caching. Installation and first cache fill happen online; local save remains browser-profile data. |
| Tauri | Defer | Adds Rust and Windows C++ build tools plus a desktop release pipeline. It renders through WebView2; the current game needs no native integration. Tauri documents an approximately 127 MB WebView2 offline installer option when the runtime cannot be assumed present. |
| Electron | Defer | Bundles a desktop runtime and requires separate packaging/distribution tooling. Electron recommends code signing for distributed desktop applications; the additional binary, build and release work has no current product need. |

Revisit Tauri if the game needs a standalone installer, native file access, OS integration, or a managed desktop update path. Electron remains an option if broad bundled-runtime consistency becomes more important than package size and maintenance.

## Implemented PWA behavior

- `game/manifest.webmanifest` sets a standalone launch, a relative start URL and the game-scoped path.
- `game/assets/app-icon.svg` is the original icon source; raster 192 px and 512 px variants are used by the manifest.
- `game/sw.js` precaches the HTML, app modules, stylesheet, manifest and original game assets; it ignores other origins and out-of-scope paths.
- Online requests refresh the saved response. When the network fails, the worker serves the cached file or the cached game page for navigation.
- `game/app.mjs` registers the worker when the browser supports service workers. The game remains playable in browsers where registration is unavailable.
- `tests/pwa.test.mjs` checks manifest paths, precache file existence, worker installation, online refresh, offline fallback and scope boundaries.

## Release checks

1. Keep the manifest start URL, scope, service-worker registration and asset paths relative to `/game/`.
2. Keep every game shell asset in the `APP_SHELL` list and verify it exists with `node --test tests/*.test.mjs`.
3. Confirm the PWA deployment runs on HTTPS and the GitHub Pages workflow succeeds.
4. On Windows Edge, install from the production page while online, allow the first page load to finish, then test a standalone launch with the network disabled.
5. Test journey save retention after that offline launch. Do not describe the PWA as an `.exe` or as cross-device save sync.

## Official references

- Microsoft Edge: [Get started developing a PWA](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps/how-to/) — manifest metadata, standalone launch and service-worker caching.
- Microsoft Edge: [Store data on the device](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps/how-to/offline) — origin-scoped `localStorage`, Cache API and IndexedDB roles.
- Tauri v2: [Windows installer](https://v2.tauri.app/distribute/windows-installer/) and [prerequisites](https://tauri.app/start/prerequisites/) — WebView2 installation options and Windows build requirements.
- Electron: [Packaging your application](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging) — separate packaging tooling and code-signing considerations.
