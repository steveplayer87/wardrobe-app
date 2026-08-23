// IMPORTANT for future updates: bump CACHE_NAME AND keep this ASSETS list's
// query-string versions in sync with the ones referenced in index.html
// (styles.css / seed-items.js / app.js). Mismatched versions just mean an
// extra network fetch on first load, not breakage — but keeping them in sync
// avoids stale duplicate entries piling up in the cache.
const CACHE_NAME = 'wardrobe-app-v9';
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=20260823d',
  './seed-items.js?v=20260823d',
  './app.js?v=20260823d',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first: always try to get the live version when online (so a fresh
// deploy is visible immediately, not just "next time"). Cache is only used
// when the network request fails, e.g. offline.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
