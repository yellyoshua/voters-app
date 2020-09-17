import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsApps = RouteComponentProps & { goTo: (pathname: string) => void; };

export default function Apps(props: PropsApps) {

  const breadcrumbs = [
    { name: "Apps", pathname: "/apps" }
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} goTo={props.goTo} />
      Apps Page
    </div>
  )
}