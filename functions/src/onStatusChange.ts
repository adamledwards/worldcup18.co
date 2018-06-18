import * as functions from 'firebase-functions'
import { groupStandings } from './groupStanding'
import { teamSquad } from './teamSquad'

function pusher(change, context) {
  // Grab the current value of what was written to the Realtime Database.
  const promiseList = []
  const oldData = change.before.data()
  const original = change.after.data()
  if (oldData.time.status !== 'FT' && original.time.status === 'FT') {
    // update top scores
    // update groups
    promiseList.push(groupStandings())
    promiseList.push(teamSquad(original.localTeam.key))
    promiseList.push(teamSquad(original.visitorTeam.key))
    console.log('FULL TIME')
  }

  const visitorTeamHasScored =
    oldData.visitorTeam.score !== original.visitorTeam.score
  const localTeamHasScored =
    oldData.localTeam.score !== original.localTeam.score

  if (visitorTeamHasScored && localTeamHasScored) {
    console.log('Both Goals since last update')
  }

  if (localTeamHasScored) {
    promiseList.push(teamSquad(original.localTeam.key))
    console.log(
      original.localTeam.team_name,
      'Local Team Goal since last update'
    )
  }
  if (visitorTeamHasScored) {
    promiseList.push(teamSquad(original.visitorTeam.key))
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
