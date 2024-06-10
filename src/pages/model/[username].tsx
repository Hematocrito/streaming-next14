import { ArrowLeftOutlined, ShareAltOutlined } from "@ant-design/icons";
import { IPerformer } from "@interfaces/performer";
import { IError, ISettings } from "@interfaces/setting";
import { IUIConfig } from "@interfaces/ui-config";
import { IUser } from "@interfaces/user";
import { ICountry } from "@interfaces/utils";
import { shortenLargeNumber } from "@lib/number";
import { performerService } from "@services/performer.service";
import { ProfileTranslations } from 'src/pages-translations/profile-translations';
import { Col, Layout, Row, message } from "antd";
import { NextPageContext } from "next"
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


interface IProps {
  ui: IUIConfig;
  countries: ICountry[];
  error: IError;
  settings: ISettings;
  user: IUser;
  performer: IPerformer;
  query: any;
  listProducts: Function;
  getFeeds: Function;
  moreFeeds: Function;
  removeFeedSuccess: Function;
  getVideos: Function;
  moreVideo: Function;
  getVods: Function;
  moreProduct: Function;
  feedState: any;
  moreVod: Function;
  videoState: any;
  saleVideoState: any;
  productState: any;
  getGalleries: Function;
  moreGalleries: Function;
  galleryState: any;
  currentUser: IUser | IPerformer;
  // eslint-disable-next-line react/require-default-props
  msg?: string;
  locale: any;
}

//const { TabPane } = Tabs;

PerformerProfile.getInitialProps = async ({ ctx }:any) => {
  const { query } = ctx;
  try {
    const performer = (await (
      await performerService.findOne(query.username, {
        Authorization: ctx.token || ''
      })
    ).data) as IPerformer;
    
    // eslint-disable-next-line no-console
    /* if (!performer) {
      return Router.push('/error/404');
    } */
    return {
      performer,
      msg: query.msg,
      locale: ctx.locale
    };
  } catch (e) {
    const error = await Promise.resolve(e);
    console.log('error', e)
    return { error };
  }
}

export default function PerformerProfile(props:IProps) {
  const router = useRouter();
  const { 
    performer, 
    locale, 
    feedState: feedProps,
  } = props;
  const ui = useSelector((state:any) => state.ui);

  const {
    items: feeds = [],
    total: totalFeeds,
    requesting: loadingFeed
  } = feedProps;

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success('Link has been copied to clipboard!');
    } catch (e) {
      message.error(
        'Error while coping the link, please copy link from browser directly!'
      );
    }
  };

  const translations = locale === '' ? ProfileTranslations['en-US'] : ProfileTranslations['es-ES'];
  return (
    <Layout>
      <Head>
        <title>
          {`${ui?.siteName} | ${performer?.name || performer?.username || ''
          }`}
        </title>
        <meta
          name="keywords"
          content={`${performer?.username}, ${performer?.name}`}
        />
        <meta name="description" content={performer?.bio} />
        {/* OG tags */}
        <meta
          property="og:title"
          content={`${ui?.siteName} | ${performer?.name || performer?.username || ''
          }`}
          key="title"
        />
        <meta
          property="og:image"
          content={performer?.avatar || '/avatar-default.jpg'}
        />
        <meta
          property="og:keywords"
          content={`${performer?.username}, ${performer?.name}`}
        />
        <meta property="og:description" content={performer?.bio} />
      </Head>
      <Row className="custom-container">
        <Col
              lg={{ span: 16, offset: 4 }}
              xl={{ span: 16, offset: 4 }}
              md={{ span: 16, offset: 4 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              style={{ padding: 0 }}
          >
          <div
              className="top-profile"
              style={{
                backgroundImage: performer?.cover
                  ? `url(${performer?.cover})`
                  : "url('/img/cover-default.jpg')"
              }}
            >
            <div className="bg-2nd">
              <div className="top-banner">
                <a
                  aria-hidden
                  onClick={() => router.back()}
                >
                  <ArrowLeftOutlined className='flecha-volver'/>
                </a>
                <div className="stats-row">
                  <div className="tab-stat">
                    <div className="tab-item">
                      <span className="stat-number">
                        {shortenLargeNumber(
                          performer?.stats?.subscribers || 0
                        )}
                      </span>
                      <span className="stat-name">{translations.cover.followers}</span>
                    </div>
                    <div className="tab-item">
                      <span className="stat-number">
                        {shortenLargeNumber(
                          totalFeeds || 0
                        )}
                      </span>
                      <span className="stat-name">{translations.cover.posts}</span>
                    </div>
                    <div className="tab-item">
                      <span className="stat-number">
                        {shortenLargeNumber(
                          performer?.stats?.totalVideos || 0
                        )}
                      </span>
                      <span className="stat-name">{translations.cover.videos}</span>
                    </div>
                    <div className="tab-item">
                      <span className="stat-number">
                        {shortenLargeNumber(
                          performer?.stats?.totalPhotos || 0
                        )}
                      </span>
                      <span className="stat-name">{translations.cover.photos}</span>
                    </div>
                  </div>
                </div>
                  
                <span id='shareProfile' />
                <ShareAltOutlined style={{ fontSize: '30px', position: 'absolute', right: '23px' }} onClick={onShare} />
              </div>
            </div>  
          </div>
        </Col>
      </Row>
    </Layout>
  )
}