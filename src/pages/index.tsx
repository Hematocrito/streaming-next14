import { SearchOutlined } from "@ant-design/icons";
import { Banner } from "@components/common/banner";
import { PerformerCard } from "@components/performer";
import { IBanner } from "@interfaces/banner";
import { IPerformer } from "@interfaces/performer";
import { ISettings } from "@interfaces/setting";
import { IUIConfig } from "@interfaces/ui-config";
import { IUser } from "@interfaces/user";
import { bannerService } from "@services/banner.service";
import BecomeAModelButton from '@components/buttons/BecomeAModelButton';
import { performerService } from "@services/performer.service";
import { Col, Layout, Pagination, Row, Spin, Tabs, Tooltip } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;

interface IProps {
  settings: ISettings;
  ui: IUIConfig;
  user: IUser;
  banners: IBanner[];
  // eslint-disable-next-line react/no-unused-prop-types
  modelos: [];
  // eslint-disable-next-line react/no-unused-prop-types
  todas: IPerformer[];
  data: string;
  fetching: boolean;
}

export default function HomePage(props:IProps) {
  const ui = useSelector((state:any) => state.ui);
  const user = useSelector((state:any) => state.user.current)
  
  const [tab, setTab] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [total, setTotal] = useState(0);

  const searchPerformers = async () => {
    try {
      setFetching(true);
      
      const todas = await performerService.search();
      console.log('Todas ', todas);
      const resp = await performerService.search({
        limit,
        offset: offset * limit,
        sortBy: 'latest',
      });
      if (resp.status === 0) {
        setPerformers(resp.data.data);
        setFetching(false);
        setTotal(todas.data.total);
      }
    } catch (e) {
      setFetching(false);
    }
  };

  const searchCouples = async () => {
    const sortBy = 'latest';
    try { 
      setFetching(true);     
      const resp = await performerService.search({
        limit,
        offset: offset * limit,
        sortBy,
        gender: 'couples'
      });
      console.log('Parejas ', resp);
      if (resp.status === 0) {
        setPerformers(resp.data.data);
        setFetching(false);
        setTotal(resp.data.total);
      }
    } catch (e) {
      setFetching(false);
    }
  };

  const searchGuys = async () => {
    try {
      setFetching(true);
      
      const todas = await performerService.search();
      const resp = await performerService.search({
        limit,
        offset: offset * limit,
        sortBy: 'latest',
        gender: 'male'
      });
      if (resp.status === 0) {
        setPerformers(resp.data.data);
        setFetching(false);
        setTotal(resp.data.total);
      }
    } catch (e) {
      setFetching(false);
    }
  };

  const searchTrans = async () => {
    try {
      setFetching(true);
      
      const resp = await performerService.search({
        limit,
        offset: offset * limit,
        sortBy: 'latest',
        gender: 'transgender'
      });
      if (resp.status === 0) {
        setPerformers(resp.data.data);
        setFetching(false);
        setTotal(resp.data.total);
      }
    } catch (e) {
      setFetching(false);
    }
  };

  const loadItems = (tab:any) => {   
    console.log('TAB ', tab);
    switch (tab) {
      case '1':
        searchPerformers();
        break;
      case '2':
        searchCouples();
        break;
      case '3':
        searchGuys();
        break;
      case '4':
        searchTrans();
        break;
    }
  };

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

  function pageChanged(page: number) {
    offset: page - 1;
  }

  const offset = 0;
  const limit = 16;
  const { banners, todas, modelos } = props;
  const [performers, setPerformers] = useState(modelos);
  const topBanners = banners.filter((b) => b.position === 'top');
  const bottomBanners = banners.filter((b) => b.position === 'bottom');
  return (
    <Layout>
    <Head>
      <title></title>
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
              onTabClick={loadItems}
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

          
          {!user?._id && (
          <div className="signup-grp-btns">
            <BecomeAModelButton />
          </div>
          )}
            {/* <Link legacyBehavior  href="/model">
              <Button className="secondary">
                <SearchOutlined />
                {' '}
                DISCOVER MODELS
              </Button>
            </Link> */}
          
          <Pagination
            defaultCurrent={1}
            current={offset + 1}
            total={total}
            pageSize={limit}
            size="default"
            responsive
            onChange={pageChanged}
          />  
        </div>  
      </div>  
    </div>
  </Layout>
  )
}

export async function getStaticProps() {
  // Lógica para obtener las props
  const data = 'Hola mundo'; // Obtener los datos necesarios
  const limit= 16;
  const offset= 0;
  const sortBy = 'latest';
  const gender = 'female';
  try {
    const [banners] = await Promise.all([
      bannerService.search({ limit: 99, status: 'active' })
    ]);
    const todas = await performerService.search();
    const resp = await performerService.search({
      limit,
      offset: offset * limit,
      sortBy,
      gender
    });
    return {
      props: {
        data,
        banners: banners?.data?.data || [],
        todas: todas?.data?.data || [],
        modelos: resp?.data.data || []
      },
    };
  } catch (error) {
    return {
      banners: [],
      todas: [],
      modelos: []
    };
  }
}