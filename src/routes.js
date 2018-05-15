import Home from './views/Home'
import TeamSelection from './views/TeamSelection'
import Team from './views/Team'
import Menu from './views/Menu'
import Fixtures from './views/Fixtures'
import UniversalRouter from 'universal-router'
import generateUrls from 'universal-router/generateUrls'
import createHistory from 'history/createBrowserHistory'

const routes = [
  {
    name: 'home',
    path: '/',
    Component: Home,
  },
  {
    name: 'teamSelection',
    path: '/teams',
    ModalComponent: TeamSelection,
  },
  {
    name: 'team',
    path: '/teams/:team',
    Component: Team,
  },
  {
    name: 'menu',
    path: '/menu',
    ModalComponent: Menu,
  },
  {
    name: 'fixtures',
    path: '/fixtures/:date',
    ModalComponent: Fixtures,
  },
]

function resolveRoute(context, params) {
  if (typeof context.route.Component === 'function') {
    return {
      Component: context.route.Component,
      isModal: false,
      params,
    }
  }
  if (typeof context.route.ModalComponent === 'function') {
    return {
      ModalComponent: context.route.ModalComponent,
      isModal: true,
      params,
    }
  }
}

const router = new UniversalRouter(routes, { resolveRoute })
export default router
export const urls = generateUrls(router)
export const history = createHistory()
