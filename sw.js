// Endereço antigo: este service worker só se desinstala e recarrega as páginas abertas,
// que então seguem para https://henriquegambin.github.io/propostas/
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(cs => cs.filter(c => c.url.indexOf('/propostas/') !== -1).forEach(c => c.navigate(c.url)))
  );
});
