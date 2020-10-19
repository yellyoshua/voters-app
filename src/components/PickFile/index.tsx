import React, { useState } from "react";
import FileSelector from "react-rainbow-components/components/FileSelector";

type PropsPickFile = {
  fileType: string;
  accept?: string;
  success: (file: File | null) => void;
  onError: (val: Error) => void;
}

const fileExtensionMatch = (inputFileExt: string, fileAccept: string | undefined, cb: (hasMatch: boolean) => void) => {
  if (fileAccept) {
    return cb(fileAccept.toLowerCase().split(',').indexOf(inputFileExt.toLowerCase()) !== -1);
  }
  return cb(true);
}

export default function PickFile(props: PropsPickFile) {
  const [isDisablePicker, setIsDisablePicker] = useState<boolean>(false);


  const handlePickFile = async (files: FileList) => {
    if (files) {
      setIsDisablePicker(true);
      try {
        const file = files[0];
        if (!file) {
          props.success(null);
          return setIsDisablePicker(false);
        };
        const fileName = file.name;
        const extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
        return fileExtensionMatch(extension, props.accept, (hasMatch) => {
          if (hasMatch) {
            props.success(file);
            return setIsDisablePicker(false);
          }
          props.onError(new Error("Archivo no válido"));
          return setIsDisablePicker(false);
        });
      } catch (error) {
        props.onError(error);
        return setIsDisablePicker(false);
      }
    }
  }

  return <div className="container-file-selector">
    <FileSelector
      variant="inline"
      disabled={isDisablePicker}
      onChange={handlePickFile}
      label="Selector de archivos"
      placeholder="Subir archivo"
      bottomHelpText={props.fileType}
      accept={props.accept}
    />
  </div>
}