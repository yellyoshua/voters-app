import { ReactElement } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import PalleteIcon from "@material-ui/icons/PaletteOutlined";
import BookIcon from "@material-ui/icons/BookOutlined";
import SchoolIcon from "@material-ui/icons/SchoolOutlined";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';


const Button = (props: { url: string; color: string }) => {

  const router = useRouter();

  const goTo = () => {
    router.push(props.url);
  };

  const ArrowIcon = styled(ArrowRightAltIcon)`
    padding: 0px 5px;
    color: ${(props: { theme: { color: string } }) => props.theme.color};
  `;

  const ButtonStyled = styled.button`
    display: flex;
    border: none;
    padding: 10px 10px;
    border: 3px solid white;
    color: ${(props: { color: string }) => props.color};
    background: white;
    font-size: 15px;
    font-weight: 800;
    align-items: center;

    &:hover {
      cursor: pointer;
      background: ${(props: { color: string }) => props.color};
      color: white;
      ${ArrowIcon} {
        color: white;
      }
    }
    @media (max-width: 600px) {
      font-size: 16px;
    }
  `;

  return <div style={{ padding: "0px 10px", display: "flex", justifyContent: "center" }}>
    <ButtonStyled onClick={goTo} color={props.color}>
      Conocer m&aacute;s
      <ArrowIcon theme={{ color: props.color }} />
    </ButtonStyled>
  </div>
}

const Column = styled.div`
  div:nth-of-type(2) {
    padding: 0px 30px;
    p {
      font-size: 20px;
      color: white;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  text-align: center;
  padding: 10px 100px;
  grid-template-columns: 1fr 1fr 1fr;
  ${Column}:nth-of-type(1) {
    margin: auto 0;
    background: #212F7A;
    padding: 20px 0px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  ${Column}:nth-of-type(2) {
    background: #006AA8;
    padding: 30px 0px;
  }
  ${Column}:nth-of-type(3) {
    margin: auto 0;
    background: #69217A;
    padding: 20px 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const TitleSection = styled.div`
  padding-left: 100px;
  p {
    font-size: 25px;
    color: #A80000;
    font-weight: bold;
  }
`;

const Container = styled.div`
  @media (max-width: 900px) {
    ${Grid} {
      padding: 10px 10px;
    }
    ${TitleSection} {
      padding-left: 10px;
    }
  }
  @media (max-width: 600px) {
    ${TitleSection} {
      padding: 0px;
      text-align: center;
    }
    ${Grid} {
      grid-template-columns: none;
      padding: 10px 20px;
    }
    ${Column}:nth-of-type(1) {
      margin: none;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0px !important;
    }
    ${Column} div:nth-of-type(2) {
      padding: 0px 10px;
      p {
        font-size: 20px;
        color: white;
      }
    }
    ${Column}:nth-of-type(3) {
      margin: none;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-top-right-radius: 0px !important;
    }
  }
`;

export default (): ReactElement => {
  return <Container>
    <TitleSection>
      <p>Nuestras ofertas acad&eacute;micas</p>
    </TitleSection>
    <Grid>
      <Column>
        <div>
          <PalleteIcon style={{ fontSize: 40, color: "white" }} />
        </div>
        <div>
          <p>
            Preparatoria y educaci&oacute;n b&aacute;sica elemental.
          </p>
        </div>
        <Button url="/preparatoria-basica-elemental" color="#212F7A" />
      </Column>
      <Column>
        <div>
          <BookIcon style={{ fontSize: 40, color: "white" }} />
        </div>
        <div>
          <p>
            Educaci&oacute;n B&aacute;sica media y Educaci&oacute;n B&aacute;sica Superior.
          </p>
        </div>
        <Button url="/basica-media-y-educacion-basica-superior" color="#006AA8" />
      </Column>
      <Column>
        <div>
          <SchoolIcon style={{ fontSize: 40, color: "white" }} />
        </div>
        <div>
          <p>
            Bachillerato General Unificado.
          </p>
        </div>
        <Button url="/bachillerato-general-unificado" color="#69217A" />
      </Column>
    </Grid>
  </Container>;
}