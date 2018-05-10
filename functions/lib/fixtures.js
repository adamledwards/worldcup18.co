"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const constants_1 = require("./constants");
const admin_1 = require("./admin");
//https://soccer.sportmonks.com/api/v2.0/fixtures/between/2018-06-01/2018-07-31?api_token=__TOKEN__&include=localTeam,visitorTeam,venue
function parseData(game) {
    return {
        id: game.id,
        stage_id: game.stage_id,
        start: new Date(game.time.starting_at.timestamp * 1000),
        visitorTeam: {
            team_name: game.visitorTeam.data.name,
            team_id: game.visitorTeam.data.id,
            score: game.scores.visitorteam_score,
            pen: game.scores.visitorteam_pen_score,
        },
        localTeam: {
            team_name: game.localTeam.data.name,
            team_id: game.localTeam.data.id,
            score: game.scores.localteam_score,
            pen: game.scores.localteam_pen_score,
        },
        time: game.time,
        venue: game.venue.data.name,
    };
}
exports.default = functions.https.onRequest((req, res) => {
    const { sportmonksApi, appSettings, fixtures } = constants_1.default;
    const batch = admin_1.default.firestore().batch();
    return sportmonksApi.get(fixtures, {
        from: appSettings.date.start,
        to: appSettings.date.end,
        localTeam: true,
        visitorTeam: true,
        venue: true,
    })
        .then((responseFixtures) => {
        responseFixtures.data.forEach(game => {
            const fixtureRef = admin_1.default.firestore().collection('fixtures').doc(game.id.toString());
            batch.set(fixtureRef, parseData(game));
            const localTeamRef = admin_1.default.firestore()
                .collection(`teams/${game.localTeam.data.name.toLocaleLowerCase().replace(/\s/g, '-')}/fixtures`)
                .doc(game.id.toString());
            batch.set(localTeamRef, parseData(game));
            const visitorTeamRef = admin_1.default.firestore()
                .collection(`teams/${game.visitorTeam.data.name.toLocaleLowerCase().replace(/\s/g, '-')}/fixtures`)
                .doc(game.id.toString());
            batch.set(visitorTeamRef, parseData(game));
        });
        return batch.commit();
    })
        .then(() => res.send('done'));
});
//# sourceMappingURL=fixtures.js.map