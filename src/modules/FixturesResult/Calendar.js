import React, { Component } from 'react'
import moment from 'moment'
import Link from '../../core/Link'
import { urls } from '../../routes'
import CalendarHeader from './CalendarHeader'
import settings from '../../settings'
import './Calendar.css'

const startDate = moment(settings.date.start)
const endDate = moment(settings.date.end)

class Calendar extends Component {
  goToFixtures(fixtures, nextDay) {
    if (fixtures.length) {
      urls
    }
  }
  getFillerDays(date) {
    //get start of week filler days
    const filler = []
    const startOfWeek = moment(date).startOf('isoWeek')
    const startOfWeekDiff = date.diff(startOfWeek, 'days')
    for (let ix = 0; ix < startOfWeekDiff; ix++) {
      filler.push(
        <span
          key={`filler-${ix}`}
          className="Calendar-date Grid-cell s-1of7 filler"
        >
          <span className="Calendar-dayofmonth">
            {moment(startOfWeek)
              .add(ix, 'days')
              .format('DD')}
          </span>
        </span>
      )
    }
    return filler
  }

  formatData() {
    const { fixtures } = this.props
    return fixtures.reduce((obj, cur) => {
      const key = moment(cur.start)
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

  renderFixture(fixture) {
    return (
      <span className="Calendar-fixture" key={fixture.id}>
        <span className="Calendar-fixture-match">
          {fixture.localTeam.team_name} vs<br />
          {fixture.visitorTeam.team_name}{' '}
        </span>
        <span className="Calendar-fixture-time">
          {moment(fixture.start).format('H:mm')}
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
        //get start of week filler days
        calendarEL.concat(this.getFillerDays(nextDay))
      }
      const key = nextDay.valueOf()
      const fixturesEL = (fixtures[key] || []).map(this.renderFixture)
      calendarEL.push(
        <span key={`day-${i}`} className="Calendar-date Grid-cell s-1of7">
          <span className="Calendar-dayofmonth">{nextDay.format('DD')}</span>
          {fixturesEL}
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
    return (
      <div className="Calendar">
        <div className="Grid">{this.renderCalendar()}</div>
      </div>
    )
  }
}

export default Calendar
