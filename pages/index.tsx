import React from 'react';
import fetch from 'isomorphic-fetch';
import { Post, Posts, PropsPosts } from '../collection/Post';
import { ButtonNext } from '../customize/Button';
import { Layout, Header, Footer } from '../customize/Layout';
import { Meta } from '../components/Meta'
import { GetStaticProps, InferGetStaticPropsType } from 'next';


export const getStaticProps: GetStaticProps = async (context: any) => {
  let res;
  let posts: Posts;
  try {
    res = await fetch('https://jsonplaceholder.typicode.com/posts');
    try {
      posts = await res.json();
    } catch (err) {
      throw err;
    }
  } catch (error) {
    posts = [];
  }
  console.log({ context })

  return {
    props: { posts: posts }
  };
};

// export const getStaticPaths: GetStaticPaths = async (data: any) => {
//   console.log({ data })
//   // return {};
//   // ...
// }


export default ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Layout>
    <Header>
      <Meta>
        <link rel='manifest' href='/manifest.json' />
        <link rel="icon" href="/favicon.ico" />
        <title>GONZU</title>
      </Meta>
    </Header>
    <div className="container">
      {posts.map((post: any, count: number) => {

        return (
          <div key={count}>
            <div>
              <p>{post.title}</p>
            </div>
            <div>
              <p>{post.body}</p>
            </div>
            <ButtonNext>Siguiente</ButtonNext>
          </div>
        );
      })}
    </div>
    <Footer>
    </Footer>
  </Layout>
}
