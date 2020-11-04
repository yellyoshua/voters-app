import React from "react";
import CardCampaign from "components/Card/CardCampaign";
import { useTheElection } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import { doubleArrRemoveItem } from "utils/parsersData";
import { TypeCampaignObj, TypeElection } from "types/electionTypes";

type PropsListCampaigns = {
  updateElection: (data: TypeElection) => Promise<any>;
  editCampaign: (slug: string | null) => void;
};

const { convertDoubleArrToObjArr } = useParserData();

export default function ListCampaigns({ updateElection, editCampaign }: PropsListCampaigns) {
  const { theElection } = useTheElection();
  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  return <div>
    {campaigns.map((campaign, index) => {
      return <CardCampaign
        key={index}
        campaign={campaign}
        onRequestOpen={editCampaign}
        onRequestDelete={async slug => {
          return await updateElection(
            {
              ...theElection,
              campaigns: doubleArrRemoveItem(theElection.campaigns, "slug", slug),
              candidates: doubleArrRemoveItem(theElection.candidates, "campaign_slug", slug)
            }
          );
        }}
      />
    })}
  </div>;
}