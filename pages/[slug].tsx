import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { getAllPost, getPostBySlug } from "../lib/api/post";
import { LayoutPost, Layout } from '../lib/store';
import Page from "../components/Page";
import { Reader } from "../components/Reader";

export async function getStaticPaths() {
  let posts: any[] = [];
  try {
    posts = await getAllPost();
  } catch (error) {
    posts = []
  }

  const paths = posts.map((post: any) => ({
    params: { slug: post.slug },
  }));


  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps<{
  post: any
}> = async (ctx: any) => {
  let post = {};
  const { slug } = ctx.params;

  try {
    post = await getPostBySlug(slug);
  }
  catch (error) {
    post = {};
  }
  console.log({ post })
  return {
    props: {
      post
    }
  }
}

export default function Post(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const post = props.post;
  const bePost = !!Object.keys(post).length;

  if (bePost) {
    return <LayoutPost post={post} >
      <Page isPriv={false} pageName="post-view" >
        {bePost ? (<Reader post={post} />) : (
          <div>Hola</div>
        )}
      </Page>
    </LayoutPost>;
  }

  return <Layout title="Unidad Educativa Cardenal Gonzalez Zumarraga">
    <Page isPriv={false} pageName="not-found">
      <Reader post={post} />
    </Page>
  </Layout>
}