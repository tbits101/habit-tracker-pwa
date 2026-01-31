// Service Worker for Habit Tracker PWA
const CACHE_NAME = 'habit-tracker-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files')
        return cache.addAll(urlsToCache)
      })
      .then(() => {
        console.log('Service Worker: Files cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache files', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated successfully')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Handle API requests differently
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Return cached response if network fails
          return caches.match(event.request)
        })
    )
    return
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone the response since it can only be consumed once
            const responseToCache = response.clone()

            // Cache the fetched resource for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })

            return response
          })
      })
      .catch(() => {
        // Return offline page if both cache and network fail
        if (event.request.destination === 'document') {
          return caches.match('/offline.html')
        }
      })
  )
})

// Background sync for offline habit records
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Sync event triggered', event.tag)
  
  if (event.tag === 'habit-sync') {
    event.waitUntil(syncHabitRecords())
  }
})

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push message received')
  
  const options = {
    body: event.data ? event.data.text() : 'Time to complete your habits!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Habits',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Habit Tracker', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received')
  
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Sync habit records function
async function syncHabitRecords() {
  try {
    console.log('Service Worker: Syncing habit records...')
    
    // Get offline records from IndexedDB
    const offlineRecords = await getOfflineHabitRecords()
    console.log(`Service Worker: Found ${offlineRecords.length} offline records to sync`)
    
    // Sync each record to the server
    for (const record of offlineRecords) {
      try {
        const response = await fetch('/api/habits/record', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(record)
        })
        
        if (response.ok) {
          console.log('Service Worker: Record synced successfully', record.id)
          await removeOfflineRecord(record.id)
        } else {
          console.error('Service Worker: Failed to sync record', record.id, response.statusText)
        }
      } catch (error) {
        console.error('Service Worker: Error syncing record', record.id, error)
      }
    }
    
    console.log('Service Worker: Habit sync completed')
  } catch (error) {
    console.error('Service Worker: Error during habit sync', error)
  }
}

// Helper functions for IndexedDB operations (simplified)
async function getOfflineHabitRecords() {
  // In a real implementation, you'd use IndexedDB here
  // For now, return empty array as placeholder
  return []
}

async function removeOfflineRecord(recordId: string) {
  // In a real implementation, you'd remove from IndexedDB here
  console.log('Service Worker: Removing offline record', recordId)
}