import React from "react";
import TableWithPagination from "components/TableWithPagination";
import Modal from "react-rainbow-components/components/Modal";
import { TypeVoter } from "types/electionTypes";

type PropsModalPreviewVoter = {
  isOpen: boolean;
  title: string;
  voters: TypeVoter;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalPreviewVoter({ isOpen, title, voters, onClose }: PropsModalPreviewVoter) {
  return <Modal title={title} isOpen={isOpen} onRequestClose={() => onClose(false)}>
    <TableWithPagination
      data={voters.data}
      fields={voters.fields}
      limit={5}
      keyField={voters.fields[0]}
    />
  </Modal>
}