/* eslint-disable @next/next/no-sync-scripts */
import Document, {
  Html, Head, Main, NextScript
} from 'next/document';
import { settingService } from '@services/setting.service';

class CustomDocument extends Document {

  static async getInitialProps(ctx:any) {
    const initialProps = await Document.getInitialProps(ctx);

    const resp = await settingService.all();
    const settings = resp.data;
    return {
      ...initialProps,
      settings
    };
  }

  render(){
    const { settings } = this.props as any;
    return(
      <Html>
        <Head />        
        <body>
          <Main />
          <NextScript />
        </body>
        <script src="https://unpkg.com/video.js@7.8.3/dist/video.js" />
        <script src="https://unpkg.com/@videojs/http-streaming@1.13.3/dist/videojs-http-streaming.js" />
        <script src="https://webrtc.github.io/adapter/adapter-latest.js" />
      </Html>
    )
  }
}

export default CustomDocument;