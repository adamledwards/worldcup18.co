import React, { Component, Fragment } from 'react'
import TeamSelect from '../../modules/TeamSelect'
import Granim from '../../core/Granim'

class TeamSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gradientState: void 0,
    }
  }
  changeGradientState = gradientState => {
    this.setState({ gradientState })
  }
  render() {
    const { gradientState } = this.state
    return (
      <Fragment>
        <Granim colourState={gradientState} />
        <TeamSelect changeGradientState={this.changeGradientState} />
      </Fragment>
    )
  }
}

export default TeamSelection
