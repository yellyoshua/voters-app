import React, { useContext, useState } from "react";
import { TokenContext } from "context/UserContext";
import PickFile from "components/PickFile";
import ProgressBar from "react-rainbow-components/components/ProgressBar";
import useFetch from "hooks/useFetch";

type PropsUploadFile = {
  url: string;
  fileType: string;
  accept?: string;
  success: (val: any) => void;
  progress: (val: number) => void | null;
  onError: (val: Error) => void;
}

export default function UploadFile(props: PropsUploadFile) {
  const token = useContext(TokenContext);

  const [error, setError] = useState<Error | null>(null);
  const [prgrss, setPrgrss] = useState<number>(100);
  const { fetchUploadFile } = useFetch();

  const handlePickFileOne = async (file: File | null) => {
    if (file) {
      try {
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


  if (error) {
    return <div className="container-file-selector">

    </div>
  }

  return <div className="container-file-selector">
    {
      prgrss === 100 ? (
        <PickFile
          fileType={props.fileType}
          accept={props.accept}
          success={handlePickFileOne}
          onError={setError}
        />
      ) : (
          <ProgressBar value={prgrss} size="x-small" />
        )
    }


  </div>
}