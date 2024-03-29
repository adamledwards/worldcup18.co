import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'

//https://soccer.sportmonks.com/api/v2.0/fixtures/between/2018-06-01/2018-07-31?api_token=__TOKEN__&include=localTeam,visitorTeam,venue

function parseData(team: SportmonksResponse.TeamsResponse.Datum) {
  return {
    id: team.id,
    name: team.name,
    short_code: team.short_code,
    key: team.name.toLocaleLowerCase().replace(/\s/g, '-'),
    fifaranking: {
      points: team.fifaranking.data.points,
      position: team.fifaranking.data.position,
      position_status: team.fifaranking.data.position_status,
      position_won_or_lost: team.fifaranking.data.position_won_or_lost,
    },
    coach: `${team.coach.data.firstname} ${team.coach.data.lastname}`,
  }
}

export default functions.https.onRequest((req, res) => {
  const { sportmonksApi, appSettings, teams } = setting
  const batch = admin.firestore().batch()

  return sportmonksApi
    .get(teams, {
      id: 892,
      to: appSettings.date.end,
      coach: true,
      fifaranking: true,
    })
    .then((responseTeams: SportmonksResponse.TeamsResponse.Teams) => {
      return responseTeams.data.map(team => {
        const teamRef = admin
          .firestore()
          .collection('teams')
          .doc(team.name.toLocaleLowerCase().replace(/\s/g, '-'))
        batch.update(teamRef, parseData(team))

        return [team.id, teamRef]
      })
    })
    .then(teamRefs => {
      return batch.commit()
    })
    .then(() => res.send('done'))
})

export function teamNameToKey(teamName: string) {
  return teamName.toLocaleLowerCase().replace(/\s/g, '-')
}
