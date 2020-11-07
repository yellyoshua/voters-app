import React, { useCallback, useEffect, memo, useState } from "react";
import PickFile from "components/PickFile";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import TableWithPagination from "components/TableWithPagination";
import useAsync from "hooks/useAsync";
import excelToJSON, { convertSheetsToObjArr } from "utils/excelToJSON";
import { parseObjtArrToDoubleArr } from "utils/parsersData";
import { tagsDataModel } from "models/election";
import { TypeElectionFunc, TypeTagObj, TypeVoter } from "types/electionTypes";


type PropsModalVoter = {
  isOpen: boolean;
  closeModal: () => void;
  pushData: (newElection: TypeElectionFunc) => Promise<any>;
};

export default memo(function ModalVoter(props: PropsModalVoter) {
  const [tags, setTags] = useState<TypeTagObj[] | null>(null);
  const [voters, setVoters] = useState<TypeVoter | null>(null);

  const { execute: asyncUpdateElection, status } = useAsync<TypeElectionFunc>(props.pushData, false)

  const closeResetModal = useCallback(() => {
    // Clean Fields
    return props.closeModal();
  }, [props]);

  useEffect(() => {
    if (status === "success" && voters && tags) {
      return closeResetModal();
    }
    return () => { };
  }, [status, closeResetModal, voters, tags]);

  return <Modal
    onRequestClose={closeResetModal}
    isOpen={props.isOpen}
    title="Subir votantes"
    footer={
      <div className="rainbow-flex rainbow-justify_spread">
        <Button
          label="Cancelar"
          onClick={closeResetModal}
          variant="destructive"
        />
        <Button
          disabled={(!tags && !voters) || status === "pending"}
          onClick={() => {
            if (voters && tags) {
              return asyncUpdateElection({
                voters: {
                  data: parseObjtArrToDoubleArr(voters.data, voters.fields),
                  fields: voters.fields
                },
                tags: parseObjtArrToDoubleArr(tags, tagsDataModel)
              });
            }
            return null;
          }}
          label="Guardar"
          variant="brand"
        />
      </div>
    }
  >
    <PickFile
      fileType="Exel"
      success={(file) => {
        if (!file) {
          setTags(null);
          return setVoters(null);
        }
        return excelToJSON(file, (data) => {
          const { sheets: tags, fieldsSheet, sheetsContent: voters } = convertSheetsToObjArr(data, "tag_slug")

          setVoters({
            data: voters,
            fields: fieldsSheet.concat(["tag_slug"])
          });
          return setTags(tags);
        });
      }}
      onError={() => {
        setTags(null);
        return setVoters(null);
      }}
      accept=".xlsx"
    />
    {tags && voters && (
      <TableWithPagination
        keyField={voters.fields[0]}
        data={voters.data}
        fields={voters.fields}
      />
    )}
  </Modal>
})