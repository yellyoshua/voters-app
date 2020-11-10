import React from "react";
import PreviewFile, { PreviewNoFile } from "components/UploadFile/PreviewFile";
import { REACT_API_URL } from "configurations/api";
import { isProduction } from "configurations/variables";
import { TypeCampaignObj } from "types/electionTypes";

type PropsStepFinalPreview = { campaign: TypeCampaignObj; };

function resolveUrl(url: string) {
  if (isProduction) {
    return url;
  }
  return REACT_API_URL + url;
}

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
              fileUrl={resolveUrl(campaign.commitments_file[0].url)}
              withNoRemove={true}
            />
            : <PreviewNoFile>
              <p>(Vac&iacute;o)</p>
            </PreviewNoFile>
          }
        </div>
      </div>
    </>
  );
}