import React from "react";
import UploadFile from "components/UploadFile";
import PreviewFile from "components/UploadFile/PreviewFile";
import { REACT_API_URL } from "configurations/api";

type PropsStepCommitments = {
  campaignName: string;
  onChange: (val: any, id?: number) => void;
  commitments_file: any;
};

export default function StepUploadCommitments(props: PropsStepCommitments) {
  return (
    <>
      <section className='step-title'>
        <h1>Propuestas del partido.</h1>
      </section>
      <section>
        {props.commitments_file
          ? <PreviewFile
            fileUrl={`${REACT_API_URL + props.commitments_file[0].url}`}
            fileName={props.commitments_file[0].name}
            onRemoveHandler={() => props.onChange(null, Number(props.commitments_file[0].id))}
          /> : <UploadFile
            url='/upload'
            onError={err => console.log({ err })}
            progress={() => null}
            success={props.onChange}
          />
        }
      </section>
    </>
  );
}