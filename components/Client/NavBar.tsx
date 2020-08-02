import { useEffect, useState, FormEvent, ReactElement } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const UnderLine = styled.div`
  width: 100%;
  height: 4px;
`;

const Container = styled.div`
  padding: 10px 0px;
  font-weight: 600;
  ul, a{
    display: flex;
    justify-content: space-around;
    text-decoration-line: none;
    color: black;
    font-size: 16px;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul li {
    padding: 5px 5px;
  }
  ul li:hover ${UnderLine}{
    background: #A80000 !important;
  }
  @media (max-width: 600px) {
    padding: 0px 0px;
    a {
      font-size: 15px;
    }
    justify-content: center;
    ul li:nth-of-type(1){
      display: none;
    }
    ul li:nth-of-type(3){
      display: none;
    }
  }
`;
type NavBarProps = {
  changeRoute: (href: string) => any;
}

export default (props: NavBarProps): ReactElement => {
  const changeRoute = props.changeRoute;
  const [pathName, setPathName] = useState("/");
  const router = useRouter()

  const links = [
    { name: "Servicios para estudiantes", href: "/servicios-estudiantes" },
    { name: "Nuestra instituci&oacute;n", href: "/nuestra-institucion" },
    { name: "Pastoral", href: "/pastoral" },
    { name: "Noticias", href: "/noticias" },
    { name: "Eventos", href: "/eventos" }
  ];

  useEffect(() => {
    changeRoute(pathName);
  }, [pathName])

  const handleClick = (e: FormEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    setPathName(href);
  }

  return <Container>
    <ul>
      {links.map((link, key) => (
        <li key={key}>
          <a href={link.href} onClick={(e) => handleClick(e, link.href)} dangerouslySetInnerHTML={{ __html: link.name }} />
          <UnderLine style={router.pathname == link.href ? { background: "#A80000;" } : { background: "white" }} />
        </li>
      ))}
    </ul>
  </Container>;
}