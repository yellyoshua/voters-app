import { ReactElement } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  background: #212F7A;
  font-weight: 300;
  ul, a{
    display: flex;
    color: white;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul li {
    padding: 5px 5px;
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
`;
const Container = styled.div`
  @media (max-width: 600px) {
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
          <a href="tel:02222333">(222-333)</a>
        </li>
        <li>
          <a href="mailto:contacto@gonzu.edu.ec">contacto@gonzu.edu.ec</a>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/idukay">
            <a>Idukay</a>
          </Link>
        </li>
        <li>
          <Link href="/tienda">
            <a>Tienda</a>
          </Link>
        </li>
        <li>
          <Link href="/eventos">
            <a>Eventos</a>
          </Link>
        </li>
        <li>
          <Link href="/Blog">
            <a>Idukay</a>
          </Link>
        </li>
        <li>
          <Link href="/ayuda">
            <a>Ayuda</a>
          </Link>
        </li>
      </ul>
    </TopNav>
    <ContainerBanner>
      <img src="/assets/gonzu-header-banner.jpg" alt="gonzu-header-banner" />
    </ContainerBanner>
  </Container>
}
