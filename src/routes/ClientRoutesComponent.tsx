import React from 'react';
import { Redirect, Switch, Route } from "react-router-dom";

import DashboardPage from "pages/Dashboard";
import ElectionsPage from "pages/Elections";
import CreateElectionPage from "pages/Elections/CreateElection";
import AppsPage from "pages/Apps";
import MessagePage from "pages/Message";
import FormsPage from "pages/Forms";
import NotFoundPage from "pages/Error/NotFound";

type PropsClientRoutes = {
  redirectTo?: (pathname: string) => void;
  goTo: (pathname: string) => void;
};

export default function ClientRoutes(propsc: PropsClientRoutes) {

  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route exact path="/dashboard" render={(props) => <DashboardPage goTo={propsc.goTo} {...props} />} />
      <Route exact path="/elections" render={(props) => <ElectionsPage goTo={propsc.goTo} {...props} />} />
      <Route exact path="/elections/create" render={(props) => <CreateElectionPage goTo={propsc.goTo} {...props} />} />
      <Route exact path="/apps" render={(props) => <AppsPage goTo={propsc.goTo} {...props} />} />
      <Route exact path="/messages" render={(props) => <MessagePage goTo={propsc.goTo} {...props} />} />
      <Route exact path="/forms" render={(props) => <FormsPage goTo={propsc.goTo} {...props} />} />
      <Route exact path="/dashboard" render={(props) => <DashboardPage goTo={propsc.goTo} {...props} />} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}