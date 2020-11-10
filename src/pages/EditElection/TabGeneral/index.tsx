import React from "react";
import InputFetch from "components/InputFetch";
import { useTheElection } from "context/TheElectionContext"
import useParserData from "hooks/useParserData";
import { TypeCampaignObj, TypeCandidateObj, TypeTagObj, TypeElectionFunc } from "types/electionTypes";
import "./index.css";

// [x] Update Election Name
// [x] Show general stats
// [] Show graph stats election -> moved to path /stats
// [] Button generate report pdf -> moved to path /stats

type PropsTabGeneral = {
  updateElection: (newElection: TypeElectionFunc) => Promise<any>;
};

const { convertDoubleArrToObjArr } = useParserData();

export default function TabGeneral(props: PropsTabGeneral) {
  const { theElection, mutateTheElectionWith } = useTheElection();

  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);
  const candidates = convertDoubleArrToObjArr<TypeCandidateObj>(theElection.candidates);
  const tags = convertDoubleArrToObjArr<TypeTagObj>(theElection.tags);
  const voters = convertDoubleArrToObjArr<any[]>(theElection.voters.data);

  return <div className='elections-tabs-view-section'>
    <div>
      <InputFetch
        initialValue={theElection.name}
        beforeChange={mutateTheElectionWith}
        onChange={props.updateElection}
        resolveData={name => {
          return { ...theElection, name }
        }}
      />
    </div>
    <section className="list-items-row">
      <div className="campaign-general-stats-wrapper">
        <p>{voters.length}</p>
        <h1>Votantes</h1>
      </div>
      <div className="campaign-general-stats-wrapper">
        <p>{campaigns.length}</p>
        <h1>Partidos</h1>
      </div>
      <div className="campaign-general-stats-wrapper">
        <p>{tags.length}</p>
        <h1>Etiquetas</h1>
      </div>
      <div className="campaign-general-stats-wrapper">
        <p>{candidates.length}</p>
        <h1>Candidatos</h1>
      </div>
    </section>
  </div>
}