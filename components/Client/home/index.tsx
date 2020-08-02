import { ReactElement } from "react";
import styled from "@emotion/styled";
import SectionTop from "./sectionTop";

const Container = styled.div``;

export default (): ReactElement => {
  return <Container>
    <SectionTop />
  </Container>;
}