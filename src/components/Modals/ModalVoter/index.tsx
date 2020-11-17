import React, { memo, useState, useMemo, Fragment, useContext } from "react";
import PickFile from "components/PickFile";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import TableWithPagination from "components/TableWithPagination";
import excelToJSON, { convertSheetsToObjArr } from "utils/excelToJSON";
import { parseObjtArrToDoubleArr } from "utils/parsersData";
import { tagsDataModel } from "models/election";
import { TypeTagObj, TypeVoter } from "types/electionTypes";
import { TheUpdateElectionContext } from "context/TheElectionContext";

type PropsModalVoter = {
  isOpen: boolean;
  closeModal: () => void;
};

export default memo(function ModalCargo({ isOpen = false, closeModal }: PropsModalVoter) {
  const isModalOpen = useMemo(() => isOpen, [isOpen]);

  return <Fragment>
    {
      isModalOpen ? <ContainerModal
        isOpen
        closeModal={closeModal}
      /> : null
    }
  </Fragment>
});

export function ContainerModal({ closeModal, isOpen }: PropsModalVoter) {
  const [asyncUpdate, updateElection] = useContext(TheUpdateElectionContext)!;

  const [tags, setTags] = useState<TypeTagObj[] | null>(null);
  const [voters, setVoters] = useState<TypeVoter | null>(null);

  return <Modal
    onRequestClose={closeModal}
    isOpen={isOpen}
    title="Subir votantes"
    footer={
      <div className="rainbow-flex rainbow-justify_spread">
        <Button
          label="Cancelar"
          disabled={asyncUpdate.loading}
          onClick={closeModal}
          variant="destructive"
        />
        <Button
          disabled={(!tags && !voters) || asyncUpdate.loading}
          onClick={() => {
            if (voters && tags) {
              return updateElection({
                voters: {
                  data: parseObjtArrToDoubleArr(voters.data, voters.fields),
                  fields: voters.fields
                },
                tags: parseObjtArrToDoubleArr(tags, tagsDataModel)
              }, closeModal);
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