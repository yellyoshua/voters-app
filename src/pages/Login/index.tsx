import React from "react";
import useTitle from "react-use/lib/useTitle";
import { RouteComponentProps } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAuth from "hooks/useAuth";
import useFetch from "hooks/useFetch";
import "./index.css";

type PropsLogin = RouteComponentProps;

export default function Login(_props: PropsLogin) {
  useTitle("Pantalla de ingreso");

  const { createSession } = useAuth();
  const { fetchPostWithoutToken } = useFetch();

  const sendLoginRequest = async (values: {}, { setFieldError }: { setFieldError: (field: string, message: string) => void }) => {
    try {
      const session = await fetchPostWithoutToken("/auth/local", values);
      return createSession(session);
    } catch (error) {
      return setFieldError("password", "Incorrect Credentials");
    }
  };

  return (
    <div className='login-layout'>
      <div>
        <h1>Login Page</h1>
        <Formik initialValues={{ identifier: "", password: "" }} onSubmit={sendLoginRequest}>
          {function ({ isSubmitting }) {
            return (
              <Form className='login-form'>
                <Field placeholder='Correo' name='identifier' type='text' />
                <ErrorMessage name='identifier' component='small' />
                <Field placeholder='Contraseña' name='password' type='password' />
                <ErrorMessage name='password' component='small' />
                <button type='submit' disabled={isSubmitting}>
                  Enviar
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
