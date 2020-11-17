import React, { useCallback, useState } from "react";
import Button from "react-rainbow-components/components/Button";
import ModalCargo from "components/Modals/ModalCargo";
import ListCargos from "components/Lists/ListCargos";
import SettingsAuth from "components/Sections/SettingsAuth";
import SettingsStateElection from "components/Sections/SettingsStateElection";

// [x] Button Star/Stop election votes 
// [x] Create cargos candidates

type PropsTabSettings = {};

export default function TabSettings(_: PropsTabSettings) {
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
      cancel={closeModal}
      slug={slugCampaign}
    />
    <div className='elections-tabs-view-section'>
      <SettingsStateElection />
      <section className="list-items-col" style={{ textAlign: "center" }}>
        <div>
          <Button label="Crear cargo" onClick={() => openModal(null)} />
        </div>
        <ListCargos editCargo={openModal} />
      </section>
      <SettingsAuth />
    </div>
  </div>
}