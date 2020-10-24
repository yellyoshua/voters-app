import React from "react";
import "./index.css";

type PropsPreviewFile = {
  fileUrl: string;
  fileName: string;
  withNoRemove?: boolean;
  onRemoveHandler?: () => Promise<any> | void;
}

export default function PreviewFile({ fileUrl, fileName, withNoRemove, onRemoveHandler }: PropsPreviewFile) {
  return <div className='preview-file-container'>
    <div className='preview-file-wrapper'>
      <a href={fileUrl} target='_blank' rel='noopener noreferrer'>
        {fileName}
      </a>
      {
        !withNoRemove && <button className='button-icon-little-danger' onClick={onRemoveHandler}>x</button>
      }
    </div>
  </div>
}