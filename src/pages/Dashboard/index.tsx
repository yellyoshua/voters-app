import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsDashboard = RouteComponentProps & { goTo: (pathname: string) => void; };

export default function Dashboard(props: PropsDashboard) {

  const breadcrumbs = [
    { name: "Dashboard", pathname: "/dashboard" }
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} goTo={props.goTo} />
      Dashboard page
    </div>
  )
}