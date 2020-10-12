import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import DummyPage from 'containers/DummyPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import ProjectPage from 'containers/ProjectPage/Loadable';
import LitePage from 'containers/LitePage/Loadable';
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
    path: '/profile/:tabId',
    component: ProfilePage,
    header: false,
    footer: false,
    auth: true,
    nav: true,
    key: 'profile',
  },
  {
    path: '/projects',
    component: ProjectPage,
    header: false,
    footer: false,
    auth: true,
    nav: true,
    key: 'project',
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
  {
    path: '/lite',
    component: LitePage,
    header: true,
    footer: true,
    auth: false,
    key: 'lite',
  },
];

export default ROUTES;
