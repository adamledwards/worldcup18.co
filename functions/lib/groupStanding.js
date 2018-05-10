"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const constants_1 = require("./constants");
const admin_1 = require("./admin");
function parseData(row) {
    return {
        group_id: row.group_id,
        group_name: row.group_name,
        position: row.position,
        team_id: row.team_id,
        team_name: row.team_name,
        points: row.total.points,
        goal_difference: row.total.goal_difference,
        games_played: row.overall.games_played
    };
}
exports.default = functions.https.onRequest((req, res) => {
    const batch = admin_1.default.firestore().batch();
    return constants_1.default.sportmonksApi.get(constants_1.default.groups, { id: 892 })
        .then(({ data }) => {
        data.forEach(group => {
            const groupStandingsRef = admin_1.default.firestore().collection('groupStandings').doc(group.name.replace(/\s/g, ''));
            const table = group.standings.data.map(parseData);
            batch.set(groupStandingsRef, {
                id: group.id,
                group: group.name,
                table: group.standings.data.map(parseData),
                teamLinks: group.standings.data.reduce((o, d) => {
                    o[d.team_name.toLocaleLowerCase().replace(/\s/g, '-')] = true;
                    return o;
                }, {}),
                teamIds: group.standings.data.reduce((o, d) => {
                    o[d.team_id] = true;
                    return o;
                }, {})
            });
            table.forEach(team => {
                const teamRef = admin_1.default.firestore().doc('teams/' + team.team_name.toLocaleLowerCase().replace(/\s/g, '-'));
                batch.update(teamRef, {
                    group: group.name,
                });
            });
        });
        return batch.commit();
    })
        .then(() => res.send('done'))
        .catch(console.log);
});
//# sourceMappingURL=groupStanding.js.map