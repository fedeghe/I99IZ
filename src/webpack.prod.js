const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpack = require("webpack");
const fs = require("fs");
const packageInfo  = JSON.parse(fs.readFileSync('./package.json'))
 
module.exports = {
  entry: {
      index: path.resolve(__dirname, './index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: "commonjs-module"
  },
  optimization: {
    minimize: true,
    minimizer: [
        new UglifyJsPlugin()
    ]
  },
  plugins: [
    new webpack.BannerPlugin(
        fs.readFileSync(
            path.resolve(__dirname + '/header.txt'),
            'utf8'
        ).replace('%AUTHOR%', packageInfo.author)
        .replace('%NAME%', packageInfo.name)
        .replace('%VERSION%', packageInfo.version)
    ),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/i,
        use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader' 
          }, {
            loader: 'less-loader'
          }]
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  mode: 'production',
};