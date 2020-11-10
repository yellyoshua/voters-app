import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import DashboardPage from "pages/Dashboard";
import ElectionsPage from "pages/Elections";
import EditElectionPage from "pages/EditElection";
import AppsPage from "pages/Apps";
import MessagePage from "pages/Message";
import FormsPage from "pages/Forms";
import NotFoundPage from "pages/NotFoundPage";

type PropsClientRoutes = {};

export default function ClientRoutes(_props: PropsClientRoutes) {
  return (
    <Switch>
      <Redirect exact from='/' to='/dashboard' />
      <Route exact path='/dashboard' component={DashboardPage} />
      <Route exact path='/elections' component={ElectionsPage} />
      <Route exact path='/elections/:id/edit' component={EditElectionPage} />
      <Route exact path='/apps' component={AppsPage} />
      <Route exact path='/messages' component={MessagePage} />
      <Route exact path='/forms' component={FormsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
