import React, { ReactNode } from "react";
import Breadcrums from "components/Breadcrums";
import "./index.css";

type PropsLayout = {
  breadcrumbs: { name: string, pathname: string }[];
  children: ReactNode;
};

export default function Layout({ breadcrumbs, children }: PropsLayout) {
  return <div>
    <div className="container-breadcrums-floated">
      <Breadcrums className="layout-breadcrum" breadcrumbs={[{ name: "Inicio", pathname: "/" }, ...breadcrumbs]} />
    </div>
    <div className="screen-layout">
      {children}
    </div>
  </div>
}