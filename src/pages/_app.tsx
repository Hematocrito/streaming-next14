import React, {
  createContext, useContext, useState, useEffect
} from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import {store} from '../redux/store';
import {
  authService, userService, settingService, setGlobalConfig
} from '@services/index';
import { loginSuccess } from '@redux/slices/authSlice';
import { updateCurrentUser } from '@redux/slices/userSlice';
import { updateUIValue } from '@redux/slices/uiSlice';
import { updateSettings } from '@redux/slices/settingsSlice';
import { IntlProvider } from 'react-intl';
import { NextPageContext } from 'next';
import messages from '../pages/messages';
import App from 'next/app';

const LanguageContext = createContext('es');

declare global {
  interface Window {
    ReactSocketIO: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

function redirectLogin(ctx: any) {
  console.log('redirectin base function..');
  if (!(typeof window === 'undefined')) {
    console.log('entro');
    authService.removeToken();
    Router.push('/auth/login');
    return;
  }
  console.log('no entro');
  ctx.res.clearCookie && ctx.res.clearCookie('token');
  ctx.res.clearCookie && ctx.res.clearCookie('role');
  ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/auth/login' });
  ctx.res.end && ctx.res.end();
}

async function auth(
  ctx: NextPageContext,
  noredirect: boolean,
  onlyPerformer: boolean
) {
  try {
    //const { store }: any = ctx;
    const state = store.getState();
    const { token } = nextCookie(ctx);
    if (state.auth && state.auth.loggedIn) {
      return;
    }
    if (token) {
      authService.setToken(token);
      const user = await userService.me({
        Authorization: token
      });
      if (!user.data.isPerformer && onlyPerformer) {
        console.log('redirecting by user data');
        redirectLogin(ctx);
        return;
      }
      //store.dispatch(loginSuccess());
      store.dispatch(updateCurrentUser(user.data));
      return;
    }
    if (typeof (noredirect) !== 'undefined' && noredirect === false) {
      console.log('redirecting by no redirect', noredirect);
      redirectLogin(ctx);
    }
  } catch (e) {
    console.log('redirecting in catch');
    console.log('e', e);
    redirectLogin(ctx);
  }
}

async function updateSettingsStore(ctx: NextPageContext, settings:any) {
  console.log('updating settings store');
  //const { store }: any = ctx;
  store.dispatch(
    updateUIValue({
      logo: settings.logoUrl,
      siteName: settings.siteName,
      favicon: settings.favicon,
      loginPlaceholderImage: settings.loginPlaceholderImage,
      menus: settings.menus,
      footerContent: settings.footerContent,
      userBenefit: settings.userBenefit,
      modelBenefit: settings.modelBenefit,
      twitterLink: settings.twitterLink,
      instagramLink: settings.instagramLink,
      facebookLink: settings.facebookLink,
      youtubeLink: settings.youtubeLink,
      cookiePolicyEnabled: settings.cookiePolicyEnabled,
      cookiePolicyContentId: settings.cookiePolicyContentId,
      popup18Enabled: settings.popup18Enabled,
      popup18ContentId: settings.popup18ContentId
    })
  );/*
  store.dispatch(
    updateLiveStreamSettings(
      pick(settings, [
        'viewerURL',
        'publisherURL',
        SETTING_KEYS.SUBSCRIBER_URL,
        'optionForBroadcast',
        'optionForPrivate',
        'optionForGroup',
        'secureOption',
        'AntMediaAppname'
      ])
    )
  );*/

  store.dispatch(
    updateSettings({
      ...settings
    })
  );
}

interface AppComponent extends NextPageContext {
  layout: string;
}

interface IApp {
  //store: Store;
  layout: string;
  authenticate: boolean;
  Component: AppComponent;
  settings: any;
  config: any;
}

const publicConfig = {} as any;

function MyApp({ pageProps, Component }: any) {
  const lang = useContext(LanguageContext);
  const AppComponent1 = Component as any;
  const [locale, setLocale] = useState('es');

  useEffect(() => {
    //setLocale(localStorage.getItem('locale'));
  }, []);

  return (
    <LanguageContext.Provider value={lang}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <AppComponent1 {...pageProps} />
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

/*
export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}*/
export default class Application extends App<IApp> {
  static async getInitialProps({ Component, ctx }:any) {
    console.log('get initial props');
    if (typeof window === 'undefined') {
      //  eslint-disable-next-line global-require
      // const dotenv = require('dotenv');
      // const myEnv = dotenv.config().parsed;
      const myEnv = process.env;

      //  publish to server config with app
      setGlobalConfig(myEnv);

      //  load public config and api-endpoint?
      Object.keys(myEnv).forEach((key) => {
        if (key.indexOf('NEXT_PUBLIC_') === 0) {
          publicConfig[key] = myEnv[key];
        }
      });
    }
    //  won't check auth for un-authenticated page such as login, register
    //  use static field in the component
    const { noredirect, onlyPerformer, authenticate } = Component;
    authenticate && await auth(ctx, noredirect, onlyPerformer);
    const { token } = nextCookie(ctx);
    ctx.token = token || '';
    //  server side to load settings, once time only
    let settings = {};
    if (typeof window === 'undefined') {
      const [setting] = await Promise.all([
        settingService.all('all', true)
      ]);
      settings = { ...setting.data };
      
      await updateSettingsStore(ctx, settings);
    } else {
      console.log('no entró a actualizar settings...');
    }
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return {
      settings,
      pageProps,
      layout: Component.layout,
      config: publicConfig
    };
  }

  constructor(props:any) {
    super(props);
    setGlobalConfig(this.props.config);
  }

  render(){
    const {
      Component, pageProps, settings
    } = this.props;
    const { layout } = Component;
    return(
      <Provider store={store}>
        
            <MyApp pageProps={pageProps} Component={Component} />
        
      </Provider>
    )
  }
}