import React from "react";
import { Formik, Form } from "formik";
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
  return <Modal title='Nombre para la nueva elección' size='small' isOpen={isOpen} onRequestClose={() => onClose(false)}>
    <Formik
      initialValues={defaultElection}
      onSubmit={(election) => {
        const uid = uuidv4();
        return createElection({ ...election, uid }, () => onClose(false));
      }}
    >
      {function ({ isSubmitting, values, setFieldValue }) {
        return (
          <Form>
            <Input
              type='text'
              value={values.name}
              placeholder='Ej: Elecciones 2020'
              style={{ margin: "0 auto", maxWidth: 250 }}
              onChange={({ target: { value } }) => {
                return setFieldValue("name", value);
              }}
            />
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