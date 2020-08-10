import { ReactElement } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const ImageView = styled.div`
  min-width: 300px;
  max-width: 750px;
  height: auto;
  align-items: center;
  display: flex;

  img {
    object-fit: cover;
    width: 100%;
    height: auto;
    border-radius: 30px;
  }
`;

const FirstStepsView = styled.div`
  padding-left: 20px;
  div:nth-of-type(1) p {
    font-weight: bold;
    font-size: 18px;
  }
  div:nth-of-type(2) p{
    text-align: justify;
    font-weight: 400;
    font-size: 18px;

    & span {
      color: #A80000;
    }
  }
  div:nth-of-type(3) {
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
`;

const ItemLinkStyle = styled.li`
  font-weight: 400;
  font-size: 18px;
  display:flex;
  align-items: center;
  list-style-type: none;
  a {
    color: #A80000;
  }
  span {
    width: 8px;
    height: 2px;
    background: #A80000;
    margin: 0px 5px;
  }
`;

const ButtonInscription = styled.div`
  padding: 20px 0px;
  button {
    background: #A80000;
    border: 5px solid #A80000;
    padding: 8px;
    font-size: 18px;
    font-weight: 800;
    color: white;
    &:hover {
      cursor: pointer;
      background: white;
      color: #A80000;
    }
  }
`;

const Container = styled.div`
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  
  
  @media (max-width: 340px) {
    padding: 10px 0px;

    ${FirstStepsView} {
      padding: 5px;
      ${ButtonInscription} {
        text-align: center;
      }
    }
    
    ${ImageView} {
      min-width: 200px;
    }

    ${ImageView} img {
      border-radius: 0px;
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: none;
    ${ImageView} {
      margin: 0 auto;
    }
  }
`;
export default (): ReactElement => {
  return <Container>
    <ImageView>
      <img src="/assets/vista-frontal-edificio-patio-principal.jpg" alt="vista-frontal-edificio-patio-principal" />
    </ImageView>
    <FirstStepsView>
      <div>
        <p>Padres, Madres de familia, representantes legales, estudiantes.</p>
      </div>
      <div>
        <p>Bienvenidos reciban un cordial saludo de la Unidad Educativa <span>Cardenal Gonz&aacute;lez Zum&aacute;rraga</span>, en donde van a recibir informaci&oacute;n referente a nuestra instituci&oacute;n</p>
      </div>
      <div>
        <ul>
          <ItemLinkStyle>
            <span></span>
            <Link href="/[id]" as="/tour-nuestras-instalaciones">
              <a>Dar un tour por nuestras instituciones</a>
            </Link>
          </ItemLinkStyle>
          <ItemLinkStyle>
            <span></span>
            <Link href="/[id]" as="/nuestro-talento-humano">
              <a>Conoce nuestro talento humano</a>
            </Link>
          </ItemLinkStyle>
          <ItemLinkStyle>
            <span></span>
            <Link href="/[id]" as="/reda-q">
              <a>Reda-Q</a>
            </Link>
          </ItemLinkStyle>
        </ul>
      </div>
      <ButtonInscription>
        <button type="submit">Proceso de inscripci&oacute;n</button>
      </ButtonInscription>
    </FirstStepsView>
  </Container>;
}