import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import DummyPage from 'containers/DummyPage/Loadable';

const ROUTES = [
  {
    path: '/landing',
    component: LandingPage,
    header: false,
    footer: false,
    auth: false,
    key: 'landing',
  },
  {
    path: '/login',
    component: LoginPage,
    header: false,
    footer: false,
    auth: false,
    key: 'login',
  },
  {
    path: '/dashboard',
    component: DummyPage,
    header: false,
    footer: false,
    auth: true,
    key: 'dashboard',
  },
  {
    path: '/',
    component: LandingPage,
    exact: true,
    header: true,
    footer: true,
    auth: false,
    key: 'home',
  },
  {
    path: '/notfound',
    component: NotFoundPage,
    header: true,
    footer: true,
    auth: false,
    key: 'notfound',
  },
];

export default ROUTES;
