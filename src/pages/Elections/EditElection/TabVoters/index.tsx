import React, { useReducer } from "react";
import Button from "react-rainbow-components/components/Button";
import ModalVoter from "components/Modals/ModalVoter";
import RenderIf from "react-rainbow-components/components/RenderIf";
import { TypeElection } from "types/appTypes";

// [-] Create/Edit Tags
// [x] Modal upload Voters
// [x] "Modal create Tags" -> Voters create tags
// [] Generate and download plantilla

type ReducerActionsTypes =
  { type: "set_voters", payload: any[] } |
  { type: "set_modal_voter", payload: boolean };

type ReducerStateType = { isOpenVoter: boolean };

const reducer = (state: ReducerStateType, action: ReducerActionsTypes) => {
  switch (action.type) {
    case "set_modal_voter":
      return { ...state, isOpenVoter: action.payload };
    default:
      return state;
  }
}

const setReducerInitialState = () => {
  return {
    isOpenVoter: false
  }
}

type PropsTabVoters = {
  tags: any[];
  voters: any[];
  election: TypeElection;
  apiMutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
  updateElection: (data: { [key: string]: any; }) => Promise<any>;
};

export default function TabVoters(props: PropsTabVoters) {
  const [state, dispatch] = useReducer(reducer, setReducerInitialState());

  return <div>
    <ModalVoter
      isOpen={state.isOpenVoter}
      pushData={props.updateElection}
      closeModal={() => dispatch({ type: "set_modal_voter", payload: false })}
    />
    <RenderIf isTrue={!state.isOpenVoter}>
      <div className='breadcrumbs-with-button'>
        <Button
          label="Descargar plantilla"
          onClick={() => { }}
          variant="neutral"
        />
        <Button
          label="Subir / Actualizar votantes"
          onClick={() => dispatch({ type: "set_modal_voter", payload: true })}
          variant="success"
        />
      </div>
      <div className='elections-tabs-view-section'>
        <p>Tab voters</p>
      </div>
    </RenderIf>
  </div>
}