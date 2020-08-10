import { useState, ReactElement, KeyboardEvent, MouseEvent } from "react";
import styled from "@emotion/styled";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';

const Container = styled.div``;

export default (props: { drawer: boolean; isShowDrawer: (state: boolean) => any },): ReactElement => {
  const [drawer, setState] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    return props.isShowDrawer(open);

    const beEvent = !!event;
    console.log({ beEvent })
    if (!beEvent) return setState(open);
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  return <>
    <Button onClick={toggleDrawer(true)}>Abrir</Button>
    <SwipeableDrawer
      anchor="left"
      open={props.drawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <p>Drawer</p>
    </SwipeableDrawer>
  </>
}