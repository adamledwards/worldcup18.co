import React, { Component } from 'react'
import moment from 'moment'
import { withContext } from '../../Context'
import { urls, history } from '../../routes'
import './Fixtures.css'

class Fixtures extends Component {
  static getDerivedStateFromProps(props, states) {
    const { params } = props.app
    const date = moment(params.date, 'DD-MM-YYYY')
    console.log(date, states.date)
    if (params.date !== states.dateString) {
      return {
        date,
        dateString: params.date,
        fixtures: null,
      }
    }

    return null
  }
  state = {
    fixtures: null,
    date: false,
  }

  goToFixture(matchId) {
    history.push(urls('match', { matchId }))
  }

  fetchFixtures() {
    const { db } = this.props.app
    const { date } = this.state
    if (!date.isValid()) {
      return
    }

    db.collection('fixtures')
      .where('starting_at', '>', date.startOf('day').unix())
      .where('starting_at', '<', date.endOf('day').unix())
      .orderBy('starting_at')
      .get()
      .then(querySnapshot => {
        this.setState({
          fixtures: querySnapshot.docs.map(q => q.data()),
        })
      })
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
    return fixtures.map(fixture => (
      <div
        className="s-7of7 FixturesScreen-item"
        key={fixture.id}
        onClick={() => this.goToFixture(fixture.id)}
      >
        <span className="FixturesScreen-item-match">
          {fixture.localTeam.team_name} vs {fixture.visitorTeam.team_name}
        </span>
        <span className="FixturesScreen-item-time">
          {moment(fixture.start.toDate()).format('H:mm')} / {fixture.venue}
        </span>
      </div>
    ))
  }

  render() {
    const { fixtures, date } = this.state
    const fixturesOrLoader = fixtures ? this.renderFixtures() : null
    if (!date) {
      return null
    }
    return (
      <div className="Grid FixturesScreen">
        <div className="s-7of7">
          <h2 className="Modal-h2">
            {date.format('DD MMM YYYY')}
            <br />Fixtures
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
