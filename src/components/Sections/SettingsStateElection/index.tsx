import React, { useState } from "react";
import ButtonGroupPicker from "components/ButtonGroupPicker";
import { AsyncState } from "react-use/lib/useAsyncFn";
import { useTheElection } from "context/TheElectionContext";
import { TypeElectionFunc, TypeStatusElection } from "types/electionTypes";

type PropsSettingsStateElection = {
  execAsyncUpdate: (newElection: TypeElectionFunc) => Promise<any>;
  stateAsyncUpdate: AsyncState<any>;
}

const pickStatusList: { show: string, value: TypeStatusElection }[] = [
  { show: "Activo", value: "active" },
  { show: "No activo", value: "no_active" },
  { show: "Cerrado", value: "closed" }
];

export default function SettingsStateElection({ execAsyncUpdate, stateAsyncUpdate }: PropsSettingsStateElection) {
  const { theElection } = useTheElection();
  const [statusPicked, pickStatus] = useState<TypeStatusElection>(theElection.status);

  return <section>
    <ButtonGroupPicker
      title="Estado eleccion"
      disabled={stateAsyncUpdate.loading}
      itemPicked={statusPicked}
      onPick={(iPicked) => {
        pickStatus(iPicked as TypeStatusElection);
        return execAsyncUpdate({
          status: statusPicked
        });
      }}
      pickList={pickStatusList}
    />
  </section>
}