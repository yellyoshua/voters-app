import { ReactElement } from "react";
import styled from "@emotion/styled";

const AnnounceImage = styled.div`
  max-width: 350px;
  margin: 0 auto;
  img {
    display:block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const AnnounceText = styled.div`
  h4 {
    font-size: 2rem;
  }
  p {
    font-size: 1.3rem;
    padding: 10px;
  }
`;

const BuildPage = styled.div`
  max-width: 700px;
  align-items: center;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const BuildingContainer = styled.div`
  padding: 100px 10px;
  @media (max-width: 600px) {
    ${BuildPage} {
      grid-template-columns: 1fr;
    }
    ${AnnounceText} {
      text-align: center;
    }
  }
`;

export default (): ReactElement => {
  return <BuildingContainer>
    <BuildPage>
      <AnnounceImage>
        <img src="/assets/undraw_software_engineer_lvl5.svg" alt="building-page-content" />
      </AnnounceImage>
      <AnnounceText>
        <h4>En desarrollo</h4>
        <p>Lamentamos los inconvenientes querido usuario, pero la p&aacute;gina que intentas visitar se encuentra al momento en desarrollo.</p>
      </AnnounceText>
    </BuildPage >
  </BuildingContainer>
}