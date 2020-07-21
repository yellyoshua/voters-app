import { ReactNode, FunctionComponent } from 'react'
import Head from 'next/head';

export type MetaProps = {
  children: ReactNode;
}

export const Meta: FunctionComponent<MetaProps> = ({ children }) => {
  return <Head>
    {children}
  </Head>
};