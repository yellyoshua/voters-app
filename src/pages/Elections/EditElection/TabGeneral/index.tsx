import React from "react";
import InputFetch from "components/InputFetch";
import "./index.css";

// [] Update Election Name
// [] Show general stats
// [] Show graph stats election
// [] Button generate report pdf

type PropsTabGeneral = {
  nameElection: string;
  campaigns: any[];
  candidates: any[];
  tags: any[];
  voters: any[];
  updateElection: (data: { [key: string]: any }) => Promise<any>;
  apiMutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
};

export default function TabGeneral(props: PropsTabGeneral) {
  return <div className='elections-tabs-view-section'>
    <div>
      <InputFetch
        initialValue={props.nameElection}
        beforeChange={null}
        onChange={props.updateElection}
        resolveData={val => ({ name: val })}
      />
    </div>
    <section className="campaign-general-stats-container">
      <div className="campaign-general-stats-wrapper">
        <p>{props.voters.length}</p>
        <h1>Votantes</h1>
      </div>
      <div className="campaign-general-stats-wrapper">
        <p>{props.campaigns.length}</p>
        <h1>Partidos</h1>
      </div>
      <div className="campaign-general-stats-wrapper">
        <p>{props.tags.length}</p>
        <h1>Etiquetas</h1>
      </div>
      <div className="campaign-general-stats-wrapper">
        <p>{props.candidates.length}</p>
        <h1>Candidatos</h1>
      </div>
    </section>
  </div>
}