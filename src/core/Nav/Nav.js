import React, { Component } from 'react'
import mobileMenu from '../../core/icons/mobile-menu.svg'

class Nav extends Component {
  goToLink = e => {
    const { history } = this.props
    e.preventDefault()
    history.push(e.target.pathname)
  }

  render() {
    return (
      <nav className="Grid">
        <div className="Grid-cell s-3of7 lg-2of14">
          <span className="TeamHeader-site">&mdash; WorldCup18.co</span>
        </div>
        <div className="Grid-cell s-1of7 push-s-3of7 TeamHeader-burger">
          <img alt="menu" src={mobileMenu} />
        </div>
        <div className="Grid-cell lg-6of14 push-lg-6of14">
          <ul className="TeamHeader-nav">
            <li>
              <a onClick={this.goToLink} href="/">
                Home
              </a>
            </li>
            <li>Timezones</li>
            <li>
              <a onClick={this.goToLink} href="/teams">
                Teams
              </a>
            </li>
            <li>Share</li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav
