import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "pages/Login";
import NotFoundPage from "pages/Error/NotFound";

type PropsVisitRoutes = {};

export default function VisitRoutes(_props: PropsVisitRoutes) {
  return (
    <Switch>
      <Redirect exact from='/dashboard' to='/' />
      <Route exact path='/' component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
