import React, { useCallback, useState } from "react";
import AddIcon from "icons/AddIcon";
import ListCandidates from "components/Lists/ListCandidates";
import { TypeElectionFunc } from "types/electionTypes";
import ModalCandidate from "components/Modals/ModalCandidate";

type PropsTabCandidates = {
  updateElection: (election: TypeElectionFunc) => Promise<any>;
};

export default function TabCandidates({ updateElection }: PropsTabCandidates) {

  const [isModalOpen, setModalOpen] = useState(false);
  const [slugIntegrant, setSlugIntegrant] = useState<string | null>(null);

  const openModal = useCallback((slug: string | null) => {
    setSlugIntegrant(slug);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setSlugIntegrant(null);
    setModalOpen(false);
  }, []);

  return <div>
    <ModalCandidate
      isOpen={isModalOpen}
      slug={slugIntegrant}
      createOrUpdate={updateElection}
      cancel={closeModal}
    />
    <div className='container-election-name breadcrumbs-with-button'>
      <button onClick={() => openModal(null)} className='btn-right-breadcrumb'>
        <AddIcon />Agregar Candidato
      </button>
    </div>
    <div className='elections-tabs-view-section'>
      <ListCandidates
        editCandidate={openModal}
        updateElection={updateElection}
      />
    </div>
  </div>
}