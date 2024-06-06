'use client'
import dynamic from "next/dynamic";
import { BackTop, Layout } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IUIConfig } from "@interfaces/ui-config";
import Header from "@components/common/layout/header";
import Footer from "@components/common/layout/footer";
import { loadUIValue, updateUIValue } from "@redux/ui/uiSlice";
import { useEffect } from "react";
import { settingService } from "@services/setting.service";
import { updateLiveStreamSettings } from "@redux/streaming/streamingSlice";
import { pick } from 'lodash';
import { SETTING_KEYS } from "src/constants";

//const Header = dynamic(() => import('../components/common/layout/header'), { ssr: false });
//const Footer = dynamic(() => import('../components/common/layout/footer'), { ssr: false });

export default function PrimaryLayout({ children }:any) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [setting] = await Promise.all([
          settingService.all('all', true)
        ]);
        let sett = { ...setting.data };
        console.log('SETT ', sett);
        dispatch(updateUIValue({ 
          siteName: sett.siteName,
          logo: sett.logo,
          menus: sett.menus,
          favicon: sett.favicon,
          loginPlaceholderImage: sett.placeholder,
          footerContent: sett.footer
        }));

        dispatch(updateLiveStreamSettings(
          pick(sett, [
            'viewerURL',
            'publisherURL',
            SETTING_KEYS.SUBSCRIBER_URL,
            'optionForBroadcast',
            'optionForPrivate',
            'optionForGroup',
            'secureOption',
            'AntMediaAppname'
          ])
        ));
          
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchData();    
  }, [dispatch]);

  const current = useSelector((state:any) => state.user.current)
  const ui = useSelector((state:any) => state.ui);
  const streaming = useSelector((state:any) => state.streaming);
  console.log('STREAMING ', streaming);
  return (
  <>
    <Header currentUser={current} ui={ui} router={router} streamSettings={streaming} />
      <Layout>
        {children}
        <BackTop className="backTop" />
      </Layout>
    <Footer />
  </>    
  )
}