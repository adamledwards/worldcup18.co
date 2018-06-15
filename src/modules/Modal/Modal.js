import React, { Component } from 'react'
import { history } from '../../routes'
import Link from '../../core/Link'
import './Modal.css'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = this.initialState(props.team)
    this.linkProps = history.action === 'POP' ? { href: '/' } : { back: true }
  }

  initialState(team) {
    if (team) {
      return {
        afterHover: team.headerTextColour,
        style: {
          color: team.headerTextColour,
          background: `linear-gradient(${team.gradient})`,
        },
      }
    }
    return {
      afterHover: '#FFF',
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

  updateColours = team => {
    if (team) {
      const color = team.headerTextColour
      this.setState({ style: { color } })
    } else {
      this.setState({ style: { color: this.state.afterHover } })
    }
  }

  render() {
    const { style, mountChildren } = this.state
    const { routeName } = this.props

    return (
      <section className={`Modal ${routeName}`} style={style}>
        <div className="Modal-container">
          <nav className="Grid Modal-nav">
            <Link
              {...this.linkProps}
              className="Grid-cell s-1of7 push-lg-13of14 lg-1of14 Modal-close"
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

export default Modal
