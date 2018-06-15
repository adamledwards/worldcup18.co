import React, { Component } from 'react'
import classNames from 'classnames'
import Link from '../Link'
import { withContext } from '../../Context'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.linkRef = React.createRef()
    this.containerRef = React.createRef()
    this.state = {
      scaleX: 0,
      x: 0,
    }
    this.resizeTimer = null
    this.onResize = this.onResize.bind(this)
  }

  isActive(href) {
    const path = window.location.pathname

    if (href === path) {
      return true
    } else if (href !== '/') {
      const hrefArr = href.split('/')
      return (
        hrefArr.join() ===
        path
          .split('/')
          .splice(0, hrefArr.length)
          .join()
      )
    }
    return false
  }

  getLinePosition() {
    if (!this.linkRef.current) return
    const el = this.linkRef.current.getBoundingClientRect()
    const containerEL = this.containerRef.current.getBoundingClientRect()
    return { x: el.left - containerEL.left, scaleX: el.width }
  }

  onResize() {
    clearTimeout(this.resizeTimer)
    this.resizeTimer = setTimeout(() => {
      this.setState({ ...this.getLinePosition() })
    }, 100)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ...this.getLinePosition() })
    }, 300)
    window.addEventListener('resize', this.onResize)
  }

  componentDidUpdate(prevProps, prevState) {
    const { x, scaleX } = this.state
    if (prevState.x !== x && scaleX !== prevState.scaleX) {
      //this.setState({ ...this.getLinePosition() })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.resizeTimer)
    window.removeEventListener('resize', this.onResize)
  }

  hoverOn = e => {
    const el = e.target.getBoundingClientRect()
    const containerEL = this.containerRef.current.getBoundingClientRect()
    this.setState({ x: el.left - containerEL.left, scaleX: el.width })
  }

  hoverOut = e => {
    if (!this.linkRef.current) return
    const el = this.linkRef.current.getBoundingClientRect()
    const containerEL = this.containerRef.current.getBoundingClientRect()
    this.setState({ x: el.left - containerEL.left, scaleX: el.width })
  }

  onShare = e => {
    if (navigator.share) {
      e.preventDefault()
      navigator
        .share({
          title: 'Two Thousand & Eighteen FIFA World Cup',
          url: 'https://worldcup18.co',
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error))
    }
  }

  getLinkProps(href) {
    return {
      href,
      className: classNames({
        active: this.isActive(href),
      }),
      ref: this.isActive(href) ? this.linkRef : null,
      onMouseOver: this.hoverOn,
      onMouseLeave: this.hoverOut,
    }
  }

  render() {
    const { x, scaleX } = this.state
    return (
      <div className="Navigation-wrapper" ref={this.containerRef}>
        <ul className="Navigation">
          <li>
            <Link {...this.getLinkProps('/')}>Home</Link>
          </li>
          <li>
            <Link {...this.getLinkProps('/timezones')}>Timezones</Link>
          </li>
          <li>
            <Link {...this.getLinkProps('/teams')}>Teams</Link>
          </li>
          <li>
            <Link
              {...this.getLinkProps('/share')}
              onClick={navigator.share ? this.onShare : void 0}
            >
              Share
            </Link>
          </li>
        </ul>
        <div
          className="Navigation-line"
          style={{ transform: `translateX(${x}px)` }}
        >
          <span style={{ transform: `scaleX(${scaleX})` }} />
        </div>
      </div>
    )
  }
}

export default withContext(Navigation)
