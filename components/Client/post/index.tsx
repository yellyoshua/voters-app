import { ReactElement, ReactNode } from "react";
import styled from "@emotion/styled";
import { usePost } from "../../../hooks/useSWR";
import CardPost from "../home/news/CardPost";
import { Post } from "../../../lib/collection/Post";

const SectionTitle = styled.div`
  padding: 20px 0px;
  h2 {
    text-align: center;
    color: #A80000
  }
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
`;

const Container = styled.div`
  a {
    padding: 10px;
  }
  @media (max-width: 900px){
    ${Posts} {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 600px){
    ${Posts} {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 450px){
    ${Posts} {
      grid-template-columns: 1fr;
    }
  }

`;

export default (props: { children?: ReactNode }): ReactElement => {

  const { data, error, isValidating } = usePost().fetch;
  console.log({ data, error, isValidating });

  return <>
    {props.children}
    <Container>
      <SectionTitle>
        <h2>Más publicaciones</h2>
      </SectionTitle>
      <Posts>
        {data && data.map((post: Post) => {
          return <CardPost post={post} />
        })}
      </Posts>
    </Container>
  </>
}