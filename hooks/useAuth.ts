import { NextPageContext } from 'next';
import Router from "next/router";
import { getMe } from '../lib/api/me';
import { User } from '../lib/collection/User';
import { getTokenFromCookie } from "./useBrowser";

export const endpointsRequiredAuth = [
  { name: "/dashboard", priv: true, to: "/login" },
  { name: "/profile", priv: true, to: "/login" },
  { name: "/publicacion", priv: true, to: "/login" },
  { name: "/evento", priv: true, to: "/login" },
  { name: "/login", priv: false, to: "/dashboard" },
  { name: "/register", priv: false, to: "/dashboard" },
];

export const AuthWithFetch = async (ctx: NextPageContext) => {
  let error: any = null;
  const token = getTokenFromCookie(ctx);
  let user = null;

  try {
    user = await getMe(token)
  } catch (error) {
    error = error;
  }
  const beUser = !!user && !!!error;
  console.log({ beUser, token: !!token, user, error })

  const needRedirect = endpointsRequiredAuth.find((path) => {
    const bePathname = ctx.pathname.toString().includes(path.name);
    const isPriv = path.priv;

    if (bePathname) {
      // Redirect to /login
      if (isPriv && !beUser) {
        return bePathname;
      }
      // Redirect to /dashboard
      if (!isPriv && beUser) {
        return bePathname;
      }
    }

    return undefined;
  });

  if (!!needRedirect) {
    try {
      return await authRedirect(ctx, needRedirect.to);
    } catch (error) {
      return { request: user, beUser: false };
    }
  }

  return { request: user, beUser }
}

export const authRedirect = async (ctx: NextPageContext | null, redirectTo: string) => {
  const context = ctx || { req: null, res: { writeHead: () => { }, end: () => { } } };
  const res = context.res;
  const isServer = !!context.req;

  if (isServer) {
    res?.writeHead(301, {
      Location: redirectTo
    });
    res?.end();
    return { request: null, beUser: false };
  } else {
    await Router.replace(redirectTo)
    return { request: null, beUser: false };
  }
}