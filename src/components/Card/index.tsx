import React, { memo } from "react";
import Button from "react-rainbow-components/components/Button";
import { Formik, Form } from "formik";
import "./index.css";

type PropsCard = {
  title: string;
  content: any;
  id: any;
  onClick: (id: any) => void;
  onDelete: (id: any) => void;
};

export default memo(function Card(props: PropsCard) {
  return (
    <div className='card-wrap'>
      <div className='card-container'>
        <h1 className='card-title'>{props.title}</h1>
        <div className='card-body'>
          <p className='card-body-content'>{props.content}</p>
        </div>
        <Formik initialValues={{ id: props.id }} onSubmit={values => props.onDelete(values.id)}>
          {function ({ isSubmitting }) {
            return (
              <Form className='rainbow-align-content_center rainbow-flex_wrap'>
                <Button disabled={isSubmitting} label='Editar' variant='brand' onClick={() => props.onClick(props.id)} />
                <Button disabled={isSubmitting} label='Eliminar' variant='destructive' type='submit' />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
});
