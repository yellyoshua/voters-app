import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsForms = RouteComponentProps & {};

export default function Forms(props: PropsForms) {

  const breadcrumbs = [
    { name: "Formularios", pathname: "/forms" }
  ];

  return (
    <div>
      <Breadcrumbs {...props} breadcrumbs={breadcrumbs} />
      Forms Page
    </div>
  )
}