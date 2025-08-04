const CACHE_NAME = 'nadiecomotu-v1';
const urlsToCache = [
  '/', // GitHub Pages sirve index.html desde aquí
  '/index.html',
  '/login.html',
  '/styles.css',
  '/login.css',
  '/manifest.json',
  '/imagenes/logo.webp',
  '/imagenes/frase.webp',
  '/imagenes/ariel.webp',
  '/imagenes/lesli.webp',
  '/imagenes/yeimi.webp',
  '/imagenes/1.webp',
  '/imagenes/2.webp',
  '/imagenes/3.webp',
  '/video/portada.mp4',
  '/VIDEOS/register.mp4',
  '/videos/login.mp4',
  '/videos/laura1.mp4',
  '/videos/laura3.mp4',
  '/videos/laura4.mp4',
  '/videos/laura5.mp4',
  '/videos/laura6.mp4',
  '/videos/david1.mp4',
  '/videos/david2.mp4',
  '/videos/david3.mp4',
  '/videos/david4.mp4',
  '/videos/david5.mp4',
  '/videos/david6.mp4',
  '/videos/ana1.mp4',
  '/videos/ana2.mp4',
  '/videos/ana3.mp4',
  '/videos/ana4.mp4',
  '/videos/ana5.mp4',
  '/videos/ana6.mp4',
  'https://fonts.googleapis.com/css2?family=Raleway:wght@300;600&display=swap',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// Instala y almacena en caché los archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activa y limpia cachés viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Intercepta todas las peticiones y responde con caché si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
