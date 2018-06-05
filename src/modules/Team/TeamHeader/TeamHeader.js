import React, { Component } from 'react'
import Link from '../../../core/Link'
import Nav from '../../../core/Nav'
import firebase from 'firebase'
import { withContext } from '../../../Context'
import teams from '../../../teams'
import Granim from '../../../core/Granim'
import './TeamHeader.css'

class TeamHeader extends Component {
  state = {
    key: null,
    style: {
      color: null,
      background: null,
    },
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { team } = nextProps
    const teamColours = teams[team.key]
    if (nextProps.key !== prevState.key) {
      return {
        key: team.key,
        style: {
          color: teamColours.headerTextColour,
          background: `linear-gradient(${teamColours.gradient})`,
        },
      }
    }
    return null
  }

  render() {
    const { team } = this.props
    const { style } = this.state
    return (
      <div className="TeamHeader" style={style}>
        <Nav />
        <div className="Grid Grid-vertical-center">
          <div className="Grid-cell s-7of7 lg-10of14">
            <h1 className="TeamHeader-intro">{team.name}</h1>
            <span className="TeamHeader-ranking">
              &mdash; FIFA World Ranking /{' '}
              {team.fifaranking && team.fifaranking.position}
            </span>
          </div>
          <div className="TeamHeader-info Grid-cell s-7of7 lg-4of14">
            <dl className="TeamHeader-detail">
              <dt>Head Coach</dt>
              <dd>{team.coach}</dd>
              <dt>Captain</dt>
              <dd>{team.captain}</dd>
              <dt>World Cup History</dt>
              <dd>{team.history}</dd>
              {team.teamWebsite && (
                <dd className="TeamHeader-website">
                  <Link>{team.teamWebsite}</Link>
                </dd>
              )}
            </dl>
          </div>
        </div>
        <div className="Grid">
          <h3 className="TeamHeader-group Grid-cell">&mdash; {team.group}</h3>
        </div>
      </div>
    )
  }
}

TeamHeader.defaultProps = {
  team: {},
}

export default TeamHeader
