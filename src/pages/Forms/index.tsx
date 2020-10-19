import React from "react";
import useTitle from "react-use/lib/useTitle";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";

type PropsForms = RouteComponentProps & {};

export default function Forms(props: PropsForms) {
  useTitle("Formularios");

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