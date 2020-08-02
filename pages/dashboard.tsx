import { GetStaticProps, InferGetStaticPropsType } from 'next';
import fetch from 'isomorphic-fetch';
import { sessionStoreProps } from '../lib/collection/Store';
import { API_URL } from '../lib/constants';
import useDrawer from '../hooks/useDrawer';
import styled from "@emotion/styled";

export const ButtonNext = styled.button`
  border:none;
  color:black;
  border-radius:10px;
  padding:10px;
`;
export const ButtonConfirm = styled.button``;
export const ButtonDecline = styled.button``;

// export const getStaticProps: GetStaticProps = () => {
//   return {
//     props: {}
//   };
// };

export default (props: InferGetStaticPropsType<{}>) => {

  return <div className="container">
    <p>Dashboard</p>
  </div>
}

