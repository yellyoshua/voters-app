import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Header from "./Header";
import NavBar from "./NavBar";
import RenderViewBody from "./RenderViewBody";

const Container = styled.div`
  width: 100%;
  height: auto;
`;

export default (props: { pathname: string; children?: ReactNode }): ReactElement => {
  const router = useRouter();
  const pathname = props.pathname;

  const goTo = (href: string): void => {
    router.push(href);
  }

  return <Container>
    <Header changeRoute={goTo} />
    <NavBar changeRoute={goTo} />
    <RenderViewBody page={pathname} children={props.children} />
  </Container>
}
