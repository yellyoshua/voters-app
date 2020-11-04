import React, { useReducer, useContext, useEffect } from "react";
import RenderIf from "react-rainbow-components/components/RenderIf";
import ProgressSteps from "components/ProgressSteps";
import { TokenContext } from "context/UserContext";
import { useTheElection } from "context/TheElectionContext";
import useAsync from "hooks/useAsync";
import useParserData from "hooks/useParserData";
import useFetch from "hooks/useFetch";
import { uuidv4 } from "utils/createUID";
import { campaignsDataModel, defaultCampaign } from "models/election";
import { TypeCampaignObj, TypeElectionFunc } from "types/electionTypes";

import StepCampaignName from "components/Modals/ModalCreateCampaign/stepNameCampaign";
import StepUploadLogo from "components/Modals/ModalCreateCampaign/stepUploadLogo";
import StepUploadCommitments from "components/Modals/ModalCreateCampaign/stepUploadCommitments";
import StepFinalPreview from "components/Modals/ModalCreateCampaign/stepFilnalPreview";
import Modal from "react-rainbow-components/components/Modal";
import "./index.css";

// [] Step Upload cover image
// [] Step Upload logo image

type ReducerActionsTypes =
  | { type: "cmp_logo_image"; payload: any }
  | { type: "cmp_cover_image"; payload: any }
  | { type: "cmp_commts_file"; payload: any }
  | { type: "stp_go"; payload: { isValid: boolean; val: number } }
  | { type: "stp_check"; payload: boolean }
  | { type: "cmp_name_slug"; payload: { name: string } };

type ReducerStateType = { campaign: TypeCampaignObj; currentStep: { isValid: boolean; val: number } };

const reducer = (state: ReducerStateType, action: ReducerActionsTypes) => {
  switch (action.type) {
    case "cmp_logo_image":
      return { ...state, campaign: { ...state.campaign, logo_image: action.payload } };
    case "cmp_cover_image":
      return { ...state, campaign: { ...state.campaign, cover_image: action.payload } };
    case "cmp_commts_file":
      return { ...state, campaign: { ...state.campaign, commitments_file: action.payload } };
    case "cmp_name_slug":
      return { ...state, campaign: { ...state.campaign, ...action.payload } };
    case "stp_go":
      return { ...state, currentStep: { isValid: action.payload.isValid, val: action.payload.val } };
    case "stp_check":
      return { ...state, currentStep: { ...state.currentStep, isValid: action.payload } };
    default:
      return state;
  }
};

const setReducerInitialState = (currentCampaignVal: any, currentStepValid: boolean) => {
  return {
    campaign: currentCampaignVal,
    currentStep: { isValid: currentStepValid, val: 1 }
  };
};

type PropsModalCreateCampaign = {
  slug: string | null;
  isOpen: boolean;
  createOrUpdate: (newElection: TypeElectionFunc) => Promise<any>;
  cancel: () => void;
};
const { fetchDelWithToken } = useFetch();
const { convertDoubleArrToObjArr, convertObjArrToDoubleArr } = useParserData();

export default function ModalCreateCampaign({ isOpen = false, slug, createOrUpdate, cancel }: PropsModalCreateCampaign) {

  const token = useContext(TokenContext);
  const { theElection } = useTheElection();
  const asyncCreateOrUpdate = useAsync(createOrUpdate, false);
  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  const currentStepValid = slug ? true : false;
  const currentCampaignVal = slug ? campaigns.find(campaign => campaign.slug === slug) : defaultCampaign;
  const [reducerVal, dispatch] = useReducer(reducer, setReducerInitialState(currentCampaignVal, currentStepValid));

  const isCurrentStepValid = (step: number, stpVal?: number) => {
    switch (step) {
      case 1:
        return stpVal ? stpVal > 4 : reducerVal.campaign.name.length > 4;
      default:
        return true;
    }
  };

  const onChangeCommitments = async (val: any, fileId?: number) => {
    dispatch({ type: "cmp_commts_file", payload: val });

    if (!val && fileId) {
      try {
        await fetchDelWithToken(`/upload/files/${fileId}`, token);
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const onChangeLogo = async (val: any, fileId?: number) => {
    dispatch({ type: "cmp_logo_image", payload: val });

    if (!val && fileId) {
      try {
        await fetchDelWithToken(`/upload/files/${fileId}`, token);
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const onChangeName = ({ name }: { name: string }) => {
    dispatch({ type: "cmp_name_slug", payload: { name } });
    const isValid = isCurrentStepValid(1, name.length);
    return dispatch({ type: "stp_check", payload: isValid });
  };

  useEffect(() => {
    if (asyncCreateOrUpdate.status === "success") {
      return cancel();
    }
    return () => { };
  }, [asyncCreateOrUpdate.status, cancel]);

  const createCampaign = () => {
    let newCampaigns = campaigns;
    const existCampaign = newCampaigns.findIndex(campaign => campaign.slug === reducerVal.campaign.slug) !== -1;

    if (existCampaign) {
      newCampaigns = newCampaigns.map(campaign => {
        let newCampaign = campaign;
        if (newCampaign.slug === reducerVal.campaign.slug) {
          newCampaign = reducerVal.campaign;
        }
        return newCampaign;
      });
    } else {
      newCampaigns.push({ ...reducerVal.campaign, slug: uuidv4() });
    }

    asyncCreateOrUpdate.execute({
      campaigns: convertObjArrToDoubleArr(newCampaigns, campaignsDataModel)
    });

    return cancel();
  };

  const getCurrentStep = (step: number) => {
    const isValid = isCurrentStepValid(step);
    return dispatch({ type: "stp_go", payload: { isValid: isValid, val: step } });
  };

  return <Modal title={theElection.name} size='small' isOpen={isOpen} onRequestClose={cancel}>
    <div className='elections-tabs-view-section'>
      <ProgressSteps cancelSteps={cancel} getCurrentStep={getCurrentStep} onPass={createCampaign} stepNames={["name", "logo", "commitments", "review"]} isTheStepValid={reducerVal.currentStep.isValid}>
        <RenderIf isTrue={reducerVal.currentStep.val === 1}>
          <StepCampaignName onChangeName={onChangeName} value={reducerVal.campaign.name} />
        </RenderIf>
        <RenderIf isTrue={reducerVal.currentStep.val === 2}>
          <StepUploadLogo campaignName={reducerVal.campaign.name} logo_image={reducerVal.campaign.logo_image} onChange={onChangeLogo} />
        </RenderIf>
        <RenderIf isTrue={reducerVal.currentStep.val === 3}>
          <StepUploadCommitments campaignName={reducerVal.campaign.name} commitments_file={reducerVal.campaign.commitments_file} onChange={onChangeCommitments} />
        </RenderIf>
        <RenderIf isTrue={reducerVal.currentStep.val === 4}>
          <StepFinalPreview campaign={reducerVal.campaign} />
        </RenderIf>
      </ProgressSteps>
    </div>
  </Modal>
}
