import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'

const getTeam = store => {
  return store
    .collection('teams')
    .get()
    .then(snapshot => {
      const data = []
      snapshot.docs.forEach(queryDoc => {
        data.push(queryDoc.data())
      })
      return data
    })
}

const getGroup = store => {
  return store
    .collection('groupStandings')
    .get()
    .then(snapshot => {
      const data = []

      snapshot.docs.forEach(queryDoc => {
        data.push(queryDoc.data())
      })
      return data[0]
    })
}

const getFixtures = store => {
  return store
    .collection('fixtures')
    .get()
    .then(snapshot => {
      const data = []
      snapshot.docs.forEach(queryDoc => {
        data.push(queryDoc.data())
      })
      return data
    })
}

export default functions.https.onRequest((req, res) => {
  const store = admin.firestore()
  const teamQuery = getTeam(store)
  const groupQuery = getGroup(store)
  const fixturesQuery = getFixtures(store)
  return Promise.all([teamQuery, groupQuery, fixturesQuery]).then(
    ([team, group, fixtures]) => {
      return res.json({ team, group, fixtures })
    }
  )
})
