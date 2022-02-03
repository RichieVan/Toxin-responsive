const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PAGES_DIR = path.resolve(__dirname, 'src/pages');
const PAGES = fs.readdirSync(PAGES_DIR).filter((filename) => {
  const result = filename.endsWith('.pug');
  return result;
});

const UI_PAGES_DIR = path.resolve(__dirname, 'src/pages/ui-kit');
const UI_PAGES = fs.readdirSync(UI_PAGES_DIR).filter((filename) => {
  const result = filename.endsWith('.pug');
  return result;
});

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: [
          'pug-loader',
        ],
      },
      {
        test: /\.(png|jpg|ico|svg|ttf|woff|woff2|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.pug'),
      favicon: './src/assets/favicon.ico',
      minify: false,
    }),
    ...PAGES.map((filename) => {
      const page = new HTMLWebpackPlugin({
        filename: `${filename.slice(0, -4)}/index.html`,
        template: path.resolve(__dirname, `src/pages/${filename}`),
        favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
        minify: false,
      });
      return page;
    }),
    ...UI_PAGES.map((filename) => {
      const page = new HTMLWebpackPlugin({
        filename: `ui-kit/${filename.slice(0, -4)}/index.html`,
        template: path.resolve(__dirname, `src/pages/ui-kit/${filename}`),
        favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
        minify: false,
      });
      return page;
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/blocks/comment/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        {
          from: path.resolve(__dirname, 'src/blocks/catalog-card/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        {
          from: path.resolve(__dirname, 'src/blocks/catalog-detailed/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        {
          from: path.resolve(__dirname, 'src/blocks/banner-image/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  devServer: {
    compress: true,
    port: 8000,
    client: {
      logging: 'none',
      progress: false,
    },
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
    historyApiFallback: true,
  },
};
