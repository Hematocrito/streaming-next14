'use client';
import dynamic from "next/dynamic";
import { BackTop, Layout } from 'antd';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
var Header = dynamic(function () { return import('../components/common/layout/header'); }, { ssr: false });
var Footer = dynamic(function () { return import('../components/common/layout/footer'); }, { ssr: false });
export default function PrimaryLayout(_a) {
    var children = _a.children;
    var router = useRouter();
    var current = useSelector(function (state) { return state.user.current; });
    var ui = useSelector(function (state) { return state.ui; });
    var streaming = useSelector(function (state) { return state.streaming; });
    return (<>
    <Header currentUser={current} ui={ui} router={router} streamSettings={streaming}/>
      <Layout>
        {children}
        <BackTop className="backTop"/>
      </Layout>
    <Footer />
  </>);
}
