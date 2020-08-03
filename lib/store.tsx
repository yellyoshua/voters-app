import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import { useReducer, createContext, ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { layoutAction, sessionAction } from "./actions";
import { layoutStoreProps, sessionStoreProps } from "./collection/Store";


export const SessionContext = createContext({});
export const SessionStore = (props: sessionStoreProps): ReactElement => {
  const reducer = useReducer(sessionAction, props.value);

  return <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <link rel='manifest' href='/manifest.json' />
      <link rel="icon" href="/favicon.ico" />
      <title>UE GONZU</title>
    </Head>
    <SessionContext.Provider value={reducer}>
      {props.children}
    </SessionContext.Provider>
    <style global jsx>{`
      html,body {
        font-family: "Jost", Arial;
        margin: 0;
        box-sizing: border-box;
      }
    `}</style>
    {/** GlobalStyleHere */}
    <footer>Footer</footer>
  </div>
}

export const LayoutContext = createContext({});
export const LayoutStore = (props: layoutStoreProps): ReactElement => {
  const reducer = useReducer(layoutAction, props.value);
  const router = useRouter();
  const variant = props.variant;
  const { title = "UE Cardenal Gonzalez Zumarraga" } = props.value.page[variant] || { title: "" };


  useIsomorphicLayoutEffect(() => {
    if (props.session && router.pathname === "/") {
      router.replace("/dashboard");
    }
  }, [props.session]);

  return <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <link rel='manifest' href='/manifest.json' />
      <link rel="icon" href="/favicon.ico" />
      <title> {title} </title>
    </Head>
    <LayoutContext.Provider value={reducer}>
      {props.children}
    </LayoutContext.Provider>
    <style global jsx>{`
      html,body {
        font-family: "Jost", Arial;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 300;
        margin: 0;
      }
      button {
        outline: none;
        border: none;
      }
    `}</style>
    {/** GlobalStyleHere */}
    <footer>Footer</footer>
  </div>
}