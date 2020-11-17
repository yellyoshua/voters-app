import React, { memo } from "react";
import ClientRouterComponent from "routes/ClientRoutesComponent";
import VisitRouterComponent from "routes/VisitRoutesComponent";
import useAuth from "hooks/useAuth";
import Application from "components/Application";
import SplashScreen from "components/SplashScreen";
import "./App.css";

type PropsApp = {};

function App(_: PropsApp) {
  const { isThereUser, isCheckAuth } = useAuth();

  if (isCheckAuth) {
    return <SplashScreen />;
  }

  if (isThereUser) {
    return <Application>
      <ClientRouterComponent />
    </Application>;
  }

  return <VisitRouterComponent />;
}

export default memo(App);
