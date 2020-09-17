import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import useUser from "hooks/useUser";
import ClientRouterComponent from "routes/ClientRoutesComponent";
import VisitRouterComponent from "routes/VisitRoutesComponent";
import Application from 'react-rainbow-components/components/Application';
import Sidebar from 'react-rainbow-components/components/Sidebar';
import SidebarItem from 'react-rainbow-components/components/SidebarItem';
import ButtonIcon from 'react-rainbow-components/components/ButtonIcon';
import RenderIf from 'react-rainbow-components/components/RenderIf';
import FormIcon from "icons/FormIcon";
import AppsIcon from "icons/AppsIcon";
import MailIcon from "icons/MailIcon";
import BullhornIcon from "icons/BullhornIcon";
import AppBar from "components/AppBar";
import "./App.css";

type PropsApp = RouteComponentProps;

const resolveCurrentUrl = (pathname: string): string => {
  return pathname.split('/')[1] || 'dashboard';
}

function App(props: PropsApp) {
  const { isThereUser } = useUser();

  const [isSidebarHidden, setSidebarState] = useState<boolean>(true);
  const [selectedItem, selectItem] = useState<string>(resolveCurrentUrl.bind(null, props.history.location.pathname));

  const toogleSidebar = () => setSidebarState(!isSidebarHidden);
  const handleOnSelect = (_e: any, item: string) => selectItem(item);

  const redirectTo = (pathname: string) => {
    return props.history.replace(pathname);
  };

  const goTo = useCallback((pathname: string) => {
    return props.history.push(pathname);
  }, [props.history]);

  useEffect(function () {
    document.body.style.overflow = 'auto';
    if (!isSidebarHidden) {
      document.body.style.overflow = 'hidden';
    }
  }, [isSidebarHidden]);

  if (isThereUser) {
    return (
      <Suspense fallback={<p>Cargando</p>}>
        <Application>
          <RenderIf isTrue={!isSidebarHidden}>
            <div
              className="react-rainbow-admin-app_backdrop"
              role="presentation"
              onClick={toogleSidebar} />
          </RenderIf>
          <AppBar onToogleSidebar={toogleSidebar} />
          <div className={
            isSidebarHidden ?
              "react-rainbow-admin-app_sidebar-container react-rainbow-admin-app_sidebar-container--sidebar-hidden" :
              "react-rainbow-admin-app_sidebar-container"
          }>
            <Sidebar
              className="react-rainbow-admin-app_sidebar"
              selectedItem={selectedItem}
              onSelect={handleOnSelect}>
              <SidebarItem
                className="react-rainbow-admin-app_sidebar-item"
                icon={null}
                name="dashboard"
                label="Dashboard"
                onClick={() => goTo("/dashboard")} />
              <SidebarItem
                className="react-rainbow-admin-app_sidebar-item"
                icon={<BullhornIcon color={selectedItem === "elections" ? "black" : "rgba(164,167,181,1)"} />}
                name="elections"
                label="Elecciones"
                onClick={() => goTo("/elections")} />
              <SidebarItem
                className="react-rainbow-admin-app_sidebar-item"
                icon={<AppsIcon color={selectedItem === "apps" ? "black" : "rgba(164,167,181,1)"} />}
                name="apps"
                label="Aplicaciones"
                onClick={() => goTo("/apps")} />
              <SidebarItem
                className="react-rainbow-admin-app_sidebar-item"
                icon={<MailIcon color={selectedItem === "messages" ? "black" : "rgba(164,167,181,1)"} />}
                name="messages"
                label="Mensajes"
                onClick={() => goTo("/messages")} />
              <SidebarItem
                className="react-rainbow-admin-app_sidebar-item"
                icon={<FormIcon color={selectedItem === "forms" ? "black" : "rgba(164,167,181,1)"} />}
                name="forms"
                label="Formularios"
                onClick={() => goTo("/forms")} />
            </Sidebar>
            <RenderIf isTrue={!isSidebarHidden}>
              <div className="react-rainbow-admin-app_sidebar-back-button-container">
                <ButtonIcon
                  onClick={toogleSidebar}
                  size="large"
                  icon={null} />
              </div>
            </RenderIf>
          </div>
          <div className="react-rainbow-admin-app_router-container">
            <ClientRouterComponent redirectTo={redirectTo} goTo={goTo} />
          </div>
        </Application>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<p>Cargando</p>}>
      <VisitRouterComponent redirectTo={redirectTo} goTo={goTo} />
    </Suspense>
  );
}

export default withRouter(App);