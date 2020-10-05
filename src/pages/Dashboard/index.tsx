import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsDashboard = RouteComponentProps & {};

export default function Dashboard(props: PropsDashboard) {

  const breadcrumbs = [
    { name: "Dashboard", pathname: "/dashboard" }
  ];

  return (
    <div>
      <Breadcrumbs {...props} breadcrumbs={breadcrumbs} />
      Dashboard page
    </div>
  )
}