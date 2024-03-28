/* eslint-disable react/no-unused-prop-types */
//import { PageHeader } from 'antd';
import React from 'react';
import { PureComponent } from 'react';
//import { Layout } from 'antd';
/*import {
  ArrowLeftOutlined
} from '@ant-design/icons';*/
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
//import { IUIConfig } from 'src/interfaces/';
//import Messenger from '@components/messages/Messenger';
// import './index.less';
interface IProps {
  getList: Function;
  performerState: any;
  //ui: IUIConfig;
  query: Record<string, string>
}

class Messages extends PureComponent<IProps> {
  static authenticate = true;

  static getInitialProps({ ctx }:any) {
    console.log('CTX', ctx);
    return {
      query: ctx.query
    };
  }

  render() {
    const { query = {} } = this.props;
    return (
      <div></div>
    );
  }
}

const mapStates = (state: any) => ({
  ui: state.ui
});

const mapDispatch = { };
export default connect(mapStates, mapDispatch)(Messages as any);
