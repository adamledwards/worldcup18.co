import React, { Component } from 'react'
import * as Icons from './icons'
import className from 'classnames'
import './MatchStats.css'

const IconMap = {
  goals: {
    Icon: Icons.Goals,
    title: 'Goals',
  },
  ballPossession: {
    Icon: Icons.BallPossession,
    title: 'Ball Possession',
  },
  corner: {
    Icon: Icons.Corner,
    title: 'Corners',
  },
  fouls: {
    Icon: Icons.Fouls,
    title: 'Fouls',
  },
  shotsOnGoal: {
    Icon: Icons.ShotsOnGoals,
    title: 'Total Shots',
  },
  shotsOffTarget: {
    Icon: Icons.ShotsOffTarget,
    title: 'Shots off Target',
  },
  shotsOnTarget: {
    Icon: Icons.ShotsOnTarget,
    title: 'Shots on Target',
  },
  offside: {
    Icon: Icons.OffSide,
    title: 'Offside',
  },
}

const MatchStatItem = ({ team, value, width, active }) => {
  const offset = active ? width * 100 : 100

  return (
    <span className="MatchStats-teamStat">
      <span className="MatchStats-teamStat-team">{team.short_code}</span>
      <span className="MatchStats-teamStat-bar">
        <span className="bar" />
        <span className="mask" style={{ width: `${100 - offset}%` }} />
      </span>
      <span className="MatchStats-teamStat-value">{value || 0}</span>
    </span>
  )
}

export default class MatchStats extends Component {
  render() {
    const {
      localTeam,
      visitorTeam,
      localTeamValue,
      visitorTeamValue,
      type,
      active,
    } = this.props
    const visitorValue = visitorTeamValue || 0
    const localValue = localTeamValue || 0
    const max = Math.max(parseInt(localValue, 0), parseInt(visitorValue, 0))

    const { Icon, title } = IconMap[type]
    const matchStatsClass = className('MatchStats', { disabled: !active })
    return (
      <section className={matchStatsClass}>
        <div className="Grid MatchStats-icon">
          <Icon />
          <span className="MatchStats-type">{title}</span>
        </div>
        <div className="Grid">
          <div className="MatchStats-teamStatWrapper Grid-cell s-5of7 push-s-1of7">
            <MatchStatItem
              team={localTeam}
              value={localValue}
              width={parseInt(localValue, 0) / max}
              active={active}
            />
            <MatchStatItem
              team={visitorTeam}
              value={visitorValue}
              width={parseInt(visitorValue, 0) / max}
              active={active}
            />
          </div>
        </div>
      </section>
    )
  }
}
