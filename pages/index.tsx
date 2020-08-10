import { Layout } from '../lib/store';
import Client from "../components/Client";

export default function HomePage() {
  return <Layout title="GONZU">
    <Client pathname="homepage" />
  </Layout>
}