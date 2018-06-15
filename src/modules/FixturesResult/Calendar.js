import React, { Component } from 'react'
import moment from 'moment'
import Link from '../../core/Link'
import { urls, history } from '../../routes'
import CalendarHeader from './CalendarHeader'
import Fade from 'react-reveal/Fade'
import classNames from 'classnames'
import settings from '../../settings'
import './Calendar.css'

const startDate = moment(settings.date.start)
const endDate = moment(settings.date.end)

class Calendar extends Component {
  getFillerDays(date) {
    //get start of week filler days
    const filler = []
    const startOfWeek = moment(date).startOf('isoWeek')
    const startOfWeekDiff = date.diff(startOfWeek, 'days')
    for (let ix = 0; ix < startOfWeekDiff; ix++) {
      const weekMoment = moment(startOfWeek).add(ix, 'days')
      filler.push(
        <span
          key={`filler-${weekMoment.unix()}`}
          className="Calendar-date Grid-cell s-1of7 filler"
        >
          <span className="Calendar-dayofmonth">{weekMoment.format('DD')}</span>
        </span>
      )
    }
    return filler
  }

  formatData() {
    const { fixtures } = this.props
    return fixtures.reduce((obj, cur) => {
      const key = moment(cur.start.toDate())
        .startOf('day')
        .valueOf()
      if (obj[key]) {
        obj[key].push(cur)
      } else {
        obj[key] = [cur]
      }
      return obj
    }, {})
  }

  goToFixture(fixture) {
    if (fixture.enabled) {
      history.push(urls('match', { matchId: fixture.id }))
    }
  }

  renderFixture(fixture) {
    let score = (
      <span className="Calendar-fixture-match">
        {fixture.localTeam.team_name} vs<br />
        {fixture.visitorTeam.team_name}
      </span>
    )
    if (fixture.time.status !== 'NS') {
      score = (
        <span className="Calendar-fixture-match">
          {fixture.localTeam.team_name} {fixture.localTeam.score} &mdash;{' '}
          {fixture.visitorTeam.score}
          <br />
          {fixture.visitorTeam.team_name}
        </span>
      )
    }

    return (
      <span
        className={classNames('Calendar-fixture', { active: fixture.enabled })}
        key={fixture.id}
        onClick={() => this.goToFixture(fixture)}
      >
        <span className="Calendar-fixture-match">{score}</span>
        <span className="Calendar-fixture-time">
          {moment(fixture.start.toDate()).format('H:mm')}
          <br />
          {fixture.venue}
        </span>
      </span>
    )
  }

  renderCalendar() {
    const days = endDate.diff(startDate, 'days')
    const fixtures = this.formatData()
    let calendarEL = [
      <CalendarHeader key="header" month={moment.months(5)} />,
      ...this.getFillerDays(startDate),
    ]

    for (let i = 0; i <= days; i++) {
      const nextDay = moment(startDate).add(i, 'days')

      if (
        moment(nextDay)
          .subtract(1, 'days')
          .month() !== nextDay.month()
      ) {
        calendarEL.push(
          <CalendarHeader
            className="Calendar-header--withSpace"
            month={moment.months(nextDay.month())}
            key={`header-${i}`}
          />
        )
        calendarEL = [...calendarEL, ...this.getFillerDays(nextDay)]

        //get start of week filler days
        // calendarEL.concat(this.getFillerDays(nextDay))
      }
      const key = nextDay.valueOf()
      const fixturesEL = (fixtures[key] || []).map(fixture =>
        this.renderFixture(fixture)
      )
      calendarEL.push(
        <span
          key={`day-${i}`}
          className={`Calendar-date Grid-cell s-1of7${
            fixturesEL.length ? '' : ' filler'
          } `}
        >
          <span className="Calendar-dayofmonth">{nextDay.format('DD')}</span>
          <Fade>
            <div>{fixturesEL}</div>
          </Fade>
          {fixturesEL.length > 0 && (
            <Link
              className="Calendar-fixture-link"
              href={urls('fixtures', { date: nextDay.format('DD-MM-YYYY') })}
            />
          )}
        </span>
      )
    }

    return calendarEL
  }

  render() {
    const { fixtures } = this.props

    return (
      <div className={classNames('Calendar', { animate: fixtures })}>
        <div className="Grid">{this.renderCalendar()}</div>
      </div>
    )
  }
}

export default Calendar
