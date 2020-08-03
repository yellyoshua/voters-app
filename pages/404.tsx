import { useRouter } from "next/router";
import Head from "next/head";
import styled from "@emotion/styled";
import Typography from "@material-ui/core/Typography";
import UndoIcon from '@material-ui/icons/Undo';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const UndoIconStyled = styled(UndoIcon)` color: white; `;
const HomeIconStyled = styled(HomeRoundedIcon)` color: white; `;

const Button = styled.button`
  border: 5px solid black;
  padding: 0px 20px;
  margin: 0px 5px;
  display: flex;
  align-items: center;
  background: black;
  border-radius: 10px;
  outline: none;

  ${UndoIconStyled}, ${HomeIconStyled} {
    padding-right: 5px;
  }

  p {
    font-size: 18px;
    color: white;
  }
  
  &:hover {
    cursor: pointer;
    background: white;
    ${UndoIconStyled}, ${HomeIconStyled} {
      color: black;
    }
    p {
      color: black;
    }
  }
`;

const FlexView = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: center;
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div``;

export default function Custom404() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  }

  const goHome = () => {
    router.push("/");
  }

  return <Centered>
    <Head>
      <title>404 - No encontrado</title>
    </Head>
    <Container>
      <Typography style={{ textAlign: "center" }} variant="h1" component="h2">
        404
      </Typography>
      <Typography style={{ textAlign: "center" }} variant="h5" component="h2">
        P&aacute;gina no encontrada
      </Typography>
      <FlexView>
        <Button onClick={goBack}>
          <UndoIconStyled />
          <p>Regresar</p>
        </Button>
        <Button onClick={goHome}>
          <HomeIconStyled />
          <p>Ir a Inicio</p>
        </Button>
      </FlexView>
    </Container>
  </Centered>
}