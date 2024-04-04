import Head from 'next/head';
import { PureComponent } from 'react';
import { useRouter } from 'next/router';
import {
  IUser, IVideo, IProduct, IUIConfig, ISettings, IBanner
} from 'src/interfaces';
import {
  performerService, bannerService
} from '@services/index';
import { useSelector } from 'react-redux';
import Encabezado from '@components/encabezado';
import { Banner } from '@components/common/banner';
import { Col, Row, Spin, Tabs, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;


interface IProps {
  settings: ISettings;
  ui: IUIConfig;
  user: IUser;
  banners: IBanner[];
  // eslint-disable-next-line react/no-unused-prop-types
  videos: IVideo[];
  // eslint-disable-next-line react/no-unused-prop-types
  products: IProduct[];
}
const onChange = (key:any) => {
  console.log(key);
};

function FilterIcon() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/model');
  };
  return (
    <div className="menu-text" onClick={handleClick}>
      <SearchOutlined style={{ fontSize: '18px', margin: '0' }} />
    </div>
  );
}

class HomePage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  static async getInitialProps() {
    try {
      const [banners] = await Promise.all([
        //  videoService.userSearch({
        //    limit: 16, sortBy: 'updatedAt', sort: -1, isSaleVideo: true
        //  }),
        //  productService.userSearch({ limit: 16, sortBy: 'updatedAt', sort: -1 }),
        bannerService.search({ limit: 99, status: 'active' })
      ]);    
      return {
        videos: [],
        products: [],
        banners: banners?.data?.data || []
      };
    } catch (e) {
      return {
        videos: [],
        products: [],
        banners: []
      };
    }
  }

  state = {
    tab: '1',
    offset: 0,
    limit: 16,
    sortBy: 'latest',
    gender: 'female',
    performers: [],
    total: 0,
    fetching: true, 
    valor: null
  };

  loadItems = () => {
    const { tab } = this.state;
   
    console.log('TAB ', tab);
    switch (tab) {
      case '1':
        this.searchPerformers();
        break;
      case '2':
        this.searchCouples();
        break;
      case '3':
        this.searchGuys();
        break;
      case '4':
        this.searchTrans();
        break;
    }
  };

  searchPerformers = async () => {
    const {
      limit, offset, sortBy, gender
    } = this.state;
    try {
      this.setState({ fetching: true });
      
      const todas = await performerService.search();
      const resp = await performerService.search({
        limit,
        offset: offset * limit,
        sortBy,
        gender
      });
      if (resp.status === 0) {
        this.setState({
          performers: resp.data.data, fetching: false, total: todas.data.total
        });
      }
    } catch (e) {
      this.setState({ fetching: false });
    }
  };

  searchCouples = async () => {
    const {
      limit, offset, sortBy
    } = this.state;
    try {
      this.setState({ fetching: true });
      
      const todas = await performerService.search();
      const resp = await performerService.search({
        limit,
        offset: offset * limit,
        sortBy,
        gender: 'couples'
      });
      if (resp.status === 0) {
        this.setState({
          performers: resp.data.data, fetching: false, total: todas.data.total
        });
      }
    } catch (e) {
      this.setState({ fetching: false });
    }
  };

  searchGuys = async () => {
    const {
      limit, offset, sortBy
    } = this.state;
    try {
      this.setState({ fetching: true });
      
      const todas = await performerService.search();
      const resp = await performerService.search({
        limit,
        offset: offset * limit,
        sortBy,
        gender: 'male'
      });
      if (resp.status === 0) {
        this.setState({
          performers: resp.data.data, fetching: false, total: todas.data.total
        });
      }
    } catch (e) {
      this.setState({ fetching: false });
    }
  };

  searchTrans = async () => {
    const {
      limit, offset, sortBy
    } = this.state;
    try {
      this.setState({ fetching: true });
      
      const todas = await performerService.search();
      const resp = await performerService.search({
        limit,
        offset: offset * limit,
        sortBy,
        gender: 'transgender'
      });
      if (resp.status === 0) {
        this.setState({
          performers: resp.data.data, fetching: false, total: todas.data.total
        });
      }
    } catch (e) {
      this.setState({ fetching: false });
    }
  };

  render(){
    const {
      banners = [], ui, user, settings
    } = this.props;
    const {
      performers, fetching, limit, offset, total, valor
    } = this.state;
    const topBanners = banners.filter((b) => b.position === 'top');
    const bottomBanners = banners.filter((b) => b.position === 'bottom');
    return(
      <div>
        <Encabezado />
        <div className="home-page">
          {topBanners?.length > 0 && (
          <div className="banner">
            <Banner banners={topBanners} />
          </div>
          )}
          <div style={{ position: 'relative' }}>
            <div className="home-container">
            { /*valor!="1" && (<ContentAdult /> ) */}
              
              <div className="performers-wrapper">
                <Tabs
                  defaultActiveKey="1"
                  type='card'
                  onChange={onChange}
                  size='large'
                  style={{ color: 'black' }}
                  onTabClick={(tab) => {
                    this.setState({ tab }, () => this.loadItems());
                  }}
                >
                  <TabPane key={1}
                      tab={(
                        <Tooltip>
                          <div className="menu-text margen">
                            GIRLS
                          </div>
                        </Tooltip>
                      )}> 
                    <Row>
                      <Col>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane key={2}
                      tab={(
                        <Tooltip>
                          <div className="menu-text">
                            COUPLES
                          </div>
                        </Tooltip>
                      )}
                    >
                    <Row>
                      <Col>
                      </Col>
                    </Row>  
                  </TabPane>
                  <TabPane key={3}
                      tab={(
                        <Tooltip>
                          <div className="menu-text">
                            GUYS
                          </div>
                        </Tooltip>
                      )}
                    >
                    <Row>
                      <Col>
                      </Col>
                    </Row>   
                  </TabPane>
                  <TabPane key={4}
                      tab={(
                        <Tooltip>
                          <div className="menu-text">
                            TRANS
                          </div>
                        </Tooltip>
                      )}
                    >
                    <Row>
                      <Col>
                      </Col>
                    </Row>  
                  </TabPane>
                  <TabPane key={5}
                      tab={( 
                        <Tooltip>
                          <FilterIcon />                        
                        </Tooltip>                       
                      )}
                    ></TabPane>
                </Tabs>
              </div>

            </div>  
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage