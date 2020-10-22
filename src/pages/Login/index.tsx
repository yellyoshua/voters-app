import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import Button from "react-rainbow-components/components/Button";
import Breadcrums from "components/Breadcrums";
import Spinner from "react-rainbow-components/components/Spinner";
import Badge from "react-rainbow-components/components/Badge";
import useAuth from "hooks/useAuth";
import useFetch from "hooks/useFetch";
import "./index.css";

type PropsLogin = RouteComponentProps;

type TypeFormikSubmit<Values> = (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;

const login_title = "Votaciones App";
const login_description = "Si eres administrador de este sitio podrás iniciar sessión.";

export default function Login(_: PropsLogin) {
  useTitle("Pantalla de ingreso");
  const [recoveryPassword, openRecoveryPassword] = useState<boolean>(false);

  const { createSession } = useAuth();
  const { fetchPostWithoutToken } = useFetch();

  const sendLoginRequest: TypeFormikSubmit<{ identifier: "", password: "" }> = async (values, { setFieldError }) => {
    try {
      const session = await fetchPostWithoutToken("/auth/local", values);
      return createSession(session);
    } catch (error) {
      return setFieldError("identifier", "Usuario o contraseña incorrectos");
    }
  };
  const sendRecoveryRequest: TypeFormikSubmit<{ email: "" }> = async (values, { setFieldError, setStatus }) => {
    try {
      await fetchPostWithoutToken("/auth/forgot-password", values);
      return setStatus("success");
    } catch (error) {
      return setFieldError("email", "Correo electrónico incorrecto");
    }
  };

  return (
    <div>
      <div className="container-breadcrums-floated">
        <Breadcrums breadcrumbs={[{ name: "Inicio", pathname: "/" }]} />
      </div>
      <section className="login-screen-layout">
        <section className="login-screen-section-links">
          <h1 className="login-screen-section-links-title">Links relacionados</h1>
          <Link className="login-screen-section-links-link" to="/elecciones">Ir a las elecciones</Link>
          <Link className="login-screen-section-links-link" to="/elecciones">Ir a votar</Link>
        </section>
        <SectionForms
          className="login-screen-section-form"
          isRecoveryOpen={recoveryPassword}
          openRecovery={openRecoveryPassword}
          submitLogin={sendLoginRequest}
          submitRecovery={sendRecoveryRequest}
        />
      </section>
    </div>
  );
}

type PropsSectionForms = {
  submitLogin: TypeFormikSubmit<{ identifier: "", password: "" }>;
  submitRecovery: TypeFormikSubmit<{ email: "" }>;
  isRecoveryOpen: boolean;
  className: string;
  openRecovery: (arg: boolean) => void;
};

function SectionForms({ submitLogin, className, submitRecovery, openRecovery, isRecoveryOpen }: PropsSectionForms) {
  if (isRecoveryOpen) {

    return <section className={className}>
      <h1 className="login-screen-section-form-title">Recuperar contrase&ntilde;a</h1>
      <p className="login-screen-section-form-desc"></p>

      <Formik initialValues={{ email: "" }} onSubmit={submitRecovery}>
        {function ({ isSubmitting, values, status, setFieldValue }) {
          return (
            <Form className='login-screen-section-form-form'>
              {
                status === "success" ? (
                  <Badge
                    variant="error"
                    title="Correo enviado"
                    label="Tu contrase&ntilde;a fue enviada a tu correo"
                  />
                ) : (
                    <>
                      <div className="login-screen-section-form-input-space">
                        <ErrorMessage name='email' component='small' render={(errMessage) => (
                          <Badge variant="error" title={errMessage} label={errMessage} />
                        )} />
                      </div>
                      <div className="login-screen-section-form-input-space">
                        <input name='email' type='text' value={values.email} onChange={({ target: { value } }) => {
                          return setFieldValue("email", value);
                        }}
                          placeholder='Correo electr&oacute;nico'
                          className="login-screen-section-form-input"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="login-screen-section-form-input-space">
                        {isSubmitting ? (
                          <Spinner size="large" type="arc" variant="brand" />
                        ) : (
                            <Button label="Recuperar mi contrase&ntilde;a" type='submit' disabled={isSubmitting} />
                          )
                        }
                      </div>
                    </>
                  )
              }
              {
                !isSubmitting && <p className="false-link" onClick={() => {
                  return openRecovery(false);
                }}>Iniciar sessi&oacute;n</p>
              }
            </Form>
          );
        }}
      </Formik>
    </section>
  }
  return <section className={className}>
    <h1 className="login-screen-section-form-title">{login_title}</h1>
    <p className="login-screen-section-form-desc">{login_description}</p>
    <Formik initialValues={{ identifier: "", password: "" }} onSubmit={submitLogin}>
      {function ({ isSubmitting, values, setFieldValue }) {
        return (
          <Form className='login-screen-section-form-form'>
            <div className="login-screen-section-form-input-space">
              <input name='identifier' type='text' value={values.identifier} onChange={({ target: { value } }) => {
                return setFieldValue("identifier", value);
              }}
                placeholder='Nombre de usuario o correo electr&oacute;nico'
                className="login-screen-section-form-input"
                disabled={isSubmitting}
              />
            </div>
            <div className="login-screen-section-form-input-space">
              <input name='password' type='password' value={values.password} onChange={({ target: { value } }) => {
                return setFieldValue("password", value);
              }}
                placeholder='Contrase&ntilde;a'
                className="login-login-screen-section-form-input"
                disabled={isSubmitting}
              />
            </div>
            <div className="login-screen-section-form-input-space">
              <ErrorMessage name='identifier' component='small' render={(errMessage) => (
                <Badge variant="error" title={errMessage} label={errMessage} />
              )} />
            </div>
            {
              !isSubmitting && <p className="false-link" onClick={() => {
                return openRecovery(true);
              }}>Olvid&eacute; mi contrase&ntilde;a</p>
            }
            <div className="login-screen-section-form-input-space">
              {isSubmitting ? (
                <Spinner size="large" type="arc" variant="brand" />
              ) : (
                  <Button label="Iniciar sessi&oacute;n" type='submit' disabled={isSubmitting} />
                )
              }
            </div>
          </Form>
        );
      }}
    </Formik>
  </section>
}