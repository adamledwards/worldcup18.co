import moment from 'moment';
const dateArgs = [
  'start',
  '>',
  moment()
    .startOf('day')
    .toDate()
];

export function getLatestFixture(db, isTeam) {
  const fixturesRef = db.collection('fixtures');
  // Today
  const today = fixturesRef
    .where(...dateArgs)
    .where(
      'start',
      '<',
      moment()
        .endOf('day')
        .toDate()
    )
    .get()
    .then(todayRef => {
      if (todayRef.empty) {
        return null;
      }
      return todayRef;
    });

  //UpComing
  const upcoming = fixturesRef
    .where('start', '>', new Date())
    .orderBy('start')
    .limit(1)
    .get()
    .then(upcomingRef => {
      if (upcomingRef.empty) {
        return null;
      }
      const startMatchRef = upcomingRef.docs[0];
      let method = 'endAt';
      let arg = moment(startMatchRef.data().start)
        .endOf('day')
        .toDate();
      if (isTeam) {
        method = 'limit';
        arg = 2;
      }
      return fixturesRef
        .orderBy('start')
        .startAt(startMatchRef)
        [method](arg)
        .get();
    });

  const latest = fixturesRef
    .where(
      'start',
      '<',
      moment()
        .startOf('day')
        .toDate()
    )
    .orderBy('start')
    .limit(1)
    .get()
    .then(latestRef => {
      if (latestRef.empty) {
        return null;
      }
      const startMatchRef = latestRef.docs[0];
      return fixturesRef
        .orderBy('start')
        .startAt(startMatchRef)
        .endAt(
          moment(startMatchRef.data().start)
            .endOf('day')
            .toDate()
        )
        .get();
    });

  return Promise.all([today, latest, upcoming]).then(
    ([today, latest, upcoming]) => {
      return {
        today: today && today.docs.map(d => d.data()),
        upcoming: upcoming && upcoming.docs.map(d => d.data()),
        latest: latest && latest.docs.map(d => d.data())
      };
    }
  );
}
