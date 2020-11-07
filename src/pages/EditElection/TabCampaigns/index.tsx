import React, { useCallback, useState } from "react";
import ListCampaigns from "components/Lists/ListCampaigns";
import AddIcon from "icons/AddIcon";
import ModalCampaign from "components/Modals/ModalCampaign";
import { TypeElectionFunc } from "types/electionTypes";
import "./index.css";

export type PropsTabCampaigns = {
  updateElection: (election: TypeElectionFunc) => Promise<any>;
};

export default function TabCampaigns({ updateElection }: PropsTabCampaigns) {
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
    <ModalCampaign
      isOpen={isModalOpen}
      slug={slugCampaign}
      createOrUpdate={updateElection}
      cancel={closeModal}
    />
    <div className='container-election-name breadcrumbs-with-button'>
      <button onClick={() => openModal(null)} className='btn-right-breadcrumb'>
        <AddIcon />Agregar partido
      </button>
    </div>
    <div className='elections-tabs-view-section'>
      <ListCampaigns
        editCampaign={openModal}
        updateElection={updateElection}
      />
    </div>
  </div>;
}