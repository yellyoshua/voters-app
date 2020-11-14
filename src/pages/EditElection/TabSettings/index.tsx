import React, { useCallback, useMemo, useState } from "react";
import { useAsyncFn } from "react-use";
import ModalCargo from "components/Modals/ModalCargo";
import ListCargos from "components/Lists/ListCargos";
import Button from "react-rainbow-components/components/Button";
import SettingsAuth from "components/Sections/SettingsAuth";
import SettingsStateElection from "components/Sections/SettingsStateElection";
import { useTheElection } from "context/TheElectionContext";
import { TypeElectionFunc } from "types/electionTypes";

// [x] Button Star/Stop election votes 
// [x] Create cargos candidates

type PropsTabSettings = {
  updateElection: (newElection: TypeElectionFunc) => Promise<any>
};

export default function TabSettings({ updateElection }: PropsTabSettings) {
  const { theElection } = useTheElection();
  const [stateAsyncUpdate, execAsyncUpdate] = useAsyncFn(updateElection, []);
  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);

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

  return <div>
    <ModalCargo
      isOpen={isModalOpen}
      createOrUpdate={updateElection}
      cancel={closeModal}
      slug={slugCampaign}
    />
    <div className='elections-tabs-view-section'>
      <SettingsStateElection
        execAsyncUpdate={execAsyncUpdate}
        stateAsyncUpdate={stateAsyncUpdate}
      />
      <section className="list-items-col" style={{ textAlign: "center" }}>
        <div>
          <Button label="Crear cargo" onClick={() => openModal(null)} />
        </div>
        <ListCargos
          cargos={cargos}
          editCargo={openModal}
        />
      </section>
      <SettingsAuth
        execAsyncUpdate={execAsyncUpdate}
        stateAsyncUpdate={stateAsyncUpdate}
      />
    </div>
  </div>
}