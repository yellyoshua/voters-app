
import { NextPageContext } from 'next';
import { AuthWithFetch } from '../hooks/useAuth';
import { User } from '../lib/collection/User';
import { PrivateLayout } from '../lib/store';

import Page from "../components/Page";

export default function Dashboard(props: { session: User; beUser: boolean }) {
  const user = props.session;
  return <PrivateLayout session={user} title="Dashboard">
    <Page isPriv={false} pageName="dashboard" />
  </PrivateLayout>
}

Dashboard.getInitialProps = async (ctx: NextPageContext) => {
  let request: { request: User | null; beUser: boolean; };

  try {
    request = await AuthWithFetch(ctx);
  } catch (error) {
    request = { request: null, beUser: false }
  }

  const user = request.request;
  const beUser = !!user;

  return {
    session: user, beUser
  };
};