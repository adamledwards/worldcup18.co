"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groupStanding_1 = require("./groupStanding");
const fixtures_1 = require("./fixtures");
const teams_1 = require("./teams");
const functions = require("firebase-functions");
exports.groupStandings = groupStanding_1.default;
exports.fixtures = fixtures_1.default;
exports.teams = teams_1.default;
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map