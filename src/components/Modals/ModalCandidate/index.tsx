import React, { useContext, memo, useState, useMemo, Fragment } from "react";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import FormCandidate from "components/Modals/ModalCandidate/FormCandidate";
import { TokenContext } from "context/UserContext";
import { TheElectionContext, TheUpdateElectionContext } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import { validationMessages, TypeValidations, checkErrors } from "utils/validators";
import { uuidv4 } from "utils/createUID";
import { candidatesDataModel, defaultCandidate } from "models/election";
import { TypeCampaignObj, TypeCandidateObj } from "types/electionTypes";
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
  cancel: () => void;
};
const { convertDoubleArrToObjArr, convertObjArrToDoubleArr } = useParserData();

export default memo(function ModalCampaign({ isOpen = false, slug, cancel }: PropsModalCandidate) {
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
  PropsModalCandidate & { token: string | null }) {
  const theElection = useContext(TheElectionContext)!;
  const [asyncUpdate, updateElection] = useContext(TheUpdateElectionContext)!;

  const cargos = useMemo(() => theElection.cargos, [theElection.cargos]);
  const candidates = convertDoubleArrToObjArr<TypeCandidateObj>(theElection.candidates);
  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  const theCandidate = candidates.find(cndt => cndt.slug === slug) || defaultCandidate;
  const [currCandidate, setCurrCandidate] = useState({ ...theCandidate });


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

    return updateElection({
      candidates: convertObjArrToDoubleArr(cndts, candidatesDataModel)
    }, cancel);
  }

  return <Modal
    title="Candidato"
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
      <FormCandidate
        cargos={cargos}
        campaigns={campaigns}
        candidate={currCandidate}
        setCandidate={setCurrCandidate}
      />
    </div >
  </Modal >
}