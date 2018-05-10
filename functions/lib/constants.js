"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const sportmonks_1 = require("sportmonks");
exports.default = {
    groups: 'v2.0/standings/season/{id}',
    fixtures: 'v2.0/fixtures/between/{from}/{to}',
    teams: 'v2.0/teams/season/{id}',
    squad: 'v2.0/squad/season/{id}/team/{team_id}',
    appSettings: {
        date: {
            start: '2018-06-01',
            end: '2018-07-31'
        }
    },
    sportmonksApi: new sportmonks_1.SportmonksApi(functions.config().football.key)
};
//# sourceMappingURL=constants.js.map