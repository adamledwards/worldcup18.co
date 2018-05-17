import React, { Component, Fragment } from 'react'
import TeamHeader from '../../modules/Team/TeamHeader'
import SquadList from '../../modules/Team/SquadList'
import TodaysFixtures from '../../modules/TodaysFixtures'
import FixturesResult from '../../modules/FixturesResult'
import Groups from '../../modules/Groups'

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
    db
      .collection('/teams')
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
      return null
    }
    return (
      <Fragment>
        <TeamHeader team={team} />
        <TodaysFixtures teamRef={querySnapshot.ref} />
        <SquadList team={team} />
        <Groups team={team} />
      </Fragment>
    )
  }
}

export default Team
