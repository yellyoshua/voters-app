import React from "react";
import { TypeCargo } from "types/electionTypes";
import "./index.css";

type PropsListCargos = {
  cargos: TypeCargo[];
  editCargo: (slug: string | null) => void;
}

export default function ListCargos({ cargos, editCargo }: PropsListCargos) {

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