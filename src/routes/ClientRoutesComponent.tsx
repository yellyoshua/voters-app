import React, { Suspense } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import SpinnerCentered from "components/SpinnerCentered";
import StatsElection from "pages/StatsElection";

const DashboardPage = loadable(() => import("pages/Dashboard"));
const ElectionsPage = loadable(() => import("pages/Elections"));
const EditElectionPage = loadable(() => import("pages/EditElection"));
const AppsPage = loadable(() => import("pages/Apps"));
const MessagePage = loadable(() => import("pages/Message"));
const FormsPage = loadable(() => import("pages/Forms"));
const NotFoundPage = loadable(() => import("pages/NotFoundPage"));

type PropsClientRoutes = {};

export default function ClientRoutes(_props: PropsClientRoutes) {
  return (
    <Suspense fallback={<SpinnerCentered size="large" />}>
      <Switch>
        <Redirect exact from='/' to='/dashboard' />
        <Route exact path='/dashboard' component={DashboardPage} />
        <Route exact path='/elections' component={ElectionsPage} />
        <Route exact path='/elections/:id/edit' component={EditElectionPage} />
        <Route exact path='/elections/:id/stats' component={StatsElection(true)} />
        <Route exact path='/apps' component={AppsPage} />
        <Route exact path='/messages' component={MessagePage} />
        <Route exact path='/forms' component={FormsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}
