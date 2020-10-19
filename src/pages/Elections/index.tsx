import React, { useState } from "react";
import useTitle from "react-use/lib/useTitle";
import { Formik, Form, Field } from "formik";
import { RouteComponentProps } from "react-router-dom";
import Modal from "react-rainbow-components/components/Modal";
import Button from "react-rainbow-components/components/Button";
import Breadcrumbs from "components/Breadcrums";
import AddIcon from "icons/AddIcon";
import useElection, { PropsUseElection } from "hooks/useElection";
import ContentLoader from "components/ContentLoader";
import CardElection from "components/Card/CardElection";
import { uuidv4 } from "utils/createUID";
import { defaultElection } from "models/election";
import { TypeElection } from "types/appTypes";
import "./index.css";

const breadcrumbs = [{ name: "Elecciones", pathname: "/elections" }];

type PropsElections = RouteComponentProps & {};

const confApi: PropsUseElection = {
  dataType: "object",
  dataUrl: "/elections",
  createUrl: "/elections",
  removeUrl: "/elections",
  updateUrl: "/elections"
};

export default function Elections(props: PropsElections) {
  useTitle("Elecciones");
  const {
    api,
    data,
    isFetching,
    isFetchError,
    apiCreate,
    apiRemove,
    getParsedObj,
  } = useElection(confApi);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const elections: TypeElection[] = Array.isArray(data) ? data : [];
  const haveElections: boolean = elections ? elections.length === 0 : false;

  const handleEditElection = (id: any) => {
    return props.history.push(`/elections/${id}/edit`);
  };

  const createElection = async (val: TypeElection) => {
    try {
      await apiCreate(val);
      await api.revalidate();
      return setIsOpenModal(false);
    } catch (error) {
      await api.revalidate();
      return setIsOpenModal(false);
    }
  };

  const deleteElection = async (id: any) => {
    try {
      return await apiRemove(`/elections/${id}`, () => {
        return api.mutate(null, true);
      });
    } catch (error) {
      return await api.mutate(null, true);
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
        isFetching={isFetching}
        isError={isFetchError}
        isNoData={haveElections}
        contentScreen='elections'
        messageNoData='Para crear una nueva, ve al botón [Nueva Elección]'>
        <div>
          {elections.map((election, index) => (
            <CardElection
              key={index}
              election={election}
              onDelete={deleteElection}
              getParsedObj={getParsedObj}
              onClick={handleEditElection}
            />
          ))}
        </div>
      </ContentLoader>
      <Modal title='Nombre de la nueva elección' size='small' isOpen={isOpenModal} onRequestClose={() => setIsOpenModal(false)}>
        <Formik
          initialValues={defaultElection}
          onSubmit={(values) => {
            const uid = uuidv4();
            return createElection({ ...values, uid });
          }}
        >
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
