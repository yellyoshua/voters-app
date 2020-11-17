import React, { useContext } from "react";
import { TheElectionContext, TheUpdateElectionContext } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import InputFetch from "components/InputFetch";
import { TypeCampaignObj, TypeCandidateObj, TypeTagObj } from "types/electionTypes";
import "./index.css";

// [x] Update Election Name
// [x] Show general stats
// [] Show graph stats election -> moved to path /stats
// [] Button generate report pdf -> moved to path /stats

type PropsTabGeneral = {};

const { convertDoubleArrToObjArr } = useParserData();

export default function TabGeneral(_: PropsTabGeneral) {
  const theElection = useContext(TheElectionContext)!;
  const [, updateElection] = useContext(TheUpdateElectionContext)!;

  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);
  const candidates = convertDoubleArrToObjArr<TypeCandidateObj>(theElection.candidates);
  const tags = convertDoubleArrToObjArr<TypeTagObj>(theElection.tags);
  const voters = convertDoubleArrToObjArr<any[]>(theElection.voters.data);

  return <div className='elections-tabs-view-section'>
    <div>
      <InputFetch
        initialValue={theElection.name}
        beforeChange={null}
        onChange={(data) => {
          return updateElection(data, () => { });
        }}
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