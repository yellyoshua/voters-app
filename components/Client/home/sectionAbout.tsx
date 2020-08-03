import { ReactElement } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const TitleSection = styled.div`
  padding-left: 50px;
  p {
    font-size: 25px;
    color: #A80000;
    font-weight: bold;
  }
`;

const SubTitleSection = styled.div`
  padding-left: 50px;
  p {
    font-size: 25px;
    color: black;
    font-weight: 600;
  }
`;

const ArticleSection = styled.div`
  padding: 0px 30px;
  p {
    text-align: justify;
    font-size: 18px;
  }
`;

const QuickLinks = styled.div`
  padding: 0px 30px;
  strong {
    font-size: 18px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
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

const ImageView = styled.div`
  min-width: 300px;
  max-width: 750px;
  height: auto;
  padding: 10px;

  img {
    object-fit: cover;
    width: 100%;
    height: auto;
    border-radius: 30px;
  }
`;

const Column = styled.div`
  &:nth-of-type(2) {
    display: flex;
    align-items: center;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Container = styled.div`
  @media (max-width: 340px) {
    ${ImageView} {
      min-width: 200px;
    }
  }
  @media (max-width: 900px) {
    ${Grid} {
      grid-template-columns: none;
    }
    ${TitleSection},${SubTitleSection} {
      padding: 0;
      text-align: center;
    }
    ${ArticleSection}, ${QuickLinks} {
      padding: 0px 20px;
    }
    ${ImageView} {
      margin: 0 auto;
      padding: 10px 0px;
      img {
        border-radius: 0px;
      }
    }
  }
`;

export default (): ReactElement => {
  return <Container>
    <TitleSection>
      <p>Acerca de</p>
    </TitleSection>
    <Grid>
      <Column>
        <SubTitleSection>
          <p>Acerca la instituci&oacute;n</p>
        </SubTitleSection>
        <ArticleSection>
          <p>La Unidad Educativa Cardenal Gonz&aacute;les Zumarraga o GONZU, es una instituci&oacute;n que forma seres humanos integrales, l&iacute;deres y con principios cat&oacute;licos que promueven una misi&oacute;n social.</p>
        </ArticleSection>
        <ArticleSection>
          <p>Contamos desde Preparatoria hasta Tercero de Bachillerato, la innovaci&oacute;n curricular expresada como la integraci&oacute;n de &aacute;reas de aprendizaje, es un concepto pr&aacute;ctico que se centra en cambios a n&iacute;vel de &aacute;reas espec&iacute;ficas, al interior de la instituci&oacute;n.</p>
        </ArticleSection>
        <QuickLinks>
          <strong>Enlaces r&aacute;pidos</strong>
          <ul>
            <ItemLinkStyle>
              <span></span>
              <Link href="/p/[id]" as="/p/conoce-nuestra-historia">
                <a>Conoce nuestra historia</a>
              </Link>
            </ItemLinkStyle>
          </ul>
        </QuickLinks>
      </Column>
      <Column>
        <ImageView>
          <img src="/assets/entrada-principal-insitucion.jpg" alt="entrada-principal-insitucion" />
        </ImageView>
      </Column>
    </Grid>
  </Container>;
}