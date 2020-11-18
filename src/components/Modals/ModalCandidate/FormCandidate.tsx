import React from "react";
import UploadFile from "components/UploadFile";
import PreviewImage from "components/UploadFile/PreviewImage";
import Input from "react-rainbow-components/components/Input";
import Select from "react-rainbow-components/components/Select";
import { FileApi } from "types/appTypes";
import { REACT_API_URL } from "configurations/api";
import { isProduction } from "configurations/variables";
import { TypeCampaignObj, TypeCandidateObj, TypeCargo } from "types/electionTypes";
import "./index.css";

type PropsFormCandidate = {
  setCandidate: (cndt: TypeCandidateObj) => any;
  candidate: TypeCandidateObj;
  campaigns: TypeCampaignObj[];
  cargos: TypeCargo[];
}

function resolveUrl(url: string) {
  if (isProduction) {
    return url;
  }
  return REACT_API_URL + url;
}

export default function FormCandidate({ setCandidate, cargos, candidate, campaigns }: PropsFormCandidate) {
  return <div>
    {candidate.avatar
      ? <PreviewImage
        width={130}
        fileName={candidate.avatar?.name}
        fileUrl={resolveUrl(candidate.avatar?.url)}
        onRemoveHandler={() => {
          return setCandidate({ ...candidate, avatar: null });
        }}
      /> : <UploadFile
        url='/upload'
        fileType="Imagen"
        accept=".jpg,.png,.jpeg,.gif,.webp,.jp2,.j2k,.jpf,.jpx,.jpm,.mj2"
        onError={err => console.log({ err })}
        progress={() => null}
        success={(avatar: FileApi[]) => {
          return setCandidate({ ...candidate, avatar: avatar[0] });
        }}
      />}
    <div className="list-items-row" style={{ justifyContent: "center" }}>
      <Input
        label="Nombres"
        placeholder="eg: Jhon Adams"
        type="text"
        style={{ maxWidth: 230 }}
        className="rainbow-m_auto form-cnd-input"
        name="names"
        value={candidate.names}
        onChange={({ target: { value } }) => {
          return setCandidate({ ...candidate, names: value });
        }}
      />
      <Input
        label="Apellidos"
        placeholder="Eg: Smith Williams"
        type="text"
        style={{ maxWidth: 230 }}
        className="rainbow-m_auto form-cnd-input"
        name="surnames"
        value={candidate.surnames}
        onChange={({ target: { value } }) => {
          return setCandidate({ ...candidate, surnames: value });
        }}
      />
      <Select
        label="Partido"
        options={[...campaigns].map(cmp => (
          {
            value: cmp.slug,
            label: cmp.name
          }
        )).concat([{ value: "", label: "Selecciona un partido" }])}
        style={{ maxWidth: 230 }}
        className="rainbow-m_auto form-cnd-input"
        // @ts-ignore
        onChange={({ target: { value } }) => {
          return setCandidate({ ...candidate, campaign_slug: String(value) });
        }}
        value={candidate.campaign_slug}
      />
      <Select
        label="Cargo"
        options={[...cargos].map((cargo) => (
          {
            value: cargo.slug,
            label: cargo.alias
          }
        )).concat([{ value: "", label: "Selecciona un cargo" }])}
        style={{ maxWidth: 230 }}
        className="rainbow-m_auto form-cnd-input"
        // @ts-ignore
        onChange={({ target: { value } }: { target: { value: string } }) => {
          return setCandidate({ ...candidate, cargo: value });
        }}
        value={candidate.cargo}
      />
      <Input
        label="Curso"
        placeholder="eg: 10mo Básica"
        type="text"
        style={{ maxWidth: 230 }}
        className="rainbow-m_auto form-cnd-input"
        name="course"
        value={candidate.course}
        onChange={({ target: { value } }) => {
          return setCandidate({ ...candidate, course: value });
        }}
      />
    </div>
  </div>;
}