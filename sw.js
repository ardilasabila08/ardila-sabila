const CACHE_NAME = "cv-pwa-fix";
const urlsToCache = [
  "/",
  "/index.html",
  "/icon-192.png",
  "/icon512.png",
  "/foto.jpeg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
