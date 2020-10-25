import React, { useState, useEffect, useCallback, memo } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import useAuth from "hooks/useAuth";
import ClientRouterComponent from "routes/ClientRoutesComponent";
import VisitRouterComponent from "routes/VisitRoutesComponent";
import Application from "react-rainbow-components/components/Application";
import Sidebar from "react-rainbow-components/components/Sidebar";
import SidebarItem from "react-rainbow-components/components/SidebarItem";
import ButtonIcon from "react-rainbow-components/components/ButtonIcon";
import RenderIf from "react-rainbow-components/components/RenderIf";
import FormIcon from "icons/FormIcon";
import AppsIcon from "icons/AppsIcon";
import MailIcon from "icons/MailIcon";
import BullhornIcon from "icons/BullhornIcon";
import AppBar from "components/AppBar";
import SplashScreen from "components/SplashScreen";
import "./App.css";

type PropsApp = RouteComponentProps & {};

function App({ history }: PropsApp) {
  const { isThereUser, isCheckAuth } = useAuth();

  const [isSidebarHidden, setSidebarState] = useState<boolean>(true);
  const [selectedItem, selectItem] = useState<string>(() => {
    return history.location.pathname.split("/")[1] || "dashboard";
  });

  const toogleSidebar = () => setSidebarState(!isSidebarHidden);
  const handleOnSelect = (_: any, item: string) => selectItem(item);
  const goTo = useCallback(
    (path: string) => {
      if (!isSidebarHidden) {
        setSidebarState(true);
      }
      return history.push(path);
    },
    [isSidebarHidden, history]
  );

  useEffect(
    function () {
      document.body.style.overflow = "auto";
      if (!isSidebarHidden) {
        document.body.style.overflow = "hidden";
      }
    },
    [isSidebarHidden]
  );

  if (isCheckAuth) {
    return <SplashScreen />;
  } else if (!isThereUser) {
    return <VisitRouterComponent />;
  }

  return (
    <Application>
      <RenderIf isTrue={!isSidebarHidden}>
        <div className='react-rainbow-admin-app_backdrop' role='presentation' onClick={toogleSidebar} />
      </RenderIf>
      <AppBar onToogleSidebar={toogleSidebar} />
      <div
        className={
          isSidebarHidden ? "react-rainbow-admin-app_sidebar-container react-rainbow-admin-app_sidebar-container--sidebar-hidden" : "react-rainbow-admin-app_sidebar-container"
        }>
        <Sidebar className='react-rainbow-admin-app_sidebar' selectedItem={selectedItem} onSelect={handleOnSelect}>
          <SidebarItem className='react-rainbow-admin-app_sidebar-item' icon={null} name='dashboard' label='Dashboard' onClick={() => goTo("/dashboard")} />
          <SidebarItem
            className='react-rainbow-admin-app_sidebar-item'
            icon={<BullhornIcon color={selectedItem === "elections" ? "black" : "rgba(164,167,181,1)"} />}
            name='elections'
            label='Elecciones'
            onClick={() => goTo("/elections")}
          />
          <SidebarItem
            className='react-rainbow-admin-app_sidebar-item'
            icon={<AppsIcon color={selectedItem === "apps" ? "black" : "rgba(164,167,181,1)"} />}
            name='apps'
            label='Aplicaciones'
            onClick={() => goTo("/apps")}
          />
          <SidebarItem
            className='react-rainbow-admin-app_sidebar-item'
            icon={<MailIcon color={selectedItem === "messages" ? "black" : "rgba(164,167,181,1)"} />}
            name='messages'
            label='Mensajes'
            onClick={() => goTo("/messages")}
          />
          <SidebarItem
            className='react-rainbow-admin-app_sidebar-item'
            icon={<FormIcon color={selectedItem === "forms" ? "black" : "rgba(164,167,181,1)"} />}
            name='forms'
            label='Formularios'
            onClick={() => goTo("/forms")}
          />
        </Sidebar>
        <RenderIf isTrue={!isSidebarHidden}>
          <div className='react-rainbow-admin-app_sidebar-back-button-container'>
            <ButtonIcon onClick={toogleSidebar} size='large' icon={null} />
          </div>
        </RenderIf>
      </div>
      <div className='react-rainbow-admin-app_router-container'>
        <ClientRouterComponent />
      </div>
    </Application>
  );
}

export default withRouter(memo(App));
