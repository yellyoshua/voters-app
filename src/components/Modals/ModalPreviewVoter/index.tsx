import React from "react";
import TableWithPagination from "components/TableWithPagination";
import Modal from "react-rainbow-components/components/Modal";
import { TypeVoterObj } from "types/electionTypes";

type PropsModalPreviewVoter = {
  isOpen: boolean;
  title: string;
  voters: TypeVoterObj[];
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalPreviewVoter({ isOpen, title, voters, onClose }: PropsModalPreviewVoter) {
  return <Modal title={title} isOpen={isOpen} onRequestClose={() => onClose(false)}>
    <TableWithPagination
      data={voters}
      fields={["name", "surname", "ci", "idukay_code"]}
      limit={5}
      keyField="ci"
    />
  </Modal>
}