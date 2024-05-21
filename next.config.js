/**
 * @type {import('next').NextConfig}
 */

const withAntdLess = require('next-plugin-antd-less');
const { transpileModule } = require('typescript');
const withImages = require('next-images');
const withFonts = require('next-fonts');

const nextConfig = {
  reactStrictMode: true,
  ...withFonts({
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
      })
      return config
    }
  }),
  ...withImages(),
  ...withAntdLess({
    lessVarsFilePath: './styles/index.less',
    cssLoaderOptions: {},
    future: {
      webpack5: false,
    },
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
      })
      return config
    }
  }),
  transpilePackages: [
    'rc-util',
    'rc-pagination',
    'antd',
    'rc-picker'
  ],
  /*
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    })
 
      return config
    },*/
};

module.exports = nextConfig