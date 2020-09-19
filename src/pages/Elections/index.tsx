import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";
import ListElection from "pages/Elections/ListElections";
import AddIcon from "icons/AddIcon";

type PropsElections = RouteComponentProps & { goTo: (pathname: string) => void; };

export default function Elections(props: PropsElections) {

  const breadcrumbs = [
    { name: "Elecciones", pathname: "/elections" }
  ];

  // const latestElections = [
  //   { created_time: "1600203727633" }
  // ]

  const goNewElections = () => props.goTo("/elections/create");

  return (
    <div>
      <div className="breadcrumbs-with-button">
        <Breadcrumbs breadcrumbs={breadcrumbs} goTo={props.goTo} />
        <button onClick={goNewElections} className="btn-right-breadcrumb">
          <AddIcon />Nueva elecci&oacute;n
        </button>
      </div>

      <ListElection />

    </div>
  )
}