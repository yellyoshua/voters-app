import { ReactElement } from "react";
import styled from "@emotion/styled";
import SectionTop from "./sectionTop";
import SectionAcedemic from "./sectionAcedemic";
import SectionAbout from "./sectionAbout";
import SectionNews from "./sectionsNews";

const Home = styled.div``;

export default (): ReactElement => {

  return <Home>
    <SectionTop />
    <SectionAcedemic />
    <SectionAbout />
    <SectionNews />
  </Home>;
}