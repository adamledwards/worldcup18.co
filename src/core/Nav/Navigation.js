import React, { Component } from 'react'
import Link from '../Link'

class Navigation extends Component {
  render() {
    return (
      <ul className="Navigation">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/timezones">Timezones</Link>
        </li>
        <li>
          <Link href="/teams">Teams</Link>
        </li>
        <li>Share</li>
      </ul>
    )
  }
}

export default Navigation
