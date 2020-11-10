import React from "react";
import Button from "react-rainbow-components/components/Button";
import { Formik, Form } from "formik";
import { TypeCampaignObj, TypeCandidateObj } from "types/electionTypes";
import PreviewFile, { PreviewNoFile } from "components/UploadFile/PreviewFile";
import PreviewImage from "components/UploadFile/PreviewImage";
import { isProduction } from "configurations/variables";
import { REACT_API_URL } from "configurations/api";
import "./index.css";

type PropsCardCampaign = {
  campaign: TypeCampaignObj;
  candidates: TypeCandidateObj[]
  onRequestOpen: (campaignSlug: string) => void;
  onRequestDelete: (campaignSlug: string) => Promise<any>;
};

function resolveUrl(url: string) {
  if (isProduction) {
    return url;
  }
  return REACT_API_URL + url;
}

export default function CardCampaign({ campaign: { slug, name, commitments_file, cover_image, logo_image }, candidates, onRequestDelete, onRequestOpen }: PropsCardCampaign) {

  return <Formik
    initialValues={{}}
    onSubmit={() => onRequestDelete(slug)}
  >
    {function ({ isSubmitting, submitForm }) {
      return (
        <Form className="card-campaign">
          <div className="card-campaign-title list-items-row">
            <h1>{name}</h1>
            <div className="list-items-row">
              <Button onClick={() => onRequestOpen(slug)} label="Abrir" disabled={isSubmitting} />
              <Button onClick={submitForm} label="Borrar" variant="destructive" disabled={isSubmitting} />
            </div>
          </div>
          <div className="card-campaigns">
            <div className="card-campaign-item">
              <h3>Propuestas</h3>
              {commitments_file ?
                <PreviewFile
                  fileName={commitments_file[0].name}
                  fileUrl={resolveUrl(commitments_file[0].url)}
                  withNoRemove
                /> : <PreviewNoFile>
                  <p>(Vac&iacute;o)</p>
                </PreviewNoFile>
              }
            </div>
            <div className="card-campaign-item">
              <h3>Logotipo</h3>
              {logo_image ?
                <PreviewImage
                  fileName={logo_image[0].name}
                  fileUrl={resolveUrl(logo_image[0].url)}
                  withNoRemove
                /> : <PreviewNoFile>
                  <p>(Vac&iacute;o)</p>
                </PreviewNoFile>
              }
            </div>
            <div className="card-campaign-item">
              <h3>Integrantes</h3>
              <h2 className="preview-file-container">{candidates.length}</h2>
            </div>
          </div>
        </Form>
      )
    }
    }
  </Formik>
}