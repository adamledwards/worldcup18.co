import React, { Component } from 'react'
import classNames from 'classnames'
import MatchHeader from '../../modules/Match/MatchHeader'
import MatchStatsTab from '../../modules/Match/MatchStats'
import MatchSquad from '../../modules/Match/MatchSquad'
import { withContext } from '../../Context'

import './Match.css'

class Match extends Component {
  state = {
    matchId: null,
    match: null,
    toggleNav: false,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { params } = nextProps.app
    if (params.matchId && params.matchId !== prevState.matchId) {
      return {
        matchId: params.matchId,
        match: null,
      }
    }
    return null
  }

  fetchData() {
    const { db } = this.props.app
    const { matchId } = this.state

    db
      .collection('/fixtures')
      .doc(matchId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.exists) {
          this.setState({
            match: querySnapshot.data(),
          })
        }
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { match, toggleNav } = this.state

    if (!match) {
      return null
    }
    return (
      <div className="Match">
        <MatchHeader
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          time={match.start}
          venue={match.venue}
          group={match.group}
        />
        <nav className="Grid MatchNav">
          <span
            onClick={() => this.setState({ toggleNav: false })}
            className={classNames('Grid-cell s-3of7 lg-2of14', {
              active: !toggleNav,
            })}
          >
            Squad
          </span>
          <span
            onClick={() => this.setState({ toggleNav: true })}
            className={classNames('Grid-cell s-3of7 lg-2of14', {
              active: toggleNav,
            })}
          >
            Statistics
          </span>
        </nav>
        {!toggleNav && <MatchSquad match={match} />}
        {toggleNav && <MatchStatsTab match={match} />}
      </div>
    )
  }
}

export default withContext(Match)
