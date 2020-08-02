import { ReactElement } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default (): ReactElement => {
  return <Container>
    Not Found
  </Container>;
}