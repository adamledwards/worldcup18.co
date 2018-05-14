import React, { Component } from 'react'
import { withContext } from '../../Context'
import { history } from '../../routes'

class Link extends Component {
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
    const { app, back, ...rest } = this.props
    let action = this.goToLink
    if (back) {
      action = this.goBack
    }
    return <a onClick={action} style={{ cursor: 'pointer' }} {...rest} />
  }
}

export default Link
