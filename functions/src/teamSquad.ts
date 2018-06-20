import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'

function parseSquad(data: SportmonksResponse.SquadResponse.Datum[], oldData) {
  if (!data.length) {
    return null
  }

  return data
    .filter(p => p.position)
    .map(playerData => {
      const name = playerData.player.data.fullname.split(' ')

      const oldPlayerDetail = oldData.squad[playerData.position.data.name].find(
        p => playerData.player_id === p.id
      )
      const nameObj: { name?: string } = {}
      if (oldPlayerDetail && oldPlayerDetail.name) {
        nameObj.name = oldPlayerDetail.name
      }
      return {
        id: playerData.player_id,
        position: playerData.position.data.name,
        appearences: playerData.appearences,
        goals: playerData.goals,
        name: `${name[0]} ${name[name.length - 1]}`,
        ...nameObj,
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
function getSquad(data) {
  const { sportmonksApi, squad } = setting
  return sportmonksApi
    .get(squad, {
      id: 892,
      team_id: data.id,
      player: true,
      position: true,
    })
    .then((squadResponse: SportmonksResponse.SquadResponse.Squad) => {
      return parseSquad(squadResponse.data, data)
    })
}

export function teamSquads() {
  return admin
    .firestore()
    .collection('teams')
    .get()
    .then(data => {
      const promises = []
      data.forEach(doc => {
        promises.push(
          getSquad(doc.data()).then(squad => {
            return doc.ref.update({
              squad,
            })
          })
        )
      })
      return Promise.all(promises)
    })
}

export function teamSquad(doc) {
  return admin
    .firestore()
    .collection('teams')
    .doc(doc)
    .get()
    .then(data => {
      getSquad(data.data()).then(squad => {
        return data.ref.update({
          squad,
        })
      })
    })
}

export default functions.https.onRequest((req, res) => {
  return teamSquads().then(() => res.send('done'))
})
