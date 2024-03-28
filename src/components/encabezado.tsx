"use client";
import Head from 'next/head';
import { useSelector } from 'react-redux';

export default function Encabezado() {
    const ui = useSelector((state:any) => state.ui)
    const settings = useSelector((state:any) => state.settings)
    let siteName = ui.siteName

    return(
        <Head>
          <title>
            {ui.siteName}
          </title>
          <h1>{ui.siteName}</h1>
          <meta name="keywords" content={settings && settings.metaKeywords} />
          <meta
            name="description"
            content={settings && settings.metaDescription}
          />
          {/* OG tags */}
          <meta
            property="og:title"
            content={ui && ui.siteName}
          />
          <meta property="og:image" content={ui && ui.logo} />
          <meta
            property="og:description"
            content={settings && settings.metaDescription}
          />
          {/* Twitter tags */}
          <meta
            name="twitter:title"
            content={ui && ui.siteName}
          />
          <meta name="twitter:image" content={ui && ui.logo} />
          <meta
            name="twitter:description"
            content={settings && settings.metaDescription}
          />
        </Head>
    )
}