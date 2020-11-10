import React, { useEffect, memo, useState, useMemo, Fragment } from "react";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import Input from "react-rainbow-components/components/Input";
import { useTheElection } from "context/TheElectionContext";
import useAsync from "hooks/useAsync";
import { validationMessages, TypeValidations, checkErrors } from "utils/validators";
import { uuidv4 } from "utils/createUID";
import { defaultCargo } from "models/election";
import { TypeCargo, TypeElectionFunc } from "types/electionTypes";


const validators: TypeValidations = {
  alias: { length: 5, required: true }
};

type PropsModalCargo = {
  slug: string | null;
  isOpen: boolean;
  createOrUpdate: (newElection: TypeElectionFunc) => Promise<any>;
  cancel: () => void;
};

export default memo(function ModalCargo({ isOpen = false, slug, createOrUpdate, cancel }: PropsModalCargo) {
  const { theElection } = useTheElection();
  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);

  const isModalOpen = useMemo(() => isOpen, [isOpen]);
  const candidateSlug = useMemo(() => slug, [slug]);
  const taskFunction = useMemo(() => createOrUpdate, [createOrUpdate]);
  const cancelFunction = useMemo(() => cancel, [cancel]);

  return <Fragment>
    {
      isModalOpen ? <ContainerModal
        isOpen
        modalTitle="Agregar cargo"
        cargos={cargos}
        slug={candidateSlug}
        createOrUpdate={taskFunction}
        cancel={cancelFunction}
      /> : null
    }
  </Fragment>
});

function ContainerModal({ isOpen = false, modalTitle, slug, createOrUpdate, cargos, cancel }:
  PropsModalCargo & { cargos: TypeCargo[], modalTitle: string }) {
  const asyncCreateOrUpdate = useAsync(createOrUpdate, false);

  const theCargo = cargos.find(cargo => cargo.slug === slug) || defaultCargo;
  const [currCargo, setCurrCargo] = useState({ ...theCargo });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (asyncCreateOrUpdate.status === "success") {
        return cancel();
      }
    }
    return () => {
      mounted = false;
    };
  }, [asyncCreateOrUpdate.status, cancel]);


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

    return asyncCreateOrUpdate.execute({
      cargos: crgs
    });
  }

  return <Modal
    title={modalTitle}
    size='small'
    footer={
      <div className='rainbow-align-content_center rainbow-flex_wrap'>
        <Button
          label='Cancelar'
          disabled={asyncCreateOrUpdate.status !== "idle"}
          onClick={cancel}
          variant='destructive'
          className='rainbow-m-horizontal_medium'
        />
        <Button
          label='Guardar'
          disabled={cannotSave() || asyncCreateOrUpdate.status !== "idle"}
          onClick={saveCandidate}
          variant='success'
          className='rainbow-m-horizontal_medium'
        />
      </div>
    }
    isOpen={isOpen}
    onRequestClose={asyncCreateOrUpdate.status !== "idle" ? undefined : cancel}
  >
    < div className='elections-tabs-view-section' >
      <div className="list-items-row">
        <Input
          label="Nombre del cargo"
          placeholder="---"
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