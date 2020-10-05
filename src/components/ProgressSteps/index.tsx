import React, { useState, ReactNode, memo } from "react";
import Button from "react-rainbow-components/components/Button";
import ProgressIndicator from "react-rainbow-components/components/ProgressIndicator";
import ProgressStep from "react-rainbow-components/components/ProgressStep";
import RenderIf from "react-rainbow-components/components/RenderIf";
import "./index.css";
type PropsProgressSteps = {
  stepNames: string[];
  children: ReactNode;
  isTheStepValid: boolean;
  onPass: () => void;
  cancelSteps: () => void;
  getCurrentStep: (step: number) => void;
};

export default memo(function ProgressSteps(props: PropsProgressSteps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const goStepNext = () => {
    const stepToGo = currentStep + 1;
    props.getCurrentStep(stepToGo);
    return setCurrentStep(stepToGo);
  };
  const goStepBack = () => {
    const stepToGo = currentStep - 1;
    props.getCurrentStep(stepToGo);
    return setCurrentStep(stepToGo);
  };

  return (
    <>
      <ProgressIndicator currentStepName={props.stepNames[currentStep - 1]}>
        {props.stepNames.map((name, index) => (
          <ProgressStep key={index} name={name} />
        ))}
      </ProgressIndicator>
      {props.children}
      <div className='rainbow-m-top_xx-large rainbow-align-content_center rainbow-flex_wrap'>
        <RenderIf isTrue={currentStep === 1}>
          <Button label='Cancelar' onClick={props.cancelSteps} variant='destructive' className='rainbow-m-horizontal_medium' />
        </RenderIf>
        <RenderIf isTrue={currentStep - 1 > 0 && currentStep - 1 < props.stepNames.length}>
          <Button label='Regresar' onClick={goStepBack} variant='neutral' className='rainbow-m-horizontal_medium' />
        </RenderIf>
        <RenderIf isTrue={currentStep - 1 < props.stepNames.length - 1 && currentStep - 1 >= 0}>
          <Button label='Siguiente' onClick={goStepNext} variant='brand' disabled={!props.isTheStepValid} className='rainbow-m-horizontal_medium' />
        </RenderIf>
        <RenderIf isTrue={!(currentStep - 1 < props.stepNames.length - 1 && currentStep - 1 >= 0)}>
          <Button label='Terminar' onClick={props.onPass} variant='success' className='rainbow-m-horizontal_medium' />
        </RenderIf>
      </div>
    </>
  );
});
