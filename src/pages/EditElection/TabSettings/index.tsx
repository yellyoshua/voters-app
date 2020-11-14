import React, { useCallback, useMemo, useState } from "react";
import { useAsyncFn } from "react-use";
import ButtonGroupPicker from "components/ButtonGroupPicker";
import InputFetch from "components/InputFetch";
import ModalCargo from "components/Modals/ModalCargo";
import ListCargos from "components/Lists/ListCargos";
import { useTheElection } from "context/TheElectionContext";
import Button from "react-rainbow-components/components/Button";
import RadioGroup from "react-rainbow-components/components/RadioGroup";
import { TypeElectionFunc, TypeStatusElection } from "types/electionTypes";

// [x] Button Star/Stop election votes 
// [x] Create cargos candidates

type PropsTabSettings = {
  updateElection: (newElection: TypeElectionFunc) => Promise<any>
};

const pickStatusList: { show: string, value: TypeStatusElection }[] = [
  { show: "Activo", value: "active" },
  { show: "No activo", value: "no_active" },
  { show: "Cerrado", value: "closed" }
];

export default function TabSettings({ updateElection }: PropsTabSettings) {
  const { theElection } = useTheElection();
  const [stateAsyncUpdate, execAsyncUpdate] = useAsyncFn(updateElection, []);
  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);
  const selectFieldsList = useMemo(() => theElection.voters.fields.map(field =>
    ({ value: field, label: field, disabled: stateAsyncUpdate.loading })), [stateAsyncUpdate.loading, theElection]);

  const [first_auth, setFirst_auth] = useState(theElection.first_auth);
  const [second_auth, setSecond_auth] = useState(theElection.second_auth);

  const [statusPicked, pickStatus] = useState<TypeStatusElection>(theElection.status);
  const [isModalOpen, setModalOpen] = useState(false);
  const [slugCampaign, setSlugCampaign] = useState<string | null>(null);

  const openModal = useCallback((slug: string | null) => {
    setSlugCampaign(slug);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSlugCampaign(null);
    setModalOpen(false);
  }, []);

  console.log({ theElection });

  return <div>
    <ModalCargo
      isOpen={isModalOpen}
      createOrUpdate={updateElection}
      cancel={closeModal}
      slug={slugCampaign}
    />
    <div className='elections-tabs-view-section'>
      <section>
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
      <section className="list-items-col" style={{ textAlign: "center" }}>
        <div>
          <Button label="Crear cargo" onClick={() => openModal(null)} />
        </div>
        <ListCargos
          cargos={cargos}
          editCargo={openModal}
        />
      </section>
      <section className="list-items-row">
        <div className="list-items-col">
          <InputFetch
            beforeChange={null}
            placeholder="Primera validación"
            initialValue={first_auth.name}
            onChange={(first_auth) => {
              return execAsyncUpdate({
                first_auth
              });
            }}
            resolveData={(value) => ({
              ...first_auth,
              name: value
            })}
          />
          <RadioGroup
            id="radio-group-component-1"
            options={selectFieldsList}
            value={first_auth.field}
            className="isActive"
            // @ts-ignore
            onChange={({ target: { value } }) => {
              const new_first_auth = { ...first_auth, field: value };
              setFirst_auth(new_first_auth);
              return execAsyncUpdate({
                first_auth: new_first_auth
              });
            }}
          />
        </div>
        <div className="list-items-col">
          <InputFetch
            beforeChange={null}
            placeholder="Segunda validación"
            initialValue={second_auth.name}
            onChange={(second_auth) => {
              return execAsyncUpdate({
                second_auth
              });
            }}
            resolveData={(value) => ({
              ...second_auth,
              name: value
            })}
          />
          <RadioGroup
            id="radio-group-component-1"
            options={selectFieldsList}
            value={second_auth.field}
            className="isActive"
            // @ts-ignore
            onChange={({ target: { value } }) => {
              const new_second_auth = { ...second_auth, field: value };
              setSecond_auth(new_second_auth);
              return execAsyncUpdate({
                second_auth: new_second_auth
              });
            }}
          />
        </div>
      </section>
    </div>
  </div>
}