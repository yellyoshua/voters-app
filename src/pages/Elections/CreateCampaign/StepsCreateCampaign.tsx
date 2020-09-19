import React, { useState } from "react";
import Input from "react-rainbow-components/components/Input";
import Textarea from "react-rainbow-components/components/Textarea";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Select from "react-rainbow-components/components/Select";
import ButtonIcon from "react-rainbow-components/components/ButtonIcon";
import RemoveIcon from "icons/RemoveIcon";
import { TypeProspect, TypeCampaign } from "types/appTypes";
import "./index.css";

const positionOptions = [
  { value: 'presidente', label: 'Presidente/a', disabled: false },
  { value: 'vicepresidente', label: 'Vicepresidente/a', disabled: false },
  { value: 'vocal', label: 'Vocal', disabled: false },
  { value: 'tesorero', label: 'Tesorero/a', disabled: false },
];

type PropsStepCampaignName = {
  name: string;
  onChangeName: (val: string) => void;
};

export function StepCampaignName(props: PropsStepCampaignName) {
  return (
    <>
      <div className="step-title">
        <h1>Nombre para el partido.</h1>
      </div>
      <Input
        onChange={({ target: { value } }) => props.onChangeName(value)}
        placeholder=""
        value={props.name}
        style={{ maxWidth: 270 }}
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      />
      <div className="step-instruction">
        <p>Debe tener una logitud mayor a 4 caracteres.</p>
      </div>
    </>
  )
}

type PropsStepAddIntegrants = {
  onChange: (val: TypeProspect[]) => void;
  integrants: TypeProspect[];
}

export function StepAddIntegrants(props: PropsStepAddIntegrants) {
  const [integrants, setIntegrants] = useState<TypeProspect[]>(props.integrants);
  const defaultIntegrant = { names: "", surnames: "", position: "presidente", };
  const removeIntegrant = (index: number) => {
    const newIntegrants = integrants.filter((_integrant, key) => key !== index);
    setIntegrants(newIntegrants);
    return props.onChange(newIntegrants);
  };

  const updateIntegrant = (val: TypeProspect, index: number) => {
    let nIntegrants = integrants;
    nIntegrants[index] = val;
    setIntegrants(nIntegrants);
    return props.onChange(nIntegrants);
  }

  const addIntegrant = (integrant: TypeProspect) => {
    const newIntegrants = [...integrants, integrant];
    setIntegrants(newIntegrants);
    return props.onChange(newIntegrants);
  }

  const isPlural: boolean = props.integrants.length > 1;

  return (
    <>
      <div className="step-title">
        <h1>Agregar integrantes.</h1>
      </div>
      <div className="container-create-integrants">
        {
          integrants.map((integrant, index) => (
            <div className="section-create-integrants" key={index}>
              <Input
                label="Nombres"
                className="section-create-integrants-input"
                onChange={({ target: { value } }) => {
                  return updateIntegrant({ ...integrant, names: value }, index);
                }}
                placeholder="Nombres"
                value={integrant.names}
              />
              <Input
                label="Apellidos"
                className="section-create-integrants-input"
                onChange={({ target: { value } }) => {
                  return updateIntegrant({ ...integrant, surnames: value }, index);
                }}
                placeholder="Apellidos"
                value={integrant.surnames}
              />
              <Select
                label="Cargo"
                className="section-create-integrants-input"
                options={positionOptions}
                id="example-select-1"
                // @ts-ignore
                onChange={({ target: { value } }) => {
                  return updateIntegrant({ ...integrant, position: value }, index);
                }}
                value={integrant.position}
              />
              <ButtonIcon
                className="section-create-integrants-btn-icon"
                shaded
                size="small"
                // @ts-ignore
                variant="destructive"
                onClick={() => removeIntegrant(index)}
                icon={<RemoveIcon color="white" />}
              />

            </div>
          )
          )
        }
      </div>
      <RenderIf isTrue={props.integrants.length < 4}>
        <div className="step-instruction">
          <p>Debes agregar por lo menos {4 - props.integrants.length} integrante{isPlural && "s"} al partido.</p>
        </div>
        <div className="section-create-integrants-add-more">
          <button onClick={() => addIntegrant(defaultIntegrant)}>Agregar Integrante</button>
        </div>
      </RenderIf>
    </>
  )
}

type PropsStepCommitments = {
  campaignName: string;
  onChange: (val: string) => void;
  commitments: string;
};

export function StepCommitments(props: PropsStepCommitments) {
  return (
    <>
      <div className="step-title">
        <h1>Propuestas del partido.</h1>
      </div>
      <Textarea
        placeholder={`Escribe las propuestas del partido ${props.campaignName}`}
        rows={4}
        style={{ maxWidth: 700 }}
        value={props.commitments}
        onChange={({ target: { value } }) => props.onChange(value)}
        bottomHelpText="Este campo es opcional"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      />;
    </>
  );
}

type PropsFinalPreviewSteps = {
  campaign: TypeCampaign;
}

export function FinalPreviewSteps(props: PropsFinalPreviewSteps) {
  return (
    <>
      <div className="step-title">
        <h1>Vista previa</h1>
      </div>
      <div>

      </div>
    </>
  );
}