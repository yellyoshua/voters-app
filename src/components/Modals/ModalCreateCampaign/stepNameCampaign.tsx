import React from "react";
import Input from "react-rainbow-components/components/Input";

type PropsStepCampaignName = {
  value: string;
  onChangeName: (arg: { name: string }) => void;
};

export default function StepCampaignName({ value, onChangeName }: PropsStepCampaignName) {
  return (
    <>
      <div className='step-title'>
        <h1>Nombre para el partido.</h1>
      </div>
      <Input
        onChange={({ target: { value } }) => {
          return onChangeName({ name: String(value) });
        }}
        placeholder=''
        value={value}
        style={{ maxWidth: 270 }}
        className='rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto'
      />
      <div className='step-instruction'>
        <p>M&iacute;nimo 4 caracteres.</p>
      </div>
    </>
  );
}