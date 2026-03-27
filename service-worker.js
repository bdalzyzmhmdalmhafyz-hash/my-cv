const CACHE_NAME = 'abdulaziz-cv-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './assets/primary_image/profile.png',
    './chatbot.css',
    './husa_center.css',
    './husa_center.html',
    './learning.css',
    './learning.js',
    './learning.html'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching all assets');
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});
