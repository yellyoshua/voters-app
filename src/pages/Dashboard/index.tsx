import React from "react";
import useTitle from "react-use/lib/useTitle";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsDashboard = RouteComponentProps & {};

export default function Dashboard(_: PropsDashboard) {
  useTitle("Dashboard");

  const breadcrumbs = [
    { name: "Dashboard", pathname: "/dashboard" }
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      Dashboard page
    </div>
  )
}