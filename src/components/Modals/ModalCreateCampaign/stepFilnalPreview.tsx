import React from "react";
import PreviewFile from "components/UploadFile/PreviewFile";
import { REACT_API_URL } from "configurations/api";
import { TypeCampaignObj } from "types/electionTypes";

type PropsStepFinalPreview = { campaign: TypeCampaignObj; };

export default function StepFinalPreview({ campaign }: PropsStepFinalPreview) {
  return (
    <>
      <div className='step-title'>
        <h1>Vista previa</h1>
      </div>
      <div className='container-preview-steps'>
        <div className='container-preview-steps-wrapper'>
          <h1>Nombre para el partido.</h1>
          <p>{campaign.name}</p>
        </div>
        <div className='container-preview-steps-wrapper'>
          <h1>Propuestas del partido.</h1>
          {campaign.commitments_file
            ? <PreviewFile
              fileName={campaign.commitments_file[0].name}
              fileUrl={`${REACT_API_URL + campaign.commitments_file[0].url}`}
              withNoRemove={true}
            />
            : (
              <p>(Vac&iacute;o)</p>
            )}
        </div>
      </div>
    </>
  );
}