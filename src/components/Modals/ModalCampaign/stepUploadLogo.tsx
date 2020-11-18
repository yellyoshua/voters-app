import React from "react";
import UploadFile from "components/UploadFile";
import { REACT_API_URL } from "configurations/api";
import PreviewImage from "components/UploadFile/PreviewImage";
import { FileApi } from "types/appTypes";
import { isProduction } from "configurations/variables";

type PropsStepUploadLogo = {
  campaignName: string;
  onChange: (val: any, id?: number) => void;
  logo_image: any;
};

function resolveUrl(url: string) {
  if (isProduction) {
    return url;
  }
  return REACT_API_URL + url;
}

export default function stepUploadLogo({ logo_image, onChange }: PropsStepUploadLogo) {
  return <div>
    <section className='step-title'>
      <h1>Logo del partido.</h1>
    </section>
    <section>
      {logo_image
        ? <PreviewImage
          fileUrl={resolveUrl(logo_image[0].url)}
          fileName={logo_image[0].name}
          onRemoveHandler={() => onChange(null, Number(logo_image[0].id))}
        /> : <UploadFile
          url='/upload'
          fileType="Imagen"
          accept=".jpg,.png,.jpeg,.gif,.webp,.jp2,.j2k,.jpf,.jpx,.jpm,.mj2"
          onError={err => console.log({ err })}
          progress={() => null}
          success={(logo: FileApi) => {
            return onChange(logo)
          }}
        />
      }
    </section>
  </div>
}