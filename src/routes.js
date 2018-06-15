import Home from './views/Home'
import TeamSelection from './views/TeamSelection'
import Team from './views/Team'
import Menu from './views/Menu'
import Fixtures from './views/Fixtures'
import Timezones from './views/Timezones'
import Match from './views/Match'
import Share from './views/Share'
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
    isModal: true,
  },
  {
    name: 'fixtures',
    path: '/fixtures/:date',
    ModalComponent: Fixtures,
    isModal: true,
  },
  {
    name: 'timezones',
    path: '/timezones',
    ModalComponent: Timezones,
    isModal: true,
  },
  {
    name: 'match',
    path: '/match/:matchId',
    ModalComponent: Match,
    isModal: true,
  },
  {
    name: 'share',
    path: '/share',
    ModalComponent: Share,
    isModal: true,
  },
]

function resolveRoute(context, params) {
  if (typeof context.route.Component === 'function') {
    return {
      name: context.route.name,
      Component: context.route.Component,
      isModal: false,
      params,
    }
  }
  if (typeof context.route.ModalComponent === 'function') {
    return {
      name: context.route.name,
      ModalComponent: context.route.ModalComponent,
      path: context.route.path,
      isModal: true,
      params,
    }
  }
}

const router = new UniversalRouter(routes, { resolveRoute })
export default router
export const urls = generateUrls(router)
export const history = createHistory()
