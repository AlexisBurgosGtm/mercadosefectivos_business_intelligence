
var CACHE = 'mercadosefectivosbi5';
const staticAssets = [  
  './index.js',
  './favicon.png',
  './index.html',
   './sw.js',
   './views/viewLogin.js',
   './views/viewInicio.js',
   './views/viewAnalisisMarca.js'
];

self.addEventListener('install', function(evt) {
  console.log('Service worker instalado');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
  
	
});

self.addEventListener('fetch', async evt => {

  return;
  
  var req = evt.request.clone();
  if (navigator.onLine){
    if (req.clone().method == "GET") {
      //evt.respondWith(fromCache(evt.request));
      evt.waitUntil(update(evt.request));
    }
  }else{
    if (req.clone().method == "GET") {
      evt.respondWith(fromCache(evt.request));
      //evt.waitUntil(update(evt.request));
    }
  }
  
  /**
  event.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
   */
  
//carga caché y lo actualiza.. hay que evitar las solicitudes del socket.io
/*
  event.respondWith(
    caches.open(CACHE).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
*/
  
  /* 
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );

  await event.waitUntil(update(event.request));
*/
});


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

async function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request)
        .then(function (response) {
          return cache.put(request, response.clone())
                      .then(function () {
                        //console.log('Cache actualizado');
          return response;
      });
    });
  });
}
    


//registra el tag del background sync
self.addEventListener('ready',async function(swRegistration) {
  return swRegistration.sync.register('sendSalesSync');
});

self.addEventListener('sync', function(event) {
  if (event.tag == 'sendSalesSync') {
    event.waitUntil(dbSendPedidosBackground(GlobalUsuario).then(()=>{funciones.NotificacionPersistent('Enviando pedidos en background','sincronización sw')  }));
  }
});


