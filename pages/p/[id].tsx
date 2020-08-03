import getQueries, { getQueriesProps } from '../../lib/api/getQueries';
import { API_URL, IS_DEV } from '../../lib/constants';

export default function Post(props: { post: any }) {
  const post = props.post;
  console.log({ localPost: post })
  if (post) {
    return <div>POST: {post.title}</div>
  }
  return <div>Not found post </div>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  let request: any[any] = [];

  const query: getQueriesProps = [
    {
      url: `${API_URL}/api/posts`,
      header: { Authorization: `` }
    }
  ];

  try {
    request = await getQueries(query);
  } catch (error) {
    console.log({ errorPath: error })
    request = []
  }

  const [posts = { posts: [] }] = request;
  const postsToMap = posts.posts || [];
  const paths = postsToMap.map((post: any) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: !IS_DEV };
}

export async function getStaticProps({ params }: { params: any }) {
  const { id } = params;

  let request: any[any] = [];

  const query: getQueriesProps = [
    {
      url: `${API_URL}/api/posts/${id}`,
      header: { Authorization: `` }
    }
  ];

  try {
    request = await getQueries(query);
  } catch (error) {
    request = []
  }

  const [post = {}] = request;

  return {
    props: {
      post: post.post
    }
  }
}