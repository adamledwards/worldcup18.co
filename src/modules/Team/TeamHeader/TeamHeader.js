import React, { Component } from 'react'
import classNames from 'classnames'
import Nav from '../../../core/Nav'
import teams from '../../../teams'
import './TeamHeader.css'

class TeamHeader extends Component {
  state = {
    animate: false,
    key: null,
    style: {
      color: null,
      background: null,
    },
    highlight: null,
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true })
    }, 1)
  }

  render() {
    const { team } = this.props
    const { style, animate } = this.state
    return (
      <div className={classNames('TeamHeader', { animate })} style={style}>
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
                  <a href={'http://' + team.teamWebsite}>Team Website</a>
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
