import { Component } from 'react'
import ReactDOM from 'react-dom'

export default class AppStyles extends Component {
  renderStyles() {
    const style = this.props.styles
    return `
    .TeamHeader .Navigation-line span {
        background-color: ${style.menuColourLine}
      }
    `
  }
  render() {
    return ReactDOM.createPortal(
      this.renderStyles(),
      document.getElementById('appStyles')
    )
  }
}
