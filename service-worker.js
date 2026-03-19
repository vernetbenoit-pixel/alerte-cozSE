const CACHE_NAME = 'alerte-pompier-v1';
const urlsToCache = [
  './pompier.html',
  './manifest.json',
  './icon.png' // Assurez-vous d'avoir bien mis une image qui porte ce nom !
];

// Installation du service worker et mise en cache des fichiers
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Fichiers mis en cache avec succès');
        return cache.addAll(urlsToCache);
      })
  );
});

// Récupération des fichiers depuis le cache si le réseau est mauvais
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // On retourne le fichier en cache s'il existe, sinon on va sur internet
        return response || fetch(event.request);
      }
    )
  );
});