import { Layout } from '../../lib/store';
import Page from "../../components/Page";

export default function HomePage() {
  return <Layout title="Pastoral">
    <Page isPriv={false} pageName="building" />
  </Layout>
}