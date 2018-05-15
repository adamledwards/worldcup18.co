import React, { Component } from 'react'
import classNames from 'classnames'
import Table from './Table'
import { withContext } from '../../Context'
import './Group.css'

class Groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      querySnapshot: {
        docs: [],
      },
    }
  }
  componentDidMount() {
    const { db } = this.props.app

    db
      .collection('/groupStandings')
      .get()
      .then(querySnapshot => this.setState({ querySnapshot }))
  }
  render() {
    const { team } = this.props

    const { querySnapshot } = this.state

    return (
      <div className={classNames('Group', { selectedTeam: team })}>
        <div className="Grid">
          <h2 className="Group-heading Grid-cell">Group Standings</h2>
        </div>
        <div className="Group-table">
          {querySnapshot.docs.map(doc => (
            <Table key={doc.id} selectedTeam={team} {...doc.data()} />
          ))}
        </div>
      </div>
    )
  }
}

export default withContext(Groups)
