import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';

const ROUTES = [
  {
    path: '/landing',
    component: LandingPage,
    header: false,
    footer: false,
    key: 'landing',
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
