import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Drawer from '../hooks/useDrawer';


export const getStaticProps: GetStaticProps = async () => {

  return {
    props: { posts: [] }
  };
};

// export const getStaticPaths: GetStaticPaths = async (data: any) => {
//   console.log({ data })
//   // return {};
//   // ...
// }


export default ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const user = {
    name: "Yoshua",
    avatar: "",
    account: "Administrador",
    username: "yellyoshua",
    email: "yoshualopez1529@gmail.com",
    provider: "Btoa",
    password: "atob",
    resetPasswordToken: "aaa",
    confirmed: true,
    blocked: false
  }
  return <div>
    <Drawer user={user}/>
  </div>
}
