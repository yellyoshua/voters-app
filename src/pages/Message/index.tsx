import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsMessage = RouteComponentProps & {};

export default function Message(props: PropsMessage) {

  const breadcrumbs = [
    { name: "Mensajes", pathname: "/message" }
  ];

  return (
    <div>
      <Breadcrumbs {...props} breadcrumbs={breadcrumbs} />
      Message Page
    </div>
  )
}