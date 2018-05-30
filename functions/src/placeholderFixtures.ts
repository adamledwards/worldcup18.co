import * as functions from 'firebase-functions'
import setting from './constants'
import admin from './admin'

type Fixtures = {
  id: number
  stage_id: string
  start: Date
  visitorTeam: {
    team_name: string
    team_id: string
    score: number
    pen: number
  }
  localTeam: {
    team_name: string
    team_id: string
    score: number
    pen: number
  }
  time: string
  venue: string
}

const placeholder: Fixtures[] = [
  {
    id: 65,
    stage_id: 'placeholder',
    time: '15:00',
    venue: 'TBC',
    start: new Date(1530367200000),
    localTeam: {
      team_name: 'Group C Winner',
      team_id: 'Group C Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Group D Second Place',
      team_id: 'Group D Second Place',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 66,
    stage_id: 'placeholder',
    time: '19:00',
    venue: 'TBC',
    start: new Date(1530381600000),
    localTeam: {
      team_name: 'Group A Winner',
      team_id: 'Group A Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Group B Second Place',
      team_id: 'Group B Second Place',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 69,
    stage_id: 'placeholder',
    time: '15:00',
    venue: 'TBC',
    start: new Date(1530453600000),
    localTeam: {
      team_name: 'Group B Winner',
      team_id: 'Group B Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Group A Second Place',
      team_id: 'Group A Second Place',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 70,
    stage_id: 'placeholder',
    time: '19:00',
    venue: 'TBC',
    start: new Date(1530468000000),
    localTeam: {
      team_name: 'Group D Winner',
      team_id: 'Group D Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Group C Second Place',
      team_id: 'Group C Second Place',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 72,
    stage_id: 'placeholder',
    time: '15:00',
    venue: 'TBC',
    start: new Date(1530540000000),
    localTeam: {
      team_name: 'Group E Winner',
      team_id: 'Group E Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Group F Second Place',
      team_id: 'Group F Second Place',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 73,
    stage_id: 'placeholder',
    time: '19:00',
    venue: 'TBC',
    start: new Date(1530554400000),
    localTeam: {
      team_name: 'Group G Winner',
      team_id: 'Group G Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Group H Second Place',
      team_id: 'Group H Second Place',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 75,
    stage_id: 'placeholder',
    time: '15:00',
    venue: 'TBC',
    start: new Date(1530626400000),
    localTeam: {
      team_name: 'Group F Winner',
      team_id: 'Group F Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Group E Second Place',
      team_id: 'Group E Second Place',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 76,
    stage_id: 'placeholder',
    time: '19:00',
    venue: 'TBC',
    start: new Date(1530640800000),
    localTeam: {
      team_name: 'Group H Winner',
      team_id: 'Group H Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Group G Second Place',
      team_id: 'Group G Second Place',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 78,
    stage_id: 'placeholder',
    time: '15:00',
    venue: 'TBC',
    start: new Date(1530885600000),
    localTeam: {
      team_name: 'Quarter-Finalist 1',
      team_id: 'Quarter-Finalist 1',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Quarter-Finalist 2',
      team_id: 'Quarter-Finalist 2',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 79,
    stage_id: 'placeholder',
    time: '19:00',
    venue: 'TBC',
    start: new Date(1530900000000),
    localTeam: {
      team_name: 'Quarter-Finalist 5',
      team_id: 'Quarter-Finalist 5',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Quarter-Finalist 6',
      team_id: 'Quarter-Finalist 6',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 81,
    stage_id: 'placeholder',
    time: '15:00',
    venue: 'TBC',
    start: new Date(1530972000000),
    localTeam: {
      team_name: 'Quarter-Finalist 7',
      team_id: 'Quarter-Finalist 7',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Quarter-Finalist 8',
      team_id: 'Quarter-Finalist 8',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 82,
    stage_id: 'placeholder',
    time: '19:00',
    venue: 'TBC',
    start: new Date(1530986400000),
    localTeam: {
      team_name: 'Quarter-Finalist 3',
      team_id: 'Quarter-Finalist 3',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Quarter-Finalist 4',
      team_id: 'Quarter-Finalist 4',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 84,
    stage_id: 'placeholder',
    time: '19:00',
    venue: 'TBC',
    start: new Date(1531245600000),
    localTeam: {
      team_name: 'Semi-Finalist 1',
      team_id: 'Semi-Finalist 1',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Semi-Finalist 2',
      team_id: 'Semi-Finalist 2',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 86,
    stage_id: 'placeholder',
    time: '19:00',
    venue: 'TBC',
    start: new Date(1531332000000),
    localTeam: {
      team_name: 'Semi-Finalist 3',
      team_id: 'Semi-Finalist 3',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Semi-Finalist 4',
      team_id: 'Semi-Finalist 4',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 88,
    stage_id: 'placeholder',
    time: '15:00',
    venue: 'TBC',
    start: new Date(1531576800000),
    localTeam: {
      team_name: 'Semi-Final 1 Loser',
      team_id: 'Semi-Final 1 Loser',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Semi-Final 2 Loser',
      team_id: 'Semi-Final 2 Loser',
      score: 0,
      pen: 0,
    },
  },
  {
    id: 90,
    stage_id: 'placeholder',
    time: '16:00',
    venue: 'TBC',
    start: new Date(1531666800000),
    localTeam: {
      team_name: 'Semi-Final 1 Winner',
      team_id: 'Semi-Final 1 Winner',
      score: 0,
      pen: 0,
    },
    visitorTeam: {
      team_name: 'Semi-Final 2 Winner',
      team_id: 'Semi-Final 2 Winner',
      score: 0,
      pen: 0,
    },
  },
]

export default functions.https.onRequest((req, res) => {
  const batch = admin.firestore().batch()
  placeholder.forEach(game => {
    const fixtureRef = admin
      .firestore()
      .collection('fixtures')
      .doc('placeholder-' + game.id.toString())
    batch.set(fixtureRef, game)
  })
  return batch.commit()
})
