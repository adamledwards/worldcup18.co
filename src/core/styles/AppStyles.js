import { Component } from 'react'
import ReactDOM from 'react-dom'

class AppStyles extends Component {
  renderStyles() {
    const style = this.props.styles
    return `
    html, body {
      min-height: 100%;
    }
    body {
      background: linear-gradient(${style.gradient})
    }
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

export default AppStyles
