import React, { Component } from 'react'
import { Navigation } from '../../core/Nav'
import Fade from 'react-reveal/Fade'
import './Menu.css'

export default class Menu extends Component {
  state = {
    pushState: void 0,
  }

  componentDidMount() {
    this.props.push.subscribe(ps => this.setState({ pushState: ps }))
    this.props.push.hasToken()
  }

  renderNotificationMessage() {
    const { pushState } = this.state
    const { push } = this.props

    if (pushState === 'REQUESTING') {
      return (
        <div>
          <i className="material-icons">notification_important</i>
          <div>
            <span>Subscribing...</span>
          </div>
        </div>
      )
    }

    if (pushState === 'SUCCESS') {
      return (
        <div onClick={push.unsubscribeToTopic}>
          <i className="material-icons">notification_important</i>
          <div>
            <span>Turn off notifications</span>
          </div>
        </div>
      )
    }
    if (pushState === 'REMOVING') {
      return (
        <div onClick={push.unsubscribeToTopic}>
          <i className="material-icons">notification_important</i>
          <div>
            <span>Unsubscribing...</span>
          </div>
        </div>
      )
    }
    return (
      <div onClick={push.requestPush}>
        <i className="material-icons">notification_important</i>
        <div>
          <span>
            Get Notified with the latest scores<br />
            You can opt out at anytime
          </span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="Grid">
        <div className="Menu">
          <h2>Menu</h2>
          <div className="separator">
            <span className="bar" />
          </div>
          <Navigation />
          {window.PushManager &&
            navigator.serviceWorker && (
              <Fade>
                <div className="Push">{this.renderNotificationMessage()}</div>
              </Fade>
            )}
        </div>
      </div>
    )
  }
}
