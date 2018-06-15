import React, { Component, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import firebase from 'firebase'
import 'firebase/firestore'
import Modal from './modules/Modal'
import './App.css'
import routes, { history } from './routes'
import Context from './Context'
import teams from 'teams.json'

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

const config = {
  apiKey: 'AIzaSyAWwEuc4ZzZAbYprl2zmMaJgifNwv608m4',
  authDomain: 'worldcup18-d9408.firebaseapp.com',
  databaseURL: 'https://worldcup18-d9408.firebaseio.com',
  projectId: 'worldcup18-d9408',
  storageBucket: 'worldcup18-d9408.appspot.com',
  messagingSenderId: '510292739580',
}
const app = firebase.initializeApp(config)

// const messaging = firebase.messaging()
// messaging.usePublicVapidKey(
//   'BCfo6oyU0bSxABzjUnGKNuodS38xQ7AADY0ZTJuuivy-EqSIdPvvrqQIS5sm5S6ZAh3cWPIceY41h_L14nV5o0I'
// )

app.firestore().settings({ timestampsInSnapshots: true })
class App extends Component {
  state = {
    team: null,
    isModalActive: false,
    db: firebase.firestore(),
    route: {
      Component: () => null,
    },
  }
  modalRef = React.createRef()

  componentDidMount() {
    this.unlisten = history.listen((location, action) => {
      this.goToRoute(location.pathname)
    })
    const location = history.location
    this.goToRoute(location.pathname)
    this.setState({ db: firebase.firestore() })
  }

  componentDidUpdate() {
    const { isModalActive } = this.state
    const bodyEl = document.getElementsByTagName('body')[0]
    if (isModalActive) {
      bodyEl.style.position = 'fixed'
      bodyEl.style.height = '100%'
      bodyEl.style.width = '100%'
      bodyEl.style.overflow = 'hidden'
    } else {
      bodyEl.style.position = ''
      bodyEl.style.height = ''
      bodyEl.style.width = ''
      bodyEl.style.overflow = ''
    }
  }

  goToRoute(pathname) {
    return routes.resolve({ pathname }).then(route => {
      this.setState(state => {
        let team = null
        if (teams[route.params.team]) {
          team = {
            key: route.params.team,
            ...teams[route.params.team],
          }
        } else if (route.isModal) {
          team = state.team
        }
        return {
          team,
          route: {
            ...state.route,
            ...route,
          },
        }
      })
    })
  }

  render() {
    const { route, isModalActive, team } = this.state
    const { Component, params, ModalComponent, isModal } = route
    const db = this.state.db
    if (!db) {
      return null
    }

    return (
      <Fragment>
        <Context.Provider value={{ history, db, params }}>
          {Component && <Component db={db} params={params} />}
          <CSSTransition
            appear
            in={isModal}
            unmountOnExit
            classNames={'Modal'}
            timeout={300}
            onExit={() => {
              this.setState({
                isModalActive: false,
              })
            }}
            onEntered={() => {
              this.setState({
                isModalActive: true,
              })
            }}
          >
            {() => (
              <Modal
                team={team}
                db={db}
                params={params}
                isModalActive={isModalActive}
                ref={this.modalRef}
                routeName={route.name}
              >
                <ModalComponent modalRef={this.modalRef} team={team} />
              </Modal>
            )}
          </CSSTransition>
        </Context.Provider>
      </Fragment>
    )
  }
}

export default App
