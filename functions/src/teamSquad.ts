import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'

function parseSquad(data: SportmonksResponse.SquadResponse.Datum[]) {
  return data
    .map(playerData => {
      return {
        id: playerData.player_id,
        name: playerData.player.data.common_name,
        position: playerData.position.data.name,
        appearences: playerData.appearences,
        goals: playerData.goals,
      }
    })
    .reduce((obj, player) => {
      if (!obj[player.position]) {
        obj[player.position] = [player]
      } else {
        obj[player.position].push(player)
      }
      return obj
    }, {})
}
function getSquad(team_id) {
  const { sportmonksApi, squad } = setting
  return sportmonksApi
    .get(squad, {
      id: 892,
      team_id,
      player: true,
      position: true,
    })
    .then((squadResponse: SportmonksResponse.SquadResponse.Squad) => {
      return parseSquad(squadResponse.data)
    })
}

export default functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection('teams')
    .get()
    .then(data => {
      return data.forEach(doc => {
        getSquad(doc.data().id).then(squad => {
          doc.ref.update({
            squad,
          })
        })
      })
    })
    .then(() => res.send('done'))
})
