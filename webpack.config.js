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
    filename: "[main].[contenthash].js",
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
        test: /\.(png|jpg|ico)$/,
        use: 'file-loader'
      },
      {
        test: /\.(ttf|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        },
      ]
    }),
    new CleanWebpackPlugin()
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
    historyApiFallback: true
  },
  //devtool: 'source-map',
}
