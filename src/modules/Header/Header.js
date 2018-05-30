import React, { Component } from 'react'
import Nav from '../../core/Nav'
import DefaultHeader from './DefaultHeader'
import LiveScoresHeader from './LiveScoresHeader'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Nav />
        <DefaultHeader />
      </div>
    )
  }
}

export default Header
