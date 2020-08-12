import { ReactElement, ReactNode } from "react";
import NotFount from "./not-found";
import Building from "./Building";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Post from "./post";

export default (props: { page: string; children?: ReactNode }): ReactElement => {
  switch (props.page) {
    case "homepage":
      return <Home />;
    case "login":
      return <Login />;
    case "register":
      return <Register />;
    case "post-view":
      return <Post>{props.children}</Post>;
    case "building":
      return <Building />
    default:
      return <NotFount children={props.children} />;
  }
}