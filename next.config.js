/**
 * @type {import('next').NextConfig}
 */

const withAntdLess = require('next-plugin-antd-less');
const { transpileModule } = require('typescript');

const nextConfig = {
  reactStrictMode: true,
  ...withAntdLess({
    lessVarsFilePath: './styles/index.less',
    cssLoaderOptions: {},
    webpack(config) {
      return config;
    },
    future: {
      webpack5: true,
    },
  }),
  transpilePackages: [
    'rc-util'
  ],
};

module.exports = nextConfig