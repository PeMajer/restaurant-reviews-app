const staticCacheName = 'restaurant-v10';
const addToCache = [
    '/',
    '/css/styles.css',
    '/js/app.js',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1-600w.jpg'
  ];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(addToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request)
      .then(function (response) {
        if (response) { return response;}

        return fetch(event.request);
      }).catch(function (error) {
          console.log(error);
      })
  );
});