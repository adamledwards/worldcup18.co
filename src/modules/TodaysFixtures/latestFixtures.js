import moment from 'moment'
import offlineDb from '../../core/db'

const dateArgs = [
  'start',
  '>',
  moment()
    .startOf('day')
    .toDate(),
]

export function getLatestFixture(db, isTeam) {
  const fixturesRef = db.collection('fixtures')
  // Today
  const todayPromise = fixturesRef
    .where(...dateArgs)
    .where(
      'start',
      '<',
      moment()
        .endOf('day')
        .toDate()
    )
    .where('status.TODAY', '==', true)
    .get()
    .then(todayRef => {
      if (todayRef.empty) {
        return null
      }
      return todayRef
    })

  //UpComing
  const upcomingPromise = fixturesRef
    .where('start', '>', moment().toDate())
    .orderBy('start')
    .where('time.status', '==', 'NS')
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
        .toDate()
      if (isTeam) {
        method = 'limit'
        arg = 2
      }
      return fixturesRef
        .where('time.status', '==', 'NS')
        .orderBy('start')
        .startAt(startMatchRef)[method](arg)
        .get()
    })

    const latestPromise = fixturesRef
    .where(
      'start',
      '<',
      moment()
        .toDate()
    )
    .where('time.status', '==', 'FT')
    .orderBy('start', 'desc')
    .limit(4)
    .get()
    .then(todayRef => {
      if (todayRef.empty) {
        return null
      }
      return todayRef
    })


  return Promise.all([todayPromise, latestPromise, upcomingPromise]).then(
    ([today, latest, upcoming]) => {
      return {
        today: today && today.docs.map(d => d.data()),
        upcoming: upcoming && upcoming.docs.map(d => d.data()),
        latest: latest && latest.docs.map(d => d.data()),
      }
    }
  )
}

export function getLatestFixtureRealTime(db, cb) {
  const fixturesRef = db.collection('fixtures')
  // Today
  return fixturesRef
    .where(...dateArgs)
    .where(
      'start',
      '<',
      moment()
        .endOf('day')
        .toDate()
    )
    .where('status.TODAY', '==', true)
    .onSnapshot(today => {
      cb({
        today: today && today.docs.map(d => d.data()),
      })
    })
}

export function getLatestFixtureOffline(db, isTeam) {

  // Today

  const todayPromise = offlineDb.table('fixtures')
    .where('starting_at')
    .above(moment().startOf('day').unix())
    .and(value => {
      return moment().endOf('day').unix() > value.starting_at
    })
    .toArray(todayRef => {
      console.log(todayRef)
      if (!todayRef.length) {
        return null
      }

      return todayRef
    })

  //UpComing
  const latestPromise = offlineDb.table('fixtures')
    .where('starting_at')
    .below(moment().unix())
    .sortBy('starting_at')
    .then(upcomingRef => {
      if (!upcomingRef.length) {
        return null
      }
      offlineDb.table('fixtures')
      .where('starting_at')
      .above(moment().startOf('day').unix())
      const startMatchRef = upcomingRef[0]
      const endDay = moment(startMatchRef.starting_at * 1000)
        .endOf('day')
        .unix()
      return offlineDb.table('fixtures')
        .where('starting_at')
        .below(endDay)
        .toArray(data => {
          if (!data.length) {
            return null
          }

          return data
        })
    })

  const upcomingPromise = offlineDb.table('fixtures')
    .where('starting_at')
    .above(moment().unix())
    .sortBy('starting_at')
    .then(data => {
      if (!data.length) {
        return null
      }
      return data[0]
    })
    .then(latestRef => {
      if (!latestRef) {
        return null
      }

      return offlineDb.table('fixtures')
        .where('starting_at')
        .above(moment(latestRef.starting_at * 1000).startOf('day').unix())
        .and(value => {
          return moment(latestRef.starting_at * 1000).endOf('day').unix() > value.starting_at
        })
        .toArray(arr => arr)

    })

    return Promise.all([todayPromise, latestPromise, upcomingPromise]).then(
    ([today, latest, upcoming]) => {
      console.log({
        today,
        upcoming,
        latest,
      })
      return {
        today,
        upcoming,
        latest,
      }
    }
  )
}
