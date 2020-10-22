import React from "react";
import useTitle from "react-use/lib/useTitle";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsMessage = RouteComponentProps & {};

export default function Message(_: PropsMessage) {
  useTitle("Mensajes");

  const breadcrumbs = [
    { name: "Mensajes", pathname: "/message" }
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      Message Page
    </div>
  )
}