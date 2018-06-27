import * as functions from 'firebase-functions'
import { SportmonksApi } from 'sportmonks'

export default {
  topScorer: 'v2.0/topscorers/season/{id}',
  livescores: 'v2.0/livescores/season/{id}',
  groups: 'v2.0/standings/season/{id}',
  fixtures: 'v2.0/fixtures/between/{from}/{to}',
  fixturesByIds: 'v2.0/fixtures/multi/{ids}',
  teams: 'v2.0/teams/season/{id}',
  squad: 'v2.0/squad/season/{id}/team/{team_id}',
  appSettings: {
    date: {
      start: '2018-06-01',
      end: '2018-07-31',
    },
  },
  sportmonksApi: new SportmonksApi(functions.config().football.key),
}
