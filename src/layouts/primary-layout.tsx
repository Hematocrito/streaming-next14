/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-prop-types */
import { PureComponent } from 'react';
import dynamic from 'next/dynamic';
import { Layout, BackTop } from 'antd';
import { connect } from 'react-redux';
import { updateUIValue, loadUIValue } from '@redux/slices/uiSlice';
import { IUIConfig } from 'src/interfaces/ui-config';
// import './primary-layout.less';

const Header = dynamic(() => import('@components/common/layout/header'));
const Footer = dynamic(() => import('@components/common/layout/footer'));

interface DefaultProps extends IUIConfig {
  children: any;
  config: IUIConfig;
  updateUIValue: Function;
  loadUIValue: Function;
}

export async function getStaticProps() {
  return {
    props: {}
  };
}

class PrimaryLayout extends PureComponent<DefaultProps> {
  componentDidMount() {
    process.browser;
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <Layout>
        <div
          className="primary-container"
          id="primaryLayout"
        >
          <Header />
          <Layout.Content
            className="content"
            style={{ position: 'relative' }}
          >
            {children}
          </Layout.Content>
          <BackTop className="backTop" />
          <Footer />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ...state.ui
});
const mapDispatchToProps = { updateUIValue, loadUIValue };

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout as any);
