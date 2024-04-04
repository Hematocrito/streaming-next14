import { PureComponent } from 'react';
import { ISettings } from 'src/interfaces';
import { blockService } from '@services/index';
import CookiePolicy from '@components/common/layout/cookie-policy';
import { Spin } from 'antd';
import BlankLayout from './blank-layout';
// import PrimaryLayout from './primary-layout';
import MaintenaceLayout from './maintenance-layout';
import GEOLayout from './geoBlocked-layout';
import PublicLayout from './public-layout';
import primaryLayout from './primary-layout';

interface IProps {
  children: any;
  settings: ISettings;
  layout: string;
}

const LayoutMap: { [key: string]: any } = {
  geoBlock: GEOLayout,
  maintenance: MaintenaceLayout,
  primary: primaryLayout,
  public: PublicLayout,
  blank: BlankLayout
};

class BaseLayout extends PureComponent<IProps> {
  state = {
    geoBlocked: false,
    cookiePolicyVisible: false,
    fetching: false
  };

  async componentDidMount() {
    const { settings } = this.props;
    const { cookiePolicy } = localStorage;
    if (cookiePolicy !== 'yes' && settings?.cookiePolicyEnabled) {
      this.setState({ cookiePolicyVisible: true });
    }
    this.checkBlockIp();
  }

  checkBlockIp = async () => {
    //  need to check client side
    const checkBlock = await blockService.checkCountryBlock();
    if (checkBlock?.data?.blocked) {
      this.setState({ geoBlocked: true });
    }
  };

  acceptCookiePolicy = () => {
    localStorage.setItem('cookiePolicy', 'yes');
    this.setState({ cookiePolicyVisible: false });
  };

  render() {
    const {
      children, layout, settings
    } = this.props;
    const {
      cookiePolicyVisible, geoBlocked, fetching
    } = this.state;
    //  eslint-disable-next-line no-nested-ternary
    const Container = settings.maintenanceMode ? LayoutMap.maintenance : geoBlocked ? LayoutMap.geoBlock : layout && LayoutMap[layout] ? LayoutMap[layout] : LayoutMap.primary;
    return (
      <>
        <Container>{children}</Container>
        <CookiePolicy
          hidden={!cookiePolicyVisible}
          onOk={this.acceptCookiePolicy}
          pId={settings?.cookiePolicyContentId}
        />
        {fetching && <div className="text-center" style={{ margin: 30 }}><Spin /></div>}
      </>
    );
  }
}

export default BaseLayout;
