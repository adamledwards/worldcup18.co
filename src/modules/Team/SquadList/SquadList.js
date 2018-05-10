import React, { Component } from 'react'
import './SquadList.css'

const roles = ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards']
export class SquadList extends Component {
  render() {
    return (
      <div className="SquadList">
        <div className="Grid">
          <h2 className="Grid-cell s-7of7 SquadList-header">Squad list</h2>
        </div>
        {roles.map((role, i) => (
          <div className="SquadList-section">
            <div className="SquadList-section-header Grid">
              <h3 className="Grid-cell s-5of7 SquadList-section-role SquadList-mobile">
                &mdash; {role}
              </h3>
              {i === 0 && [
                <span className="Grid-cell s-1of7 lg-1of14 push-lg-10of14 text-center">
                  A<span>pps</span>
                </span>,
                <span className="Grid-cell s-1of7 lg-1of14 text-center">
                  G<span>oals</span>
                </span>,
              ]}
            </div>
            <div className="Grid">
              <h3 className="Grid-cell s-5of7 lg-3of14 push-lg-2of14 SquadList-section-role SquadList-desktop">
                &mdash; {role}
              </h3>
              <span className="Grid-cell s-5of7 lg-5of14 SquadList-player">Player One</span>
              <span className="Grid-cell s-1of7 lg-1of14 text-center">3</span>
              <span className="Grid-cell s-1of7 lg-1of14 text-center">0</span>
            </div>
            <div className="Grid">
              <span className="Grid-cell s-5of7 lg-5of14 push-lg-5of14 SquadList-player">
                Player One
              </span>
              <span className="Grid-cell s-1of7 lg-1of14 text-center">3</span>
              <span className="Grid-cell s-1of7 lg-1of14 text-center">0</span>
            </div>
            <div className="Grid">
              <span className="Grid-cell s-5of7 lg-5of14 push-lg-5of14 SquadList-player">
                Player One
              </span>
              <span className="Grid-cell s-1of7 lg-1of14 text-center">3</span>
              <span className="Grid-cell s-1of7 lg-1of14 text-center">0</span>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default SquadList
