import React, { useState } from "react";
import RenderIf from "react-rainbow-components/components/RenderIf";
import ProgressSteps from "components/ProgressSteps";
import { StepCampaignName, StepAddIntegrants, StepCommitments, FinalPreviewSteps } from "pages/Elections/CreateCampaign/StepsCreateCampaign";
import { TypeProspect, TypeCampaign } from "types/appTypes";
import "./index.css";

type PropsAddProspects = {
  success: (campaign: TypeCampaign) => void;
  cancel: () => void;
};

export default function AddCampaign(props: PropsAddProspects) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCurrentStepValid, setCurrentStepValid] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<TypeCampaign>({ name: "", integrants: [], commitments: "", description: "" });

  const stepsValidator = (step: number, validation?: number) => {
    if (validation) {
      if (step === 1) {
        return setCurrentStepValid(validation > 4);
      } else if (step === 2) {
        return setCurrentStepValid(validation === 4);
      } else {
        return null;
      }
    }
    if (step === 1) {
      return setCurrentStepValid(campaign.name.length > 4);
    } else if (step === 2) {
      return setCurrentStepValid(campaign.integrants.length === 4);
    } else {
      return null;
    }
  }

  const onChangeIntegrant = (integrants: TypeProspect[]) => {
    setCampaign({ ...campaign, integrants: integrants });
    return stepsValidator(2, integrants.length);
  };

  const onChangeCommitments = (val: string) => {
    return setCampaign({ ...campaign, commitments: val });
  }

  const onChangeName = (name: string) => {
    setCampaign({ ...campaign, name });
    return stepsValidator(1, name.length);
  }

  const createCampaign = () => {
    props.success(campaign);
    return props.cancel();
  }

  const getCurrentStep = (step: number) => {
    stepsValidator(step);
    return setCurrentStep(step);
  };

  return (
    <div className="elections-tabs-view-section">
      <ProgressSteps
        cancelSteps={() => props.cancel()}
        getCurrentStep={getCurrentStep}
        onPass={createCampaign}
        stepNames={['name', 'integrants', 'commitments', 'review']}
        isTheStepValid={isCurrentStepValid}
      >
        <RenderIf isTrue={currentStep === 1}>
          <StepCampaignName
            onChangeName={onChangeName}
            name={campaign.name}
          />
        </RenderIf>
        <RenderIf isTrue={currentStep === 2}>
          <StepAddIntegrants
            onChange={onChangeIntegrant}
            integrants={campaign.integrants}
          />
        </RenderIf>
        <RenderIf isTrue={currentStep === 3}>
          <StepCommitments
            campaignName={campaign.name}
            commitments={campaign.commitments}
            onChange={onChangeCommitments}
          />
        </RenderIf>
        <RenderIf isTrue={currentStep === 4}>
          <FinalPreviewSteps
            campaign={campaign}
          />
        </RenderIf>
      </ProgressSteps>
    </div>
  );
};

