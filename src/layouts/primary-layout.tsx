'use client'
import dynamic from "next/dynamic";
import { BackTop, Layout } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IUIConfig } from "@interfaces/ui-config";

const Header = dynamic(() => import('../components/common/layout/header'), { ssr: false });
const Footer = dynamic(() => import('../components/common/layout/footer'), { ssr: false });

export default function PrimaryLayout({ children }:any) {
  const router = useRouter();
  const current = useSelector((state:any) => state.user.current)
  const ui = useSelector((state:any) => state.ui);
  const streaming = useSelector((state:any) => state.streaming);
  
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