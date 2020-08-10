import { ReactElement, FormEvent } from "react";
import styled from "@emotion/styled";
import { User } from "../../lib/collection/User";
import { useMe } from "../../hooks/useSWR";

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  background: #212F7A;
  font-weight: 300;
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
      height: 70px;
    }
  }
`;

export default (props: { changeRoute: (href: string) => any; }): ReactElement => {
  const changeRoute = props.changeRoute;
  const { data, error } = useMe().fetch;
  const user: User = data;

  const link = (event: FormEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    changeRoute(path);
  }

  return <Container>
    {!!user && <div>{user.email}</div>}
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
          <a href="https://idukay.net" target="_blank" rel="noopener noreferrer">Idukay</a>
        </li>
        <li>
          <a href="https://tienda.iamyell.team" target="_blank" rel="noopener noreferrer">Tienda</a>
        </li>
        <li>
          <a onClick={(e) => link(e, "/eventos")} href="/eventos" >Eventos</a>
        </li>
        <li>
          <a onClick={(e) => link(e, "/blog")} href="/blog">Blog</a>
        </li>
        <li>
          <a onClick={(e) => link(e, "/ayuda")} href="/ayuda">Ayuda</a>
        </li>
      </ul>
    </TopNav>
    <ContainerBanner>
      <img onClick={() => changeRoute("/")} src="/assets/gonzu-header-banner.jpg" alt="gonzu-header-banner" />
    </ContainerBanner>
  </Container>
}
