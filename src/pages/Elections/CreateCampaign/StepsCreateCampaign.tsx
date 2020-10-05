import React, { useState } from "react";
import Input from "react-rainbow-components/components/Input";
import Textarea from "react-rainbow-components/components/Textarea";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Select from "react-rainbow-components/components/Select";
import ButtonIcon from "react-rainbow-components/components/ButtonIcon";
import RemoveIcon from "icons/RemoveIcon";
import "./index.css";

const positionOptions = [
  { value: "presidente", label: "Presidente/a", disabled: false },
  { value: "vicepresidente", label: "Vicepresidente/a", disabled: false },
  { value: "vocal", label: "Vocal", disabled: false },
  { value: "tesorero", label: "Tesorero/a", disabled: false }
];

type PropsStepCampaignName = {
  name: string;
  onChangeName: (val: string) => void;
};

export function StepCampaignName(props: PropsStepCampaignName) {
  return (
    <>
      <div className='step-title'>
        <h1>Nombre para el partido.</h1>
      </div>
      <Input
        onChange={({ target: { value } }) => props.onChangeName(value)}
        placeholder=''
        value={props.name}
        style={{ maxWidth: 270 }}
        className='rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto'
      />
      <div className='step-instruction'>
        <p>Debe tener una logitud mayor a 4 caracteres.</p>
      </div>
    </>
  );
}

type PropsStepAddCandidate = {
  onChange: (val: { [key: string]: any }[]) => void;
  candidates: { [key: string]: any }[];
};

const defaultCandidate = { names: "", surnames: "", position: "presidente" };

export function StepAddCandidate(props: PropsStepAddCandidate) {
  const [candidates, setCandidates] = useState<{ [key: string]: any }[]>(props.candidates);
  const removeCandidate = (index: number) => {
    const newCandidate = candidates.filter((_, key) => key !== index);
    setCandidates(newCandidate);
    return props.onChange(newCandidate);
  };

  const updateCandidate = (val: { [key: string]: any }, index: number) => {
    let nCandidates = candidates;
    nCandidates[index] = val;
    setCandidates(nCandidates);
    return props.onChange(nCandidates);
  };

  const addCandidate = (candidate: { [key: string]: any }) => {
    const newCandidate = [...candidates, candidate];
    setCandidates(newCandidate);
    return props.onChange(newCandidate);
  };

  const isPlural: boolean = props.candidates.length > 1;

  return (
    <>
      <div className='step-title'>
        <h1>Agregar integrantes.</h1>
      </div>
      <div className='container-create-integrants'>
        {candidates.map((candidate, index) => (
          <div className='section-create-integrants' key={index}>
            <Input
              label='Nombres'
              className='section-create-integrants-input'
              onChange={({ target: { value } }) => {
                return updateCandidate({ ...candidate, names: value }, index);
              }}
              placeholder='Nombres'
              value={candidate.names}
            />
            <Input
              label='Apellidos'
              className='section-create-integrants-input'
              onChange={({ target: { value } }) => {
                return updateCandidate({ ...candidate, surnames: value }, index);
              }}
              placeholder='Apellidos'
              value={candidate.surnames}
            />
            <Select
              label='Cargo'
              className='section-create-integrants-input'
              options={positionOptions}
              id='example-select-1'
              // @ts-ignore
              onChange={({ target: { value } }) => {
                return updateCandidate({ ...candidate, position: value }, index);
              }}
              value={candidate.position}
            />
            <ButtonIcon
              className='section-create-integrants-btn-icon'
              shaded
              size='small'
              // @ts-ignore
              variant='destructive'
              onClick={() => removeCandidate(index)}
              icon={<RemoveIcon color='white' />}
            />
          </div>
        ))}
      </div>
      <RenderIf isTrue={props.candidates.length < 4}>
        <div className='step-instruction'>
          <p>
            Debes agregar por lo menos {4 - props.candidates.length} integrante{isPlural && "s"} al partido.
          </p>
        </div>
        <div className='section-create-integrants-add-more'>
          <button onClick={() => addCandidate(defaultCandidate)}>Agregar Integrante</button>
        </div>
      </RenderIf>
    </>
  );
}

type PropsStepCommitments = {
  campaignName: string;
  onChange: (val: string) => void;
  commitments: string;
};

export function StepCommitments(props: PropsStepCommitments) {
  return (
    <>
      <div className='step-title'>
        <h1>Propuestas del partido.</h1>
      </div>
      <Textarea
        placeholder={`Escribe las propuestas del partido ${props.campaignName}`}
        rows={4}
        style={{ maxWidth: 700 }}
        value={props.commitments}
        onChange={({ target: { value } }) => props.onChange(value)}
        bottomHelpText='Este campo es opcional'
        className='rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto'
      />
      ;
    </>
  );
}

type PropsFinalPreviewSteps = {
  campaign: { [key: string]: any };
};

export function FinalPreviewSteps(_props: PropsFinalPreviewSteps) {
  return (
    <>
      <div className='step-title'>
        <h1>Vista previa</h1>
      </div>
      <div></div>
    </>
  );
}
