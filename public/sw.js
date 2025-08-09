// Service Worker for Devine-Moi Pro PWA
const CACHE_NAME = 'devine-moi-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/app.js',
  '/src/styles/main.css',
  '/src/data/wordDatabase.js',
  '/src/modules/core/gameState.js',
  '/src/modules/game/gameLogic.js',
  '/src/modules/game/timer.js',
  '/src/modules/ui/components/SetupScreen.js',
  '/src/modules/ui/components/GameScreen.js',
  '/src/modules/ui/components/ScoresScreen.js',
  '/src/modules/ui/components/AppStatus.js',
  '/src/modules/ui/components/InstallBanner.js',
  '/src/modules/pwa/pwaManager.js',
  '/public/manifest.json',
  // External dependencies (cached from CDN)
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.js'
];

// Install event - cache all resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache the fetched response for future use
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        return new Response(
          '<h1>Mode Hors-Ligne</h1><p>Cette page n\'est pas disponible hors-ligne.</p>',
          {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          }
        );
      })
  );
});

// Background sync for scores
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-scores') {
    event.waitUntil(syncScores());
  }
});

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle partie disponible!',
    icon: '/public/icons/icon-192.png',
    badge: '/public/icons/icon-72.png',
    vibrate: [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification('Devine-Moi Pro', options)
  );
});

// Helper function to sync scores (future feature)
async function syncScores() {
  try {
    const cache = await caches.open(CACHE_NAME);
    // Future implementation: sync local scores with server
    console.log('Scores synced');
  } catch (error) {
    console.error('Sync failed:', error);
  }
}