"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const constants_1 = require("./constants");
const admin_1 = require("./admin");
function parseSquad(data) {
    return data
        .map(playerData => {
        return {
            id: playerData.player_id,
            name: playerData.player.data.common_name,
            position: playerData.position.data.name,
            appearences: playerData.appearences,
            goals: playerData.goals,
        };
    })
        .reduce((obj, player) => {
        if (!obj[player.position]) {
            obj[player.position] = [player];
        }
        else {
            obj[player.position].push(player);
        }
        return obj;
    }, {});
}
function getSquad(team_id) {
    const { sportmonksApi, squad } = constants_1.default;
    return sportmonksApi
        .get(squad, {
        id: 892,
        team_id,
        player: true,
        position: true,
    })
        .then((squadResponse) => {
        return parseSquad(squadResponse.data);
    });
}
exports.default = functions.https.onRequest((req, res) => {
    admin_1.default
        .firestore()
        .collection('teams')
        .get()
        .then(data => {
        return data.forEach(doc => {
            getSquad(doc.data().id).then(squad => {
                doc.ref.update({
                    squad,
                });
            });
        });
    })
        .then(() => res.send('done'));
});
//# sourceMappingURL=teamSquad.js.map