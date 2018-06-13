import assets from '../build/asset-manifest.json'
import Dixie from 'dixie'
// importScripts('/__/firebase/5.0.0/firebase-app.js')
// importScripts('/__/firebase/5.0.0/firebase-messaging.js')
// importScripts('/__/firebase/init.js')
//update
const cacheList = {
  assets: 'assets-V6-dev',
  fonts: 'fonts-V1',
}

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

firebase.initializeApp({
  messagingSenderId: '510292739580',
})
const messaging = firebase.messaging()

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheList.assets).then(cache => {
      hydrateDB()
      return cache.addAll([
        '/',
        '/index.html',
        // assets['main.css'],
        // assets['main.js'],
        // '/static/js/bundle.js',
        'https://fonts.googleapis.com/css?family=Roboto:400,700,900',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  if (url.host === 'fonts.gstatic.com') {
    event.respondWith(handleFontRequest(event.request))
    return
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('activate', event => {
  const keys = Object.keys(cacheList).map(k => cacheList[k])
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            console.log(keys.indexOf(cacheName) === -1)
            return keys.indexOf(cacheName) === -1
          })
          .map(cacheName => {
            return caches.delete(cacheName)
          })
      )
    })
  )
})

function handleFontRequest(request) {
  console.log(request)
  return caches.open(cacheList.fonts).then(cache =>
    cache.match(request).then(response => {
      if (response) {
        return response
      }
      return fetch(request).then(fetchedResponse => {
        cache.put(request, fetchedResponse.clone())
        return fetchedResponse
      })
    })
  )
}

messaging.setBackgroundMessageHandler(payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  var notificationTitle = 'Background Message Title'
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

function hydrateDB() {
  const db = new Dixie('worldcup18')
  db.version(1).stores({
    fixtures: 'id, localTeamId, localTeamId, start',
    teams: 'id',
    group: 'id',
  })
  return fetch('https://us-central1-worldcup18-d9408.cloudfunctions.net/dump')
    .then(response => {
      return response.json()
    })
    .then(data => {
      const { fixtures, teams, groups } = data
      return Promise.all([
        db.fixtures.bulkAdd(parseFixtures(fixtures)),
        db.teams.bulkAdd(parseTeams(teams)),
        db.groups.bulkAdd(parseGroups(groups)),
      ])
    })
    .catch(() => console.log('error'))
}

function parseFixtures(fixtures) {
  return fixtures.map(fixture => {
    return {
      id: fixture.id,
      localTeamId: fixture.localTeam.team_id,
      vistiorTeamId: fixture.visitorTeam.team_id,
      start: fixtures.start,
      value: fixtures,
    }
  })
}

function parseTeams(teams) {
  return teams.map(team => {
    return {
      id: team.id,
      value: team,
    }
  })
}

function parseGroups(groups) {
  return groups.map(group => {
    return {
      id: group.id,
      value: group,
    }
  })
}
