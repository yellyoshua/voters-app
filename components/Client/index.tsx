import { ReactElement } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Header from "./Header";
import NavBar from "./NavBar";
import RenderViewBody from "./RenderViewBody";

const Container = styled.div`
  width: 100%;
  height: auto;
`;

export default (): ReactElement => {
  const router = useRouter();
  const pathname = router.pathname;

  const handleClick = (href: string): void => {
    router.push(href);
  }

  return <Container>
    <Header />
    <NavBar changeRoute={handleClick} />
    <RenderViewBody page={pathname} />
  </Container>
}
