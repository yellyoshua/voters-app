import React, { useCallback, useEffect, useReducer, memo } from "react";
import PickFile from "components/PickFile";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import TableWithPagination from "components/TableWithPagination";
import useAsync from "hooks/useAsync";
import excelToJSON from "utils/excelToJSON";
import { uuidv4 } from "utils/createUID";
import { parseArrToObjArr, relationObjFieldValue, parseObjtArrToArr, addArrChildFromArr, mapParseValuesArr } from "utils/parsersData";
import { tagsDataModel, votersDataModel } from "models/election";

const createSlug = uuidv4;

type ReducerActionsTypes =
  { type: "clean_fields" } |
  { type: "create_fields", payload: { tags: any[], voters: any[] } };

type ReducerStateType = { tags: { [key: string]: any; }[] | null, voters: { [key: string]: any; }[] | null };

const reducer = (state: ReducerStateType, action: ReducerActionsTypes) => {
  switch (action.type) {
    case "create_fields":
      return {
        ...state,
        tags: action.payload.tags,
        voters: parseArrToObjArr(
          mapParseValuesArr(
            parseObjtArrToArr(action.payload.voters, votersDataModel)
          )
        )
      };
    case "clean_fields":
      return { ...state, tags: null, voters: null }
    default:
      return state;
  }
}

const setReducerInitialState = () => {
  return {
    tags: null,
    voters: null,
  }
}

type PropsModalVoter = {
  isOpen: boolean;
  closeModal: () => void;
  pushData: (data: { [key: string]: any; }) => Promise<any>;
};

export default memo(function ModalVoter(props: PropsModalVoter) {
  const [state, dispatch] = useReducer(reducer, setReducerInitialState());

  const { execute: asyncUpdateElection, status } = useAsync(props.pushData, false)

  const closeResetModal = useCallback(() => {
    dispatch({ type: "clean_fields" });
    return props.closeModal();
  }, [props]);

  useEffect(() => {
    if (status === "success" && state.voters && state.tags) {
      return closeResetModal();
    }
    return () => { };
  }, [status, closeResetModal, state.voters, state.tags]);

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
          disabled={(!state.tags && !state.voters) || status === "pending"}
          onClick={() => {
            if (state.voters && state.tags) {
              return asyncUpdateElection({
                voters: parseObjtArrToArr(state.voters, votersDataModel),
                tags: parseObjtArrToArr(state.tags, tagsDataModel)
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
        if (!file) return dispatch({ type: "clean_fields" });

        return excelToJSON(file, (data) => {
          let voters: any[] = [];
          const tagsNames = Object.keys(data);

          const tags = tagsNames.map(tagName => {
            const slug = createSlug();
            return { name: tagName, slug: slug }
          });

          tags.forEach(({ name, slug }) => {
            if (data[name]) {
              voters.push(
                ...parseArrToObjArr(
                  addArrChildFromArr(
                    mapParseValuesArr(data[name]),
                    "tag_slug",
                    slug
                  )
                )
              );
            }
          });

          dispatch({ type: "create_fields", payload: { voters, tags } });
        });
      }}
      onError={() => dispatch({ type: "clean_fields" })}
      accept=".xlsx"
    />
    {state.tags && state.voters && (
      <TableWithPagination
        keyField="ci"
        data={relationObjFieldValue(state.voters, state.tags, "tag_slug", "name")}
        fields={votersDataModel}
      />
    )}
  </Modal>
})