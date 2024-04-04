/* eslint-disable react/function-component-definition */
import { FunctionComponent } from 'react';

const BlankLayout: FunctionComponent<any> = ({ children }: any) => (
  <main role="main">{children}</main>
);

export default BlankLayout;
