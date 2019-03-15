import * as functions from 'firebase-functions'
import { groupStandings } from './groupStanding'
import { teamSquad, teamSquads } from './teamSquad'
import { sendMessage } from './subscribe'
import { getTopScorers } from './topScorer'

const push = (title: string, body: string) => {
  const message = {
    webpush: {
      notification: {
        title,
        body,
        icon: 'https://worldcup18.co/favicon-194x194.png',
      },
    },
    topic: 'all',
  }
  return sendMessage(message)
}

function pusher(change, context) {
  // Grab the current value of what was written to the Realtime Database.
  const promiseList = []
  const oldData = change.before.data()
  const original = change.after.data()
  let title = ''
  if (oldData.time.status === 'NS' && original.time.status === 'LIVE') {
    promiseList.push(
      push(
        'Kick Off',
        `${original.localTeam.team_name} ${original.localTeam.score} - ${
          original.visitorTeam.score
        } ${original.visitorTeam.team_name}`
      )
    )
  }
  if (oldData.time.status !== 'FT' && original.time.status === 'FT') {
    // update top scores
    // update groups
    promiseList.push(groupStandings())
    console.log('FULL TIME')
    promiseList.push(getTopScorers())
    promiseList.push(teamSquads())

    title = 'Draw'
    if (original.localTeam.score > original.visitorTeam.score) {
      title = `Full Time: ${original.localTeam.team_name} win`
    }
    if (original.visitorTeam.score > original.localTeam.score) {
      title = `Full Time: ${original.visitorTeam.team_name} win`
    }
    promiseList.push(
      push(
        title,
        `${original.localTeam.team_name} ${original.localTeam.score} - ${
          original.visitorTeam.score
        } ${original.visitorTeam.team_name}`
      )
    )
  }

  const visitorTeamHasScored =
    oldData.visitorTeam.score !== original.visitorTeam.score
  const localTeamHasScored =
    oldData.localTeam.score !== original.localTeam.score

  if (visitorTeamHasScored && localTeamHasScored) {
    console.log('Both Goals since last update')
  }

  if (visitorTeamHasScored || localTeamHasScored) {
    promiseList.push(getTopScorers())
  }

  if (localTeamHasScored) {
    promiseList.push(teamSquad(original.localTeam.key))
    promiseList.push(
      push(
        `Goal: ${original.localTeam.team_name}`,
        `${original.localTeam.team_name} ${original.localTeam.score} - ${
          original.visitorTeam.team_name
        } ${original.visitorTeam.score}`
      )
    )
    console.log(
      original.localTeam.team_name,
      'Local Team Goal since last update'
    )
  }
  if (visitorTeamHasScored) {
    promiseList.push(teamSquad(original.visitorTeam.key))
    promiseList.push(
      push(
        `Goal: ${original.visitorTeam.team_name}`,
        `${original.localTeam.team_name} ${original.localTeam.score} - ${
          original.visitorTeam.team_name
        } ${original.visitorTeam.score}`
      )
    )
    console.log(
      original.visitorTeam.team_name,
      'Visitor Team Goal since last update'
    )
  }
  return Promise.all(promiseList)
}
export default functions.firestore
  .document('/fixtures/{match}')
  .onUpdate(pusher)
