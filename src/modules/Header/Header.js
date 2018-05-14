import React, { Component } from 'react'
import Nav from '../../core/Nav'
import { withContext } from '../../Context'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Nav />
        <div className="Grid">
          <h1 className="Header-intro Grid-cell lg-12of14">
            Two Thousand &amp; Eighteen FIFA World Cup
          </h1>
        </div>
        <div className="Grid Header-seperator">
          <div className="Grid-cell lg-2of14">
            <span className="bar" />
          </div>
        </div>
        <div className="Grid">
          <h2 className="Header-subintro Grid-cell lg-10of14">
            Quadrennial international football tournament
          </h2>
        </div>
        <div className="Grid">
          <h3 className="Header-date Grid-cell">
            14 June &mdash; 15 July 2018
          </h3>
        </div>
      </div>
    )
  }
}

export default Header
