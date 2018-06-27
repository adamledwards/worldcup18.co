import React, { Component } from 'react'
import classNames from 'classnames'
import MatchHeader from '../../modules/Match/MatchHeader'
import MatchStatsTab from '../../modules/Match/MatchStats'
import MatchSquad from '../../modules/Match/MatchSquad'
import { withContext } from '../../Context'

import './Match.css'

class Match extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchId: props.app.params.matchId,
      match: null,
      detail: null,
      toggleNav: false,
      scaleX: 0,
      x: 0,
    }
    this.linkRef = React.createRef()
    this.containerRef = React.createRef()
    this.resizeTimer = null
    this.onResize = this.onResize.bind(this)
  }

  getLinePosition() {
    if (!this.linkRef.current) return
    const el = this.linkRef.current.getBoundingClientRect()
    const containerEL = this.containerRef.current.getBoundingClientRect()
    return { x: el.left - containerEL.left, scaleX: el.width }
  }

  onResize() {
    clearTimeout(this.resizeTimer)
    this.resizeTimer = setTimeout(() => {
      this.setState({ ...this.getLinePosition() })
    }, 100)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    this.fetchData()
  }

  componentWillUnmount() {
    clearTimeout(this.resizeTimer)
    window.removeEventListener('resize', this.onResize)
  }

  hoverOn = e => {
    const el = e.target.getBoundingClientRect()
    const containerEL = this.containerRef.current.getBoundingClientRect()
    this.setState({ x: el.left - containerEL.left, scaleX: el.width })
  }

  hoverOut = e => {
    if (!this.linkRef.current) return
    const el = this.linkRef.current.getBoundingClientRect()
    const containerEL = this.containerRef.current.getBoundingClientRect()
    this.setState({ x: el.left - containerEL.left, scaleX: el.width })
  }

  fetchData() {
    const { db } = this.props.app
    const { matchId } = this.state

    return db
      .collection('/fixtures')
      .doc(matchId)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.exists) {
          querySnapshot.ref
            .collection('details')
            .get()
            .then(querySnapshots => {
              let details = null
              if (querySnapshots.size) {
                details = {}
                querySnapshots.forEach(element => {
                  details[element.id] = element.data()
                })
              }
              this.setState(
                {
                  match: querySnapshot.data(),
                  details,
                },
                () => this.setState({ ...this.getLinePosition() })
              )
            })
        }
      })
  }

  render() {
    const { match, toggleNav, details, x, scaleX } = this.state

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
          matchTime={match.time}
        />
        <nav className="Grid MatchNav" ref={this.containerRef}>
          <span
            onClick={() => this.setState({ toggleNav: false })}
            className={classNames('Grid-cell s-3of7 lg-2of14', {
              active: !toggleNav,
            })}
          >
            <span
              className="MatchTab-nav-text"
              ref={!toggleNav ? this.linkRef : null}
              onMouseOver={this.hoverOn}
              onMouseLeave={this.hoverOut}
            >
              Squad
            </span>
          </span>
          <span
            onClick={() => this.setState({ toggleNav: true })}
            className={classNames('Grid-cell s-3of7 lg-2of14', {
              active: toggleNav,
            })}
          >
            <span
              className="MatchTab-nav-text"
              ref={toggleNav ? this.linkRef : null}
              onMouseOver={this.hoverOn}
              onMouseLeave={this.hoverOut}
            >
              Statistics
            </span>
          </span>
          <div
            className="MatchTab-line"
            style={{ transform: `translateX(${x}px)` }}
          >
            <span style={{ transform: `scaleX(${scaleX})` }} />
          </div>
        </nav>
        {details &&
          !toggleNav && <MatchSquad match={match} details={details} />}
        {details &&
          toggleNav && <MatchStatsTab details={details} match={match} />}
      </div>
    )
  }
}

export default withContext(Match)
