import React, { useState } from "react";
import RenderIf from "react-rainbow-components/components/RenderIf";
import ProgressSteps from "components/ProgressSteps";
import { StepCampaignName, StepAddCandidate, StepCommitments, FinalPreviewSteps } from "pages/Elections/CreateCampaign/StepsCreateCampaign";
import "./index.css";

// Hacer que frontend maneje datos
// tipo objeto y los guarde como array's.

type PropsAddProspects = {
  election: { [key: string]: any };
  success: (newElection: { [key: string]: any }) => void;
  cancel: () => void;
};

export default function AddCampaign(props: PropsAddProspects) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCurrentStepValid, setCurrentStepValid] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<{ [key: string]: any }>({
    name: "",
    commitments_file: "/fileStorage.jpg",
    commitments_text: ""
  });
  const [candidates, setCandidate] = useState<{ [key: string]: any }[]>([]);

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
      return setCurrentStepValid(campaign.name.length > 4); // campaign.name.length
    } else if (step === 2) {
      return setCurrentStepValid(candidates.length === 4); // campaign.name.length
    } else {
      return null;
    }
  };

  const onChangeIntegrant = (candidate: { [key: string]: any }[]) => {
    setCandidate([...candidates, candidate]);
    return stepsValidator(2, candidates.length);
  };

  const onChangeCommitments = (val: string) => {
    return setCampaign({ ...campaign, commitments_text: val });
  };

  const onChangeName = (name: string) => {
    setCampaign({ ...campaign, name });
    return stepsValidator(1, name.length);
  };

  const createCampaign = () => {
    props.success({ ...props.election, campaigns: [...props.election.campaigns, campaign] });
    return props.cancel();
  };

  const getCurrentStep = (step: number) => {
    stepsValidator(step);
    return setCurrentStep(step);
  };

  return (
    <div className='elections-tabs-view-section'>
      <ProgressSteps
        cancelSteps={() => props.cancel()}
        getCurrentStep={getCurrentStep}
        onPass={createCampaign}
        stepNames={["name", "candidates", "commitments", "review"]}
        isTheStepValid={isCurrentStepValid}>
        <RenderIf isTrue={currentStep === 1}>
          <StepCampaignName onChangeName={onChangeName} name={campaign.name} />
        </RenderIf>
        <RenderIf isTrue={currentStep === 2}>
          <StepAddCandidate onChange={onChangeIntegrant} candidates={candidates} />
        </RenderIf>
        <RenderIf isTrue={currentStep === 3}>
          <StepCommitments campaignName={campaign.name} commitments={campaign.commitments} onChange={onChangeCommitments} />
        </RenderIf>
        <RenderIf isTrue={currentStep === 4}>
          //@ts-ignore
          <FinalPreviewSteps campaign={campaign} />
        </RenderIf>
      </ProgressSteps>
    </div>
  );
}
