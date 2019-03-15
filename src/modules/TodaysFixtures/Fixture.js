import React from 'react'
import './Fixture.css'
import moment from 'moment'
import Fade from 'react-reveal/Fade'
import classnames from 'classnames'
import { urls, history } from '../../routes'
import { penalty } from '../../core/utils/match'

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
    case 'PEN_LIVE': {
      return 'Penalties'
    }
    case 'LIVE': {
      return `Live ${mt.minute + added} mins`
    }
    case 'FT_PEN':
    case 'AET': {
      return 'Full Time AET'
    }
    default: {
      return dateTime.format('HH:mm / DD-MM-YYYY')
    }
  }
}

const Score = props => {
  const { localTeam, visitorTeam, time } = props
  let score = `${localTeam.team_name} vs ${visitorTeam.team_name}`

  if (time.status === 'FT_PEN' || time.status === 'PEN_LIVE') {
    score = (
      <React.Fragment>
        {localTeam.team_name} {localTeam.score} &mdash; {visitorTeam.score}{' '}
        {visitorTeam.team_name} AET
        <span className="penalty">{penalty(props)}</span>
      </React.Fragment>
    )
  } else if (time.status !== 'NS') {
    score = `${localTeam.team_name} ${localTeam.score} \u2014 ${
      visitorTeam.score
    } ${visitorTeam.team_name}`
  }
  return score
}

const Fixture = props => {
  const { localTeam, start, visitorTeam, venue, time, enabled, id } = props

  return (
    <Fade>
      <div
        className={classnames('Fixture', { active: enabled })}
        onClick={() => goToFixture(id, enabled)}
      >
        <div className="Grid-cell">
          <h3 className="Fixture-match">
            <Score {...props} />
          </h3>
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
