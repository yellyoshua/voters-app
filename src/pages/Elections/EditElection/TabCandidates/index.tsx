import React from "react";

type PropsTabCandidates = {
  campaignsSlugs: string[];
  campaignsNames: string[];
};

export default function TabCandidates(props: PropsTabCandidates) {
  return <div>
    <p>Tab candidates</p>
    <div className='elections-tabs-view-section'>
      <h1>Names</h1>
      {props.campaignsNames.map((campaignName, key) => {
        return <p key={key}>{campaignName}</p>
      })}
      <h1>Slugs</h1>
      {props.campaignsSlugs.map((campaignSlug, key) => {
        return <p key={key}>{campaignSlug}</p>
      })}
    </div>
  </div>
}