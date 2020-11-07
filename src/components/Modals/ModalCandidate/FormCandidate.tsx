import React from "react";
import Input from "react-rainbow-components/components/Input";
import Select from "react-rainbow-components/components/Select";
import { TypeCampaignObj, TypeCandidateObj, TypeCargo } from "types/electionTypes";

type PropsFormCandidate = {
  setCandidate: (cndt: TypeCandidateObj) => any;
  candidate: TypeCandidateObj;
  campaigns: TypeCampaignObj[];
  cargos: TypeCargo[];
}

export default function FormCandidate({ setCandidate, cargos, candidate, campaigns }: PropsFormCandidate) {
  return <div className="list-items-row">
    <Input
      label="Nombres completos"
      placeholder="---"
      type="text"
      style={{ maxWidth: 230 }}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      name="names"
      value={candidate.names}
      onChange={({ target: { value } }) => {
        return setCandidate({ ...candidate, names: value });
      }}
    />
    <Input
      label="Apellidos completos"
      placeholder="---"
      type="text"
      style={{ maxWidth: 230 }}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      name="surnames"
      value={candidate.surnames}
      onChange={({ target: { value } }) => {
        return setCandidate({ ...candidate, surnames: value });
      }}
    />
    <Select
      label="Partido"
      options={[...campaigns].map(cmp => {
        return {
          value: cmp.slug,
          label: cmp.name
        }
      }).concat([{ value: "", label: "Selecciona una lista" }])}
      style={{ maxWidth: 230 }}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      // @ts-ignore
      onChange={({ target: { value } }) => {
        return setCandidate({ ...candidate, campaign_slug: String(value) });
      }}
      value={candidate.campaign_slug}
    />
    <Select
      label="Cargo"
      options={[...cargos].map((cargo) => {
        return {
          value: cargo.slug,
          label: cargo.alias
        };
      }).concat([{ value: "", label: "Selecciona un cargo" }])}
      style={{ maxWidth: 230 }}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      // @ts-ignore
      onChange={({ target: { value } }: { target: { value: string } }) => {
        return setCandidate({ ...candidate, cargo: value });
      }}
      value={candidate.cargo}
    />
    <Input
      label="Curso"
      placeholder="---"
      type="text"
      style={{ maxWidth: 230 }}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      name="course"
      value={candidate.course}
      onChange={({ target: { value } }) => {
        return setCandidate({ ...candidate, course: value });
      }}
    />
  </div>;
}