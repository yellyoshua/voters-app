import React, { useContext, useMemo } from "react";
import { TheElectionContext } from "context/TheElectionContext";
import "./index.css";

type PropsListCargos = { editCargo: (slug: string | null) => void; }

export default function ListCargos({ editCargo }: PropsListCargos) {
  const theElection = useContext(TheElectionContext)!;
  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);

  return <div className="list-items-row cargo-container">
    {
      cargos.map((cargo, index) => (
        <span className="rainbow-m-around_medium cargo-badge" key={index} onClick={() => editCargo(cargo.slug)}>
          <span>{cargo.alias}</span>
        </span>
      ))
    }
  </div>
}