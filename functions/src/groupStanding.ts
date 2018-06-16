import * as functions from 'firebase-functions'
import { teamNameToKey } from './teams'
import setting from './constants'
import admin from './admin'

function parseData(row: SportmonksResponse.StandingResponse.Datum2) {
  return {
    group_id: row.group_id,
    group_name: row.group_name,
    position: row.position,
    team_id: row.team_id,
    team_name: row.team_name,
    points: row.total.points,
    goal_difference: row.total.goal_difference,
    games_played: row.overall.games_played,
    key: teamNameToKey(row.team_name),
  }
}
export default functions.https.onRequest((req, res) => {
  groupStandings()
    .then(() => res.send('done'))
    .catch(console.log)
})

export function groupStandings() {
  const batch = admin.firestore().batch()
  return setting.sportmonksApi
    .get(setting.groups, { id: 892 })
    .then(({ data }: SportmonksResponse.StandingResponse.RootObject) => {
      data.forEach(group => {
        const groupStandingsRef = admin
          .firestore()
          .collection('groupStandings')
          .doc(group.name.replace(/\s/g, ''))

        batch.set(groupStandingsRef, parseGroup(group))

        const table = group.standings.data.map(parseData)
        table.forEach(team => {
          const teamRef = admin
            .firestore()
            .doc('teams/' + teamNameToKey(team.team_name))
          batch.update(teamRef, {
            group: group.name,
          })
        })
      })

      return batch.commit()
    })
}

export function parseGroup(group: SportmonksResponse.StandingResponse.Datum) {
  return {
    id: group.id,
    group: group.name,
    table: group.standings.data.map(parseData),
    teamLinks: group.standings.data.reduce((o, d) => {
      o[teamNameToKey(d.team_name)] = true
      return o
    }, {}),
    teamIds: group.standings.data.reduce((o, d) => {
      o[d.team_id] = true
      return o
    }, {}),
  }
}
