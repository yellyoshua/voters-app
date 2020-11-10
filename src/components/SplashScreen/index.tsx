import React from "react";
import { useApp } from "context/AppContext";

export default function SplashScreen() {
  const { school } = useApp();

  return <section className='splash-screen'>
    <h3>{school.schoolAlias}</h3>
  </section>
}