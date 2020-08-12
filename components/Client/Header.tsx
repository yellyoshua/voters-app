import { ReactElement } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  background: #212F7A;
  font-weight: 300;
  padding: 10px 10px;
  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      padding: 5px 5px;
      a {
        color: white;
      }
    }
  }
  @media (max-width: 600px) {
    justify-content: center;
    ul:nth-of-type(1){
      display: none;
    }
  }
`;
const ContainerBanner = styled.div`
  padding: 15px 0px;
  width: 100%;
  text-align: center;
  height: 80px;
  
  img {
    object-fit: cover;
    width: auto;
    height: 100%;
  }
  img:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
  @media (max-width: 600px) {
    ${ContainerBanner} {
      padding: 25px 0px;
      height: 87px;
    }
    ${TopNav} {
      padding: 5px 10px;
    }
  }
  @media (max-width: 350px) {
    ${ContainerBanner} {
      padding: 25px 0px;
      height: 70px;
    }
  }
`;

export default (): ReactElement => {

  return <Container>
    <TopNav>
      <ul>
        <li>
          <a style={{ textDecoration: "none" }} href="tel:02601590">(02-601-590)</a>
        </li>
        <li>
          <a style={{ textDecoration: "none" }} href="mailto:gonzu2015@gmail.com">gonzu2015@gmail.com</a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://idukay.net" target="_blank" rel="noopener noreferrer">Idukay</a>
        </li>
        <li>
          <a href="https://tienda.iamyell.team" target="_blank" rel="noopener noreferrer">Tienda</a>
        </li>
        <li>
          <Link href="/eventos">
            <a>Eventos</a>
          </Link>
        </li>
        <li>
          <Link href="/[slug]" as="/preguntas-frecuentes">
            <a>Ayuda</a>
          </Link>
        </li>
      </ul>
    </TopNav>
    <ContainerBanner>
      <Link href="/">
        <a style={{ textDecoration: "none" }}>
          <img loading="lazy" src="/assets/gonzu-header-banner.jpg" alt="gonzu-header-banner" />
        </a>
      </Link>
    </ContainerBanner>
  </Container>
}
