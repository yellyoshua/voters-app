import React, { memo, useState, useMemo, Fragment, useContext } from "react";
import { TheElectionContext, TheUpdateElectionContext } from "context/TheElectionContext";
import { TokenContext } from "context/UserContext";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import Input from "react-rainbow-components/components/Input";
import { validationMessages, TypeValidations, checkErrors } from "utils/validators";
import { uuidv4 } from "utils/createUID";
import { defaultCargo } from "models/election";


const validators: TypeValidations = {
  alias: { length: 5, required: true }
};

type PropsModalCargo = {
  slug: string | null;
  isOpen: boolean;
  cancel: () => void;
};

export default memo(function ModalCargo({ isOpen = false, slug, cancel }: PropsModalCargo) {
  const token = useContext(TokenContext);

  const isModalOpen = useMemo(() => isOpen, [isOpen]);
  const candidateSlug = useMemo(() => slug, [slug]);
  const cancelFunction = useMemo(() => cancel, [cancel]);

  return <Fragment>
    {
      isModalOpen ? <ContainerModal
        isOpen
        token={token}
        slug={candidateSlug}
        cancel={cancelFunction}
      /> : null
    }
  </Fragment>
});

function ContainerModal({ isOpen = false, slug, token, cancel }:
  PropsModalCargo & { token: string | null }) {
  const theElection = useContext(TheElectionContext)!;
  const [asyncUpdate, updateElection] = useContext(TheUpdateElectionContext)!;

  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);
  const theCargo = cargos.find(cargo => cargo.slug === slug) || defaultCargo;
  const [currCargo, setCurrCargo] = useState({ ...theCargo });

  function cannotSave() {
    const errors = validationMessages(validators, currCargo);
    const hasError = checkErrors(errors);
    return hasError;
  }

  function saveCandidate() {
    let crgs = [...cargos];
    const cargoindex = crgs.findIndex(crgs => crgs.slug === currCargo.slug);

    if (cargoindex !== -1) {
      crgs[cargoindex] = currCargo;
    } else {
      crgs.push({ ...currCargo, slug: uuidv4() });
    }

    return updateElection({
      cargos: crgs
    }, cancel);
  }

  return <Modal
    title="Agregar cargo"
    size='small'
    footer={
      <div className='rainbow-align-content_center rainbow-flex_wrap'>
        <Button
          label='Cancelar'
          disabled={asyncUpdate.loading}
          onClick={cancel}
          variant='destructive'
          className='rainbow-m-horizontal_medium'
        />
        <Button
          label='Guardar'
          disabled={cannotSave() || asyncUpdate.loading}
          onClick={saveCandidate}
          variant='success'
          className='rainbow-m-horizontal_medium'
        />
      </div>
    }
    isOpen={isOpen}
    onRequestClose={asyncUpdate.loading ? undefined : cancel}
  >
    < div className='elections-tabs-view-section' >
      <div className="list-items-row">
        <Input
          label="Nombre del cargo"
          placeholder="eg: Presidente"
          type="text"
          style={{ maxWidth: 230 }}
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          name="cargo"
          value={currCargo.alias}
          onChange={({ target: { value } }) => {
            return setCurrCargo({ ...currCargo, alias: value });
          }}
        />
      </div>
    </div >
  </Modal >
}