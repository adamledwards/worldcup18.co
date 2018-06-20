import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'
import * as merge from 'lodash.merge'
import * as moment from 'moment'
import { parseGroup } from './groupStanding'
import { teamNameToKey } from './teams'

type ParseFixture = {
  id: number
  stage_id: number
  start: Date
  visitorTeam: {
    team_name: string
    team_id: number
    score: number
    pen: any
    short_code: string
    key: string
  }
  localTeam: {
    team_name: string
    team_id: number
    score: number
    pen: any
    short_code: string
    key: string
  }
  starting_at: number
  time: SportmonksResponse.LiveScores.Time
  venue: string
  enabled: boolean
  status: {
    TODAY: boolean
  }
}

function parseData(game: SportmonksResponse.LiveScores.Datum): ParseFixture {
  return {
    id: game.id,
    stage_id: game.stage_id,
    start: new Date(game.time.starting_at.timestamp * 1000),
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
    enabled:
      game.time.status == 'FT' ||
      game.time.status == 'LIVE' ||
      game.time.status == 'HT',
    status: {
      TODAY:
        game.time.status == 'NS' ||
        game.time.status == 'LIVE' ||
        game.time.status == 'HT',
    },
  }
}

export default functions.https.onRequest(async (req, res) => {
  const { sportmonksApi, livescores } = setting
  const batch = admin.firestore().batch()
  //const ids = await getids()
  let responseFixtures: SportmonksResponse.LiveScores.RootObject
  try {
    responseFixtures = (await sportmonksApi.get(livescores, {
      localTeam: true,
      visitorTeam: true,
      substitutions: true,
      goals: true,
      lineup: true,
      stats: true,
      bench: true,
      venue: true,
      'group.standings': true,
    })) as SportmonksResponse.LiveScores.RootObject
  } catch (error) {
    console.log(error)
    throw error
  }

  responseFixtures.data.forEach(game => {
    if (game.season_id !== 892) return
    const gameData = parseData(game)
    const gameDataDetail = parseDataDetail(game)

    const fixtureRef = admin
      .firestore()
      .collection('fixtures')
      .doc(game.id.toString())

    batch.update(fixtureRef, gameData)

    const fixtureDetailVisitorTeamRef = fixtureRef
      .collection('details')
      .doc('visitorTeam')

    batch.set(fixtureDetailVisitorTeamRef, gameDataDetail.visitorTeam)

    const fixtureDetailLocalTeamRef = fixtureRef
      .collection('details')
      .doc('localTeam')

    batch.set(fixtureDetailLocalTeamRef, gameDataDetail.localTeam)

    const localTeamRef = admin
      .firestore()
      .collection(
        `teams/${game.localTeam.data.name
          .toLocaleLowerCase()
          .replace(/\s/g, '-')}/fixtures`
      )
      .doc(game.id.toString())

    batch.update(localTeamRef, gameData)

    const visitorTeamRef = admin
      .firestore()
      .collection(
        `teams/${game.visitorTeam.data.name
          .toLocaleLowerCase()
          .replace(/\s/g, '-')}/fixtures`
      )
      .doc(game.id.toString())

    batch.update(visitorTeamRef, gameData)

    const groupStandingsRef = admin
      .firestore()
      .collection('groupStandings')
      .doc(game.group.data.name.replace(/\s/g, ''))
    batch.update(groupStandingsRef, parseGroup(game.group.data))
  })
  await batch.commit()

  res.send('done')
})

function lineUpSorter(
  data: SportmonksResponse.LiveScores.Datum,
  fixtures: ParseFixture
) {
  const { visitorTeam, localTeam } = fixtures
  const lineup = team => data.lineup.data.filter(d => team.team_id == d.team_id)
  const localTeamLineUp = lineup(localTeam)
  const visitorTeamLineUp = lineup(visitorTeam)
  return {
    //enabled: !!visitorTeamLineUp.length && !!localTeamLineUp.length,
    visitorTeam: {
      ...visitorTeam,
      lineup: visitorTeamLineUp,
    },
    localTeam: {
      ...localTeam,
      lineup: localTeamLineUp,
    },
  }
}

function goalsSorter(
  data: SportmonksResponse.LiveScores.Datum,
  fixtures: ParseFixture
) {
  const { visitorTeam, localTeam } = fixtures

  const goals = team => data.goals.data.filter(d => team.team_id == d.team_id)
  return {
    //enabled: !!visitorTeamLineUp.length && !!localTeamLineUp.length,
    visitorTeam: {
      ...visitorTeam,
      goals: goals(visitorTeam),
    },
    localTeam: {
      ...localTeam,
      goals: goals(localTeam),
    },
  }
}

function subsSorter(
  data: SportmonksResponse.LiveScores.Datum,
  fixtures: ParseFixture
) {
  const { visitorTeam, localTeam } = fixtures
  const getBenched = id => {
    return data.bench.data.find(b => b.player_id == id)
  }

  const subber = team => {
    return data.substitutions.data
      .filter(d => team.team_id == d.team_id)
      .reduce((obj, sub) => {
        obj[sub.player_out_id] = {
          minute: sub.minute,
          ...getBenched(sub.player_in_id),
        }
        return obj
      }, {})
  }
  return {
    visitorTeam: { ...visitorTeam, substitutions: subber(visitorTeam) },
    localTeam: { ...localTeam, substitutions: subber(localTeam) },
  }
}

function statsSorter(
  data: SportmonksResponse.LiveScores.Datum,
  fixtures: ParseFixture
) {
  const { visitorTeam, localTeam } = fixtures
  const { scores } = data

  const stats = team => data.stats.data.find(d => team.team_id == d.team_id)
  const statsMapper = team => {
    const teamStats = stats(team)
    return {
      ballPossession: (teamStats && teamStats.possessiontime + '%') || null,
      corner: (teamStats && teamStats.corners) || null,
      fouls: (teamStats && teamStats.fouls) || null,
      shotsOnGoal: (teamStats && teamStats.shots.total) || null,
      shotsOnTarget: (teamStats && teamStats.shots.ongoal) || null,
      shotsOffTarget:
        (teamStats &&
          teamStats.shots &&
          teamStats.shots.total -
            teamStats.shots.ongoal -
            teamStats.shots.blocked) ||
        null,
      offside: (teamStats && teamStats.offsides) || null,
    }
  }
  return {
    visitorTeam: {
      ...visitorTeam,
      stats: {
        goals: scores.visitorteam_score,
        ...statsMapper(visitorTeam),
      },
    },
    localTeam: {
      ...localTeam,
      stats: {
        goals: scores.localteam_score,
        ...statsMapper(localTeam),
      },
    },
  }
}

function parseDataDetail(data: SportmonksResponse.LiveScores.Datum) {
  const fixtures = parseData(data)

  return merge(
    {},
    fixtures,
    statsSorter(data, fixtures),
    goalsSorter(data, fixtures),
    subsSorter(data, fixtures),
    lineUpSorter(data, fixtures)
  )
}
