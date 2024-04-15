import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { Banner } from "@components/common/banner";
import {
  performerService, bannerService
} from '@services/index';
import { connect } from 'react-redux';
import { Col, Layout, Pagination, Row, Spin, Tabs, Tooltip } from "antd";
import Head from "next/head";
import { useRouter } from 'next/router';
import { PureComponent } from "react";
import {
  IUser, IVideo, IProduct, IUIConfig, ISettings, IBanner
} from 'src/interfaces';
import { PerformerCard } from '@components/performer';
import { SearchOutlined } from '@ant-design/icons';
import BecomeAModelButton from '@components/buttons/BecomeAModelButton';
const { TabPane } = Tabs;

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

interface IProps {
  settings: ISettings;
  ui: IUIConfig;
  user: IUser;
  banners: IBanner[];
  // eslint-disable-next-line react/no-unused-prop-types
  videos: IVideo[];
  // eslint-disable-next-line react/no-unused-prop-types
  products: IProduct[];
  data: string;
}

class HomePage extends PureComponent<IProps>{
  static authenticate = true;
  static noredirect = true;

  state = {
    tab: '1',
    offset: 0,
    limit: 16,
    sortBy: 'latest',
    gender: 'female',
    banners: [],
    performers: [],
    total: 0,
    fetching: true, 
    valor: null
  };

  componentDidMount(): void {
    this.searchPerformers();
    console.log('ComponentDidMount ');
    var variable = sessionStorage.getItem("valor");
    this.setState({ valor: variable })
  }

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
      console.log('Todas ', todas);
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

  async pageChanged(page: number) {
    await this.setState({ offset: page - 1 });
    this.searchPerformers();
  }

  render(){
    const { banners = [], user, data } = this.props;
    const {
      performers, fetching, limit, offset, total, valor
    } = this.state;
    const topBanners = banners.filter((b) => b.position === 'top');
    const bottomBanners = banners.filter((b) => b.position === 'bottom');
    return(
      <Layout>
        <Head>
          <title>MyAdultFan | Home</title>
        </Head>
        <div className="home-page">
        {topBanners?.length > 0 && (
          <div className="banner">
            <Banner banners={topBanners} />
          </div>
        )}
          <div style={{ position: 'relative' }}>
            <div className="home-container">
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
                    {performers.length > 0 && performers.map((p: any) => (  
                      <Col xs={24} sm={24} md={6} lg={6} key={p._id} className="performer-column">
                        <PerformerCard performer={p} />
                      </Col>
                    ))}
                    </Row>  
                    {fetching && <div className="text-center" style={{ margin: 20 }}><Spin /></div>}                        
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
                      {performers?.length > 0 ? (
                      <div className="performers-wrapper">
                        <Row>
                        {performers.length > 0 && performers.map((p: any) => (
                          <Col xs={24} sm={24} md={6} lg={6} key={p._id} className="performer-column">
                            <PerformerCard performer={p} />
                          </Col>
                        ))}
                        </Row>
                        {fetching && <div className="text-center" style={{ margin: 20 }}><Spin /></div>}
                      </div>
                      ) : (
                        <p className="text-center">{fetching ? 'Loading...' : 'No profile was found.'}</p>
                      )}
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
                    {performers?.length > 0 ? (
                    <div className="performers-wrapper">
                      <Row>
                      {performers.length > 0 && performers.map((p: any) => (
                        <Col xs={24} sm={24} md={6} lg={6} key={p._id} className="performer-column">
                          <PerformerCard performer={p} />
                        </Col>
                      ))}
                      </Row>
                      {fetching && <div className="text-center" style={{ margin: 20 }}><Spin /></div>}
                    </div>
                    ) : (
                      <p className="text-center">{fetching ? 'Loading...' : 'No profile was found.'}</p>
                    )}
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
                    {performers?.length > 0 ? (
                    <div className="performers-wrapper">
                      <Row>
                      {performers.length > 0 && performers.map((p: any) => (
                        <Col xs={24} sm={24} md={6} lg={6} key={p._id} className="performer-column">
                          <PerformerCard performer={p} />
                        </Col>
                      ))}
                      </Row>
                      {fetching && <div className="text-center" style={{ margin: 20 }}><Spin /></div>}
                    </div>
                    ) : (
                      <p className="text-center">{fetching ? 'Loading...' : 'No profile was found.'}</p>
                    )}
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

              {bottomBanners?.length > 0 && (
              <Banner effect="fade" arrows={false} dots banners={bottomBanners} />
              )}

              <div className="signup-grp-btns">
                {!user?._id && (
                <BecomeAModelButton />
                )}
                {/* <Link legacyBehavior  href="/model">
                  <Button className="secondary">
                    <SearchOutlined />
                    {' '}
                    DISCOVER MODELS
                  </Button>
                </Link> */}
              </div>
              <Pagination
                defaultCurrent={1}
                current={offset + 1}
                total={total}
                pageSize={limit}
                size="default"
                responsive
                onChange={this.pageChanged.bind(this)}
              />  
            </div>  
          </div>  
        </div>
      </Layout>
    )
  }
}

const mapStates = (state: any) => ({
  ui: state.ui,
  user: state.user.current,
  settings: state.settings
});

const mapDispatch = {};
export default connect(mapStates, mapDispatch)(HomePage);

export async function getStaticProps() {
  // Lógica para obtener las props
  const data = 'Hola mundo'; // Obtener los datos necesarios
  try {
    const [banners] = await Promise.all([
      bannerService.search({ limit: 99, status: 'active' })
    ]);
    return {
      props: {
        data,
        banners: banners?.data?.data || []
      },
    };
  } catch (error) {
    return {
      banners: []
    };
  }
}