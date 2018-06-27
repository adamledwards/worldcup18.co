import React from 'react'
import './Fixture.css'
import moment from 'moment'
import Fade from 'react-reveal/Fade'
import classnames from 'classnames'
import { urls, history } from '../../routes'

const goToFixture = (id, enabled) => {
  if (enabled) {
    history.push(urls('match', { matchId: id }))
  }
}

const statusFormat = (mt, dateTime) => {
  const added = mt.added_time ? `+ ${mt.added_time}` : ''
  switch (mt.status) {
    case 'FT': {
      return 'Full Time'
    }
    case 'HT': {
      return 'Half Time'
    }
    case 'LIVE': {
      return `Live ${mt.minute + added} mins`
    }
    default: {
      return dateTime.format('HH:mm / DD-MM-YYYY')
    }
  }
}

const Fixture = ({
  localTeam,
  start,
  visitorTeam,
  venue,
  time,
  enabled,
  id,
}) => {
  const score =
    time.status !== 'NS'
      ? `${localTeam.team_name} ${localTeam.score} \u2014 ${
          visitorTeam.score
        } ${visitorTeam.team_name}`
      : `${localTeam.team_name} vs ${visitorTeam.team_name}`
  return (
    <Fade>
      <div
        className={classnames('Fixture', { active: enabled })}
        onClick={() => goToFixture(id, enabled)}
      >
        <div className="Grid-cell">
          <h3 className="Fixture-match">{score}</h3>
          <p className="Fixture-timeDate">
            {statusFormat(time, moment(start.toDate()))}
          </p>
          <p className="Fixture-venue">{venue}</p>
        </div>
      </div>
    </Fade>
  )
}

export default Fixture
