import Script from 'next/script'
import { Avatar, Button, Col, Row } from 'antd'
import { NextPageContext } from 'next'
import { IPerformer } from '@interfaces/performer';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/router";
import { query } from 'firebase/database';
import { any } from 'video.js/dist/types/utils/events';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import nextCookie from 'next-cookies';
import { IResponse } from '@services/api-request';
import { performerService } from '@services/performer.service';
import { headers } from 'next/headers';
import Tipping from '@components/streaming/tipping';


interface IProps {
  resetStreamMessage: Function;
  getStreamConversationSuccess: Function;
  loadStreamMessages: Function;
  activeConversation: any;
  //ui: IUIConfig;
  performer: IPerformer;
  success: boolean;
  searching: boolean;
  //settings: StreamSettings;
}

Stream.getInitialProps = async ({ctx}:any) => {
  const { query } = ctx;
  let performer;
  let headers;
  if (query.performer) {
    performer = JSON.parse(query.performer);
  } else {
    const { token } = nextCookie(ctx);
    const header = { Authorization: token };
    if(header!=undefined) {
    const resp: IResponse<IPerformer> = await performerService.findOne(
      query.username,
      headers
    );
    
    performer = resp.data;
    }
  }
  
  return { 
    performer
  }
}

export default function Stream(props:IProps) {
  const { performer } = props;
  const ui = useSelector((state:any) => state.ui);
  const current = useSelector((state:any) => state.user.current);

  return (
    <>
      <Head>
        <title>{`${ui.siteName || ''} | ${performer.username || ''}`}</title>
      </Head>
      <div className="main-container">
        <Script type='module' src='/js/utility.js' />
        <div className="page-heading">
          <Avatar src={performer?.avatar || '/img/no-avatar.png'} />
          {' '}
          <span style={{ textTransform: 'capitalize' }}>{performer?.username}</span>
        </div>
        <Row className="streaming-container">
          <Col md={14} xs={24}>
            <video id="localVideo" autoPlay controls className='video-container'></video>
            <Row>
              <Col xs={24} sm={12}>
              <Tipping
                  performerId={performer._id} 
                  avatar={performer?.avatar} 
                  name={performer?.name} 
                  username={performer?.username} 
                  usuario={current}                    
                  /> 
              </Col>
              <Col xs={24} sm={12}>
                <Button
                  block
                  type="primary"
                  className="primary"
                >
                  Private Call
                </Button>
              </Col>
            </Row>
          </Col>   
          <Col md={10} xs={24}>

          </Col>         
        </Row>
      {/* <br/>
        <button id="publish_start">Start Publishing</button>
        <button id="publish_stop">Stop Publishing</button>
        <br/>
        <p id="status_info">Offline</p>
      */ }   
      </div>    
    </>
  )
}
