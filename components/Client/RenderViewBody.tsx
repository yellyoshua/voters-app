import { ReactElement, ReactNode } from "react";
import NotFount from "./not-found";
import Home from "./home";
import Login from "./login";
import Register from "./register";

export default (props: { page: string; children?: ReactNode }): ReactElement => {
  switch (props.page) {
    case "homepage":
      return <Home />;
    case "login":
      return <Login />;
    case "register":
      return <Register />;
    case "post-view":
      return <>{props.children}</>;
    default:
      return <NotFount children={props.children} />;
  }
}