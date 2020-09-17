import React from "react";
import { TypeElection } from "types/appTypes";
import "./index.css";

type PropsListCampaign = {
  election: TypeElection;
  onChangeElection: (val: TypeElection) => void;
};

export default function ListCampaign(props: PropsListCampaign) {
  // const removeCampaign = (campaignName: string) => {
  //   let newElection = props.election;
  //   newElection.campaigns = newElection.campaigns.filter((campaign) => campaign.name !== campaignName);
  //   return props.onChangeElection(newElection);
  // };

  const changeElectionName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    return props.onChangeElection({ ...props.election, name: value });
  }

  return (
    <div>
      <div className="container-election-name">
        <input type="text" onChange={changeElectionName} value={props.election.name} />
      </div>
      {
        props.election.campaigns.map((campaign, index) => {
          return <p key={index}>{campaign.name}</p>
        })
      }
    </div>
  )
}