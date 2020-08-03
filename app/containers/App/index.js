/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { deviceScreenInfo, isLoggedIn } from 'utils/helper';
import { ToastContainer, Bounce } from 'react-toastify';
import { NavigationWrapper, EmptyWrapper } from 'templates/NavigationWrapper';
import ROUTES from './routes';
import LitePage from '../Lite';

export default function App({ history }) {
  const responsiveData = deviceScreenInfo();
  const toastProps = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  };

  return (
    <div>
       <Helmet titleTemplate="%s - Morff" defaultTitle="Morff">
        <meta name="description" content="Morff" />
      </Helmet>
      <ToastContainer {...toastProps} transition={Bounce} />
      <Switch>
        {ROUTES.map(route => {
          const Component = route.component;
          return (
            <Route
              path={route.path}
              render={props => {
                const Wrapper = route.nav ? NavigationWrapper : EmptyWrapper;
                return (
                  <Wrapper>
                    {route.auth ? (
                      isLoggedIn() ? (
                        <Component
                          {...props}
                          responsiveData={responsiveData}
                          loggedIn={isLoggedIn()}
                          location={location}
                        />
                      ) : (
                        <Redirect
                          to={{
                            pathname: '/login',
                            state: { from: props.location },
                          }}
                        />
                      )
                    ) : (
                      <Component {...props} responsiveData={responsiveData} />
                    )}
                  </Wrapper>
                );
              }}
              exact={route.exact}
              key={route.key}
            />
          );
        })}
        <Redirect path="*" to="/notfound" />
      </Switch>
    </div>
  );
}
