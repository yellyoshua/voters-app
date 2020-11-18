import React, { useContext } from "react";
import ButtonGroupPicker from "components/ButtonGroupPicker";
import { TheElectionContext, TheUpdateElectionContext } from "context/TheElectionContext";
import { TypeStatusElection } from "types/electionTypes";

type PropsSettingsStateElection = {};

const pickStatusList: { show: string, value: TypeStatusElection }[] = [
  { show: "Activo", value: "active" },
  { show: "No activo", value: "no_active" },
  { show: "Cerrado", value: "closed" }
];

export default function SettingsStateElection(_: PropsSettingsStateElection) {
  const theElection = useContext(TheElectionContext)!;
  const [asyncUpdate, updateElection] = useContext(TheUpdateElectionContext)!;

  return <section>
    <ButtonGroupPicker
      title="Estado eleccion"
      disabled={asyncUpdate.loading}
      itemPicked={theElection.status}
      onPick={(iPicked) => {
        const status = iPicked as TypeStatusElection;
        return updateElection({
          status: status
        }, () => { });
      }}
      pickList={pickStatusList}
    />
  </section>
}