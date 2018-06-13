/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__build_asset_manifest_json__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__build_asset_manifest_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__build_asset_manifest_json__);
throw new Error("Cannot find module \"dixie\"");


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
  const db = new __WEBPACK_IMPORTED_MODULE_1_dixie___default.a('worldcup18')
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"main.css":"static/css/main.d0d4a6fe.css","main.css.map":"static/css/main.d0d4a6fe.css.map","main.js":"static/js/main.b91eb9c9.js","main.js.map":"static/js/main.b91eb9c9.js.map"}

/***/ })
/******/ ]);