import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';

const ROUTES = [
  {
    path: '/landing',
    component: LandingPage,
    header: false,
    footer: false,
    key: 'landing',
  },
  {
    path: '/login',
    component: LoginPage,
    header: false,
    footer: false,
    key: 'login',
  },
  {
    path: '/',
    component: LandingPage,
    exact: true,
    header: true,
    footer: true,
    key: 'home',
  },
  {
    path: '',
    component: NotFoundPage,
    header: true,
    footer: true,
    key: 'notfound',
  },
];

export default ROUTES;
