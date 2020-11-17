import React, { useCallback, useState } from "react";
import ListCampaigns from "components/Lists/ListCampaigns";
import AddIcon from "icons/AddIcon";
import ModalCampaign from "components/Modals/ModalCampaign";
import "./index.css";

export type PropsTabCampaigns = {};

export default function TabCampaigns(_: PropsTabCampaigns) {
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
      cancel={closeModal}
    />
    <div className='container-election-name breadcrumbs-with-button'>
      <button onClick={() => openModal(null)} className='btn-right-breadcrumb'>
        <AddIcon />Agregar partido
      </button>
    </div>
    <div className='elections-tabs-view-section'>
      <ListCampaigns editCampaign={openModal} />
    </div>
  </div>;
}