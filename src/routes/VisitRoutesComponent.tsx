import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "pages/Login";
import VotarPage from "pages/Votar";
import NotFoundPage from "pages/NotFoundPage"

type PropsVisitRoutes = {};

export default function VisitRoutes(_props: PropsVisitRoutes) {
  return (
    <Switch>
      <Redirect exact from='/dashboard' to='/' />
      <Route exact path='/' component={LoginPage} />
      <Route exact path='/votar' component={VotarPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
