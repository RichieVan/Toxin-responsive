const path = require('path');
// const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const PAGES_DIR = path.resolve(__dirname, 'src/pages');
// const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => {
//   filename.endsWith('.pug');
// })

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
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      //   options: {
      //     sources: {
      //       list: [
      //         '...',
      //         {
      //           tag: 'div',
      //           attribute: 'style',
      //           type: 'src'
      //         }
      //       ]
      //     }
      //   }
      // }
      // {
      //   test: /\.(ttf|woff|woff2)$/,
      //   use: 'file-loader',
      // },
      // {
      //   test: /\.(svg)$/,
      //   use: 'svg-inline-loader'
      // },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.pug'),
      minify: false,
    }),
    // new HTMLWebpackPlugin({
    //   filename: "ui-kit/colors-n-fonts.html",
    //   template: path.resolve(__dirname, 'src/pages/ui-kit/form-elements.pug'),
    //   minify: false,
    // }),
    // ...PAGES.map((page) => {
    //   new HTMLWebpackPlugin({
    //     filename: "ui-kit/forms/index.html",
    //     template: path.resolve(__dirname, 'src/pages/ui-kit/forms.pug'),
    //     minify: false,
    //   }),
    // }),
    new HTMLWebpackPlugin({
      filename: 'ui-kit/forms/index.html',
      template: path.resolve(__dirname, 'src/pages/ui-kit/forms.pug'),
      minify: false,
    }),
    new HTMLWebpackPlugin({
      filename: 'ui-kit/heading-n-footer/index.html',
      template: path.resolve(__dirname, 'src/pages/ui-kit/heading-n-footer.pug'),
      minify: false,
    }),
    new HTMLWebpackPlugin({
      filename: 'login/index.html',
      template: path.resolve(__dirname, 'src/pages/login.pug'),
      minify: false,
    }),
    new HTMLWebpackPlugin({
      filename: 'registration/index.html',
      template: path.resolve(__dirname, 'src/pages/registration.pug'),
      minify: false,
    }),
    new HTMLWebpackPlugin({
      filename: 'catalog/index.html',
      template: path.resolve(__dirname, 'src/pages/catalog.pug'),
      minify: false,
    }),
    new HTMLWebpackPlugin({
      filename: 'room/index.html',
      template: path.resolve(__dirname, 'src/pages/room.pug'),
      minify: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/components/comment/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        {
          from: path.resolve(__dirname, 'src/components/catalog-card/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        {
          from: path.resolve(__dirname, 'src/components/catalog-detailed/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        {
          from: path.resolve(__dirname, 'src/components/banner-image/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        // {
        //   from: path.resolve(__dirname, 'src/assets/images'),
        //   to: path.resolve(__dirname, 'dist/images'),
        // },
      ],
    }),
    // new CleanWebpackPlugin()
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
    // watchFiles: ['src/components/*/*.pug'],
    historyApiFallback: true,
  },
  // devtool: 'source-map',
};
