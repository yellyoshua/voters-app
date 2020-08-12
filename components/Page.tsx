import { ReactElement, Fragment, ReactNode } from "react";
import { useRouter } from "next/router";

import Client from "./Client";
import ClientHeader from "./Client/Header";
import ClientNavBar from "./Client/NavBar";
import ClientFooter from "./Client/Footer";

import Private from "./Private";



export default (props: { isPriv: boolean; pageName: string; children?: ReactNode }): ReactElement => {
  const pageName = props.pageName;
  const router = useRouter();

  const changeRouter = (goTo: string) => {
    router.push(goTo);
  }

  if (props.isPriv) {
    return <Fragment>
      <Private page={pageName}>
        {props.children}
      </Private>
    </Fragment>
  };

  return <Fragment>
    <ClientHeader />
    <ClientNavBar changeRoute={changeRouter} />
    <Client page={pageName}>
      {props.children}
    </Client>
    <ClientFooter />
  </Fragment>
}
