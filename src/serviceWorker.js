import assets from '../build/asset-manifest.json'
import db from './core/db'
// importScripts('/__/firebase/5.0.0/firebase-app.js')
// importScripts('/__/firebase/5.0.0/firebase-messaging.js')
// importScripts('/__/firebase/init.js')
//update
const cacheList = {
  assets: 'assets-V6-dev',
  fonts: 'fonts-V1',
}

self.addEventListener('install', event => {
  const cachesPromise = caches.open(cacheList.assets).then(cache => {
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
  event.waitUntil(Promise.all([cachesPromise, hydrateDB()]))
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
  return event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
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

function hydrateDB() {
  return fetch('https://us-central1-worldcup18-d9408.cloudfunctions.net/dump')
    .then(response => {
      return response.json()
    })
    .then(data => {
      const { fixtures, teams, groups } = data
      return Promise.all([
        db.fixtures.bulkPut(parseFixtures(fixtures)),
        db.teams.bulkPut(parseTeams(teams)),
        db.groups.bulkPut(parseGroups(groups)),
      ])
    })
    .catch(e => Promise.reject(e))
}

function parseFixtures(fixtures) {
  return fixtures.map(fixture => {
    return {
      id: fixture.fsid,
      localTeamId: fixture.localTeam.team_id,
      visitorTeamId: fixture.visitorTeam.team_id,
      starting_at: fixture.starting_at,
      value: fixture,
    }
  })
}

function parseTeams(teams) {
  return teams.map(team => {
    return {
      id: team.fsid,
      value: team,
    }
  })
}

function parseGroups(groups) {
  return groups.map(group => {
    return {
      id: group.fsid,
      value: group,
    }
  })
}
