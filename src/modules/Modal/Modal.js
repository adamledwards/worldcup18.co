import React, { Component } from 'react'
import Link from '../../core/Link'
import './Modal.css'

export default class Modal extends Component {
  state = {
    mountChildren: false,
    style: {
      color: '#FFF',
      background: `#000`,
    },
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const team = nextProps.team

    if (team) {
      return {
        style: {
          color: team.headerTextColour,
          background: `linear-gradient(${team.gradient})`,
        },
      }
    }
    return {
      style: {
        color: '#FFF',
        background: '#000',
      },
    }
  }
  componentDidUpdate() {
    const { mountChildren } = this.state
    const { isModalActive } = this.props
    if (!mountChildren && isModalActive) {
      this.setState({ mountChildren: true })
    }
  }
  render() {
    const { isModalActive } = this.props
    const { style, mountChildren } = this.state
    return (
      <section className="Modal" style={style}>
        <div className="Modal-container">
          <nav className="Grid Modal-nav">
            <Link back className="Grid-cell s-1of7 Modal-back">
              <i className="material-icons">arrow_back</i>
            </Link>
            <Link
              href="/"
              className="Grid-cell s-1of7 push-lg-13of14 lg-1of14 push-s-5of7 Modal-close"
            >
              <i className="material-icons">close</i>
            </Link>
          </nav>
          {mountChildren && this.props.children}
        </div>
      </section>
    )
  }
}
