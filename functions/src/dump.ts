import * as functions from 'firebase-functions'
import admin from './admin'

const cors = require('cors')({
  origin: true,
})

const tenMinutes = 60 * 1000
const cache = {
  data: {},
  nextRefresh: 0,
}

const getTeam = store => {
  return store
    .collection('teams')
    .get()
    .then(snapshot => {
      const data = []
      snapshot.docs.forEach(queryDoc => {
        data.push({ fsid: queryDoc.id, ...queryDoc.data() })
      })
      return data
    })
}

const getGroup = store => {
  return store
    .collection('/groupStandings')
    .get()
    .then(snapshot => {
      const data = []
      snapshot.docs.forEach(queryDoc => {
        data.push({ fsid: queryDoc.id, ...queryDoc.data() })
      })
      return data
    })
}

const getFixtures = store => {
  return store
    .collection('fixtures')
    .get()
    .then(snapshot => {
      const data = []
      snapshot.docs.forEach(queryDoc => {
        data.push({ fsid: queryDoc.id, ...queryDoc.data() })
      })
      return data
    })
}

export default functions.https.onRequest((req, res) => {
  if (Date.now() > cache.nextRefresh) {
    const store = admin.firestore()
    const teamQuery = getTeam(store)
    const groupQuery = getGroup(store)
    const fixturesQuery = getFixtures(store)
    return Promise.all([teamQuery, groupQuery, fixturesQuery]).then(
      ([teams, groups, fixtures]) => {
        return cors(req, res, () => {
          const json = { teams, groups, fixtures }
          cache.data = json
          cache.nextRefresh = Date.now() + tenMinutes
          return res.json(json)
        })
      }
    )
  }
  return cors(req, res, () => res.json(cache.data))
})
