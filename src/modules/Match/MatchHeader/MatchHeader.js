import React from 'react'
import moment from 'moment'
import './MatchHeader.css'

const MatchHeader = ({ venue, time, localTeam, visitorTeam, group }) => {
  const dateTime = moment(time.toDate())
  return (
    <header className="MatchHeader Grid">
      <h2 className="Grid-cell s-7of7">
        {localTeam.team_name} {localTeam.score} — {visitorTeam.score}{' '}
        {visitorTeam.team_name}{' '}
      </h2>
      <span className="Grid-cell s-7of7 MatchHeader-detail">
        {dateTime.format('HH:mm')}
        <span className="MatchHeader-divider">|</span>
        {dateTime.format('DD-MM-YY')}
        <span className="MatchHeader-divider">|</span>
        {venue}
        <span className="MatchHeader-divider">|</span>
        {group}
      </span>
    </header>
  )
}

export default MatchHeader
