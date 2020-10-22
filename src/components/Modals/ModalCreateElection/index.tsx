import React from "react";
import { Formik, Form, Field } from "formik";
import Modal from "react-rainbow-components/components/Modal";
import Input from "react-rainbow-components/components/Input";
import Button from "react-rainbow-components/components/Button";
import { uuidv4 } from "utils/createUID";
import { defaultElection } from "models/election";
import { TypeElection } from "types/electionTypes";

type PropsModalCreateElection = {
  isOpen: boolean;
  createElection: (val: TypeElection, cb: () => void) => Promise<void>;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalCreateElection({ isOpen = false, onClose, createElection }: PropsModalCreateElection) {
  return <Modal title='Nombre de la nueva elección' size='small' isOpen={isOpen} onRequestClose={() => onClose(false)}>
    <Formik
      initialValues={defaultElection}
      onSubmit={(values) => {
        const uid = uuidv4();
        return createElection({ ...values, uid }, () => onClose(false));
      }}
    >
      {function ({ isSubmitting }) {
        return (
          <Form>
            <Field component={Input} placeholder='Ej: Elecciones 2020' name='name' type='text' />
            <div className='rainbow-p-vertical_large rainbow-align-content_center rainbow-flex_wrap'>
              <Button className='rainbow-m-horizontal_medium' label='Cancelar' disabled={isSubmitting} variant='neutral' onClick={() => onClose(false)} />
              <Button className='rainbow-m-horizontal_medium' label='Crear' disabled={isSubmitting} variant='brand' type='submit' />
            </div>
          </Form>
        );
      }}
    </Formik>
  </Modal>
}