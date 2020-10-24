import React, { useContext, useState } from "react";
import { TokenContext } from "context/UserContext";
import useFetch from "hooks/useFetch";
import ProgressBar from "react-rainbow-components/components/ProgressBar";
import FileSelector from "react-rainbow-components/components/FileSelector";

type PropsUploadFile = {
  url: string;
  success: (val: any) => void;
  progress: (val: number) => void | null;
  onError: (val: Error) => void;
}

export default function UploadFile(props: PropsUploadFile) {
  const token = useContext(TokenContext);

  const [prgrss, setPrgrss] = useState<number>(100);
  const [isDisablePicker, setIsDisablePicker] = useState<boolean>(false);
  const { fetchUploadFile } = useFetch();

  const handlePickFile = async (files: FileList) => {
    if (files) {
      setIsDisablePicker(true);
      try {
        const file = files[0];
        const data = new FormData();
        data.append("files", file);
        const response = await fetchUploadFile(props.url, token, data, (progress) => {
          props.progress(progress);
          return setPrgrss(progress);
        });
        return props.success(response);
      } catch (error) {
        return props.onError(error);
      }
    }
  }

  return <div className="container-file-selector">

    {
      prgrss === 100 ? (
        <FileSelector
          disabled={isDisablePicker}
          onChange={handlePickFile}
          label="Selector de archivos"
          placeholder="Subir archivo"
          bottomHelpText="PDF"
          accept=".pdf"
        />
      ) : (
          <ProgressBar value={prgrss} size="x-small" />
        )
    }


  </div>
}