import React from "react";
import UploadFile from "components/UploadFile";
import { REACT_API_URL } from "configurations/api";
import PreviewImage from "components/UploadFile/PreviewImage";

type PropsStepUploadLogo = {
  campaignName: string;
  onChange: (val: any, id?: number) => void;
  logo_image: any;
};

export default function stepUploadLogo({ logo_image, onChange }: PropsStepUploadLogo) {
  return (
    <>
      <section className='step-title'>
        <h1>Logo del partido.</h1>
      </section>
      <section>
        {logo_image
          ? <PreviewImage
            fileUrl={`${REACT_API_URL + logo_image[0].url}`}
            fileName={logo_image[0].name}
            onRemoveHandler={() => onChange(null, Number(logo_image[0].id))}
          /> : <UploadFile
            url='/upload'
            fileType="Imagen"
            accept="image/*"
            onError={err => console.log({ err })}
            progress={() => null}
            success={onChange}
          />
        }
      </section>
    </>
  );
}