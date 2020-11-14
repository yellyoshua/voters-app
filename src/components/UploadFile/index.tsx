import React, { useContext, useState } from "react";
import { TokenContext } from "context/UserContext";
import PickFile from "components/PickFile";
import ProgressBar from "react-rainbow-components/components/ProgressBar";
import Chip from "react-rainbow-components/components/Chip";
import useFetch from "hooks/useFetch";

type PropsUploadFile<T> = {
  url: string;
  fileType: string;
  accept?: string;
  success: (val: T) => void;
  progress: (val: number) => void | null;
  onError: (val: Error) => void;
}

export default function UploadFile<T>(props: PropsUploadFile<T>) {
  const token = useContext(TokenContext);

  const [isHasDone, setIsHasDone] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [prgrss, setPrgrss] = useState<number>(100);
  const { fetchUploadFile } = useFetch();

  const handlePickFileOne = async (file: File | null) => {
    if (file) {
      try {
        setIsHasDone(true);
        const data = new FormData();
        data.append("files", file);
        const response: T = await fetchUploadFile(props.url, token, data, (progress) => {
          props.progress(progress);
          return setPrgrss(progress);
        });
        return props.success(response);
      } catch (error) {
        setIsHasDone(false);
        return props.onError(error);
      }
    }
    return setIsHasDone(false);
  }


  if (error) {
    return <div className="container-file-selector">
      <Chip label={error.message} onDelete={() => setError(null)} />
    </div>
  }

  if (isHasDone) {
    return <ProgressBar value={prgrss} size="x-small" />;
  }

  return <div className="container-file-selector">
    <PickFile
      fileType={props.fileType}
      accept={props.accept}
      success={handlePickFileOne}
      onError={(error) => {
        setIsHasDone(false);
        return setError(error)
      }}
    />
    {/* {
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
    } */}
  </div>
}