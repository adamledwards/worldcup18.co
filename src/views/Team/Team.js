import React, { Component, Fragment } from 'react';
import TeamHeader from '../../modules/Team/TeamHeader'
import SquadList from '../../modules/Team/SquadList'
import TodaysFixtures from '../../modules/TodaysFixtures'
import FixturesResult from '../../modules/FixturesResult'
import Groups from '../../modules/Groups'

class Team extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: null,
      querySnapshot: null
    }
  }

  componentDidMount() {
    const { db, params } = this.props
    db.collection('/teams')
    .doc(params.team)
    .get()
    .then(querySnapshot => {
      if(querySnapshot.exists) {
        this.setState({
          team: querySnapshot.data(),
          querySnapshot,
        })
      }
    })
  }

  render() {
    const { querySnapshot, team } = this.state
    if(!team) {
      return null
    }
    return (
      <Fragment>
        <TeamHeader team={team} />
        <TodaysFixtures teamRef={querySnapshot.ref}/>
        <SquadList team={team}/>
        <Groups team={team}/>
      </Fragment>
    );
  }
}

export default Team;
