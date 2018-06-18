import React, { Component } from 'react'
import './MatchSquad.css'
import Fade from 'react-reveal/Fade'
import classNames from 'classnames'

const MatchPlayer = ({ name, number, cards, subbed, index }) => {
  return (
    <React.Fragment>
      <div
        style={{ transitionDelay: `${index * 50}ms` }}
        className={classNames('MatchSquad-players', { subbed })}
      >
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
        <div
          style={{ transitionDelay: `${index * 50}ms` }}
          className="MatchSquad-players"
        >
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

const MatchPlayers = ({ data, subList }) => {
  return data.map((player, idx, all) => [
    <MatchPlayer
      key={player.player_id}
      id={player.player_id}
      name={player.player_name}
      position={player.position}
      number={player.number}
      cards={player.stats.cards}
      subbed={subList[player.player_id]}
      index={idx}
    />,
    all[idx + 1] &&
      all[idx + 1].position !== player.position && (
        <span key={idx} className="MatchSquad-list-separator" />
      ),
  ])
}

class MatchSquad extends Component {
  state = {
    animate: false,
  }
  componentDidMount() {
    this.setState({ animate: true })
  }
  render() {
    const { details } = this.props
    const { animate } = this.state

    return (
      <Fade>
        <section className={classNames('MatchSquad-wrapper', { animate })}>
          <div className="MatchSquad">
            <span className="MatchSquad-team">
              {details.localTeam.team_name} line up
            </span>
            <div className="MatchSquad-list">
              <MatchPlayers
                data={details.localTeam.lineup}
                subList={details.localTeam.substitutions}
              />
            </div>
          </div>
          <div className="MatchSquad">
            <span className="MatchSquad-team">
              {details.visitorTeam.team_name} line up
            </span>
            <div className="MatchSquad-list">
              <MatchPlayers
                data={details.visitorTeam.lineup}
                subList={details.visitorTeam.substitutions}
              />
            </div>
          </div>
        </section>
      </Fade>
    )
  }
}

export default MatchSquad
