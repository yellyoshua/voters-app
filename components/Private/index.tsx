import { ReactElement, ReactNode, useState } from "react";
import { User } from "../../lib/collection/User";
import { useStore } from "../../hooks/useStore";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

export default (props: { children: ReactNode }): ReactElement => {
  const [drawer, setDrawer] = useState(false);

  const [store, dispatch] = useStore();
  const user: User | null = store.session;
  const userCanView = store.userCanView;

  const changeViewDrawer = (state: boolean) => {
    setDrawer(state);
  };

  if (!user || !userCanView) null;

  return <>
    <AppBar isShowDrawer={changeViewDrawer} />
    <Drawer isShowDrawer={changeViewDrawer} drawer={drawer} />
  </>;
}