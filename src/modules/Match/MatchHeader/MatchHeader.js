import React from 'react'
import moment from 'moment'
import './MatchHeader.css'

const status = (mt, dateTime) => {
  switch (mt.status) {
    case 'FT': {
      return 'Full Time'
    }
    case 'HT': {
      return 'Half Time'
    }
    case 'LIVE': {
      const added = mt.added_time ? `+ ${mt.added_time}` : ''
      return `Live ${mt.minute + added} mins`
    }
    default: {
      return dateTime.format('HH:mm')
    }
  }
}

const goalType = type => {
  switch (type) {
    case 'own-goal': {
      return ' OG'
    }
    case 'penalty': {
      return ' Pen'
    }
    default: {
      return ''
    }
  }
}

const MatchHeader = ({
  venue,
  matchTime,
  time,
  localTeam,
  visitorTeam,
  group,
}) => {
  //const localGoals = details && goalSorter(details.localTeam.goals)
  const dateTime = moment(time.toDate())
  return (
    <header className="MatchHeader Grid">
      <h2 className="Grid-cell s-7of7">
        {localTeam.team_name} {localTeam.score} — {visitorTeam.score}{' '}
        {visitorTeam.team_name}{' '}
      </h2>
      <span className="Grid-cell s-7of7 MatchHeader-detail">
        {status(matchTime, dateTime)}
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
