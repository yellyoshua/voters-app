import React from "react";
import UploadFile from "components/UploadFile";
import PreviewFile from "components/UploadFile/PreviewFile";
import { REACT_API_URL } from "configurations/api";
import { isProduction } from "configurations/variables";

type PropsStepCommitments = {
  campaignName: string;
  onChange: (val: any, id?: number) => void;
  commitments_file: any;
};

function resolveUrl(url: string) {
  if (isProduction) {
    return url;
  }
  return REACT_API_URL + url;
}

export default function StepUploadCommitments({ campaignName, commitments_file, onChange }: PropsStepCommitments) {
  return (
    <>
      <section className='step-title'>
        <h1>Propuestas del partido.</h1>
      </section>
      <section>
        {commitments_file
          ? <PreviewFile
            fileUrl={`${resolveUrl(commitments_file[0].url)}`}
            fileName={commitments_file[0].name}
            onRemoveHandler={() => onChange(null, Number(commitments_file[0].id))}
          /> : <UploadFile
            url='/upload'
            fileType="PDF"
            accept=".pdf"
            onError={err => console.log({ err })}
            progress={() => null}
            success={onChange}
          />
        }
      </section>
    </>
  );
}