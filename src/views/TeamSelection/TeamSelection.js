import React, { Component, Fragment } from 'react'
import TeamSelect from '../../modules/TeamSelect'
import teams from '../../teams'
import Granim from '../../core/Granim'

class TeamSelection extends Component {
  constructor(props) {
    super(props)
    const { team } = props
    this.state = {
      gradientState: void 0,
      defaultStateName: (team && team.key) || void 0,
    }
  }

  changeGradientState = gradientState => {
    const { modalRef } = this.props
    modalRef.current.updateColours(teams[gradientState])
    this.setState({ gradientState })
  }
  render() {
    const { gradientState, defaultStateName } = this.state
    const { team } = this.props
    return (
      <Fragment>
        <Granim
          colourState={gradientState}
          defaultStateName={defaultStateName}
        />
        <TeamSelect
          teamKey={team && team.key}
          changeGradientState={this.changeGradientState}
        />
      </Fragment>
    )
  }
}

export default TeamSelection
