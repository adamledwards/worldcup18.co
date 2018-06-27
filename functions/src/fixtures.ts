import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'
import { teamNameToKey } from './teams'

//https://soccer.sportmonks.com/api/v2.0/fixtures/between/2018-06-01/2018-07-31?api_token=__TOKEN__&include=localTeam,visitorTeam,venue

function parseData(game: SportmonksResponse.FixturesResponse.Datum) {
  return {
    id: game.id,
    stage_id: game.stage_id,
    start: new Date(game.time.starting_at.timestamp * 1000),
    stage: (game.stage && game.stage.data.name) || null,
    group: (game.group && game.group.data.name) || null,
    visitorTeam: {
      team_name: game.visitorTeam.data.name,
      team_id: game.visitorTeam.data.id,
      score: game.scores.visitorteam_score,
      pen: game.scores.visitorteam_pen_score,
      short_code: game.visitorTeam.data.short_code,
      key: teamNameToKey(game.visitorTeam.data.name),
    },
    localTeam: {
      team_name: game.localTeam.data.name,
      team_id: game.localTeam.data.id,
      score: game.scores.localteam_score,
      pen: game.scores.localteam_pen_score,
      short_code: game.localTeam.data.short_code,
      key: teamNameToKey(game.localTeam.data.name),
    },
    starting_at: game.time.starting_at.timestamp,
    time: game.time,
    venue: game.venue.data.name,
    enabled: game.time.status == 'FT',
    status: {
      TODAY: game.time.status == 'NS' || game.time.status == 'LIVE',
    },
  }
}

export default functions.https.onRequest((req, res) => {
  const { sportmonksApi, appSettings, fixtures } = setting
  const batch = admin.firestore().batch()
  return sportmonksApi
    .get(fixtures, {
      from: appSettings.date.start,
      to: appSettings.date.end,
      localTeam: true,
      visitorTeam: true,
      venue: true,
      group: true,
      stage: true,
    })
    .then((responseFixtures: SportmonksResponse.FixturesResponse.Fixtures) => {
      responseFixtures.data.forEach(game => {
        if (game.season_id !== 892) return

        const fixtureRef = admin
          .firestore()
          .collection('fixtures')
          .doc(game.id.toString())
        batch.set(fixtureRef, parseData(game), { merge: true })

        batch.set(fixtureRef, parseData(game), { merge: true })

        const localTeamRef = admin
          .firestore()
          .collection(
            `teams/${game.localTeam.data.name
              .toLocaleLowerCase()
              .replace(/\s/g, '-')}/fixtures`
          )
          .doc(game.id.toString())

        batch.set(localTeamRef, parseData(game), { merge: true })

        const visitorTeamRef = admin
          .firestore()
          .collection(
            `teams/${game.visitorTeam.data.name
              .toLocaleLowerCase()
              .replace(/\s/g, '-')}/fixtures`
          )
          .doc(game.id.toString())

        batch.set(visitorTeamRef, parseData(game), { merge: true })
      })
      return batch.commit()
    })
    .then(() => res.send('done'))
})
