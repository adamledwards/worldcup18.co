import Home from './views/Home'
import TeamSelection from './views/TeamSelection'
import Team from './views/Team'
import UniversalRouter from 'universal-router'
import generateUrls from 'universal-router/generateUrls'
const routes = [
  {
    name: 'home',
    path: '/',
    Component: Home,
  },
  {
    name: 'teamSelection',
    path: '/teams',
    Component: TeamSelection,
  },
  {
    name: 'team',
    path: '/teams/:team',
    Component: Team,
  },
]

function resolveRoute(context, params) {
  if(typeof context.route.Component === 'function') {
    return {
      Component: context.route.Component,
      params
    }
  }
}

const router = new UniversalRouter(routes, { resolveRoute })
export default router
export const urls = generateUrls(router)