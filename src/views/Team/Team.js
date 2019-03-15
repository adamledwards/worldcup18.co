import React, { Component, Fragment } from 'react'
import TeamHeader from '../../modules/Team/TeamHeader'
import SquadList from '../../modules/Team/SquadList'
import TodaysFixtures from '../../modules/TodaysFixtures'
import Groups from '../../modules/Groups'
import Footer from '../../modules/Footer'
import teams from '../../teams'
import AppStyles from '../../core/styles/AppStyles'

class Team extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { params } = nextProps
    if (params.team && params.team !== prevState.teamName) {
      return {
        teamName: params.team,
        team: null,
        querySnapshot: null,
      }
    }
    return null
  }

  state = {
    teamName: '',
    team: null,
    querySnapshot: null,
  }
  componentDidMount() {
    if (this.state.querySnapshot === null) {
      this.fetchData()
    }
  }

  componentDidUpdate() {
    if (this.state.querySnapshot === null) {
      this.fetchData()
    }
  }

  fetchData() {
    const { db } = this.props
    const { teamName } = this.state
    db.collection('/teams')
      .doc(teamName)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.exists) {
          this.setState({
            team: querySnapshot.data(),
            querySnapshot,
          })
        }
      })
  }

  render() {
    const { querySnapshot, teamName, team } = this.state

    if (!team) {
      return (
        teams[this.props.params.team] && (
          <AppStyles styles={teams[this.props.params.team]} />
        )
      )
    }
    return (
      <Fragment>
        <AppStyles styles={teams[teamName]} />
        <TeamHeader team={team} />
        {/* <TodaysFixtures teamRef={querySnapshot.ref} /> */}
        <SquadList team={team} />
        <Groups team={team} />
        <Footer />
      </Fragment>
    )
  }
}

export default Team
