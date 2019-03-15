import React from 'react'
import moment from 'moment'
import { penalty, status } from '../../../core/utils/match'
import './MatchHeader.css'

const MatchHeader = ({
  venue,
  matchTime,
  time,
  localTeam,
  visitorTeam,
  group,
  stage,
}) => {
  const dateTime = moment(time.toDate())
  const pens = penalty({ localTeam, time: matchTime, visitorTeam })
  return (
    <header className="MatchHeader Grid">
      <h2 className="Grid-cell s-7of7">
        {localTeam.team_name} {localTeam.score} — {visitorTeam.score}{' '}
        {visitorTeam.team_name}
      </h2>
      {pens && <span className="MatchHeader-detail Grid-cell">{pens}</span>}
      <span className="Grid-cell s-7of7 MatchHeader-detail">
        {status(matchTime, dateTime)}
        <span className="MatchHeader-divider">|</span>
        {dateTime.format('DD-MM-YY')}
        <span className="MatchHeader-divider">|</span>
        {venue}
        <span className="MatchHeader-divider">|</span>
        {group || stage}
      </span>
    </header>
  )
}

export default MatchHeader
