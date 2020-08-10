import { ReactElement } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const IdukayChip = styled.button`
  width: 100px;
  border: 1px solid #666666;
  border-radius: 20px;
  padding: 5px;
  height: 35px;
  background: white;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background: #dc0b1e2e;
  }
  &:active {
    background: #3f51b526;
  }
`;
const IdukayIcon = styled.img`
  width: 100%;
  height: auto;
`;

export default (): ReactElement => {
  const router = useRouter()
  const idukayIconUrl = "/assets/idukay_with_name.svg";
  const goTo = () => router.push("/login/idukay");

  return <IdukayChip type="button" onClick={goTo}>
    <IdukayIcon src={idukayIconUrl} alt="idukayIconUrl" />
  </IdukayChip>
}