import React, { Component, Fragment } from 'react';
import Header from '../../modules/Header'
import TodaysFixtures from '../../modules/TodaysFixtures'
import FixturesResult from '../../modules/FixturesResult'
import Groups from '../../modules/Groups'
import TopScorers from '../../modules/TopScorers'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <TodaysFixtures />
        <FixturesResult />
        <Groups />
        <TopScorers />
      </Fragment>
    );
  }
}

export default Home;
