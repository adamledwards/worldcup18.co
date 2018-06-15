import Dexie from 'dexie'
const db = new Dexie('worldcup18')
db.version(1).stores({
  fixtures: 'id, localTeamId, visitorTeamId, starting_at',
  teams: 'id',
  groups: 'id',
})
export default db
