import { ReactElement } from "react";
import styled from "@emotion/styled";
import SectionForm from "./sectionForm";

const ImageSection = styled.div`
  margin: auto;
  max-width: 550px;
  padding: 0px 10px;

  img {
    width: 100%;
    height: auto;
  }
`;
const FormStyled = styled(SectionForm)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Login = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 0px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    ${ImageSection} {
      padding-bottom: 20px;
      max-width: 300px;
    }
  }
`;

export default (): ReactElement => {
  return <Login>
    <ImageSection>
      <img loading="lazy" src="/assets/undraw_online_connection_6778.svg" alt="" />
    </ImageSection>
    <FormStyled />
  </Login>
}