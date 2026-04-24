// Bump this whenever any precached file changes (including questions in index.html).
// See CLAUDE.md §8/§9 and README for the cache-bump rule.
const CACHE = 'stlp-tech-bowl-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './og-preview.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');
  const isFont = url.hostname === 'fonts.googleapis.com' ||
                 url.hostname === 'fonts.gstatic.com';

  if (isHTML) {
    // Network-first so new deploys reach users when they're online;
    // fall back to the cached shell when offline.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  if (isFont) {
    // Stale-while-revalidate for Google Fonts so typography still works offline.
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        const fetching = fetch(req)
          .then((res) => {
            cache.put(req, res.clone()).catch(() => {});
            return res;
          })
          .catch(() => cached);
        return cached || fetching;
      })
    );
    return;
  }

  // Cache-first for same-origin static assets; passthrough for anything else.
  event.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (url.origin === location.origin && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
