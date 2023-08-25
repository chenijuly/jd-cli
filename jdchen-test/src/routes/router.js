import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import routes from './index';
import ErrorBoundary from "../exception/ErrorBoundary";

export default ({ history, app }) => {
  return (
    <Router history={history}>
      <ErrorBoundary>
        <Switch>
          {
            routes.map(({ path, ...dynamics }, index) => (
              <Route
                key={index}
                path={path}
                exact
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
        </Switch>
      </ErrorBoundary>
    </Router>
  );
};
