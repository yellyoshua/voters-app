import React from "react";
import Avatar from "react-rainbow-components/components/Avatar";
import "./index.css";

type PropsPreviewImage = {
  fileUrl: string;
  fileName: string;
  withNoRemove?: boolean;
  width?: number;
  onRemoveHandler?: () => Promise<any> | void;
}

export default function PreviewImage({ fileUrl, fileName, withNoRemove, onRemoveHandler, width = 110 }: PropsPreviewImage) {
  const size = width <= 110 ? 110 : width;

  return <div className='preview-image-container'>
    <div className='preview-image-wrapper'>
      <Avatar
        className="prev-image-avatar"
        style={{ width: size, height: size }}
        src={fileUrl}
        assistiveText={fileName}
        title={fileName}
      />
      {
        !withNoRemove && <button
          className='button-icon-little-danger preview-image-btn-remove'
          onClick={onRemoveHandler}>x</button>
      }
    </div>
  </div>
}