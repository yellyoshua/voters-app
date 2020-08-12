
import { NextPageContext } from 'next';
import { AuthWithFetch } from '../../hooks/useAuth';
import { User } from '../../lib/collection/User';
import { Layout } from '../../lib/store';
import Page from "../../components/Page";

export default function LoginPage(_props: { session: User; beUser: boolean }) {
  return <Layout title="Signin">
    <Page isPriv={false} pageName="login" />
  </Layout>
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  let request: { request: User | null; beUser: boolean; };

  try {
    request = await AuthWithFetch(ctx);
  } catch (error) {
    request = { request: null, beUser: false }
  }

  const user = request.request;
  const beUser = !!user;

  return {
    props: { session: user, beUser }
  };
};