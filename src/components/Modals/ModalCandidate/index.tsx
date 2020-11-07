import React, { useContext, useEffect, memo, useState, useMemo, Fragment } from "react";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import FormCandidate from "components/Modals/ModalCandidate/FormCandidate";
import { TokenContext } from "context/UserContext";
import { useTheElection } from "context/TheElectionContext";
import useAsync from "hooks/useAsync";
import useParserData from "hooks/useParserData";
import { validationMessages, TypeValidations, checkErrors } from "utils/validators";
import { uuidv4 } from "utils/createUID";
import { candidatesDataModel, defaultCandidate } from "models/election";
import { TypeCampaignObj, TypeCandidateObj, TypeCargo, TypeElectionFunc } from "types/electionTypes";
import "./index.css";

const validators: TypeValidations = {
  names: { length: 3, required: true },
  surnames: { length: 3, required: true },
  course: { length: 3, required: true },
  cargo: { length: 1, required: true },
  campaign_slug: { length: 3, required: true },
};

type PropsModalCandidate = {
  slug: string | null;
  isOpen: boolean;
  createOrUpdate: (newElection: TypeElectionFunc) => Promise<any>;
  cancel: () => void;
};
const { convertDoubleArrToObjArr, convertObjArrToDoubleArr } = useParserData();

export default memo(function ModalCampaign({ isOpen = false, slug, createOrUpdate, cancel }: PropsModalCandidate) {

  const token = useContext(TokenContext);
  const { theElection } = useTheElection();

  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);
  const candidates = convertDoubleArrToObjArr<TypeCandidateObj>(theElection.candidates);
  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  const isModalOpen = useMemo(() => isOpen, [isOpen]);
  const candidateSlug = useMemo(() => slug, [slug]);
  const taskFunction = useMemo(() => createOrUpdate, [createOrUpdate]);
  const cancelFunction = useMemo(() => cancel, [cancel]);

  return <Fragment>
    {
      isModalOpen ? <ContainerModal
        isOpen
        modalTitle="Candidato"
        candidates={candidates}
        campaigns={campaigns}
        cargos={cargos}
        token={token}
        slug={candidateSlug}
        createOrUpdate={taskFunction}
        cancel={cancelFunction}
      /> : null
    }
  </Fragment>
});

function ContainerModal({ isOpen = false, slug, createOrUpdate, token, cargos, cancel, candidates, campaigns, modalTitle }:
  PropsModalCandidate & {
    cargos: TypeCargo[], token: string | null, candidates: TypeCandidateObj[], campaigns: TypeCampaignObj[], modalTitle: string
  }) {
  const asyncCreateOrUpdate = useAsync(createOrUpdate, false);

  const theCandidate = candidates.find(cndt => cndt.slug === slug) || defaultCandidate;
  const [currCandidate, setCurrCandidate] = useState({ ...theCandidate });

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
    const errors = validationMessages(validators, currCandidate);
    const hasError = checkErrors(errors);
    return hasError;
  }

  function saveCandidate() {
    let cndts = [...candidates];
    const cmpIndex = cndts.findIndex(cndt => cndt.slug === currCandidate.slug);

    if (cmpIndex !== -1) {
      cndts[cmpIndex] = currCandidate;
    } else {
      cndts.push({ ...currCandidate, slug: uuidv4() });
    }

    return asyncCreateOrUpdate.execute({
      candidates: convertObjArrToDoubleArr(cndts, candidatesDataModel)
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
      <FormCandidate
        cargos={cargos}
        campaigns={campaigns}
        candidate={currCandidate}
        setCandidate={setCurrCandidate}
      />
    </div >
  </Modal >
}