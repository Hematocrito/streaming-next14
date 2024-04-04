/** @type {import('next').NextConfig} */

import withAntdLess from 'next-plugin-antd-less';

const nextConfig = {
  reactStrictMode: true,
  ...withAntdLess({
    lessVarsFilePath: './styles/variables.less',
    cssLoaderOptions: {},
    webpack(config) {
      return config;
    },
    future: {
      webpack5: true,
    },
  })
};

export default nextConfig;
