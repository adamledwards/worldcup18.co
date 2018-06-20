import React, { Component } from 'react'
import Fixture from './Fixture.js'
import './TodaysFixtures.css'
import { getLatestFixture, getLatestFixtureRealTime } from './latestFixtures.js'
import { withContext } from '../../Context'
import Fade from 'react-reveal/Fade'
import Loader from './loader'
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
      this.unsubscribe = getLatestFixtureRealTime(teamRef || db, today => {
        if (today.length) {
          this.setState({
            fixtures: {
              ...this.state.fixtures,
              ...today,
            },
          })
        }
      })
    }
    fixtures.then(fixtures => {
      this.setState({ fixtures })
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  renderFixtures(header, data) {
    return (
      <div className="Grid">
        <Fade key="readdeal">
          <h2 className="Grid-cell s-7of7">{header}</h2>
        </Fade>
        <div className="Grid-cell s-7of7 TodaysFixtures-seperator">
          <span className="bar" />
        </div>

        {data.map(props => <Fixture {...props} key={props.id} />)}
      </div>
    )
  }

  renderLoder() {
    return (
      <div className="Grid">
        <Fade bottom key="placeholder">
          <h2 className="Grid-cell s-7of7">
            Getting the latest fixtures <Loader />
          </h2>
        </Fade>
        <div className="Grid-cell s-7of7 TodaysFixtures-seperator">
          <span className="bar" />
        </div>
      </div>
    )
  }
  render() {
    const { fixtures } = this.state
    let fixture = this.renderLoder()
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
