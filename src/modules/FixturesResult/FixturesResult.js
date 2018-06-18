import React, { Component } from 'react'
import Calendar from './Calendar'
import { getLatestFixtureRealTime } from '../TodaysFixtures/latestFixtures'
import { withContext } from '../../Context'
import './FixturesResult.css'

class FixturesResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fixtures: [],
    }
  }

  componentDidMount() {
    const { db } = this.props.app
    this.unsubscribe = getLatestFixtureRealTime(db, today => {
      this.setState({
        live: this.state.fixtures.map(d => {
          const index = today.findIndex(t => t.id === d.id)
          return today[index] || d
        }),
      })
    })
    db.collection('fixtures')
      .orderBy('start')
      .get()
      .then(querySnapshot => {
        this.setState({
          fixtures: querySnapshot.docs.map(q => q.data()),
        })
      })
  }

  render() {
    const { fixtures } = this.state
    return (
      <div className="FixturesResult">
        <div className="Grid">
          <h2 className="Grid-cell s-7of7">Fixtures &amp; Results</h2>
        </div>
        <Calendar fixtures={fixtures} />
      </div>
    )
  }
}

export default withContext(FixturesResult)
