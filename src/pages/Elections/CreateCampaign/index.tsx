import React, { useReducer, useContext } from "react";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Input from "react-rainbow-components/components/Input";
import ProgressSteps from "components/ProgressSteps";
import UploadFile from "components/UploadFile";
import { TokenContext } from "context/UserContext";
import useFetch from "hooks/useFetch";
import { parseObjtArrToArr } from "utils/parsersData";
import { uuidv4 } from "utils/createUID";
import { REACT_API_URL } from "configurations/api";
import { campaignsDataModel, defaultCampaign } from "models/election";
import "./index.css";

type ReducerActionsTypes = { type: "cmp_commts_text", payload: string } |
{ type: "cmp_commts_file", payload: any } |
{ type: "stp_go", payload: { isValid: boolean, val: number } } |
{ type: "stp_check", payload: boolean } |
{ type: "cmp_name_slug", payload: { name: string } };

type ReducerStateType = { campaign: { [key: string]: any }, currentStep: { isValid: boolean, val: number } };

const reducer = (state: ReducerStateType, action: ReducerActionsTypes) => {
  switch (action.type) {
    case "cmp_commts_file":
      return { ...state, campaign: { ...state.campaign, commitments_file: action.payload } };
    case "cmp_name_slug":
      return { ...state, campaign: { ...state.campaign, ...action.payload } }
    case "stp_go":
      return { ...state, currentStep: { isValid: action.payload.isValid, val: action.payload.val } };
    case "stp_check":
      return { ...state, currentStep: { ...state.currentStep, isValid: action.payload } };
    default:
      return state;
  }
}

const setReducerInitialState = (currentCampaignVal: any, currentStepValid: boolean) => {
  return {
    campaign: currentCampaignVal,
    currentStep: { isValid: currentStepValid, val: 1 }
  }
};

type PropsAddProspects = {
  campaigns: any[];
  campaign?: { [key: string]: any };
  createOrUpdate: (newElection: { [key: string]: any }) => void;
  cancel: () => void;
};

export default function AddCampaign(props: PropsAddProspects) {
  const token = useContext(TokenContext);
  const { fetchDelWithToken } = useFetch();
  const currentStepValid = props.campaign ? Boolean(props.campaign.campaign) : false;
  const currentCampaignVal = props.campaign ? props.campaign.campaign || defaultCampaign : defaultCampaign;
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

  const onChangeName = ({ name }: { name: string }) => {
    dispatch({ type: "cmp_name_slug", payload: { name } });
    const isValid = isCurrentStepValid(1, name.length);
    return dispatch({ type: "stp_check", payload: isValid });
  };

  const createCampaign = () => {
    let newCampaigns = props.campaigns;
    const existCampaign = newCampaigns.findIndex(campaign => campaign.id === reducerVal.campaign.id) !== -1;

    if (existCampaign) {
      newCampaigns = newCampaigns.map((campaign) => {
        let newCampaign = campaign;
        if (newCampaign.id === reducerVal.campaign.id) {
          newCampaign = reducerVal.campaign;
        }
        return newCampaign;
      });
    } else {
      newCampaigns.push({ ...reducerVal.campaign, slug: uuidv4() });
    }

    props.createOrUpdate({
      campaigns: parseObjtArrToArr(newCampaigns, campaignsDataModel)
    });
    return props.cancel();
  };

  const getCurrentStep = (step: number) => {
    const isValid = isCurrentStepValid(step);
    return dispatch({ type: "stp_go", payload: { isValid: isValid, val: step } });
  };

  return (
    <div className='elections-tabs-view-section'>
      <ProgressSteps
        cancelSteps={() => props.cancel()}
        getCurrentStep={getCurrentStep}
        onPass={createCampaign}
        stepNames={["name", "commitments", "review"]}
        isTheStepValid={reducerVal.currentStep.isValid}
      >
        <RenderIf isTrue={reducerVal.currentStep.val === 1}>
          <StepCampaignName onChangeName={onChangeName} name={reducerVal.campaign.name} />
        </RenderIf>
        <RenderIf isTrue={reducerVal.currentStep.val === 2}>
          <StepCommitments campaignName={reducerVal.campaign.name} commitments_file={reducerVal.campaign.commitments_file} onChange={onChangeCommitments} />
        </RenderIf>
        <RenderIf isTrue={reducerVal.currentStep.val === 3}>
          <FinalPreviewSteps campaign={reducerVal.campaign} />
        </RenderIf>
      </ProgressSteps>
    </div >
  );
}

type PropsStepCampaignName = {
  name: string;
  onChangeName: (val: { name: string }) => void;
};
function StepCampaignName(props: PropsStepCampaignName) {
  return (
    <>
      <div className='step-title'>
        <h1>Nombre para el partido.</h1>
      </div>
      <Input
        onChange={({ target: { value } }) => {
          return props.onChangeName({ name: String(value) });
        }}
        placeholder=''
        value={props.name}
        style={{ maxWidth: 270 }}
        className='rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto'
      />
      <div className='step-instruction'>
        <p>M&iacute;nimo 4 caracteres.</p>
      </div>
    </>
  );
}


type PropsStepCommitments = {
  campaignName: string;
  onChange: (val: any, id?: number) => void;
  commitments_file: any;
};

function StepCommitments(props: PropsStepCommitments) {
  return (
    <>
      <section className='step-title'>
        <h1>Propuestas del partido.</h1>
      </section>
      <section>
        {props.commitments_file ?
          (<div className="commitments-file-container">
            <div className="commitments-file-wrapper">
              <a href={`${REACT_API_URL + props.commitments_file[0].url}`} target="_blank" rel="noopener noreferrer">
                {props.commitments_file[0].name}
              </a>
              <button className="button-icon-little-danger" onClick={() => props.onChange(null, Number(props.commitments_file[0].id))}>x</button>
            </div>
          </div>)
          :
          (<UploadFile
            url="/upload"
            onError={(err) => console.log({ err })}
            progress={() => null}
            success={props.onChange}
          />)
        }
      </section>
    </>
  );
}

type PropsFinalPreviewSteps = {
  campaign: { [key: string]: any };
};

function FinalPreviewSteps(props: PropsFinalPreviewSteps) {
  return (
    <>
      <div className='step-title'>
        <h1>Vista previa</h1>
      </div>
      <div className="container-preview-steps">
        <div className="container-preview-steps-wrapper">
          <h1>Nombre para el partido.</h1>
          <p>{props.campaign.name}</p>
        </div>
        <div className="container-preview-steps-wrapper">
          <h1>Propuestas del partido.</h1>
          {props.campaign.commitments_file ? (
            <div className="commitments-file-container">
              <div className="commitments-file-wrapper">
                <a href={`${REACT_API_URL + props.campaign.commitments_file[0].url}`} target="_blank" rel="noopener noreferrer">
                  {props.campaign.commitments_file[0].name}
                </a>
              </div>
            </div>
          ) : <p>(Vac&iacute;o)</p>}
        </div>
      </div>
    </>
  );
}