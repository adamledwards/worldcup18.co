import React, { Component } from 'react'
import { Navigation } from '../../core/Nav'
import './Menu.css'

export default class Menu extends Component {
  render() {
    return (
      <div className="Grid">
        <div className="Menu">
          <h2>Menu</h2>
          <div className="separator">
            <span className="bar" />
          </div>
          <Navigation />
          <div onClick={this.props.pushNotification}>
            Enabled Push Notifications
          </div>
        </div>
      </div>
    )
  }
}
