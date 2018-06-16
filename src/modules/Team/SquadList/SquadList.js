import React, { Fragment, Component } from 'react'
import teams from '../../../teams'
import './SquadList.css'
import Fade from 'react-reveal/Fade'

const roles = {
  Goalkeeper: 'Goalkeepers',
  Defender: 'Defenders',
  Midfielder: 'Midfielders',
  Attacker: 'Forwards',
}

const Player = ({ name, goals, appearences }) => (
  <Fragment>
    <span className="Grid-cell s-5of7 push-lg-5of14 lg-5of14 SquadList-player">
      {name}
    </span>
    <span className="Grid-cell s-1of7 lg-1of14 text-center">
      {appearences || 0}
    </span>
    <span className="Grid-cell s-1of7 lg-1of14 text-center">{goals || 0}</span>
  </Fragment>
)

export class SquadList extends Component {
  render() {
    const { team } = this.props

    if (!team.squad) {
      return null
    }
    const { bodyTextColour } = teams[team.key]
    return (
      <div className="SquadList" style={{ color: bodyTextColour }}>
        <div className="Grid">
          <h2 className="Grid-cell s-7of7 SquadList-header">Squad list</h2>
        </div>
        {Object.keys(roles).map((role, i) => (
          <Fade key={roles[role]}>
            <div className="SquadList-section" key={roles[role]}>
              <div className="SquadList-section-header Grid">
                <h3 className="Grid-cell s-5of7 SquadList-section-role SquadList-mobile">
                  &mdash; {roles[role]}
                </h3>
                {i === 0 && (
                  <React.Fragment>
                    <span className="Grid-cell s-1of7 lg-1of14 push-lg-10of14 text-center">
                      A<span>pps</span>
                    </span>
                    <span className="Grid-cell s-1of7 lg-1of14 text-center">
                      G<span>oals</span>
                    </span>
                  </React.Fragment>
                )}
              </div>
              <div className="Grid">
                <h3 className="Grid-cell s-5of7 lg-3of14 push-lg-2of14 SquadList-section-role SquadList-desktop">
                  &mdash; {roles[role]}
                </h3>
                <span className="Grid-cell s-5of7 lg-5of14 SquadList-player">
                  {team.squad[role][0].name}
                </span>
                <span className="Grid-cell s-1of7 lg-1of14 text-center">
                  {team.squad[role][0].appearences || 0}
                </span>
                <span className="Grid-cell s-1of7 lg-1of14 text-center">
                  {team.squad[role][0].goals || 0}
                </span>
              </div>
              {team.squad[role].slice(1).map(props => (
                <div className="Grid" key={props.id}>
                  <Player {...props} />
                </div>
              ))}
            </div>
          </Fade>
        ))}
      </div>
    )
  }
}

export default SquadList
