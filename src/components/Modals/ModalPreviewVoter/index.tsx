import React, { useContext, useMemo } from "react";
import { TheElectionContext } from "context/TheElectionContext";
import Modal from "react-rainbow-components/components/Modal";
import TableWithPagination from "components/TableWithPagination";

type PropsModalPreviewVoter = {
  isOpen: boolean;
  selectedTag: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalPreviewVoter({ isOpen, selectedTag, onClose }: PropsModalPreviewVoter) {
  const theElection = useContext(TheElectionContext);

  const voters = useMemo(() => theElection?.voters, [theElection]);

  if (isOpen) {
    return <Modal title={selectedTag} isOpen={isOpen} onRequestClose={() => onClose(false)}>
      <TableWithPagination
        data={voters!.data[selectedTag]}
        fields={voters!.fields}
        limit={5}
        keyField={voters!.fields[0]}
      />
    </Modal>
  }
  return null;
}