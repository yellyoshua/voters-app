
import { useRouter } from "next/router";
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useIsomorphicLayoutEffect from "../utils/isomorphicLayoutEffect";
import getQueries, { getQueriesProps } from '../lib/api/getQueries';
import { sessionStoreValueProps } from '../lib/collection/Store';
import { HomePageProps } from '../lib/collection/Page';
import { API_URL } from '../lib/constants';
import { LayoutStore } from '../lib/store';
import Client from "../components/Client";

export const getStaticProps: GetStaticProps<{
  session: {
    response: sessionStoreValueProps
  };
  homepage: HomePageProps;
}> = async (req) => {
  console.log({ req });
  const token = "noclient";
  let request: any[any] = [];

  const query: getQueriesProps = [
    {
      url: `${API_URL}/api/session`,
      header: { Authorization: `Bearer ${token}` }
    },
    {
      url: `${API_URL}/home-page`,
      header: { Authorization: "" }
    }
  ];

  try {
    request = await getQueries(query);
  } catch (error) {
    request = []
  }

  const [session = {}, homepage = {}] = request;

  return {
    props: { session, homepage }
  };
};

// export const getStaticPaths: GetStaticPaths = async (data: any) => {
//   // return {};
//   // ...
// }

export default (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const session = props.session;
  const homepage = props.homepage;

  useIsomorphicLayoutEffect(() => {
    if (session.response.user && router.pathname === "/") {
      router.replace("/dashboard");
    }
  });

  return <LayoutStore variant="homepage" value={{ page: { homepage } }}>
    <Client />
  </LayoutStore>
}
