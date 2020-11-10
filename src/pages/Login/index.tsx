import React, { memo, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import Button from "react-rainbow-components/components/Button";
import RenderIf from "react-rainbow-components/components/RenderIf";
import Spinner from "react-rainbow-components/components/Spinner";
import Badge from "react-rainbow-components/components/Badge";
import Breadcrums from "components/Breadcrums";
import ListCardLinks from "components/Lists/ListCardLinks";
import useAuth from "hooks/useAuth";
import useFetch from "hooks/useFetch";
import { TypeCardLink } from "types/appTypes";
import "./index.css";

type PropsLogin = RouteComponentProps;

type TypeFormikSubmit<Values> = (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;

const login_title = "APP Elecciones Estudiantiles";
const login_description = "Sólo si eres administrador de este sitio";

export default function Login(_: PropsLogin) {
  const { createSession } = useAuth();
  const { fetchPostWithoutToken } = useFetch();

  useTitle("Pantalla de ingreso");

  const cardLinks: TypeCardLink[] = useMemo(() => [
    {
      title: "Consulta de datos",
      cover: "https://servel.cl/wp-content/uploads/2016/11/btn-home-33.jpg",
      link: "/elecciones",
      external: false,
      description: "Conoce los partidos con sus candidatos y propuestas"
    },
    {
      title: "Ir a votar",
      cover: "https://servel.cl/wp-content/uploads/2016/05/btn-home-06.jpg",
      link: "/elecciones",
      external: false,
      description: "Vota por tu partido"
    },
    {
      title: "Historial de elecciones",
      cover: "https://servel.cl/wp-content/uploads/2018/03/btn-home-32.png",
      link: "/elecciones",
      external: false,
      description: "Elecciones y resultados desde 2020"
    }
  ], []);

  const sendLoginRequest: TypeFormikSubmit<{ identifier: "", password: "" }> = async ({ identifier, password }, { setFieldError }) => {
    try {
      const session = await fetchPostWithoutToken("/auth/local", { identifier, password });
      return createSession(session);
    } catch (error) {
      return setFieldError("identifier", "Usuario o contraseña incorrectos");
    }
  };
  const sendRecoveryRequest: TypeFormikSubmit<{ email: "" }> = async ({ email }, { setStatus }) => {
    try {
      await fetchPostWithoutToken("/auth/forgot-password", { email });
      return setStatus("success");
    } catch (error) {
      return setStatus("error");
    }
  };

  return (
    <div>
      <div className="container-breadcrums-floated">
        <Breadcrums breadcrumbs={[{ name: "Inicio", pathname: "/" }]} />
      </div>
      <section className="login-screen-layout">
        <section className="list-items-col">
          <h1 className="login-screen-section-links-title">Links relacionados</h1>
          <ListCardLinks links={cardLinks} />
        </section>
        <SectionForms
          className="login-screen-section-form"
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
  className: string;
};

const SectionForms = memo(
  function SectionForms({ submitLogin, submitRecovery }: PropsSectionForms) {
    const loginSchema = yup.object().shape({
      identifier: yup.string()
        .default("")
        .required(),
      password: yup.string()
        .default("")
        .required()
    });
    const recoverySchema = yup.object().shape({
      email: yup.string()
        .email("Correo inválido")
        .default("")
        .required('Required'),
    });
    const [isRecoveryPassword, openRecoveryPassword] = useState<boolean>(false);

    if (isRecoveryPassword) {

      return <section className="login-screen-section-form">
        <h1 className="login-screen-section-form-title">Recuperar contrase&ntilde;a</h1>
        <p className="login-screen-section-form-desc"></p>

        <Formik validationSchema={recoverySchema} initialValues={{ email: "" }} onSubmit={submitRecovery}>
          {function ({ isSubmitting, values, status, setFieldValue }) {
            return (
              <Form className='login-screen-section-form-form'>
                <RenderIf isTrue={status === "success"}>
                  <Badge
                    variant="error"
                    title="Correo enviado"
                    label="Tu contrase&ntilde;a fue enviada a tu correo"
                  />
                </RenderIf>
                <RenderIf isTrue={status !== "success"}>
                  <div className="login-screen-section-form-input-space">
                    <RenderIf isTrue={status === "error"}>
                      <Badge
                        variant="error"
                        title="Correo electr&oacute;nico incorrecto"
                        label="Correo electr&oacute;nico incorrecto"
                      />
                    </RenderIf>
                  </div>
                  <div className="login-screen-section-form-input-space">
                    <input name='email' type='text' value={values.email || ""} onChange={({ target: { value } }) => {
                      return setFieldValue("email", value, true);
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
                </RenderIf>
                {
                  !isSubmitting && <p className="false-link" onClick={() => {
                    return openRecoveryPassword(false);
                  }}>Iniciar sessi&oacute;n</p>
                }
              </Form>
            );
          }}
        </Formik>
      </section>
    }
    return <section className="login-screen-section-form">
      <h1 className="login-screen-section-form-title">{login_title}</h1>
      <p className="login-screen-section-form-desc">{login_description}</p>
      <Formik validationSchema={loginSchema} initialValues={{ identifier: "", password: "" }} onSubmit={submitLogin}>
        {function ({ isSubmitting, values, setFieldValue }) {
          return (
            <Form className='login-screen-section-form-form'>
              <div className="login-screen-section-form-input-space">
                <input name='identifier' type='text' value={values.identifier || ""} onChange={({ target: { value } }) => {
                  return setFieldValue("identifier", value);
                }}
                  placeholder='Nombre de usuario o correo electr&oacute;nico'
                  className="login-screen-section-form-input"
                  disabled={isSubmitting}
                />
              </div>
              <div className="login-screen-section-form-input-space">
                <input name='password' type='password' value={values.password || ""} onChange={({ target: { value } }) => {
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
                  return openRecoveryPassword(true);
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
)