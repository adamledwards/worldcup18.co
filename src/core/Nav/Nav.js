import React, { Component } from 'react'
import Navigation from './Navigation'
import Headroom from 'headroom.js'
import Link from '../Link'
import MobileMenu from '../../core/icons/MobileMenu.svg'
import './Nav.css'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.navRef = React.createRef()
  }

  componentDidMount() {
    let headroom = new Headroom(this.navRef.current, { offset: 100 })
    headroom.init()
  }

  render() {
    return (
      <div>
        <nav ref={this.navRef}>
          <div className="Grid">
            <div className="Grid-cell s-4of7 lg-2of14 md-4of14">
              <Link href="/" className="Nav-site">
                &mdash; WorldCup18.co
              </Link>
            </div>
            <div className="Grid-cell s-1of7 push-s-2of7 md-2of14 push-md-8of14  Nav-burger">
              <Link className="Nav-mobileMenu" href="/menu">
                <MobileMenu />
              </Link>
            </div>
            <div className="Grid-cell lg-6of14 push-lg-6of14">
              <Navigation />
            </div>
          </div>
        </nav>
        <span className="nav-spacing" />
      </div>
    )
  }
}

export default Nav
