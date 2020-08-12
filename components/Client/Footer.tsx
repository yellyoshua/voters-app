import { ReactElement } from "react";
import styled from "@emotion/styled";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';

const ContainerOption = styled.div`
  max-width: 300px;
  color: white;
  padding: 10px 20px;
  margin: 0 auto;
`;

const Footer = styled.div`
  width: 100%;
  background: #A80000;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-self: center;
  text-align: center;
`;

const FooterCopyrights = styled.div`
  width: 100%;
  background: white;
  padding: 20px 0px;
  h3 {
    text-align: center;
    color: #A80000;
    font-size: 1.1rem;
  }
`;

const ContainerFooter = styled.div`
  width: 100%;
  background: #A80000;
  padding: 20px 0px;
  @media (max-width: 600px) {
    ${Footer} {
      grid-template-columns: 1fr 1fr;
    }
    ${ContainerOption}:nth-of-type(2) {
      display: none;
    }
    ${ContainerOption} {
      padding: 5px 5px;
      h2 {
        font-size: 1rem;
      }
      p {
        font-size: .9rem;
      }
    }
    ${FooterCopyrights} {
      h3 {
        margin: 0 auto;
        max-width: 280px;
        font-size: 1rem;
      }
    }
  }
`;

export default (): ReactElement => {
  return <ContainerFooter>
    <Footer>
      <ContainerOption>
        <div>
          <LocationOnOutlinedIcon />
        </div>
        <h2>Direcci&oacute;n</h2>
        <p>CARLOS POLIT E18-300 JARDIN DEL VALLE PASAJE N. PARROQUIA JUAN PABLO II</p>
      </ContainerOption>
      <ContainerOption>
        <div>
          <WatchLaterOutlinedIcon />
        </div>
        <h2>Horarios</h2>
        <p>Lunes a Viernes 8:00 am - 11:00 am</p>
      </ContainerOption>
      <ContainerOption>
        <div>
          <PhoneAndroidOutlinedIcon />
        </div>
        <h2>Cont&aacute;ctanos</h2>
        <p>
          (02-601-590) <br />
          gonzu2015@gmail.com
        </p>
      </ContainerOption>
    </Footer>
    <FooterCopyrights>
      <h3>Todos los derechos reservados. UE GONZU &copy; 2020. Exelencia acad&eacute;mica</h3>
    </FooterCopyrights>
  </ContainerFooter>
}