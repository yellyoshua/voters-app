import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsMessage = RouteComponentProps & { goTo: (pathname: string) => void; };

export default function Message(props: PropsMessage) {

  const breadcrumbs = [
    { name: "Mensajes", pathname: "/message" }
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} goTo={props.goTo} />
      Message Page
    </div>
  )
}