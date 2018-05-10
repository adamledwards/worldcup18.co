import React, { Component, Fragment } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import Header from './modules/Header'
import TodaysFixtures from './modules/TodaysFixtures'
import FixturesResult from './modules/FixturesResult'
import Groups from './modules/Groups'
import TopScorers from './modules/TopScorers'
import createHistory from 'history/createBrowserHistory'
import routes from './routes'
import Context from './Context'
const history = createHistory()

const config = {
  apiKey: 'AIzaSyAWwEuc4ZzZAbYprl2zmMaJgifNwv608m4',
  authDomain: 'worldcup18-d9408.firebaseapp.com',
  databaseURL: 'https://worldcup18-d9408.firebaseio.com',
  projectId: 'worldcup18-d9408',
  storageBucket: 'worldcup18-d9408.appspot.com',
  messagingSenderId: '510292739580',
}

const app = firebase.initializeApp(config)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      db: firebase.firestore(),
      route: {
        Component: () => null,
      },
    }
  }

  componentDidMount() {
    this.unlisten = history.listen((location, action) => {
      this.goToRoute(location.pathname)
    })
    const location = history.location
    this.goToRoute(location.pathname)
  }

  goToRoute(pathname) {
    return routes.resolve({ pathname }).then(route => {
      this.setState({ route })
    })
  }

  render() {
    const { Component, params } = this.state.route
    const db = this.state.db

    return (
      <Fragment>
        {db ? (
          <Context.Provider value={{ history, db, params }}>
            <Component db={db} params={params} />
          </Context.Provider>
        ) : null}
      </Fragment>
    )
  }
}

export default App
