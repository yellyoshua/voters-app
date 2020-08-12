import { NextPageContext } from "next";
import { Layout } from '../lib/store';
import Page from "../components/Page";

export default function HomePage() {
  return <Layout title="Unidad Educativa Cardenal Gonzalez Zumarraga">
    <Page isPriv={false} pageName="homepage" />
  </Layout>
}
HomePage.getInitialProps = (context: NextPageContext) => {
  const beFbAnalytics = !!context.query.fbclid;
  if (beFbAnalytics) {
    context.res?.writeHead(301, {
      Location: "/"
    });
    context.res?.end();
  }
  return {
    fbclid: context.query.fbclid
  };
}