const CACHE_NAME = "cv-ardila-final-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json", // Ini harus ada!
  "/icon-192.png",
  "/icon-512.png",
  "/foto.jpeg"
];

// Proses Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching assets...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Proses Aktivasi (Hapus cache lama biar fotonya update)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Proses Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
