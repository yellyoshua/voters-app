import React from "react";
import useTitle from "react-use/lib/useTitle";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsApps = RouteComponentProps & {};

export default function Apps(props: PropsApps) {
  useTitle("Apps");

  const breadcrumbs = [
    { name: "Apps", pathname: "/apps" }
  ];

  return (
    <div>
      <Breadcrumbs {...props} breadcrumbs={breadcrumbs} />
      Apps Page
    </div>
  )
}