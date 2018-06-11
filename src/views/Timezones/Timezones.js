import React, { Component } from 'react'
import Clock from '../../modules/Clock'

export default class Timezones extends Component {
  render() {
    return (
      <div className="Grid">
        <div className="Grid-cell lg-6of14 push-lg-1of14">
          <Clock />
        </div>
      </div>
    )
  }
}
