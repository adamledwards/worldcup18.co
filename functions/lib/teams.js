"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const constants_1 = require("./constants");
const admin_1 = require("./admin");
//https://soccer.sportmonks.com/api/v2.0/fixtures/between/2018-06-01/2018-07-31?api_token=__TOKEN__&include=localTeam,visitorTeam,venue
function parseData(team) {
    return {
        id: team.id,
        name: team.name,
        key: team.name.toLocaleLowerCase().replace(/\s/g, '-'),
        fifaranking: {
            points: team.fifaranking.data.points,
            position: team.fifaranking.data.position,
            position_status: team.fifaranking.data.position_status,
            position_won_or_lost: team.fifaranking.data.position_won_or_lost,
        },
        coach: `${team.coach.data.firstname} ${team.coach.data.lastname}`,
    };
}
function getSquad(team_id) {
    const { sportmonksApi, squad } = constants_1.default;
    return sportmonksApi.get(squad, {
        id: 892,
        team_id: team_id,
        player: true,
        position: true,
    });
}
exports.default = functions.https.onRequest((req, res) => {
    const { sportmonksApi, appSettings, teams } = constants_1.default;
    const batch = admin_1.default.firestore().batch();
    return sportmonksApi.get(teams, {
        id: 892,
        to: appSettings.date.end,
        coach: true,
        fifaranking: true,
    })
        .then((responseTeams) => {
        return responseTeams.data.map(team => {
            const teamRef = admin_1.default.firestore()
                .collection('teams')
                .doc(team.name.toLocaleLowerCase().replace(/\s/g, '-'));
            batch.set(teamRef, parseData(team));
            return [team.id, teamRef];
        });
    })
        .then(teamRefs => {
        // const promises = teamRefs.map(([id, ref]) => {
        //   return getSquad(id).then(console.log)
        // });
        return batch.commit();
    })
        .then(() => res.send('done'));
});
//# sourceMappingURL=teams.js.map