import React from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {privateRoutes, publicRoutes} from "../../router/routes";
import {Redirect, Route, Switch} from "react-router-dom";

const AppRouter = () => {
  const isAuth = useTypedSelector(state => state.auth.isAuth)

  const routes = isAuth ? privateRoutes : publicRoutes;

  return (
    <Switch>
      {routes.map(route => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      ))}
      <Redirect to='/' />
    </Switch>
  );
};

export default AppRouter;
