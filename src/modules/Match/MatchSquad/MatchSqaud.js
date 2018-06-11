import React, { Component } from 'react'
import './MatchSquad.css'
import classNames from 'classnames'
import mock from '../mock'

function filterPlayers(teamId, player) {
  return teamId === parseInt(player.team_id, 0)
}

const MatchPlayer = ({ name, number, cards, subbed }) => {
  return (
    <React.Fragment>
      <div className={classNames('MatchSquad-players', { subbed })}>
        <span className="MatchSquad-players-number">{number}</span>
        {subbed && <i className="down material-icons">arrow_downward</i>}
        <div className="MatchSquad-players-detail">
          <span className="MatchSquad-players-name">{name}</span>
          <span className="MatchSquad-players-cards">
            {cards.yellowcards === 1 && <span className="yellow" />}
            {cards.yellowcards === 2 && <span className="secondYellow" />}
            {cards.redcards > 0 && <span className="red" />}
          </span>
        </div>
      </div>
      {subbed && (
        <div className="MatchSquad-players">
          <span className="MatchSquad-players-number">{subbed.number}</span>
          <i className="up material-icons">arrow_upward</i>
          <div className="MatchSquad-players-detail">
            <span className="MatchSquad-players-name">
              {subbed.player_name} ({subbed.minute}')
            </span>
            <span className="MatchSquad-players-cards">
              {cards.yellowcards === 1 && <span className="yellow" />}
              {cards.yellowcards === 2 && <span className="secondYellow" />}
              {cards.redcards > 0 && <span className="red" />}
            </span>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

const MatchPlayers = ({ data, subList, id }) => {
  return data
    .filter(allPlayers => filterPlayers(id, allPlayers))
    .map((player, idx, all) => [
      <MatchPlayer
        key={player.player_id}
        id={player.player_id}
        name={player.player_name}
        position={player.position}
        number={player.number}
        cards={player.stats.cards}
        subbed={subList[player.player_id]}
      />,
      all[idx + 1] &&
        all[idx + 1].position !== player.position && (
          <span key={idx} className="MatchSquad-list-separator" />
        ),
    ])
}

class MatchSquad extends Component {
  getBenched() {
    return mock.data.bench.data.reduce((obj, bench) => {
      obj[bench.player_id] = bench
      return obj
    }, {})
  }
  subList(teamId) {
    return mock.data.substitutions.data
      .filter(allPlayers => filterPlayers(teamId, allPlayers))
      .reduce((obj, sub) => {
        obj[sub.player_out_id] = {
          minute: sub.minute,
          ...this.getBenched()[sub.player_in_id],
        }
        return obj
      }, {})
  }

  render() {
    const { match } = this.props
    return (
      <section className="MatchSquad-wrapper">
        <div className="MatchSquad">
          <span className="MatchSquad-team">
            {match.localTeam.team_name} line up
          </span>
          <div className="MatchSquad-list">
            <MatchPlayers
              data={mock.data.lineup.data}
              id={8}
              subList={this.subList(8)}
            />
          </div>
        </div>
        <div className="MatchSquad">
          <span className="MatchSquad-team">
            {match.visitorTeam.team_name} line up
          </span>
          <div className="MatchSquad-list">
            <MatchPlayers
              data={mock.data.lineup.data}
              id={3468}
              subList={this.subList(3468)}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default MatchSquad
