import React from 'react'
import './Fixture.css'
import moment from 'moment'
import Fade from 'react-reveal/Fade'

const Fixture = ({ localTeam, start, visitorTeam, venue, time }) => {
  const score =
    time.status !== 'NS'
      ? `${localTeam.team_name} ${localTeam.score} \u2014 ${
          visitorTeam.score
        } ${visitorTeam.team_name}`
      : `${localTeam.team_name} vs ${visitorTeam.team_name}`
  return (
    <Fade>
      <div className="Fixture">
        <div className="Grid-cell">
          <h3 className="Fixture-match">{score}</h3>
          <p className="Fixture-timeDate">
            {moment(start.toDate()).format('HH:mm / DD-MM-YYYY')}
          </p>
          <p className="Fixture-venue">{venue}</p>
        </div>
      </div>
    </Fade>
  )
}

export default Fixture
