import React from "react";
import ListCampaigns from "components/Lists/ListCampaigns";
import AddIcon from "icons/AddIcon";
import { TypeElection } from "types/electionTypes";
import "./index.css";

export type PropsTabCampaigns = {
  updateElection: (newElection: TypeElection) => Promise<any>;
  editCampaign: (slug: string | null) => void;
};

export default function TabCampaigns(props: PropsTabCampaigns) {

  return <div>
    <div className='container-election-name breadcrumbs-with-button'>
      <button onClick={() => props.editCampaign(null)} className='btn-right-breadcrumb'>
        <AddIcon />Agregar partido
      </button>
    </div>
    <div className='elections-tabs-view-section'>
      <ListCampaigns
        editCampaign={props.editCampaign}
        updateElection={props.updateElection}
      />
    </div>
  </div>;
}