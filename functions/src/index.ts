import GroupStandings from './groupStanding'
import Fixtures from './fixtures'
import Teams from './teams'
import * as functions from 'firebase-functions'

export const groupStandings = GroupStandings
export const fixtures = Fixtures
export const teams = Teams
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
