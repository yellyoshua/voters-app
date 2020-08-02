import { ReactElement } from "react";
import NotFount from "./NotFound";
import Home from "./home";

type renderViewBodyProps = {
  page: string;
};
export default (props: renderViewBodyProps): ReactElement => {
  switch (props.page) {
    case "/":
      return <Home />;
    default:
      return <NotFount />;
  }

}