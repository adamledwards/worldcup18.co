import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'

type Standing = {
  position: number
  team_id: number
  team_name: string
  group_id: number
  group_name: string
  overall: {
    games_played: number
    won: number
    draw: number
    lost: number
    goals_scored: number
    goals_against: number
  }
  total: {
    goal_difference: string
    points: string
  }
}

type Group = {
  id: number
  name: string
  league_id: number
  season_id: number
  stage_id: number
  stage_name: string
  standings: {
    data: [Standing]
  }
}

function parseData(row: Standing) {
  return {
    group_id: row.group_id,
    group_name: row.group_name,
    position: row.position,
    team_id: row.team_id,
    team_name: row.team_name,
    points: row.total.points,
    goal_difference: row.total.goal_difference,
    games_played: row.overall.games_played,
    key: row.team_name.toLocaleLowerCase().replace(/\s/g, '-'),
  }
}
export default functions.https.onRequest((req, res) => {
  const batch = admin.firestore().batch()
  return setting.sportmonksApi
    .get(setting.groups, { id: 892 })
    .then(({ data }: { data: Group[] }) => {
      data.forEach(group => {
        const groupStandingsRef = admin
          .firestore()
          .collection('groupStandings')
          .doc(group.name.replace(/\s/g, ''))
        const table = group.standings.data.map(parseData)
        batch.set(groupStandingsRef, {
          id: group.id,
          group: group.name,
          table: group.standings.data.map(parseData),
          teamLinks: group.standings.data.reduce((o, d) => {
            o[d.team_name.toLocaleLowerCase().replace(/\s/g, '-')] = true
            return o
          }, {}),
          teamIds: group.standings.data.reduce((o, d) => {
            o[d.team_id] = true
            return o
          }, {}),
        })
        table.forEach(team => {
          const teamRef = admin
            .firestore()
            .doc(
              'teams/' + team.team_name.toLocaleLowerCase().replace(/\s/g, '-')
            )
          batch.update(teamRef, {
            group: group.name,
          })
        })
      })

      return batch.commit()
    })
    .then(() => res.send('done'))
    .catch(console.log)
})
