import { NextPageContext } from 'next';
import Router from "next/router";
import Cookies from "js-cookie";

export const canUseBrowser: boolean = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
);

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  const cookieName = "sessionToken";
  Cookies.remove(cookieName);

  // to support logging out from all windows
  window.localStorage.setItem("logout", "0");
  Router.push("/");
};

export const getTokenFromCookie = (ctx: NextPageContext | null) => {
  const isBrowser = canUseBrowser;
  const cookieName = "sessionToken";
  const context = ctx || { req: null };
  const req = context.req || { headers: { cookie: null } };

  if (isBrowser) {
    return Cookies.get(cookieName);
  }

  if (!req.headers.cookie) {
    return undefined;
  }

  let token = req.headers.cookie.split(";").find(jwt => jwt.trim().startsWith(`${cookieName}=`));

  if (token) {
    token = token.split("=")[1];
  }

  return token;
}
