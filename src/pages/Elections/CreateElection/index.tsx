import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Breadcrumbs from "components/Breadcrums";
import AddIcon from "icons/AddIcon";
import ListCampaign from "pages/Elections/ListCampaign";
import CreateCampaign from "pages/Elections/CreateCampaign";
import { TypeCampaign, TypeElection } from "types/appTypes";
import "./index.css";

type PropsCreateElection = RouteComponentProps & { goTo: (pathname: string) => void; };

export default function CreateElection(props: PropsCreateElection) {
  const [election, setElection] = useState<TypeElection>({ name: "- Elecciones -", campaigns: [] });
  const [isOpenCreateCampaign, setIsOpenCreateCampaign] = useState<boolean>(false);

  const breadcrumbs = [
    { name: "Elecciones", pathname: "/elections" },
    { name: election.name, pathname: `/elections/${election.name}` }
  ];

  const addCampaign = (campaign: TypeCampaign) => {
    setElection({ ...election, campaigns: [...election.campaigns, campaign] });
    return setIsOpenCreateCampaign(false);
  }

  if (isOpenCreateCampaign) {
    return (
      <>
        <Breadcrumbs breadcrumbs={breadcrumbs} goTo={props.goTo} />
        <CreateCampaign
          success={addCampaign}
          cancel={() => setIsOpenCreateCampaign(false)}
        />
      </>
    )
  }

  return (
    <div>
      <div className="breadcrumbs-with-button">
        <Breadcrumbs breadcrumbs={breadcrumbs} goTo={props.goTo} />
        <button onClick={() => setIsOpenCreateCampaign(true)} className="btn-right-breadcrumb">
          <AddIcon />Agregar partido
        </button>
      </div>
      <div className="elections-tabs-view-section">
        <ListCampaign
          election={election}
          onChangeElection={setElection}
        />
      </div>
    </div>
  )
}