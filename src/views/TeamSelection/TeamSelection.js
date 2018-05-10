import React, { Component } from 'react'
import TeamSelect from '../../modules/TeamSelect'
import Modal from '../../modules/Modal'
import Granim from '../../core/Granim'

class TeamSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gradientState: void(0)
    }
  }
  changeGradientState = (gradientState) => {
    this.setState({gradientState})
  }
  render() {
    const { gradientState } = this.state
    return (
      <Modal>
        <Granim colourState={gradientState}/>
        <TeamSelect changeGradientState={this.changeGradientState}/>
      </Modal>
    )
  }
}

export default TeamSelection