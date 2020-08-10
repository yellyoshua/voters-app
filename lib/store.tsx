import { useReducer, ReactElement, ReactNode } from "react";
import Head from "next/head";
import Router from "next/router";
import { MetaPages, MetaPosts } from "../utils/metaBuilder";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import storeActions from "./actions";
import { DOMAIN_NAME } from "../configs";
import { StoreContext } from "../hooks/useStore";
import { storeComponentProps } from "./collection/Store";
import { User } from "./collection/User";
import { Post } from "./collection/Post";
import * as USER_ROL from "./constants";

const redirectToHome = (event: StorageEvent) => {
  if (event.key === "logout") {
    Router.push(`/logout?action=${event.newValue}`);
  }
}

const accounType = (user: User) => {
  const adminCanView: string[] = [
    "dashboard.panel",
    "dashboard.countPosts",
    "dashboard.countNotices",
    "dashboard.countNotices",
  ];
  const writterCanView: string[] = [];
  const clientCanView: string[] = [];

  switch (user.role.name) {
    case USER_ROL.USER_ADMINISTRATOR:
      return adminCanView;
    case USER_ROL.USER_WRITTER:
      return writterCanView;
    default:
      return clientCanView;
  }
}

export const PrivateLayout = (props: storeComponentProps): ReactElement => {
  const title = props.title || "UE Gonzu";
  const user: any = props.session;
  const userCanView: string[] = accounType(user);

  const reducer = useReducer(storeActions, {
    session: user,
    userCanView
  });

  useIsomorphicLayoutEffect(() => {
    window.addEventListener("storage", redirectToHome, false);
    return () => {
      window.removeEventListener("storage", redirectToHome, false);
    }
  })


  return <div>
    <Head>
      <MetaPages />
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <link rel='manifest' href='/manifest.json' />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
    <StoreContext.Provider value={reducer}>
      {props.children}
    </StoreContext.Provider>
    <style global jsx>{`
      html,body {
        font-family: "Jost", Arial;
        margin: 0;
        font-size: 1rem;
        box-sizing: border-box;
      }
    `}</style>
  </div>
}

export const LayoutPost = (props: { post: Post; children: ReactNode }) => {
  const domainName: string = DOMAIN_NAME;

  return <div>
    <Head>
      <link rel="stylesheet" href="/assets/estile.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
      <link rel='manifest' href='/manifest.json' />
      <link rel="icon" href="/favicon.ico" />
      <MetaPosts post={props.post} domain={domainName} />
      <title>{props.post.title}</title>
    </Head>
    {props.children}
    <style global jsx>{`
      html,body {
        font-family: "Jost", Arial;
        margin: 0;
        font-size: 1rem;
        box-sizing: border-box;
      }
    `}</style>
  </div>
}


export const Layout = (props: { children: ReactNode; title?: string; }): ReactElement => {
  const title = props.title || "UE Cardenal Gonzalez Zumarraga";

  return <div>
    <Head>
      <MetaPages />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <link rel='manifest' href='/manifest.json' />
      <link rel="icon" href="/favicon.ico" />
      <title> {title} </title>
    </Head>
    {props.children}
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
  </div>
}