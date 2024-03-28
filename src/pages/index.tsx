"use client";
import Head from 'next/head';
import { PureComponent } from 'react';
import {
  IUser, IVideo, IProduct, IUIConfig, ISettings, IBanner
} from 'src/interfaces';
import {
  performerService, bannerService
} from '@services/index';
import { useSelector } from 'react-redux';
import Encabezado from '@components/encabezado';


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
      </div>
    )
  }
}

export default HomePage