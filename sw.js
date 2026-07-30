const CACHE_NAME = 'kentai-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/auth.html',
  '/promote.html',
  '/upload.html',
  '/item-detail.html',
  '/my-listings.html',
  '/utils.js',
  '/auth.js',
  '/feed.js',
  '/promote.js',
  '/detail.js',
  '/upload.js',
  '/firebase-config.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});
