import { ReactElement, ReactNode } from "react";
import Dashboard from "./dashboard"

export default (props: { page: string; children?: ReactNode }): ReactElement => {
  switch (props.page) {
    case "dashboard":
      return <Dashboard />;
    default:
      return <>
        This is a default Page private view.
      </>;
  }
}