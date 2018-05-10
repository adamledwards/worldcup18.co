import React, { Component } from 'react'
import Granim from 'granim'
import teams from '../../teams'
import './Granim.css'

export class Gradient extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.colourState === prevState.colourState) {
      return null
    }

    if (!nextProps.colourState) {
      return {
        colourState: 'default-state',
      }
    }

    return {
      colourState: nextProps.colourState,
    }
  }
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {
      colourState: 'default-state',
    }
  }

  componentDidUpdate() {
    const { colourState } = this.state
    this.granim.changeState(colourState)
  }

  componentDidMount() {
    const { colourState } = this.state
    const teamState = Object.keys(teams).reduce((obj, key) => {
      obj[key] = {
        gradients: [teams[key].gradient],
        loop: true,
      }
      return obj
    }, {})
    this.teamState = teamState
    this.granim = new Granim({
      element: this.canvas.current,
      direction: 'top-bottom',
      opacity: [1, 1],
      stateTransitionSpeed: 300,
      defaultStateName: colourState,
      states: {
        'default-state': {
          gradients: [['#000', '#000']],
          loop: false,
        },
        ...teamState,
      },
    })
  }

  render() {
    return <canvas className="Granim" ref={this.canvas} />
  }
}

export default Gradient
