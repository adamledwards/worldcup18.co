import React, { Component } from 'react'
import moment from 'moment'
import { withContext } from '../../Context'
import { urls, history } from '../../routes'
import './Fixtures.css'

class Fixtures extends Component {
  static getDerivedStateFromProps(props, states) {
    const { params } = props.app
    const date = moment(params.date, 'DD-MM-YYYY')
    if (params.date !== states.dateString) {
      return {
        date,
        dateString: params.date,
        fixtures: null,
        lastDate: states.date,
      }
    }

    return null
  }
  state = {
    fixtures: null,
    dateString: '',
    date: false,
    lastDate: false,
  }

  goToFixture(fixture) {
    if (fixture.enabled) {
      history.push(urls('match', { matchId: fixture.id }))
    }
  }

  fetchFixtures() {
    const { db } = this.props.app
    const { date } = this.state
    if (!date.isValid()) {
      return
    }

    db.collection('fixtures')
      .where('start', '>', date.startOf('day').toDate())
      .where('start', '<', date.endOf('day').toDate())
      .orderBy('start')
      .get()
      .then(querySnapshot => {
        this.setState({
          fixtures: querySnapshot.docs.map(q => q.data()),
        })
      })
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { date } = this.state
    return date.isValid()
  }
  componentDidMount() {
    this.fetchFixtures()
  }

  componentDidUpdate() {
    if (this.state.fixtures === null) {
      this.fetchFixtures()
    }
  }

  renderFixtures() {
    const { fixtures } = this.state

    return fixtures.map(fixture => {
      const { time, localTeam, visitorTeam } = fixture
      const score =
        time.status !== 'NS'
          ? `${localTeam.team_name} ${localTeam.score} \u2014 ${
              visitorTeam.score
            } ${visitorTeam.team_name}`
          : `${localTeam.team_name} vs ${visitorTeam.team_name}`
      return (
        <div
          className="s-7of7 FixturesScreen-item"
          key={fixture.id}
          onClick={() => this.goToFixture(fixture.id)}
        >
          <span className="FixturesScreen-item-match">{score}</span>
          <span className="FixturesScreen-item-time">
            {moment(fixture.start.toDate()).format('H:mm')} / {fixture.venue}
          </span>
        </div>
      )
    })
  }

  render() {
    const { fixtures, date, lastDate } = this.state
    const fixturesOrLoader = fixtures ? this.renderFixtures() : null
    if (!date) {
      return null
    }
    const today = moment().startOf('day')
    const selectedDate = date.isValid() ? date : lastDate
    selectedDate.startOf('day')
    return (
      <div className="Grid FixturesScreen">
        <div className="s-7of7">
          <h2 className="Modal-h2">
            {selectedDate.format('DD MMM YYYY')}
            <br />
            {today.diff(selectedDate, 'days') > 0 ? 'Results' : 'Fixtures'}
          </h2>
          <div className="separator">
            <span className="bar" />
          </div>
        </div>
        {fixturesOrLoader}
      </div>
    )
  }
}

export default withContext(Fixtures)
