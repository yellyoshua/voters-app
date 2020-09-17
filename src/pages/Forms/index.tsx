import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsForms = RouteComponentProps & { goTo: (pathname: string) => void; };

export default function Forms(props: PropsForms) {

  const breadcrumbs = [
    { name: "Formularios", pathname: "/forms" }
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} goTo={props.goTo} />
      Forms Page
    </div>
  )
}