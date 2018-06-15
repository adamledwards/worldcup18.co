import React, { PureComponent } from 'react'
import Nav from '../../core/Nav'
import DefaultHeader from './DefaultHeader'
import classNames from 'classnames'
//import LiveScoresHeader from './LiveScoresHeader'
import './Header.css'

class Header extends PureComponent {
  state = {
    animate: false,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true })
    }, 1)
  }
  render() {
    const { animate } = this.state
    return (
      <div className={classNames('Header', { animate })}>
        <Nav />
        <DefaultHeader />
      </div>
    )
  }
}

export default Header
