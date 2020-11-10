import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Modal from "react-rainbow-components/components/Modal";

type PropsModalShareLink = RouteComponentProps & {
  isOpen: boolean;
  linkShareTitle: string;
  linkShareLink: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalShareLink({ isOpen, onClose }: PropsModalShareLink) {
  return <Modal title='Nombre de la nueva elección' size='small' isOpen={isOpen} onRequestClose={() => onClose(false)}>

  </Modal>;
}
export default withRouter(ModalShareLink);