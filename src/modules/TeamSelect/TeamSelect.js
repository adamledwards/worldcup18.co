import React, { Component } from 'react'
import { withContext } from '../../Context'
import Link from '../../core/Link'
import { urls } from '../../routes'
import teams from '../../teams'
import './TeamSelect.css'

const TeamLink = ({ team, name, hover }) => (
  <Link
    href={urls('team', { team })}
    className="TeamSelect-team"
    onMouseEnter={() => hover(team)}
    onMouseLeave={() => hover()}
  >
    {name}
  </Link>
)
class TeamSelect extends Component {
  state = {
    style: {},
  }
  hover = key => {
    this.props.changeGradientState(key)
    let style = {}
    if (teams[key]) {
      style = {
        color: teams[key].headerTextColour,
      }
    }
    this.setState({ style })
  }
  render() {
    const teamKey = Object.keys(teams)
    const { style } = this.state
    return (
      <div className="TeamSelect" style={style}>
        <div className="TeamSelect-inner">
          <div className="Grid">
            <h2 className="Grid-cell">&mdash; Select Team</h2>
          </div>
          <div className="Grid TeamSelect-Grid">
            <div className="Grid-cell">
              {teamKey.slice(0, teamKey.length / 2).map(team => {
                return (
                  <TeamLink
                    hover={this.hover}
                    key={teams[team].id}
                    name={teams[team].name}
                    team={team}
                  />
                )
              })}
            </div>
            <div className="Grid-cell">
              {teamKey.slice(teamKey.length / 2).map(team => {
                return (
                  <TeamLink
                    hover={this.hover}
                    key={teams[team].id}
                    name={teams[team].name}
                    team={team}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withContext(TeamSelect)
