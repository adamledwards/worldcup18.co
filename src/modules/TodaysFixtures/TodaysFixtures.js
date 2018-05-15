import React, { Component } from 'react'
import Fixture from './Fixture.js'
import './TodaysFixtures.css'
import moment from 'moment'
import { getLatestFixture } from './latestFixtures.js'
import { withContext } from '../../Context'

//Today Fixtures or Upcoming
//Latest Fixtures or nothing

class TodaysFixtures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fixtures: {},
    }
  }

  componentDidMount() {
    const { teamRef } = this.props
    const { db } = this.props.app
    let fixtures = null
    if (teamRef) {
      fixtures = getLatestFixture(teamRef, true)
    } else {
      fixtures = getLatestFixture(db)
    }
    fixtures.then(fixtures => {
      this.setState({ fixtures })
    })
  }

  renderFixtures(header, data) {
    return (
      <div className="Grid">
        <h2 className="Grid-cell s-7of7">{header}</h2>
        <div className="Grid-cell s-7of7 TodaysFixtures-seperator">
          <span className="bar" />
        </div>
        {data.map(props => <Fixture {...props} key={props.id} />)}
      </div>
    )
  }
  render() {
    const { fixtures } = this.state
    let fixture = null
    if (fixtures.today) {
      fixture = this.renderFixtures("Today's Fixtures", fixtures.today)
    } else if (fixtures.upcoming) {
      fixture = this.renderFixtures('Upcoming Fixtures', fixtures.upcoming)
    }
    const latest =
      fixtures.latest && this.renderFixtures('Latest Results', fixtures.latest)

    return (
      <section className="TodaysFixtures">
        <div className="TodaysFixtures-wrapper">
          {fixture}
          {latest}
        </div>
      </section>
    )
  }
}

export default withContext(TodaysFixtures)
