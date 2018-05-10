import React, { Component } from 'react'
import './Modal.css'

export default class Modal extends Component {
  render() {
    return (
      <div className="Modal">
        <nav className="Grid Modal-nav">
          <a className="Grid-cell s-1of7 Modal-back">
            <i className="material-icons">arrow_back</i>
          </a>
          <a className="Grid-cell s-1of7 push-lg-13of14 lg-1of14 push-s-5of7 Modal-close">
            <i className="material-icons">close</i>
          </a>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
