import React, { PureComponent } from 'react'
import classNames from 'classnames'
import './Table.css'
import teams from '../../teams'
import { urls } from '../../routes'
import Link from '../../core/Link'

export default class Table extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.db,
    }
  }

  renderRow(row) {
    const { selectedTeam } = this.props
    const selectedTeamId = (selectedTeam && selectedTeam.id) === row.team_id
    let style = {}
    if (selectedTeamId) {
      style = {
        color: teams[selectedTeam.key].groupHighlightColour,
      }
    }
    return (
      <Link
        className={classNames(`Grid Table-row Table-row-${row.key}`, {
          'Table-row-active': selectedTeamId,
        })}
        style={style}
        key={row.team_id}
        href={urls('team', { team: row.key })}
      >
        <div className="Grid-cell Table-team s-4of7">{row.team_name}</div>
        <div className="Grid-cell Table-point s-1of7">{row.games_played}</div>
        <div className="Grid-cell Table-point s-1of7">
          {row.goal_difference}
        </div>
        <div className="Grid-cell Table-point s-1of7">{row.points}</div>
      </Link>
    )
  }

  render() {
    const { group, table, teamIds, selectedTeam } = this.props
    const teamInTable = (selectedTeam && teamIds[selectedTeam.id]) || false

    return (
      <div className={classNames('Table', { 'Table-active': teamInTable })}>
        <div className="Grid">
          <h3 className="Grid-cell Table-header">{group}</h3>
        </div>
        <div className="Grid Table-head ">
          <div className="Grid-cell push-s-4of7 s-1of7">PL</div>
          <div className="Grid-cell s-1of7">GD</div>
          <div className="Grid-cell s-1of7">Pts</div>
        </div>
        {table.map(row => this.renderRow(row))}
      </div>
    )
  }
}
