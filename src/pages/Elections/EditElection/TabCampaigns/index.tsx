import React, { useMemo } from "react";
import Card from "components/Card";
import AddIcon from "icons/AddIcon";
import { rmArrChildFromArr } from "utils/parsersData";
import "./index.css";

type PropsTabCampaigns = {
  election: any;
  candidates: any[];
  campaigns: any[];
  removeElection: () => Promise<any>;
  updateElection: (data: { [key: string]: any }) => Promise<any>;
  screenCampaign: (val: { [key: string]: any }) => void;
  apiMutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
};

export default function TabCampaigns(props: PropsTabCampaigns) {
  const election = useMemo(() => props.election, [props]);
  const campaigns = useMemo(() => props.campaigns, [props]);

  console.log({ campaigns });

  return <div>
    <div className='container-election-name breadcrumbs-with-button'>
      <button onClick={() => props.screenCampaign({ campaign: null })} className='btn-right-breadcrumb'>
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
            content={campaign.commitments_text}
            onClick={(slug) => {
              return props.screenCampaign({
                campaign,
                candidates: props.candidates.filter((cn) => cn.campaign_slug === slug)
              });
            }}
            onDelete={async slug => {
              return await props.updateElection(
                {
                  campaigns: rmArrChildFromArr(election.campaigns, "slug", slug),
                  candidates: rmArrChildFromArr(election.candidates, "campaign_slug", slug)
                }
              );
            }}
          />
        );
      })}
    </div>
  </div>;
}