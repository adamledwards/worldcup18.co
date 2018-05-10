import React, { Component } from 'react'
import mobileMenu from '../../core/icons/mobile-menu.svg';
import { withContext } from '../../Context'

class Link extends Component {
  
  goToLink = (e) => {
    const { history } = this.props.app
    e.preventDefault()
    history.push(e.target.pathname)
  }

  render() {
    const { app, ...rest } = this.props
    return (
        <a onClick={this.goToLink} {...rest} />
    )
  }
}

export default withContext(Link)