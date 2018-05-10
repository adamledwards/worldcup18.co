import React, { Component } from 'react'
import './TopScorers.css'
class TopScorers extends Component {
  renderRow(idx) {
    return (
      <div className="Grid TopScorers-row" key={idx}>
        <span className="Grid-cell TopScorers-position push-lg-1of14 lg-1of14">{idx + 1}</span>
        <span className="Grid-cell TopScorers-name s-4of7 lg-4of14">
          Adam Edwards
          <span className="TopScorers-team">England</span>
        </span>
        <span className="TopScorers-team lg-4of14">England</span>
        <span className="Grid-cell TopScorers-app s-1of7 lg-1of14">2</span>
        <span className="Grid-cell TopScorers-goals s-1of7 lg-1of14">4</span>
      </div>
    )
  }
  render() {
    return (
      <div className="TopScorers">
        <div className="Grid">
          <h2 className="Grid-cell">Top Scorers</h2>
        </div>
        <div className="Grid TopScorers-header">
          <span className="Grid-cell s-1of7 push-s-5of7 push-lg-10of14 lg-1of14">
            A<span className='full'>pps</span>
          </span>
          <span className="Grid-cell s-1of7 lg-1of14">
            G<span className='full'>oals</span>
          </span>
      </div>
        {Array.from({ length: 10 }, (_, idx) => this.renderRow(idx))}
      </div>
    )
  }
}

export default TopScorers