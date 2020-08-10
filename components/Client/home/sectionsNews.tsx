import { ReactElement } from "react";
import styled from "@emotion/styled";
import { usePost } from "../../../hooks/useSWR";

const Container = styled.div`
  a {
    padding: 10px;
  }
`;

export default (): ReactElement => {

  const { data, error, isValidating } = usePost().fetch;
  console.log({ data, error, isValidating });
  return <Container>
    <p>Notices</p>
    {data && data.map((post: any) => {
      return <a key={post.slug} href={`/${post.slug}`}>{post.title}</a>
    })}
  </Container>
}