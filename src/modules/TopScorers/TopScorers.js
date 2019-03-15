import React, { Component } from 'react'
import './TopScorers.css'
import { withContext } from '../../Context'
class TopScorers extends Component {
  state = {
    topScorer: [],
  }
  componentDidMount() {
    const { db } = this.props.app

    db.doc('app/topScorer')
      .get()
      .then(topScorer => {
        this.setState({
          topScorer: topScorer.exists ? topScorer.data().result : [],
        })
      })
  }
  renderRow(player, idx) {
    return (
      <div className="Grid TopScorers-row" key={idx}>
        <span className="Grid-cell TopScorers-position push-lg-1of14 lg-1of14">
          {idx + 1}
        </span>
        <span className="Grid-cell TopScorers-name s-4of7 lg-4of14">
          {player.name}
          <span className="TopScorers-team">{player.team.name}</span>
        </span>
        <span className="TopScorers-team lg-4of14">{player.team.name}</span>
        <span className="Grid-cell TopScorers-app s-1of7 lg-1of14">
          {player.appearences}
        </span>
        <span className="Grid-cell TopScorers-goals s-1of7 lg-1of14">
          {player.goals}
        </span>
      </div>
    )
  }
  render() {
    const { topScorer } = this.state
    return (
      <div className="TopScorers">
        <div className="Grid">
          <h2 className="Grid-cell">Top Scorers</h2>
        </div>
        <div className="Grid TopScorers-header">
          <span className="Grid-cell s-1of7 push-s-5of7 push-lg-10of14 lg-1of14">
            A<span className="full">pps</span>
          </span>
          <span className="Grid-cell s-1of7 lg-1of14">
            G<span className="full">oals</span>
          </span>
        </div>
        {topScorer.map((player, idx) => this.renderRow(player, idx))}
      </div>
    )
  }
}

export default withContext(TopScorers)
