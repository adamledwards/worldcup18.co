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
//SWv1

importScripts('/__/firebase/5.0.0/firebase-app.js')
importScripts('/__/firebase/5.0.0/firebase-messaging.js')
importScripts('/__/firebase/init.js')

if (!firebase.apps.length) {
  firebase.initializeApp({
    messagingSenderId: '510292739580',
  })
}

const messaging = firebase.messaging()

const cacheList = {
  assets: 'assets-V5',
  fonts: 'fonts-V1',
}

self.addEventListener('install', event => {
  const cachesPromise = caches.open(cacheList.assets).then(cache => {
    return cache.addAll([
      '/',
      __WEBPACK_IMPORTED_MODULE_0__build_asset_manifest_json___default.a['main.css'],
      __WEBPACK_IMPORTED_MODULE_0__build_asset_manifest_json___default.a['main.js'],
      'https://fonts.googleapis.com/css?family=Roboto:400,700,900',
      'https://fonts.googleapis.com/icon?family=Material+Icons',
    ])
  })
  event.waitUntil(cachesPromise)
})

self.addEventListener('fetch', event => {
  if (
    event.request.cache === 'only-if-cached' &&
    event.request.mode !== 'same-origin'
  ) {
    return
  }

  const url = new URL(event.request.url)
  if (url.host === 'fonts.gstatic.com') {
    return event.respondWith(handleFontRequest(event.request))
  }
  return event.respondWith(
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

// function hydrateDB() {
//   return fetch('https://us-central1-worldcup18-d9408.cloudfunctions.net/dump')
//     .then(response => {
//       return response.json()
//     })
//     .then(data => {
//       const { fixtures, teams, groups } = data
//       return Promise.all([
//         db.fixtures.bulkPut(parseFixtures(fixtures)),
//         db.teams.bulkPut(parseTeams(teams)),
//         db.groups.bulkPut(parseGroups(groups)),
//       ])
//     })
//     .catch(e => Promise.reject(e))
// }

// function parseFixtures(fixtures) {
//   return fixtures.map(fixture => {
//     return {
//       id: fixture.fsid,
//       localTeamId: fixture.localTeam.team_id,
//       visitorTeamId: fixture.visitorTeam.team_id,
//       starting_at: fixture.starting_at,
//       value: fixture,
//     }
//   })
// }

// function parseTeams(teams) {
//   return teams.map(team => {
//     return {
//       id: team.fsid,
//       value: team,
//     }
//   })
// }

// function parseGroups(groups) {
//   return groups.map(group => {
//     return {
//       id: group.fsid,
//       value: group,
//     }
//   })
// }


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"main.css":"static/css/main.34c4f72f.css","main.css.map":"static/css/main.34c4f72f.css.map","main.js":"static/js/main.08cccd1b.js","main.js.map":"static/js/main.08cccd1b.js.map"}

/***/ })
/******/ ]);