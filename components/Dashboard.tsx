import { ReactNode, FunctionComponent } from 'react';

type DashboardProps = {
  children: ReactNode;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({ children }) => (<>
  {children}
</>);