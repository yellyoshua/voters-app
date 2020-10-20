import React from "react";
import { useTheElection } from "context/TheElectionContext";
import useParserData from "hooks/useParserData"

type PropsTabCandidates = {};

const { getValuesFromDoubleArray } = useParserData();

export default function TabCandidates(_: PropsTabCandidates) {
  const { theElection } = useTheElection();

  const campaignsNames = getValuesFromDoubleArray<string>(theElection.campaigns, "name");
  const campaignsSlugs = getValuesFromDoubleArray<string>(theElection.campaigns, "slug");

  return <div>
    <p>Tab candidates</p>
    <div className='elections-tabs-view-section'>
      <h1>Names</h1>
      {campaignsNames.map((campaignName, key) => {
        return <p key={key}>{campaignName}</p>
      })}
      <h1>Slugs</h1>
      {campaignsSlugs.map((campaignSlug, key) => {
        return <p key={key}>{campaignSlug}</p>
      })}
    </div>
  </div>
}