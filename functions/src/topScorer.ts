import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'
import { bucket } from 'firebase-functions/lib/providers/storage'

export function getTopScorers() {
  const { sportmonksApi, topScorer } = setting
  return sportmonksApi
    .get(topScorer, {
      id: 892,
    })
    .then((scorerResponse: SportmonksResponse.TopScorer.RootObject) => {
      const goalscorers = scorerResponse.data.goalscorers.data
        .sort((a, b) => b.goals - a.goals)
        .slice(0, 10)
      return {
        goalscorers,
        querySet: admin.firestore().collection('teams'),
      }
    })
    .then(async result => {
      const snapshot = await result.querySet.get()
      const teams = snapshot.docs
        .map(d => d.data())
        .filter(d => {
          return result.goalscorers.findIndex(g => g.team_id === d.id) !== -1
        })
        .reduce((obj, t) => {
          obj[t.id] = {
            team: t,
            players: flatPlayers(t.squad),
          }
          return obj
        }, {})

      return result.goalscorers.sort((a, b) => b.goals - a.goals).map(p => {
        return {
          team: teams[p.team_id].team,
          ...teams[p.team_id].players[p.player_id],
        }
      })
    })
    .then(result => {
      console.log(result)
      return admin
        .firestore()
        .doc('app/topScorer')
        .set({ result })
    })
    .catch(console.log)
}

function flatPlayers(squad) {
  return Object.keys(squad)
    .reduce((arr, player) => {
      arr.push(...squad[player])
      return arr
    }, [])
    .reduce((obj, p) => {
      obj[p.id] = p
      return obj
    }, {})
}
export default functions.https.onRequest((req, res) => {
  return getTopScorers().then(() => res.send('done'))
})
