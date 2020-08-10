import { ReactElement, ReactNode } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default (props: { children?: ReactNode }): ReactElement => {
  return <Container>
    {props.children}
  </Container>;
}