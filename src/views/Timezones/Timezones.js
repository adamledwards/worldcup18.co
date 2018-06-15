import React, { Component } from 'react'
import Clock from '../../modules/Clock'
import './Timezones.css'
export default class Timezones extends Component {
  render() {
    return (
      <div className="Timezones">
        <div className="Grid">
          <Clock />
          <p className="Timezones-text">
            All fixtures are shown in your current timezone
          </p>
        </div>
      </div>
    )
  }
}
