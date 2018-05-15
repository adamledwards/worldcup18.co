import React, { Component } from 'react'
import moment from 'moment'
import { withContext } from '../../Context'
import './Fixtures.css'

class Fixtures extends Component {
  static getDerivedStateFromProps(nextProps, prevStates) {
    const { params } = nextProps.app
    const date = moment(params.date, 'DD-MM-YYYY')
    if (date.isValid()) {
      return {
        date,
        fixtures: null,
      }
    }
    return {
      date: date.isValid(),
      fixtures: null,
    }
  }
  state = {
    fixtures: null,
    date: false,
  }

  fetchFixtures() {
    const { db } = this.props.app
    const { date } = this.state
    if (!date) {
      return
    }

    db
      .collection('fixtures')
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

  componentDidMount() {
    this.fetchFixtures()
  }

  componentDidUpdate() {
    this.fetchFixtures()
  }

  renderFixtures() {
    const { fixtures } = this.state
    return fixtures.map(fixture => (
      <div className="s-7of7 FixturesScreen-item" key={fixture.id}>
        <span className="FixturesScreen-item-match">
          {fixture.localTeam.team_name} vs {fixture.visitorTeam.team_name}
        </span>
        <span className="FixturesScreen-item-time">
          {moment(fixture.start).format('H:mm')} / {fixture.venue}
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
