import React, { memo, useState, useMemo, Fragment, useCallback, useContext } from "react";
import PickFile from "components/PickFile";
import TableWithPagination from "components/TableWithPagination";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import excelToJSON, { ResultExecToJSON } from "utils/excelToJSON";
import { flatten } from "underscore";
import { TypeVoter } from "types/electionTypes";
import useFetch from "hooks/useFetch";
import { TokenContext } from "context/UserContext";
import { TheElectionContext, TheElectionMutateContext } from "context/TheElectionContext";

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

const { fetchPutWithToken } = useFetch();
export function ContainerModal({ closeModal, isOpen }: PropsModalVoter) {
  const token = useContext(TokenContext);
  const theElection = useContext(TheElectionContext)!;
  const mutateElection = useContext(TheElectionMutateContext)!;

  const [tags, setTags] = useState<string[] | null>(null);
  const [voters, setVoters] = useState<TypeVoter | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlerSave = useCallback(async () => {
    try {
      const election = { ...theElection, tags: tags!, voters: voters! };
      setIsSaving(true);
      await fetchPutWithToken(`/elections/voters/${election.id}`, token, election);
      mutateElection(election);
      return closeModal();
    } catch (error) {
      return closeModal();
    }
  }, [tags, voters, closeModal, mutateElection, theElection, token]);


  const handlerPickFile = useCallback((file: File | null) => {
    function result({ json, sheetNames, columnNames }: ResultExecToJSON) {
      setVoters({ data: json, fields: columnNames });
      setTags(sheetNames);
      return setIsLoaded(true);
    }

    if (file) return excelToJSON(file, result);
    setTags(null);
    setVoters(null);
    return setIsLoaded(false);
  }, []);

  const handlerCatchPickFile = useCallback((err: Error) => {
    setTags(null);
    setVoters(null);
    return setIsLoaded(false);
  }, [])

  return <Modal
    onRequestClose={closeModal}
    isOpen={isOpen}
    title="Subir votantes"
    footer={<div className="rainbow-flex rainbow-justify_spread">
      <Button
        label="Cancelar"
        disabled={isSaving}
        onClick={closeModal}
        variant="destructive"
      />
      <Button
        disabled={!isLoaded || isSaving}
        onClick={handlerSave}
        label="Guardar"
        variant="brand"
      />
    </div>}
  >
    {
      !isLoaded && <PickFile
        fileType="Exel"
        success={handlerPickFile}
        onError={handlerCatchPickFile}
        accept=".xlsx"
      />
    }
    {isLoaded && (
      <TableWithPagination
        data={flatten(Object.values(voters!.data))}
        fields={voters!.fields}
        keyField={voters!.fields[0]}
      />
    )}
  </Modal>
}