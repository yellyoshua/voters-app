import React from "react";
import { useTheElection } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import { TypeCampaignObj } from "types/electionTypes";

type PropsTabCandidates = {};

const { convertDoubleArrToObjArr } = useParserData();

export default function TabCandidates(_: PropsTabCandidates) {
  const { theElection } = useTheElection();

  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  // const campaignsNames = getValuesFromDoubleArray<string>(theElection.campaigns, "name");
  // const campaignsSlugs = getValuesFromDoubleArray<string>(theElection.campaigns, "slug");

  return <div>
    <p>Tab candidates</p>
    <div className='elections-tabs-view-section'>
      <h1>Names</h1>
      {campaigns.map((campaign, key) => {
        return <p key={key}>{campaign.name}</p>
      })}
    </div>
  </div>
}