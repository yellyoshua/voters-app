import React from "react";
import Card from "components/Card";
import AddIcon from "icons/AddIcon";
import { rmArrChildFromArr } from "utils/parsersData";
import { useTheElection } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import { TypeCampaignObj } from "types/electionTypes";
import "./index.css";

type PropsTabCampaigns = {
  updateElection: (data: { [key: string]: any }) => Promise<any>;
  editCampaign: (slug: string | null) => void;
};

const { convertDoubleArrToObjArr } = useParserData();

export default function TabCampaigns(props: PropsTabCampaigns) {
  const { theElection } = useTheElection();

  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  return <div>
    <div className='container-election-name breadcrumbs-with-button'>
      <button onClick={() => props.editCampaign(null)} className='btn-right-breadcrumb'>
        <AddIcon />Agregar partido
      </button>
    </div>
    <div className='elections-tabs-view-section'>
      {campaigns.map((campaign, index) => {
        return (
          <Card
            key={index}
            id={campaign.slug}
            title={campaign.name}
            content=""
            onClick={props.editCampaign}
            onDelete={async slug => {
              return await props.updateElection(
                {
                  campaigns: rmArrChildFromArr(theElection.campaigns, "slug", slug),
                  candidates: rmArrChildFromArr(theElection.candidates, "campaign_slug", slug)
                }
              );
            }}
          />
        );
      })}
    </div>
  </div>;
}