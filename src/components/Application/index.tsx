import React, { useEffect, useState, useCallback, memo, ReactNode } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppsIcon from "icons/AppsIcon";
import BullhornIcon from "icons/BullhornIcon";
import ButtonIcon from "react-rainbow-components/components/ButtonIcon";
import RainbowApp from "react-rainbow-components/components/Application";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Sidebar from "react-rainbow-components/components/Sidebar";
import SidebarItem from "react-rainbow-components/components/SidebarItem";
import AppBar from "components/AppBar";

type PropsApplication = RouteComponentProps & {
  children: ReactNode;
}

function Application({ children, history }: PropsApplication) {
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

  return <RainbowApp>
    <RenderIf isTrue={!isSidebarHidden}>
      <div className='react-rainbow-admin-app_backdrop' role='presentation' onClick={toogleSidebar} />
    </RenderIf>
    <AppBar isSidebarHidden={isSidebarHidden} onToogleSidebar={toogleSidebar} />
    <div
      className={
        isSidebarHidden ? "react-rainbow-admin-app_sidebar-container react-rainbow-admin-app_sidebar-container--sidebar-hidden" : "react-rainbow-admin-app_sidebar-container"
      }>
      <Sidebar className='react-rainbow-admin-app_sidebar' selectedItem={selectedItem} onSelect={handleOnSelect}>
        <SidebarItem
          className='react-rainbow-admin-app_sidebar-item'
          icon={<AppsIcon color={selectedItem === "apps" ? "black" : "rgba(164,167,181,1)"} />}
          name='dashboard'
          label='Dashboard'
          onClick={() => goTo("/dashboard")} />
        <SidebarItem
          className='react-rainbow-admin-app_sidebar-item'
          icon={<BullhornIcon color={selectedItem === "elections" ? "black" : "rgba(164,167,181,1)"} />}
          name='elections'
          label='Elecciones'
          onClick={() => goTo("/elections")}
        />
      </Sidebar>
      <RenderIf isTrue={!isSidebarHidden}>
        <div className='react-rainbow-admin-app_sidebar-back-button-container'>
          <ButtonIcon onClick={toogleSidebar} size='large' icon={null} />
        </div>
      </RenderIf>
    </div>
    <div className='react-rainbow-admin-app_router-container'>
      {children}
    </div>
  </RainbowApp>
}

export default withRouter(memo(Application))