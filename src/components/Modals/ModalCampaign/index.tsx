import React, { useContext, useEffect, memo, useState, useMemo, Fragment } from "react";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import { TokenContext } from "context/UserContext";
import { useTheElection } from "context/TheElectionContext";
import useAsync from "hooks/useAsync";
import useParserData from "hooks/useParserData";
import useFetch from "hooks/useFetch";
import { uuidv4 } from "utils/createUID";
import { validationMessages, TypeValidations, checkErrors } from "utils/validators";
import { campaignsDataModel, defaultCampaign } from "models/election";
import { TypeCampaignObj, TypeElectionFunc } from "types/electionTypes";
import StepCampaignName from "components/Modals/ModalCampaign/stepNameCampaign";
import StepUploadLogo from "components/Modals/ModalCampaign/stepUploadLogo";
import StepUploadCommitments from "components/Modals/ModalCampaign/stepUploadCommitments";
import "./index.css";

// [] Step Upload cover image
// [] Step Upload logo image

const validators: TypeValidations = {
  name: { length: 4, required: true }
};

type PropsModalCampaign = {
  slug: string | null;
  isOpen: boolean;
  createOrUpdate: (newElection: TypeElectionFunc) => Promise<any>;
  cancel: () => void;
};
const { fetchDelWithToken } = useFetch();
const { convertDoubleArrToObjArr, convertObjArrToDoubleArr } = useParserData();

export default memo(function ModalCampaign({ isOpen = false, slug, createOrUpdate, cancel }: PropsModalCampaign) {

  const token = useContext(TokenContext);
  const { theElection } = useTheElection();
  const campaigns = convertDoubleArrToObjArr<TypeCampaignObj>(theElection.campaigns);

  const isModalOpen = useMemo(() => isOpen, [isOpen]);
  const campaignSlug = useMemo(() => slug, [slug]);
  const taskFunction = useMemo(() => createOrUpdate, [createOrUpdate]);
  const cancelFunction = useMemo(() => cancel, [cancel]);

  return <Fragment>
    {
      isModalOpen ? <ContainerModal
        isOpen
        modalTitle={theElection.name}
        campaigns={campaigns}
        token={token}
        slug={campaignSlug}
        createOrUpdate={taskFunction}
        cancel={cancelFunction}
      /> : null
    }
  </Fragment>
});

function ContainerModal({ isOpen = false, slug, createOrUpdate, token, cancel, campaigns, modalTitle }:
  PropsModalCampaign & { token: string | null, campaigns: TypeCampaignObj[], modalTitle: string }) {
  const asyncCreateOrUpdate = useAsync(createOrUpdate, false);

  const theCampaign = campaigns.find(campaign => campaign.slug === slug) || defaultCampaign;
  const [currCampaign, setCurrCampaign] = useState(theCampaign);

  async function removeFile(fileId: string | number) {
    try {
      await fetchDelWithToken(`/upload/files/${fileId}`, token);
    } catch (error) {
      console.log({ error });
    }
  }

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

  const createCampaign = () => {
    let cmps = [...campaigns];
    const cmpIndex = cmps.findIndex(cmp => cmp.slug === currCampaign.slug);

    if (cmpIndex !== -1) {
      cmps[cmpIndex] = currCampaign;
    } else {
      cmps.push({ ...currCampaign, slug: uuidv4() });
    }

    return asyncCreateOrUpdate.execute({
      campaigns: convertObjArrToDoubleArr(cmps, campaignsDataModel)
    });
  };

  function cannotSave() {
    const errors = validationMessages(validators, currCampaign);
    const hasError = checkErrors(errors);
    return hasError;
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
          onClick={createCampaign}
          variant='success'
          className='rainbow-m-horizontal_medium'
        />
      </div>
    }
    isOpen={isOpen}
    onRequestClose={asyncCreateOrUpdate.status !== "idle" ? undefined : cancel}
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
            console.log("Called");
            setCurrCampaign({ ...currCampaign, logo_image: null });
            return removeFile(logoId);
          }
          console.log("2Called");
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