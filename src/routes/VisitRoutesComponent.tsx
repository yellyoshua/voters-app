import React from 'react';
import { Switch, Route } from "react-router-dom";

import LoginPage from "pages/Login";
import NotFoundPage from "pages/Error/NotFound";

type PropsVisitRoutes = {
  redirectTo?: (pathname: string) => void;
  goTo?: (pathname: string) => void;
};

export default function VisitRoutes(_props: PropsVisitRoutes) {

  return (
    <Switch>
      <Route exact path="/" render={(props) => <LoginPage {...props} />} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}