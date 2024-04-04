/* eslint-disable react/function-component-definition */
import { FunctionComponent } from 'react';

const PublicLayout: FunctionComponent<any> = ({ children }: any) => (
  <main role="main">{children}</main>
);

export default PublicLayout;
