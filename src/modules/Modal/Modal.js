import React, { Component } from 'react'
import Link from '../../core/Link'
import './Modal.css'

export default class Modal extends Component {
  state = {
    mountChildren: false,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isModalActive) {
      return {
        mountChildren: true,
      }
    }
    return null
  }
  render() {
    const { forwardedRef } = this.props
    const { mountChildren } = this.state
    return (
      <section ref={forwardedRef} className="Modal">
        <div className="Modal-container">
          <nav className="Grid Modal-nav">
            <Link className="Grid-cell s-1of7 Modal-back">
              <i className="material-icons">arrow_back</i>
            </Link>
            <Link
              back
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

React.forwardRef((_, ref) => <Modal forwardedRef={ref} />)
