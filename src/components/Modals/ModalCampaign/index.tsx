import React, { useContext, memo, useState, useMemo, Fragment } from "react";
import { TokenContext } from "context/UserContext";
import { TheElectionContext, TheUpdateElectionContext } from "context/TheElectionContext";
import useParserData from "hooks/useParserData";
import useFetch from "hooks/useFetch";
import { campaignsDataModel, defaultCampaign } from "models/election";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import StepCampaignName from "components/Modals/ModalCampaign/stepNameCampaign";
import StepUploadLogo from "components/Modals/ModalCampaign/stepUploadLogo";
import StepUploadCommitments from "components/Modals/ModalCampaign/stepUploadCommitments";
import { validationMessages, TypeValidations, checkErrors } from "utils/validators";
import { uuidv4 } from "utils/createUID";
import { TypeCampaignObj } from "types/electionTypes";
import "./index.css";

// [] Step Upload cover image
// [x] Step Upload logo image

const validators: TypeValidations = {
  name: { length: 4, required: true }
};

type PropsModalCampaign = {
  slug: string | null;
  isOpen: boolean;
  cancel: () => void;
};
const { fetchDelWithToken } = useFetch();
const { convertDoubleArrToObjArr, convertObjArrToDoubleArr } = useParserData();

export default memo(function ModalCampaign({ isOpen = false, slug, cancel }: PropsModalCampaign) {
  const token = useContext(TokenContext);

  const isModalOpen = useMemo(() => isOpen, [isOpen]);
  const campaignSlug = useMemo(() => slug, [slug]);
  const cancelFunction = useMemo(() => cancel, [cancel]);

  return <Fragment>
    {
      isModalOpen ? <ContainerModal
        isOpen
        token={token}
        slug={campaignSlug}
        cancel={cancelFunction}
      /> : null
    }
  </Fragment>
});

function ContainerModal({ isOpen = false, slug, token, cancel }:
  PropsModalCampaign & { token: string | null }) {
  const theElection = useContext(TheElectionContext)!;
  const [asyncUpdate, updateElection] = useContext(TheUpdateElectionContext)!;
  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  const theCampaign = campaigns.find(campaign => campaign.slug === slug) || defaultCampaign;
  const [currCampaign, setCurrCampaign] = useState(theCampaign);

  async function removeFile(fileId: string | number) {
    try {
      await fetchDelWithToken(`/upload/files/${fileId}`, token);
    } catch (error) {
      console.log({ error });
    }
  }

  const createCampaign = () => {
    let cmps = [...campaigns];
    const cmpIndex = cmps.findIndex(cmp => cmp.slug === currCampaign.slug);

    if (cmpIndex !== -1) {
      cmps[cmpIndex] = currCampaign;
    } else {
      cmps.push({ ...currCampaign, slug: uuidv4() });
    }

    return updateElection({
      campaigns: convertObjArrToDoubleArr(cmps, campaignsDataModel)
    }, cancel);
  };

  function cannotSave() {
    const errors = validationMessages(validators, currCampaign);
    const hasError = checkErrors(errors);
    return hasError;
  }

  return <Modal
    title={theElection.name}
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
          onClick={createCampaign}
          variant='success'
          className='rainbow-m-horizontal_medium'
        />
      </div>
    }
    isOpen={isOpen}
    onRequestClose={asyncUpdate.loading ? undefined : cancel}
  >
    < div className='elections-tabs-view-section' >
      <StepCampaignName
        onChangeName={(name) => {
          return setCurrCampaign({ ...currCampaign, name });
        }}
        value={currCampaign.name}
      />
      <StepUploadLogo
        campaignName={currCampaign.name}
        logo_image={currCampaign.logo_image}
        onChange={(logo, logoId) => {
          if (logoId !== undefined) {
            setCurrCampaign({ ...currCampaign, logo_image: null });
            return removeFile(logoId);
          }
          return setCurrCampaign({ ...currCampaign, logo_image: logo });
        }}
      />
      <StepUploadCommitments
        campaignName={currCampaign.name}
        commitments_file={currCampaign.commitments_file}
        onChange={(pdf, pdfId) => {
          if (pdfId !== undefined) {
            setCurrCampaign({ ...currCampaign, commitments_file: null });
            return removeFile(pdfId);
          }
          return setCurrCampaign({ ...currCampaign, commitments_file: pdf });
        }}
      />
    </div >
  </Modal >
}