const BUILD = "65";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.clients.claim();
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    windows.forEach((client) => {
      client.postMessage({ type: "APP_UPDATED", build: BUILD });
    });
  })());
});

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    try {
      return await fetch(event.request, { cache: "no-store" });
    } catch (err) {
      return Response.error();
    }
  })());
});
