import { ReactElement } from "react";
import styled from "@emotion/styled";
import SectionTop from "./sectionTop";
import SectionAcedemic from "./sectionAcedemic";
import SectionAbout from "./sectionAbout";

const Container = styled.div``;

export default (): ReactElement => {

  return <Container>
    <SectionTop />
    <SectionAcedemic />
    <SectionAbout />
  </Container>;
}