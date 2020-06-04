/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import ROUTES from './routes';

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Morff" defaultTitle="Morff">
        <meta name="description" content="Morff" />
      </Helmet>
      <Switch>
        {ROUTES.map(route => (
          <Route
            path={route.path}
            component={route.component}
            exact={route.exact}
            key={route.key}
          />
        ))}
      </Switch>
    </div>
  );
}
