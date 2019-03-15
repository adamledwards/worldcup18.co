import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { goalType, penalty } from '../../../core/utils/match'
import './MatchGoals.css'

const Score = ({ team, score, goals }) => (
  <div className="MatchGoals-item">
    <div className="MatchGoals-text">
      <span className="MatchGoals-team">{team}</span>
      {goals &&
        goals.sort((a, b) => a.id - b.id).map(goal => (
          <span className="MatchGoals-players" key={goal.id}>
            {`${goal.player_name.split('.')[1] || goal.player_name} (${
              goal.minute
            }${goal.extra_minute ? '+' + goal.extra_minute : ''}${goalType(
              goal.type
            )})`}
          </span>
        ))}
    </div>
    <span className="MatchGoals-goals">{score}</span>
  </div>
)

export default class MatchGoals extends Component {
  render() {
    const { details, match } = this.props
    return (
      <Fade>
        <div className="MatchGoals Grid">
          <div className="MatchGoals-wrapper">
            <Score
              team={details.localTeam.team_name}
              score={details.localTeam.score}
              goals={details.localTeam.goals}
            />
            <span className="MatchGoals-separator">&mdash;</span>
            <Score
              team={details.visitorTeam.team_name}
              score={details.visitorTeam.score}
              goals={details.visitorTeam.goals}
            />
          </div>
          <span className="MatchGoals-penalty">{penalty(match)}</span>
        </div>
      </Fade>
    )
  }
}
