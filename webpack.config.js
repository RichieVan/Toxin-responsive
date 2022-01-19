const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: "[name].[contenthash].js"
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
      filename: "index.html",
      template: path.resolve(__dirname, 'src/index.pug'),
      minify: false,
    }),
    // new HTMLWebpackPlugin({
    //   filename: "ui-kit/colors-n-fonts.html",
    //   template: path.resolve(__dirname, 'src/pages/ui-kit/form-elements.pug'),
    //   minify: false,
    // }),
    new HTMLWebpackPlugin({
      filename: "ui-kit/forms/index.html",
      template: path.resolve(__dirname, 'src/pages/ui-kit/forms.pug'),
      minify: false,
    }),
    // new HTMLWebpackPlugin({
    //   filename: "ui-kit/heading-n-footer.html",
    //   template: path.resolve(__dirname, 'src/pages/ui-kit/form-elements.pug'),
    //   minify: false,
    // }),
    // new HTMLWebpackPlugin({
    //   filename: "ui-kit/test.html",
    //   template: path.resolve(__dirname, 'src/pages/ui-kit/form-elements.pug'),
    //   minify: false,
    // }),
    // new HTMLWebpackPlugin({
    //   filename: "ui-kit/test.html",
    //   template: path.resolve(__dirname, 'src/pages/ui-kit/form-elements.pug'),
    //   minify: false,
    // }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/assets'),
    //       to: path.resolve(__dirname, 'dist/assets')
    //     },
    //   ]
    // }),
    //new CleanWebpackPlugin()
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
    watchFiles: ['src/components/*/*.pug'],
    historyApiFallback: true
  },
  //devtool: 'source-map',
}
