import React, { useState, useContext } from "react";
import useSWR from "swr";
import { Formik, Form, Field } from "formik";
import { RouteComponentProps } from "react-router-dom";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import Breadcrumbs from "components/Breadcrums";
import AddIcon from "icons/AddIcon";
import useFetch from "hooks/useFetch";
import UserContext from "context/UserContext";
import { TypeElection } from "types/appTypes";
import ContentLoader from "components/ContentLoader";
import Card from "components/Card";
import "./index.css";

const defaultElection: TypeElection = {
  name: "",
  voters: [
    ["name", "second_name", "surname", "second_surname", "ci", "enrollmentcode" ,"tag", "has_blocked"]
  ],
  tags: [
    ["name", "has_blocked", "can_vote"]
  ],
  candidates: [
    ["names", "surnames", "position", "course", "campaign"]
  ],
  campaigns: [
    ["name", "commitments_text", "commitments_file"]
  ],
};

const breadcrumbs = [{ name: "Elecciones", pathname: "/elections" }];

type PropsElections = RouteComponentProps & {};

export default function Elections(props: PropsElections) {
  const { jwt } = useContext(UserContext)!;
  const { fetchPostWithToken, fetchDelWithToken } = useFetch();

  const electionsFetch = useSWR(["/elections", jwt], { initialData: null });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const data = electionsFetch.data;
  const error = electionsFetch.error;

  const elections: TypeElection[] = Array.isArray(data) ? data : [];
  const haveElections: boolean = elections ? elections.length === 0 : false;

  const handleEditElection = (id: any) => {
    return props.history.push(`/elections/${id}/edit`);
  };

  const createElection = async (val: TypeElection) => {
    try {
      await fetchPostWithToken("/elections", jwt, val);
      await electionsFetch.revalidate();
      return setIsOpenModal(false);
    } catch (error) {
      await electionsFetch.revalidate();
      return setIsOpenModal(false);
    }
  };

  const deleteElection = async (id: any) => {
    try {
      await fetchDelWithToken(`/elections/${id}`, jwt);
      return await electionsFetch.mutate(null, true);
    } catch (error) {
      return await electionsFetch.mutate(null, true);
    }
  };

  return (
    <div>
      <div className='breadcrumbs-with-button'>
        <Breadcrumbs {...props} breadcrumbs={breadcrumbs} />
        <button onClick={() => setIsOpenModal(true)} className='btn-right-breadcrumb'>
          <AddIcon />
          Nueva elecci&oacute;n
        </button>
      </div>
      <ContentLoader
        isFetching={!error && !data}
        isError={error}
        isNoData={haveElections}
        contentScreen='elections'
        messageNoData='Para crear una nueva, ve al botón [Nueva Elección]'>
        <div className='flex-start'>
          {elections.map((election, index) => (
            <Card key={index} id={election.id} onClick={handleEditElection} onDelete={deleteElection} title={election.name} content={election.id} />
          ))}
        </div>
      </ContentLoader>
      <Modal title='Nombre de la nueva elección' size='small' isOpen={isOpenModal} onRequestClose={() => setIsOpenModal(false)}>
        <Formik initialValues={defaultElection} onSubmit={createElection}>
          {function ({ isSubmitting }) {
            return (
              <Form className='login-form'>
                <Field placeholder='Ej: Elecciones 2020' name='name' type='text' />
                <div className='rainbow-p-vertical_large rainbow-align-content_center rainbow-flex_wrap'>
                  <Button className='rainbow-m-horizontal_medium' label='Cancelar' disabled={isSubmitting} variant='neutral' onClick={() => setIsOpenModal(false)} />
                  <Button className='rainbow-m-horizontal_medium' label='Crear' disabled={isSubmitting} variant='brand' type='submit' />
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
}
