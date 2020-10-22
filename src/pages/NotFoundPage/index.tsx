import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import Breadcrums from "components/Breadcrums";
import "./index.css";

type PropsNotFoundPage = RouteComponentProps;

function NotFoundPage({ history }: PropsNotFoundPage) {
  useTitle("Ruta no encontrada 404");

  return (
    <div className="splash-screen">
      <div className="container-breadcrums-floated">
        <Breadcrums breadcrumbs={[{ name: "Ruta no encontrada", pathname: "/" }]} />
      </div>
      <div className="notfound-screen-layout">
        <h3 className="notfound-screen-errcode">404</h3>
        <p className="notfound-screen-desc">La ruta que estas visitando en estos momentos no existe.</p>
        <section className="notfound-screen-action-buttons">
          <div className="notfound-screen-action-buttons-wrapper">
            <button className="notfound-screen-action-goback" onClick={history.goBack}>Regresar</button>
          </div>
          <div className="notfound-screen-action-buttons-wrapper">
            <button className="notfound-screen-action-gohome" onClick={() => history.push("/")}>Inicio</button>
          </div>
        </section>
      </div>
    </div>
  )
}
export default withRouter(NotFoundPage)