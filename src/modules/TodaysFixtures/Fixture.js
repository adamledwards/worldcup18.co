import React from 'react'
import './Fixture.css'
import moment from 'moment'

const Fixture = ({ localTeam, start, visitorTeam, venue }) => {
  return (
    <div className="Fixture">
      <div className="Grid-cell">
        <h3 className="Fixture-match">
          {localTeam.team_name} vs {visitorTeam.team_name}{' '}
        </h3>
        <p className="Fixture-timeDate">
          {moment(start.toDate()).format('HH:mm / DD-MM-YYYY')}
        </p>
        <p className="Fixture-venue">{venue}</p>
      </div>
    </div>
  )
}

export default Fixture
