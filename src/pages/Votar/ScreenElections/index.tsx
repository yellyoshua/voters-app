import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "context/AppContext";
import Avatar from "react-rainbow-components/components/Avatar";
import { TypeElectionFunc } from "types/electionTypes";
import RenderIf from "react-rainbow-components/components/RenderIf";
import "./index.css";

type PropsScreenElections = {
  elections: TypeElectionFunc[];
};

export default function ScreenElections({ elections }: PropsScreenElections) {
  const electionsActive = useMemo(() => elections.filter((election) => {
    return election.status === "active";
  }), [elections]);

  const noHaveElections = useMemo(() => electionsActive.length === 0, [electionsActive]);

  const { school } = useApp();
  return <div className="container-screen-election">
    <div className="list-items-col container-school-detail">
      <Avatar
        style={{ width: 100, height: 100 }}
        src={school.schoolIcon}
      />
      <h1>{school.schoolName}</h1>
    </div>
    <h1 className="container-screen-election-title">Elecciones</h1>
    <h3 className="container-screen-election-desc">Selecciona la elecci&oacute;n a la cual quieres participar</h3>
    <div className="container-elections-select list-items-col">
      <RenderIf isTrue={noHaveElections}>
        <h2>No se encontraron elecciones activas</h2>
      </RenderIf>
      {
        electionsActive.map((election, index) => {
          return <div key={index} className="container-item-election list-items-col">
            <Link className="" to={`/votar?id=${election.id}`}>
              {election.name}
            </Link>
          </div>
        })
      }
    </div>
  </div>
}