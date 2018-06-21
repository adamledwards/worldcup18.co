import React, { Component } from 'react'
import { history } from '../../routes'

class Link extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.href !== this.props.href
  }
  goToLink = e => {
    e.preventDefault()
    const { href } = this.props
    history.push(href)
  }

  goBack = e => {
    e.preventDefault()
    history.goBack()
  }

  render() {
    const { app, back, forwardRef, onClick, children, ...rest } = this.props
    let action = this.goToLink
    if (back) {
      action = this.goBack
    }
    return (
      <a
        onClick={onClick || action}
        ref={forwardRef}
        style={{ cursor: 'pointer' }}
        {...rest}
      >
        {children}
      </a>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <Link {...props} forwardRef={ref} />
))
