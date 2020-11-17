import React from "react";
import FirstAuth from "./FirstAuth";
import SecondAuth from "./SecondAuth";
import "./index.css";

type PropsSettingsAuth = {}

export default function SettingsAuth(_: PropsSettingsAuth) {
  return <section className="container-settings-auth">
    <h1>Autenticación del votante</h1>
    <div className="list-items-row container-settings-row">
      <FirstAuth />
      <SecondAuth />
    </div>
  </section>
}