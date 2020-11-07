import React, { ReactNode } from "react";
import "./index.css";

type PropsPreviewFile = {
  fileUrl: string;
  fileName: string;
  withNoRemove?: boolean;
  onRemoveHandler?: () => Promise<any> | void;
}

function cutFileName(name: string) {
  const ext = name.substring(name.lastIndexOf('.'), name.length);
  if (name.length >= 6) {
    return `${name.slice(0, 6)}...(${ext})`;
  }
  return name;
}

export default function PreviewFile({ fileUrl, fileName, withNoRemove, onRemoveHandler }: PropsPreviewFile) {
  return <div className='preview-file-container'>
    <div className='preview-file-wrapper'>
      <a href={fileUrl} target='_blank' rel='noopener noreferrer'>
        {cutFileName(fileName)}
      </a>
      {
        !withNoRemove && <button className='button-icon-little-danger' onClick={onRemoveHandler}>x</button>
      }
    </div>
  </div>
}
export function PreviewNoFile({ children }: { children: ReactNode }) {
  return <div className='preview-file-container'>
    <div className='preview-file-wrapper'>
      {children}
    </div>
  </div>
}