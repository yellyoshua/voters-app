import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsApps = RouteComponentProps & {};

export default function Apps(props: PropsApps) {

  const breadcrumbs = [
    { name: "Apps", pathname: "/apps" }
  ];

  return (
    <div>
      <Breadcrumbs {...props} breadcrumbs={breadcrumbs}/>
      Apps Page
    </div>
  )
}