import React from 'react';
import fetch from 'isomorphic-fetch';
import { User } from '../collection/User';
import { ButtonNext } from '../customize/Button';
import { Layout, Header, Footer } from '../customize/Layout';
import { Meta } from '../components/Meta'
import { GetStaticProps, InferGetStaticPropsType } from 'next';


export const getStaticProps: GetStaticProps = async () => {
  let res;
  let user: User;
  try {
    res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    try {
      user = await res.json();
    } catch (err) {
      throw err;
    }
  } catch (error) {
    user = {};
  }

  return {
    props: { user: user }
  };
};

// export const getStaticPaths: GetStaticPaths = async (data: any) => {
//   console.log({ data })
//   // return {};
//   // ...
// }


export default ({ user }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Layout>
    <Header>
      <Meta>
        <link rel='manifest' href='/manifest.json' />
        <link rel="icon" href="/favicon.ico" />
        <title>GONZU</title>
      </Meta>
    </Header>
    <div className="container">
      <p>Username: {user.username}</p>
    </div>
    <Footer>
    </Footer>
  </Layout>
}
