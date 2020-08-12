import { Layout } from '../../lib/store';
import Page from "../../components/Page";

export default function HomePage() {
  return <Layout title="Noticias Unidad Educativa Cardenal Gonzalez Zumarraga">
    <Page isPriv={false} pageName="building" />
  </Layout>
}