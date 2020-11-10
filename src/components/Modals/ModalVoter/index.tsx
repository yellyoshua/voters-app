import React, { useEffect, memo, useState, useMemo, Fragment } from "react";
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

export default memo(function ModalCargo({ isOpen = false, pushData, closeModal }: PropsModalVoter) {
  const isModalOpen = useMemo(() => isOpen, [isOpen]);

  return <Fragment>
    {
      isModalOpen ? <ContainerModal
        isOpen
        closeModal={closeModal}
        pushData={pushData}
      /> : null
    }
  </Fragment>
});

export function ContainerModal({ closeModal, isOpen, pushData }: PropsModalVoter) {
  const [tags, setTags] = useState<TypeTagObj[] | null>(null);
  const [voters, setVoters] = useState<TypeVoter | null>(null);

  const { execute: asyncUpdateElection, status } = useAsync<TypeElectionFunc>(pushData, false)

  useEffect(() => {
    if (status === "success" && voters && tags) {
      return closeModal();
    }
    return () => { };
  }, [status, closeModal, voters, tags]);

  return <Modal
    onRequestClose={closeModal}
    isOpen={isOpen}
    title="Subir votantes"
    footer={
      <div className="rainbow-flex rainbow-justify_spread">
        <Button
          label="Cancelar"
          onClick={closeModal}
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
}