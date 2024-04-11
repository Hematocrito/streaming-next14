/**
 * @type {import('next').NextConfig}
 */

const withAntdLess = require('next-plugin-antd-less');

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

module.exports = nextConfig