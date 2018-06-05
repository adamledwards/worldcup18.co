import React, { Component } from 'react'
import Navigation from './Navigation'
import Link from '../Link'
import MobileMenu from '../../core/icons/MobileMenu.svg'
import './Nav.css'

class Nav extends Component {
  render() {
    return (
      <nav className="Grid">
        <div className="Grid-cell s-4of7 lg-2of14">
          <Link href="/" className="Nav-site">
            &mdash; WorldCup18.co
          </Link>
        </div>
        <div className="Grid-cell s-1of7 push-s-2of7 Nav-burger">
          <Link href="/menu">
            <MobileMenu />
          </Link>
        </div>
        <div className="Grid-cell lg-6of14 push-lg-6of14">
          <Navigation />
        </div>
      </nav>
    )
  }
}

export default Nav
