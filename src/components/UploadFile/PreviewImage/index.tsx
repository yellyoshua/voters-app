import React from "react";
import "./index.css";

type PropsPreviewImage = {
  fileUrl: string;
  fileName: string;
  withNoRemove?: boolean;
  width?: number;
  onRemoveHandler?: () => Promise<any> | void;
}

export default function PreviewImage({ fileUrl, fileName, withNoRemove, onRemoveHandler, width = 150 }: PropsPreviewImage) {
  return <div className='preview-image-container'>
    <div className='preview-image-wrapper'>
      <img width={width} src={fileUrl} alt={fileName} />
      {
        !withNoRemove && <button className='button-icon-little-danger' onClick={onRemoveHandler}>x</button>
      }
    </div>
  </div>
}