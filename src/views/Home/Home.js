import React, { Component, Fragment } from 'react'

import Header from '../../modules/Header'
import TodaysFixtures from '../../modules/TodaysFixtures'
import FixturesResult from '../../modules/FixturesResult'
import TopScorers from '../../modules/TopScorers'
import Groups from '../../modules/Groups'
import Footer from '../../modules/Footer'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <FixturesResult />
        <Groups />
        <TopScorers />
        <Footer />
      </Fragment>
    )
  }
}

export default Home
