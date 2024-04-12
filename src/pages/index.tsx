import { Banner } from "@components/common/banner";
import {
  performerService, bannerService
} from '@services/index';
import { Layout, Tabs, Tooltip } from "antd";
import Head from "next/head";
import { PureComponent } from "react";
import {
  IUser, IVideo, IProduct, IUIConfig, ISettings, IBanner
} from 'src/interfaces';
const { TabPane } = Tabs;

const onChange = (key:any) => {
  console.log(key);
};

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

export default class HomePage extends PureComponent<IProps>{
  static authenticate = true;
  static noredirect = true;

  static getInitialProps() {
    console.log('InitialProps Index ');
    return {}
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
        //this.searchCouples();
        break;
      case '3':
        //this.searchGuys();
        break;
      case '4':
        //this.searchTrans();
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


  render(){
  
    return(
      <Layout>
        <Head>
          <title>MyAdultFan | Home</title>
        </Head>
        <div className="home-page">
          <div className="banner">
            
          </div>
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
                  </TabPane>    
                </Tabs>  
              </div>  
            </div>  
          </div>  
        </div>
      </Layout>
    )
  }
}
