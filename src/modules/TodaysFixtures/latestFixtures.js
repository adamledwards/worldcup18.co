import moment from 'moment'
const dateArgs = [
  'starting_at',
  '>',
  moment()
    .startOf('day')
    .unix(),
]

export function getLatestFixture(db, isTeam) {
  const fixturesRef = db.collection('fixtures')
  // Today
  const today = fixturesRef
    .where(...dateArgs)
    .where(
      'starting_at',
      '<',
      moment()
        .endOf('day')
        .unix()
    )
    .get()
    .then(todayRef => {
      if (todayRef.empty) {
        return null
      }
      return todayRef
    })

  //UpComing
  const upcoming = fixturesRef
    .where('starting_at', '>', moment().unix())
    .orderBy('starting_at')
    .limit(1)
    .get()
    .then(upcomingRef => {
      if (upcomingRef.empty) {
        return null
      }
      const startMatchRef = upcomingRef.docs[0]
      let method = 'endAt'
      let arg = moment(startMatchRef.data().start.toDate())
        .endOf('day')
        .unix()
      if (isTeam) {
        method = 'limit'
        arg = 2
      }
      return fixturesRef
        .orderBy('starting_at')
        .startAt(startMatchRef)[method](arg)
        .get()
    })

  const latest = fixturesRef
    .where(
      'starting_at',
      '<',
      moment()
        .startOf('day')
        .unix()
    )
    .orderBy('starting_at')
    .limit(1)
    .get()
    .then(latestRef => {
      if (latestRef.empty) {
        return null
      }
      const startMatchRef = latestRef.docs[0]
      return fixturesRef
        .orderBy('starting_at')
        .startAt(startMatchRef)
        .endAt(
          moment(startMatchRef.data().start.toDate())
            .endOf('day')
            .unix()
        )
        .get()
    })

  return Promise.all([today, latest, upcoming]).then(
    ([today, latest, upcoming]) => {
      return {
        today: today && today.docs.map(d => d.data()),
        upcoming: upcoming && upcoming.docs.map(d => d.data()),
        latest: latest && latest.docs.map(d => d.data()),
      }
    }
  )
}
